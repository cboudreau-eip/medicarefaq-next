import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/validate-zip?zip=XXXXX
 * Server-side proxy for zippopotam.us to avoid CORS issues in the browser.
 * Returns { valid: true, city: string, state: string } or { valid: false }.
 */
export async function GET(request: NextRequest) {
  const zip = request.nextUrl.searchParams.get("zip") ?? "";

  // Basic format check
  if (!/^\d{5}$/.test(zip)) {
    return NextResponse.json({ valid: false }, { status: 200 });
  }

  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`, {
      next: { revalidate: 86400 }, // cache for 24h — ZIP→city mapping rarely changes
    });

    if (!res.ok) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    const data = await res.json();
    const place = data?.places?.[0];

    if (!place || !place["place name"] || !place["state abbreviation"]) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    return NextResponse.json({
      valid: true,
      city: place["place name"],
      state: place["state abbreviation"],
    });
  } catch {
    // If the upstream API is unreachable, fail closed (invalid) rather than open
    return NextResponse.json({ valid: false }, { status: 200 });
  }
}
