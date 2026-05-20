"use client";

import Link from "next/link";
import { ChevronDown, Gift, Calendar, Shield, ArrowRight } from "lucide-react";
import InteractiveUSMap from "@/components/InteractiveUSMap";
import { BIRTHDAY_RULE_STATES, BIRTHDAY_RULE_STATE_CODES, CONTINUOUS_OE_STATE_CODES } from "@/lib/birthday-rule-states";

export default function PageContent() {
  const birthdayRuleStates = BIRTHDAY_RULE_STATE_CODES.map((code) => ({
    code,
    ...BIRTHDAY_RULE_STATES[code],
  })).sort((a, b) => a.name.localeCompare(b.name));

  const continuousOEStates = CONTINUOUS_OE_STATE_CODES.map((code) => ({
    code,
    ...BIRTHDAY_RULE_STATES[code],
  })).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 pt-8 pb-16">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-supplements" className="hover:text-white transition-colors">Medicare Supplement</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Birthday Rule by State</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-teal-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 max-w-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
            Medicare Supplement Birthday Rule by State
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-4">
            Some states have a &ldquo;birthday rule&rdquo; that gives you a guaranteed-issue window to switch Medigap plans without medical underwriting. Click on your state to learn more.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-400" />
              Updated for 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-teal-400" />
              {birthdayRuleStates.length} states with birthday rules
            </span>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            What Is the Medigap Birthday Rule?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            The Medigap birthday rule is a state-level consumer protection that gives Medicare Supplement policyholders a guaranteed-issue period — typically around their birthday — to switch to a different Medigap plan without answering health questions or facing medical underwriting.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            This means you can change to a plan with equal or lesser benefits (and potentially lower premiums) regardless of any health conditions you may have developed since you first enrolled.
          </p>
          <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
            <p className="text-teal-900 font-medium">
              Not all states have a birthday rule. Currently, {birthdayRuleStates.length} states offer this protection. Use the interactive map below to check your state.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12">
        <div className="container max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            Medicare Underwriting by State
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Some states have additional Medigap Open Enrollment periods that allow beneficiaries to enroll in a Medigap plan without underwriting. <strong>Click on your state to learn more.</strong>
          </p>
          <InteractiveUSMap />
        </div>
      </section>

      {/* Birthday Rule States Table */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            States With a Medigap Birthday Rule
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
              <thead>
                <tr className="bg-teal-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-teal-900">State</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-teal-900">Window Period</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-teal-900">Details</th>
                </tr>
              </thead>
              <tbody>
                {birthdayRuleStates.map((state, idx) => (
                  <tr key={state.code} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3">
                      <Link href={state.link} className="text-teal-700 hover:text-teal-900 font-medium hover:underline">
                        {state.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{state.window}</td>
                    <td className="px-4 py-3">
                      <Link href={state.link} className="text-sm text-teal-600 hover:text-teal-800 flex items-center gap-1">
                        Learn more <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Continuous OE States */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            States With Continuous Open Enrollment
          </h2>
          <p className="text-gray-700 mb-6">
            These states go even further than the birthday rule — they offer <strong>continuous guaranteed issue</strong>, meaning you can switch Medigap plans at any time of year without medical underwriting:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {continuousOEStates.map((state) => (
              <div key={state.code} className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
                <p className="font-medium text-green-800">{state.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            How the Birthday Rule Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-teal-700 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Birthday Approaches</h3>
              <p className="text-sm text-gray-600">
                Your guaranteed-issue window opens around your birthday (exact timing varies by state — some start 30 days before, others on the day of).
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-teal-700 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Apply for a New Plan</h3>
              <p className="text-sm text-gray-600">
                You can apply for any Medigap plan with equal or lesser benefits than your current plan. No health questions or medical underwriting required.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-teal-700 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Save on Premiums</h3>
              <p className="text-sm text-gray-600">
                Many people use the birthday rule to switch to a carrier with lower premiums for the same plan letter, potentially saving hundreds per year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white border border-gray-200 rounded-lg p-4 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I switch to a higher-benefit plan during the birthday rule window?
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-gray-700">
                Generally, no. The birthday rule allows you to switch to a plan with equal or lesser benefits. For example, if you have Plan G, you could switch to another carrier&apos;s Plan G or to Plan N, but not to Plan F (which has more benefits). The specific rules vary by state.
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-lg p-4 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Do I need to notify my current insurance company?
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-gray-700">
                You don&apos;t need permission from your current carrier, but you should cancel your old plan once the new one is in effect to avoid paying double premiums. Work with your new carrier to coordinate the effective date.
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-lg p-4 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What if my state doesn&apos;t have a birthday rule?
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-gray-700">
                If your state doesn&apos;t have a birthday rule, you can still switch Medigap plans, but you may need to pass medical underwriting. Some carriers are more lenient than others. You can also switch during your initial Medigap Open Enrollment Period (the 6-month window when you first enroll in Medicare Part B).
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-lg p-4 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I use the birthday rule every year?
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-gray-700">
                Yes! The birthday rule window recurs every year around your birthday. You can take advantage of it annually to shop for better rates. This is especially useful as Medigap premiums tend to increase with age.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-teal-900">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Compare Medigap Rates?
          </h2>
          <p className="text-teal-200 mb-6">
            Whether your state has a birthday rule or not, we can help you find the best Medigap plan at the lowest premium.
          </p>
          <Link
            href="/compare-rates"
            className="inline-flex items-center px-8 py-4 bg-[#f5a623] hover:bg-[#e09515] text-white font-semibold rounded-lg shadow-lg transition-colors text-lg"
          >
            Compare Plans Now <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
