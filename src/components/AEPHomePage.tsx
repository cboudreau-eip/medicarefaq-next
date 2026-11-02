import type { AEPBannerStage } from "@/components/AEPStickyBanner";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import TopicSection from "@/components/TopicSection";
import ZipFinderSection from "@/components/ZipFinderSection";
import ResourcesSection from "@/components/ResourcesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

// Shared by the AEP preview and the live homepage so the approved design stays identical.
export default function AEPHomePage({ stage }: { stage: AEPBannerStage }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader stage={stage} />

      <main className="flex-1">
        <HeroSection headline="Medicare Annual Enrollment Is Open. Explore Your 2027 Options." aepPreview />
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
