import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Mutual of Omaha Medicare Part D Plans 2026 | Prescription Drug Coverage",
  description: "Review Mutual of Omaha Medicare Part D prescription drug plans for 2026: formulary, costs, enrollment, and how to compare with other Part D options.",
  openGraph: {
    title: "Mutual of Omaha Medicare Part D Plans 2026",
    description: "Review Mutual of Omaha Medicare Part D prescription drug plans for 2026.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha",
    type: "article",
  },
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/mutual-of-omaha" },
};

export default function Page() {
  return <SiteLayout><PageContent /></SiteLayout>;
}
