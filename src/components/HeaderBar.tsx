"use client";

import { Search, Phone, X } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/medicarefaq-logo-updated_eca101e5.png";

/** All searchable pages on the site */
const SEARCH_PAGES = [
  { title: "Medicare 101 Guide", description: "Everything you need to know about Medicare basics", url: "/medicare-101", category: "New To Medicare" },
  { title: "Am I Eligible?", description: "Find out if you qualify for Medicare coverage", url: "/new-to-medicare/eligibility", category: "New To Medicare" },
  { title: "Turning 65 Timeline", description: "Key dates and deadlines as you approach 65", url: "/new-to-medicare/turning-65", category: "New To Medicare" },
  { title: "What Does Medicare Cost?", description: "Understand premiums, deductibles, and out-of-pocket costs", url: "/new-to-medicare/costs", category: "New To Medicare" },
  { title: "Getting Started Checklist", description: "Step-by-step checklist for new Medicare enrollees", url: "/new-to-medicare/checklist", category: "New To Medicare" },
  { title: "Medicare Supplement Plans", description: "Fill the gaps in Original Medicare coverage with Medigap", url: "/medicare-supplements", category: "Plans" },
  { title: "Compare Medigap Plans", description: "Side-by-side comparison of Medigap plans A through N", url: "/medicare-supplements/compare", category: "Plans" },
  { title: "Medigap Eligibility", description: "Who qualifies for Medicare Supplement insurance", url: "/medicare-supplements/medigap-eligibility", category: "Plans" },
  { title: "Medicare Supplement Plans 2026", description: "Updated rates and plan details for 2026", url: "/medicare-supplements/medicare-supplement-plans-2026", category: "Plans" },
  { title: "Medigap by Carrier", description: "Compare Medicare Supplement plans by insurance company", url: "/medicare-supplements/medigap-by-carrier", category: "Plans" },
  { title: "Medigap by State", description: "Find Medicare Supplement plans available in your state", url: "/medicare-supplements/medigap-by-state", category: "Plans" },
  { title: "All Medicare Plans", description: "Overview of every Medicare plan type", url: "/medicare-plans", category: "Plans" },
  { title: "Medicare Plans Costs", description: "What you'll pay for each Medicare plan type", url: "/medicare-plans/costs", category: "Plans" },
  { title: "Supplement vs. Advantage", description: "Pros, cons, and costs of Medigap vs Medicare Advantage", url: "/medicare-plans/supplement-vs-advantage", category: "Plans" },
  { title: "Best Medicare Supplement Plans", description: "Plan F, G, and N compared with current rates", url: "/medicare-plans/best-supplement-plans", category: "Plans" },
  { title: "Medicare Advantage Plans (Part C)", description: "All-in-one alternative to Original Medicare", url: "/medicare-part-c/medicare-advantage-plans", category: "Plans" },
  { title: "Medicare Advantage Plan Types", description: "HMO, PPO, PFFS, and SNP plans explained", url: "/medicare-part-c/medicare-advantage-plan-types", category: "Plans" },
  { title: "Original Medicare (Parts a & B)", description: "Hospital and medical insurance basics", url: "/original-medicare", category: "Plans" },
  { title: "Medicare Part D", description: "Prescription drug coverage options and plans", url: "/original-medicare/medicare-parts/medicare-part-d", category: "Plans" },
  { title: "Turning 65 Enrollment", description: "How to enroll when you first become eligible for Medicare", url: "/enrollment/turning-65", category: "Enrollment" },
  { title: "Working past 65", description: "Medicare and employer coverage coordination", url: "/enrollment/working-past-65", category: "Enrollment" },
  { title: "Annual Changes", description: "What changes each year and how it affects your Medicare", url: "/enrollment/annual-changes", category: "Enrollment" },
  { title: "Late Enrollment Penalties", description: "Avoid costly late enrollment penalties", url: "/enrollment/late-penalties", category: "Enrollment" },
  { title: "How to Enroll in Medicare", description: "Step-by-step enrollment process guide", url: "/enrollment/how-to-enroll", category: "Enrollment" },
  { title: "Coverage FAQs", description: "Browse all Medicare coverage questions and answers", url: "/faqs", category: "Coverage" },
  { title: "Does Medicare Cover Dental Implants?", description: "Coverage for dental implants under Medicare", url: "/faqs/does-medicare-cover-dental-implants", category: "Coverage" },
  { title: "Does Medicare Cover Hearing Aids?", description: "Hearing aid coverage under Medicare plans", url: "/faqs/does-medicare-cover-hearing-aids", category: "Coverage" },
  { title: "Pre-Existing Conditions", description: "How Medicare handles pre-existing conditions", url: "/faqs/does-medicare-cover-pre-existing-conditions", category: "Coverage" },
  { title: "Medicare Costs in 2026", description: "Premiums, deductibles, and key changes for 2026", url: "/faqs/medicare-costs-in-2026-premiums-deductibles-and-key-changes", category: "Coverage" },
  { title: "Medicare Advantage Extra Benefits", description: "What's really included in MA extra benefits", url: "/faqs/medicare-advantage-extra-benefits-explained-whats-really-included", category: "Coverage" },
  { title: "Medigap vs Medicare Advantage", description: "Crucial questions to ask before enrolling", url: "/faqs/medicare-supplement-vs-medicare-advantage-crucial-questions-to-ask-before-enrolling", category: "Coverage" },
  { title: "Enrolling While Working", description: "When to enroll if you're still employed past 65", url: "/faqs/when-should-you-enroll-in-medicare-if-still-working", category: "Coverage" },
  { title: "Veterans Coverage Guide", description: "Choosing the right coverage for veterans", url: "/faqs/medicare-supplement-vs-medicare-advantage-for-veterans-choosing-the-right-coverage", category: "Coverage" },
  { title: "Blog", description: "Latest Medicare news, tips, and analysis", url: "/blog", category: "Library" },
  { title: "Guides", description: "In-depth guides on Medicare topics", url: "/library/guides", category: "Library" },
  { title: "Podcast", description: "Medicare explained in audio format", url: "/podcasts", category: "Library" },
  { title: "Videos", description: "Visual explanations of Medicare concepts", url: "/videos", category: "Library" },
  { title: "Caregiver Guide", description: "Guide to being a Medicare caregiver", url: "/guide-to-being-a-caregiver", category: "Library" },
  { title: "Compare Rates", description: "Compare Medicare plan rates in your area", url: "/compare-rates", category: "Tools" },
  { title: "Contact Us", description: "Get in touch with our licensed Medicare agents", url: "/contact", category: "About" },
  { title: "Testimonials", description: "What our clients say about MedicareFAQ", url: "/testimonials", category: "About" },
  { title: "About Us", description: "Learn about MedicareFAQ and Elite Insurance Partners", url: "/about-us", category: "About" },
  { title: "Medicare Plan G", description: "Details on Medicare Supplement Plan G coverage and costs", url: "/medicare-supplements/plan-g", category: "Plans" },
  { title: "Medicare Plan F", description: "Details on Medicare Supplement Plan F coverage", url: "/medicare-supplements/plan-f", category: "Plans" },
  { title: "Medicare Plan N", description: "Details on Medicare Supplement Plan N coverage and costs", url: "/medicare-supplements/plan-n", category: "Plans" },
  { title: "High Deductible Plan F", description: "Lower premiums with higher deductible Medigap option", url: "/medicare-supplements/high-deductible-plan-f", category: "Plans" },
  { title: "High Deductible Plan G", description: "Lower premiums with higher deductible Medigap option", url: "/medicare-supplements/high-deductible-plan-g", category: "Plans" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "New To Medicare": "#0D9488",
  Plans: "#3B82F6",
  Enrollment: "#D97706",
  Coverage: "#059669",
  Library: "#4F46E5",
  Tools: "#C41230",
  About: "#64748B",
};

export default function HeaderBar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter pages based on query
  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/);
    return SEARCH_PAGES.filter((page) => {
      const searchText = `${page.title} ${page.description} ${page.category}`.toLowerCase();
      return words.every((word) => searchText.includes(word));
    }).slice(0, 8); // Max 8 results
  }, [query]);

  // Show dropdown when there are results or query is long enough
  useEffect(() => {
    if (query.trim().length >= 2) {
      setShowDropdown(true);
      setSelectedIndex(-1);
    } else {
      setShowDropdown(false);
    }
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      window.location.href = results[selectedIndex].url;
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setQuery("");
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  // Highlight matching text
  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;
    const words = query.toLowerCase().trim().split(/\s+/);
    let result = text;
    words.forEach((word) => {
      const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      result = result.replace(regex, `<mark class="bg-teal-100 text-teal-800 rounded-sm px-0.5">$1</mark>`);
    });
    return result;
  };

  return (
    <div className="bg-white border-b border-[#E5E7EB]">
      <div className="container flex items-center justify-between h-[72px] gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img
            src={LOGO_URL}
            alt="MedicareFAQ.com - Powered by Elite Insurance Partners"
            className="h-12 w-auto"
          />
        </Link>

        {/* Search Bar */}
        <div ref={searchRef} className="hidden md:block relative flex-1 max-w-lg mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Medicare topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (query.trim().length >= 2) setShowDropdown(true);
              }}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-10 py-2.5 bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg text-sm text-[#1B2A4A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-all duration-150"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Results Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
              {results.length > 0 ? (
                <ul className="py-1 max-h-[400px] overflow-y-auto">
                  {results.map((page, i) => (
                    <li key={page.url}>
                      <Link
                        href={page.url}
                        onClick={() => setShowDropdown(false)}
                        className={`block px-4 py-3 transition-colors duration-100 ${
                          i === selectedIndex
                            ? "bg-slate-50"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-sm font-medium text-[#1B2A4A] truncate"
                              dangerouslySetInnerHTML={{
                                __html: highlightMatch(page.title),
                              }}
                            />
                            <p
                              className="text-xs text-slate-500 mt-0.5 line-clamp-1"
                              dangerouslySetInnerHTML={{
                                __html: highlightMatch(page.description),
                              }}
                            />
                          </div>
                          <span
                            className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{
                              color: CATEGORY_COLORS[page.category] || "#64748B",
                              backgroundColor: `${CATEGORY_COLORS[page.category] || "#64748B"}15`,
                            }}
                          >
                            {page.category}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-slate-500">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try different keywords or call{" "}
                    <a
                      href="tel:8883358996"
                      className="text-[#0D9488] font-medium hover:underline"
                    >
                      (888) 335-8996
                    </a>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Phone + CTA */}
        <div className="flex items-center gap-4">
          <a
            href="tel:8883358996"
            onClick={() =>
              trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "header" })
            }
            className="hidden lg:flex items-center gap-2 text-[#1B2A4A] font-bold text-lg hover:text-[#0D9488] transition-colors duration-150"
          >
            <Phone className="w-5 h-5" />
            (888) 335-8996
          </a>
          <ZipFormModal
            coverageType="ms"
            triggerLabel="Get Started Free"
            triggerClassName="bg-[#C41230] hover:bg-[#A30F28] text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-150 shadow-sm hover:shadow-md whitespace-nowrap"
            triggerId="get-started-free-header"
            pageSection="header"
          />
        </div>
      </div>
    </div>
  );
}
