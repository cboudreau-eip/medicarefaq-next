import { NextRequest, NextResponse } from "next/server";
import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import {
  checkCmsAuth,
  isTotpEnabled,
  getTotpSecret,
  verifyTotp,
  verifyBackupCode,
} from "@/lib/cms-auth";

export const runtime = "nodejs";

/**
 * 2FA enrollment endpoint.
 *
 * GET /api/cms/auth/enroll
 *   Requires an authenticated session (x-cms-password header carrying a valid
 *   session token or the admin password). Returns the otpauth:// provisioning
 *   URI, a QR-code PNG data URL, and the Base32 secret for manual entry, so a
 *   new device can be paired to the shared TOTP secret.
 *
 * POST /api/cms/auth/enroll  Body: { code: string }
 *   Verifies a 6-digit TOTP (or backup) code so the user can confirm the pairing
 *   worked before relying on it. Reveals no secrets.
 *
 * Both routes refuse to operate unless 2FA is enabled and a secret is set.
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

export async function GET(req: NextRequest) {
  // Only a signed-in admin may reveal the QR / secret.
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isTotpEnabled() || !getTotpSecret()) {
    return NextResponse.json(
      { verified: false, error: "Two-factor authentication is not enabled." },
      { status: 409 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
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
        { verified: false, error: "That code did not match. Make sure the time on your phone is correct and try the current code." },
        { status: 400 }
      );
    }
    return NextResponse.json({ verified: true });
  } catch {
    return NextResponse.json({ verified: false, error: "Invalid request" }, { status: 400 });
  }
}
