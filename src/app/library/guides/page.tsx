import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Guides from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Guides & Resources | Free Medicare Education",
  description: "Browse free Medicare guides and educational resources from MedicareFAQ. Learn about Medicare plans, enrollment, costs, and coverage in plain language.",
  alternates: { canonical: "https://www.medicarefaq.com/library/guides/" },
  openGraph: {
    title: "Medicare Guides & Resources | Free Medicare Education",
    description: "Browse free Medicare guides and educational resources from MedicareFAQ. Learn about Medicare plans, enrollment, costs, and coverage in plain language.",
    url: "https://www.medicarefaq.com/library/guides/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Guides />
    </SiteLayout>
  );
}
