import type { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Virginia 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Virginia for 2026. Virginia has a birthday rule (effective July 1, 2025) - switch carriers annually without underwriting. See Plan G rates from $100/mo in Richmond.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/virginia/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Virginia 2026",
    description:
      "Virginia's birthday rule lets you switch Medigap carriers annually without underwriting. Compare Plan G rates from $100/mo in Richmond from 30+ carriers.",
    url: "https://www.medicarefaq.com/medicare-supplements/virginia/",
    type: "website",
  },
};

export default function VirginiaPage() {
  return <PageContent />;
}
