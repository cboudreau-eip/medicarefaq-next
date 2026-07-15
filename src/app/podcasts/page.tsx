import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Podcast from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Podcasts | Listen & Learn about Medicare",
  description: "Listen to the MedicareFAQ podcast — short, expert-led audio episodes covering Medicare plans, enrollment, costs, and common questions. Free to stream.",
  alternates: { canonical: "https://www.medicarefaq.com/podcasts/" },
  openGraph: {
    title: "Medicare Podcasts | Listen & Learn about Medicare",
    description: "Listen to the MedicareFAQ podcast — short, expert-led audio episodes covering Medicare plans, enrollment, costs, and common questions. Free to stream.",
    url: "https://www.medicarefaq.com/podcasts/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Medicare Podcasts | Listen & Learn about Medicare",
    description: "Listen to the MedicareFAQ podcast — short, expert-led audio episodes covering Medicare plans, enrollment, costs, and common questions. Free to stream.",
    url: "https://www.medicarefaq.com/podcasts/",
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
      { "@type": "ListItem", position: 2, name: "Podcasts" },
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
      <Podcast />
    </SiteLayout>
  );
}
