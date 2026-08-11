"use client";
import MedicareAdvantagePageContent from "../MedicareAdvantagePageContent";
import type { MedicareAdvantageSubPage } from "@/lib/medicare-advantage-sub-data";

/**
 * Types of Medicare Plans Explained - Pillar Page
 * Uses the shared MedicareAdvantagePageContent template for consistent layout
 * /medicare-part-c/medicare-advantage-plan-types/
 */

const pageData: MedicareAdvantageSubPage = {
  slug: "medicare-advantage-plan-types",
  title: "Types of Medicare Plans Explained",
  subtitle: "MEDICARE PLAN TYPES",
  heroDescription:
    "Understand every Medicare plan type available in 2026 - Original Medicare, Medicare Advantage, Medigap, and Part D - so you can choose the right combination for your health needs and budget.",
  sections: [
    {
      id: "comparison",
      heading: "Medicare Plan Types: Side-by-Side Comparison",
      body: `<p>The table below compares all four Medicare plan types across the features that matter most: coverage scope, monthly costs, out-of-pocket maximums, network rules, and who each plan type serves best.</p>
<table>
<thead><tr><th>Feature</th><th>Original Medicare (A + B)</th><th>Medicare Advantage (Part C)</th><th>Medigap (Supplement)</th><th>Part D (Drug)</th></tr></thead>
<tbody>
<tr><td>What It Covers</td><td>Hospital (A) + Medical (B)</td><td>All of A + B, often drugs + extras</td><td>Fills gaps in Original Medicare costs</td><td>Prescription drugs only</td></tr>
<tr><td>Monthly Premium</td><td>$202.90 (Part B, 2026)</td><td>Often $0 beyond Part B</td><td>$30-$300+ depending on plan/age</td><td>Avg. $34.50 (2026)</td></tr>
<tr><td>Out-of-Pocket Max</td><td>No cap without Medigap</td><td>$9,250 in-network (2026)</td><td>Most plans cover 100% after deductible</td><td>$2,100 (2026)</td></tr>
<tr><td>Network Rules</td><td>Any doctor accepting Medicare</td><td>HMO/PPO network required</td><td>Works with any Medicare provider</td><td>Plan formulary applies</td></tr>
<tr><td>Referrals Needed</td><td>No</td><td>Yes (HMO) / No (PPO)</td><td>No</td><td>No</td></tr>
<tr><td>Drug Coverage</td><td>Not included</td><td>Usually included (MAPD)</td><td>Not included</td><td>Yes - standalone or bundled</td></tr>
<tr><td>Best For</td><td>Flexibility + Medigap pairing</td><td>All-in-one + low premiums</td><td>Predictable costs + travel</td><td>Anyone on Original Medicare</td></tr>
</tbody>
</table>`,
    },
    {
      id: "original-medicare",
      heading: "Original Medicare (Parts A and B)",
      body: `<p>Original Medicare is the federal health insurance program administered directly by the government. It consists of two parts that work together to cover most medical services.</p>
<p><strong>Part A - Hospital Insurance:</strong> Covers inpatient hospital stays, skilled nursing facility care, hospice, and some home health services. Premium-free for most people with 40+ work credits. The 2026 deductible is $1,736 per benefit period. <a href="/faqs/what-does-medicare-part-a-cover/">Learn what Part A covers</a>.</p>
<p><strong>Part B - Medical Insurance:</strong> Covers doctor visits, outpatient care, preventive services, durable medical equipment, and lab tests. The 2026 premium is $202.90/month with a $283 annual deductible. <a href="/faqs/what-does-medicare-part-b-cover/">Learn what Part B covers</a>.</p>
<p><strong>Important:</strong> Original Medicare has no annual out-of-pocket maximum. Without supplemental coverage (Medigap), your 20% coinsurance on Part B services is unlimited. This is why most beneficiaries pair Original Medicare with a <a href="/faqs/what-is-a-medicare-supplement-plan-and-who-needs-one/">Medigap policy</a> or choose Medicare Advantage instead.</p>`,
    },
    {
      id: "medicare-advantage",
      heading: "Medicare Advantage Plans (Part C)",
      body: `<p><a href="/faqs/what-is-medicare-advantage/">Medicare Advantage</a> plans are offered by private insurance companies approved by Medicare. They provide all Part A and Part B benefits through a managed care network, and most plans bundle prescription drug coverage (MAPD) along with extra benefits like dental, vision, hearing, and fitness programs.</p>
<p><strong>Key features of Medicare Advantage:</strong></p>
<ul>
<li>Annual out-of-pocket maximum of $9,250 for in-network services (2026)</li>
<li>Often $0 additional monthly premium beyond Part B</li>
<li>Extra benefits not covered by Original Medicare (dental, vision, hearing)</li>
<li>Network restrictions - must use plan providers (HMO) or pay more (PPO)</li>
<li>Prior authorization required for many services</li>
</ul>
<p>You must continue paying your Part B premium ($202.90/month in 2026) in addition to any Medicare Advantage plan premium. Learn more about the <a href="/medicare-part-c/medicare-advantage-costs">full cost breakdown</a> and how it compares to <a href="/medicare-part-c/medicare-advantage-vs-original-medicare">Original Medicare</a>.</p>`,
    },
    {
      id: "ma-plan-types",
      heading: "Medicare Advantage Plan Types: HMO, PPO, PFFS, and SNP",
      body: `<p>Within Medicare Advantage, there are four main plan structures. Each uses a different approach to provider networks, referrals, and cost-sharing.</p>
<table>
<thead><tr><th>Plan Type</th><th>Network</th><th>Referrals</th><th>Out-of-Network</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><a href="/medicare-part-c/medicare-advantage-plan-hmo">HMO</a></td><td>Must use network</td><td>Yes (usually)</td><td>Emergency only</td><td>Lower costs, local care</td></tr>
<tr><td><a href="/medicare-part-c/medicare-advantage-plan-ppo">PPO</a></td><td>Preferred network</td><td>No</td><td>Yes (higher cost)</td><td>Flexibility, travelers</td></tr>
<tr><td><a href="/medicare-part-c/medicare-advantage-plan-pffs">PFFS</a></td><td>No fixed network</td><td>No</td><td>If provider accepts</td><td>Rural areas</td></tr>
<tr><td><a href="/medicare-part-c/medicare-advantage-plan-snp">SNP</a></td><td>Must use network</td><td>Yes (usually)</td><td>Emergency only</td><td>Chronic conditions, dual eligible</td></tr>
</tbody>
</table>
<p><strong>HMO (Health Maintenance Organization):</strong> Lower costs with a defined network. Requires a primary care physician and referrals for specialists. Out-of-network care is not covered except in emergencies. <a href="/medicare-part-c/medicare-advantage-plan-hmo">Learn more about HMO plans</a>.</p>
<p><strong>PPO (Preferred Provider Organization):</strong> More flexibility to see any Medicare-accepting provider without referrals. In-network care costs less, but out-of-network care is still partially covered. <a href="/medicare-part-c/medicare-advantage-plan-ppo">Learn more about PPO plans</a>.</p>
<p><strong>PFFS (Private Fee-for-Service):</strong> No fixed network - you can see any Medicare-accepting provider who agrees to the plan's payment terms. Availability varies by region. <a href="/medicare-part-c/medicare-advantage-plan-pffs">Learn more about PFFS plans</a>.</p>
<p><strong>SNP (Special Needs Plan):</strong> Tailored benefits for people with specific chronic conditions, dual eligibility (Medicare + Medicaid), or institutional care needs. <a href="/medicare-part-c/medicare-advantage-plan-snp">Learn more about SNP plans</a>.</p>`,
    },
    {
      id: "medigap",
      heading: "Medicare Supplement Plans (Medigap)",
      body: `<p><a href="/faqs/what-is-a-medicare-supplement-plan-and-who-needs-one/">Medigap plans</a> are standardized supplemental insurance policies sold by private companies that help pay the out-of-pocket costs left by Original Medicare - deductibles, coinsurance, and copayments. They do not replace Medicare; they work alongside it.</p>
<p><strong>Key features of Medigap:</strong></p>
<ul>
<li>Standardized plans (A, B, C, D, F, G, K, L, M, N) - same benefits regardless of insurer</li>
<li>Works with any doctor or hospital that accepts Medicare nationwide</li>
<li>Predictable costs - most plans cover 100% of gaps after deductible</li>
<li>No network restrictions, no referrals, no prior authorization</li>
<li>Does not include prescription drug coverage (need separate Part D)</li>
<li>Monthly premiums higher than Medicare Advantage</li>
</ul>
<p>The most popular Medigap plans in 2026 are <a href="/medicare-supplement-plans/plan-g/">Plan G</a> and <a href="/medicare-supplement-plans/plan-n/">Plan N</a>. Plan G covers everything except the Part B deductible ($283 in 2026), while Plan N has lower premiums but includes small copays for office visits.</p>
<p>Guaranteed issue rights for Medigap are strongest during your <a href="/faqs/medicare-supplement-open-enrollment/">Medigap Open Enrollment Period</a> - the 6-month window starting when you turn 65 and enroll in Part B. After this window, insurers can use medical underwriting to deny coverage or charge higher premiums.</p>`,
    },
    {
      id: "part-d",
      heading: "Medicare Part D (Prescription Drug Coverage)",
      body: `<p><a href="/faqs/top-5-medicare-prescription-drug-plans/">Medicare Part D</a> provides prescription drug coverage through private insurance plans approved by Medicare. You can get Part D coverage either as a standalone plan (paired with Original Medicare) or bundled within a Medicare Advantage plan (MAPD).</p>
<p><strong>2026 Part D key numbers:</strong></p>
<ul>
<li>Average monthly premium: $34.50</li>
<li>Maximum annual deductible: $615</li>
<li>Annual out-of-pocket cap: $2,100 (new for 2025+)</li>
<li>$35/month cap on insulin costs</li>
</ul>
<p>Each Part D plan has its own formulary (list of covered drugs) organized into cost-sharing tiers. Before enrolling, check that your specific medications are covered and at what tier level. Learn more about <a href="/faqs/what-is-a-medicare-part-d-formulary/">how Part D formularies work</a>.</p>`,
    },
    {
      id: "choosing",
      heading: "How to Choose the Right Medicare Plan Type",
      body: `<p>Choosing between plan types comes down to four factors: your health needs, your preferred doctors, your medications, and your budget tolerance for unexpected costs.</p>
<p><strong>Choose Original Medicare + Medigap if you:</strong></p>
<ul>
<li>Want to see any Medicare-accepting doctor nationwide without referrals</li>
<li>Travel frequently or split time between states</li>
<li>Want predictable, low out-of-pocket costs regardless of health events</li>
<li>Can afford a higher monthly premium for peace of mind</li>
</ul>
<p><strong>Choose Medicare Advantage if you:</strong></p>
<ul>
<li>Want the lowest possible monthly premium</li>
<li>Are comfortable using a local network of providers</li>
<li>Want dental, vision, and hearing benefits bundled in</li>
<li>Prefer a single plan that covers everything (medical + drugs)</li>
</ul>
<p>For a detailed comparison, read our guide on <a href="/faqs/medigap-vs-medicare-advantage/">Medigap vs. Medicare Advantage</a> to see how costs, coverage, and flexibility compare in real-world scenarios.</p>`,
    },
  ],
  faqs: [
    { question: "What are the 4 main types of Medicare plans?", answer: "The four main types are Original Medicare (Parts A and B), Medicare Advantage (Part C), Medicare Supplement (Medigap), and Medicare Part D prescription drug plans. Original Medicare provides the foundation, while the others build on or replace it." },
    { question: "What is the difference between Medicare Advantage and Original Medicare?", answer: "Original Medicare lets you see any Medicare-accepting doctor nationwide with no network restrictions but has no annual out-of-pocket cap. Medicare Advantage uses managed care networks (HMO or PPO) with a $9,250 annual cap in 2026, and often includes drug coverage and extra benefits like dental and vision." },
    { question: "Can I have both Medigap and Medicare Advantage?", answer: "No. Medigap supplements Original Medicare only. If you enroll in Medicare Advantage, you cannot also have a Medigap policy. You must choose one path: Original Medicare + Medigap + standalone Part D, or Medicare Advantage (which typically bundles everything together)." },
    { question: "Which type of Medicare plan is best for me?", answer: "It depends on your priorities. If you want predictable costs and nationwide provider access, Original Medicare with Medigap is typically best. If you want lower premiums and are comfortable with a local network, Medicare Advantage may be a better fit. Consider your health needs, preferred doctors, medications, and budget." },
    { question: "Do all Medicare Advantage plans include drug coverage?", answer: "Most do. Approximately 90% of Medicare Advantage plans are MAPD plans that bundle prescription drug coverage. However, some MA-only plans do not include drugs, in which case you would need a separate Part D plan. Always verify before enrolling." },
    { question: "What does Medigap cover that Medicare Advantage does not?", answer: "Medigap covers the cost-sharing gaps in Original Medicare - the Part A deductible ($1,736 in 2026), Part B coinsurance (20% of approved charges), and hospital coinsurance for extended stays. It provides predictable costs with no network restrictions, while Medicare Advantage uses copays and coinsurance that vary by service." },
    { question: "How much does Medicare cost per month in 2026?", answer: "Everyone pays the Part B premium of $202.90 per month. Beyond that, costs depend on your plan type: Medigap adds $30-$300+ monthly, Medicare Advantage often adds $0, and Part D averages $34.50 per month. Higher-income enrollees also pay IRMAA surcharges." },
    { question: "When can I change my Medicare plan type?", answer: "You can switch between Original Medicare and Medicare Advantage during the Annual Enrollment Period (October 15 - December 7) or the Medicare Advantage Open Enrollment Period (January 1 - March 31). Medigap enrollment has its own rules - guaranteed issue rights are strongest during your initial 6-month open enrollment window at age 65." },
  ],
  relatedLinks: [
    { label: "Medicare Advantage Plans Overview", path: "/medicare-part-c/medicare-advantage-plans" },
    { label: "Medicare Advantage HMO Plans", path: "/medicare-part-c/medicare-advantage-plan-hmo" },
    { label: "Medicare Advantage PPO Plans", path: "/medicare-part-c/medicare-advantage-plan-ppo" },
    { label: "Medicare Advantage Costs", path: "/medicare-part-c/medicare-advantage-costs" },
    { label: "Medigap vs. Medicare Advantage", path: "/faqs/medigap-vs-medicare-advantage/" },
    { label: "Medicare Supplement Plans", path: "/medicare-supplement-plans/" },
    { label: "Best Medicare Part D Plans", path: "/faqs/top-5-medicare-prescription-drug-plans/" },
    { label: "Medicare Advantage vs. Original Medicare", path: "/medicare-part-c/medicare-advantage-vs-original-medicare" },
  ],
};

export default function PageContent() {
  return <MedicareAdvantagePageContent page={pageData} slug="medicare-advantage-plan-types" />;
}
