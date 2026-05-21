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

export const STATE_NAME = "Maryland";
export const STATE_ABBR = "MD";
export const SAMPLE_CITY = "Baltimore";

export const STATE_STATS = {
  enrollees: "336,000+",
  lowestPlanG: "$126/mo",
  carriers: "43+",
  medicareTotal: "1.1M",
};

export const CARRIERS: Carrier[] = [
  {
    rank: 1,
    name: "Mutual of Omaha",
    badge: "Best Overall",
    score: 4.9,
    amBest: "A+",
    planGMonthly: "$148",
    planNMonthly: "$107",
    pros: [
      "A+ AM Best financial rating",
      "Exceptional U.S.-based customer service",
      "Household discount of 7% available",
      "Strong agent network across Maryland",
      "Consistent rate stability year over year",
    ],
    cons: [
      "Not the cheapest Plan G in Baltimore",
      "Attained-age rating means premiums rise with age",
    ],
    highlight:
      "Mutual of Omaha is the top-rated Medicare Supplement carrier in Maryland, combining A+ financial strength with outstanding customer service. Their 7% household discount and stable rate history make them the most trusted choice for Maryland retirees who want long-term reliability.",
  },
  {
    rank: 2,
    name: "AARP / UnitedHealthcare",
    badge: "Best Plan Availability",
    score: 4.7,
    amBest: "A",
    planGMonthly: "$145",
    planNMonthly: "$104",
    pros: [
      "Largest Medicare Supplement enrollment in the country",
      "AARP brand recognition and member benefits",
      "Broad plan selection including Plans G, N, and HDG",
      "Nurse hotline and wellness programs included",
      "Strong presence in Baltimore, Annapolis, and Bethesda",
    ],
    cons: [
      "AARP membership required ($16/year)",
      "Premiums higher than some budget carriers",
    ],
    highlight:
      "AARP/UnitedHealthcare is one of the largest Medigap insurers in Maryland. Their 24/7 nurse hotline, broad plan selection, and AARP member perks make them a strong choice for enrollees who value brand recognition and added benefits alongside solid coverage.",
  },
  {
    rank: 3,
    name: "Humana",
    badge: "Best for Active Retirees",
    score: 4.5,
    amBest: "A-",
    planGMonthly: "$133",
    planNMonthly: "$96",
    pros: [
      "SilverSneakers fitness benefit included",
      "Competitive Plan G pricing in Baltimore",
      "Household discount available",
      "A- AM Best financial rating",
      "Strong Maryland market presence",
    ],
    cons: [
      "Plan G premium higher than Physicians Life",
      "Some rate volatility in recent years",
    ],
    highlight:
      "Humana stands out in Maryland for including the SilverSneakers fitness benefit, giving members free access to thousands of gyms and fitness centers statewide. For active retirees in the Baltimore-Washington corridor, the fitness perk adds real value on top of competitive Medigap coverage.",
  },
  {
    rank: 4,
    name: "Physicians Life",
    badge: "Best for Low Premiums",
    score: 4.3,
    amBest: "A-",
    planGMonthly: "$126",
    planNMonthly: "$91",
    pros: [
      "Lowest Plan G premium in Baltimore at $126/mo",
      "Competitive Plan N pricing",
      "A- AM Best financial rating",
      "Household discount available",
    ],
    cons: [
      "Smaller brand recognition than national carriers",
      "Fewer supplemental benefits",
      "Higher complaint ratio than Mutual of Omaha",
    ],
    highlight:
      "Physicians Life offers the lowest Plan G premium in the Baltimore market at $126/mo, making them attractive for budget-conscious enrollees. Their complaint ratio runs slightly higher than top-tier carriers, so they are best for healthy enrollees comfortable shopping again in a few years.",
  },
  {
    rank: 5,
    name: "Wellabe",
    badge: "Best Budget Option",
    score: 4.2,
    amBest: "A-",
    planGMonthly: "$131",
    planNMonthly: "$95",
    pros: [
      "Strong middle-ground pricing in Maryland",
      "Better complaint record than Physicians Life",
      "A- AM Best financial rating",
      "Household discount available",
    ],
    cons: [
      "Smaller brand recognition than national carriers",
      "Fewer supplemental benefits",
    ],
    highlight:
      "Wellabe (formerly Medico) offers a compelling middle ground in Maryland: cheaper than Mutual of Omaha and AARP/UHC, with a better complaint record than the cheapest options. For Maryland enrollees who want to save money without taking on service risk, Wellabe is worth a quote.",
  },
];

export const PREMIUM_TABLE: PremiumRow[] = [
  { carrier: "Physicians Life", planG: "$126", planN: "$91", planF: "$149" },
  { carrier: "Wellabe", planG: "$131", planN: "$95", planF: "N/A" },
  { carrier: "Humana", planG: "$133", planN: "$96", planF: "$158" },
  { carrier: "AARP / UnitedHealthcare", planG: "$145", planN: "$104", planF: "$169" },
  { carrier: "Mutual of Omaha", planG: "$148", planN: "$107", planF: "$172" },
  { carrier: "Cigna", planG: "$145", planN: "$103", planF: "$168" },
  { carrier: "State Farm", planG: "$152", planN: "$109", planF: "N/A" },
  { carrier: "Bankers Fidelity", planG: "$137", planN: "$98", planF: "$161" },
];

