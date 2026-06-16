"use client";

/**
 * Medicare Part C (Medicare Advantage) Page — Revised & Expanded
 * Design: Comprehensive guide covering MA plan types, benefits, costs,
 * enrollment, prior authorization, travel coverage, and comparison with Original Medicare.
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
  AlertTriangle,
  DollarSign,
  Shield,
  Star,
  Clock,
  Users,
  Stethoscope,
  Pill,
  Eye,
  Activity,
  Lightbulb,
  Plane,
  FileCheck,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";

const tableOfContents = [
  { id: "overview", label: "What Is Medicare Part C?" },
  { id: "plan-types", label: "Types of MA Plans" },
  { id: "eligibility", label: "Eligibility" },
  { id: "benefits", label: "Benefits & Extras" },
  { id: "costs", label: "Costs & Out-of-Pocket" },
  { id: "prior-auth", label: "Prior Authorization" },
  { id: "comparison", label: "MA vs. Original Medicare" },
  { id: "travel", label: "Travel Coverage" },
  { id: "how-to-choose", label: "How to Choose a Plan" },
  { id: "enrollment", label: "When to Enroll" },
  { id: "faqs", label: "Frequently Asked Questions" },
  { id: "next-steps", label: "Next Steps" },
];

const planTypes = [
  { name: "HMO", full: "Health Maintenance Organization", desc: "Requires you to use in-network providers and get referrals for specialists. Typically the lowest premiums.", popular: true },
  { name: "PPO", full: "Preferred Provider Organization", desc: "Allows out-of-network care at higher cost. No referrals needed for specialists. More flexibility.", popular: true },
  { name: "PFFS", full: "Private Fee-for-Service", desc: "Determines how much it will pay providers and how much you pay. Providers must accept plan terms.", popular: false },
  { name: "SNP", full: "Special Needs Plan", desc: "Designed for people with specific diseases, limited income, or who live in certain institutions. See expanded details below.", popular: false },
  { name: "MSA", full: "Medical Savings Account", desc: "Combines a high-deductible plan with a bank account. Medicare deposits money for medical expenses.", popular: false },
];

const faqs = [
  {
    q: "Can I have both Medicare Advantage and Medigap?",
    a: (<>No. You cannot have a <Link href="/medicare-supplement-plans" className="text-teal-700 underline hover:text-teal-900">Medigap policy</Link> and a Medicare Advantage plan at the same time. If you switch from Original Medicare + Medigap to Medicare Advantage, you&apos;ll need to drop your Medigap policy. Be cautious: you may not be able to get Medigap back later without medical underwriting.</>),
  },
  {
    q: "Are Medicare Advantage plans really free?",
    a: "Many MA plans have $0 monthly premiums (beyond the Part B premium you must continue paying). However, you'll still have copays, coinsurance, and deductibles when you use services. The 'free' premium doesn't mean free healthcare.",
  },
  {
    q: "What happens if I need care outside my network?",
    a: (<>With HMO plans, out-of-network care is generally not covered except in emergencies. <Link href="/medicare-part-c/medicare-advantage-plan-types" className="text-teal-700 underline hover:text-teal-900">PPO plans</Link> allow out-of-network care but at higher costs. Always check your plan&apos;s network before scheduling non-emergency care.</>),
  },
  {
    q: "Can I switch from Medicare Advantage back to Original Medicare?",
    a: (<>Yes. You can switch during the <Link href="/faqs/medicare-annual-enrollment-period/" className="text-teal-700 underline hover:text-teal-900">Annual Enrollment Period</Link> (Oct 15 - Dec 7) or during the Medicare Advantage Open Enrollment Period (Jan 1 - Mar 31). However, getting a Medigap policy after leaving MA may require medical underwriting in most states.</>),
  },
  {
    q: "Do Medicare Advantage plans cover prescription drugs?",
    a: (<>Most Medicare Advantage plans include <Link href="/original-medicare/medicare-parts/medicare-part-d" className="text-teal-700 underline hover:text-teal-900">Part D prescription drug coverage</Link> (called MA-PD plans). If your MA plan doesn&apos;t include drug coverage, you can enroll in a standalone Part D plan, but this is uncommon.</>),
  },
  {
    q: "How do I know which doctors are in my MA plan's network?",
    a: "Each plan has a provider directory you can search online or request by mail. Before enrolling, verify that your current doctors, specialists, and preferred hospitals are in-network. Networks can change annually.",
  },
];

export default function MedicareAdvantage() {
  const [activeSection, setActiveSection] = useState("overview");
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
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <span className="text-slate-400">Medicare Plans</span>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <span className="text-teal-400">Medicare Advantage</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-600/20 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-teal-400" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Part C</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Part C: Medicare Advantage Plans Explained
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            An all-in-one alternative to Original Medicare offered by private insurers. Includes hospital, medical, usually drug coverage, and often dental, vision, and hearing benefits.
          </p>
          <div className="flex flex-wrap gap-4">
            <ZipFormModal
              pageSection="medicare_advantage_plans"
              coverageType="ma"
              title="Find Medicare Advantage Plans"
              subtitle="Enter your ZIP code to compare Medicare Advantage plans available in your area — free, no obligation."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Find Plans in Your Area <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              }
            />
            <a href="tel:+18883358996" id="callInNum" data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "medicare_advantage_plans" })} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
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
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <a key={item.id} href={`#${item.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                        activeSection === item.id ? "bg-teal-50 text-teal-700 font-semibold" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >{item.label}</a>
                  ))}
                </nav>
                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Need Help?</p>
                  <p className="text-xs text-blue-700 mb-3">Speak with a licensed Medicare agent</p>
                  <a href="tel:+18883358996" id="callInNum" data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "medicare_advantage_plans" })} className="flex items-center gap-2 text-sm font-bold text-blue-700">
                    <Phone className="w-4 h-4" aria-hidden="true" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0 max-w-3xl">

              {/* Key Takeaways */}
              <div className="mb-12 bg-teal-50 border border-teal-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-teal-700" aria-hidden="true" />
                  <h3 className="font-bold text-teal-900 text-sm uppercase tracking-wider">Key Takeaways</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    (<>Medicare Part C, also called Medicare Advantage, is a private insurance alternative to Original Medicare that includes <Link href="/original-medicare/medicare-parts/medicare-part-a" className="text-teal-700 underline hover:text-teal-900">Parts A</Link> and <Link href="/original-medicare/medicare-parts/medicare-part-b" className="text-teal-700 underline hover:text-teal-900">B</Link> coverage.</>),
                    "These plans often include prescription drug coverage and extra benefits like dental, vision, and hearing aids.",
                    "You must have Medicare Parts A and B and live in the plan's service area to enroll.",
                    (<>Medicare Advantage plans have provider networks and may require referrals for specialists, but offer out-of-pocket maximums that <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link> lacks.</>),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-teal-800">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Overview — Merged "What is Part C?" + "What Is Medicare Advantage?" */}
              <section id="overview" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What Is Medicare Part C (Medicare Advantage)?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  <strong>Medicare Part C</strong> is the official designation from the Centers for Medicare &amp; Medicaid Services (CMS) for what most people know as <strong>Medicare Advantage</strong>. This name comes from the original Medicare legislation that created different parts of the Medicare program. Part C and Medicare Advantage are the same thing, and both terms are used interchangeably.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medicare Advantage is a private insurance alternative to <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link> (Parts A and B). Instead of getting your Medicare benefits directly from the federal government, you receive them through a private insurance company that contracts with Medicare. These companies must cover everything Original Medicare covers, but they often add extra benefits like <Link href="/original-medicare/medicare-parts/medicare-part-d" className="text-teal-700 underline hover:text-teal-900">prescription drug coverage</Link>, dental care, vision services, or wellness programs.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  The trade-off is that Medicare Advantage plans typically use provider networks and may require referrals to see specialists. You&apos;ll need to use doctors and hospitals within your plan&apos;s network for most services, unlike Original Medicare which lets you see any provider that accepts Medicare.
                </p>
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  {[
                    { value: "51%", label: "of Medicare beneficiaries now choose MA" },
                    { value: "$0", label: "premium for many MA plans" },
                    { value: "$9,250", label: "max out-of-pocket (in-network) 2026" },
                    { value: "4,000+", label: "MA Plans Available Nationwide" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center">
                      <div className="text-2xl font-bold text-teal-600 mb-1">{stat.value}</div>
                      <p className="text-xs text-slate-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Plan Types */}
              <section id="plan-types" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Types of Medicare Advantage Plans
                </h2>
                <div className="space-y-4 mb-8">
                  {planTypes.map((plan, i) => (
                    <div key={i} className={`p-5 rounded-xl border ${plan.popular ? "border-teal-200 bg-teal-50/30" : "border-slate-200 bg-white"}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-lg font-bold ${plan.popular ? "text-teal-700" : "text-slate-700"}`}>{plan.name}</span>
                        <span className="text-sm text-slate-500">({plan.full})</span>
                        {plan.popular && <span className="text-xs font-semibold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Popular</span>}
                      </div>
                      <p className="text-sm text-slate-600">{plan.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Expanded SNP Subsection */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
                    Special Needs Plans (SNPs): A Closer Look
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Special Needs Plans serve three distinct groups of Medicare beneficiaries with specialized healthcare needs.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border border-slate-100">
                      <h4 className="font-semibold text-slate-900 mb-1">Dual Eligible Special Needs Plans (D-SNPs)</h4>
                      <p className="text-sm text-slate-600">Designed for people who qualify for both Medicare and Medicaid. These are the fastest-growing type of Medicare Advantage plan. D-SNPs coordinate benefits between both programs and often provide additional services like transportation to medical appointments or help with daily living activities.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-100">
                      <h4 className="font-semibold text-slate-900 mb-1">Chronic Condition Special Needs Plans (C-SNPs)</h4>
                      <p className="text-sm text-slate-600">Serve people with specific serious or disabling chronic conditions. These include diabetes, end-stage renal disease (ESRD), chronic heart failure, dementia, severe hematologic disorders, HIV/AIDS, chronic lung disorders, and certain cardiovascular disorders. To enroll, you must have a confirmed diagnosis of one of the qualifying conditions.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-100">
                      <h4 className="font-semibold text-slate-900 mb-1">Institutional Special Needs Plans (I-SNPs)</h4>
                      <p className="text-sm text-slate-600">For people who live in nursing homes, skilled nursing facilities, or other long-term care institutions. They&apos;re also available for people who require an institutional level of care but live in the community. These plans coordinate care between institutional providers and community-based services.</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-4">
                    All SNPs must demonstrate how they tailor their benefits, provider networks, and care management to meet the specific needs of their target population.
                  </p>
                </div>
              </section>

              {/* Eligibility */}
              <section id="eligibility" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Who Is Eligible for Medicare Part C?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  To enroll in a Medicare Part C plan, you must meet several specific requirements set by Medicare.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    {
                      title: "Enrolled in Parts A and B",
                      desc: (<>You must already be enrolled in both <Link href="/original-medicare/medicare-parts/medicare-part-a" className="text-teal-700 underline hover:text-teal-900">Medicare Part A</Link> (hospital insurance) and <Link href="/original-medicare/medicare-parts/medicare-part-b" className="text-teal-700 underline hover:text-teal-900">Medicare Part B</Link> (medical insurance). You cannot enroll in Medicare Advantage with just one part of Original Medicare.</>),
                    },
                    {
                      title: "Live in the plan's service area",
                      desc: "You must live within the service area of the Medicare Advantage plan you want to join. Each plan contracts with Medicare to serve specific geographic regions, typically by county or ZIP code.",
                    },
                    {
                      title: "No ESRD restriction (lifted in 2021)",
                      desc: "Until 2021, people with End-Stage Renal Disease (ESRD) were prohibited from enrolling in Medicare Advantage plans. This restriction has been lifted, and people with ESRD can now choose Medicare Advantage coverage.",
                    },
                    {
                      title: "No overlapping coverage",
                      desc: (<>You cannot be enrolled in another Medicare Advantage plan at the same time, and you cannot have Medicare Advantage while also having a <Link href="/medicare-supplement-plans" className="text-teal-700 underline hover:text-teal-900">Medicare Supplement (Medigap)</Link> policy.</>),
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  If you have employer or union coverage that works with Medicare, you should check whether enrolling in Medicare Advantage affects your existing benefits before making a switch.
                </p>
              </section>

              {/* Benefits */}
              <section id="benefits" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Benefits & Extra Coverage
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medicare Advantage plans must cover everything Original Medicare covers. Most plans also include additional benefits not available with Original Medicare:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Pill, title: "Prescription Drugs", desc: (<>Most MA plans include <Link href="/original-medicare/medicare-parts/medicare-part-d" className="text-teal-700 underline hover:text-teal-900">Part D drug coverage</Link>, eliminating the need for a separate plan.</>) },
                    { icon: Eye, title: "Vision Care", desc: "Routine eye exams, eyeglasses, and contact lens allowances included in many plans." },
                    { icon: "🦷", title: "Dental Coverage", desc: "Preventive and sometimes comprehensive dental — cleanings, X-rays, fillings, and more." },
                    { icon: "👂", title: "Hearing Benefits", desc: "Hearing exams and hearing aid allowances, often with significant annual benefits." },
                    { icon: Activity, title: "Fitness Programs", desc: "SilverSneakers or similar gym memberships included at no additional cost." },
                    { icon: Heart, title: "Wellness Programs", desc: "Telehealth, nurse hotlines, meal delivery after hospital stays, and transportation to appointments." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                      {typeof item.icon === "string" ? (
                        <span className="text-2xl">{item.icon}</span>
                      ) : (
                        <item.icon className="w-6 h-6 text-teal-600 shrink-0" />
                      )}
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm">{item.title}</h3>
                        <p className="text-xs text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-teal-50 border-l-4 border-teal-400 p-5 rounded-r-xl">
                  <p className="font-semibold text-teal-900 mb-1">Give Back Benefit</p>
                  <p className="text-sm text-teal-800">
                    Some Medicare Advantage plans offer a <strong>Part B premium reduction</strong> (also called the &ldquo;<Link href="/medicare-part-c/medicare-advantage-give-back-benefit" className="text-teal-700 underline hover:text-teal-900">Give Back Benefit</Link>&rdquo;), which can reduce your monthly Part B premium by up to $202.90/month. Not all plans offer this, and availability varies by area.
                  </p>
                </div>
              </section>

              {/* Costs */}
              <section id="costs" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medicare Advantage Costs
                </h2>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Cost Component</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Typical Range</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["Monthly Premium", "$0 – $150+", "Many plans are $0; you still pay Part B premium"],
                        ["Primary Care Visit", "$0 – $20", "Copay per visit"],
                        ["Specialist Visit", "$20 – $50", "Copay per visit; may need referral (HMO)"],
                        ["Emergency Room", "$50 – $120", "Waived if admitted"],
                        ["Inpatient Hospital", "$200 – $400/day", "Per day for first few days; varies by plan"],
                        ["Max Out-of-Pocket (In-Network)", "Up to $9,250", "2026 federal limit; many plans set lower"],
                        ["Prescription Drugs", "Varies by tier", "Most plans include Part D coverage"],
                      ].map(([item, range, note], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="py-3 px-4 text-slate-700 font-medium">{item}</td>
                          <td className="py-3 px-4 text-slate-900 font-semibold">{range}</td>
                          <td className="py-3 px-4 text-slate-500">{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Prior Authorization */}
              <section id="prior-auth" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Prior Authorization in Medicare Advantage
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Prior authorization means your Medicare Advantage plan must approve certain medical services, procedures, or medications before you receive them. This requirement helps plans control costs and ensure medical necessity, but it can create delays in your care.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" aria-hidden="true" />
                    <h3 className="font-semibold text-amber-900 text-sm">Services That Commonly Require Prior Authorization</h3>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Non-emergency hospital admissions",
                      "Certain surgeries and procedures",
                      "Advanced imaging tests (MRIs, CT scans)",
                      "Specialty medications",
                      "Durable medical equipment (wheelchairs, oxygen equipment)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                        <FileCheck className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-slate-600 leading-relaxed mb-4">
                  The process works like this: your doctor submits a request to your plan explaining why you need the service. The plan reviews the request and makes a decision within specific timeframes.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <div className="text-2xl font-bold text-teal-600 mb-1">72 hours</div>
                    <p className="text-xs text-slate-600">Standard request response time</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <div className="text-2xl font-bold text-teal-600 mb-1">24 hours</div>
                    <p className="text-xs text-slate-600">Expedited/urgent request response time</p>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-4">
                  If your plan denies coverage, you have the right to appeal the decision. You can request an expedited appeal for urgent situations. If your plan still denies coverage after an internal appeal, you have the right to an external review by an independent organization.
                </p>
                <p className="text-sm text-slate-500">
                  Prior authorization requirements are one of the most common complaints Medicare Advantage members have about their plans. Understanding these requirements upfront can help you avoid unexpected delays when you need care.
                </p>
              </section>

              {/* Medicare Advantage vs. Original Medicare (merged with Pros & Cons) */}
              <section id="comparison" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medicare Advantage vs. Original Medicare
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Choosing between Medicare Advantage and <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link> is one of the most important decisions you&apos;ll make about your healthcare coverage. Here&apos;s how they compare across key areas:
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Feature</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Original Medicare</th>
                        <th className="text-left py-3 px-4 font-semibold text-teal-700">Medicare Advantage (Part C)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["Coverage source", "Federal government", "Private insurance companies approved by Medicare"],
                        ["Provider flexibility", "Any doctor or hospital that accepts Medicare, nationwide", "Must use providers within plan's network"],
                        ["Out-of-pocket maximum", "No annual limit on costs", "Annual maximum of $9,250 (2026); many plans set lower"],
                        ["Extra benefits", "Basic medical services only", "Often includes dental, vision, hearing, wellness"],
                        ["Prescription drugs", "Requires separate Part D enrollment", "Most plans include drug coverage"],
                        ["Monthly cost", "Set premiums; may want to add Medigap insurance", "Often $0 premiums beyond Part B"],
                        ["Travel coverage", "Works nationwide with any Medicare provider", "Limited to plan's service area for routine care"],
                        ["Prior authorization", "Not required", "Required for many services"],
                      ].map(([feature, original, ma], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="py-3 px-4 text-slate-700 font-medium">{feature}</td>
                          <td className="py-3 px-4 text-slate-600">{original}</td>
                          <td className="py-3 px-4 text-slate-600">{ma}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom Line — replaces standalone Pros & Cons */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2 text-lg">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" /> Medicare Advantage Is Best If You...
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Want predictable costs with an annual out-of-pocket maximum",
                        "Value extra benefits (dental, vision, hearing, fitness)",
                        "Don't mind using network providers",
                        "Primarily receive care near home",
                        "Prefer an all-in-one plan with drug coverage included",
                        "Want low or $0 monthly premiums",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-600" aria-hidden="true" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2 text-lg">
                      <Shield className="w-5 h-5" aria-hidden="true" /> Original Medicare Is Better If You...
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Want maximum flexibility to see any Medicare provider",
                        "Travel frequently or split time between states",
                        "Prefer traditional fee-for-service healthcare",
                        (<>Want to pair coverage with a <Link href="/medicare-supplement-plans" className="text-blue-700 underline hover:text-blue-900">Medigap policy</Link> for cost predictability</>),
                        "Don't want to deal with prior authorization requirements",
                        "See specialists regularly without needing referrals",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" aria-hidden="true" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Travel Coverage */}
              <section id="travel" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Medicare Advantage and Travel Coverage
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Understanding how Medicare Advantage handles healthcare when you travel is crucial, especially if you spend time away from home or travel frequently.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="p-5 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" aria-hidden="true" />
                      <h3 className="font-semibold text-green-900 text-sm">Emergency Care: Covered Nationwide</h3>
                    </div>
                    <p className="text-sm text-green-800">
                      Medicare Advantage plans must cover emergency services anywhere in the United States. This includes emergency room visits, urgent care, and emergency ambulance services. You don&apos;t need prior authorization for true emergencies, and you can&apos;t be charged more than your plan&apos;s standard emergency care cost-sharing.
                    </p>
                  </div>
                  <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600" aria-hidden="true" />
                      <h3 className="font-semibold text-amber-900 text-sm">Routine Care: Generally Not Covered Outside Your Area</h3>
                    </div>
                    <p className="text-sm text-amber-800">
                      Medicare Advantage plans generally do not cover routine care outside their network or service area. If you need to see a doctor for a regular check-up or ongoing condition while traveling, you&apos;ll likely pay the full cost out-of-pocket.
                    </p>
                  </div>
                  <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Plane className="w-5 h-5 text-blue-600" aria-hidden="true" />
                      <h3 className="font-semibold text-blue-900 text-sm">International Travel: Major Limitation</h3>
                    </div>
                    <p className="text-sm text-blue-800">
                      Most Medicare Advantage plans do not cover healthcare services outside the United States. Some plans make exceptions for emergency care in border areas or during brief trips, but coverage is limited.
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-4">
                  <Link href="/medicare-part-c/medicare-advantage-plan-types" className="text-teal-700 underline hover:text-teal-900">PPO plans</Link> offer more flexibility for travelers than HMO plans. Many Medicare Advantage PPO plans provide some coverage for out-of-network care, though you&apos;ll pay higher cost-sharing than you would for in-network services.
                </p>
                <p className="text-sm text-slate-500">
                  This travel limitation is one of the main reasons some Medicare beneficiaries choose <Link href="/original-medicare" className="text-teal-700 underline hover:text-teal-900">Original Medicare</Link> over Medicare Advantage. Some Medicare Advantage plans do offer supplemental travel benefits as an optional extra, but these typically come with additional monthly costs.
                </p>
              </section>

              {/* How to Choose */}
              <section id="how-to-choose" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  How to Choose the Right Medicare Advantage Plan
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Selecting the best Medicare Advantage plan requires evaluating several important factors that affect your healthcare experience and costs.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Stethoscope, title: "Check your providers", desc: "Start by checking whether your current doctors and preferred hospitals are in the plan's provider network. Going outside the network typically means higher expenses or no coverage at all." },
                    { icon: Pill, title: "Review the drug formulary", desc: "Review the plan's prescription drug formulary if you take medications regularly. Each plan has its own list of covered drugs, and your medications may be on different tiers with varying copayments." },
                    { icon: DollarSign, title: "Calculate total annual costs", desc: "Calculate your total annual costs, including monthly premiums, deductibles, copayments, and coinsurance. A plan with a low premium might have higher costs when you actually use healthcare services." },
                    { icon: Heart, title: "Evaluate extra benefits", desc: "Consider what extra benefits matter most to you. Many plans include dental, vision, hearing aids, wellness programs, or transportation services that Original Medicare doesn't cover." },
                    { icon: Star, title: "Check Star Ratings", desc: "Check the plan's Star Rating, which reflects Medicare's assessment of the plan's quality and performance. Plans with higher ratings often provide better customer service and clinical outcomes." },
                    { icon: Shield, title: "Research plan stability", desc: "Research the plan's stability and history in your area. Plans that frequently change their provider networks, drug formularies, or service areas can disrupt your ongoing care." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                      <item.icon className="w-6 h-6 text-teal-600 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Enrollment */}
              <section id="enrollment" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  When to Enroll in Medicare Advantage
                </h2>
                <div className="space-y-4">
                  {[
                    { period: (<><Link href="/medicare-enrollment/turning-65" className="text-teal-700 underline hover:text-teal-900">Initial Enrollment Period</Link> (IEP)</>), dates: "3 months before to 3 months after your 65th birthday", desc: "Your first opportunity to enroll in a Medicare Advantage plan when you're newly eligible for Medicare." },
                    { period: (<><Link href="/faqs/medicare-annual-enrollment-period/" className="text-teal-700 underline hover:text-teal-900">Annual Enrollment Period</Link> (AEP)</>), dates: "October 15 – December 7 each year", desc: "Switch between Original Medicare and Medicare Advantage, or change MA plans. Coverage starts January 1." },
                    { period: "MA Open Enrollment Period (OEP)", dates: "January 1 – March 31 each year", desc: "If you're already in an MA plan, you can switch to a different MA plan or return to Original Medicare + Part D." },
                    { period: "Special Enrollment Period (SEP)", dates: "Varies by qualifying event", desc: "Triggered by events like moving, losing employer coverage, or qualifying for Medicaid. Allows mid-year changes." },
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-white rounded-xl border border-slate-200">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{item.period}</h3>
                          <p className="text-sm font-medium text-teal-700 mb-1">{item.dates}</p>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

              {/* Next Steps */}
              <section id="next-steps" className="mb-8">
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-8 md:p-10 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                    Find Medicare Advantage Plans in Your Area
                  </h2>
                  <p className="text-teal-100 mb-6 max-w-xl">
                    Plans, benefits, and costs vary by ZIP code. Our licensed agents can help you compare Medicare Advantage plans available in your area — at no cost to you.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <ZipFormModal
                      pageSection="medicare_advantage_plans"
                      coverageType="ma"
                      title="Find Medicare Advantage Plans in Your Area"
                      subtitle="Plans, benefits, and costs vary by ZIP code. Enter yours to compare MA plans available near you — free, no obligation."
                      buttonLabel="Compare Plans"
                      trigger={
                        <button className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
                          <Heart className="w-4 h-4" aria-hidden="true" /> Find Plans in Your Area
                        </button>
                      }
                    />
                    <a href="tel:+18883358996" id="callInNum" data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "medicare_advantage_plans" })} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
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
