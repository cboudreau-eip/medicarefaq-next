import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Hawaii 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Hawaii for 2026. No birthday rule in Hawaii. Plan G starts at $134/mo (USAA) or $151/mo for the general public. 20+ carriers analyzed.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/hawaii/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Hawaii 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Hawaii for 2026. No birthday rule in Hawaii. Plan G starts at $134/mo (USAA) or $151/mo for the general public.",
    url: "https://www.medicarefaq.com/medicare-supplements/hawaii/",
    type: "website",
  },
};

export default function HawaiiPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Hawaii 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Hawaii for 2026. No birthday rule in Hawaii. Plan G starts at $134/mo (USAA) or $151/mo for the general public. 20+ carriers analyzed.",
    url: "https://www.medicarefaq.com/medicare-supplements/hawaii/",
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
      { "@type": "ListItem", position: 3, name: "Hawaii" },
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
