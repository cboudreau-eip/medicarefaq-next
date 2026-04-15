import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Client Care Team",
  description: "Meet the MedicareFAQ Client Care Team. Our dedicated team provides ongoing support to help you manage your Medicare coverage year-round.",
  openGraph: {
    title: "Client Care Team",
    description: "Meet the MedicareFAQ Client Care Team.",
    url: "https://www.medicarefaq.com/client-care-team",
    type: "website",
  },
  alternates: { canonical: "https://www.medicarefaq.com/client-care-team" },
};

export default function Page() {
  return <SiteLayout><PageContent /></SiteLayout>;
}
