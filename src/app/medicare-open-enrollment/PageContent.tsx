"use client";
/**
 * Medicare Open Enrollment — Standalone Landing Page
 * Targets keywords: "medicare open enrollment" (8,100/mo), "medicare open enrollment period" (5,400/mo)
 * Design: Dark navy hero + stat cards + timeline cards + comparison tables
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
  Phone,
  ArrowRight,
  Calendar,
  Clock,
  Shield,
  AlertTriangle,
  Lightbulb,
  Star,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";

const tableOfContents = [
  { id: "what-is", label: "What Is Open Enrollment?" },
  { id: "dates", label: "2026 Dates & Deadlines" },
  { id: "what-you-can-do", label: "What You Can Change" },
  { id: "all-periods", label: "All Enrollment Periods" },
  { id: "tips", label: "Tips for Open Enrollment" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "faqs", label: "FAQs" },
];

const faqs = [
  {
    q: "What happens if I miss Medicare Open Enrollment?",
    a: (
      <>
        If you miss the Annual Enrollment Period (October 15 \u2013 December 7), you&apos;ll generally have to wait until the next year to make changes. However, if you have a Medicare Advantage plan, you can use the{" "}
        <strong>Medicare Advantage Open Enrollment Period</strong> (January 1 \u2013 March 31) to switch to a different MA plan or return to Original Medicare.
      </>
    ),
  },
  {
    q: "Can I change my Medigap plan during Open Enrollment?",
    a: (
      <>
        No. The Annual Enrollment Period does not apply to{" "}
        <Link href="/medigap-plans" className="text-teal-700 underline hover:text-teal-900">Medigap plans</Link>. You can apply to change your Medigap plan at any time, but outside of your initial Medigap Open Enrollment Period (when you first turn 65), insurance companies can use medical underwriting.
      </>
    ),
  },
  {
    q: "Do I have to do anything during Open Enrollment if I\u2019m happy with my plan?",
    a: "No. If you\u2019re satisfied with your current coverage, you don\u2019t need to take any action \u2014 your plan will automatically renew. However, it\u2019s still wise to review your plan\u2019s Annual Notice of Change (ANOC) document, as benefits, costs, and networks can change each year.",
  },
  {
    q: "When do changes made during Open Enrollment take effect?",
    a: "Any changes you make during the Annual Enrollment Period (October 15 \u2013 December 7) take effect on January 1 of the following year. Changes during the MA Open Enrollment Period (January 1 \u2013 March 31) take effect the first of the month after the plan receives your enrollment.",
  },
  {
    q: "Can I switch from Medicare Advantage to Original Medicare during Open Enrollment?",
    a: (
      <>
        Yes. During the Annual Enrollment Period, you can drop your{" "}
        <Link href="/medicare-advantage-plans" className="text-teal-700 underline hover:text-teal-900">Medicare Advantage plan</Link>{" "}
        and return to Original Medicare. You can also add a standalone Part D drug plan at the same time. If you want a Medigap plan, be aware that guaranteed-issue rights may be limited depending on your state and circumstances.
      </>
    ),
  },
];

export default function PageContent() {
  const [activeSection, setActiveSection] = useState("what-is");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    tableOfContents.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <article className="min-h-screen bg-white">
      {/* Dark Navy Hero */}
      <section className="relative bg-gradient-to-br from-[#1a2b4a] to-[#0f1e38] pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <Link href="/enrollment" className="hover:text-white transition-colors">Enrollment</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" aria-hidden="true" />
            <span className="text-amber-400">Medicare Open Enrollment</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-400" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Enrollment Period</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Open Enrollment Period: Dates, Rules &amp; What You Can Change{" "}
            <span className="text-amber-400">(2026)</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            The Annual Enrollment Period is your yearly opportunity to review, compare, and change your Medicare coverage. Know the key dates and make informed decisions.
          </p>
          <div className="flex flex-wrap gap-4">
            <ZipFormModal
              pageSection="open-enrollment-hero"
              coverageType="ma"
              title="Compare Plans for Open Enrollment"
              subtitle="Enter your ZIP code to see all available plans in your area."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Compare Plans in Your Area <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              }
            />
            <a href="tel:+18883358996" id="callInNum" data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "open-enrollment-hero" })}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20">
              <Phone className="w-4 h-4" aria-hidden="true" /> Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="container -mt-8 relative z-20 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "Oct 15 \u2013 Dec 7", label: "Annual Enrollment Period" },
            { value: "Jan 1", label: "changes take effect" },
            { value: "Jan 1 \u2013 Mar 31", label: "MA Open Enrollment" },
            { value: "Review ANOC", label: "check plan changes each fall" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 text-center shadow-md">
              <div className="text-xl font-bold text-amber-600 mb-1">{stat.value}</div>
              <p className="text-xs text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row-reverse gap-10">
            {/* Sidebar */}
            <aside className="hidden lg:block lg:w-64 shrink-0">
              <div className="sticky top-28">
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-3">In This Guide</p>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <a key={item.id} href={`#${item.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                        activeSection === item.id ? "bg-teal-50 text-teal-700 font-semibold" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >{item.label}</a>
                  ))}
                </nav>
                <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-sm font-semibold text-amber-900 mb-1">Need Help Choosing a Plan?</p>
                  <p className="text-xs text-amber-700 mb-3">Our licensed agents walk you through your options</p>
                  <a href="tel:+18883358996" id="callInNum" data-invoca-phone-number="18883358996"
                    onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "open-enrollment-sidebar" })}
                    className="flex items-center gap-2 text-sm font-bold text-amber-700">
                    <Phone className="w-4 h-4" aria-hidden="true" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Key Takeaways */}
              <div className="mb-12 bg-teal-50 border border-teal-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-teal-700" aria-hidden="true" />
                  <h3 className="font-bold text-teal-900 text-sm uppercase tracking-wider">Key Takeaways</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    (<>The Medicare Annual Enrollment Period (AEP) runs <strong>October 15 \u2013 December 7</strong> every year, with changes taking effect January 1</>),
                    "During AEP, you can switch between Medicare Advantage and Original Medicare, change MA plans, or add/drop Part D coverage",
                    "The Medicare Advantage Open Enrollment Period (January 1 \u2013 March 31) provides a second chance to switch MA plans or return to Original Medicare",
                    "Review your plan\u2019s Annual Notice of Change (ANOC) each fall \u2014 benefits, costs, and provider networks can change annually",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-teal-800">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-teal-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Is Medicare Open Enrollment? */}
              <section id="what-is" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What Is Medicare Open Enrollment?
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Medicare Open Enrollment \u2014 officially called the <strong>Annual Enrollment Period (AEP)</strong> \u2014 is the yearly window when Medicare beneficiaries can make changes to their health and drug coverage. It&apos;s the primary time each year when you can switch plans, add coverage, or change how you receive your Medicare benefits.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Outside of this period (and a few other special enrollment windows), your Medicare coverage is generally locked in for the year. That&apos;s why it&apos;s important to review your options each fall and make sure your current plan still meets your needs.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Note: Medicare Open Enrollment is different from the{" "}
                  <Link href="/medicare-enrollment/turning-65" className="text-teal-700 underline hover:text-teal-900">Initial Enrollment Period</Link>{" "}
                  (when you first become eligible for Medicare at 65) and the{" "}
                  <Link href="/medicare-supplement-plans" className="text-teal-700 underline hover:text-teal-900">Medigap Open Enrollment Period</Link>{" "}
                  (for purchasing supplemental insurance).
                </p>
              </section>

              {/* 2026 Dates & Deadlines */}
              <section id="dates" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  2026 Medicare Enrollment Dates &amp; Deadlines
                </h2>
                <div className="space-y-4">
                  {[
                    { title: "Annual Enrollment Period (AEP)", dates: "October 15 \u2013 December 7, 2026", desc: "The main enrollment window. Changes take effect January 1, 2027.", icon: Calendar, color: "amber" as const },
                    { title: "Medicare Advantage Open Enrollment (MA OEP)", dates: "January 1 \u2013 March 31, 2026", desc: "Only for people already in a Medicare Advantage plan. Switch MA plans or return to Original Medicare + Part D.", icon: Clock, color: "blue" as const },
                    { title: "General Enrollment Period (GEP)", dates: "January 1 \u2013 March 31, 2026", desc: "For people who missed their Initial Enrollment Period. Sign up for Part A and/or Part B. Coverage begins July 1.", icon: Star, color: "slate" as const },
                  ].map((period) => {
                    const isHighlight = period.color === "amber";
                    return (
                      <div key={period.title} className={`p-5 rounded-xl border ${isHighlight ? "border-amber-200 bg-amber-50/50" : "border-slate-200 bg-white"}`}>
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                            period.color === "amber" ? "bg-amber-100" : period.color === "blue" ? "bg-blue-100" : "bg-slate-100"
                          }`}>
                            <period.icon className={`w-6 h-6 ${
                              period.color === "amber" ? "text-amber-600" : period.color === "blue" ? "text-blue-600" : "text-slate-600"
                            }`} />
                          </div>
                          <div>
                            <p className={`font-bold text-lg ${isHighlight ? "text-amber-900" : "text-slate-900"}`}>{period.title}</p>
                            <p className={`font-semibold ${
                              period.color === "amber" ? "text-amber-700" : period.color === "blue" ? "text-blue-600" : "text-slate-500"
                            }`}>{period.dates}</p>
                            <p className="text-sm text-slate-600 mt-1">{period.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* What You Can Change */}
              <section id="what-you-can-do" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  What You Can Do During Open Enrollment
                </h2>
                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" /> You CAN
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {[
                        "Switch from Original Medicare to Medicare Advantage",
                        "Switch from Medicare Advantage to Original Medicare",
                        "Switch between Medicare Advantage plans",
                        "Join a Medicare Part D drug plan",
                        "Switch Part D plans",
                        "Drop Part D coverage",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" aria-hidden="true" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                    <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5" aria-hidden="true" /> You CANNOT
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {[
                        "Buy or switch Medigap plans (separate rules)",
                        "Enroll in Medicare Part A or Part B for the first time",
                        "Make changes to employer/union group coverage",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" aria-hidden="true" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* All Enrollment Periods */}
              <section id="all-periods" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  All Medicare Enrollment Periods Explained
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Medicare has multiple enrollment windows. Here&apos;s how they differ:
                </p>
                <div className="overflow-x-auto mb-5">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left p-4 text-sm font-semibold text-slate-900 border border-slate-200">Period</th>
                        <th className="text-left p-4 text-sm font-semibold text-slate-900 border border-slate-200">Dates</th>
                        <th className="text-left p-4 text-sm font-semibold text-slate-900 border border-slate-200">Who It&apos;s For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Annual Enrollment (AEP)", "Oct 15 \u2013 Dec 7", "All Medicare beneficiaries", true],
                        ["MA Open Enrollment (OEP)", "Jan 1 \u2013 Mar 31", "Current MA plan members only", false],
                        ["Initial Enrollment (IEP)", "7-month window around 65th birthday", "People newly eligible for Medicare", false],
                        ["General Enrollment (GEP)", "Jan 1 \u2013 Mar 31", "Those who missed IEP", false],
                        ["Special Enrollment (SEP)", "Varies by qualifying event", "People with qualifying life changes", false],
                      ].map(([period, dates, who, highlight], i) => (
                        <tr key={i} className={highlight ? "bg-amber-50/50" : i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="p-4 text-sm text-slate-700 border border-slate-200 font-medium">{period as string}</td>
                          <td className="p-4 text-sm text-slate-600 border border-slate-200">{dates as string}</td>
                          <td className="p-4 text-sm text-slate-600 border border-slate-200">{who as string}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-slate-600 text-sm mt-4">
                  For detailed information about each period, visit our{" "}
                  <Link href="/faqs/medicare-annual-enrollment-period/" className="text-teal-700 underline hover:text-teal-900">Annual Enrollment Period guide</Link>{" "}
                  or{" "}
                  <Link href="/medicare-enrollment/turning-65" className="text-teal-700 underline hover:text-teal-900">Turning 65 enrollment guide</Link>.
                </p>
              </section>

              {/* Tips for Open Enrollment */}
              <section id="tips" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Tips for Medicare Open Enrollment
                </h2>
                <div className="space-y-3">
                  {[
                    { num: "1", title: "Review Your Annual Notice of Change (ANOC)", desc: "Your plan mails this in September. It details any changes to premiums, copays, covered drugs, or provider networks for the upcoming year." },
                    { num: "2", title: "Check Your Medications", desc: "Make sure your prescriptions are still on your plan\u2019s formulary. Drug tiers and costs can change annually." },
                    { num: "3", title: "Verify Your Doctors Are Still In-Network", desc: "Provider networks change every year. Confirm your doctors, specialists, and preferred hospitals are still covered." },
                    { num: "4", title: "Compare Total Costs, Not Just Premiums", desc: "A $0 premium plan may cost more overall if it has high copays for services you use frequently." },
                    { num: "5", title: "Don\u2019t Wait Until December 7", desc: "Start reviewing options in October. Last-minute decisions often lead to mistakes or missed deadlines." },
                  ].map((tip) => (
                    <div key={tip.num} className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-white">
                      <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">{tip.num}</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{tip.title}</p>
                        <p className="text-slate-600 text-sm mt-1">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Common Mistakes */}
              <section id="mistakes" className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Common Open Enrollment Mistakes to Avoid
                </h2>
                <div className="space-y-3">
                  {[
                    { mistake: "Assuming your plan stays the same", fix: "Plans change benefits, costs, and networks annually. Always review your ANOC." },
                    { mistake: "Only comparing premiums", fix: "Factor in deductibles, copays, drug costs, and out-of-pocket maximums for a true cost picture." },
                    { mistake: "Ignoring the Star Rating", fix: "Medicare rates plans 1-5 stars. Higher-rated plans typically provide better care coordination and customer service." },
                    { mistake: "Forgetting about Part D coverage gaps", fix: "Check if your medications hit the coverage gap (donut hole) and what your plan charges during that phase." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-amber-200 bg-amber-50/50">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="font-bold text-amber-900 text-sm">{item.mistake}</p>
                        <p className="text-slate-600 text-sm mt-1">{item.fix}</p>
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
                        <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 md:p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
                  Need Help During Open Enrollment?
                </h2>
                <p className="text-amber-100 mb-6 max-w-lg mx-auto">
                  Our licensed agents can help you compare plans, check your medications, and find the best coverage for your needs. Free, no-obligation consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <ZipFormModal
                    coverageType="ma"
                    title="Compare Plans for Open Enrollment"
                    subtitle="Enter your ZIP code to see all available plans in your area."
                    triggerLabel="Compare Plans"
                    triggerClassName="inline-flex items-center justify-center gap-2 bg-white text-amber-700 font-semibold px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors"
                    pageSection="open-enrollment-cta"
                  />
                  <a
                    href="tel:+18008452484"
                    onClick={() => trackPhoneClick({ phone_number: "(800) 845-2484", page_section: "open-enrollment-cta" })}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/30 transition-colors"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" /> (800) 845-2484
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
