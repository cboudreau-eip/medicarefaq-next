"use client";

/**
 * Simple FAQ Article Content
 * Renders FAQ articles with headings + paragraphs, TOC sidebar, helpful vote, CTA banner.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  User,
  Calendar,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Phone,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import type { SimpleFAQArticleData } from "@/lib/article-types";

export default function SimpleFAQContent({ article }: { article: SimpleFAQArticleData }) {
  const [helpfulVote, setHelpfulVote] = useState<"yes" | "no" | null>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.slug]);

  // Build TOC from sections
  const toc = article.sections
    .filter((s) => s.heading)
    .map((s, i) => ({
      id: `section-${i}`,
      label: s.heading,
    }));

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 }
    );
    toc.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article, toc]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="flex-1">
      {/* ─── Article Header ─── */}
      <section className="bg-[#1B2A4A] py-10 md:py-14">
        <div className="container max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#059669] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                {article.category || "FAQ"}
              </span>
            </div>
            <nav className="text-sm text-white/50 mb-5 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/faqs" className="hover:text-white/80 transition-colors">FAQs</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/70">{article.title}</span>
            </nav>
            <h1 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-white leading-tight mb-5">
              {article.title}
            </h1>
            {article.summary && (
              <p className="text-white/60 text-lg max-w-3xl mb-6">{article.summary}</p>
            )}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
              {article.dateUpdated && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />Updated {article.dateUpdated}
                </span>
              )}
              {article.author && (
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />Written By: {article.author}
                </span>
              )}
              {article.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />{article.readTime}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Content + Sidebar ─── */}
      <section className="py-8 md:py-12">
        <div className="container max-w-6xl mx-auto">
          <div className="flex gap-8 lg:gap-10">
            {/* ─── Main Article Content ─── */}
            <article className="flex-1 min-w-0">
              <div className="prose prose-lg max-w-none">
                {article.sections.map((section, i) => (
                  <div key={i} id={`section-${i}`} className="mb-8">
                    {section.heading && (
                      <h2 className="text-xl md:text-2xl font-bold text-[#1B2A4A] mb-3">
                        {section.heading}
                      </h2>
                    )}
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-[#4B5563] text-[15px] leading-relaxed mb-3">
                        {p}
                      </p>
                    ))}
                    {section.listItems && section.listItems.length > 0 && (
                      <ul className="list-disc pl-6 space-y-1.5 text-[#4B5563] text-[15px] mb-3">
                        {section.listItems.map((item, k) => (
                          <li key={k}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* ─── Helpful Vote ─── */}
              <div className="mt-12 p-6 bg-white border border-[#E5E7EB] rounded-xl text-center">
                <p className="text-[#1B2A4A] font-semibold mb-3">
                  Was this article helpful?
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setHelpfulVote("yes")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      helpfulVote === "yes"
                        ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300"
                        : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] border-2 border-transparent"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" /> Yes
                  </button>
                  <button
                    onClick={() => setHelpfulVote("no")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      helpfulVote === "no"
                        ? "bg-red-100 text-red-700 border-2 border-red-300"
                        : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] border-2 border-transparent"
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" /> No
                  </button>
                </div>
                {helpfulVote && (
                  <p className="text-sm text-[#6B7280] mt-3">
                    Thank you for your feedback!
                  </p>
                )}
              </div>

              {/* ─── CTA Banner ─── */}
              <div className="mt-10 bg-gradient-to-r from-[#1B2A4A] to-[#2D3F63] rounded-2xl p-8 md:p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                  Need Help Understanding Your Medicare Options?
                </h2>
                <p className="text-[#CBD5E1] text-lg mb-6 max-w-xl mx-auto">
                  Our licensed Medicare experts can help you find the right
                  coverage for your needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:+18884410465"
                    className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#A30F28] text-white font-bold px-8 py-3.5 rounded-lg transition-colors text-lg"
                  >
                    <Phone className="w-5 h-5" />
                    Call (888) 441-0465
                  </a>
                  <Link
                    href="/compare-rates"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-lg transition-colors text-lg border border-white/20"
                  >
                    Compare Plans
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* ─── Related Articles ─── */}
              {article.relatedSlugs && article.relatedSlugs.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-4">
                    Related Articles
                  </h3>
                  <div className="grid gap-3">
                    {article.relatedSlugs.map((slug, i) => (
                      <Link
                        key={i}
                        href={`/faqs/${slug}`}
                        className="flex items-center gap-3 p-4 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#C41230]/30 hover:shadow-sm transition-all group"
                      >
                        <ArrowRight className="w-4 h-4 text-[#C41230] shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span className="text-[#1B2A4A] font-medium text-sm group-hover:text-[#C41230] transition-colors">
                          {slug
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* ─── Sidebar ─── */}
            <aside className="hidden lg:block w-[280px] shrink-0">
              <div className="sticky top-[180px] space-y-6">
                {/* ON THIS PAGE */}
                {toc.length > 0 && (
                  <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold tracking-wider text-[#6B7280] uppercase mb-4">
                      On This Page
                    </h3>
                    <nav className="space-y-1">
                      {toc.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`block w-full text-left text-sm py-1.5 px-3 rounded-md transition-all ${
                            activeSection === item.id
                              ? "bg-[#C41230]/10 text-[#C41230] font-semibold border-l-2 border-[#C41230]"
                              : "text-[#6B7280] hover:text-[#1B2A4A] hover:bg-[#F5F7FA]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}

                {/* CTA Sidebar */}
                <div className="bg-[#1B2A4A] rounded-xl p-5 text-center">
                  <p className="text-white font-bold text-sm mb-1">Have Questions?</p>
                  <p className="text-white/60 text-xs mb-4">
                    Speak with a licensed Medicare agent
                  </p>
                  <a
                    href="tel:8883358996"
                    className="flex items-center justify-center gap-2 bg-[#C41230] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#A50F28] transition-colors w-full mb-2"
                  >
                    <Phone className="w-4 h-4" /> (888) 335-8996
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
