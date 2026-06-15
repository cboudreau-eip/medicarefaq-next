import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Idaho 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Idaho for 2026. Idaho birthday rule: 63-day annual switch window since 2022. Plan G starts at $201/mo. 29+ carriers analyzed.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/idaho/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Idaho 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Idaho for 2026. Idaho birthday rule: 63-day annual switch window since 2022. Plan G starts at $201/mo.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/idaho/",
    type: "website",
  },
};

export default function IdahoPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Idaho 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Idaho for 2026. Idaho birthday rule: 63-day annual switch window since 2022. Plan G starts at $201/mo. 29+ carriers analyzed.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/idaho/",
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
      { "@type": "ListItem", position: 3, name: "Idaho" },
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
