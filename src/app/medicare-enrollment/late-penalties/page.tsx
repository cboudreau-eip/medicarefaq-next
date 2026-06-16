import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import LatePenalties from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Late Enrollment Penalties: What They are & How to Avoid Them",
  description: "Missing your Medicare enrollment window can result in permanent late penalties on Part A, Part B, and Part D. Learn how the penalties work and how to avoid them.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/late-penalties/" },
  openGraph: {
    title: "Medicare Late Enrollment Penalties: What They are & How to Avoid Them",
    description: "Missing your Medicare enrollment window can result in permanent late penalties on Part A, Part B, and Part D. Learn how the penalties work and how to avoid them.",
    url: "https://www.medicarefaq.com/medicare-enrollment/late-penalties/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medicare Late Enrollment Penalties: What They are & How to Avoid Them",
    description: "Missing your Medicare enrollment window can result in permanent late penalties on Part A, Part B, and Part D. Learn how the penalties work and how to avoid them.",
    url: "https://www.medicarefaq.com/medicare-enrollment/late-penalties/",
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
      { "@type": "ListItem", position: 2, name: "Medicare Enrollment", item: "https://www.medicarefaq.com/medicare-enrollment/" },
      { "@type": "ListItem", position: 3, name: "Late Enrollment Penalties" },
    ],
  };
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LatePenalties />
    </SiteLayout>
  );
}
