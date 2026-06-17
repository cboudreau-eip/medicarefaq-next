import { NextRequest, NextResponse } from "next/server";
import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import {
  checkCmsAuth,
  isTotpEnabled,
  getTotpSecret,
  verifyTotp,
  verifyBackupCode,
  verifyUsername,
  verifyPassword,
  isUsernameEnabled,
} from "@/lib/cms-auth";

export const runtime = "nodejs";

/**
 * 2FA enrollment endpoint.
 *
 * Authorization (EITHER is accepted):
 *   (a) a valid CMS session (x-cms-password header), OR
 *   (b) the correct admin username + password supplied in the request.
 *
 * Path (b) exists specifically to break the chicken-and-egg problem: a brand new
 * person who has not yet paired a device cannot pass the 2FA step to reach the
 * in-app Security page, so they enroll directly from the login screen using the
 * shared admin password (which they need to use the CMS anyway). The 2FA *code*
 * is NOT required for enrollment. The raw secret is still never exposed to a
 * fully anonymous caller.
 *
 * GET  (query: ?username=&password=  OR  session header)
 *   Returns the otpauth:// provisioning URI, a QR-code PNG data URL, and the
 *   Base32 secret for manual entry.
 *
 * POST (body: { code, username?, password? })
 *   Verifies a 6-digit TOTP (or backup) code so the user can confirm pairing.
 *
 * Both refuse to operate unless 2FA is enabled and a secret is set.
 */

function buildTotp(secret: string): OTPAuth.TOTP {
  return new OTPAuth.TOTP({
    issuer: "MedicareFAQ CMS",
    label: "admin",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  });
}

/**
 * Returns true if the caller is authorized to enroll: either a valid session,
 * or a correct admin username + password pair.
 */
function isEnrollAuthorized(
  req: NextRequest,
  username: string | undefined,
  password: string | undefined
): boolean {
  // (a) Existing signed-in session / legacy password header.
  if (checkCmsAuth(req)) return true;
  // (b) Password-gated pre-login enrollment.
  const usernameOk = verifyUsername(username ?? "");
  const passwordOk = !!password && verifyPassword(password);
  return usernameOk && passwordOk;
}

export async function GET(req: NextRequest) {
  // Prefer credentials from headers (kept out of URLs/server logs); fall back
  // to query params for convenience.
  const { searchParams } = new URL(req.url);
  const username =
    req.headers.get("x-enroll-username") ?? searchParams.get("username") ?? undefined;
  const password =
    req.headers.get("x-enroll-password") ?? searchParams.get("password") ?? undefined;

  if (!isEnrollAuthorized(req, username, password)) {
    const msg = isUsernameEnabled()
      ? "Invalid username or password"
      : "Invalid password";
    return NextResponse.json({ error: msg }, { status: 401 });
  }

  if (!isTotpEnabled()) {
    return NextResponse.json(
      {
        enabled: false,
        error:
          "Two-factor authentication is not enabled on the server. Set TOTP_ENABLED=true and TOTP_SECRET to enroll.",
      },
      { status: 409 }
    );
  }

  const secret = getTotpSecret();
  if (!secret) {
    return NextResponse.json(
      { enabled: false, error: "TOTP secret is not configured on the server." },
      { status: 409 }
    );
  }

  try {
    const totp = buildTotp(secret);
    const otpauthUri = totp.toString();
    const qrDataUrl = await QRCode.toDataURL(otpauthUri, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 240,
      color: { dark: "#2b2b2b", light: "#ffffff" },
    });

    return NextResponse.json({
      enabled: true,
      issuer: "MedicareFAQ CMS",
      label: "admin",
      // Base32 secret, grouped for readability when entered manually.
      manualKey: secret.replace(/(.{4})/g, "$1 ").trim(),
      otpauthUri,
      qrDataUrl,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate enrollment QR code." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  let body: { code?: string; username?: string; password?: string } = {};
  try {
    body = await req.json().catch(() => ({}));
  } catch {
    body = {};
  }

  if (!isEnrollAuthorized(req, body.username, body.password)) {
    const msg = isUsernameEnabled()
      ? "Invalid username or password"
      : "Invalid password";
    return NextResponse.json({ verified: false, error: msg }, { status: 401 });
  }

  if (!isTotpEnabled() || !getTotpSecret()) {
    return NextResponse.json(
      { verified: false, error: "Two-factor authentication is not enabled." },
      { status: 409 }
    );
  }

  const code = typeof body?.code === "string" ? body.code : "";
  if (!code.trim()) {
    return NextResponse.json(
      { verified: false, error: "Enter the 6-digit code from your authenticator app." },
      { status: 400 }
    );
  }
  const ok = verifyTotp(code) || verifyBackupCode(code);
  if (!ok) {
    return NextResponse.json(
      {
        verified: false,
        error:
          "That code did not match. Make sure the time on your phone is correct and try the current code.",
      },
      { status: 400 }
    );
  }
  return NextResponse.json({ verified: true });
}
