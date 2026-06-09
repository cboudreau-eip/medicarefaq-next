import type { Metadata } from "next";
import UtilityBar from "@/components/UtilityBar";
import HeaderBar from "@/components/HeaderBar";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import TopicSection from "@/components/TopicSection";
import ZipFinderSection from "@/components/ZipFinderSection";
import ResourcesSection from "@/components/ResourcesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MedicareFAQ | Your Supplemental Medicare Resource Center",
  description:
    "MedicareFAQ specializes in supplemental Medicare insurance. We make Medicare plans easy to understand, as well as easy to enroll.",
  openGraph: {
    title: "MedicareFAQ | Your Supplemental Medicare Resource Center",
    description:
      "MedicareFAQ specializes in supplemental Medicare insurance. We make Medicare plans easy to understand, as well as easy to enroll.",
    url: "https://www.medicarefaq.com/",
    type: "website",
  },
};

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MedicareFAQ",
    url: "https://www.medicarefaq.com",
    logo: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-logo.png",
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
      target: "https://www.medicarefaq.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      {/* Navigation — Desktop */}
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar />
        <HeaderBar />
        <MegaMenu />
      </header>

      {/* Navigation — Mobile */}
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection />
        <JourneySection />
        <TopicSection />
        <ZipFinderSection />
        <ResourcesSection />
        <TestimonialsSection />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}
