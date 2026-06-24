"use client";

/**
 * FAQ Landing Page — Grouped Category Sections with Visible Pill Filter Bar
 * Default view: grouped sections (3 featured articles per category + "See all" link)
 * When a category pill is clicked or search is active: flat filtered grid
 */

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  DollarSign,
  ClipboardList,
  BookOpen,
  Accessibility,
  Eye,
} from "lucide-react";
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
  bgColor: string;
  icon: typeof Shield;
  matches: string[];
}[] = [
  {
    label: "Coverage",
    color: "#059669",
    bgColor: "#D1FAE5",
    icon: Shield,
    matches: ["Medicare Coverage", "Coverage", "General Medicare", "Medicare FAQ", "Coverage Q&A", "Medicare Basics", "Medicare Benefits"],
  },
  {
    label: "Plans & Supplements",
    color: "#7C3AED",
    bgColor: "#EDE9FE",
    icon: Heart,
    matches: ["Medicare Supplements", "Medicare Supplement (Medigap)", "Medicare Advantage"],
  },
  {
    label: "Enrollment",
    color: "#2563EB",
    bgColor: "#DBEAFE",
    icon: ClipboardList,
    matches: ["Medicare Enrollment", "Enrollment", "Medicare Eligibility"],
  },
  {
    label: "Costs & Drugs",
    color: "#DC2626",
    bgColor: "#FEE2E2",
    icon: DollarSign,
    matches: ["Prescription Drugs", "Medicare Part D", "Costs & Savings", "Medicare Costs"],
  },
  {
    label: "Dental, Vision & Hearing",
    color: "#0891B2",
    bgColor: "#CFFAFE",
    icon: Eye,
    matches: ["Dental, Vision & Hearing"],
  },
  {
    label: "Special Situations",
    color: "#6B7280",
    bgColor: "#F3F4F6",
    icon: Accessibility,
    matches: ["Medicaid & Assistance", "Medicare & Disability", "Medicare Part A", "Medicare Part B", "Medicare News"],
  },
];

/* Map raw category → parent group label */
function getGroupLabel(rawCategory: string): string {
  for (const group of CATEGORY_GROUPS) {
    if (group.matches.includes(rawCategory)) return group.label;
  }
  return "Coverage";
}

function getGroupMeta(groupLabel: string) {
  return CATEGORY_GROUPS.find((g) => g.label === groupLabel) ?? CATEGORY_GROUPS[0];
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

/* ─── Single article card ─── */
function ArticleCard({ article }: { article: FAQCard }) {
  const meta = getGroupMeta(getGroupLabel(article.category));
  const IconComponent = meta.icon;
  return (
    <Link
      href={`/faqs/${article.slug}`}
      className="group block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:border-[#C41230]/20 transition-all duration-200 h-full"
    >
      <div className="h-1" style={{ backgroundColor: meta.color }} />
      <div className="p-5 flex flex-col h-[calc(100%-4px)]">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: meta.bgColor }}
          >
            <IconComponent className="w-4 h-4" style={{ color: meta.color }} aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded text-white mb-1.5"
              style={{ backgroundColor: meta.color }}
            >
              {meta.label}
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
            <User className="w-3 h-3" aria-hidden="true" />
            {article.authorName}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {article.readTime}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#C41230] text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
          Read article <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}

