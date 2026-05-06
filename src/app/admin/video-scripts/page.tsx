"use client";

import { useState, useEffect, useCallback } from "react";

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

type Tab = "hook" | "keyFacts" | "nextSteps" | "cta" | "full";

const TAB_LABELS: Record<Tab, string> = {
  hook: "Hook",
  keyFacts: "Key Facts",
  nextSteps: "Next Steps",
  cta: "CTA",
  full: "Full Script",
};

const TAB_DURATIONS: Record<Tab, string> = {
  hook: "~15 sec",
  keyFacts: "~75 sec",
  nextSteps: "~20 sec",
  cta: "~10 sec",
  full: "~2 min",
};

export default function VideoScriptsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "coverage" | "blog">("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [heygenResult, setHeygenResult] = useState<GenerateResponse["heygen"]>(null);
  const [heygenConfigured, setHeygenConfigured] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("full");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(true);

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
    setFilteredArticles(filtered);
  }, [articles, searchQuery, typeFilter]);

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
            bodyText: selectedArticle.excerpt, // excerpt used as body context; full body not available client-side
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
        setActiveTab("full");
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
      activeTab === "full"
        ? scriptResult.script
        : scriptResult.sections[activeTab as keyof ScriptSections];
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [scriptResult, activeTab]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getActiveText = () => {
    if (!scriptResult) return "";
    if (activeTab === "full") return scriptResult.script;
    return scriptResult.sections[activeTab as keyof ScriptSections];
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
              Generate 2-minute HeyGen video scripts from any article using Claude AI
            </p>
          </div>
          <div className="flex items-center gap-2">
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
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left panel — Article Picker */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-700">
              Select an Article
            </h2>
          </div>

          {/* Search + filter */}
          <div className="px-4 py-3 border-b border-gray-100 space-y-2">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex gap-2">
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
          </div>

          {/* Article list */}
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
                <button
                  key={article.slug}
                  onClick={() => {
                    setSelectedArticle(article);
                    setScriptResult(null);
                    setError(null);
                  }}
                  className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-blue-50 transition-colors ${
                    selectedArticle?.slug === article.slug
                      ? "bg-blue-50 border-l-2 border-l-blue-500"
                      : ""
                  }`}
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

          {/* Selected article info */}
          {selectedArticle && (
            <div className="px-4 py-3 border-b border-gray-100 bg-blue-50">
              <p className="text-sm font-medium text-blue-900 truncate">
                {selectedArticle.title}
              </p>
              <p className="text-xs text-blue-600 mt-0.5">
                {selectedArticle.category} · {selectedArticle.type === "coverage" ? "Coverage FAQ" : "Blog Post"}
              </p>
            </div>
          )}

          {/* Generate buttons */}
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

          {/* Loading state */}
          {isGenerating && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
              <p className="text-sm font-medium text-gray-700">
                Claude is writing your script...
              </p>
              <p className="text-xs text-gray-400 mt-1">This takes about 10–15 seconds</p>
            </div>
          )}

          {/* Error */}
          {error && !isGenerating && (
            <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Empty state */}
          {!selectedArticle && !isGenerating && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400">
              <div className="text-4xl mb-3">🎬</div>
              <p className="text-sm font-medium">Select an article to get started</p>
              <p className="text-xs mt-1">Claude will write a 2-minute video script</p>
            </div>
          )}

          {/* Script output */}
          {scriptResult && !isGenerating && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Section tabs */}
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {(Object.keys(TAB_LABELS) as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {TAB_LABELS[tab]}
                    <span className="ml-1 text-gray-400">{TAB_DURATIONS[tab]}</span>
                  </button>
                ))}
              </div>

              {/* Script text */}
              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {getActiveText()}
                </p>
              </div>

              {/* Copy + HeyGen status */}
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

      {/* Setup instructions banner */}
      {!heygenConfigured && (
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-amber-900 mb-1">
              HeyGen integration is ready — waiting for API key
            </h3>
            <p className="text-xs text-amber-700 leading-relaxed">
              To activate HeyGen video generation, add these environment variables in Vercel:
              <br />
              <code className="bg-amber-100 px-1 rounded">HEYGEN_API_KEY</code> — Your HeyGen API key (Settings → API in HeyGen dashboard)
              <br />
              <code className="bg-amber-100 px-1 rounded">HEYGEN_AVATAR_ID</code> — Your avatar ID (HeyGen → Avatars)
              <br />
              <code className="bg-amber-100 px-1 rounded">HEYGEN_VOICE_ID</code> — Your voice ID (HeyGen → Voices)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
