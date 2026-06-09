import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import MedicareSupplement from "./PageContent";

export const metadata: Metadata = {
  title: "What is a Medicare Supplement Plan? How Medigap Works",
  description: "Medicare Supplement (Medigap) plans help fill the gaps in Original Medicare. See how the plans work, what they cover, and how to choose the right one",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-supplements/" },
  openGraph: {
    title: "What is a Medicare Supplement Plan? How Medigap Works",
    description: "Medicare Supplement (Medigap) plans help fill the gaps in Original Medicare. See how the plans work, what they cover, and how to choose the right one",
    url: "https://www.medicarefaq.com/medicare-supplements/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg" }],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is a Medicare Supplement Plan? How Medigap Works",
    description: "Medicare Supplement (Medigap) plans help fill the gaps in Original Medicare. See how the plans work, what they cover, and how to choose the right one",
    url: "https://www.medicarefaq.com/medicare-supplements/",
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
      { "@type": "ListItem", position: 2, name: "Medicare Supplements" },
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
      <MedicareSupplement />
    </SiteLayout>
  );
}
