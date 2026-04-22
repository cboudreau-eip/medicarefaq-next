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
 *   <ZipForm coverageType="ms" />                        ← default (dark bg)
 *   <ZipForm coverageType="ma" variant="hero" />         ← hero (compact row with phone)
 *   <ZipForm coverageType="ms" variant="inline" />       ← inline (small, light bg)
 */

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2, Phone } from "lucide-react";
import {
  redirectToDemographics,
  type CoverageType,
} from "@/lib/demographics-redirect";
import { trackZipSubmitted, trackPhoneClick } from "@/lib/analytics";

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
  /** Optional micro-label above the form */
  label?: string;
  /** Show inline phone CTA (hero variant only) */
  showPhone?: boolean;
  /** Phone number for inline CTA */
  phoneNumber?: string;
}

export default function ZipForm({
  coverageType,
  placeholder = "ZIP Code",
  buttonLabel = "Compare Plans",
  className = "",
  variant = "default",
  label,
  showPhone = false,
  phoneNumber = "(888) 335-8996",
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
    trackZipSubmitted({ coverage_type: coverageType, zip_code: zip, page_section: "zip_form" });
    redirectToDemographics(zip, coverageType);
  }

  // ── Hero variant — compact row with optional inline phone ─────────────────

  if (variant === "hero") {
    return (
      <div className={className}>
        {label && (
          <p className="text-sm text-white/70 mb-2.5 font-medium">{label}</p>
        )}
        <div className="flex items-center flex-wrap gap-3">
          <form
            onSubmit={handleSubmit}
            className="inline-flex items-center bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
              autoComplete="off"
              value={zip}
              onChange={(e) => {
                setZip(e.target.value.replace(/\D/g, ""));
                setError("");
              }}
              placeholder={placeholder}
              className="w-[130px] px-4 py-3 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 border-none outline-none bg-transparent"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-1.5 bg-[#0D9488] hover:bg-[#0B7C72] disabled:opacity-60 text-white font-semibold px-5 py-3 text-[15px] transition-colors whitespace-nowrap"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              {buttonLabel}
            </button>
          </form>

          {showPhone && (
            <>
              <span className="text-white/40 text-sm font-medium">or</span>
              <a
                href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                onClick={() => trackPhoneClick({ phone_number: phoneNumber, page_section: "zip_form" })}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {phoneNumber}
              </a>
            </>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
      </div>
    );
  }

  // ── Inline variant — small, for light backgrounds ─────────────────────────

  if (variant === "inline") {
    return (
      <div className={className}>
        {label && (
          <p className="text-sm text-slate-500 mb-2 font-medium">{label}</p>
        )}
        <form onSubmit={handleSubmit} className="inline-flex items-center bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            autoComplete="off"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
            placeholder={placeholder}
            className="w-[120px] px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 border-none outline-none bg-transparent"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 bg-[#0D9488] hover:bg-[#0B7C72] disabled:opacity-60 text-white font-semibold px-4 py-2.5 text-sm transition-colors whitespace-nowrap"
          >
            {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            {buttonLabel}
          </button>
        </form>
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  // ── Default variant — for dark CTA cards ──────────────────────────────────

  return (
    <div className={className}>
      {label && (
        <p className="text-sm text-white/70 mb-2.5 font-medium">{label}</p>
      )}
      <form onSubmit={handleSubmit} className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          autoComplete="off"
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, ""));
            setError("");
          }}
          placeholder={placeholder}
          className="w-[130px] px-4 py-3 text-[15px] font-medium text-white placeholder:text-white/50 border-none outline-none bg-transparent"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-1.5 bg-[#0D9488] hover:bg-[#0B7C72] disabled:opacity-60 text-white font-semibold px-5 py-3 text-[15px] transition-colors whitespace-nowrap"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
          {buttonLabel}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
    </div>
  );
}
