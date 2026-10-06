import { ArrowRight } from "lucide-react";

export type AEPBannerStage = "oct15" | "dec1" | "dec6" | "dec7";

type BannerContent = {
  message: string;
  cta: string;
  urgent?: boolean;
};

const bannerContent: Record<AEPBannerStage, BannerContent> = {
  oct15: {
    message:
      "Annual Enrollment Period is here! Learn more about your options",
    cta: "Talk to a Medicare Specialist",
  },
  dec1: {
    message: "Medicare Annual Enrollment ends December 7",
    cta: "Learn more about your options",
  },
  dec6: {
    message: "Medicare Annual Enrollment ends tomorrow",
    cta: "Talk to a Medicare Specialist",
    urgent: true,
  },
  dec7: {
    message: "Medicare Annual Enrollment ends at midnight",
    cta: "Talk to a Medicare Specialist",
    urgent: true,
  },
};

export const aepBannerStages = Object.keys(
  bannerContent,
) as AEPBannerStage[];

export function isAEPBannerStage(value: string): value is AEPBannerStage {
  return aepBannerStages.includes(value as AEPBannerStage);
}

export default function AEPStickyBanner({
  stage,
}: {
  stage: AEPBannerStage;
}) {
  const content = bannerContent[stage];

  return (
    <aside
      aria-label="Medicare Annual Enrollment announcement"
      className={`border-b border-white/20 text-white ${
        content.urgent ? "bg-[#C41230]" : "bg-[#112858]"
      }`}
    >
      <div className="mx-auto flex min-h-14 max-w-7xl flex-col items-center justify-center gap-2 px-4 py-3 text-center sm:flex-row sm:gap-5 sm:px-6 sm:py-2.5 lg:px-8">
        <p className="text-sm font-semibold leading-5 sm:text-base">
          {content.message}
        </p>
        <button
          type="button"
          disabled
          title="CTA destination coming soon"
          className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-bold shadow-sm disabled:cursor-default disabled:opacity-100 ${
            content.urgent
              ? "bg-white text-[#A50F29]"
              : "bg-[#C41230] text-white"
          }`}
        >
          {content.cta}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
