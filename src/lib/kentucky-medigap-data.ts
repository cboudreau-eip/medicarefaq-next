// Kentucky Medicare Supplement Data
// Sources: MoneyGeek, Kentucky SHIP, Kentucky DOI, CMS, Medicare.gov
// Updated: May 2026
// Key: Birthday rule effective January 2024 (30-day window, equal or lesser plan)

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
  enrollees: "175,000+",
  carriers: "40+",
  lowestPlanG: "$148/mo",
  avgPlanG: "$253/mo",
  lowestPlanN: "$110/mo",
  avgPlanN: "$209/mo",
  shipPhone: "(877) 293-7447",
  shipName: "Kentucky SHIP",
  birthdayRule: true,
  birthdayRuleWindow: "30 days",
  birthdayRuleEffective: "January 2024",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "LifeShield National",
    badge: "Lowest Plan G, Plan N, and Plan F",
    score: 4.5,
    amBest: "A-",
    planGMonthly: "$148/mo",
    planNMonthly: "$110/mo",
    highlight:
      "LifeShield National offers the lowest Plan G ($148/mo), Plan N ($110/mo), and Plan F ($181/mo) in Kentucky, saving seniors up to $105/mo compared to the state average Plan G of $253/mo. It is the best value pick for Kentucky seniors who want comprehensive coverage at the lowest possible premium.",
    pros: [
      "Lowest Plan G in Kentucky at $148/mo",
      "Lowest Plan N in Kentucky at $110/mo",
      "Lowest Plan F in Kentucky at $181/mo",
      "Strong financial stability",
      "Ideal for birthday rule annual shopping",
    ],
    cons: [
      "Attained-age pricing means premiums increase with age",
      "Only four plan types (A, F, G, N)",
      "No cost-sharing plans (K, L) or Plans B, C, D, M",
    ],
  },
  {
    rank: 2,
    name: "Transamerica",
    badge: "Best Plan Variety and Issue-Age Pricing",
    score: 4.6,
    amBest: "A",
    planGMonthly: "$164/mo",
    planNMonthly: "N/A",
    highlight:
      "Transamerica is the only carrier in Kentucky offering all 10 standard Medigap plan types. It uses issue-age pricing, meaning your premium is locked at your enrollment age. Plan K at $78/mo and Plan L at $116/mo are the lowest in Kentucky.",
    pros: [
      "Only Kentucky carrier with all 10 plan types",
      "Issue-age pricing locks your premium at enrollment age",
      "Lowest Plan K in Kentucky at $78/mo",
      "Lowest Plan L in Kentucky at $116/mo",
      "Lowest Plan B in Kentucky at $202/mo",
    ],
    cons: [
      "Plan G at $164/mo is above LifeShield National",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 3,
    name: "State Farm",
    badge: "Best Financial Strength and Local Agents",
    score: 4.6,
    amBest: "A++",
    planGMonthly: "$160/mo",
    planNMonthly: "$120/mo",
    highlight:
      "State Farm earns the highest AM Best rating (A++) of any carrier in Kentucky and offers Plan G at $160/mo and Plan N at $120/mo. With a large local agent network across Louisville, Lexington, and rural Kentucky, State Farm is the best choice for seniors who want face-to-face service and top-tier financial strength.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Plan G at $160/mo, third-lowest in Kentucky",
      "Plan N at $120/mo, third-lowest in Kentucky",
      "Large local agent network statewide",
      "Best Plan D in Kentucky at $159/mo",
    ],
    cons: [
      "Does not offer Plans B, K, L, or M",
      "Attained-age pricing",
    ],
  },
  {
    rank: 4,
    name: "Globe Life",
    badge: "Best Budget Plan G",
    score: 4.2,
    amBest: "A",
    planGMonthly: "$150/mo",
    planNMonthly: "$127/mo",
    highlight:
      "Globe Life offers Plan G at $150/mo, the second-lowest in Kentucky, and Plan N at $127/mo. It is a solid budget option for seniors who want low premiums with a nationally recognized carrier.",
    pros: [
      "Plan G at $150/mo, second-lowest in Kentucky",
      "Nationally recognized carrier",
      "A AM Best financial strength",
    ],
    cons: [
      "Attained-age pricing",
      "Limited plan variety",
    ],
  },
  {
    rank: 5,
    name: "MedMutual Protect",
    badge: "Best Plan N Value",
    score: 4.3,
    amBest: "A+",
    planGMonthly: "$162/mo",
    planNMonthly: "$116/mo",
    highlight:
      "MedMutual Protect offers Plan N at $116/mo, the second-lowest in Kentucky, and Plan G at $162/mo. The A+ AM Best rating and strong Midwest presence make it a reliable choice for Kentucky seniors.",
    pros: [
      "Plan N at $116/mo, second-lowest in Kentucky",
      "A+ AM Best financial strength",
      "Lowest Plan F in Kentucky at $183/mo",
    ],
    cons: [
      "Attained-age pricing",
      "No cost-sharing plans (K, L)",
    ],
  },
];

