// Missouri Medicare Supplement (Medigap) Data — 2026
// Key differentiator: Anniversary Rule (tied to policy enrollment date, not birthday)

export const missouriStats = {
  state: "Missouri",
  stateAbbr: "MO",
  medicareEnrollees: "1.3M+",
  medigapEnrollees: "~350,000",
  lowestPlanG: "$108/mo",
  lowestPlanN: "$79/mo",
  totalCarriers: "25+",
  anniversaryRule: true,
  birthdayRule: false,
  ratingType: "Attained-age (most carriers)",
  regulator: "Missouri Department of Commerce and Insurance (MDCI)",
  shipProgram: "CLAIM (Community Leaders Assisting the Insured of Missouri)",
  shipPhone: "1-800-390-3330",
};

export interface MoCarrier {
  rank: number;
  name: string;
  score: number;
  badge: string;
  badgeColor: "teal" | "navy" | "amber" | "green" | "indigo";
  planGMonthly: string;
  planNMonthly: string;
  amBestRating: string;
  complaintRatio: "Low" | "Average" | "High";
  pros: string[];
  cons: string[];
  highlight: string;
}

export const missouriCarriers: MoCarrier[] = [
  {
    rank: 1,
    name: "Mutual of Omaha",
    score: 4.9,
    badge: "Best Overall",
    badgeColor: "teal",
    planGMonthly: "$131/mo",
    planNMonthly: "$96/mo",
    amBestRating: "A+",
    complaintRatio: "Low",
    pros: [
      "A+ AM Best financial strength — highest available rating",
      "Headquartered in Omaha, NE — deep Midwest roots and strong MO agent network",
      "Consistently low complaint ratio year over year",
      "Excellent U.S.-based customer service (no overseas call centers)",
      "Offers both attained-age and issue-age rated plans in Missouri",
      "Leading carrier for High-Deductible Plan G in the Midwest",
    ],
    cons: [
      "Not the cheapest Plan G in Missouri — mid-range pricing",
      "Rate increases can be above average in some Missouri ZIP codes",
    ],
    highlight:
      "Mutual of Omaha's proximity to Kansas City and deep Midwest roots make it the top-rated carrier in Missouri. A+ financial strength and consistently low complaint ratios set the standard.",
  },
  {
    rank: 2,
    name: "AARP / UnitedHealthcare",
    score: 4.7,
    badge: "Best Plan Availability",
    badgeColor: "navy",
    planGMonthly: "$139/mo",
    planNMonthly: "$103/mo",
    amBestRating: "A",
    complaintRatio: "Low",
    pros: [
      "Largest Medigap insurer in Missouri by enrollment",
      "AARP brand recognition drives trust among seniors 50+",
      "Offers Plan G, Plan N, Plan F (legacy), and High-Deductible Plan G",
      "Household discount available for couples",
      "Strong digital tools — online claims, ID cards, and account management",
    ],
    cons: [
      "Premiums are above the Missouri median for Plan G",
      "AARP membership required ($16/year) to enroll",
      "Rate increases have been above average in recent years",
    ],
    highlight:
      "AARP/UHC is the most widely held Medigap plan in Missouri. The brand trust and plan breadth make it a solid choice, though premiums run higher than competitors.",
  },
  {
    rank: 3,
    name: "Cigna / HealthSpring",
    score: 4.4,
    badge: "Best for Low Premiums",
    badgeColor: "amber",
    planGMonthly: "$108/mo",
    planNMonthly: "$79/mo",
    amBestRating: "A",
    complaintRatio: "High",
    pros: [
      "Lowest Plan G premiums in Missouri — $108/mo in Kansas City for 65F nonsmoker",
      "Lowest Plan N premiums in Missouri — $79/mo",
      "A financial strength rating from AM Best",
      "Available statewide in Missouri",
    ],
    cons: [
      "Higher-than-expected complaint ratio — well above the national median",
      "Customer service quality inconsistent compared to top-rated carriers",
      "Rate increases have been unpredictable in some Missouri markets",
      "Lower brand recognition among Missouri seniors vs. Mutual of Omaha or AARP",
    ],
    highlight:
      "Cigna offers the lowest Plan G premiums in Missouri, but the higher complaint ratio is a real concern. Best for budget-conscious enrollees who are comfortable monitoring their coverage.",
  },
  {
    rank: 4,
    name: "State Farm",
    score: 4.5,
    badge: "Best Agent Network",
    badgeColor: "green",
    planGMonthly: "$127/mo",
    planNMonthly: "$94/mo",
    amBestRating: "A++",
    complaintRatio: "Low",
    pros: [
      "A++ AM Best rating — highest possible financial strength",
      "Extensive local agent network across Missouri (Bloomington, IL HQ is nearby)",
      "Lowest complaint ratio among all Missouri carriers",
      "Strong multi-line discount if you already have State Farm auto or home",
      "Excellent in-person service for seniors who prefer face-to-face guidance",
    ],
    cons: [
      "Premiums are mid-to-high range for Missouri",
      "Fewer plan options than national carriers (primarily Plan G and Plan N)",
      "Must work through a local agent — no direct online enrollment",
    ],
    highlight:
      "State Farm's A++ financial strength and lowest complaint ratio make it a top pick for Missouri seniors who value in-person agent relationships and long-term stability.",
  },
  {
    rank: 5,
    name: "Wellabe (formerly CUNA Mutual)",
    score: 4.2,
    badge: "Best Budget Value",
    badgeColor: "indigo",
    planGMonthly: "$119/mo",
    planNMonthly: "$87/mo",
    amBestRating: "A-",
    complaintRatio: "Average",
    pros: [
      "Strong mid-range pricing — $119/mo Plan G is well below AARP/UHC",
      "Better complaint ratio than Cigna at a similar price point",
      "Available statewide in Missouri",
      "Good fit for Missouri seniors using the Anniversary Rule to shop annually",
    ],
    cons: [
      "A- AM Best rating — slightly lower than top-tier carriers",
      "Less brand recognition than Mutual of Omaha or AARP",
      "Limited digital tools compared to larger national carriers",
    ],
    highlight:
      "Wellabe hits the sweet spot between price and quality in Missouri. At $119/mo for Plan G, it's significantly cheaper than AARP/UHC while maintaining a better complaint record than Cigna.",
  },
];

