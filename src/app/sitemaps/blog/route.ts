import { NextResponse } from "next/server";
import { blogArticles } from "@/lib/blog-articles-data";

const BASE_URL = "https://medicarefaq-next-nine.vercel.app";

type SitemapEntry = {
  url: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
};

function buildXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod ?? new Date().toISOString()}</lastmod>
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
    // Blog index
    {
      url: `${BASE_URL}/blog`,
      priority: "0.8",
      changefreq: "weekly",
      lastmod: new Date("2026-04-10").toISOString(),
    },
    // Individual blog posts
    ...blogArticles.map((article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      priority: article.featured ? "0.8" : "0.7",
      changefreq: "monthly" as const,
      lastmod: new Date(article.date).toISOString(),
    })),
  ];

  return new NextResponse(buildXml(entries), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
