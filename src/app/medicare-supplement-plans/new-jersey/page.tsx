import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Supplement (Medigap) Plans in New Jersey",
  description:
    "Compare New Jersey Medigap coverage, costs, enrollment protections, underwriting, and steps for switching policies.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/new-jersey/",
  },
  openGraph: {
    title: "Medicare Supplement (Medigap) Plans in New Jersey",
    description:
      "Understand New Jersey Medigap coverage, under-65 protections, pricing, and how to enroll or switch.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/new-jersey/",
    type: "article",
  },
};

export default function NewJerseyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Supplement (Medigap) Plans in New Jersey",
    description: "Compare New Jersey Medigap coverage, costs, enrollment protections, underwriting, and steps for switching policies.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/new-jersey/",
    dateModified: "2026-11-10",
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
