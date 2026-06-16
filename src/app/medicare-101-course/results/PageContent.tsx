"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { COURSE_QUIZZES, TOTAL_QUESTIONS, getGrade } from "@/lib/course-quiz-data";
import { getStoredScores, resetScores, type QuizScores } from "@/components/CourseQuiz";
import { COURSE_LESSONS } from "@/components/CourseLayout";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";
import { getCourseProfile, clearCourseProfile, type CourseUserProfile } from "@/components/CourseOnboarding";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Phone,
  BookOpen,
  Star,
} from "lucide-react";

/** Get personalized CTA text based on profile */
function getResultsCta(profile: CourseUserProfile | null) {
  if (!profile) {
    return {
      heading: "Ready to Put Your Knowledge to Work?",
      subtext: "You understand Medicare. Now let a licensed agent help you find the best plan and rate for your specific situation. Free, no obligation.",
      buttonLabel: "Get Personalized Rates",
    };
  }
  switch (profile.situation) {
    case "turning-65":
      return {
        heading: "Ready to Lock In Your Best Rate?",
        subtext: "Your Open Enrollment Period is the best time to get Medigap coverage — no health questions, guaranteed acceptance. See rates from top carriers in your ZIP code.",
        buttonLabel: "See My OEP Rates",
      };
    case "on-medicare":
      return profile.hasPlan === "yes"
        ? {
            heading: "Want to See If You Can Save?",
            subtext: "Rates change every year. A licensed agent can compare your current plan to what is available now and help you switch if it makes sense.",
            buttonLabel: "Compare My Options",
          }
        : {
            heading: "Ready to Get Supplemental Coverage?",
            subtext: "A licensed agent can assess your health history and find the best path to Medigap or Advantage coverage. Free, no obligation.",
            buttonLabel: "Check My Options",
          };
    case "has-plan":
      return {
        heading: "Ready to Plan Your Medicare Transition?",
        subtext: "When you leave employer coverage, you will get a guaranteed issue window for Medigap. Let a licensed agent help you plan the timing and pick the right plan.",
        buttonLabel: "Get My Transition Plan",
      };
  }
}

export default function PageContent() {
  const [scores, setScores] = useState<QuizScores | null>(null);
  const [profile, setProfile] = useState<CourseUserProfile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setScores(getStoredScores());
    setProfile(getCourseProfile());
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading results...</div>
      </div>
    );
  }

  // Calculate totals
  const totalCorrect = Object.values(scores || {}).reduce(
    (sum, lesson) => sum + (lesson?.score || 0),
    0
  );
  const totalAnswered = Object.values(scores || {}).reduce(
    (sum, lesson) => sum + (lesson?.total || 0),
    0
  );
  const completedLessons = Object.keys(scores || {}).length;
  const allComplete = completedLessons === 7;
  const grade = getGrade(totalCorrect, TOTAL_QUESTIONS);
  const cta = getResultsCta(profile);

  const handleRetake = () => {
    resetScores();
    clearCourseProfile();
    window.location.href = "/medicare-101-course";
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-10 pb-16">
        <div className="container max-w-4xl text-center">
          <div className="w-16 h-16 bg-teal-500/20 border border-teal-400/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Trophy className="w-8 h-8 text-teal-400" aria-hidden="true" />
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            {allComplete ? "Course Complete!" : "Your Progress So Far"}
          </h1>
          <p className="text-slate-300 max-w-lg mx-auto">
            {allComplete
              ? "You have completed all 7 lessons of the Medicare 101 Course. Here are your results."
              : `You have completed ${completedLessons} of 7 lessons. Finish the remaining lessons to see your final grade.`}
          </p>
        </div>
      </section>

      {/* Score Card */}
      <section className="py-12">
        <div className="container max-w-4xl">
          {/* Big Score Display */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-6 p-8 bg-slate-50 border-2 border-slate-200 rounded-2xl">
              <div>
                <div className={`text-6xl font-black ${grade.color}`}>
                  {grade.letter}
                </div>
                <div className="text-sm text-slate-500 mt-1">Grade</div>
              </div>
              <div className="w-px h-16 bg-slate-200" />
              <div>
                <div className="text-4xl font-bold text-slate-900">
                  {totalCorrect}/{TOTAL_QUESTIONS}
                </div>
                <div className="text-sm text-slate-500 mt-1">
                  {Math.round((totalCorrect / TOTAL_QUESTIONS) * 100)}% correct
                </div>
              </div>
            </div>
            <p className={`mt-5 text-lg font-medium max-w-xl mx-auto ${grade.color}`}>
              {grade.message}
            </p>
          </div>

          {/* Per-Lesson Breakdown */}
          <div className="mb-10">
            <h2
              className="text-xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Lesson-by-Lesson Breakdown
            </h2>
            <div className="space-y-2">
              {COURSE_LESSONS.map((lesson) => {
                const lessonScore = scores?.[lesson.number];
                const isComplete = lessonScore?.completed;
                const isPerfect = isComplete && lessonScore.score === lessonScore.total;

                return (
                  <div
                    key={lesson.number}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      isPerfect
                        ? "border-green-200 bg-green-50"
                        : isComplete
                        ? "border-slate-200 bg-white"
                        : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                          isPerfect
                            ? "bg-green-200 text-green-800"
                            : isComplete
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {lesson.number}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{lesson.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isComplete ? (
                        <>
                          <span
                            className={`text-sm font-semibold ${
                              isPerfect ? "text-green-700" : "text-slate-700"
                            }`}
                          >
                            {lessonScore.score}/{lessonScore.total}
                          </span>
                          {isPerfect ? (
                            <Star className="w-4 h-4 text-green-600" aria-hidden="true" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-blue-500" aria-hidden="true" />
                          )}
                        </>
                      ) : (
                        <Link
                          href={`/medicare-101-course/${lesson.slug}`}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Start lesson
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Retake Course
            </button>
            <Link
              href="/medicare-101-course"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              Review Lessons
            </Link>
          </div>

          {/* CTA — personalized */}
          <div className="p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white text-center">
            <CheckCircle2 className="w-10 h-10 text-teal-400 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-bold mb-2">{cta.heading}</h3>
            <p className="text-slate-300 mb-6 max-w-lg mx-auto">
              {cta.subtext}
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-5">
              <ZipFormModal
                pageSection="medicare_101_course_results"
                triggerId="compare-plans-course-results"
                coverageType="ms"
                title="Compare Medigap Plans in Your Area"
                subtitle="Enter your ZIP code to see rates from top Medigap carriers available near you."
                buttonLabel="Compare Plans"
                trigger={
                  <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg">
                    {cta.buttonLabel} <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                }
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">Prefer to talk?</span>
              <a
                href="tel:+18883358996"
                id="callInNum"
                data-invoca-phone-number="18883358996"
                onClick={() =>
                  trackPhoneClick({
                    phone_number: "(888) 335-8996",
                    page_section: "medicare_101_course_results",
                  })
                }
                className="text-teal-400 font-semibold hover:text-teal-300 transition-colors"
              >
                Call (888) 335-8996
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
