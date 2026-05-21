// Tennessee Medigap Data
// All premiums: Nashville, 65-year-old female, nonsmoker, 2026

export interface Carrier {
  rank: number;
  name: string;
  badge: string;
  score: number;
  amBest: string;
  planGMonthly: string;
  planNMonthly: string;
  pros: string[];
  cons: string[];
  highlight: string;
}

export interface PremiumRow {
  carrier: string;
  planG: string;
  planN: string;
  planF: string;
}

export interface FaqItem {
  question: string;
  answer: string;
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

export const STATE_NAME = "Tennessee";
export const STATE_ABBR = "TN";
export const SAMPLE_CITY = "Nashville";

export const STATE_STATS = {
  enrollees: "280,000+",
  lowestPlanG: "$87/mo",
  carriers: "25+",
  planGAdoption: "47%",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Mutual of Omaha",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A+",
    planGMonthly: "$121",
    planNMonthly: "$84",
    highlight:
      "Mutual of Omaha earns the top spot in Tennessee thanks to its exceptional customer service record, A+ AM Best rating, and one of the lowest complaint ratios in the state. While not the cheapest option, the value-to-price ratio is outstanding for Tennessee seniors.",
    pros: [
      "A+ AM Best financial strength rating",
      "Far-fewer-than-expected complaints (0.18 ratio)",
      "Excellent U.S.-based customer service",
      "Household discount of 7% available",
      "Strong agent network across Nashville, Memphis, and Knoxville",
    ],
    cons: [
      "Not the lowest premium in Tennessee",
      "Premiums increase with age (attained-age rating)",
    ],
  },
  {
    rank: 2,
    name: "AARP / UnitedHealthcare",
    badge: "Best Plan Availability",
    score: 4.7,
    amBest: "A",
    planGMonthly: "$115",
    planNMonthly: "$80",
    highlight:
      "AARP/UnitedHealthcare is the largest Medicare Supplement insurer in Tennessee by enrollment. The AARP brand recognition and broad plan availability make it a reliable choice, and its premiums are competitive for a nationally-recognized carrier.",
    pros: [
      "Largest Medigap insurer in Tennessee",
      "AARP member benefits and resources",
      "Broad availability across all Tennessee counties",
      "Competitive premiums for a top-tier carrier",
      "Strong financial stability (A rating)",
    ],
    cons: [
      "Premiums tend to increase faster than smaller carriers",
      "Must be AARP member to enroll (low annual fee)",
    ],
  },
  {
    rank: 3,
    name: "Cigna / Evernorth",
    badge: "Best for Low Premiums",
    score: 4.5,
    amBest: "A",
    planGMonthly: "$96",
    planNMonthly: "$65",
    highlight:
      "Cigna offers some of the most competitive Plan G premiums in Tennessee, making it a strong choice for budget-conscious seniors. At $96/mo in Nashville, it is one of the lowest rates from a nationally-recognized carrier. The slightly elevated complaint ratio is worth noting but not alarming.",
    pros: [
      "Among the lowest Plan G premiums from a major carrier ($96/mo)",
      "A financial strength rating",
      "Cigna/Evernorth nationwide network",
      "Competitive Plan N pricing",
    ],
    cons: [
      "Slightly above-expected complaint ratio",
      "Customer service can be inconsistent",
      "Premiums rise with age (attained-age)",
    ],
  },
  {
    rank: 4,
    name: "Humana",
    badge: "Best for Active Seniors",
    score: 4.4,
    amBest: "A-",
    planGMonthly: "$110",
    planNMonthly: "$78",
    highlight:
      "Humana is a strong choice for Tennessee seniors who want more than just coverage. The SilverSneakers fitness program is included with many Humana Medigap plans, giving enrollees free gym access across Tennessee. Humana also has a large agent presence in Nashville, Memphis, and Knoxville.",
    pros: [
      "SilverSneakers fitness program included",
      "Fewer-than-expected complaints",
      "Large Tennessee agent network",
      "Competitive premiums for the benefits offered",
      "A- AM Best rating",
    ],
    cons: [
      "Slightly higher premiums than Cigna",
      "SilverSneakers availability varies by location",
    ],
  },
  {
    rank: 5,
    name: "Wellabe",
    badge: "Best Budget Option",
    score: 4.2,
    amBest: "A-",
    planGMonthly: "$113",
    planNMonthly: "$76",
    highlight:
      "Wellabe (formerly CUNA Mutual) offers a solid combination of competitive premiums and a low complaint ratio in Tennessee. At $113/mo for Plan G, it sits in the middle of the market but delivers better customer service than many cheaper alternatives.",
    pros: [
      "Fewer-than-expected complaints (0.21 ratio)",
      "Competitive mid-range premiums",
      "A- AM Best rating",
      "Good value for the price",
    ],
    cons: [
      "Less name recognition than top-tier carriers",
      "Smaller agent network in rural Tennessee",
    ],
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  {
    carrier: "Physicians Select",
    planG: "$87/mo",
    planN: "$58/mo",
    planF: "$112/mo",
  },
  {
    carrier: "Cigna",
    planG: "$96/mo",
    planN: "$65/mo",
    planF: "$128/mo",
  },
  {
    carrier: "NHIC",
    planG: "$109/mo",
    planN: "$72/mo",
    planF: "$138/mo",
  },
  {
    carrier: "Humana",
    planG: "$110/mo",
    planN: "$78/mo",
    planF: "$141/mo",
  },
  {
    carrier: "Wellabe",
    planG: "$113/mo",
    planN: "$76/mo",
    planF: "$144/mo",
  },
  {
    carrier: "UnitedHealthcare (AARP)",
    planG: "$115/mo",
    planN: "$80/mo",
    planF: "$148/mo",
  },
  {
    carrier: "Mutual of Omaha",
    planG: "$121/mo",
    planN: "$84/mo",
    planF: "$155/mo",
  },
  {
    carrier: "State Farm",
    planG: "$128/mo",
    planN: "$89/mo",
    planF: "$162/mo",
  },
];

export const STATE_RULES: StateRule[] = [
  {
    title: "No Birthday or Anniversary Rule",
    description:
      "Tennessee does not have a birthday rule or anniversary rule. Your 6-month Open Enrollment Period starting at age 65 is your only guaranteed-issue window. After OEP, carriers can use medical underwriting to deny coverage or charge higher premiums.",
  },
  {
    title: "Attained-Age Rating",
    description:
      "All Tennessee Medigap carriers use attained-age rating, meaning premiums increase as you get older. Locking in during your OEP at 65 gives you the lowest starting premium.",
  },
  {
    title: "30-Day Free Look Period",
    description:
      "Tennessee law requires a 30-day free look period on all Medigap policies. If you are not satisfied, you can cancel within 30 days for a full premium refund.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Unlike New York and Georgia, Tennessee does not require carriers to offer Medigap to Medicare enrollees under age 65. If you have Medicare due to disability or ESRD before 65, coverage options may be limited.",
  },
  {
    title: "TN SHIP Free Counseling",
    description:
      "The Tennessee State Health Insurance Assistance Program (TN SHIP) offers free, unbiased Medicare counseling. Call 1-877-801-0044 to speak with a trained counselor at no cost.",
  },
  {
    title: "TDCI Regulation",
    description:
      "Medigap plans in Tennessee are regulated by the Tennessee Department of Commerce and Insurance (TDCI). All plans must meet federal standardization requirements.",
  },
];

export const SCORING_FACTORS: ScoringFactor[] = [
  {
    factor: "Financial Strength",
    weight: "25%",
    description: "AM Best rating and long-term solvency indicators",
  },
  {
    factor: "Complaint Ratio",
    weight: "25%",
    description:
      "NAIC complaint index relative to market share (lower is better)",
  },
  {
    factor: "Premium Competitiveness",
    weight: "20%",
    description:
      "Plan G and Plan N rates relative to Tennessee market average",
  },
  {
    factor: "Customer Service",
    weight: "20%",
    description:
      "U.S.-based support, claims processing speed, and member satisfaction",
  },
  {
    factor: "Tennessee Availability",
    weight: "10%",
    description:
      "Agent network depth and coverage across all 95 Tennessee counties",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Tennessee?",
    answer:
      "Plan G is the most popular and widely recommended Medicare Supplement plan in Tennessee, chosen by about 47% of Medigap enrollees. It covers everything except the Part B deductible ($257 in 2026), giving you near-complete coverage. Plan N is a strong budget alternative at $65-84/mo, with small copays for some office visits.",
  },
  {
    question: "How much does Medicare Supplement cost in Tennessee?",
    answer:
      "Plan G premiums in Tennessee range from about $87/mo (Physicians Select, Nashville) to $128/mo (State Farm) for a 65-year-old female nonsmoker. Tennessee has some of the most competitive Medigap premiums in the Southeast. Plan N runs $58-89/mo for the same profile.",
  },
  {
    question: "Does Tennessee have a birthday rule for Medigap?",
    answer:
      "No. Tennessee does not have a birthday rule or anniversary rule. Your 6-month Open Enrollment Period starting at age 65 is the only time you can switch Medigap plans without medical underwriting. After OEP, carriers can deny coverage or charge higher premiums based on your health.",
  },
  {
    question: "What is the cheapest Medicare Supplement plan in Tennessee?",
    answer:
      "Physicians Select offers Plan G at $87/mo in Nashville, making it the cheapest option from any carrier. Among nationally-recognized carriers, Cigna at $96/mo is the most affordable. However, price alone should not drive your decision. Cigna has a slightly elevated complaint ratio, while Mutual of Omaha at $121/mo has one of the best customer service records in the state.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Tennessee?",
    answer:
      "Yes, but only with medical underwriting after your OEP. Tennessee has no birthday or anniversary rule, so carriers can ask health questions and deny coverage if you apply outside your OEP. The only exception is if you have a guaranteed-issue right due to a qualifying life event, such as losing employer coverage.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Tennessee?",
    answer:
      "Plan G covers everything except the Part B deductible ($257 in 2026). Plan N also skips the Part B deductible but adds small copays: up to $20 for office visits and up to $50 for emergency room visits that do not result in inpatient admission. Plan N also does not cover Part B excess charges. In Tennessee, Plan N runs $30-40/mo less than Plan G.",
  },
  {
    question:
      "Does Tennessee require Medigap coverage for people under 65?",
    answer:
      "No. Tennessee does not require carriers to offer Medigap to Medicare enrollees under age 65. If you have Medicare due to a disability or ESRD before turning 65, your options may be limited. Some carriers do offer coverage voluntarily, but it is not required by state law.",
  },
  {
    question: "What is TN SHIP and how can it help me?",
    answer:
      "TN SHIP (Tennessee State Health Insurance Assistance Program) is a free, unbiased counseling service for Medicare beneficiaries. Trained volunteers help you compare Medigap plans, understand your rights, and navigate enrollment. Call 1-877-801-0044 or visit tn.gov/aging for assistance.",
  },
];
