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

export const STATE_NAME = "Delaware";
export const STATE_ABBR = "DE";
export const SAMPLE_CITY = "Wilmington";

export const STATE_STATS = {
  enrollees: "78,000+",
  lowestPlanG: "$161/mo",
  carriers: "40+",
  medicareTotal: "220K",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Mutual of Omaha",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A+",
    planGMonthly: "$168",
    planNMonthly: "$127",
    pros: [
      "A+ AM Best financial rating",
      "Exceptional U.S.-based customer service",
      "Household discount of 7% available",
      "Strong agent network across Delaware",
      "Consistent rate stability year over year",
    ],
    cons: [
      "Not the cheapest Plan G in Wilmington",
      "Attained-age rating means premiums rise with age",
    ],
    highlight:
      "Mutual of Omaha is the top-rated Medicare Supplement carrier in Delaware, combining A+ financial strength with outstanding customer service. Their 7% household discount and stable rate history make them the most trusted choice for Delaware retirees who want long-term reliability.",
  },
  {
    rank: 2,
    name: "LifeShield National",
    badge: "Best for Low Premiums",
    score: 4.5,
    amBest: "A-",
    planGMonthly: "$161",
    planNMonthly: "$125",
    pros: [
      "Lowest Plan G premium in Delaware at $161/mo",
      "Lowest Plan N premium in Delaware at $125/mo",
      "Lowest Plan F premium in Delaware at $194/mo",
      "Competitive pricing across all plan types",
    ],
    cons: [
      "Attained-age rating means premiums rise with age",
      "Smaller national brand recognition",
      "Limited plan selection (A, F, G, N only)",
    ],
    highlight:
      "LifeShield National offers the lowest Plan G, Plan N, and Plan F premiums in Delaware. At $161/mo for Plan G, they save enrollees $85/mo compared to the Delaware average. Best for enrollees focused on minimizing monthly costs who are comfortable with a smaller national carrier.",
  },
  {
    rank: 3,
    name: "State Farm",
    badge: "Best for Agent Support",
    score: 4.7,
    amBest: "A++",
    planGMonthly: "$163",
    planNMonthly: "$126",
    pros: [
      "A++ AM Best financial rating (highest possible)",
      "Extensive local agent network across Delaware",
      "Near-lowest Plan G pricing at $163/mo",
      "Strong brand trust and claims reputation",
      "Household discount available",
    ],
    cons: [
      "Must purchase through a State Farm agent",
      "Fewer plan options than some national carriers",
    ],
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and offers Plan G at just $163/mo in Delaware, only $2 more than LifeShield National. For enrollees who want the highest financial strength rating with face-to-face local agent service, State Farm is the best value in Delaware.",
  },
  {
    rank: 4,
    name: "Transamerica",
    badge: "Best Plan Selection",
    score: 4.6,
    amBest: "A",
    planGMonthly: "$162",
    planNMonthly: "$132",
    pros: [
      "Sells all 10 standard Medigap plan types",
      "Lowest Plan K in Delaware at $77/mo",
      "Lowest Plan L in Delaware at $114/mo",
      "Issue-age pricing available for long-term savings",
      "A AM Best financial rating",
    ],
    cons: [
      "No high-deductible Plan G option",
      "Plan N slightly higher than LifeShield and State Farm",
    ],
    highlight:
      "Transamerica is the only carrier in Delaware that offers all 10 standard Medigap plan types, including the cost-sharing Plans K and L. With Plan G at $162/mo and issue-age pricing available, Transamerica is a strong choice for enrollees who want maximum plan flexibility.",
  },
  {
    rank: 5,
    name: "AARP / UnitedHealthcare",
    badge: "Best for Brand Recognition",
    score: 4.5,
    amBest: "A",
    planGMonthly: "$176",
    planNMonthly: "$131",
    pros: [
      "Largest Medicare Supplement enrollment in the country",
      "AARP brand recognition and member benefits",
      "Broad plan selection including Plans G, N, and HDG",
      "Nurse hotline and wellness programs included",
      "Strong presence in Wilmington and Dover",
    ],
    cons: [
      "AARP membership required ($16/year)",
      "Plan G premium higher than LifeShield, State Farm, and Transamerica",
    ],
    highlight:
      "AARP/UnitedHealthcare is one of the largest Medigap insurers in Delaware. Their 24/7 nurse hotline, broad plan selection, and AARP member perks make them a strong choice for enrollees who value brand recognition and added benefits alongside solid coverage.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "LifeShield National", planG: "$161", planN: "$125", planF: "$194" },
  { carrier: "Transamerica", planG: "$162", planN: "$132", planF: "$200" },
  { carrier: "State Farm", planG: "$163", planN: "$126", planF: "N/A" },
  { carrier: "Blue Cross Blue Shield", planG: "$163", planN: "$131", planF: "$201" },
  { carrier: "Nassau", planG: "$170", planN: "$127", planF: "$198" },
  { carrier: "USAA", planG: "$176", planN: "N/A", planF: "N/A" },
  { carrier: "AARP / UnitedHealthcare", planG: "$176", planN: "$131", planF: "N/A" },
  { carrier: "Mutual of Omaha", planG: "$168", planN: "$127", planF: "$205" },
];

