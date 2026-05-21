import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import TexasPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Texas 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement (Medigap) plans in Texas for 2026. See carrier ratings, Plan G and Plan N premiums from top carriers, and find the right coverage for Texas seniors.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/texas/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Texas 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement (Medigap) plans in Texas for 2026. See carrier ratings, Plan G and Plan N premiums from top carriers, and find the right coverage for Texas seniors.",
    url: "https://www.medicarefaq.com/medicare-supplements/texas/",
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
      <TexasPageContent />
    </SiteLayout>
  );
}
