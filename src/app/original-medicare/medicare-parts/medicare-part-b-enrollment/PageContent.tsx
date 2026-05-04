"use client";
/**
 * Medicare Part B Enrollment — /original-medicare/medicare-parts/medicare-part-b-enrollment
 */

import Link from "next/link";
import { FileText, ArrowRight, CheckCircle2, AlertTriangle, Clock, Phone, Monitor, BookOpen, Shield, DollarSign } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics";
import ZipFormModal from "@/components/ZipFormModal";

const enrollmentPeriods = [
  {
    name: "Initial Enrollment Period (IEP)",
    dates: "7-month window around your 65th birthday (3 months before, birthday month, 3 months after)",
    eligibility: "Turning 65",
    coverageStart: "1st day of birthday month (if enrolled in first 3 months) or 1–3 months later (if enrolled in last 3 months)",
    penaltyRisk: "Low (if enrolled on time)",
  },
  {
    name: "Special Enrollment Period (SEP)",
    dates: "8 months after employer group health coverage ends (due to active employment)",
    eligibility: "You or your spouse had employer-sponsored group health coverage based on active employment after age 65",
    coverageStart: "Month after enrollment",
    penaltyRisk: "Low (if qualified and enrolled on time)",
  },
  {
    name: "General Enrollment Period (GEP)",
    dates: "January 1 to March 31 each year",
    eligibility: "Missed IEP and don't qualify for SEP",
    coverageStart: "July 1",
    penaltyRisk: "High — permanent 10% penalty for each 12-month period you were eligible but not enrolled without creditable coverage",
  },
];

const applicationMethods = [
  {
    icon: Monitor,
    title: "Apply Online",
    desc: "Visit SSA.gov and use the Medicare enrollment application. This is available 24/7 and typically the fastest option. You'll create or log into your my Social Security account, then complete the Part B application form (CMS-40B) electronically.",
    steps: [
      "Go to ssa.gov/medicare",
      "Click 'Apply for Medicare Only'",
      "Create or log into your my Social Security account",
      "Complete the Part B application form (CMS-40B) electronically",
      "Submit and receive a confirmation number",
    ],
    note: "Available 24/7. Most convenient option for most applicants.",
  },
  {
    icon: Phone,
    title: "Apply by Phone",
    desc: "Call the Social Security Administration at 1-800-772-1213. Representatives are available Monday through Friday. This works well if you have questions during the process or prefer speaking with someone directly.",
    steps: [
      "Call 1-800-772-1213 (TTY: 1-800-325-0778)",
      "Tell the representative you want to apply for Medicare Part B",
      "Have your Social Security number and documents ready",
      "Complete the application over the phone",
    ],
    note: "Best option if you prefer speaking with someone directly. Available Mon–Fri, 8 AM–7 PM.",
  },
  {
    icon: FileText,
    title: "Apply in Person",
    desc: "Visit your local Social Security office. You can find locations at SSA.gov. Bring your documents and expect to spend time waiting — this option works best for people with more complex situations.",
    steps: [
      "Find your local Social Security office at ssa.gov/locator",
      "Schedule an appointment (recommended) or walk in",
      "Bring required documents (see below)",
      "Complete Form CMS-40B with a representative",
    ],
    note: "Consider scheduling an appointment to reduce wait times.",
  },
];

const requiredDocuments = [
  "Proof of age (birth certificate or passport)",
  "Proof of U.S. citizenship or lawful residency",
  "Your Social Security number",
  "If applying during a SEP: documentation showing you had creditable employer coverage and the date it ended (Form CMS-L564 completed by your employer)",
];