export const missouriPremiumTable = {
  city: "Kansas City",
  profile: "65-year-old female, nonsmoker",
  year: 2026,
  rows: [
    { carrier: "Cigna / HealthSpring", planG: "$108", planN: "$79", planF: "$189" },
    { carrier: "Wellabe", planG: "$119", planN: "$87", planF: "N/A" },
    { carrier: "State Farm", planG: "$127", planN: "$94", planF: "N/A" },
    { carrier: "Mutual of Omaha", planG: "$131", planN: "$96", planF: "$218" },
    { carrier: "AARP / UnitedHealthcare", planG: "$139", planN: "$103", planF: "$224" },
  ],
  note: "Sample rates for Kansas City, MO. Premiums vary by ZIP code, age, gender, and tobacco use. Plan F only available to those who turned 65 before January 1, 2020.",
};

export const missouriPlanComparison = {
  year: 2026,
  partADeductible: "$1,736",
  partBDeductible: "$257",
  plans: [
    {
      name: "Plan G",
      monthlyPremium: "$108–$139",
      annualPremium: "$1,296–$1,668",
      partADeductible: "Covered",
      partBDeductible: "You pay $257",
      partBExcess: "Covered",
      foreignTravel: "80% (up to limits)",
      bestFor: "Most new Medicare enrollees in Missouri",
    },
    {
      name: "Plan N",
      monthlyPremium: "$79–$103",
      annualPremium: "$948–$1,236",
      partADeductible: "Covered",
      partBDeductible: "You pay $257",
      partBExcess: "NOT covered",
      foreignTravel: "80% (up to limits)",
      bestFor: "Healthy enrollees who rarely see specialists",
    },
  ],
};

export const missouriAnniversaryRuleInfo = {
  hasRule: true,
  ruleType: "Anniversary Rule",
  windowDays: 60,
  windowDescription: "30 days before and 30 days after your Medigap policy's annual anniversary date",
  tiedTo: "Policy enrollment anniversary date (NOT your birthday)",
  canSwitchTo: "Equal benefit plan only (e.g., Plan G → Plan G at a different carrier)",
  cannotSwitchTo: "Plans with more or fewer benefits without medical underwriting",
  noUnderwriting: true,
  keyDifference:
    "Unlike California's birthday rule (tied to your birthday), Missouri's anniversary rule is tied to the date you first enrolled in your Medigap plan. The window is 30 days before and 30 days after that anniversary date.",
  proTip:
    "Mark your Medigap policy start date on your calendar. Each year, use your 60-day anniversary window to shop for lower rates on the same plan type. Missouri's anniversary rule makes annual rate shopping risk-free.",
};

