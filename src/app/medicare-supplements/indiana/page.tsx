import type { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Indiana 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Indiana for 2026. See Plan G rates from $93/mo in Indianapolis, top carrier rankings, and Indiana Medigap rules. Independent, unbiased reviews.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/indiana/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Indiana 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Indiana for 2026. See Plan G rates from $93/mo in Indianapolis, top carrier rankings, and Indiana Medigap rules.",
    url: "https://www.medicarefaq.com/medicare-supplements/indiana/",
    type: "article",
  },
};

export default function IndianaPage() {
  return <PageContent />;
}
