import { NextResponse } from "next/server";
import { coverageArticles } from "@/lib/coverage-data";
// Import the aggregator rather than individual batches: it already spreads every
// batch, so a newly added batch lands in the sitemap automatically. Listing
// batches here previously left batches 7 through 11 out of the sitemap entirely.
import { simpleFAQArticles } from "@/lib/simple-faq-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.medicarefaq.com";
const FALLBACK_DATE = "2026-06-15T00:00:00.000Z";

/**
 * Parse a human-readable date string like "July 7, 2026" or an ISO date
 * like "2026-07-07" into an ISO 8601 timestamp string for sitemap lastmod.
 * Falls back to FALLBACK_DATE if parsing fails.
 */
function toISODate(dateStr: string | undefined): string {
  if (!dateStr) return FALLBACK_DATE;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return FALLBACK_DATE;
    return d.toISOString();
  } catch {
    return FALLBACK_DATE;
  }
}

type SitemapEntry = {
  url: string;
  lastmod: string;
  priority: string;
  changefreq: string;
};

function buildXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export function GET() {
  const entries: SitemapEntry[] = [];

  // Coverage articles — use lastReviewed (ISO) if available, else dateUpdated
  const uniqueCoverageSlugs = [...new Set(coverageArticles.map((a) => a.slug))];
  for (const slug of uniqueCoverageSlugs) {
    const article = coverageArticles.find((a) => a.slug === slug);
    const lastmod = toISODate(article?.lastReviewed ?? article?.dateUpdated);
    entries.push({
      url: `${BASE_URL}/faqs/${slug}/`,
      lastmod,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  // Simple FAQ articles (every batch) — use dateUpdated
  for (const article of simpleFAQArticles) {
    entries.push({
      url: `${BASE_URL}/faqs/${article.slug}/`,
      lastmod: toISODate(article.dateUpdated),
      priority: "0.6",
      changefreq: "monthly",
    });
  }

  return new NextResponse(buildXml(entries), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
