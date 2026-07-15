import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Client Care Team",
  description: "Meet the MedicareFAQ Client Care Team. Our dedicated team provides ongoing support to help you manage your Medicare coverage year-round.",
  openGraph: {
    title: "Client Care Team",
    description: "Meet the MedicareFAQ Client Care Team.",
    url: "https://www.medicarefaq.com/client-care-team",
    type: "website",
  },
  alternates: { canonical: "https://www.medicarefaq.com/client-care-team" },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Client Care Team",
    "description": "Meet the MedicareFAQ Client Care Team. Our dedicated team provides ongoing support to help you manage your Medicare coverage year-round.",
    "url": "https://www.medicarefaq.com/client-care-team/",
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
        { "@type": "ListItem", "position": 2, "name": "Client Care Team", "item": "https://www.medicarefaq.com/client-care-team/" }
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
