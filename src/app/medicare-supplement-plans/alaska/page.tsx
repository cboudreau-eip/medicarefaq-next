import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Alaska 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Alaska for 2026. No Medicare Advantage available in Alaska. Plan G starts at $137/mo in Anchorage. We ranked 5 top carriers including Premera BCBS of Alaska.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/alaska/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Alaska 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Alaska for 2026. No Medicare Advantage available in Alaska. Plan G starts at $137/mo in Anchorage.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/alaska/",
    type: "article",
  },
};

export default function AlaskaPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Alaska 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Alaska for 2026. No Medicare Advantage available in Alaska. Plan G starts at $137/mo in Anchorage. We ranked 5 top carriers including Premera BCBS of Alaska.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/alaska/",
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
      { "@type": "ListItem", position: 3, name: "Alaska" },
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
