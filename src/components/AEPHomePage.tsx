import AEPScrollingBanner from "@/components/AEPScrollingBanner";
import type { AEPBannerStage } from "@/components/AEPStickyBanner";
import MenuTestTwoHeader from "@/components/MenuTestTwoHeader";
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

// Shared by the AEP preview and the live homepage so the approved design stays identical.
export default function AEPHomePage({ stage }: { stage: AEPBannerStage }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <AEPScrollingBanner stage={stage} />

        <header className="hidden lg:block">
          <MenuTestTwoHeader />
          <MegaMenu lightWithCta searchVariant />
        </header>

        <header className="lg:hidden">
          <MobileNav />
        </header>
      </div>

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
