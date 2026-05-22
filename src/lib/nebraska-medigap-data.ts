/**
 * Nebraska Medicare Supplement Data
 * Sources: Nebraska Department of Insurance, CMS Medicare Plan Finder,
 *          MoneyGeek, FairSquare Medicare - May 2026
 *
 * Key facts:
 * - ~290,000 Nebraska Medigap enrollees
 * - Plan G avg $326/mo statewide; MedMutual Protect lowest at $152/mo in Omaha
 * - No birthday rule or anniversary rule
 * - Under-65 coverage NOT required by state law
 * - SHIP free counseling: (800) 234-7119
 * - Nebraska DOI: doi.nebraska.gov
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
  enrollees: "290,000+",
  carriers: "35+",
  lowestPlanG: "$152/mo",
  avgPlanG: "$326/mo",
  shipPhone: "(800) 234-7119",
  doiWebsite: "doi.nebraska.gov",
};
export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "MedMutual Protect",
    badge: "Lowest Plan G in Nebraska",
    score: 4.5,
    amBest: "A+",
    planGMonthly: "$152",
    planNMonthly: "$117",
    highlight:
      "MedMutual Protect is the top-rated Medigap carrier in Nebraska for 2026, offering the lowest Plan G at $152/mo (27% below the state average), the lowest Plan N at $117/mo, and the lowest Plan F at $177/mo. As the Medigap division of Medical Mutual of Ohio, it holds an AM Best A+ rating with a strong claims-paying track record.",
    pros: [
      "Lowest Plan G in Nebraska at $152/mo (27% below average)",
      "Lowest Plan N in Nebraska at $117/mo",
      "Lowest Plan F in Nebraska at $177/mo",
      "AM Best A+ financial strength rating",
    ],
    cons: [
      "Only Plans F, G, and N available",
      "No high-deductible plan options",
      "Attained-age pricing: premiums increase with age",
    ],
  },
  {
    rank: 2,
    name: "USAA",
    badge: "Best for Military Families",
    score: 4.5,
    amBest: "A++",
    planGMonthly: "$156",
    planNMonthly: "$N/A",
    highlight:
      "USAA offers the second-lowest Plan G in Nebraska at $156/mo with an A++ AM Best rating, the highest possible. USAA Medigap is only available to military members, veterans, and their eligible family members. If you qualify, USAA is the best value Plan G in Nebraska.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Plan G at $156/mo, second-lowest in Nebraska",
      "Lowest Plan A in Nebraska at $122/mo",
      "Extra benefits for military members",
    ],
    cons: [
      "Only available to military, veterans, and eligible family members",
      "No Plans B, C, D, K, L, or M",
      "Attained-age pricing",
    ],
  },
  {
    rank: 3,
    name: "Transamerica",
    badge: "Best Plan Variety",
    score: 4.3,
    amBest: "A",
    planGMonthly: "$183",
    planNMonthly: "$N/A",
    highlight:
      "Transamerica is the only Nebraska carrier offering all 10 standard Medigap plan types with issue-age pricing. Their Plan G at $183/mo is competitive, and they offer the lowest Plans K ($82/mo) and L ($121/mo) in Nebraska. Issue-age pricing locks your rate at enrollment, which can save money over a 10 to 20 year horizon.",
    pros: [
      "All 10 standard plan types available",
      "Lowest Plans K ($82/mo) and L ($121/mo) in Nebraska",
      "Issue-age pricing locks rate at enrollment",
      "A AM Best financial strength rating",
    ],
    cons: [
      "Plan G at $183/mo, not the lowest",
      "No high-deductible plan options",
    ],
  },
  {
    rank: 4,
    name: "Globe Life",
    badge: "Best Plan A Value",
    score: 4.1,
    amBest: "A",
    planGMonthly: "$211",
    planNMonthly: "$N/A",
    highlight:
      "Globe Life offers the lowest Plan A rates in Nebraska at $135/mo and strong financial stability. Their Plan G at $211/mo is above average, but for seniors who only want Plan A coverage, Globe Life is the best value in the state.",
    pros: [
      "Lowest Plan A in Nebraska at $135/mo",
      "Six plan types including popular options",
      "A AM Best financial strength rating",
    ],
    cons: [
      "Plan G at $211/mo, above average",
      "No Plans K, L, or M",
      "Attained-age pricing",
    ],
  },
  {
    rank: 5,
    name: "Philadelphia American",
    badge: "Best Plans C, D, and M",
    score: 4.0,
    amBest: "A-",
    planGMonthly: "$N/A",
    planNMonthly: "$N/A",
    highlight:
      "Philadelphia American offers the lowest Plans C ($186/mo), D ($148/mo), and M ($95/mo) in Nebraska. With seven plan types available, it is the best choice for Nebraska seniors who want less common plan options at competitive prices.",
    pros: [
      "Lowest Plan C in Nebraska ($186/mo)",
      "Lowest Plan D in Nebraska ($148/mo)",
      "Lowest Plan M in Nebraska ($95/mo)",
      "Seven plan types available",
    ],
    cons: [
      "No Plans K or L",
      "Attained-age pricing",
      "A- AM Best rating, below top carriers",
    ],
  },
];
export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "MedMutual Protect", planG: "$152", planN: "$117", planF: "$177" },
  { carrier: "USAA*", planG: "$156", planN: "N/A", planF: "N/A" },
  { carrier: "Old Surety", planG: "$157", planN: "N/A", planF: "N/A" },
  { carrier: "LifeShield National", planG: "$160", planN: "$120", planF: "N/A" },
  { carrier: "Wellcare", planG: "$163", planN: "$120", planF: "N/A" },
  { carrier: "Transamerica", planG: "$183", planN: "N/A", planF: "N/A" },
  { carrier: "Globe Life", planG: "$211", planN: "N/A", planF: "N/A" },
  { carrier: "AARP / UnitedHealthcare", planG: "$228", planN: "$172", planF: "$265" },
  { carrier: "Mutual of Omaha", planG: "$235", planN: "$178", planF: "$272" },
];
export const STATE_RULES: StateRule[] = [
  {
    title: "No Birthday Rule or Anniversary Rule in Nebraska",
    description:
      "Nebraska does not have a birthday rule or anniversary rule. Your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B is your best opportunity to get Medigap coverage without medical underwriting. After that window, carriers can deny coverage or charge higher rates based on your health history.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions.",
  },
  {
    title: "Attained-Age Rating Dominates",
    description:
      "Most Nebraska Medigap carriers use attained-age pricing, meaning premiums increase as you age. Transamerica is a notable exception, offering issue-age pricing that locks your rate at enrollment.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Nebraska does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 on disability. Some carriers offer coverage voluntarily, but availability and pricing vary.",
  },
  {
    title: "Excess Charges Apply",
    description:
      "Nebraska allows Medicare excess charges. Plan G covers these charges; Plan N does not. If your doctors do not accept Medicare assignment, Plan G provides more complete protection.",
  },
  {
    title: "Free SHIP Counseling",
    description:
      "Nebraska SHIP counselors provide free, unbiased help comparing Medigap plans. They never recommend specific policies or agents. Call (800) 234-7119 for assistance.",
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
    description: "Plan G and Plan N rates vs. Nebraska market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Nebraska",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, EFT discounts, and added benefits",
  },
];
export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Nebraska for 2026?",
    answer:
      "Plan G is the most popular choice for new Medicare enrollees in Nebraska. MedMutual Protect offers the lowest Plan G at $152/mo, which is 27% below the state average. For the best overall value combining price and financial strength, MedMutual Protect (A+) is the top pick for most Nebraska seniors.",
  },
  {
    question: "Does Nebraska have a birthday rule for Medigap?",
    answer:
      "No. Nebraska does not have a birthday rule or anniversary rule. Your initial 6-month Open Enrollment Period when you turn 65 and enroll in Part B is your best opportunity to enroll without medical underwriting. After that window, insurers can deny coverage or charge higher rates based on your health history.",
  },
  {
    question: "What is MedMutual Protect and is it a good company?",
    answer:
      "MedMutual Protect is the Medigap division of Medical Mutual of Ohio, which holds an AM Best A+ rating. It offers the lowest Plan G, Plan N, and Plan F rates in Nebraska. The main limitation is that it only offers Plans F, G, and N, but those are the three most popular plan types.",
  },
  {
    question: "How much does Plan G cost in Nebraska?",
    answer:
      "Plan G averages $326/mo in Nebraska for a 65-year-old. The lowest available rate is $152/mo from MedMutual Protect. Rates vary significantly by carrier, so comparing multiple quotes before enrolling is important.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Nebraska?",
    answer:
      "Both Plan G and Plan N cover most Medicare out-of-pocket costs. Plan G covers excess charges (up to 15% above Medicare rates) while Plan N does not. Plan N requires copays of up to $20 for doctor visits and up to $50 for emergency room visits. MedMutual Protect Plan N is $35/mo less than their Plan G.",
  },
  {
    question: "Can I get Medigap if I am under 65 and on Medicare disability in Nebraska?",
    answer:
      "Nebraska does not require insurers to offer Medigap to people under 65 on Medicare disability. Some carriers offer coverage voluntarily, but availability and pricing vary widely. Your guaranteed right to enroll without underwriting begins at age 65 when you enroll in Part B.",
  },
  {
    question: "What is Nebraska SHIP and how can it help me?",
    answer:
      "Nebraska SHIP provides free, unbiased counseling to Medicare beneficiaries. Counselors help with plan comparisons, enrollment decisions, and appeals. Call (800) 234-7119 for assistance. Services are confidential and counselors never recommend specific policies or agents.",
  },
  {
    question: "Is issue-age pricing better than attained-age pricing in Nebraska?",
    answer:
      "Issue-age pricing locks your premium at the age you enroll, so it tends to cost less over a 10 to 20 year horizon even if the starting premium is slightly higher. Transamerica is the main Nebraska carrier offering issue-age pricing across all 10 plan types.",
  },
];
