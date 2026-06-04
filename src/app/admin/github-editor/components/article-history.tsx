"use client";

import { useState, useCallback } from "react";
import {
  History,
  Loader2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Eye,
  X,
  GitCommit,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface CommitInfo {
  sha: string;
  message: string;
  date: string;
  author: string;
}

interface RevisionData {
  title: string;
  image: string;
  imageAlt: string;
  seo: { title: string; description: string; ogImage: string };
  sectionsRaw: string;
  rawBlock: string;
}

interface ArticleHistoryProps {
  slug: string;
  type: string;
  authFetch: (url: string, init?: RequestInit) => Promise<Response>;
  onRevert: () => void; // Called after successful revert to reload the article
}

export default function ArticleHistory({
  slug,
  type,
  authFetch,
  onRevert,
}: ArticleHistoryProps) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<CommitInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Revision preview
  const [previewSha, setPreviewSha] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<RevisionData | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Revert
  const [revertLoading, setRevertLoading] = useState(false);
  const [revertSuccess, setRevertSuccess] = useState<string | null>(null);
  const [revertConfirm, setRevertConfirm] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch(
        `/api/cms/article-history?slug=${encodeURIComponent(slug)}&type=${type}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load history");
      setHistory(data.history || []);
      setLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load history");
    } finally {
      setLoading(false);
    }
  }, [authFetch, slug, type]);

  const toggleExpanded = () => {
    if (!expanded && !loaded) {
      loadHistory();
    }
    setExpanded(!expanded);
  };

  const viewRevision = async (sha: string) => {
    setPreviewLoading(true);
    setPreviewSha(sha);
    setPreviewData(null);
    try {
      const res = await authFetch(
        `/api/cms/article-revision?slug=${encodeURIComponent(slug)}&type=${type}&sha=${sha}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load revision");
      setPreviewData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load revision");
      setPreviewSha(null);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleRevert = async (sha: string) => {
    setRevertLoading(true);
    setRevertSuccess(null);
    try {
      const res = await authFetch("/api/cms/article-revert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, type, sha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Revert failed");
      setRevertSuccess(data.message || "Reverted successfully");
      setRevertConfirm(null);
      setPreviewSha(null);
      setPreviewData(null);
      // Reload the article in the editor
      setTimeout(() => {
        onRevert();
        setRevertSuccess(null);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Revert failed");
    } finally {
      setRevertLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        return `${diffMins}m ago`;
      }
      return `${diffHours}h ago`;
    }
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const formatCommitMessage = (msg: string) => {
    // Clean up CMS commit messages
    return msg
      .replace(/^cms:\s*/i, "")
      .replace(/^feat:\s*/i, "")
      .replace(/^fix:\s*/i, "")
      .split("\n")[0]; // First line only
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header - clickable to expand */}
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <History className="w-4 h-4 text-gray-400" />
          Revision History
        </h2>
        <div className="flex items-center gap-2">
          {loaded && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {history.length} revision{history.length !== 1 ? "s" : ""}
            </span>
          )}
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-gray-200 px-6 py-4">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
              <span className="ml-2 text-sm text-gray-500">Loading history...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {revertSuccess && (
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{revertSuccess}</span>
            </div>
          )}

          {!loading && history.length === 0 && loaded && (
            <p className="text-sm text-gray-500 py-4 text-center">
              No revision history found for this article.
            </p>
          )}

          {!loading && history.length > 0 && (
            <div className="space-y-1">
              {history.map((commit, i) => (
                <div
                  key={commit.sha}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    i === 0
                      ? "bg-teal-50 border border-teal-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="shrink-0">
                    <GitCommit
                      className={`w-4 h-4 ${
                        i === 0 ? "text-teal-600" : "text-gray-300"
                      }`}
                    />
                  </div>

                  {/* Commit info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm truncate ${
                        i === 0 ? "font-medium text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {formatCommitMessage(commit.message)}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">
                        {formatDate(commit.date)}
                      </span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400 font-mono">
                        {commit.sha.slice(0, 7)}
                      </span>
                      {commit.author && (
                        <>
                          <span className="text-xs text-gray-300">·</span>
                          <span className="text-xs text-gray-400">
                            {commit.author}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {i === 0 ? (
                      <span className="text-xs text-teal-600 font-medium px-2 py-1">
                        Current
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => viewRevision(commit.sha)}
                          className="text-xs text-gray-500 hover:text-teal-600 px-2 py-1 rounded hover:bg-white transition-colors flex items-center gap-1"
                          title="Preview this revision"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                        {revertConfirm === commit.sha ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleRevert(commit.sha)}
                              disabled={revertLoading}
                              className="text-xs font-medium text-white bg-amber-500 hover:bg-amber-600 px-2 py-1 rounded transition-colors disabled:opacity-50"
                            >
                              {revertLoading ? "..." : "Confirm"}
                            </button>
                            <button
                              onClick={() => setRevertConfirm(null)}
                              className="text-xs text-gray-400 hover:text-gray-600 px-1 py-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setRevertConfirm(commit.sha)}
                            className="text-xs text-gray-500 hover:text-amber-600 px-2 py-1 rounded hover:bg-white transition-colors flex items-center gap-1"
                            title="Revert to this revision"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Revert
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Refresh button */}
          {loaded && (
            <button
              onClick={loadHistory}
              disabled={loading}
              className="mt-3 text-xs text-gray-500 hover:text-teal-600 flex items-center gap-1 transition-colors"
            >
              <History className="w-3 h-3" />
              Refresh history
            </button>
          )}
        </div>
      )}

      {/* Revision Preview Modal */}
      {previewSha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-3xl max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
              <div>
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-teal-600" />
                  Revision Preview
                </h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  {previewSha.slice(0, 7)}
                </p>
              </div>
              <button
                onClick={() => {
                  setPreviewSha(null);
                  setPreviewData(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {previewLoading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
                  <span className="ml-2 text-sm text-gray-500">
                    Loading revision...
                  </span>
                </div>
              )}

              {previewData && (
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Title
                    </label>
                    <p className="text-sm text-gray-900 mt-1 font-medium">
                      {previewData.title}
                    </p>
                  </div>

                  {/* SEO */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      SEO
                    </label>
                    <p className="text-xs text-gray-700">
                      <span className="font-medium">Title:</span>{" "}
                      {previewData.seo.title}
                    </p>
                    <p className="text-xs text-gray-700">
                      <span className="font-medium">Description:</span>{" "}
                      {previewData.seo.description}
                    </p>
                  </div>

                  {/* Image */}
                  {previewData.image && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Featured Image
                      </label>
                      <div className="mt-1 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={previewData.image}
                          alt={previewData.imageAlt || ""}
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Body Content (sections)
                    </label>
                    <pre className="mt-1 text-xs font-mono text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap">
                      {previewData.sectionsRaw || "(empty)"}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl shrink-0">
              <button
                onClick={() => {
                  setPreviewSha(null);
                  setPreviewData(null);
                }}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              {previewData && (
                <button
                  onClick={() => handleRevert(previewSha)}
                  disabled={revertLoading}
                  className="flex items-center gap-1.5 text-sm font-semibold bg-amber-500 text-white rounded-lg px-4 py-1.5 hover:bg-amber-600 transition-colors disabled:opacity-50"
                >
                  {revertLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Reverting...
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      Revert to This Version
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
