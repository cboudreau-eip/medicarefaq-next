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

export const STATE_NAME = "Idaho";
export const STATE_ABBR = "ID";
export const SAMPLE_CITY = "Boise";

export const STATE_STATS = {
  enrollees: "105,000+",
  lowestPlanG: "$201/mo",
  carriers: "29+",
  medicareTotal: "320K",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Globe Life",
    badge: "Best for Low Premiums",
    score: 4.6,
    amBest: "A",
    planGMonthly: "$201",
    planNMonthly: "N/A",
    pros: [
      "Lowest Plan G premium in Idaho at $201/mo",
      "Lowest Plan B in Idaho at $193/mo",
      "Lowest Plan C and Plan F in Idaho at $247/mo",
      "Solid financial strength ratings",
      "Available statewide including rural areas",
    ],
    cons: [
      "Attained-age pricing means premiums rise with age",
      "No cost-sharing Plans K or L",
      "No Plan M available in Idaho",
    ],
    highlight:
      "Globe Life offers the lowest Plan G premium in Idaho at $201/mo, saving enrollees $41/mo compared to the state average. They also lead on Plans B, C, and F. For Idaho seniors focused on minimizing monthly costs, Globe Life is the top choice.",
  },
  {
    rank: 2,
    name: "State Farm",
    badge: "Best Overall Value",
    score: 4.7,
    amBest: "A++",
    planGMonthly: "$207",
    planNMonthly: "$141",
    pros: [
      "A++ AM Best financial rating (highest possible)",
      "Lowest Plan N premium in Idaho at $141/mo",
      "Competitive Plan G at $207/mo",
      "Extensive local agent network across Idaho",
      "Strong brand trust and claims reputation",
    ],
    cons: [
      "Must purchase through a State Farm agent",
      "No cost-sharing Plans K or L",
    ],
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and offers the lowest Plan N in Idaho at $141/mo. With Plan G at $207/mo and face-to-face local agent service, State Farm is the best overall value for Idaho enrollees who want the highest financial strength.",
  },
  {
    rank: 3,
    name: "Mutual of Omaha",
    badge: "Best for Customer Service",
    score: 4.9,
    amBest: "A+",
    planGMonthly: "$215",
    planNMonthly: "$155",
    pros: [
      "A+ AM Best financial rating",
      "Exceptional U.S.-based customer service",
      "Household discount of 7% available",
      "Strong agent network across Idaho",
      "Consistent rate stability year over year",
    ],
    cons: [
      "Plan G higher than Globe Life and State Farm",
      "Attained-age rating means premiums rise with age",
    ],
    highlight:
      "Mutual of Omaha is the top-rated Medicare Supplement carrier for customer service in Idaho, combining A+ financial strength with outstanding support. Their 7% household discount and stable rate history make them the most trusted choice for Idaho retirees who want long-term reliability.",
  },
  {
    rank: 4,
    name: "Blue Cross of Idaho",
    badge: "Best Local Carrier",
    score: 4.5,
    amBest: "A-",
    planGMonthly: "$234",
    planNMonthly: "$165",
    pros: [
      "Idaho-based carrier with deep local market knowledge",
      "Lowest Plan A in Idaho at $153/mo",
      "Strong provider relationships statewide",
      "Community-rated pricing available",
      "Large network including rural Idaho",
    ],
    cons: [
      "Plan G higher than Globe Life, State Farm, and Mutual of Omaha",
      "Higher complaint ratio than top-tier national carriers",
    ],
    highlight:
      "Blue Cross of Idaho is the dominant local carrier in the state, offering the lowest Plan A at $153/mo and strong provider relationships statewide. As an Idaho-based carrier, they have deep knowledge of local healthcare markets in Boise, Coeur d'Alene, and rural communities.",
  },
  {
    rank: 5,
    name: "Transamerica",
    badge: "Best Plan Selection",
    score: 4.6,
    amBest: "A",
    planGMonthly: "$262",
    planNMonthly: "$175",
    pros: [
      "Sells all 10 standard Medigap plan types in Idaho",
      "Lowest Plan M in Idaho at $227/mo",
      "Issue-age pricing available for long-term savings",
      "A AM Best financial rating",
      "Strong national claims network",
    ],
    cons: [
      "Plan G higher than other top carriers in Idaho",
      "No high-deductible Plan G option",
    ],
    highlight:
      "Transamerica is the only carrier in Idaho that offers all 10 standard Medigap plan types, including the less common Plans K, L, and M. With issue-age pricing available, Transamerica is a strong choice for Idaho enrollees who want maximum plan flexibility and long-term rate stability.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Globe Life", planG: "$201", planN: "N/A", planF: "$247" },
  { carrier: "Moda Health", planG: "$207", planN: "N/A", planF: "N/A" },
  { carrier: "State Farm", planG: "$207", planN: "$141", planF: "N/A" },
  { carrier: "MedMutual Protect", planG: "$209", planN: "N/A", planF: "N/A" },
  { carrier: "AFLAC", planG: "$215", planN: "N/A", planF: "N/A" },
  { carrier: "Mutual of Omaha", planG: "$215", planN: "$155", planF: "$252" },
  { carrier: "Blue Cross of Idaho", planG: "$234", planN: "$165", planF: "$278" },
  { carrier: "Transamerica", planG: "$262", planN: "$175", planF: "$300" },
];

