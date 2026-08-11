"use client";
import Link from "next/link";
import ZipFormModal from "@/components/ZipFormModal";
import { LayoutGrid, ArrowRight, CheckCircle2, XCircle, ChevronDown, Shield, Heart, Pill, DollarSign, Users, FileText } from "lucide-react";
import { useState } from "react";

/**
 * Types of Medicare Plans Explained - Pillar Page
 * /medicare-part-c/medicare-advantage-plan-types/
 *
 * Targets: "types of medicare plans" (pos 49) + "medicare advantage plans" (pos 14)
 * Structure: comprehensive overview of ALL Medicare plan types with internal links to spokes
 */

const masterComparisonTable = {
  headers: ["Feature", "Original Medicare (A + B)", "Medicare Advantage (Part C)", "Medigap (Supplement)", "Part D (Drug)"],
  rows: [
    ["What It Covers", "Hospital (A) + Medical (B)", "All of A + B, often drugs + extras", "Fills gaps in Original Medicare costs", "Prescription drugs only"],
    ["Monthly Premium", "$202.90 (Part B, 2026)", "Often $0 beyond Part B", "$30-$300+ depending on plan/age", "Avg. $34.50 (2026)"],
    ["Out-of-Pocket Max", "No cap without Medigap", "$9,250 in-network (2026)", "Most plans cover 100% after deductible", "$2,100 (2026)"],
    ["Network Rules", "Any doctor accepting Medicare", "HMO/PPO network required", "Works with any Medicare provider", "Plan formulary applies"],
    ["Referrals Needed", "No", "Yes (HMO) / No (PPO)", "No", "No"],
    ["Drug Coverage", "Not included", "Usually included (MAPD)", "Not included", "Yes - standalone or bundled"],
    ["Best For", "Flexibility + Medigap pairing", "All-in-one + low premiums", "Predictable costs + travel", "Anyone on Original Medicare"],
  ],
};

const maSubTypes = [
  {
    id: "hmo",
    name: "HMO (Health Maintenance Organization)",
    href: "/medicare-part-c/medicare-advantage-plan-hmo",
    color: "border-teal-400 bg-teal-50",
    headerColor: "bg-teal-600",
    description: "Lower costs with a defined network of doctors and hospitals. Requires a primary care physician and referrals for specialists. Out-of-network care is not covered except in emergencies.",
    bestFor: "Beneficiaries who want lower costs and are comfortable staying within a local provider network.",
  },
  {
    id: "ppo",
    name: "PPO (Preferred Provider Organization)",
    href: "/medicare-part-c/medicare-advantage-plan-ppo",
    color: "border-blue-400 bg-blue-50",
    headerColor: "bg-blue-600",
    description: "More flexibility to see any Medicare-accepting provider without referrals. In-network care costs less, but out-of-network care is still partially covered. Higher premiums than HMO plans.",
    bestFor: "Beneficiaries who want flexibility to see specialists without referrals or who travel frequently.",
  },
  {
    id: "pffs",
    name: "PFFS (Private Fee-for-Service)",
    href: "/medicare-part-c/medicare-advantage-plan-pffs",
    color: "border-purple-400 bg-purple-50",
    headerColor: "bg-purple-600",
    description: "No fixed network - you can see any Medicare-accepting provider who agrees to the plan's payment terms. Availability varies by region and providers are not required to accept the plan.",
    bestFor: "Beneficiaries in rural areas with limited network options or those who want maximum provider choice.",
  },
  {
    id: "snp",
    name: "SNP (Special Needs Plan)",
    href: "/medicare-part-c/medicare-advantage-plan-snp",
    color: "border-amber-400 bg-amber-50",
    headerColor: "bg-amber-600",
    description: "Tailored benefits for people with specific chronic conditions (diabetes, heart disease), dual eligibility (Medicare + Medicaid), or institutional care needs. Coordinated care model with specialized providers.",
    bestFor: "Beneficiaries with chronic conditions, dual Medicare/Medicaid eligibility, or who live in nursing facilities.",
  },
];

