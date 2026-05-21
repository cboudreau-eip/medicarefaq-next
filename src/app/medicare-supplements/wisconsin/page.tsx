import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Wisconsin 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Wisconsin for 2026. Wisconsin uses a unique plan system instead of standard lettered plans. See top carriers, premiums from $102/mo, and state rules.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/wisconsin/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Wisconsin 2026",
    description:
      "Compare top Medigap carriers in Wisconsin. Wisconsin uses a unique Basic Plan system. See premiums from $102/mo, top carriers, and state rules for 2026.",
    url: "https://www.medicarefaq.com/medicare-supplements/wisconsin/",
    type: "article",
  },
};

export default function WisconsinPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
