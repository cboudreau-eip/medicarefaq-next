import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Turning65Enrollment from "./PageContent";

export const metadata: Metadata = {
  title: "Turning 65 and Medicare: When and How to Enroll",
  description: "Learn exactly when to enroll in Medicare when turning 65, what your Initial Enrollment Period covers, and how to avoid costly late penalties.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/turning-65/" },
  openGraph: {
    title: "Turning 65 and Medicare: When and How to Enroll",
    description: "Learn exactly when to enroll in Medicare when turning 65, what your Initial Enrollment Period covers, and how to avoid costly late penalties.",
    url: "https://www.medicarefaq.com/medicare-enrollment/turning-65/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Turning 65 and Medicare: When and How to Enroll",
    description: "Learn exactly when to enroll in Medicare when turning 65, what your Initial Enrollment Period covers, and how to avoid costly late penalties.",
    url: "https://www.medicarefaq.com/medicare-enrollment/turning-65/",
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
      { "@type": "ListItem", position: 2, name: "Medicare Enrollment", item: "https://www.medicarefaq.com/medicare-enrollment/" },
      { "@type": "ListItem", position: 3, name: "Turning 65" },
    ],
  };
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Turning65Enrollment />
    </SiteLayout>
  );
}
