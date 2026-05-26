export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonQuiz {
  lessonNumber: number;
  questions: QuizQuestion[];
}

export const COURSE_QUIZZES: LessonQuiz[] = [
  {
    lessonNumber: 1,
    questions: [
      {
        id: "l1q1",
        question: "Medicare is primarily designed for which group of people?",
        options: [
          "Anyone under 65 without employer insurance",
          "People 65 and older (and some younger people with disabilities)",
          "Only veterans and military families",
          "Only people below the federal poverty line",
        ],
        correctIndex: 1,
        explanation:
          "Medicare is a federal health insurance program primarily for people 65 and older, though it also covers some younger people with certain disabilities or End-Stage Renal Disease.",
      },
      {
        id: "l1q2",
        question:
          "True or false: Medicare covers 100% of your healthcare costs with no out-of-pocket expenses.",
        options: [
          "True — Medicare is free and comprehensive",
          "False — Medicare has premiums, deductibles, copays, and coverage gaps",
        ],
        correctIndex: 1,
        explanation:
          "Medicare does NOT cover everything. It has premiums, deductibles, coinsurance, and significant gaps — which is exactly why supplemental coverage exists.",
      },
      {
        id: "l1q3",
        question: "Which of the following is NOT covered by Original Medicare?",
        options: [
          "Hospital stays",
          "Doctor visits",
          "Routine dental, vision, and hearing",
          "Lab tests and X-rays",
        ],
        correctIndex: 2,
        explanation:
          "Original Medicare (Parts A and B) does not cover routine dental, vision, or hearing services. These are among the most significant gaps in Medicare coverage.",
      },
    ],
  },
  {
    lessonNumber: 2,
    questions: [
      {
        id: "l2q1",
        question: "Which part of Medicare covers hospital stays and inpatient care?",
        options: ["Part A", "Part B", "Part C", "Part D"],
        correctIndex: 0,
        explanation:
          "Part A is Hospital Insurance. It covers inpatient hospital stays, skilled nursing facility care, hospice, and some home health services.",
      },
      {
        id: "l2q2",
        question:
          "What is the relationship between Medicare Part C (Medicare Advantage) and Original Medicare?",
        options: [
          "Part C supplements Original Medicare by filling gaps",
          "Part C replaces Original Medicare — it is an alternative way to receive your benefits",
          "Part C only covers prescription drugs",
          "Part C is the same as Medigap",
        ],
        correctIndex: 1,
        explanation:
          "Medicare Advantage (Part C) is a private plan that replaces Original Medicare. When you enroll in Part C, you get your Part A and Part B benefits through that private plan instead of directly from Medicare.",
      },
      {
        id: "l2q3",
        question: "If you have Original Medicare (Parts A and B) only, which of these would you still need to pay for?",
        options: [
          "A hospital stay under 60 days (after the deductible)",
          "20% of all outpatient doctor visits and procedures",
          "Emergency room visits",
          "All of the above, but only the 20% coinsurance is ongoing",
        ],
        correctIndex: 3,
        explanation:
          "With Original Medicare, after you pay the Part B deductible, you are responsible for 20% of all approved outpatient services — with no cap. This 20% coinsurance is the primary reason people get supplemental coverage.",
      },
    ],
  },
  {
    lessonNumber: 3,
    questions: [
      {
        id: "l3q1",
        question:
          "When does your Medigap Open Enrollment Period (OEP) begin?",
        options: [
          "The day you turn 65",
          "The first day of the month your Part B starts (if you are 65+)",
          "January 1 of each year",
          "Any time you want — there is no deadline",
        ],
        correctIndex: 1,
        explanation:
          "Your 6-month Medigap OEP starts the first day of the month your Part B coverage begins, provided you are 65 or older. During this window, no carrier can deny you or charge more due to health conditions.",
      },
      {
        id: "l3q2",
        question:
          "What happens if you miss your Medigap Open Enrollment Period and try to apply later?",
        options: [
          "Nothing — you can always get Medigap at the same price",
          "You face medical underwriting and can be denied or charged more based on health",
          "You are permanently locked out of Medigap forever",
          "You automatically get enrolled in Medicare Advantage instead",
        ],
        correctIndex: 1,
        explanation:
          "After your OEP, insurance companies can use medical underwriting — meaning they can ask health questions, deny coverage, or charge higher premiums based on pre-existing conditions. This is why the OEP is so critical.",
      },
      {
        id: "l3q3",
        question:
          "Maria turns 65 in June and her Part B starts June 1. When does her Medigap OEP end?",
        options: [
          "June 30 (one month)",
          "September 1 (three months)",
          "November 30 (six months from June 1)",
          "December 31 of that year",
        ],
        correctIndex: 2,
        explanation:
          "The Medigap OEP lasts exactly 6 months from the start of Part B. Since Maria's Part B starts June 1, her OEP runs June 1 through November 30.",
      },
    ],
  },
  {
    lessonNumber: 4,
    questions: [
      {
        id: "l4q1",
        question:
          "With Original Medicare only (no supplement), what is the maximum you could owe for outpatient services in a year?",
        options: [
          "$2,000",
          "$8,000",
          "There is no maximum — the 20% coinsurance has no cap",
          "$10,000",
        ],
        correctIndex: 2,
        explanation:
          "Original Medicare has NO out-of-pocket maximum for Part B services. You owe 20% of every approved charge with no cap. A $500,000 cancer treatment means $100,000 out of your pocket.",
      },
      {
        id: "l4q2",
        question:
          "John has Original Medicare only and needs a knee replacement that costs $50,000. After his Part B deductible, approximately how much will he owe?",
        options: [
          "$0 — Medicare covers surgeries",
          "About $1,000",
          "About $10,000 (20% of $50,000)",
          "The full $50,000",
        ],
        correctIndex: 2,
        explanation:
          "With Original Medicare, John pays 20% coinsurance on Part B services. 20% of $50,000 = $10,000 out of pocket for a single procedure. With a Medigap Plan G, he would pay $0 for this surgery.",
      },
    ],
  },
  {
    lessonNumber: 5,
    questions: [
      {
        id: "l5q1",
        question:
          "What is the key difference between Medigap and Medicare Advantage in terms of doctor access?",
        options: [
          "Both require you to use a network of doctors",
          "Medigap lets you see any Medicare doctor nationwide; Advantage restricts you to a network",
          "Advantage gives you more doctor choices than Medigap",
          "Neither plan restricts your doctor choices",
        ],
        correctIndex: 1,
        explanation:
          "With Medigap + Original Medicare, you can see any doctor in the country who accepts Medicare — no referrals, no network. Medicare Advantage plans restrict you to their network (HMO or PPO).",
      },
      {
        id: "l5q2",
        question:
          "Why is switching FROM Medicare Advantage BACK TO Original Medicare + Medigap difficult?",
        options: [
          "It is not difficult — you can switch freely anytime",
          "Medicare does not allow it under any circumstances",
          "After your initial OEP, you face medical underwriting for Medigap and can be denied",
          "You have to pay a penalty to switch back",
        ],
        correctIndex: 2,
        explanation:
          "You can always switch back to Original Medicare, but getting a Medigap policy after your OEP requires medical underwriting. If you have developed health conditions while on Advantage, carriers can deny you. This is the 'Advantage Trap.'",
      },
      {
        id: "l5q3",
        question:
          "Susan is 66, healthy, and trying to decide between a $0/month Advantage plan and a $150/month Medigap Plan G. What is the strongest argument for choosing Plan G?",
        options: [
          "Plan G has better dental coverage",
          "Plan G protects her if she gets sick later — she can never be denied Medigap once she has it",
          "Plan G is always cheaper in the long run",
          "Medicare Advantage plans are illegal",
        ],
        correctIndex: 1,
        explanation:
          "The strongest argument for Plan G is protection against the unknown. Once Susan has Plan G, she keeps it regardless of future health changes. If she chooses Advantage now and develops cancer at 72, she may never be able to get Medigap again.",
      },
    ],
  },
  {
    lessonNumber: 6,
    questions: [
      {
        id: "l6q1",
        question:
          "What is the main difference between Medigap Plan G and Plan N?",
        options: [
          "Plan G covers hospital stays; Plan N does not",
          "Plan N has small copays for office visits and ER visits (if not admitted), while Plan G has none",
          "Plan G is only available in certain states",
          "Plan N does not cover Part B coinsurance at all",
        ],
        correctIndex: 1,
        explanation:
          "Plan G and Plan N cover nearly the same benefits. The difference: Plan N has up to $20 copays for office visits and up to $50 for ER visits (if not admitted), plus it does not cover Part B excess charges. In exchange, Plan N premiums are typically $40-60/month lower.",
      },
      {
        id: "l6q2",
        question:
          "When comparing Medigap carriers, which factor is MOST important for long-term value?",
        options: [
          "The lowest introductory premium",
          "Rate increase history over the past 5 years",
          "The color of their membership card",
          "Whether they advertise on TV",
        ],
        correctIndex: 1,
        explanation:
          "A carrier with a low introductory rate but 15% annual increases will cost you far more over time than one with a moderate starting rate and 3-4% annual increases. Always ask for rate increase history.",
      },
      {
        id: "l6q3",
        question:
          "Two carriers offer Plan G in your ZIP code. Carrier A charges $130/month with 12% average annual increases. Carrier B charges $160/month with 3% average annual increases. After 5 years, which is likely cheaper?",
        options: [
          "Carrier A — it started lower so it will always be cheaper",
          "Carrier B — stable rate increases mean it will cost less over time",
          "They will cost exactly the same",
          "It depends on your health status",
        ],
        correctIndex: 1,
        explanation:
          "Carrier A: $130 growing at 12%/year reaches ~$229/month by year 5. Carrier B: $160 growing at 3%/year reaches ~$185/month by year 5. The 'cheap' carrier becomes the expensive one. Rate stability matters more than starting price.",
      },
    ],
  },
  {
    lessonNumber: 7,
    questions: [
      {
        id: "l7q1",
        question:
          "You are turning 65 in 4 months. What is the FIRST thing you should do regarding Medicare?",
        options: [
          "Wait until your birthday to think about it",
          "Sign up for Part A and Part B at ssa.gov (3 months before your birthday month)",
          "Call a Medicare Advantage company you saw on TV",
          "Cancel your current insurance immediately",
        ],
        correctIndex: 1,
        explanation:
          "You should enroll in Part A and Part B at ssa.gov up to 3 months before your 65th birthday month. This ensures your coverage starts on time and your Medigap OEP begins as early as possible.",
      },
      {
        id: "l7q2",
        question:
          "Working with a licensed, independent Medicare agent costs you:",
        options: [
          "$500-1,000 in consulting fees",
          "A percentage of your monthly premium",
          "Nothing — agents are paid by the insurance carrier, not the client",
          "$50 per phone call",
        ],
        correctIndex: 2,
        explanation:
          "Independent Medicare agents are compensated by the insurance carriers they represent. There is no cost to you for their help comparing plans, answering questions, or assisting with enrollment.",
      },
    ],
  },
];

export const TOTAL_QUESTIONS = COURSE_QUIZZES.reduce(
  (sum, lesson) => sum + lesson.questions.length,
  0
);

export function getGrade(score: number, total: number): { letter: string; message: string; color: string } {
  const pct = (score / total) * 100;
  if (pct >= 90) return { letter: "A", message: "You are Medicare-ready. You understand the key concepts and are prepared to make confident decisions about your coverage.", color: "text-green-700" };
  if (pct >= 75) return { letter: "B", message: "Strong understanding of Medicare. Review the lessons where you missed questions to fill in the gaps.", color: "text-blue-700" };
  if (pct >= 60) return { letter: "C", message: "Good start. Consider re-reading the lessons flagged below to strengthen your understanding before making coverage decisions.", color: "text-amber-700" };
  return { letter: "D", message: "Medicare is complex, and that is exactly why we are here to help. A licensed agent can walk you through everything personally.", color: "text-red-700" };
}
