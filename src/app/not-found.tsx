"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import { searchContent, type SearchResult } from "@/lib/search-index";
import { BookOpen, Shield, HelpCircle, Phone, Search, ArrowRight } from "lucide-react";

const paths = [
  {
    icon: BookOpen,
    label: "New to Medicare",
    description: "Start here if you're turning 65 or enrolling for the first time.",
    href: "/medicare-101/",
    color: "bg-teal-50 border-teal-200 hover:border-teal-400",
    iconColor: "text-teal-600",
  },
  {
    icon: Shield,
    label: "Compare Plans",
    description: "Side-by-side comparisons of Supplement, Advantage, and Part D plans.",
    href: "/medicare-supplement-plans/",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    iconColor: "text-blue-600",
  },
  {
    icon: HelpCircle,
    label: "Coverage Questions",
    description: "Does Medicare cover it? Find answers to hundreds of coverage FAQs.",
    href: "/faqs/",
    color: "bg-amber-50 border-amber-200 hover:border-amber-400",
    iconColor: "text-amber-600",
  },
];

export default function NotFound() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const found = searchContent(query).slice(0, 6);
    setResults(found);
    setShowDropdown(found.length > 0);
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <SiteLayout>
      {/* Hero */}
      <div className="bg-navy-900 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-teal-400 font-bold text-sm tracking-widest uppercase mb-3">
            404 — Page Not Found
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            This page may have moved
          </h1>
          <p className="text-slate-300 text-lg mb-8">
            Here are some helpful starting points, or search for what you need below.
          </p>

          {/* Search bar */}
          <div ref={searchRef} className="relative max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => results.length > 0 && setShowDropdown(true)}
                placeholder="Search Medicare topics..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </form>
            {showDropdown && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                {results.map((result, i) => (
                  <Link
                    key={i}
                    href={result.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 text-left"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">
                        {result.title}
                      </div>
                      {result.description && (
                        <div className="text-xs text-slate-500 truncate mt-0.5">
                          {result.description}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </Link>
                ))}
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 text-teal-600 text-sm font-semibold hover:bg-slate-100"
                >
                  See all results for &ldquo;{query}&rdquo; <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Path cards */}
      <div className="bg-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-slate-500 text-sm uppercase tracking-widest font-semibold mb-8">
            Popular starting points
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paths.map((path) => {
              const Icon = path.icon;
              return (
                <Link
                  key={path.href}
                  href={path.href}
                  className={`flex flex-col gap-3 p-6 rounded-xl border-2 transition-all ${path.color}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-sm`}>
                    <Icon className={`w-5 h-5 ${path.iconColor}`} />
                  </div>
                  <div>
                    <div className="font-bold text-navy-900 text-base mb-1">{path.label}</div>
                    <div className="text-slate-600 text-sm leading-relaxed">{path.description}</div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold mt-auto ${path.iconColor}`}>
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Phone CTA */}
      <div className="bg-slate-50 border-t border-slate-200 py-10 px-4">
        <div className="max-w-xl mx-auto text-center">
          <Phone className="w-8 h-8 text-teal-600 mx-auto mb-3" />
          <p className="text-slate-700 font-semibold text-lg mb-1">Still can&apos;t find it?</p>
          <p className="text-slate-500 text-sm mb-4">
            Our licensed agents are available Monday–Friday, 9 AM–6 PM Eastern.
          </p>
          <a
            href="tel:+18883358996"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition-colors text-lg"
          >
            <Phone className="w-5 h-5" />
            (888) 335-8996
          </a>
        </div>
      </div>
    </SiteLayout>
  );
}
