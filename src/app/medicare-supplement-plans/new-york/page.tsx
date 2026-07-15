import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import NewYorkPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in New York 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement (Medigap) plans in New York for 2026. Learn about New York's guaranteed issue year-round rules, community rating, top carrier ratings, Plan G and Plan N premiums, and find the right coverage.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/new-york/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in New York 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement (Medigap) plans in New York for 2026. Learn about New York's guaranteed issue year-round rules, community rating, top carrier ratings, Plan G and Plan N premiums, and find the right coverage.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/new-york/",
    type: "article",
    images: [
      {
        url: "/images/medicarefaq-cover.jpg",
      },
    ],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in New York 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement (Medigap) plans in New York for 2026. Learn about New York's guaranteed issue year-round rules, community rating, top carrier ratings, Plan G and Plan N premiums, and find the right coverage.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/new-york/",
    dateModified: "2026-01-01",
    author: { "@type": "Organization", name: "MedicareFAQ" },
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Supplements", item: "https://www.medicarefaq.com/medicare-supplement-plans/" },
      { "@type": "ListItem", position: 3, name: "New York" },
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
      <NewYorkPageContent />
    </SiteLayout>
  );
}
