import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Eligibility Requirements 2026 | Who Qualifies for Medicare?",
  description: "Learn who qualifies for Medicare in 2026. Understand age eligibility (65+), disability eligibility, ESRD, and how to check if you qualify for premium-free Part A.",
  openGraph: {
    title: "Medicare Eligibility Requirements 2026 | Who Qualifies for Medicare?",
    description: "Learn who qualifies for Medicare in 2026. Understand age eligibility (65+), disability eligibility, ESRD, and how to check if you qualify for premium-free Part A.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-eligibility/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg" }],
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-eligibility/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Eligibility Requirements 2026 | Who Qualifies for Medicare?",
    description: "Learn who qualifies for Medicare in 2026. Understand age eligibility (65+), disability eligibility, ESRD, and how to check if you qualify for premium-free Part A.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-eligibility/",
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
      { "@type": "ListItem", position: 2, name: "Original Medicare", item: "https://www.medicarefaq.com/original-medicare/" },
      { "@type": "ListItem", position: 3, name: "Medicare Eligibility" },
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
