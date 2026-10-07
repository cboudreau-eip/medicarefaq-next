import { ArrowRight, CalendarDays } from "lucide-react";

export type AEPBannerStage = "oct15" | "dec1" | "dec6" | "dec7";

type BannerContent = {
  message: string;
  cta: string;
};

export const aepBannerContent: Record<AEPBannerStage, BannerContent> = {
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
  aepBannerContent,
) as AEPBannerStage[];

export function isAEPBannerStage(value: string): value is AEPBannerStage {
  return aepBannerStages.includes(value as AEPBannerStage);
}

export default function AEPStickyBanner({
  stage,
  placement = "bottom",
}: {
  stage: AEPBannerStage;
  placement?: "top" | "bottom";
}) {
  const content = aepBannerContent[stage];
  const isTopBanner = placement === "top";

  return (
    <aside
      aria-label={`Medicare Annual Enrollment ${placement} announcement`}
      className={
        isTopBanner
          ? "border-b border-white/20 bg-[#112858] text-white"
          : "fixed inset-x-0 bottom-0 z-[60] border-t border-white/20 bg-[#112858] text-white shadow-[0_-6px_20px_rgba(15,23,42,0.22)]"
      }
    >
      <div
        className={`mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 text-center sm:flex-row sm:gap-5 sm:px-6 lg:px-8 ${
          isTopBanner
            ? "min-h-14 py-3 sm:py-2.5"
            : "py-[22px] sm:min-h-[76px] sm:py-5"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          {!isTopBanner && (
            <CalendarDays
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
            />
          )}
          <p className="text-sm font-semibold leading-5 sm:text-base">
            {content.message}
          </p>
        </div>
        <button
          type="button"
          disabled
          title="CTA destination coming soon"
          className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-bold shadow-sm disabled:cursor-default disabled:opacity-100 ${
            isTopBanner
              ? "bg-[#C41230] text-white"
              : "bg-[#F97316] text-[#112858]"
          }`}
        >
          {content.cta}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
