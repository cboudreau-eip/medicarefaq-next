"use client";

import { useState } from "react";
import { useCMSAuth } from "../components/use-cms-auth";
import CMSHeader from "../components/cms-header";
import {
  Lightbulb,
  Search,
  TrendingUp,
  Tag,
  ArrowRight,
  Loader2,
  RefreshCw,
  Sparkles,
  Target,
  BarChart3,
} from "lucide-react";

interface ContentGap {
  title: string;
  primaryKeyword: string;
  rationale: string;
  priority: "high" | "medium" | "low";
  category: string;
}

export default function ContentIntelligencePage() {
  const { password, logout } = useCMSAuth();
  const [suggestions, setSuggestions] = useState<ContentGap[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [focusArea, setFocusArea] = useState("all");
  const [hasRun, setHasRun] = useState(false);

  const focusOptions = [
    { value: "all", label: "All Topics" },
    { value: "Medicare Advantage", label: "Medicare Advantage" },
    { value: "Medigap", label: "Medigap / Supplements" },
    { value: "Part D", label: "Part D / Prescriptions" },
    { value: "Enrollment", label: "Enrollment & Eligibility" },
    { value: "Costs", label: "Costs & Premiums" },
    { value: "Medicare Basics", label: "Medicare Basics" },
    { value: "Coverage", label: "Coverage & Benefits" },
    { value: "Special Situations", label: "Special Situations" },
  ];

  const runGapFinder = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cms/content-gaps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cms-password": password,
        },
        body: JSON.stringify({ focusArea }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to analyze content gaps");
        return;
      }

      setSuggestions(data.suggestions || []);
      setTotalArticles(data.totalArticles || 0);
      setTotalCategories(data.categories || 0);
      setHasRun(true);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const priorityConfig = {
    high: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", badge: "bg-red-100 text-red-700", icon: "🔥" },
    medium: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", badge: "bg-amber-100 text-amber-700", icon: "⚡" },
    low: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-700", icon: "💡" },
  };

  const highCount = suggestions.filter((s) => s.priority === "high").length;
  const mediumCount = suggestions.filter((s) => s.priority === "medium").length;
  const lowCount = suggestions.filter((s) => s.priority === "low").length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CMSHeader onLogout={logout} />

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Intelligence</h1>
              <p className="text-sm text-gray-500">Discover content gaps and opportunities</p>
            </div>
          </div>
        </div>

        {/* Gap Finder Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Section Header */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-purple-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Gap Finder</h2>
                  <p className="text-sm text-gray-500">AI analyzes your content library and suggests topics you haven&apos;t covered</p>
                </div>
              </div>
              {hasRun && (
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    {totalArticles} articles scanned
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {totalCategories} categories
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-400" />
              <select
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {focusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={runGapFinder}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : hasRun ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Re-analyze
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Find Content Gaps
                </>
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="px-6 py-4 bg-red-50 border-b border-red-100">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="px-6 py-16 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Scanning your content library...</p>
              <p className="text-sm text-gray-400 mt-1">Analyzing {totalArticles || "all"} articles for gaps and opportunities</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !hasRun && (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to discover content opportunities</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Click &quot;Find Content Gaps&quot; to scan your entire content library and get AI-powered suggestions for new articles that will drive organic traffic.
              </p>
            </div>
          )}

          {/* Results */}
          {!loading && hasRun && suggestions.length > 0 && (
            <div className="divide-y divide-gray-100">
              {/* Summary Bar */}
              <div className="px-6 py-3 bg-gray-50 flex items-center gap-4 text-sm">
                <span className="font-medium text-gray-700">Found {suggestions.length} opportunities:</span>
                {highCount > 0 && (
                  <span className="flex items-center gap-1 text-red-700">
                    🔥 {highCount} high priority
                  </span>
                )}
                {mediumCount > 0 && (
                  <span className="flex items-center gap-1 text-amber-700">
                    ⚡ {mediumCount} medium
                  </span>
                )}
                {lowCount > 0 && (
                  <span className="flex items-center gap-1 text-blue-700">
                    💡 {lowCount} niche
                  </span>
                )}
              </div>

              {/* Suggestion Cards */}
              {suggestions.map((gap, idx) => {
                const config = priorityConfig[gap.priority] || priorityConfig.medium;
                return (
                  <div key={idx} className={`px-6 py-5 hover:bg-gray-50 transition-colors`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-lg">{config.icon}</span>
                          <h3 className="font-semibold text-gray-900 text-base">{gap.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{gap.rationale}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${config.badge}`}>
                            <TrendingUp className="w-3 h-3" />
                            {gap.priority} priority
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                            <Tag className="w-3 h-3" />
                            {gap.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            <Target className="w-3 h-3" />
                            Keyword: <span className="font-medium text-gray-700">{gap.primaryKeyword}</span>
                          </span>
                        </div>
                      </div>
                      <a
                        href={`/admin/github-editor/create-smart?title=${encodeURIComponent(gap.title)}`}
                        className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg px-3 py-2 hover:bg-purple-100 transition-colors"
                      >
                        Create
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* No results */}
          {!loading && hasRun && suggestions.length === 0 && !error && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No gaps found. Your content coverage looks comprehensive!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
