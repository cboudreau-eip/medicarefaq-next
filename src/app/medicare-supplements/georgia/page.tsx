import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Georgia 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Georgia for 2026. See top-rated carriers, Plan G rates from $118/mo in Atlanta, and Georgia Medigap rules. Independent, unbiased reviews.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/georgia/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Georgia 2026",
    description:
      "Compare top-rated Medigap carriers in Georgia. Plan G from $118/mo in Atlanta. Independent reviews of State Farm, AARP/UHC, Mutual of Omaha, Humana, and Wellabe.",
    url: "https://www.medicarefaq.com/medicare-supplements/georgia/",
    type: "article",
    images: [
      {
        url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Best Medicare Supplement Plans in Georgia 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Medicare Supplement Plans in Georgia 2026",
    description:
      "Compare top-rated Medigap carriers in Georgia. Plan G from $118/mo in Atlanta. Independent, unbiased reviews.",
  },
};

export default function GeorgiaMedicareSupplementPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in Georgia 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement plans in Georgia for 2026. See top-rated carriers, Plan G rates from $118/mo in Atlanta, and Georgia Medigap rules. Independent, unbiased reviews.",
    url: "https://www.medicarefaq.com/medicare-supplements/georgia/",
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
      { "@type": "ListItem", position: 3, name: "Georgia" },
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
