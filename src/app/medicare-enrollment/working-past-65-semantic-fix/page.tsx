import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import WorkingPast65Semantic from "./PageContent";

export const metadata: Metadata = {
  title: "Working past 65 and Medicare | Semantic Fix Comparison",
  description:
    "Semantic HTML proof of concept — same visual appearance with proper ul/li, table, dl, strong, and nav elements.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <SiteLayout>
      <WorkingPast65Semantic />
    </SiteLayout>
  );
}
