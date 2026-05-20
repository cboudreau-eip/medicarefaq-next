import { NextRequest, NextResponse } from "next/server";

const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";

/**
 * POST /api/cms/auth
 * Validates the CMS admin password sent in the request body.
 * Returns { authenticated: true } on success, 401 on failure.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!CMS_PASSWORD) {
      return NextResponse.json(
        { error: "CMS admin password not configured on server" },
        { status: 500 }
      );
    }

    if (!password || password !== CMS_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json({ authenticated: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
