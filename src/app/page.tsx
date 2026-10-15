import type { Metadata } from "next";
import AEPHomePage from "@/components/AEPHomePage";
import OriginalHomePage from "@/components/OriginalHomePage";
import { getAEPHomepageStage } from "@/lib/aep-homepage";

// Re-evaluate the Eastern-time AEP dates per request, not just at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MedicareFAQ | Your Supplemental Medicare Resource Center",
  description:
    "MedicareFAQ specializes in supplemental Medicare insurance. We make Medicare plans easy to understand, as well as easy to enroll.",
  alternates: { canonical: "https://www.medicarefaq.com/" },
  openGraph: {
    title: "MedicareFAQ | Your Supplemental Medicare Resource Center",
    description:
      "MedicareFAQ specializes in supplemental Medicare insurance. We make Medicare plans easy to understand, as well as easy to enroll.",
    url: "https://www.medicarefaq.com/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg", width: 1200, height: 630, alt: "MedicareFAQ" }],
  },
};

export default function HomePage() {
  const aepStage = getAEPHomepageStage();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MedicareFAQ",
    url: "https://www.medicarefaq.com",
    logo: "https://www.medicarefaq.com/images/medicarefaq-logo.png",
    description: "MedicareFAQ specializes in supplemental Medicare insurance. We make Medicare plans easy to understand, as well as easy to enroll.",
    foundingDate: "2014",
    sameAs: [
      "https://www.facebook.com/MedicareFAQ",
      "https://www.youtube.com/@MedicareFAQ",
      "https://www.linkedin.com/company/medicarefaq",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-854-2461",
      contactType: "customer service",
      availableLanguage: "English",
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MedicareFAQ",
    url: "https://www.medicarefaq.com",
    description: "Your Supplemental Medicare Resource Center",
    publisher: {
      "@type": "Organization",
      name: "MedicareFAQ",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.medicarefaq.com/search/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      {aepStage ? <AEPHomePage stage={aepStage} /> : <OriginalHomePage />}
    </>
  );
}
