import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Wisconsin 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Wisconsin for 2026. Wisconsin uses a unique plan system instead of standard lettered plans. See top carriers, premiums from $102/mo, and state rules.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/wisconsin/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Wisconsin 2026",
    description:
      "Compare top Medigap carriers in Wisconsin. Wisconsin uses a unique Basic Plan system. See premiums from $102/mo, top carriers, and state rules for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplements/wisconsin/",
    type: "article",
  },
};

export default function WisconsinPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Wisconsin 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Wisconsin for 2026. Wisconsin uses a unique plan system instead of standard lettered plans. See top carriers, premiums from $102/mo, and state rules.",
    url: "https://www.medicarefaq.com/medicare-supplements/wisconsin/",
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
      { "@type": "ListItem", position: 3, name: "Wisconsin" },
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
