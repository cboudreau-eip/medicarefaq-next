import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { aepBannerContent, type AEPBannerStage } from "@/components/AEPStickyBanner";
import styles from "./AEPScrollingBanner.module.css";

export default function AEPScrollingBanner({ stage }: { stage: AEPBannerStage }) {
  const { message } = aepBannerContent[stage];

  return (
    <aside aria-label="Medicare Annual Enrollment announcement" className="border-t border-white/20 bg-[#214172] text-white">
      <div className="flex min-h-14 items-center px-4 py-2 sm:px-6 lg:px-8">
        <Link
          href="/contact/"
          aria-label={`${message}. Talk to a Medicare Specialist`}
          className={styles.track}
        >
          <div className={styles.loop} aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => (
              <p key={index} className={styles.message}>
                <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>{message}</span>
                <span className="underline underline-offset-2">Talk to a Medicare Specialist</span>
              </p>
            ))}
          </div>
        </Link>
      </div>
    </aside>
  );
}
