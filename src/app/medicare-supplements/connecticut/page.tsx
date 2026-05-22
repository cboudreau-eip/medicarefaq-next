import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Connecticut 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Connecticut for 2026. Guaranteed issue year-round, community rating, no medical underwriting. Plan G from $248/mo. Free quotes.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/connecticut/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Connecticut 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Connecticut for 2026. Guaranteed issue year-round, community rating. Plan G from $248/mo.",
    url: "https://www.medicarefaq.com/medicare-supplements/connecticut/",
    type: "website",
  },
};

export default function ConnecticutPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
