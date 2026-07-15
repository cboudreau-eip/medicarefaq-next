import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Supplement Plans 2026 | Medigap Plan Options & Updates",
  description: "See what's new with Medicare Supplement plans in 2026. Compare Medigap plan options, understand rate changes, and find the best coverage for your needs.",
  openGraph: {
    title: "Medicare Supplement Plans 2026 | Medigap Plan Options & Updates",
    description: "See what's new with Medicare Supplement plans in 2026. Compare Medigap plan options and find the best coverage for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/medicare-supplement-plans-2026/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/medicare-supplement-plans-2026/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Supplement Plans 2026 | Medigap Plan Options & Updates",
    description: "See what's new with Medicare Supplement plans in 2026. Compare Medigap plan options, understand rate changes, and find the best coverage for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/medicare-supplement-plans-2026/",
    dateModified: "2026-01-01",
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
      { "@type": "ListItem", position: 3, name: "Plans 2026" },
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
