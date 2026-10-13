export interface FaqCategory {
  slug: string;
  label: string;
  heading: string;
  description: string;
  color: string;
  bgColor: string;
  matches: readonly string[];
}

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    slug: "coverage",
    label: "Coverage",
    heading: "Medicare Coverage FAQs",
    description: "Browse answers to Medicare coverage questions about treatments, services, medical equipment, and benefits.",
    color: "#059669",
    bgColor: "#D1FAE5",
    matches: ["Medicare Coverage", "Coverage", "General Medicare", "Medicare FAQ", "Coverage Q&A", "Medicare Basics", "Medicare Benefits"],
  },
  {
    slug: "plans-supplements",
    label: "Plans & Supplements",
    heading: "Medicare Plans & Supplements FAQs",
    description: "Find answers to questions about Medicare Supplement and Medicare Advantage plans, coverage choices, and comparisons.",
    color: "#7C3AED",
    bgColor: "#EDE9FE",
    matches: ["Medicare Supplements", "Medicare Supplement (Medigap)", "Medicare Advantage"],
  },
  {
    slug: "enrollment",
    label: "Enrollment",
    heading: "Medicare Enrollment FAQs",
    description: "Explore Medicare enrollment and eligibility questions, including enrollment periods, deadlines, and getting started.",
    color: "#2563EB",
    bgColor: "#DBEAFE",
    matches: ["Medicare Enrollment", "Enrollment", "Medicare Eligibility"],
  },
  {
    slug: "costs-drugs",
    label: "Costs & Drugs",
    heading: "Medicare Costs & Prescription Drug FAQs",
    description: "Browse Medicare cost and prescription drug questions about premiums, savings, Part D, and drug coverage.",
    color: "#DC2626",
    bgColor: "#FEE2E2",
    matches: ["Prescription Drugs", "Medicare Part D", "Costs & Savings", "Medicare Costs"],
  },
  {
    slug: "dental-vision-hearing",
    label: "Dental, Vision & Hearing",
    heading: "Medicare Dental, Vision & Hearing FAQs",
    description: "Find answers to Medicare questions about dental, vision, hearing, and supplemental coverage options.",
    color: "#0891B2",
    bgColor: "#CFFAFE",
    matches: ["Dental, Vision & Hearing"],
  },
  {
    slug: "special-situations",
    label: "Special Situations",
    heading: "Medicare FAQs for Special Situations",
    description: "Explore Medicare questions about disability, assistance programs, changing circumstances, and other special situations.",
    color: "#6B7280",
    bgColor: "#F3F4F6",
    matches: ["Medicaid & Assistance", "Medicare & Disability", "Medicare Part A", "Medicare Part B", "Medicare News"],
  },
];

export function getFaqCategoryBySlug(slug: string): FaqCategory | undefined {
  return FAQ_CATEGORIES.find((category) => category.slug === slug);
}

export function getFaqCategoryLabel(rawCategory: string): string {
  return FAQ_CATEGORIES.find((category) => category.matches.includes(rawCategory))?.label ?? "Coverage";
}

export function faqCategoryHref(label: string): string {
  const category = FAQ_CATEGORIES.find((category) => category.label === label);
  return category ? `/faqs/categories/${category.slug}/` : "/faqs/";
}
