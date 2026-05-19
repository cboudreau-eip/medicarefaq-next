import SiteLayout from "@/components/SiteLayout";

export const metadata = {
  title: "Speed Test Page | MedicareFAQ",
  description: "A minimal test page used for PageSpeed Insights benchmarking.",
  robots: "noindex, nofollow",
};

export default function TestSpeedPage() {
  return (
    <SiteLayout>
    <div className="max-w-3xl mx-auto px-4 py-16">

      <section className="mb-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">What Is Medicare?</h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          Medicare is the federal health insurance program for people who are 65 or older, certain younger people with disabilities, and people with End-Stage Renal Disease. The program is divided into four parts, each covering different aspects of your healthcare needs.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          Part A covers inpatient hospital stays, care in a skilled nursing facility, hospice care, and some home health care. Most people do not pay a premium for Part A because they or their spouse paid Medicare taxes while working.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Part B covers certain doctors' services, outpatient care, medical supplies, and preventive services. The standard monthly premium for Part B in 2026 is $202.90, with an annual deductible of $283.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Is Eligible for Medicare?</h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          You are eligible for Medicare if you are 65 or older and a U.S. citizen or permanent legal resident who has lived in the United States for at least five continuous years. You may also qualify if you are under 65 and have received Social Security Disability Insurance benefits for 24 months.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          People of any age with End-Stage Renal Disease — permanent kidney failure requiring dialysis or a transplant — are also eligible. Similarly, people diagnosed with ALS (Lou Gehrig's disease) qualify for Medicare immediately upon receiving disability benefits, with no waiting period.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          If you are already receiving Social Security retirement benefits when you turn 65, you will be automatically enrolled in Medicare Parts A and B. Your Medicare card will arrive in the mail about three months before your 65th birthday.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">When Should You Enroll?</h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          Your Initial Enrollment Period is a seven-month window that begins three months before the month you turn 65, includes your birthday month, and ends three months after. Enrolling during the first three months of this window ensures your coverage starts on the first day of your birthday month.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          If you miss your Initial Enrollment Period and do not have other qualifying coverage, you will need to wait for the General Enrollment Period, which runs from January 1 through March 31 each year, with coverage starting July 1. You may also face a late enrollment penalty that permanently increases your Part B premium by 10 percent for each 12-month period you were eligible but did not enroll.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          If you are still working at 65 and covered by an employer group health plan through a company with 20 or more employees, you may delay Medicare enrollment without penalty. You will have a Special Enrollment Period of eight months after you stop working or lose that coverage.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">What Are Your Coverage Options?</h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          Once enrolled in Medicare, you have two main paths for receiving your benefits. Original Medicare — Parts A and B — allows you to see any doctor or hospital that accepts Medicare anywhere in the country. You pay a deductible and 20 percent of most covered services, with no annual out-of-pocket maximum unless you add a Medicare Supplement plan.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          Medicare Advantage, also called Part C, is an alternative offered by private insurers approved by Medicare. These plans bundle Part A, Part B, and usually Part D drug coverage into a single plan. Many have $0 premiums and include extra benefits like dental, vision, and hearing, but they typically require you to use a network of providers.
        </p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Medicare Supplement plans, also called Medigap, work alongside Original Medicare to cover costs like deductibles, copayments, and coinsurance. They are sold by private insurers and can significantly reduce your out-of-pocket exposure. You cannot have both a Medicare Supplement plan and a Medicare Advantage plan at the same time.
        </p>
      </section>

    </div>
    </SiteLayout>
  );
}
