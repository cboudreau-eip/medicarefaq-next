import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import IllinoisPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Illinois 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement (Medigap) plans in Illinois for 2026. See top carrier ratings, Plan G premiums from $113/mo in Chicago, Illinois enrollment rules, and find the right coverage for your needs.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/illinois/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Illinois 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement (Medigap) plans in Illinois for 2026. See top carrier ratings, Plan G premiums from $113/mo in Chicago, Illinois enrollment rules, and find the right coverage for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplements/illinois/",
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
      <IllinoisPageContent />
    </SiteLayout>
  );
}
