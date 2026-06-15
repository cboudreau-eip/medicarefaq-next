import crypto from "node:crypto";
import * as OTPAuth from "otpauth";

/**
 * Shared CMS authentication helpers.
 *
 * Auth model (backwards compatible):
 *  - Factor 1: shared admin password (CMS_ADMIN_PASSWORD)
 *  - Factor 2 (optional): TOTP code from an authenticator app (TOTP_SECRET),
 *    enabled only when TOTP_ENABLED === "true".
 *  - Backup recovery codes: SHA-256 hashes in TOTP_BACKUP_HASHES (comma-sep).
 *
 * After a successful login, the server issues a short-lived signed session
 * token (HMAC with AUTH_SESSION_SECRET). The client sends this token back in
 * the existing `x-cms-password` header. Protected routes accept EITHER:
 *   (a) a valid session token, OR
 *   (b) the raw admin password (legacy / when 2FA is disabled).
 * This means existing routes keep working without modification.
 */

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
// Optional shared username. When unset, login is password-only (legacy behavior)
// and the username field is ignored — so nothing breaks until it is configured.
const CMS_USERNAME = (process.env.CMS_ADMIN_USERNAME ?? "").trim();
const TOTP_ENABLED = (process.env.TOTP_ENABLED ?? "").toLowerCase() === "true";
const TOTP_SECRET = process.env.TOTP_SECRET ?? "";
const BACKUP_HASHES = (process.env.TOTP_BACKUP_HASHES ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
// Fall back to the admin password as the signing key if no dedicated secret is set.
const SESSION_SECRET =
  process.env.AUTH_SESSION_SECRET || CMS_PASSWORD || "insecure-dev-secret";

const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export function isTotpEnabled(): boolean {
  return TOTP_ENABLED && !!TOTP_SECRET;
}

export function isPasswordConfigured(): boolean {
  return !!CMS_PASSWORD;
}

/** Whether a shared username is configured (enables the username field). */
export function isUsernameEnabled(): boolean {
  return !!CMS_USERNAME;
}

/**
 * Verify the username (case-insensitive, trimmed).
 * If no username is configured, this always returns true so the system
 * remains backward compatible with the password-only flow.
 */
export function verifyUsername(username: string): boolean {
  if (!CMS_USERNAME) return true; // username not enabled -> accept anything
  const clean = (username || "").trim().toLowerCase();
  return safeEqual(clean, CMS_USERNAME.toLowerCase());
}

/** Constant-time string comparison. */
function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function verifyPassword(password: string): boolean {
  if (!CMS_PASSWORD) return false;
  return safeEqual(password, CMS_PASSWORD);
}

/** Verify a 6-digit TOTP code against the shared secret (±1 step window). */
export function verifyTotp(code: string): boolean {
  if (!TOTP_SECRET) return false;
  const clean = (code || "").replace(/\s+/g, "");
  if (!/^\d{6}$/.test(clean)) return false;
  const totp = new OTPAuth.TOTP({
    issuer: "MedicareFAQ CMS",
    label: "admin",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(TOTP_SECRET),
  });
  // window: 1 step (±30s) tolerance for clock drift
  const delta = totp.validate({ token: clean, window: 1 });
  return delta !== null;
}

/** Verify a backup recovery code against the stored SHA-256 hashes. */
export function verifyBackupCode(code: string): boolean {
  if (!BACKUP_HASHES.length) return false;
  const clean = (code || "").trim().toLowerCase();
  if (!clean) return false;
  const hash = crypto.createHash("sha256").update(clean).digest("hex");
  return BACKUP_HASHES.some((h) => safeEqual(h, hash));
}

/**
 * Issue a signed session token: base64url(payload).hmac
 * payload = { exp }  (no secrets embedded)
 */
export function issueSessionToken(): string {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS });
  const b64 = Buffer.from(payload).toString("base64url");
  const sig = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(b64)
    .digest("base64url");
  return `v1.${b64}.${sig}`;
}

/** Validate a session token's signature and expiry. */
export function verifySessionToken(token: string): boolean {
  if (!token || !token.startsWith("v1.")) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [, b64, sig] = parts;
  const expected = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(b64)
    .digest("base64url");
  if (!safeEqual(sig, expected)) return false;
  try {
    const payload = JSON.parse(Buffer.from(b64, "base64url").toString("utf8"));
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * The single auth check used by protected routes.
 * Accepts a valid session token OR the raw admin password.
 * Reads the `x-cms-password` header (kept for backwards compatibility).
 */
export function checkCmsAuth(request: Request): boolean {
  const value = request.headers.get("x-cms-password") ?? "";
  if (!value) return false;
  if (verifySessionToken(value)) return true;
  // Legacy / 2FA-disabled path: accept the raw password.
  return verifyPassword(value);
}
