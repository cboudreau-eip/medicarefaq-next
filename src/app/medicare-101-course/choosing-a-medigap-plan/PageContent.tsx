"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import CourseLayout from "@/components/CourseLayout";
import EddieProTip from "@/components/EddieProTip";
import ZipFormModal from "@/components/ZipFormModal";
import { MEDICARE_COSTS } from "@/lib/medicare-costs";
import { getCourseProfile, type CourseUserProfile } from "@/components/CourseOnboarding";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Search,
  Phone,
} from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics";

function getLesson6Cta(profile: CourseUserProfile | null) {
  if (profile?.situation === "turning-65") {
    return { heading: "See What Plan G and Plan N Cost in Your Area", buttonLabel: "See My Rates" };
  }
  if (profile?.situation === "on-medicare" && profile.hasPlan === "yes") {
    return { heading: "Want to Compare Your Current Plan to What Is Available?", buttonLabel: "Compare Options" };
  }
  return { heading: "Find the Top Carriers in Your State", buttonLabel: "Get Personalized Rates" };
}

export default function PageContent() {
  const [profile, setProfile] = useState<CourseUserProfile | null>(null);
  useEffect(() => { setProfile(getCourseProfile()); }, []);
  const cta = getLesson6Cta(profile);

  return (
    <CourseLayout currentLesson={6}>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        Now that you understand why Medigap is usually the better path, the next question is: which
        plan letter and which carrier? This lesson gives you a clear framework for both decisions.
      </p>

      {/* Plan G vs Plan N */}
      <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
        The Plan Letter Decision: Plan G vs. Plan N
      </h2>
      <p className="text-slate-700 mb-6 leading-relaxed">
        Plan G and Plan N are the two most popular Medigap plans for new enrollees in {MEDICARE_COSTS.currentYear}.
        They cover the same core benefits with a few key differences:
      </p>

      {/* Comparison Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="text-left py-3 px-4 font-semibold rounded-tl-xl">Feature</th>
              <th className="text-left py-3 px-4 font-semibold">Plan G</th>
              <th className="text-left py-3 px-4 font-semibold rounded-tr-xl">Plan N</th>
            </tr>
          </thead>
          <tbody>
            {[
              [`Part B deductible (${MEDICARE_COSTS.partB.annualDeductible}/yr)`, "NOT covered (you pay it)", "NOT covered (you pay it)"],
              ["Part B coinsurance (20%)", "Covered 100%", "Covered (with small copays)"],
              ["Part B excess charges", "Covered", "NOT covered"],
              ["Office visit copay", "$0", "Up to $20"],
              ["ER copay (not admitted)", "$0", "Up to $50"],
              ["Monthly premium difference", "Higher", "$40-60/month less"],
              ["Best for", "Zero surprises, peace of mind", "Healthy, budget-conscious"],
            ].map((row, i) => (
              <tr key={row[0]} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                <td className="py-3 px-4 font-medium text-slate-800">{row[0]}</td>
                <td className="py-3 px-4 text-slate-600">{row[1]}</td>
                <td className="py-3 px-4 text-slate-600">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The Math */}
      <div className="mb-10 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
        <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" aria-hidden="true" />
          The Math: Plan G vs. Plan N
        </h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li><strong>Plan N saves:</strong> ~$40-60/month ($480-720/year) in premiums</li>
          <li><strong>Plan N costs you:</strong> Up to $20 per office visit + up to $50 per ER visit (if not admitted) + potential excess charges</li>
          <li><strong>If you see the doctor 6 times/year:</strong> 6 × $20 = $120 in copays</li>
          <li><strong>Net savings with Plan N:</strong> Approximately $360-600/year for most people</li>
        </ul>
        <p className="text-sm text-slate-600 mt-3 italic">
          If you rarely go to the doctor, Plan N saves money. If you have frequent visits or want zero
          hassle, Plan G is simpler.
        </p>
      </div>

      {/* How to Evaluate Carriers */}
      <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
        How to Evaluate Carriers: The 5 Factors
      </h2>

      <div className="space-y-5 mb-10">
        {[
          {
            number: 1,
            title: "Premium Price",
            text: "Get quotes from at least 3-5 carriers. Premiums for the same Plan G can vary by $50-100/month between carriers in the same ZIP code.",
          },
          {
            number: 2,
            title: "Rate Increase History",
            text: "A carrier with a low introductory rate but 15% annual increases is worse than one with a moderate rate and 3-4% increases. Ask for the carrier's rate increase history over the past 5 years.",
          },
          {
            number: 3,
            title: "AM Best Financial Rating",
            text: "Look for A- or higher. This measures the carrier's ability to pay claims long-term. A+ or A++ is ideal.",
          },
          {
            number: 4,
            title: "NAIC Complaint Ratio",
            text: "Below 1.0 means fewer complaints than the national average. Below 0.5 is excellent. This measures customer satisfaction and claims handling.",
          },
          {
            number: 5,
            title: "Household/Multi-Policy Discounts",
            text: "Many carriers offer 5-12% discounts if both spouses enroll or if you bundle with other policies.",
          },
        ].map((item) => (
          <div key={item.number} className="flex items-start gap-4">
            <div className="w-9 h-9 bg-blue-900 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-white">{item.number}</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-slate-700 text-sm leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Methods */}
      <div className="mb-10 p-5 bg-blue-50 border border-blue-200 rounded-2xl">
        <h3 className="font-bold text-blue-900 mb-3">Pricing Methods: How Carriers Set Rates</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <div>
            <strong>Attained-age:</strong> Premium increases as you age (most common). Starts low, rises over time.
          </div>
          <div>
            <strong>Issue-age:</strong> Premium based on your age when you buy. Does not increase due to aging (still increases for inflation/medical costs).
          </div>
          <div>
            <strong>Community-rated:</strong> Same premium regardless of age. Higher starting premium but more predictable long-term.
          </div>
        </div>
      </div>

      {/* Eddie Pro Tip */}
      <EddieProTip
        tip={
          <>
            My recommendation for most new enrollees: start with Plan G. Yes, Plan N can save you
            money, but Plan G eliminates all decision-making. You never wonder if a visit will cost you
            a copay, you never worry about excess charges, and you never have to think about whether to
            go to the ER. That peace of mind is worth $40-60/month to most people. If budget is tight,
            Plan N is an excellent plan — just understand the trade-offs.
          </>
        }
      />

      {/* CTA - Compare Plans */}
      <div className="my-10 p-6 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white text-center">
        <Search className="w-8 h-8 text-teal-400 mx-auto mb-3" aria-hidden="true" />
        <h3 className="text-xl font-bold mb-2">{cta.heading}</h3>
        <p className="text-slate-300 mb-5 text-sm max-w-lg mx-auto">
          Rates vary significantly by ZIP code. Enter yours to see personalized quotes from top-rated
          carriers in your area.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <ZipFormModal
            pageSection="medicare_101_course_lesson_6"
            triggerId="compare-plans-course-l6"
            coverageType="ms"
            title="Compare Medigap Plans"
            subtitle="Enter your ZIP code to see rates from top Medigap carriers in your area."
            buttonLabel="Compare Plans"
            trigger={
              <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                {cta.buttonLabel} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            }
          />
          <Link
            href="/medicare-supplement-plans/medigap-by-state"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
          >
            Browse by State <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* FAQ */}
    </CourseLayout>
  );
}
