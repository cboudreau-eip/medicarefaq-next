import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Supplement vs. Medicare Advantage | Which is Better?",
  description: "Should you choose Medicare Supplement (Medigap) or Medicare Advantage? Compare costs, coverage, flexibility, and networks to find the right plan for you.",
  openGraph: {
    title: "Medicare Supplement vs. Medicare Advantage | Which is Better?",
    description: "Should you choose Medicare Supplement (Medigap) or Medicare Advantage? Compare costs, coverage, flexibility, and networks to find the right plan for you.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/supplement-vs-advantage/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/supplement-vs-advantage/",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Medicare Supplement vs. Medicare Advantage | Which is Better?",
    "description": "Should you choose Medicare Supplement (Medigap) or Medicare Advantage? Compare costs, coverage, flexibility, and networks to find the right plan for you.",
    "url": "https://www.medicarefaq.com/medicare-supplement-plans/supplement-vs-advantage/",
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
        { "@type": "ListItem", "position": 3, "name": "Medicare Supplement vs. Medicare Advantage", "item": "https://www.medicarefaq.com/medicare-supplement-plans/supplement-vs-advantage/" }
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
