/**
 * Batch promo email sender via Forholiday's Gmail SMTP.
 *
 * Reads SMTP credentials directly from manager/forholiday/.env.local
 * (no duplication — single source of truth) and sends the Forholiday × Locarora
 * promo email to recipients listed in a CSV/TXT file.
 *
 * CSV format (either):
 *   email,name
 *   hong@example.com,홍길동
 *   ...
 *
 * Or plain text (one email per line):
 *   hong@example.com
 *   kim@example.com
 *   ...
 *
 * Usage:
 *   npm run send:promo-batch -- <list-file>               # send all with default rate
 *   npm run send:promo-batch -- <list-file> --dry-run     # preview only, no actual send
 *   npm run send:promo-batch -- <list-file> --limit 200   # send only first 200
 *   npm run send:promo-batch -- <list-file> --start 200 --limit 200   # resume from 201st
 *   npm run send:promo-batch -- <list-file> --delay 3000  # ms between each email (default 3000)
 *   npm run send:promo-batch -- <list-file> --campaign summer_sale_2026
 *
 * Safety:
 *   - Always runs dry-run first? No, but prints recipient count + confirmation for 10s before start.
 *   - Rate-limited (default 3s/email = ~20/min) to stay under Gmail flags.
 *   - Writes progress log to scripts/logs/promo-<timestamp>.json
 *   - Ctrl+C safe: saves progress so you can resume with --start
 */

import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { render } from "@react-email/render";
import { parse as parseCsvSync } from "csv-parse/sync";
import { PromoLocaroraEmail } from "../emails/forholiday/promo-locarora";
import { buildUnsubscribeUrl } from "./lib/unsubscribe-token";

// ─────────────────────────────────────────────────────────────
// Environment loading — prefer forholiday project env, fallback local
// ─────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FORHOLIDAY_ENV =
  process.env.FORHOLIDAY_ENV_PATH ||
  "/Users/forholiday/Desktop/manager/forholiday/.env.local";
const LOCAL_FALLBACK_ENV = path.resolve(__dirname, "../.env.forholiday.local");

const loadedEnv = fsSync.existsSync(FORHOLIDAY_ENV)
  ? FORHOLIDAY_ENV
  : LOCAL_FALLBACK_ENV;
dotenv.config({ path: loadedEnv });

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
  SMTP_FROM,
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
  console.error(`✘ SMTP credentials missing.
  Looked in: ${loadedEnv}
  Required: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS`);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────
// CLI args
// ─────────────────────────────────────────────────────────────

interface Args {
  listFile: string;
  dryRun: boolean;
  start: number;
  limit: number;
  delayMs: number;
  campaign: string;
  locale: "ko" | "ja" | "en";
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0].startsWith("--")) {
    console.error(
      "✘ Usage: npm run send:promo-batch -- <list-file> [--dry-run] [--start N] [--limit N] [--delay MS] [--campaign NAME] [--locale ko|ja|en]",
    );
    process.exit(1);
  }

  const parsed: Args = {
    listFile: args[0],
    dryRun: args.includes("--dry-run"),
    start: 0,
    limit: Infinity,
    delayMs: 3000,
    campaign: "forholiday_bts2026",
    locale: "ko",
  };

  for (let i = 1; i < args.length; i++) {
    const key = args[i];
    const val = args[i + 1];
    if (key === "--start") parsed.start = Number(val);
    else if (key === "--limit") parsed.limit = Number(val);
    else if (key === "--delay") parsed.delayMs = Number(val);
    else if (key === "--campaign") parsed.campaign = val;
    else if (key === "--locale" && ["ko", "ja", "en"].includes(val))
      parsed.locale = val as "ko" | "ja" | "en";
  }

  return parsed;
}

// ─────────────────────────────────────────────────────────────
// Recipient list parsing
// ─────────────────────────────────────────────────────────────

interface Recipient {
  email: string;
  name?: string;
  locale?: "ko" | "ja" | "en";
}

