"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { getAepGuideStatus } from "@/lib/aep-guide-status";

export default function AepGuideTimeline({ year }: { year: number }) {
  const [status, setStatus] = useState<ReturnType<typeof getAepGuideStatus> | null>(null);
  useEffect(() => {
    const update = () => setStatus(getAepGuideStatus(year, new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [year]);
  return (
    <section aria-label="Annual enrollment timeline" className="rounded-xl border border-teal-200 bg-teal-50 p-5 mb-6">
      <div className="flex items-start gap-3">
        <CalendarDays aria-hidden="true" className="h-6 w-6 shrink-0 text-teal-800" />
        <div>
          <h2 className="font-bold text-lg text-[#1B2A4A]">
            {status === "open" ? "AEP is open now" : status === "closed" ? `The ${year} AEP has ended` : `Plan ahead for ${year} AEP`}
          </h2>
          <p className="text-sm text-slate-700 mt-1">
            {status === "closed"
              ? "Missed the deadline? Your next options depend on your coverage and any Special Enrollment Period you qualify for. See the FAQs below."
              : `Review your options by December 7 for coverage starting January 1, ${year + 1}.`}
          </p>
        </div>
      </div>
      <ol className="grid gap-3 sm:grid-cols-3 mt-4 text-sm">
        {[[`October 15, ${year}`, "Enrollment opens"], [`December 7, ${year}`, "Plan must receive your request"], [`January 1, ${year + 1}`, "AEP changes take effect"]].map(([date, label]) => (
          <li key={date} className="rounded-lg bg-white p-3 border border-teal-100">
            <span className="block font-bold text-[#1B2A4A]">{date}</span>
            <span className="text-slate-600">{label}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
