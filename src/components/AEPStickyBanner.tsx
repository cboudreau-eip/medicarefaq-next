import { ArrowRight, CalendarDays } from "lucide-react";

export type AEPBannerStage = "oct15" | "dec1" | "dec6" | "dec7";

type BannerContent = {
  message: string;
  cta: string;
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
  },
  dec7: {
    message: "Medicare Annual Enrollment ends at midnight",
    cta: "Talk to a Medicare Specialist",
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
      className="border-b border-white/20 bg-[#0D9488] text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-[22px] text-center sm:min-h-[76px] sm:flex-row sm:gap-5 sm:px-6 sm:py-5 lg:px-8">
        <div className="flex items-center justify-center gap-2">
          <CalendarDays
            aria-hidden="true"
            className="h-5 w-5 shrink-0"
          />
          <p className="text-sm font-semibold leading-5 sm:text-base">
            {content.message}
          </p>
        </div>
        <button
          type="button"
          disabled
          title="CTA destination coming soon"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-[#C41230] px-4 py-2 text-sm font-bold text-white shadow-sm disabled:cursor-default disabled:opacity-100"
        >
          {content.cta}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
