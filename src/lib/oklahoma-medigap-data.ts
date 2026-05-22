/**
 * Oklahoma Medicare Supplement Data
 * Sources: Oklahoma Insurance Department, CMS Medicare Plan Finder,
 *          MoneyGeek, FairSquare Medicare - May 2026
 *
 * Key facts:
 * - ~180,000 Oklahoma Medigap enrollees
 * - Plan G avg $244/mo statewide; MedMutual Protect lowest at $136/mo in OKC
 * - Farm Bureau Insurance lowest Plans B, C, D, M in Oklahoma
 * - Transamerica all 10 plan types + issue-age pricing
 * - No birthday rule in Oklahoma
 * - Under-65 coverage NOT required by state law
 * - SHIP free counseling: (800) 522-0071
 * - Oklahoma Insurance Department: www.oid.ok.gov
 * - Attained-age rating dominates; Transamerica and United American use issue-age
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
  enrollees: "180,000+",
  carriers: "20+",
  lowestPlanG: "$136/mo",
  avgPlanG: "$244/mo",
  shipPhone: "(800) 522-0071",
  doiWebsite: "www.oid.ok.gov",
};
export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "MedMutual Protect",
    badge: "Best Overall in Oklahoma",
    score: 4.7,
    amBest: "A+",
    planGMonthly: "$136",
    planNMonthly: "$96",
    highlight:
      "MedMutual Protect is the top-rated Medigap carrier in Oklahoma for 2026, offering the lowest Plan G at $136/mo and the lowest Plan N at $96/mo statewide. With an A+ AM Best rating and competitive pricing across Plans F, G, and N, it is the best all-around choice for Oklahoma seniors.",
    pros: [
      "Lowest Plan G in Oklahoma at $136/mo",
      "Lowest Plan N in Oklahoma at $96/mo",
      "A+ AM Best financial strength rating",
      "Lowest Plan F at $152/mo",
      "Covers Plans A, D, F, G, and N",
    ],
    cons: [
      "Does not offer Plans B, C, K, L, or M",
      "Attained-age pricing means premiums rise with age",
      "Smaller national brand than Mutual of Omaha or AARP",
    ],
  },
  {
    rank: 2,
    name: "Farm Bureau Insurance",
    badge: "Best for Plans B, C, D, M",
    score: 4.4,
    amBest: "A",
    planGMonthly: "$294",
    planNMonthly: "N/A",
    highlight:
      "Farm Bureau Insurance offers the lowest rates for Plans B ($152/mo), C ($112/mo), D ($104/mo), and M ($84/mo) in Oklahoma. If you want one of these less common plan types, Farm Bureau is the clear price leader. Note that its Plan G at $294/mo is well above the state average.",
    pros: [
      "Lowest Plan B ($152/mo), C ($112/mo), D ($104/mo), M ($84/mo) in Oklahoma",
      "A financial strength rating",
      "Strong local agent network across Oklahoma",
    ],
    cons: [
      "Plan G at $294/mo is well above the $244/mo state average",
      "Attained-age pricing means premiums rise with age",
      "Does not offer Plans K or L",
    ],
  },
  {
    rank: 3,
    name: "Transamerica",
    badge: "Best Plan Variety",
    score: 4.5,
    amBest: "A",
    planGMonthly: "$162",
    planNMonthly: "N/A",
    highlight:
      "Transamerica is the only Oklahoma carrier offering all 10 standardized Medigap plan types, including the rarely available Plans K, L, and M. Its issue-age pricing locks in your rate at enrollment, making it a strong long-term value for healthy enrollees who want rate stability.",
    pros: [
      "All 10 standardized plan types available",
      "Issue-age pricing locks in your rate at enrollment",
      "Lowest Plans K ($77/mo) and L ($114/mo) in Oklahoma",
      "A financial strength rating",
    ],
    cons: [
      "Plan G at $162/mo is above MedMutual Protect's $136/mo",
      "Attained-age pricing on some plans",
    ],
  },
  {
    rank: 4,
    name: "State Farm",
    badge: "Best Financial Strength",
    score: 4.5,
    amBest: "A++",
    planGMonthly: "$152",
    planNMonthly: "N/A",
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and has local agents across Oklahoma City, Tulsa, and rural Oklahoma. Its Plan G at $152/mo is competitive and its long-term financial stability is unmatched among Oklahoma Medigap carriers.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Local agents across Oklahoma City, Tulsa, and rural Oklahoma",
      "Competitive Plan G at $152/mo",
      "Strong long-term rate stability history",
    ],
    cons: [
      "Does not offer Plans K, L, or M",
      "Attained-age pricing means premiums rise with age",
    ],
  },
  {
    rank: 5,
    name: "United American",
    badge: "Lowest Plan A",
    score: 4.3,
    amBest: "A",
    planGMonthly: "$193",
    planNMonthly: "N/A",
    highlight:
      "United American offers the lowest Plan A in Oklahoma at $110/mo and uses issue-age pricing, which locks in your rate at enrollment. It covers Plans A, B, C, D, F, G, K, L, and N, making it a solid choice for beneficiaries who want issue-age stability.",
    pros: [
      "Lowest Plan A in Oklahoma at $110/mo",
      "Issue-age pricing locks in your rate at enrollment",
      "Wide plan selection (9 plan types)",
      "A financial strength rating",
    ],
    cons: [
      "Plan G at $193/mo is above MedMutual Protect's $136/mo",
      "Does not offer Plan M",
    ],
  },
];
export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "MedMutual Protect", planG: "$136", planN: "$96", planF: "$152" },
  { carrier: "Nassau", planG: "$141", planN: "N/A", planF: "N/A" },
  { carrier: "LifeShield National", planG: "$148", planN: "N/A", planF: "N/A" },
  { carrier: "USAA*", planG: "$151", planN: "N/A", planF: "N/A" },
  { carrier: "State Farm", planG: "$152", planN: "N/A", planF: "N/A" },
  { carrier: "Transamerica", planG: "$162", planN: "N/A", planF: "N/A" },
  { carrier: "United American", planG: "$193", planN: "N/A", planF: "N/A" },
  { carrier: "Farm Bureau Insurance", planG: "$294", planN: "N/A", planF: "N/A" },
  { carrier: "State Average", planG: "$244", planN: "$204", planF: "$304" },
];
export const STATE_RULES: StateRule[] = [
  {
    title: "No Birthday Rule in Oklahoma",
    description:
      "Oklahoma does not have a birthday rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice especially important.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions. This is the best time to enroll.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Oklahoma does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 (such as those with disabilities). If you are under 65 and on Medicare, you may have difficulty finding Medigap coverage in Oklahoma. Some carriers offer it voluntarily at higher rates.",
  },
  {
    title: "Attained-Age Rating Dominates",
    description:
      "Most Oklahoma Medigap carriers use attained-age rating, meaning your premium increases as you get older. Transamerica and United American use issue-age rating where your premium is locked at the rate for your age when you enroll. Issue-age plans often start higher but can be cheaper over the long term.",
  },
  {
    title: "Excess Charges Are Allowed in Oklahoma",
    description:
      "Oklahoma does not ban Medicare excess charges. Providers who do not accept Medicare assignment can charge up to 15% more than the Medicare-approved amount. Plan G covers these excess charges; Plan N does not. If your doctors do not accept Medicare assignment, Plan G is the safer choice.",
  },
  {
    title: "Free Help via Oklahoma SHIP",
    description:
      "Oklahoma's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling through the Oklahoma Insurance Department. Call (800) 522-0071 statewide, (405) 521-2828 in Oklahoma City, or (918) 295-3700 in Tulsa. Counselors do not sell insurance.",
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
    description: "Plan G and Plan N rates vs. Oklahoma market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Oklahoma",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, EFT discounts, and added benefits",
  },
];
export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Oklahoma for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan for new enrollees in Oklahoma. MedMutual Protect offers the lowest Plan G at $136/mo in Oklahoma City, which is $108 below the state average of $244/mo. For the best all-around value, MedMutual Protect (A+ rated) ranks highest for financial strength and competitive pricing.",
  },
  {
    question: "Does Oklahoma have a birthday rule for Medigap?",
    answer:
      "No. Oklahoma does not have a birthday rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice very important. Compare carefully before enrolling.",
  },
  {
    question: "What is the cheapest Medicare Supplement plan in Oklahoma?",
    answer:
      "MedMutual Protect offers the lowest Plan G at $136/mo and the lowest Plan N at $96/mo in Oklahoma. Farm Bureau Insurance has the lowest rates for Plans B ($152/mo), C ($112/mo), D ($104/mo), and M ($84/mo).",
  },
  {
    question: "What is the difference between Plan G and Plan N in Oklahoma?",
    answer:
      "Plan G covers everything except the annual Part B deductible ($257 in 2026). Plan N also skips the Part B deductible but adds copays of up to $20 for doctor visits and up to $50 for emergency room visits. In Oklahoma, Plan N averages $204/mo vs. Plan G at $244/mo.",
  },
  {
    question: "Is Farm Bureau Insurance a good Medigap carrier in Oklahoma?",
    answer:
      "Farm Bureau Insurance offers the lowest rates for Plans B, C, D, and M in Oklahoma. However, its Plan G at $294/mo is well above the state average. It is best for beneficiaries who specifically want Plans B, C, D, or M.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Oklahoma?",
    answer:
      "Outside of your initial Open Enrollment Period, you can apply to switch plans at any time, but insurers can use medical underwriting. Oklahoma has no birthday rule, so carriers can deny your application or charge higher premiums based on your health history. Your best opportunity to lock in coverage is during your Open Enrollment Period.",
  },
  {
    question: "Does Oklahoma require insurers to sell Medigap to people under 65?",
    answer:
      "No. Oklahoma does not require insurers to sell Medigap to Medicare beneficiaries under 65. Some carriers offer under-65 plans voluntarily, but availability and pricing vary. Contact the Oklahoma Insurance Department at (800) 522-0071 for a current list.",
  },
  {
    question: "What free Medicare counseling is available in Oklahoma?",
    answer:
      "Oklahoma SHIP (State Health Insurance Assistance Program) provides free, unbiased counseling through the Oklahoma Insurance Department. Call (800) 522-0071 statewide, (405) 521-2828 in Oklahoma City, or (918) 295-3700 in Tulsa. Counselors do not sell insurance.",
  },
];
