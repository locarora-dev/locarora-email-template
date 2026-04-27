/**
 * Promo email test-send script.
 *
 * Loads RESEND_API_KEY + EMAIL_FROM from sibling `locarora-admin/.env.local`
 * (no secret duplication) and sends a single Korean promo email.
 *
 * Run:
 *   npm run send:promo-test
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { PromoLocaroraEmail } from "../emails/forholiday/promo-locarora";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const adminEnvPath = path.resolve(
  __dirname,
  "../../locarora-admin/.env.local",
);

dotenv.config({ path: adminEnvPath });

const apiKey = process.env.RESEND_API_KEY;
const from =
  process.env.EMAIL_FROM || "LOCARORA <noreply@mail.locarora.com>";
const to = process.argv[2] || "forholidayg@gmail.com";
const utmCampaign = process.argv[3] || "forholiday_bts2026";
const subject =
  "[갤럭시렌탈] 🎁 포할리데이 고객님께 드리는 로카로라 할인쿠폰 — 6월 BTS 부산 공연장 수령/반납 가능!";

if (!apiKey) {
  console.error(`✘ RESEND_API_KEY not found at ${adminEnvPath}`);
  process.exit(1);
}

async function main() {
  const html = await render(
    PromoLocaroraEmail({
      locale: "ko",
      customerName: "홍길동",
      utmCampaign,
    }),
  );

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    console.error("✘ Resend error:", error);
    process.exit(1);
  }

  console.log("✓ Sent");
  console.log(`  messageId : ${data?.id}`);
  console.log(`  to        : ${to}`);
  console.log(`  from      : ${from}`);
  console.log(`  subject   : ${subject}`);
  console.log(`  campaign  : ${utmCampaign}`);
}

main().catch((err) => {
  console.error("✘ Unexpected error:", err);
  process.exit(1);
});
