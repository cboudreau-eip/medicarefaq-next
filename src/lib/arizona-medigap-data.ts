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

export const STATE_NAME = "Arizona";
export const STATE_ABBR = "AZ";
export const SAMPLE_CITY = "Phoenix";

export const STATE_STATS = {
  enrollees: "352,000+",
  lowestPlanG: "$106/mo",
  carriers: "30+",
  medicareTotal: "1.5M",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Mutual of Omaha",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A+",
    planGMonthly: "$138",
    planNMonthly: "$99",
    pros: [
      "A+ AM Best financial rating",
      "Exceptional U.S.-based customer service",
      "Household discount of 7% available",
      "Strong agent network across Arizona",
      "Consistent rate stability year over year",
    ],
    cons: [
      "Not the cheapest Plan G in Phoenix",
      "Attained-age rating means premiums rise with age",
    ],
    highlight:
      "Mutual of Omaha is the top-rated Medicare Supplement carrier in Arizona, combining financial strength with outstanding customer service. Their U.S.-based claims team and 7% household discount make them the go-to choice for Arizona retirees who want reliability over the lowest possible premium.",
  },
  {
    rank: 2,
    name: "AARP / UnitedHealthcare",
    badge: "Best Plan Availability",
    score: 4.7,
    amBest: "A",
    planGMonthly: "$148",
    planNMonthly: "$108",
    pros: [
      "Largest Medicare Supplement enrollment in the country",
      "AARP brand recognition and member benefits",
      "Broad plan selection including Plans G, N, and HDG",
      "Nurse hotline and wellness programs included",
      "Strong presence in Phoenix, Tucson, and Scottsdale",
    ],
    cons: [
      "Higher premiums than some competitors",
      "AARP membership required ($16/year)",
    ],
    highlight:
      "AARP/UnitedHealthcare is the largest Medicare Supplement insurer in Arizona by enrollment. Their broad plan selection and added member benefits like a 24/7 nurse hotline make them a strong choice, though premiums run higher than budget options.",
  },
  {
    rank: 3,
    name: "Cigna",
    badge: "Best for Low Premiums",
    score: 4.4,
    amBest: "A",
    planGMonthly: "$106",
    planNMonthly: "$78",
    pros: [
      "Lowest Plan G premium in Phoenix at $106/mo",
      "Household discount available",
      "A AM Best financial rating",
      "Nationwide network acceptance",
    ],
    cons: [
      "Higher-than-expected complaint ratio",
      "Customer service quality inconsistent",
      "Rate increases can be steeper than competitors",
    ],
    highlight:
      "Cigna offers the lowest Plan G premium in the Phoenix market at $106/mo, making them attractive for budget-conscious enrollees. Their complaint ratio runs higher than Mutual of Omaha or AARP/UHC. Best for healthy enrollees who want to minimize monthly costs and are comfortable shopping again in a few years.",
  },
  {
    rank: 4,
    name: "Humana",
    badge: "Best for Active Retirees",
    score: 4.5,
    amBest: "A-",
    planGMonthly: "$132",
    planNMonthly: "$95",
    pros: [
      "SilverSneakers fitness benefit included",
      "Strong Arizona market presence",
      "Competitive Plan N pricing",
      "Household discount available",
      "A- AM Best financial rating",
    ],
    cons: [
      "Plan G premium higher than Cigna",
      "Some rate volatility in recent years",
    ],
    highlight:
      "Humana stands out in Arizona for including the SilverSneakers fitness benefit, which gives members free access to thousands of gyms and fitness centers statewide. For active Arizona retirees in Sun City, Scottsdale, or Tucson, the fitness perk adds real value on top of solid Medigap coverage.",
  },
  {
    rank: 5,
    name: "Wellabe",
    badge: "Best Budget Option",
    score: 4.2,
    amBest: "A-",
    planGMonthly: "$119",
    planNMonthly: "$87",
    pros: [
      "Strong middle-ground pricing between Cigna and Mutual of Omaha",
      "Better complaint record than Cigna",
      "A- AM Best financial rating",
      "Household discount available",
    ],
    cons: [
      "Smaller brand recognition than top carriers",
      "Fewer supplemental benefits",
    ],
    highlight:
      "Wellabe (formerly Medico) offers a compelling middle ground in Arizona: cheaper than Mutual of Omaha and AARP/UHC, with a much better complaint record than Cigna. For Arizona enrollees who want to save money without taking on the service risk of the cheapest option, Wellabe is worth a quote.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Cigna", planG: "$106", planN: "$78", planF: "$125" },
  { carrier: "Wellabe", planG: "$119", planN: "$87", planF: "N/A" },
  { carrier: "Humana", planG: "$132", planN: "$95", planF: "$157" },
  { carrier: "Mutual of Omaha", planG: "$138", planN: "$99", planF: "$162" },
  { carrier: "AARP / UnitedHealthcare", planG: "$148", planN: "$108", planF: "$171" },
  { carrier: "Bankers Fidelity", planG: "$125", planN: "$90", planF: "$147" },
  { carrier: "NHIC", planG: "$118", planN: "$85", planF: "$140" },
  { carrier: "State Farm", planG: "$144", planN: "$103", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule or Anniversary Rule",
    description:
      "Arizona does not have a birthday rule or anniversary rule. Unlike California (birthday rule) or Missouri (anniversary rule), Arizona only guarantees your right to enroll in any Medigap plan without medical underwriting during your 6-month Open Enrollment Period when you first turn 65 and enroll in Medicare Part B. After that window closes, insurers can deny coverage or charge higher premiums based on health conditions.",
  },
  {
    title: "Attained-Age Rating Standard",
    description:
      "Most Arizona Medigap policies use attained-age rating, meaning premiums increase as you get older. Issue-age policies, where premiums are locked at your age when you enrolled, are available from select carriers and may save money long-term for enrollees who plan to keep the same carrier for many years.",
  },
  {
    title: "Household Discount Available",
    description:
      "Many Arizona carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount include Mutual of Omaha, Cigna, Humana, Anthem, and Wellabe. Always ask about the household discount when getting quotes.",
  },
  {
    title: "Arizona DIFI Regulates Medigap",
    description:
      "The Arizona Department of Insurance and Financial Institutions (DIFI) oversees all Medigap policies sold in the state. Carriers must file rate changes and receive approval before implementing increases. You can verify carrier licenses and file complaints at insurance.az.gov.",
  },
  {
    title: "Free Counseling via Arizona SHIP",
    description:
      "Arizona's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-432-4040 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. Arizona market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Arizona" },
  { factor: "Discounts and Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Arizona for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan in Arizona for new enrollees. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). For the best overall value, Mutual of Omaha (A+ rated) consistently ranks highest in Arizona for financial strength and customer satisfaction. Cigna offers the lowest premium at $106/mo in Phoenix but carries a higher complaint ratio.",
  },
  {
    question: "Does Arizona have a birthday rule for Medigap?",
    answer:
      "No. Arizona does not have a birthday rule or anniversary rule. Unlike California (birthday rule) or Missouri (anniversary rule), Arizona only guarantees your right to enroll in any Medigap plan without medical underwriting during your 6-month Open Enrollment Period when you first turn 65 and enroll in Medicare Part B. After that window, insurers can deny coverage based on health conditions.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Arizona?",
    answer:
      "Plan G premiums in Arizona range from approximately $106/mo to $148/mo for a 65-year-old female nonsmoker in Phoenix. Premiums vary by carrier, ZIP code, age, gender, and tobacco use. Tucson and Scottsdale rates may differ slightly from Phoenix. The cheapest option is Cigna at $106/mo, though Wellabe at $119/mo offers better value with a lower complaint ratio.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Arizona?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for emergency room visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $78 to $108/mo in Arizona vs. $106 to $148/mo for Plan G. If you rarely visit doctors and your providers do not charge excess fees, Plan N can save $300 to $500 per year.",
  },
  {
    question: "What is the Arizona household discount for Medicare Supplement?",
    answer:
      "Many carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount in Arizona include Mutual of Omaha, Cigna, Humana, Anthem, and Wellabe. If you and a spouse or domestic partner are both enrolling, always ask about the household discount before choosing a carrier.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Arizona?",
    answer:
      "Yes, you can apply to switch Medigap plans at any time in Arizona, but outside of your Open Enrollment Period you will face medical underwriting. The new carrier will ask approximately 20 health questions and can deny coverage or charge higher premiums based on pre-existing conditions. Arizona has no birthday rule or other special switching protections, so your OEP is the best time to lock in the right plan.",
  },
  {
    question: "What is High-Deductible Plan G and is it a good option in Arizona?",
    answer:
      "High-Deductible Plan G (HDG) offers the same coverage as standard Plan G but requires you to pay a deductible of $2,870 (2026) before benefits kick in. In exchange, monthly premiums drop to roughly $40 to $55/mo. HDG is a strong option for healthy Arizona retirees who rarely use medical services and want to minimize monthly costs. Mutual of Omaha and Cigna are the leading HDG carriers in Arizona.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Arizona?",
    answer:
      "Arizona's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling through the Arizona Department of Insurance. Call 1-800-432-4040 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];
