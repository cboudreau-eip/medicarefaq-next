import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import OriginalMedicare from "./PageContent";

export const metadata: Metadata = {
  title: "Original Medicare | What is Original Medicare?",
  description: "Original Medicare is the traditional fee-for-service health insurance program offered by the federal government. Learn about Parts A and B, what they cover, and how they work.",
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/" },
  openGraph: {
    title: "Original Medicare | What is Original Medicare?",
    description: "Original Medicare is the traditional fee-for-service health insurance program offered by the federal government. Learn about Parts A and B, what they cover, and how they work.",
    url: "https://www.medicarefaq.com/original-medicare/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Original Medicare | What is Original Medicare?",
    description: "Original Medicare is the traditional fee-for-service health insurance program offered by the federal government. Learn about Parts A and B, what they cover, and how they work.",
    url: "https://www.medicarefaq.com/original-medicare/",
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
      { "@type": "ListItem", position: 2, name: "Original Medicare" },
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
      <OriginalMedicare />
    </SiteLayout>
  );
}
