/**
 * Montana Medicare Supplement Data
 * Sources: Montana Commissioner of Securities and Insurance, CMS Medicare Plan Finder,
 *          MoneyGeek, FairSquare Medicare - May 2026
 *
 * Key facts:
 * - ~185,000 Montana Medigap enrollees
 * - Plan G avg $237/mo statewide; WMI Mutual lowest at $129/mo in Billings
 * - No birthday rule or anniversary rule
 * - Under-65 coverage NOT required by state law
 * - SHIP free counseling: (800) 551-3191
 * - Montana CSI: csimt.gov
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
  enrollees: "185,000+",
  carriers: "30+",
  lowestPlanG: "$129/mo",
  avgPlanG: "$237/mo",
  shipPhone: "(800) 551-3191",
  doiWebsite: "csimt.gov",
};
export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "WMI Mutual",
    badge: "Lowest Plan G in Montana",
    score: 4.4,
    amBest: "A-",
    planGMonthly: "$129",
    planNMonthly: "$107",
    highlight:
      "WMI Mutual offers the lowest Plan G and Plan N rates in Montana for 2026. Plan G at $129/mo is 46% below the state average of $237/mo, making it the best value for Montana seniors who want comprehensive coverage at the lowest possible cost. WMI also offers the lowest Plan A in Montana at $96/mo.",
    pros: [
      "Lowest Plan G in Montana at $129/mo (46% below average)",
      "Lowest Plan N in Montana at $107/mo",
      "Lowest Plan A in Montana at $96/mo",
      "A- AM Best financial strength rating",
    ],
    cons: [
      "Only Plans A, G, and N available",
      "No high-deductible plan options",
      "Attained-age pricing: premiums increase with age",
      "Smaller carrier with less brand recognition",
    ],
  },
  {
    rank: 2,
    name: "Transamerica",
    badge: "Best Plan Variety",
    score: 4.3,
    amBest: "A",
    planGMonthly: "$156",
    planNMonthly: "$127",
    highlight:
      "Transamerica is the only Montana carrier offering all 10 standard Medigap plan types with issue-age pricing. Their Plan G at $156/mo is competitive, and they offer the lowest Plans D, K, and L in Montana. Issue-age pricing means your rate is locked at the age you enroll, which can save money over a 10 to 20 year horizon.",
    pros: [
      "All 10 standard plan types available",
      "Lowest Plan D in Montana ($156/mo)",
      "Lowest Plans K ($82/mo) and L ($121/mo)",
      "Issue-age pricing locks rate at enrollment",
      "A AM Best financial strength rating",
    ],
    cons: [
      "Plan G at $156/mo, not the absolute lowest",
      "No high-deductible plan options",
    ],
  },
  {
    rank: 3,
    name: "Nassau",
    badge: "Lowest Plan F",
    score: 4.1,
    amBest: "A-",
    planGMonthly: "$159",
    planNMonthly: "$122",
    highlight:
      "Nassau offers the lowest Plan F rate in Montana at $192/mo and competitive Plan G and Plan N pricing. Plan F covers the Part B deductible that Plan G does not, making it relevant for those who enrolled in Medicare before January 1, 2020.",
    pros: [
      "Lowest Plan F in Montana at $192/mo",
      "Competitive Plan G at $159/mo",
      "Competitive Plan N at $122/mo",
      "A- AM Best financial strength rating",
    ],
    cons: [
      "Only Plans A, F, G, and N available",
      "No Plans K, L, or M",
      "Attained-age pricing",
      "No high-deductible options",
    ],
  },
  {
    rank: 4,
    name: "Mutual of Omaha",
    badge: "Best Overall Brand",
    score: 4.4,
    amBest: "A+",
    planGMonthly: "$179",
    planNMonthly: "$N/A",
    highlight:
      "Mutual of Omaha is the most trusted Medigap brand in Montana, combining an A+ AM Best rating with the lowest Plan C rates in the state at $182/mo. Their High-Deductible Plan G is also available for seniors who want the lowest possible monthly premium with a deductible safety net.",
    pros: [
      "A+ AM Best financial strength rating",
      "Lowest Plan C in Montana ($182/mo)",
      "High-Deductible Plan G available",
      "Strong brand trust and U.S.-based customer service",
      "7% household discount available",
    ],
    cons: [
      "Plan G at $179/mo, above WMI and Transamerica",
      "No Plans K or L",
      "Attained-age pricing",
    ],
  },
  {
    rank: 5,
    name: "State Farm",
    badge: "Best Financial Strength",
    score: 4.3,
    amBest: "A++",
    planGMonthly: "$195",
    planNMonthly: "$N/A",
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and offers local agents across Billings, Missoula, Great Falls, and Bozeman. For Montana seniors who prefer face-to-face service and want the highest financial strength rating, State Farm is the top choice.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Lowest Plan B in Montana ($222/mo)",
      "Extensive local agent network statewide",
      "Strong brand trust and claims-paying history",
    ],
    cons: [
      "Plan G at $195/mo, above several competitors",
      "No Plans K, L, or M",
      "Attained-age pricing",
    ],
  },
];
export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "WMI Mutual", planG: "$129", planN: "$107", planF: "N/A" },
  { carrier: "Transamerica", planG: "$156", planN: "$127", planF: "N/A" },
  { carrier: "Nassau", planG: "$159", planN: "$122", planF: "$192" },
  { carrier: "Mutual of Omaha", planG: "$179", planN: "N/A", planF: "$215" },
  { carrier: "State Farm", planG: "$195", planN: "N/A", planF: "N/A" },
  { carrier: "AARP / UnitedHealthcare", planG: "$218", planN: "$165", planF: "$248" },
  { carrier: "Humana", planG: "$224", planN: "$171", planF: "$252" },
  { carrier: "Cigna", planG: "$231", planN: "$178", planF: "$259" },
];
export const STATE_RULES: StateRule[] = [
  {
    title: "No Birthday Rule or Anniversary Rule in Montana",
    description:
      "Montana does not have a birthday rule or anniversary rule. Your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B is your best opportunity to get Medigap coverage without medical underwriting. After that window, carriers can deny coverage or charge higher rates based on your health history.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions.",
  },
  {
    title: "Attained-Age Rating Dominates",
    description:
      "Most Montana Medigap carriers use attained-age pricing, meaning premiums increase as you age. Transamerica is a notable exception, offering issue-age pricing that locks your rate at enrollment.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Montana does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 on disability. Some carriers offer coverage voluntarily, but availability and pricing vary.",
  },
  {
    title: "Excess Charges Apply",
    description:
      "Montana allows Medicare excess charges. Plan G covers these charges; Plan N does not. If your doctors do not accept Medicare assignment, Plan G provides more complete protection.",
  },
  {
    title: "Free SHIP Counseling",
    description:
      "Montana SHIP counselors provide free, unbiased help comparing Medigap plans. They never recommend specific policies or agents. Call (800) 551-3191 for assistance.",
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
    description: "Plan G and Plan N rates vs. Montana market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Montana",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, EFT discounts, and added benefits",
  },
];
export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Montana for 2026?",
    answer:
      "Plan G is the most popular choice for new Medicare enrollees in Montana. WMI Mutual offers the lowest Plan G at $129/mo, which is 46% below the state average. For the best overall value combining price and financial strength, Mutual of Omaha (A+) at $179/mo is a strong choice. If you want all 10 plan types with issue-age pricing, Transamerica at $156/mo is the top pick.",
  },
  {
    question: "Does Montana have a birthday rule for Medigap?",
    answer:
      "No. Montana does not have a birthday rule or anniversary rule. Your initial 6-month Open Enrollment Period when you turn 65 and enroll in Part B is your best opportunity to enroll without medical underwriting. After that window, insurers can deny coverage or charge higher rates based on your health history.",
  },
  {
    question: "What is WMI Mutual and is it a good company?",
    answer:
      "WMI Mutual is a regional Medigap carrier that offers some of the lowest rates in Montana for Plans A, G, and N. It holds an A- financial strength rating from AM Best. The main limitation is that it only offers three plan types, but Plans G and N are the two most popular options for most Montana seniors.",
  },
  {
    question: "How much does Plan G cost in Montana?",
    answer:
      "Plan G averages $237/mo in Montana for a 65-year-old. The lowest available rate is $129/mo from WMI Mutual, which is 46% below the state average. Rates vary significantly by carrier, so comparing multiple quotes before enrolling is important.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Montana?",
    answer:
      "Both Plan G and Plan N cover most Medicare out-of-pocket costs. Plan G covers excess charges (up to 15% above Medicare rates) while Plan N does not. Plan N requires copays of up to $20 for doctor visits and up to $50 for emergency room visits. In Montana, WMI Mutual Plan N is $22/mo less than their Plan G.",
  },
  {
    question: "Can I get Medigap if I am under 65 and on Medicare disability in Montana?",
    answer:
      "Montana does not require insurers to offer Medigap to people under 65 on Medicare disability. Some carriers offer coverage voluntarily, but availability and pricing vary widely. Your guaranteed right to enroll without underwriting begins at age 65 when you enroll in Part B.",
  },
  {
    question: "What is Montana SHIP and how can it help me?",
    answer:
      "Montana SHIP provides free, unbiased counseling to Medicare beneficiaries. Counselors help with plan comparisons, enrollment decisions, and appeals. Call (800) 551-3191 for assistance. Services are confidential and counselors never recommend specific policies or agents.",
  },
  {
    question: "Is issue-age pricing better than attained-age pricing in Montana?",
    answer:
      "Issue-age pricing locks your premium at the age you enroll, so it tends to cost less over a 10 to 20 year horizon even if the starting premium is slightly higher. Transamerica is the main Montana carrier offering issue-age pricing across all 10 plan types.",
  },
];
