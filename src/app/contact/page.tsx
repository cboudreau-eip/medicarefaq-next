import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import Contact from "./PageContent";

export const metadata: Metadata = {
  title: "Contact MedicareFAQ | Speak with a Licensed Medicare Agent",
  description: "Have questions about Medicare? Contact MedicareFAQ to speak with a licensed Medicare agent. We",
  alternates: { canonical: "https://www.medicarefaq.com/contact/" },
  openGraph: {
    title: "Contact MedicareFAQ | Speak with a Licensed Medicare Agent",
    description: "Have questions about Medicare? Contact MedicareFAQ to speak with a licensed Medicare agent. We",
    url: "https://www.medicarefaq.com/contact/",
    type: "website",
    images: [{ url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg" }],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <Contact />
    </SiteLayout>
  );
}
