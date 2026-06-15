import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Delaware 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Delaware for 2026. Delaware adopted the birthday rule on January 1, 2026. Plan G starts at $161/mo. 40+ carriers analyzed.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/delaware/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Delaware 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Delaware for 2026. Delaware adopted the birthday rule on January 1, 2026. Plan G starts at $161/mo.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/delaware/",
    type: "website",
  },
};

export default function DelawarePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Delaware 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Delaware for 2026. Delaware adopted the birthday rule on January 1, 2026. Plan G starts at $161/mo. 40+ carriers analyzed.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/delaware/",
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
      { "@type": "ListItem", position: 3, name: "Delaware" },
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
