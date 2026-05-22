// Kansas Medicare Supplement Data
// Sources: MoneyGeek, Kansas SHICK, Kansas Insurance Department, CMS
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
  enrollees: "115,000+",
  carriers: "35+",
  lowestPlanG: "$141/mo",
  avgPlanG: "$201/mo",
  lowestPlanN: "$103/mo",
  avgPlanN: "$160/mo",
  shipPhone: "(800) 860-5260",
  shipName: "SHICK",
  birthdayRule: false,
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Farm Bureau Insurance",
    badge: "Best Plan G and Plan N Rates",
    score: 4.4,
    amBest: "A",
    planGMonthly: "$141/mo",
    planNMonthly: "$103/mo",
    highlight:
      "Farm Bureau Insurance offers the lowest Plan G ($141/mo) and Plan N ($103/mo) in Kansas, saving seniors up to $60/mo compared to the state average. It also has the lowest Plan A ($115/mo) and Plan D ($135/mo). Farm Bureau is a strong regional carrier with deep Kansas roots and a local agent network.",
    pros: [
      "Lowest Plan G in Kansas at $141/mo",
      "Lowest Plan N in Kansas at $103/mo",
      "Lowest Plan A at $115/mo and Plan D at $135/mo",
      "Strong regional carrier with Kansas presence",
      "Local agent network across the state",
    ],
    cons: [
      "Attained-age pricing means premiums increase with age",
      "Only four plan types (A, D, G, N)",
      "No cost-sharing plans (K, L) or Plan F",
    ],
  },
  {
    rank: 2,
    name: "Wellcare",
    badge: "Best Plan F Rates",
    score: 4.2,
    amBest: "A-",
    planGMonthly: "$160/mo",
    planNMonthly: "N/A",
    highlight:
      "Wellcare offers the lowest Plan F in Kansas at $185/mo and a competitive Plan G at $160/mo. It is a solid option for seniors who became eligible for Medicare before 2020 and want the most comprehensive coverage available.",
    pros: [
      "Lowest Plan F in Kansas at $185/mo",
      "Competitive Plan G at $160/mo",
      "Nationally recognized carrier",
    ],
    cons: [
      "Attained-age pricing",
      "Limited plan variety (A, F, G, N)",
      "No cost-sharing plans (K, L)",
    ],
  },
  {
    rank: 3,
    name: "Aetna",
    badge: "Best Plan B and Broad Coverage",
    score: 4.3,
    amBest: "A",
    planGMonthly: "$195/mo",
    planNMonthly: "N/A",
    highlight:
      "Aetna offers the lowest Plan B in Kansas at $199/mo and a wide range of plan types. It is a strong choice for seniors who want a nationally recognized carrier with broad plan availability and solid financial strength.",
    pros: [
      "Lowest Plan B in Kansas at $199/mo",
      "Five plan types (A, B, F, G, N)",
      "A AM Best financial strength",
      "Strong national network",
    ],
    cons: [
      "Plan G at $195/mo is above Farm Bureau",
      "Attained-age pricing",
      "No cost-sharing plans (K, L) or Plan M",
    ],
  },
  {
    rank: 4,
    name: "New Era Life",
    badge: "Best Plan C and Plan M",
    score: 4.3,
    amBest: "A-",
    planGMonthly: "$185/mo",
    planNMonthly: "N/A",
    highlight:
      "New Era Life offers the lowest Plan C ($190/mo) and Plan M ($107/mo) in Kansas. Plan M covers 50% of the Part A deductible and is a mid-tier option for healthy seniors who want lower premiums with moderate coverage.",
    pros: [
      "Lowest Plan C in Kansas at $190/mo",
      "Lowest Plan M in Kansas at $107/mo",
      "Six plan types including less common options (C, M)",
    ],
    cons: [
      "Attained-age pricing",
      "No cost-sharing plans (K, L) or Plans B and D",
      "No high-deductible Plan G",
    ],
  },
  {
    rank: 5,
    name: "Blue Cross Blue Shield of Kansas",
    badge: "Best Cost-Sharing Plans and Local Network",
    score: 4.1,
    amBest: "A",
    planGMonthly: "$193/mo",
    planNMonthly: "N/A",
    highlight:
      "Blue Cross Blue Shield of Kansas is the dominant local carrier with the best rates for cost-sharing Plans K ($85/mo) and L ($125/mo). It is the top choice for seniors who want a Kansas-based carrier with a strong local provider network.",
    pros: [
      "Lowest Plan K in Kansas at $85/mo",
      "Lowest Plan L in Kansas at $125/mo",
      "Strong local Kansas provider network",
      "A AM Best financial strength",
    ],
    cons: [
      "Plan G at $193/mo is above Farm Bureau",
      "Attained-age pricing",
      "Does not offer Plans B, C, D, or M",
    ],
  },
];

