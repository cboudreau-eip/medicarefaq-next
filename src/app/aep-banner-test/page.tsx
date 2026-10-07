import type { Metadata } from "next";
import AEPStickyBanner, {
  type AEPBannerStage,
  isAEPBannerStage,
} from "@/components/AEPStickyBanner";
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
  title: "AEP Sticky Banner Test",
  description: "Internal preview of the MedicareFAQ AEP sticky banner.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

type PageProps = {
  searchParams: Promise<{ stage?: string | string[] }>;
};

export default async function AEPBannerTestPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const requestedStage = Array.isArray(params.stage)
    ? params.stage[0]
    : params.stage;
  const stage: AEPBannerStage =
    requestedStage && isAEPBannerStage(requestedStage)
      ? requestedStage
      : "oct15";

  return (
    <div className="flex min-h-screen flex-col pb-[129px] sm:pb-[77px]">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <AEPStickyBanner stage={stage} placement="top" />

        <header className="hidden lg:block">
          <UtilityBar />
          <HeaderBar />
          <MegaMenu />
        </header>

        <header className="lg:hidden">
          <MobileNav />
        </header>
      </div>

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
      <AEPStickyBanner stage={stage} placement="bottom" />
    </div>
  );
}
