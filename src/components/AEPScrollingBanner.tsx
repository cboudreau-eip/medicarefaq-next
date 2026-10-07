import { aepBannerContent, type AEPBannerStage } from "@/components/AEPStickyBanner";
import styles from "./AEPScrollingBanner.module.css";

export default function AEPScrollingBanner({ stage }: { stage: AEPBannerStage }) {
  const { message } = aepBannerContent[stage];

  return (
    <aside aria-label="Medicare Annual Enrollment announcement" className="border-t border-white/20 bg-[#112858] text-white">
      <div className="flex min-h-14 items-center px-4 py-2 sm:px-6 lg:px-8">
        <div className={styles.track}>
          <div className={styles.loop}>
            {Array.from({ length: 4 }, (_, index) => (
              <p key={index} className={styles.message} aria-hidden={index > 0}>
                {message}
              </p>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