export const PREMIUM_TABLE = [
  { carrier: "Farm Bureau Insurance", planG: "$141", planN: "$103", planF: "N/A" },
  { carrier: "Wellcare", planG: "$160", planN: "N/A", planF: "$185" },
  { carrier: "New Era Life", planG: "$185", planN: "N/A", planF: "N/A" },
  { carrier: "Aetna", planG: "$195", planN: "N/A", planF: "N/A" },
  { carrier: "Blue Cross Blue Shield of Kansas", planG: "$193", planN: "N/A", planF: "N/A" },
  { carrier: "Mutual of Omaha", planG: "$198", planN: "N/A", planF: "N/A" },
  { carrier: "AARP/UnitedHealthcare", planG: "$210", planN: "N/A", planF: "N/A" },
  { carrier: "Transamerica", planG: "$215", planN: "N/A", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule in Kansas",
    description:
      "Kansas does not have a birthday rule. After your initial Open Enrollment Period, you can apply to switch Medigap plans at any time, but carriers can deny coverage or charge higher premiums based on your health. Your initial enrollment window is the most important time to choose your plan.",
  },
  {
    title: "Open Enrollment Period Is Your Best Window",
    description:
      "Your six-month Open Enrollment Period starts when you turn 65 and enroll in Medicare Part B. During this window, carriers must accept you regardless of health conditions and cannot charge higher premiums for pre-existing conditions.",
  },
  {
    title: "Farm Bureau Is Kansas-Specific",
    description:
      "Farm Bureau Insurance is a regional carrier available in Kansas and select other states. It is not available nationwide. If you move out of Kansas, you may need to switch carriers.",
  },
  {
    title: "Attained-Age Pricing Is Standard",
    description:
      "Most Kansas carriers use attained-age pricing, meaning premiums increase as you get older. There are no community-rated carriers in Kansas. Locking in a low rate during your Open Enrollment Period is important.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Kansas insurers are not required to offer Medigap to Medicare beneficiaries under age 65 who qualify due to disability. Some carriers offer coverage voluntarily, but premiums are typically much higher.",
  },
  {
    title: "Free Counseling Through Kansas SHICK",
    description:
      "Kansas SHICK (Senior Health Insurance Counseling for Kansas) provides free, unbiased Medicare counseling. Call (800) 860-5260. SHICK counselors do not sell insurance and can help you compare Medigap plans across all available carriers.",
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
      "Plan G and Plan N premiums compared to Kansas state averages. Lower premiums relative to the state average score higher.",
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
    question: "What is the best Medicare Supplement plan in Kansas?",
    answer:
      "Plan G is the best choice for most new Kansas enrollees. It covers nearly all Medicare out-of-pocket costs except the Part B deductible ($283 in 2026). Farm Bureau Insurance offers the lowest Plan G in Kansas at $141/mo, saving up to $60/mo compared to the state average.",
  },
  {
    question: "Does Kansas have a birthday rule for Medigap?",
    answer:
      "No. Kansas does not have a birthday rule. After your initial Open Enrollment Period, you can apply to switch Medigap plans at any time, but carriers can deny coverage or charge higher premiums based on your health.",
  },
  {
    question: "How much does Medicare Supplement cost in Kansas?",
    answer:
      "Plan G averages $201/mo in Kansas for a 65-year-old, but the lowest available rate is $141/mo (Farm Bureau Insurance). Plan N averages $160/mo, with the lowest at $103/mo (Farm Bureau Insurance). Premiums vary by carrier, age, gender, and tobacco use.",
  },
  {
    question: "Is Farm Bureau Insurance a good Medigap carrier in Kansas?",
    answer:
      "Yes. Farm Bureau Insurance offers the lowest Plan G ($141/mo) and Plan N ($103/mo) in Kansas. It has an A AM Best rating and a strong local agent network. The main limitation is that it only offers four plan types (A, D, G, N) and uses attained-age pricing.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Kansas?",
    answer:
      "Plan G covers all Medicare gaps except the Part B deductible ($283 in 2026). Plan N covers the same gaps but requires copays of up to $20 for office visits and up to $50 for ER visits, and does not cover Part B excess charges. Plan N premiums are lower, starting at $103/mo vs. $141/mo for Plan G.",
  },
  {
    question: "What is Kansas SHICK and how can it help?",
    answer:
      "SHICK (Senior Health Insurance Counseling for Kansas) is the state's free Medicare counseling service. Trained counselors help you compare Medigap plans, Medicare Advantage options, and Part D drug coverage without selling insurance. Call (800) 860-5260.",
  },
  {
    question: "When is the best time to enroll in Medigap in Kansas?",
    answer:
      "The best time is during your six-month Open Enrollment Period, which starts when you turn 65 and enroll in Medicare Part B. During this window, carriers must accept you regardless of health conditions. After this window, carriers can deny coverage or charge higher premiums based on your health.",
  },
  {
    question: "Can I get Medigap in Kansas if I am under 65?",
    answer:
      "Kansas insurers are not required to offer Medigap to Medicare beneficiaries under age 65 who qualify due to disability. Some carriers offer coverage voluntarily, but premiums are typically much higher than for 65-year-olds.",
  },
];
