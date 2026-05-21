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

export const STATE_NAME = "Georgia";
export const STATE_ABBR = "GA";
export const SAMPLE_CITY = "Atlanta";

export const STATE_STATS = {
  enrollees: "372,500+",
  lowestPlanG: "$118/mo",
  carriers: "30+",
  medicareTotal: "1.9M",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "State Farm",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A++",
    planGMonthly: "$148",
    planNMonthly: "$107",
    pros: [
      "Highest financial strength rating (A++) in the industry",
      "Local agent network across Georgia — Atlanta, Savannah, Augusta",
      "Exceptional claims satisfaction and customer service",
      "Issue-age pricing available — premiums don't rise with age",
      "Household discount up to 10% when two people enroll",
    ],
    cons: [
      "Premiums higher than budget carriers by $20–30/mo",
      "Must apply through a local State Farm agent",
      "Not available in every Georgia zip code",
    ],
    highlight:
      "State Farm's A++ AM Best rating and Georgia-wide agent network make it the most trusted choice for Medigap in the Peach State.",
  },
  {
    rank: 2,
    name: "AARP / UnitedHealthcare",
    badge: "Best Plan Availability",
    score: 4.7,
    amBest: "A",
    planGMonthly: "$152",
    planNMonthly: "$112",
    pros: [
      "Largest Medigap insurer in Georgia by enrollment",
      "Full plan alphabet: A, B, C, D, F, G, K, L, M, N",
      "AARP membership perks included with enrollment",
      "Community-rated pricing in select markets — no age increases",
      "24/7 nurse line and wellness programs included",
    ],
    cons: [
      "Premiums among the higher end in Georgia",
      "AARP membership required ($16/year)",
      "Rate increases have outpaced some competitors historically",
    ],
    highlight:
      "UnitedHealthcare is Georgia's largest Medigap insurer, offering the widest plan selection and strong community-rated options in metro Atlanta.",
  },
  {
    rank: 3,
    name: "Mutual of Omaha",
    badge: "Best for Discounts",
    score: 4.5,
    amBest: "A+",
    planGMonthly: "$145",
    planNMonthly: "$104",
    pros: [
      "Household discount up to 12% — best in class",
      "Electronic funds transfer (EFT) discount available",
      "A+ AM Best rating — excellent financial stability",
      "High-Deductible Plan G available at ~$45/mo",
      "Strong customer service reputation in Southeast",
    ],
    cons: [
      "Premiums increase with age (attained-age rating)",
      "Fewer local Georgia agents than State Farm",
      "Online enrollment not available — must call or use agent",
    ],
    highlight:
      "Mutual of Omaha's 12% household discount is the best available in Georgia — ideal for couples enrolling together.",
  },
  {
    rank: 4,
    name: "Humana",
    badge: "Best Local Presence",
    score: 4.3,
    amBest: "A-",
    planGMonthly: "$135",
    planNMonthly: "$97",
    pros: [
      "Strong Georgia market presence — especially metro Atlanta",
      "SilverSneakers fitness benefit included",
      "Competitive premiums — $135/mo Plan G in Atlanta",
      "Online enrollment available",
      "Dental/vision bundles available alongside Medigap",
    ],
    cons: [
      "A- AM Best rating — lower than top competitors",
      "Complaint ratio slightly above average nationally",
      "SilverSneakers benefit can be removed at renewal",
    ],
    highlight:
      "Humana's strong Georgia footprint and SilverSneakers benefit make it a popular choice for active Atlanta-area retirees.",
  },
  {
    rank: 5,
    name: "Wellabe",
    badge: "Best Budget Option",
    score: 4.1,
    amBest: "A-",
    planGMonthly: "$126",
    planNMonthly: "$91",
    pros: [
      "Among the lowest Plan G premiums in Georgia — $126/mo",
      "Stable rate history with modest annual increases",
      "A- AM Best rating — solid financial standing",
      "Simple online application process",
      "Good option for healthy enrollees focused on cost",
    ],
    cons: [
      "Smaller carrier — less name recognition than national brands",
      "Limited Georgia agent network",
      "Fewer plan types available compared to AARP/UHC",
    ],
    highlight:
      "Wellabe offers the best balance of low premiums and stable rate history in Georgia — a smart pick for budget-conscious enrollees.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Cigna / HealthSpring", planG: "$118", planN: "$84", planF: "$133" },
  { carrier: "NHIC", planG: "$120", planN: "$86", planF: "$144" },
  { carrier: "Bankers Fidelity", planG: "$129", planN: "$92", planF: "$149" },
  { carrier: "Wellabe", planG: "$126", planN: "$91", planF: "N/A" },
  { carrier: "Humana", planG: "$135", planN: "$97", planF: "$157" },
  { carrier: "Mutual of Omaha", planG: "$145", planN: "$104", planF: "$162" },
  { carrier: "AARP / UnitedHealthcare", planG: "$152", planN: "$112", planF: "$171" },
  { carrier: "State Farm", planG: "$148", planN: "$107", planF: "N/A" },
];

