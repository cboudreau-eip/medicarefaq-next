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

export const STATE_NAME = "Indiana";
export const STATE_ABBR = "IN";
export const SAMPLE_CITY = "Indianapolis";

export const STATE_STATS = {
  enrollees: "250,000+",
  lowestPlanG: "$93/mo",
  carriers: "25+",
  medicareTotal: "1.4M",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Mutual of Omaha",
    badge: "Best Overall",
    score: 4.8,
    amBest: "A+",
    planGMonthly: "$145",
    planNMonthly: "$105",
    pros: [
      "A+ AM Best financial rating",
      "Exceptional U.S.-based customer service",
      "Household discount of 7% available",
      "Strong agent network across Indiana",
      "Consistent rate stability year over year",
    ],
    cons: [
      "Not the cheapest Plan G in Indianapolis",
      "Attained-age rating means premiums rise with age",
    ],
    highlight:
      "Mutual of Omaha is the top-rated Medicare Supplement carrier in Indiana, combining financial strength with outstanding customer service. Their U.S.-based claims team and 7% household discount make them the go-to choice for Indiana retirees who want reliability over the lowest possible premium.",
  },
  {
    rank: 2,
    name: "AARP / UnitedHealthcare",
    badge: "Best Plan Availability",
    score: 4.6,
    amBest: "A",
    planGMonthly: "$122",
    planNMonthly: "$89",
    pros: [
      "Largest Medicare Supplement enrollment in the country",
      "AARP brand recognition and member benefits",
      "Broad plan selection including Plans G, N, and HDG",
      "Nurse hotline and wellness programs included",
      "Strong presence in Indianapolis, Fort Wayne, and South Bend",
    ],
    cons: [
      "Higher premiums than some competitors",
      "AARP membership required ($16/year)",
    ],
    highlight:
      "AARP/UnitedHealthcare is the largest Medicare Supplement insurer in Indiana by enrollment. Their broad plan selection and added member benefits like a 24/7 nurse hotline make them a strong choice, though premiums run higher than budget options.",
  },
  {
    rank: 3,
    name: "Humana",
    badge: "Best for Active Retirees",
    score: 4.4,
    amBest: "A-",
    planGMonthly: "$135",
    planNMonthly: "$97",
    pros: [
      "SilverSneakers fitness benefit included",
      "Strong Indiana market presence",
      "Competitive Plan N pricing",
      "Household discount available",
      "A- AM Best financial rating",
    ],
    cons: [
      "Plan G premium higher than Cigna",
      "Some rate volatility in recent years",
    ],
    highlight:
      "Humana stands out in Indiana for including the SilverSneakers fitness benefit, which gives members free access to thousands of gyms and fitness centers statewide. For active Indiana retirees in Indianapolis, Bloomington, or South Bend, the fitness perk adds real value on top of solid Medigap coverage.",
  },
  {
    rank: 4,
    name: "Cigna",
    badge: "Best for Low Premiums",
    score: 4.1,
    amBest: "A",
    planGMonthly: "$100",
    planNMonthly: "$73",
    pros: [
      "One of the lowest Plan G premiums in Indianapolis at $100/mo",
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
      "Cigna offers one of the lowest Plan G premiums in the Indianapolis market at $100/mo, making them attractive for budget-conscious enrollees. Their complaint ratio runs higher than Mutual of Omaha or AARP/UHC. Best for healthy enrollees who want to minimize monthly costs and are comfortable shopping again in a few years.",
  },
  {
    rank: 5,
    name: "Wellabe",
    badge: "Best Budget Option",
    score: 4.0,
    amBest: "A-",
    planGMonthly: "$130",
    planNMonthly: "$94",
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
      "Wellabe (formerly Medico) offers a compelling middle ground in Indiana: cheaper than Mutual of Omaha and AARP/UHC, with a much better complaint record than Cigna. For Indiana enrollees who want to save money without taking on the service risk of the cheapest option, Wellabe is worth a quote.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Physicians Select", planG: "$93", planN: "$68", planF: "$148" },
  { carrier: "Cigna", planG: "$100", planN: "$73", planF: "$139" },
  { carrier: "Bankers Fidelity", planG: "$108", planN: "$78", planF: "$127" },
  { carrier: "NHIC", planG: "$110", planN: "$80", planF: "$134" },
  { carrier: "Humana", planG: "$135", planN: "$97", planF: "$158" },
  { carrier: "Wellabe", planG: "$130", planN: "$94", planF: "N/A" },
  { carrier: "AARP / UnitedHealthcare", planG: "$122", planN: "$89", planF: "$147" },
  { carrier: "Mutual of Omaha", planG: "$145", planN: "$105", planF: "$168" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule or Anniversary Rule",
    description:
      "Indiana does not have a birthday rule or anniversary rule. Unlike California (birthday rule), Missouri (anniversary rule), or Virginia (birthday rule), Indiana only guarantees your right to enroll in any Medigap plan without medical underwriting during your 6-month Open Enrollment Period when you first turn 65 and enroll in Medicare Part B. After that window closes, insurers can deny coverage or charge higher premiums based on health conditions.",
  },
  {
    title: "Attained-Age Rating Standard",
    description:
      "Most Indiana Medigap policies use attained-age rating, meaning premiums increase as you get older. Issue-age policies, where premiums are locked at your age when you enrolled, are available from select carriers and may save money long-term for enrollees who plan to keep the same carrier for many years.",
  },
  {
    title: "Household Discount Available",
    description:
      "Many Indiana carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount include Mutual of Omaha, Cigna, Humana, and Wellabe. Always ask about the household discount when getting quotes.",
  },
  {
    title: "Indiana Department of Insurance Regulates Medigap",
    description:
      "The Indiana Department of Insurance (IDOI) oversees all Medigap policies sold in the state. Carriers must file rate changes and receive approval before implementing increases. You can verify carrier licenses and file complaints at in.gov/idoi.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Indiana does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 who qualify due to disability or End-Stage Renal Disease. If you are under 65 and on Medicare, your options may be limited. Contact SHIP Indiana for guidance on available coverage.",
  },
  {
    title: "Free Counseling via SHIP Indiana",
    description:
      "Indiana's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-452-4800 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. Indiana market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Indiana" },
  { factor: "Discounts and Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Indiana for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan in Indiana for new enrollees. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). For the best overall value, Mutual of Omaha (A+ rated) consistently ranks highest in Indiana for financial strength and customer satisfaction. Cigna offers a lower premium at $100/mo in Indianapolis but carries a higher complaint ratio.",
  },
  {
    question: "Does Indiana have a birthday rule for Medigap?",
    answer:
      "No. Indiana does not have a birthday rule or anniversary rule. Unlike California (birthday rule), Missouri (anniversary rule), or Virginia (birthday rule), Indiana only guarantees your right to enroll in any Medigap plan without medical underwriting during your 6-month Open Enrollment Period when you first turn 65 and enroll in Medicare Part B. After that window, insurers can deny coverage based on health conditions.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Indiana?",
    answer:
      "Plan G premiums in Indiana range from approximately $93/mo to $145/mo for a 65-year-old female nonsmoker in Indianapolis. Premiums vary by carrier, ZIP code, age, gender, and tobacco use. Fort Wayne and South Bend rates may differ slightly from Indianapolis. The cheapest option is Physicians Select at $93/mo, though Cigna at $100/mo and AARP/UHC at $122/mo are more widely recognized carriers.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Indiana?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for emergency room visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $68 to $105/mo in Indiana vs. $93 to $145/mo for Plan G. If you rarely visit doctors and your providers do not charge excess fees, Plan N can save $300 to $500 per year.",
  },
  {
    question: "What is the Indiana household discount for Medicare Supplement?",
    answer:
      "Many carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount in Indiana include Mutual of Omaha, Cigna, Humana, and Wellabe. If you and a spouse or domestic partner are both enrolling, always ask about the household discount before choosing a carrier.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Indiana?",
    answer:
      "Yes, you can apply to switch Medigap plans at any time in Indiana, but outside of your Open Enrollment Period you will face medical underwriting. The new carrier will ask approximately 20 health questions and can deny coverage or charge higher premiums based on pre-existing conditions. Indiana has no birthday rule or other special switching protections, so your OEP is the best time to lock in the right plan.",
  },
  {
    question: "What is High-Deductible Plan G and is it a good option in Indiana?",
    answer:
      "High-Deductible Plan G (HDG) offers the same coverage as standard Plan G but requires you to pay a deductible of $2,870 (2026) before benefits kick in. In exchange, monthly premiums drop to roughly $40 to $55/mo. HDG is a strong option for healthy Indiana retirees who rarely use medical services and want to minimize monthly costs. Mutual of Omaha and Cigna are the leading HDG carriers in Indiana.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Indiana?",
    answer:
      "Indiana's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling. Call 1-800-452-4800 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];
