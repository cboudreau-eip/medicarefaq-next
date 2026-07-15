import type { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medigap Plans Explained 2026: Compare All 10 Plan Types | MedicareFAQ",
  description:
    "Compare all 10 Medigap (Medicare Supplement) plans for 2026 — Plan A through Plan N. See coverage charts, costs, and find the best plan for your needs.",
  openGraph: {
    title: "Medigap Plans Explained 2026: Compare All 10 Plan Types | MedicareFAQ",
    description:
      "Compare all 10 Medigap (Medicare Supplement) plans for 2026 — Plan A through Plan N. See coverage charts, costs, and find the best plan for your needs.",
    url: "https://www.medicarefaq.com/medigap-plans",
    type: "article",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medigap-plans",
  },
};

export default function MedigapPlansPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medigap Plans Explained 2026: Compare All 10 Plan Types | MedicareFAQ",
    description: "Compare all 10 Medigap (Medicare Supplement) plans for 2026 — Plan A through Plan N. See coverage charts, costs, and find the best plan for your needs.",
    url: "https://www.medicarefaq.com/medigap-plans",
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
      { "@type": "ListItem", position: 2, name: "Medigap Plans" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageContent />
    </>
  );
}