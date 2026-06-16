"use client";

import { useState } from "react";
import { useCMSAuth } from "../components/use-cms-auth";
import SketchLayout from "../components/sketch-layout";
import "../sketch-theme.css";
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
  Link2,
  Check,
  ExternalLink,
  AlertCircle,
  Users,
} from "lucide-react";

interface ContentGap {
  title: string;
  primaryKeyword: string;
  rationale: string;
  priority: "high" | "medium" | "low";
  category: string;
  icpAlignment?: "pain_point" | "goal" | "objection" | "decision_trigger";
  icpDetail?: string;
}

interface LinkOpportunity {
  sourceTitle: string;
  sourceSlug: string;
  sourcePath: string;
  anchorText: string;
  targetTitle: string;
  targetPath: string;
  reason: string;
}

export default function ContentIntelligencePage() {
  const { password, logout } = useCMSAuth();

  // Gap Finder state
  const [suggestions, setSuggestions] = useState<ContentGap[]>([]);
  const [gapLoading, setGapLoading] = useState(false);
  const [gapError, setGapError] = useState("");
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [focusArea, setFocusArea] = useState("all");
  const [hasRunGap, setHasRunGap] = useState(false);

  // Link Scanner state
  const [linkOpportunities, setLinkOpportunities] = useState<LinkOpportunity[]>([]);
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState("");
  const [hasRunLinks, setHasRunLinks] = useState(false);
  const [linkScannedCount, setLinkScannedCount] = useState(0);
  const [applyingLink, setApplyingLink] = useState<number | null>(null);
  const [appliedLinks, setAppliedLinks] = useState<Set<number>>(new Set());
  const [batchSize, setBatchSize] = useState(5);

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

  // --- Gap Finder ---
  const runGapFinder = async () => {
    setGapLoading(true);
    setGapError("");
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
        setGapError(data.error || "Failed to analyze content gaps");
        return;
      }

      setSuggestions(data.suggestions || []);
      setTotalArticles(data.totalArticles || 0);
      setTotalCategories(data.categories || 0);
      setHasRunGap(true);
    } catch (err) {
      setGapError(String(err));
    } finally {
      setGapLoading(false);
    }
  };

  // --- Link Scanner ---
  const runLinkScanner = async () => {
    setLinkLoading(true);
    setLinkError("");
    setAppliedLinks(new Set());
    try {
      const res = await fetch("/api/cms/link-scanner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cms-password": password,
        },
        body: JSON.stringify({ batchSize }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLinkError(data.error || "Failed to scan for link opportunities");
        return;
      }

      setLinkOpportunities(data.opportunities || []);
      setLinkScannedCount(data.scannedCount || 0);
      setHasRunLinks(true);
    } catch (err) {
      setLinkError(String(err));
    } finally {
      setLinkLoading(false);
    }
  };

  const applyLink = async (idx: number) => {
    const opp = linkOpportunities[idx];
    setApplyingLink(idx);
    try {
      const res = await fetch("/api/cms/apply-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cms-password": password,
        },
        body: JSON.stringify({
          sourceSlug: opp.sourceSlug,
          sourcePath: opp.sourcePath,
          anchorText: opp.anchorText,
          targetPath: opp.targetPath,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLinkError(data.error || "Failed to apply link");
        return;
      }

      setAppliedLinks((prev) => new Set([...prev, idx]));
    } catch (err) {
      setLinkError(String(err));
    } finally {
      setApplyingLink(null);
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
    <SketchLayout onLogout={logout}>

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full space-y-8">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Intelligence</h1>
              <p className="text-sm text-gray-500">Discover content gaps and internal linking opportunities</p>
            </div>
          </div>
        </div>

        {/* ============ GAP FINDER SECTION ============ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-purple-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Gap Finder</h2>
                  <p className="text-sm text-gray-500">AI analyzes your content library and suggests topics you haven&apos;t covered</p>
                </div>
              </div>
              {hasRunGap && (
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
              disabled={gapLoading}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {gapLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : hasRunGap ? (
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

          {gapError && (
            <div className="px-6 py-4 bg-red-50 border-b border-red-100">
              <p className="text-sm text-red-700">{gapError}</p>
            </div>
          )}

          {gapLoading && (
            <div className="px-6 py-16 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Scanning your content library...</p>
              <p className="text-sm text-gray-400 mt-1">Analyzing {totalArticles || "all"} articles for gaps and opportunities</p>
            </div>
          )}

          {!gapLoading && !hasRunGap && (
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

          {!gapLoading && hasRunGap && suggestions.length > 0 && (
            <div className="divide-y divide-gray-100">
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

              {suggestions.map((gap, idx) => {
                const config = priorityConfig[gap.priority] || priorityConfig.medium;
                return (
                  <div key={idx} className="px-6 py-5 hover:bg-gray-50 transition-colors">
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
                          {gap.icpAlignment && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                              <Users className="w-3 h-3" />
                              {gap.icpAlignment === "pain_point" ? "Pain Point" : gap.icpAlignment === "goal" ? "Goal" : gap.icpAlignment === "objection" ? "Objection" : "Decision Trigger"}
                            </span>
                          )}
                        </div>
                        {gap.icpDetail && (
                          <p className="text-xs text-purple-600 mt-1.5 italic">
                            ICP: &ldquo;{gap.icpDetail}&rdquo;
                          </p>
                        )}
                      </div>
                      <a
                        href={(() => {
                          const params = new URLSearchParams({ title: gap.title });
                          if (gap.primaryKeyword) params.set("keyword", gap.primaryKeyword);
                          if (gap.category) params.set("category", gap.category);
                          if (gap.priority) params.set("priority", gap.priority);
                          if (gap.rationale) params.set("rationale", gap.rationale);
                          if (gap.icpAlignment) params.set("icpType", gap.icpAlignment);
                          if (gap.icpDetail) params.set("icp", gap.icpDetail);
                          return `/admin/github-editor/create-smart?${params.toString()}`;
                        })()}
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

          {!gapLoading && hasRunGap && suggestions.length === 0 && !gapError && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No gaps found. Your content coverage looks comprehensive!</p>
            </div>
          )}
        </div>

        {/* ============ INTERNAL LINK SCANNER SECTION ============ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-emerald-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link2 className="w-5 h-5 text-teal-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Internal Link Scanner</h2>
                  <p className="text-sm text-gray-500">Find missed internal linking opportunities across your published articles</p>
                </div>
              </div>
              {hasRunLinks && (
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    {linkScannedCount} articles scanned
                  </span>
                  <span className="flex items-center gap-1">
                    <Link2 className="w-4 h-4" />
                    {linkOpportunities.length} opportunities
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Scan</span>
              <select
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value={3}>3 articles</option>
                <option value={5}>5 articles</option>
                <option value={10}>10 articles</option>
              </select>
              <span className="text-sm text-gray-500">(random sample)</span>
            </div>

            <button
              onClick={runLinkScanner}
              disabled={linkLoading}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {linkLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Scanning...
                </>
              ) : hasRunLinks ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Scan Again
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Scan for Links
                </>
              )}
            </button>
          </div>

          {linkError && (
            <div className="px-6 py-4 bg-red-50 border-b border-red-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{linkError}</p>
            </div>
          )}

          {linkLoading && (
            <div className="px-6 py-16 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-teal-500 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Scanning articles for link opportunities...</p>
              <p className="text-sm text-gray-400 mt-1">Analyzing content and finding missed internal links</p>
            </div>
          )}

          {!linkLoading && !hasRunLinks && (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-4">
                <Link2 className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Find missed internal links</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Scan your published articles to find places where a topic is mentioned but not linked to the relevant page. One-click apply to insert the link.
              </p>
            </div>
          )}

          {!linkLoading && hasRunLinks && linkOpportunities.length > 0 && (
            <div className="divide-y divide-gray-100">
              <div className="px-6 py-3 bg-gray-50 flex items-center gap-4 text-sm">
                <span className="font-medium text-gray-700">
                  Found {linkOpportunities.length} link opportunities
                </span>
                {appliedLinks.size > 0 && (
                  <span className="flex items-center gap-1 text-teal-700">
                    <Check className="w-3.5 h-3.5" />
                    {appliedLinks.size} applied
                  </span>
                )}
              </div>

              {linkOpportunities.map((opp, idx) => {
                const isApplied = appliedLinks.has(idx);
                const isApplying = applyingLink === idx;
                return (
                  <div key={idx} className={`px-6 py-5 ${isApplied ? "bg-teal-50/50" : "hover:bg-gray-50"} transition-colors`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {opp.sourceTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-700">
                            &quot;<span className="font-semibold text-teal-700">{opp.anchorText}</span>&quot;
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                          <a
                            href={opp.targetPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
                          >
                            {opp.targetTitle}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-xs text-gray-500">{opp.reason}</p>
                      </div>
                      <button
                        onClick={() => applyLink(idx)}
                        disabled={isApplied || isApplying}
                        className={`shrink-0 flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-2 transition-colors ${
                          isApplied
                            ? "bg-teal-100 text-teal-700 cursor-default"
                            : isApplying
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "text-teal-600 bg-teal-50 hover:bg-teal-100"
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Applied
                          </>
                        ) : isApplying ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Applying...
                          </>
                        ) : (
                          <>
                            <Link2 className="w-3.5 h-3.5" />
                            Apply Link
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!linkLoading && hasRunLinks && linkOpportunities.length === 0 && !linkError && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No link opportunities found in the scanned articles. Try scanning more articles.</p>
            </div>
          )}
        </div>
      </main>
    </SketchLayout>
  );
}
