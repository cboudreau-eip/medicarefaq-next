"use client";

/**
 * FAQ Landing Page — Option A
 * All 250 articles (coverage + simple FAQ) on one page with category filter pills.
 * Follows the Clarity System design language — light, modern, professional.
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  User,
  Search,
  Shield,
  ChevronRight,
  HelpCircle,
  Stethoscope,
  Heart,
  Pill,
  Eye,
  DollarSign,
  ClipboardList,
  FileText,
  BookOpen,
  Accessibility,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { coverageArticles } from "@/lib/coverage-data";
import { simpleFAQArticles } from "@/lib/simple-faq-data";

/* ─── Unified article type for display ─── */
interface FAQCard {
  slug: string;
  title: string;
  description: string;
  category: string;
  dateUpdated: string;
  authorName: string;
  readTime: string;
  source: "coverage" | "simple";
}

/* ─── Merge both data sources into a unified list ─── */
const allArticles: FAQCard[] = [
  ...coverageArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.subtitle,
    category: a.category,
    dateUpdated: a.dateUpdated,
    authorName: a.author.name,
    readTime: a.readTime,
    source: "coverage" as const,
  })),
  ...simpleFAQArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.summary,
    category: a.category,
    dateUpdated: a.dateUpdated,
    authorName: a.author,
    readTime: a.readTime,
    source: "simple" as const,
  })),
];

/* ─── Category colour & icon map ─── */
const categoryMeta: Record<string, { color: string; icon: typeof Shield }> = {
  "Medicare Coverage": { color: "#059669", icon: Shield },
  "General Medicare": { color: "#1B2A4A", icon: BookOpen },
  "Medicare FAQ": { color: "#4B5563", icon: HelpCircle },
  "Coverage": { color: "#059669", icon: Shield },
  "Medicare Supplements": { color: "#7C3AED", icon: Heart },
  "Medicare Supplement (Medigap)": { color: "#7C3AED", icon: Heart },
  "Medicare Advantage": { color: "#D97706", icon: Activity },
  "Medicare Enrollment": { color: "#2563EB", icon: ClipboardList },
  "Enrollment": { color: "#2563EB", icon: ClipboardList },
  "Prescription Drugs": { color: "#DC2626", icon: Pill },
  "Medicare Part D": { color: "#DC2626", icon: Pill },
  "Dental, Vision & Hearing": { color: "#0891B2", icon: Eye },
  "Medicaid & Assistance": { color: "#059669", icon: Accessibility },
  "Medicare Part B": { color: "#2563EB", icon: FileText },
  "Medicare Part A": { color: "#1B2A4A", icon: FileText },
  "Costs & Savings": { color: "#D97706", icon: DollarSign },
  "Medicare & Disability": { color: "#7C3AED", icon: Accessibility },
};

function getCategoryColor(name: string) {
  return categoryMeta[name]?.color || "#6B7280";
}

function getCategoryIcon(name: string) {
  return categoryMeta[name]?.icon || HelpCircle;
}

/* ─── Derive unique categories with counts ─── */
function deriveCategories(articles: FAQCard[]) {
  const cats = new Map<string, number>();
  for (const a of articles) {
    cats.set(a.category, (cats.get(a.category) || 0) + 1);
  }
  return [
    { name: "All Topics", count: articles.length },
    ...Array.from(cats.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count })),
  ];
}

