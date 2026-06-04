import { NextResponse } from "next/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://medicarefaq-next-nine.vercel.app";

interface SitemapIndex {
  sitemaps: {
    loc: string;
    lastmod?: string;
  }[];
}

interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

/**
 * GET /api/cms/sitemap-data
 * Query params:
 *   - type=index  → returns the sitemap index (list of sub-sitemaps)
 *   - type=urls&sitemap=<path>  → returns all URLs in a specific sub-sitemap
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "index";
  const sitemapPath = searchParams.get("sitemap") || "";

  try {
    if (type === "index") {
      // Fetch the sitemap index
      const res = await fetch(`${SITE_URL}/sitemap.xml`, {
        next: { revalidate: 0 },
      });
      const xml = await res.text();

      // Parse sitemap index XML
      const sitemaps: SitemapIndex["sitemaps"] = [];
      const sitemapRegex =
        /<sitemap>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?\s*<\/sitemap>/g;
      let match;
      while ((match = sitemapRegex.exec(xml)) !== null) {
        sitemaps.push({
          loc: match[1],
          lastmod: match[2] || undefined,
        });
      }

      // If the sitemap index uses <url> tags instead (Next.js MetadataRoute.Sitemap)
      if (sitemaps.length === 0) {
        const urlRegex =
          /<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?\s*(?:<changefreq>[^<]*<\/changefreq>\s*)?(?:<priority>[^<]*<\/priority>\s*)?<\/url>/g;
        while ((match = urlRegex.exec(xml)) !== null) {
          sitemaps.push({
            loc: match[1],
            lastmod: match[2] || undefined,
          });
        }
      }

      return NextResponse.json({ sitemaps });
    }

    if (type === "urls" && sitemapPath) {
      // Fetch a specific sub-sitemap
      const fullUrl = sitemapPath.startsWith("http")
        ? sitemapPath
        : `${SITE_URL}${sitemapPath}`;
      const res = await fetch(fullUrl, { next: { revalidate: 0 } });
      const xml = await res.text();

      // Parse URL entries
      const urls: SitemapUrlEntry[] = [];
      const urlRegex =
        /<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?(?:\s*<changefreq>([^<]+)<\/changefreq>)?(?:\s*<priority>([^<]+)<\/priority>)?\s*<\/url>/g;
      let match;
      while ((match = urlRegex.exec(xml)) !== null) {
        urls.push({
          loc: match[1],
          lastmod: match[2] || undefined,
          changefreq: match[3] || undefined,
          priority: match[4] || undefined,
        });
      }

      return NextResponse.json({ urls, total: urls.length });
    }

    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
