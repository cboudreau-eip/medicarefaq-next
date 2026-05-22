"use client";
/**
 * Medicare 101 Course — Index / Overview Page
 * Route: /medicare-101-course/
 */
import Link from "next/link";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Phone,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Shield,
  Star,
} from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";
import { COURSE_LESSONS } from "@/components/CourseLayout";

const LESSON_DESCRIPTIONS = [
  "Understand what Medicare is, what it costs, and the two paths to coverage.",
  "Learn what Parts A, B, C, and D cover — and what they leave out.",
  "Know exactly when to enroll and what happens if you miss a deadline.",
  "See the real dollar amounts Medicare does NOT cover — and why supplemental coverage matters.",
  "Compare the two paths and understand why this decision follows you for life.",
  "Plan G vs Plan N, how to evaluate carriers, and what to look for in a policy.",
  "Your personalized action plan based on where you are in the Medicare journey.",
];

export default function PageContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-16">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Medicare 101 Course</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-500/20 border border-teal-400/30 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-teal-400" />
            </div>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Medicare 101 Course
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-3">
            Understand Medicare in 7 Simple Lessons
          </p>
          <p className="text-base text-slate-400 max-w-2xl mb-8">
            Medicare does not have to be confusing. This free course breaks down everything you need
            to know — from what Medicare covers, to how to choose the right plan, to exactly when to
            enroll. Each lesson takes about 5 minutes to read.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-teal-400" /> 7 lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-400" /> ~35 min total
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-teal-400" /> Free, no sign-up required
            </span>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-12 border-b border-slate-100">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            What You Will Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "What Medicare is and how it works",
              "The difference between Parts A, B, C, and D",
              "When to enroll (and what happens if you miss the deadline)",
              "What Medicare does NOT cover and why that matters",
              "How to decide between Medicare Supplement and Medicare Advantage",
              "How to pick the right Medigap plan and carrier",
              "Your exact next steps to get covered",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lesson Cards */}
      <section className="py-14">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl font-bold text-slate-900 mb-8"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Course Lessons
          </h2>
          <div className="space-y-4">
            {COURSE_LESSONS.map((lesson, i) => (
              <Link
                key={lesson.slug}
                href={`/medicare-101-course/${lesson.slug}`}
                className="group flex items-center gap-5 p-5 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all"
              >
                <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-lg font-black text-white">{lesson.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">{LESSON_DESCRIPTIONS[i]}</p>
                </div>
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {lesson.readTime}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="container max-w-4xl text-center">
          <Star className="w-8 h-8 text-amber-500 mx-auto mb-4" />
          <h3
            className="text-2xl font-bold text-slate-900 mb-3"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Ready to Skip Ahead?
          </h3>
          <p className="text-slate-500 mb-6 max-w-lg mx-auto">
            If you already know you want to compare Medigap plans, enter your ZIP code to see
            personalized rates from top carriers in your area — free, no obligation.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <ZipFormModal
              pageSection="medicare_101_course"
              triggerId="compare-plans-course-index"
              coverageType="ms"
              title="Compare Medigap Plans"
              subtitle="Enter your ZIP code to see rates from top Medigap carriers in your area."
              buttonLabel="Compare Plans"
              trigger={
                <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                  Get Personalized Rates <ArrowRight className="w-4 h-4" />
                </button>
              }
            />
            <a
              href="tel:+18883358996"
              id="callInNum"
              data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "medicare_101_course" })}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-semibold px-8 py-3 rounded-lg transition-colors border border-slate-300"
            >
              <Phone className="w-4 h-4" /> Call (888) 335-8996
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
