import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import FloridaPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Florida 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement (Medigap) plans in Florida for 2026. See carrier ratings, Plan G and Plan N premiums, and find the right coverage for your needs.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/florida/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Florida 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement (Medigap) plans in Florida for 2026. See carrier ratings, Plan G and Plan N premiums, and find the right coverage for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplements/florida/",
    type: "article",
    images: [
      {
        url: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
      },
    ],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Florida 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement (Medigap) plans in Florida for 2026. See carrier ratings, Plan G and Plan N premiums, and find the right coverage for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplements/florida/",
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
      { "@type": "ListItem", position: 3, name: "Florida" },
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
      <FloridaPageContent />
    </SiteLayout>
  );
}