export const STATE_RULES = [
  {
    title: "Idaho Birthday Rule (Effective 2022)",
    description:
      "Idaho has a birthday rule effective since 2022. Current Medigap policyholders have a 63-day window starting on their birthday each year to switch to an equal or lesser Medigap plan with any carrier without medical underwriting. No health questions, no denial based on pre-existing conditions. This gives Idaho enrollees an annual opportunity to shop for lower premiums.",
  },
  {
    title: "Attained-Age Rating Is Standard",
    description:
      "Most Idaho Medigap policies use attained-age rating, meaning premiums increase as you get older. Issue-age policies, where premiums are locked at your enrollment age, are available from select carriers including Transamerica and may save money long-term for enrollees who plan to keep the same carrier for many years.",
  },
  {
    title: "Under-65 Coverage: Carriers May Decline",
    description:
      "Idaho does not require insurance companies to sell Medigap plans to Medicare beneficiaries under 65 who qualify due to disability. Some carriers voluntarily offer under-65 coverage, but they may charge higher premiums. Check with individual carriers for availability.",
  },
  {
    title: "Free Counseling via SHIBA",
    description:
      "Idaho's Senior Health Insurance Benefits Advisors (SHIBA) provides free, unbiased Medicare counseling. Call 1-800-247-4422 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. SHIBA has regional offices in Boise, Coeur d'Alene, and Pocatello.",
  },
  {
    title: "Household Discount Available",
    description:
      "Many Idaho carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount include Mutual of Omaha, Humana, and Cigna. Always ask about the household discount when getting quotes.",
  },
  {
    title: "Rural Coverage Consideration",
    description:
      "Idaho has significant rural areas where provider access can be limited. Medigap plans work with any Medicare-accepting provider nationwide, which is a major advantage for rural Idaho residents who may need to travel to Boise or other cities for specialty care. Medicare Advantage plans with network restrictions may be less suitable for rural Idaho.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. Idaho market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Idaho" },
  { factor: "Discounts and Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Idaho for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan in Idaho for new enrollees. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). Globe Life offers the lowest Plan G at $201/mo. For the best overall value combining low premiums with high financial strength, State Farm at $207/mo (A++ rated) is the top recommendation.",
  },
  {
    question: "Does Idaho have a birthday rule for Medigap?",
    answer:
      "Yes. Idaho has had a birthday rule since 2022. Current Medigap policyholders have a 63-day window starting on their birthday each year to switch to an equal or lesser Medigap plan with any carrier without medical underwriting. No health questions, no denial based on pre-existing conditions. Idaho seniors should shop their Medigap premiums every year during this window.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Idaho?",
    answer:
      "Plan G premiums in Idaho range from approximately $201/mo (Globe Life) to $262/mo (Transamerica) for a 65-year-old in Boise. The state average is $242/mo. Globe Life at $201/mo offers the lowest rate, followed by Moda Health and State Farm at $207/mo. Premiums vary by carrier, ZIP code, age, gender, and tobacco use.",
  },
  {
    question: "What is the Idaho birthday rule and how does it work?",
    answer:
      "Idaho's birthday rule gives Medigap policyholders a 63-day window starting on their birthday each year to switch to an equal or lesser plan with any carrier without medical underwriting. For example, if your birthday is June 15, you have from June 15 to August 16 to switch plans. You can switch to a plan with equal or lesser benefits, such as Plan G to Plan G or Plan G to Plan N, but not to a plan with more benefits.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Idaho?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for emergency room visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $141 to $175/mo in Idaho vs. $201 to $262/mo for Plan G. State Farm offers the lowest Plan N at $141/mo.",
  },
  {
    question: "Is Medigap a good option for rural Idaho residents?",
    answer:
      "Yes. Medigap is especially valuable for rural Idaho residents because it works with any Medicare-accepting provider nationwide. If you live in a rural area and need to travel to Boise or another city for specialty care, Medigap covers your costs without network restrictions. Medicare Advantage plans with network restrictions may be less suitable for rural Idaho.",
  },
  {
    question: "What is High-Deductible Plan G and is it available in Idaho?",
    answer:
      "High-Deductible Plan G (HDG) offers the same coverage as standard Plan G but requires you to pay a deductible of $2,950 (2026) before benefits kick in. In exchange, monthly premiums drop significantly. HDG is available in Idaho from select carriers. It is a strong option for healthy Idaho retirees who rarely use medical services and want to minimize monthly costs.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Idaho?",
    answer:
      "Idaho's Senior Health Insurance Benefits Advisors (SHIBA) provides free, unbiased Medicare counseling. Call 1-800-247-4422 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. SHIBA has regional offices in Boise, Coeur d'Alene, and Pocatello. There is no cost and counselors do not sell insurance.",
  },
];
