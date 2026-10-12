import { buildXml, type SitemapEntry } from "@/lib/sitemap";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.medicarefaq.com";



export function GET() {
  const entries: SitemapEntry[] = [
    { url: `${BASE_URL}/medicare-open-enrollment/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-enrollment/turning-65/`, priority: "0.8", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-enrollment/working-past-65/`, priority: "0.8", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-enrollment/annual-changes/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-enrollment/late-penalties/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/medicare-enrollment/how-to-enroll/`, priority: "0.8", changefreq: "monthly" },
    { url: `${BASE_URL}/tools/enrollment-timeline/`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/tools/part-b-penalty-calculator/`, priority: "0.8", changefreq: "monthly" },
  ];

  return new NextResponse(buildXml(entries), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
