"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  GitBranch as Github,
  Search,
  FileText,
  Globe,
  ChevronRight,
  Save,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  RefreshCw,
  Tag,
  Lock,
  LogOut,
  ImageIcon,
} from "lucide-react";

interface ArticleListItem {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  type: "blog" | "coverage";
  url: string;
}

interface ArticleDetail {
  slug: string;
  type: "blog" | "coverage";
  title: string;
  image?: string;
  imageAlt?: string;
  seo: {
    title: string;
    description: string;
    ogImage: string;
    canonical: string;
  };
  sectionsRaw: string;
  filePath: string;
}

type SaveStatus = "idle" | "saving" | "success" | "error";

export default function GitHubEditorDashboard() {
  const router = useRouter();

  // Auth state
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Article list state
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [filtered, setFiltered] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "blog" | "coverage">("all");

  // Selected article state
  const [selected, setSelected] = useState<ArticleListItem | null>(null);
  const [detail, setDetail] = useState<ArticleDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editSeoTitle, setEditSeoTitle] = useState("");
  const [editSeoDesc, setEditSeoDesc] = useState("");
  const [editOgImage, setEditOgImage] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editImageAlt, setEditImageAlt] = useState("");
  const [editSectionsRaw, setEditSectionsRaw] = useState("");

  // Save state
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState("");

  // Check for stored session on mount
  useEffect(() => {
    const storedPw = sessionStorage.getItem("cms_password");
    if (storedPw) {
      setPassword(storedPw);
      setAuthenticated(true);
    }
  }, []);

  // Handle login
  const handleLogin = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      if (res.status === 401) {
        setAuthError("Invalid password. Access denied.");
        return;
      }
      if (!res.ok) {
        setAuthError("Server error. Try again.");
        return;
      }
      // Success
      setPassword(passwordInput);
      sessionStorage.setItem("cms_password", passwordInput);
      setAuthenticated(true);
    } catch {
      setAuthError("Connection error. Try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setAuthenticated(false);
    setPassword("");
    setPasswordInput("");
    sessionStorage.removeItem("cms_password");
    setArticles([]);
    setSelected(null);
    setDetail(null);
  };

  // Authenticated fetch helper
  const authFetch = useCallback(
    async (url: string, options?: RequestInit) => {
      const existingHeaders = options?.headers
        ? options.headers instanceof Headers
          ? Object.fromEntries(options.headers.entries())
          : (options.headers as Record<string, string>)
        : {};
      const headers = {
        ...existingHeaders,
        "x-cms-password": password,
      };
      const res = await fetch(url, { ...options, headers });
      if (res.status === 401) {
        setAuthenticated(false);
        sessionStorage.removeItem("cms_password");
        throw new Error("Session expired. Please log in again.");
      }
      return res;
    },
    [password]
  );

  // Load article list
  const loadArticles = useCallback(async () => {
    if (!authenticated) return;
    setLoading(true);
    setListError(null);
    try {
      const res = await authFetch("/api/cms/articles");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load articles");
      setArticles(data.articles ?? []);
    } catch (err) {
      setListError(String(err));
    } finally {
      setLoading(false);
    }
  }, [authenticated, authFetch]);

  useEffect(() => {
    if (authenticated) {
      loadArticles();
    }
  }, [authenticated, loadArticles]);

  // Filter articles
  useEffect(() => {
    let list = articles;
    if (typeFilter !== "all") list = list.filter((a) => a.type === typeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.slug.toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }, [articles, search, typeFilter]);

  // Load article detail
  const loadDetail = useCallback(
    async (article: ArticleListItem) => {
      setSelected(article);
      setDetail(null);
      setDetailError(null);
      setDetailLoading(true);
      setSaveStatus("idle");
      setSaveMessage("");
      try {
        const res = await authFetch(
          `/api/cms/article?slug=${encodeURIComponent(article.slug)}&type=${article.type}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to load article");
        setDetail(data);
        setEditTitle(data.title ?? "");
        setEditSeoTitle(data.seo?.title ?? "");
        setEditSeoDesc(data.seo?.description ?? "");
        setEditOgImage(data.seo?.ogImage ?? "");
        setEditImage(data.image ?? "");
        setEditImageAlt(data.imageAlt ?? "");
        setEditSectionsRaw(data.sectionsRaw ?? "");
      } catch (err) {
        setDetailError(String(err));
      } finally {
        setDetailLoading(false);
      }
    },
    [authFetch]
  );

  // Publish changes
  const handlePublish = async () => {
    if (!selected) return;
    setSaveStatus("saving");
    setSaveMessage("");
    try {
      const res = await authFetch("/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: selected.slug,
          type: selected.type,
          title: editTitle,
          seoTitle: editSeoTitle,
          seoDescription: editSeoDesc,
          ogImage: editOgImage,
          image: editImage,
          imageAlt: editImageAlt,
          sectionsRaw: editSectionsRaw,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Publish failed");
      setSaveStatus("success");
      setSaveMessage(data.message ?? "Published successfully");
      // Update list item title
      setArticles((prev) =>
        prev.map((a) =>
          a.slug === selected.slug
            ? { ...a, title: editTitle, seoTitle: editSeoTitle, seoDescription: editSeoDesc, ogImage: editOgImage }
            : a
        )
      );
    } catch (err) {
      setSaveStatus("error");
      setSaveMessage(String(err));
    }
  };

  const titleCharCount = editSeoTitle.length;
  const descCharCount = editSeoDesc.length;

  // ─── LOGIN SCREEN ───────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-teal-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">MedicareFAQ CMS Editor</h1>
              <p className="text-sm text-gray-500 mt-1">Enter your admin password to continue</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter admin password..."
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={authLoading || !passwordInput.trim()}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-teal-600 text-white rounded-lg px-4 py-2.5 hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            MedicareFAQ GitHub CMS Editor
          </p>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED DASHBOARD ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Github className="w-5 h-5 text-gray-700" />
          <span className="font-semibold text-gray-900">GitHub CMS Editor</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {loading ? "Loading..." : `${articles.length} articles`}
          </span>
          <button
            onClick={loadArticles}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
            title="Refresh article list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 57px)" }}>
        {/* Sidebar — Article List */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-hidden">
          {/* Search + Filter */}
          <div className="p-4 border-b border-gray-100 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or slug..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "blog", "coverage"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors capitalize ${
                    typeFilter === t
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t === "coverage" ? "FAQ" : t}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-16 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span className="text-sm">Loading articles...</span>
              </div>
            )}
            {listError && (
              <div className="p-4 text-sm text-red-600 bg-red-50 m-3 rounded-lg flex gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{listError}</span>
              </div>
            )}
            {!loading && !listError && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <FileText className="w-8 h-8 mb-2 opacity-40" />
                <p className="text-sm">No articles found</p>
                <p className="text-xs mt-1">Try adjusting your search or filter.</p>
              </div>
            )}
            {!loading &&
              filtered.map((article) => (
                <button
                  key={`${article.type}-${article.slug}`}
                  onClick={() => loadDetail(article)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                    selected?.slug === article.slug && selected?.type === article.type
                      ? "bg-teal-50 border-l-2 border-l-teal-500"
                      : ""
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {article.type === "blog" ? (
                      <FileText className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Globe className="w-4 h-4 text-teal-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate leading-snug">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{article.slug}</p>
                    <span
                      className={`inline-block mt-1 text-xs px-1.5 py-0.5 rounded font-medium ${
                        article.type === "blog"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-teal-50 text-teal-600"
                      }`}
                    >
                      {article.type === "blog" ? "Blog" : "FAQ"}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-1" />
                </button>
              ))}
          </div>
        </aside>

        {/* Main Editor Panel */}
        <main className="flex-1 overflow-y-auto">
          {!selected && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Github className="w-12 h-12 mb-4 opacity-30" />
              <p className="text-lg font-medium text-gray-500">Select an article to edit</p>
              <p className="text-sm mt-1">Choose a blog post or FAQ from the left panel</p>
            </div>
          )}

          {selected && (
            <div className="max-w-3xl mx-auto px-8 py-8">
              {/* Article Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-medium ${
                        selected.type === "blog"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-teal-50 text-teal-600"
                      }`}
                    >
                      {selected.type === "blog" ? "Blog Article" : "Coverage FAQ"}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">{selected.slug}</span>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">
                    {editTitle || selected.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Live
                  </a>
                  <button
                    onClick={handlePublish}
                    disabled={saveStatus === "saving" || detailLoading}
                    className="flex items-center gap-1.5 text-sm font-semibold bg-teal-600 text-white rounded-lg px-4 py-1.5 hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    {saveStatus === "saving" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        Publish to GitHub
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Save Status Banner */}
              {saveStatus === "success" && (
                <div className="mb-6 flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{saveMessage}</span>
                </div>
              )}
              {saveStatus === "error" && (
                <div className="mb-6 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{saveMessage}</span>
                </div>
              )}

              {detailLoading && (
                <div className="flex items-center justify-center py-16 text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  <span className="text-sm">Loading article content...</span>
                </div>
              )}

              {detailError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{detailError}</span>
                </div>
              )}

              {detail && !detailLoading && (
                <div className="space-y-6">
                  {/* Article Title */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      Article Title
                    </h2>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full text-base font-medium text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Article title..."
                    />
                  </div>

                  {/* Featured Image */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-gray-400" />
                      Featured Image
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={editImage}
                          onChange={(e) => setEditImage(e.target.value)}
                          className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                          Image Alt Text
                        </label>
                        <input
                          type="text"
                          value={editImageAlt}
                          onChange={(e) => setEditImageAlt(e.target.value)}
                          className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Descriptive alt text for the image..."
                        />
                      </div>
                      {editImage && (
                        <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                          <img
                            src={editImage}
                            alt={editImageAlt || "Featured image preview"}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SEO Fields */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-sm font-semibold text-gray-700 mb-5 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      SEO & Meta
                    </h2>
                    <div className="space-y-5">
                      {/* Meta Title */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Meta Title
                          </label>
                          <span
                            className={`text-xs font-medium ${
                              titleCharCount > 60
                                ? "text-red-500"
                                : titleCharCount > 50
                                ? "text-amber-500"
                                : "text-gray-400"
                            }`}
                          >
                            {titleCharCount}/60
                          </span>
                        </div>
                        <input
                          type="text"
                          value={editSeoTitle}
                          onChange={(e) => setEditSeoTitle(e.target.value)}
                          className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Meta title for search engines..."
                        />
                        {titleCharCount > 60 && (
                          <p className="text-xs text-red-500 mt-1">
                            Title exceeds 60 characters and may be truncated in search results
                          </p>
                        )}
                      </div>

                      {/* Meta Description */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Meta Description
                          </label>
                          <span
                            className={`text-xs font-medium ${
                              descCharCount > 160
                                ? "text-red-500"
                                : descCharCount > 140
                                ? "text-amber-500"
                                : "text-gray-400"
                            }`}
                          >
                            {descCharCount}/160
                          </span>
                        </div>
                        <textarea
                          value={editSeoDesc}
                          onChange={(e) => setEditSeoDesc(e.target.value)}
                          rows={3}
                          className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                          placeholder="Meta description for search engines..."
                        />
                        {descCharCount > 160 && (
                          <p className="text-xs text-red-500 mt-1">
                            Description exceeds 160 characters and may be truncated in search results
                          </p>
                        )}
                      </div>

                      {/* OG Image */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                          OG Image URL
                        </label>
                        <input
                          type="url"
                          value={editOgImage}
                          onChange={(e) => setEditOgImage(e.target.value)}
                          className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono"
                          placeholder="https://..."
                        />
                        {editOgImage && (
                          <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            <img
                              src={editOgImage}
                              alt="OG Image preview"
                              className="w-full h-40 object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Body Content (raw sections) */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        Body Content (sections array)
                      </h2>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded font-mono">
                        Raw TypeScript
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      Edit the structured content array directly. Changes are committed as-is to the repository.
                    </p>
                    <textarea
                      value={editSectionsRaw}
                      onChange={(e) => setEditSectionsRaw(e.target.value)}
                      rows={24}
                      className="w-full text-xs font-mono border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y bg-gray-50"
                      spellCheck={false}
                    />
                  </div>

                  {/* Publish Footer */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-200">
                    <p className="text-xs text-gray-400">
                      Publishing commits directly to{" "}
                      <span className="font-mono text-gray-600">main</span> and triggers a Vercel deploy.
                    </p>
                    <button
                      onClick={handlePublish}
                      disabled={saveStatus === "saving"}
                      className="flex items-center gap-2 text-sm font-semibold bg-teal-600 text-white rounded-lg px-5 py-2 hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                      {saveStatus === "saving" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Publish to GitHub
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
