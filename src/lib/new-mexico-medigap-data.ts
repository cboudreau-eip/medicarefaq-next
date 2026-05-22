/**
 * New Mexico Medicare Supplement Data
 * Source: MoneyGeek, NM Office of Superintendent of Insurance, FairSquare Medicare, May 2026
 * Key facts: No birthday rule, attained-age pricing dominant,
 *            MedMutual Protect lowest Plan G at $122/mo, State Farm A++ lowest Plans A/C/D,
 *            Government Personnel Mutual (GPM) at $126/mo Plan G,
 *            SHIP: (800) 432-2080
 */

export interface Carrier {
  rank: number;
  name: string;
  badge: string;
  score: number;
  planGMonthly: string;
  planNMonthly: string;
  amBest: string;
  highlight: string;
  pros: string[];
  cons: string[];
}

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "MedMutual Protect",
    badge: "Lowest Plan G in New Mexico",
    score: 4.7,
    planGMonthly: "$122",
    planNMonthly: "$87",
    amBest: "A+ (Superior)",
    highlight:
      "MedMutual Protect offers the lowest Plan G in New Mexico at $122/mo, which is $97/mo below the state average of $219. Plan N at $87/mo is also the lowest in the state. MedMutual also offers the lowest Plan F at $140/mo for those eligible. A+ AM Best rating provides strong financial security.",
    pros: [
      "Lowest Plan G in New Mexico at $122/mo (44% below average)",
      "Lowest Plan N at $87/mo",
      "Lowest Plan F at $140/mo for pre-2020 enrollees",
      "A+ (Superior) AM Best financial strength rating",
    ],
    cons: [
      "Attained-age pricing: premiums increase as you age",
      "Not as widely recognized as national brands",
    ],
  },
  {
    rank: 2,
    name: "State Farm",
    badge: "Best for Financial Strength and Local Agents",
    score: 4.5,
    planGMonthly: "$137",
    planNMonthly: "N/A",
    amBest: "A++ (Superior)",
    highlight:
      "State Farm earns the highest possible AM Best rating (A++) and offers local agents across Albuquerque, Santa Fe, Las Cruces, and rural New Mexico. State Farm has the lowest Plan A at $111/mo, Plan C at $182/mo, and Plan D at $137/mo in the state.",
    pros: [
      "A++ (Superior) AM Best rating, highest in the industry",
      "Local agents across New Mexico for in-person service",
      "Lowest Plan A ($111/mo), Plan C ($182/mo), and Plan D ($137/mo)",
      "Strong claims-paying history",
    ],
    cons: [
      "Does not offer Plans K, L, or M",
      "Attained-age pricing: premiums increase as you age",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 3,
    name: "Government Personnel Mutual (GPM)",
    badge: "Best Value Plan G",
    score: 4.3,
    planGMonthly: "$126",
    planNMonthly: "N/A",
    amBest: "A- (Excellent)",
    highlight:
      "Government Personnel Mutual offers the second-lowest Plan G in New Mexico at $126/mo, just $4 more than MedMutual Protect. GPM is a smaller carrier but has a solid reputation and A- AM Best rating. A good alternative if MedMutual Protect is not available in your ZIP code.",
    pros: [
      "Second-lowest Plan G in New Mexico at $126/mo",
      "A- (Excellent) AM Best financial strength rating",
      "Competitive pricing across multiple plan types",
    ],
    cons: [
      "Smaller carrier with less name recognition",
      "Attained-age pricing: premiums increase as you age",
      "Limited plan type availability",
    ],
  },
  {
    rank: 4,
    name: "Transamerica",
    badge: "Best Plan Variety",
    score: 4.2,
    planGMonthly: "N/A",
    planNMonthly: "N/A",
    amBest: "A (Excellent)",
    highlight:
      "Transamerica offers all 10 standardized Medigap plan types in New Mexico and has the lowest Plans K ($67/mo), L ($99/mo), and M ($122/mo) in the state. Issue-age pricing keeps rates stable over time. A good choice if you want a budget-friendly plan or the full range of options.",
    pros: [
      "All 10 Medigap plan types available in New Mexico",
      "Lowest Plan K ($67/mo), Plan L ($99/mo), and Plan M ($122/mo)",
      "Issue-age pricing: rate locked at enrollment age",
      "A (Excellent) AM Best financial strength rating",
    ],
    cons: [
      "No standard Plan G available at a competitive rate",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 5,
    name: "United American",
    badge: "Best for Plan Variety and Issue-Age Pricing",
    score: 4.0,
    planGMonthly: "$206",
    planNMonthly: "N/A",
    amBest: "A+ (Superior)",
    highlight:
      "United American offers 9 plan types in New Mexico with the lowest Plan B at $150/mo. Issue-age pricing locks your rate at enrollment age. A+ AM Best rating. A good option if you want Plan B or a carrier with strong financial stability and issue-age pricing.",
    pros: [
      "Lowest Plan B in New Mexico at $150/mo",
      "Issue-age pricing: rate locked at enrollment age",
      "A+ (Superior) AM Best financial strength rating",
      "9 plan types available",
    ],
    cons: [
      "Plan G at $206/mo is below average but not the lowest",
      "No high-deductible Plan G option",
    ],
  },
];

export const STATE_STATS = {
  enrollees: "150,000+",
  carriers: "20+",
  lowestPlanG: "$122/mo",
  avgPlanG: "$219/mo",
  stateAvgPlanN: "$188/mo",
  lowestPlanN: "$87/mo",
  shipPhone: "(800) 432-2080",
};

export const PREMIUM_TABLE = [
  { carrier: "MedMutual Protect", planG: "$122", planN: "$87", planF: "$140" },
  { carrier: "Gov. Personnel Mutual", planG: "$126", planN: "N/A", planF: "N/A" },
  { carrier: "LifeShield National", planG: "$135", planN: "N/A", planF: "N/A" },
  { carrier: "Atlantic Capital", planG: "$136", planN: "N/A", planF: "N/A" },
  { carrier: "State Farm", planG: "$137", planN: "N/A", planF: "N/A" },
  { carrier: "United American", planG: "$206", planN: "N/A", planF: "N/A" },
  { carrier: "Transamerica", planG: "N/A", planN: "N/A", planF: "N/A" },
  { carrier: "AARP / UHC", planG: "N/A", planN: "N/A", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule in New Mexico",
    description:
      "New Mexico does not have a birthday rule. Once your 6-month Open Enrollment Period ends, you will face medical underwriting if you try to switch carriers or plans. Your initial enrollment decision is the most important one you will make.",
  },
  {
    title: "Attained-Age Pricing is the Dominant Method",
    description:
      "Most New Mexico carriers use attained-age pricing, which means your premium increases as you get older. Enrolling at 65 gives you the lowest starting rate, but expect annual increases. Transamerica offers issue-age pricing as an alternative.",
  },
  {
    title: "Open Enrollment Period: 6 Months Starting at 65",
    description:
      "Your Medigap Open Enrollment Period begins the month you turn 65 and enroll in Medicare Part B. During this 6-month window, no carrier can deny you coverage or charge higher rates due to health conditions.",
  },
  {
    title: "Plan F Closed to New Enrollees Since 2020",
    description:
      "Plan F is only available if you were eligible for Medicare before January 1, 2020. New enrollees must choose Plan G (which covers everything except the Part B deductible) or another available plan.",
  },
  {
    title: "Under-65 Medigap Coverage Not Required",
    description:
      "New Mexico does not require carriers to offer Medigap to Medicare beneficiaries under age 65. If you have Medicare due to disability before age 65, you may have limited options and higher premiums.",
  },
  {
    title: "NM Office of Superintendent of Insurance",
    description:
      "The New Mexico OSI at osi.state.nm.us publishes rate comparisons and handles consumer complaints. Call 1-855-427-5674 for help with billing disputes, policy cancellations, or claims delays.",
  },
];

export const SCORING_FACTORS = [
  {
    factor: "Financial Strength (AM Best Rating)",
    weight: "30%",
    description:
      "AM Best ratings from A++ to A- indicate the carrier's ability to pay claims. We weight this heavily because Medigap is a long-term product.",
  },
  {
    factor: "Premium Competitiveness",
    weight: "25%",
    description:
      "Plan G and Plan N rates compared to the New Mexico state average. Lower premiums relative to the market earn higher scores.",
  },
  {
    factor: "Customer Satisfaction and Complaint Ratio",
    weight: "20%",
    description:
      "NAIC complaint index scores and J.D. Power ratings. Lower complaint ratios indicate better claims handling and customer service.",
  },
  {
    factor: "Pricing Method Stability",
    weight: "15%",
    description:
      "Issue-age and community-rated plans score higher than attained-age plans because premiums are more predictable over time.",
  },
  {
    factor: "Plan Availability and Discounts",
    weight: "10%",
    description:
      "Carriers offering more plan types and household discounts (typically 5-7% for two people in the same household) score higher.",
  },
];

export const FAQS = [
  {
    question: "What is the cheapest Medicare Supplement plan in New Mexico?",
    answer:
      "Plan K is the cheapest plan type in New Mexico at $87/mo on average. For comprehensive coverage, Plan G starts at $122/mo (MedMutual Protect) and Plan N starts at $87/mo (MedMutual Protect). The right plan depends on your health needs and budget.",
  },
  {
    question: "Does New Mexico have a birthday rule for Medigap?",
    answer:
      "No. New Mexico does not have a birthday rule. Unlike California, Oregon, and other states that give you an annual window to switch carriers without underwriting, New Mexico follows standard federal rules. Once your Open Enrollment Period ends, you will face health questions if you try to change plans.",
  },
  {
    question: "What is the best Medicare Supplement carrier in New Mexico?",
    answer:
      "For the lowest Plan G premium, MedMutual Protect at $122/mo is the best choice. For the highest financial strength with local agents, State Farm at $137/mo with an A++ rating is the top pick. For Plan N, MedMutual Protect at $87/mo is the price leader.",
  },
  {
    question: "What does Plan G cover in New Mexico?",
    answer:
      "Plan G covers nearly all Medicare out-of-pocket costs: the Part A hospital deductible ($1,736 in 2026), Part A coinsurance, Part B coinsurance (20%), skilled nursing facility coinsurance, and foreign travel emergency coverage. The only cost not covered is the annual Part B deductible ($283 in 2026).",
  },
  {
    question: "Can I switch from Medicare Advantage to Medigap in New Mexico?",
    answer:
      "Yes, but it is harder after your first year on Medicare. During your first 12 months on Medicare Advantage, you have a trial right to switch back to Original Medicare and enroll in Medigap without underwriting. After that, you will generally need to pass medical underwriting unless you qualify for a guaranteed issue right.",
  },
  {
    question: "What is attained-age pricing and why does it matter?",
    answer:
      "Attained-age pricing means your Medigap premium increases as you get older. Most New Mexico carriers use this method. Your premium at age 75 will be significantly higher than at age 65. Issue-age pricing (used by Transamerica) locks your rate at your enrollment age and is generally more favorable long-term.",
  },
  {
    question: "Is MedMutual Protect available throughout New Mexico?",
    answer:
      "MedMutual Protect is available in most New Mexico ZIP codes, but availability can vary. If it is not available in your area, Government Personnel Mutual at $126/mo is the next lowest Plan G option. Always compare rates in your specific ZIP code.",
  },
  {
    question: "How do I get free Medicare counseling in New Mexico?",
    answer:
      "Contact the New Mexico SHIP (State Health Insurance Assistance Program) at (800) 432-2080. SHIP counselors are certified, unbiased, and free. They can help you compare plans, understand your enrollment rights, and navigate the Medicare system.",
  },
];
