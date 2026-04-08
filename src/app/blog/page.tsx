import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Blog from "./PageContent";

export const metadata: Metadata = {
  title: "Blog | MedicareFAQ",
  description: "Check out our Medicare blog where we answer the most frequently asked questions regarding everything Medicare!",
  alternates: { canonical: "https://www.medicarefaq.com/blog/" },
  openGraph: {
    title: "Blog | MedicareFAQ",
    description: "Check out our Medicare blog where we answer the most frequently asked questions regarding everything Medicare!",
    url: "https://www.medicarefaq.com/blog/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Blog />
    </SiteLayout>
  );
}
