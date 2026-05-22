/**
 * Wyoming Medicare Supplement Data
 * Sources: Wyoming Department of Insurance, CMS Medicare Plan Finder,
 *          MoneyGeek, FairSquare Medicare, The Big 65 - May 2026
 *
 * Key facts:
 * - ~25,000 Wyoming Medigap enrollees
 * - Plan G avg $258/mo statewide; LifeShield National lowest at $152/mo
 * - MedMutual Protect lowest Plan F at $171/mo and Plan N at $105/mo
 * - Transamerica: all 10 plan types + issue-age pricing
 * - Montana Health Co-Op available as a regional option
 * - No birthday rule in Wyoming
 * - Under-65 coverage NOT required by state law
 * - SHIP free counseling: 1-800-856-4398
 * - WY DOI: doi.wyo.gov
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
  enrollees: "25,000+",
  carriers: "20+",
  lowestPlanG: "$152/mo",
  avgPlanG: "$258/mo",
  shipPhone: "1-800-856-4398",
  doiWebsite: "doi.wyo.gov",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "LifeShield National",
    badge: "Lowest Plan G in Wyoming",
    score: 4.5,
    amBest: "A-",
    planGMonthly: "$152",
    planNMonthly: "$119",
    highlight:
      "LifeShield National offers the lowest Plan G premium in Wyoming at $152/mo, saving $106/mo compared to the state average of $258/mo. Their attained-age pricing starts low and they offer Plans A, F, G, and N across the state.",
    pros: [
      "Lowest Plan G rate in Wyoming at $152/mo",
      "$106/mo savings vs. state average Plan G",
      "Competitive Plan N at $119/mo",
      "A- AM Best financial strength rating",
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
    badge: "Lowest Plan F and Plan N in Wyoming",
    score: 4.5,
    amBest: "A",
    planGMonthly: "$152",
    planNMonthly: "$105",
    highlight:
      "MedMutual Protect offers the lowest Plan F ($171/mo) and lowest Plan N ($105/mo) in Wyoming, plus a Plan G tied for lowest at $152/mo. A-rated by AM Best with strong claims-paying history. High-deductible Plan G option available.",
    pros: [
      "Lowest Plan F rate in Wyoming at $171/mo",
      "Lowest Plan N rate in Wyoming at $105/mo",
      "Tied for lowest Plan G at $152/mo",
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
    name: "Transamerica",
    badge: "All 10 Plan Types + Issue-Age",
    score: 4.4,
    amBest: "A",
    planGMonthly: "$165",
    planNMonthly: "$127",
    highlight:
      "Transamerica is the only carrier in Wyoming offering all 10 standard Medigap plan types with issue-age pricing. Your premium is locked at the rate for your age when you enroll, protecting you from age-based increases. Best choice for long-term rate stability.",
    pros: [
      "Only Wyoming carrier with all 10 plan types",
      "Issue-age pricing locks your rate at enrollment age",
      "Lowest Plans D ($165/mo), K ($74/mo), L ($110/mo), and M ($135/mo)",
      "A AM Best financial strength rating",
    ],
    cons: [
      "Plan G starts higher than some attained-age competitors",
      "No household or EFT discounts available",
      "Smaller local agent presence in Wyoming",
    ],
  },
  {
    rank: 4,
    name: "State Farm",
    badge: "Best Financial Strength",
    score: 4.5,
    amBest: "A++",
    planGMonthly: "$178",
    planNMonthly: "$132",
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and offers Plan G at $178/mo in Wyoming. With local agents across Cheyenne, Casper, and Laramie, State Farm is the top choice for Wyoming seniors who prefer face-to-face service in a rural state.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Extensive local agent network across Wyoming",
      "Six plan types including Plan C and Plan D",
      "Strong brand trust and claims-paying history",
    ],
    cons: [
      "Not the cheapest Plan G in Wyoming",
      "Does not offer Plans K, L, or M",
      "Attained-age pricing: premiums increase with age",
    ],
  },
  {
    rank: 5,
    name: "Montana Health Co-Op",
    badge: "Best Regional Carrier",
    score: 4.2,
    amBest: "NR",
    planGMonthly: "$195",
    planNMonthly: "$108",
    highlight:
      "Montana Health Co-Op is a regional nonprofit carrier serving both Montana and Wyoming. They offer competitive Plan N at $108/mo and Plan F at $213/mo. As a co-op, they are member-governed and focused on keeping premiums stable for the communities they serve.",
    pros: [
      "Regional nonprofit carrier (member-governed)",
      "Competitive Plan N at $108/mo",
      "Focused on Montana/Wyoming communities",
      "Nonprofit structure prioritizes member value",
    ],
    cons: [
      "Not rated by AM Best (newer carrier)",
      "Plan G rate ($195/mo) is above the lowest options",
      "Limited plan selection compared to Transamerica",
      "Smaller carrier with less financial history",
    ],
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "LifeShield National", planG: "$152", planN: "$119", planF: "$184" },
  { carrier: "MedMutual Protect", planG: "$152", planN: "$105", planF: "$171" },
  { carrier: "USAA*", planG: "$172", planN: "$127", planF: "$218" },
  { carrier: "Nassau", planG: "$164", planN: "$124", planF: "$190" },
  { carrier: "Transamerica", planG: "$165", planN: "$127", planF: "$198" },
  { carrier: "AFLAC", planG: "$165", planN: "$110", planF: "$186" },
  { carrier: "State Farm", planG: "$178", planN: "$132", planF: "$215" },
  { carrier: "Montana Health Co-Op", planG: "$195", planN: "$108", planF: "$213" },
  { carrier: "Humana", planG: "$212", planN: "$155", planF: "$238" },
];

export const STATE_RULES: StateRule[] = [
  {
    title: "No Birthday Rule or Anniversary Rule in Wyoming",
    description:
      "Wyoming does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice especially important.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions. This is the best time to enroll.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Wyoming does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 (such as those with disabilities). If you are under 65 and on Medicare, you may have difficulty finding Medigap coverage in Wyoming. Some carriers offer it voluntarily at higher rates.",
  },
  {
    title: "Attained-Age Rating Dominates",
    description:
      "Most Wyoming Medigap carriers use attained-age rating, meaning your premium increases as you get older. Transamerica is a notable exception, using issue-age rating where your premium is locked at the rate for your age when you enroll. Issue-age plans often start higher but can be cheaper over the long term.",
  },
  {
    title: "Rural State Considerations",
    description:
      "Wyoming is the least populated state in the U.S., and some carriers have limited agent presence in rural areas. State Farm and local agents are often the most accessible option for in-person help. All carriers are available by phone and online regardless of your location within Wyoming.",
  },
  {
    title: "Free Help via Wyoming SHIP",
    description:
      "Wyoming's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-856-4398 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
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
    description: "Plan G and Plan N rates vs. Wyoming market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Wyoming",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, EFT discounts, and added benefits",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Wyoming for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan for new enrollees in Wyoming. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). LifeShield National and MedMutual Protect are tied for the lowest Plan G at $152/mo, saving $106/mo compared to the state average of $258/mo.",
  },
  {
    question: "Does Wyoming have a birthday rule for Medigap?",
    answer:
      "No. Wyoming does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, you will face medical underwriting if you try to switch Medigap carriers. This makes your initial plan choice very important.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Wyoming?",
    answer:
      "Plan G premiums in Wyoming average $258/mo statewide for a 65-year-old. Rates range from $152/mo (LifeShield National, MedMutual Protect) to $212/mo (Humana). Premiums vary by carrier, ZIP code, age, gender, and tobacco use. Cheyenne and Casper tend to have the most competitive rates.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Wyoming?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for ER visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $105 to $155/mo in Wyoming vs. $152 to $212/mo for Plan G.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Wyoming?",
    answer:
      "You can apply to switch at any time, but outside of your initial 6-month Open Enrollment Period, you will face medical underwriting. Wyoming has no birthday rule, so carriers can deny your application or charge higher premiums based on your health history. Your best opportunity to lock in coverage is during your Open Enrollment Period.",
  },
  {
    question: "What is Montana Health Co-Op?",
    answer:
      "Montana Health Co-Op is a regional nonprofit carrier serving both Montana and Wyoming. As a member-governed cooperative, they prioritize keeping premiums stable for the communities they serve. They offer competitive Plan N at $108/mo and Plan F at $213/mo. While they are not rated by AM Best due to being a newer carrier, their nonprofit structure means profits go back to members.",
  },
  {
    question: "Is Transamerica a good choice for Medigap in Wyoming?",
    answer:
      "Transamerica is the only carrier in Wyoming offering all 10 standard Medigap plan types with issue-age pricing. This means your premium is locked at the rate for your age when you enroll and will not increase due to aging. Transamerica is a strong choice for younger enrollees (65-67) who want long-term rate stability.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Wyoming?",
    answer:
      "Wyoming's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling. Call 1-800-856-4398 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance. You can also visit the Wyoming Department of Insurance at doi.wyo.gov.",
  },
];
