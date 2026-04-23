"use client";

/**
 * ZipFormModal — Modal popup for ZIP code entry that redirects to demographics app.
 *
 * Usage (ReactNode trigger):
 *   <ZipFormModal
 *     coverageType="ms"
 *     trigger={<button className="...">Compare Plans</button>}
 *   />
 *
 * Usage (convenience props — renders a <button> automatically):
 *   <ZipFormModal
 *     coverageType="ms"
 *     triggerLabel="Compare Plans"
 *     triggerClassName="inline-flex items-center gap-2 bg-teal-500 text-white ..."
 *   />
 *
 * Analytics: fires zip_modal_open on trigger click and zip_submitted on form submit.
 */

import {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Loader2, Phone, X, Shield, Star } from "lucide-react";
import {
  redirectToDemographics,
  type CoverageType,
} from "@/lib/demographics-redirect";
import {
  trackZipModalOpen,
  trackZipSubmitted,
  trackPhoneClick,
} from "@/lib/analytics";

interface ZipFormModalProps {
  /** Coverage type: 'ma' | 'ms' | 'pdp' | 'me' | 'fe' */
  coverageType: CoverageType;
  /**
   * ReactNode trigger element. Clicking it opens the modal.
   * Use either `trigger` OR `triggerLabel`+`triggerClassName` — not both.
   */
  trigger?: ReactNode;
  /**
   * Convenience: label text for an auto-rendered <button> trigger.
   * Requires `triggerClassName` to style it.
   */
  triggerLabel?: string;
  /**
   * Convenience: className string for the auto-rendered <button> trigger.
   */
  triggerClassName?: string;
  /**
   * Optional id attribute for the auto-rendered <button> trigger (e.g. "get-started-nav").
   * Useful for GTM click tracking.
   */
  triggerId?: string;
  /** Modal headline */
  title?: string;
  /** Modal subtitle / context line */
  subtitle?: string;
  /** Button label inside the modal */
  buttonLabel?: string;
  /** Phone number for the "or call" CTA */
  phoneNumber?: string;
  /**
   * Optional page section identifier for analytics (e.g. "hero", "cta_banner", "sidebar").
   * Passed as `page_section` in all dataLayer events fired by this component.
   */
  pageSection?: string;
}

export default function ZipFormModal({
  coverageType,
  trigger,
  triggerLabel,
  triggerClassName,
  triggerId,
  title = "Compare Medicare Plans",
  subtitle = "Enter your ZIP code to see rates from top carriers in your area — free, no obligation.",
  buttonLabel = "Compare Plans",
  phoneNumber = "(888) 335-8996",
  pageSection,
}: ZipFormModalProps) {
  const [open, setOpen] = useState(false);
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Derive the label to use in analytics from whichever trigger variant is used
  const resolvedTriggerLabel = triggerLabel ?? (typeof trigger === "string" ? trigger : "");

  // Focus the input when modal opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  function handleOpen() {
    setOpen(true);
    trackZipModalOpen({
      coverage_type: coverageType,
      button_label: resolvedTriggerLabel,
      page_section: pageSection,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }
    setError("");
    setSubmitting(true);
    trackZipSubmitted({
      coverage_type: coverageType,
      zip_code: zip,
      page_section: pageSection,
    });
    redirectToDemographics(zip, coverageType);
  }

  function handleClose() {
    setOpen(false);
    setZip("");
    setError("");
    setSubmitting(false);
  }

  // Build the rendered trigger element
  const triggerElement =
    trigger != null ? (
      trigger
    ) : (
      <button type="button" id={triggerId} className={triggerClassName ?? ""}>
        {triggerLabel}
      </button>
    );

  return (
    <>
      {/* Trigger — wraps the provided element */}
      <span onClick={handleOpen} className="cursor-pointer">
        {triggerElement}
      </span>

      {/* Modal overlay + dialog — rendered via portal to escape stacking contexts */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Dialog */}
            <div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
              role="dialog"
              aria-modal="true"
              aria-labelledby="zip-modal-title"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#0D9488] via-[#3B82F6] to-[#0D9488]" />

              {/* Content */}
              <div className="px-8 pt-8 pb-6">
                {/* Icon */}
                <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mb-5">
                  <Shield className="w-6 h-6 text-[#0D9488]" />
                </div>

                <h2
                  id="zip-modal-title"
                  className="text-2xl font-bold text-slate-900 mb-2"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  {title}
                </h2>
                <p className="text-slate-500 text-[15px] leading-relaxed mb-6">
                  {subtitle}
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mb-5">
                  <div className="flex items-center rounded-xl border-2 border-slate-200 focus-within:border-[#0D9488] transition-colors overflow-hidden">
                    <input
                      ref={inputRef}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{5}"
                      maxLength={5}
                      autoComplete="one-time-code"
                      data-lpignore="true"
                      data-1p-ignore="true"
                      value={zip}
                      onChange={(e) => {
                        setZip(e.target.value.replace(/\D/g, ""));
                        setError("");
                      }}
                      placeholder="ZIP Code"
                      className="flex-1 px-4 py-3.5 text-base font-medium text-slate-900 placeholder:text-slate-400 border-none outline-none bg-transparent"
                      required
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] disabled:opacity-60 text-white font-semibold px-4 py-3.5 text-[14px] transition-colors whitespace-nowrap mr-1 rounded-lg"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                      {buttonLabel}
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-500 font-medium">
                      {error}
                    </p>
                  )}
                </form>

                {/* Divider with "or" */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    or
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Phone CTA */}
                <a
                  href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                  onClick={() =>
                    trackPhoneClick({
                      phone_number: phoneNumber,
                      page_section: "zip_modal",
                    })
                  }
                  className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors font-semibold text-[15px]"
                >
                  <Phone className="w-4 h-4 text-[#0D9488]" />
                  Call {phoneNumber}
                </a>
              </div>

              {/* Trust footer */}
              <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-5 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  BBB A+ Rated
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-[#0D9488]" />
                  Licensed in All 50 States
                </span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
