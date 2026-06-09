import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part a (Hospital Insurance) 2026 | Coverage, Costs & Eligibility",
  description: "Understand Medicare Part A hospital insurance: what it covers, 2026 deductibles and coinsurance, eligibility requirements, and how to enroll.",
  openGraph: {
    title: "Medicare Part a (Hospital Insurance) 2026 | Coverage, Costs & Eligibility",
    description: "Understand Medicare Part A hospital insurance: what it covers, 2026 deductibles and coinsurance, eligibility requirements, and how to enroll.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-a",
    type: "article",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-a",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Part a (Hospital Insurance) 2026 | Coverage, Costs & Eligibility",
    description: "Understand Medicare Part A hospital insurance: what it covers, 2026 deductibles and coinsurance, eligibility requirements, and how to enroll.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-a",
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
      { "@type": "ListItem", position: 2, name: "Original Medicare", item: "https://www.medicarefaq.com/original-medicare/" },
      { "@type": "ListItem", position: 3, name: "Medicare Parts", item: "https://www.medicarefaq.com/original-medicare/medicare-parts/" },
      { "@type": "ListItem", position: 4, name: "Part A" },
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
