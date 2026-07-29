"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDown, Calendar, Shield, Clock, Loader2, CheckCircle2 } from "lucide-react";

export default function DecisionKitPage() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = month && day && year && year.length === 4 && isEmailValid;

  const handleGenerate = async () => {
    if (!isFormValid) return;
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/decision-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: parseInt(month),
          day: parseInt(day),
          year: parseInt(year),
          firstName: firstName || undefined,
          email,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate");

      const data = await response.json();

      // Convert base64 to blob and trigger download
      const byteCharacters = atob(data.pdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setGenerated(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Calculate preview dates for display
  const previewDates = isFormValid
    ? (() => {
        const dob = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const birthday65 = new Date(dob.getFullYear() + 65, dob.getMonth(), dob.getDate());
        const bornOnFirst = dob.getDate() === 1;
        const eligibilityMonth = bornOnFirst
          ? new Date(birthday65.getFullYear(), birthday65.getMonth() - 1, 1)
          : new Date(birthday65.getFullYear(), birthday65.getMonth(), 1);
        const iepStart = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth() - 3, 1);
        const iepEnd = new Date(eligibilityMonth.getFullYear(), eligibilityMonth.getMonth() + 3 + 1, 0);
        return {
          birthday65: birthday65.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          iepStart: iepStart.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          iepEnd: iepEnd.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        };
      })()
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-[#1b2a4a] text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-teal-300" />
            <span className="text-sm font-medium text-teal-200">Free Personalized Tool</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your Turning 65 Medicare Decision Kit
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Enter your birthday and get a personalized PDF with your exact enrollment dates, key
            deadlines, coverage comparison, and action checklist.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-xl shadow-xl border-0 overflow-hidden">
          <div className="p-6 pb-4 border-b border-slate-100">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-900">
              <Calendar className="w-5 h-5 text-teal-600" />
              Enter your date of birth
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              We calculate your IEP window, Medigap open enrollment, and all critical deadlines from
              this date.
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    First Name <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-11 px-3 rounded-md border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full h-11 px-3 rounded-md border text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      email && !isEmailValid ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                  {email && !isEmailValid && (
                    <p className="text-xs text-red-500 mt-1">Please enter a valid email address.</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Date of Birth
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="MM"
                        value={month}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                          setMonth(v);
                        }}
                        className="w-full h-11 px-3 rounded-md border border-slate-300 text-center text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        maxLength={2}
                      />
                      <span className="text-xs text-slate-400 mt-1 block text-center">Month</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="DD"
                        value={day}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                          setDay(v);
                        }}
                        className="w-full h-11 px-3 rounded-md border border-slate-300 text-center text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        maxLength={2}
                      />
                      <span className="text-xs text-slate-400 mt-1 block text-center">Day</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="YYYY"
                        value={year}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                          setYear(v);
                        }}
                        className="w-full h-11 px-3 rounded-md border border-slate-300 text-center text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        maxLength={4}
                      />
                      <span className="text-xs text-slate-400 mt-1 block text-center">Year</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!isFormValid || loading}
                  className="w-full h-12 bg-[#c41230] hover:bg-[#a30f28] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-base rounded-md flex items-center justify-center gap-2 transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating your kit...
                    </>
                  ) : generated ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Download Again
                    </>
                  ) : (
                    <>
                      <FileDown className="w-5 h-5" />
                      Generate My Decision Kit (PDF)
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-sm text-red-600 mt-2">
                    Something went wrong. Please check your date and try again.
                  </p>
                )}
              </div>

              {/* Right: Preview */}
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  What&apos;s in your kit
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-teal-700">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        Personalized Enrollment Timeline
                      </p>
                      <p className="text-xs text-slate-500">
                        Your exact IEP dates and action steps by month
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-amber-700">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        Key Dates Reference Sheet
                      </p>
                      <p className="text-xs text-slate-500">
                        IEP, Medigap OE, AEP, and penalty deadlines
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-700">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        Coverage Comparison Chart
                      </p>
                      <p className="text-xs text-slate-500">
                        Original Medicare + Medigap vs. Medicare Advantage
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-red-700">4</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        7 Expensive Mistakes Checklist
                      </p>
                      <p className="text-xs text-slate-500">
                        Common errors and how to avoid them
                      </p>
                    </div>
                  </li>
                </ul>

                {/* Live preview of dates */}
                {previewDates && (
                  <div className="mt-5 pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Your dates preview
                    </h4>
                    <div className="space-y-1.5">
                      <p className="text-sm text-slate-700">
                        <span className="font-medium">65th birthday:</span>{" "}
                        {previewDates.birthday65}
                      </p>
                      <p className="text-sm text-slate-700">
                        <span className="font-medium">IEP window:</span>{" "}
                        {previewDates.iepStart} – {previewDates.iepEnd}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 pb-12 text-center">
          <p className="text-sm text-slate-500">
            Your information is never stored or shared. This tool runs entirely on our secure server
            and generates a fresh PDF each time.
          </p>
          <div className="mt-6">
            <Link href="/new-to-medicare/eligibility/" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
              ← Back to Medicare Eligibility Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
