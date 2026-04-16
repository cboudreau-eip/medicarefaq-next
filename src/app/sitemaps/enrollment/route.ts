import { NextResponse } from "next/server";

const BASE_URL = "https://medicarefaq-next-nine.vercel.app";
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
    { url: `${BASE_URL}/enrollment/turning-65`, priority: "0.8", changefreq: "monthly" },
    { url: `${BASE_URL}/enrollment/working-past-65`, priority: "0.8", changefreq: "monthly" },
    { url: `${BASE_URL}/enrollment/annual-changes`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/enrollment/late-penalties`, priority: "0.7", changefreq: "monthly" },
    { url: `${BASE_URL}/enrollment/how-to-enroll`, priority: "0.8", changefreq: "monthly" },
    { url: `${BASE_URL}/tools/enrollment-timeline`, priority: "0.7", changefreq: "monthly" },
  ];

  return new NextResponse(buildXml(entries), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
