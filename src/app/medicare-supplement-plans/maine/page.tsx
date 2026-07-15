import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Maine 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Maine for 2026. Maine requires community rating and year-round guaranteed issue. Medco Containment offers Plan G from $235/mo. Free quotes from 30+ carriers.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/maine/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Maine 2026 | MedicareFAQ",
    description:
      "Maine requires community rating (same premium at any age) and year-round guaranteed issue. Compare top carriers including Medco Containment, State Farm, and Mutual of Omaha.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/maine/",
    type: "website",
  },
};

export default function MainePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Maine 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Maine for 2026. Maine requires community rating and year-round guaranteed issue. Medco Containment offers Plan G from $235/mo. Free quotes from 30+ carriers.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/maine/",
    dateModified: "2026-01-01",
    author: { "@type": "Organization", name: "MedicareFAQ" },
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/" },
      { "@type": "ListItem", position: 3, name: "Maine" },
    ],
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageContent />
    </SiteLayout>
  );
}
