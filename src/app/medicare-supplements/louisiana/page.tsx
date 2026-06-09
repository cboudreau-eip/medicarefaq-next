import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Louisiana 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Louisiana for 2026. Louisiana has a birthday rule letting you switch plans annually. Compare Plan G rates from $111/mo in New Orleans from top carriers including Mutual of Omaha, State Farm, AARP/UHC, and more.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/louisiana/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Louisiana 2026",
    description:
      "Louisiana's birthday rule lets you switch Medigap plans every year. Compare Plan G rates from $111/mo in New Orleans from top-rated carriers.",
    url: "https://www.medicarefaq.com/medicare-supplements/louisiana/",
    type: "article",
  },
};

export default function LouisianaPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Louisiana 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Louisiana for 2026. Louisiana has a birthday rule letting you switch plans annually. Compare Plan G rates from $111/mo in New Orleans from top carriers including Mutual of Omaha, State Farm, AARP/UHC, and more.",
    url: "https://www.medicarefaq.com/medicare-supplements/louisiana/",
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
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplements/" },
      { "@type": "ListItem", position: 3, name: "Louisiana" },
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
