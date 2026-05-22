// Iowa Medicare Supplement Data
// Sources: MoneyGeek, Iowa SHIIP, Iowa Insurance Division, CMS
// Updated: May 2026

export interface Carrier {
  rank: number;
  name: string;
  badge: string;
  score: number;
  amBest: string;
  planGMonthly: string;
  planNMonthly: string;
  highlight: string;
  pros: string[];
  cons: string[];
}

export const STATE_STATS = {
  enrollees: "130,000+",
  carriers: "30+",
  lowestPlanG: "$128/mo",
  avgPlanG: "$210/mo",
  lowestPlanN: "$92/mo",
  avgPlanN: "$160/mo",
  shipPhone: "(800) 351-4664",
  shipName: "SHIIP",
  birthdayRule: false,
  birthdayRuleNote: "Iowa had a birthday rule bill (SF 71) introduced in January 2025 for a 30-day annual window starting January 1, 2026. As of early 2026, the bill had not yet been signed into law. Check with Iowa SHIIP for the latest status.",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "MedMutual Protect",
    badge: "Best Plan G and Plan N Rates",
    score: 4.5,
    amBest: "A+",
    planGMonthly: "$128/mo",
    planNMonthly: "$92/mo",
    highlight:
      "MedMutual Protect offers the lowest Plan G ($128/mo) and Plan N ($92/mo) rates in Iowa for 65-year-olds, saving seniors up to $82/mo compared to the state average. The A+ AM Best rating and strong Midwest presence make it the top overall pick for Iowa.",
    pros: [
      "Lowest Plan G in Iowa at $128/mo",
      "Lowest Plan N in Iowa at $92/mo",
      "Lowest Plan F in Iowa at $146/mo",
      "A+ AM Best financial strength",
      "Strong Midwest carrier with Iowa roots",
    ],
    cons: [
      "Attained-age pricing means premiums increase with age",
      "Does not offer cost-sharing Plans K or L",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 2,
    name: "State Farm",
    badge: "Best Financial Strength",
    score: 4.6,
    amBest: "A++",
    planGMonthly: "$173/mo",
    planNMonthly: "$N/A",
    highlight:
      "State Farm earns the highest AM Best rating (A++) of any carrier in Iowa and offers the lowest Plan A at $124/mo. With a large local agent network across Des Moines, Cedar Rapids, and rural Iowa, State Farm is the best choice for seniors who want face-to-face service and top-tier financial strength.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Lowest Plan A in Iowa at $124/mo",
      "Large local agent network statewide",
      "Six plan types including Plans C and D",
      "Strong long-term rate stability",
    ],
    cons: [
      "Plan G at $173/mo is above MedMutual Protect",
      "Attained-age pricing",
      "Does not offer Plans B, K, L, or M",
    ],
  },
  {
    rank: 3,
    name: "Transamerica",
    badge: "Best Plan Variety and Issue-Age Pricing",
    score: 4.6,
    amBest: "A",
    planGMonthly: "$214/mo",
    planNMonthly: "$N/A",
    highlight:
      "Transamerica is the only carrier in Iowa offering all 10 standard Medigap plan types. It uses issue-age pricing, meaning your premium is locked at your enrollment age and does not increase as you get older. Plan K at $74/mo is the lowest in Iowa, and Plan L at $110/mo is also the cheapest available.",
    pros: [
      "Only Iowa carrier with all 10 plan types",
      "Issue-age pricing locks your premium at enrollment age",
      "Lowest Plan K in Iowa at $74/mo",
      "Lowest Plan L in Iowa at $110/mo",
      "Lowest Plan D in Iowa at $165/mo",
    ],
    cons: [
      "Plan G at $214/mo is above average",
      "No high-deductible Plan G option",
      "Issue-age pricing still increases slightly over time",
    ],
  },
  {
    rank: 4,
    name: "Wellcare",
    badge: "Best Value Plan G",
    score: 4.2,
    amBest: "A-",
    planGMonthly: "$144/mo",
    planNMonthly: "$N/A",
    highlight:
      "Wellcare offers Plan G at $144/mo in Iowa, the second-lowest rate in the state after MedMutual Protect. It is a solid mid-tier option for seniors who want low Plan G premiums with a nationally recognized carrier.",
    pros: [
      "Plan G at $144/mo, second-lowest in Iowa",
      "Nationally recognized carrier",
      "Competitive Plan F rates",
    ],
    cons: [
      "Attained-age pricing",
      "Limited plan variety (A, F, G, N)",
      "No cost-sharing plans (K, L)",
    ],
  },
  {
    rank: 5,
    name: "Philadelphia American",
    badge: "Best Plan C and Plan M",
    score: 4.3,
    amBest: "A-",
    planGMonthly: "$186/mo",
    planNMonthly: "$N/A",
    highlight:
      "Philadelphia American offers the lowest Plan C ($186/mo) and Plan M ($91/mo) in Iowa. Plan M covers 50% of the Part A deductible and is a strong mid-tier option for healthy seniors who want lower premiums with moderate coverage.",
    pros: [
      "Lowest Plan C in Iowa at $186/mo",
      "Lowest Plan M in Iowa at $91/mo",
      "Six plan types available",
    ],
    cons: [
      "Attained-age pricing",
      "No cost-sharing plans (K, L)",
      "No high-deductible Plan G",
    ],
  },
];

