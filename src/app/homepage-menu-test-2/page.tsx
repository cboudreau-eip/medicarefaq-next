import type { Metadata } from "next";
import MenuTestTwoHeader from "@/components/MenuTestTwoHeader";
import AEPScrollingBanner from "@/components/AEPScrollingBanner";
import { isAEPBannerStage, type AEPBannerStage } from "@/components/AEPStickyBanner";
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
  title: "Homepage Menu Test 2",
  description: "Internal homepage preview for menu testing.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

type PageProps = {
  searchParams: Promise<{ stage?: string | string[] }>;
};

export default async function HomepageMenuTest2({ searchParams }: PageProps) {
  const params = await searchParams;
  const requestedStage = Array.isArray(params.stage) ? params.stage[0] : params.stage;
  const stage: AEPBannerStage = requestedStage && isAEPBannerStage(requestedStage) ? requestedStage : "oct15";

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <header className="hidden lg:block">
          <MenuTestTwoHeader />
          <MegaMenu lightWithCta searchVariant />
        </header>

        <header className="lg:hidden">
          <MobileNav />
        </header>

        <AEPScrollingBanner stage={stage} />
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
    </div>
  );
}
