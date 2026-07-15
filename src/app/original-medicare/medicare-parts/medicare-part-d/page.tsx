import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PartD from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part D Drug Coverage",
  description: "Medicare Part D involves different coverage phases. Learn how it works here and how to find the best plan for you.",
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/" },
  openGraph: {
    title: "Medicare Part D Drug Coverage",
    description: "Medicare Part D involves different coverage phases. Learn how it works here and how to find the best plan for you.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicare-part-d-1.jpeg" }],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Part D Drug Coverage",
    description: "Medicare Part D involves different coverage phases. Learn how it works here and how to find the best plan for you.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d",
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
      { "@type": "ListItem", position: 2, name: "Original Medicare", item: "https://www.medicarefaq.com/original-medicare/" },
      { "@type": "ListItem", position: 3, name: "Medicare Parts", item: "https://www.medicarefaq.com/original-medicare/medicare-parts/" },
      { "@type": "ListItem", position: 4, name: "Part D" },
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
      <PartD />
    </SiteLayout>
  );
}
