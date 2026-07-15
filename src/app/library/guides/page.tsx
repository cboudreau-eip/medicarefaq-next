import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Guides from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Guides & Resources | Free Medicare Education",
  description: "Browse free Medicare guides and educational resources from MedicareFAQ. Learn about Medicare plans, enrollment, costs, and coverage in plain language.",
  alternates: { canonical: "https://www.medicarefaq.com/library/guides/" },
  openGraph: {
    title: "Medicare Guides & Resources | Free Medicare Education",
    description: "Browse free Medicare guides and educational resources from MedicareFAQ. Learn about Medicare plans, enrollment, costs, and coverage in plain language.",
    url: "https://www.medicarefaq.com/library/guides/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Medicare Guides & Resources | Free Medicare Education",
    "description": "Browse free Medicare guides and educational resources from MedicareFAQ. Learn about Medicare plans, enrollment, costs, and coverage in plain language.",
    "url": "https://www.medicarefaq.com/library/guides/",
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
        { "@type": "ListItem", "position": 2, "name": "Library", "item": "https://www.medicarefaq.com/library/" },
        { "@type": "ListItem", "position": 3, "name": "Guides & Resources", "item": "https://www.medicarefaq.com/library/guides/" }
      ]
    }
  };
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Guides />
    </SiteLayout>
  );
}