export default function FAQIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Topics");

  const categories = useMemo(() => deriveCategories(allArticles), []);

  const filteredArticles = useMemo(() => {
    return allArticles.filter((a) => {
      const matchesCategory =
        activeCategory === "All Topics" || a.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === "" ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      <main className="flex-1">
        {/* ─── Page Header ─── */}
        <section className="bg-[#1B2A4A] py-12 md:py-16">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <nav className="text-sm text-white/50 mb-4 flex items-center gap-2">
                <Link
                  href="/"
                  className="hover:text-white/80 transition-colors"
                >
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/80">Medicare FAQs</span>
              </nav>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white">
                  Medicare FAQs
                </h1>
              </div>
              <p className="text-white/70 text-lg max-w-2xl">
                Browse {allArticles.length} expert-written articles covering
                Medicare plans, enrollment, costs, coverage, and more. Find
                clear, unbiased answers to your Medicare questions.
              </p>
              <div className="flex items-center gap-6 mt-6 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {allArticles.length} Articles
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  Written by Licensed Agents
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Sticky Filter Bar ─── */}
        <div className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] shadow-sm">
          <div className="container max-w-6xl mx-auto py-3">
            {/* Search bar */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg text-sm text-[#1B2A4A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#C41230]/30 focus:border-[#C41230]/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category pills — horizontal scrollable */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.name;
                const color =
                  cat.name === "All Topics"
                    ? "#1B2A4A"
                    : getCategoryColor(cat.name);
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                      isActive
                        ? "text-white shadow-sm"
                        : "text-[#6B7280] bg-white border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: color, borderColor: color }
                        : {}
                    }
                  >
                    {cat.name}
                    <span
                      className={`text-xs ${
                        isActive ? "text-white/80" : "text-[#9CA3AF]"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Results count ─── */}
        <section className="bg-[#F5F7FA] pt-6 pb-2">
          <div className="container max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#6B7280]">
                {searchQuery || activeCategory !== "All Topics" ? (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-[#1B2A4A]">
                      {filteredArticles.length}
                    </span>{" "}
                    {filteredArticles.length === 1 ? "article" : "articles"}
                    {activeCategory !== "All Topics" && (
                      <>
                        {" "}
                        in{" "}
                        <span className="font-semibold text-[#1B2A4A]">
                          {activeCategory}
                        </span>
                      </>
                    )}
                    {searchQuery && (
                      <>
                        {" "}
                        matching &ldquo;
                        <span className="font-semibold text-[#1B2A4A]">
                          {searchQuery}
                        </span>
                        &rdquo;
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-[#1B2A4A]">
                      {allArticles.length}
                    </span>{" "}
                    articles
                  </>
                )}
              </p>
              {(searchQuery || activeCategory !== "All Topics") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All Topics");
                  }}
                  className="text-sm text-[#C41230] hover:text-[#A30F28] font-medium transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ─── Article Grid ─── */}
        <section className="bg-[#F5F7FA] py-6 md:py-8">
          <div className="container max-w-6xl mx-auto">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="w-12 h-12 text-[#D1D5DB] mx-auto mb-4" />
                <p className="text-[#9CA3AF] text-lg mb-2">
                  No articles found.
                </p>
                <p className="text-[#9CA3AF] text-sm">
                  Try a different search term or category.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredArticles.map((article, index) => {
                  const IconComponent = getCategoryIcon(article.category);
                  return (
                    <motion.div
                      key={article.slug}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.25,
                        delay: Math.min(index * 0.02, 0.3),
                      }}
                    >
                      <Link
                        href={`/faqs/${article.slug}`}
                        className="group block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:border-[#C41230]/20 transition-all duration-200 h-full"
                      >
                        {/* Coloured top accent */}
                        <div
                          className="h-1"
                          style={{
                            backgroundColor: getCategoryColor(article.category),
                          }}
                        />
                        <div className="p-5 flex flex-col h-[calc(100%-4px)]">
                          <div className="flex items-start gap-3 mb-3">
                            <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor: `${getCategoryColor(
                                  article.category
                                )}12`,
                              }}
                            >
                              <IconComponent
                                className="w-4 h-4"
                                style={{
                                  color: getCategoryColor(article.category),
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span
                                className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded text-white mb-1.5"
                                style={{
                                  backgroundColor: getCategoryColor(
                                    article.category
                                  ),
                                }}
                              >
                                {article.category}
                              </span>
                              <h3 className="font-bold text-[#1B2A4A] text-[15px] leading-snug group-hover:text-[#C41230] transition-colors line-clamp-2">
                                {article.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-[#6B7280] text-[13px] leading-relaxed mb-4 line-clamp-2 flex-1">
                            {article.description}
                          </p>
                          <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-3 border-t border-[#F0F0F0]">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {article.authorName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#C41230] text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                            Read article <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ─── CTA Banner ─── */}
        <section className="bg-[#1B2A4A] py-12 md:py-16">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Our licensed Medicare agents are here to answer your specific
              coverage questions and help you find the right plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+18889191484"
                className="inline-flex items-center gap-2 bg-[#C41230] hover:bg-[#A30F28] text-white font-bold px-8 py-3.5 rounded-lg transition-colors text-sm"
              >
                Call (888) 919-1484
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm border border-white/20"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