export const STATE_RULES = [
  {
    title: "Maryland Birthday Rule (July 1, 2023)",
    description:
      "Maryland enacted a birthday rule effective July 1, 2023. During the 30-day window following your birthday each year, you can switch to a Medigap plan with equal or lesser benefits without answering health questions. This means you can shop for a lower premium from a different carrier once a year without medical underwriting, as long as you stay at the same plan level or lower.",
  },
  {
    title: "Attained-Age Rating Standard",
    description:
      "Most Maryland Medigap policies use attained-age rating, meaning premiums increase as you get older. Issue-age policies, where premiums are locked at your enrollment age, are available from select carriers and may save money long-term for enrollees who plan to keep the same carrier for many years.",
  },
  {
    title: "Maryland Insurance Administration Rate Guide",
    description:
      "The Maryland Insurance Administration publishes an official Medigap rate comparison guide twice a year (January and July). This free guide lists all licensed carriers and their current premiums, making it one of the most useful state-published resources for Medigap shoppers in the country.",
  },
  {
    title: "Household Discount Available",
    description:
      "Many Maryland carriers offer a household discount of 5% to 7% when two people in the same household both enroll in a Medigap plan with the same carrier. Carriers offering this discount include Mutual of Omaha, Humana, Cigna, and Wellabe. Always ask about the household discount when getting quotes.",
  },
  {
    title: "Free Counseling via Maryland SHIP",
    description:
      "Maryland's State Health Insurance Assistance Program (SHIP) provides free, unbiased Medicare counseling. Call 1-800-243-3425 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];

export const SCORING_FACTORS = [
  { factor: "Financial Strength (AM Best)", weight: "25%", description: "Claims-paying ability and long-term stability" },
  { factor: "Customer Satisfaction", weight: "25%", description: "NAIC complaint ratios and member satisfaction surveys" },
  { factor: "Premium Competitiveness", weight: "20%", description: "Plan G and Plan N rates vs. Maryland market average" },
  { factor: "Plan Availability", weight: "15%", description: "Number of plan types offered in Maryland" },
  { factor: "Discounts and Value", weight: "15%", description: "Household discounts, EFT discounts, and added benefits" },
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the best Medicare Supplement plan in Maryland for 2026?",
    answer:
      "Plan G is the most popular and recommended Medigap plan in Maryland for new enrollees. It covers nearly all Medicare out-of-pocket costs except the annual Part B deductible ($283 in 2026). For the best overall value, Mutual of Omaha (A+ rated) consistently ranks highest in Maryland for financial strength and customer satisfaction. Physicians Life offers the lowest premium at $126/mo in Baltimore.",
  },
  {
    question: "Does Maryland have a birthday rule for Medigap?",
    answer:
      "Yes. Maryland enacted a birthday rule effective July 1, 2023. During the 30-day window following your birthday each year, you can switch to a Medigap plan with equal or lesser benefits without answering health questions. This is a significant consumer protection that lets you shop for lower premiums annually without medical underwriting.",
  },
  {
    question: "How much does Medicare Supplement Plan G cost in Maryland?",
    answer:
      "Plan G premiums in Maryland range from approximately $126/mo to $152/mo for a 65-year-old female nonsmoker in Baltimore. Premiums vary by carrier, ZIP code, age, gender, and tobacco use. The cheapest option is Physicians Life at $126/mo, though Wellabe at $131/mo offers better value with a lower complaint ratio.",
  },
  {
    question: "What is the difference between Plan G and Plan N in Maryland?",
    answer:
      "Plan G covers nearly everything except the $283 Part B deductible. Plan N also skips the Part B deductible but adds copays of up to $20 for some office visits and $50 for emergency room visits that do not result in inpatient admission, and does not cover Part B excess charges. Plan N premiums run $91 to $107/mo in Maryland vs. $126 to $152/mo for Plan G. If you rarely visit doctors and your providers do not charge excess fees, Plan N can save $300 to $500 per year.",
  },
  {
    question: "Where can I find the Maryland Medigap rate comparison guide?",
    answer:
      "The Maryland Insurance Administration publishes a free Medigap rate comparison guide twice a year (January and July). It lists all licensed carriers and their current premiums. You can download it from the Maryland Insurance Administration website at insurance.maryland.gov or call 1-800-492-6116 to request a copy.",
  },
  {
    question: "Can I switch Medicare Supplement plans in Maryland?",
    answer:
      "Yes. Maryland's birthday rule lets you switch to an equal or lesser plan once a year during the 30-day window after your birthday without medical underwriting. Outside of that window, you can still apply to switch at any time but will face health questions and potential denial. Your 6-month Open Enrollment Period when you first turn 65 and enroll in Part B is still the best time to lock in coverage.",
  },
  {
    question: "What is High-Deductible Plan G and is it a good option in Maryland?",
    answer:
      "High-Deductible Plan G (HDG) offers the same coverage as standard Plan G but requires you to pay a deductible of $2,870 (2026) before benefits kick in. In exchange, monthly premiums drop to roughly $40 to $55/mo. HDG is a strong option for healthy Maryland retirees who rarely use medical services and want to minimize monthly costs. Mutual of Omaha and Cigna are the leading HDG carriers in Maryland.",
  },
  {
    question: "Where can I get free Medicare Supplement help in Maryland?",
    answer:
      "Maryland's State Health Insurance Assistance Program (SHIP) offers free, unbiased Medicare counseling. Call 1-800-243-3425 to speak with a trained counselor who can help you compare plans, understand your rights, and enroll. There is no cost and counselors do not sell insurance.",
  },
];
