"use client";
import Link from "next/link";
import CourseLayout from "@/components/CourseLayout";
import EddieProTip from "@/components/EddieProTip";
import { MEDICARE_COSTS } from "@/lib/medicare-costs";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lock,
  Globe,
  DollarSign,
  FileX,
  TrendingUp,
} from "lucide-react";

export default function PageContent() {
  return (
    <CourseLayout currentLesson={5}>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        This is the most important decision you will make about your Medicare coverage. The two paths
        have fundamentally different trade-offs — and switching between them later is not always possible.
      </p>

      {/* The Two Paths */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="p-5 bg-blue-50 border-2 border-blue-200 rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-blue-700" aria-hidden="true" />
            <h3 className="font-bold text-blue-900">Path 1: Original Medicare + Medigap</h3>
          </div>
          <p className="text-sm text-blue-800 mb-3">
            Parts A &amp; B + Medicare Supplement + standalone Part D
          </p>
          <ul className="space-y-1.5 text-sm text-blue-800">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> Maximum freedom</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> Predictable costs</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> Higher monthly premium</li>
          </ul>
        </div>
        <div className="p-5 bg-amber-50 border-2 border-amber-200 rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-amber-700" aria-hidden="true" />
            <h3 className="font-bold text-amber-900">Path 2: Medicare Advantage</h3>
          </div>
          <p className="text-sm text-amber-800 mb-3">
            Part C — private plan that replaces Original Medicare
          </p>
          <ul className="space-y-1.5 text-sm text-amber-800">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" /> Lower monthly premium</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" /> Bundled benefits</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" /> Network restrictions</li>
          </ul>
        </div>
      </div>

      {/* Why Medigap Tends to Be Better */}
      <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
        Why Medigap Tends to Be the Better Long-Term Choice
      </h2>

      <div className="space-y-6 mb-10">
        {[
          {
            icon: Globe,
            title: "No Network Restrictions",
            text: "With Medigap, you can see any doctor or specialist in the country who accepts Medicare. No referrals, no prior authorizations, no surprise out-of-network bills. This matters most when you are sick and need the best specialist.",
          },
          {
            icon: DollarSign,
            title: "Predictable Costs",
            text: `With Plan G, your only out-of-pocket cost is the ${MEDICARE_COSTS.partB.annualDeductible} Part B deductible per year. Everything else is covered. With Advantage, you pay copays at every visit, coinsurance for procedures, and potentially thousands before hitting your out-of-pocket max.`,
          },
          {
            icon: FileX,
            title: "No Claim Denials or Prior Authorizations",
            text: "Medicare Advantage plans can (and do) deny claims and require prior authorization for procedures. Original Medicare with Medigap does not have this issue — if Medicare approves the service, your Supplement pays its share automatically.",
          },
          {
            icon: Globe,
            title: "Portability",
            text: "Medigap works nationwide. If you travel, move, or snowbird between states, your coverage follows you. Advantage plans are typically tied to a service area.",
          },
          {
            icon: TrendingUp,
            title: "Stability as You Age",
            text: "Medigap premiums increase gradually (typically 3-6% per year). The coverage never changes. Advantage plans can change benefits, networks, copays, and even leave your area every year.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-start gap-4">
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-blue-700" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* When Advantage May Make Sense */}
      <div className="mb-10 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
        <h3 className="font-bold text-amber-900 mb-3">When Medicare Advantage May Make Sense</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" /> You are healthy, on a tight budget, and comfortable with network restrictions</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" /> You want dental, vision, and hearing included without separate policies</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" /> You live in an area with strong Advantage plan networks</li>
          <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" /> You understand you can switch back to Original Medicare later — but may not qualify for Medigap without underwriting</li>
        </ul>
      </div>

      {/* The Advantage Trap */}
      <div className="mb-10 p-5 bg-red-50 border-2 border-red-200 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Lock className="w-5 h-5 text-red-700" aria-hidden="true" />
          <h3 className="font-bold text-red-900">The &ldquo;Advantage Trap&rdquo; — What Most People Do Not Realize</h3>
        </div>
        <ul className="space-y-2 text-sm text-red-800">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
            You can switch FROM Medigap TO Advantage at any time during AEP.
          </li>
          <li className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            Switching FROM Advantage BACK TO Original Medicare + Medigap is much harder. After your Medigap OEP, you face medical underwriting.
          </li>
          <li className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            If you have developed health conditions while on Advantage, you may be denied Medigap entirely.
          </li>
        </ul>
        <p className="text-red-900 font-semibold mt-3 text-sm">
          This is a one-way door for many people. Choose carefully.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="mb-10 overflow-x-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
          Side-by-Side Comparison
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="text-left py-3 px-4 font-semibold rounded-tl-xl">Factor</th>
              <th className="text-left py-3 px-4 font-semibold">Medicare Supplement</th>
              <th className="text-left py-3 px-4 font-semibold rounded-tr-xl">Medicare Advantage</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Monthly cost", "$130-250/mo (varies by state/age)", "Often $0 (beyond Part B)"],
              ["Out-of-pocket per year", `~${MEDICARE_COSTS.partB.annualDeductible} (Plan G)`, `Up to ${MEDICARE_COSTS.partC.maxMOOP}`],
              ["Doctor choice", "Any Medicare doctor nationwide", "Plan network only"],
              ["Prior authorization", "None", "Common"],
              ["Claim denials", "Rare", "More common"],
              ["Travel coverage", "Nationwide + some foreign", "Service area only"],
              ["Switching flexibility", "Can always switch to Advantage", "Hard to switch back to Medigap"],
              ["Best for", "Long-term stability, freedom", "Budget-conscious, healthy"],
            ].map((row, i) => (
              <tr key={row[0]} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                <td className="py-3 px-4 font-medium text-slate-800">{row[0]}</td>
                <td className="py-3 px-4 text-slate-600">{row[1]}</td>
                <td className="py-3 px-4 text-slate-600">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Eddie Pro Tip */}
      <EddieProTip
        variant="navy"
        tip={
          <>
            Here is what I tell every client: if you can afford the Medigap premium, it is almost
            always the better long-term decision. I have seen too many people choose a $0 Advantage
            plan at 65 because they felt healthy, then develop cancer or heart disease at 72 and
            realize they are stuck. They cannot get back to Medigap because no carrier will accept
            them. The Medigap premium is not a cost — it is insurance against being trapped in a plan
            that does not serve you when you need it most.
          </>
        }
      />

      {/* FAQ */}
    </CourseLayout>
  );
}
