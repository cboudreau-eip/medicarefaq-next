import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import SouthCarolinaPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in South Carolina 2026 | MedicareFAQ",
  description: "Compare the best Medicare Supplement plans in South Carolina. See 2026 rates, carrier rankings, and state-specific rules from MedicareFAQ.",
};

export default function SouthCarolinaPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in South Carolina 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in South Carolina. See 2026 rates, carrier rankings, and state-specific rules from MedicareFAQ.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/south-carolina/",
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
      { "@type": "ListItem", position: 3, name: "South Carolina" },
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
      <SouthCarolinaPageContent />
    </SiteLayout>
  );
}
