/**
 * South Carolina Medigap Data
 * Sources: MoneyGeek Feb 2026, CMS Medicare Plan Finder, NAIC, AM Best
 * Reference city: Columbia, SC (65-year-old female nonsmoker)
 * No birthday rule. Farm Bureau dominant carrier. I-CARE SHIP: 1-800-868-9095
 */

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

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Farm Bureau Insurance",
    badge: "Best Overall + Lowest Plan G in SC",
    score: 4.8,
    amBest: "A (Excellent)",
    planGMonthly: "$96",
    planNMonthly: "$74",
    highlight:
      "Farm Bureau Insurance offers the lowest Plan G in South Carolina at $96/mo and the lowest Plan N at $74/mo, saving enrollees up to $173/mo compared to the state average. Farm Bureau also has the lowest Plans A, B, C, D, F, and M in the state. It is the dominant Medigap carrier in South Carolina with deep local roots and strong agent support across Columbia, Charleston, Greenville, and rural areas.",
    pros: [
      "Lowest Plan G in SC at $96/mo, $133 below state average",
      "Lowest Plan N in SC at $74/mo, $112 below state average",
      "Lowest rates for Plans A, B, C, D, F, and M",
      "Strong local agent network across all SC regions",
      "A (Excellent) AM Best financial strength rating",
    ],
    cons: [
      "Plans K and L not available through Farm Bureau",
      "Attained-age pricing: premiums increase as you age",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 2,
    name: "Transamerica",
    badge: "Only Carrier with All 10 Plan Types",
    score: 4.6,
    amBest: "A (Excellent)",
    planGMonthly: "$173",
    planNMonthly: "$N/A",
    highlight:
      "Transamerica is the only carrier in South Carolina offering all 10 standardized Medigap plan types, including Plans K and L. Plan K starts at $77/mo and Plan L at $115/mo, the lowest cost-sharing options in the state. Transamerica uses issue-age pricing, which locks in your rate at enrollment and avoids the premium increases that come with attained-age pricing.",
    pros: [
      "Only SC carrier with all 10 standardized plan types",
      "Lowest Plans K ($77/mo) and L ($115/mo) in SC",
      "Issue-age pricing: rate locked at enrollment age",
      "A (Excellent) AM Best financial strength rating",
      "Strong long-term rate stability vs. attained-age carriers",
    ],
    cons: [
      "Plan G at $173/mo is higher than Farm Bureau",
      "No high-deductible Plan G option",
      "Premiums still increase over time with issue-age pricing",
    ],
  },
  {
    rank: 3,
    name: "Mutual of Omaha",
    badge: "Best for Rate Stability",
    score: 4.5,
    amBest: "A+ (Superior)",
    planGMonthly: "$147",
    planNMonthly: "$118",
    highlight:
      "Mutual of Omaha is the most recognized national Medigap brand with an A+ AM Best rating and a very low NAIC complaint ratio. Plan G at $147/mo and Plan N at $118/mo are competitive with the state average. Mutual of Omaha offers a 7% household discount when two people in the same household enroll, and HDG Plan G from $42/mo for enrollees who want the lowest possible premium with a $2,870 deductible.",
    pros: [
      "A+ (Superior) AM Best financial strength rating",
      "7% household discount available",
      "HDG Plan G from $42/mo for budget-conscious enrollees",
      "Low NAIC complaint ratio nationwide",
      "Strong brand recognition and claims reputation",
    ],
    cons: [
      "Plan G at $147/mo is higher than Farm Bureau ($96/mo)",
      "Attained-age pricing: premiums increase as you age",
      "No Plans K or L",
    ],
  },
  {
    rank: 4,
    name: "USAA",
    badge: "Best for Military Families",
    score: 4.7,
    amBest: "A++ (Superior)",
    planGMonthly: "$N/A",
    planNMonthly: "$N/A",
    highlight:
      "USAA is available exclusively to military members, veterans, and eligible family members. It carries an A++ AM Best rating, the highest possible, and is consistently rated among the top Medigap carriers for customer satisfaction. USAA offers Plan G at competitive rates for military families in South Carolina and is the top choice for veterans in Columbia, Fort Jackson, and Charleston.",
    pros: [
      "A++ (Superior) AM Best rating, highest possible",
      "Consistently top-rated for customer satisfaction",
      "Competitive Plan G rates for military families",
      "Strong claims payment reputation",
      "Available across all SC military communities",
    ],
    cons: [
      "Only available to military members, veterans, and eligible family members",
      "Not an option for the general public",
      "Limited plan type availability compared to Transamerica",
    ],
  },
  {
    rank: 5,
    name: "Nassau",
    badge: "Best Budget Plan G",
    score: 4.1,
    amBest: "A- (Excellent)",
    planGMonthly: "$125",
    planNMonthly: "$N/A",
    highlight:
      "Nassau offers Plan G at $125/mo in South Carolina, the second-lowest Plan G rate in the state after Farm Bureau. Nassau is a solid budget option for enrollees who want a lower premium than Mutual of Omaha without committing to Farm Bureau. AM Best A- rating indicates strong financial stability.",
    pros: [
      "Plan G at $125/mo, second-lowest in SC",
      "A- (Excellent) AM Best financial strength rating",
      "Competitive pricing across multiple plan types",
    ],
    cons: [
      "Smaller carrier with less brand recognition",
      "Attained-age pricing: premiums increase as you age",
      "Limited plan type availability",
    ],
  },
];

