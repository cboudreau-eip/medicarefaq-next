import { NextResponse } from "next/server";
import { MEDIGAP_PLANS } from "@/lib/medigap-plan-data";
import { CARRIER_DATA } from "@/lib/medigap-carrier-data";
import { STATE_DATA } from "@/lib/medigap-state-data";
import { MEDICARE_ADVANTAGE_PAGES } from "@/lib/medicare-advantage-sub-data";
import { CAREGIVER_PAGES } from "@/lib/caregiver-guide-data";

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

  // Medigap plan letter pages
  for (const plan of Object.values(MEDIGAP_PLANS)) {
    entries.push({
      url: `${BASE_URL}/medicare-supplements/${plan.slug}`,
      priority: "0.8",
      changefreq: "monthly",
    });
  }

  // Carrier pages
  for (const carrier of CARRIER_DATA) {
    entries.push({
      url: `${BASE_URL}/medicare-supplements/medigap-by-carrier/${carrier.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  // State pages
  for (const state of STATE_DATA) {
    entries.push({
      url: `${BASE_URL}/medicare-supplements/medigap-by-state/${state.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  // Medicare Advantage sub-pages
  for (const page of MEDICARE_ADVANTAGE_PAGES) {
    entries.push({
      url: `${BASE_URL}/medicare-part-c/${page.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  // Caregiver guide sub-pages
  for (const page of CAREGIVER_PAGES.filter((p) => p.slug !== "")) {
    entries.push({
      url: `${BASE_URL}/guide-to-being-a-caregiver/${page.slug}`,
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
