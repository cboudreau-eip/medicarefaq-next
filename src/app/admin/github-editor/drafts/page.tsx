"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FileText,
  Loader2,
  Trash2,
  AlertCircle,
  Clock,
  Tag,
  CheckCircle2,
  ExternalLink,
  Search,
} from "lucide-react";
import { useCMSAuth } from "../components/use-cms-auth";
import LoginScreen from "../components/login-screen";
import SketchLayout from "../components/sketch-layout";
import "../sketch-theme.css";

interface DraftItem {
  id: string;
  title: string;
  category: string;
  updatedAt: string;
  createdAt: string;
  hasTransformed: boolean;
}

export default function DraftsPage() {
  const { authenticated, authLoading, login, logout, authFetch } = useCMSAuth();
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadDrafts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch("/api/cms/drafts");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load drafts");
      setDrafts(data.drafts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load drafts");
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    if (authenticated) {
      loadDrafts();
    }
  }, [authenticated, loadDrafts]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete draft "${title}"? This cannot be undone.`)) return;

    setDeleteLoading(id);
    try {
      const res = await authFetch("/api/cms/drafts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      setDeleteSuccess(`Deleted "${title}"`);
      setDrafts((prev) => prev.filter((d) => d.id !== id));
      setTimeout(() => setDeleteSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Unknown";
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

  // Filter drafts by search query
  const filteredDrafts = drafts.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-teal-600" />
            <h1 className="text-xl font-bold text-gray-900">Drafts</h1>
            <span className="text-sm bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full font-medium">
              {drafts.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drafts..."
                className="text-sm border border-gray-200 rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Success message */}
        {deleteSuccess && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-4">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{deleteSuccess}</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
            <span className="ml-3 text-sm text-gray-500">Loading drafts...</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && drafts.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">No drafts yet</h2>
            <p className="text-sm text-gray-500 mb-6">
              Drafts created via Smart Create will appear here.
            </p>
            <Link
              href="/admin/github-editor/create-smart"
              className="inline-flex items-center gap-2 text-sm font-semibold bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors"
            >
              Create with Smart Create
            </Link>
          </div>
        )}

        {/* No search results */}
        {!loading && drafts.length > 0 && filteredDrafts.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              No drafts match &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        )}

        {/* Drafts Grid */}
        {!loading && filteredDrafts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDrafts.map((draft) => (
              <div
                key={draft.id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-teal-200 transition-all group"
              >
                {/* Draft title */}
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">
                  {draft.title}
                </h3>

                {/* Meta info */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <Tag className="w-3 h-3" />
                    {draft.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {formatDate(draft.updatedAt)}
                  </span>
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-2 mb-4">
                  {draft.hasTransformed ? (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Ready to publish
                    </span>
                  ) : (
                    <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                      In progress
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <Link
                    href={`/admin/github-editor/create-smart?draft=${draft.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-lg px-3 py-2 hover:bg-teal-100 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Open Draft
                  </Link>
                  <button
                    onClick={() => handleDelete(draft.id, draft.title)}
                    disabled={deleteLoading === draft.id}
                    className="flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-red-600 rounded-lg px-2.5 py-2 hover:bg-red-50 transition-colors disabled:opacity-50"
                    title="Delete draft"
                  >
                    {deleteLoading === draft.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SketchLayout>
  );
}
