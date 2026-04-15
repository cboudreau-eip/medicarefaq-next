import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Meet the Editorial Team",
  description: "Meet the licensed Medicare experts and editorial team behind MedicareFAQ. Learn about our commitment to accurate, unbiased Medicare information.",
  openGraph: {
    title: "Meet the Editorial Team",
    description: "Meet the licensed Medicare experts behind MedicareFAQ.",
    url: "https://www.medicarefaq.com/meet-the-editorial-team",
    type: "website",
  },
  alternates: { canonical: "https://www.medicarefaq.com/meet-the-editorial-team" },
};

export default function Page() {
  return <SiteLayout><PageContent /></SiteLayout>;
}
