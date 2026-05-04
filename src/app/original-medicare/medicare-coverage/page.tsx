import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "What Does Medicare Cover in 2026? || Medicare Coverage Guide",
  description: "Learn what Medicare covers in 2026 — from hospital stays and doctor visits to prescription drugs and preventive care. Understand Parts A, B, C, and D coverage.",
  openGraph: {
    title: "What Does Medicare Cover in 2026? || Medicare Coverage Guide",
    description: "Learn what Medicare covers in 2026 — from hospital stays and doctor visits to prescription drugs and preventive care. Understand Parts A, B, C, and D coverage.",
    url: "https://www.medicarefaq.com/original-medicare/medicare-coverage/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/original-medicare/medicare-coverage/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
