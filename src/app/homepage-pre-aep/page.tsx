import type { Metadata } from "next";
import OriginalHomePage from "@/components/OriginalHomePage";

export const metadata: Metadata = {
  title: "Original Homepage Backup",
  description: "Saved pre-AEP homepage for restoration after Annual Enrollment.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function HomepagePreAEP() {
  return <OriginalHomePage />;
}