function nationalityToLocale(nat: string | undefined): "ko" | "ja" | "en" {
  const n = (nat || "").trim();
  if (n === "한국") return "ko";
  if (n === "일본") return "ja";
  return "en"; // 미기재 + 기타 국적 모두 영어
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseList(content: string): Recipient[] {
  // Strip UTF-8 BOM if present
  const normalized = content.replace(/^﻿/, "");

  // Detect format: if any comma-split line has 2+ columns → treat as CSV
  const firstLine = normalized.split(/\r?\n/, 1)[0] || "";
  const looksCsv = firstLine.includes(",");

  const out: Recipient[] = [];
  const seen = new Set<string>();

  if (looksCsv) {
    // Proper RFC 4180 CSV parsing (handles quoted fields with commas)
    const rows = parseCsvSync(normalized, {
      columns: true, // use header row as object keys
      skip_empty_lines: true,
      relax_column_count: true,
      trim: true,
    }) as Record<string, string>[];

    for (const row of rows) {
      // Look for email in common column names (case-insensitive)
      const emailRaw = Object.keys(row).find((k) =>
        k.toLowerCase() === "email",
      );
      if (!emailRaw) continue;
      const email = (row[emailRaw] || "").toLowerCase().trim();

      // Name column: try 'name', 'customer_name', 'customerName'
      const nameKey = Object.keys(row).find((k) =>
        ["name", "customer_name", "customername"].includes(k.toLowerCase()),
      );
      const name = nameKey ? row[nameKey]?.trim() || undefined : undefined;

      // Locale: try explicit `locale` column first, then derive from `nationality`
      const localeKey = Object.keys(row).find(
        (k) => k.toLowerCase() === "locale",
      );
      const natKey = Object.keys(row).find(
        (k) => k.toLowerCase() === "nationality",
      );
      let locale: "ko" | "ja" | "en" | undefined;
      if (localeKey && row[localeKey]) {
        const v = row[localeKey].toLowerCase().trim();
        if (v === "ko" || v === "ja" || v === "en") locale = v;
      }
      if (!locale && natKey) {
        locale = nationalityToLocale(row[natKey]);
      }

      if (!email || !EMAIL_RE.test(email)) continue;
      if (seen.has(email)) continue;
      seen.add(email);

      out.push({ email, name, locale });
    }
  } else {
    // Plain text: one email per line
    for (const line of normalized.split(/\r?\n/)) {
      const email = line.trim().toLowerCase();
      if (!email || !EMAIL_RE.test(email)) continue;
      if (seen.has(email)) continue;
      seen.add(email);
      out.push({ email });
    }
  }

  return out;
}

// ─────────────────────────────────────────────────────────────
// Email subject by locale
// ─────────────────────────────────────────────────────────────

const SUBJECTS: Record<"ko" | "ja" | "en", string> = {
  ko: "[갤럭시렌탈] 🎁 포할리데이 고객님께 드리는 로카로라 할인쿠폰 — 6월 BTS 부산 공연장 수령/반납 가능!",
  ja: "[ギャラクシーレンタル] 🎁 ForHolidayお客様限定 — ロカロラ割引クーポンをプレゼント（6月BTS釜山公演会場での受け取り・返却も可能！）",
  en: "[Galaxy Rental] 🎁 A Gift from ForHoliday — Locarora Discount Coupons (Pickup & Return at BTS Busan Venue in June!)",
};

// ─────────────────────────────────────────────────────────────
// Send loop
// ─────────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchUnsubscribedEmails(): Promise<Set<string>> {
  // Prefer LOCARORA_* prefixed vars to avoid clashing with Forholiday's own
  // Supabase config (Forholiday project has its own DB for reservations).
  const url =
    process.env.LOCARORA_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;
  const serviceKey =
    process.env.LOCARORA_SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE;

  if (!url || !serviceKey) {
    console.warn(
      "⚠  Locarora Supabase credentials not found — skipping unsubscribe list filter.\n" +
        "   Set LOCARORA_SUPABASE_URL + LOCARORA_SUPABASE_SERVICE_KEY in env.\n" +
        "   (Without this, previously-unsubscribed emails will receive again.)",
    );
    return new Set();
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase
    .from("email_unsubscribes")
    .select("email");

  if (error) {
    console.warn(`⚠  Failed to fetch unsubscribe list: ${error.message}`);
    return new Set();
  }

  return new Set((data ?? []).map((r: { email: string }) => r.email.toLowerCase()));
}

async function main() {
  const args = parseArgs();

  const listPath = path.resolve(args.listFile);
  const content = await fs.readFile(listPath, "utf-8");
  const allRecipients = parseList(content);

  // Filter out unsubscribed emails (BEFORE slicing so the same start/limit
  // covers same recipients across runs even if some unsubscribed mid-campaign).
  const unsubscribed = await fetchUnsubscribedEmails();
  const beforeCount = allRecipients.length;
  const filtered = allRecipients.filter(
    (r) => !unsubscribed.has(r.email.toLowerCase()),
  );
  const removed = beforeCount - filtered.length;
  if (removed > 0) {
    console.log(`🚫 Excluded ${removed} unsubscribed recipient(s)`);
  }

  const slice = filtered.slice(
    args.start,
    args.start + (Number.isFinite(args.limit) ? args.limit : filtered.length),
  );

  console.log(`\n📧 Forholiday Promo Batch Send`);
  console.log(`────────────────────────────────`);
  console.log(`  Env loaded : ${loadedEnv}`);
  console.log(`  From       : ${SMTP_FROM || `"FORHOLIDAY" <${SMTP_USER}>`}`);
  console.log(`  Host       : ${SMTP_HOST}:${SMTP_PORT}`);
  console.log(`  List file  : ${listPath}`);
  console.log(`  Parsed     : ${allRecipients.length} unique valid emails`);
  console.log(`  Sending    : ${slice.length} emails (start=${args.start}, limit=${args.limit === Infinity ? "∞" : args.limit})`);
  console.log(`  Campaign   : ${args.campaign}`);
  console.log(`  Locale     : ${args.locale}`);
  console.log(`  Delay      : ${args.delayMs}ms between sends`);
  console.log(`  Est. time  : ${((slice.length * args.delayMs) / 60_000).toFixed(1)} minutes`);
  console.log(`  Mode       : ${args.dryRun ? "🧪 DRY RUN (no emails sent)" : "🚀 LIVE SEND"}`);
  console.log(`────────────────────────────────`);

  if (slice.length === 0) {
    console.log("Nothing to send. Exiting.");
    process.exit(0);
  }

  // Pre-render HTML for all 3 locales — so we can pick per-recipient
  const htmlByLocale: Record<"ko" | "ja" | "en", string> = {
    ko: await render(
      PromoLocaroraEmail({
        locale: "ko",
        utmCampaign: args.campaign,
        utmSource: "email",
        utmMedium: "promo_email",
      }),
    ),
    ja: await render(
      PromoLocaroraEmail({
        locale: "ja",
        utmCampaign: args.campaign,
        utmSource: "email",
        utmMedium: "promo_email",
      }),
    ),
    en: await render(
      PromoLocaroraEmail({
        locale: "en",
        utmCampaign: args.campaign,
        utmSource: "email",
        utmMedium: "promo_email",
      }),
    ),
  };

  // Count locale distribution in slice (for preview)
  const localeCounts = { ko: 0, ja: 0, en: 0 } as Record<"ko" | "ja" | "en", number>;
  for (const r of slice) {
    const loc = r.locale ?? args.locale;
    localeCounts[loc]++;
  }

  console.log(`  Locale dist : ko=${localeCounts.ko} ja=${localeCounts.ja} en=${localeCounts.en}`);

  if (args.dryRun) {
    console.log(`\n[DRY RUN] Would send to:`);
    slice.slice(0, 10).forEach((r, i) => {
      const loc = r.locale ?? args.locale;
      console.log(
        `  ${args.start + i + 1}. [${loc}] ${r.email}${r.name ? ` (${r.name})` : ""}`,
      );
    });
    if (slice.length > 10) console.log(`  ... and ${slice.length - 10} more`);
    console.log(`\n[DRY RUN] HTML sizes: ko=${htmlByLocale.ko.length} ja=${htmlByLocale.ja.length} en=${htmlByLocale.en.length}`);
    console.log(`[DRY RUN] Subjects:`);
    Object.entries(SUBJECTS).forEach(([loc, subj]) =>
      console.log(`  ${loc}: ${subj}`),
    );
    process.exit(0);
  }

  if (!args.dryRun) {
    console.log(`⏳ Starting in 10 seconds... (Ctrl+C to abort)`);
    await sleep(10_000);
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true" || Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.verify();
  console.log(`✓ SMTP connection verified\n`);

  const fromAddr = SMTP_FROM || `"FORHOLIDAY" <${SMTP_USER}>`;
  const results: Array<{
    index: number;
    email: string;
    name?: string;
    status: "sent" | "failed";
    messageId?: string;
    error?: string;
    sentAt: string;
  }> = [];

  let sentCount = 0;
  let failCount = 0;

  // Ctrl+C → save partial progress
  const handleInterrupt = async () => {
    console.log(`\n⚠  Interrupted. Saving partial log...`);
    await saveLog();
    process.exit(130);
  };
  process.on("SIGINT", handleInterrupt);
  process.on("SIGTERM", handleInterrupt);

  const startedAt = new Date().toISOString();

  for (let i = 0; i < slice.length; i++) {
    const r = slice[i];
    const globalIdx = args.start + i + 1;
    const progress = `[${globalIdx}/${args.start + slice.length}]`;

    const recipientLocale = r.locale ?? args.locale;
    const recipientSubject = SUBJECTS[recipientLocale];
    const baseHtml = htmlByLocale[recipientLocale];

    // Build per-recipient unsubscribe URL (HMAC token), fallback to mailto if no secret.
    const unsubSecret = process.env.UNSUBSCRIBE_SECRET;
    const siteUrl =
      process.env.UNSUBSCRIBE_SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://locarora.com";
    const unsubscribeUrl = unsubSecret
      ? buildUnsubscribeUrl(r.email, unsubSecret, siteUrl)
      : `mailto:forholidayg@gmail.com?subject=unsubscribe%20${encodeURIComponent(r.email)}`;

    // Replace template placeholder with personalized URL
    const recipientHtml = baseHtml.replace(
      /\{\{UNSUBSCRIBE_URL\}\}/g,
      unsubscribeUrl,
    );

    // Use HTTPS endpoint for List-Unsubscribe header when available — Gmail
    // prefers HTTPS over mailto for one-click. Fallback: keep mailto.
    const listUnsubscribeHeader = unsubSecret
      ? `<${unsubscribeUrl}>, <mailto:forholidayg@gmail.com?subject=unsubscribe>`
      : "<mailto:forholidayg@gmail.com?subject=unsubscribe>";

    try {
      const info = await transporter.sendMail({
        from: fromAddr,
        replyTo: "forholidayg@gmail.com",
        to: r.email,
        subject: recipientSubject,
        html: recipientHtml,
        text: recipientHtml.replace(/<[^>]*>/g, ""),
        headers: {
          "List-Unsubscribe": listUnsubscribeHeader,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          "X-Entity-Ref-ID": `forholiday-promo-${args.campaign}-${globalIdx}-${Date.now()}`,
          "X-Mailer": "Forholiday Promo Batch v1.0",
        },
      });

      sentCount++;
      console.log(`✓ ${progress} [${recipientLocale}] ${r.email} → ${info.messageId}`);
      results.push({
        index: globalIdx,
        email: r.email,
        name: r.name,
        status: "sent",
        messageId: info.messageId,
        sentAt: new Date().toISOString(),
      });
    } catch (err) {
      failCount++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`✘ ${progress} ${r.email} → ${msg}`);
      results.push({
        index: globalIdx,
        email: r.email,
        name: r.name,
        status: "failed",
        error: msg,
        sentAt: new Date().toISOString(),
      });
    }

    // Rate-limit delay (skip after last)
    if (i < slice.length - 1) {
      await sleep(args.delayMs);
    }
  }

  const finishedAt = new Date().toISOString();

  async function saveLog() {
    const logDir = path.resolve(__dirname, "logs");
    await fs.mkdir(logDir, { recursive: true });
    const ts = startedAt.replace(/[:.]/g, "-");
    const logFile = path.resolve(logDir, `promo-${ts}.json`);
    await fs.writeFile(
      logFile,
      JSON.stringify(
        {
          campaign: args.campaign,
          locale: args.locale,
          startedAt,
          finishedAt,
          total: slice.length,
          sent: sentCount,
          failed: failCount,
          range: { start: args.start, end: args.start + slice.length - 1 },
          results,
        },
        null,
        2,
      ),
      "utf-8",
    );
    console.log(`\n📝 Log saved: ${logFile}`);
  }

  console.log(`\n────────────────────────────────`);
  console.log(`✓ Sent   : ${sentCount}`);
  console.log(`✘ Failed : ${failCount}`);
  console.log(`Duration : ${(
    (new Date(finishedAt).getTime() - new Date(startedAt).getTime()) /
    60_000
  ).toFixed(1)} minutes`);
  console.log(`────────────────────────────────`);

  await saveLog();
}

main().catch((err) => {
  console.error("\n✘ Fatal error:", err);
  process.exit(1);
});
