import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans 2026 | Top Medigap Plans Ranked",
  description: "Find the best Medicare Supplement plans for 2026. We compare Plan G, Plan N, and other top Medigap options by cost, coverage, and value.",
  openGraph: {
    title: "Best Medicare Supplement Plans 2026 | Top Medigap Plans Ranked",
    description: "Find the best Medicare Supplement plans for 2026. We compare Plan G, Plan N, and other top Medigap options by cost, coverage, and value.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/best-supplement-plans/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/best-supplement-plans/",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Medicare Supplement Plans 2026 | Top Medigap Plans Ranked",
    "description": "Find the best Medicare Supplement plans for 2026. We compare Plan G, Plan N, and other top Medigap options by cost, coverage, and value.",
    "url": "https://www.medicarefaq.com/medicare-supplement-plans/best-supplement-plans/",
    "dateModified": "2026-06-15",
    "author": { "@type": "Organization", "name": "MedicareFAQ" },
    "publisher": {
      "@type": "Organization",
      "name": "MedicareFAQ",
      "url": "https://www.medicarefaq.com",
      "logo": { "@type": "ImageObject", "url": "https://www.medicarefaq.com/images/medicarefaq-logo.png" }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.medicarefaq.com/" },
        { "@type": "ListItem", "position": 2, "name": "Medicare Supplement Plans", "item": "https://www.medicarefaq.com/medicare-supplement-plans/" },
        { "@type": "ListItem", "position": 3, "name": "Best Medicare Supplement Plans", "item": "https://www.medicarefaq.com/medicare-supplement-plans/best-supplement-plans/" }
      ]
    }
  };
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageContent />
    </SiteLayout>
  );
}
