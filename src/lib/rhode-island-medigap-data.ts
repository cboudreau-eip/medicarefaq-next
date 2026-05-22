/**
 * Rhode Island Medicare Supplement Data
 * Sources: Rhode Island DBR Insurance Division, CMS Medicare Plan Finder,
 *          MoneyGeek, FairSquare Medicare - May 2026
 *
 * Key facts:
 * - ~60,000 Rhode Island Medigap enrollees
 * - Plan G avg $234/mo statewide; USAA lowest at $148/mo in Providence (military only)
 * - Humana lowest Plans B, C, F in Rhode Island
 * - AFLAC lowest Plan N at $123/mo
 * - Transamerica all 10 plan types + issue-age pricing
 * - No birthday rule in Rhode Island
 * - Under-65 coverage NOT required by state law
 * - SHIP free counseling: 1-888-884-8721
 * - Rhode Island DBR: dbr.ri.gov
 * - Attained-age rating dominates; Transamerica uses issue-age
 */
export interface Carrier {
  rank: number;
  name: string;
  badge: string;
  score: number;
  amBest: string;
  planGMonthly: string;
  planNMonthly: string;
  highlight: string;
  pros: string[];
  cons: string[];
}
export interface FaqItem {
  question: string;
  answer: string;
}
export interface PremiumRow {
  carrier: string;
  planG: string;
  planN: string;
  planF: string;
}
export interface StateRule {
  title: string;
  description: string;
}
export interface ScoringFactor {
  factor: string;
  weight: string;
  description: string;
}
export const STATE_STATS = {
  enrollees: "60,000+",
  carriers: "12+",
  lowestPlanG: "$148/mo",
  avgPlanG: "$234/mo",
  shipPhone: "1-888-884-8721",
  doiWebsite: "dbr.ri.gov",
};
export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "USAA",
    badge: "Lowest Plan G (Military Only)",
    score: 4.7,
    amBest: "A++",
    planGMonthly: "$148",
    planNMonthly: "$134",
    highlight:
      "USAA offers the lowest Plan G in Rhode Island at $148/mo and the lowest Plan A at $116/mo, combined with an A++ AM Best rating. Available only to military members and eligible family members, USAA is the top choice for Rhode Island seniors with a military background.",
    pros: [
      "Lowest Plan G in Rhode Island at $148/mo",
      "Lowest Plan A in Rhode Island at $116/mo",
      "A++ AM Best rating (highest possible)",
      "Competitive Plan N at $134/mo",
      "Competitive Plan F at $183/mo",
    ],
    cons: [
      "Only available to military members and eligible family members",
      "Limited plan selection (Plans A, F, G, N only)",
      "Attained-age pricing means premiums rise with age",
    ],
  },
  {
    rank: 2,
    name: "Humana",
    badge: "Best for Plans B, C, F",
    score: 4.4,
    amBest: "A",
    planGMonthly: "$167",
    planNMonthly: "N/A",
    highlight:
      "Humana offers the lowest Plans B ($154/mo), C ($179/mo), and F ($182/mo) in Rhode Island. Its Plan G at $167/mo is also competitive for civilians who do not qualify for USAA. Humana is the best choice for beneficiaries who want Plans B, C, or F.",
    pros: [
      "Lowest Plan B ($154/mo), C ($179/mo), and F ($182/mo) in Rhode Island",
      "Competitive Plan G at $167/mo for civilians",
      "A financial strength rating",
      "Covers Plans A, B, C, F, G, K, and L",
    ],
    cons: [
      "Does not offer Plans D, M, or N",
      "Attained-age pricing means premiums rise with age",
    ],
  },
  {
    rank: 3,
    name: "AFLAC",
    badge: "Lowest Plan N",
    score: 4.4,
    amBest: "A+",
    planGMonthly: "$184",
    planNMonthly: "$123",
    highlight:
      "AFLAC offers the lowest Plan N in Rhode Island at $123/mo, making it the top choice for beneficiaries who want the most affordable coverage with modest copays. Its A+ AM Best rating adds financial confidence.",
    pros: [
      "Lowest Plan N in Rhode Island at $123/mo",
      "A+ AM Best financial strength rating",
      "Competitive Plan G at $184/mo",
    ],
    cons: [
      "Limited plan selection (Plans A, F, G, N only)",
      "Attained-age pricing means premiums rise with age",
      "Smaller Medigap brand than Humana or AARP",
    ],
  },
  {
    rank: 4,
    name: "Transamerica",
    badge: "Best Plan Variety + Issue-Age Pricing",
    score: 4.5,
    amBest: "A",
    planGMonthly: "$169",
    planNMonthly: "$131",
    highlight:
      "Transamerica is the only Rhode Island carrier offering all 10 standardized Medigap plan types, including the rarely available Plans D, K, L, and M. Its issue-age pricing locks in your rate at enrollment, and it offers the lowest Plans D ($169/mo), K ($76/mo), and L ($113/mo) in the state.",
    pros: [
      "All 10 standardized plan types available",
      "Issue-age pricing locks in your rate at enrollment",
      "Lowest Plans D ($169/mo), K ($76/mo), and L ($113/mo) in Rhode Island",
      "Competitive Plan G at $169/mo",
      "A financial strength rating",
    ],
    cons: [
      "Higher starting premiums than attained-age carriers for some plans",
    ],
  },
  {
    rank: 5,
    name: "Mutual of Omaha",
    badge: "Best National Brand for Plan N",
    score: 4.3,
    amBest: "A+",
    planGMonthly: "N/A",
    planNMonthly: "$125",
    highlight:
      "Mutual of Omaha offers a competitive Plan N at $125/mo in Rhode Island with an A+ AM Best rating and a strong national reputation for claims handling. It is the best choice for beneficiaries who want Plan N from a well-known national carrier.",
    pros: [
      "Competitive Plan N at $125/mo",
      "A+ AM Best financial strength rating",
      "Strong national reputation for claims handling",
      "Low NAIC complaint ratio",
    ],
    cons: [
      "Plan G not listed among lowest-cost options in Rhode Island",
      "Attained-age pricing means premiums rise with age",
    ],
  },
];
export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "USAA*", planG: "$148", planN: "$134", planF: "$183" },
  { carrier: "Humana", planG: "$167", planN: "N/A", planF: "$182" },
  { carrier: "Transamerica", planG: "$169", planN: "$131", planF: "$212" },
  { carrier: "Blue Cross Blue Shield RI", planG: "$177", planN: "N/A", planF: "$209" },
  { carrier: "Bankers Life", planG: "$180", planN: "$135", planF: "N/A" },
  { carrier: "AFLAC", planG: "$184", planN: "$123", planF: "$212" },
  { carrier: "Aetna", planG: "$192", planN: "$131", planF: "$205" },
  { carrier: "Mutual of Omaha", planG: "N/A", planN: "$125", planF: "N/A" },
  { carrier: "State Average", planG: "$234", planN: "$181", planF: "$273" },
];
export const STATE_RULES: StateRule[] = [
  {
    title: "No Birthday Rule in Rhode Island",
    description:
      "Rhode Island does not have a birthday rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice especially important.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions. This is the best time to enroll.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Rhode Island does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 (such as those with disabilities). If you are under 65 and on Medicare, you may have difficulty finding Medigap coverage in Rhode Island. Some carriers offer it voluntarily at higher rates.",
  },
  {
    title: "Attained-Age Rating Dominates",
    description:
      "Most Rhode Island Medigap carriers use attained-age rating, meaning your premium increases as you get older. Transamerica uses issue-age rating where your premium is locked at the rate for your age when you enroll. Issue-age plans often start higher but can be cheaper over the long term.",
  },
  {
    title: "Excess Charges Are Allowed in Rhode Island",
    description:
      "Rhode Island does not ban Medicare excess charges. Providers who do not accept Medicare assignment can charge up to 15% more than the Medicare-approved amount. Plan G covers these excess charges; Plan N does not. If your doctors do not accept Medicare assignment, Plan G is the safer choice.",
  },
  {
    title: "Free Help via Rhode Island SHIP",
    description:
      "Rhode Island SHIP (State Health Insurance Assistance Program) provides free, unbiased Medicare counseling. Call 1-888-884-8721 or the ADRC at 401-462-4444. Regional offices serve Providence, Northern RI, West Bay, South County, East Bay, and Newport County. Counselors do not sell insurance.",
  },
];
export const SCORING_FACTORS: ScoringFactor[] = [
  {
    factor: "Financial Strength (AM Best)",
    weight: "25%",
    description: "Claims-paying ability and long-term stability",
  },
  {
    factor: "Customer Satisfaction",
    weight: "25%",
    description: "NAIC complaint ratios and member satisfaction surveys",
  },
  {
    factor: "Premium Competitiveness",
    weight: "20%",
    description: "Plan G and Plan N rates vs. Rhode Island market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Rhode Island",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, EFT discounts, and added benefits",
  },
];
export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Rhode Island for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan for new enrollees in Rhode Island. USAA offers the lowest Plan G at $148/mo (military only). For civilians, Humana offers Plan G at $167/mo. Transamerica offers all 10 plan types with issue-age pricing for long-term rate stability.",
  },
  {
    question: "Does Rhode Island have a birthday rule for Medigap?",
    answer:
      "No. Rhode Island does not have a birthday rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice very important.",
  },
  {
    question: "What is the cheapest Medicare Supplement plan in Rhode Island?",
    answer:
      "USAA offers the lowest Plan G in Rhode Island at $148/mo (military members and families only). For civilians, Humana offers Plan G at $167/mo. AFLAC has the lowest Plan N at $123/mo.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Rhode Island?",
    answer:
      "Plan G covers everything except the annual Part B deductible ($257 in 2026). Plan N also skips the Part B deductible but adds copays of up to $20 for doctor visits and up to $50 for emergency room visits. In Rhode Island, Plan N averages $181/mo vs. Plan G at $234/mo.",
  },
  {
    question: "Is USAA Medigap available to civilians in Rhode Island?",
    answer:
      "No. USAA Medigap is only available to current and former military members and their eligible family members. If you do not have a military affiliation, the next lowest Plan G option is Humana at $167/mo or Transamerica at $169/mo.",
  },
  {
    question: "What free Medicare counseling is available in Rhode Island?",
    answer:
      "Rhode Island SHIP provides free, unbiased counseling. Call 1-888-884-8721 or the ADRC at 401-462-4444. Regional offices serve Providence, Northern RI, West Bay, South County, East Bay, and Newport County.",
  },
  {
    question: "Does Rhode Island require insurers to sell Medigap to people under 65?",
    answer:
      "No. Rhode Island does not require insurers to sell Medigap to Medicare beneficiaries under 65. Some carriers offer under-65 plans voluntarily. Contact the Rhode Island Department of Business Regulation at (401) 462-9520 for a current list.",
  },
  {
    question: "What is the disadvantage of Plan G in Rhode Island?",
    answer:
      "Plan G does not cover the Medicare Part B deductible, which is $257 in 2026. You pay that amount out of pocket before Plan G coverage starts each year. USAA offers Plan G at $148/mo, so weigh that annual deductible gap against your monthly premium to see what works for your budget.",
  },
];
