/**
 * Mississippi Medicare Supplement Data
 * Key facts:
 * - No birthday rule
 * - Attained-age pricing dominant (premiums increase with age)
 * - LifeShield National: lowest Plan G at $123/mo
 * - New Era: lowest Plan A ($95/mo), Plan M ($84/mo), Plan N ($83/mo)
 * - Blue Cross Blue Shield of Mississippi: lowest Plan B ($133/mo), C ($156/mo), D ($141/mo)
 * - MedMutual Protect: lowest Plan F at $142/mo with issue-age pricing
 * - Transamerica: all 10 plan types + issue-age pricing
 * - SHIP: (844) 822-4622 or (601) 709-0624 (Jackson area)
 * - 38 carriers licensed in Mississippi
 */

export interface Carrier {
  rank: number;
  name: string;
  badge: string;
  score: number;
  planGMonthly: string;
  planNMonthly: string;
  amBest: string;
  highlight: string;
  pros: string[];
  cons: string[];
}

export const STATE_STATS = {
  enrollees: "150,000+",
  carriers: "38",
  lowestPlanG: "$123/mo",
  lowestPlanN: "$83/mo",
  avgPlanG: "$224/mo",
  shipPhone: "(844) 822-4622",
  shipName: "Mississippi SHIP",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "LifeShield National",
    badge: "Best Plan G",
    score: 4.6,
    planGMonthly: "$123/mo",
    planNMonthly: "$N/A",
    amBest: "A-",
    highlight:
      "LifeShield National offers the lowest Plan G in Mississippi at $123/mo, saving $101/mo vs. the state average of $224/mo. The carrier focuses on Plans A, F, G, and N with competitive pricing across all four options.",
    pros: [
      "Lowest Plan G in Mississippi at $123/mo",
      "Saves $101/mo vs. the state average",
      "Competitive rates on Plans A, F, G, and N",
      "A- AM Best rating",
    ],
    cons: [
      "Does not offer Plans B, C, D, K, L, or M",
      "Attained-age pricing: premiums increase with age",
      "No high-deductible Plan G",
    ],
  },
  {
    rank: 2,
    name: "MedMutual Protect",
    badge: "Best Plan F + Issue-Age Pricing",
    score: 4.5,
    planGMonthly: "$128/mo",
    planNMonthly: "$N/A",
    amBest: "A+",
    highlight:
      "MedMutual Protect offers the lowest Plan F in Mississippi at $142/mo and uses issue-age pricing, which locks your premium at your enrollment age. Plan G is $128/mo, the second-lowest in the state.",
    pros: [
      "Lowest Plan F in Mississippi at $142/mo",
      "Issue-age pricing locks in rates at enrollment",
      "Plan G at $128/mo, second-lowest in state",
      "A+ AM Best rating",
    ],
    cons: [
      "Does not offer Plans K, L, or M",
      "No high-deductible Plan G",
    ],
  },
  {
    rank: 3,
    name: "New Era",
    badge: "Best Plans A, M, and N",
    score: 4.2,
    planGMonthly: "$38/mo",
    planNMonthly: "$83/mo",
    amBest: "A-",
    highlight:
      "New Era offers the lowest Plan A ($95/mo), Plan M ($84/mo), and Plan N ($83/mo) in Mississippi. Plan N at $83/mo is the lowest in the state, saving $94/mo vs. the average. Six plan types available including less common Plans M and D.",
    pros: [
      "Lowest Plan A in Mississippi at $95/mo",
      "Lowest Plan M in Mississippi at $84/mo",
      "Lowest Plan N in Mississippi at $83/mo",
      "Six plan types including Plans M and D",
    ],
    cons: [
      "Attained-age pricing: premiums increase with age",
      "No cost-sharing plans (K or L)",
      "Plan G listed at $38/mo (high-deductible only)",
    ],
  },
  {
    rank: 4,
    name: "Blue Cross Blue Shield of Mississippi",
    badge: "Best Plans B, C, and D",
    score: 4.2,
    planGMonthly: "$142/mo",
    planNMonthly: "$N/A",
    amBest: "A",
    highlight:
      "Blue Cross Blue Shield of Mississippi offers the lowest Plan B ($133/mo), Plan C ($156/mo), and Plan D ($141/mo) in the state. The local carrier has a strong provider network across Jackson, Gulfport, and rural Mississippi.",
    pros: [
      "Lowest Plan B in Mississippi at $133/mo",
      "Lowest Plan C in Mississippi at $156/mo",
      "Lowest Plan D in Mississippi at $141/mo",
      "Strong local provider network",
      "A AM Best rating",
    ],
    cons: [
      "Does not offer Plans N, K, L, or M",
      "Attained-age pricing: premiums increase with age",
    ],
  },
  {
    rank: 5,
    name: "Transamerica",
    badge: "Most Plan Types + Issue-Age Pricing",
    score: 4.3,
    planGMonthly: "$188/mo",
    planNMonthly: "$N/A",
    amBest: "A",
    highlight:
      "Transamerica is the only carrier offering all 10 standardized Medigap plan types in Mississippi. Issue-age pricing locks your premium at your enrollment age. Lowest Plan L at $124/mo.",
    pros: [
      "All 10 plan types available",
      "Issue-age pricing locks in rates at enrollment",
      "Lowest Plan L in Mississippi at $124/mo",
      "A AM Best rating",
    ],
    cons: [
      "Plan G at $188/mo is above the state lowest",
      "No high-deductible Plan G",
    ],
  },
];

