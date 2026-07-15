import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Tools & Resources on Medicare.gov",
  description: "A senior's guide to the tools and resources available on Medicare.gov.",
  alternates: {
    canonical: "https://www.medicarefaq.com/seniors-guide-to-medicare-gov/tools-and-resources",
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Tools & Resources on Medicare.gov",
    "description": "A senior's guide to the tools and resources available on Medicare.gov.",
    "url": "https://www.medicarefaq.com/seniors-guide-to-medicare-gov/tools-and-resources/",
    "dateModified": "2026-06-15",
    "author": { "@type": "Organization", "name": "MedicareFAQ" },
    "publisher": {
      "@type": "Organization",
      "name": "MedicareFAQ",
      "url": "https://www.medicarefaq.com",
      "logo": { "@type": "ImageObject", "url": "https://www.medicarefaq.com/images/medicarefaq-logo.png" }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.medicarefaq.com/" },
        { "@type": "ListItem", "position": 2, "name": "Senior's Guide to Medicare.gov", "item": "https://www.medicarefaq.com/seniors-guide-to-medicare-gov/" },
        { "@type": "ListItem", "position": 3, "name": "Tools & Resources", "item": "https://www.medicarefaq.com/seniors-guide-to-medicare-gov/tools-and-resources/" }
      ]
    }
  };
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageContent />
    </SiteLayout>
  );
}
