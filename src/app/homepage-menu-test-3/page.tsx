import type { Metadata } from "next";
import MenuTestThreeHeader from "@/components/MenuTestThreeHeader";
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
  title: "Homepage Menu Test 3",
  description: "Internal homepage preview for menu testing.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function HomepageMenuTest3() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="hidden lg:block sticky top-0 z-50 bg-white shadow-sm">
        <MenuTestThreeHeader />
        <MegaMenu dividedNavy />
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
