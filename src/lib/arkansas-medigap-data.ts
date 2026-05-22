/**
 * Arkansas Medicare Supplement Data
 * Sources: Arkansas Insurance Department, CMS Medicare Plan Finder,
 *          MoneyGeek, Arkansas Blue Cross and Blue Shield, Senior65 - May 2026
 *
 * Key facts:
 * - ~200,000 Arkansas Medigap enrollees
 * - Plan G avg $224/mo statewide; Wellcare and MedMutual both lowest at $168/mo in Little Rock
 * - Arkansas Blue Cross (Medi-Pak) is the dominant local carrier
 * - All carriers use community pricing in Arkansas
 * - No birthday rule or anniversary rule in Arkansas
 * - Under-65 coverage NOT required by state law
 * - SHIP (SMP) free counseling: 1-800-224-6330
 * - Arkansas Insurance Department: www.insurance.arkansas.gov
 * - Aetna lowest Plan N at $111/mo
 * - QualChoice Life lowest Plan K at $92/mo
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

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PremiumRow {
  carrier: string;
  planG: string;
  planN: string;
  planF: string;
}

export interface StateRule {
  title: string;
  description: string;
}

export interface ScoringFactor {
  factor: string;
  weight: string;
  description: string;
}

export const STATE_STATS = {
  enrollees: "200,000+",
  carriers: "20+",
  lowestPlanG: "$168/mo",
  avgPlanG: "$224/mo",
  shipPhone: "1-800-224-6330",
  doiWebsite: "www.insurance.arkansas.gov",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Mutual of Omaha",
    badge: "Best Overall in Arkansas",
    score: 4.7,
    amBest: "A+",
    planGMonthly: "$174",
    planNMonthly: "$136",
    highlight:
      "Mutual of Omaha is the top overall pick for Arkansas seniors, combining a strong A+ AM Best rating, competitive Plan G at $174/mo, and one of the lowest Plan N rates in the state at $136/mo. With a national claims-paying reputation and broad plan availability, Mutual of Omaha is the most reliable all-around choice in Arkansas.",
    pros: [
      "A+ AM Best rating (excellent financial strength)",
      "Competitive Plan G at $174/mo",
      "Low Plan N at $136/mo",
      "Strong national claims-paying reputation",
      "Broad plan availability including HDG options",
    ],
    cons: [
      "Not the absolute lowest Plan G (Wellcare and MedMutual are cheaper)",
      "Community pricing: premiums do not increase with age but can increase over time",
    ],
  },
  {
    rank: 2,
    name: "Wellcare",
    badge: "Lowest Plan G in Arkansas",
    score: 4.2,
    amBest: "B",
    planGMonthly: "$168",
    planNMonthly: "$133",
    highlight:
      "Wellcare offers the lowest Plan G premium in Arkansas at $168/mo, tied with MedMutual Protect. Their Plan N is also competitive at $133/mo. The main caution: Wellcare carries an AM Best rating of B (Fair), which is below the A or better threshold most advisors recommend. Best for budget-focused seniors who prioritize the lowest monthly premium and are comfortable with a lower-rated carrier.",
    pros: [
      "Lowest Plan G in Arkansas at $168/mo (tied with MedMutual)",
      "Competitive Plan N at $133/mo",
      "Community pricing in Arkansas",
    ],
    cons: [
      "AM Best B (Fair) rating: below the A threshold most advisors recommend",
      "Limited plan availability beyond Plans A, F, G, and N",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 3,
    name: "MedMutual Protect",
    badge: "Best Value with Strong Rating",
    score: 4.5,
    amBest: "A",
    planGMonthly: "$168",
    planNMonthly: "$123",
    highlight:
      "MedMutual Protect (Medical Mutual of Ohio) matches Wellcare's lowest Plan G at $168/mo but with an A AM Best rating, making it the best value in Arkansas. Their Plan N at $123/mo is the second-lowest in the state, and they offer a high-deductible Plan G option starting around $60/mo. MedMutual is the top pick for Arkansas seniors who want the lowest premium without sacrificing financial strength.",
    pros: [
      "Lowest Plan G in Arkansas at $168/mo (tied with Wellcare)",
      "A AM Best rating: stronger than Wellcare",
      "Low Plan N at $123/mo",
      "High-deductible Plan G available",
      "Lowest Plan F in Arkansas at $191/mo",
    ],
    cons: [
      "Does not offer Plans B, C, K, L, or M",
      "Community pricing: premiums can increase over time",
    ],
  },
  {
    rank: 4,
    name: "State Farm",
    badge: "Best for Financial Strength",
    score: 4.6,
    amBest: "A++",
    planGMonthly: "$174",
    planNMonthly: "$130",
    highlight:
      "State Farm brings an A++ AM Best rating (the highest possible) to Arkansas at a competitive Plan G of $174/mo. Their Plan N at $130/mo is among the lowest in the state. With a large local agent network across Arkansas and the strongest financial rating available, State Farm is the best choice for seniors who prioritize long-term stability and local service.",
    pros: [
      "A++ AM Best rating (highest possible)",
      "Competitive Plan G at $174/mo",
      "Low Plan N at $130/mo",
      "Large local agent network across Arkansas",
      "Lowest Plan D in Arkansas at $174/mo",
    ],
    cons: [
      "Does not offer Plans B, K, L, or M",
      "No high-deductible Plan G option",
      "Community pricing: premiums can increase over time",
    ],
  },
  {
    rank: 5,
    name: "Aetna",
    badge: "Best Plan N in Arkansas",
    score: 4.3,
    amBest: "A",
    planGMonthly: "$118",
    planNMonthly: "$111",
    highlight:
      "Aetna offers the lowest Plan N in Arkansas at just $111/mo, making it the top pick for seniors who want to minimize monthly costs and are comfortable with small copays for office and ER visits. Their Plan G at $118/mo is also among the lowest in the state. Aetna carries an A AM Best rating and uses community pricing in Arkansas.",
    pros: [
      "Lowest Plan N in Arkansas at $111/mo",
      "Very competitive Plan G at $118/mo",
      "A AM Best rating",
      "Community pricing in Arkansas",
    ],
    cons: [
      "Limited plan lineup: no Plans B, C, D, K, L, or M",
      "Plan N has copays up to $20 for office visits and $50 for ER visits",
      "No high-deductible Plan G option",
    ],
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Aetna", planG: "$118", planN: "$111", planF: "N/A" },
  { carrier: "Wellcare", planG: "$168", planN: "$133", planF: "$207" },
  { carrier: "MedMutual Protect", planG: "$168", planN: "$123", planF: "$191" },
  { carrier: "State Farm", planG: "$174", planN: "$130", planF: "N/A" },
  { carrier: "Mutual of Omaha", planG: "$174", planN: "$136", planF: "N/A" },
  { carrier: "Humana", planG: "$177", planN: "$136", planF: "$210" },
  { carrier: "AARP / UnitedHealthcare", planG: "$185", planN: "$145", planF: "$220" },
  { carrier: "Arkansas Blue Cross (Medi-Pak)", planG: "$205", planN: "$160", planF: "$240" },
  { carrier: "QualChoice Life", planG: "$208", planN: "N/A", planF: "N/A" },
];

export const STATE_RULES: StateRule[] = [
  {
    title: "No Birthday Rule or Anniversary Rule in Arkansas",
    description:
      "Arkansas does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, carriers can use medical underwriting to deny coverage or charge higher premiums. Your initial enrollment decision is the most important one you will make.",
  },
  {
    title: "Community Pricing Is Standard in Arkansas",
    description:
      "All major Medigap carriers in Arkansas use community pricing, which means your premium is the same regardless of your age. A 65-year-old and an 85-year-old pay the same rate for the same plan from the same carrier. Premiums can still increase over time due to inflation and claims experience, but age alone does not drive increases.",
  },
  {
    title: "Standard 6-Month Open Enrollment Period",
    description:
      "Federal law gives you a 6-month Open Enrollment Period starting the month you turn 65 and enroll in Medicare Part B. During this window, no carrier can deny you coverage or charge higher premiums due to pre-existing conditions. This is your best opportunity to lock in coverage.",
  },
  {
    title: "Under-65 Coverage Not Required",
    description:
      "Arkansas does not require Medigap carriers to offer coverage to Medicare beneficiaries under age 65 (such as those with disabilities). If you are under 65 and on Medicare in Arkansas, you may have difficulty finding Medigap coverage. Some carriers offer it voluntarily at higher rates.",
  },
  {
    title: "Excess Charges Are Allowed in Arkansas",
    description:
      "Arkansas does not ban Medicare excess charges. Providers who do not accept Medicare assignment can charge up to 15% more than the Medicare-approved amount. Plan G covers excess charges; Plan N does not. Confirm your doctors accept Medicare assignment before choosing Plan N.",
  },
  {
    title: "Arkansas Medi-Pak: Local Option from Arkansas Blue Cross",
    description:
      "Arkansas Blue Cross and Blue Shield offers a Medicare Supplement product called Medi-Pak, which is one of the most recognized Medigap brands in the state. Medi-Pak Plan G runs around $205/mo in Little Rock, higher than the lowest-cost options, but comes with strong local provider relationships and customer service.",
  },
  {
    title: "Free Help via Arkansas SHIP",
    description:
      "The Arkansas Senior Health Insurance Information Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-224-6330 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];

export const SCORING_FACTORS: ScoringFactor[] = [
  {
    factor: "Financial Strength (AM Best)",
    weight: "25%",
    description: "Claims-paying ability and long-term stability",
  },
  {
    factor: "Customer Satisfaction",
    weight: "25%",
    description: "NAIC complaint ratios and member satisfaction surveys",
  },
  {
    factor: "Premium Competitiveness",
    weight: "20%",
    description: "Plan G and Plan N rates vs. Arkansas market average",
  },
  {
    factor: "Plan Availability",
    weight: "15%",
    description: "Number of plan types offered in Arkansas",
  },
  {
    factor: "Discounts and Value",
    weight: "15%",
    description: "Household discounts, HDG options, and added benefits",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Arkansas for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan for new enrollees in Arkansas. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). For the best overall value, MedMutual Protect offers the lowest Plan G at $168/mo with an A AM Best rating. State Farm at $174/mo adds an A++ rating and a large local agent network. For the absolute lowest premium, Aetna Plan G runs $118/mo.",
  },
  {
    question: "Does Arkansas have a birthday rule for Medigap?",
    answer:
      "No. Arkansas does not have a birthday rule or anniversary rule. Outside of your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B, carriers can use medical underwriting to deny coverage or charge higher premiums. Your initial enrollment decision is the most important one you will make.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Arkansas?",
    answer:
      "Plan G premiums in Arkansas average $224/mo statewide for a 65-year-old. In Little Rock, rates range from $118/mo (Aetna) to $208/mo (QualChoice). MedMutual Protect and Wellcare both offer Plan G at $168/mo. All major carriers in Arkansas use community pricing, so your rate does not increase just because you get older.",
  },
  {
    question: "What is community pricing and how does it work in Arkansas?",
    answer:
      "Community pricing means all enrollees in the same plan pay the same premium regardless of age. A 65-year-old and an 85-year-old pay the same monthly rate for the same plan from the same carrier. Premiums can still increase over time due to inflation and claims experience, but age alone does not drive increases. All major Medigap carriers in Arkansas use community pricing.",
  },
  {
    question: "What is Arkansas Blue Cross Medi-Pak and is it a good choice?",
    answer:
      "Medi-Pak is the Medicare Supplement product offered by Arkansas Blue Cross and Blue Shield, the dominant local health insurer in the state. Medi-Pak Plan G runs around $205/mo in Little Rock, which is higher than the lowest-cost options like MedMutual Protect ($168/mo). However, Medi-Pak comes with strong local provider relationships and customer service. If you value local support and brand recognition, Medi-Pak is worth considering, but you can get the same standardized benefits for less from other carriers.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Arkansas?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for ER visits that do not result in inpatient admission, and does not cover Part B excess charges. In Arkansas, Aetna Plan N runs $111/mo vs. $118/mo for their Plan G. Confirm your doctors accept Medicare assignment before choosing Plan N, as Arkansas allows excess charges.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Arkansas?",
    answer:
      "Outside of your initial Open Enrollment Period, switching Medigap plans in Arkansas requires medical underwriting. Carriers can deny your application or charge higher premiums based on your health history. Arkansas does not have a birthday rule or anniversary rule that would give you a guaranteed switching window. If you are in good health and want to switch to a lower-cost plan, you can apply at any time, but approval is not guaranteed.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Arkansas?",
    answer:
      "The Arkansas Senior Health Insurance Information Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-224-6330 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance. You can also visit the Arkansas Insurance Department at www.insurance.arkansas.gov.",
  },
];
