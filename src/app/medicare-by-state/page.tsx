import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medigap Birthday Rule by State 2026 | Which States Allow Plan Switching?",
  description:
    "See which states have a Medigap birthday rule that lets you switch Medicare Supplement plans without medical underwriting. Interactive map with state-by-state details.",
  openGraph: {
    title: "Medigap Birthday Rule by State 2026 | Which States Allow Plan Switching?",
    description:
      "See which states have a Medigap birthday rule that lets you switch Medicare Supplement plans without medical underwriting. Interactive map with state-by-state details.",
    url: "https://www.medicarefaq.com/medicare-by-state/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-by-state/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
