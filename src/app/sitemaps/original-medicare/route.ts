import { NextResponse } from "next/server";
import { partDSubPages } from "@/lib/part-d-sub-data";

const BASE_URL = "https://www.medicarefaq.com";
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
  const entries: SitemapEntry[] = [
    // Original Medicare overview
    { url: `${BASE_URL}/original-medicare`, priority: "0.8", changefreq: "monthly" },
    // Part A
    { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-a`, priority: "0.8", changefreq: "monthly" },
    // Part B
    { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-b`, priority: "0.8", changefreq: "monthly" },
    { url: `${BASE_URL}/original-medicare/medicare-parts/apply-for-medicare-part-b`, priority: "0.7", changefreq: "monthly" },
    // Part D index
    { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-d`, priority: "0.8", changefreq: "monthly" },
    // Part D — Mutual of Omaha (standalone page)
    { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha`, priority: "0.6", changefreq: "monthly" },
  ];

  // Part D sub-pages (dynamic — exclude mutual-of-omaha which has its own static page)
  for (const page of partDSubPages.filter((p) => p.slug !== "mutual-of-omaha")) {
    entries.push({
      url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-d/${page.slug}`,
      priority: "0.7",
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