export const PREMIUM_TABLE = [
  { carrier: "LifeShield National", planG: "$148", planN: "$110", planF: "$181" },
  { carrier: "Globe Life", planG: "$150", planN: "$127", planF: "$210" },
  { carrier: "Bankers Fidelity", planG: "$154", planN: "N/A", planF: "N/A" },
  { carrier: "State Farm", planG: "$160", planN: "$120", planF: "N/A" },
  { carrier: "MedMutual Protect", planG: "$162", planN: "$116", planF: "$183" },
  { carrier: "Transamerica", planG: "$164", planN: "N/A", planF: "N/A" },
  { carrier: "USAA", planG: "$167", planN: "N/A", planF: "N/A" },
  { carrier: "Humana", planG: "$185", planN: "$127", planF: "$201" },
  { carrier: "AARP/UnitedHealthcare", planG: "$220", planN: "N/A", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "Kentucky Birthday Rule (Since January 2024)",
    description:
      "Kentucky enacted a birthday rule effective January 2024. Current Medigap policyholders have a 30-day window starting on their birthday each year to switch to an equal or lesser plan with any carrier without answering health questions. No denial based on pre-existing conditions.",
  },
  {
    title: "Equal or Lesser Plan Requirement",
    description:
      "Under the Kentucky birthday rule, you can only switch to a plan with equal or lesser benefits. For example, you can switch from Plan G to Plan N, but not from Plan N to Plan G without medical underwriting.",
  },
  {
    title: "Open Enrollment Period Is Your Best Window",
    description:
      "Your six-month Open Enrollment Period starts when you turn 65 and enroll in Medicare Part B. During this window, carriers must accept you regardless of health conditions. The birthday rule gives you an annual opportunity to shop, but the Open Enrollment Period allows you to choose any plan.",
  },
  {
    title: "40+ Carriers Available in Kentucky",
    description:
      "Kentucky has one of the most competitive Medigap markets in the country, with over 40 carriers offering plans. Shopping across multiple carriers is especially important given the wide range of premiums.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Kentucky insurers are not required to offer Medigap to Medicare beneficiaries under age 65 who qualify due to disability. Some carriers offer coverage voluntarily, but premiums are typically much higher.",
  },
  {
    title: "Free Counseling Through Kentucky SHIP",
    description:
      "Kentucky SHIP provides free, unbiased Medicare counseling statewide. Call (877) 293-7447 or (502) 564-6930 (Option 3). SHIP counselors do not sell insurance and can help you compare plans and use your birthday rule window.",
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
      "Plan G and Plan N premiums compared to Kentucky state averages. Lower premiums relative to the state average score higher.",
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
    question: "What is the best Medicare Supplement plan in Kentucky?",
    answer:
      "Plan G is the best choice for most new Kentucky enrollees. It covers nearly all Medicare out-of-pocket costs except the Part B deductible ($283 in 2026). LifeShield National offers the lowest Plan G in Kentucky at $148/mo, saving up to $105/mo compared to the state average of $253/mo.",
  },
  {
    question: "Does Kentucky have a birthday rule for Medigap?",
    answer:
      "Yes. Kentucky enacted a birthday rule effective January 2024. Current Medigap policyholders have a 30-day window starting on their birthday each year to switch to an equal or lesser plan with any carrier without answering health questions.",
  },
  {
    question: "How does the Kentucky birthday rule work?",
    answer:
      "Starting on your birthday each year, you have a 30-day window to switch to a Medigap plan with equal or lesser benefits from any carrier without medical underwriting. For example, you can switch from Plan G to Plan N, or from one carrier's Plan G to another carrier's Plan G. You cannot switch to a plan with greater benefits without medical underwriting.",
  },
  {
    question: "How much does Medicare Supplement cost in Kentucky?",
    answer:
      "Plan G averages $253/mo in Kentucky for a 65-year-old, but the lowest available rate is $148/mo (LifeShield National). Plan N averages $209/mo, with the lowest at $110/mo (LifeShield National). Premiums vary by carrier, age, gender, and tobacco use.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Kentucky?",
    answer:
      "Plan G covers all Medicare gaps except the Part B deductible ($283 in 2026). Plan N covers the same gaps but requires copays of up to $20 for office visits and up to $50 for ER visits, and does not cover Part B excess charges. Plan N premiums are lower, starting at $110/mo vs. $148/mo for Plan G.",
  },
  {
    question: "What is Kentucky SHIP and how can it help?",
    answer:
      "Kentucky SHIP (State Health Insurance Assistance Program) provides free, unbiased Medicare counseling statewide. Call (877) 293-7447. SHIP counselors do not sell insurance and can help you compare Medigap plans and understand how to use your birthday rule window.",
  },
  {
    question: "When is the best time to enroll in Medigap in Kentucky?",
    answer:
      "The best time is during your six-month Open Enrollment Period, which starts when you turn 65 and enroll in Medicare Part B. During this window, carriers must accept you regardless of health conditions. The birthday rule gives you an annual opportunity to shop after that.",
  },
  {
    question: "Can I get Medigap in Kentucky if I am under 65?",
    answer:
      "Kentucky insurers are not required to offer Medigap to Medicare beneficiaries under age 65 who qualify due to disability. Some carriers offer coverage voluntarily, but premiums are typically much higher than for 65-year-olds.",
  },
];
