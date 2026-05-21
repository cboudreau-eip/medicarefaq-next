/**
 * Alaska Medicare Supplement Data
 * Sources: Alaska Division of Insurance, CMS Medicare Plan Finder,
 *          MoneyGeek, Premera Blue Cross Blue Shield of Alaska,
 *          Moda Health, medicareplans.com - May 2026
 *
 * Key facts:
 * - ~75,000 Alaska Medigap enrollees (small market, fewer carriers)
 * - Plan G avg $234/mo statewide; State Farm lowest at $137/mo in Anchorage
 * - Premera BCBS of Alaska: Plan G $197/mo, Plan N $216/mo (statewide flat rate)
 * - Moda Health: local carrier, HDG Plan G from $51/mo
 * - USAA: A++ rated, Plan G $144/mo (military only)
 * - No birthday rule or anniversary rule in Alaska
 * - No Medicare Advantage plans available in Alaska (Original Medicare + Medigap is the primary path)
 * - Under-65 coverage NOT required by state law
 * - ADRC free counseling: 1-800-478-6065
 * - Alaska DOI: www.commerce.alaska.gov/web/ins
 * - Premera $5/mo AFT discount
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
  enrollees: "75,000+",
  carriers: "15+",
  lowestPlanG: "$137/mo",
  avgPlanG: "$234/mo",
  shipPhone: "1-800-478-6065",
  doiWebsite: "www.commerce.alaska.gov/web/ins",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "State Farm",
    badge: "Best Overall in Alaska",
    score: 4.6,
    amBest: "A++",
    planGMonthly: "$137",
    planNMonthly: "$106",
    highlight:
      "State Farm offers the lowest Plan G premium in Alaska at $137/mo and the lowest Plan N at $106/mo for a 65-year-old in Anchorage. With an A++ AM Best rating, a large local agent network, and strong claims-paying history, State Farm is the top overall pick for most Alaska seniors.",
    pros: [
      "Lowest Plan G in Alaska at $137/mo",
      "Lowest Plan N in Alaska at $106/mo",
      "A++ AM Best rating (highest possible)",
      "Lowest Plan D in Alaska at $119/mo",
      "Local agent network across Anchorage, Fairbanks, and Juneau",
    ],
    cons: [
      "Does not offer Plans B, K, L, or M",
      "Attained-age pricing: premiums increase with age",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 2,
    name: "USAA",
    badge: "Best for Military Families",
    score: 4.5,
    amBest: "A++",
    planGMonthly: "$144",
    planNMonthly: "N/A",
    highlight:
      "USAA offers the second-lowest Plan G in Alaska at $144/mo with an A++ AM Best rating. Available only to military members, veterans, and their eligible family members. If you qualify, USAA is the best value for Plan A ($90/mo) and Plan F ($193/mo) in Alaska.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Lowest Plan A in Alaska at $90/mo",
      "Competitive Plan G at $144/mo",
      "Best Plan F in Alaska at $193/mo",
      "Additional benefits for military members",
    ],
    cons: [
      "Only available to military, veterans, and eligible family members",
      "Attained-age pricing: premiums increase with age",
      "Does not offer Plans B, C, D, K, L, or M",
    ],
  },
  {
    rank: 3,
    name: "Premera Blue Cross Blue Shield of Alaska",
    badge: "Best Local Carrier",
    score: 4.4,
    amBest: "A",
    planGMonthly: "$197",
    planNMonthly: "$216",
    highlight:
      "Premera BCBS of Alaska is the dominant local carrier and the most recognized name in Alaska health insurance. Their 2026 Plan G rate of $197/mo is set statewide by the Alaska DOI. Premera offers a $5/mo discount for members who enroll in Automatic Funds Transfer (AFT). Strong local claims support and provider relationships make Premera a top choice for Alaska seniors who value local service.",
    pros: [
      "Dominant local carrier with strong Alaska provider relationships",
      "Alaska DOI-approved rates: Plan G $197/mo, Plan N $216/mo",
      "$5/mo AFT discount for automatic payment enrollment",
      "A AM Best rating",
      "Recognized brand throughout Alaska",
    ],
    cons: [
      "Plan G premium higher than State Farm ($197 vs. $137)",
      "Attained-age pricing: premiums increase with age",
      "Limited plan variety compared to national carriers",
    ],
  },
  {
    rank: 4,
    name: "Moda Health",
    badge: "Best High-Deductible Option",
    score: 4.2,
    amBest: "A-",
    planGMonthly: "$183",
    planNMonthly: "N/A",
    highlight:
      "Moda Health is a regional carrier serving Alaska and Oregon with a strong local presence. Their High-Deductible Plan G starts at just $51/mo for a 65-year-old female nonsmoker, making it the best HDG option in Alaska. Standard Plan G runs $183/mo. Moda is a solid choice for healthy Alaska seniors who want to minimize monthly premiums.",
    pros: [
      "Lowest High-Deductible Plan G in Alaska from $51/mo",
      "Regional carrier with Alaska-specific expertise",
      "Standard Plan G at $183/mo",
      "A- AM Best rating",
    ],
    cons: [
      "Smaller national brand recognition",
      "Attained-age pricing: premiums increase with age",
      "Limited plan types compared to national carriers",
    ],
  },
  {
    rank: 5,
    name: "Transamerica",
    badge: "Best for Cost-Sharing Plans",
    score: 4.1,
    amBest: "A",
    planGMonthly: "$203",
    planNMonthly: "$163",
    highlight:
      "Transamerica offers the lowest Plan K ($73/mo) and Plan L ($108/mo) in Alaska, making them the best choice for Alaska seniors who want cost-sharing plans with lower monthly premiums. They offer all 10 standard plan types. Plan G at $203/mo is above average but their K and L plans are unmatched in Alaska.",
    pros: [
      "Lowest Plan K in Alaska at $73/mo",
      "Lowest Plan L in Alaska at $108/mo",
      "All 10 standard plan types available",
      "A AM Best rating",
    ],
    cons: [
      "Plan G at $203/mo is above the state average",
      "Attained-age pricing: premiums increase with age",
      "Limited public plan information available",
    ],
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "State Farm", planG: "$137", planN: "$106", planF: "N/A" },
  { carrier: "USAA*", planG: "$144", planN: "N/A", planF: "$193" },
  { carrier: "Moda Health", planG: "$183", planN: "N/A", planF: "N/A" },
  { carrier: "Premera BCBS of Alaska", planG: "$197", planN: "$216", planF: "$292" },
  { carrier: "Humana", planG: "$183", planN: "$148", planF: "$220" },
  { carrier: "AARP / UnitedHealthcare", planG: "$140", planN: "$125", planF: "$210" },
  { carrier: "Transamerica", planG: "$203", planN: "$163", planF: "$240" },
  { carrier: "Cigna", planG: "$195", planN: "$155", planF: "$230" },
];

export const STATE_RULES: StateRule[] = [
  {
    title: "No Medicare Advantage Plans Available in Alaska",
    description:
      "Alaska is one of the few states where Medicare Advantage plans are not available. This makes Medicare Supplement (Medigap) the primary way for Alaska seniors to add coverage to Original Medicare. If you are moving to Alaska from another state, you cannot keep a Medicare Advantage plan.",
  },
  {
    title: "No Birthday Rule or Anniversary Rule",
    description:
      "Alaska does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice especially important.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions. This is the best and often only time to lock in coverage without health questions.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Alaska does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 (such as those with disabilities). If you are under 65 and on Medicare in Alaska, you may have difficulty finding Medigap coverage. Some carriers offer it voluntarily at higher rates.",
  },
  {
    title: "Excess Charges Are Allowed in Alaska",
    description:
      "Alaska does not ban Medicare excess charges. Providers who do not accept Medicare assignment can charge up to 15% more than the Medicare-approved amount. Plan G covers these excess charges; Plan N does not. In rural Alaska especially, confirm your providers accept Medicare assignment before choosing Plan N.",
  },
  {
    title: "Free Help via Alaska ADRC",
    description:
      "Alaska's Aging and Disability Resource Centers (ADRC) provide free, unbiased Medicare counseling. Call 1-800-478-6065 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
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
    description: "Plan G and Plan N rates vs. Alaska market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Alaska",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "AFT discounts, household discounts, and added benefits",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Alaska for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan for new enrollees in Alaska. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). For the best overall value, State Farm (A++ rated) offers the lowest Plan G at $137/mo in Anchorage. For local service and provider relationships, Premera BCBS of Alaska at $197/mo is the top regional choice.",
  },
  {
    question: "Is Medicare Advantage available in Alaska?",
    answer:
      "No. Medicare Advantage plans are not available in Alaska. Alaska is one of the few states where Original Medicare plus a Medigap supplement is the primary coverage path for seniors. This makes choosing the right Medigap plan especially important for Alaska residents.",
  },
  {
    question: "Does Alaska have a birthday rule for Medigap?",
    answer:
      "No. Alaska does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. Compare carriers carefully before enrolling.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Alaska?",
    answer:
      "Plan G premiums in Alaska average $234/mo statewide for a 65-year-old. In Anchorage, rates range from $137/mo (State Farm) to $203/mo (Transamerica). Premera BCBS of Alaska charges $197/mo statewide. Premiums vary by carrier, age, gender, and tobacco use. Alaska does not have ZIP-code-based rating for most carriers.",
  },
  {
    question: "What is Premera Blue Cross Blue Shield of Alaska and is it a good choice?",
    answer:
      "Premera BCBS of Alaska is the dominant local health insurance carrier in Alaska and an independent licensee of the Blue Cross Blue Shield Association. Their 2026 Plan G rate of $197/mo is set statewide by the Alaska Division of Insurance. Premera offers a $5/mo discount for members who enroll in Automatic Funds Transfer (AFT). They are a strong choice for Alaska seniors who value local provider relationships and local claims support, though State Farm offers a lower premium at $137/mo.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Alaska?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for ER visits that do not result in inpatient admission, and does not cover Part B excess charges. In Alaska, State Farm Plan N runs $106/mo vs. $137/mo for Plan G. In rural Alaska, confirm your providers accept Medicare assignment before choosing Plan N, as excess charges are allowed in Alaska.",
  },
  {
    question: "What is High-Deductible Plan G and is it a good option in Alaska?",
    answer:
      "High-Deductible Plan G (HDG) offers the same coverage as standard Plan G but requires you to pay a deductible of $2,870 (2026) before benefits kick in. In exchange, monthly premiums drop to roughly $51 to $60/mo. Moda Health offers the lowest HDG in Alaska starting at $51/mo. HDG is a strong option for healthy Alaska retirees who rarely use medical services and want to minimize monthly costs.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Alaska?",
    answer:
      "Alaska's Aging and Disability Resource Centers (ADRC) offer free, unbiased Medicare counseling. Call 1-800-478-6065 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance. You can also visit the Alaska Division of Insurance at www.commerce.alaska.gov/web/ins.",
  },
];
