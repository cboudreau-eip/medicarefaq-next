"use client";
import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import type { QuizQuestion } from "@/lib/course-quiz-data";
import CourseEmailCapture from "@/components/CourseEmailCapture";

const STORAGE_KEY = "medicare-101-quiz-scores";

export interface QuizScores {
  [lessonNumber: number]: {
    answers: { [questionId: string]: number };
    score: number;
    total: number;
    completed: boolean;
  };
}

export function getStoredScores(): QuizScores {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveScores(scores: QuizScores) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

export function resetScores() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

interface CourseQuizProps {
  lessonNumber: number;
  questions: QuizQuestion[];
  nextLessonUrl: string | null; // null for lesson 7 (goes to results)
}

export default function CourseQuiz({ lessonNumber, questions, nextLessonUrl }: CourseQuizProps) {
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [revealed, setRevealed] = useState<{ [questionId: string]: boolean }>({});
  const [allAnswered, setAllAnswered] = useState(false);

  // Load any previously stored answers for this lesson
  useEffect(() => {
    const scores = getStoredScores();
    if (scores[lessonNumber]?.completed) {
      setAnswers(scores[lessonNumber].answers);
      const revealedState: { [key: string]: boolean } = {};
      questions.forEach((q) => {
        revealedState[q.id] = true;
      });
      setRevealed(revealedState);
      setAllAnswered(true);
    }
  }, [lessonNumber, questions]);

  // Check if all questions have been answered
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount === questions.length && questions.length > 0) {
      setAllAnswered(true);
      // Save to localStorage
      const scores = getStoredScores();
      const correctCount = questions.filter(
        (q) => answers[q.id] === q.correctIndex
      ).length;
      scores[lessonNumber] = {
        answers,
        score: correctCount,
        total: questions.length,
        completed: true,
      };
      saveScores(scores);
    }
  }, [answers, questions, lessonNumber]);

  const handleAnswer = (questionId: string, optionIndex: number) => {
    // Only allow answering once per question
    if (revealed[questionId]) return;

    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setRevealed((prev) => ({ ...prev, [questionId]: true }));
  };

  const correctCount = questions.filter(
    (q) => answers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="mt-12 pt-8 border-t-2 border-slate-200">
      {/* Quiz Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2
            className="text-xl font-bold text-slate-900"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Knowledge Check
          </h2>
          <p className="text-sm text-slate-500">
            Answer all questions to unlock the next lesson
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const isRevealed = revealed[q.id];
          const selectedAnswer = answers[q.id];
          const isCorrect = selectedAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border-2 transition-all ${
                isRevealed
                  ? isCorrect
                    ? "border-green-200 bg-green-50/50"
                    : "border-red-200 bg-red-50/50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <p className="font-semibold text-slate-900 mb-3">
                <span className="text-blue-600 mr-2">Q{qIndex + 1}.</span>
                {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((option, optIndex) => {
                  const isSelected = selectedAnswer === optIndex;
                  const isCorrectOption = q.correctIndex === optIndex;

                  let optionClasses =
                    "w-full text-left p-3 rounded-lg border transition-all text-sm ";

                  if (!isRevealed) {
                    optionClasses +=
                      "border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer";
                  } else if (isCorrectOption) {
                    optionClasses +=
                      "border-green-300 bg-green-100 text-green-900";
                  } else if (isSelected && !isCorrectOption) {
                    optionClasses +=
                      "border-red-300 bg-red-100 text-red-900";
                  } else {
                    optionClasses += "border-slate-100 text-slate-400";
                  }

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleAnswer(q.id, optIndex)}
                      disabled={isRevealed}
                      className={optionClasses}
                    >
                      <span className="flex items-center gap-2">
                        {isRevealed && isCorrectOption && (
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        )}
                        {isRevealed && isSelected && !isCorrectOption && (
                          <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                        {!isRevealed && (
                          <span className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                        )}
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isRevealed && (
                <div
                  className={`mt-3 p-3 rounded-lg text-sm ${
                    isCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  <strong>{isCorrect ? "Correct!" : "Not quite."}</strong>{" "}
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Email capture — shown only after Lesson 1 completion */}
      {lessonNumber === 1 && allAnswered && <CourseEmailCapture />}

      {/* Score Summary + Next Button */}
      <div className="mt-8 p-5 bg-slate-50 rounded-xl border border-slate-200">
        {allAnswered ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-bold text-slate-900">
                Lesson {lessonNumber} Score:{" "}
                <span className={correctCount === questions.length ? "text-green-700" : "text-blue-700"}>
                  {correctCount}/{questions.length} correct
                </span>
              </p>
              <p className="text-sm text-slate-500 mt-0.5">
                {correctCount === questions.length
                  ? "Perfect score!"
                  : "Review the explanations above, then continue."}
              </p>
            </div>
            {nextLessonUrl ? (
              <Link
                href={nextLessonUrl}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Next Lesson <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/medicare-101-course/results"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                See Your Final Score <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {Object.keys(answers).length}/{questions.length} questions answered
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Lock className="w-4 h-4" />
              Answer all questions to continue
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
