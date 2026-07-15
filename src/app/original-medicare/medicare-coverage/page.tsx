import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "What Does Medicare Cover in 2026? | Medicare Coverage Guide",
  description: "Learn what Medicare covers in 2026 — from hospital stays and doctor visits to prescription drugs and preventive care. Understand Parts A, B, C, and D coverage.",
  openGraph: {
    title: "What Does Medicare Cover in 2026? | Medicare Coverage Guide",
    description: "Learn what Medicare covers in 2026 — from hospital stays and doctor visits to prescription drugs and preventive care. Understand Parts A, B, C, and D coverage.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-coverage/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg" }],
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-coverage/",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Does Medicare Cover in 2026? | Medicare Coverage Guide",
    description: "Learn what Medicare covers in 2026 — from hospital stays and doctor visits to prescription drugs and preventive care. Understand Parts A, B, C, and D coverage.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-coverage/",
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
      { "@type": "ListItem", position: 3, name: "Medicare Coverage" },
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
