import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Contact from "./PageContent";

export const metadata: Metadata = {
  title: "Contact MedicareFAQ | Speak with a Licensed Medicare Agent",
  description: "Have questions about Medicare? Contact MedicareFAQ to speak with a licensed Medicare agent. We",
  alternates: { canonical: "https://www.medicarefaq.com/contact/" },
  openGraph: {
    title: "Contact MedicareFAQ | Speak with a Licensed Medicare Agent",
    description: "Have questions about Medicare? Contact MedicareFAQ to speak with a licensed Medicare agent. We",
    url: "https://www.medicarefaq.com/contact/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact MedicareFAQ | Speak with a Licensed Medicare Agent",
    description: "Have questions about Medicare? Contact MedicareFAQ to speak with a licensed Medicare agent.",
    url: "https://www.medicarefaq.com/contact/",
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
      url: "https://www.medicarefaq.com",
      telephone: "+18883358996",
      email: "info@medicarefaq.com",
      logo: { "@type": "ImageObject", url: "https://www.medicarefaq.com/images/medicarefaq-logo.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Contact" },
    ],
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Contact />
    </SiteLayout>
  );
}
