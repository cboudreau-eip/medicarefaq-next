import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PartD from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Part D Drug Coverage",
  description: "Medicare Part D involves different coverage phases. Learn how it works here and how to find the best plan for you.",
  alternates: { canonical: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/" },
  openGraph: {
    title: "Medicare Part D Drug Coverage",
    description: "Medicare Part D involves different coverage phases. Learn how it works here and how to find the best plan for you.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-parts/medicare-part-d/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicare-part-d-1.jpeg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PartD />
    </SiteLayout>
  );
}
