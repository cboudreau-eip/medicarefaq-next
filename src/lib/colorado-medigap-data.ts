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

export const STATE_NAME = "Colorado";
export const STATE_ABBR = "CO";
export const SAMPLE_CITY = "Denver";

export const STATE_STATS = {
  enrollees: "235,000+",
  lowestPlanG: "$113/mo",
  carriers: "25+",
  medicareTotal: "1.1M",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Mutual of Omaha",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A+",
    planGMonthly: "$148",
    planNMonthly: "$107",
    pros: [
      "A+ AM Best financial rating",
      "Exceptional U.S.-based customer service",
      "Household discount of 7% available",
      "Strong agent network across Colorado",
      "Consistent rate stability year over year",
    ],
    cons: [
      "Not the cheapest Plan G in Denver",
      "Attained-age rating means premiums rise with age",
    ],
    highlight:
      "Mutual of Omaha is the top-rated Medicare Supplement carrier in Colorado, combining A+ financial strength with outstanding U.S.-based customer service. Their 7% household discount and consistent rate history make them the go-to choice for Colorado retirees who want reliability over the lowest possible premium.",
  },
  {
    rank: 2,
    name: "AARP / UnitedHealthcare",
    badge: "Best Plan Availability",
    score: 4.7,
    amBest: "A",
    planGMonthly: "$159",
    planNMonthly: "$115",
    pros: [
      "Largest Medicare Supplement enrollment in the country",
      "AARP brand recognition and member benefits",
      "Broad plan selection including Plans G, N, and HDG",
      "24/7 nurse hotline and wellness programs included",
      "Strong presence in Denver, Boulder, and Colorado Springs",
    ],
    cons: [
      "Higher premiums than most competitors",
      "AARP membership required ($16/year)",
    ],
    highlight:
      "AARP/UnitedHealthcare is the largest Medicare Supplement insurer in Colorado by enrollment. Their broad plan selection and added member benefits like a 24/7 nurse hotline make them a strong choice, though premiums run higher than budget options. Best for enrollees who value brand recognition and plan variety.",
  },
  {
    rank: 3,
    name: "Cigna / HealthSpring",
    badge: "Best for Low Premiums",
    score: 4.3,
    amBest: "A",
    planGMonthly: "$120",
    planNMonthly: "$87",
    pros: [
      "Competitive Plan G premium in Denver",
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
      "Cigna offers one of the most competitive Plan G premiums in the Denver market, making them attractive for budget-conscious enrollees. Their complaint ratio runs higher than Mutual of Omaha or AARP/UHC. Best for healthy enrollees who want to minimize monthly costs and are comfortable shopping again in a few years.",
  },
  {
    rank: 4,
    name: "Humana",
    badge: "Best for Active Retirees",
    score: 4.5,
    amBest: "A-",
    planGMonthly: "$133",
    planNMonthly: "$96",
    pros: [
      "SilverSneakers fitness benefit included",
      "Strong Colorado market presence",
      "Competitive Plan N pricing",
      "Household discount available",
      "A- AM Best financial rating",
    ],
    cons: [
      "Plan G premium higher than Cigna",
      "Some rate volatility in recent years",
    ],
    highlight:
      "Humana stands out in Colorado for including the SilverSneakers fitness benefit, which gives members free access to thousands of gyms and fitness centers statewide. For active Colorado retirees in Denver, Boulder, Fort Collins, or mountain communities, the fitness perk adds real value on top of solid Medigap coverage.",
  },
  {
    rank: 5,
    name: "Wellabe",
    badge: "Best Budget Option",
    score: 4.2,
    amBest: "A-",
    planGMonthly: "$126",
    planNMonthly: "$91",
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
      "Wellabe (formerly Medico) offers a compelling middle ground in Colorado: cheaper than Mutual of Omaha and AARP/UHC, with a much better complaint record than Cigna. For Colorado enrollees who want to save money without taking on the service risk of the cheapest option, Wellabe is worth a quote.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Cigna / HealthSpring", planG: "$120", planN: "$87", planF: "$144" },
  { carrier: "Wellabe", planG: "$126", planN: "$91", planF: "N/A" },
  { carrier: "Humana", planG: "$133", planN: "$96", planF: "$158" },
  { carrier: "Mutual of Omaha", planG: "$148", planN: "$107", planF: "$172" },
  { carrier: "AARP / UnitedHealthcare", planG: "$159", planN: "$115", planF: "$182" },
  { carrier: "NHIC", planG: "$121", planN: "$88", planF: "$146" },
  { carrier: "Bankers Fidelity", planG: "$122", planN: "$89", planF: "$148" },
  { carrier: "State Farm", planG: "$151", planN: "$109", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule or Anniversary Rule",
    description:
      "Colorado does not have a birthday rule or anniversary rule. Unlike California (birthday rule) or Missouri (anniversary rule), Colorado only guarantees your right to enroll in any Medigap plan without medical underwriting during your 6-month Open Enrollment Period when you first turn 65 and enroll in Medicare Part B. After that window closes, insurers can deny coverage or charge higher premiums based on health conditions.",
  },
  {
    title: "Attained-Age Rating Standard",
    description:
      "Most Colorado Medigap policies use attained-age rating, meaning premiums increase as you get older. Issue-age policies, where premiums are locked at your age when you enrolled, are available from select carriers and may save money long-term for enrollees who plan to keep the same carrier for many years. Ask your agent specifically about issue-age options when comparing quotes.",
  },
  {
    title: "Household Discount Available",
    description:
      "Many Colorado carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount include Mutual of Omaha, Cigna, Humana, and Wellabe. Always ask about the household discount when getting quotes, especially in Denver and Boulder where two-income retiree households are common.",
  },
  {
    title: "Colorado Division of Insurance Regulates Medigap",
    description:
      "The Colorado Division of Insurance (DOI), part of the Department of Regulatory Agencies (DORA), oversees all Medigap policies sold in the state. Carriers must file rate changes and receive approval before implementing increases. You can verify carrier licenses and file complaints at doi.colorado.gov.",
  },
  {
    title: "Free Counseling via Colorado SHIP",
    description:
      "Colorado's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call (888) 696-7213 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance. The program is administered by DORA.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. Colorado market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Colorado" },
  { factor: "Discounts and Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Colorado for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan in Colorado for new enrollees. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). For the best overall value, Mutual of Omaha (A+ rated) consistently ranks highest in Colorado for financial strength and customer satisfaction. Cigna offers a lower premium but carries a higher complaint ratio.",
  },
  {
    question: "Does Colorado have a birthday rule for Medigap?",
    answer:
      "No. Colorado does not have a birthday rule or anniversary rule. Unlike California (birthday rule) or Missouri (anniversary rule), Colorado only guarantees your right to enroll in any Medigap plan without medical underwriting during your 6-month Open Enrollment Period when you first turn 65 and enroll in Medicare Part B. After that window, insurers can deny coverage based on health conditions.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Colorado?",
    answer:
      "Plan G premiums in Colorado range from approximately $113/mo to $159/mo for a 65-year-old female nonsmoker in Denver. Premiums vary by carrier, ZIP code, age, gender, and tobacco use. Colorado Springs and Boulder rates may differ slightly from Denver. The most competitive nationally-recognized option is Cigna at around $120/mo, though Wellabe at $126/mo offers better value with a lower complaint ratio.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Colorado?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for emergency room visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $87 to $115/mo in Colorado vs. $120 to $159/mo for Plan G. If you rarely visit doctors and your providers do not charge excess fees, Plan N can save $300 to $500 per year.",
  },
  {
    question: "What is the Colorado household discount for Medicare Supplement?",
    answer:
      "Many carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount in Colorado include Mutual of Omaha, Cigna, Humana, and Wellabe. If you and a spouse or domestic partner are both enrolling, always ask about the household discount before choosing a carrier.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Colorado?",
    answer:
      "Yes, you can apply to switch Medigap plans at any time in Colorado, but outside of your Open Enrollment Period you will face medical underwriting. The new carrier will ask approximately 20 health questions and can deny coverage or charge higher premiums based on pre-existing conditions. Colorado has no birthday rule or other special switching protections, so your OEP is the best time to lock in the right plan.",
  },
  {
    question: "What is High-Deductible Plan G and is it a good option in Colorado?",
    answer:
      "High-Deductible Plan G (HDG) offers the same coverage as standard Plan G but requires you to pay a deductible of $2,870 (2026) before benefits kick in. In exchange, monthly premiums drop to roughly $40 to $55/mo. HDG is a strong option for healthy Colorado retirees who rarely use medical services and want to minimize monthly costs. Mutual of Omaha and Cigna are the leading HDG carriers in Colorado.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Colorado?",
    answer:
      "Colorado's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling through the Colorado Division of Insurance. Call (888) 696-7213 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];