export const STATE_STATS = {
  enrollees: "170,000+",
  carriers: "30+",
  avgPlanG: "$229",
  lowestPlanG: "$96",
  avgPlanN: "$186",
  lowestPlanN: "$74",
  shipPhone: "1-800-868-9095",
  shipName: "I-CARE",
};

export const PREMIUM_TABLE = [
  { carrier: "Farm Bureau Insurance", planG: "$96", planN: "$74", planF: "$108" },
  { carrier: "Nassau", planG: "$125", planN: "N/A", planF: "N/A" },
  { carrier: "MedMutual Protect", planG: "$127", planN: "N/A", planF: "N/A" },
  { carrier: "Bankers Fidelity", planG: "$130", planN: "N/A", planF: "N/A" },
  { carrier: "LifeShield National", planG: "$132", planN: "N/A", planF: "N/A" },
  { carrier: "Mutual of Omaha", planG: "$147", planN: "$118", planF: "$162" },
  { carrier: "Transamerica", planG: "$173", planN: "N/A", planF: "N/A" },
  { carrier: "AARP/UnitedHealthcare", planG: "$198", planN: "$145", planF: "$224" },
  { carrier: "Humana", planG: "$212", planN: "$138", planF: "$241" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule in South Carolina",
    description:
      "South Carolina does not have a birthday rule. Once your 6-month Open Enrollment Period ends, you will face health underwriting if you try to change Medigap plans or carriers. Compare all options carefully before enrolling.",
  },
  {
    title: "Open Enrollment Period: 6 Months Starting at 65",
    description:
      "Your Open Enrollment Period begins the month you turn 65 and enroll in Medicare Part B. During this 6-month window, carriers must accept you regardless of health history and cannot charge more for pre-existing conditions.",
  },
  {
    title: "Attained-Age Rating Dominates",
    description:
      "Most South Carolina carriers use attained-age pricing, which means your premium increases as you get older. Transamerica uses issue-age pricing, which locks in your rate at enrollment. Farm Bureau uses attained-age pricing but starts with the lowest premiums in the state.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "South Carolina does not require carriers to offer Medigap to Medicare beneficiaries under age 65. If you have Medicare due to disability, you may have limited options until you turn 65.",
  },
  {
    title: "Excess Charges Allowed",
    description:
      "South Carolina does not restrict Medicare excess charges. Doctors who do not accept Medicare assignment can charge up to 15% above the Medicare-approved amount. Plan G covers excess charges; Plan N does not.",
  },
  {
    title: "I-CARE Free Counseling Available",
    description:
      "South Carolina's State Health Insurance Assistance Program (SHIP), called I-CARE, offers free, unbiased Medicare counseling. Call 1-800-868-9095 to speak with a certified counselor who can help you compare plans and understand your options.",
  },
];

