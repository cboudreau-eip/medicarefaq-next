import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medigap Plans by State 2026 | Medicare Supplement State Guide",
  description: "Compare Medicare Supplement (Medigap) plans by state. Find state-specific rules, top carriers, and average premiums for Plan G and other plans in your state.",
  openGraph: {
    title: "Medigap Plans by State 2026 | Medicare Supplement State Guide",
    description: "Compare Medicare Supplement (Medigap) plans by state. Find state-specific rules, top carriers, and average premiums for Plan G and other plans in your state.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/medigap-by-state/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/medigap-by-state/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medigap Plans by State 2026 | Medicare Supplement State Guide",
    description: "Compare Medicare Supplement (Medigap) plans by state. Find state-specific rules, top carriers, and average premiums for Plan G and other plans in your state.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/medigap-by-state/",
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
      { "@type": "ListItem", position: 3, name: "By State" },
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
