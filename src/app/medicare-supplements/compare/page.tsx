import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Compare All Medicare Supplement Plans Side by Side | 2026",
  description: "Compare all 10 Medigap plan letters side by side. See which Medicare Supplement plan covers what, and find the best plan for your health and budget.",
  openGraph: {
    title: "Compare All Medicare Supplement Plans Side by Side | 2026",
    description: "Compare all 10 Medigap plan letters side by side. See which Medicare Supplement plan covers what, and find the best plan for your health and budget.",
    url: "https://www.medicarefaq.com/medicare-supplements/compare/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/compare/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Compare All Medicare Supplement Plans Side by Side | 2026",
    description: "Compare all 10 Medigap plan letters side by side. See which Medicare Supplement plan covers what, and find the best plan for your health and budget.",
    url: "https://www.medicarefaq.com/medicare-supplements/compare/",
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
      { "@type": "ListItem", position: 3, name: "Compare Plans" },
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
