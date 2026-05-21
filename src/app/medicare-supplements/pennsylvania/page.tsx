import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PennsylvaniaPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Pennsylvania 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement (Medigap) plans in Pennsylvania for 2026. See top carrier ratings, Plan G and Plan N premiums, Pennsylvania enrollment rules, and find the right coverage for your needs.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/pennsylvania/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Pennsylvania 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement (Medigap) plans in Pennsylvania for 2026. See top carrier ratings, Plan G and Plan N premiums, Pennsylvania enrollment rules, and find the right coverage for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplements/pennsylvania/",
    type: "article",
    images: [
      {
        url: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg",
      },
    ],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PennsylvaniaPageContent />
    </SiteLayout>
  );
}
