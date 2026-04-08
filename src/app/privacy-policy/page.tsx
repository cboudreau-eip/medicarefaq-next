import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Privacy Policy | MedicareFAQ.com",
  description: "Read the MedicareFAQ.com privacy policy to understand how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://www.medicarefaq.com/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | MedicareFAQ.com",
    description: "Read the MedicareFAQ.com privacy policy to understand how we collect, use, and protect your personal information.",
    url: "https://www.medicarefaq.com/privacy-policy",
    type: "website",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
