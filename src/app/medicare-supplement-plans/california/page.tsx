import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import CaliforniaPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in California 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement (Medigap) plans in California for 2026. Learn about the California birthday rule, top carrier ratings, Plan G and Plan N premiums, and find the right coverage.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplement-plans/california/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in California 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement (Medigap) plans in California for 2026. Learn about the California birthday rule, top carrier ratings, Plan G and Plan N premiums, and find the right coverage.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/california/",
    type: "article",
    images: [
      {
        url: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
      },
    ],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Medicare Supplement Plans in California 2026 | MedicareFAQ",
    description: "Compare the best Medicare Supplement (Medigap) plans in California for 2026. Learn about the California birthday rule, top carrier ratings, Plan G and Plan N premiums, and find the right coverage.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/california/",
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
      { "@type": "ListItem", position: 3, name: "California" },
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
      <CaliforniaPageContent />
    </SiteLayout>
  );
}
