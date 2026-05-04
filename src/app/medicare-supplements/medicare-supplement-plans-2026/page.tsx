import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Supplement Plans 2026 | Medigap Plan Options & Updates",
  description: "See what",
  openGraph: {
    title: "Medicare Supplement Plans 2026 | Medigap Plan Options & Updates",
    description: "See what",
    url: "https://www.medicarefaq.com/medicare-supplements/medicare-supplement-plans-2026/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/medicare-supplement-plans-2026/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