export const STATE_RULES = [
  {
    title: "Delaware Birthday Rule (Effective January 1, 2026)",
    description:
      "Delaware adopted the Medigap birthday rule effective January 1, 2026. Current Medigap policyholders have a 60-day window (30 days before and 30 days after their birthday) to switch to an equal or lesser Medigap plan with any carrier without medical underwriting. No health questions, no denial based on pre-existing conditions.",
  },
  {
    title: "Attained-Age Rating Is Standard",
    description:
      "Most Delaware Medigap policies use attained-age rating, meaning premiums increase as you get older. Issue-age policies, where premiums are locked at your enrollment age, are available from select carriers including Transamerica and may save money long-term.",
  },
  {
    title: "Under-65 Coverage: Carriers May Decline",
    description:
      "Delaware does not require insurance companies to sell Medigap plans to Medicare beneficiaries under 65 who qualify due to disability. Some carriers voluntarily offer under-65 coverage, but they may charge higher premiums. Check with individual carriers for availability.",
  },
  {
    title: "Free Counseling via DMAB",
    description:
      "Delaware's Medicare Assistance Bureau (DMAB) provides free, unbiased Medicare counseling. Call 1-800-336-9500 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
  {
    title: "Household Discount Available",
    description:
      "Many Delaware carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount include Mutual of Omaha, Humana, and Cigna. Always ask about the household discount when getting quotes.",
  },
  {
    title: "Plan F Closed to New Enrollees Since 2020",
    description:
      "Plan F, which covered the Part B deductible, is no longer available to Medicare beneficiaries who became eligible on or after January 1, 2020. If you became eligible before that date, you may still be able to enroll in Plan F. For most new enrollees, Plan G is the most comprehensive plan available.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. Delaware market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Delaware" },
  { factor: "Discounts and Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Delaware for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan in Delaware for new enrollees. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). For the best overall value, Mutual of Omaha (A+ rated) consistently ranks highest in Delaware for financial strength and customer satisfaction. LifeShield National offers the lowest premium at $161/mo.",
  },
  {
    question: "Does Delaware have a birthday rule for Medigap?",
    answer:
      "Yes. Delaware adopted the Medigap birthday rule effective January 1, 2026. Current policyholders have a 60-day window (30 days before and 30 days after their birthday) each year to switch to an equal or lesser Medigap plan with any carrier without medical underwriting. No health questions, no denial based on pre-existing conditions.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Delaware?",
    answer:
      "Plan G premiums in Delaware range from approximately $161/mo to $176/mo for a 65-year-old in Wilmington. The state average is $246/mo. LifeShield National offers the lowest rate at $161/mo, followed by Transamerica at $162/mo and State Farm at $163/mo. Premiums vary by carrier, ZIP code, age, gender, and tobacco use.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Delaware?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for emergency room visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $125 to $132/mo in Delaware vs. $161 to $176/mo for Plan G. If you rarely visit doctors and your providers do not charge excess fees, Plan N can save $300 to $500 per year.",
  },
  {
    question: "When is the best time to enroll in a Medicare Supplement plan in Delaware?",
    answer:
      "The best time to enroll is during your 6-month Open Enrollment Period, which starts the month you turn 65 and are enrolled in Medicare Part B. During this window, carriers cannot deny your application or charge higher premiums based on health. After this window, you face medical underwriting unless you qualify for a Special Enrollment Period or use Delaware's birthday rule.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Delaware?",
    answer:
      "Yes. Delaware's birthday rule (effective January 1, 2026) lets you switch to an equal or lesser plan once a year during a 60-day window around your birthday without medical underwriting. Outside of that window, you can still apply to switch at any time but will face health questions and potential denial.",
  },
  {
    question: "What is High-Deductible Plan G and is it available in Delaware?",
    answer:
      "High-Deductible Plan G (HDG) offers the same coverage as standard Plan G but requires you to pay a deductible of $2,950 (2026) before benefits kick in. In exchange, monthly premiums drop significantly. HDG is a strong option for healthy Delaware retirees who rarely use medical services and want to minimize monthly costs. Check with individual carriers for HDG availability in Delaware.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Delaware?",
    answer:
      "Delaware's Medicare Assistance Bureau (DMAB) provides free, unbiased Medicare counseling. Call 1-800-336-9500 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];
