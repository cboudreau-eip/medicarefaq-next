import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Turning65 from "./PageContent";

export const metadata: Metadata = {
  title: "Turning 65 and Medicare | What You Need to Do",
  description: "Turning 65? Learn everything you need to know about enrolling in Medicare, your coverage options, and the steps to take before your 65th birthday.",
  alternates: { canonical: "https://www.medicarefaq.com/new-to-medicare/turning-65/" },
  openGraph: {
    title: "Turning 65 and Medicare | What You Need to Do",
    description: "Turning 65? Learn everything you need to know about enrolling in Medicare, your coverage options, and the steps to take before your 65th birthday.",
    url: "https://www.medicarefaq.com/new-to-medicare/turning-65/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Turning 65 and Medicare | What You Need to Do",
    description: "Turning 65? Learn everything you need to know about enrolling in Medicare, your coverage options, and the steps to take before your 65th birthday.",
    url: "https://www.medicarefaq.com/new-to-medicare/turning-65/",
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
      { "@type": "ListItem", position: 2, name: "New to Medicare", item: "https://www.medicarefaq.com/new-to-medicare/" },
      { "@type": "ListItem", position: 3, name: "Turning 65" },
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
      <Turning65 />
    </SiteLayout>
  );
}
