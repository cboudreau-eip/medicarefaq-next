/**
 * Utah Medicare Supplement Data
 * Sources: Utah Insurance Department, CMS Medicare Plan Finder,
 *          MoneyGeek, FairSquare Medicare, The Big 65 - May 2026
 *
 * Key facts:
 * - ~65,000 Utah Medigap enrollees
 * - Plan G avg $196/mo statewide; LifeShield National lowest at $152/mo
 * - State Farm A++ rated, Plan G at $178/mo with local agents
 * - Transamerica: all 10 plan types + issue-age pricing
 * - No birthday rule in Utah
 * - Under-65 coverage NOT required by state law
 * - SHIP free counseling: 1-800-541-7735
 * - Utah DOI: insurance.utah.gov
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
  enrollees: "65,000+",
  carriers: "25+",
  lowestPlanG: "$152/mo",
  avgPlanG: "$196/mo",
  shipPhone: "1-800-541-7735",
  doiWebsite: "insurance.utah.gov",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "LifeShield National",
    badge: "Lowest Plan G in Utah",
    score: 4.5,
    amBest: "A-",
    planGMonthly: "$152",
    planNMonthly: "$119",
    highlight:
      "LifeShield National offers the lowest Plan G premium in Utah at $152/mo, saving $44/mo compared to the state average. Their attained-age pricing starts low and they offer Plans A, F, G, and N across the state.",
    pros: [
      "Lowest Plan G rate in Utah at $152/mo",
      "Competitive Plan N at $119/mo",
      "A- AM Best financial strength rating",
      "Available statewide across all Utah ZIP codes",
    ],
    cons: [
      "Attained-age pricing: premiums increase with age",
      "Limited plan selection (A, F, G, N only)",
      "Smaller brand recognition than national carriers",
    ],
  },
  {
    rank: 2,
    name: "MedMutual Protect (Medical Mutual of Ohio)",
    badge: "Best Plan F and Plan N Value",
    score: 4.4,
    amBest: "A",
    planGMonthly: "$155",
    planNMonthly: "$108",
    highlight:
      "MedMutual Protect offers the lowest Plan F in Utah at $171/mo and the lowest Plan N at $108/mo. Their Plan G at $155/mo is also highly competitive. A-rated by AM Best with strong claims-paying history.",
    pros: [
      "Lowest Plan F rate in Utah at $171/mo",
      "Lowest Plan N rate in Utah at $108/mo",
      "Competitive Plan G at $155/mo",
      "A AM Best rating with solid financial stability",
    ],
    cons: [
      "Attained-age pricing: premiums increase with age",
      "Does not offer Plans B, C, K, L, or M",
      "Smaller national brand recognition",
    ],
  },
  {
    rank: 3,
    name: "State Farm",
    badge: "Best Financial Strength",
    score: 4.5,
    amBest: "A++",
    planGMonthly: "$178",
    planNMonthly: "$132",
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and offers Plan G at $178/mo in Utah. With a large local agent network across Salt Lake City, Provo, and St. George, State Farm is the top choice for Utah seniors who prefer face-to-face service.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Extensive local agent network across Utah",
      "Six plan types including Plan D",
      "Strong brand trust and claims-paying history",
    ],
    cons: [
      "Not the cheapest Plan G in Utah",
      "Does not offer Plans K, L, or M",
      "Attained-age pricing: premiums increase with age",
    ],
  },
  {
    rank: 4,
    name: "Transamerica",
    badge: "All 10 Plan Types + Issue-Age",
    score: 4.3,
    amBest: "A",
    planGMonthly: "$183",
    planNMonthly: "$135",
    highlight:
      "Transamerica is the only carrier in Utah offering all 10 standard Medigap plan types with issue-age pricing. Your premium is locked at the rate for your age when you enroll, protecting you from age-based increases. Best choice for long-term rate stability.",
    pros: [
      "Only Utah carrier with all 10 plan types",
      "Issue-age pricing locks your rate at enrollment age",
      "Lowest Plans K ($74/mo) and L ($110/mo) in Utah",
      "A AM Best financial strength rating",
    ],
    cons: [
      "Plan G starts higher than attained-age competitors",
      "No household or EFT discounts available",
      "Smaller local agent presence in Utah",
    ],
  },
  {
    rank: 5,
    name: "USAA",
    badge: "Best for Military Families",
    score: 4.5,
    amBest: "A++",
    planGMonthly: "$160",
    planNMonthly: "$N/A",
    highlight:
      "USAA offers Plan G at $160/mo in Utah with an A++ AM Best rating. However, USAA Medigap is only available to military members, veterans, and their eligible family members. If you qualify, USAA is one of the best value carriers in the state.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Competitive Plan G at $160/mo",
      "Additional benefits for military members",
      "Strong financial stability and reputation",
    ],
    cons: [
      "Only available to military, veterans, and eligible family members",
      "Attained-age pricing: premiums increase with age",
      "Does not offer Plans B, C, D, K, L, or M",
    ],
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "LifeShield National", planG: "$152", planN: "$119", planF: "$184" },
  { carrier: "MedMutual Protect", planG: "$155", planN: "$108", planF: "$171" },
  { carrier: "USAA*", planG: "$160", planN: "N/A", planF: "$195" },
  { carrier: "State Farm", planG: "$178", planN: "$132", planF: "$210" },
  { carrier: "Transamerica", planG: "$183", planN: "$135", planF: "$198" },
  { carrier: "Humana", planG: "$195", planN: "$142", planF: "$218" },
  { carrier: "AFLAC", planG: "$188", planN: "$138", planF: "$205" },
  { carrier: "Cigna", planG: "$192", planN: "$140", planF: "$215" },
  { carrier: "AARP / UnitedHealthcare", planG: "$198", planN: "$145", planF: "$220" },
];

export const STATE_RULES: StateRule[] = [
  {
    title: "No Birthday Rule or Anniversary Rule in Utah",
    description:
      "Utah does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice especially important.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions. This is the best time to enroll.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Utah does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 (such as those with disabilities). If you are under 65 and on Medicare, you may have difficulty finding Medigap coverage in Utah. Some carriers offer it voluntarily at higher rates.",
  },
  {
    title: "Attained-Age Rating Dominates",
    description:
      "Most Utah Medigap carriers use attained-age rating, meaning your premium increases as you get older. Transamerica is a notable exception, using issue-age rating where your premium is locked at the rate for your age when you enroll. Issue-age plans often start higher but can be cheaper over the long term.",
  },
  {
    title: "Excess Charges Are Allowed in Utah",
    description:
      "Utah does not ban Medicare excess charges. Providers who do not accept Medicare assignment can charge up to 15% more than the Medicare-approved amount. Plan G covers these excess charges; Plan N does not. If your doctors do not accept Medicare assignment, Plan G is the safer choice.",
  },
  {
    title: "Free Help via Utah SHIP",
    description:
      "Utah's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-541-7735 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
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
    description: "Plan G and Plan N rates vs. Utah market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Utah",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, EFT discounts, and added benefits",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Utah for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan for new enrollees in Utah. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). LifeShield National offers the lowest Plan G at $152/mo, while State Farm (A++) provides the best combination of financial strength and local agent support.",
  },
  {
    question: "Does Utah have a birthday rule for Medigap?",
    answer:
      "No. Utah does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice very important.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Utah?",
    answer:
      "Plan G premiums in Utah average $196/mo statewide for a 65-year-old. Rates range from $152/mo (LifeShield National) to $198/mo (AARP/UHC). Premiums vary by carrier, ZIP code, age, gender, and tobacco use. Salt Lake City and Provo tend to have the most competitive rates due to higher carrier competition.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Utah?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for ER visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $108 to $145/mo in Utah vs. $152 to $198/mo for Plan G.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Utah?",
    answer:
      "You can apply to switch at any time, but outside of your initial 6-month Open Enrollment Period, you will face medical underwriting. Utah has no birthday rule, so carriers can deny your application or charge higher premiums based on your health history. Your best opportunity to lock in coverage is during your Open Enrollment Period.",
  },
  {
    question: "Is Transamerica a good choice for Medigap in Utah?",
    answer:
      "Transamerica is the only carrier in Utah offering all 10 standard Medigap plan types with issue-age pricing. This means your premium is locked at the rate for your age when you enroll and will not increase due to aging. Transamerica is a strong choice for younger enrollees (65-67) who want long-term rate stability, even though their starting premiums are slightly higher.",
  },
  {
    question: "Does Utah require Medigap coverage for people under 65?",
    answer:
      "No. Utah does not require Medigap carriers to sell policies to Medicare beneficiaries under 65. If you qualify for Medicare due to disability before age 65, your options may be limited. Some carriers like AARP/UHC and Mutual of Omaha voluntarily offer under-65 coverage at higher rates.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Utah?",
    answer:
      "Utah's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling. Call 1-800-541-7735 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance. You can also visit the Utah Insurance Department at insurance.utah.gov.",
  },
];
