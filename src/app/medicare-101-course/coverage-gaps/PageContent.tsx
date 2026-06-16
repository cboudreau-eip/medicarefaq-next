"use client";
import CourseLayout from "@/components/CourseLayout";
import EddieProTip from "@/components/EddieProTip";
import CoverageGapCalculator from "@/components/CoverageGapCalculator";
import { MEDICARE_COSTS } from "@/lib/medicare-costs";
import { AlertTriangle, DollarSign, XCircle, TrendingUp } from "lucide-react";

export default function PageContent() {
  return (
    <CourseLayout currentLesson={4}>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        This lesson shows you exactly what Original Medicare leaves uncovered — in real dollar amounts.
        Understanding these gaps is what motivates most people to get supplemental coverage.
      </p>

      {/* The 20% Problem */}
      <div className="mb-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <TrendingUp className="w-5 h-5 text-red-700" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
            The 20% Problem: No Out-of-Pocket Maximum
          </h2>
        </div>
        <div className="ml-12">
          <p className="text-slate-700 leading-relaxed mb-4">
            After your Part B deductible ({MEDICARE_COSTS.partB.annualDeductible}), Medicare pays 80% of
            approved charges. You pay the remaining 20%. The critical issue:{" "}
            <strong>there is NO annual out-of-pocket maximum on Original Medicare.</strong>
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-4">
            <p className="text-red-900 font-semibold mb-3">Real-World Examples:</p>
            <ul className="space-y-2 text-sm text-red-800">
              <li>A hip replacement costs $40,000 → You owe <strong>$8,000</strong></li>
              <li>A heart bypass costs $150,000 → You owe <strong>$30,000</strong></li>
              <li>Cancer treatment costs $300,000 → You owe <strong>$60,000</strong></li>
              <li>Extended hospital + rehab costs $500,000 → You owe <strong>$100,000</strong></li>
            </ul>
          </div>
          <p className="text-slate-700 text-sm">
            This is the primary reason Medicare Supplement plans exist — to cover that 20% so you do not
            face unlimited financial exposure.
          </p>
        </div>
      </div>

      {/* Part A Gaps */}
      <div className="mb-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <DollarSign className="w-5 h-5 text-amber-700" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
            Part A Hospital Gaps
          </h2>
        </div>
        <div className="ml-12">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm mb-4">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Hospital Stay</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Your Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 text-slate-700">Days 1-60</td>
                  <td className="py-3 px-4 text-slate-700">{MEDICARE_COSTS.partA.inpatientDeductible} (one-time per benefit period)</td>
                </tr>
                <tr className="border-b border-slate-100 bg-amber-50">
                  <td className="py-3 px-4 text-slate-700">Days 61-90</td>
                  <td className="py-3 px-4 text-amber-800 font-semibold">{MEDICARE_COSTS.partA.coinsuranceDays61to90}/day</td>
                </tr>
                <tr className="border-b border-slate-100 bg-red-50">
                  <td className="py-3 px-4 text-slate-700">Days 91-150 (lifetime reserve)</td>
                  <td className="py-3 px-4 text-red-800 font-semibold">{MEDICARE_COSTS.partA.coinsuranceReserveDays}/day</td>
                </tr>
                <tr className="bg-red-100">
                  <td className="py-3 px-4 text-slate-700">Beyond 150 days</td>
                  <td className="py-3 px-4 text-red-900 font-bold">100% — you pay everything</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 text-sm">
            Skilled nursing: $0 for days 1-20, then $209.50/day for days 21-100, then 100% after day 100.
          </p>
        </div>
      </div>

      {/* Services Not Covered */}
      <div className="mb-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <XCircle className="w-5 h-5 text-slate-700" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
            Services Medicare Does NOT Cover At All
          </h2>
        </div>
        <div className="ml-12">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Most dental care (cleanings, fillings, dentures)",
              "Routine vision (eye exams for glasses, frames, lenses)",
              "Hearing aids and hearing exams for fitting",
              "Long-term care (nursing home custodial care)",
              "Cosmetic surgery",
              "Care outside the United States",
              "Acupuncture (except chronic low back pain)",
              "Routine foot care",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost Comparison Table */}
      <div className="mb-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-teal-700" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
            The Financial Risk: With vs. Without Medigap
          </h2>
        </div>
        <div className="ml-12 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="text-left py-3 px-4 font-semibold rounded-tl-xl">Scenario</th>
                <th className="text-left py-3 px-4 font-semibold">Without Medigap</th>
                <th className="text-left py-3 px-4 font-semibold rounded-tr-xl">With Plan G</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["5-day hospital stay", `${MEDICARE_COSTS.partA.inpatientDeductible} (Part A deductible)`, "$0"],
                ["Outpatient surgery ($15,000)", "$3,000 (20% coinsurance)", "$0"],
                ["Cancer treatment ($200,000)", "$40,000+ (20% coinsurance)", "$0"],
                ["90-day hospital stay", `${MEDICARE_COSTS.partA.inpatientDeductible} + $12,570 (days 61-90)`, "$0"],
                ["Healthy year (routine care)", `${MEDICARE_COSTS.partB.annualDeductible} deductible + copays`, `${MEDICARE_COSTS.partB.annualDeductible} Part B deductible only`],
              ].map((row, i) => (
                <tr key={row[0]} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                  <td className="py-3 px-4 font-medium text-slate-800">{row[0]}</td>
                  <td className="py-3 px-4 text-red-700 font-semibold">{row[1]}</td>
                  <td className="py-3 px-4 text-green-700 font-semibold">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Calculator */}
      <CoverageGapCalculator />

      {/* Eddie Pro Tip */}
      <EddieProTip
        tip={
          <>
            I have been in this business for over 20 years, and the most common regret I hear is:{" "}
            <em>&quot;I did not think I needed a Supplement because I felt healthy.&quot;</em> The
            problem is, you do not buy insurance for when you are healthy. You buy it for the
            unexpected. A single hospital stay or cancer diagnosis without supplemental coverage can
            wipe out years of retirement savings. Plan G costs roughly $150-200/month in most states.
            That is your insurance against a $50,000 or $100,000 medical bill.
          </>
        }
      />

      {/* FAQ */}
    </CourseLayout>
  );
}
