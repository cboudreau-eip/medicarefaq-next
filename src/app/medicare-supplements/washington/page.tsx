import type { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Washington State 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Washington state for 2026. Washington has a unique year-round switching rule - switch Medigap plans any month with no health screening. Compare top carriers including Regence BlueShield, Premera Blue Cross, and more.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/washington/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Washington State 2026",
    description:
      "Washington's year-round Medigap switching rule lets you compare and switch plans any month. Compare top WA carriers and find Plan G from $115/mo.",
    url: "https://www.medicarefaq.com/medicare-supplements/washington/",
    type: "article",
  },
};

export default function WashingtonMedicareSupplementPage() {
  return <PageContent />;
}
