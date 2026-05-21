/**
 * Alabama Medicare Supplement Data
 * Sources: Alabama Department of Insurance, CMS Medicare Plan Finder,
 *          MoneyGeek, FairSquare Medicare, The Big 65 - May 2026
 *
 * Key facts:
 * - ~220,000 Alabama Medigap enrollees
 * - Plan G avg $191/mo statewide; USAA lowest at $133/mo in Birmingham
 * - State Farm A++ rated, lowest Plan D at $151/mo
 * - MedMutual Protect (Medical Mutual of Ohio) lowest Plan N at $108/mo
 * - No birthday rule or anniversary rule in Alabama
 * - Under-65 coverage NOT required by state law
 * - SHIP free counseling: 1-800-243-5463
 * - Alabama DOI: www.aldoi.gov
 * - Attained-age rating dominates; United American uses issue-age
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
  enrollees: "220,000+",
  carriers: "30+",
  lowestPlanG: "$133/mo",
  avgPlanG: "$191/mo",
  shipPhone: "1-800-243-5463",
  doiWebsite: "www.aldoi.gov",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Mutual of Omaha",
    badge: "Best Overall in Alabama",
    score: 4.7,
    amBest: "A+",
    planGMonthly: "$148",
    planNMonthly: "$108",
    highlight:
      "Mutual of Omaha is the top-rated Medigap carrier in Alabama for 2026, combining an A+ AM Best rating, competitive Plan G pricing, and consistently low NAIC complaint ratios. Their U.S.-based customer service and 7% household discount make them the best all-around choice for Alabama seniors.",
    pros: [
      "A+ AM Best financial strength rating",
      "Competitive Plan G at $148/mo in Birmingham",
      "Low NAIC complaint ratio",
      "7% household discount available",
      "U.S.-based customer service",
      "High-Deductible Plan G available",
    ],
    cons: [
      "Attained-age rating: premiums increase with age",
      "Not the absolute cheapest Plan G in Alabama",
    ],
  },
  {
    rank: 2,
    name: "USAA",
    badge: "Lowest Plan G Premium",
    score: 4.5,
    amBest: "A++",
    planGMonthly: "$133",
    planNMonthly: "$N/A",
    highlight:
      "USAA offers the lowest Plan G premium in Alabama at $133/mo and carries an A++ AM Best rating. However, USAA Medigap is only available to military members, veterans, and their eligible family members. If you qualify, USAA is the best value Plan G in the state.",
    pros: [
      "Lowest Plan G rate in Alabama at $133/mo",
      "A++ AM Best rating (highest possible)",
      "Best Plan F rate in Alabama at $173/mo",
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
    name: "State Farm",
    badge: "Best Financial Strength",
    score: 4.5,
    amBest: "A++",
    planGMonthly: "$151",
    planNMonthly: "$N/A",
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and offers the lowest Plan D rate in Alabama at $151/mo. With a large local agent network across Birmingham, Huntsville, and Mobile, State Farm is the top choice for Alabama seniors who prefer face-to-face service.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Lowest Plan D rate in Alabama",
      "Extensive local agent network statewide",
      "Strong brand trust and claims-paying history",
    ],
    cons: [
      "Does not offer Plans K, L, or M",
      "Attained-age pricing: premiums increase with age",
      "Limited plan variety compared to larger national carriers",
    ],
  },
  {
    rank: 4,
    name: "AARP / UnitedHealthcare",
    badge: "Most Popular Nationwide",
    score: 4.3,
    amBest: "A",
    planGMonthly: "$162",
    planNMonthly: "$118",
    highlight:
      "AARP/UHC is the largest Medigap carrier in the country and offers strong plan availability in Alabama. Their Renew Active fitness benefit and AARP member perks add value beyond basic coverage. Plan G runs $162/mo in Birmingham for a 65-year-old.",
    pros: [
      "Largest Medigap carrier in the U.S.",
      "Renew Active fitness benefit included",
      "AARP member discounts and resources",
      "All 10 standard plan types available",
      "Household discount available",
    ],
    cons: [
      "Not the cheapest Plan G in Alabama",
      "Community-rated pricing can be higher for younger enrollees",
      "NAIC complaint ratio slightly above average",
    ],
  },
  {
    rank: 5,
    name: "MedMutual Protect (Medical Mutual of Ohio)",
    badge: "Best Plan N Value",
    score: 4.2,
    amBest: "A",
    planGMonthly: "$148",
    planNMonthly: "$108",
    highlight:
      "MedMutual Protect offers the lowest Plan N premium in Alabama at $108/mo, making it the best choice for healthy Alabama seniors who want to minimize monthly costs. Their Plan G at $148/mo is also competitive. A-rated by AM Best with a solid claims-paying track record.",
    pros: [
      "Lowest Plan N rate in Alabama at $108/mo",
      "Competitive Plan G at $148/mo",
      "A AM Best rating",
      "Strong financial stability",
    ],
    cons: [
      "Smaller national brand recognition than top carriers",
      "Attained-age pricing: premiums increase with age",
      "Limited additional benefits compared to AARP/UHC",
    ],
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "USAA*", planG: "$133", planN: "N/A", planF: "$173" },
  { carrier: "State Farm", planG: "$151", planN: "N/A", planF: "N/A" },
  { carrier: "Mutual of Omaha", planG: "$148", planN: "$108", planF: "$178" },
  { carrier: "MedMutual Protect", planG: "$148", planN: "$108", planF: "N/A" },
  { carrier: "AARP / UnitedHealthcare", planG: "$162", planN: "$118", planF: "$195" },
  { carrier: "Humana", planG: "$155", planN: "$112", planF: "$185" },
  { carrier: "Cigna", planG: "$158", planN: "$115", planF: "$190" },
  { carrier: "Transamerica", planG: "$232", planN: "$179", planF: "$240" },
  { carrier: "United American", planG: "$262", planN: "$N/A", planF: "$N/A" },
];

export const STATE_RULES: StateRule[] = [
  {
    title: "No Birthday Rule or Anniversary Rule in Alabama",
    description:
      "Alabama does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice especially important.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions. This is the best time to enroll.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Alabama does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 (such as those with disabilities). If you are under 65 and on Medicare, you may have difficulty finding Medigap coverage in Alabama. Some carriers offer it voluntarily at higher rates.",
  },
  {
    title: "Attained-Age Rating Dominates",
    description:
      "Most Alabama Medigap carriers use attained-age rating, meaning your premium increases as you get older. United American is a notable exception, using issue-age rating where your premium is locked at the rate for your age when you enroll. Issue-age plans often start higher but can be cheaper over the long term.",
  },
  {
    title: "Excess Charges Are Allowed in Alabama",
    description:
      "Alabama does not ban Medicare excess charges. Providers who do not accept Medicare assignment can charge up to 15% more than the Medicare-approved amount. Plan G covers these excess charges; Plan N does not. If your doctors do not accept Medicare assignment, Plan G is the safer choice.",
  },
  {
    title: "Free Help via Alabama SHIP",
    description:
      "Alabama's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-243-5463 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
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
    description: "Plan G and Plan N rates vs. Alabama market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Alabama",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, EFT discounts, and added benefits",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Alabama for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan for new enrollees in Alabama. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). For the best overall value, Mutual of Omaha (A+ rated) consistently ranks highest in Alabama for financial strength and customer satisfaction. USAA offers the lowest Plan G at $133/mo but is only available to military members and veterans.",
  },
  {
    question: "Does Alabama have a birthday rule for Medigap?",
    answer:
      "No. Alabama does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice very important. Compare carefully before enrolling.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Alabama?",
    answer:
      "Plan G premiums in Alabama average $191/mo statewide for a 65-year-old. In Birmingham, rates range from $133/mo (USAA, military only) to $232/mo (Transamerica). Mutual of Omaha and MedMutual Protect both offer Plan G at $148/mo in Birmingham. Premiums vary by carrier, ZIP code, age, gender, and tobacco use.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Alabama?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for ER visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $108 to $118/mo in Alabama vs. $133 to $162/mo for Plan G. If you rarely visit doctors and your providers accept Medicare assignment, Plan N can save $300 to $500 per year.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Alabama?",
    answer:
      "You can apply to switch at any time, but outside of your initial 6-month Open Enrollment Period, you will face medical underwriting. Alabama has no birthday rule, so carriers can deny your application or charge higher premiums based on your health history. Your best opportunity to lock in coverage is during your Open Enrollment Period when you first turn 65 and enroll in Part B.",
  },
  {
    question: "What is the Alabama household discount for Medicare Supplement?",
    answer:
      "Many carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount in Alabama include Mutual of Omaha, Humana, Cigna, and Wellabe. If you and a spouse or domestic partner are both enrolling, always ask about the household discount before choosing a carrier.",
  },
  {
    question: "Is High-Deductible Plan G a good option in Alabama?",
    answer:
      "High-Deductible Plan G (HDG) offers the same coverage as standard Plan G but requires you to pay a deductible of $2,870 (2026) before benefits kick in. In exchange, monthly premiums drop to roughly $35 to $50/mo. HDG is a strong option for healthy Alabama retirees who rarely use medical services and want to minimize monthly costs. Mutual of Omaha and Cigna are the leading HDG carriers in Alabama.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Alabama?",
    answer:
      "Alabama's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling. Call 1-800-243-5463 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance. You can also visit the Alabama Department of Insurance at www.aldoi.gov.",
  },
];
