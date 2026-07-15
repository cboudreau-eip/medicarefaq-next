import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import WorkingPast65 from "./PageContent";

export const metadata: Metadata = {
  title: "Working past 65 and Medicare | What You Need to Know",
  description:
    "If you're working past 65, you may be able to delay Medicare enrollment without penalty. Learn when to sign up, how employer coverage affects your decision, and how to avoid late fees.",
  alternates: { canonical: "https://www.medicarefaq.com/medicare-enrollment/working-past-65/" },
  openGraph: {
    title: "Working past 65 and Medicare | What You Need to Know",
    description:
      "If you're working past 65, you may be able to delay Medicare enrollment without penalty. Learn when to sign up and how to avoid late fees.",
    url: "https://www.medicarefaq.com/medicare-enrollment/working-past-65/",
    type: "article",
    images: [{ url: "https://www.medicarefaq.com/images/medicarefaq-cover.jpg" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Working past 65 and Medicare | What You Need to Know",
  description:
    "If you're working past 65, you may be able to delay Medicare enrollment without penalty. Learn when to sign up, how employer coverage affects your decision, and how to avoid late fees.",
  url: "https://www.medicarefaq.com/medicare-enrollment/working-past-65/",
  publisher: {
    "@type": "Organization",
    name: "MedicareFAQ",
    url: "https://www.medicarefaq.com",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.medicarefaq.com/" },
      { "@type": "ListItem", position: 2, name: "Medicare Enrollment", item: "https://www.medicarefaq.com/medicare-enrollment/" },
      { "@type": "ListItem", position: 3, name: "Working Past 65", item: "https://www.medicarefaq.com/medicare-enrollment/working-past-65/" },
    ],
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <WorkingPast65 />
    </SiteLayout>
  );
}