export const PREMIUM_TABLE = [
  { carrier: "MedMutual Protect", planG: "$128", planN: "$92", planF: "$146" },
  { carrier: "Wellcare", planG: "$144", planN: "N/A", planF: "$185" },
  { carrier: "LifeShield National", planG: "$150", planN: "N/A", planF: "N/A" },
  { carrier: "Government Personnel Mutual", planG: "$155", planN: "N/A", planF: "N/A" },
  { carrier: "Nassau", planG: "$159", planN: "N/A", planF: "N/A" },
  { carrier: "State Farm", planG: "$173", planN: "N/A", planF: "N/A" },
  { carrier: "Philadelphia American", planG: "$186", planN: "N/A", planF: "N/A" },
  { carrier: "Transamerica", planG: "$214", planN: "N/A", planF: "N/A" },
  { carrier: "AARP/UnitedHealthcare", planG: "$224", planN: "N/A", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule (Pending Legislation)",
    description:
      "Iowa does not currently have a birthday rule. A bill (SF 71) was introduced in January 2025 to create a 30-day annual switching window starting January 1, 2026. As of early 2026, the bill had not been signed into law. Contact Iowa SHIIP at (800) 351-4664 for the latest status.",
  },
  {
    title: "Open Enrollment Period Is Your Best Window",
    description:
      "Your six-month Open Enrollment Period starts when you turn 65 and enroll in Medicare Part B. During this window, carriers must accept you regardless of health conditions and cannot charge higher premiums for pre-existing conditions.",
  },
  {
    title: "Attained-Age vs. Issue-Age Pricing",
    description:
      "Most Iowa carriers use attained-age pricing, meaning premiums increase as you get older. Transamerica uses issue-age pricing, which locks your rate at your enrollment age. Community-rated pricing is not available in Iowa.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Iowa insurers are not required to offer Medigap to Medicare beneficiaries under age 65 who qualify due to disability. Some carriers do offer coverage voluntarily, but premiums are typically much higher.",
  },
  {
    title: "Plan F Closed to New Enrollees",
    description:
      "Plan F is only available to Medicare beneficiaries who became eligible before January 1, 2020. New enrollees should consider Plan G, which provides the same coverage except for the Part B deductible ($283 in 2026).",
  },
  {
    title: "Free Counseling Through Iowa SHIIP",
    description:
      "Iowa's Senior Health Insurance Information Program (SHIIP) provides free, unbiased Medicare counseling. Call (800) 351-4664 or contact your local Area Agency on Aging. SHIIP counselors do not sell insurance.",
  },
];

