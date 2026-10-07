import { ArrowRight } from "lucide-react";
import { aepBannerContent, type AEPBannerStage } from "@/components/AEPStickyBanner";
import styles from "./AEPScrollingBanner.module.css";

export default function AEPScrollingBanner({ stage }: { stage: AEPBannerStage }) {
  const { message, cta } = aepBannerContent[stage];

  return (
    <aside aria-label="Medicare Annual Enrollment announcement" className="border-t border-white/20 bg-[#112858] text-white">
      <div className="flex min-h-14 flex-col items-center gap-2 px-4 py-2 sm:flex-row sm:gap-5 sm:px-6 lg:px-8">
        <div className={styles.track}>
          <div className={styles.loop}>
            {Array.from({ length: 4 }, (_, index) => (
              <p key={index} className={styles.message} aria-hidden={index > 0}>
                {message}
              </p>
            ))}
          </div>
        </div>
        <button
          type="button"
          disabled
          title="CTA destination coming soon"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#C41230] px-4 py-2 text-sm font-bold text-white shadow-sm disabled:cursor-default disabled:opacity-100"
        >
          {cta}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