export const PREMIUM_TABLE = [
  { carrier: "LifeShield National", planG: "$123/mo", planN: "$N/A", planF: "$N/A" },
  { carrier: "MedMutual Protect", planG: "$128/mo", planN: "$N/A", planF: "$142/mo" },
  { carrier: "Atlantic Capital", planG: "$135/mo", planN: "$N/A", planF: "$N/A" },
  { carrier: "Blue Cross Blue Shield MS", planG: "$142/mo", planN: "$N/A", planF: "$N/A" },
  { carrier: "Wellcare", planG: "$145/mo", planN: "$N/A", planF: "$N/A" },
  { carrier: "New Era", planG: "$38/mo (HDG)", planN: "$83/mo", planF: "$N/A" },
  { carrier: "Transamerica", planG: "$188/mo", planN: "$N/A", planF: "$N/A" },
  { carrier: "Mutual of Omaha", planG: "$N/A", planN: "$N/A", planF: "$N/A" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule",
    description:
      "Mississippi does not have a birthday rule. Outside of your initial Open Enrollment Period (the 6 months after you turn 65 and enroll in Part B), carriers can use medical underwriting to approve or deny your application. Your initial Open Enrollment Period is the most important window for securing coverage.",
  },
  {
    title: "Attained-Age Pricing Dominant",
    description:
      "Most carriers in Mississippi use attained-age pricing, meaning your premium increases as you get older. MedMutual Protect and Transamerica use issue-age pricing, which locks your premium at your enrollment age. Issue-age plans often cost more initially but save money long-term.",
  },
  {
    title: "38 Carriers Licensed",
    description:
      "Mississippi has 38 carriers licensed to sell Medigap plans, one of the larger markets in the South. This competition keeps Plan G rates among the lowest in the country, with LifeShield National at $123/mo.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Mississippi does not require carriers to offer Medigap to Medicare beneficiaries under age 65 who qualify due to disability. Some carriers voluntarily offer coverage. Contact Mississippi SHIP at (844) 822-4622 for guidance.",
  },
  {
    title: "Excess Charges Allowed",
    description:
      "Mississippi allows providers to charge up to 15% above the Medicare-approved amount (excess charges). Plan G covers excess charges; Plan N does not. If you see providers who do not accept Medicare assignment, Plan G provides better protection.",
  },
  {
    title: "SHIP Free Counseling Available",
    description:
      "Mississippi SHIP counselors are available Monday through Friday 8 a.m. to 5 p.m. at (844) 822-4622 (toll-free) or (601) 709-0624 (Jackson area). Counselors help you compare plans, understand your rights, and check eligibility for Medicare Savings Programs.",
  },
];

export const SCORING_FACTORS = [
  {
    factor: "Affordability",
    weight: "50%",
    description: "Monthly premium for Plan G at age 65 compared to the Mississippi state average of $224/mo.",
  },
  {
    factor: "Financial Strength",
    weight: "20%",
    description: "AM Best rating: A++ (Superior), A+ (Superior), A (Excellent), A- (Excellent), or lower.",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Mississippi, with extra weight for Plans G, N, and F.",
  },
  {
    factor: "Pricing Method",
    weight: "10%",
    description: "Issue-age pricing scores higher than attained-age pricing for long-term cost stability.",
  },
  {
    factor: "Customer Satisfaction",
    weight: "5%",
    description: "NAIC complaint ratio and J.D. Power scores where available.",
  },
];

export const FAQS = [
  {
    question: "Does Mississippi have a birthday rule for Medigap?",
    answer:
      "No, Mississippi does not have a birthday rule. Your initial Open Enrollment Period (the 6 months after you turn 65 and enroll in Part B) is the most important window for securing coverage without medical underwriting.",
  },
  {
    question: "What is the cheapest Plan G in Mississippi?",
    answer:
      "LifeShield National offers the lowest Plan G in Mississippi at $123/mo for a 65-year-old, saving $101/mo vs. the state average of $224/mo. MedMutual Protect ($128/mo) and Atlantic Capital ($135/mo) are also competitive.",
  },
  {
    question: "What is the cheapest Plan N in Mississippi?",
    answer:
      "New Era offers the lowest Plan N in Mississippi at $83/mo for a 65-year-old, saving $94/mo vs. the state average of $177/mo.",
  },
  {
    question: "Which Mississippi Medigap carrier uses issue-age pricing?",
    answer:
      "MedMutual Protect and Transamerica use issue-age pricing in Mississippi, which locks your premium at your enrollment age. Most other carriers use attained-age pricing, where premiums increase as you get older.",
  },
  {
    question: "Is Blue Cross Blue Shield of Mississippi a good Medigap option?",
    answer:
      "Blue Cross Blue Shield of Mississippi is the best option for Plans B, C, and D, with the lowest rates in the state for each. The carrier has a strong local provider network across Jackson, Gulfport, and rural Mississippi. However, it does not offer Plans N, K, L, or M.",
  },
  {
    question: "Can I get Medigap if I am under 65 in Mississippi?",
    answer:
      "Mississippi does not require carriers to offer Medigap to Medicare beneficiaries under age 65. Some carriers voluntarily offer coverage. Contact Mississippi SHIP at (844) 822-4622 for a list of carriers that do.",
  },
  {
    question: "Does Plan N cover excess charges in Mississippi?",
    answer:
      "No. Plan N does not cover Part B excess charges. Mississippi allows providers to charge up to 15% above the Medicare-approved amount. If you see providers who do not accept Medicare assignment, Plan G provides better protection against excess charges.",
  },
  {
    question: "How do I get free help choosing a Medigap plan in Mississippi?",
    answer:
      "Mississippi SHIP counselors are available at (844) 822-4622 (toll-free) or (601) 709-0624 (Jackson area), Monday through Friday 8 a.m. to 5 p.m. Counselors provide free, unbiased help comparing plans and checking eligibility for Medicare Savings Programs.",
  },
];
