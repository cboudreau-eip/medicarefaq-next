"use client";

import ZipFormModal from "@/components/ZipFormModal";

/** The shared CMS tracker records this button using its permanent tracking ID. */
export default function GuideCta({variant="part-d",description}:{variant?:"part-d"|"advantage"|"medicare"|"medigap"|"caregiver";description?:string}) {
  const content=variant==="part-d"
    ? {coverageType:"pdp" as const,title:"Explore Your Medicare Part D Options",description:"Enter your ZIP code to get started comparing prescription drug coverage options in your area.",label:"Compare Part D Plans",modalTitle:"Compare Medicare Part D Plans",subtitle:"Enter your ZIP code to explore prescription drug coverage options in your area."}
    : variant==="advantage"
    ? {coverageType:"ma" as const,title:"Explore Your Medicare Advantage Options",description:"Enter your ZIP code to get started comparing Medicare Advantage plans in your area.",label:"Compare Medicare Advantage Plans",modalTitle:"Compare Medicare Advantage Plans",subtitle:"Enter your ZIP code to explore Medicare Advantage options in your area."}
    : variant==="medigap"
    ? {coverageType:"ms" as const,title:"Explore Your Medicare Supplement Options",description:"Enter your ZIP code to compare Medicare Supplement coverage options in your area.",label:"Compare Medicare Supplement Plans",modalTitle:"Compare Medicare Supplement Plans",subtitle:"Enter your ZIP code to explore Medicare Supplement options in your area."}
    : variant==="caregiver"
    ? {coverageType:"me" as const,title:"Explore Medicare Options for Your Loved One",description:"Helping someone with Medicare? Enter their ZIP code to explore coverage options in their area.",label:"Explore Medicare Options",modalTitle:"Explore Medicare Coverage Options",subtitle:"Enter your loved one’s ZIP code to explore Medicare coverage options in their area."}
    : {coverageType:"me" as const,title:"Explore Your Medicare Coverage Options",description:"Getting ready for Medicare? Enter your ZIP code to explore coverage options in your area.",label:"Explore Medicare Options",modalTitle:"Explore Medicare Coverage Options",subtitle:"Enter your ZIP code to get started exploring your Medicare options."};
  return <aside aria-label={content.label} className="rounded-xl border-l-4 border-[#0D9488] bg-[#1B2A4A] p-6 sm:p-8 shadow-sm">
    <h2 className="text-2xl font-bold text-white mb-3">{content.title}</h2>
    <p className="text-white/90 leading-relaxed mb-5">{description??content.description}</p>
    <ZipFormModal coverageType={content.coverageType} triggerLabel={content.label} triggerId={variant==="part-d"?"part-d-enrollment-inline-cta":"guide-inline-cta"}
      trackingId="guide-cta"
      triggerClassName="w-full sm:w-auto rounded-lg bg-[#F97316] hover:bg-[#EA580C] px-6 py-3 font-bold text-white transition-colors"
      title={content.modalTitle} subtitle={content.subtitle}
      pageSection={variant==="part-d"?"guide_part_d_upper":`guide_${variant}_upper`} />
  </aside>;
}
