import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Medicare101 from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare 101 | A Beginner's Guide to Understanding Medicare",
  description: "Medicare provides health insurance coverage for Americans over age 65 and individuals with qualified disabilities. Learn everything you need to know about Medicare.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare101/" },
  openGraph: {
    title: "Medicare 101 | A Beginner's Guide to Understanding Medicare",
    description: "Medicare provides health insurance coverage for Americans over age 65 and individuals with qualified disabilities. Learn everything you need to know about Medicare.",
    url: "https://www.medicarefaq.com/medicare101/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicare-101.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Medicare101 />
    </SiteLayout>
  );
}
