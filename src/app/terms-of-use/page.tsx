import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Terms of Use | MedicareFAQ.com",
  description: "Review the terms and conditions governing your use of MedicareFAQ.com, operated by Elite Insurance Partners.",
  alternates: { canonical: "https://www.medicarefaq.com/terms-of-use" },
  openGraph: {
    title: "Terms of Use | MedicareFAQ.com",
    description: "Review the terms and conditions governing your use of MedicareFAQ.com, operated by Elite Insurance Partners.",
    url: "https://www.medicarefaq.com/terms-of-use",
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
