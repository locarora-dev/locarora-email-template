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

import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { PromoLocaroraEmail } from "../emails/forholiday/promo-locarora";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env.forholiday.local");
dotenv.config({ path: envPath });

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env;

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
  ko: "[갤럭시렌탈] 🎁 포할리데이 고객님께 드리는 로카로라 할인쿠폰 — 6월 BTS 부산 공연장 수령/반납 가능!",
  ja: "[ギャラクシーレンタル] 🎁 ForHolidayお客様限定 — ロカロラ割引クーポンをプレゼント（6月BTS釜山公演会場での受け取り・返却も可能！）",
  en: "[Galaxy Rental] 🎁 A Gift from ForHoliday — Locarora Discount Coupons (Pickup & Return at BTS Busan Venue in June!)",
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
      customerName: "홍길동",
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
