import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import CaregiverPageContent from "./CaregiverPageContent";
import { CAREGIVER_PAGES } from "@/lib/caregiver-guide-data";

export const metadata: Metadata = {
  title: "Guide to Being a Caregiver",
  description:
    "A comprehensive resource for family caregivers navigating Medicare, home health benefits, and the practical realities of caring for an aging loved one.",
  alternates: {
    canonical: "https://www.medicarefaq.com/guide-to-being-a-caregiver",
  },
};

export default function Page() {
  const page = CAREGIVER_PAGES.find((p) => p.slug === "")!;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Guide to Being a Caregiver",
    "description": "A comprehensive resource for family caregivers navigating Medicare, home health benefits, and the practical realities of caring for an aging loved one.",
    "url": "https://www.medicarefaq.com/guide-to-being-a-caregiver/",
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
        { "@type": "ListItem", "position": 2, "name": "Guide to Being a Caregiver", "item": "https://www.medicarefaq.com/guide-to-being-a-caregiver/" }
      ]
    }
  };
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <CaregiverPageContent page={page} slug="" />
    </SiteLayout>
  );
}
