"use client";

import { useState, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  type: "coverage" | "blog";
  url: string;
}

interface ScriptSections {
  hook: string;
  keyFacts: string;
  nextSteps: string;
  cta: string;
}

interface ScriptResult {
  script: string;
  wordCount: number;
  estimatedDurationSeconds: number;
  sections: ScriptSections;
}

interface GenerateResponse {
  success: boolean;
  jobId?: number;
  script: ScriptResult;
  heygen: {
    submitted: boolean;
    videoId?: string;
    dryRun: boolean;
    error?: string;
  } | null;
  heygenConfigured: boolean;
  error?: string;
}

interface VideoJob {
  id: number;
  heygen_video_id: string | null;
  article_slug: string;
  article_title: string;
  article_url: string;
  script: string | null;
  status: "pending" | "processing" | "completed" | "failed" | "unknown";
  triggered_by: "manual" | "github_action" | "publish";
  video_url: string | null;
  thumbnail_url: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

type ScriptTab = "hook" | "keyFacts" | "nextSteps" | "cta" | "full";
type PageTab = "generator" | "jobs";

const TAB_LABELS: Record<ScriptTab, string> = {
  hook: "Hook",
  keyFacts: "Key Facts",
  nextSteps: "Next Steps",
  cta: "CTA",
  full: "Full Script",
};

const TAB_DURATIONS: Record<ScriptTab, string> = {
  hook: "~15 sec",
  keyFacts: "~75 sec",
  nextSteps: "~20 sec",
  cta: "~10 sec",
  full: "~2 min",
};

const STATUS_CONFIG: Record<
  VideoJob["status"],
  { label: string; color: string; dot: string }
> = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-500",
  },
  processing: {
    label: "Processing",
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
  failed: {
    label: "Failed",
    color: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  unknown: {
    label: "Unknown",
    color: "bg-gray-100 text-gray-600",
    dot: "bg-gray-400",
  },
};

export default function VideoScriptsPage() {
  // ── Page tab ──────────────────────────────────────────────────────────────
  const [pageTab, setPageTab] = useState<PageTab>("generator");

  // ── Generator state ───────────────────────────────────────────────────────
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "coverage" | "blog">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "alpha">("newest");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [heygenResult, setHeygenResult] = useState<GenerateResponse["heygen"]>(null);
  const [heygenConfigured, setHeygenConfigured] = useState(false);
  const [activeScriptTab, setActiveScriptTab] = useState<ScriptTab>("full");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(true);

  // ── Video jobs state ──────────────────────────────────────────────────────
  const [videoJobs, setVideoJobs] = useState<VideoJob[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  // Check HeyGen status on load
  useEffect(() => {
    fetch("/api/heygen-status")
      .then((r) => r.json())
      .then((data) => setHeygenConfigured(data.configured ?? false))
      .catch(() => {});
  }, []);

  // Load articles list
  useEffect(() => {
    fetch("/api/articles-list")
      .then((r) => r.json())
      .then((data) => {
        setArticles(data.articles ?? []);
        setFilteredArticles(data.articles ?? []);
      })
      .catch(() => setError("Failed to load articles list"))
      .finally(() => setLoadingArticles(false));
  }, []);

  // Filter articles
  useEffect(() => {
    let filtered = articles;
    if (typeFilter !== "all") {
      filtered = filtered.filter((a) => a.type === typeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.slug.toLowerCase().includes(q)
      );
    }
    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortOrder === "alpha") return a.title.localeCompare(b.title);
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    setFilteredArticles(filtered);
  }, [articles, searchQuery, typeFilter, sortOrder]);

  // Load video jobs when switching to jobs tab
  const loadVideoJobs = useCallback(async () => {
    setLoadingJobs(true);
    setJobsError(null);
    try {
      const res = await fetch("/api/video-jobs");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load jobs");
      setVideoJobs(data.jobs ?? []);
    } catch (err) {
      setJobsError(err instanceof Error ? err.message : "Failed to load jobs");
    } finally {
      setLoadingJobs(false);
    }
  }, []);

  useEffect(() => {
    if (pageTab === "jobs") {
      loadVideoJobs();
    }
  }, [pageTab, loadVideoJobs]);

  const handleGenerate = useCallback(
    async (submitToHeyGen = false) => {
      if (!selectedArticle) return;
      setIsGenerating(true);
      setError(null);
      setScriptResult(null);
      setHeygenResult(null);

      try {
        const res = await fetch("/api/generate-video-script", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: selectedArticle.title,
            slug: selectedArticle.slug,
            category: selectedArticle.category,
            excerpt: selectedArticle.excerpt,
            bodyText: selectedArticle.excerpt,
            submitToHeyGen,
          }),
        });

        const data: GenerateResponse = await res.json();

        if (!res.ok || !data.success) {
          setError(data.error ?? "Script generation failed");
          return;
        }

        setScriptResult(data.script);
        setHeygenResult(data.heygen);
        setHeygenConfigured(data.heygenConfigured);
        setActiveScriptTab("full");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsGenerating(false);
      }
    },
    [selectedArticle]
  );

  const handleCopy = useCallback(() => {
    if (!scriptResult) return;
    const text =
      activeScriptTab === "full"
        ? scriptResult.script
        : scriptResult.sections[activeScriptTab as keyof ScriptSections];
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [scriptResult, activeScriptTab]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getActiveText = () => {
    if (!scriptResult) return "";
    if (activeScriptTab === "full") return scriptResult.script;
    return scriptResult.sections[activeScriptTab as keyof ScriptSections];
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  const triggerLabel = (t: VideoJob["triggered_by"]) => {
    if (t === "github_action") return "Auto (GitHub)";
    if (t === "publish") return "Auto (Publish)";
    return "Manual";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              🎬 Video Script Generator
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Generate 2-minute HeyGen video scripts from any article
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                heygenConfigured
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  heygenConfigured ? "bg-green-500" : "bg-amber-500"
                }`}
              />
              HeyGen: {heygenConfigured ? "Connected" : "API Key Needed"}
            </span>
          </div>
        </div>

        {/* Page tabs */}
        <div className="max-w-7xl mx-auto mt-3 flex gap-1">
          <button
            onClick={() => setPageTab("generator")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              pageTab === "generator"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Script Generator
          </button>
          <button
            onClick={() => setPageTab("jobs")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              pageTab === "jobs"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Video Jobs
            {videoJobs.filter((j) => j.status === "processing" || j.status === "pending").length > 0 && (
              <span className="ml-1.5 bg-blue-200 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                {videoJobs.filter((j) => j.status === "processing" || j.status === "pending").length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── GENERATOR TAB ─────────────────────────────────────────────────── */}
      {pageTab === "generator" && (
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left panel — Article Picker */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-semibold text-gray-700">
                Select an Article
              </h2>
            </div>

            <div className="px-4 py-3 border-b border-gray-100 space-y-2">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex gap-2 flex-wrap items-center">
                {(["all", "coverage", "blog"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                      typeFilter === t
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {t === "all" ? "All" : t === "coverage" ? "Coverage FAQs" : "Blog"}
                  </button>
                ))}
                <span className="ml-auto text-xs text-gray-400 self-center">
                  {filteredArticles.length} articles
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="text-xs text-gray-400 mr-1">Sort:</span>
                {(["newest", "oldest", "alpha"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortOrder(s)}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                      sortOrder === s
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {s === "newest" ? "Newest" : s === "oldest" ? "Oldest" : "A–Z"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto" style={{ maxHeight: "520px" }}>
              {loadingArticles ? (
                <div className="p-8 text-center text-sm text-gray-400">
                  Loading articles...
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-400">
                  No articles found
                </div>
              ) : (
                filteredArticles.map((article) => (
                  <div
                    key={article.slug}
                    className={`relative w-full border-b border-gray-50 ${
                      selectedArticle?.slug === article.slug
                        ? "bg-blue-50 border-l-2 border-l-blue-500"
                        : ""
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedArticle(article);
                        setScriptResult(null);
                        setError(null);
                      }}
                      className="w-full text-left px-4 py-3 pr-10 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {article.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">
                            {article.category} · {article.date}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                            article.type === "coverage"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {article.type === "coverage" ? "FAQ" : "Blog"}
                        </span>
                      </div>
                    </button>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View article"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right panel — Script Output */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">
                Generated Script
              </h2>
              {scriptResult && (
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{scriptResult.wordCount} words</span>
                  <span>~{formatDuration(scriptResult.estimatedDurationSeconds)}</span>
                </div>
              )}
            </div>

            {selectedArticle && (
              <div className="px-4 py-3 border-b border-gray-100 bg-blue-50 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-blue-900 truncate">
                    {selectedArticle.title}
                  </p>
                  <p className="text-xs text-blue-600 mt-0.5">
                    {selectedArticle.category} ·{" "}
                    {selectedArticle.type === "coverage" ? "Coverage FAQ" : "Blog Post"}
                  </p>
                </div>
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View article on site"
                  className="shrink-0 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  <ExternalLink size={12} />
                  View
                </a>
              </div>
            )}

            {selectedArticle && !isGenerating && (
              <div className="px-4 py-3 border-b border-gray-100 flex gap-2">
                <button
                  onClick={() => handleGenerate(false)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Generate Script
                </button>
                <button
                  onClick={() => handleGenerate(true)}
                  disabled={!heygenConfigured}
                  title={
                    !heygenConfigured
                      ? "Add HEYGEN_API_KEY in Vercel to enable"
                      : "Generate script and submit to HeyGen"
                  }
                  className={`flex-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors border ${
                    heygenConfigured
                      ? "border-green-500 text-green-700 hover:bg-green-50"
                      : "border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Generate + Send to HeyGen
                </button>
              </div>
            )}

            {isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                <p className="text-sm font-medium text-gray-700">
                  Writing your script...
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  This takes about 10–15 seconds
                </p>
              </div>
            )}

            {error && !isGenerating && (
              <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            {!selectedArticle && !isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400">
                <div className="text-4xl mb-3">🎬</div>
                <p className="text-sm font-medium">Select an article to get started</p>
                <p className="text-xs mt-1">
                  A 2-minute video script will be generated automatically
                </p>
              </div>
            )}

            {scriptResult && !isGenerating && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex border-b border-gray-100 overflow-x-auto">
                  {(Object.keys(TAB_LABELS) as ScriptTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveScriptTab(tab)}
                      className={`shrink-0 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                        activeScriptTab === tab
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {TAB_LABELS[tab]}
                      <span className="ml-1 text-gray-400">
                        {TAB_DURATIONS[tab]}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {getActiveText()}
                  </p>
                </div>

                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between gap-3">
                  <button
                    onClick={handleCopy}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? "✓ Copied!" : "Copy to clipboard"}
                  </button>

                  {heygenResult && (
                    <div
                      className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        heygenResult.dryRun
                          ? "bg-amber-100 text-amber-700"
                          : heygenResult.submitted
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {heygenResult.dryRun
                        ? "HeyGen: Dry run (no key)"
                        : heygenResult.submitted
                        ? `HeyGen: Submitted ✓ (ID: ${heygenResult.videoId?.slice(0, 8)}...)`
                        : `HeyGen: Failed — ${heygenResult.error}`}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── VIDEO JOBS TAB ────────────────────────────────────────────────── */}
      {pageTab === "jobs" && (
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Jobs header */}
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  Video Generation History
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  All auto-generated and manually submitted HeyGen jobs
                </p>
              </div>
              <button
                onClick={loadVideoJobs}
                disabled={loadingJobs}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {loadingJobs ? (
                  <span className="inline-block w-3.5 h-3.5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                ) : (
                  "↻"
                )}
                Refresh
              </button>
            </div>

            {/* Jobs list */}
            {loadingJobs ? (
              <div className="p-12 text-center text-sm text-gray-400">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
                Loading jobs...
              </div>
            ) : jobsError ? (
              <div className="p-8 text-center text-sm text-red-600">
                {jobsError}
              </div>
            ) : videoJobs.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-sm font-medium">No video jobs yet</p>
                <p className="text-xs mt-1">
                  Jobs appear here when articles are published or scripts are
                  sent to HeyGen
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {videoJobs.map((job) => {
                  const statusCfg = STATUS_CONFIG[job.status] ?? STATUS_CONFIG.unknown;
                  const isExpanded = expandedJobId === job.id;

                  return (
                    <div key={job.id} className="px-5 py-4">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left: article info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {job.article_title}
                            </p>
                            <span
                              className={`shrink-0 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${statusCfg.color}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} ${
                                  job.status === "processing"
                                    ? "animate-pulse"
                                    : ""
                                }`}
                              />
                              {statusCfg.label}
                            </span>
                            <span className="shrink-0 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              {triggerLabel(job.triggered_by)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 flex-wrap">
                            <span>{formatDate(job.created_at)}</span>
                            {job.heygen_video_id && (
                              <span className="font-mono">
                                ID: {job.heygen_video_id.slice(0, 12)}...
                              </span>
                            )}
                            {job.article_url && (
                              <a
                                href={job.article_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                View article ↗
                              </a>
                            )}
                          </div>
                          {job.error_message && (
                            <p className="mt-1 text-xs text-red-600 bg-red-50 rounded px-2 py-1">
                              Error: {job.error_message}
                            </p>
                          )}
                        </div>

                        {/* Right: actions */}
                        <div className="shrink-0 flex items-center gap-2">
                          {job.video_url && (
                            <a
                              href={job.video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Watch Video ▶
                            </a>
                          )}
                          {job.script && (
                            <button
                              onClick={() =>
                                setExpandedJobId(isExpanded ? null : job.id)
                              }
                              className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              {isExpanded ? "Hide Script" : "View Script"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expanded script */}
                      {isExpanded && job.script && (
                        <div className="mt-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-600 mb-2">
                            Script
                          </p>
                          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {job.script}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Setup instructions banner */}
      {!heygenConfigured && pageTab === "generator" && (
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-amber-900 mb-1">
              HeyGen integration is ready — waiting for API key
            </h3>
            <p className="text-xs text-amber-700 leading-relaxed">
              To activate HeyGen video generation, add these environment
              variables in Vercel:
              <br />
              <code className="bg-amber-100 px-1 rounded">HEYGEN_API_KEY</code>{" "}
              — Your HeyGen API key (Settings → API in HeyGen dashboard)
              <br />
              <code className="bg-amber-100 px-1 rounded">
                HEYGEN_AVATAR_ID
              </code>{" "}
              — Your avatar ID (HeyGen → Avatars)
              <br />
              <code className="bg-amber-100 px-1 rounded">
                HEYGEN_VOICE_ID
              </code>{" "}
              — Your voice ID (HeyGen → Voices)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
