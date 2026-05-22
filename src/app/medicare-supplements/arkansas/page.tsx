import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Arkansas 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Arkansas for 2026. All carriers use community pricing. Plan G from $118/mo. Ranked by MedicareFAQ Score. Free quotes.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/arkansas/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Arkansas 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Arkansas for 2026. All carriers use community pricing. Plan G from $118/mo.",
    url: "https://www.medicarefaq.com/medicare-supplements/arkansas/",
    type: "website",
  },
};

export default function ArkansasPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
