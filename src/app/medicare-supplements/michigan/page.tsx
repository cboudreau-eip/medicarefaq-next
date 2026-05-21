import type { Metadata } from "next";
import MichiganPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Michigan 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Michigan for 2026. Plan G starts at $99/mo in Grand Rapids. We ranked 5 top carriers by price, financial strength, and complaints.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/michigan/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Michigan 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Michigan for 2026. Plan G starts at $99/mo in Grand Rapids. We ranked 5 top carriers by price, financial strength, and complaints.",
    url: "https://www.medicarefaq.com/medicare-supplements/michigan/",
    type: "article",
  },
};

export default function MichiganPage() {
  return <MichiganPageContent />;
}
