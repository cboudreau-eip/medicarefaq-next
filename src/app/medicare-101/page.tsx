import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Medicare101 from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare 101 | A Beginner's Guide to Understanding Medicare",
  description: "Medicare provides health insurance coverage for Americans over age 65 and individuals with qualified disabilities. Learn everything you need to know about Medicare.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-101/" },
  openGraph: {
    title: "Medicare 101 | A Beginner's Guide to Understanding Medicare",
    description: "Medicare provides health insurance coverage for Americans over age 65 and individuals with qualified disabilities. Learn everything you need to know about Medicare.",
    url: "https://www.medicarefaq.com/medicare-101/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicare-101.jpg" }],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare 101 | A Beginner's Guide to Understanding Medicare",
    description: "Medicare provides health insurance coverage for Americans over age 65 and individuals with qualified disabilities. Learn everything you need to know about Medicare.",
    url: "https://www.medicarefaq.com/medicare-101/",
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
      { "@type": "ListItem", position: 2, name: "Medicare 101" },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Medicare101 />
    </SiteLayout>
  );
}
