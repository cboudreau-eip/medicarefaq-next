import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "Compare Medicare Plan Types: Original Medicare, Advantage, Medigap & Part D",
  description: "Compare Medicare Supplement and Medicare Advantage plans side by side. Find out which type of coverage is right for your health needs and budget.",
  openGraph: {
    title: "Compare Medicare Plan Types: Original Medicare, Advantage, Medigap & Part D",
    description: "Compare Medicare Supplement and Medicare Advantage plans side by side. Find out which type of coverage is right for your health needs and budget.",
    url: "https://www.medicarefaq.com/compare-rates/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/compare-rates/",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Compare Medicare Plan Types: Original Medicare, Advantage, Medigap & Part D",
    "description": "Compare Medicare Supplement and Medicare Advantage plans side by side. Find out which type of coverage is right for your health needs and budget.",
    "url": "https://www.medicarefaq.com/compare-rates/",
    "publisher": {
      "@type": "Organization",
      "name": "MedicareFAQ",
      "url": "https://www.medicarefaq.com",
      "logo": { "@type": "ImageObject", "url": "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-logo.png" }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.medicarefaq.com/" },
        { "@type": "ListItem", "position": 2, "name": "Compare Medicare Plans", "item": "https://www.medicarefaq.com/compare-rates/" }
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
