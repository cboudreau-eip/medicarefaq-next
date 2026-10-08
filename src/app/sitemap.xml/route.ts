import { NextResponse } from "next/server";

const BASE_URL = "https://www.medicarefaq.com";

const childSitemaps = [
  "pages",
  "plans",
  "faqs",
  "blog",
  "enrollment",
  "original-medicare",
] as const;

export function GET() {
  const entries = childSitemaps
    .map((name) => `  <sitemap>\n    <loc>${BASE_URL}/sitemaps/${name}/</loc>\n  </sitemap>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
