import { NextResponse } from "next/server";

/**
 * GET /api/shopper-approved
 * Fetches aggregate review data from Shopper Approved API and caches it.
 * Returns { totalReviews: number, averageRating: number, stars: { 1: n, 2: n, ... } }
 *
 * Uses Next.js fetch revalidation (1 hour) so the data stays fresh
 * without hammering the SA API on every page load.
 */

const SITE_ID = process.env.SHOPPER_APPROVED_SITE_ID ?? "";
const TOKEN = process.env.SHOPPER_APPROVED_TOKEN ?? "";

// Fallback values in case the API is unreachable
const FALLBACK = {
  totalReviews: 3675,
  averageRating: 5.0,
  stars: { 5: 3550, 4: 110, 3: 12, 2: 1, 1: 2 },
};

export async function GET() {
  if (!SITE_ID || !TOKEN) {
    // Return fallback if credentials are not configured
    return NextResponse.json(FALLBACK, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
  }

  try {
    const res = await fetch(
      `https://api.shopperapproved.com/aggregates/reviews/${SITE_ID}?token=${TOKEN}&xml=false`,
      { next: { revalidate: 3600 } } // revalidate every hour
    );

    if (!res.ok) {
      console.error(`Shopper Approved API error: ${res.status} ${res.statusText}`);
      return NextResponse.json(FALLBACK, {
        headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
      });
    }

    const data = await res.json();

    const result = {
      totalReviews: data.total_reviews ?? FALLBACK.totalReviews,
      averageRating: data.average_rating ?? FALLBACK.averageRating,
      stars: {
        5: data["5_star"] ?? 0,
        4: data["4_star"] ?? 0,
        3: data["3_star"] ?? 0,
        2: data["2_star"] ?? 0,
        1: data["1_star"] ?? 0,
      },
    };

    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
  } catch (error) {
    console.error("Shopper Approved API fetch failed:", error);
    return NextResponse.json(FALLBACK, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
  }
}
