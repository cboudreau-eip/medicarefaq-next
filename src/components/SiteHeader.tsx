"use client";

import { useEffect, useRef, useState } from "react";
import AEPScrollingBanner from "@/components/AEPScrollingBanner";
import type { AEPBannerStage } from "@/components/AEPStickyBanner";
import MenuTestTwoHeader from "@/components/MenuTestTwoHeader";
import MegaMenu from "@/components/MegaMenu";
import MobileNav from "@/components/MobileNav";
import { getAEPHomepageStage } from "@/lib/aep-homepage";

export default function SiteHeader({ stage }: { stage?: AEPBannerStage }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [scheduledStage, setScheduledStage] = useState<AEPBannerStage | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => document.documentElement.style.setProperty(
      "--site-header-height", `${header.getBoundingClientRect().height}px`,
    );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Explicit stages keep the homepage preview reproducible. Static public
    // pages use the current Eastern date, rather than freezing the build date.
    if (stage !== undefined) return;
    const updateStage = () => setScheduledStage(getAEPHomepageStage());
    updateStage();
    const timer = window.setInterval(updateStage, 60_000);
    return () => window.clearInterval(timer);
  }, [stage]);

  const activeStage = stage ?? scheduledStage;

  return (
    <div ref={headerRef} data-site-header className="sticky top-0 z-50 bg-white shadow-sm">
      {activeStage && <AEPScrollingBanner stage={activeStage} />}
      <header className="hidden lg:block">
        <MenuTestTwoHeader />
        <MegaMenu lightWithCta searchVariant />
      </header>
      <header className="lg:hidden">
        <MobileNav />
      </header>
    </div>
  );
}
