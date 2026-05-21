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
    title: "Under-65 Coverage Required",
    description:
      "New Jersey law requires Medigap insurers to offer at least one policy to Medicare beneficiaries under age 65, including those who qualify due to disability or end-stage renal disease. This is a stronger protection than most states, where under-65 coverage is optional. Premiums for under-65 enrollees are typically higher than for those who enroll at 65.",
  },
  {
    title: "All Three Rating Methods Allowed",
    description:
      "New Jersey allows carriers to use attained-age, issue-age, or community rating for Medigap premiums. Most carriers in New Jersey use attained-age rating, meaning premiums increase as you get older. Some carriers offer issue-age policies where premiums are locked at your enrollment age. Always ask which rating method a carrier uses before enrolling, as it significantly affects your long-term costs.",
  },
  {
    title: "No Birthday Rule or Anniversary Rule",
    description:
      "New Jersey does not have a birthday rule or anniversary rule. Your guaranteed-issue window is your 6-month Open Enrollment Period when you first enroll in Medicare Part B. After that window closes, insurers can apply medical underwriting and deny coverage or charge higher premiums based on health conditions.",
  },
  {
    title: "Plans C and F Not Available to New Enrollees",
    description:
      "Federal law prohibits new Medicare enrollees (those who turned 65 on or after January 1, 2020) from purchasing Plans C and F. If you were already enrolled in Medicare before 2020, you may still be able to keep or switch to these plans. For new enrollees, Plan G is the most comprehensive option available.",
  },
  {
    title: "New Jersey DOBI Regulates Medigap",
    description:
      "The New Jersey Department of Banking and Insurance (DOBI) oversees all Medigap policies sold in the state. Carriers must file rate changes and receive approval before implementing increases. You can verify carrier licenses and file complaints at dobi.nj.gov or by calling 1-800-446-7467.",
  },
  {
    title: "Free Counseling via NJ SHIP",
    description:
      "New Jersey's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-792-8820 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
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
    question: "What is the best Medicare Supplement plan in New Jersey for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan in New Jersey for new enrollees. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). AARP/UnitedHealthcare dominates the market with 47.1% share and strong member benefits. For the best value, Aetna at $148/mo or Cigna at $139/mo offer competitive pricing with solid financial ratings.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in New Jersey?",
    answer:
      "Plan G premiums in New Jersey range from approximately $139/mo to $162/mo for a 65-year-old female nonsmoker in Newark. Premiums vary by carrier, ZIP code, age, gender, tobacco use, and rating method. The cheapest option is Cigna at $139/mo, though Aetna at $148/mo offers better value with a lower complaint ratio. New Jersey premiums are higher than most states due to the under-65 coverage mandate and market dynamics.",
  },
  {
    question: "Does New Jersey have a birthday rule for Medigap?",
    answer:
      "No. New Jersey does not have a birthday rule or anniversary rule. Your guaranteed-issue window is your 6-month Open Enrollment Period when you first enroll in Medicare Part B at age 65. After that window closes, insurers can apply medical underwriting. New Jersey does require insurers to offer at least one Medigap policy to under-65 Medicare beneficiaries, which is a stronger protection than most states.",
  },
  {
    question: "Why are Medicare Supplement premiums higher in New Jersey?",
    answer:
      "New Jersey premiums are higher than the national average for several reasons. The state requires insurers to cover under-65 Medicare beneficiaries, which spreads risk across a broader and often sicker pool. New Jersey also has a higher cost of living and healthcare costs than most states. The result is Plan G premiums that run $139 to $162/mo compared to $87 to $113/mo in lower-cost states like Tennessee or Indiana.",
  },
  {
    question: "What is the difference between Plan G and Plan N in New Jersey?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for emergency room visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $105 to $118/mo in New Jersey vs. $139 to $162/mo for Plan G. If you rarely visit doctors and your providers do not charge excess fees, Plan N can save $300 to $500 per year.",
  },
  {
    question: "Can I switch Medicare Supplement plans in New Jersey?",
    answer:
      "Yes, you can apply to switch Medigap plans at any time in New Jersey, but outside of your Open Enrollment Period you will face medical underwriting. The new carrier will ask health questions and can deny coverage or charge higher premiums based on pre-existing conditions. New Jersey has no birthday rule or other special switching protections, so your OEP is the best time to lock in the right plan.",
  },
  {
    question: "Is Horizon Blue Cross Blue Shield a good Medigap option in New Jersey?",
    answer:
      "Yes. Horizon BCBS NJ is the state's largest health insurer and holds 14.7% of the Medigap market. Their deep local roots and strong provider relationships across New Jersey make them a compelling choice for retirees who prefer a familiar local brand. Their Plan G premium of $155/mo is competitive for a local carrier, though AARP/UHC and Mutual of Omaha offer stronger national financial backing.",
  },
  {
    question: "Where can I get free Medicare Supplement help in New Jersey?",
    answer:
      "New Jersey's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling. Call 1-800-792-8820 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance. The New Jersey Department of Banking and Insurance (DOBI) also maintains a consumer helpline at 1-800-446-7467.",
  },
];
