import { NextResponse } from "next/server";

const BASE_URL = "https://www.medicarefaq.com";
const lastModified = new Date("2026-04-09").toISOString();

const pages = [
  // Core
  { url: BASE_URL, priority: "1.0", changefreq: "daily" },
  { url: `${BASE_URL}/contact`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/about-us`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE_URL}/about-us/jagger-esch`, priority: "0.5", changefreq: "monthly" },
  { url: `${BASE_URL}/meet-the-editorial-team`, priority: "0.5", changefreq: "monthly" },
  { url: `${BASE_URL}/client-care-team`, priority: "0.5", changefreq: "monthly" },
  { url: `${BASE_URL}/testimonials`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE_URL}/privacy-policy`, priority: "0.3", changefreq: "yearly" },
  { url: `${BASE_URL}/terms-of-use`, priority: "0.3", changefreq: "yearly" },
  { url: `${BASE_URL}/scholarship-opportunities`, priority: "0.5", changefreq: "monthly" },
  { url: `${BASE_URL}/third-party-partners`, priority: "0.4", changefreq: "monthly" },
  // New To Medicare
  { url: `${BASE_URL}/medicare-101`, priority: "0.9", changefreq: "monthly" },
  { url: `${BASE_URL}/new-to-medicare/eligibility`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/new-to-medicare/turning-65`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/new-to-medicare/costs`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/new-to-medicare/checklist`, priority: "0.7", changefreq: "monthly" },
  // Supplement index pages
  { url: `${BASE_URL}/medicare-supplements`, priority: "0.9", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-supplements/compare`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-supplements/medigap-eligibility`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-supplements/medicare-supplement-plans-2026`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-supplements/medigap-by-carrier`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-supplements/medigap-by-state`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/compare-rates`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-plans/costs`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-plans/supplement-vs-advantage`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-plans/best-supplement-plans`, priority: "0.8", changefreq: "monthly" },
  // Medicare Advantage
  { url: `${BASE_URL}/medicare-part-c/medicare-advantage-plans`, priority: "0.8", changefreq: "monthly" },
  { url: `${BASE_URL}/medicare-part-c/medicare-advantage-plan-types`, priority: "0.7", changefreq: "monthly" },
  // Library / Resources
  { url: `${BASE_URL}/faqs`, priority: "0.8", changefreq: "weekly" },
  { url: `${BASE_URL}/blog`, priority: "0.7", changefreq: "weekly" },
  { url: `${BASE_URL}/library/guides`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE_URL}/library/about`, priority: "0.5", changefreq: "monthly" },
  { url: `${BASE_URL}/podcasts`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE_URL}/videos`, priority: "0.6", changefreq: "monthly" },
  { url: `${BASE_URL}/search`, priority: "0.5", changefreq: "monthly" },
  // Caregiver Guide
  { url: `${BASE_URL}/guide-to-being-a-caregiver`, priority: "0.7", changefreq: "monthly" },
  // Seniors Guide
  { url: `${BASE_URL}/seniors-guide-to-medicare-gov/tools-and-resources`, priority: "0.6", changefreq: "monthly" },
];

function buildXml(entries: typeof pages): string {
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
  return new NextResponse(buildXml(pages), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
