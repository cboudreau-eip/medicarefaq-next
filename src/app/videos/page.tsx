import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Videos from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Videos | Watch & Learn about Medicare",
  description: "Watch Medicare educational videos from MedicareFAQ. Our video library covers Medicare basics, plan comparisons, enrollment tips, and more.",
  alternates: { canonical: "https://www.medicarefaq.com/videos/" },
  openGraph: {
    title: "Medicare Videos | Watch & Learn about Medicare",
    description: "Watch Medicare educational videos from MedicareFAQ. Our video library covers Medicare basics, plan comparisons, enrollment tips, and more.",
    url: "https://www.medicarefaq.com/videos/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Videos />
    </SiteLayout>
  );
}
