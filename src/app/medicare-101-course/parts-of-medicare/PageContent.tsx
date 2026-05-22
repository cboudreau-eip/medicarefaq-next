"use client";
import CourseLayout from "@/components/CourseLayout";
import CourseFAQ from "@/components/CourseFAQ";
import EddieProTip from "@/components/EddieProTip";
import { MEDICARE_COSTS } from "@/lib/medicare-costs";
import { Building2, Stethoscope, Shield, Pill, CheckCircle2, XCircle } from "lucide-react";

const faqs = [
  {
    question: "Do I need all four parts?",
    answer:
      "You need Part A and Part B (Original Medicare). Then you choose: either add a Supplement + Part D (Path 1), or switch to Part C/Advantage (Path 2). You cannot have both a Supplement and Advantage at the same time.",
  },
  {
    question: "What is a \"benefit period\" for Part A?",
    answer:
      "A benefit period starts when you are admitted to the hospital and ends when you have been out for 60 consecutive days. If you go back to the hospital after 60 days, a new benefit period starts and you pay the deductible again.",
  },
];

const parts = [
  {
    letter: "A",
    title: "Hospital Insurance",
    icon: Building2,
    color: "bg-blue-600",
    lightBg: "bg-blue-50",
    border: "border-blue-200",
    textColor: "text-blue-800",
    description: "Covers inpatient hospital stays, skilled nursing facility care, hospice care, and some home health care.",
    covers: [
      "Inpatient hospital stays",
      "Skilled nursing facility care (up to 100 days)",
      "Hospice care",
      "Some home health care services",
    ],
    doesNotCover: [
      "Long-term care (custodial care)",
      "Most dental, vision, and hearing",
      "Private-duty nursing",
    ],
    cost: `$0 premium for most people (if you or your spouse paid Medicare taxes for 10+ years). The ${MEDICARE_COSTS.currentYear} deductible is ${MEDICARE_COSTS.partA.inpatientDeductible} per benefit period.`,
    keyGap: `You pay $0 for days 1-60, then ${MEDICARE_COSTS.partA.coinsuranceDays61to90}/day for days 61-90, then ${MEDICARE_COSTS.partA.coinsuranceReserveDays}/day for "lifetime reserve days" (60 total). After that, you pay everything.`,
  },
  {
    letter: "B",
    title: "Medical Insurance",
    icon: Stethoscope,
    color: "bg-teal-600",
    lightBg: "bg-teal-50",
    border: "border-teal-200",
    textColor: "text-teal-800",
    description: "Covers doctor visits, outpatient care, preventive services, and durable medical equipment.",
    covers: [
      "Doctor and specialist visits",
      "Outpatient surgery and procedures",
      "Preventive services (screenings, vaccines)",
      "Durable medical equipment (wheelchairs, walkers)",
      "Mental health services",
      "Ambulance services",
    ],
    doesNotCover: [
      "Most dental, vision, and hearing",
      "Cosmetic surgery",
      "Routine foot care",
      "Care outside the U.S. (with limited exceptions)",
    ],
    cost: `Standard ${MEDICARE_COSTS.currentYear} monthly premium: ${MEDICARE_COSTS.partB.monthlyPremium}. Annual deductible: ${MEDICARE_COSTS.partB.annualDeductible}. After deductible, Medicare covers 80% and you pay 20%.`,
    keyGap: "That 20% coinsurance has no annual limit. A $500,000 cancer treatment means $100,000 out of pocket with no cap.",
  },
  {
    letter: "C",
    title: "Medicare Advantage",
    icon: Shield,
    color: "bg-amber-600",
    lightBg: "bg-amber-50",
    border: "border-amber-200",
    textColor: "text-amber-800",
    description: "An alternative to Original Medicare offered by private insurers. Bundles Part A, Part B, and usually Part D into one plan.",
    covers: [
      "Everything Part A and Part B cover",
      "Often includes Part D (prescription drugs)",
      "May include dental, vision, and hearing",
      "May include fitness programs (SilverSneakers)",
      "Annual out-of-pocket maximum",
    ],
    doesNotCover: [
      "Out-of-network care (HMO plans)",
      "Services not covered by Original Medicare",
      "Care outside the plan's service area",
    ],
    cost: `Often $0 premium (you still pay the Part B premium). Out-of-pocket maximum: ${MEDICARE_COSTS.partC.maxMOOP} in ${MEDICARE_COSTS.currentYear}.`,
    keyGap: "Network restrictions mean you may not be able to see your preferred doctors. Prior authorizations can delay or deny care.",
  },
  {
    letter: "D",
    title: "Prescription Drug Coverage",
    icon: Pill,
    color: "bg-purple-600",
    lightBg: "bg-purple-50",
    border: "border-purple-200",
    textColor: "text-purple-800",
    description: "Standalone drug plans that work with Original Medicare, or built into Part C.",
    covers: [
      "Prescription medications (varies by plan formulary)",
      "Vaccines covered under Part D",
      "Some insulin at capped costs",
    ],
    doesNotCover: [
      "Drugs not on the plan's formulary",
      "Over-the-counter medications",
      "Drugs covered under Part A or B",
    ],
    cost: `Average monthly premium: ${MEDICARE_COSTS.partD.avgMonthlyPremium} in ${MEDICARE_COSTS.currentYear}. Maximum deductible: ${MEDICARE_COSTS.partD.maxDeductible}.`,
    keyGap: "Coverage has phases: deductible, initial coverage, coverage gap, and catastrophic. Costs vary significantly depending on which phase you are in.",
  },
];

