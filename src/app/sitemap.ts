import type { MetadataRoute } from "next";
import { MEDIGAP_PLANS } from "@/lib/medigap-plan-data";
import { CARRIER_DATA } from "@/lib/medigap-carrier-data";
import { STATE_DATA } from "@/lib/medigap-state-data";
import { partDSubPages } from "@/lib/part-d-sub-data";
import { CAREGIVER_PAGES } from "@/lib/caregiver-guide-data";
import { MEDICARE_ADVANTAGE_PAGES } from "@/lib/medicare-advantage-sub-data";
import { coverageArticles } from "@/lib/coverage-data";
import { simpleFAQBatch1 } from "@/lib/simple-faq-data-batch1";
import { simpleFAQBatch2 } from "@/lib/simple-faq-data-batch2";
import { simpleFAQBatch3 } from "@/lib/simple-faq-data-batch3";
import { simpleFAQBatch4 } from "@/lib/simple-faq-data-batch4";
import { simpleFAQBatch5 } from "@/lib/simple-faq-data-batch5";

const BASE_URL = "https://www.medicarefaq.com";
const lastModified = new Date("2026-04-09");

// All static routes
const staticRoutes: MetadataRoute.Sitemap = [
  // Core pages
  { url: BASE_URL, lastModified, changeFrequency: "daily", priority: 1.0 },
  { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/about-us`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/about-us/jagger-esch`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/meet-the-editorial-team`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/client-care-team`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/testimonials`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE_URL}/terms-of-use`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE_URL}/scholarship-opportunities`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/third-party-partners`, lastModified, changeFrequency: "monthly", priority: 0.4 },

  // New To Medicare
  { url: `${BASE_URL}/medicare-101`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/new-to-medicare/eligibility`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/new-to-medicare/turning-65`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/new-to-medicare/costs`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/new-to-medicare/checklist`, lastModified, changeFrequency: "monthly", priority: 0.7 },

  // Medicare Plans
  { url: `${BASE_URL}/medicare-supplements`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/medicare-supplements/compare`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/medicare-supplements/medigap-eligibility`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/medicare-supplements/medicare-supplement-plans-2026`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/medicare-supplements/medigap-by-carrier`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/medicare-supplements/medigap-by-state`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/compare-rates`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/medicare-plans/costs`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/medicare-plans/supplement-vs-advantage`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/medicare-plans/best-supplement-plans`, lastModified, changeFrequency: "monthly", priority: 0.8 },

  // Medicare Part C / Advantage
  { url: `${BASE_URL}/medicare-part-c/medicare-advantage-plans`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/medicare-part-c/medicare-advantage-plan-types`, lastModified, changeFrequency: "monthly", priority: 0.7 },

  // Enrollment
  { url: `${BASE_URL}/enrollment/turning-65`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/enrollment/working-past-65`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/enrollment/annual-changes`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/enrollment/late-penalties`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/enrollment/how-to-enroll`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/tools/enrollment-timeline`, lastModified, changeFrequency: "monthly", priority: 0.7 },

  // Original Medicare
  { url: `${BASE_URL}/original-medicare`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-a`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-b`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/original-medicare/medicare-parts/apply-for-medicare-part-b`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-d`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha`, lastModified, changeFrequency: "monthly", priority: 0.6 },

  // Coverage / FAQs index
  { url: `${BASE_URL}/faqs`, lastModified, changeFrequency: "weekly", priority: 0.8 },

  // Library / Resources
  { url: `${BASE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE_URL}/library/guides`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/library/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/podcasts`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/videos`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/search`, lastModified, changeFrequency: "monthly", priority: 0.5 },

  // Caregiver Guide index
  { url: `${BASE_URL}/guide-to-being-a-caregiver`, lastModified, changeFrequency: "monthly", priority: 0.7 },

  // Seniors Guide
  { url: `${BASE_URL}/seniors-guide-to-medicare-gov/tools-and-resources`, lastModified, changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Medigap plan pages
  const planPages: MetadataRoute.Sitemap = Object.values(MEDIGAP_PLANS)
    .map((plan) => ({
      url: `${BASE_URL}/medicare-supplements/${plan.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // Carrier pages
  const carrierPages: MetadataRoute.Sitemap = CARRIER_DATA.map((carrier) => ({
    url: `${BASE_URL}/medicare-supplements/medigap-by-carrier/${carrier.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // State pages
  const statePages: MetadataRoute.Sitemap = STATE_DATA.map((state) => ({
    url: `${BASE_URL}/medicare-supplements/medigap-by-state/${state.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Part D sub-pages (exclude mutual-of-omaha which has its own static page)
  const partDPages: MetadataRoute.Sitemap = partDSubPages
    .filter((p) => p.slug !== "mutual-of-omaha")
    .map((page) => ({
      url: `${BASE_URL}/original-medicare/medicare-parts/medicare-part-d/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // Caregiver guide sub-pages
  const caregiverPages: MetadataRoute.Sitemap = CAREGIVER_PAGES
    .filter((p) => p.slug !== "")
    .map((page) => ({
      url: `${BASE_URL}/guide-to-being-a-caregiver/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  // Medicare Advantage sub-pages
  const maPages: MetadataRoute.Sitemap = MEDICARE_ADVANTAGE_PAGES.map((page) => ({
    url: `${BASE_URL}/medicare-part-c/${page.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Coverage articles (unique slugs only)
  const uniqueCoverageSlugs = [...new Set(coverageArticles.map((a) => a.slug))];
  const coveragePages: MetadataRoute.Sitemap = uniqueCoverageSlugs.map((slug) => ({
    url: `${BASE_URL}/faqs/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Simple FAQ articles
  const allSimpleFAQs = [
    ...simpleFAQBatch1,
    ...simpleFAQBatch2,
    ...simpleFAQBatch3,
    ...simpleFAQBatch4,
    ...simpleFAQBatch5,
  ];
  const simpleFAQPages: MetadataRoute.Sitemap = allSimpleFAQs.map((article) => ({
    url: `${BASE_URL}/faqs/${article.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...planPages,
    ...carrierPages,
    ...statePages,
    ...partDPages,
    ...caregiverPages,
    ...maPages,
    ...coveragePages,
    ...simpleFAQPages,
  ];
}
