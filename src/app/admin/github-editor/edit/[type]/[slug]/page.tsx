"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FileText,
  Save,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Tag,
  ImageIcon,
  Trash2,
  X,
  Sparkles,
} from "lucide-react";
import { useCMSAuth } from "../../../components/use-cms-auth";
import LoginScreen from "../../../components/login-screen";
import CMSHeader from "../../../components/cms-header";
import ImageUpload from "../../../components/image-upload";

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

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleType = params.type as string;
  const articleSlug = params.slug as string;

  const { authenticated, authLoading, password, login, logout, authFetch } = useCMSAuth();

  // Detail state
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


  // Delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [imageGenLoading, setImageGenLoading] = useState(false);
  const [imageGenError, setImageGenError] = useState("");

  // Load article detail
  const loadDetail = useCallback(async () => {
    if (!authenticated || !articleSlug || !articleType) return;
    setDetailLoading(true);
    setDetailError(null);
    try {
      const res = await authFetch(
        `/api/cms/article?slug=${encodeURIComponent(articleSlug)}&type=${articleType}`
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
  }, [authenticated, authFetch, articleSlug, articleType]);

  useEffect(() => {
    if (authenticated) {
      loadDetail();
    }
  }, [authenticated, loadDetail]);

  // Publish changes
  const handlePublish = async () => {
    if (!detail) return;
    setSaveStatus("saving");
    setSaveMessage("");
    try {
      const res = await authFetch("/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: articleSlug,
          type: articleType,
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
    } catch (err) {
      setSaveStatus("error");
      setSaveMessage(String(err));
    }
  };

  // Handle delete
  const handleDelete = async () => {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      const res = await authFetch("/api/cms/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: articleSlug,
          type: articleType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Delete failed");
      // Navigate back to the list
      router.push("/admin/github-editor");
    } catch (err) {
      setDeleteError(String(err));
    } finally {
      setDeleteLoading(false);
    }
  };

  const titleCharCount = editSeoTitle.length;
  const descCharCount = editSeoDesc.length;

  const liveUrl =
    articleType === "blog"
      ? `/blog/${articleSlug}/`
      : `/faqs/${articleSlug}/`;

  // Auth loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
      </div>
    );
  }

  // Login screen
  if (!authenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CMSHeader onLogout={logout} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-8">
          {/* Article Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded font-medium ${
                    articleType === "blog"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-teal-50 text-teal-600"
                  }`}
                >
                  {articleType === "blog" ? "Blog Article" : "Coverage FAQ"}
                </span>
                <span className="text-xs text-gray-400 font-mono">{articleSlug}</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                {editTitle || articleSlug}
              </h1>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button
                onClick={() => { setShowDeleteConfirm(true); setDeleteError(""); }}
                className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-colors"
                title="Delete this article"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
              <a
                href={liveUrl}
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
                  <ImageUpload
                    password={password}
                    onUploaded={(url, fileName) => {
                      setEditImage(url);
                      if (!editImageAlt) setEditImageAlt(fileName.replace(/[-_]/g, " ").replace(/\.[^.]+$/, ""));
                    }}
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      setImageGenLoading(true);
                      setImageGenError("");
                      try {
                        const res = await authFetch("/api/cms/generate-image", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ title: editTitle || articleSlug, slug: articleSlug, category: "Medicare" }),
                        });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.error || `Failed: ${res.status}`);
                        setEditImage(data.rawUrl || data.url);
                        if (!editImageAlt) setEditImageAlt(editTitle || articleSlug);
                      } catch (err: unknown) {
                        setImageGenError(err instanceof Error ? err.message : "Image generation failed");
                      } finally {
                        setImageGenLoading(false);
                      }
                    }}
                    disabled={imageGenLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 transition-all"
                  >
                    {imageGenLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> {editImage ? "Regenerate with AI" : "Generate with AI"}</>
                    )}
                  </button>
                  {imageGenError && (
                    <p className="text-xs text-red-500 mt-1">{imageGenError}</p>
                  )}
                  <div className="relative flex items-center">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="px-3 text-xs text-gray-400">or paste URL</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>
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
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-red-500" />
                Delete Article
              </h2>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm text-gray-600 mb-3">
                Are you sure you want to permanently delete this article? This will remove it from the site on the next deploy.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">{editTitle || articleSlug}</p>
                <p className="text-xs text-gray-400 font-mono mt-1">{liveUrl}</p>
                <span className={`inline-block text-xs px-1.5 py-0.5 rounded font-medium mt-2 ${
                  articleType === "blog" ? "bg-blue-50 text-blue-600" : "bg-teal-50 text-teal-600"
                }`}>
                  {articleType === "blog" ? "Blog" : "FAQ"}
                </span>
              </div>

              {deleteError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-4">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{deleteError}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex items-center gap-2 text-sm font-semibold bg-red-600 text-white rounded-lg px-4 py-1.5 hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleteLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
