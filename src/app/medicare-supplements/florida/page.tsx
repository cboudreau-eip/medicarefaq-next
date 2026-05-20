import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import FloridaPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Florida 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement (Medigap) plans in Florida for 2026. See carrier ratings, Plan G and Plan N premiums, and find the right coverage for your needs.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/florida/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Florida 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement (Medigap) plans in Florida for 2026. See carrier ratings, Plan G and Plan N premiums, and find the right coverage for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplements/florida/",
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
      <FloridaPageContent />
    </SiteLayout>
  );
}
