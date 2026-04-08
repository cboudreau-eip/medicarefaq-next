import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import MedicareSupplement from "./PageContent";

export const metadata: Metadata = {
  title: "What Is a Medicare Supplement Plan? How Medigap Works",
  description: "Medicare Supplement (Medigap) plans help fill the gaps in Original Medicare. See how the plans work, what they cover, and how to choose the right one",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-supplements/" },
  openGraph: {
    title: "What Is a Medicare Supplement Plan? How Medigap Works",
    description: "Medicare Supplement (Medigap) plans help fill the gaps in Original Medicare. See how the plans work, what they cover, and how to choose the right one",
    url: "https://www.medicarefaq.com/medicare-supplements/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Supplement-8.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <MedicareSupplement />
    </SiteLayout>
  );
}
