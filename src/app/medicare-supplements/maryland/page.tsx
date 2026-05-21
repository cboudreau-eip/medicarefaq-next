import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Maryland 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Maryland for 2026. Maryland has a birthday rule letting you switch plans annually. Compare Plan G rates from $126/mo in Baltimore from top carriers including Mutual of Omaha, AARP/UHC, Humana, and more.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/maryland/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Maryland 2026",
    description:
      "Maryland's birthday rule lets you switch Medigap plans every year. Compare Plan G rates from $126/mo in Baltimore from top-rated carriers.",
    url: "https://www.medicarefaq.com/medicare-supplements/maryland/",
    type: "article",
  },
};

export default function MarylandPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
