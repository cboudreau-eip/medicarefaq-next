import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Turning65Semantic from "./PageContent";

export const metadata: Metadata = {
  title: "Turning 65 Medicare Timeline | Semantic Fix Comparison",
  description:
    "Semantic HTML proof of concept — same visual appearance with proper ol/li, dl, nav, and article elements.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <SiteLayout>
      <Turning65Semantic />
    </SiteLayout>
  );
}
