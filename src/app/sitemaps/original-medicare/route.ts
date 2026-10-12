import { buildXml, recordContentDate, type SitemapEntry } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { partDSubPages } from "@/lib/part-d-sub-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.medicarefaq.com";



export function GET() {
  const entries: SitemapEntry[] = [
    { url: `${BASE_URL}/original-medicare/medicare-costs/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/original-medicare/medicare-coverage/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/original-medicare/medicare-eligibility/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/original-medicare/medicare-enrollment-periods/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-b-enrollment/`, priority: "0.7", changefreq: "monthly" },
    // Original Medicare overview
    { url: `${BASE_URL}/original-medicare/`, priority: "0.8", changefreq: "monthly" },
    // Part A
    { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-a/`, priority: "0.8", changefreq: "monthly" },
    // Part B
    { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-b/`, priority: "0.8", changefreq: "monthly" },
    { url: `${BASE_URL}/original-medicare/medicare-parts/apply-for-medicare-part-b/`, priority: "0.7", changefreq: "monthly" },
    // Part D index
    { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-d/`, priority: "0.8", changefreq: "monthly" },
    // Part D — Mutual of Omaha (standalone page)
    { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha/`, priority: "0.6", changefreq: "monthly" },
  ];

  // Part D sub-pages (dynamic — exclude mutual-of-omaha which has its own static page)
  for (const page of partDSubPages.filter((p) => p.slug !== "mutual-of-omaha")) {
    entries.push({
      url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-d/${page.slug}/`,
      lastmod: recordContentDate(page),
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
