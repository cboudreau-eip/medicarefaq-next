import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Tennessee 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Tennessee for 2026. See Plan G rates from $87/mo in Nashville, top carrier rankings, and Tennessee Medigap rules. Independent, unbiased reviews.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/tennessee/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Tennessee 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Tennessee for 2026. Plan G from $87/mo in Nashville. Top carrier rankings and Tennessee Medigap rules explained.",
    url: "https://www.medicarefaq.com/medicare-supplements/tennessee/",
    type: "article",
  },
};

export default function TennesseePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Tennessee 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Tennessee for 2026. See Plan G rates from $87/mo in Nashville, top carrier rankings, and Tennessee Medigap rules. Independent, unbiased reviews.",
    url: "https://www.medicarefaq.com/medicare-supplements/tennessee/",
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
      { "@type": "ListItem", position: 3, name: "Tennessee" },
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
