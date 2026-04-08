import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medigap Plans by Carrier: Compare Top Medicare Supplement Insurers",
  description: "Compare Medicare Supplement plans from top carriers including Mutual of Omaha, Aetna, Humana, UnitedHealthcare, and more. Find the best Medigap carrier for your needs.",
  openGraph: {
    title: "Medigap Plans by Carrier: Compare Top Medicare Supplement Insurers",
    description: "Compare Medicare Supplement plans from top carriers including Mutual of Omaha, Aetna, Humana, UnitedHealthcare, and more. Find the best Medigap carrier for your needs.",
    url: "https://www.medicarefaq.com/medicare-supplements/medigap-by-carrier/",
    type: "website",
  },
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-supplements/medigap-by-carrier/",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <PageContent />
    </SiteLayout>
  );
}
