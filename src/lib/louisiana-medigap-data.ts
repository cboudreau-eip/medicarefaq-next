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

export const STATE_NAME = "Louisiana";
export const STATE_ABBR = "LA";
export const SAMPLE_CITY = "New Orleans";

export const STATE_STATS = {
  enrollees: "153,000+",
  lowestPlanG: "$111/mo",
  carriers: "23+",
  medicareTotal: "940K",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Mutual of Omaha",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A+",
    planGMonthly: "$142",
    planNMonthly: "$103",
    pros: [
      "A+ AM Best financial rating",
      "Exceptional U.S.-based customer service",
      "Household discount of 7% available",
      "Strong agent network across Louisiana",
      "Consistent rate stability year over year",
    ],
    cons: [
      "Not the cheapest Plan G in New Orleans",
      "Attained-age rating means premiums rise with age",
    ],
    highlight:
      "Mutual of Omaha is the top-rated Medicare Supplement carrier in Louisiana, combining A+ financial strength with outstanding customer service. Their 7% household discount and stable rate history make them the most trusted choice for Louisiana retirees who want long-term reliability.",
  },
  {
    rank: 2,
    name: "AARP / UnitedHealthcare",
    badge: "Best Plan Availability",
    score: 4.7,
    amBest: "A",
    planGMonthly: "$152",
    planNMonthly: "$110",
    pros: [
      "Largest Medicare Supplement enrollment in the country",
      "AARP brand recognition and member benefits",
      "Broad plan selection including Plans G, N, and HDG",
      "Nurse hotline and wellness programs included",
      "Strong presence in New Orleans, Baton Rouge, and Shreveport",
    ],
    cons: [
      "AARP membership required ($16/year)",
      "Premiums higher than budget carriers",
    ],
    highlight:
      "AARP/UnitedHealthcare is one of the largest Medigap insurers in Louisiana. Their 24/7 nurse hotline, broad plan selection, and AARP member perks make them a strong choice for enrollees who value brand recognition and added benefits alongside solid coverage.",
  },
  {
    rank: 3,
    name: "State Farm",
    badge: "Best for Agent Support",
    score: 4.6,
    amBest: "A++",
    planGMonthly: "$126",
    planNMonthly: "$91",
    pros: [
      "A++ AM Best financial rating (highest possible)",
      "Extensive local agent network across Louisiana",
      "Competitive Plan G pricing",
      "Strong brand trust and claims reputation",
      "Household discount available",
    ],
    cons: [
      "Must purchase through a State Farm agent",
      "Fewer plan options than some national carriers",
    ],
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and has a strong local agent presence throughout Louisiana. For enrollees who prefer face-to-face service and want the security of the highest financial strength rating available, State Farm is an excellent choice.",
  },
  {
    rank: 4,
    name: "Louisiana Health Service",
    badge: "Best for Low Premiums",
    score: 4.3,
    amBest: "A-",
    planGMonthly: "$111",
    planNMonthly: "$80",
    pros: [
      "Lowest Plan G premium in New Orleans at $111/mo",
      "Louisiana-based carrier with local market knowledge",
      "Competitive Plan N pricing",
    ],
    cons: [
      "Smaller national brand recognition",
      "Higher complaint ratio than top-tier carriers",
      "Limited plan selection",
    ],
    highlight:
      "Louisiana Health Service offers the lowest Plan G premium in the New Orleans market at $111/mo. As a Louisiana-based carrier, they have strong local market knowledge. Their complaint ratio runs higher than Mutual of Omaha or State Farm, so they are best for healthy enrollees focused on minimizing monthly costs.",
  },
  {
    rank: 5,
    name: "Humana",
    badge: "Best for Active Retirees",
    score: 4.4,
    amBest: "A-",
    planGMonthly: "$136",
    planNMonthly: "$98",
    pros: [
      "SilverSneakers fitness benefit included",
      "Competitive Plan G pricing in Louisiana",
      "Household discount available",
      "A- AM Best financial rating",
      "Strong Louisiana market presence",
    ],
    cons: [
      "Plan G premium higher than Louisiana Health Service and State Farm",
      "Some rate volatility in recent years",
    ],
    highlight:
      "Humana stands out in Louisiana for including the SilverSneakers fitness benefit, giving members free access to thousands of gyms and fitness centers statewide. For active retirees in New Orleans, Baton Rouge, or Shreveport, the fitness perk adds real value on top of competitive Medigap coverage.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Louisiana Health Service", planG: "$111", planN: "$80", planF: "$132" },
  { carrier: "State Farm", planG: "$126", planN: "$91", planF: "N/A" },
  { carrier: "Humana", planG: "$136", planN: "$98", planF: "$161" },
  { carrier: "Mutual of Omaha", planG: "$142", planN: "$103", planF: "$167" },
  { carrier: "AARP / UnitedHealthcare", planG: "$152", planN: "$110", planF: "$176" },
  { carrier: "Cigna", planG: "$129", planN: "$93", planF: "$153" },
  { carrier: "Bankers Fidelity", planG: "$133", planN: "$96", planF: "$157" },
  { carrier: "Wellabe", planG: "$128", planN: "$92", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "Louisiana Birthday Rule",
    description:
      "Louisiana has a birthday rule that allows Medigap policyholders to switch plans annually around their birthday without medical underwriting. During the window around your birthday each year, you can switch to an equal or lesser Medigap plan without answering health questions. This gives Louisiana enrollees an annual opportunity to shop for lower premiums.",
  },
  {
    title: "Under-65 Coverage Available",
    description:
      "Louisiana insurance companies must make all Medigap plans available to Medicare beneficiaries under 65, including those with disabilities or end-stage renal disease. Carriers may charge higher premiums for under-65 enrollees, but they cannot deny coverage outright.",
  },
  {
    title: "Attained-Age Rating Standard",
    description:
      "Most Louisiana Medigap policies use attained-age rating, meaning premiums increase as you get older. Issue-age policies, where premiums are locked at your enrollment age, are available from select carriers and may save money long-term for enrollees who plan to keep the same carrier for many years.",
  },
  {
    title: "Household Discount Available",
    description:
      "Many Louisiana carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount include Mutual of Omaha, Humana, Cigna, and Wellabe. Always ask about the household discount when getting quotes.",
  },
  {
    title: "Free Counseling via Louisiana SHIP",
    description:
      "Louisiana's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-259-5300 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. Louisiana market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Louisiana" },
  { factor: "Discounts and Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Louisiana for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan in Louisiana for new enrollees. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). For the best overall value, Mutual of Omaha (A+ rated) consistently ranks highest in Louisiana for financial strength and customer satisfaction. Louisiana Health Service offers the lowest premium at $111/mo in New Orleans.",
  },
  {
    question: "Does Louisiana have a birthday rule for Medigap?",
    answer:
      "Yes. Louisiana has a birthday rule that allows Medigap policyholders to switch to an equal or lesser plan around their birthday each year without medical underwriting. This gives Louisiana enrollees an annual opportunity to shop for lower premiums without health questions. The exact window details should be confirmed with the Louisiana Department of Insurance.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Louisiana?",
    answer:
      "Plan G premiums in Louisiana range from approximately $111/mo to $152/mo for a 65-year-old female nonsmoker in New Orleans. Premiums vary by carrier, ZIP code, age, gender, and tobacco use. The cheapest option is Louisiana Health Service at $111/mo, though State Farm at $126/mo offers better value with a higher financial strength rating.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Louisiana?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for emergency room visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $80 to $110/mo in Louisiana vs. $111 to $152/mo for Plan G. If you rarely visit doctors and your providers do not charge excess fees, Plan N can save $300 to $500 per year.",
  },
  {
    question: "What is the Louisiana household discount for Medicare Supplement?",
    answer:
      "Many carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount in Louisiana include Mutual of Omaha, Humana, Cigna, and Wellabe. If you and a spouse or domestic partner are both enrolling, always ask about the household discount before choosing a carrier.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Louisiana?",
    answer:
      "Yes. Louisiana's birthday rule lets you switch to an equal or lesser plan once a year around your birthday without medical underwriting. Outside of that window, you can still apply to switch at any time but will face health questions and potential denial. Your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B is still the best time to lock in coverage.",
  },
  {
    question: "What is High-Deductible Plan G and is it a good option in Louisiana?",
    answer:
      "High-Deductible Plan G (HDG) offers the same coverage as standard Plan G but requires you to pay a deductible of $2,870 (2026) before benefits kick in. In exchange, monthly premiums drop to roughly $40 to $55/mo. HDG is a strong option for healthy Louisiana retirees who rarely use medical services and want to minimize monthly costs. Mutual of Omaha and Cigna are the leading HDG carriers in Louisiana.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Louisiana?",
    answer:
      "Louisiana's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling. Call 1-800-259-5300 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];
