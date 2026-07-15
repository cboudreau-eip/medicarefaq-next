import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Videos from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Videos | Watch & Learn about Medicare",
  description: "Watch Medicare educational videos from MedicareFAQ. Our video library covers Medicare basics, plan comparisons, enrollment tips, and more.",
  alternates: { canonical: "https://www.medicarefaq.com/videos/" },
  openGraph: {
    title: "Medicare Videos | Watch & Learn about Medicare",
    description: "Watch Medicare educational videos from MedicareFAQ. Our video library covers Medicare basics, plan comparisons, enrollment tips, and more.",
    url: "https://www.medicarefaq.com/videos/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Medicare Videos | Watch & Learn about Medicare",
    description: "Watch Medicare educational videos from MedicareFAQ. Our video library covers Medicare basics, plan comparisons, enrollment tips, and more.",
    url: "https://www.medicarefaq.com/videos/",
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
      { "@type": "ListItem", position: 2, name: "Videos" },
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
      <Videos />
    </SiteLayout>
  );
}
