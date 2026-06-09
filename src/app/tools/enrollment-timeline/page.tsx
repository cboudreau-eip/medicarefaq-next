import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Enrollment Timeline Calculator",
  description: "Use our free Medicare enrollment timeline calculator to find your Initial Enrollment Period, Special Enrollment Period, and key Medicare deadlines based on your birthday.",
  openGraph: {
    title: "Medicare Enrollment Timeline Calculator",
    description: "Find your Medicare enrollment windows and key deadlines.",
    url: "https://www.medicarefaq.com/tools/enrollment-timeline",
    type: "website",
  },
  alternates: { canonical: "https://www.medicarefaq.com/tools/enrollment-timeline" },
};

export default function Page() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Medicare Enrollment Timeline Calculator",
    description: "Use our free Medicare enrollment timeline calculator to find your Initial Enrollment Period, Special Enrollment Period, and key Medicare deadlines based on your birthday.",
    url: "https://www.medicarefaq.com/tools/enrollment-timeline/",
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
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.medicarefaq.com/tools/" },
      { "@type": "ListItem", position: 3, name: "Enrollment Timeline" },
    ],
  };

  return <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageContent /></SiteLayout>;
}
