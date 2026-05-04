/**
 * One-off: trim square Forholiday logo whitespace + upload as wide banner
 * to Supabase Storage `email-assets` bucket. After running, copy the public
 * URL into promo-locarora.tsx hero.
 */

import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FORHOLIDAY_ENV = "/Users/forholiday/Desktop/manager/forholiday/.env.local";
dotenv.config({ path: FORHOLIDAY_ENV });

const SOURCE_PATH =
  "/Users/forholiday/Desktop/locarora/react-email-starter/assets/forholiday-wide.png";
const TRIMMED_PATH = "/tmp/forholiday-trimmed.png";
const BUCKET = "email-assets";
const REMOTE_PATH = "forholiday.png";

const url =
  process.env.LOCARORA_SUPABASE_URL ||
  "https://eafmpgmhtlhqvdpjucgb.supabase.co";
const serviceKey =
  process.env.LOCARORA_SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
  console.error(
    "✘ LOCARORA_SUPABASE_SERVICE_KEY or SUPABASE_SERVICE_ROLE_KEY required",
  );
  process.exit(1);
}

async function main() {
  // 1. Trim transparent/white whitespace around the logo
  // Source is already a clean wide banner with proper padding — upload as-is.
  console.log(`◇ Reading ${SOURCE_PATH}`);
  const trimmedBuffer = await fsSync.promises.readFile(SOURCE_PATH);
  await fsSync.promises.writeFile(TRIMMED_PATH, trimmedBuffer);
  const meta = await sharp(trimmedBuffer).metadata();
  console.log(`  ✓ Trimmed size: ${meta.width} × ${meta.height} (${trimmedBuffer.byteLength} bytes)`);

  // 2. Upload to Supabase Storage
  console.log(`◇ Uploading to ${url}/storage/v1/object/${BUCKET}/${REMOTE_PATH}`);
  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(REMOTE_PATH, trimmedBuffer, {
      contentType: "image/png",
      upsert: true,
      cacheControl: "31536000",
    });

  if (error) {
    console.error(`✘ Upload failed: ${error.message}`);
    process.exit(1);
  }

  const publicUrl = `${url}/storage/v1/object/public/${BUCKET}/${REMOTE_PATH}`;
  console.log(`✓ Public URL: ${publicUrl}`);
  console.log(`  Add this to promo-locarora.tsx hero <Img>`);
}

main().catch((err) => {
  console.error("✘ Unexpected:", err);
  process.exit(1);
});
