import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import MedicareAdvantage from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part C (Medicare Advantage) Explained 2026 | MedicareFAQ",
  description: "Learn what Medicare Part C (Medicare Advantage) covers, costs, plan types, pros & cons, and how to enroll. Compare plans in your area for 2026.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-part-c/" },
  openGraph: {
    title: "Medicare Part C (Medicare Advantage) Explained 2026 | MedicareFAQ",
    description: "Learn what Medicare Part C (Medicare Advantage) covers, costs, plan types, pros & cons, and how to enroll. Compare plans in your area for 2026.",
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
