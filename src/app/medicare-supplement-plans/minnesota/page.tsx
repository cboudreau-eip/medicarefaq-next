import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Minnesota 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Minnesota for 2026. Minnesota uses a unique Basic and Extended Basic plan system with community rating. Compare top carriers including BCBS MN, HealthPartners, Medica, and Mutual of Omaha. Get free quotes.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/minnesota/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Minnesota 2026",
    description:
      "Minnesota uses a unique Medigap plan system with community rating. Compare top carriers and Extended Basic plan premiums. Get free quotes from licensed agents.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/minnesota/",
    siteName: "MedicareFAQ",
    type: "article",
  },
};

export default function MinnesotaMedicareSupplementPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Minnesota 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Minnesota for 2026. Minnesota uses a unique Basic and Extended Basic plan system with community rating. Compare top carriers including BCBS MN, HealthPartners, Medica, and Mutual of Omaha. Get free quotes.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/minnesota/",
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
      { "@type": "ListItem", position: 3, name: "Minnesota" },
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
