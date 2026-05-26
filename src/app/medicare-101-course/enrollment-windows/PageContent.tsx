"use client";
import CourseLayout from "@/components/CourseLayout";
import EddieProTip from "@/components/EddieProTip";
import { Calendar, AlertTriangle, Clock, Shield, Star } from "lucide-react";

const enrollmentPeriods = [
  {
    title: "Initial Enrollment Period (IEP)",
    timing: "7-month window around your 65th birthday",
    icon: Star,
    color: "bg-blue-600",
    lightBg: "bg-blue-50",
    border: "border-blue-200",
    importance: "critical",
    details: [
      "3 months before your birthday month + your birthday month + 3 months after",
      "This is when you sign up for Part A and Part B",
      "If you enroll in the first 3 months, coverage starts on the 1st of your birthday month",
      "Missing this window can result in permanent late enrollment penalties",
    ],
  },
  {
    title: "Medigap Open Enrollment Period (OEP)",
    timing: "6 months starting when you are 65+ AND enrolled in Part B",
    icon: Shield,
    color: "bg-teal-600",
    lightBg: "bg-teal-50",
    border: "border-teal-200",
    importance: "critical",
    details: [
      "No insurance company can deny you a Medigap policy during this window",
      "No health questions, no pre-existing condition exclusions",
      "After this window closes, carriers CAN and WILL use medical underwriting",
      "This is the single most important enrollment window for Medigap",
    ],
  },
  {
    title: "Special Enrollment Period (SEP)",
    timing: "Triggered by qualifying life events",
    icon: Clock,
    color: "bg-amber-600",
    lightBg: "bg-amber-50",
    border: "border-amber-200",
    importance: "important",
    details: [
      "Losing employer coverage, moving to a new area, losing Medicaid",
      "For Part B: 8-month SEP after employer coverage ends (no penalty)",
      "For Medigap: guaranteed issue rights exist in specific situations but are more limited",
      "Does NOT apply to voluntary plan changes",
    ],
  },
  {
    title: "Annual Enrollment Period (AEP)",
    timing: "October 15 – December 7 each year",
    icon: Calendar,
    color: "bg-purple-600",
    lightBg: "bg-purple-50",
    border: "border-purple-200",
    importance: "standard",
    details: [
      "For changing Medicare Advantage plans or Part D plans",
      "NOT for Medigap (Medigap can be changed anytime, but underwriting applies)",
      "Changes take effect January 1 of the following year",
      "Most commonly used by people switching between Advantage plans",
    ],
  },
];

export default function PageContent() {
  return (
    <CourseLayout currentLesson={3}>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        Medicare enrollment has specific windows with real consequences if you miss them. Understanding
        these deadlines is essential — especially the Medigap Open Enrollment Period, which is a
        use-it-or-lose-it opportunity.
      </p>

      {/* Enrollment Period Cards */}
      <div className="space-y-6 mb-10">
        {enrollmentPeriods.map((period) => {
          const Icon = period.icon;
          return (
            <div key={period.title} className={`border-2 ${period.border} rounded-2xl overflow-hidden`}>
              <div className={`${period.color} px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-white" />
                  <h2 className="text-lg font-bold text-white">{period.title}</h2>
                </div>
                {period.importance === "critical" && (
                  <span className="text-xs font-bold bg-white/20 text-white px-2.5 py-1 rounded-full">
                    CRITICAL
                  </span>
                )}
              </div>
              <div className={`${period.lightBg} px-6 py-5`}>
                <p className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  {period.timing}
                </p>
                <ul className="space-y-2">
                  {period.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0 mt-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Late Enrollment Penalties */}
      <div className="mb-10 p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h2 className="text-xl font-bold text-red-900" style={{ fontFamily: "'Merriweather', serif" }}>
            Late Enrollment Penalties
          </h2>
        </div>
        <p className="text-red-800 mb-4">
          Missing your enrollment windows can result in <strong>permanent</strong> premium surcharges:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 border border-red-100">
            <p className="font-bold text-red-900 mb-1">Part B Penalty</p>
            <p className="text-sm text-red-800">
              10% premium increase for each 12-month period you delayed without qualifying coverage.
              This surcharge is <strong>permanent</strong> — you pay it for as long as you have Part B.
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-red-100">
            <p className="font-bold text-red-900 mb-1">Part D Penalty</p>
            <p className="text-sm text-red-800">
              1% of the national base premium for each month you delayed without creditable drug
              coverage. Also <strong>permanent</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Eddie Pro Tip */}
      <EddieProTip
        variant="navy"
        tip={
          <>
            The number one mistake I see: people turning 65 who are still working assume they can sign
            up for Medigap whenever they want. <strong>Wrong.</strong> Your 6-month Medigap Open
            Enrollment Period is a use-it-or-lose-it window. If you wait until you are 68 to retire and
            then try to get a Medigap plan, you will face medical underwriting. If you have had a heart
            attack, cancer, or diabetes, you may be denied entirely. Even if you delay Part B because of
            employer coverage, talk to a licensed agent <strong>BEFORE</strong> your 65th birthday to
            understand your timeline.
          </>
        }
      />

      {/* FAQ */}
    </CourseLayout>
  );
}