const faqs = [
  { q: "What are the 4 main types of Medicare plans?", a: "The four main types are Original Medicare (Parts A and B), Medicare Advantage (Part C), Medicare Supplement (Medigap), and Medicare Part D prescription drug plans. Original Medicare provides the foundation, while the others build on or replace it." },
  { q: "What is the difference between Medicare Advantage and Original Medicare?", a: "Original Medicare lets you see any Medicare-accepting doctor nationwide with no network restrictions but has no annual out-of-pocket cap. Medicare Advantage uses managed care networks (HMO or PPO) with a $9,250 annual cap in 2026, and often includes drug coverage and extra benefits like dental and vision." },
  { q: "Can I have both Medigap and Medicare Advantage?", a: "No. Medigap supplements Original Medicare only. If you enroll in Medicare Advantage, you cannot also have a Medigap policy. You must choose one path: Original Medicare + Medigap + standalone Part D, or Medicare Advantage (which typically bundles everything together)." },
  { q: "Which type of Medicare plan is best for me?", a: "It depends on your priorities. If you want predictable costs and nationwide provider access, Original Medicare with Medigap is typically best. If you want lower premiums and are comfortable with a local network, Medicare Advantage may be a better fit. Consider your health needs, preferred doctors, medications, and budget." },
  { q: "Do all Medicare Advantage plans include drug coverage?", a: "Most do. Approximately 90% of Medicare Advantage plans are MAPD plans that bundle prescription drug coverage. However, some MA-only plans do not include drugs, in which case you would need a separate Part D plan. Always verify before enrolling." },
  { q: "What does Medigap cover that Medicare Advantage does not?", a: "Medigap covers the cost-sharing gaps in Original Medicare - the Part A deductible ($1,736 in 2026), Part B coinsurance (20% of approved charges), and hospital coinsurance for extended stays. It provides predictable costs with no network restrictions, while Medicare Advantage uses copays and coinsurance that vary by service." },
  { q: "How much does Medicare cost per month in 2026?", a: "Everyone pays the Part B premium of $202.90 per month. Beyond that, costs depend on your plan type: Medigap adds $30-$300+ monthly, Medicare Advantage often adds $0, and Part D averages $34.50 per month. Higher-income enrollees also pay IRMAA surcharges." },
  { q: "When can I change my Medicare plan type?", a: "You can switch between Original Medicare and Medicare Advantage during the Annual Enrollment Period (October 15 - December 7) or the Medicare Advantage Open Enrollment Period (January 1 - March 31). Medigap enrollment has its own rules - guaranteed issue rights are strongest during your initial 6-month open enrollment window at age 65." },
];

