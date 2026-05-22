/**
 * West Virginia Medicare Supplement Data
 * Sources: West Virginia Offices of the Insurance Commissioner, CMS Medicare Plan Finder,
 *          MoneyGeek, FairSquare Medicare, The Big 65 - May 2026
 *
 * Key facts:
 * - ~95,000 West Virginia Medigap enrollees
 * - Plan G avg $245/mo statewide; Government Personnel Mutual lowest at $132/mo
 * - MedMutual Protect lowest Plan F at $162/mo
 * - Transamerica: all 10 plan types + issue-age pricing
 * - No birthday rule in West Virginia
 * - Under-65 coverage NOT required by state law
 * - SHIP free counseling: 1-877-987-4463
 * - WV OIC: www.wvinsurance.gov
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
  enrollees: "95,000+",
  carriers: "20+",
  lowestPlanG: "$132/mo",
  avgPlanG: "$245/mo",
  shipPhone: "1-877-987-4463",
  doiWebsite: "www.wvinsurance.gov",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Government Personnel Mutual (GPM)",
    badge: "Lowest Plan G and Plan N in WV",
    score: 4.6,
    amBest: "A",
    planGMonthly: "$132",
    planNMonthly: "$97",
    highlight:
      "Government Personnel Mutual offers the lowest Plan G ($132/mo) and lowest Plan N ($97/mo) in West Virginia, saving over $100/mo compared to the state average. A-rated by AM Best with strong claims-paying history. Best overall value for West Virginia seniors.",
    pros: [
      "Lowest Plan G rate in West Virginia at $132/mo",
      "Lowest Plan N rate in West Virginia at $97/mo",
      "A AM Best financial strength rating",
      "Saves $113/mo vs. state average Plan G",
    ],
    cons: [
      "Limited plan selection (A, F, G, N only)",
      "Attained-age pricing: premiums increase with age",
      "No high-deductible options available",
    ],
  },
  {
    rank: 2,
    name: "MedMutual Protect (Medical Mutual of Ohio)",
    badge: "Lowest Plan F in West Virginia",
    score: 4.5,
    amBest: "A",
    planGMonthly: "$141",
    planNMonthly: "$99",
    highlight:
      "MedMutual Protect offers the lowest Plan F in West Virginia at $162/mo and a highly competitive Plan G at $141/mo. Their Plan N at $99/mo is the second-lowest in the state. A-rated by AM Best with solid financial stability.",
    pros: [
      "Lowest Plan F rate in West Virginia at $162/mo",
      "Competitive Plan G at $141/mo",
      "Second-lowest Plan N at $99/mo",
      "A AM Best rating with solid financial stability",
      "High-deductible Plan G option available",
    ],
    cons: [
      "Attained-age pricing: premiums increase with age",
      "Does not offer Plans B, C, K, L, or M",
      "Smaller national brand recognition",
    ],
  },
  {
    rank: 3,
    name: "USAA",
    badge: "Best for Military Families",
    score: 4.6,
    amBest: "A++",
    planGMonthly: "$141",
    planNMonthly: "$109",
    highlight:
      "USAA offers Plan G at $141/mo in West Virginia with an A++ AM Best rating. Only available to military members, veterans, and their eligible family members. If you qualify, USAA is one of the best value carriers in the state with the highest financial strength rating possible.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Lowest Plan A rate in West Virginia at $100/mo",
      "Competitive Plan G at $141/mo",
      "Additional benefits for military members",
    ],
    cons: [
      "Only available to military, veterans, and eligible family members",
      "Attained-age pricing: premiums increase with age",
      "Does not offer Plans B, C, D, K, L, or M",
    ],
  },
  {
    rank: 4,
    name: "The Health Plan (THP Insurance Co.)",
    badge: "Best Regional Carrier in WV",
    score: 4.4,
    amBest: "A-",
    planGMonthly: "$140",
    planNMonthly: "$105",
    highlight:
      "The Health Plan is a West Virginia-based regional carrier with deep roots in the state. They offer the lowest Plan D at $140/mo and a competitive Plan G at $140/mo. Their local focus means strong provider relationships and responsive customer service for WV residents.",
    pros: [
      "West Virginia-based regional carrier",
      "Lowest Plan D rate in the state at $140/mo",
      "Competitive Plan G at $140/mo",
      "Six plan types including Plans C and D",
      "Strong local provider relationships",
    ],
    cons: [
      "Attained-age pricing: premiums increase with age",
      "Does not offer Plans K, L, or M",
      "Smaller carrier with less national brand recognition",
    ],
  },
  {
    rank: 5,
    name: "Transamerica",
    badge: "All 10 Plan Types + Issue-Age",
    score: 4.3,
    amBest: "A",
    planGMonthly: "$183",
    planNMonthly: "$135",
    highlight:
      "Transamerica is the only carrier in West Virginia offering all 10 standard Medigap plan types with issue-age pricing. Your premium is locked at the rate for your age when you enroll, protecting you from age-based increases. Best choice for long-term rate stability.",
    pros: [
      "Only WV carrier with all 10 plan types",
      "Issue-age pricing locks your rate at enrollment age",
      "Lowest Plans K ($75/mo), L ($121/mo), and M ($149/mo)",
      "A AM Best financial strength rating",
    ],
    cons: [
      "Plan G starts higher than attained-age competitors",
      "No household or EFT discounts available",
      "Smaller local agent presence in West Virginia",
    ],
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Government Personnel Mutual", planG: "$132", planN: "$97", planF: "$162" },
  { carrier: "The Health Plan (THP)", planG: "$140", planN: "$105", planF: "$168" },
  { carrier: "MedMutual Protect", planG: "$141", planN: "$99", planF: "$162" },
  { carrier: "USAA*", planG: "$141", planN: "$109", planF: "$189" },
  { carrier: "Philadelphia American", planG: "$147", planN: "N/A", planF: "N/A" },
  { carrier: "LifeShield National", planG: "$148", planN: "$110", planF: "$181" },
  { carrier: "WoodmenLife", planG: "$156", planN: "$113", planF: "$193" },
  { carrier: "Transamerica", planG: "$183", planN: "$135", planF: "$198" },
  { carrier: "Globe Life", planG: "$194", planN: "N/A", planF: "$218" },
];

export const STATE_RULES: StateRule[] = [
  {
    title: "No Birthday Rule or Anniversary Rule in West Virginia",
    description:
      "West Virginia does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice especially important.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions. This is the best time to enroll.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "West Virginia does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 (such as those with disabilities). If you are under 65 and on Medicare, you may have difficulty finding Medigap coverage in West Virginia. Some carriers offer it voluntarily at higher rates.",
  },
  {
    title: "Attained-Age Rating Dominates",
    description:
      "Most West Virginia Medigap carriers use attained-age rating, meaning your premium increases as you get older. Transamerica is a notable exception, using issue-age rating where your premium is locked at the rate for your age when you enroll. Issue-age plans often start higher but can be cheaper over the long term.",
  },
  {
    title: "Excess Charges Are Allowed in West Virginia",
    description:
      "West Virginia does not ban Medicare excess charges. Providers who do not accept Medicare assignment can charge up to 15% more than the Medicare-approved amount. Plan G covers these excess charges; Plan N does not. If your doctors do not accept Medicare assignment, Plan G is the safer choice.",
  },
  {
    title: "Free Help via West Virginia SHIP",
    description:
      "West Virginia's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling through the Bureau of Senior Services. Call 1-877-987-4463 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. Counselors are located in all 55 counties.",
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
    description: "Plan G and Plan N rates vs. West Virginia market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in West Virginia",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, EFT discounts, and added benefits",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in West Virginia for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan for new enrollees in West Virginia. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). Government Personnel Mutual offers the lowest Plan G at $132/mo, saving $113/mo compared to the state average of $245/mo.",
  },
  {
    question: "Does West Virginia have a birthday rule for Medigap?",
    answer:
      "No. West Virginia does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice very important.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in West Virginia?",
    answer:
      "Plan G premiums in West Virginia average $245/mo statewide for a 65-year-old. Rates range from $132/mo (Government Personnel Mutual) to $223/mo (Aetna). Premiums vary by carrier, ZIP code, age, gender, and tobacco use. Charleston and Morgantown tend to have competitive rates due to higher carrier competition.",
  },
  {
    question: "What is the difference between Plan G and Plan N in West Virginia?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for ER visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $97 to $135/mo in West Virginia vs. $132 to $194/mo for Plan G.",
  },
  {
    question: "Can I switch Medicare Supplement plans in West Virginia?",
    answer:
      "You can apply to switch at any time, but outside of your initial 6-month Open Enrollment Period, you will face medical underwriting. West Virginia has no birthday rule, so carriers can deny your application or charge higher premiums based on your health history. Your best opportunity to lock in coverage is during your Open Enrollment Period.",
  },
  {
    question: "What is The Health Plan (THP) in West Virginia?",
    answer:
      "The Health Plan is a West Virginia-based regional carrier with deep roots in the state. They offer competitive Plan G at $140/mo and the lowest Plan D at $140/mo. Their local focus means strong provider relationships and responsive customer service for WV residents. THP is a solid choice for seniors who prefer a local carrier.",
  },
  {
    question: "Is Transamerica a good choice for Medigap in West Virginia?",
    answer:
      "Transamerica is the only carrier in West Virginia offering all 10 standard Medigap plan types with issue-age pricing. This means your premium is locked at the rate for your age when you enroll and will not increase due to aging. Transamerica is a strong choice for younger enrollees (65-67) who want long-term rate stability.",
  },
  {
    question: "Where can I get free Medicare Supplement help in West Virginia?",
    answer:
      "West Virginia's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling through the Bureau of Senior Services. Call 1-877-987-4463 to speak with a trained counselor in any of the state's 55 counties. There is no cost and counselors do not sell insurance. You can also contact the WV Insurance Commissioner at www.wvinsurance.gov.",
  },
];
