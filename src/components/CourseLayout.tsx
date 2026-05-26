"use client";
/**
 * CourseLayout — Shared layout wrapper for Medicare 101 Course lesson pages.
 * Provides: progress bar, prev/next navigation, lesson header, quiz integration, and consistent structure.
 */
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, Clock, ChevronDown } from "lucide-react";
import CourseQuiz from "@/components/CourseQuiz";
import { COURSE_QUIZZES } from "@/lib/course-quiz-data";

export interface LessonMeta {
  number: number;
  title: string;
  slug: string;
  readTime: string;
}

export const COURSE_LESSONS: LessonMeta[] = [
  { number: 1, title: "What Is Medicare?", slug: "what-is-medicare", readTime: "5 min" },
  { number: 2, title: "The 4 Parts of Medicare", slug: "parts-of-medicare", readTime: "5 min" },
  { number: 3, title: "Enrollment Windows & Deadlines", slug: "enrollment-windows", readTime: "5 min" },
  { number: 4, title: "The Coverage Gap", slug: "coverage-gaps", readTime: "5 min" },
  { number: 5, title: "Medigap vs. Medicare Advantage", slug: "medigap-vs-advantage", readTime: "6 min" },
  { number: 6, title: "How to Choose a Medigap Plan", slug: "choosing-a-medigap-plan", readTime: "6 min" },
  { number: 7, title: "Your Next Steps", slug: "next-steps", readTime: "4 min" },
];

interface CourseLayoutProps {
  currentLesson: number; // 1-7
  children: React.ReactNode;
}

export default function CourseLayout({ currentLesson, children }: CourseLayoutProps) {
  const lesson = COURSE_LESSONS[currentLesson - 1];
  const prevLesson = currentLesson > 1 ? COURSE_LESSONS[currentLesson - 2] : null;
  const nextLesson = currentLesson < 7 ? COURSE_LESSONS[currentLesson] : null;
  const progress = (currentLesson / 7) * 100;

  // Get quiz data for this lesson
  const quizData = COURSE_QUIZZES.find((q) => q.lessonNumber === currentLesson);
  const nextLessonUrl = nextLesson
    ? `/medicare-101-course/${nextLesson.slug}`
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="container py-3">
          <div className="flex items-center justify-between mb-2">
            <Link
              href="/medicare-101-course"
              className="text-sm font-medium text-slate-500 hover:text-blue-700 transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-4 h-4" />
              Medicare 101 Course
            </Link>
            <span className="text-sm text-slate-500 font-medium">
              Lesson {currentLesson} of 7
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lesson Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 pt-8 pb-14">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/medicare-101-course" className="hover:text-white transition-colors">Medicare 101 Course</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-teal-400">Lesson {currentLesson}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-500/20 border border-teal-400/30 rounded-xl flex items-center justify-center">
              <span className="text-xl font-black text-teal-400">{currentLesson}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              {lesson.readTime} read
            </div>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-white max-w-3xl"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            {lesson.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container max-w-4xl">
          {children}

          {/* Quiz Section — replaces the old bottom nav */}
          {quizData && (
            <CourseQuiz
              lessonNumber={currentLesson}
              questions={quizData.questions}
              nextLessonUrl={nextLessonUrl}
            />
          )}
        </div>
      </section>

      {/* Prev Navigation Only (Next is now gated inside the quiz) */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="container max-w-4xl py-8">
          <div className="flex items-center justify-between gap-4">
            {prevLesson ? (
              <Link
                href={`/medicare-101-course/${prevLesson.slug}`}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline">Previous:</span> {prevLesson.title}
              </Link>
            ) : (
              <Link
                href="/medicare-101-course"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Course Overview
              </Link>
            )}
            <Link
              href="/medicare-101-course"
              className="text-sm text-slate-500 hover:text-blue-700 transition-colors"
            >
              View all lessons
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
