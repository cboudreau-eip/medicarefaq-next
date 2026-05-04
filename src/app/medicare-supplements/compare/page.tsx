import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Compare All Medicare Supplement Plans Side by Side || 2026",
  description: "Compare all 10 Medigap plan letters side by side. See which Medicare Supplement plan covers what, and find the best plan for your health and budget.",
  openGraph: {
    title: "Compare All Medicare Supplement Plans Side by Side || 2026",
    description: "Compare all 10 Medigap plan letters side by side. See which Medicare Supplement plan covers what, and find the best plan for your health and budget.",
    url: "https://www.medicarefaq.com/medicare-supplements/compare/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/compare/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
