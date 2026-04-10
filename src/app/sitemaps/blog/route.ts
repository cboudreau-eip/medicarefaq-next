import { NextResponse } from "next/server";

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
  /**
   * Blog sitemap — currently includes the blog index page.
   * When blog posts are added to the database or CMS, fetch them here
   * and map each post to a sitemap entry:
   *
   * const posts = await db.query.blogPosts.findMany({ ... });
   * for (const post of posts) {
   *   entries.push({ url: `${BASE_URL}/blog/${post.slug}`, ... });
   * }
   */
  const entries: SitemapEntry[] = [
    {
      url: `${BASE_URL}/blog`,
      priority: "0.7",
      changefreq: "weekly",
    },
  ];

  return new NextResponse(buildXml(entries), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
