import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import AnnualChanges from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Annual Enrollment Period | AEP Dates & Changes",
  description: "The Medicare Annual Enrollment Period runs October 15 – December 7 each year. Learn what changes you can make and how to review your coverage for the coming year.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/annual-changes/" },
  openGraph: {
    title: "Medicare Annual Enrollment Period | AEP Dates & Changes",
    description: "The Medicare Annual Enrollment Period runs October 15 – December 7 each year. Learn what changes you can make and how to review your coverage for the coming year.",
    url: "https://www.medicarefaq.com/medicare-enrollment/annual-changes/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: "Medicare Annual Enrollment Period | AEP Dates & Changes",
    description: "The Medicare Annual Enrollment Period runs October 15 – December 7 each year. Learn what changes you can make and how to review your coverage for the coming year.",
    url: "https://www.medicarefaq.com/medicare-enrollment/annual-changes/",
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
      { "@type": "ListItem", position: 2, name: "Enrollment", item: "https://www.medicarefaq.com/medicare-enrollment/" },
      { "@type": "ListItem", position: 3, name: "Annual Enrollment Period" },
    ],
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AnnualChanges />
    </SiteLayout>
  );
}
