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
  const fAQPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": ""
      }
    }
  ]
};

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fAQPageSchema) }}
      />
      <PageContent />
    </SiteLayout>
  );
}
