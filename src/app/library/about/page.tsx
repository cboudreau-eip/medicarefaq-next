import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import AboutTeam from "./PageContent";

export const metadata: Metadata = {
  title: "About Us | MedicareFAQ",
  description: "MedicareFAQ is dedicated to helping Medicare beneficiaries understand all their Medicare options. Our services are 100% free.",
  alternates: { canonical: "https://www.medicarefaq.com/about-us/" },
  openGraph: {
    title: "About Us | MedicareFAQ",
    description: "MedicareFAQ is dedicated to helping Medicare beneficiaries understand all their Medicare options. Our services are 100% free.",
    url: "https://www.medicarefaq.com/about-us/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/xxbdybfbexe.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <AboutTeam />
    </SiteLayout>
  );
}
