import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in Missouri 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in Missouri for 2026. Missouri's Anniversary Rule lets you switch carriers annually without underwriting. See top-rated carriers, Plan G rates from $108/mo, and expert guidance.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/missouri/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in Missouri 2026",
    description:
      "Missouri's Anniversary Rule lets you switch Medigap carriers every year without medical underwriting. Compare top carriers, Plan G rates from $108/mo, and find the best plan for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplements/missouri/",
    type: "article",
    images: [
      {
        url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Best Medicare Supplement Plans in Missouri 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Medicare Supplement Plans in Missouri 2026",
    description:
      "Missouri's Anniversary Rule lets you switch Medigap carriers every year without underwriting. Plan G from $108/mo. Compare top carriers now.",
  },
};

export default function MissouriMedicareSupplementPage() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
