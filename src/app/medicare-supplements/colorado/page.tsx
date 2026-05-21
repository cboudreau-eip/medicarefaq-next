import type { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Colorado 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Colorado for 2026. See Plan G and Plan N premiums in Denver, top-rated carriers, state rules, and expert tips from MedicareFAQ.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/colorado/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Colorado 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in Colorado for 2026. See Plan G and Plan N premiums in Denver, top-rated carriers, state rules, and expert tips from MedicareFAQ.",
    url: "https://www.medicarefaq.com/medicare-supplements/colorado/",
    type: "website",
  },
};

export default function ColoradoPage() {
  return <PageContent />;
}
