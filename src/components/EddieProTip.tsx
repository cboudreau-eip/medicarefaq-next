/**
 * EddieProTip — Reusable callout component featuring Eddie the Eagle mascot.
 *
 * Usage:
 *   <EddieProTip tip="Your tip text here." />
 *   <EddieProTip tip={<>Text with <strong>bold</strong> and <em>emphasis</em>.</>} />
 *
 * Optional props:
 *   label   — Override the default "Eddie's Pro Tip" badge label
 *   variant — "amber" (default) | "teal" | "navy"
 */

import React from "react";

type Variant = "amber" | "teal" | "navy";

interface EddieProTipProps {
  tip: React.ReactNode;
  label?: string;
  variant?: Variant;
}

const variantStyles: Record<
  Variant,
  {
    wrapper: string;
    badge: string;
    avatar: string;
  }
> = {
  amber: {
    wrapper: "bg-amber-50 border-amber-200",
    badge: "text-amber-700 bg-amber-200",
    avatar: "border-amber-400",
  },
  teal: {
    wrapper: "bg-teal-50 border-teal-200",
    badge: "text-teal-700 bg-teal-200",
    avatar: "border-teal-400",
  },
  navy: {
    wrapper: "bg-blue-50 border-blue-200",
    badge: "text-blue-800 bg-blue-200",
    avatar: "border-blue-700",
  },
};

export default function EddieProTip({
  tip,
  label = "Eddie's Pro Tip",
  variant = "amber",
}: EddieProTipProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`flex items-start gap-4 border rounded-2xl px-5 py-4 shadow-sm my-6 ${styles.wrapper}`}
    >
      {/* Eddie avatar */}
      <div
        className={`flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 shadow bg-white ${styles.avatar}`}
      >
        <img
          src="/eddie_eagle_arms_transparent.png"
          alt="Eddie the Eagle — MedicareFAQ mascot"
          className="w-full h-full object-cover object-top scale-110"
        />
      </div>

      {/* Tip content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles.badge}`}
          >
            💡 {label}
          </span>
        </div>
        <p className="text-sm text-slate-800 leading-relaxed">{tip}</p>
      </div>
    </div>
  );
}
