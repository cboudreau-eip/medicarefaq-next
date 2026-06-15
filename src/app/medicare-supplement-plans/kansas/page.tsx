import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Kansas 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Kansas for 2026. Farm Bureau Insurance offers Plan G from $141/mo and Plan N from $103/mo. No birthday rule. Free quotes from 35+ carriers.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/kansas/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Kansas 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Kansas for 2026. Farm Bureau Insurance offers Plan G from $141/mo. BCBS Kansas Plan K at $85/mo. No birthday rule.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/kansas/",
    type: "website",
  },
};

export default function KansasPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Kansas 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Kansas for 2026. Farm Bureau Insurance offers Plan G from $141/mo and Plan N from $103/mo. No birthday rule. Free quotes from 35+ carriers.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/kansas/",
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
      { "@type": "ListItem", position: 3, name: "Kansas" },
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
