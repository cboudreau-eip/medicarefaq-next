"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Phone,
  Shield,
  Star,
  Stethoscope,
  Pill,
  Smile,
  User,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { trackCtaClick } from "@/lib/analytics";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/medicarefaq-logo-updated_eca101e5.png";

const PHONE_NUMBER = "(888) 335-8996";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  zip: string;
  city: string;
  state: string;
  hasMedicare: string;
  coverageType: string;
  dentalImportance: string;
  drugImportance: string;
  doctorImportance: string;
  name: string;
  phone: string;
}

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// ─── Component ───────────────────────────────────────────────────────────────
export default function LeadGenForm() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    zip: "",
    city: "",
    state: "",
    hasMedicare: "",
    coverageType: "",
    dentalImportance: "",
    drugImportance: "",
    doctorImportance: "",
    name: "",
    phone: "",
  });
  const [zipStatus, setZipStatus] = useState<"idle" | "validating" | "valid" | "invalid">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 7;

  // Focus input when step changes
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [step]);

  // ─── ZIP Validation ──────────────────────────────────────────────────────
  const validateZip = useCallback(async (zip: string) => {
    if (zip.length !== 5) {
      setZipStatus("idle");
      return;
    }
    setZipStatus("validating");
    try {
      const res = await fetch(`/api/validate-zip?zip=${zip}`);
      const data = await res.json();
      if (data.valid) {
        setZipStatus("valid");
        setFormData((prev) => ({ ...prev, city: data.city, state: data.state }));
      } else {
        setZipStatus("invalid");
      }
    } catch {
      setZipStatus("invalid");
    }
  }, []);

  const handleZipChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 5);
    setFormData((prev) => ({ ...prev, zip: cleaned }));
    setError("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (cleaned.length === 5) {
      debounceRef.current = setTimeout(() => validateZip(cleaned), 300);
    } else {
      setZipStatus("idle");
    }
  };

  // ─── Navigation ──────────────────────────────────────────────────────────
  const goNext = () => {
    if (step < totalSteps) setStep((step + 1) as Step);
  };

  const goBack = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  const skipStep = () => {
    goNext();
  };

  // ─── Submit ──────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/lead-gen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      trackCtaClick({
        button_label: "lead_form_submitted",
        destination: "thank_you",
        page_section: "find_plans_form",
      });
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Thank You Page ──────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[#1B2A4A]/5 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center"
          >
            <div className="w-16 h-16 bg-[#0D9488]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#0D9488]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Thank You!
            </h1>
            <p className="text-slate-600 text-lg mb-6">
              A licensed Medicare agent will reach out to you shortly to discuss
              plans available in{" "}
              {formData.city && formData.state
                ? `${formData.city}, ${formData.state}`
                : "your area"}
              .
            </p>
            <div className="bg-slate-50 rounded-xl p-5 mb-6">
              <p className="text-sm text-slate-500 mb-2">
                Need help sooner? Call us directly:
              </p>
              <a
                href="tel:+18883358996"
                data-invoca-phone-number="18883358996"
                className="invoca-phone inline-flex items-center gap-2 text-xl font-bold text-[#1B2A4A] hover:text-[#0D9488] transition-colors"
              >
                <Phone className="w-5 h-5" />
                {PHONE_NUMBER}
              </a>
              <p className="text-xs text-slate-400 mt-1">Mon–Fri 9am–7pm ET</p>
            </div>
            <Link
              href="/"
              className="text-[#0D9488] hover:text-[#0B7C72] font-medium text-sm"
            >
              ← Return to MedicareFAQ
            </Link>
          </motion.div>
        </div>
        <TrustFooter />
      </div>
    );
  }

  // ─── Form Steps ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[#1B2A4A]/5 flex flex-col">
      <Header />

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto px-6 pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">
            Step {step} of {totalSteps}
          </span>
        </div>
        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#0D9488] rounded-full"
            initial={false}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <StepCard
                  icon={<MapPin className="w-6 h-6 text-[#0D9488]" />}
                  title="What's your ZIP code?"
                  subtitle="We'll find Medicare plans available in your area."
                >
                  <div className="space-y-4">
                    <div
                      className={`flex items-center border-2 rounded-xl overflow-hidden transition-colors ${
                        zipStatus === "invalid"
                          ? "border-red-300"
                          : zipStatus === "valid"
                          ? "border-[#0D9488]"
                          : "border-slate-200 focus-within:border-[#0D9488]"
                      }`}
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]{5}"
                        maxLength={5}
                        value={formData.zip}
                        onChange={(e) => handleZipChange(e.target.value)}
                        placeholder="Enter ZIP code"
                        className="flex-1 px-5 py-4 text-lg font-medium text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
                        autoComplete="postal-code"
                      />
                      {zipStatus === "validating" && (
                        <Loader2 className="w-5 h-5 text-slate-400 animate-spin mr-4" />
                      )}
                      {zipStatus === "valid" && (
                        <CheckCircle2 className="w-5 h-5 text-[#0D9488] mr-4" />
                      )}
                    </div>
                    {zipStatus === "valid" && formData.city && (
                      <p className="text-sm text-[#0D9488] font-medium flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {formData.city}, {formData.state}
                      </p>
                    )}
                    {zipStatus === "invalid" && (
                      <p className="text-sm text-red-500 font-medium">
                        Please enter a valid 5-digit ZIP code.
                      </p>
                    )}
                    <button
                      onClick={goNext}
                      disabled={zipStatus !== "valid"}
                      className="w-full flex items-center justify-center gap-2 bg-[#1B2A4A] hover:bg-[#0F1C35] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-xl transition-colors text-base">
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </StepCard>
              )}

              {step === 2 && (
                <StepCard
                  icon={<Shield className="w-6 h-6 text-[#0D9488]" />}
                  title="Do you currently have Medicare?"
                  subtitle="This helps us understand where you are in your Medicare journey."
                >
                  <div className="space-y-3">
                    <OptionButton
                      label="Yes, I have Medicare"
                      selected={formData.hasMedicare === "yes"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, hasMedicare: "yes" }));
                        goNext();
                      }}
                    />
                    <OptionButton
                      label="No, I'm new to Medicare"
                      selected={formData.hasMedicare === "no"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, hasMedicare: "no" }));
                        goNext();
                      }}
                    />
                    <OptionButton
                      label="I'm not sure"
                      selected={formData.hasMedicare === "unsure"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, hasMedicare: "unsure" }));
                        goNext();
                      }}
                    />
                  </div>
                  <NavRow onBack={goBack} />
                </StepCard>
              )}

              {step === 3 && (
                <StepCard
                  icon={<Stethoscope className="w-6 h-6 text-[#0D9488]" />}
                  title="What type of coverage interests you?"
                  subtitle="Select the option that best fits your needs."
                >
                  <div className="space-y-3">
                    <OptionButton
                      label="Medicare Advantage (Part C)"
                      sublabel="All-in-one plans with extra benefits"
                      selected={formData.coverageType === "ma"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, coverageType: "ma" }));
                        goNext();
                      }}
                    />
                    <OptionButton
                      label="Medicare Supplement (Medigap)"
                      sublabel="Fill the gaps in Original Medicare"
                      selected={formData.coverageType === "ms"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, coverageType: "ms" }));
                        goNext();
                      }}
                    />
                    <OptionButton
                      label="Prescription Drug Plan (Part D)"
                      sublabel="Standalone drug coverage"
                      selected={formData.coverageType === "pdp"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, coverageType: "pdp" }));
                        goNext();
                      }}
                    />
                    <OptionButton
                      label="I'm not sure yet"
                      sublabel="Help me figure it out"
                      selected={formData.coverageType === "unsure"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, coverageType: "unsure" }));
                        goNext();
                      }}
                    />
                  </div>
                  <NavRow onBack={goBack} />
                </StepCard>
              )}

              {step === 4 && (
                <StepCard
                  icon={<Smile className="w-6 h-6 text-[#0D9488]" />}
                  title="How important is dental coverage?"
                  subtitle="Some plans include dental, vision, and hearing benefits."
                >
                  <div className="space-y-3">
                    <OptionButton
                      label="Very Important"
                      selected={formData.dentalImportance === "very"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, dentalImportance: "very" }));
                        goNext();
                      }}
                    />
                    <OptionButton
                      label="Somewhat Important"
                      selected={formData.dentalImportance === "somewhat"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, dentalImportance: "somewhat" }));
                        goNext();
                      }}
                    />
                    <OptionButton
                      label="Not Important"
                      selected={formData.dentalImportance === "not"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, dentalImportance: "not" }));
                        goNext();
                      }}
                    />
                  </div>
                  <NavRow onBack={goBack} onSkip={skipStep} />
                </StepCard>
              )}

              {step === 5 && (
                <StepCard
                  icon={<Pill className="w-6 h-6 text-[#0D9488]" />}
                  title="How important is prescription drug coverage?"
                  subtitle="This helps us find plans that cover your medications."
                >
                  <div className="space-y-3">
                    <OptionButton
                      label="Very Important"
                      selected={formData.drugImportance === "very"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, drugImportance: "very" }));
                        goNext();
                      }}
                    />
                    <OptionButton
                      label="Somewhat Important"
                      selected={formData.drugImportance === "somewhat"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, drugImportance: "somewhat" }));
                        goNext();
                      }}
                    />
                    <OptionButton
                      label="Not Important"
                      selected={formData.drugImportance === "not"}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, drugImportance: "not" }));
                        goNext();
                      }}
                    />
                  </div>
                  <NavRow onBack={goBack} onSkip={skipStep} />
                </StepCard>
              )}

              {step === 6 && (
                <StepCard
                  icon={<User className="w-6 h-6 text-[#0D9488]" />}
                  title="What's your name?"
                  subtitle="This helps us personalize your Medicare experience."
                >
                  <div className="space-y-4">
                    <input
                      ref={inputRef}
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Enter your name"
                      className="w-full border-2 border-slate-200 focus:border-[#0D9488] rounded-xl px-5 py-4 text-lg font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
                      autoComplete="name"
                    />
                    <button
                      onClick={goNext}
                      disabled={!formData.name.trim()}
                      className="w-full flex items-center justify-center gap-2 bg-[#1B2A4A] hover:bg-[#0F1C35] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-xl transition-colors text-base"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <NavRow onBack={goBack} onSkip={skipStep} />
                </StepCard>
              )}

              {step === 7 && (
                <StepCard
                  icon={<Phone className="w-6 h-6 text-[#0D9488]" />}
                  title="What's the best number to reach you?"
                  subtitle="A licensed agent will call to review your plan options. No spam, no obligation."
                >
                  <div className="space-y-4">
                    <input
                      ref={inputRef}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^\d()-\s]/g, "").slice(0, 14);
                        setFormData((prev) => ({ ...prev, phone: val }));
                        setError("");
                      }}
                      placeholder="(555) 123-4567"
                      className="w-full border-2 border-slate-200 focus:border-[#0D9488] rounded-xl px-5 py-4 text-lg font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
                      autoComplete="tel"
                    />
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Lock className="w-3.5 h-3.5 text-[#0D9488]" />
                      <span>We never share or sell your information.</span>
                    </div>
                    {error && (
                      <p className="text-sm text-red-500 font-medium">{error}</p>
                    )}
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.phone.replace(/\D/g, "").match(/^\d{10}$/) || submitting}
                      className="w-full flex items-center justify-center gap-2 bg-[#C41230] hover:bg-[#A30F28] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-xl transition-colors text-base shadow-lg shadow-red-500/20"
                    >
                      {submitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Get My Plan Recommendations
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-slate-400 leading-relaxed mt-3">
                      By submitting, you agree to be contacted by a licensed insurance
                      agent by phone or text. Standard message and data rates may apply.
                      You can opt out at any time.
                    </p>
                  </div>
                  <NavRow onBack={goBack} />
                </StepCard>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <TrustFooter />
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
      <Link href="/" className="flex items-center">
        <img src={LOGO_URL} alt="MedicareFAQ" className="h-8 md:h-10" />
      </Link>
      <a
        href="tel:+18883358996"
        data-invoca-phone-number="18883358996"
        className="invoca-phone inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#1B2A4A] transition-colors">
        <Phone className="w-4 h-4 text-[#0D9488]" />
        <span className="hidden sm:inline">{PHONE_NUMBER}</span>
        <span className="sm:hidden">Call Us</span>
      </a>
    </header>
  );
}

