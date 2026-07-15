import type { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Open Enrollment 2026: Dates, Rules & What You Can Change | MedicareFAQ",
  description:
    "Medicare Open Enrollment runs October 15 – December 7, 2026. Learn what changes you can make, key deadlines, and how to compare plans during this period.",
  openGraph: {
    title: "Medicare Open Enrollment 2026: Dates, Rules & What You Can Change | MedicareFAQ",
    description:
      "Medicare Open Enrollment runs October 15 – December 7, 2026. Learn what changes you can make, key deadlines, and how to compare plans during this period.",
    url: "https://www.medicarefaq.com/medicare-open-enrollment",
    type: "article",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-open-enrollment",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Medicare Open Enrollment 2026: Dates, Rules & What You Can Change",
  description: "Medicare Open Enrollment runs October 15 – December 7, 2026. Learn what changes you can make, key deadlines, and how to compare plans during this period.",
  url: "https://www.medicarefaq.com/medicare-open-enrollment/",
  publisher: {
    "@type": "Organization",
    name: "MedicareFAQ",
    logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Open Enrollment", item: "https://www.medicarefaq.com/medicare-open-enrollment/" },
    ],
  },
};

export default function MedicareOpenEnrollmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PageContent />
    </>
  );
}
