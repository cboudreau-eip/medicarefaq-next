import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Turning65 from "./PageContent";

export const metadata: Metadata = {
  title: "Turning 65 and Medicare | What You Need to Do",
  description: "Turning 65? Learn everything you need to know about enrolling in Medicare, your coverage options, and the steps to take before your 65th birthday.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/turning-65/" },
  openGraph: {
    title: "Turning 65 and Medicare | What You Need to Do",
    description: "Turning 65? Learn everything you need to know about enrolling in Medicare, your coverage options, and the steps to take before your 65th birthday.",
    url: "https://www.medicarefaq.com/medicare-enrollment/turning-65/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Turning65 />
    </SiteLayout>
  );
}
