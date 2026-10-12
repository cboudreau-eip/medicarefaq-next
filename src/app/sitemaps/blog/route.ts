import { buildXml, latestContentDate, type SitemapEntry } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { blogArticles } from "@/lib/blog-articles-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.medicarefaq.com";



export function GET() {
  const entries: SitemapEntry[] = [
    // Blog index
    {
      url: `${BASE_URL}/blog/`,
      priority: "0.8",
      changefreq: "weekly",
      lastmod: latestContentDate(...blogArticles.filter(a => !a.draft).map(a => latestContentDate(a.dateUpdated, a.date))),
    },
    // Individual blog posts (exclude drafts)
    ...blogArticles.filter((a) => !a.draft).map((article) => ({
      url: `${BASE_URL}/blog/${article.slug}/`,
      priority: article.featured ? "0.8" : "0.7",
      changefreq: "monthly" as const,
      lastmod: latestContentDate(article.dateUpdated, article.date),
    })),
  ];

  return new NextResponse(buildXml(entries), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
