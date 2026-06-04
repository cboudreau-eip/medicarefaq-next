import { NextResponse } from "next/server";

interface SitemapEntry {
  loc: string;
  lastmod?: string;
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
 *
 * Uses the request's own origin so it works on any deployment (preview or production).
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin; // e.g. https://medicarefaq-next-nine.vercel.app
  const type = requestUrl.searchParams.get("type") || "index";
  const sitemapPath = requestUrl.searchParams.get("sitemap") || "";

  try {
    if (type === "index") {
      // Fetch the sitemap index from our own origin
      const res = await fetch(`${origin}/sitemap.xml`, {
        cache: "no-store",
      });
      const xml = await res.text();

      // Parse sitemap index XML — Next.js generates <sitemap> wrapper for sitemap index
      const sitemaps: SitemapEntry[] = [];
      const sitemapRegex =
        /<sitemap>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?\s*<\/sitemap>/g;
      let match;
      while ((match = sitemapRegex.exec(xml)) !== null) {
        sitemaps.push({
          loc: match[1],
          lastmod: match[2] || undefined,
        });
      }

      // If the sitemap index uses <url> tags instead (Next.js MetadataRoute.Sitemap format)
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
      // Determine the full URL to fetch
      let fullUrl: string;
      if (sitemapPath.startsWith("http")) {
        // If the loc is an absolute URL, replace its origin with our own
        // (the sitemap index may reference www.medicarefaq.com but we need to fetch from ourselves)
        try {
          const parsed = new URL(sitemapPath);
          fullUrl = `${origin}${parsed.pathname}`;
        } catch {
          fullUrl = `${origin}${sitemapPath}`;
        }
      } else {
        fullUrl = `${origin}${sitemapPath}`;
      }

      const res = await fetch(fullUrl, { cache: "no-store" });
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
