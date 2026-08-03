"use client";
/**
 * David Haass Bio Page — /about-us/david-haass
 */

import Link from "next/link";
import { Award, Briefcase, BookOpen, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import ZipFormModal from "@/components/ZipFormModal";

const PHOTO_URL = "https://eliteinsurancepartners.com/wp-content/uploads/2023/06/David-Haass-768x512.jpg";

export default function PageContent() {
  return (
    <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#1B3A6B] text-white py-12 px-4">
          <div className="container max-w-4xl">
            <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/about-us" className="hover:text-white">About Us</Link>
              <span>/</span>
              <span className="text-white">David Haass</span>
            </nav>
            <div className="flex items-start gap-6">
              {/* Photo */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-teal-400">
                <img
                  src={PHOTO_URL}
                  alt="David Haass"
                  className="w-full h-full object-cover object-top scale-150 origin-top"
                />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-1">David Haass</h1>
                <div className="text-teal-300 font-semibold text-lg mb-2">CTO &amp; Co-Founder, MedicareFAQ</div>
                <div className="flex items-center gap-4 text-blue-200 text-sm">
                  <a
                    href="https://www.forbes.com/councils/forbesfinancecouncil/people/davidhaass/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Forbes Finance Council <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container max-w-4xl py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Bio */}
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">About David</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  David Haass is the Chief Technology Officer and Co-Founder of <a href="https://eliteinsurancepartners.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Elite Insurance Partners</a> and MedicareFAQ.com. He co-founded the company with a vision to combine technology innovation with deep Medicare expertise, building tools and educational resources that help beneficiaries make informed coverage decisions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  As CTO, David leads the technology strategy behind MedicareFAQ — from the platform architecture that serves hundreds of thousands of visitors monthly to the data-driven tools that help consumers compare <Link href="/blog/medicare-parts-a-b-c-and-d-explained-simply" className="text-teal-600 hover:underline">Medicare plans</Link>, estimate costs, and understand their enrollment timelines. His work ensures that complex Medicare information is delivered in a way that is accessible, accurate, and actionable.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  David is a member and regular contributor to the <a href="https://www.forbes.com/councils/forbesfinancecouncil/people/davidhaass/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Forbes Finance Council</a>, where he writes about the intersection of technology, consumer finance, and healthcare. His articles cover topics ranging from how technology can improve Medicare education to the financial decisions facing Americans as they approach retirement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">Role at MedicareFAQ</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At MedicareFAQ, David oversees the editorial and technology teams that produce the site's educational content. He works closely with licensed Medicare agents, compliance professionals, and health insurance writers to ensure every article, guide, and tool meets the highest standards of accuracy and usefulness.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Under David's technical leadership, MedicareFAQ has developed proprietary tools including the <Link href="/tools/decision-kit" className="text-teal-600 hover:underline">Medicare Decision Kit</Link>, interactive plan comparison features, and personalized enrollment timeline calculators — all designed to simplify one of the most complex decisions Americans face as they approach 65.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">Forbes Finance Council</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  David is an active member of the Forbes Finance Council, an invitation-only community of executives in accounting, financial planning, wealth management, and related industries. His published contributions cover Medicare technology, consumer healthcare finance, and the evolving landscape of senior insurance.
                </p>
                <a
                  href="https://www.forbes.com/councils/forbesfinancecouncil/people/davidhaass/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-sm"
                >
                  View Forbes Finance Council Profile <ExternalLink size={14} />
                </a>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#1B3A6B] mb-3">Content by David</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  David writes and oversees content across MedicareFAQ's core topics, including:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={14} />
                    <Link href="/blog/medicare-parts-a-b-c-and-d-explained-simply" className="text-teal-600 hover:underline">Medicare Parts A, B, C, and D Explained Simply</Link>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={14} />
                    <Link href="/blog/medicare-costs-in-2026-premiums-deductibles-and-key-changes" className="text-teal-600 hover:underline">Medicare Costs in 2026: Premiums, Deductibles, and Key Changes</Link>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={14} />
                    <Link href="/blog/medicare-supplement-vs-medicare-advantage-coverage-transparency-explained" className="text-teal-600 hover:underline">Medicare Supplement vs. Medicare Advantage: Coverage Transparency</Link>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={14} />
                    <Link href="/blog/medicare-and-federal-retirement-fehb-fers-csrs" className="text-teal-600 hover:underline">Medicare and Federal Retirement: FEHB, FERS, and CSRS</Link>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={14} />
                    <Link href="/faqs/what-is-medicare-advantage" className="text-teal-600 hover:underline">What Is Medicare Advantage?</Link>
                  </li>
                </ul>
                <Link href="/blog" className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-semibold text-sm">
                  View All Articles <ArrowRight size={14} />
                </Link>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Credentials */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="text-teal-500" size={18} />
                  <h3 className="font-bold text-gray-800">Credentials</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "CTO & Co-Founder, Elite Insurance Partners",
                    "Co-Founder, MedicareFAQ.com",
                    "Forbes Finance Council Member",
                    "Medicare Technology Expert",
                  ].map((cred, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="text-teal-500 mt-0.5 shrink-0" size={14} />
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas of Expertise */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="text-teal-500" size={18} />
                  <h3 className="font-bold text-gray-800">Expertise</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Medicare Technology",
                    "Insurance Innovation",
                    "Consumer Education",
                    "Forbes Finance Council",
                    "Healthcare Fintech",
                    "Content Strategy",
                  ].map((tag, i) => (
                    <span key={i} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Links */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="text-teal-500" size={18} />
                  <h3 className="font-bold text-gray-800">Related</h3>
                </div>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://www.forbes.com/councils/forbesfinancecouncil/people/davidhaass/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline text-sm flex items-center gap-1"
                    >
                      Forbes Finance Council Profile <ExternalLink size={12} />
                    </a>
                  </li>
                  <li>
                    <Link href="/about-us" className="text-teal-600 hover:underline text-sm flex items-center gap-1">
                      About MedicareFAQ <ArrowRight size={12} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/meet-the-editorial-team" className="text-teal-600 hover:underline text-sm flex items-center gap-1">
                      Full Editorial Team <ArrowRight size={12} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-teal-600 hover:underline text-sm flex items-center gap-1">
                      Contact Us <ArrowRight size={12} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 bg-[#1B3A6B] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Get Expert Medicare Guidance</h3>
            <p className="text-blue-200 mb-6">
              Connect with our licensed Medicare specialists to get personalized help with your coverage decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ZipFormModal
                coverageType="ms"
                triggerLabel="Compare Plans"
                triggerClassName="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                pageSection="david_haass"
                triggerId="compare-plans-david-haass"
              />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#1B3A6B] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
  );
}
