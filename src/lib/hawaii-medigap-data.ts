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

export const STATE_NAME = "Hawaii";
export const STATE_ABBR = "HI";
export const SAMPLE_CITY = "Honolulu";

export const STATE_STATS = {
  enrollees: "95,000+",
  lowestPlanG: "$134/mo",
  carriers: "20+",
  medicareTotal: "285K",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "USAA",
    badge: "Best for Military Families",
    score: 4.8,
    amBest: "A++",
    planGMonthly: "$134",
    planNMonthly: "N/A",
    pros: [
      "A++ AM Best financial rating (highest possible)",
      "Lowest Plan G premium in Hawaii at $134/mo",
      "Best Plan A rates in Hawaii at $110/mo",
      "Exceptional customer satisfaction ratings",
      "Military and veteran community focus",
    ],
    cons: [
      "Available only to military members, veterans, and their families",
      "Limited plan selection (A, F, G, N only)",
      "No Plan N option in Hawaii",
    ],
    highlight:
      "USAA offers the lowest Plan G premium in Hawaii at $134/mo and holds the highest possible AM Best rating (A++). For military veterans and their families in Hawaii, USAA is the clear top choice combining the lowest rate with the highest financial strength.",
  },
  {
    rank: 2,
    name: "Transamerica",
    badge: "Best Plan Selection",
    score: 4.6,
    amBest: "A",
    planGMonthly: "$151",
    planNMonthly: "$124",
    pros: [
      "Sells all 10 standard Medigap plan types in Hawaii",
      "Lowest Plan K in Hawaii at $68/mo",
      "Lowest Plan L in Hawaii at $100/mo",
      "Lowest Plan M in Hawaii at $124/mo",
      "A AM Best financial rating",
    ],
    cons: [
      "Attained-age pricing means premiums rise with age",
      "Plan G higher than USAA and State Farm",
    ],
    highlight:
      "Transamerica is the only carrier in Hawaii that offers all 10 standard Medigap plan types, including the cost-sharing Plans K, L, and M. With Plan G at $151/mo and the full plan lineup, Transamerica is the best choice for Hawaii enrollees who want maximum flexibility.",
  },
  {
    rank: 3,
    name: "State Farm",
    badge: "Best Overall Value",
    score: 4.7,
    amBest: "A++",
    planGMonthly: "$176",
    planNMonthly: "$105",
    pros: [
      "A++ AM Best financial rating (highest possible)",
      "Lowest Plan N premium in Hawaii at $105/mo",
      "Lowest Plan C in Hawaii at $184/mo",
      "Lowest Plan D in Hawaii at $136/mo",
      "Extensive local agent network across Hawaii",
    ],
    cons: [
      "Plan G higher than USAA and Transamerica",
      "Must purchase through a State Farm agent",
    ],
    highlight:
      "State Farm holds the highest possible AM Best rating (A++) and offers the lowest Plan N in Hawaii at just $105/mo. For enrollees who want the best value on Plan N or prefer face-to-face local agent service with the highest financial strength, State Farm is an excellent choice.",
  },
  {
    rank: 4,
    name: "Globe Life",
    badge: "Best for Comprehensive Plans",
    score: 4.5,
    amBest: "A",
    planGMonthly: "$172",
    planNMonthly: "N/A",
    pros: [
      "Offers Plans A, B, C, F, G, and N",
      "Competitive Plan B pricing in Hawaii",
      "Solid financial strength ratings",
      "Available statewide including neighbor islands",
    ],
    cons: [
      "No cost-sharing Plans K or L",
      "Attained-age pricing means premiums rise with age",
      "No Plan N in Hawaii",
    ],
    highlight:
      "Globe Life offers six plan types in Hawaii including Plans A, B, C, F, G, and N. With competitive pricing and solid financial strength, Globe Life is a reliable option for Hawaii enrollees who want a broad selection of coverage levels.",
  },
  {
    rank: 5,
    name: "Mutual of Omaha",
    badge: "Best for Customer Service",
    score: 4.8,
    amBest: "A+",
    planGMonthly: "$199",
    planNMonthly: "$141",
    pros: [
      "A+ AM Best financial rating",
      "Exceptional U.S.-based customer service",
      "Household discount of 7% available",
      "Strong agent network across Hawaii",
      "Consistent rate stability year over year",
    ],
    cons: [
      "Plan G higher than USAA, Transamerica, and State Farm",
      "Attained-age rating means premiums rise with age",
    ],
    highlight:
      "Mutual of Omaha is the top-rated Medicare Supplement carrier for customer service in Hawaii, combining A+ financial strength with outstanding support. Their 7% household discount and stable rate history make them a trusted choice for Hawaii retirees who prioritize long-term reliability over the lowest initial premium.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "USAA", planG: "$134", planN: "N/A", planF: "N/A" },
  { carrier: "Transamerica", planG: "$151", planN: "$124", planF: "N/A" },
  { carrier: "Globe Life", planG: "$172", planN: "N/A", planF: "$186" },
  { carrier: "State Farm", planG: "$176", planN: "$105", planF: "$186" },
  { carrier: "AARP / UnitedHealthcare", planG: "$155", planN: "$112", planF: "N/A" },
  { carrier: "Humana", planG: "$259", planN: "$178", planF: "N/A" },
  { carrier: "Mutual of Omaha", planG: "$199", planN: "$141", planF: "$228" },
  { carrier: "Cigna", planG: "$185", planN: "$130", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule in Hawaii",
    description:
      "Hawaii does not have a birthday rule. Outside of your initial 6-month Open Enrollment Period, switching Medigap plans requires medical underwriting. Carriers can deny your application or charge higher premiums based on health history. Your initial enrollment window is the most important time to choose the right plan.",
  },
  {
    title: "Prepaid Health Plans Are Common",
    description:
      "Hawaii has a strong tradition of prepaid health plans, including Kaiser Permanente Hawaii, which operates as a Medicare Advantage plan rather than a Medigap carrier. Many Hawaii seniors choose Medicare Advantage over Medigap. If you prefer Original Medicare with Medigap, you have access to 20+ carriers statewide.",
  },
  {
    title: "Neighbor Island Availability",
    description:
      "Not all Medigap carriers serve the neighbor islands (Maui, Kauai, Hawaii Island, Molokai, Lanai) at the same rates as Oahu. Some carriers may charge different premiums or have limited agent availability on neighbor islands. Always verify availability and rates for your specific island.",
  },
  {
    title: "Attained-Age Rating Is Standard",
    description:
      "Most Hawaii Medigap policies use attained-age rating, meaning premiums increase as you get older. Issue-age policies, where premiums are locked at your enrollment age, are available from select carriers and may save money long-term for enrollees who plan to keep the same carrier for many years.",
  },
  {
    title: "Free Counseling via Hawaii SHIP",
    description:
      "Hawaii's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-888-875-9229 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
  {
    title: "Under-65 Coverage: Limited Availability",
    description:
      "Hawaii does not require insurance companies to sell Medigap plans to Medicare beneficiaries under 65 who qualify due to disability. Some carriers voluntarily offer under-65 coverage, but availability is limited. Check with individual carriers for options if you are under 65.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. Hawaii market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Hawaii" },
  { factor: "Discounts and Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Hawaii for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan in Hawaii for new enrollees. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). USAA offers the lowest Plan G at $134/mo but is only available to military families. For the general public, AARP/UHC at $155/mo or Transamerica at $151/mo are strong options.",
  },
  {
    question: "Does Hawaii have a birthday rule for Medigap?",
    answer:
      "No. Hawaii does not have a birthday rule. Outside of your initial 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, switching Medigap plans requires medical underwriting. Carriers can deny your application or charge higher premiums based on health history. Your initial enrollment window is the most important time to choose the right plan.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Hawaii?",
    answer:
      "Plan G premiums in Hawaii range from approximately $134/mo (USAA, military only) to $259/mo (Humana) for a 65-year-old in Honolulu. The state average is $199/mo. AARP/UHC at $155/mo and Transamerica at $151/mo offer the best value for the general public. Premiums vary by carrier, island, age, gender, and tobacco use.",
  },
  {
    question: "Is Medicare Advantage or Medigap better in Hawaii?",
    answer:
      "Hawaii has a strong Medicare Advantage market, particularly Kaiser Permanente Hawaii, which many seniors choose for its integrated care model. Medicare Advantage typically has lower premiums but network restrictions and copays. Medigap (Plan G) offers more predictable costs and access to any Medicare-accepting provider nationwide, which matters for Hawaii residents who travel to the mainland for specialty care.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Hawaii?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for emergency room visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $105 to $141/mo in Hawaii vs. $134 to $259/mo for Plan G. State Farm offers the lowest Plan N at $105/mo.",
  },
  {
    question: "Are Medigap plans available on all Hawaiian islands?",
    answer:
      "Most major carriers serve all Hawaiian islands, but availability and rates may differ between Oahu and the neighbor islands (Maui, Kauai, Hawaii Island, Molokai, Lanai). Some carriers have limited agent availability on neighbor islands. Always verify availability and rates for your specific island when comparing plans.",
  },
  {
    question: "When is the best time to enroll in a Medicare Supplement plan in Hawaii?",
    answer:
      "The best time to enroll is during your 6-month Open Enrollment Period, which starts the month you turn 65 and are enrolled in Medicare Part B. During this window, carriers cannot deny your application or charge higher premiums based on health. Because Hawaii has no birthday rule, this initial window is especially important.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Hawaii?",
    answer:
      "Hawaii's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-888-875-9229 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];