function TrustFooter() {
  return (
    <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-center gap-5 text-xs text-slate-500">
      <span className="flex items-center gap-1.5">
        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
        BBB A+ Rated
      </span>
      <span className="w-1 h-1 rounded-full bg-slate-300" />
      <span className="flex items-center gap-1.5">
        <Shield className="w-3 h-3 text-[#0D9488]" />
        Licensed in All 50 States
      </span>
      <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
      <span className="hidden sm:flex items-center gap-1.5">
        <Lock className="w-3 h-3 text-slate-400" />
        Your info is secure
      </span>
    </div>
  );
}

function StepCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      <p className="text-slate-500 text-sm md:text-base mb-6 ml-9">{subtitle}</p>
      {children}
    </div>
  );
}

function OptionButton({
  label,
  sublabel,
  selected,
  onClick,
}: {
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 ${
        selected
          ? "border-[#1B2A4A] bg-[#1B2A4A] text-white shadow-sm"
          : "border-[#1B2A4A] bg-[#1B2A4A] text-white hover:bg-[#0F1C35]"
      }`}
    >
      <span className="font-semibold text-base">{label}</span>
      {sublabel && (
        <span className="block text-sm text-white/70 mt-0.5">{sublabel}</span>
      )}
    </button>
  );
}

function NavRow({
  onBack,
  onSkip,
}: {
  onBack?: () => void;
  onSkip?: () => void;
}) {
  return (
    <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
      {onBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
      ) : (
        <div />
      )}
      {onSkip && (
        <button
          onClick={onSkip}
          className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
        >
          Skip →
        </button>
      )}
    </div>
  );
}