export const missouriStateRules = [
  {
    title: "Anniversary Rule (Not Birthday Rule)",
    description:
      "Missouri's annual switching window is tied to your Medigap policy anniversary date — not your birthday. You have 30 days before and 30 days after your policy anniversary to switch to an equal-benefit plan at a new carrier with no medical underwriting.",
  },
  {
    title: "Attained-Age Rating",
    description:
      "Most Missouri Medigap plans use attained-age rating, meaning premiums increase as you get older. Some carriers offer issue-age rating (locked at your age when you enrolled), which costs more upfront but may be cheaper long-term.",
  },
  {
    title: "MDCI Regulation",
    description:
      "The Missouri Department of Commerce and Insurance (MDCI) regulates all Medigap plans sold in Missouri. Carriers must file rates with MDCI and follow standardized plan benefits defined by federal law.",
  },
  {
    title: "30-Day Free Look Period",
    description:
      "Missouri law requires a 30-day free look period on all Medigap policies. If you're not satisfied, you can return the policy within 30 days for a full premium refund.",
  },
  {
    title: "CLAIM — Free Counseling",
    description:
      "Missouri's SHIP program, CLAIM (Community Leaders Assisting the Insured of Missouri), provides free, unbiased Medicare counseling. Call 1-800-390-3330 to speak with a trained volunteer counselor.",
  },
];

export const missouriFAQs = [
  {
    question: "Does Missouri have a Medigap birthday rule?",
    answer:
      "No. Missouri does not have a birthday rule. Instead, Missouri has an 'Anniversary Rule' — a 60-day window (30 days before and 30 days after) tied to your Medigap policy's annual enrollment anniversary date. Unlike California's birthday rule, it is not tied to your actual birthday. You can use this window to switch to an equal-benefit plan at a new carrier without medical underwriting.",
  },
  {
    question: "How does Missouri's Anniversary Rule work?",
    answer:
      "Each year, you have a 60-day window centered on the anniversary of your Medigap policy start date. During this window, you can switch from your current carrier to a different carrier offering the same plan type (e.g., Plan G to Plan G) with no health questions and no medical underwriting. You cannot switch to a plan with more or fewer benefits without underwriting.",
  },
  {
    question: "What is the best Medicare Supplement plan in Missouri for 2026?",
    answer:
      "Plan G is the most popular and most recommended Medigap plan for new Medicare enrollees in Missouri. It covers everything except the $257 Part B deductible, leaving you with very predictable out-of-pocket costs. Plan N is a lower-premium alternative for healthy seniors who rarely see specialists, though it does not cover Part B excess charges.",
  },
  {
    question: "How much does Plan G cost in Missouri?",
    answer:
      "Plan G premiums in Missouri range from approximately $108/mo to $160/mo for a 65-year-old female nonsmoker in Kansas City. Cigna/HealthSpring offers the lowest rates at around $108/mo, while AARP/UnitedHealthcare runs closer to $139/mo. Premiums vary by ZIP code, age, gender, and tobacco use.",
  },
  {
    question: "Which Medicare Supplement carriers are available in Missouri?",
    answer:
      "Missouri has 25+ licensed Medigap carriers. The largest by enrollment include AARP/UnitedHealthcare, Mutual of Omaha, State Farm, Cigna/HealthSpring, and Wellabe. Mutual of Omaha is particularly strong in Missouri given its Midwest headquarters and deep agent network.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Missouri without underwriting?",
    answer:
      "Yes — during your 6-month Medigap Open Enrollment Period (OEP) when you first turn 65 and enroll in Medicare Part B, you have guaranteed issue rights with no medical underwriting. After OEP, Missouri's Anniversary Rule gives you a 60-day window each year to switch to an equal-benefit plan at a new carrier without underwriting.",
  },
  {
    question: "What is the difference between Missouri's Anniversary Rule and California's Birthday Rule?",
    answer:
      "California's birthday rule is triggered by your actual birthday each year. Missouri's anniversary rule is triggered by the anniversary of your Medigap policy enrollment date — which may be different from your birthday. Both allow switching to an equal-benefit plan without underwriting, but Missouri's rule is tied to when you enrolled, not when you were born.",
  },
  {
    question: "Is there free Medicare counseling available in Missouri?",
    answer:
      "Yes. Missouri's SHIP program is called CLAIM (Community Leaders Assisting the Insured of Missouri). CLAIM provides free, unbiased Medicare counseling from trained volunteer counselors. Call 1-800-390-3330 or visit the Missouri CLAIM website to find a local counselor.",
  },
];

export const missouriScoringMethodology = {
  factors: [
    { name: "Financial Strength (AM Best)", weight: "25%", description: "AM Best rating reflects long-term claims-paying ability" },
    { name: "Complaint Ratio", weight: "25%", description: "NAIC complaint index vs. national median for Medigap carriers" },
    { name: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. Missouri market median" },
    { name: "Plan Availability", weight: "15%", description: "Range of plans offered (G, N, F, HDG) in Missouri" },
    { name: "Customer Service", weight: "15%", description: "J.D. Power scores, agent availability, and digital tools" },
  ],
};