export default function PageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B3A6B] to-[#2d5a9e] text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <LayoutGrid size={14} aria-hidden="true" />
            Medicare Plan Types Guide
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Types of Medicare Plans Explained
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Understand every Medicare plan type available in 2026 - Original Medicare, Medicare Advantage, Medigap, and Part D - so you can choose the right combination for your health needs and budget.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Answer Block */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-10">
          <p className="text-gray-800 text-sm leading-relaxed">
            <strong>Quick Answer:</strong> Medicare has four main plan types. Original Medicare (Parts A + B) covers hospital and medical services with any Medicare provider nationwide. Medicare Advantage (Part C) replaces Original Medicare with managed care that often includes drugs and extras. Medigap supplements Original Medicare to reduce out-of-pocket costs. Part D provides prescription drug coverage as a standalone plan or bundled with Medicare Advantage.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-10" aria-label="Table of Contents">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">In This Guide</h2>
          <ol className="space-y-1.5 list-decimal list-inside text-sm">
            <li><a href="#comparison" className="text-teal-700 hover:underline">Side-by-Side Plan Comparison</a></li>
            <li><a href="#original-medicare" className="text-teal-700 hover:underline">Original Medicare (Parts A and B)</a></li>
            <li><a href="#medicare-advantage" className="text-teal-700 hover:underline">Medicare Advantage (Part C)</a></li>
            <li><a href="#ma-plan-types" className="text-teal-700 hover:underline">Medicare Advantage Plan Types (HMO, PPO, PFFS, SNP)</a></li>
            <li><a href="#medigap" className="text-teal-700 hover:underline">Medicare Supplement (Medigap)</a></li>
            <li><a href="#part-d" className="text-teal-700 hover:underline">Medicare Part D (Prescription Drugs)</a></li>
            <li><a href="#choosing" className="text-teal-700 hover:underline">How to Choose the Right Plan Type</a></li>
            <li><a href="#faqs" className="text-teal-700 hover:underline">Frequently Asked Questions</a></li>
          </ol>
        </nav>

        {/* Master Comparison Table */}
        <section id="comparison" className="mb-12">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Medicare Plan Types: Side-by-Side Comparison</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            The table below compares all four Medicare plan types across the features that matter most: coverage scope, monthly costs, out-of-pocket maximums, network rules, and who each plan type serves best.
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#1B3A6B] text-white">
                  {masterComparisonTable.headers.map((h, i) => (
                    <th key={i} className="px-3 py-3 text-left font-semibold text-xs" scope="col">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {masterComparisonTable.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {row.map((cell, ci) => (
                      ci === 0 ? (
                        <th key={ci} scope="row" className="px-3 py-2.5 border-b border-gray-100 font-semibold text-gray-800 text-left text-xs">
                          {cell}
                        </th>
                      ) : (
                        <td key={ci} className="px-3 py-2.5 border-b border-gray-100 text-gray-600 text-xs">
                          {cell}
                        </td>
                      )
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Original Medicare */}
        <section id="original-medicare" className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Shield className="text-blue-700" size={20} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B3A6B]">Original Medicare (Parts A and B)</h2>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Original Medicare is the federal health insurance program administered directly by the government. It consists of two parts that work together to cover most medical services:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-2">Part A - Hospital Insurance</h3>
              <p className="text-sm text-gray-700 mb-2">Covers inpatient hospital stays, skilled nursing facility care, hospice, and some home health services.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start gap-1.5"><CheckCircle2 size={13} className="text-blue-500 mt-0.5 shrink-0" aria-hidden="true" />Premium-free for most (40+ work credits)</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 size={13} className="text-blue-500 mt-0.5 shrink-0" aria-hidden="true" />2026 deductible: $1,736 per benefit period</li>
              </ul>
              <Link href="/faqs/what-does-medicare-part-a-cover/" className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 mt-3">
                What does Part A cover? <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-bold text-green-900 mb-2">Part B - Medical Insurance</h3>
              <p className="text-sm text-gray-700 mb-2">Covers doctor visits, outpatient care, preventive services, durable medical equipment, and lab tests.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start gap-1.5"><CheckCircle2 size={13} className="text-green-500 mt-0.5 shrink-0" aria-hidden="true" />2026 premium: $202.90/month</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 size={13} className="text-green-500 mt-0.5 shrink-0" aria-hidden="true" />2026 deductible: $283/year</li>
              </ul>
              <Link href="/faqs/what-does-medicare-part-b-cover/" className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 mt-3">
                What does Part B cover? <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> Original Medicare has no annual out-of-pocket maximum. Without supplemental coverage (Medigap), your 20% coinsurance on Part B services is unlimited. This is why most beneficiaries pair Original Medicare with a <Link href="/faqs/what-is-a-medicare-supplement-plan-and-who-needs-one/" className="text-teal-700 underline hover:text-teal-900">Medigap policy</Link> or choose Medicare Advantage instead.
            </p>
          </div>
        </section>

        {/* Medicare Advantage */}
        <section id="medicare-advantage" className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Heart className="text-purple-700" size={20} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B3A6B]">Medicare Advantage Plans (Part C)</h2>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <Link href="/faqs/what-is-medicare-advantage/" className="text-teal-700 underline hover:text-teal-900">Medicare Advantage</Link> plans are offered by private insurance companies approved by Medicare. They provide all Part A and Part B benefits through a managed care network, and most plans bundle prescription drug coverage (MAPD) along with extra benefits like dental, vision, hearing, and fitness programs.
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-purple-900 mb-2">Key Features of Medicare Advantage</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-purple-500 mt-0.5 shrink-0" aria-hidden="true" />Annual out-of-pocket maximum of $9,250 for in-network services (2026)</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-purple-500 mt-0.5 shrink-0" aria-hidden="true" />Often $0 additional monthly premium beyond Part B</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-purple-500 mt-0.5 shrink-0" aria-hidden="true" />Extra benefits not covered by Original Medicare (dental, vision, hearing)</li>
              <li className="flex items-start gap-2"><XCircle size={14} className="text-red-400 mt-0.5 shrink-0" aria-hidden="true" />Network restrictions - must use plan providers (HMO) or pay more (PPO)</li>
              <li className="flex items-start gap-2"><XCircle size={14} className="text-red-400 mt-0.5 shrink-0" aria-hidden="true" />Prior authorization required for many services</li>
            </ul>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You must continue paying your Part B premium ($202.90/month in 2026) in addition to any Medicare Advantage plan premium. Learn more about the <Link href="/medicare-part-c/medicare-advantage-costs" className="text-teal-700 underline hover:text-teal-900">full cost breakdown of Medicare Advantage</Link> and how it compares to <Link href="/medicare-part-c/medicare-advantage-vs-original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link>.
          </p>
        </section>

        {/* Mid-page CTA */}
        <aside className="bg-[#1B3A6B] rounded-2xl p-6 text-white text-center mb-12">
          <h3 className="text-lg font-bold mb-2">Not Sure Which Plan Type Is Right for You?</h3>
          <p className="text-blue-200 text-sm mb-4">
            Compare Medicare Advantage and Medigap plans available in your area. Our licensed specialists can help you find the best fit.
          </p>
          <ZipFormModal
            coverageType="ms"
            triggerLabel="Compare Plans in Your Area"
            triggerClassName="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            pageSection="plan_types_pillar_mid"
            triggerId="compare-plans-pillar-mid" />
        </aside>

        {/* MA Sub-Types */}
        <section id="ma-plan-types" className="mb-12">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-2">Medicare Advantage Plan Types: HMO, PPO, PFFS, and SNP</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Within Medicare Advantage, there are four main plan structures. Each uses a different approach to provider networks, referrals, and cost-sharing. Understanding these differences is critical to choosing the right plan.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {maSubTypes.map((plan) => (
              <article key={plan.id} className={`border-2 ${plan.color} rounded-xl overflow-hidden`}>
                <div className={`${plan.headerColor} px-4 py-2.5`}>
                  <h3 className="text-white font-bold text-sm">{plan.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-700 mb-3">{plan.description}</p>
                  <div className="bg-white/60 rounded-lg p-3 mb-3">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Best For</div>
                    <p className="text-sm text-gray-700">{plan.bestFor}</p>
                  </div>
                  <Link
                    href={plan.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
                  >
                    Learn more <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Medigap */}
        <section id="medigap" className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
              <FileText className="text-teal-700" size={20} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B3A6B]">Medicare Supplement Plans (Medigap)</h2>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <Link href="/faqs/what-is-a-medicare-supplement-plan-and-who-needs-one/" className="text-teal-700 underline hover:text-teal-900">Medigap plans</Link> are standardized supplemental insurance policies sold by private companies that help pay the out-of-pocket costs left by Original Medicare - deductibles, coinsurance, and copayments. They do not replace Medicare; they work alongside it.
          </p>
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-teal-900 mb-2">Key Features of Medigap</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />Standardized plans (A, B, C, D, F, G, K, L, M, N) - same benefits regardless of insurer</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />Works with any doctor or hospital that accepts Medicare nationwide</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />Predictable costs - most plans cover 100% of gaps after deductible</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />No network restrictions, no referrals, no prior authorization</li>
              <li className="flex items-start gap-2"><XCircle size={14} className="text-red-400 mt-0.5 shrink-0" aria-hidden="true" />Does not include prescription drug coverage (need separate Part D)</li>
              <li className="flex items-start gap-2"><XCircle size={14} className="text-red-400 mt-0.5 shrink-0" aria-hidden="true" />Monthly premiums higher than Medicare Advantage</li>
            </ul>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            The most popular Medigap plans in 2026 are <Link href="/medicare-supplement-plans/plan-g/" className="text-teal-700 underline hover:text-teal-900">Plan G</Link> and <Link href="/medicare-supplement-plans/plan-n/" className="text-teal-700 underline hover:text-teal-900">Plan N</Link>. Plan G covers everything except the Part B deductible ($283 in 2026), while Plan N has lower premiums but includes small copays for office visits and ER visits that do not result in admission.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Guaranteed issue rights for Medigap are strongest during your <Link href="/faqs/medicare-supplement-open-enrollment/" className="text-teal-700 underline hover:text-teal-900">Medigap Open Enrollment Period</Link> - the 6-month window starting when you turn 65 and enroll in Part B. After this window, insurers can use medical underwriting to deny coverage or charge higher premiums.
          </p>
        </section>

        {/* Part D */}
        <section id="part-d" className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Pill className="text-red-700" size={20} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B3A6B]">Medicare Part D (Prescription Drug Coverage)</h2>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <Link href="/faqs/top-5-medicare-prescription-drug-plans/" className="text-teal-700 underline hover:text-teal-900">Medicare Part D</Link> provides prescription drug coverage through private insurance plans approved by Medicare. You can get Part D coverage either as a standalone plan (paired with Original Medicare) or bundled within a Medicare Advantage plan (MAPD).
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-red-900 mb-2">2026 Part D Key Numbers</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2"><DollarSign size={14} className="text-red-500 mt-0.5 shrink-0" aria-hidden="true" />Average monthly premium: $34.50</li>
              <li className="flex items-start gap-2"><DollarSign size={14} className="text-red-500 mt-0.5 shrink-0" aria-hidden="true" />Maximum annual deductible: $615</li>
              <li className="flex items-start gap-2"><DollarSign size={14} className="text-red-500 mt-0.5 shrink-0" aria-hidden="true" />Annual out-of-pocket cap: $2,100 (new for 2025+)</li>
              <li className="flex items-start gap-2"><DollarSign size={14} className="text-red-500 mt-0.5 shrink-0" aria-hidden="true" />$35/month cap on insulin costs</li>
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Each Part D plan has its own formulary (list of covered drugs) organized into cost-sharing tiers. Before enrolling, check that your specific medications are covered and at what tier level. Learn more about <Link href="/faqs/what-is-a-medicare-part-d-formulary/" className="text-teal-700 underline hover:text-teal-900">how Part D formularies work</Link>.
          </p>
        </section>

        {/* How to Choose */}
        <section id="choosing" className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Users className="text-amber-700" size={20} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B3A6B]">How to Choose the Right Medicare Plan Type</h2>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Choosing between plan types comes down to four factors: your health needs, your preferred doctors, your medications, and your budget tolerance for unexpected costs.
          </p>
          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-1 text-sm">Choose Original Medicare + Medigap if you...</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>- Want to see any Medicare-accepting doctor nationwide without referrals</li>
                <li>- Travel frequently or split time between states</li>
                <li>- Want predictable, low out-of-pocket costs regardless of health events</li>
                <li>- Can afford a higher monthly premium for peace of mind</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-1 text-sm">Choose Medicare Advantage if you...</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>- Want the lowest possible monthly premium</li>
                <li>- Are comfortable using a local network of providers</li>
                <li>- Want dental, vision, and hearing benefits bundled in</li>
                <li>- Prefer a single plan that covers everything (medical + drugs)</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            For a detailed comparison, read our guide on <Link href="/faqs/medigap-vs-medicare-advantage/" className="text-teal-700 underline hover:text-teal-900">Medigap vs. Medicare Advantage</Link> to see how costs, coverage, and flexibility compare in real-world scenarios.
          </p>
        </section>

        {/* FAQs */}
        <section id="faqs" className="mb-12">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-sm">{faq.q}</span>
                  <ChevronDown
                    className={`shrink-0 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    size={18}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-gray-700 leading-relaxed border-t border-gray-100 pt-3 text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <aside aria-label="Compare Medicare Plans" className="bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Find the Right Medicare Plan for You</h3>
          <p className="text-blue-200 mb-6">
            Compare Medicare Advantage, Medigap, and Part D plans available in your area with help from our licensed specialists.
          </p>
          <ZipFormModal
            coverageType="ms"
            triggerLabel="Compare Plans"
            triggerClassName="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            pageSection="plan_types_pillar_bottom"
            triggerId="compare-plans-pillar-bottom" />
        </aside>
      </div>
    </main>
  );
}
