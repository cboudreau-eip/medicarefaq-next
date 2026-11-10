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

export const STATE_NAME = "New Jersey";
export const STATE_ABBR = "NJ";
export const SAMPLE_CITY = "Newark";

export const STATE_STATS = {
  enrollees: "496,000+",
  lowestPlanG: "$139/mo",
  carriers: "25+",
  medicareTotal: "1.7M",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "AARP / UnitedHealthcare",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A",
    planGMonthly: "$162",
    planNMonthly: "$118",
    pros: [
      "47.1% New Jersey market share -- largest by far",
      "AARP brand recognition and member benefits",
      "Broad plan selection including Plans G, N, and HDG",
      "Nurse hotline and wellness programs included",
      "Strong presence in Newark, Jersey City, and Princeton",
    ],
    cons: [
      "Higher premiums than some competitors",
      "AARP membership required ($16/year)",
    ],
    highlight:
      "AARP/UnitedHealthcare dominates the New Jersey Medigap market with a 47.1% share, nearly three times the next largest carrier. Their national scale, strong financial backing, and added member benefits like a 24/7 nurse hotline make them the most trusted choice for New Jersey retirees.",
  },
  {
    rank: 2,
    name: "Horizon Blue Cross Blue Shield of NJ",
    badge: "Best Local Carrier",
    score: 4.7,
    amBest: "A-",
    planGMonthly: "$155",
    planNMonthly: "$112",
    pros: [
      "14.7% New Jersey market share",
      "New Jersey's largest health insurer overall",
      "Deep local roots and strong provider relationships",
      "Competitive Plan G pricing for a local carrier",
      "Strong customer service network statewide",
    ],
    cons: [
      "Not available outside New Jersey if you relocate",
      "Attained-age rating means premiums rise with age",
    ],
    highlight:
      "Horizon Blue Cross Blue Shield of New Jersey is the state's largest health insurer and holds 14.7% of the Medigap market. Their deep local roots and strong provider relationships across New Jersey make them a compelling choice for retirees who prefer a familiar local brand over a national carrier.",
  },
  {
    rank: 3,
    name: "Mutual of Omaha",
    badge: "Best Financial Strength",
    score: 4.6,
    amBest: "A+",
    planGMonthly: "$158",
    planNMonthly: "$115",
    pros: [
      "A+ AM Best financial rating -- highest in the market",
      "7.5% New Jersey market share",
      "Exceptional U.S.-based customer service",
      "Household discount of 7% available",
      "Consistent rate stability year over year",
    ],
    cons: [
      "Not the cheapest Plan G in Newark",
      "Attained-age rating means premiums rise with age",
    ],
    highlight:
      "Mutual of Omaha brings the highest AM Best rating (A+) in the New Jersey market and a strong track record of rate stability. Their 7% household discount and U.S.-based claims team make them the top pick for New Jersey retirees who prioritize financial strength and service quality over the lowest possible premium.",
  },
  {
    rank: 4,
    name: "Aetna",
    badge: "Best for Plan Variety",
    score: 4.4,
    amBest: "A",
    planGMonthly: "$148",
    planNMonthly: "$107",
    pros: [
      "7.4% New Jersey market share",
      "Competitive Plan G pricing",
      "A AM Best financial rating",
      "Strong plan variety including HDG",
      "Household discount available",
    ],
    cons: [
      "Customer service quality can vary",
      "Rate increases have been above average in some years",
    ],
    highlight:
      "Aetna holds 7.4% of the New Jersey Medigap market and offers competitive Plan G pricing at $148/mo in Newark. Their broad plan variety including High-Deductible Plan G makes them a solid choice for New Jersey enrollees who want options beyond the standard Plan G and Plan N.",
  },
  {
    rank: 5,
    name: "Cigna",
    badge: "Best for Low Premiums",
    score: 4.2,
    amBest: "A",
    planGMonthly: "$139",
    planNMonthly: "$105",
    pros: [
      "Lowest Plan G premium in Newark at $139/mo",
      "A AM Best financial rating",
      "Household discount available",
      "Nationwide network acceptance",
    ],
    cons: [
      "Higher-than-expected complaint ratio",
      "Customer service quality inconsistent",
      "Rate increases can be steeper than competitors",
    ],
    highlight:
      "Cigna offers the lowest Plan G premium in the Newark market at $139/mo, making them attractive for budget-conscious New Jersey enrollees. Their complaint ratio runs higher than AARP/UHC or Mutual of Omaha. Best for healthy enrollees who want to minimize monthly costs and are comfortable shopping again in a few years.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Cigna", planG: "$139", planN: "$105", planF: "$168" },
  { carrier: "Aetna", planG: "$148", planN: "$107", planF: "$175" },
  { carrier: "Horizon BCBS NJ", planG: "$155", planN: "$112", planF: "$183" },
  { carrier: "Mutual of Omaha", planG: "$158", planN: "$115", planF: "$186" },
  { carrier: "AARP / UnitedHealthcare", planG: "$162", planN: "$118", planF: "$191" },
  { carrier: "Humana", planG: "$152", planN: "$110", planF: "$179" },
  { carrier: "Wellabe", planG: "$145", planN: "$106", planF: "N/A" },
  { carrier: "Washington National", planG: "$151", planN: "$109", planF: "$177" },
];

export const STATE_RULES = [
  {
    "title": "Plan C and Plan F eligibility",
    "description": "These plans are generally limited to people first eligible for Medicare before January 1, 2020. Eligibility is based on when you first qualified for Medicare, not simply when you turned 65."
  },
  {
    "title": "A policy for each person",
    "description": "A Medigap policy covers one person. Spouses can choose different insurers and plan letters; ask whether a household discount applies."
  },
  {
    "title": "Check guaranteed issue rights",
    "description": "Certain coverage losses and trial-right situations can provide protection outside your initial enrollment window. Confirm your qualifying event, deadline, and available plan letters before applying."
  }
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. New Jersey market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in New Jersey" },
  { factor: "Discounts and Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    "question": "Does Medigap include prescription drug coverage?",
    "answer": "Policies sold today do not include prescription drug coverage. People with Original Medicare can consider a separate Part D plan and should check its enrollment rules."
  },
  {
    "question": "Can my spouse use my Medigap policy?",
    "answer": "No. Each policy covers one person. Compare individual coverage needs and ask about any household discount rather than assuming both spouses need the same insurer."
  },
  {
    "question": "Does a lower premium mean fewer standardized benefits?",
    "answer": "For the same standardized plan letter, the core benefits are the same across insurers. Compare the actual policy, including whether it is Medicare SELECT or a high-deductible version, before treating quotes as equivalent."
  },
  {
    "question": "Does fall enrollment guarantee I can switch Medigap?",
    "answer": "No. The fall Medicare enrollment period is not a general Medigap guaranteed issue window. An insurer may ask health questions unless an enrollment protection applies."
  },
  {
    "question": "Will issue-age pricing keep my premium unchanged?",
    "answer": "No. Issue-age pricing does not raise the premium simply because you get older, but other rate increases can still apply."
  }
];
