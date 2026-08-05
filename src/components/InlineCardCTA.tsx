"use client";

import { ArrowRight } from "lucide-react";


/**
 * InlineCardCTA — Navy card with teal left border and red CTA button.
 * Links to demographics.medicarecompared.com/ms/ (external lead gen form).
 *
 * Props:
 *   heading   — Override the default heading text
 *   pageSection — Analytics identifier for the page section
 */
interface InlineCardCTAProps {
  heading?: string;
  pageSection?: string;
}

export default function InlineCardCTA({
  heading = "Find the Right Medicare Plan for Your Area",
  pageSection = "inline_card_cta",
}: InlineCardCTAProps) {
  return (
    <a
      href="https://demographics.medicarecompared.com/ms/"
      id={`inline-cta-${pageSection}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#1B2A4A] border-l-4 border-[#0D9488] rounded-xl px-6 py-6 my-8 shadow-sm cursor-pointer transition-all duration-150 hover:bg-[#243558] hover:shadow-md group"
    >
      <h3 className="text-[28px] md:text-[32px] font-bold text-white leading-tight mb-4">
        {heading}
      </h3>
      <span className="inline-flex items-center gap-2 bg-[#C41230] group-hover:bg-[#A30F28] text-white font-bold px-6 py-3.5 rounded-lg transition-all duration-150 shadow-lg shadow-red-900/20 text-[15px]">
        Get My Plan Recommendations
        <ArrowRight className="w-4 h-4" />
      </span>
    </a>
  );
}
