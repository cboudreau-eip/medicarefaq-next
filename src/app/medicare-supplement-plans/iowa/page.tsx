import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Iowa 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Iowa for 2026. MedMutual Protect offers Plan G from $128/mo. State Farm A++ rated. No birthday rule. Free quotes from 30+ carriers.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/iowa/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Iowa 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Iowa for 2026. MedMutual Protect offers Plan G from $128/mo. State Farm A++ rated. No birthday rule.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/iowa/",
    type: "website",
  },
};

export default function IowaPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Iowa 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Iowa for 2026. MedMutual Protect offers Plan G from $128/mo. State Farm A++ rated. No birthday rule. Free quotes from 30+ carriers.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/iowa/",
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
      { "@type": "ListItem", position: 3, name: "Iowa" },
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
