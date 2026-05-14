import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Medicare Advantage Plans: What They Are, How They Work & How to Enroll (2026) | MedicareFAQ",
  description: "Find the best Medicare Advantage plans for 2026. Compare costs, coverage, and enrollment options. Get expert guidance on choosing the right plan.",
  alternates: {
    canonical: "https://www.medicarefaq.com/medicare-advantage-plans/",
  },
  openGraph: {
    title: "Medicare Advantage Plans: What They Are, How They Work & How to Enroll (2026)",
    description: "Find the best Medicare Advantage plans for 2026. Compare costs, coverage, and enrollment options. Get expert guidance on choosing the right plan.",
    type: "article",
    url: "https://www.medicarefaq.com/medicare-advantage-plans/",
  },
};

export default function MedicareAdvantagePlansPage() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Can I change my Medicare Advantage plan annually?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, during the Annual Enrollment Period (October 15 - December 7), you can switch Medicare Advantage plans, move from Medicare Advantage to Original Medicare, or add/drop prescription drug coverage.",
                },
              },
              {
                "@type": "Question",
                name: "Will my Medicare Advantage plan cover me if I travel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All plans cover emergency care nationwide. For routine care, coverage depends on your plan type - most HMOs only cover routine care in your local area, while PPOs may offer some out-of-network coverage nationwide.",
                },
              },
              {
                "@type": "Question",
                name: "Can I keep seeing my doctor if they leave my plan's network?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can continue seeing them but will pay higher out-of-network costs. Alternatively, you can switch to a plan that includes your doctor during the next enrollment period or find a new doctor within your current plan's network.",
                },
              },
              {
                "@type": "Question",
                name: "Is there a catch with $0 premium Medicare Advantage plans?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "While many plans have $0 monthly premiums, you still pay your Medicare Part B premium ($185/month in 2026) plus copays and deductibles when you receive care. The $0 premium refers only to the additional plan premium.",
                },
              },
              {
                "@type": "Question",
                name: "What are the requirements to enroll in Medicare Advantage?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You must be enrolled in Medicare Part A and Part B, live in the plan's service area, and not have End-Stage Renal Disease (with some exceptions). You cannot have both Medicare Advantage and Medigap coverage simultaneously.",
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
              { "@type": "ListItem", position: 2, name: "Medicare Plans", item: "https://www.medicarefaq.com/medicare-plans/" },
              { "@type": "ListItem", position: 3, name: "Medicare Advantage Plans" },
            ],
          }),
        }}
      />
      <PageContent />
    </SiteLayout>
  );
}
