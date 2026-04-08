import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "How to Apply for Medicare Part B | Step-by-Step Guide",
  description: "Learn how to apply for Medicare Part B: online, by phone, or in person. Understand enrollment periods, required documents, and what to do if you missed your window.",
  openGraph: {
    title: "How to Apply for Medicare Part B | Step-by-Step Guide",
    description: "Learn how to apply for Medicare Part B: online, by phone, or in person.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/apply-for-medicare-part-b",
    type: "article",
  },
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/apply-for-medicare-part-b" },
};

export default function Page() {
  return <SiteLayout><PageContent /></SiteLayout>;
}
