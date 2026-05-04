"use client";

import { Search, Phone, Loader2, Sparkles, ArrowRight, X, PhoneCall } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/medicarefaq-logo-updated_eca101e5.png";

interface SearchResult {
  answer: string;
  url: string | null;
  urlTitle: string | null;
  relatedLinks: { title: string; url: string }[];
}

export default function HeaderBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Close on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowDropdown(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim() || query.trim().length < 3) return;

    setIsSearching(true);
    setError("");
    setResult(null);
    setShowDropdown(true);

    try {
      const res = await fetch("/api/smart-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Unable to search right now. Please try again.");
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    setResult(null);
    setShowDropdown(false);
    setError("");
    inputRef.current?.focus();
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

        {/* Smart Search Bar */}
        <div ref={searchRef} className="hidden md:block relative flex-1 max-w-lg mx-6">
          <form onSubmit={handleSearch}>
            <div className="relative w-full">
              {isSearching ? (
                <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0D9488] animate-spin" />
              ) : (
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0D9488]" />
              )}
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask a Medicare question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (result || error) setShowDropdown(true);
                }}
                className="w-full pl-10 pr-10 py-2.5 bg-[#F5F7FA] border border-[#E5E7EB] rounded-lg text-sm text-[#1B2A4A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-all duration-150"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </form>

          {/* Results Dropdown */}
          {showDropdown && (isSearching || result || error) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Loading state */}
              {isSearching && (
                <div className="px-5 py-6 flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-[#0D9488] animate-spin flex-shrink-0" />
                  <span className="text-sm text-slate-500">Searching Medicare resources...</span>
                </div>
              )}

              {/* Error state */}
              {error && !isSearching && (
                <div className="px-5 py-4 text-sm text-red-500">{error}</div>
              )}

              {/* Result */}
              {result && !isSearching && (
                <div className="divide-y divide-slate-100">
                  {/* Answer */}
                  <div className="px-5 py-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {result.answer}
                    </p>
                    {result.url && result.urlTitle && (
                      <Link
                        href={result.url}
                        onClick={() => setShowDropdown(false)}
                        className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-[#0D9488] hover:text-[#0B7C72] transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        {result.urlTitle}
                      </Link>
                    )}
                  </div>

                  {/* Related Links */}
                  {result.relatedLinks.length > 0 && (
                    <div className="px-5 py-3 bg-slate-50">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Related
                      </p>
                      <div className="space-y-1.5">
                        {result.relatedLinks.map((link, i) => (
                          <Link
                            key={i}
                            href={link.url}
                            onClick={() => setShowDropdown(false)}
                            className="block text-sm text-slate-600 hover:text-[#0D9488] transition-colors"
                          >
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fallback CTA */}
                  <div className="px-5 py-3 bg-[#F5F7FA] flex items-center justify-between">
                    <span className="text-xs text-slate-400">Need more help?</span>
                    <a
                      href="tel:8883358996"
                      onClick={() =>
                        trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "smart_search" })
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D9488] hover:text-[#0B7C72] transition-colors"
                    >
                      <PhoneCall className="w-3 h-3" />
                      Call (888) 335-8996
                    </a>
                  </div>
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