const faqs = [
  {
    q: "What is the current base premium for Medicare Part B in 2026?",
    a: "The standard Medicare Part B premium in 2026 is $202.90 per month. Higher-income beneficiaries pay more due to IRMAA surcharges, which can push the monthly premium as high as $689.90 depending on income.",
  },
  {
    q: "Can I enroll in Medicare Part B if I live outside the U.S.?",
    a: "Yes, U.S. citizens living abroad can enroll in Medicare Part B, but the practical value is limited since Original Medicare generally does not cover care received outside the United States. You can still enroll and maintain eligibility for when you return.",
  },
  {
    q: "What happens if I miss my Initial Enrollment Period and don't have creditable coverage?",
    a: "You'll need to wait for the General Enrollment Period (January 1 – March 31), with coverage starting July 1. You'll also face the permanent late enrollment penalty — a 10% premium increase for every 12-month gap in coverage.",
  },
  {
    q: "How do I know if my employer coverage is considered 'creditable' for Medicare Part B?",
    a: "Creditable coverage for Part B purposes means active group health insurance through a current employer — yours or your spouse's. Retiree coverage, COBRA, and individual marketplace plans do not meet this standard. Your HR department can confirm your plan's status in writing.",
  },
  {
    q: "When does my Medicare Part B coverage officially begin after I enroll?",
    a: "It depends on when you enroll within your IEP. Signing up in the first three months gives you coverage starting on your birthday month. Enrolling during the GEP means coverage begins July 1 of that year. SEP enrollees typically see coverage start the month after they enroll.",
  },
  {
    q: "Can I change my mind after enrolling in Medicare Part B?",
    a: "You can disenroll from Part B, but this is rarely advisable unless you have confirmed creditable employer coverage. Dropping Part B without qualifying coverage means you'll face the late enrollment penalty when you want to re-enroll, along with a gap in coverage.",
  },
];

