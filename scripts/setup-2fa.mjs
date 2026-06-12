// One-time 2FA setup helper for the MedicareFAQ CMS.
// Generates a TOTP secret, an otpauth:// URL, a scannable QR code PNG,
// and a set of backup recovery codes.
//
// Usage:  node scripts/setup-2fa.mjs
//
// After running, copy the printed env vars into Vercel (Project > Settings >
// Environment Variables) and scan the QR PNG with your authenticator app.

import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ISSUER = "MedicareFAQ CMS";
const LABEL = "admin";

// 1) Generate a random base32 secret (160-bit, standard for TOTP)
const secret = new OTPAuth.Secret({ size: 20 });

const totp = new OTPAuth.TOTP({
  issuer: ISSUER,
  label: LABEL,
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret,
});

const otpauthUrl = totp.toString();
const base32Secret = secret.base32;

// 2) Generate backup recovery codes (8 codes, hashed for storage)
function genBackupCode() {
  // 10 hex chars, grouped as xxxxx-xxxxx for readability
  const raw = crypto.randomBytes(5).toString("hex"); // 10 hex chars
  return `${raw.slice(0, 5)}-${raw.slice(5)}`;
}
const backupPlain = Array.from({ length: 8 }, genBackupCode);
// Store only SHA-256 hashes server-side; user keeps the plaintext.
const backupHashes = backupPlain.map((c) =>
  crypto.createHash("sha256").update(c).digest("hex")
);

// 3) Write the QR code PNG
const outDir = path.join(process.cwd(), "scripts", "2fa-setup");
fs.mkdirSync(outDir, { recursive: true });
const qrPath = path.join(outDir, "cms-2fa-qr.png");
await QRCode.toFile(qrPath, otpauthUrl, { width: 400, margin: 2 });

// 4) Print everything
console.log("\n=== MedicareFAQ CMS — 2FA Setup ===\n");
console.log("QR code PNG written to:", qrPath);
console.log("\n--- Scan this QR with Google/Microsoft Authenticator, Authy, or 1Password ---");
console.log("If you can't scan, manually enter this secret (base32):\n");
console.log("  " + base32Secret + "\n");
console.log("otpauth URL:\n  " + otpauthUrl + "\n");

console.log("=== Add these to Vercel Environment Variables ===\n");
console.log("TOTP_ENABLED=true");
console.log("TOTP_SECRET=" + base32Secret);
console.log("TOTP_BACKUP_HASHES=" + backupHashes.join(","));
console.log("AUTH_SESSION_SECRET=" + crypto.randomBytes(32).toString("hex"));
console.log("");

console.log("=== Backup recovery codes (store these somewhere safe!) ===");
console.log("Each code works ONCE if you lose your authenticator.\n");
backupPlain.forEach((c) => console.log("  " + c));
console.log("");

// Also save a local copy of the human-facing info (NOT committed)
const infoPath = path.join(outDir, "SETUP-INFO.txt");
fs.writeFileSync(
  infoPath,
  [
    "MedicareFAQ CMS 2FA setup",
    "",
    "Scan cms-2fa-qr.png with your authenticator app.",
    "Manual secret (base32): " + base32Secret,
    "otpauth URL: " + otpauthUrl,
    "",
    "=== Vercel env vars ===",
    "TOTP_ENABLED=true",
    "TOTP_SECRET=" + base32Secret,
    "TOTP_BACKUP_HASHES=" + backupHashes.join(","),
    "",
    "=== Backup recovery codes (one-time use each) ===",
    ...backupPlain,
  ].join("\n"),
  "utf8"
);
console.log("Local info file:", infoPath, "\n");
