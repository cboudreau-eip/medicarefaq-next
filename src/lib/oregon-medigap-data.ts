/**
 * Oregon Medicare Supplement Data
 * Sources: Oregon DCBS, CMS Medicare Plan Finder,
 *          MoneyGeek, FairSquare Medicare - May 2026
 *
 * Key facts:
 * - ~200,000 Oregon Medigap enrollees
 * - Plan G avg $224/mo statewide; Moda Health lowest at $185/mo in Portland
 * - Birthday rule: 63-day window starting on birthday each year
 * - State Farm A++ rated with local agents statewide
 * - Everence Association lowest Plan N at $128/mo with issue-age pricing
 * - Under-65 coverage NOT required by state law
 * - SHIP: Oregon SHIBA (contact local office)
 * - Oregon DCBS: dfr.oregon.gov
 * - Attained-age rating dominates; Transamerica and Everence use issue-age
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
  enrollees: "200,000+",
  carriers: "15+",
  lowestPlanG: "$185/mo",
  avgPlanG: "$224/mo",
  shipPhone: "Oregon SHIBA",
  doiWebsite: "dfr.oregon.gov",
};
export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Moda Health",
    badge: "Lowest Plan G in Oregon",
    score: 4.6,
    amBest: "A-",
    planGMonthly: "$185",
    planNMonthly: "N/A",
    highlight:
      "Moda Health is Oregon's dominant regional insurer and offers the lowest Plan G in the state at $185/mo, which is $39 below the state average. With a strong provider network across Oregon and Washington, Moda is the best price-first choice for Oregon seniors.",
    pros: [
      "Lowest Plan G in Oregon at $185/mo",
      "Strong regional provider network in Oregon and Washington",
      "Well-known local brand with strong customer service",
      "A- AM Best financial strength rating",
    ],
    cons: [
      "Limited plan selection (Plans A, F, G, N only)",
      "Attained-age pricing means premiums rise with age",
      "Not available outside Oregon and Washington",
    ],
  },
  {
    rank: 2,
    name: "State Farm",
    badge: "Best Financial Strength",
    score: 4.6,
    amBest: "A++",
    planGMonthly: "$187",
    planNMonthly: "$145",
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and has local agents across Portland, Eugene, Salem, and rural Oregon. Its Plan G at $187/mo is nearly as low as Moda Health while offering the highest financial strength in the Oregon market.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Local agents across Portland, Eugene, Salem, and rural Oregon",
      "Competitive Plan G at $187/mo",
      "Competitive Plan N at $145/mo",
      "Strong long-term rate stability history",
    ],
    cons: [
      "Does not offer Plans K, L, or M",
      "Attained-age pricing means premiums rise with age",
    ],
  },
  {
    rank: 3,
    name: "USAA",
    badge: "Best for Military Families",
    score: 4.5,
    amBest: "A++",
    planGMonthly: "$188",
    planNMonthly: "$155",
    highlight:
      "USAA offers an A++ AM Best rating and the lowest Plan F in Oregon at $197/mo. Available only to military members and their families, USAA combines top financial strength with competitive Plan G and Plan N pricing.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Lowest Plan F in Oregon at $197/mo",
      "Competitive Plan G at $188/mo",
      "Competitive Plan N at $155/mo",
    ],
    cons: [
      "Only available to military members and eligible family members",
      "Limited plan selection (Plans A, F, G, N only)",
      "Attained-age pricing means premiums rise with age",
    ],
  },
  {
    rank: 4,
    name: "Everence Association",
    badge: "Lowest Plan N + Issue-Age Pricing",
    score: 4.5,
    amBest: "A-",
    planGMonthly: "$195",
    planNMonthly: "$128",
    highlight:
      "Everence Association offers the lowest Plan N in Oregon at $128/mo and uses issue-age pricing, which locks in your rate at enrollment. For Oregon seniors who want the lowest Plan N and long-term rate stability, Everence is the top choice.",
    pros: [
      "Lowest Plan N in Oregon at $128/mo",
      "Issue-age pricing locks in your rate at enrollment",
      "A- AM Best financial strength rating",
      "Covers Plans A, F, G, L, and N",
    ],
    cons: [
      "Plan G at $195/mo is above Moda Health's $185/mo",
      "Smaller national brand recognition",
      "Does not offer Plans B, C, D, K, or M",
    ],
  },
  {
    rank: 5,
    name: "Transamerica",
    badge: "Best Plan Variety",
    score: 4.4,
    amBest: "A",
    planGMonthly: "$221",
    planNMonthly: "N/A",
    highlight:
      "Transamerica is the only Oregon carrier offering all 10 standardized Medigap plan types, including the rarely available Plans K, L, and M. Its issue-age pricing and lowest Plan M at $180/mo make it a strong long-term value for Oregon seniors who want rate stability.",
    pros: [
      "All 10 standardized plan types available",
      "Issue-age pricing locks in your rate at enrollment",
      "Lowest Plan M in Oregon at $180/mo",
      "A financial strength rating",
    ],
    cons: [
      "Plan G at $221/mo is above Moda Health's $185/mo",
      "Higher starting premiums than attained-age carriers",
    ],
  },
];
export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Moda Health", planG: "$185", planN: "N/A", planF: "N/A" },
  { carrier: "State Farm", planG: "$187", planN: "$145", planF: "$240" },
  { carrier: "USAA*", planG: "$188", planN: "$155", planF: "$197" },
  { carrier: "Everence Association", planG: "$195", planN: "$128", planF: "N/A" },
  { carrier: "AARP / UnitedHealthcare", planG: "$203", planN: "$159", planF: "$244" },
  { carrier: "Bankers Life", planG: "$207", planN: "$143", planF: "$237" },
  { carrier: "United American", planG: "$214", planN: "N/A", planF: "N/A" },
  { carrier: "Transamerica", planG: "$221", planN: "N/A", planF: "N/A" },
  { carrier: "State Average", planG: "$224", planN: "$165", planF: "$288" },
];
export const STATE_RULES: StateRule[] = [
  {
    title: "Birthday Rule: 63-Day Annual Switching Window",
    description:
      "Oregon's birthday rule gives you a 63-day window starting on your birthday each year to switch to an equal or lesser Medigap plan without medical underwriting. For example, you can switch from Plan G to Plan N without answering health questions. This is a powerful consumer protection unique to Oregon.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions. This is the best time to enroll.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Oregon does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 (such as those with disabilities). If you are under 65 and on Medicare, you may have difficulty finding Medigap coverage in Oregon. Some carriers offer it voluntarily at higher rates.",
  },
  {
    title: "Attained-Age Rating Dominates",
    description:
      "Most Oregon Medigap carriers use attained-age rating, meaning your premium increases as you get older. Transamerica and Everence Association use issue-age rating where your premium is locked at the rate for your age when you enroll. Issue-age plans often start higher but can be cheaper over the long term.",
  },
  {
    title: "Excess Charges Are Allowed in Oregon",
    description:
      "Oregon does not ban Medicare excess charges. Providers who do not accept Medicare assignment can charge up to 15% more than the Medicare-approved amount. Plan G covers these excess charges; Plan N does not. If your doctors do not accept Medicare assignment, Plan G is the safer choice.",
  },
  {
    title: "Free Help via Oregon SHIBA",
    description:
      "Oregon SHIBA (Senior Health Insurance Benefits Assistance) provides free, unbiased Medicare counseling through state-trained volunteers. Contact your local SHIBA office or the Oregon Department of Consumer and Business Services (dfr.oregon.gov) for a referral. Counselors do not sell insurance.",
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
    description: "Plan G and Plan N rates vs. Oregon market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Oregon",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, EFT discounts, and added benefits",
  },
];
export const FAQS: FaqItem[] = [
  {
    question: "Does Oregon have a birthday rule for Medigap?",
    answer:
      "Yes. Oregon's birthday rule gives you a 63-day window starting on your birthday each year to switch to an equal or lesser Medigap plan without medical underwriting. For example, you can switch from Plan G to Plan N without answering health questions.",
  },
  {
    question: "What is the cheapest Medicare Supplement plan in Oregon?",
    answer:
      "Moda Health offers the lowest Plan G in Oregon at $185/mo. Everence Association has the lowest Plan N at $128/mo. USAA offers the lowest Plan F at $197/mo (military members and families only).",
  },
  {
    question: "Can I use the Oregon birthday rule to switch from Plan G to Plan N?",
    answer:
      "Yes. The Oregon birthday rule allows you to switch to an equal or lesser plan. Plan N has lower benefits than Plan G (it adds copays of up to $20 for doctor visits and up to $50 for ER visits), so switching from Plan G to Plan N qualifies under the birthday rule.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Oregon?",
    answer:
      "Plan G covers everything except the annual Part B deductible ($257 in 2026). Plan N also skips the Part B deductible but adds copays of up to $20 for doctor visits and up to $50 for emergency room visits. In Oregon, Plan N averages $165/mo vs. Plan G at $224/mo.",
  },
  {
    question: "Is Moda Health a good Medigap carrier in Oregon?",
    answer:
      "Moda Health is Oregon's dominant regional insurer and offers the lowest Plan G in the state at $185/mo. It has an A- rating from AM Best and a strong provider network in Oregon and Washington. Its main limitation is a smaller plan selection (Plans A, F, G, N only).",
  },
  {
    question: "What free Medicare counseling is available in Oregon?",
    answer:
      "Oregon SHIBA (Senior Health Insurance Benefits Assistance) provides free, unbiased counseling through state-trained volunteers. Contact your local SHIBA office or the Oregon Department of Consumer and Business Services at dfr.oregon.gov for a referral.",
  },
  {
    question: "Does Oregon require insurers to sell Medigap to people under 65?",
    answer:
      "No. Oregon does not require insurers to sell Medigap to Medicare beneficiaries under 65. Some carriers offer under-65 plans voluntarily, but availability and pricing vary. Contact the Oregon DCBS at dfr.oregon.gov for a current list of carriers offering under-65 coverage.",
  },
  {
    question: "How do I compare Medigap rates in Oregon?",
    answer:
      "Use Medicare.gov's plan finder to compare all carriers in your ZIP code. You can also contact Oregon SHIBA for free help comparing plans. Because benefits are standardized, the only difference between carriers for the same plan letter is the monthly premium and pricing style.",
  },
];
