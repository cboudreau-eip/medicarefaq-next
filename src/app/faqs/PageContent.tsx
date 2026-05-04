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
  Heart,
  Pill,
  Eye,
  DollarSign,
  ClipboardList,
  BookOpen,
  Accessibility,
  ChevronDown,
} from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { motion } from "framer-motion";
import { coverageArticles } from "@/lib/coverage-data";
import { simpleFAQArticles } from "@/lib/simple-faq-data";
import { trackPhoneClick } from "@/lib/analytics";

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

/* ─── Consolidated parent category groups ─── */
const CATEGORY_GROUPS: {
  label: string;
  color: string;
  icon: typeof Shield;
  matches: string[];
}[] = [
  {
    label: "Coverage",
    color: "#059669",
    icon: Shield,
    matches: ["Medicare Coverage", "Coverage", "General Medicare", "Medicare FAQ"],
  },
  {
    label: "Plans & Supplements",
    color: "#7C3AED",
    icon: Heart,
    matches: ["Medicare Supplements", "Medicare Supplement (Medigap)", "Medicare Advantage"],
  },
  {
    label: "Enrollment",
    color: "#2563EB",
    icon: ClipboardList,
    matches: ["Medicare Enrollment", "Enrollment"],
  },
  {
    label: "Costs & Drugs",
    color: "#DC2626",
    icon: DollarSign,
    matches: ["Prescription Drugs", "Medicare Part D", "Costs & Savings"],
  },
  {
    label: "Dental, Vision & Hearing",
    color: "#0891B2",
    icon: Eye,
    matches: ["Dental, Vision & Hearing"],
  },
  {
    label: "Special Situations",
    color: "#6B7280",
    icon: Accessibility,
    matches: ["Medicaid & Assistance", "Medicare & Disability", "Medicare Part A", "Medicare Part B"],
  },
];

/* Map raw category → parent group label */
function getGroupLabel(rawCategory: string): string {
  for (const group of CATEGORY_GROUPS) {
    if (group.matches.includes(rawCategory)) return group.label;
  }
  return "Coverage"; // fallback
}

function getGroupColor(groupLabel: string): string {
  if (groupLabel === "All Topics") return "#1B2A4A";
  return CATEGORY_GROUPS.find((g) => g.label === groupLabel)?.color || "#6B7280";
}

function getGroupIcon(groupLabel: string) {
  return CATEGORY_GROUPS.find((g) => g.label === groupLabel)?.icon || HelpCircle;
}

/* ─── Build filter pill list with counts ─── */
function buildFilterPills(articles: FAQCard[]) {
  const counts = new Map<string, number>();
  for (const a of articles) {
    const group = getGroupLabel(a.category);
    counts.set(group, (counts.get(group) || 0) + 1);
  }
  return [
    { name: "All Topics", count: articles.length },
    ...CATEGORY_GROUPS.map((g) => ({ name: g.label, count: counts.get(g.label) || 0 })).filter(
      (g) => g.count > 0
    ),
  ];
}

export default function FAQIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Topics");

  const categories = useMemo(() => buildFilterPills(allArticles), []);

  const filteredArticles = useMemo(() => {
    return allArticles.filter((a) => {
      const matchesCategory =
        activeCategory === "All Topics" || getGroupLabel(a.category) === activeCategory;
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
                Browse over 200 expert-written articles covering
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

            {/* Category filter — compact dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider shrink-0">Filter by</span>
              <SelectPrimitive.Root value={activeCategory} onValueChange={setActiveCategory}>
                <SelectPrimitive.Trigger className="inline-flex items-center gap-2 w-[240px] h-9 px-3 text-sm border border-[#E5E7EB] rounded-lg bg-[#F8F9FB] hover:bg-white focus:outline-none focus:ring-1 focus:ring-[#1B2A4A] transition-colors">
                  {(() => {
                    const active = categories.find(c => c.name === activeCategory);
                    const color = getGroupColor(activeCategory);
                    const IconComp = getGroupIcon(activeCategory);
                    return (
                      <>
                        <IconComp className="w-3.5 h-3.5 shrink-0" style={{ color: activeCategory === "All Topics" ? "#6B7280" : color }} />
                        <span className="font-medium text-[#1B2A4A] flex-1 text-left">{activeCategory}</span>
                        <span className="text-xs bg-[#1B2A4A] text-white px-1.5 py-0.5 rounded-full">{active?.count ?? 0}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                      </>
                    );
                  })()}
                </SelectPrimitive.Trigger>
                <SelectPrimitive.Portal>
                  <SelectPrimitive.Content
                    position="popper"
                    sideOffset={4}
                    className="z-50 w-[240px] bg-white border border-[#E5E7EB] rounded-lg shadow-lg overflow-hidden"
                  >
                    <SelectPrimitive.Viewport className="p-1">
                      {categories.map((cat) => {
                        const color = getGroupColor(cat.name);
                        const IconComp = getGroupIcon(cat.name);
                        return (
                          <SelectPrimitive.Item
                            key={cat.name}
                            value={cat.name}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-md cursor-pointer text-[#1B2A4A] hover:bg-[#F5F7FA] focus:bg-[#F5F7FA] focus:outline-none data-[state=checked]:bg-[#EEF2FF] select-none"
                          >
                            <IconComp className="w-3.5 h-3.5 shrink-0" style={{ color: cat.name === "All Topics" ? "#6B7280" : color }} />
                            <SelectPrimitive.ItemText>
                              <span className="flex-1">{cat.name}</span>
                            </SelectPrimitive.ItemText>
                            <span className="ml-auto text-xs text-[#9CA3AF] bg-[#F0F0F0] px-1.5 py-0.5 rounded-full">{cat.count}</span>
                          </SelectPrimitive.Item>
                        );
                      })}
                    </SelectPrimitive.Viewport>
                  </SelectPrimitive.Content>
                </SelectPrimitive.Portal>
              </SelectPrimitive.Root>
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
                  const groupLabel = getGroupLabel(article.category);
                  const groupColor = getGroupColor(groupLabel);
                  const IconComponent = getGroupIcon(groupLabel);
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
                          style={{ backgroundColor: groupColor }}
                        />
                        <div className="p-5 flex flex-col h-[calc(100%-4px)]">
                          <div className="flex items-start gap-3 mb-3">
                            <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${groupColor}18` }}
                            >
                              <IconComponent
                                className="w-4 h-4"
                                style={{ color: groupColor }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span
                                className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded text-white mb-1.5"
                                style={{ backgroundColor: groupColor }}
                              >
                                {groupLabel}
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
              onClick={() => trackPhoneClick({ phone_number: "(888) 919-1484", page_section: "faqs" })}
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