export const SCORING_FACTORS = [
  {
    factor: "Affordability",
    weight: "50%",
    description:
      "Monthly premium for Plan G and Plan N for a 65-year-old female nonsmoker in Columbia, SC. Lower premiums score higher.",
  },
  {
    factor: "Financial Strength",
    weight: "20%",
    description:
      "AM Best financial strength rating. A++ scores highest, followed by A+, A, A-, B++. Carriers rated below A- are excluded.",
  },
  {
    factor: "Customer Satisfaction",
    weight: "15%",
    description:
      "NAIC complaint ratio relative to market share. Lower complaint ratios score higher. J.D. Power scores used as supplemental data.",
  },
  {
    factor: "Plan Availability",
    weight: "10%",
    description:
      "Number of standardized plan types offered. Carriers offering Plans G, N, and HDG Plan G score higher. All 10 plan types earns the maximum score.",
  },
  {
    factor: "Pricing Method",
    weight: "5%",
    description:
      "Community-rated pricing scores highest (same rate at any age), followed by issue-age pricing (locked at enrollment), then attained-age pricing (increases with age).",
  },
];

export const FAQS = [
  {
    question: "What is the best Medicare Supplement plan in South Carolina?",
    answer:
      "Plan G is the best Medicare Supplement plan for most new enrollees in South Carolina. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($257 in 2026). Farm Bureau offers Plan G at $96/mo, the lowest rate in the state. Plan N at $74/mo (Farm Bureau) is the best value if you are comfortable with up to $20 office visit copays and $50 ER copays.",
  },
  {
    question: "Does South Carolina have a birthday rule for Medigap?",
    answer:
      "No. South Carolina does not have a birthday rule. Once your 6-month Open Enrollment Period ends, you will face health underwriting if you try to change Medigap plans or carriers. Your initial enrollment decision is the most important one you will make.",
  },
  {
    question: "How much does Medicare Supplement insurance cost in South Carolina?",
    answer:
      "Plan G averages $229/mo in South Carolina but starts as low as $96/mo through Farm Bureau. Plan N averages $186/mo but starts at $74/mo through Farm Bureau. Premiums vary by carrier, age, and city. Columbia and Charleston tend to have similar rates; rural areas may vary slightly.",
  },
  {
    question: "Is Farm Bureau the best Medigap carrier in South Carolina?",
    answer:
      "Farm Bureau offers the lowest rates for Plans A, B, C, D, F, G, M, and N in South Carolina, making it the best value carrier for most enrollees. However, Farm Bureau does not offer Plans K or L. If you want all 10 plan types or issue-age pricing, Transamerica is the better choice.",
  },
  {
    question: "What is the I-CARE program in South Carolina?",
    answer:
      "I-CARE (Insurance Counseling Assistance and Referrals for Elders) is South Carolina's State Health Insurance Assistance Program (SHIP). It offers free, unbiased Medicare counseling from certified volunteers. Call 1-800-868-9095 to speak with a counselor who can help you compare Medigap plans and understand your enrollment options.",
  },
  {
    question: "Can I get Medicare Supplement insurance if I am under 65 in South Carolina?",
    answer:
      "South Carolina does not require carriers to offer Medigap to Medicare beneficiaries under age 65. If you have Medicare due to disability, you may have limited options. Once you turn 65, you are guaranteed the right to enroll in any Medigap plan during your 6-month Open Enrollment Period.",
  },
  {
    question: "What is the difference between Plan G and Plan N in South Carolina?",
    answer:
      "Plan G covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($257). Plan N also covers most costs but charges up to $20 for some office visits and up to $50 for ER visits that do not result in inpatient admission. Plan N does not cover Part B excess charges. In South Carolina, Farm Bureau Plan G is $96/mo and Plan N is $74/mo, a $22/mo difference.",
  },
  {
    question: "When is the best time to enroll in Medicare Supplement in South Carolina?",
    answer:
      "The best time to enroll is during your 6-month Open Enrollment Period, which begins the month you turn 65 and enroll in Medicare Part B. During this window, carriers must accept you regardless of health history and cannot charge more for pre-existing conditions. South Carolina has no birthday rule, so this is your most important enrollment window.",
  },
];
