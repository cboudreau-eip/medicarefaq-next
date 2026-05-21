import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import OhioPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Ohio 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement (Medigap) plans in Ohio for 2026. See top carrier ratings, Plan G premiums from $106/mo, Ohio enrollment rules, and find the right coverage for your needs.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/ohio/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Ohio 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement (Medigap) plans in Ohio for 2026. See top carrier ratings, Plan G premiums from $106/mo, Ohio enrollment rules, and find the right coverage for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplements/ohio/",
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
      <OhioPageContent />
    </SiteLayout>
  );
}