export default function PageContent() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-[#1B3A6B] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/original-medicare" className="hover:text-white">Original Medicare</Link>
            <span>/</span>
            <Link href="/original-medicare/medicare-parts" className="hover:text-white">Medicare Parts</Link>
            <span>/</span>
            <Link href="/original-medicare/medicare-parts/medicare-part-b" className="hover:text-white">Medicare Part B</Link>
            <span>/</span>
            <span className="text-white">Enrollment</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="bg-teal-500 rounded-xl p-3 shrink-0">
              <BookOpen className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">Medicare Part B Enrollment</h1>
              <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                Understanding when to enroll, what qualifies as acceptable coverage if you delay, and how to complete the process puts you in a much stronger position. The 2026 standard premium is $202.90/month — enrolling outside the correct window can permanently increase what you pay.
              </p>
              <div className="flex flex-wrap gap-3 mt-4 text-sm">
                <span className="bg-teal-600 text-white px-3 py-1 rounded-full font-medium">Updated April 2026</span>
                <span className="bg-blue-700 text-white px-3 py-1 rounded-full font-medium">2026 Premiums Included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Key Takeaways */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1B3A6B] mb-3">Key Takeaways</h2>
          <ul className="space-y-2">
            {[
              "Medicare Part B covers outpatient medical services, and enrolling on time during your Initial Enrollment Period prevents a permanent late penalty added to your monthly premium.",
              "The 2026 standard Part B premium is $202.90 per month, but late enrollees and higher earners may pay significantly more — up to $689.90 at the highest IRMAA income tier.",
              "Only employer-sponsored group health coverage qualifies as creditable coverage for delaying Part B without penalty — individual or marketplace plans do not.",
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="text-teal-500 shrink-0 mt-0.5" size={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Intro */}
        <section className="mb-10 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Understanding Medicare Part B Enrollment: Your Essential First Steps for 2026</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Every year, thousands of people approaching 65 make the same costly mistake: they assume Medicare enrollment is automatic, or they delay signing up without realizing the financial consequences. Medicare Part B enrollment is one of the most consequential healthcare decisions you'll make, and getting the timing right matters more than most people realize.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Medicare Part B is the part of Original Medicare that covers outpatient services — things like doctor visits, lab tests, preventive care, durable medical equipment, and some outpatient drugs. Together with Part A (hospital coverage), Part B forms the foundation of Original Medicare.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unlike Part A, which most people receive premium-free based on their work history, Part B requires a monthly premium. In 2026, the standard premium is $202.90 per month. That cost is worth it for most people, but enrolling outside the correct window can permanently increase what you pay.
          </p>
        </section>

        {/* Enrollment Periods */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-2">Key Medicare Part B Enrollment Periods for 2026</h2>
          <p className="text-gray-600 text-sm mb-5">Knowing which window applies to you — and acting before it closes — is the single most important step in the entire process.</p>

          {/* Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#1B3A6B] text-white">
                  <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Enrollment Period</th>
                  <th className="text-left px-4 py-3 font-semibold">Dates</th>
                  <th className="text-left px-4 py-3 font-semibold">Coverage Start</th>
                  <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">Penalty Risk</th>
                </tr>
              </thead>
              <tbody>
                {enrollmentPeriods.map((ep, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-[#1B3A6B] border-b border-gray-100">{ep.name}</td>
                    <td className="px-4 py-3 text-gray-700 border-b border-gray-100">{ep.dates}</td>
                    <td className="px-4 py-3 text-gray-700 border-b border-gray-100">{ep.coverageStart}</td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        ep.penaltyRisk.startsWith("Low") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {ep.penaltyRisk.startsWith("Low") ? "Low" : "High"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* IEP Detail */}
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Clock className="text-teal-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Initial Enrollment Period (IEP)</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    This is a 7-month window centered on your 65th birthday. It starts three months before the month you turn 65, includes your birthday month, and extends three months after. Enrolling in the first three months of your IEP means coverage begins on the first day of your birthday month. Waiting until the final three months delays your coverage start date by one to three months.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">General Enrollment Period (GEP)</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Runs from January 1 to March 31 each year. This is the fallback option for people who missed their IEP and don't qualify for a Special Enrollment Period. Coverage begins July 1 for those who enroll during this window. Enrolling through the GEP may also trigger the late enrollment penalty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEP Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-3">Special Enrollment Period (SEP): When You Can Delay without Penalty</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A Special Enrollment Period allows certain people to delay Part B past 65 without paying a penalty, but only under specific conditions. The key concept here is <em>creditable coverage</em> — meaning coverage that is at least as good as Medicare's standards.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            To qualify for a SEP, you must be covered under an employer-sponsored group health plan based on your own active employment, or the active employment of a spouse. Coverage through a former employer (like retiree insurance or COBRA) does not count. Individual health plans and marketplace plans purchased through the ACA exchange also do not qualify.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Once your employment or group coverage ends — whichever comes first — you have an 8-month window to enroll in Part B. This window begins the month after your employment ends or the month after your group health coverage ends. Acting within this period protects you from any late enrollment penalty.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Important: COBRA Does not Extend Your SEP Window</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The 8-month SEP window is separate from COBRA. Even if you elect COBRA continuation coverage after leaving your job, the SEP clock starts when your active employment (or the active employment of your covered spouse) ends. Relying on COBRA as a bridge does not extend your SEP window.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 border-l-4 border-emerald-700 rounded-r-xl p-5">
            <p className="font-bold text-gray-800 mb-1">Pro Tip</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              If you're approaching 65 and still working, contact your employer's HR or benefits department to get written confirmation that your group health plan is considered creditable coverage for Medicare purposes. Keep that documentation on file. If you ever need to prove your SEP eligibility or dispute a penalty, this paperwork is exactly what Medicare will ask for.
            </p>
          </div>
        </section>

        {/* Automatic Enrollment */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-3">Automatic Enrollment in Medicare Part B: What to Expect</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most individuals already receiving Social Security or Railroad Retirement Board benefits at least four months before turning 65 are automatically enrolled in Medicare Part B. If that describes your situation, you generally don't need to take any action — Medicare will sign you up on your behalf.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            When automatic enrollment occurs, you'll receive a "Welcome to Medicare" package in the mail roughly three months before your 65th birthday. Inside is your red, white, and blue Medicare card, showing enrollment in both Part A and Part B, along with your coverage start date.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-800 mb-2">If You Want to Decline Part B</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              If you're automatically enrolled but have creditable employer coverage and want to delay Part B, you can decline it. The welcome package includes instructions on how to return the card and opt out of Part B. Do this <strong>only</strong> if you have confirmed group health coverage through active employment — otherwise, declining could trigger a penalty later. If you're not yet receiving Social Security benefits when you turn 65, you will need to proactively enroll in Part B.
            </p>
          </div>
        </section>

        {/* Disability Beneficiaries */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-3">Medicare Part B Enrollment for Disability Beneficiaries in 2026</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Individuals receiving Social Security Disability Insurance (SSDI) benefits are typically automatically enrolled in Medicare Part B after a 24-month waiting period. The 24-month waiting period begins the month you become entitled to SSDI benefits — not the month you applied or were approved.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="text-teal-500 shrink-0" size={16} />
                <h3 className="font-bold text-gray-800 text-sm">ALS Exception</h3>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                Individuals diagnosed with Amyotrophic Lateral Sclerosis (ALS) receive Medicare coverage beginning the same month their SSDI benefits start — no 24-month waiting period required.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="text-teal-500 shrink-0" size={16} />
                <h3 className="font-bold text-gray-800 text-sm">ESRD Exception</h3>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                People with End-Stage Renal Disease (ESRD) have a separate qualification path, with coverage generally beginning after a three-month waiting period from the start of regular dialysis, or sooner in certain cases like a kidney transplant.
              </p>
            </div>
          </div>
        </section>

        {/* Late Enrollment Penalty */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-3">Avoiding the Medicare Part B Late Enrollment Penalty in 2026</h2>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={18} />
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Permanent 10% Penalty per 12-Month Gap</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The Medicare Part B late enrollment penalty is a permanent 10% increase to your premium for every 12-month period you were eligible for Part B but didn't enroll and didn't have creditable coverage. Unlike some other financial penalties, this one doesn't go away — it stays with you for as long as you have Part B.
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you went two full years without Part B and without creditable coverage, your penalty would be 20%. Applied to the 2026 standard premium of $202.90, that adds $40.58 per month to your bill — and that amount adjusts upward as the base premium increases each year.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <DollarSign className="text-amber-600 shrink-0 mt-0.5" size={18} />
              <div>
                <h3 className="font-bold text-gray-800 mb-1">IRMAA: Higher Earners Pay More</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Higher earners face an additional layer of cost through the Income-Related Monthly Adjustment Amount (IRMAA). In 2026, individuals with income above $109,000 (or joint filers above $218,000) pay more than the standard premium. At the highest income tier — above $500,000 for individuals — the Part B premium reaches $689.90 per month. A late enrollment penalty calculated on top of an already elevated IRMAA-adjusted premium can be quite substantial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Enroll */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-2">How to Enroll in Medicare Part B: Step-by-Step Guide for 2026</h2>
          <p className="text-gray-600 text-sm mb-5">You can enroll online through the Social Security website, by phone, or in person at a Social Security office.</p>
          <div className="space-y-6">
            {applicationMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 flex items-center gap-3 border-b border-gray-200">
                    <div className="bg-teal-100 rounded-lg p-2">
                      <Icon className="text-teal-600" size={18} />
                    </div>
                    <h3 className="font-bold text-gray-800">Option {i + 1}: {method.title}</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-700 text-sm mb-3">{method.desc}</p>
                    <ol className="space-y-1.5 mb-3">
                      {method.steps.map((step, si) => (
                        <li key={si} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {si + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <div className="bg-blue-50 rounded-lg px-3 py-2 text-xs text-blue-700">
                      <strong>Note:</strong> {method.note}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Required Documents */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Documents You May Need</h2>
          <ul className="space-y-2">
            {requiredDocuments.map((doc, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={16} />
                <span className="text-sm text-gray-700">{doc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Medicare Advantage & Medigap */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-3">Medicare Advantage (Part C) and Medigap: Complementing Your Part B Coverage</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Enrolling in Part B opens the door to additional coverage options that can significantly reduce your out-of-pocket exposure. Two of the most common are Medicare Advantage and Medigap, and both require active Part B enrollment to access.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-800 mb-2">Medicare Advantage (Part C)</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                An alternative way to receive your Medicare benefits through a private insurer. These plans typically bundle Part A, Part B, and often Part D prescription drug coverage together. Some include extras like dental and vision. However, most Advantage plans use networks, so your choice of doctors and hospitals may be more limited.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-800 mb-2">Medigap (Medicare Supplement)</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Works alongside Original Medicare, covering costs like copays, coinsurance, and deductibles that Medicare leaves unpaid. If you see a lot of specialists or want broader flexibility in choosing providers, Medigap can provide more predictable costs.
              </p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> You cannot hold both a Medicare Advantage plan and a Medigap policy at the same time. You choose one path or the other. Understanding this distinction before enrolling helps you avoid confusion — and potential wasted premiums — later on.
            </p>
          </div>
        </section>

        {/* Key Considerations */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-3">Key Considerations for Your Medicare Part B Enrollment Decision</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have employer-sponsored group health coverage through your own active job or a spouse's active job, delaying Part B is generally reasonable. You're protected from the penalty and can use your SEP once coverage ends.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            However, if your only coverage is through a marketplace plan, an individual policy, or retiree insurance, the rules change entirely. These types of coverage do <em>not</em> qualify as creditable coverage under Medicare's definition. Delaying Part B while relying on them will result in a late enrollment penalty once you eventually sign up.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Your health needs matter too. If you have chronic conditions, take multiple medications, or see specialists regularly, the value of having Part B from the start likely outweighs the monthly premium cost.
          </p>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-5">Frequently Asked Questions about Medicare Part B Enrollment</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="mb-10 bg-gray-50 border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-[#1B3A6B] mb-3">How We Verify this Information</h2>
          <p className="text-sm text-gray-700 mb-3">Our commitment is to provide you with accurate, trustworthy, and up-to-date information. Key resources we consult include:</p>
          <ul className="space-y-1">
            {[
              { label: "Centers for Medicare & Medicaid Services (CMS)", href: "https://www.cms.gov/" },
              { label: "Social Security Administration (SSA)", href: "https://www.ssa.gov/medicare" },
              { label: "KFF (Kaiser Family Foundation)", href: "https://www.kff.org/topic/medicare/" },
            ].map((src, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <ArrowRight className="text-teal-500 shrink-0" size={12} />
                <a href={src.href} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">{src.label}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* Related Links */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Medicare Part B Overview", href: "/original-medicare/medicare-parts/medicare-part-b" },
              { label: "Medicare Enrollment Periods", href: "/original-medicare/medicare-enrollment-periods" },
              { label: "Medicare Part B Late Enrollment Penalty", href: "/faqs/medicare-part-b-late-enrollment-penalty" },
              { label: "Medigap Open Enrollment", href: "/medicare-supplements/medigap-eligibility" },
              { label: "How to Apply for Medicare Part B", href: "/original-medicare/medicare-parts/apply-for-medicare-part-b" },
              { label: "Medicare Eligibility", href: "/original-medicare/medicare-eligibility" },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors text-sm text-gray-700 hover:text-teal-700 font-medium"
              >
                <ArrowRight className="text-teal-500 shrink-0" size={14} />
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Need Help with Medicare Part B Enrollment?</h3>
          <p className="text-blue-200 mb-6">
            Our licensed Medicare specialists can guide you through the enrollment process and help you avoid costly penalties — at no cost to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "medicare_part_b_enrollment" })}
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Phone size={18} />
              Call (888) 335-8996
            </a>
            <ZipFormModal
              coverageType="ms"
              triggerLabel="Compare Plans"
              triggerClassName="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#1B3A6B] font-semibold px-6 py-3 rounded-lg transition-colors"
              pageSection="medicare_part_b_enrollment"
              triggerId="compare-plans-part-b-enrollment"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
