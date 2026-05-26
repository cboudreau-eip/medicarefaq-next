"use client";
import CourseLayout from "@/components/CourseLayout";
import EddieProTip from "@/components/EddieProTip";
import { MEDICARE_COSTS } from "@/lib/medicare-costs";
import { Shield, DollarSign, AlertTriangle, GitBranch, Building2 } from "lucide-react";

export default function PageContent() {
  return (
    <CourseLayout currentLesson={1}>
      {/* Key Point 1 */}
      <div className="mb-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <Building2 className="w-5 h-5 text-blue-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Is Federal Health Insurance for People 65+
          </h2>
        </div>
        <p className="text-slate-700 leading-relaxed ml-12">
          Medicare is a federal health insurance program run by the Centers for Medicare and Medicaid
          Services (CMS). It covers Americans who are 65 or older, as well as certain younger people
          with disabilities or End-Stage Renal Disease. It is not run by private insurance companies —
          though private companies do offer plans that work alongside or within Medicare.
        </p>
      </div>

      {/* Key Point 2 */}
      <div className="mb-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <DollarSign className="w-5 h-5 text-amber-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Is NOT Free Health Insurance
          </h2>
        </div>
        <p className="text-slate-700 leading-relaxed ml-12">
          Most people pay $0 for Part A (hospital insurance), but Part B (medical insurance) costs{" "}
          <strong>{MEDICARE_COSTS.partB.monthlyPremium}/month in {MEDICARE_COSTS.currentYear}</strong>.
          There are also deductibles, copays, and coinsurance. Many people are surprised by how much
          they still owe out of pocket — even with Medicare.
        </p>
      </div>

      {/* Key Point 3 */}
      <div className="mb-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-red-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Does NOT Cover Everything
          </h2>
        </div>
        <p className="text-slate-700 leading-relaxed ml-12">
          Original Medicare covers about 80% of approved medical costs. The remaining 20% is your
          responsibility — and there is <strong>no annual out-of-pocket maximum</strong>. That means a
          $200,000 hospital bill could leave you owing $40,000. A $500,000 cancer treatment could mean
          $100,000 out of pocket. This is the primary reason supplemental coverage exists.
        </p>
      </div>

      {/* Key Point 4 */}
      <div className="mb-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <GitBranch className="w-5 h-5 text-teal-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
            Two Paths to Get Medicare Coverage
          </h2>
        </div>
        <div className="ml-12">
          <p className="text-slate-700 leading-relaxed mb-4">
            Once you have Medicare, you choose one of two paths for how you receive and supplement your
            benefits:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="font-bold text-blue-900 mb-1">Path 1: Original Medicare + Medigap</p>
              <p className="text-sm text-blue-800">
                Parts A &amp; B + a Medicare Supplement plan + a standalone Part D drug plan.
                Maximum freedom, predictable costs.
              </p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="font-bold text-amber-900 mb-1">Path 2: Medicare Advantage</p>
              <p className="text-sm text-amber-800">
                Part C — a private plan that replaces Original Medicare. Bundles hospital, medical,
                and usually drug coverage into one plan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Point 5 */}
      <div className="mb-10">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <Shield className="w-5 h-5 text-purple-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', serif" }}>
            You Do Not Choose Between Medicare and Private Insurance
          </h2>
        </div>
        <p className="text-slate-700 leading-relaxed ml-12">
          Medicare IS your primary insurance after 65 (unless you have qualifying employer coverage
          from an employer with 20+ employees). The choice is not whether to have Medicare — it is how
          you receive and supplement your Medicare benefits. Everyone on Medicare still needs to make
          decisions about supplemental coverage.
        </p>
      </div>

      {/* Eddie Pro Tip */}
      <EddieProTip
        tip={
          <>
            Here is the single most important thing to understand: Medicare covers 80% of your
            approved medical costs. There is <strong>no annual out-of-pocket maximum</strong> on
            Original Medicare. That means without supplemental coverage, your financial exposure is
            unlimited. A serious illness or hospital stay could cost you tens of thousands of dollars.
            That is why almost everyone needs either a Medigap plan or a Medicare Advantage plan on
            top of Original Medicare.
          </>
        }
      />

      {/* FAQ */}
    </CourseLayout>
  );
}