export default function FAQIndex() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") ?? "");
  const [activeCategory, setActiveCategory] = useState(() => searchParams.get("cat") ?? "All Topics");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Sync state when URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
    setActiveCategory(searchParams.get("cat") ?? "All Topics");
  }, [searchParams]);

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("q", value); else params.delete("q");
    router.replace(`/faqs?${params.toString()}`, { scroll: false });
  }

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat !== "All Topics") params.set("cat", cat); else params.delete("cat");
    router.replace(`/faqs?${params.toString()}`, { scroll: false });
    // If selecting a specific category in grouped view, scroll to that section
    if (cat !== "All Topics" && !searchQuery) {
      setTimeout(() => {
        sectionRefs.current[cat]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }

  const categories = useMemo(() => buildFilterPills(allArticles), []);

  // Whether we're in "filtered" mode (search active or specific category selected)
  const isFiltered = searchQuery !== "" || activeCategory !== "All Topics";

  const filteredArticles = useMemo(() => {
    if (!isFiltered) return allArticles;
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
  }, [activeCategory, searchQuery, isFiltered]);

  // Articles per group for the grouped view
  const groupedArticles = useMemo(() => {
    return CATEGORY_GROUPS.map((group) => ({
      group,
      articles: allArticles.filter((a) => getGroupLabel(a.category) === group.label),
    })).filter((g) => g.articles.length > 0);
  }, []);

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
                <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-white/80">Medicare FAQs</span>
              </nav>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white">
                  Medicare FAQs
                </h1>
              </div>
              <p className="text-white/70 text-lg max-w-2xl">
                Browse over 200 expert-written articles covering Medicare plans, enrollment, costs, coverage, and more. Find clear, unbiased answers to your Medicare questions.
              </p>
              <div className="flex items-center gap-6 mt-6 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  {allArticles.length} Articles
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" aria-hidden="true" />
                  Written by Licensed Agents
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Sticky Filter Bar ─── */}
        <div className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] shadow-sm">
          <div className="container max-w-6xl mx-auto py-3 flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg text-sm text-[#1B2A4A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#C41230]/30 focus:border-[#C41230]/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Visible category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.name;
                const meta = cat.name === "All Topics" ? null : getGroupMeta(cat.name);
                const IconComp = meta ? meta.icon : HelpCircle;
                const color = meta ? meta.color : "#1B2A4A";
                return (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryChange(cat.name)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 whitespace-nowrap"
                    style={
                      isActive
                        ? { background: cat.name === "All Topics" ? "#1B2A4A" : color, borderColor: cat.name === "All Topics" ? "#1B2A4A" : color, color: "#fff" }
                        : { background: "transparent", borderColor: cat.name === "All Topics" ? "#D1D5DB" : color, color: cat.name === "All Topics" ? "#6B7280" : color }
                    }
                  >
                    <IconComp className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {cat.name}
                    <span
                      className="text-[11px] font-bold px-1.5 py-0.5 rounded-full"
                      style={
                        isActive
                          ? { background: "rgba(255,255,255,0.25)", color: "#fff" }
                          : { background: cat.name === "All Topics" ? "#F3F4F6" : `${color}18`, color: cat.name === "All Topics" ? "#6B7280" : color }
                      }
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
              {isFiltered && (
                <button
                  onClick={() => { handleSearchChange(""); handleCategoryChange("All Topics"); }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold border border-[#E5E7EB] text-[#C41230] hover:bg-[#FEF2F2] transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ─── Content Area ─── */}
        <section className="bg-[#F5F7FA] py-8 md:py-10">
          <div className="container max-w-6xl mx-auto">

            {/* ── FILTERED VIEW (search active or specific category selected) ── */}
            {isFiltered && (
              <>
                <p className="text-sm text-[#6B7280] mb-6">
                  Showing{" "}
                  <span className="font-semibold text-[#1B2A4A]">{filteredArticles.length}</span>{" "}
                  {filteredArticles.length === 1 ? "article" : "articles"}
                  {activeCategory !== "All Topics" && (
                    <> in <span className="font-semibold text-[#1B2A4A]">{activeCategory}</span></>
                  )}
                  {searchQuery && (
                    <> matching &ldquo;<span className="font-semibold text-[#1B2A4A]">{searchQuery}</span>&rdquo;</>
                  )}
                </p>
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-16">
                    <HelpCircle className="w-12 h-12 text-[#D1D5DB] mx-auto mb-4" aria-hidden="true" />
                    <p className="text-[#9CA3AF] text-lg mb-2">No articles found.</p>
                    <p className="text-[#9CA3AF] text-sm">Try a different search term or category.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredArticles.map((article, index) => (
                      <motion.div
                        key={article.slug}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3) }}
                      >
                        <ArticleCard article={article} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── GROUPED VIEW (default, no filter active) ── */}
            {!isFiltered && groupedArticles.map(({ group, articles }, sectionIndex) => (
              <section
                key={group.label}
                ref={(el) => { sectionRefs.current[group.label] = el; }}
                className={sectionIndex > 0 ? "mt-12 pt-10 border-t border-[#E5E7EB]" : ""}
              >
                {/* Section header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: group.bgColor }}
                    >
                      <group.icon className="w-5 h-5" style={{ color: group.color }} aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold" style={{ color: group.color }}>
                        {group.label}
                      </h2>
                      <p className="text-sm text-[#9CA3AF]">{articles.length} articles</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCategoryChange(group.label)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:opacity-80"
                    style={{ color: group.color }}
                  >
                    See all {articles.length} articles
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {/* 3 featured articles */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {articles.slice(0, 3).map((article, index) => (
                    <motion.div
                      key={article.slug}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: index * 0.06 }}
                    >
                      <ArticleCard article={article} />
                    </motion.div>
                  ))}
                </div>

                {/* "See all" footer link if more than 3 */}
                {articles.length > 3 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => handleCategoryChange(group.label)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2 rounded-lg border transition-all hover:opacity-80"
                      style={{ borderColor: group.color, color: group.color, background: group.bgColor }}
                    >
                      View all {articles.length} {group.label} articles
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </section>
            ))}

          </div>
        </section>

        {/* ─── CTA Banner ─── */}
        <section className="bg-[#1B2A4A] py-12 md:py-16">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Our licensed Medicare agents are here to answer your specific coverage questions and help you find the right plan.
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
