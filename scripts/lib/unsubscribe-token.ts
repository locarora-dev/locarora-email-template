/**
 * HMAC-signed unsubscribe token (mirror of locarora-web/src/lib/email/unsubscribe-token.ts).
 *
 * Both files MUST use the same UNSUBSCRIBE_SECRET so tokens generated here
 * verify correctly in the locarora-web /api/unsubscribe endpoint.
 *
 * Format: <base64url(email)>.<HMAC-SHA256(base64url(email), UNSUBSCRIBE_SECRET)>
 */

import crypto from "node:crypto";

function b64urlEncode(input: string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function generateUnsubscribeToken(email: string, secret: string): string {
  const normalized = email.trim().toLowerCase();
  const data = b64urlEncode(normalized);
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `${data}.${hmac}`;
}

export function buildUnsubscribeUrl(
  email: string,
  secret: string,
  siteUrl: string = "https://locarora.com",
): string {
  const token = generateUnsubscribeToken(email, secret);
  return `${siteUrl.replace(/\/$/, "")}/api/unsubscribe?token=${encodeURIComponent(token)}`;
}
