import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part B Late Enrollment Penalty Calculator | MedicareFAQ",
  description:
    "Calculate your Medicare Part B late enrollment penalty instantly. Enter when you became eligible and when you enrolled to see your permanent monthly penalty amount and lifetime cost.",
  openGraph: {
    title: "Medicare Part B Late Enrollment Penalty Calculator",
    description:
      "Find out exactly how much your Part B late enrollment penalty will cost you — monthly and over your lifetime.",
    url: "https://www.medicarefaq.com/tools/part-b-penalty-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/tools/part-b-penalty-calculator",
  },
};

export default function Page() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Medicare Part B Late Enrollment Penalty Calculator | MedicareFAQ",
    description: "Calculate your Medicare Part B late enrollment penalty instantly. Enter when you became eligible and when you enrolled to see your permanent monthly penalty amount and lifetime cost.",
    url: "https://www.medicarefaq.com/tools/part-b-penalty-calculator/",
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
      { "@type": "ListItem", position: 3, name: "Part B Penalty Calculator" },
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
      <PageContent />
    </SiteLayout>
  );
}
