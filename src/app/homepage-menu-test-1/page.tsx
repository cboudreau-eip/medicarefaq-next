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
  title: "Homepage Menu Test 1",
  description: "Internal homepage preview for menu testing.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function HomepageMenuTest1() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <UtilityBar linksOnly />
        <HeaderBar centeredLogo />
        <MegaMenu lightWithCta />
      </header>

      <header className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <MobileNav />
      </header>

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
