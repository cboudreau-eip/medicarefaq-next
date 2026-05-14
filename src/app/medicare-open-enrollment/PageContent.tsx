"use client";
/**
 * Medicare Open Enrollment — Standalone Landing Page
 * Targets keywords: "medicare open enrollment" (8,100/mo), "medicare open enrollment period" (5,400/mo)
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
        If you miss the Annual Enrollment Period (October 15 – December 7), you&apos;ll generally have to wait until the next year to make changes. However, if you have a Medicare Advantage plan, you can use the{" "}
        <strong>Medicare Advantage Open Enrollment Period</strong> (January 1 – March 31) to switch to a different MA plan or return to Original Medicare.
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
    q: "Do I have to do anything during Open Enrollment if I'm happy with my plan?",
    a: "No. If you're satisfied with your current coverage, you don't need to take any action — your plan will automatically renew. However, it's still wise to review your plan's Annual Notice of Change (ANOC) document, as benefits, costs, and networks can change each year.",
  },
  {
    q: "When do changes made during Open Enrollment take effect?",
    a: "Any changes you make during the Annual Enrollment Period (October 15 – December 7) take effect on January 1 of the following year. Changes during the MA Open Enrollment Period (January 1 – March 31) take effect the first of the month after the plan receives your enrollment.",
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
    <div className="max-w-7xl mx-auto px-4 py-10 lg:py-14">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li><Link href="/" className="hover:text-teal-700">Home</Link></li>
          <li>/</li>
          <li><Link href="/enrollment" className="hover:text-teal-700">Enrollment</Link></li>
          <li>/</li>
          <li className="text-gray-800 font-medium">Medicare Open Enrollment</li>
        </ol>
      </nav>

      {/* H1 */}
      <h1 className="text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold text-[#1a2b4a] leading-tight mb-6">
        Medicare Open Enrollment Period: Dates, Rules &amp; What You Can Change{" "}
        <span className="text-teal-600">(2026)</span>
      </h1>

      {/* Key Takeaways */}
      <div className="bg-teal-50 border-l-4 border-teal-500 rounded-lg p-5 mb-10">
        <h2 className="text-lg font-bold text-teal-800 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" /> Key Takeaways
        </h2>
        <ul className="space-y-2 text-gray-700 text-[15px]">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <span>The Medicare Annual Enrollment Period (AEP) runs <strong>October 15 – December 7</strong> every year, with changes taking effect January 1</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <span>During AEP, you can switch between Medicare Advantage and Original Medicare, change MA plans, or add/drop Part D coverage</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <span>The Medicare Advantage Open Enrollment Period (January 1 – March 31) provides a second chance to switch MA plans or return to Original Medicare</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <span>Review your plan&apos;s Annual Notice of Change (ANOC) each fall — benefits, costs, and provider networks can change annually</span>
          </li>
        </ul>
      </div>

      {/* Layout: Content + Sidebar */}
      <div className="flex flex-col-reverse lg:flex-row-reverse gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-64 shrink-0">
          <div className="sticky top-28">
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-3">In This Guide</p>
            <ul className="space-y-1.5 text-sm border-l-2 border-gray-200 pl-4">
              {tableOfContents.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block py-1 transition-colors ${
                      activeSection === item.id
                        ? "text-teal-700 font-semibold border-l-2 border-teal-600 -ml-[18px] pl-4"
                        : "text-gray-600 hover:text-teal-700"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* CTA */}
            <div className="mt-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl p-5 text-white">
              <p className="font-bold text-sm mb-2">Need Help Choosing a Plan?</p>
              <p className="text-xs text-teal-100 mb-3">Our licensed agents can walk you through your options during enrollment.</p>
              <a
                href="tel:+18008452484"
                onClick={() => trackPhoneClick({ phone_number: "(800) 845-2484", page_section: "open-enrollment-sidebar" })}
                className="w-full flex items-center justify-center gap-2 bg-white text-teal-700 font-semibold text-sm py-2 rounded-lg hover:bg-teal-50 transition-colors"
              >
                <Phone className="w-4 h-4" /> Call (800) 845-2484
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* What Is Medicare Open Enrollment? */}
          <section id="what-is" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">What Is Medicare Open Enrollment?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Medicare Open Enrollment — officially called the <strong>Annual Enrollment Period (AEP)</strong> — is the yearly window when Medicare beneficiaries can make changes to their health and drug coverage. It&apos;s the primary time each year when you can switch plans, add coverage, or change how you receive your Medicare benefits.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Outside of this period (and a few other special enrollment windows), your Medicare coverage is generally locked in for the year. That&apos;s why it&apos;s important to review your options each fall and make sure your current plan still meets your needs.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Note: Medicare Open Enrollment is different from the{" "}
              <Link href="/enrollment/turning-65" className="text-teal-700 underline hover:text-teal-900">Initial Enrollment Period</Link>{" "}
              (when you first become eligible for Medicare at 65) and the{" "}
              <Link href="/medicare-supplements" className="text-teal-700 underline hover:text-teal-900">Medigap Open Enrollment Period</Link>{" "}
              (for purchasing supplemental insurance).
            </p>
          </section>

          {/* 2026 Dates & Deadlines */}
          <section id="dates" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">2026 Medicare Enrollment Dates &amp; Deadlines</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-4 bg-teal-50 border border-teal-200 rounded-lg p-5">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-teal-800 text-lg">Annual Enrollment Period (AEP)</p>
                  <p className="text-teal-700 font-semibold">October 15 – December 7, 2026</p>
                  <p className="text-gray-700 text-sm mt-1">The main enrollment window. Changes take effect <strong>January 1, 2027</strong>.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-5">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-[#1a2b4a] text-lg">Medicare Advantage Open Enrollment (MA OEP)</p>
                  <p className="text-blue-600 font-semibold">January 1 – March 31, 2026</p>
                  <p className="text-gray-700 text-sm mt-1">Only for people already in a Medicare Advantage plan. Switch MA plans or return to Original Medicare + Part D.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-5">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-bold text-[#1a2b4a] text-lg">General Enrollment Period (GEP)</p>
                  <p className="text-gray-600 font-semibold">January 1 – March 31, 2026</p>
                  <p className="text-gray-700 text-sm mt-1">For people who missed their Initial Enrollment Period. Sign up for Part A and/or Part B. Coverage begins July 1.</p>
                </div>
              </div>
            </div>
          </section>

          {/* What You Can Change */}
          <section id="what-you-can-do" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">What You Can Do During Open Enrollment</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> You CAN
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> Switch from Original Medicare to Medicare Advantage</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> Switch from Medicare Advantage to Original Medicare</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> Switch between Medicare Advantage plans</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> Join a Medicare Part D drug plan</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> Switch Part D plans</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /> Drop Part D coverage</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> You CANNOT
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" /> Buy or switch Medigap plans (separate rules)</li>
                  <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" /> Enroll in Medicare Part A or Part B for the first time</li>
                  <li className="flex items-start gap-2"><XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" /> Make changes to employer/union group coverage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* All Enrollment Periods */}
          <section id="all-periods" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">All Medicare Enrollment Periods Explained</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              Medicare has multiple enrollment windows. Here&apos;s how they differ:
            </p>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-[#1a2b4a]">Period</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1a2b4a]">Dates</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1a2b4a]">Who It&apos;s For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-teal-50"><td className="px-4 py-3 text-gray-700 font-medium">Annual Enrollment (AEP)</td><td className="px-4 py-3 text-gray-700">Oct 15 – Dec 7</td><td className="px-4 py-3 text-gray-700">All Medicare beneficiaries</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">MA Open Enrollment (OEP)</td><td className="px-4 py-3 text-gray-700">Jan 1 – Mar 31</td><td className="px-4 py-3 text-gray-700">Current MA plan members only</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">Initial Enrollment (IEP)</td><td className="px-4 py-3 text-gray-700">7-month window around 65th birthday</td><td className="px-4 py-3 text-gray-700">People newly eligible for Medicare</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">General Enrollment (GEP)</td><td className="px-4 py-3 text-gray-700">Jan 1 – Mar 31</td><td className="px-4 py-3 text-gray-700">Those who missed IEP</td></tr>
                  <tr><td className="px-4 py-3 text-gray-700 font-medium">Special Enrollment (SEP)</td><td className="px-4 py-3 text-gray-700">Varies by qualifying event</td><td className="px-4 py-3 text-gray-700">People with qualifying life changes</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 text-sm mt-4">
              For detailed information about each period, visit our{" "}
              <Link href="/enrollment/annual-enrollment-period" className="text-teal-700 underline hover:text-teal-900">Annual Enrollment Period guide</Link>{" "}
              or{" "}
              <Link href="/enrollment/turning-65" className="text-teal-700 underline hover:text-teal-900">Turning 65 enrollment guide</Link>.
            </p>
          </section>

          {/* Tips for Open Enrollment */}
          <section id="tips" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">Tips for Medicare Open Enrollment</h2>
            <div className="space-y-3">
              {[
                { num: "1", title: "Review Your Annual Notice of Change (ANOC)", desc: "Your plan mails this in September. It details any changes to premiums, copays, covered drugs, or provider networks for the upcoming year." },
                { num: "2", title: "Check Your Medications", desc: "Make sure your prescriptions are still on your plan's formulary. Drug tiers and costs can change annually." },
                { num: "3", title: "Verify Your Doctors Are Still In-Network", desc: "Provider networks change every year. Confirm your doctors, specialists, and preferred hospitals are still covered." },
                { num: "4", title: "Compare Total Costs, Not Just Premiums", desc: "A $0 premium plan may cost more overall if it has high copays for services you use frequently." },
                { num: "5", title: "Don't Wait Until December 7", desc: "Start reviewing options in October. Last-minute decisions often lead to mistakes or missed deadlines." },
              ].map((tip) => (
                <div key={tip.num} className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">{tip.num}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#1a2b4a]">{tip.title}</p>
                    <p className="text-gray-600 text-sm mt-0.5">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section id="mistakes" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-4">Common Open Enrollment Mistakes to Avoid</h2>
            <div className="space-y-3">
              {[
                { mistake: "Assuming your plan stays the same", fix: "Plans change benefits, costs, and networks annually. Always review your ANOC." },
                { mistake: "Only comparing premiums", fix: "Factor in deductibles, copays, drug costs, and out-of-pocket maximums for a true cost picture." },
                { mistake: "Ignoring the Star Rating", fix: "Medicare rates plans 1-5 stars. Higher-rated plans typically provide better care coordination and customer service." },
                { mistake: "Forgetting about Part D coverage gaps", fix: "Check if your medications hit the coverage gap (donut hole) and what your plan charges during that phase." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-amber-800 text-sm">{item.mistake}</p>
                    <p className="text-gray-700 text-sm mt-0.5">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a2b4a] mb-5">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-[#1a2b4a] text-[15px] pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-[#1a2b4a] to-[#2a4a7a] rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Need Help During Open Enrollment?</h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Our licensed agents can help you compare plans, check your medications, and find the best coverage for your needs. Free, no-obligation consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ZipFormModal
                coverageType="ma"
                title="Compare Plans for Open Enrollment"
                subtitle="Enter your ZIP code to see all available plans in your area."
                triggerLabel="Compare Plans"
                triggerClassName="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                pageSection="open-enrollment-cta"
              />
              <a
                href="tel:+18008452484"
                onClick={() => trackPhoneClick({ phone_number: "(800) 845-2484", page_section: "open-enrollment-cta" })}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" /> (800) 845-2484
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
