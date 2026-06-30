import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in New Jersey 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in New Jersey for 2026. See top-rated carriers, premiums from $139/mo, under-65 coverage rules, and state regulations.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/new-jersey/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in New Jersey 2026",
    description:
      "Compare top Medigap carriers in New Jersey. AARP/UHC dominates with 47% market share. See premiums from $139/mo, Horizon BCBS NJ, and under-65 coverage requirements.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/new-jersey/",
    type: "article",
  },
};

export default function NewJerseyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in New Jersey 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in New Jersey for 2026. See top-rated carriers, premiums from $139/mo, under-65 coverage rules, and state regulations.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/new-jersey/",
    dateModified: "2026-01-01",
    author: { "@type": "Organization", name: "MedicareFAQ" },
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-logo.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/" },
      { "@type": "ListItem", position: 3, name: "New Jersey" },
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
