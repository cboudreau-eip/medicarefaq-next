import type { Metadata } from "next";
import { Suspense } from "react";
import SiteLayout from "@/components/SiteLayout";
import Coverage from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare FAQs | Answers to Common Medicare Questions",
  description: "Browse hundreds of Medicare FAQs covering plans, enrollment, costs, and coverage. Get clear, unbiased answers to your Medicare questions.",
  alternates: { canonical: "https://www.medicarefaq.com/faqs/" },
  openGraph: {
    title: "Medicare FAQs | Answers to Common Medicare Questions",
    description: "Browse hundreds of Medicare FAQs covering plans, enrollment, costs, and coverage. Get clear, unbiased answers to your Medicare questions.",
    url: "https://www.medicarefaq.com/faqs/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Medicare FAQs | Answers to Common Medicare Questions",
    description: "Browse hundreds of Medicare FAQs covering plans, enrollment, costs, and coverage. Get clear, unbiased answers to your Medicare questions.",
    url: "https://www.medicarefaq.com/faqs/",
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
      { "@type": "ListItem", position: 2, name: "Medicare FAQs" },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Suspense fallback={null}>
        <Coverage />
      </Suspense>
    </SiteLayout>
  );
}
