import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Meet the Editorial Team",
  description: "Meet the licensed Medicare experts and editorial team behind MedicareFAQ. Learn about our commitment to accurate, unbiased Medicare information.",
  openGraph: {
    title: "Meet the Editorial Team",
    description: "Meet the licensed Medicare experts behind MedicareFAQ.",
    url: "https://www.medicarefaq.com/meet-the-editorial-team",
    type: "website",
  },
  alternates: { canonical: "https://www.medicarefaq.com/meet-the-editorial-team" },
};

export default function Page() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Meet the Editorial Team",
    description: "Meet the licensed Medicare experts and editorial team behind MedicareFAQ. Learn about our commitment to accurate, unbiased Medicare information.",
    url: "https://www.medicarefaq.com/meet-the-editorial-team/",
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Meet the Editorial Team" },
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
