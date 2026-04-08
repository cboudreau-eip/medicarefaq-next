import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import MedicareAdvantage from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part C | What is Medicare Part C? (Medicare Advantage)",
  description: "Medicare Part C is health insurance from a private insurance company that becomes your primary source of coverage and assumes your risk from Original Medicare.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-part-c/" },
  openGraph: {
    title: "Medicare Part C | What is Medicare Part C? (Medicare Advantage)",
    description: "Medicare Part C is health insurance from a private insurance company that becomes your primary source of coverage and assumes your risk from Original Medicare.",
    url: "https://www.medicarefaq.com/medicare-part-c/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicare-part-c.jpeg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <MedicareAdvantage />
    </SiteLayout>
  );
}
