import { NextRequest, NextResponse } from "next/server";
import {
  isPasswordConfigured,
  isTotpEnabled,
  isUsernameEnabled,
  verifyUsername,
  verifyPassword,
  verifyTotp,
  verifyBackupCode,
  issueSessionToken,
} from "@/lib/cms-auth";

/**
 * GET /api/cms/auth
 * Reports whether a username field and/or 2FA code step should be shown.
 * Reveals no secrets.
 */
export async function GET() {
  return NextResponse.json({
    usernameRequired: isUsernameEnabled(),
    totpRequired: isTotpEnabled(),
  });
}

/**
 * POST /api/cms/auth
 * Body: { username?: string, password: string, code?: string }
 *  - If a username is configured, verifies it (factor 0).
 *  - Verifies the admin password (factor 1).
 *  - If 2FA is enabled, also verifies a TOTP code OR a backup recovery code.
 * On success returns { authenticated: true, token } where `token` is a signed
 * session token the client sends back via the `x-cms-password` header.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { username, password, code } = body as {
      username?: string;
      password?: string;
      code?: string;
    };

    if (!isPasswordConfigured()) {
      return NextResponse.json(
        { error: "CMS admin password not configured on server" },
        { status: 500 }
      );
    }

    // Factor 0: username (only enforced when a username is configured).
    // We verify username and password together and return the same generic
    // error for either failure, so we don't reveal which field was wrong.
    const usernameOk = verifyUsername(username ?? "");
    const passwordOk = !!password && verifyPassword(password);
    if (!usernameOk || !passwordOk) {
      const msg = isUsernameEnabled()
        ? "Invalid username or password"
        : "Invalid password";
      return NextResponse.json({ error: msg }, { status: 401 });
    }

    // Factor 2: TOTP (only if enabled)
    if (isTotpEnabled()) {
      if (!code) {
        // Credentials OK but no code supplied — tell the client to ask for it.
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
