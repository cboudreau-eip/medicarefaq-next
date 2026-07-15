import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import AboutTeam from "./PageContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "MedicareFAQ is dedicated to helping Medicare beneficiaries understand all their Medicare options. Our services are 100% free.",
  alternates: { canonical: "https://www.medicarefaq.com/about-us/" },
  openGraph: {
    title: "About Us",
    description: "MedicareFAQ is dedicated to helping Medicare beneficiaries understand all their Medicare options. Our services are 100% free.",
    url: "https://www.medicarefaq.com/about-us/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/xxbdybfbexe.jpg" }],
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Us",
    "description": "MedicareFAQ is dedicated to helping Medicare beneficiaries understand all their Medicare options. Our services are 100% free.",
    "url": "https://www.medicarefaq.com/about-us/",
    "publisher": {
      "@type": "Organization",
      "name": "MedicareFAQ",
      "url": "https://www.medicarefaq.com",
      "logo": { "@type": "ImageObject", "url": "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
      "description": "MedicareFAQ is dedicated to helping Medicare beneficiaries understand all their Medicare options. Our services are 100% free."
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.medicarefaq.com/" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://www.medicarefaq.com/about-us/" }
      ]
    }
  };
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AboutTeam />
    </SiteLayout>
  );
}
