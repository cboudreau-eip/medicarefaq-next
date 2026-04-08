import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import BestSupplementPlans from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans 2026 | Top Medigap Plans Ranked | MedicareFAQ",
  description: "Find the best Medicare Supplement plans for 2026. We compare Plan G, Plan N, and other top Medigap options by cost, coverage, and value.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-supplement-plans/best-supplement-plans/" },
  openGraph: {
    title: "Best Medicare Supplement Plans 2026 | Top Medigap Plans Ranked | MedicareFAQ",
    description: "Find the best Medicare Supplement plans for 2026. We compare Plan G, Plan N, and other top Medigap options by cost, coverage, and value.",
    url: "https://www.medicarefaq.com/medicare-supplement-plans/best-supplement-plans/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <BestSupplementPlans />
    </SiteLayout>
  );
}
