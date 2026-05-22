"use client";
import Link from "next/link";
import CourseLayout from "@/components/CourseLayout";
import EddieProTip from "@/components/EddieProTip";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Calendar,
  Shield,
  Users,
  Star,
  Clock,
  MapPin,
} from "lucide-react";

export default function PageContent() {
  return (
    <CourseLayout currentLesson={7}>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        Congratulations — you now understand Medicare better than 90% of people turning 65. This final
        lesson gives you a clear action plan based on where you are in your Medicare journey.
      </p>

      {/* Action Plan: Turning 65 */}
      <div className="mb-10 p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-700" />
          <h2 className="text-xl font-bold text-blue-900" style={{ fontFamily: "'Merriweather', serif" }}>
            If You Are Turning 65 in the Next 6 Months
          </h2>
        </div>
        <ol className="space-y-3">
          {[
            "Confirm your Part A and Part B enrollment dates (sign up at ssa.gov or your local Social Security office 3 months before your birthday).",
            "Start comparing Medigap plans NOW. Your 6-month OEP starts when Part B begins.",
            "Get quotes from multiple carriers in your ZIP code — rates can vary by $50-100/month for the same plan.",
            "Choose a Part D drug plan that covers your specific medications at the lowest cost.",
            "Cancel or coordinate with any existing coverage (employer, marketplace, COBRA, etc.).",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-blue-900">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Action Plan: Already on Medicare */}
      <div className="mb-10 p-6 bg-amber-50 border-2 border-amber-200 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-amber-700" />
          <h2 className="text-xl font-bold text-amber-900" style={{ fontFamily: "'Merriweather', serif" }}>
            If You Are Already on Medicare Without Supplemental Coverage
          </h2>
        </div>
        <ol className="space-y-3">
          {[
            "Understand that you may face medical underwriting for Medigap (health questions, potential denial).",
            "Check if your state has a birthday rule or other guaranteed issue protections that give you an annual switching window.",
            "Consider Medicare Advantage as an alternative if you cannot qualify for Medigap due to health conditions.",
            "Talk to a licensed agent who can assess your options based on your specific health history.",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 bg-amber-700 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-amber-900">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Action Plan: On Advantage, considering switch */}
      <div className="mb-10 p-6 bg-purple-50 border-2 border-purple-200 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-purple-700" />
          <h2 className="text-xl font-bold text-purple-900" style={{ fontFamily: "'Merriweather', serif" }}>
            If You Are on Medicare Advantage and Considering a Switch
          </h2>
        </div>
        <ol className="space-y-3">
          {[
            "Know that you can switch to Original Medicare during the Annual Enrollment Period (Oct 15 - Dec 7) or the MA Open Enrollment Period (Jan 1 - Mar 31).",
            "You will need to apply for Medigap separately — and medical underwriting applies after your OEP.",
            "If you are healthy, you may qualify. If you have conditions, talk to an agent first to assess your options.",
            "You will also need to enroll in a standalone Part D plan when leaving Advantage.",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 bg-purple-700 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-purple-900">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Why Work with a Licensed Agent */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
          Why Work with a Licensed Agent
        </h2>
        <div className="space-y-3">
          {[
            { icon: Users, text: "Licensed agents represent multiple carriers (not just one) — they can show you all your options." },
            { icon: MapPin, text: "They compare rates across all available carriers in your specific ZIP code." },
            { icon: Star, text: "There is no cost to you — agents are compensated by the carrier, not the client." },
            { icon: Shield, text: "They can help you navigate underwriting if you are outside your OEP." },
            { icon: Calendar, text: "They provide ongoing service — annual reviews, rate shopping, and claims help." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-teal-700" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Eddie Pro Tip */}
      <EddieProTip
        variant="teal"
        tip={
          <>
            You have made it through the entire course — you now know more about Medicare than 90% of
            people turning 65. Here is my final piece of advice: <strong>do not go it alone.</strong>{" "}
            Medicare decisions are complex, and the stakes are high. A wrong choice during your Open
            Enrollment Period can follow you for decades. Talk to a licensed, independent agent who can
            look at your specific situation — your health, your medications, your budget, your doctors —
            and give you a personalized recommendation. That is exactly what we do at MedicareFAQ, and
            it costs you nothing.
          </>
        }
      />

      {/* Primary CTA */}
      <div className="my-10 p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white text-center">
        <CheckCircle2 className="w-10 h-10 text-teal-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Ready to Get Covered?</h3>
        <p className="text-slate-300 mb-6 max-w-lg mx-auto">
          Enter your ZIP code to see personalized Medigap rates from top carriers in your area.
          Free. No obligation. No pressure. Just answers.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <ZipFormModal
            pageSection="medicare_101_course_lesson_7"
            triggerId="compare-plans-course-l7"
            coverageType="ms"
            title="Compare Medigap Plans in Your Area"
            subtitle="Enter your ZIP code to see rates from top Medigap carriers available near you — free, no obligation."
            buttonLabel="Compare Plans"
            trigger={
              <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg">
                Get Personalized Rates <ArrowRight className="w-5 h-5" />
              </button>
            }
          />
        </div>
        <div className="flex items-center justify-center gap-2 text-slate-300">
          <Phone className="w-4 h-4" />
          <span className="text-sm">Prefer to talk?</span>
          <a
            href="tel:+18883358996"
            id="callInNum"
            data-invoca-phone-number="18883358996"
            onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "medicare_101_course_lesson_7" })}
            className="text-teal-400 font-semibold hover:text-teal-300 transition-colors"
          >
            Call (888) 335-8996
          </a>
        </div>
      </div>

      {/* Secondary Links */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Link
          href="/medicare-supplements/medigap-by-state"
          className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-center group"
        >
          <MapPin className="w-5 h-5 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-800">
            Top Carriers by State
          </p>
        </Link>
        <Link
          href="/faqs/medicare-supplement-vs-medicare-advantage-crucial-questions-to-ask-before-enrolling"
          className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-center group"
        >
          <Shield className="w-5 h-5 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-800">
            Full Medigap vs. Advantage Guide
          </p>
        </Link>
        <Link
          href="/new-to-medicare/costs"
          className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-center group"
        >
          <Star className="w-5 h-5 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-800">
            Medicare Costs for {new Date().getFullYear()}
          </p>
        </Link>
      </div>
    </CourseLayout>
  );
}
