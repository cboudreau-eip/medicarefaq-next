import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.medicarefaq.com";
const lastModified = new Date("2026-04-09");

/**
 * Sitemap Index — lists all sub-sitemaps.
 * Google Search Console: submit /sitemap.xml and it discovers the rest.
 *
 * Sub-sitemaps:
 *   /sitemaps/pages        — core static pages
 *   /sitemaps/plans        — Medigap plans, carriers, states
 *   /sitemaps/faqs         — FAQ & coverage articles
 *   /sitemaps/blog         — blog posts
 *   /sitemaps/enrollment   — enrollment & tools pages
 *   /sitemaps/original-medicare — Part A, B, D pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/sitemaps/pages`,
      lastModified,
    },
    {
      url: `${BASE_URL}/sitemaps/plans`,
      lastModified,
    },
    {
      url: `${BASE_URL}/sitemaps/faqs`,
      lastModified,
    },
    {
      url: `${BASE_URL}/sitemaps/blog`,
      lastModified,
    },
    {
      url: `${BASE_URL}/sitemaps/enrollment`,
      lastModified,
    },
    {
      url: `${BASE_URL}/sitemaps/original-medicare`,
      lastModified,
    },
  ];
}
