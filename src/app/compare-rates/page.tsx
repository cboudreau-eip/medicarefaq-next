import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "You want maximum freedom",
  description: "Compare Medicare Supplement and Medicare Advantage plans side by side. Find out which type of coverage is right for your health needs and budget.",
  openGraph: {
    title: "You want maximum freedom",
    description: "Compare Medicare Supplement and Medicare Advantage plans side by side. Find out which type of coverage is right for your health needs and budget.",
    url: "https://www.medicarefaq.com/compare-rates/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/compare-rates/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
