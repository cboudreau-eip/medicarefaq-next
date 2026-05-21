import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Arizona 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Arizona for 2026. See Plan G rates from $106/mo, top carrier reviews, and expert tips for Arizona retirees in Phoenix, Tucson, and Scottsdale.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/arizona/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Arizona 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Arizona for 2026. See Plan G rates from $106/mo, top carrier reviews, and expert tips for Arizona retirees.",
    url: "https://www.medicarefaq.com/medicare-supplements/arizona/",
    type: "article",
  },
};

export default function ArizonaMedicareSupplementPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
