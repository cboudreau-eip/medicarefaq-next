import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Types of Medicare Plans Explained: Original Medicare, Advantage, Medigap, Part D",
  description: "Compare all types of Medicare plans for 2026: Original Medicare (A+B), Medicare Advantage (HMO, PPO, PFFS, SNP), Medigap supplements, and Part D drug plans. Find the right fit.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plan-types",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Types of Medicare Plans Explained",
  description: "Compare all types of Medicare plans for 2026: Original Medicare, Medicare Advantage, Medigap supplements, and Part D drug plans.",
  url: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plan-types/",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Plans", item: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plans/" },
      { "@type": "ListItem", position: 3, name: "Types of Medicare Plans", item: "https://www.medicarefaq.com/medicare-part-c/medicare-advantage-plan-types/" },
    ],
  },
  publisher: { "@type": "Organization", name: "MedicareFAQ", url: "https://www.medicarefaq.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What are the 4 main types of Medicare plans?", acceptedAnswer: { "@type": "Answer", text: "The four main types are Original Medicare (Parts A and B), Medicare Advantage (Part C), Medicare Supplement (Medigap), and Medicare Part D prescription drug plans." } },
    { "@type": "Question", name: "What is the difference between Medicare Advantage and Original Medicare?", acceptedAnswer: { "@type": "Answer", text: "Original Medicare lets you see any Medicare-accepting doctor nationwide with no network restrictions but has no annual out-of-pocket cap. Medicare Advantage uses managed care networks with a $9,250 annual cap in 2026, and often includes drug coverage and extra benefits." } },
    { "@type": "Question", name: "Can I have both Medigap and Medicare Advantage?", acceptedAnswer: { "@type": "Answer", text: "No. Medigap supplements Original Medicare only. If you enroll in Medicare Advantage, you cannot also have a Medigap policy." } },
    { "@type": "Question", name: "Which type of Medicare plan is best for me?", acceptedAnswer: { "@type": "Answer", text: "If you want predictable costs and nationwide provider access, Original Medicare with Medigap is typically best. If you want lower premiums and are comfortable with a local network, Medicare Advantage may be a better fit." } },
    { "@type": "Question", name: "How much does Medicare cost per month in 2026?", acceptedAnswer: { "@type": "Answer", text: "Everyone pays the Part B premium of $202.90 per month. Medigap adds $30-$300+ monthly, Medicare Advantage often adds $0, and Part D averages $34.50 per month." } },
  ],
};

export default function Page() {
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </SiteLayout>
  );
}
