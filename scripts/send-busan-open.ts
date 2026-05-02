/**
 * Busan-launch waitlist promo sender.
 *
 * Reads recipients from a JSON file you populate via MCP `supabase-prod`
 * (since admin/.env.local points at the dev project). The script does NOT
 * touch Supabase itself — after sending it writes a `--mark-sql` file
 * containing the UUIDs to mark as notified, which you then run via MCP.
 *
 * Recipient JSON shape (scripts/data/busan-recipients.json):
 *   [
 *     { "id": "<uuid>", "email": "user@example.com", "preferred_language": "ja" },
 *     ...
 *   ]
 *
 * Loads RESEND_API_KEY / EMAIL_FROM from sibling locarora-admin/.env.local
 * (single source of truth — no duplication).
 *
 * Usage:
 *   npm run send:busan-open                       # dry-run by default
 *   npm run send:busan-open -- --execute          # actually send
 *   npm run send:busan-open -- --execute --limit 5
 *   npm run send:busan-open -- --execute --only-locale ja
 *   npm run send:busan-open -- --input scripts/data/busan-recipients.json
 *
 * Safety:
 *   - DRY-RUN by default. Live send requires explicit --execute.
 *   - On success, writes scripts/logs/busan-open-<ts>.json AND
 *     scripts/logs/busan-open-<ts>.mark.sql with UPDATE statement to set
 *     notified_at — operator runs that via MCP supabase-prod afterward.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { Resend } from "resend";
import { render } from "@react-email/render";
import {
  PromoBusanOpenEmail,
  type Locale,
} from "../emails/forholiday/promo-busan-open";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const adminEnvPath = path.resolve(__dirname, "../../locarora-admin/.env.local");
dotenv.config({ path: adminEnvPath });

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM =
  process.env.EMAIL_FROM || "LOCARORA <noreply@mail.locarora.com>";
const REPLY_TO = process.env.EMAIL_REPLY_TO || "support@locarora.com";

if (!RESEND_API_KEY) {
  console.error(`✘ RESEND_API_KEY missing in ${adminEnvPath}`);
  process.exit(1);
}

const SUPPORTED_LOCALES: Locale[] = ["ko", "ja", "en", "zh-TW", "zh-CN"];

interface Args {
  execute: boolean;
  limit: number;
  delayMs: number;
  onlyLocale: Locale | null;
  campaign: string;
  inputFile: string;
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const parsed: Args = {
    execute: args.includes("--execute"),
    limit: Infinity,
    delayMs: 1500,
    onlyLocale: null,
    campaign: "busan_open_2026",
    inputFile: path.resolve(__dirname, "data/busan-recipients.json"),
  };
  for (let i = 0; i < args.length; i++) {
    const k = args[i];
    const v = args[i + 1];
    if (k === "--limit") parsed.limit = Number(v);
    else if (k === "--delay") parsed.delayMs = Number(v);
    else if (k === "--campaign") parsed.campaign = v;
    else if (k === "--input") parsed.inputFile = path.resolve(v);
    else if (k === "--only-locale") {
      if (SUPPORTED_LOCALES.includes(v as Locale)) {
        parsed.onlyLocale = v as Locale;
      } else {
        console.error(
          `✘ --only-locale must be one of: ${SUPPORTED_LOCALES.join(", ")}`,
        );
        process.exit(1);
      }
    }
  }
  return parsed;
}

const SUBJECTS: Record<Locale, string> = {
  ko: "LOCARORA 부산점 오픈 안내 — BTS 콘서트 사전 등록 회원님께",
  ja: "LOCARORA 釜山店オープンのご案内 — BTSコンサート事前登録の皆さまへ",
  en: "LOCARORA Busan branch is now open — for BTS concert waitlist members",
  "zh-TW": "LOCARORA 釜山店開幕通知 — 致BTS演唱會事先登錄會員",
  "zh-CN": "LOCARORA 釜山店开业通知 — 致BTS演唱会事先登记会员",
};

interface WaitlistRow {
  id: string;
  email: string;
  preferred_language: string;
  created_at: string;
}

interface SendResult {
  index: number;
  id: string;
  email: string;
  locale: Locale;
  status: "sent" | "failed" | "skipped_unsubscribed";
  messageId?: string;
  error?: string;
  sentAt: string;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalizeLocale(value: string): Locale {
  const v = value.trim();
  if ((SUPPORTED_LOCALES as string[]).includes(v)) return v as Locale;
  return "en"; // unknown → English
}

async function main() {
  const args = parseArgs();

  // 1) Read recipients from JSON file (populated via MCP supabase-prod)
  let inputRaw: string;
  try {
    inputRaw = await fs.readFile(args.inputFile, "utf-8");
  } catch (err) {
    console.error(
      `✘ Could not read input file at ${args.inputFile}\n` +
        `  Generate it first via MCP supabase-prod (see CLAUDE.md). ` +
        `Expected JSON shape: [{ "id": "<uuid>", "email": "...", "preferred_language": "ja" }, ...]`,
    );
    process.exit(1);
  }

  const pending = JSON.parse(inputRaw) as WaitlistRow[];
  if (!Array.isArray(pending)) {
    console.error("✘ Input file must contain a JSON array.");
    process.exit(1);
  }

  // 2) Apply filters: only-locale → limit
  let recipients = pending.map((r) => ({
    ...r,
    locale: normalizeLocale(r.preferred_language),
  }));

  if (args.onlyLocale) {
    recipients = recipients.filter((r) => r.locale === args.onlyLocale);
  }

  if (Number.isFinite(args.limit)) {
    recipients = recipients.slice(0, args.limit);
  }

  // 4) Pre-render HTML for each locale we'll actually use
  const localesUsed = Array.from(new Set(recipients.map((r) => r.locale)));
  const htmlByLocale: Partial<Record<Locale, string>> = {};
  for (const loc of localesUsed) {
    htmlByLocale[loc] = await render(
      PromoBusanOpenEmail({
        locale: loc,
        utmCampaign: args.campaign,
      }),
    );
  }

  // Locale distribution
  const localeCounts = recipients.reduce<Record<string, number>>((acc, r) => {
    acc[r.locale] = (acc[r.locale] || 0) + 1;
    return acc;
  }, {});

  console.log("\n📧 Busan Launch Waitlist Send");
  console.log("────────────────────────────────");
  console.log(`  Env loaded     : ${adminEnvPath}`);
  console.log(`  Input file     : ${args.inputFile}`);
  console.log(`  From           : ${EMAIL_FROM}`);
  console.log(`  Reply-To       : ${REPLY_TO}`);
  console.log(`  Loaded         : ${pending.length} recipients from JSON`);
  console.log(`  Sending        : ${recipients.length}`);
  console.log(
    `  Locale dist    : ${Object.entries(localeCounts)
      .map(([l, c]) => `${l}=${c}`)
      .join(" ") || "(none)"}`,
  );
  console.log(`  Campaign       : ${args.campaign}`);
  console.log(`  Delay          : ${args.delayMs}ms between sends`);
  console.log(
    `  Est. duration  : ${((recipients.length * args.delayMs) / 60_000).toFixed(1)} min`,
  );
  console.log(
    `  Mode           : ${args.execute ? "🚀 LIVE SEND" : "🧪 DRY RUN (no send, no DB write)"}`,
  );
  console.log("────────────────────────────────");

  if (recipients.length === 0) {
    console.log("Nothing to send. Exiting.");
    process.exit(0);
  }

  if (!args.execute) {
    console.log("\n[DRY RUN] Would send to:");
    recipients.forEach((r, i) => {
      const masked = maskEmail(r.email);
      console.log(`  ${i + 1}. [${r.locale}] ${masked}`);
    });
    console.log("\n[DRY RUN] Subjects per locale:");
    for (const loc of localesUsed) {
      console.log(`  ${loc}: ${SUBJECTS[loc]}`);
    }
    console.log("\nRun with --execute to send for real.");
    process.exit(0);
  }

  // ── LIVE SEND ──
  console.log("\n⏳ Starting in 10 seconds... (Ctrl+C to abort)");
  await sleep(10_000);

  const resend = new Resend(RESEND_API_KEY!);
  const results: SendResult[] = [];
  let sentCount = 0;
  let failCount = 0;
  const startedAt = new Date().toISOString();

  for (let i = 0; i < recipients.length; i++) {
    const r = recipients[i];
    const idx = `[${i + 1}/${recipients.length}]`;
    const subject = SUBJECTS[r.locale];
    const baseHtml = htmlByLocale[r.locale]!;

    // No HMAC unsubscribe yet → mailto fallback
    const unsubscribeUrl = `mailto:${REPLY_TO}?subject=unsubscribe%20${encodeURIComponent(r.email)}`;
    const html = baseHtml.replace(/\{\{UNSUBSCRIBE_URL\}\}/g, unsubscribeUrl);

    try {
      const { data, error } = await resend.emails.send({
        from: EMAIL_FROM,
        to: r.email,
        replyTo: REPLY_TO,
        subject,
        html,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
          "X-Entity-Ref-ID": `busan-open-${args.campaign}-${r.id}`,
        },
      });

      if (error) {
        failCount++;
        const msg =
          typeof error === "object" && error && "message" in error
            ? String((error as { message: unknown }).message)
            : JSON.stringify(error);
        console.error(`✘ ${idx} [${r.locale}] ${maskEmail(r.email)} → ${msg}`);
        results.push({
          index: i + 1,
          id: r.id,
          email: r.email,
          locale: r.locale,
          status: "failed",
          error: msg,
          sentAt: new Date().toISOString(),
        });
      } else {
        sentCount++;
        console.log(
          `✓ ${idx} [${r.locale}] ${maskEmail(r.email)} → ${data?.id}`,
        );
        results.push({
          index: i + 1,
          id: r.id,
          email: r.email,
          locale: r.locale,
          status: "sent",
          messageId: data?.id,
          sentAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      failCount++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`✘ ${idx} ${maskEmail(r.email)} → ${msg}`);
      results.push({
        index: i + 1,
        id: r.id,
        email: r.email,
        locale: r.locale,
        status: "failed",
        error: msg,
        sentAt: new Date().toISOString(),
      });
    }

    if (i < recipients.length - 1) await sleep(args.delayMs);
  }

  const finishedAt = new Date().toISOString();

  const logDir = path.resolve(__dirname, "logs");
  await fs.mkdir(logDir, { recursive: true });
  const ts = startedAt.replace(/[:.]/g, "-");
  const logFile = path.resolve(logDir, `busan-open-${ts}.json`);
  await fs.writeFile(
    logFile,
    JSON.stringify(
      {
        campaign: args.campaign,
        startedAt,
        finishedAt,
        total: recipients.length,
        sent: sentCount,
        failed: failCount,
        results,
      },
      null,
      2,
    ),
    "utf-8",
  );

  // Build a SQL statement covering only IDs that were actually sent — operator
  // runs this via MCP supabase-prod to mark notified_at. Failed IDs stay NULL
  // so a retry can pick them up.
  const sentIds = results
    .filter((r) => r.status === "sent")
    .map((r) => r.id);
  const sqlFile = path.resolve(logDir, `busan-open-${ts}.mark.sql`);
  if (sentIds.length > 0) {
    const idsList = sentIds.map((id) => `'${id}'`).join(",\n  ");
    const sql =
      `-- Mark ${sentIds.length} successful sends as notified.\n` +
      `-- Run via MCP supabase-prod execute_sql.\n` +
      `UPDATE public.busan_launch_waitlist\n` +
      `SET notified_at = now()\n` +
      `WHERE id IN (\n  ${idsList}\n)\n` +
      `  AND notified_at IS NULL;\n`;
    await fs.writeFile(sqlFile, sql, "utf-8");
  }

  console.log("\n────────────────────────────────");
  console.log(`✓ Sent     : ${sentCount}`);
  console.log(`✘ Failed   : ${failCount}`);
  console.log(
    `Duration   : ${(
      (new Date(finishedAt).getTime() - new Date(startedAt).getTime()) /
      60_000
    ).toFixed(1)} min`,
  );
  console.log(`Log saved  : ${logFile}`);
  if (sentIds.length > 0) {
    console.log(`Mark SQL   : ${sqlFile}`);
    console.log(
      `\n→ Next: run the contents of that .mark.sql via MCP supabase-prod\n` +
        `   to set notified_at = now() on the ${sentIds.length} sent rows.`,
    );
  }
  console.log("────────────────────────────────");
}

function maskEmail(email: string): string {
  const at = email.indexOf("@");
  if (at < 0) return "***";
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}***@${domain}`;
}

main().catch((err) => {
  console.error("\n✘ Fatal error:", err);
  process.exit(1);
});
