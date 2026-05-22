/**
 * Vermont Medicare Supplement Data
 * Sources: Vermont Department of Financial Regulation, CMS Medicare Plan Finder,
 *          MoneyGeek, FairSquare Medicare, The Big 65 - May 2026
 *
 * Key facts:
 * - ~45,000 Vermont Medigap enrollees
 * - Plan G avg $271/mo statewide; Medco Containment lowest at $190/mo
 * - Vermont uses COMMUNITY RATING: same premium regardless of age
 * - Vermont has GUARANTEED ISSUE year-round (one of only a few states)
 * - State Farm A++ rated, lowest Plan N at $147/mo
 * - No birthday rule needed because guaranteed issue applies year-round
 * - Under-65 coverage IS required by state law
 * - SHIP free counseling: 1-800-642-5119
 * - VT DFR: dfr.vermont.gov
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
  enrollees: "45,000+",
  carriers: "12+",
  lowestPlanG: "$190/mo",
  avgPlanG: "$271/mo",
  shipPhone: "1-800-642-5119",
  doiWebsite: "dfr.vermont.gov",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Medco Containment",
    badge: "Lowest Plan G and Plan F in Vermont",
    score: 4.6,
    amBest: "A",
    planGMonthly: "$190",
    planNMonthly: "$160",
    highlight:
      "Medco Containment offers the lowest Plan G ($190/mo) and Plan F ($250/mo) in Vermont, saving over $80/mo compared to the state average. Community-rated pricing means your premium stays the same regardless of age. Best overall value for comprehensive coverage.",
    pros: [
      "Lowest Plan G rate in Vermont at $190/mo",
      "Lowest Plan F rate in Vermont at $250/mo",
      "Lowest Plan A rate in Vermont at $129/mo",
      "Community pricing: same rate at any age",
      "A AM Best financial strength rating",
    ],
    cons: [
      "Limited plan selection (A, F, G, N only)",
      "No Plans B, C, D, K, L, or M",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 2,
    name: "State Farm",
    badge: "Best Plan N Value + A++ Rating",
    score: 4.6,
    amBest: "A++",
    planGMonthly: "$190",
    planNMonthly: "$147",
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and offers the lowest Plan N in Vermont at $147/mo. Plan G is tied for lowest at $190/mo. With local agents across Burlington, Montpelier, and Rutland, State Farm is the top choice for Vermont seniors who prefer face-to-face service.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Lowest Plan N rate in Vermont at $147/mo",
      "Tied for lowest Plan G at $190/mo",
      "Lowest Plan D rate at $190/mo",
      "Extensive local agent network in Vermont",
      "Community pricing: same rate at any age",
    ],
    cons: [
      "Does not offer Plans K, L, or M",
      "No high-deductible options",
      "Slightly fewer plan types than some national carriers",
    ],
  },
  {
    rank: 3,
    name: "Humana",
    badge: "Most Plan Types Available",
    score: 4.3,
    amBest: "A-",
    planGMonthly: "$299",
    planNMonthly: "$198",
    highlight:
      "Humana offers 8 plan types in Vermont (A, B, C, F, G, K, L, N), the widest selection in the state. They have the lowest Plan B at $172/mo and lowest Plan L at $148/mo. Community-rated pricing keeps premiums stable over time.",
    pros: [
      "Widest plan selection in Vermont (8 types)",
      "Lowest Plan B rate at $172/mo",
      "Lowest Plan L rate at $148/mo",
      "Community pricing: same rate at any age",
      "A- AM Best financial strength rating",
    ],
    cons: [
      "Plan G rate ($299/mo) is well above state average",
      "Plan N rate ($198/mo) is higher than competitors",
      "No Plans D or M available",
    ],
  },
  {
    rank: 4,
    name: "AARP / UnitedHealthcare",
    badge: "Largest National Carrier",
    score: 4.2,
    amBest: "A",
    planGMonthly: "$287",
    planNMonthly: "$195",
    highlight:
      "AARP/UHC is the largest Medigap carrier in the country and offers 8 plan types in Vermont. Their Renew Active fitness benefit and AARP member perks add value beyond basic coverage. Lowest Plan K at $108/mo. Community-rated pricing.",
    pros: [
      "Largest Medigap carrier in the U.S.",
      "Lowest Plan K rate in Vermont at $108/mo",
      "8 plan types available (A, B, C, F, G, K, L, N)",
      "Renew Active fitness benefit included",
      "AARP member discounts and resources",
      "Community pricing: same rate at any age",
    ],
    cons: [
      "Plan G rate ($287/mo) is above state average",
      "Not the cheapest for Plans G, F, or N",
      "NAIC complaint ratio slightly above average",
    ],
  },
  {
    rank: 5,
    name: "AFLAC",
    badge: "Strong Plan G and N Competitor",
    score: 4.1,
    amBest: "A+",
    planGMonthly: "$196",
    planNMonthly: "$154",
    highlight:
      "AFLAC offers competitive Plan G at $196/mo and Plan N at $154/mo in Vermont, just slightly above the lowest rates. Their A+ AM Best rating provides strong financial backing. A solid alternative if Medco Containment or State Farm are not available in your area.",
    pros: [
      "A+ AM Best financial strength rating",
      "Competitive Plan G at $196/mo",
      "Competitive Plan N at $154/mo",
      "Community pricing: same rate at any age",
    ],
    cons: [
      "Not the absolute lowest rates in Vermont",
      "Limited plan selection compared to Humana or AARP",
      "Smaller local agent presence in Vermont",
    ],
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Medco Containment", planG: "$190", planN: "$160", planF: "$250" },
  { carrier: "State Farm", planG: "$190", planN: "$147", planF: "N/A" },
  { carrier: "AFLAC", planG: "$196", planN: "$154", planF: "$254" },
  { carrier: "Wisconsin Physicians Service", planG: "$229", planN: "$207", planF: "$287" },
  { carrier: "The Vermont Health Plan", planG: "$235", planN: "$218", planF: "$273" },
  { carrier: "USAA*", planG: "$242", planN: "N/A", planF: "N/A" },
  { carrier: "United American", planG: "$245", planN: "N/A", planF: "$267" },
  { carrier: "AARP / UnitedHealthcare", planG: "$287", planN: "$195", planF: "$298" },
  { carrier: "Humana", planG: "$299", planN: "$198", planF: "$311" },
];

export const STATE_RULES: StateRule[] = [
  {
    title: "Guaranteed Issue Year-Round",
    description:
      "Vermont is one of only a handful of states that provides guaranteed issue rights year-round. You can switch Medigap carriers at any time without medical underwriting. No carrier can deny you coverage or charge higher premiums based on your health status. This is one of the strongest consumer protections in the country.",
  },
  {
    title: "Community Rating Required by Law",
    description:
      "Vermont requires all Medigap carriers to use community rating. This means your premium is the same regardless of your age. A 65-year-old and an 80-year-old pay the same monthly rate for the same plan from the same carrier. This protects older enrollees from age-based premium increases.",
  },
  {
    title: "Under-65 Coverage Required",
    description:
      "Vermont requires Medigap carriers to offer coverage to Medicare beneficiaries under age 65 (such as those with disabilities). This is a stronger protection than most states, where under-65 coverage is not guaranteed. Premiums may be higher for under-65 enrollees but coverage cannot be denied.",
  },
  {
    title: "No Birthday Rule Needed",
    description:
      "Because Vermont already provides year-round guaranteed issue, a birthday rule is not needed. You can switch plans or carriers at any time without waiting for a specific window. This gives Vermont residents the most flexibility of any state when it comes to Medigap enrollment.",
  },
  {
    title: "Excess Charges Are Allowed in Vermont",
    description:
      "Vermont does not ban Medicare excess charges. Providers who do not accept Medicare assignment can charge up to 15% more than the Medicare-approved amount. Plan G covers these excess charges; Plan N does not. If your doctors do not accept Medicare assignment, Plan G is the safer choice.",
  },
  {
    title: "Free Help via Vermont SHIP",
    description:
      "Vermont's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-642-5119 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
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
    description: "Plan G and Plan N rates vs. Vermont market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Vermont",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, EFT discounts, and added benefits",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Vermont for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan for new enrollees in Vermont. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). Medco Containment and State Farm are tied for the lowest Plan G at $190/mo. State Farm offers the added advantage of an A++ AM Best rating and local agent support.",
  },
  {
    question: "Does Vermont have guaranteed issue for Medigap?",
    answer:
      "Yes. Vermont is one of only a handful of states that provides guaranteed issue rights year-round. You can switch Medigap carriers at any time without medical underwriting. No carrier can deny you coverage or charge higher premiums based on your health status. This is one of the strongest consumer protections in the country.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Vermont?",
    answer:
      "Plan G premiums in Vermont average $271/mo statewide. Rates range from $190/mo (Medco Containment and State Farm) to $299/mo (Humana). Because Vermont requires community rating, your premium is the same regardless of your age. Premiums vary only by carrier and plan type, not by age or health status.",
  },
  {
    question: "What is community rating in Vermont?",
    answer:
      "Community rating means all enrollees pay the same premium for the same plan from the same carrier, regardless of age. A 65-year-old and an 80-year-old pay the same monthly rate. Vermont is one of a small number of states that requires community rating for all Medigap plans. This protects older enrollees from age-based premium increases that are common in most other states.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Vermont at any time?",
    answer:
      "Yes. Vermont provides year-round guaranteed issue rights for Medigap. You can switch carriers or plan types at any time without medical underwriting. No carrier can deny your application or charge higher premiums based on your health history. This makes Vermont one of the most consumer-friendly states for Medigap enrollment.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Vermont?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for ER visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $147 to $218/mo in Vermont vs. $190 to $299/mo for Plan G.",
  },
  {
    question: "Does Vermont require Medigap coverage for people under 65?",
    answer:
      "Yes. Vermont requires Medigap carriers to offer coverage to Medicare beneficiaries under 65 who qualify due to disability. This is a stronger protection than most states. Premiums may be higher for under-65 enrollees, but coverage cannot be denied.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Vermont?",
    answer:
      "Vermont's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling. Call 1-800-642-5119 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance. You can also visit the Vermont Department of Financial Regulation at dfr.vermont.gov.",
  },
];
