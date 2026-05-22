/**
 * North Dakota Medicare Supplement Data
 * Source: MoneyGeek, ND Department of Insurance, FairSquare Medicare, May 2026
 * Key facts: No birthday rule, attained-age pricing dominant,
 *            Atlantic Capital lowest Plan G at $127/mo, Cigna lowest Plan F ($144) and Plan N ($91),
 *            BCBS of ND strong local carrier, Transamerica all 10 plans,
 *            ND SHIC: visit ndshic.com (no toll-free number listed)
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
    name: "Atlantic Capital",
    badge: "Lowest Plan G in North Dakota",
    score: 4.6,
    planGMonthly: "$127",
    planNMonthly: "$95",
    amBest: "A- (Excellent)",
    highlight:
      "Atlantic Capital offers the lowest Plan G in North Dakota at $127/mo, which is 29% below the state average of $178. Plan N at $95/mo is the second-lowest in the state. Atlantic Capital also offers a high-deductible Plan G option for budget-conscious enrollees.",
    pros: [
      "Lowest Plan G in North Dakota at $127/mo (29% below average)",
      "Second-lowest Plan N at $95/mo",
      "High-deductible Plan G option available",
      "A- (Excellent) AM Best financial strength rating",
    ],
    cons: [
      "Attained-age pricing: premiums increase as you age",
      "Only offers Plans A, F, G, K, and N",
      "No high-deductible Plan F",
    ],
  },
  {
    rank: 2,
    name: "Cigna",
    badge: "Lowest Plan F and Plan N",
    score: 4.3,
    planGMonthly: "$139",
    planNMonthly: "$91",
    amBest: "A (Excellent)",
    highlight:
      "Cigna offers the lowest Plan F in North Dakota at $144/mo (38% below average) and the lowest Plan N at $91/mo (33% below average). Plan G at $139/mo is also competitive. Cigna only offers Plans A, F, G, and N, but it is the price leader in all three of the most popular plan types.",
    pros: [
      "Lowest Plan F in North Dakota at $144/mo",
      "Lowest Plan N in North Dakota at $91/mo",
      "Competitive Plan G at $139/mo",
      "A (Excellent) AM Best financial strength rating",
    ],
    cons: [
      "Only offers Plans A, F, G, and N",
      "Attained-age pricing: premiums increase as you age",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 3,
    name: "Blue Cross Blue Shield of North Dakota",
    badge: "Best Local Carrier",
    score: 4.5,
    planGMonthly: "$180",
    planNMonthly: "N/A",
    amBest: "A (Excellent)",
    highlight:
      "BCBS of North Dakota is the dominant local carrier with the lowest Plan A ($114/mo) and Plan C ($212/mo) in the state. As the largest insurer in North Dakota, BCBS has the widest provider network and strong name recognition. Plan G at $180/mo is above average but comes with local service and network advantages.",
    pros: [
      "Largest insurer in North Dakota with widest provider network",
      "Lowest Plan A at $114/mo and Plan C at $212/mo",
      "A (Excellent) AM Best financial strength rating",
      "Strong local customer service",
    ],
    cons: [
      "Plan G at $180/mo is above average",
      "Does not offer Plans B, D, K, or M",
      "Attained-age pricing: premiums increase as you age",
    ],
  },
  {
    rank: 4,
    name: "State Farm",
    badge: "Best for Financial Strength",
    score: 4.4,
    planGMonthly: "$160",
    planNMonthly: "N/A",
    amBest: "A++ (Superior)",
    highlight:
      "State Farm earns the highest possible AM Best rating (A++) and offers local agents across Fargo, Bismarck, Grand Forks, and rural North Dakota. State Farm has the lowest Plan D at $160/mo in the state. Plan G at $160/mo is competitive and comes with in-person service.",
    pros: [
      "A++ (Superior) AM Best rating, highest in the industry",
      "Local agents across North Dakota for in-person service",
      "Lowest Plan D at $160/mo",
      "Competitive Plan G at $160/mo",
    ],
    cons: [
      "Does not offer Plans K, L, or M",
      "Attained-age pricing: premiums increase as you age",
      "No high-deductible Plan G option",
    ],
  },
  {
    rank: 5,
    name: "Transamerica",
    badge: "Best Plan Variety",
    score: 4.2,
    planGMonthly: "$168",
    planNMonthly: "N/A",
    amBest: "A (Excellent)",
    highlight:
      "Transamerica is the only carrier in North Dakota offering all 10 standardized Medigap plan types. It offers the lowest Plan K ($75/mo) and Plan L ($111/mo) in the state. Issue-age pricing keeps rates stable over time.",
    pros: [
      "Only carrier with all 10 Medigap plan types in North Dakota",
      "Lowest Plan K at $75/mo and Plan L at $111/mo",
      "Issue-age pricing: rate locked at enrollment age",
      "A (Excellent) AM Best financial strength rating",
    ],
    cons: [
      "Plan G at $168/mo is below average but not the lowest",
      "No high-deductible Plan G option",
    ],
  },
];

export const STATE_STATS = {
  enrollees: "65,000+",
  carriers: "15+",
  lowestPlanG: "$127/mo",
  avgPlanG: "$178/mo",
  stateAvgPlanN: "$136/mo",
  lowestPlanN: "$91/mo",
  shipPhone: "ndshic.com",
};

export const PREMIUM_TABLE = [
  { carrier: "Atlantic Capital", planG: "$127", planN: "$95", planF: "$149" },
  { carrier: "Cigna", planG: "$139", planN: "$91", planF: "$144" },
  { carrier: "State Farm", planG: "$160", planN: "N/A", planF: "N/A" },
  { carrier: "Gov. Personnel Mutual", planG: "$161", planN: "$105", planF: "N/A" },
  { carrier: "LifeShield National", planG: "$164", planN: "N/A", planF: "$197" },
  { carrier: "USAA*", planG: "$165", planN: "N/A", planF: "N/A" },
  { carrier: "AFLAC", planG: "$166", planN: "$111", planF: "$189" },
  { carrier: "Transamerica", planG: "$168", planN: "N/A", planF: "N/A" },
  { carrier: "BCBS of ND", planG: "$180", planN: "N/A", planF: "N/A" },
];

export const STATE_RULES = [
  {
    title: "No Birthday Rule in North Dakota",
    description:
      "North Dakota does not have a birthday rule. Once your 6-month Open Enrollment Period ends, you will face medical underwriting if you try to switch carriers or plans. Your initial enrollment decision is the most important one you will make.",
  },
  {
    title: "Attained-Age Pricing is the Dominant Method",
    description:
      "Most North Dakota carriers use attained-age pricing, which means your premium increases as you get older. Transamerica is a notable exception, offering issue-age pricing that locks your rate at enrollment age.",
  },
  {
    title: "Open Enrollment Period: 6 Months Starting at 65",
    description:
      "Your Medigap Open Enrollment Period begins the month you turn 65 and enroll in Medicare Part B. During this 6-month window, no carrier can deny you coverage or charge higher rates due to health conditions.",
  },
  {
    title: "Plan F Closed to New Enrollees Since 2020",
    description:
      "Plan F is only available if you were eligible for Medicare before January 1, 2020. New enrollees must choose Plan G or another available plan.",
  },
  {
    title: "Under-65 Medigap Coverage Not Required",
    description:
      "North Dakota does not require carriers to offer Medigap to Medicare beneficiaries under age 65. If you have Medicare due to disability before age 65, you may have limited options and higher premiums.",
  },
  {
    title: "ND SHIC Free Counseling Available",
    description:
      "The North Dakota Senior Health Insurance Counseling Program (ND SHIC) offers free, unbiased Medicare guidance from certified volunteers. Visit ndshic.com to find a counselor in your area.",
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
      "Plan G and Plan N rates compared to the North Dakota state average. Lower premiums relative to the market earn higher scores.",
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
    question: "What is the cheapest Medicare Supplement plan in North Dakota?",
    answer:
      "Plan K is the cheapest plan type in North Dakota at $84/mo on average. For comprehensive coverage, Plan G starts at $127/mo (Atlantic Capital) and Plan N starts at $91/mo (Cigna). The right plan depends on your health needs and budget.",
  },
  {
    question: "Does North Dakota have a birthday rule for Medigap?",
    answer:
      "No. North Dakota does not have a birthday rule. Unlike California, Oregon, and other states that give you an annual window to switch carriers without underwriting, North Dakota follows standard federal rules. Once your Open Enrollment Period ends, you will face health questions if you try to change plans.",
  },
  {
    question: "What is the best Medicare Supplement carrier in North Dakota?",
    answer:
      "For the lowest Plan G premium, Atlantic Capital at $127/mo is the best choice. For the lowest Plan N and Plan F, Cigna at $91/mo and $144/mo respectively are the price leaders. For the highest financial strength with local agents, State Farm at $160/mo with an A++ rating is the top pick.",
  },
  {
    question: "Is BCBS of North Dakota a good Medigap option?",
    answer:
      "Yes. BCBS of North Dakota is the largest insurer in the state with the widest provider network. Plan G at $180/mo is above average, but BCBS offers the lowest Plan A ($114/mo) and Plan C ($212/mo). It is a strong choice if you value local service and network breadth over the lowest premium.",
  },
  {
    question: "What does Plan G cover in North Dakota?",
    answer:
      "Plan G covers nearly all Medicare out-of-pocket costs: the Part A hospital deductible ($1,736 in 2026), Part A coinsurance, Part B coinsurance (20%), skilled nursing facility coinsurance, and foreign travel emergency coverage. The only cost not covered is the annual Part B deductible ($283 in 2026).",
  },
  {
    question: "Can I switch from Medicare Advantage to Medigap in North Dakota?",
    answer:
      "Yes, but it is harder after your first year on Medicare. During your first 12 months on Medicare Advantage, you have a trial right to switch back to Original Medicare and enroll in Medigap without underwriting. After that, you will generally need to pass medical underwriting unless you qualify for a guaranteed issue right.",
  },
  {
    question: "What is attained-age pricing and why does it matter?",
    answer:
      "Attained-age pricing means your Medigap premium increases as you get older. Most North Dakota carriers use this method. Your premium at age 75 will be significantly higher than at age 65. Transamerica offers issue-age pricing, which locks your rate at your enrollment age and is generally more favorable long-term.",
  },
  {
    question: "How do I get free Medicare counseling in North Dakota?",
    answer:
      "The North Dakota Senior Health Insurance Counseling Program (ND SHIC) offers free, unbiased Medicare guidance from certified volunteers. Visit ndshic.com to find a counselor in your area. The ND Department of Insurance also publishes rate comparisons and handles consumer complaints.",
  },
];
