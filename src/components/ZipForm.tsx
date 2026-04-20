"use client";

/**
 * ZipForm — ZIP code entry form that redirects to the demographics app.
 *
 * Uses the new demographics-redirect script (provided by the MC team).
 * On submit: validates the ZIP, then calls redirectToDemographics() which
 * builds a full attribution payload and submits a hidden GET form to
 * demographics.medicarecompared.com/{coverageType}.
 *
 * Usage:
 *   <ZipForm coverageType="ms" />           ← Medicare Supplement
 *   <ZipForm coverageType="ma" />           ← Medicare Advantage
 *   <ZipForm coverageType="ms" variant="hero" />  ← large hero style
 */

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  redirectToDemographics,
  type CoverageType,
} from "@/lib/demographics-redirect";

interface ZipFormProps {
  /** Coverage type: 'ma' | 'ms' | 'pdp' | 'me' */
  coverageType: CoverageType;
  /** Optional placeholder text */
  placeholder?: string;
  /** Optional button label */
  buttonLabel?: string;
  /** Optional CSS class overrides for the wrapper */
  className?: string;
  /** Visual variant */
  variant?: "default" | "hero" | "inline";
}

export default function ZipForm({
  coverageType,
  placeholder = "Enter ZIP Code",
  buttonLabel = "Compare Plans",
  className = "",
  variant = "default",
}: ZipFormProps) {
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }
    setError("");
    setSubmitting(true);
    redirectToDemographics(zip, coverageType);
  }

  // ── Hero variant ──────────────────────────────────────────────────────────

  if (variant === "hero") {
    return (
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-3 ${className}`}
      >
        <div className="flex-1">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
            placeholder={placeholder}
            className="w-full px-5 py-4 rounded-xl text-slate-900 text-lg font-medium placeholder:text-slate-400 border-2 border-transparent focus:border-teal-400 focus:outline-none shadow-lg"
            required
          />
          {error && <p className="mt-1.5 text-sm text-red-300">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg whitespace-nowrap"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
          {buttonLabel}
        </button>
      </form>
    );
  }

  // ── Inline variant ────────────────────────────────────────────────────────

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, ""));
            setError("");
          }}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 rounded-lg text-slate-900 border border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {buttonLabel}
        </button>
        {error && (
          <p className="absolute mt-10 text-xs text-red-500">{error}</p>
        )}
      </form>
    );
  }

  // ── Default variant ───────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, ""));
            setError("");
          }}
          placeholder={placeholder}
          className="flex-1 px-5 py-3 rounded-lg text-slate-900 border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:border-white/60 focus:outline-none backdrop-blur-sm"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
          {buttonLabel}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
    </form>
  );
}
