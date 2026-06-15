import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Massachusetts 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Massachusetts for 2026. Massachusetts uses a unique plan system (Core, Supplement 1A) with community rating and year-round open enrollment. Compare rates from $123/mo in Boston from top carriers including BCBS MA, Harvard Pilgrim, and AARP/UHC.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/massachusetts/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Massachusetts 2026",
    description:
      "Massachusetts has community rating and year-round open enrollment. Compare Supplement 1A rates from $176/mo in Boston from top-rated carriers.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/massachusetts/",
    type: "article",
  },
};

export default function MassachusettsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Massachusetts 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Massachusetts for 2026. Massachusetts uses a unique plan system (Core, Supplement 1A) with community rating and year-round open enrollment. Compare rates from $123/mo in Boston from top carriers including BCBS MA, Harvard Pilgrim, and AARP/UHC.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/massachusetts/",
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
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/" },
      { "@type": "ListItem", position: 3, name: "Massachusetts" },
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
