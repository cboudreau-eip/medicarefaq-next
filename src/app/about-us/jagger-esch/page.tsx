import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "Jagger Esch | Founder & CEO of MedicareFAQ",
  description: "Learn about Jagger Esch, the founder and CEO of MedicareFAQ, his background in Medicare insurance, and his mission to simplify Medicare for everyone.",
  openGraph: {
    title: "Jagger Esch | Founder & CEO of MedicareFAQ",
    description: "Learn about Jagger Esch, founder and CEO of MedicareFAQ.",
    url: "https://www.medicarefaq.com/about-us/jagger-esch",
    type: "profile",
  },
  alternates: { canonical: "https://www.medicarefaq.com/about-us/jagger-esch" },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Jagger Esch | Founder & CEO of MedicareFAQ",
    "description": "Learn about Jagger Esch, the founder and CEO of MedicareFAQ, his background in Medicare insurance, and his mission to simplify Medicare for everyone.",
    "url": "https://www.medicarefaq.com/about-us/jagger-esch/",
    "mainEntity": {
      "@type": "Person",
      "name": "Jagger Esch",
      "jobTitle": "Founder & CEO",
      "worksFor": {
        "@type": "Organization",
        "name": "MedicareFAQ",
        "url": "https://www.medicarefaq.com"
      },
      "url": "https://www.medicarefaq.com/about-us/jagger-esch/"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.medicarefaq.com/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://www.medicarefaq.com/about-us/" },
        { "@type": "ListItem", "position": 3, "name": "Jagger Esch", "item": "https://www.medicarefaq.com/about-us/jagger-esch/" }
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
