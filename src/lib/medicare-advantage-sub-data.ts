// Medicare Advantage sub-page data
// 9 pages: index + 8 sub-pages under /medicare-part-c

export interface MedicareAdvantageSubPage {
  slug: string; // "" for index, otherwise the sub-slug
  title: string;
  subtitle: string;
  heroDescription: string;
  sections: { id: string; heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { label: string; path: string }[];
}

export const MEDICARE_ADVANTAGE_PAGES: MedicareAdvantageSubPage[] = [
  {
    slug: "",
    title: "Medicare Advantage (Part C)",
    subtitle: "MEDICARE ADVANTAGE",
    heroDescription:
      "Medicare Advantage (Part C) is an alternative to Original Medicare offered by private insurers. Plans bundle Part A, Part B, and usually Part D coverage — often with extra benefits like dental, vision, and hearing.",
    sections: [
      {
        id: "what-is-medicare-advantage",
        heading: "What is Medicare Advantage?",
        body: `<p>Medicare Advantage (also called Medicare Part C) is a type of Medicare health plan offered by private insurance companies that contract with Medicare. These plans must cover everything Original Medicare covers, but they can do so with different rules, costs, and restrictions.</p>
<p>Most Medicare Advantage plans also include prescription drug coverage (Part D) and may offer extra benefits not covered by Original Medicare, such as dental, vision, hearing, and fitness programs.</p>`,
      },
      {
        id: "plan-types",
        heading: "Types of Medicare Advantage Plans",
        body: `<table>
<thead><tr><th>Plan Type</th><th>Network Requirement</th><th>Referrals Needed?</th><th>Out-of-Network Coverage</th></tr></thead>
<tbody>
<tr><td>HMO</td><td>Must use network providers</td><td>Yes (usually)</td><td>Emergency only</td></tr>
<tr><td>PPO</td><td>Preferred network, but flexible</td><td>No</td><td>Yes (higher cost)</td></tr>
<tr><td>HMO-POS</td><td>Network-based with some flexibility</td><td>Yes (in-network)</td><td>Limited</td></tr>
<tr><td>PFFS</td><td>Any provider who accepts plan terms</td><td>No</td><td>Yes (if provider accepts)</td></tr>
<tr><td>SNP</td><td>Specialized network</td><td>Yes (usually)</td><td>Limited</td></tr>
</tbody>
</table>`,
      },
      {
        id: "costs",
        heading: "Medicare Advantage Costs",
        body: `<p>Medicare Advantage plans often have $0 monthly premiums (though you still pay your Part B premium). Costs vary by plan and include:</p>
<ul>
<li><strong>Monthly premium</strong> — Many plans are $0/month; some have premiums of $20–$100+</li>
<li><strong>Deductibles</strong> — Vary by plan; some have $0 deductibles</li>
<li><strong>Copays/coinsurance</strong> — Fixed amounts per visit or service</li>
<li><strong>Out-of-pocket maximum</strong> — Required by law; in 2025, the limit is $9,350 for in-network services</li>
</ul>`,
      },
      {
        id: "enrollment",
        heading: "When Can You Enroll?",
        body: `<ul>
<li><strong>Initial Enrollment Period (IEP)</strong> — 7-month window around your 65th birthday</li>
<li><strong>Annual Enrollment Period (AEP)</strong> — October 15 – December 7 each year</li>
<li><strong>Medicare Advantage Open Enrollment Period (OEP)</strong> — January 1 – March 31 (switch MA plans or return to Original Medicare)</li>
<li><strong>Special Enrollment Periods (SEPs)</strong> — Triggered by qualifying life events (moving, losing coverage, etc.)</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Is Medicare Advantage Better than Original Medicare?",
        answer:
          "It depends on your health needs, budget, and location. Medicare Advantage often has lower out-of-pocket costs and extra benefits, but restricts you to a network of providers. Original Medicare gives you more provider flexibility but has no out-of-pocket maximum without a Medigap plan.",
      },
      {
        question: "Can I Switch from Medicare Advantage Back to Original Medicare?",
        answer:
          "Yes. You can switch during the Annual Enrollment Period (Oct 15–Dec 7) or the Medicare Advantage Open Enrollment Period (Jan 1–Mar 31). If you switch back to Original Medicare, you may want to also enroll in a Medigap plan — but be aware that Medigap insurers can use medical underwriting outside of guaranteed issue periods.",
      },
      {
        question: "Do Medicare Advantage Plans Cover Prescription Drugs?",
        answer:
          "Most Medicare Advantage plans include Part D prescription drug coverage (called MA-PD plans). A few plans do not include drug coverage — if you choose one of these, you can enroll in a standalone Part D plan.",
      },
    ],
    relatedLinks: [
      { label: "Medicare Advantage HMO/POS Plans", path: "/medicare-part-c/medicare-advantage-plan-hmo-pos" },
      { label: "Medicare Advantage HMO Plans", path: "/medicare-part-c/medicare-advantage-plan-hmo" },
      { label: "Medicare Advantage PFFS Plans", path: "/medicare-part-c/medicare-advantage-plan-pffs" },
      { label: "Medicare Advantage PPO Plans", path: "/medicare-part-c/medicare-advantage-plan-ppo" },
      { label: "Medicare Advantage Eligibility", path: "/medicare-part-c/medicare-advantage-eligibility" },
      { label: "Medicare Advantage Enrollment Periods", path: "/medicare-part-c/medicare-advantage-enrollment-periods" },
      { label: "Medicare Advantage vs. Original Medicare", path: "/medicare-part-c/medicare-advantage-vs-original-medicare" },
      { label: "Medicare Advantage Costs", path: "/medicare-part-c/medicare-advantage-costs" },
      { label: "Medicare Advantage Plan Types", path: "/medicare-part-c/medicare-advantage-plan-types" },
    ],
  },
  {
    slug: "medicare-advantage-plan-hmo-pos",
    title: "Medicare Advantage HMO and HMO-POS Plans",
    subtitle: "MEDICARE ADVANTAGE",
    heroDescription:
      "HMO and HMO-POS Medicare Advantage plans offer comprehensive coverage through a network of providers, often with $0 premiums and low copays.",
    sections: [
      {
        id: "what-is-hmo",
        heading: "What is an HMO Medicare Advantage Plan?",
        body: `<p>A Health Maintenance Organization (HMO) Medicare Advantage plan requires you to use a network of doctors, hospitals, and other providers. You typically need to choose a primary care physician (PCP) who coordinates your care and provides referrals to specialists.</p>
<p>HMO plans generally have the lowest premiums and out-of-pocket costs among Medicare Advantage plan types, but they offer the least flexibility in choosing providers.</p>`,
      },
      {
        id: "what-is-hmo-pos",
        heading: "What is an HMO-POS Plan?",
        body: `<p>An HMO Point-of-Service (HMO-POS) plan is a hybrid that adds some out-of-network flexibility to the standard HMO model. You can see out-of-network providers for certain services, but you'll pay more than if you stayed in-network.</p>
<p>HMO-POS plans are a good middle ground for people who want the lower costs of an HMO but occasionally need to see providers outside the network.</p>`,
      },
      {
        id: "hmo-pros-cons",
        heading: "HMO Pros and Cons",
        body: `<table>
<thead><tr><th>Pros</th><th>Cons</th></tr></thead>
<tbody>
<tr><td>Often $0 monthly premium</td><td>Must use network providers</td></tr>
<tr><td>Low copays for most services</td><td>Referrals required for specialists</td></tr>
<tr><td>Coordinated care through PCP</td><td>No coverage outside network (except emergencies)</td></tr>
<tr><td>Often includes dental, vision, hearing</td><td>Must live in plan's service area</td></tr>
<tr><td>Prescription drug coverage included</td><td>Changing plans requires waiting for enrollment period</td></tr>
</tbody>
</table>`,
      },
      {
        id: "who-should-choose-hmo",
        heading: "Who Should Choose an HMO Plan?",
        body: `<p>An HMO Medicare Advantage plan may be a good fit if you:</p>
<ul>
<li>Want to minimize monthly premiums and out-of-pocket costs</li>
<li>Have a primary care doctor you trust who is in the plan's network</li>
<li>Live in an area with a large network of providers</li>
<li>Don't frequently need to see specialists or travel for care</li>
<li>Value coordinated, managed care</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Do HMO Medicare Advantage Plans Require Referrals?",
        answer:
          "Most HMO plans require a referral from your primary care physician to see a specialist. Some HMO plans offer open access (no referral required) — check the plan's Evidence of Coverage for details.",
      },
      {
        question: "What Happens if I See an Out-of-network Doctor with an HMO Plan?",
        answer:
          "With a standard HMO plan, you generally have no coverage for out-of-network care except in emergencies. With an HMO-POS plan, you may have limited out-of-network coverage, but you'll pay significantly more than in-network rates.",
      },
      {
        question: "Can I Keep My Current Doctor with an HMO Plan?",
        answer:
          "Only if your doctor is in the plan's network. Before enrolling, use the plan's online provider directory to confirm that your doctors, specialists, and preferred hospital are in-network.",
      },
    ],
    relatedLinks: [
      { label: "Medicare Advantage Overview", path: "/medicare-part-c" },
      { label: "Medicare Advantage HMO Plans", path: "/medicare-part-c/medicare-advantage-plan-hmo" },
      { label: "Medicare Advantage PFFS Plans", path: "/medicare-part-c/medicare-advantage-plan-pffs" },
      { label: "Medicare Advantage PPO Plans", path: "/medicare-part-c/medicare-advantage-plan-ppo" },
      { label: "Medicare Advantage Costs", path: "/medicare-part-c/medicare-advantage-costs" },
      { label: "Medicare Advantage Eligibility", path: "/medicare-part-c/medicare-advantage-eligibility" },
      { label: "Medicare Advantage Plan Types", path: "/medicare-part-c/medicare-advantage-plan-types" },
    ],
  },
  {
    slug: "medicare-advantage-eligibility",
    title: "Medicare Advantage Eligibility",
    subtitle: "MEDICARE ADVANTAGE",
    heroDescription:
      "To enroll in a Medicare Advantage plan, you must meet specific eligibility requirements related to Medicare enrollment, residency, and plan availability.",
    sections: [
      {
        id: "basic-requirements",
        heading: "Basic Eligibility Requirements",
        body: `<p>To be eligible for a Medicare Advantage plan, you must:</p>
<ol>
<li><strong>Be enrolled in Medicare Part A and Part B</strong> — You must have both parts of Original Medicare active before you can join a Medicare Advantage plan.</li>
<li><strong>Live in the plan's service area</strong> — Medicare Advantage plans operate in specific geographic areas. You must reside in the plan's service area to enroll.</li>
<li><strong>Not have End-Stage Renal Disease (ESRD)</strong> — Prior to 2021, people with ESRD could not enroll in most Medicare Advantage plans. The 21st Century Cures Act removed this restriction starting January 1, 2021.</li>
</ol>`,
      },
      {
        id: "age-eligibility",
        heading: "Age and Disability Eligibility",
        body: `<p>You are eligible for Medicare Advantage if you qualify for Medicare, which includes:</p>
<ul>
<li><strong>Age 65 or older</strong> — U.S. citizens or permanent residents who have worked at least 10 years (40 quarters) in Medicare-covered employment</li>
<li><strong>Under 65 with a disability</strong> — People who have received Social Security Disability Insurance (SSDI) for 24 months automatically become eligible for Medicare</li>
<li><strong>ALS (Lou Gehrig's Disease)</strong> — Medicare eligibility begins immediately upon receiving SSDI for ALS</li>
<li><strong>ESRD</strong> — People with End-Stage Renal Disease requiring dialysis or a kidney transplant are eligible for Medicare regardless of age</li>
</ul>`,
      },
      {
        id: "esrd-update",
        heading: "ESRD and Medicare Advantage (2021 Change)",
        body: `<p>Before January 1, 2021, people with End-Stage Renal Disease (ESRD) were generally not allowed to enroll in Medicare Advantage plans. The 21st Century Cures Act changed this, allowing ESRD patients to enroll in Medicare Advantage starting in 2021.</p>
<p>However, people with ESRD should carefully compare plans, as not all Medicare Advantage plans cover dialysis or kidney transplant services equally. Reviewing the plan's formulary and provider network is especially important.</p>`,
      },
      {
        id: "when-to-enroll",
        heading: "When to Enroll",
        body: `<p>Once you meet the eligibility requirements, you can enroll during these periods:</p>
<ul>
<li><strong>Initial Enrollment Period (IEP)</strong> — 7-month window starting 3 months before your 65th birthday month</li>
<li><strong>Annual Enrollment Period (AEP)</strong> — October 15 – December 7 each year</li>
<li><strong>Special Enrollment Periods (SEPs)</strong> — Triggered by qualifying events like moving, losing employer coverage, or gaining/losing Medicaid eligibility</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Can I enroll in Medicare Advantage if I'm under 65?",
        answer:
          "Yes, if you are eligible for Medicare due to a disability or ESRD. You must be enrolled in both Medicare Part A and Part B, and the plan must be available in your area.",
      },
      {
        question: "Do I need to live in the plan's service area year-round?",
        answer:
          "You must primarily reside in the plan's service area. If you spend significant time in another area (snowbirds, for example), look for a PPO plan that offers out-of-network coverage, or consider Original Medicare with a Medigap plan for more flexibility.",
      },
      {
        question: "Can I Enroll in Medicare Advantage if I Have Medicaid?",
        answer:
          "Yes. If you have both Medicare and Medicaid (dual-eligible), you may qualify for a Dual Eligible Special Needs Plan (D-SNP), which coordinates benefits from both programs and often has very low or $0 costs.",
      },
    ],
    relatedLinks: [
      { label: "Medicare Advantage Overview", path: "/medicare-part-c" },
      { label: "Medicare Advantage Enrollment Periods", path: "/medicare-part-c/medicare-advantage-enrollment-periods" },
      { label: "Medicare Advantage SNP Plans", path: "/medicare-part-c/medicare-advantage-plan-snp" },
      { label: "Medicare Advantage Costs", path: "/medicare-part-c/medicare-advantage-costs" },
    ],
  },
  {
    slug: "medicare-advantage-enrollment-periods",
    title: "Medicare Advantage Enrollment Periods",
    subtitle: "MEDICARE ADVANTAGE",
    heroDescription:
      "There are four main enrollment periods for Medicare Advantage. Understanding when you can enroll, switch, or drop a plan is critical to making the right coverage decision.",
    sections: [
      {
        id: "iep",
        heading: "Initial Enrollment Period (IEP)",
        body: `<p>The Initial Enrollment Period is a 7-month window around your 65th birthday:</p>
<ul>
<li>3 months before your birthday month</li>
<li>Your birthday month</li>
<li>3 months after your birthday month</li>
</ul>
<p>This is your first opportunity to enroll in Medicare Advantage. If you enroll before or during your birthday month, coverage starts the first day of your birthday month. If you enroll in the 3 months after, coverage is delayed by 1–3 months.</p>`,
      },
      {
        id: "aep",
        heading: "Annual Enrollment Period (AEP)",
        body: `<p>The Annual Enrollment Period runs from <strong>October 15 to December 7</strong> each year. During AEP, you can:</p>
<ul>
<li>Switch from Original Medicare to a Medicare Advantage plan</li>
<li>Switch from one Medicare Advantage plan to another</li>
<li>Switch from Medicare Advantage back to Original Medicare</li>
<li>Join, switch, or drop a standalone Part D plan</li>
</ul>
<p>Coverage changes made during AEP take effect January 1 of the following year.</p>`,
      },
      {
        id: "oep",
        heading: "Medicare Advantage Open Enrollment Period (OEP)",
        body: `<p>The Medicare Advantage Open Enrollment Period runs from <strong>January 1 to March 31</strong> each year. During OEP, you can:</p>
<ul>
<li>Switch from one Medicare Advantage plan to another</li>
<li>Switch from Medicare Advantage back to Original Medicare (and join a Part D plan)</li>
</ul>
<p>You cannot use OEP to switch from Original Medicare to Medicare Advantage. Coverage changes take effect the first day of the month after the plan receives your enrollment request.</p>`,
      },
      {
        id: "sep",
        heading: "Special Enrollment Periods (SEPs)",
        body: `<p>Special Enrollment Periods allow you to make changes outside of regular enrollment windows when certain qualifying events occur:</p>
<ul>
<li><strong>Moving</strong> — Moving out of your plan's service area or to a new address where different plans are available</li>
<li><strong>Losing coverage</strong> — Losing employer or union coverage</li>
<li><strong>Gaining/losing Medicaid</strong> — Changes in Medicaid eligibility</li>
<li><strong>Plan termination</strong> — Your Medicare Advantage plan leaves Medicare or stops serving your area</li>
<li><strong>5-star enrollment</strong> — If a 5-star plan is available in your area, you can switch to it once per year (December 8 – November 30)</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Can I Enroll in Medicare Advantage at Any Time?",
        answer:
          "No. You can only enroll during specific enrollment periods (IEP, AEP, OEP, or SEP). Outside of these periods, you generally cannot change your Medicare coverage unless you have a qualifying special enrollment event.",
      },
      {
        question: "What is the Difference between AEP and OEP?",
        answer:
          "AEP (Oct 15–Dec 7) allows you to make any Medicare coverage change, including switching from Original Medicare to Medicare Advantage. OEP (Jan 1–Mar 31) only allows you to switch between Medicare Advantage plans or switch back to Original Medicare — you cannot use OEP to join Medicare Advantage for the first time.",
      },
      {
        question: "What Happens if I Miss All Enrollment Periods?",
        answer:
          "If you miss your Initial Enrollment Period and don't have a qualifying SEP, you'll need to wait for the Annual Enrollment Period (Oct 15–Dec 7). You may also face late enrollment penalties for Part B and Part D if you delayed enrollment without creditable coverage.",
      },
    ],
    relatedLinks: [
      { label: "Medicare Advantage Overview", path: "/medicare-part-c" },
      { label: "Medicare Advantage Eligibility", path: "/medicare-part-c/medicare-advantage-eligibility" },
      { label: "Medicare Advantage Costs", path: "/medicare-part-c/medicare-advantage-costs" },
      { label: "Medicare Advantage vs. Original Medicare", path: "/medicare-part-c/medicare-advantage-vs-original-medicare" },
      { label: "Medicare Advantage SNP Plans", path: "/medicare-part-c/medicare-advantage-plan-snp" },
    ],
  },
  {
    slug: "medicare-advantage-plan-snp",
    title: "Medicare Advantage Special Needs Plans (SNP)",
    subtitle: "MEDICARE ADVANTAGE",
    heroDescription:
      "Special Needs Plans (SNPs) are Medicare Advantage plans designed for people with specific diseases, conditions, or circumstances. They offer tailored benefits and care coordination.",
    sections: [
      {
        id: "what-is-snp",
        heading: "What is a Special Needs Plan?",
        body: `<p>A Special Needs Plan (SNP) is a type of Medicare Advantage plan that limits membership to people with specific diseases, conditions, or characteristics. SNPs tailor their benefits, provider networks, and drug formularies to best serve the needs of their target population.</p>
<p>There are three types of SNPs:</p>
<ul>
<li><strong>Dual Eligible SNP (D-SNP)</strong> — For people who have both Medicare and Medicaid</li>
<li><strong>Chronic Condition SNP (C-SNP)</strong> — For people with specific severe or disabling chronic conditions (diabetes, heart failure, ESRD, HIV/AIDS, etc.)</li>
<li><strong>Institutional SNP (I-SNP)</strong> — For people who live in an institution (nursing home) or require nursing home-level care at home</li>
</ul>`,
      },
      {
        id: "d-snp",
        heading: "Dual Eligible SNPs (D-SNPs)",
        body: `<p>D-SNPs are the most common type of SNP. They are designed for people who qualify for both Medicare and Medicaid (dual-eligible beneficiaries). Benefits typically include:</p>
<ul>
<li>$0 or very low monthly premiums</li>
<li>$0 or very low copays for most services</li>
<li>Coordination between Medicare and Medicaid benefits</li>
<li>Extra benefits like dental, vision, hearing, transportation, and meal delivery</li>
<li>A care coordinator to help manage health needs</li>
</ul>`,
      },
      {
        id: "c-snp",
        heading: "Chronic Condition SNPs (C-SNPs)",
        body: `<p>C-SNPs are designed for people with specific severe or disabling chronic conditions. Eligible conditions vary by plan but commonly include:</p>
<ul>
<li>Diabetes</li>
<li>Chronic heart failure</li>
<li>End-Stage Renal Disease (ESRD)</li>
<li>HIV/AIDS</li>
<li>Chronic lung disorders (COPD)</li>
<li>Autoimmune disorders</li>
<li>Cancer (excluding pre-cancer)</li>
<li>Neurological disorders (Alzheimer's, multiple sclerosis)</li>
</ul>
<p>C-SNPs offer specialized provider networks, tailored drug formularies, and disease management programs for their target conditions.</p>`,
      },
      {
        id: "snp-enrollment",
        heading: "Enrolling in an SNP",
        body: `<p>To enroll in an SNP, you must meet the plan's eligibility criteria in addition to standard Medicare Advantage eligibility requirements. SNPs can verify your eligibility before or after enrollment.</p>
<p>You can enroll in an SNP during:</p>
<ul>
<li>Your Initial Enrollment Period</li>
<li>The Annual Enrollment Period (Oct 15–Dec 7)</li>
<li>A Special Enrollment Period (if you gain eligibility for the SNP mid-year)</li>
</ul>
<p>If you're already in a D-SNP and lose Medicaid eligibility, you have a 3-month SEP to switch to another plan.</p>`,
      },
    ],
    faqs: [
      {
        question: "Who Qualifies for a Dual Eligible SNP (D-SNP)?",
        answer:
          "To qualify for a D-SNP, you must be enrolled in both Medicare (Part A and Part B) and Medicaid. Both full-benefit dual-eligible and partial-benefit dual-eligible individuals may qualify, though the specific benefits available depend on your level of Medicaid eligibility.",
      },
      {
        question: "Can I Enroll in a C-SNP if I Have a Chronic Condition?",
        answer:
          "Yes, if the plan covers your specific condition and is available in your area. You'll need to confirm your diagnosis meets the plan's criteria. Some C-SNPs require documentation from your doctor.",
      },
      {
        question: "Are SNPs Available Everywhere?",
        answer:
          "No. SNP availability varies by location. D-SNPs are widely available in most states, but C-SNPs and I-SNPs are less common and may not be available in all areas. Use Medicare's Plan Finder at medicare.gov to search for SNPs in your zip code.",
      },
    ],
    relatedLinks: [
      { label: "Medicare Advantage Overview", path: "/medicare-part-c" },
      { label: "Medicare Advantage Eligibility", path: "/medicare-part-c/medicare-advantage-eligibility" },
      { label: "Medicare Advantage Enrollment Periods", path: "/medicare-part-c/medicare-advantage-enrollment-periods" },
      { label: "Medicare Advantage Costs", path: "/medicare-part-c/medicare-advantage-costs" },
    ],
  },
  {
    slug: "medicare-advantage-plan-pffs",
    title: "Medicare Advantage PFFS Plans",
    subtitle: "MEDICARE ADVANTAGE",
    heroDescription:
      "Private Fee-for-Service (PFFS) plans allow you to see any Medicare-approved provider who agrees to the plan's payment terms — without a network or referral requirement.",
    sections: [
      {
        id: "what-is-pffs",
        heading: "What is a PFFS Plan?",
        body: `<p>A Private Fee-for-Service (PFFS) plan is a type of Medicare Advantage plan that determines how much it will pay providers and how much you pay when you receive care. Unlike HMO or PPO plans, PFFS plans don't have a traditional network — you can see any Medicare-approved provider who agrees to accept the plan's payment terms.</p>
<p>PFFS plans are less common than HMO and PPO plans and are generally available in rural areas where network-based plans have limited provider availability.</p>`,
      },
      {
        id: "how-pffs-works",
        heading: "How PFFS Plans Work",
        body: `<ul>
<li><strong>No network requirement</strong> — You can see any Medicare-approved doctor, specialist, or hospital</li>
<li><strong>Provider acceptance required</strong> — The provider must agree to the plan's payment terms for each visit (they are not contractually obligated to accept)</li>
<li><strong>No referrals needed</strong> — You can see specialists without a referral from a primary care physician</li>
<li><strong>Plan sets payment terms</strong> — The plan determines what it pays providers and what you pay as cost-sharing</li>
</ul>`,
      },
      {
        id: "pffs-pros-cons",
        heading: "PFFS Pros and Cons",
        body: `<table>
<thead><tr><th>Pros</th><th>Cons</th></tr></thead>
<tbody>
<tr><td>No network restrictions</td><td>Provider must accept plan terms each visit</td></tr>
<tr><td>No referrals required</td><td>Less predictable provider availability</td></tr>
<tr><td>Good option in rural areas</td><td>Often higher premiums than HMO plans</td></tr>
<tr><td>Flexibility to see any Medicare provider</td><td>Less common; fewer plan options</td></tr>
</tbody>
</table>`,
      },
      {
        id: "pffs-vs-original",
        heading: "PFFS vs. Original Medicare",
        body: `<p>PFFS plans are sometimes compared to Original Medicare because of their provider flexibility. Key differences:</p>
<ul>
<li>PFFS plans have an out-of-pocket maximum; Original Medicare does not (without Medigap)</li>
<li>PFFS plans may include extra benefits (dental, vision, Part D); Original Medicare does not</li>
<li>With Original Medicare, any Medicare-approved provider must accept you; with PFFS, providers can decline on a visit-by-visit basis</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Can Any Doctor See Me if I Have a PFFS Plan?",
        answer:
          "Any Medicare-approved provider can see you, but they must agree to the plan's payment terms for that visit. Unlike Original Medicare (where providers must accept Medicare assignment), PFFS providers can decline to accept the plan's terms on a visit-by-visit basis. Always confirm acceptance before your appointment.",
      },
      {
        question: "Do PFFS Plans Include Prescription Drug Coverage?",
        answer:
          "Some PFFS plans include Part D prescription drug coverage (MA-PD plans), and some do not. If your PFFS plan doesn't include drug coverage, you can enroll in a standalone Part D plan.",
      },
      {
        question: "Are PFFS Plans Available in My Area?",
        answer:
          "PFFS plans are most commonly available in rural areas. Use Medicare's Plan Finder at medicare.gov to search for PFFS plans in your zip code.",
      },
    ],
    relatedLinks: [
      { label: "Medicare Advantage Overview", path: "/medicare-part-c" },
      { label: "Medicare Advantage PPO Plans", path: "/medicare-part-c/medicare-advantage-plan-ppo" },
      { label: "Medicare Advantage HMO/POS Plans", path: "/medicare-part-c/medicare-advantage-plan-hmo-pos" },
      { label: "Medicare Advantage vs. Original Medicare", path: "/medicare-part-c/medicare-advantage-vs-original-medicare" },
      { label: "Medicare Advantage Plan Types", path: "/medicare-part-c/medicare-advantage-plan-types" },
    ],
  },
  {
    slug: "medicare-advantage-plan-ppo",
    title: "Medicare Advantage PPO Plans",
    subtitle: "MEDICARE ADVANTAGE",
    heroDescription:
      "PPO Medicare Advantage plans offer the most flexibility among network-based plans — you can see in-network providers at lower cost or go out-of-network for a higher cost.",
    sections: [
      {
        id: "what-is-ppo",
        heading: "What is a PPO Medicare Advantage Plan?",
        body: `<p>A Preferred Provider Organization (PPO) Medicare Advantage plan has a network of preferred providers, but unlike HMO plans, you're not required to stay within the network. You can see out-of-network providers, but you'll pay more than if you used in-network providers.</p>
<p>PPO plans also don't require referrals to see specialists, giving you more direct access to the care you need.</p>`,
      },
      {
        id: "ppo-costs",
        heading: "PPO Plan Costs",
        body: `<p>PPO plans typically have higher premiums than HMO plans, but offer more flexibility. Cost structure:</p>
<ul>
<li><strong>In-network care</strong> — Lower copays and coinsurance; counts toward in-network out-of-pocket maximum</li>
<li><strong>Out-of-network care</strong> — Higher copays and coinsurance; may have a separate (higher) out-of-pocket maximum</li>
<li><strong>Out-of-pocket maximum</strong> — PPO plans have two maximums: one for in-network care and a combined in/out-of-network maximum</li>
</ul>`,
      },
      {
        id: "ppo-vs-hmo",
        heading: "PPO vs. HMO: Which is Right for You?",
        body: `<table>
<thead><tr><th>Feature</th><th>PPO</th><th>HMO</th></tr></thead>
<tbody>
<tr><td>Monthly premium</td><td>Usually higher</td><td>Usually lower (often $0)</td></tr>
<tr><td>Network requirement</td><td>Preferred network, but flexible</td><td>Must use network</td></tr>
<tr><td>Referrals for specialists</td><td>Not required</td><td>Usually required</td></tr>
<tr><td>Out-of-network coverage</td><td>Yes (at higher cost)</td><td>Emergency only</td></tr>
<tr><td>Best for</td><td>Those who travel or want flexibility</td><td>Those who want lowest costs</td></tr>
</tbody>
</table>`,
      },
      {
        id: "who-should-choose-ppo",
        heading: "Who Should Choose a PPO Plan?",
        body: `<p>A PPO Medicare Advantage plan may be a good fit if you:</p>
<ul>
<li>Travel frequently and need coverage in multiple locations</li>
<li>Have specialists or doctors you want to keep who may be out-of-network</li>
<li>Want to see specialists without getting a referral first</li>
<li>Are willing to pay higher premiums for more flexibility</li>
<li>Have complex health needs that require multiple specialists</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Do PPO Medicare Advantage Plans Require Referrals?",
        answer:
          "No. PPO plans do not require referrals to see specialists. You can make appointments directly with any specialist, in-network or out-of-network.",
      },
      {
        question: "How Much More Does Out-of-network Care Cost with a PPO Plan?",
        answer:
          "It varies by plan, but out-of-network care typically costs 20-50% more than in-network care. The plan's Evidence of Coverage document will specify the exact cost-sharing amounts for in-network vs. out-of-network services.",
      },
      {
        question: "Are PPO Medicare Advantage Plans Available Nationwide?",
        answer:
          "Some large insurers offer PPO plans with nationwide networks, which is particularly useful for people who travel or split time between locations. Check the plan's service area and network directory before enrolling.",
      },
    ],
    relatedLinks: [
      { label: "Medicare Advantage Overview", path: "/medicare-part-c" },
      { label: "Medicare Advantage PFFS Plans", path: "/medicare-part-c/medicare-advantage-plan-pffs" },
      { label: "Medicare Advantage HMO Plans", path: "/medicare-part-c/medicare-advantage-plan-hmo" },
      { label: "Medicare Advantage HMO/POS Plans", path: "/medicare-part-c/medicare-advantage-plan-hmo-pos" },
      { label: "Medicare Advantage Costs", path: "/medicare-part-c/medicare-advantage-costs" },
      { label: "Medicare Advantage vs. Original Medicare", path: "/medicare-part-c/medicare-advantage-vs-original-medicare" },
      { label: "Medicare Advantage SNP Plans", path: "/medicare-part-c/medicare-advantage-plan-snp" },
    ],
  },
  {
    slug: "medicare-advantage-costs",
    title: "Medicare Advantage Costs",
    subtitle: "MEDICARE ADVANTAGE",
    heroDescription:
      "Understanding Medicare Advantage costs — premiums, deductibles, copays, and out-of-pocket maximums — helps you compare plans and budget for healthcare expenses.",
    sections: [
      {
        id: "cost-overview",
        heading: "Overview of Medicare Advantage Costs",
        body: `<p>Medicare Advantage plans have a different cost structure than Original Medicare. While many plans advertise $0 monthly premiums, you still pay your Medicare Part B premium ($202.90/month in 2026 for most people). Total costs depend on the plan type, your health needs, and how often you use healthcare services.</p>`,
      },
      {
        id: "cost-components",
        heading: "Cost Components",
        body: `<table>
<thead><tr><th>Cost Type</th><th>Description</th><th>2025 Range</th></tr></thead>
<tbody>
<tr><td>Monthly premium</td><td>Amount paid each month for the plan (in addition to Part B premium)</td><td>$0 – $200+</td></tr>
<tr><td>Annual deductible</td><td>Amount you pay before the plan starts covering costs</td><td>$0 – $600</td></tr>
<tr><td>Copays</td><td>Fixed amount per visit or service</td><td>$0 – $50 (PCP); $0 – $100+ (specialist)</td></tr>
<tr><td>Coinsurance</td><td>Percentage of costs you pay after deductible</td><td>0% – 50%</td></tr>
<tr><td>Out-of-pocket maximum</td><td>Annual cap on your costs (in-network)</td><td>Up to $9,350 (2025)</td></tr>
</tbody>
</table>`,
      },
      {
        id: "oop-maximum",
        heading: "Out-of-Pocket Maximum",
        body: `<p>One of the most important features of Medicare Advantage is the out-of-pocket maximum — a cap on how much you'll spend in a year. Once you reach this limit, the plan pays 100% of covered in-network costs for the rest of the year.</p>
<p>In 2025, the maximum allowed out-of-pocket limit for in-network services is <strong>$9,350</strong>. Many plans set their limits lower. Some plans also have a combined in/out-of-network limit, which can be higher.</p>
<p>Original Medicare has no out-of-pocket maximum without a Medigap supplement plan.</p>`,
      },
      {
        id: "extra-benefits",
        heading: "Extra Benefits and Their Costs",
        body: `<p>Many Medicare Advantage plans include extra benefits not covered by Original Medicare. These are often included at no additional cost:</p>
<ul>
<li><strong>Dental</strong> — Routine cleanings, X-rays, and sometimes major dental work</li>
<li><strong>Vision</strong> — Eye exams and an allowance for glasses or contacts</li>
<li><strong>Hearing</strong> — Hearing exams and an allowance for hearing aids</li>
<li><strong>Fitness</strong> — Gym memberships or fitness programs (SilverSneakers, etc.)</li>
<li><strong>Transportation</strong> — Rides to medical appointments</li>
<li><strong>Over-the-counter allowance</strong> — Quarterly credit for OTC health products</li>
</ul>`,
      },
    ],
    faqs: [
      {
        question: "Do I Still Pay My Part B Premium with Medicare Advantage?",
        answer:
          "Yes. You continue to pay your Medicare Part B premium ($202.90/month in 2026 for most people) even when enrolled in a Medicare Advantage plan. Some plans offer a Part B premium reduction benefit that offsets part of this cost.",
      },
      {
        question: "What is the Medicare Advantage Out-of-pocket Maximum for 2025?",
        answer:
          "In 2025, the maximum allowed out-of-pocket limit for in-network services is $9,350. Many plans set their limits lower. Plans may also have a combined in/out-of-network maximum, which can be higher. Once you reach your plan's limit, covered services are free for the rest of the year.",
      },
      {
        question: "Are Medicare Advantage Plans Really Free?",
        answer:
          "Many plans have $0 monthly premiums, but you still pay your Part B premium. You also pay copays, coinsurance, and deductibles when you use services. The total cost depends heavily on how much healthcare you use during the year.",
      },
    ],
    relatedLinks: [
      { label: "Medicare Advantage Overview", path: "/medicare-part-c" },
      { label: "Medicare Advantage vs. Original Medicare", path: "/medicare-part-c/medicare-advantage-vs-original-medicare" },
      { label: "Medicare Supplement Plans", path: "/medicare-supplements" },
      { label: "Compare Medicare Plans", path: "/medicare-supplements" },
    ],
  },
  {
    slug: "medicare-advantage-vs-original-medicare",
    title: "Medicare Advantage vs. Original Medicare",
    subtitle: "MEDICARE ADVANTAGE",
    heroDescription:
      "Comparing Medicare Advantage and Original Medicare helps you choose the right coverage for your health needs, budget, and lifestyle. Each has distinct advantages and trade-offs.",
    sections: [
      {
        id: "side-by-side",
        heading: "Side-by-Side Comparison",
        body: `<table>
<thead><tr><th>Feature</th><th>Original Medicare</th><th>Medicare Advantage</th></tr></thead>
<tbody>
<tr><td>Monthly premium</td><td>Part B: $202.90/mo (2026)</td><td>$0 – $200+ (plus Part B)</td></tr>
<tr><td>Out-of-pocket maximum</td><td>None (without Medigap)</td><td>Up to $9,350/year (2025)</td></tr>
<tr><td>Provider choice</td><td>Any Medicare-accepting provider</td><td>Usually limited to network</td></tr>
<tr><td>Referrals needed</td><td>No</td><td>Often yes (HMO plans)</td></tr>
<tr><td>Prescription drugs</td><td>Requires separate Part D plan</td><td>Usually included</td></tr>
<tr><td>Extra benefits (dental, vision)</td><td>Not covered</td><td>Often included</td></tr>
<tr><td>Medigap eligibility</td><td>Yes</td><td>No (while in MA plan)</td></tr>
<tr><td>Coverage outside the U.S.</td><td>Limited</td><td>Very limited</td></tr>
</tbody>
</table>`,
      },
      {
        id: "when-original-is-better",
        heading: "When Original Medicare May be Better",
        body: `<p>Original Medicare (with a Medigap supplement) may be the better choice if you:</p>
<ul>
<li>Want maximum provider flexibility — see any doctor or specialist who accepts Medicare, anywhere in the U.S.</li>
<li>Have complex health needs requiring multiple specialists or frequent hospitalizations</li>
<li>Travel frequently and need coverage in multiple states or abroad</li>
<li>Want predictable, low out-of-pocket costs (with a comprehensive Medigap plan like Plan G)</li>
<li>Have doctors you want to keep who don't participate in Medicare Advantage networks</li>
</ul>`,
      },
      {
        id: "when-advantage-is-better",
        heading: "When Medicare Advantage May be Better",
        body: `<p>Medicare Advantage may be the better choice if you:</p>
<ul>
<li>Want to minimize monthly premiums (many plans are $0/month)</li>
<li>Want extra benefits like dental, vision, hearing, and fitness programs</li>
<li>Are generally healthy and don't use a lot of healthcare services</li>
<li>Have a limited budget and want an out-of-pocket maximum to protect against catastrophic costs</li>
<li>Are comfortable with a network of providers and managed care approach</li>
<li>Qualify for a Special Needs Plan (D-SNP, C-SNP) that coordinates your specific benefits</li>
</ul>`,
      },
      {
        id: "switching-considerations",
        heading: "Switching between Medicare Advantage and Original Medicare",
        body: `<p>You can switch between Medicare Advantage and Original Medicare during the Annual Enrollment Period (Oct 15–Dec 7) or the Medicare Advantage Open Enrollment Period (Jan 1–Mar 31).</p>
<p><strong>Important caveat:</strong> If you switch back to Original Medicare after being in a Medicare Advantage plan, you may have difficulty getting a Medigap (Medicare Supplement) plan. Outside of guaranteed issue periods, Medigap insurers can use medical underwriting and deny coverage or charge higher premiums based on your health history. This is one of the most important factors to consider when making the initial Medicare coverage decision at age 65.</p>`,
      },
    ],
    faqs: [
      {
        question: "Which is Cheaper, Medicare Advantage or Original Medicare?",
        answer:
          "It depends on your health usage. Medicare Advantage often has lower monthly premiums, but Original Medicare with a Medigap plan offers more predictable total costs for people with significant health needs. Compare total annual costs (premiums + expected out-of-pocket) rather than just monthly premiums.",
      },
      {
        question: "Can I Have Both Medicare Advantage and Original Medicare?",
        answer:
          "No. When you enroll in a Medicare Advantage plan, your benefits are provided through that plan rather than through Original Medicare. You're still technically enrolled in Part A and Part B, but the Advantage plan pays your claims instead of Medicare.",
      },
      {
        question: "If I Switch from Medicare Advantage to Original Medicare, Can I Get a Medigap Plan?",
        answer:
          "Possibly, but it may be difficult. Outside of guaranteed issue periods, Medigap insurers can use medical underwriting in most states. If you have pre-existing conditions, you may be denied or charged higher premiums. This is why many advisors recommend carefully considering the Medigap vs. Medicare Advantage decision at age 65, when you have guaranteed issue rights.",
      },
    ],
    relatedLinks: [
      { label: "Medicare Advantage Overview", path: "/medicare-part-c" },
      { label: "Medicare Supplement Plans", path: "/medicare-supplements" },
      { label: "Medicare Supplement vs. Medicare Advantage", path: "/medicare-plans/supplement-vs-advantage" },
      { label: "Compare Medicare Plans", path: "/medicare-supplements" },
    ],
  },
  {
    slug: "medicare-advantage-plan-hmo",
    title: "Medicare Advantage HMO Plans",
    subtitle: "MEDICARE ADVANTAGE",
    heroDescription:
      "Medicare Advantage HMO plans offer comprehensive coverage with lower premiums by using a network of providers. Learn how HMO plans work, their benefits, and how to find the right plan.",
    sections: [
      {
        id: "what-is-hmo",
        heading: "What is a Medicare Advantage HMO Plan?",
        body: `<p>A Health Maintenance Organization (HMO) Medicare Advantage plan provides all your Medicare Part A and Part B benefits through a network of doctors, hospitals, and other healthcare providers. HMO plans typically require you to choose a primary care physician (PCP) who coordinates your care and provides referrals to in-network specialists.</p>
<p>HMO plans are the most popular type of Medicare Advantage plan because they typically offer lower premiums — often $0/month — and predictable cost-sharing in exchange for using the plan's network.</p>`,
      },
      {
        id: "how-hmo-works",
        heading: "How Does an HMO Plan Work?",
        body: `<p>With a Medicare Advantage HMO plan:</p>
<ul>
<li><strong>Choose a primary care physician (PCP)</strong> — Your PCP coordinates all your care and refers you to in-network specialists when needed.</li>
<li><strong>Use in-network providers</strong> — Except for emergencies, you must use providers in the plan's network. Out-of-network care is generally not covered.</li>
<li><strong>Get referrals for specialists</strong> — Most HMO plans require a referral from your PCP before seeing a specialist.</li>
<li><strong>Pay predictable costs</strong> — HMO plans have fixed copays for most services, making budgeting easier.</li>
</ul>`,
      },
      {
        id: "hmo-benefits",
        heading: "Benefits of a Medicare Advantage HMO Plan",
        body: `<p>Medicare Advantage HMO plans offer several advantages over Original Medicare:</p>
<ul>
<li><strong>Low or $0 monthly premiums</strong> — Many HMO plans have no monthly premium beyond your Part B premium.</li>
<li><strong>Out-of-pocket maximum</strong> — HMO plans cap your annual out-of-pocket costs. Original Medicare has no cap.</li>
<li><strong>Extra benefits</strong> — Most HMO plans include prescription drug coverage (Part D), plus dental, vision, hearing, and fitness benefits.</li>
<li><strong>Coordinated care</strong> — Your PCP coordinates all your care, reducing the risk of duplicate tests or conflicting treatments.</li>
</ul>`,
      },
      {
        id: "hmo-eligibility",
        heading: "Eligibility for Medicare Advantage HMOs",
        body: `<p>To enroll in a Medicare Advantage HMO plan, you must be enrolled in Medicare Part A and Part B, live in the plan's service area, and enroll during an eligible enrollment period (Initial Enrollment Period, Annual Enrollment Period October 15–December 7, or a Special Enrollment Period).</p>`,
      },
      {
        id: "hmo-vs-ppo",
        heading: "HMO vs. PPO: Which Medicare Advantage Plan is Right for You?",
        body: `<table>
<thead><tr><th>Feature</th><th>HMO</th><th>PPO</th></tr></thead>
<tbody>
<tr><td>Monthly premium</td><td>Usually lower (often $0)</td><td>Usually higher</td></tr>
<tr><td>Network requirement</td><td>Must use network</td><td>Preferred network, but flexible</td></tr>
<tr><td>Referrals for specialists</td><td>Usually required</td><td>Not required</td></tr>
<tr><td>Out-of-network coverage</td><td>Emergency only</td><td>Yes, at higher cost</td></tr>
<tr><td>Best for</td><td>Cost-conscious, local care</td><td>Flexibility, travel, specialists</td></tr>
</tbody>
</table>`,
      },
    ],
    faqs: [
      {
        question: "Is a Medicare Advantage HMO the Same as Medicare?",
        answer:
          "A Medicare Advantage HMO is a type of Medicare — it replaces Original Medicare (Parts A and B) and is offered by a private insurer. You still have Medicare, but your benefits are delivered through the HMO plan instead of directly through the federal government.",
      },
      {
        question: "Do HMO Medicare Advantage Plans Require Referrals?",
        answer:
          "Most HMO plans require a referral from your primary care physician to see a specialist. Some plans offer 'open access' HMO options that don't require referrals — check the plan's Evidence of Coverage for details.",
      },
      {
        question: "What Happens if I See an Out-of-network Doctor with an HMO Plan?",
        answer:
          "With a standard HMO plan, you generally have no coverage for out-of-network care except in emergencies. Always verify that your providers are in-network before receiving non-emergency care.",
      },
    ],
    relatedLinks: [
      { label: "Medicare Advantage Overview", path: "/medicare-part-c" },
      { label: "Medicare Advantage HMO-POS Plans", path: "/medicare-part-c/medicare-advantage-plan-hmo-pos" },
      { label: "Medicare Advantage PFFS Plans", path: "/medicare-part-c/medicare-advantage-plan-pffs" },
      { label: "Medicare Advantage PPO Plans", path: "/medicare-part-c/medicare-advantage-plan-ppo" },
      { label: "Medicare HMO vs. PPO", path: "/faqs/medicare-hmo-vs-ppo" },
      { label: "Compare Medicare Plans", path: "/medicare-supplements" },
    ],
  },
];
