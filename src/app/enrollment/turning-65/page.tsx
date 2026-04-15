import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Turning65Enrollment from "./PageContent";

export const metadata: Metadata = {
  title: "Turning 65 and Medicare: When and How to Enroll",
  description: "Learn exactly when to enroll in Medicare when turning 65, what your Initial Enrollment Period covers, and how to avoid costly late penalties.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/turning-65/" },
  openGraph: {
    title: "Turning 65 and Medicare: When and How to Enroll",
    description: "Learn exactly when to enroll in Medicare when turning 65, what your Initial Enrollment Period covers, and how to avoid costly late penalties.",
    url: "https://www.medicarefaq.com/medicare-enrollment/turning-65/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Turning65Enrollment />
    </SiteLayout>
  );
}
