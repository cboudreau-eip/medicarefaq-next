import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import CaliforniaPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in California 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement (Medigap) plans in California for 2026. Learn about the California birthday rule, top carrier ratings, Plan G and Plan N premiums, and find the right coverage.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/california/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in California 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement (Medigap) plans in California for 2026. Learn about the California birthday rule, top carrier ratings, Plan G and Plan N premiums, and find the right coverage.",
    url: "https://www.medicarefaq.com/medicare-supplements/california/",
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
      <CaliforniaPageContent />
    </SiteLayout>
  );
}
