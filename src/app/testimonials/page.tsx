import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Client Testimonials | MedicareFAQ Reviews",
  description: "Read real testimonials from MedicareFAQ clients about their experience with our licensed Medicare agents and the enrollment process.",
  openGraph: {
    title: "Client Testimonials | MedicareFAQ Reviews",
    description: "Read real testimonials from MedicareFAQ clients.",
    url: "https://www.medicarefaq.com/testimonials",
    type: "website",
  },
  alternates: { canonical: "https://www.medicarefaq.com/testimonials" },
};

export default function Page() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Client Testimonials | MedicareFAQ Reviews",
    description: "Read real testimonials from MedicareFAQ clients about their experience with our licensed Medicare agents and the enrollment process.",
    url: "https://www.medicarefaq.com/testimonials",
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
      { "@type": "ListItem", position: 2, name: "Testimonials" },
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
