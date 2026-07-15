import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "How Much Does Medicare Cost in 2026? | Medicare Premiums & Deductibles",
  description: "See the 2026 Medicare costs for Parts A, B, C, and D — including premiums, deductibles, coinsurance, and out-of-pocket limits. Updated for 2026.",
  openGraph: {
    title: "How Much Does Medicare Cost in 2026? | Medicare Premiums & Deductibles",
    description: "See the 2026 Medicare costs for Parts A, B, C, and D — including premiums, deductibles, coinsurance, and out-of-pocket limits. Updated for 2026.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-costs/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg" }],
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-costs/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Does Medicare Cost in 2026? | Medicare Premiums & Deductibles",
    description: "See the 2026 Medicare costs for Parts A, B, C, and D — including premiums, deductibles, coinsurance, and out-of-pocket limits. Updated for 2026.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-costs/",
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
      { "@type": "ListItem", position: 3, name: "Medicare Costs" },
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
