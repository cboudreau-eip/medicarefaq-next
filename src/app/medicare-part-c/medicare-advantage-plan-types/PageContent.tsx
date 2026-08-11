"use client";
/**
 * Types of Medicare Plans Explained - Pillar Page
 * Design: Matches /medicare-part-c/medicare-advantage-plans/ overview page
 * Targets: "types of medicare plans" + "medicare advantage plans"
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  Shield,
  DollarSign,
  Pill,
  FileText,
  Users,
  LayoutGrid,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";

const tableOfContents = [
  { id: "comparison", label: "Plan Comparison Table" },
  { id: "original-medicare", label: "Original Medicare (A + B)" },
  { id: "medicare-advantage", label: "Medicare Advantage (Part C)" },
  { id: "ma-plan-types", label: "MA Plan Types (HMO, PPO...)" },
  { id: "medigap", label: "Medigap (Supplement)" },
  { id: "part-d", label: "Part D (Prescription Drugs)" },
  { id: "choosing", label: "How to Choose" },
  { id: "faqs", label: "Frequently Asked Questions" },
];

const faqs = [
  {
    q: "What are the 4 main types of Medicare plans?",
    a: (<>The four main types are Original Medicare (Parts A and B), Medicare Advantage (Part C), Medicare Supplement (Medigap), and Medicare Part D prescription drug plans. Original Medicare provides the foundation, while the others build on or replace it.</>),
  },
  {
    q: "What is the difference between Medicare Advantage and Original Medicare?",
    a: (<>Original Medicare lets you see any Medicare-accepting doctor nationwide with no network restrictions but has no annual out-of-pocket cap. Medicare Advantage uses managed care networks (HMO or PPO) with a $9,250 annual cap in 2026, and often includes drug coverage and extra benefits like dental and vision.</>),
  },
  {
    q: "Can I have both Medigap and Medicare Advantage?",
    a: (<>No. <Link href="/medicare-supplement-plans" className="text-teal-700 underline hover:text-teal-900">Medigap</Link> supplements Original Medicare only. If you enroll in Medicare Advantage, you cannot also have a Medigap policy. You must choose one path: Original Medicare + Medigap + standalone Part D, or Medicare Advantage (which typically bundles everything together).</>),
  },
  {
    q: "Which type of Medicare plan is best for me?",
    a: "It depends on your priorities. If you want predictable costs and nationwide provider access, Original Medicare with Medigap is typically best. If you want lower premiums and are comfortable with a local network, Medicare Advantage may be a better fit. Consider your health needs, preferred doctors, medications, and budget.",
  },
  {
    q: "Do all Medicare Advantage plans include drug coverage?",
    a: "Most do. Approximately 90% of Medicare Advantage plans are MAPD plans that bundle prescription drug coverage. However, some MA-only plans do not include drugs, in which case you would need a separate Part D plan. Always verify before enrolling.",
  },
  {
    q: "What does Medigap cover that Medicare Advantage does not?",
    a: "Medigap covers the cost-sharing gaps in Original Medicare - the Part A deductible ($1,736 in 2026), Part B coinsurance (20% of approved charges), and hospital coinsurance for extended stays. It provides predictable costs with no network restrictions, while Medicare Advantage uses copays and coinsurance that vary by service.",
  },
  {
    q: "How much does Medicare cost per month in 2026?",
    a: "Everyone pays the Part B premium of $202.90 per month. Beyond that, costs depend on your plan type: Medigap adds $30-$300+ monthly, Medicare Advantage often adds $0, and Part D averages $34.50 per month. Higher-income enrollees also pay IRMAA surcharges.",
  },
  {
    q: "When can I change my Medicare plan type?",
    a: (<>You can switch between Original Medicare and Medicare Advantage during the <Link href="/faqs/medicare-annual-enrollment-period/" className="text-teal-700 underline hover:text-teal-900">Annual Enrollment Period</Link> (October 15 - December 7) or the Medicare Advantage Open Enrollment Period (January 1 - March 31). Medigap enrollment has its own rules - guaranteed issue rights are strongest during your initial 6-month open enrollment window at age 65.</>),
  },
];

export default function PageContent() {
  const [activeSection, setActiveSection] = useState("comparison");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-400 mb-6 list-none">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" /></li>
              <li><Link href="/medicare-part-c/medicare-advantage-plans" className="hover:text-white transition-colors">Medicare Plans</Link></li>
              <li><ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" /></li>
              <li aria-current="page"><span className="text-teal-400">Types of Medicare Plans</span></li>
            </ol>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-600/20 rounded-xl flex items-center justify-center">
              <LayoutGrid className="w-6 h-6 text-teal-400" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Plan Types</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Types of Medicare Plans Explained
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Understand every Medicare plan type available in 2026 - Original Medicare, Medicare Advantage, Medigap, and Part D - so you can choose the right combination for your health needs and budget.
          </p>
          <div className="flex flex-wrap gap-4">
            <ZipFormModal
              pageSection="plan_types_pillar"
              coverageType="ms"
              title="Compare Medicare Plans in Your Area"
              subtitle="Enter your ZIP code to compare plans available near you - free, no obligation."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Find Plans in Your Area <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              }
            />
            <a href="tel:+18883358996" data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "plan_types_pillar" })} className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              <Phone className="w-4 h-4" aria-hidden="true" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-row-reverse gap-12">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-4">In This Guide</p>
                <nav aria-label="Table of contents">
                  <ul className="space-y-1 list-none">
                    {tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`}
                          className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                            activeSection === item.id ? "bg-teal-50 text-teal-700 font-semibold" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                          }`}
                        >{item.label}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Need Help?</p>
                  <p className="text-xs text-blue-700 mb-3">Speak with a licensed Medicare agent</p>
                  <a href="tel:+18883358996" data-invoca-phone-number="18883358996"
                    onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "plan_types_pillar" })} className="invoca-phone flex items-center gap-2 text-sm font-bold text-blue-700">
                    <Phone className="w-4 h-4" aria-hidden="true" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Key Takeaways */}
              <aside className="bg-teal-50/50 border border-teal-100 rounded-2xl p-6 mb-12">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" aria-hidden="true" />
                  <h3 className="font-bold text-teal-900 text-sm uppercase tracking-wider">Key Takeaways</h3>
                </div>
                <ul className="space-y-2 list-none">
                  {[
                    (<>Medicare has <strong>four main plan types</strong>: Original Medicare (A + B), Medicare Advantage (Part C), Medigap supplements, and Part D drug plans.</>),
                    (<>You cannot have both Medigap and Medicare Advantage at the same time - you must choose one path.</>),
                    (<>Original Medicare has <strong>no out-of-pocket cap</strong> without Medigap, while Medicare Advantage caps costs at $9,250 in 2026.</>),
                    (<>The best plan type depends on your health needs, preferred doctors, medications, and budget tolerance for unexpected costs.</>),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-teal-800">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Stat Cards */}
              <div className="grid md:grid-cols-4 gap-4 mb-12">
                {[
                  { value: "4", label: "Main Medicare plan types" },
                  { value: "$202.90", label: "Part B premium (2026)" },
                  { value: "$9,250", label: "MA out-of-pocket max (2026)" },
                  { value: "$2,100", label: "Part D out-of-pocket cap (2026)" },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center">
                    <div className="text-2xl font-bold text-teal-600 mb-1">{stat.value}</div>
                    <p className="text-xs text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Comparison Table */}
              <section id="comparison" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medicare Plan Types: Side-by-Side Comparison
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  The table below compares all four Medicare plan types across the features that matter most: coverage scope, monthly costs, out-of-pocket maximums, network rules, and who each plan type serves best.
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Feature</th>
                        <th className="text-left py-3 px-4 font-semibold">Original Medicare (A + B)</th>
                        <th className="text-left py-3 px-4 font-semibold">Medicare Advantage (C)</th>
                        <th className="text-left py-3 px-4 font-semibold">Medigap</th>
                        <th className="text-left py-3 px-4 font-semibold">Part D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["What It Covers", "Hospital (A) + Medical (B)", "All of A + B, often drugs + extras", "Fills gaps in Original Medicare costs", "Prescription drugs only"],
                        ["Monthly Premium", "$202.90 (Part B, 2026)", "Often $0 beyond Part B", "$30-$300+ depending on plan/age", "Avg. $34.50 (2026)"],
                        ["Out-of-Pocket Max", "No cap without Medigap", "$9,250 in-network (2026)", "Most plans cover 100% after deductible", "$2,100 (2026)"],
                        ["Network Rules", "Any doctor accepting Medicare", "HMO/PPO network required", "Works with any Medicare provider", "Plan formulary applies"],
                        ["Referrals Needed", "No", "Yes (HMO) / No (PPO)", "No", "No"],
                        ["Drug Coverage", "Not included", "Usually included (MAPD)", "Not included", "Yes - standalone or bundled"],
                        ["Best For", "Flexibility + Medigap pairing", "All-in-one + low premiums", "Predictable costs + travel", "Anyone on Original Medicare"],
                      ].map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="py-3 px-4 text-slate-700 font-medium">{row[0]}</td>
                          <td className="py-3 px-4 text-slate-600">{row[1]}</td>
                          <td className="py-3 px-4 text-slate-600">{row[2]}</td>
                          <td className="py-3 px-4 text-slate-600">{row[3]}</td>
                          <td className="py-3 px-4 text-slate-600">{row[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Original Medicare */}
              <section id="original-medicare" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Original Medicare (Parts A and B)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Original Medicare is the federal health insurance program administered directly by the government. It consists of two parts that work together to cover most medical services.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-blue-600" aria-hidden="true" />
                      <h3 className="font-semibold text-slate-900">Part A - Hospital Insurance</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">Covers inpatient hospital stays, skilled nursing facility care, hospice, and some home health services.</p>
                    <ul className="space-y-1 text-sm text-slate-600 list-none">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" aria-hidden="true" />Premium-free for most (40+ work credits)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" aria-hidden="true" />2026 deductible: $1,736 per benefit period</li>
                    </ul>
                    <Link href="/faqs/what-does-medicare-part-a-cover/" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800 mt-3">
                      What does Part A cover? <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="p-5 bg-green-50/50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-5 h-5 text-green-600" aria-hidden="true" />
                      <h3 className="font-semibold text-slate-900">Part B - Medical Insurance</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">Covers doctor visits, outpatient care, preventive services, durable medical equipment, and lab tests.</p>
                    <ul className="space-y-1 text-sm text-slate-600 list-none">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />2026 premium: $202.90/month</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />2026 deductible: $283/year</li>
                    </ul>
                    <Link href="/faqs/what-does-medicare-part-b-cover/" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800 mt-3">
                      What does Part B cover? <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-slate-700">
                    <strong>Important:</strong> Original Medicare has no annual out-of-pocket maximum. Without supplemental coverage, your 20% coinsurance on Part B services is unlimited. This is why most beneficiaries pair Original Medicare with a <Link href="/faqs/what-is-a-medicare-supplement-plan-and-who-needs-one/" className="text-teal-700 underline hover:text-teal-900">Medigap policy</Link> or choose Medicare Advantage instead.
                  </p>
                </div>
              </section>

              {/* Medicare Advantage */}
              <section id="medicare-advantage" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medicare Advantage Plans (Part C)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  <Link href="/faqs/what-is-medicare-advantage/" className="text-teal-700 underline hover:text-teal-900">Medicare Advantage</Link> plans are offered by private insurance companies approved by Medicare. They provide all Part A and Part B benefits through a managed care network, and most plans bundle prescription drug coverage (MAPD) along with extra benefits like dental, vision, hearing, and fitness programs.
                </p>
                <ul className="space-y-2 mb-6 list-none">
                  {[
                    { positive: true, text: "Annual out-of-pocket maximum of $9,250 for in-network services (2026)" },
                    { positive: true, text: "Often $0 additional monthly premium beyond Part B" },
                    { positive: true, text: "Extra benefits not covered by Original Medicare (dental, vision, hearing)" },
                    { positive: false, text: "Network restrictions - must use plan providers (HMO) or pay more (PPO)" },
                    { positive: false, text: "Prior authorization required for many services" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      {item.positive ? <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" /> : <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" aria-hidden="true" />}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  You must continue paying your Part B premium ($202.90/month in 2026) in addition to any Medicare Advantage plan premium. Learn more about the <Link href="/medicare-part-c/medicare-advantage-costs" className="text-teal-700 underline hover:text-teal-900">full cost breakdown</Link> and how it compares to <Link href="/medicare-part-c/medicare-advantage-vs-original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link>.
                </p>
              </section>

              {/* Mid-page CTA */}
              <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-8 text-white mb-16">
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Merriweather', serif" }}>Not Sure Which Plan Type Is Right for You?</h3>
                <p className="text-teal-100 mb-6 max-w-xl">Compare Medicare Advantage and Medigap plans available in your area. Our licensed specialists can help you find the best fit.</p>
                <div className="flex flex-wrap gap-4">
                  <ZipFormModal
                    pageSection="plan_types_pillar_mid"
                    coverageType="ms"
                    title="Compare Plans in Your Area"
                    subtitle="Enter your ZIP code to see available plans - free, no obligation."
                    buttonLabel="Compare Plans"
                    trigger={
                      <button className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
                        <Heart className="w-4 h-4" aria-hidden="true" /> Compare Plans in Your Area
                      </button>
                    }
                  />
                  <a href="tel:+18883358996" data-invoca-phone-number="18883358996"
                    onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "plan_types_pillar" })} className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                    <Phone className="w-4 h-4" aria-hidden="true" /> Call (888) 335-8996
                  </a>
                </div>
              </div>

              {/* MA Sub-Types */}
              <section id="ma-plan-types" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medicare Advantage Plan Types: HMO, PPO, PFFS, and SNP
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Within Medicare Advantage, there are four main plan structures. Each uses a different approach to provider networks, referrals, and cost-sharing.
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Plan Type</th>
                        <th className="text-left py-3 px-4 font-semibold">Network</th>
                        <th className="text-left py-3 px-4 font-semibold">Referrals</th>
                        <th className="text-left py-3 px-4 font-semibold">Out-of-Network</th>
                        <th className="text-left py-3 px-4 font-semibold">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["HMO", "Must use network", "Yes (usually)", "Emergency only", "Lower costs, local care"],
                        ["PPO", "Preferred network", "No", "Yes (higher cost)", "Flexibility, travelers"],
                        ["PFFS", "No fixed network", "No", "If provider accepts", "Rural areas"],
                        ["SNP", "Must use network", "Yes (usually)", "Emergency only", "Chronic conditions, dual eligible"],
                      ].map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="py-3 px-4 text-slate-900 font-semibold">{row[0]}</td>
                          <td className="py-3 px-4 text-slate-600">{row[1]}</td>
                          <td className="py-3 px-4 text-slate-600">{row[2]}</td>
                          <td className="py-3 px-4 text-slate-600">{row[3]}</td>
                          <td className="py-3 px-4 text-slate-600">{row[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="space-y-4 list-none">
                  {[
                    { name: "HMO", full: "Health Maintenance Organization", href: "/medicare-part-c/medicare-advantage-plan-hmo", desc: "Lower costs with a defined network. Requires a primary care physician and referrals for specialists. Out-of-network care is not covered except in emergencies." },
                    { name: "PPO", full: "Preferred Provider Organization", href: "/medicare-part-c/medicare-advantage-plan-ppo", desc: "More flexibility to see any Medicare-accepting provider without referrals. In-network care costs less, but out-of-network care is still partially covered." },
                    { name: "PFFS", full: "Private Fee-for-Service", href: "/medicare-part-c/medicare-advantage-plan-pffs", desc: "No fixed network - you can see any Medicare-accepting provider who agrees to the plan's payment terms. Availability varies by region." },
                    { name: "SNP", full: "Special Needs Plan", href: "/medicare-part-c/medicare-advantage-plan-snp", desc: "Tailored benefits for people with specific chronic conditions, dual eligibility (Medicare + Medicaid), or institutional care needs." },
                  ].map((plan, i) => (
                    <li key={i} className="p-5 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-teal-700">{plan.name}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{plan.full}</h3>
                          <p className="text-sm text-slate-600 mb-2">{plan.desc}</p>
                          <Link href={plan.href} className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800">
                            Learn more <ArrowRight className="w-3 h-3" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Medigap */}
              <section id="medigap" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medicare Supplement Plans (Medigap)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  <Link href="/faqs/what-is-a-medicare-supplement-plan-and-who-needs-one/" className="text-teal-700 underline hover:text-teal-900">Medigap plans</Link> are standardized supplemental insurance policies sold by private companies that help pay the out-of-pocket costs left by Original Medicare - deductibles, coinsurance, and copayments. They do not replace Medicare; they work alongside it.
                </p>
                <ul className="space-y-2 mb-6 list-none">
                  {[
                    { positive: true, text: "Standardized plans (A, B, C, D, F, G, K, L, M, N) - same benefits regardless of insurer" },
                    { positive: true, text: "Works with any doctor or hospital that accepts Medicare nationwide" },
                    { positive: true, text: "Predictable costs - most plans cover 100% of gaps after deductible" },
                    { positive: true, text: "No network restrictions, no referrals, no prior authorization" },
                    { positive: false, text: "Does not include prescription drug coverage (need separate Part D)" },
                    { positive: false, text: "Monthly premiums higher than Medicare Advantage" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      {item.positive ? <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" /> : <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" aria-hidden="true" />}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The most popular Medigap plans in 2026 are <Link href="/medicare-supplement-plans/plan-g/" className="text-teal-700 underline hover:text-teal-900">Plan G</Link> and <Link href="/medicare-supplement-plans/plan-n/" className="text-teal-700 underline hover:text-teal-900">Plan N</Link>. Plan G covers everything except the Part B deductible ($283 in 2026), while Plan N has lower premiums but includes small copays for office visits.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Guaranteed issue rights for Medigap are strongest during your <Link href="/faqs/medicare-supplement-open-enrollment/" className="text-teal-700 underline hover:text-teal-900">Medigap Open Enrollment Period</Link> - the 6-month window starting when you turn 65 and enroll in Part B. After this window, insurers can use medical underwriting to deny coverage or charge higher premiums.
                </p>
              </section>

              {/* Part D */}
              <section id="part-d" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medicare Part D (Prescription Drug Coverage)
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  <Link href="/faqs/top-5-medicare-prescription-drug-plans/" className="text-teal-700 underline hover:text-teal-900">Medicare Part D</Link> provides prescription drug coverage through private insurance plans approved by Medicare. You can get Part D coverage either as a standalone plan (paired with Original Medicare) or bundled within a Medicare Advantage plan (MAPD).
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { icon: DollarSign, value: "$34.50", label: "Avg. monthly premium" },
                    { icon: DollarSign, value: "$615", label: "Max annual deductible" },
                    { icon: Shield, value: "$2,100", label: "Annual OOP cap" },
                    { icon: Pill, value: "$35/mo", label: "Insulin cost cap" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-red-50/50 rounded-xl p-4 border border-red-100 text-center">
                      <stat.icon className="w-5 h-5 text-red-500 mx-auto mb-1" aria-hidden="true" />
                      <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                      <p className="text-xs text-slate-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Each Part D plan has its own formulary (list of covered drugs) organized into cost-sharing tiers. Before enrolling, check that your specific medications are covered and at what tier level. Learn more about <Link href="/faqs/what-is-a-medicare-part-d-formulary/" className="text-teal-700 underline hover:text-teal-900">how Part D formularies work</Link>.
                </p>
              </section>

              {/* How to Choose */}
              <section id="choosing" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  How to Choose the Right Medicare Plan Type
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Choosing between plan types comes down to four factors: your health needs, your preferred doctors, your medications, and your budget tolerance for unexpected costs.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 bg-teal-50/50 rounded-xl border border-teal-100">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-600" aria-hidden="true" /> Original Medicare + Medigap
                    </h3>
                    <ul className="space-y-1.5 text-sm text-slate-600 list-none">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />See any Medicare doctor nationwide</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />Travel frequently or split time between states</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />Predictable, low out-of-pocket costs</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />Can afford higher monthly premium</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-purple-50/50 rounded-xl border border-purple-100">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-purple-600" aria-hidden="true" /> Medicare Advantage
                    </h3>
                    <ul className="space-y-1.5 text-sm text-slate-600 list-none">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500 mt-0.5 shrink-0" aria-hidden="true" />Lowest possible monthly premium</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500 mt-0.5 shrink-0" aria-hidden="true" />Comfortable with a local provider network</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500 mt-0.5 shrink-0" aria-hidden="true" />Want dental, vision, hearing bundled in</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500 mt-0.5 shrink-0" aria-hidden="true" />Single plan covering medical + drugs</li>
                    </ul>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  For a detailed comparison, read our guide on <Link href="/faqs/medigap-vs-medicare-advantage/" className="text-teal-700 underline hover:text-teal-900">Medigap vs. Medicare Advantage</Link> to see how costs, coverage, and flexibility compare in real-world scenarios.
                </p>
              </section>

              {/* FAQs */}
              <section id="faqs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Bottom CTA */}
              <section className="mb-8">
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-8 md:p-10 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Find the Right Medicare Plan for You
                  </h2>
                  <p className="text-teal-100 mb-6 max-w-xl">
                    Plans, benefits, and costs vary by ZIP code. Our licensed agents can help you compare all Medicare plan types available in your area - at no cost to you.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <ZipFormModal
                      pageSection="plan_types_pillar_bottom"
                      coverageType="ms"
                      title="Find Medicare Plans in Your Area"
                      subtitle="Enter your ZIP code to compare plans available near you - free, no obligation."
                      buttonLabel="Compare Plans"
                      trigger={
                        <button className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
                          <Users className="w-4 h-4" aria-hidden="true" /> Compare Plans
                        </button>
                      }
                    />
                    <a href="tel:+18883358996" data-invoca-phone-number="18883358996"
                      onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "plan_types_pillar" })} className="invoca-phone inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
                      <Phone className="w-4 h-4" aria-hidden="true" /> Call (888) 335-8996
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
