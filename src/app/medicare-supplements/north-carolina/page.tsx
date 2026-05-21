import type { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Best Medicare Supplement Plans in North Carolina 2026 | MedicareFAQ",
  description:
    "Compare the best Medicare Supplement plans in North Carolina for 2026. Plan G starts at $95/mo in Greensboro. NC has the highest Plan G adoption rate in the Southeast. Get expert guidance from MedicareFAQ.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/north-carolina/",
  },
  openGraph: {
    title: "Best Medicare Supplement Plans in North Carolina 2026 | MedicareFAQ",
    description:
      "Compare the best Medicare Supplement plans in North Carolina for 2026. Plan G starts at $95/mo. Expert guidance from MedicareFAQ.",
    url: "https://www.medicarefaq.com/medicare-supplements/north-carolina/",
    type: "website",
    images: [
      {
        url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Best Medicare Supplement Plans in North Carolina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Medicare Supplement Plans in North Carolina 2026",
    description:
      "Plan G from $95/mo in NC. Compare top-rated carriers and find the best Medigap plan for your needs.",
  },
};

export default function NorthCarolinaMedicareSupplementPage() {
  return <PageContent />;
}
