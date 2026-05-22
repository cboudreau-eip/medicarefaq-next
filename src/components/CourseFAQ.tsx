"use client";
/**
 * CourseFAQ — Accordion FAQ section for Medicare 101 Course lesson pages.
 */
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface CourseFAQProps {
  faqs: FAQItem[];
}

export default function CourseFAQ({ faqs }: CourseFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-12 mb-8">
      <h2
        className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
        <HelpCircle className="w-6 h-6 text-blue-600" />
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-slate-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-800 text-sm md:text-base">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100 pt-3">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
