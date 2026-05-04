import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Jagger Esch || Founder && CEO of MedicareFAQ",
  description: "Learn about Jagger Esch, the founder and CEO of MedicareFAQ, his background in Medicare insurance, and his mission to simplify Medicare for everyone.",
  openGraph: {
    title: "Jagger Esch || Founder && CEO of MedicareFAQ",
    description: "Learn about Jagger Esch, founder and CEO of MedicareFAQ.",
    url: "https://www.medicarefaq.com/about-us/jagger-esch",
    type: "profile",
  },
  alternates: { canonical: "https://www.medicarefaq.com/about-us/jagger-esch" },
};

export default function Page() {
  return <SiteLayout><PageContent /></SiteLayout>;
}
