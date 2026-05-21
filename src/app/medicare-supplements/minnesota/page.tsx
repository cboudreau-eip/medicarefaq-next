import type { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Minnesota 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Minnesota for 2026. Minnesota uses a unique Basic and Extended Basic plan system with community rating. Compare top carriers including BCBS MN, HealthPartners, Medica, and Mutual of Omaha. Get free quotes.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/minnesota/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Minnesota 2026",
    description:
      "Minnesota uses a unique Medigap plan system with community rating. Compare top carriers and Extended Basic plan premiums. Get free quotes from licensed agents.",
    url: "https://www.medicarefaq.com/medicare-supplements/minnesota/",
    siteName: "MedicareFAQ",
    type: "article",
  },
};

export default function MinnesotaMedicareSupplementPage() {
  return <PageContent />;
}
