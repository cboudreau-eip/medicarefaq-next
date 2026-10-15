import type { AEPBannerStage } from "@/components/AEPStickyBanner";

/** The 2026 AEP runs October 15 through December 7, inclusive, in Eastern time. */
export function getAEPHomepageStage(now = new Date()): AEPBannerStage | null {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const day = `${values.year}-${values.month}-${values.day}`;

  if (day < "2026-10-15" || day > "2026-12-07") return null;
  if (day === "2026-12-07") return "dec7";
  if (day === "2026-12-06") return "dec6";
  if (day >= "2026-12-01") return "dec1";
  return "oct15";
}