export default function PageContent() {
  return (
    <CourseLayout currentLesson={2}>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        Medicare is divided into four parts, each covering different services. Understanding what each
        part does — and what it leaves out — is essential to making smart coverage decisions.
      </p>

      {/* Part Cards */}
      <div className="space-y-8 mb-10">
        {parts.map((part) => {
          const Icon = part.icon;
          return (
            <div key={part.letter} className={`border-2 ${part.border} rounded-2xl overflow-hidden`}>
              {/* Header */}
              <div className={`${part.color} px-6 py-4 flex items-center gap-3`}>
                <Icon className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">
                  Part {part.letter}: {part.title}
                </h2>
              </div>
              {/* Body */}
              <div className={`${part.lightBg} px-6 py-5`}>
                <p className={`${part.textColor} mb-4 font-medium`}>{part.description}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Covers */}
                  <div>
                    <p className="text-sm font-bold text-slate-700 mb-2">What It Covers:</p>
                    <ul className="space-y-1.5">
                      {part.covers.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Does Not Cover */}
                  <div>
                    <p className="text-sm font-bold text-slate-700 mb-2">What It Does NOT Cover:</p>
                    <ul className="space-y-1.5">
                      {part.doesNotCover.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Cost */}
                <div className="bg-white/70 rounded-lg p-3 border border-slate-200 mb-2">
                  <p className="text-sm text-slate-700">
                    <strong>Cost:</strong> {part.cost}
                  </p>
                </div>
                {/* Key Gap */}
                <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                  <p className="text-sm text-red-800">
                    <strong>Key Gap:</strong> {part.keyGap}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
          Quick Comparison
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="text-left py-3 px-4 font-semibold rounded-tl-xl" />
              <th className="text-left py-3 px-4 font-semibold">Part A</th>
              <th className="text-left py-3 px-4 font-semibold">Part B</th>
              <th className="text-left py-3 px-4 font-semibold">Part C</th>
              <th className="text-left py-3 px-4 font-semibold rounded-tr-xl">Part D</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Covers", "Hospital", "Medical/Doctor", "All-in-one (private)", "Prescriptions"],
              ["Premium", "$0 (most)", MEDICARE_COSTS.partB.monthlyPremium, "Varies ($0-$200+)", `~${MEDICARE_COSTS.partD.avgMonthlyPremium}`],
              ["Deductible", `${MEDICARE_COSTS.partA.inpatientDeductible}/period`, `${MEDICARE_COSTS.partB.annualDeductible}/year`, "Varies", `Up to ${MEDICARE_COSTS.partD.maxDeductible}/year`],
              ["Network", "Any Medicare provider", "Any Medicare provider", "Plan network only", "Plan formulary"],
            ].map((row, i) => (
              <tr key={row[0]} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                <td className="py-3 px-4 font-semibold text-slate-800">{row[0]}</td>
                <td className="py-3 px-4 text-slate-600">{row[1]}</td>
                <td className="py-3 px-4 text-slate-600">{row[2]}</td>
                <td className="py-3 px-4 text-slate-600">{row[3]}</td>
                <td className="py-3 px-4 text-slate-600">{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Eddie Pro Tip */}
      <EddieProTip
        tip={
          <>
            Think of it this way: Part A is your hospital card, Part B is your doctor card, Part D is
            your pharmacy card, and Part C is an alternative that bundles everything into one private
            plan. Most of my clients do best with Original Medicare (A + B) plus a Medigap plan plus a
            standalone Part D plan. That combination gives you the most freedom and the most
            predictable costs.
          </>
        }
      />

      {/* FAQ */}
      <CourseFAQ faqs={faqs} />
    </CourseLayout>
  );
}