export const SCORING_FACTORS = [
  {
    factor: "Financial Strength (AM Best Rating)",
    weight: "25%",
    description:
      "AM Best ratings from A++ (superior) to A- (excellent). Higher ratings indicate greater ability to pay claims.",
  },
  {
    factor: "Premium Competitiveness",
    weight: "30%",
    description:
      "Plan G and Plan N premiums compared to Iowa state averages. Lower premiums relative to the state average score higher.",
  },
  {
    factor: "Pricing Method",
    weight: "20%",
    description:
      "Issue-age and community-rated plans score higher than attained-age plans due to greater long-term premium stability.",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description:
      "Carriers offering more plan types (especially G, N, F, K, L) score higher for flexibility.",
  },
  {
    factor: "Customer Satisfaction",
    weight: "10%",
    description:
      "NAIC complaint ratios and J.D. Power scores. Lower complaint ratios and higher satisfaction scores earn higher ratings.",
  },
];

export const FAQS = [
  {
    question: "What is the best Medicare Supplement plan in Iowa?",
    answer:
      "Plan G is the best choice for most new Iowa enrollees. It covers nearly all Medicare out-of-pocket costs except the Part B deductible ($283 in 2026). MedMutual Protect offers the lowest Plan G in Iowa at $128/mo, saving up to $82/mo compared to the state average of $210/mo.",
  },
  {
    question: "Does Iowa have a birthday rule for Medigap?",
    answer:
      "Iowa does not currently have a birthday rule. A bill (SF 71) was introduced in January 2025 to create a 30-day annual switching window starting January 1, 2026. As of early 2026, the bill had not been signed into law. Contact Iowa SHIIP at (800) 351-4664 for the latest status.",
  },
  {
    question: "How much does Medicare Supplement cost in Iowa?",
    answer:
      "Plan G averages $210/mo in Iowa for a 65-year-old, but the lowest available rate is $128/mo (MedMutual Protect). Plan N averages $160/mo, with the lowest at $92/mo (MedMutual Protect). Premiums vary by carrier, age, gender, and tobacco use.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Iowa?",
    answer:
      "Plan G covers all Medicare gaps except the Part B deductible ($283 in 2026). Plan N covers the same gaps but requires copays of up to $20 for office visits and up to $50 for ER visits, and does not cover Part B excess charges. Plan N premiums are lower, starting at $92/mo vs. $128/mo for Plan G.",
  },
  {
    question: "When is the best time to enroll in Medigap in Iowa?",
    answer:
      "The best time is during your six-month Open Enrollment Period, which starts when you turn 65 and enroll in Medicare Part B. During this window, carriers must accept you regardless of health conditions. After this window, carriers can deny coverage or charge higher premiums based on your health.",
  },
  {
    question: "What is Iowa SHIIP and how can it help?",
    answer:
      "SHIIP (Senior Health Insurance Information Program) is Iowa's free Medicare counseling service. Trained volunteers help you compare Medigap plans, Medicare Advantage options, and Part D drug coverage without selling insurance. Call (800) 351-4664 or contact your local Area Agency on Aging.",
  },
  {
    question: "Can I switch Medigap plans in Iowa?",
    answer:
      "Outside of your initial Open Enrollment Period, you can apply to switch Medigap plans at any time, but carriers can deny coverage or charge higher premiums based on your health. Iowa does not currently have a birthday rule that would give you a guaranteed switching window.",
  },
  {
    question: "Does Iowa require carriers to offer Medigap to people under 65?",
    answer:
      "No. Iowa insurers are not required to offer Medigap to Medicare beneficiaries under age 65 who qualify due to disability. Some carriers do offer coverage voluntarily, but premiums are typically much higher than for 65-year-olds.",
  },
];
