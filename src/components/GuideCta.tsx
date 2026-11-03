"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import ZipFormModal from "@/components/ZipFormModal";

/** Pilot: one impression per page visit, after 50% is visible. */
export default function GuideCta() {
  const block = useRef<HTMLElement>(null);
  const viewedPath = useRef<string | null>(null);
  const pathname = usePathname();
  const capture = useCallback((event: string) => {
    // Preview, local, and CMS renderings never enter the production report.
    if (!["www.medicarefaq.com", "medicarefaq.com"].includes(location.hostname)
      || window.self !== window.top || location.search.includes("cmsPreview") || posthog.has_opted_out_capturing()) return false;
    try { return !!posthog.capture(event, {
    cta_id: "guide_part_d_compare",
    cta_version: "1",
    cta_placement: "upper",
    page_path: pathname,
    page_url: `https://www.medicarefaq.com${pathname}`,
    button_label: "Compare Part D Plans",
    destination: "https://demographics.medicarecompared.com",
    action: "open_zip_modal",
    tracking_environment: "production",
    }); } catch { return false; }
  }, [pathname]);
  useEffect(() => {
    const element = block.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    let visible = false;
    const record = () => {
      if (!visible || document.visibilityState !== "visible" || viewedPath.current === pathname) return;
      if (capture("guide_cta_view")) viewedPath.current = pathname;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      record();
    }, { threshold: [0, 0.5] });
    observer.observe(element);
    document.addEventListener("visibilitychange", record);
    // Handles late SDK initialization and consent changes without renewing idle sessions.
    const timer = window.setInterval(record, 5000);
    return () => { observer.disconnect(); clearInterval(timer); document.removeEventListener("visibilitychange", record); };
  }, [pathname, capture]);
  return <aside ref={block} aria-label="Compare Part D plans" className="rounded-xl border-l-4 border-[#0D9488] bg-[#1B2A4A] p-6 sm:p-8 shadow-sm">
    <h2 className="text-2xl font-bold text-white mb-3">Explore Your Medicare Part D Options</h2>
    <p className="text-white/90 leading-relaxed mb-5">Enter your ZIP code to get started comparing prescription drug coverage options in your area.</p>
    <div onClickCapture={event => {
      if ((event.target as HTMLElement).closest("#part-d-enrollment-inline-cta")) capture("guide_cta_click");
    }}>
      <ZipFormModal coverageType="pdp" triggerLabel="Compare Part D Plans" triggerId="part-d-enrollment-inline-cta"
        triggerClassName="w-full sm:w-auto rounded-lg bg-[#F97316] hover:bg-[#EA580C] px-6 py-3 font-bold text-white transition-colors"
        title="Compare Medicare Part D Plans" subtitle="Enter your ZIP code to explore prescription drug coverage options in your area."
        pageSection="guide_part_d_upper" />
    </div>
  </aside>;
}
