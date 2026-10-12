import { buildXml, latestContentDate, type SitemapEntry } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { coverageArticles } from "@/lib/coverage-data";
// Import the aggregator rather than individual batches: it already spreads every
// batch, so a newly added batch lands in the sitemap automatically. Listing
// batches here previously left batches 7 through 11 out of the sitemap entirely.
import { simpleFAQArticles } from "@/lib/simple-faq-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.medicarefaq.com";


export function GET() {
  const entries: SitemapEntry[] = [];

  // Coverage articles — use the newest recorded review or update date
  const uniqueCoverageSlugs = [...new Set(coverageArticles.map((a) => a.slug))];
  for (const slug of uniqueCoverageSlugs) {
    const article = coverageArticles.find((a) => a.slug === slug);
    const lastmod = latestContentDate(article?.lastReviewed, article?.dateUpdated);
    entries.push({
      url: `${BASE_URL}/faqs/${slug}/`,
      lastmod,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  // Simple FAQ articles (every batch) — skip slugs already served by coverage articles
  const seenSlugs = new Set(uniqueCoverageSlugs);
  for (const article of simpleFAQArticles) {
    if (seenSlugs.has(article.slug)) continue;
    seenSlugs.add(article.slug);
    entries.push({
      url: `${BASE_URL}/faqs/${article.slug}/`,
      lastmod: latestContentDate(article.dateUpdated),
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
