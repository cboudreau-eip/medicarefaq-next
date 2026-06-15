import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import HowToEnroll from "./PageContent";

export const metadata: Metadata = {
  title: "How to Enroll in Medicare | Step-by-Step Guide",
  description: "Learn how to enroll in Medicare step by step. Find out when to sign up, how to apply online or by phone, and what to do if you missed your enrollment window.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/how-to-enroll/" },
  openGraph: {
    title: "How to Enroll in Medicare | Step-by-Step Guide",
    description: "Learn how to enroll in Medicare step by step. Find out when to sign up, how to apply online or by phone, and what to do if you missed your enrollment window.",
    url: "https://www.medicarefaq.com/medicare-enrollment/how-to-enroll/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Enroll in Medicare | Step-by-Step Guide",
    description: "Learn how to enroll in Medicare step by step. Find out when to sign up, how to apply online or by phone, and what to do if you missed your enrollment window.",
    url: "https://www.medicarefaq.com/medicare-enrollment/how-to-enroll/",
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
      { "@type": "ListItem", position: 3, name: "How to Enroll" },
    ],
  };
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HowToEnroll />
    </SiteLayout>
  );
}
