import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Montana 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Montana for 2026. See Plan G rates from top carriers, state-specific rules, and get free quotes.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/montana/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Montana 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Montana for 2026. See Plan G rates from top carriers, state-specific rules, and get free quotes.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/montana/",
    siteName: "MedicareFAQ",
    type: "website",
  },
};

export default function MontanaPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Montana 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Montana for 2026. See Plan G rates from top carriers, state-specific rules, and get free quotes.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/montana/",
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
      { "@type": "ListItem", position: 3, name: "Montana" },
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
