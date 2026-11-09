import Link from "next/link";

export default function OepResourceLinks({ comparison = false }: { comparison?: boolean }) {
  const title = comparison ? "Plan Comparison Worksheet" : "Plan Review Checklist";
  const pdf = comparison
    ? "/medicarefaq-ma-oep-plan-comparison-worksheet.pdf"
    : "/medicarefaq-ma-oep-plan-review-checklist.pdf";

  return (
    <aside aria-label="OEP planning resources" className="my-8 rounded-xl border border-teal-200 bg-teal-50 p-5 md:p-6">
      <h3 className="text-xl font-bold text-[#1B2A4A]">{comparison ? "Put your plan comparison on paper" : "Organize your next steps"}</h3>
      <p className="mt-2 text-slate-700">{comparison
        ? "Use the worksheet to compare your current plan with two alternatives and keep track of unanswered questions."
        : "Use the checklist to organize your coverage review and record what you need to verify before making a change."}</p>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-teal-800">
        <a href={pdf} className="underline underline-offset-4">Open {title} (PDF)</a>
        <a href={`${pdf}?download=1`} className="underline underline-offset-4">Download {title}</a>
      </div>
      <p className="mt-4"><Link href="/medicare-advantage-open-enrollment-resources/" className="font-semibold text-teal-800 underline underline-offset-4">Explore the OEP Resource Center and all worksheets →</Link></p>
    </aside>
  );
}
