/**
 * South Dakota Medigap Data
 * Sources: MoneyGeek Mar 2026, CMS Medicare Plan Finder, NAIC, AM Best
 * Reference city: Sioux Falls, SD (65-year-old female nonsmoker)
 * No birthday rule. LifeShield National lowest Plan G. SHIP: 1-833-663-9673
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
    name: "LifeShield National",
    badge: "Lowest Plan G in SD",
    score: 4.5,
    amBest: "A- (Excellent)",
    planGMonthly: "$145",
    planNMonthly: "$113",
    highlight:
      "LifeShield National offers the lowest Plan G in South Dakota at $145/mo, saving enrollees $126/mo compared to the state average of $271/mo. Plan N is $113/mo, also among the lowest in the state. LifeShield is a solid budget-first choice for enrollees who want straightforward Plan G or Plan N coverage without the premium of larger national carriers.",
    pros: [
      "Lowest Plan G in SD at $145/mo, $126 below state average",
      "Plan N at $113/mo, among the lowest in SD",
      "A- (Excellent) AM Best financial strength rating",
      "Simple, focused plan lineup for easy comparison",
    ],
    cons: [
      "Plans K, L, and M not available",
      "No high-deductible Plan G option",
      "Smaller carrier with less brand recognition",
    ],
  },
  {
    rank: 2,
    name: "MedMutual Protect",
    badge: "Lowest Plan F and Plan N",
    score: 4.2,
    amBest: "A (Excellent)",
    planGMonthly: "$147",
    planNMonthly: "$102",
    highlight:
      "MedMutual Protect offers the lowest Plan F in South Dakota at $165/mo and the lowest Plan N at $102/mo. Plan G is $147/mo, just $2 above LifeShield National. MedMutual Protect is the best choice for enrollees who want Plan F (if eligible) or the absolute lowest Plan N premium in the state.",
    pros: [
      "Lowest Plan F in SD at $165/mo, 37% below state average",
      "Lowest Plan N in SD at $102/mo",
      "A (Excellent) AM Best financial strength rating",
      "Competitive Plan G at $147/mo",
    ],
    cons: [
      "Plans B, C, K, L not available",
      "Attained-age pricing: premiums increase as you age",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 3,
    name: "Farm Bureau Insurance",
    badge: "Lowest Plan A in SD",
    score: 4.6,
    amBest: "A (Excellent)",
    planGMonthly: "$154",
    planNMonthly: "$112",
    highlight:
      "Farm Bureau Insurance offers the lowest Plan A in South Dakota at $88/mo and a competitive Plan G at $154/mo. Farm Bureau has deep roots in South Dakota with strong local agent support across Sioux Falls, Rapid City, and rural communities. It is the best choice for enrollees who want a trusted local carrier with competitive rates.",
    pros: [
      "Lowest Plan A in SD at $88/mo",
      "Strong local agent network across SD",
      "Plan G at $154/mo, competitive with state leaders",
      "A (Excellent) AM Best financial strength rating",
    ],
    cons: [
      "Plans B, C, F, K, L, and M not available",
      "Attained-age pricing: premiums increase as you age",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 4,
    name: "Transamerica",
    badge: "Only Carrier with All 10 Plan Types",
    score: 4.6,
    amBest: "A (Excellent)",
    planGMonthly: "$173",
    planNMonthly: "N/A",
    highlight:
      "Transamerica is the only carrier in South Dakota offering all 10 standardized Medigap plan types. Plan K starts at $77/mo and Plan L at $115/mo, the lowest cost-sharing options in the state. Transamerica uses issue-age pricing, which locks in your rate at enrollment and avoids the premium increases that come with attained-age pricing.",
    pros: [
      "Only SD carrier with all 10 standardized plan types",
      "Lowest Plans K ($77/mo) and L ($115/mo) in SD",
      "Issue-age pricing: rate locked at enrollment age",
      "A (Excellent) AM Best financial strength rating",
    ],
    cons: [
      "Plan G at $173/mo is higher than LifeShield and MedMutual",
      "No high-deductible Plan G option",
      "Premiums still increase over time with issue-age pricing",
    ],
  },
  {
    rank: 5,
    name: "Avera Health Plans",
    badge: "Best Local SD Carrier",
    score: 4.3,
    amBest: "A- (Excellent)",
    planGMonthly: "$151",
    planNMonthly: "N/A",
    highlight:
      "Avera Health Plans is a South Dakota-based regional carrier integrated with the Avera Health system, the dominant hospital network in eastern South Dakota. Plan G at $151/mo is competitive with the state leaders. Avera is the best choice for enrollees who want a local carrier with deep ties to the Sioux Falls and Aberdeen provider communities.",
    pros: [
      "South Dakota-based carrier with deep local roots",
      "Integrated with Avera Health hospital network",
      "Plan G at $151/mo, competitive with state leaders",
      "Strong local provider relationships in eastern SD",
    ],
    cons: [
      "Limited plan type availability",
      "Attained-age pricing: premiums increase as you age",
      "Less national brand recognition than Mutual of Omaha",
    ],
  },
];

export const STATE_STATS = {
  enrollees: "90,000+",
  carriers: "20+",
  avgPlanG: "$271",
  lowestPlanG: "$145",
  avgPlanN: "$196",
  lowestPlanN: "$102",
  shipPhone: "1-833-663-9673",
  shipName: "SD SHIP",
};

export const PREMIUM_TABLE = [
  { carrier: "LifeShield National", planG: "$145", planN: "$113", planF: "$175" },
  { carrier: "MedMutual Protect", planG: "$147", planN: "$102", planF: "$165" },
  { carrier: "Avera Health Plans", planG: "$151", planN: "N/A", planF: "N/A" },
  { carrier: "Farm Bureau Insurance", planG: "$154", planN: "$112", planF: "N/A" },
  { carrier: "USAA", planG: "$158", planN: "N/A", planF: "N/A" },
  { carrier: "Nassau", planG: "$159", planN: "$121", planF: "$193" },
  { carrier: "AFLAC", planG: "$163", planN: "$115", planF: "$193" },
  { carrier: "Transamerica", planG: "$173", planN: "N/A", planF: "N/A" },
  { carrier: "Globe Life", planG: "$201", planN: "$132", planF: "$230" },
  { carrier: "Humana", planG: "$226", planN: "N/A", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule in South Dakota",
    description:
      "South Dakota does not have a birthday rule. Once your 6-month Open Enrollment Period ends, you will face health underwriting if you try to change Medigap plans or carriers. Compare all options carefully before enrolling.",
  },
  {
    title: "Open Enrollment Period: 6 Months Starting at 65",
    description:
      "Your Open Enrollment Period begins the month you turn 65 and enroll in Medicare Part B. During this 6-month window, carriers must accept you regardless of health history and cannot charge more for pre-existing conditions.",
  },
  {
    title: "Attained-Age Rating Dominates",
    description:
      "Most South Dakota carriers use attained-age pricing, which means your premium increases as you get older. Transamerica uses issue-age pricing, which locks in your rate at enrollment. LifeShield National uses attained-age pricing but starts with the lowest Plan G in the state.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "South Dakota does not require carriers to offer Medigap to Medicare beneficiaries under age 65. If you have Medicare due to disability, you may have limited options until you turn 65.",
  },
  {
    title: "Excess Charges Allowed",
    description:
      "South Dakota does not restrict Medicare excess charges. Doctors who do not accept Medicare assignment can charge up to 15% above the Medicare-approved amount. Plan G covers excess charges; Plan N does not.",
  },
  {
    title: "SD SHIP Free Counseling Available",
    description:
      "South Dakota's State Health Insurance Assistance Program (SHIP) and Aging and Disability Resource Center offer free, unbiased Medicare counseling. Call 1-833-663-9673 to speak with a trained resource specialist who can help you compare plans.",
  },
];

export const SCORING_FACTORS = [
  {
    factor: "Affordability",
    weight: "50%",
    description:
      "Monthly premium for Plan G and Plan N for a 65-year-old female nonsmoker in Sioux Falls, SD. Lower premiums score higher.",
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
      "NAIC complaint ratio relative to market share. Lower complaint ratios score higher.",
  },
  {
    factor: "Plan Availability",
    weight: "10%",
    description:
      "Number of standardized plan types offered. Carriers offering Plans G, N, and HDG Plan G score higher.",
  },
  {
    factor: "Pricing Method",
    weight: "5%",
    description:
      "Community-rated pricing scores highest, followed by issue-age pricing, then attained-age pricing.",
  },
];

export const FAQS = [
  {
    question: "What is the best Medicare Supplement plan in South Dakota?",
    answer:
      "Plan G is the best Medicare Supplement plan for most new enrollees in South Dakota. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($257 in 2026). LifeShield National offers Plan G at $145/mo, the lowest in the state. Plan N at $102/mo (MedMutual Protect) is the best value if you are comfortable with up to $20 office visit copays.",
  },
  {
    question: "Does South Dakota have a birthday rule for Medigap?",
    answer:
      "No. South Dakota does not have a birthday rule. Once your 6-month Open Enrollment Period ends, you will face health underwriting if you try to change Medigap plans or carriers. Your initial enrollment decision is the most important one you will make.",
  },
  {
    question: "How much does Medicare Supplement insurance cost in South Dakota?",
    answer:
      "Plan G averages $271/mo in South Dakota but starts as low as $145/mo through LifeShield National. Plan N averages $196/mo but starts at $102/mo through MedMutual Protect. Premiums vary by carrier, age, and city. Sioux Falls and Rapid City tend to have similar rates.",
  },
  {
    question: "What is Avera Health Plans and is it a good Medigap option?",
    answer:
      "Avera Health Plans is a South Dakota-based regional carrier integrated with the Avera Health hospital system, the dominant network in eastern South Dakota. Plan G at $151/mo is competitive. Avera is a good choice for enrollees in Sioux Falls and Aberdeen who want a local carrier with strong provider relationships.",
  },
  {
    question: "What is the SD SHIP and how can it help me?",
    answer:
      "South Dakota's State Health Insurance Assistance Program (SHIP) and Aging and Disability Resource Center offer free, unbiased Medicare counseling. Call 1-833-663-9673 to speak with a trained specialist who can help you compare Medigap plans, understand enrollment rules, and avoid insurance fraud.",
  },
  {
    question: "Can I get Medicare Supplement insurance if I am under 65 in South Dakota?",
    answer:
      "South Dakota does not require carriers to offer Medigap to Medicare beneficiaries under age 65. If you have Medicare due to disability, you may have limited options. Once you turn 65, you are guaranteed the right to enroll in any Medigap plan during your 6-month Open Enrollment Period.",
  },
  {
    question: "What is the difference between Plan G and Plan N in South Dakota?",
    answer:
      "Plan G covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($257). Plan N also covers most costs but charges up to $20 for some office visits and up to $50 for ER visits that do not result in inpatient admission. Plan N does not cover Part B excess charges. In South Dakota, LifeShield Plan G is $145/mo and MedMutual Plan N is $102/mo.",
  },
  {
    question: "Is LifeShield National a reliable carrier?",
    answer:
      "LifeShield National carries an A- (Excellent) AM Best financial strength rating, indicating strong financial stability. It is a smaller national carrier focused on Medigap products. Its low premiums and solid AM Best rating make it a reliable budget choice for South Dakota enrollees.",
  },
];
