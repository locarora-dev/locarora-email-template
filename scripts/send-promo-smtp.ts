/**
 * Promo email send via SMTP (for Forholiday's mail account, not Resend).
 *
 * Loads SMTP credentials from `.env.forholiday.local` (gitignored).
 * Supports Gmail / Google Workspace / Naver Works / any standard SMTP server.
 *
 * Usage:
 *   npm run send:promo-smtp -- <to> [utm_campaign] [locale]
 *
 * Examples:
 *   npm run send:promo-smtp -- dnduf158@gmail.com
 *   npm run send:promo-smtp -- dnduf158@gmail.com forholiday_bts2026 ko
 *   npm run send:promo-smtp -- someone@example.com summer_sale_2026 en
 *
 * Required env vars (in .env.forholiday.local):
 *   SMTP_HOST  — e.g. smtp.gmail.com, smtp.naverworks.com
 *   SMTP_PORT  — 587 (TLS) or 465 (SSL)
 *   SMTP_USER  — e.g. noreply@forholiday.com
 *   SMTP_PASS  — app password (for Gmail/Workspace) or regular password
 *   SMTP_FROM  — (optional) "Forholiday <noreply@forholiday.com>"; defaults to SMTP_USER
 */

import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { PromoLocaroraEmail } from "../emails/forholiday/promo-locarora";

// Mirror the batch script's env loading: prefer forholiday project's
// .env.local (where RESEND_SMTP_* and Gmail SMTP_* both live), fall back
// to a local sibling file for portability.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FORHOLIDAY_ENV =
  process.env.FORHOLIDAY_ENV_PATH ||
  "/Users/forholiday/Desktop/manager/forholiday/.env.local";
const LOCAL_FALLBACK_ENV = path.resolve(__dirname, "../.env.forholiday.local");
const envPath = fsSync.existsSync(FORHOLIDAY_ENV)
  ? FORHOLIDAY_ENV
  : LOCAL_FALLBACK_ENV;
dotenv.config({ path: envPath });

// Prefer RESEND_SMTP_* vars; fall back to legacy SMTP_* (Gmail).
const SMTP_HOST = process.env.RESEND_SMTP_HOST || process.env.SMTP_HOST;
const SMTP_PORT = process.env.RESEND_SMTP_PORT || process.env.SMTP_PORT;
const SMTP_USER = process.env.RESEND_SMTP_USER || process.env.SMTP_USER;
const SMTP_PASS = process.env.RESEND_SMTP_PASS || process.env.SMTP_PASS;
const SMTP_FROM = process.env.RESEND_SMTP_FROM || process.env.SMTP_FROM;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
  console.error(
    `✘ SMTP config missing in ${envPath}\n` +
      `  Required: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS`,
  );
  process.exit(1);
}

const to = process.argv[2];
const utmCampaign = process.argv[3] || "forholiday_bts2026";
const rawLocale = process.argv[4] || "ko";
const locale = (["ko", "ja", "en"].includes(rawLocale) ? rawLocale : "ko") as
  | "ko"
  | "ja"
  | "en";

if (!to) {
  console.error(
    "✘ Usage: npm run send:promo-smtp -- <to> [utm_campaign] [locale]",
  );
  process.exit(1);
}

const subjects: Record<"ko" | "ja" | "en", string> = {
  ko: "BTS 부산 공연장 수령·반납 가능 — 포할리데이 회원 안내",
  ja: "BTS釜山公演会場 受け取り・返却可能 — ForHoliday会員様へのご案内",
  en: "BTS Busan venue pickup & return available — A note for ForHoliday members",
};

async function main() {
  const port = Number(SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL; 587 = STARTTLS
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  // Fail fast if SMTP credentials are wrong
  await transporter.verify();

  const html = await render(
    PromoLocaroraEmail({
      locale,
      utmCampaign,
      utmSource: "email",
      utmMedium: "promo_email",
    }),
  );

  const info = await transporter.sendMail({
    from: SMTP_FROM || SMTP_USER,
    to,
    subject: subjects[locale],
    html,
  });

  console.log("✓ Sent via SMTP");
  console.log(`  messageId: ${info.messageId}`);
  console.log(`  accepted : ${JSON.stringify(info.accepted)}`);
  if (info.rejected && info.rejected.length > 0) {
    console.log(`  rejected : ${JSON.stringify(info.rejected)}`);
  }
  console.log(`  response : ${info.response}`);
  console.log(`  to       : ${to}`);
  console.log(`  from     : ${SMTP_FROM || SMTP_USER}`);
  console.log(`  campaign : ${utmCampaign}`);
  console.log(`  locale   : ${locale}`);
}

main().catch((err) => {
  console.error("✘ SMTP send failed:", err);
  process.exit(1);
});
