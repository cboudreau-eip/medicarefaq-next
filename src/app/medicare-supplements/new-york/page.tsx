import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import NewYorkPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in New York 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement (Medigap) plans in New York for 2026. Learn about New York's guaranteed issue year-round rules, community rating, top carrier ratings, Plan G and Plan N premiums, and find the right coverage.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/new-york/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in New York 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement (Medigap) plans in New York for 2026. Learn about New York's guaranteed issue year-round rules, community rating, top carrier ratings, Plan G and Plan N premiums, and find the right coverage.",
    url: "https://www.medicarefaq.com/medicare-supplements/new-york/",
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
      <NewYorkPageContent />
    </SiteLayout>
  );
}
