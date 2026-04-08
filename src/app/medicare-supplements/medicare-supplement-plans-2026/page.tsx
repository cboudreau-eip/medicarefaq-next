import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Plan F Still Unavailable to New Enrollees",
  description: "See what",
  openGraph: {
    title: "Plan F Still Unavailable to New Enrollees",
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
