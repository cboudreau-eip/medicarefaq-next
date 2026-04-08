import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import ComparePlans from "./PageContent";

export const metadata: Metadata = {
  title: "Compare Medicare Plans | Supplement vs. Advantage | MedicareFAQ",
  description: "Compare Medicare Supplement and Medicare Advantage plans side by side. Find out which type of coverage is right for your health needs and budget.",
  alternates: { canonical: "https://www.medicarefaq.com/compare-rates/" },
  openGraph: {
    title: "Compare Medicare Plans | Supplement vs. Advantage | MedicareFAQ",
    description: "Compare Medicare Supplement and Medicare Advantage plans side by side. Find out which type of coverage is right for your health needs and budget.",
    url: "https://www.medicarefaq.com/compare-rates/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <ComparePlans />
    </SiteLayout>
  );
}
