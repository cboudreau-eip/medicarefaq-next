/**
 * Nevada Medicare Supplement Data
 * Sources: Nevada Division of Insurance, CMS Medicare Plan Finder,
 *          MoneyGeek, FairSquare Medicare - May 2026
 *
 * Key facts:
 * - ~420,000 Nevada Medigap enrollees
 * - Plan G avg $212/mo statewide; LifeShield National lowest at $160/mo in Las Vegas
 * - No birthday rule or anniversary rule
 * - Large Medicare Advantage market in Las Vegas and Reno
 * - SHIP free counseling: (800) 307-4444
 * - Nevada DOI: doi.nv.gov
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
  enrollees: "420,000+",
  carriers: "30+",
  lowestPlanG: "$160/mo",
  avgPlanG: "$212/mo",
  shipPhone: "(800) 307-4444",
  doiWebsite: "doi.nv.gov",
};
export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "LifeShield National",
    badge: "Lowest Plan G in Nevada",
    score: 4.3,
    amBest: "A-",
    planGMonthly: "$160",
    planNMonthly: "$117",
    highlight:
      "LifeShield National offers the lowest Plan F, Plan G, and Plan N rates in Nevada for 2026. Plan G at $160/mo is $52/mo below the state average, and Plan N at $117/mo is $125/mo below average. For Nevada seniors focused on minimizing monthly premiums, LifeShield National is the clear value leader.",
    pros: [
      "Lowest Plan G in Nevada at $160/mo ($52 below average)",
      "Lowest Plan N in Nevada at $117/mo ($125 below average)",
      "Lowest Plan F in Nevada at $192/mo",
      "A- AM Best financial strength rating",
    ],
    cons: [
      "Only Plans A, F, G, and N available",
      "No Plans K, L, or M",
      "Attained-age pricing: premiums increase with age",
    ],
  },
  {
    rank: 2,
    name: "USAA",
    badge: "Best for Military Families",
    score: 4.5,
    amBest: "A++",
    planGMonthly: "$160",
    planNMonthly: "$N/A",
    highlight:
      "USAA ties for the lowest Plan G in Nevada at $160/mo and holds an A++ AM Best rating, the highest possible. USAA also offers the lowest Plan A in Nevada at $122/mo. Available only to military members, veterans, and their eligible family members.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Tied for lowest Plan G at $160/mo",
      "Lowest Plan A in Nevada at $122/mo",
      "Extra benefits for military members",
    ],
    cons: [
      "Only available to military, veterans, and eligible family members",
      "No Plans K, L, or M",
      "Attained-age pricing",
    ],
  },
  {
    rank: 3,
    name: "State Farm",
    badge: "Best Financial Strength",
    score: 4.4,
    amBest: "A++",
    planGMonthly: "$180",
    planNMonthly: "$N/A",
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and offers local agents across Las Vegas, Henderson, Reno, and Henderson. They also offer the lowest Plans C ($231/mo) and D ($180/mo) in Nevada. For Nevada seniors who want the highest financial strength and face-to-face service, State Farm is the top choice.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Lowest Plan C in Nevada ($231/mo)",
      "Lowest Plan D in Nevada ($180/mo)",
      "Local agents across Las Vegas, Reno, and Henderson",
    ],
    cons: [
      "Plan G at $180/mo, above LifeShield and USAA",
      "No Plans K, L, or M",
      "Attained-age pricing",
    ],
  },
  {
    rank: 4,
    name: "Transamerica",
    badge: "Best Plan Variety",
    score: 4.2,
    amBest: "A",
    planGMonthly: "$196",
    planNMonthly: "$N/A",
    highlight:
      "Transamerica is the only Nevada carrier offering all 10 standard Medigap plan types with issue-age pricing. They offer the lowest Plans K ($90/mo) and L ($133/mo) in Nevada. Issue-age pricing locks your rate at enrollment, which can save money over a 10 to 20 year horizon.",
    pros: [
      "All 10 standard plan types available",
      "Lowest Plan K in Nevada ($90/mo)",
      "Lowest Plan L in Nevada ($133/mo)",
      "Issue-age pricing locks rate at enrollment",
    ],
    cons: [
      "Plan G at $196/mo, not the lowest",
      "No high-deductible plan options",
    ],
  },
  {
    rank: 5,
    name: "Aetna",
    badge: "Best Plan B Value",
    score: 4.1,
    amBest: "A",
    planGMonthly: "$214",
    planNMonthly: "$N/A",
    highlight:
      "Aetna offers the lowest Plan B rates in Nevada at $222/mo and strong financial stability. For Nevada seniors who want Plan B coverage, Aetna is the best value in the state.",
    pros: [
      "Lowest Plan B in Nevada at $222/mo",
      "A AM Best financial strength rating",
      "Wide network coverage",
    ],
    cons: [
      "Plan G at $214/mo, above average",
      "No Plans K, L, or M",
      "Attained-age pricing",
    ],
  },
];
export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "LifeShield National", planG: "$160", planN: "$117", planF: "$192" },
  { carrier: "USAA*", planG: "$160", planN: "N/A", planF: "N/A" },
  { carrier: "State Farm", planG: "$180", planN: "N/A", planF: "N/A" },
  { carrier: "Transamerica", planG: "$196", planN: "N/A", planF: "N/A" },
  { carrier: "Aetna", planG: "$214", planN: "N/A", planF: "N/A" },
  { carrier: "Mutual of Omaha", planG: "$218", planN: "$158", planF: "$252" },
  { carrier: "AARP / UnitedHealthcare", planG: "$224", planN: "$172", planF: "$259" },
];
export const STATE_RULES: StateRule[] = [
  {
    title: "No Birthday Rule or Anniversary Rule in Nevada",
    description:
      "Nevada does not have a birthday rule or anniversary rule. Your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B is your best opportunity to get Medigap coverage without medical underwriting. After that window, carriers can deny coverage or charge higher rates based on your health history.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions.",
  },
  {
    title: "Large Medicare Advantage Market",
    description:
      "Nevada, particularly Las Vegas and Reno, has a large Medicare Advantage market. However, Medigap plans offer broader provider access and no network restrictions, which can be important for seniors who travel or want to see any Medicare-accepting provider.",
  },
  {
    title: "Excess Charges Apply",
    description:
      "Nevada allows Medicare excess charges. Plan G covers these charges; Plan N does not. If your doctors do not accept Medicare assignment, Plan G provides more complete protection.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Nevada does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 on disability. Some carriers offer coverage voluntarily, but availability and pricing vary.",
  },
  {
    title: "Free MAP Counseling",
    description:
      "Nevada MAP (Medicare Assistance Program) provides free, unbiased counseling through SHIP. Southern Nevada: (702) 616-4926. Statewide: (800) 307-4444.",
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
    description: "Plan G and Plan N rates vs. Nevada market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Nevada",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, EFT discounts, and added benefits",
  },
];
export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Nevada for 2026?",
    answer:
      "Plan G is the most popular choice for new Medicare enrollees in Nevada. LifeShield National offers the lowest Plan G at $160/mo, saving $52/mo below the state average. For the best overall value combining price and financial strength, State Farm (A++) at $180/mo with local agents is a strong choice.",
  },
  {
    question: "Does Nevada have a birthday rule for Medigap?",
    answer:
      "No. Nevada does not have a birthday rule or anniversary rule. Your initial 6-month Open Enrollment Period when you turn 65 and enroll in Part B is your best opportunity to enroll without medical underwriting. After that window, insurers can deny coverage or charge higher rates based on your health history.",
  },
  {
    question: "Should I choose Medigap or Medicare Advantage in Nevada?",
    answer:
      "Nevada has a large Medicare Advantage market, especially in Las Vegas and Reno. Medicare Advantage plans often have lower premiums but come with network restrictions and copays. Medigap plans cost more per month but give you access to any Medicare-accepting provider nationwide with predictable out-of-pocket costs. The right choice depends on your health, travel habits, and financial situation.",
  },
  {
    question: "How much does Plan G cost in Nevada?",
    answer:
      "Plan G averages $212/mo in Nevada for a 65-year-old. The lowest available rate is $160/mo from LifeShield National or USAA (military only). Rates vary significantly by carrier, so comparing multiple quotes is important.",
  },
  {
    question: "Can I switch from Medicare Advantage to Medigap in Nevada?",
    answer:
      "Yes, but you may face medical underwriting unless you qualify for a guaranteed issue right. You have a guaranteed right to switch to Medigap if you are in your first year of Medicare Advantage (trial right), if your plan leaves the area, or if you move out of the plan service area. Outside of these situations, insurers can deny coverage based on your health history.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Nevada?",
    answer:
      "Both Plan G and Plan N cover most Medicare out-of-pocket costs. Plan G covers excess charges (up to 15% above Medicare rates) while Plan N does not. Plan N requires copays of up to $20 for doctor visits and up to $50 for emergency room visits. LifeShield National Plan N is $43/mo less than their Plan G.",
  },
  {
    question: "What is Nevada MAP and how can it help me?",
    answer:
      "Nevada MAP (Medicare Assistance Program) is the state SHIP program. Trained volunteers provide free, unbiased counseling on plan comparisons, Part D enrollment, claims appeals, and low-income assistance programs. Southern Nevada: (702) 616-4926. Statewide: (800) 307-4444.",
  },
  {
    question: "Is Plan N a good choice in Nevada?",
    answer:
      "Plan N can be a strong value in Nevada. LifeShield National offers Plan N at $117/mo, which is $125/mo below the state average. Plan N covers everything Plan G covers except you pay up to $20 for doctor visits and up to $50 for emergency room visits, and it does not cover excess charges. If you are relatively healthy, the premium savings often outweigh the copays.",
  },
];
