import { NextRequest, NextResponse } from "next/server";
import {
  isPasswordConfigured,
  isTotpEnabled,
  verifyPassword,
  verifyTotp,
  verifyBackupCode,
  issueSessionToken,
} from "@/lib/cms-auth";

/**
 * GET /api/cms/auth
 * Reports whether 2FA is required, so the login UI knows whether to
 * show the 6-digit code step. Reveals no secrets.
 */
export async function GET() {
  return NextResponse.json({ totpRequired: isTotpEnabled() });
}

/**
 * POST /api/cms/auth
 * Body: { password: string, code?: string }
 *  - Verifies the admin password (factor 1).
 *  - If 2FA is enabled, also verifies a TOTP code OR a backup recovery code.
 * On success returns { authenticated: true, token } where `token` is a signed
 * session token the client sends back via the `x-cms-password` header.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { password, code } = body as { password?: string; code?: string };

    if (!isPasswordConfigured()) {
      return NextResponse.json(
        { error: "CMS admin password not configured on server" },
        { status: 500 }
      );
    }

    // Factor 1: password
    if (!password || !verifyPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Factor 2: TOTP (only if enabled)
    if (isTotpEnabled()) {
      if (!code) {
        // Password OK but no code supplied — tell the client to ask for it.
        return NextResponse.json(
          { error: "2FA code required", totpRequired: true },
          { status: 401 }
        );
      }
      const okTotp = verifyTotp(code);
      const okBackup = okTotp ? false : verifyBackupCode(code);
      if (!okTotp && !okBackup) {
        return NextResponse.json(
          { error: "Invalid 2FA code", totpRequired: true },
          { status: 401 }
        );
      }
    }

    const token = issueSessionToken();
    return NextResponse.json({ authenticated: true, token });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
