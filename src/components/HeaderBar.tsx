"use client";

import { Search, Phone, X } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";
import { appendPostHogParams } from "@/lib/posthog-params";
import { searchContent, type SearchResult } from "@/lib/search-index";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/medicarefaq-logo-updated_eca101e5.png";

const TYPE_COLORS: Record<string, string> = {
  blog: "#4F46E5",
  coverage: "#059669",
  guide: "#7C3AED",
  page: "#64748B",
};

const TYPE_LABELS: Record<string, string> = {
  blog: "Blog",
  coverage: "FAQ",
  guide: "Guide",
  page: "Page",
};

export default function HeaderBar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use the unified search index for results
  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchContent(query).slice(0, 8); // Max 8 results in dropdown
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
    if (e.key === "Enter" && selectedIndex < 0 && query.trim().length >= 2) {
      // Submit to search page if no item is selected
      e.preventDefault();
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
      return;
    }

    if (!showDropdown || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      window.location.href = appendPostHogParams(results[selectedIndex].href);
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

  // Highlight matching text (safe: won't match inside HTML tags)
  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;
    const words = query.toLowerCase().trim().split(/\s+/).filter(w => w.length > 0);
    // Build a single regex that matches any of the search words
    const escaped = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
    // Split text by matches and rebuild with <mark> tags in one pass (no nested HTML issue)
    const parts = text.split(pattern);
    return parts
      .map(part =>
        pattern.test(part)
          ? `<mark class="bg-teal-100/60 text-inherit font-semibold">${part}</mark>`
          : part
      )
      .join("");
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
                <>
                  <ul className="py-1 max-h-[400px] overflow-y-auto">
                    {results.map((result: SearchResult, i: number) => (
                      <li key={result.id}>
                        <Link
                          href={result.href}
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
                                  __html: highlightMatch(result.title),
                                }}
                              />
                              <p
                                className="text-xs text-slate-500 mt-0.5 line-clamp-1"
                                dangerouslySetInnerHTML={{
                                  __html: highlightMatch(result.description),
                                }}
                              />
                            </div>
                            <span
                              className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                              style={{
                                color: result.categoryColor || TYPE_COLORS[result.type] || "#64748B",
                                backgroundColor: `${result.categoryColor || TYPE_COLORS[result.type] || "#64748B"}15`,
                              }}
                            >
                              {TYPE_LABELS[result.type] || result.category}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {/* View all results link */}
                  <div className="border-t border-slate-100 px-4 py-2.5">
                    <Link
                      href={`/search?q=${encodeURIComponent(query.trim())}`}
                      onClick={() => setShowDropdown(false)}
                      className="text-xs font-medium text-[#0D9488] hover:text-[#0B7C72] transition-colors"
                    >
                      View all results for &ldquo;{query.trim()}&rdquo; &rarr;
                    </Link>
                  </div>
                </>
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-slate-500">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try different keywords or call{" "}
                    <a
                      href="tel:+18883358996"  data-invoca-phone-number="18883358996"
                      className="invoca-phone text-[#0D9488] font-medium hover:underline"
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
            href="tel:+18883358996"  data-invoca-phone-number="18883358996"
            onClick={() =>
              trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "header" })
            }
            className="invoca-phone hidden lg:flex items-center gap-2 text-[#1B2A4A] font-bold text-lg hover:text-[#0D9488] transition-colors duration-150"
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
