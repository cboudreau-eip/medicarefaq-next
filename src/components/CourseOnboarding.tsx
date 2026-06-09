"use client";
/**
 * CourseOnboarding — 2-question intake screen shown before Lesson 1.
 * Stores answers in localStorage to personalize Lesson 7 and CTAs.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, User, Shield } from "lucide-react";

export type MedicareProfile = "turning-65" | "on-medicare" | "has-plan";
export type HasPlan = "yes" | "no" | "not-sure";

export interface CourseUserProfile {
  situation: MedicareProfile;
  hasPlan: HasPlan;
}

const STORAGE_KEY = "medicarefaq-course-profile";

/** Read the stored profile from localStorage (returns null if not set) */
export function getCourseProfile(): CourseUserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CourseUserProfile;
  } catch {
    return null;
  }
}

/** Save profile to localStorage */
function saveProfile(profile: CourseUserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

/** Clear stored profile */
export function clearCourseProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

interface CourseOnboardingProps {
  onComplete: () => void;
}

export default function CourseOnboarding({ onComplete }: CourseOnboardingProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [situation, setSituation] = useState<MedicareProfile | null>(null);
  const [hasPlan, setHasPlan] = useState<HasPlan | null>(null);

  const handleFinish = () => {
    if (!situation || !hasPlan) return;
    saveProfile({ situation, hasPlan });
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Before We Start</p>
              <p className="text-teal-100 text-sm">
                Two quick questions so we can personalize your action plan
              </p>
            </div>
          </div>
          {/* Step indicator */}
          <div className="flex gap-2 mt-4">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-white" : "bg-white/30"}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-white" : "bg-white/30"}`} />
          </div>
        </div>

        {/* Step 1: Situation */}
        {step === 1 && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-slate-500" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Question 1 of 2</p>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              What best describes your situation?
            </h2>
            <div className="space-y-3">
              {([
                {
                  value: "turning-65" as MedicareProfile,
                  label: "I'm turning 65 soon (or newly eligible)",
                  desc: "You haven't enrolled in Medicare yet or just started",
                },
                {
                  value: "on-medicare" as MedicareProfile,
                  label: "I'm already on Medicare",
                  desc: "You have Original Medicare (Parts A & B) but may not have supplemental coverage",
                },
                {
                  value: "has-plan" as MedicareProfile,
                  label: "I have employer coverage past 65",
                  desc: "You're still working and covered by an employer plan",
                },
              ]).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSituation(option.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    situation === option.value
                      ? "border-teal-500 bg-teal-50 ring-2 ring-teal-200"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <p className="font-semibold text-slate-900 text-sm">{option.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{option.desc}</p>
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!situation}
              onClick={() => setStep(2)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Current plan */}
        {step === 2 && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-slate-500" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Question 2 of 2</p>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
              Do you currently have a Medicare Supplement or Advantage plan?
            </h2>
            <div className="space-y-3">
              {([
                {
                  value: "yes" as HasPlan,
                  label: "Yes, I have supplemental coverage",
                  desc: "Medigap, Medicare Advantage, or another supplemental plan",
                },
                {
                  value: "no" as HasPlan,
                  label: "No, I don't have supplemental coverage",
                  desc: "I only have Original Medicare or nothing yet",
                },
                {
                  value: "not-sure" as HasPlan,
                  label: "I'm not sure",
                  desc: "I'll figure this out as I go through the course",
                },
              ]).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setHasPlan(option.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    hasPlan === option.value
                      ? "border-teal-500 bg-teal-50 ring-2 ring-teal-200"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <p className="font-semibold text-slate-900 text-sm">{option.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{option.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!hasPlan}
                onClick={handleFinish}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Start the Course <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Skip option */}
        <div className="px-6 pb-5 text-center">
          <button
            type="button"
            onClick={() => {
              // Save a default profile so we don't ask again
              saveProfile({ situation: "turning-65", hasPlan: "not-sure" });
              onComplete();
            }}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors underline"
          >
            Skip — I just want to start learning
          </button>
        </div>
      </div>
    </div>
  );
}
