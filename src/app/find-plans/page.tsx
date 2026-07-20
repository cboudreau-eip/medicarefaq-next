import type { Metadata } from "next";
import LeadGenForm from "./LeadGenForm";

export const metadata: Metadata = {
  title: "Find Medicare Plans in Your Area",
  description:
    "Answer a few quick questions to get matched with Medicare plans available in your area. Free, no obligation.",
  robots: { index: false, follow: false },
};

export default function FindPlansPage() {
  return <LeadGenForm />;
}