export const PLAN_COMPARISON = {
  planG: {
    monthlyPremium: "$118–$152",
    annualDeductible: "$257 (Part B only)",
    partADeductible: "Covered",
    partBExcess: "Covered",
    foreignTravel: "80% (up to limits)",
    bestFor: "Comprehensive coverage with predictable costs",
  },
  planN: {
    monthlyPremium: "$84–$112",
    annualDeductible: "$257 (Part B only)",
    partADeductible: "Covered",
    partBExcess: "NOT covered",
    foreignTravel: "80% (up to limits)",
    bestFor: "Lower premiums; comfortable with small copays",
  },
};

export const STATE_RULES = [
  {
    title: "No Birthday or Anniversary Rule",
    description:
      "Unlike California or Missouri, Georgia does not have a birthday rule or anniversary rule. Your guaranteed-issue window is your 6-month Open Enrollment Period when you first enroll in Medicare Part B at age 65. After that window closes, insurers can use medical underwriting to deny coverage or charge higher premiums.",
  },
  {
    title: "Under-65 Coverage Required",
    description:
      "Georgia law requires Medigap insurers to offer coverage to Medicare beneficiaries under age 65 who qualify due to disability or End-Stage Renal Disease (ESRD). Premiums for under-65 enrollees are typically 2–3x higher than standard rates.",
  },
  {
    title: "Attained-Age Rating Standard",
    description:
      "Most Georgia Medigap policies use attained-age rating, meaning premiums increase as you get older. Issue-age policies (premiums locked at your age when you enrolled) are available from select carriers and may save money long-term.",
  },
  {
    title: "Georgia Insurance Commissioner Regulates",
    description:
      "The Georgia Office of Insurance and Safety Fire Commissioner oversees all Medigap policies sold in the state. Carriers must file rate changes and receive approval before implementing increases.",
  },
  {
    title: "Free Counseling via Georgia SHIP",
    description:
      "Georgia's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-669-8387 or visit aging.georgia.gov/georgia-ship to speak with a trained volunteer counselor.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and J.D. Power scores" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. Georgia market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Georgia" },
  { factor: "Discounts & Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Georgia for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan in Georgia for new enrollees. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($257 in 2026). For the best overall value, State Farm (A++ rated) and Mutual of Omaha (A+ rated) consistently rank highest in Georgia for financial strength and customer satisfaction.",
  },
  {
    question: "Does Georgia have a birthday rule for Medigap?",
    answer:
      "No. Georgia does not have a birthday rule or anniversary rule. Unlike California (birthday rule) or Missouri (anniversary rule), Georgia only guarantees your right to enroll in any Medigap plan without medical underwriting during your 6-month Open Enrollment Period when you first turn 65 and enroll in Medicare Part B. After that window, insurers can deny coverage based on health conditions.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Georgia?",
    answer:
      "Plan G premiums in Georgia range from approximately $118/mo to $152/mo for a 65-year-old female nonsmoker in Atlanta. Premiums vary by carrier, zip code, age, gender, and tobacco use. Savannah and Augusta tend to have slightly different rates than metro Atlanta. The cheapest option is Cigna/HealthSpring at $118/mo, though Wellabe at $126/mo offers better value with a lower complaint ratio.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Georgia?",
    answer:
      "Plan G covers nearly everything except the $257 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for office visits and $50 for emergency room visits, and does not cover Part B excess charges. Plan N premiums run $84–$112/mo in Georgia vs. $118–$152/mo for Plan G. If you rarely visit doctors and your providers don't charge excess fees, Plan N can save $300–$500/year.",
  },
  {
    question: "Can I get Medicare Supplement insurance in Georgia if I'm under 65?",
    answer:
      "Yes. Georgia law requires Medigap insurers to offer coverage to Medicare beneficiaries under age 65 who qualify due to disability or End-Stage Renal Disease (ESRD). However, premiums for under-65 enrollees are typically 2–3 times higher than standard rates, and not all carriers participate. Contact Georgia SHIP at 1-800-669-8387 for guidance on under-65 options.",
  },
  {
    question: "When is the best time to enroll in Medigap in Georgia?",
    answer:
      "The best time is during your 6-month Medigap Open Enrollment Period, which starts the month you turn 65 and are enrolled in Medicare Part B. During this window, no insurer can deny you coverage or charge higher premiums based on health conditions. Enrolling during this period guarantees the lowest possible premiums and full plan availability.",
  },
  {
    question: "Which Medicare Supplement carriers have the best rates in Atlanta?",
    answer:
      "For Atlanta-area Plan G rates (65F nonsmoker), the most competitive carriers are Cigna/HealthSpring ($118/mo), NHIC ($120/mo), Bankers Fidelity ($129/mo), and Wellabe ($126/mo). For the best combination of price and quality, Wellabe at $126/mo offers stable rate history with a better complaint record than the cheapest options.",
  },
  {
    question: "What is Georgia SHIP and how can it help me?",
    answer:
      "Georgia SHIP (State Health Insurance Assistance Program) is a free, state-funded counseling service that helps Medicare beneficiaries navigate their options. SHIP counselors are unbiased volunteers — they don't sell insurance — and can help you compare Medigap plans, understand your rights, and avoid scams. Call 1-800-669-8387 or visit aging.georgia.gov/georgia-ship to schedule a free consultation.",
  },
];
