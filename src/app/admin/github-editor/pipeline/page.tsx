"use client";

import { useState, useEffect, useCallback } from "react";
import { useCMSAuth } from "../components/use-cms-auth";
import LoginScreen from "../components/login-screen";
import SketchLayout from "../components/sketch-layout";
import "../sketch-theme.css";
import {
  Download,
  Eye,
  ListChecks,
  Clock,
  FileText,
  Play,
  CheckCircle,
  XCircle,
  RefreshCw,
  Loader2,
  ExternalLink,
  Sparkles,
  Edit3,
  Trash2,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";

// --- Types ---
interface PipelineItem {
  id: string;
  status:
    | "ingested"
    | "briefed"
    | "approved"
    | "rejected"
    | "producing"
    | "done"
    | "failed";
  sourceTitle: string;
  sourceUrl: string;
  sourceCategory: string;
  sourceSnippet: string;
  sourceSeo: {
    suggestedTitle: string;
    metaDescription: string;
    primaryKeyword: string;
    semanticKeywords: string[];
    contentAngle: string;
  };
  topic: string;
  importanceScore: number;
  ingestedAt: string;
  brief?: {
    title: string;
    keyword: string;
    secondaryKeywords: string[];
    wordCount: number;
    linkCount: number;
    description: string;
    category: string;
  };
  briefGeneratedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  producedAt?: string;
  draftSlug?: string;
  error?: string;
  /** EST calendar date "YYYY-MM-DD" this item is scheduled to be produced. */
  scheduledFor?: string;
}

type Tab = "intake" | "review" | "queue" | "output";

const STORAGE_KEY = "medicarefaq-pipeline-items";

function loadItems(): PipelineItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveItems(items: PipelineItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function PipelinePage() {
  const { authenticated, authLoading, login, logout, authFetch } = useCMSAuth();
  const [activeTab, setActiveTab] = useState<Tab>("intake");
  const [items, setItems] = useState<PipelineItem[]>([]);
  const [isPolling, setIsPolling] = useState(false);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState<string | null>(null);
  const [isProducing, setIsProducing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingBrief, setEditingBrief] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  useEffect(() => {
    setItems(loadItems());
  }, []);

  const updateItems = useCallback((updater: (prev: PipelineItem[]) => PipelineItem[]) => {
    setItems((prev) => {
      const next = updater(prev);
      saveItems(next);
      return next;
    });
  }, []);

  // --- INTAKE ---
  const handlePollS3 = async () => {
    setIsPolling(true);
    setError(null);
    try {
      const alreadyIngested = items.map((i) => i.id);
      const resp = await fetch("/api/cms/pipeline/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alreadyIngested }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Poll failed");

      if (data.newArticles.length === 0) {
        setError("No new articles found in the bucket.");
        return;
      }

      const newItems: PipelineItem[] = data.newArticles.map((a: any) => ({
        id: a.id,
        status: "ingested",
        sourceTitle: a.title,
        sourceUrl: a.url,
        sourceCategory: a.category,
        sourceSnippet: a.snippet,
        sourceSeo: a.seo,
        topic: a.topic,
        importanceScore: a.importanceScore,
        ingestedAt: a.ingestedAt,
      }));

      updateItems((prev) => [...prev, ...newItems]);
      setError(`Ingested ${newItems.length} new article(s).`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPolling(false);
    }
  };

  // --- BRIEF GENERATION ---
  const handleGenerateBrief = async (item: PipelineItem) => {
    setIsGeneratingBrief(item.id);
    setError(null);
    try {
      const resp = await fetch("/api/cms/pipeline/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article: item }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Brief generation failed");

      updateItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                status: "briefed" as const,
                brief: data.brief,
                briefGeneratedAt: new Date().toISOString(),
              }
            : i
        )
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGeneratingBrief(null);
    }
  };

  const handleGenerateAllBriefs = async () => {
    const ingested = items.filter((i) => i.status === "ingested");
    for (const item of ingested) {
      await handleGenerateBrief(item);
    }
  };

  // --- APPROVE / REJECT ---
  const handleApprove = (id: string) => {
    updateItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "approved" as const, approvedAt: new Date().toISOString() } : i
      )
    );
  };

  const handleReject = (id: string) => {
    updateItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "rejected" as const, rejectedAt: new Date().toISOString() } : i
      )
    );
  };

  // --- EDIT BRIEF ---
  const handleStartEdit = (item: PipelineItem) => {
    setEditingBrief(item.id);
    setEditForm({ ...item.brief });
  };

  const handleSaveEdit = (id: string) => {
    updateItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, brief: { ...editForm } } : i))
    );
    setEditingBrief(null);
    setEditForm(null);
  };

  // --- PRODUCE ---
  const handleProduce = async (item: PipelineItem) => {
    setIsProducing(item.id);
    setError(null);
    updateItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "producing" as const } : i))
    );
    try {
      const resp = await authFetch("/api/cms/pipeline/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Production failed");

      updateItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                status: "done" as const,
                producedAt: new Date().toISOString(),
                draftSlug: data.slug,
              }
            : i
        )
      );
    } catch (err: any) {
      updateItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, status: "failed" as const, error: err.message } : i
        )
      );
      setError(err.message);
    } finally {
      setIsProducing(null);
    }
  };

  // --- DELETE ---
  const handleDelete = (id: string) => {
    updateItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleDeleteAll = (status: string) => {
    updateItems((prev) => prev.filter((i) => i.status !== status));
  };

  // --- FILTERED LISTS (newest first) ---
  const sortNewest = (a: PipelineItem, b: PipelineItem) =>
    new Date(b.ingestedAt || 0).getTime() - new Date(a.ingestedAt || 0).getTime();
  const ingestedItems = items.filter((i) => i.status === "ingested").sort(sortNewest);
  const briefedItems = items.filter((i) => i.status === "briefed").sort(sortNewest);
  const approvedItems = items.filter((i) => i.status === "approved" || i.status === "producing").sort(sortNewest);
  const doneItems = items.filter((i) => i.status === "done").sort((a, b) =>
    new Date(b.producedAt || 0).getTime() - new Date(a.producedAt || 0).getTime()
  );
  const rejectedItems = items.filter((i) => i.status === "rejected").sort(sortNewest);
  const failedItems = items.filter((i) => i.status === "failed").sort(sortNewest);

  // --- TABS ---
  const tabs: { id: Tab; label: string; icon: any; count: number }[] = [
    { id: "intake", label: "Intake", icon: Download, count: ingestedItems.length },
    { id: "review", label: "Review", icon: Eye, count: briefedItems.length },
    { id: "queue", label: "Queue", icon: ListChecks, count: approvedItems.length },
    { id: "output", label: "Output", icon: FileText, count: doneItems.length },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fdfbf3" }}>
        <Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b]" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <SketchLayout onLogout={logout}>
    <div className="flex-1 px-6 py-6 max-w-6xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Content Pipeline</h1>
        <p className="text-gray-600 mt-1">
          From S3 ideas to published drafts — all in one place.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? "bg-teal-100 text-teal-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
        <Link
          href="/admin/github-editor/pipeline/calendar"
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          title="Open the editorial calendar"
        >
          <CalendarDays size={16} />
          Calendar
        </Link>
      </div>

      {/* Error/Info Banner */}
      {error && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            error.includes("Ingested") || error.includes("No new")
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {error}
          <button onClick={() => setError(null)} className="ml-2 font-bold">
            ×
          </button>
        </div>
      )}

      {/* INTAKE TAB */}
      {activeTab === "intake" && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Play size={20} className="text-teal-600" />
              <h2 className="text-lg font-semibold">Ingest New Content</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Fetch new files from your S3 bucket and generate AI briefs for each
              article idea found.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handlePollS3}
                disabled={isPolling}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
              >
                {isPolling ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Play size={16} />
                )}
                {isPolling ? "Polling..." : "Run Poll Now"}
              </button>
              {ingestedItems.length > 0 && (
                <button
                  onClick={handleGenerateAllBriefs}
                  disabled={!!isGeneratingBrief}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingBrief ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  Generate All Briefs ({ingestedItems.length})
                </button>
              )}
            </div>
          </div>

          {/* Recent Intake List */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
              <Clock size={16} />
              Recent Intake ({ingestedItems.length} awaiting brief)
            </h3>
            {ingestedItems.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No items awaiting brief generation. Click &quot;Run Poll Now&quot; to fetch new ideas.
              </p>
            ) : (
              <div className="space-y-3">
                {ingestedItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-100 rounded-lg p-4 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.sourceTitle}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.sourceSnippet?.slice(0, 120)}...
                      </p>
                      <div className="flex gap-3 mt-2 text-xs text-gray-400">
                        <span># {item.sourceSeo?.primaryKeyword || item.topic}</span>
                        <span>Score: {item.importanceScore}</span>
                        <span>
                          {new Date(item.ingestedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleGenerateBrief(item)}
                        disabled={isGeneratingBrief === item.id}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50"
                      >
                        {isGeneratingBrief === item.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Sparkles size={14} />
                        )}
                        Brief
                      </button>
                      {item.sourceUrl && (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* REVIEW TAB */}
      {activeTab === "review" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {briefedItems.length} brief(s) awaiting review
            </p>
            {rejectedItems.length > 0 && (
              <button
                onClick={() => handleDeleteAll("rejected")}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear {rejectedItems.length} rejected
              </button>
            )}
          </div>

          {briefedItems.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
              <Eye size={32} className="mx-auto mb-3 text-gray-300" />
              <p>No briefs awaiting review.</p>
              <p className="text-sm mt-1">
                Ingest new content and generate briefs first.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {briefedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                          AI-GENERATED BRIEF
                        </span>
                      </div>

                      {editingBrief === item.id ? (
                        /* Edit Mode */
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) =>
                              setEditForm({ ...editForm, title: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            placeholder="Title"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={editForm.keyword}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  keyword: e.target.value,
                                })
                              }
                              className="px-3 py-2 border rounded-lg text-sm"
                              placeholder="Primary keyword"
                            />
                            <input
                              type="number"
                              value={editForm.wordCount}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  wordCount: parseInt(e.target.value) || 1200,
                                })
                              }
                              className="px-3 py-2 border rounded-lg text-sm"
                              placeholder="Word count"
                            />
                          </div>
                          <textarea
                            value={editForm.description}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                description: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            rows={3}
                            placeholder="Description / angle"
                          />
                          <input
                            type="text"
                            value={(editForm.secondaryKeywords || []).join(", ")}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                secondaryKeywords: e.target.value
                                  .split(",")
                                  .map((s: string) => s.trim())
                                  .filter(Boolean),
                              })
                            }
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            placeholder="Secondary keywords (comma-separated)"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveEdit(item.id)}
                              className="px-3 py-1.5 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingBrief(null);
                                setEditForm(null);
                              }}
                              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* View Mode */
                        <>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.brief?.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              # {item.brief?.keyword}
                            </span>
                            <span>Links: {item.brief?.linkCount}</span>
                            <span>Words: {item.brief?.wordCount}</span>
                          </div>
                          {item.brief?.secondaryKeywords &&
                            item.brief.secondaryKeywords.length > 0 && (
                              <div className="mt-3">
                                <span className="text-xs text-gray-500">
                                  Secondary Keywords
                                </span>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  {item.brief.secondaryKeywords.map((kw, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                                    >
                                      {kw}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          <div className="mt-3">
                            <span className="text-xs text-gray-500">
                              Description
                            </span>
                            <p className="text-sm text-gray-700 mt-1">
                              {item.brief?.description}
                            </p>
                          </div>
                          <div className="mt-2 text-xs text-gray-400">
                            Generated:{" "}
                            {item.briefGeneratedAt
                              ? new Date(item.briefGeneratedAt).toLocaleString()
                              : "N/A"}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    {editingBrief !== item.id && (
                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <CheckCircle size={14} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          <Edit3 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleGenerateBrief(item)}
                          disabled={isGeneratingBrief === item.id}
                          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                          {isGeneratingBrief === item.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <RefreshCw size={14} />
                          )}
                          Regenerate
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="flex items-center gap-1.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <XCircle size={14} />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* QUEUE TAB */}
      {activeTab === "queue" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {approvedItems.length} article(s) in production queue
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="/admin/github-editor/pipeline/calendar"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                title="Plan queued articles on the editorial calendar"
              >
                <CalendarDays size={14} />
                Calendar
              </Link>
              {approvedItems.some((i) => i.status !== "producing") && (
                <button
                  onClick={() => {
                    if (confirm("Remove all articles from the production queue? This cannot be undone.")) {
                      handleDeleteAll("approved");
                    }
                  }}
                  disabled={!!isProducing}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Clear queue
                </button>
              )}
            </div>
          </div>

          {approvedItems.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
              <ListChecks size={32} className="mx-auto mb-3 text-gray-300" />
              <p>No articles in the production queue.</p>
              <p className="text-sm mt-1">Approve briefs to add them here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {approvedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {item.brief?.title}
                    </h4>
                    <div className="flex gap-3 mt-1 text-sm text-gray-500">
                      <span># {item.brief?.keyword}</span>
                      <span>{item.brief?.wordCount} words</span>
                      <span>{item.brief?.category}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    {item.status === "producing" ? (
                      <div className="flex items-center gap-2 text-sm text-amber-600">
                        <Loader2 size={16} className="animate-spin" />
                        Producing...
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleProduce(item)}
                          disabled={!!isProducing}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
                        >
                          <Play size={14} />
                          Produce Article
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={!!isProducing}
                          title="Remove from queue"
                          className="flex items-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Failed items */}
          {failedItems.length > 0 && (
            <div className="mt-6">
              <h3 className="text-md font-semibold text-red-600 mb-3">
                Failed ({failedItems.length})
              </h3>
              {failedItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-red-200 rounded-lg p-4 mb-2 bg-red-50"
                >
                  <h4 className="font-medium text-gray-900">
                    {item.brief?.title}
                  </h4>
                  <p className="text-sm text-red-600 mt-1">{item.error}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        updateItems((prev) =>
                          prev.map((i) =>
                            i.id === item.id
                              ? { ...i, status: "approved" as const, error: undefined }
                              : i
                          )
                        );
                      }}
                      className="text-sm text-teal-600 hover:text-teal-700"
                    >
                      Retry
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* OUTPUT TAB */}
      {activeTab === "output" && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {doneItems.length} article(s) produced
          </p>

          {doneItems.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
              <FileText size={32} className="mx-auto mb-3 text-gray-300" />
              <p>No articles produced yet.</p>
              <p className="text-sm mt-1">
                Approve and produce briefs from the queue.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {doneItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {item.brief?.title}
                    </h4>
                    <div className="flex gap-3 mt-1 text-sm text-gray-500">
                      <span># {item.brief?.keyword}</span>
                      <span>
                        Produced:{" "}
                        {item.producedAt
                          ? new Date(item.producedAt).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {item.draftSlug && (
                      <a
                        href={`/admin/github-editor/create-smart?draft=pipeline-${item.draftSlug}`}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100"
                      >
                        <Edit3 size={14} />
                        Open Draft
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
    </SketchLayout>
  );
}
