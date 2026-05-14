import type { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medigap Plans Explained 2026: Compare All 10 Plan Types | MedicareFAQ",
  description:
    "Compare all 10 Medigap (Medicare Supplement) plans for 2026 — Plan A through Plan N. See coverage charts, costs, and find the best plan for your needs.",
  openGraph: {
    title: "Medigap Plans Explained 2026: Compare All 10 Plan Types | MedicareFAQ",
    description:
      "Compare all 10 Medigap (Medicare Supplement) plans for 2026 — Plan A through Plan N. See coverage charts, costs, and find the best plan for your needs.",
    url: "https://www.medicarefaq.com/medigap-plans",
    type: "article",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medigap-plans",
  },
};

export default function MedigapPlansPage() {
  return <PageContent />;
}
