import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Kentucky 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Kentucky for 2026. Birthday rule active since January 2024. LifeShield National Plan G from $148/mo. State Farm A++ rated. Free quotes from 40+ carriers.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/kentucky/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Kentucky 2026 | MedicareFAQ",
    description:
      "Kentucky birthday rule active since January 2024. LifeShield National offers Plan G from $148/mo. State Farm A++ rated. Compare 40+ carriers.",
    url: "https://www.medicarefaq.com/medicare-supplements/kentucky/",
    type: "website",
  },
};

export default function KentuckyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Kentucky 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Kentucky for 2026. Birthday rule active since January 2024. LifeShield National Plan G from $148/mo. State Farm A++ rated. Free quotes from 40+ carriers.",
    url: "https://www.medicarefaq.com/medicare-supplements/kentucky/",
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
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplements/" },
      { "@type": "ListItem", position: 3, name: "Kentucky" },
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
