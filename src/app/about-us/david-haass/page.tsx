import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "David Haass | CTO & Co-Founder of MedicareFAQ",
  description: "David Haass is the CTO and Co-Founder of MedicareFAQ and Elite Insurance Partners. A Forbes Finance Council member, he leads the technology and editorial strategy behind one of America's most trusted Medicare education resources.",
  openGraph: {
    title: "David Haass | CTO & Co-Founder of MedicareFAQ",
    description: "David Haass is the CTO and Co-Founder of MedicareFAQ and Elite Insurance Partners. Forbes Finance Council member.",
    url: "https://www.medicarefaq.com/about-us/david-haass",
    type: "profile",
  },
  alternates: { canonical: "https://www.medicarefaq.com/about-us/david-haass" },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "David Haass | CTO & Co-Founder of MedicareFAQ",
    "description": "David Haass is the CTO and Co-Founder of MedicareFAQ and Elite Insurance Partners. A Forbes Finance Council member, he leads the technology and editorial strategy behind one of America's most trusted Medicare education resources.",
    "url": "https://www.medicarefaq.com/about-us/david-haass/",
    "mainEntity": {
      "@type": "Person",
      "name": "David Haass",
      "jobTitle": "CTO & Co-Founder",
      "worksFor": {
        "@type": "Organization",
        "name": "MedicareFAQ",
        "url": "https://www.medicarefaq.com"
      },
      "url": "https://www.medicarefaq.com/about-us/david-haass/",
      "sameAs": [
        "https://www.forbes.com/councils/forbesfinancecouncil/people/davidhaass/",
        "https://www.linkedin.com/in/davidhaass/"
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.medicarefaq.com/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://www.medicarefaq.com/about-us/" },
        { "@type": "ListItem", "position": 3, "name": "David Haass", "item": "https://www.medicarefaq.com/about-us/david-haass/" }
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
