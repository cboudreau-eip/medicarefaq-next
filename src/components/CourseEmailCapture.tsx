"use client";
import { useState, useEffect } from "react";
import { Mail, CheckCircle2, X, Bookmark } from "lucide-react";

const STORAGE_KEY = "medicare-101-email-capture";

interface StoredEmailState {
  email?: string;
  dismissed: boolean;
  submittedAt?: string;
}

function getStoredState(): StoredEmailState {
  if (typeof window === "undefined") return { dismissed: false };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { dismissed: false };
  } catch {
    return { dismissed: false };
  }
}

function saveState(state: StoredEmailState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearEmailCapture() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Optional email capture prompt shown after completing Lesson 1.
 * - No password required, just email
 * - Can be dismissed permanently
 * - Shows success state after submission
 * - Stores email in localStorage + sends to backend for lead capture
 */
export default function CourseEmailCapture() {
  const [state, setState] = useState<StoredEmailState>({ dismissed: false });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredState();
    setState(stored);
    if (stored.email) {
      setStatus("success");
    }
  }, []);

  if (!mounted) return null;

  // Don't show if already dismissed or already submitted
  if (state.dismissed && status !== "success") return null;
  if (status === "success") {
    return (
      <div className="mt-6 mb-2 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
        <div className="text-sm text-green-800">
          <span className="font-semibold">Progress saved!</span>{" "}
          We will send you a reminder if you haven&apos;t finished the course in a few days.
        </div>
      </div>
    );
  }

  const handleDismiss = () => {
    const newState = { ...state, dismissed: true };
    setState(newState);
    saveState(newState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("submitting");

    try {
      // Send to backend for lead capture
      const res = await fetch("/api/course-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "medicare-101-course-lesson-1" }),
      });

      if (res.ok) {
        const newState: StoredEmailState = {
          email,
          dismissed: false,
          submittedAt: new Date().toISOString(),
        };
        setState(newState);
        saveState(newState);
        setStatus("success");
      } else {
        // Even if backend fails, save locally so user isn't pestered
        const newState: StoredEmailState = {
          email,
          dismissed: false,
          submittedAt: new Date().toISOString(),
        };
        setState(newState);
        saveState(newState);
        setStatus("success");
      }
    } catch {
      // Save locally regardless
      const newState: StoredEmailState = {
        email,
        dismissed: false,
        submittedAt: new Date().toISOString(),
      };
      setState(newState);
      saveState(newState);
      setStatus("success");
    }
  };

  return (
    <div className="mt-6 mb-2 p-5 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-xl relative">
      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-200/60 transition-colors text-slate-400 hover:text-slate-600"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
          <Bookmark className="w-5 h-5 text-blue-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 text-sm mb-1">
            Save your progress (optional)
          </p>
          <p className="text-xs text-slate-600 mb-3">
            Enter your email and we will send you a link to pick up where you left off — even on a different device. We will also send a gentle reminder if you haven&apos;t finished the course.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold text-sm rounded-lg transition-colors shrink-0"
            >
              {status === "submitting" ? "Saving..." : "Save Progress"}
            </button>
          </form>

          <p className="text-[11px] text-slate-400 mt-2">
            No spam, no sales calls. Just a progress link and optional lesson reminders. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
