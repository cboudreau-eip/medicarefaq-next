"use client";

import ZipFormModal from "@/components/ZipFormModal";

/** The shared CMS tracker records this button using its permanent tracking ID. */
export default function GuideCta() {
  return <aside aria-label="Compare Part D plans" className="rounded-xl border-l-4 border-[#0D9488] bg-[#1B2A4A] p-6 sm:p-8 shadow-sm">
    <h2 className="text-2xl font-bold text-white mb-3">Explore Your Medicare Part D Options</h2>
    <p className="text-white/90 leading-relaxed mb-5">Enter your ZIP code to get started comparing prescription drug coverage options in your area.</p>
    <ZipFormModal coverageType="pdp" triggerLabel="Compare Part D Plans" triggerId="part-d-enrollment-inline-cta"
      trackingId="part-d-enrollment-inline-cta"
      triggerClassName="w-full sm:w-auto rounded-lg bg-[#F97316] hover:bg-[#EA580C] px-6 py-3 font-bold text-white transition-colors"
      title="Compare Medicare Part D Plans" subtitle="Enter your ZIP code to explore prescription drug coverage options in your area."
      pageSection="guide_part_d_upper" />
  </aside>;
}
