import { NextResponse } from "next/server";
import { coverageArticles } from "@/lib/coverage-data";
import { simpleFAQBatch1 } from "@/lib/simple-faq-data-batch1";
import { simpleFAQBatch2 } from "@/lib/simple-faq-data-batch2";
import { simpleFAQBatch3 } from "@/lib/simple-faq-data-batch3";
import { simpleFAQBatch4 } from "@/lib/simple-faq-data-batch4";
import { simpleFAQBatch5 } from "@/lib/simple-faq-data-batch5";
import { simpleFAQBatch6 } from "@/lib/simple-faq-data-batch6";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.medicarefaq.com";
const lastModified = new Date("2026-04-09").toISOString();

type SitemapEntry = {
  url: string;
  priority: string;
  changefreq: string;
};

function buildXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${lastModified}</lastmod>
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

  // Coverage articles (rich format — deduplicated)
  const uniqueCoverageSlugs = [...new Set(coverageArticles.map((a) => a.slug))];
  for (const slug of uniqueCoverageSlugs) {
    entries.push({
      url: `${BASE_URL}/faqs/${slug}`,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  // Simple FAQ articles (all 6 batches)
  const allSimpleFAQs = [
    ...simpleFAQBatch1,
    ...simpleFAQBatch2,
    ...simpleFAQBatch3,
    ...simpleFAQBatch4,
    ...simpleFAQBatch5,
    ...simpleFAQBatch6,
  ];
  for (const article of allSimpleFAQs) {
    entries.push({
      url: `${BASE_URL}/faqs/${article.slug}`,
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
