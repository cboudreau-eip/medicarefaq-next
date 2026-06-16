import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "How Much Does Medicare Cost? 2026 Premiums & Out-of-Pocket",
  description: "Learn what Medicare costs in 2026 — including Part A and Part B premiums, deductibles, and out-of-pocket expenses. Find out how to reduce your Medicare costs.",
  openGraph: {
    title: "How Much Does Medicare Cost? 2026 Premiums & Out-of-Pocket",
    description: "Learn what Medicare costs in 2026 — including Part A and Part B premiums, deductibles, and out-of-pocket expenses. Find out how to reduce your Medicare costs.",
    url: "https://www.medicarefaq.com/new-to-medicare/costs/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/new-to-medicare/costs/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Does Medicare Cost? 2026 Premiums & Out-of-Pocket",
    description: "Learn what Medicare costs in 2026 — including Part A and Part B premiums, deductibles, and out-of-pocket expenses. Find out how to reduce your Medicare costs.",
    url: "https://www.medicarefaq.com/new-to-medicare/costs/",
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
      { "@type": "ListItem", position: 2, name: "New to Medicare", item: "https://www.medicarefaq.com/new-to-medicare/" },
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
