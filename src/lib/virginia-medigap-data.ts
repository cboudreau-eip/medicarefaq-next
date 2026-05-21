/**
 * Virginia Medicare Supplement (Medigap) Data
 * Source: FairSquare Medicare, Senior65, Virginia SCC, CMS Plan Finder
 * Last updated: May 2026
 * NOTE: Virginia birthday rule effective July 1, 2025
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

export const STATE_NAME = "Virginia";
export const STATE_ABBR = "VA";
export const SAMPLE_CITY = "Richmond";

export const STATE_STATS = {
  enrollees: "400,000+",
  lowestPlanG: "$100/mo",
  carriers: "30+",
  medicareTotal: "1.7M",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "State Farm",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A++",
    planGMonthly: "$148",
    planNMonthly: "$108",
    highlight:
      "State Farm earns the top spot in Virginia for its unmatched A++ AM Best rating, far-fewer-than-expected complaint ratio, and extensive local agent network across Richmond, Northern Virginia, and Virginia Beach. The best choice for enrollees who want financial strength and face-to-face service.",
    pros: [
      "A++ AM Best — highest possible financial strength rating",
      "Far-fewer-than-expected NAIC complaint ratio",
      "Extensive local agent network throughout Virginia",
      "Consistent rate history with modest annual increases",
      "Household discount available (up to 10%)",
    ],
    cons: [
      "Premiums are higher than budget carriers by $30–50/mo",
      "Must apply through a local State Farm agent",
      "Not available in every Virginia ZIP code",
    ],
  },
  {
    rank: 2,
    name: "AARP / UnitedHealthcare",
    badge: "Best Plan Availability",
    score: 4.7,
    amBest: "A",
    planGMonthly: "$152",
    planNMonthly: "$113",
    highlight:
      "AARP/UHC is the largest Medigap carrier in Virginia by enrollment and offers the widest range of plans. The AARP membership brand is widely recognized, and UHC's national network provides strong continuity of care for Virginia retirees who travel — especially the large federal employee and military retiree population in Northern Virginia.",
    pros: [
      "Largest Medigap carrier in Virginia by enrollment",
      "Widest plan selection including Plan G, N, F, K, L, M",
      "Strong national network — ideal for travelers and snowbirds",
      "AARP membership benefits included",
      "Online enrollment available",
    ],
    cons: [
      "AARP membership required ($16/year)",
      "Complaint ratio slightly above average nationally",
      "Premiums among the higher end in Virginia",
    ],
  },
  {
    rank: 3,
    name: "Mutual of Omaha",
    badge: "Best Customer Service",
    score: 4.5,
    amBest: "A+",
    planGMonthly: "$143",
    planNMonthly: "$103",
    highlight:
      "Mutual of Omaha is a perennial top performer for customer satisfaction and financial stability. Its Virginia premiums are competitive in the mid-range, and it offers a strong household discount. A solid choice for enrollees who prioritize claims handling and service quality.",
    pros: [
      "A+ AM Best financial strength rating",
      "Consistently high customer satisfaction scores",
      "Household discount up to 12%",
      "Competitive mid-range premiums in Virginia",
      "Strong claims processing reputation",
    ],
    cons: [
      "Not the cheapest option in Virginia",
      "Fewer local agents than State Farm",
      "Online enrollment not available — must call or use agent",
    ],
  },
  {
    rank: 4,
    name: "Humana",
    badge: "Best for Active Retirees",
    score: 4.3,
    amBest: "A-",
    planGMonthly: "$106",
    planNMonthly: "$77",
    highlight:
      "Humana offers some of the most competitive Plan G premiums in Virginia at $106/mo in Richmond — among the lowest of any nationally-recognized carrier. SilverSneakers fitness benefits are included with select plans, making Humana a strong pick for active Virginia retirees.",
    pros: [
      "Highly competitive premiums — $106/mo Plan G in Richmond",
      "SilverSneakers fitness benefit included with select plans",
      "Strong Virginia market presence",
      "Online enrollment available",
      "A- AM Best financial strength rating",
    ],
    cons: [
      "A- AM Best rating — lower than top competitors",
      "Complaint ratio slightly above average nationally",
      "SilverSneakers benefit can be removed at renewal",
    ],
  },
  {
    rank: 5,
    name: "Wellabe (formerly Great Western / Medico)",
    badge: "Best Budget Option",
    score: 4.1,
    amBest: "A-",
    planGMonthly: "$124",
    planNMonthly: "$89",
    highlight:
      "Wellabe offers strong budget value in Virginia with a cleaner complaint record than the cheapest carriers. A smart pick for enrollees who want affordable coverage without the complaint risk of NHIC or Cigna at the very bottom of the price range.",
    pros: [
      "Competitive Plan G premiums in Virginia",
      "Better complaint record than cheapest carriers",
      "A- AM Best financial strength",
      "Household discount available",
      "Stable rate history",
    ],
    cons: [
      "Less brand recognition than national carriers",
      "Fewer local agents in rural Virginia",
      "Rate increases can be less predictable",
    ],
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "NHIC", planG: "$100", planN: "$72", planF: "$119" },
  { carrier: "Physicians Select", planG: "$103", planN: "$75", planF: "$122" },
  { carrier: "Humana", planG: "$106", planN: "$77", planF: "$126" },
  { carrier: "Bankers Fidelity", planG: "$110", planN: "$80", planF: "$131" },
  { carrier: "Cigna / HealthSpring", planG: "$113", planN: "$82", planF: "$134" },
  { carrier: "Wellabe", planG: "$124", planN: "$89", planF: "N/A" },
  { carrier: "Mutual of Omaha", planG: "$143", planN: "$103", planF: "$161" },
  { carrier: "State Farm", planG: "$148", planN: "$108", planF: "N/A" },
  { carrier: "AARP / UnitedHealthcare", planG: "$152", planN: "$113", planF: "$172" },
];

export const PLAN_COMPARISON = {
  planG: {
    monthlyPremium: "$100–$152",
    annualDeductible: "$257 (Part B only)",
    partADeductible: "Covered",
    partBExcess: "Covered",
    foreignTravel: "80% (up to limits)",
    bestFor: "Comprehensive coverage with predictable costs",
  },
  planN: {
    monthlyPremium: "$72–$113",
    annualDeductible: "$257 (Part B only)",
    partADeductible: "Covered",
    partBExcess: "NOT covered",
    foreignTravel: "80% (up to limits)",
    bestFor: "Lower premiums; comfortable with small copays",
  },
};

export const STATE_RULES = [
  {
    title: "Virginia Birthday Rule (Effective July 1, 2025)",
    description:
      "Virginia enacted a birthday rule effective July 1, 2025. If you already have a Medigap policy in Virginia, you get a 60-day open enrollment window each year starting on your birthday. During this window, you can switch to any carrier offering the same standardized plan letter — without medical underwriting. Important: you can only switch to the same plan letter (e.g., Plan G to Plan G). You cannot downgrade to a lesser plan or upgrade to a richer plan using this rule.",
  },
  {
    title: "How Virginia's Birthday Rule Differs from California's",
    description:
      "California's birthday rule allows switching to an equal or lesser plan — meaning a Plan G enrollee can switch to Plan N without underwriting. Virginia's rule is more restrictive: you can only switch to the same plan letter. A Plan G enrollee can switch to another carrier's Plan G, but cannot move to Plan N using the birthday rule. To downgrade, you would need to pass medical underwriting.",
  },
  {
    title: "Birthday Rule Reminder Letters Required",
    description:
      "Virginia law requires your current Medigap carrier to send you a reminder letter 15 to 30 days before your birthday window opens. Watch your mailbox each year. If you miss the 60-day window, you can use the birthday rule again next year — or switch outside the window by passing medical underwriting.",
  },
  {
    title: "6-Month Open Enrollment Period",
    description:
      "Your Medigap Open Enrollment Period is a one-time 6-month window that starts the first month you are 65 or older and enrolled in Medicare Part B. During this period, carriers cannot deny you coverage or charge more due to pre-existing conditions. This is separate from the annual birthday rule window and applies to first-time Medigap enrollees.",
  },
  {
    title: "Attained-Age Rating Standard",
    description:
      "Most Virginia Medigap policies use attained-age rating, meaning premiums increase as you get older. Issue-age policies (premiums locked at your enrollment age) are available from select carriers and may save money long-term. Enrolling during your OEP at age 65 locks in the lowest possible starting rate.",
  },
  {
    title: "Free Counseling via VICAP (Virginia SHIP)",
    description:
      "Virginia's Insurance Counseling and Assistance Program (VICAP) — part of the national SHIP network — provides free, unbiased Medicare counseling from trained volunteers. VICAP counselors can help you compare Medigap plans, understand the birthday rule, and navigate enrollment. Call 1-800-552-3402 to speak with a counselor.",
  },
  {
    title: "Regulated by Virginia State Corporation Commission",
    description:
      "All Medigap plans in Virginia are regulated by the Virginia State Corporation Commission (SCC). The SCC maintains a Medigap Premium Finder tool at scc.virginia.gov/medigap where you can compare official premiums from all licensed carriers. Virginia enforces a 30-day free-look period on new policies.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and J.D. Power scores" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. Virginia market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Virginia" },
  { factor: "Discounts & Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "Does Virginia have a Medigap birthday rule?",
    answer:
      "Yes. Virginia enacted a Medigap birthday rule effective July 1, 2025. If you already have a Medigap policy in Virginia, you get a 60-day open enrollment window each year starting on your birthday. During this window, you can switch to any carrier offering the same standardized plan letter without medical underwriting. You cannot downgrade or upgrade plans using this rule — only switch to the same plan letter with a different carrier.",
  },
  {
    question: "How does Virginia's birthday rule differ from California's?",
    answer:
      "California's birthday rule allows switching to an equal or lesser plan — so a Plan G enrollee can switch to Plan N without underwriting. Virginia's rule is more restrictive: you can only switch to the same plan letter. A Virginia Plan G enrollee can move to another carrier's Plan G, but cannot downgrade to Plan N using the birthday rule. To change plan letters, you would need to pass medical underwriting.",
  },
  {
    question: "What is the best Medicare Supplement plan in Virginia for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan for new enrollees in Virginia. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($257 in 2026). State Farm (A++ rated) is our top overall pick in Virginia, while Humana at $106/mo offers the best value among nationally-recognized carriers.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Virginia?",
    answer:
      "Plan G premiums in Virginia start at approximately $100/mo in Richmond for a 65-year-old female nonsmoker (NHIC). Humana offers Plan G at $106/mo with a strong local presence. Northern Virginia (DC suburbs) rates may differ slightly from Richmond. Premiums vary by carrier, ZIP code, age, gender, and tobacco use.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Virginia?",
    answer:
      "Plan G covers nearly everything except the $257 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for office visits and $50 for ER visits, and does not cover Part B excess charges. Plan N premiums run $72–$113/mo in Virginia vs. $100–$152/mo for Plan G. If you rarely visit doctors and your providers don't charge excess fees, Plan N can save $300–$500/year.",
  },
  {
    question: "When is the best time to enroll in Medigap in Virginia?",
    answer:
      "The best time is during your 6-month Medigap Open Enrollment Period, which starts the month you turn 65 and are enrolled in Medicare Part B. During this window, no insurer can deny you coverage or charge higher premiums based on health conditions. After your OEP, you can use Virginia's birthday rule each year to switch carriers (same plan letter only) without underwriting.",
  },
  {
    question: "Which Medicare Supplement carriers are available in Virginia?",
    answer:
      "Virginia has over 30 Medigap carriers licensed in the state. The largest by enrollment include AARP/UnitedHealthcare, State Farm, Mutual of Omaha, Humana, and Cigna/HealthSpring. The Virginia SCC maintains a Medigap Premium Finder at scc.virginia.gov/medigap where you can compare official premiums from all licensed carriers.",
  },
  {
    question: "What is VICAP and how can it help me?",
    answer:
      "VICAP (Virginia Insurance Counseling and Assistance Program) is Virginia's SHIP program — a free, state-funded counseling service that helps Medicare beneficiaries navigate their options. VICAP counselors are unbiased volunteers who don't sell insurance. They can help you compare Medigap plans, understand Virginia's birthday rule, and navigate enrollment. Call 1-800-552-3402 for a free consultation.",
  },
];
