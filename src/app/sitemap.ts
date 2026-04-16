import type { MetadataRoute } from "next";

const BASE_URL = "https://medicarefaq-next-nine.vercel.app";
const lastModified = new Date("2026-04-09");

/**
 * Sitemap Index — lists all sub-sitemaps.
 * Google Search Console: submit /sitemap.xml and it discovers the rest.
 *
 * Sub-sitemaps:
 *   /sitemaps/pages.xml        — core static pages
 *   /sitemaps/plans.xml        — Medigap plans, carriers, states
 *   /sitemaps/faqs.xml         — FAQ & coverage articles
 *   /sitemaps/blog.xml         — blog posts
 *   /sitemaps/enrollment.xml   — enrollment & tools pages
 *   /sitemaps/original-medicare.xml — Part A, B, D pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/sitemaps/pages.xml`,
      lastModified,
    },
    {
      url: `${BASE_URL}/sitemaps/plans.xml`,
      lastModified,
    },
    {
      url: `${BASE_URL}/sitemaps/faqs.xml`,
      lastModified,
    },
    {
      url: `${BASE_URL}/sitemaps/blog.xml`,
      lastModified,
    },
    {
      url: `${BASE_URL}/sitemaps/enrollment.xml`,
      lastModified,
    },
    {
      url: `${BASE_URL}/sitemaps/original-medicare.xml`,
      lastModified,
    },
  ];
}
