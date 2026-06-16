"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  Code,
  Eye,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Unlink,
} from "lucide-react";
import { useCMSAuth } from "../../../components/use-cms-auth";
import LoginScreen from "../../../components/login-screen";
import SketchLayout from "../../../components/sketch-layout";
import "../../../sketch-theme.css";
import ImageUpload from "../../../components/image-upload";
import ArticleHistory from "../../../components/article-history";
import SeoScorePanel from "../../../components/seo-score-panel";
import { sectionsToHtml, htmlToSections, serializeSectionsToTS } from "@/lib/html-sections-converter";

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
    focusKeyword?: string;
  };
  sectionsRaw: string;
  customSchemaRaw?: string;
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
  const [editSlug, setEditSlug] = useState("");
  const [editFocusKeyword, setEditFocusKeyword] = useState("");
  const [editSectionsRaw, setEditSectionsRaw] = useState("");
  const [editCustomSchema, setEditCustomSchema] = useState("");
  const [showSchemaPanel, setShowSchemaPanel] = useState(false);
  const [schemaError, setSchemaError] = useState("");

  // HTML editor state
  const [contentViewMode, setContentViewMode] = useState<"html" | "raw" | "preview">("html");
  const [editHtml, setEditHtml] = useState("");
  const [htmlDirty, setHtmlDirty] = useState(false);
  const htmlTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Toolbar helper: wrap selected text with tags or insert at cursor
  const wrapSelection = (before: string, after: string) => {
    const textarea = htmlTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = editHtml.slice(start, end);
    const replacement = `${before}${selected}${after}`;
    const newHtml = editHtml.slice(0, start) + replacement + editHtml.slice(end);
    setEditHtml(newHtml);
    setHtmlDirty(true);
    // Restore cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + before.length + selected.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const insertAtCursor = (text: string) => {
    const textarea = htmlTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const newHtml = editHtml.slice(0, start) + text + editHtml.slice(start);
    setEditHtml(newHtml);
    setHtmlDirty(true);
    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + text.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (!url) return;
    const textarea = htmlTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = editHtml.slice(start, end) || "link text";
    const replacement = `<a href="${url}">${selected}</a>`;
    const newHtml = editHtml.slice(0, start) + replacement + editHtml.slice(end);
    setEditHtml(newHtml);
    setHtmlDirty(true);
    setTimeout(() => { textarea.focus(); }, 0);
  };

  // Save state
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState("");


  // Delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [imageGenLoading, setImageGenLoading] = useState(false);
  const [imageGenError, setImageGenError] = useState("");
  // Temporary AI-generated image (not yet committed to GitHub)
  const [pendingImageBase64, setPendingImageBase64] = useState<string | null>(null);
  const [pendingImageFileName, setPendingImageFileName] = useState<string | null>(null);
  const [imageGenPrompt, setImageGenPrompt] = useState("");
  const [showImageGenPrompt, setShowImageGenPrompt] = useState(false);

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
      setEditSlug(data.slug ?? articleSlug);
      setEditSeoTitle(data.seo?.title ?? "");
      setEditSeoDesc(data.seo?.description ?? "");
      setEditOgImage(data.seo?.ogImage ?? "");
      setEditFocusKeyword(data.seo?.focusKeyword ?? "");
      setEditImage(data.image ?? "");
      setEditImageAlt(data.imageAlt ?? "");
      setEditSectionsRaw(data.sectionsRaw ?? "");
      setEditCustomSchema(data.customSchemaRaw ?? "");
      // Initialize HTML editor from parsed sections
      if (data.sections && Array.isArray(data.sections) && data.sections.length > 0) {
        setEditHtml(sectionsToHtml(data.sections));
      } else {
        setEditHtml("");
      }
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
      // Ensure any unsynced HTML editor changes are captured before publishing.
      // The HTML editor edits `editHtml` but the publish payload uses `editSectionsRaw`,
      // which only updates when the user clicks "Apply Changes". Sync it automatically here.
      let sectionsRawToPublish = editSectionsRaw;
      if (contentViewMode === "html" || htmlDirty) {
        try {
          const sections = htmlToSections(editHtml);
          const tsString = serializeSectionsToTS(sections);
          sectionsRawToPublish = tsString;
          setEditSectionsRaw(tsString);
          setHtmlDirty(false);
        } catch (syncErr) {
          // If conversion fails, fall back to existing raw value
          console.error("HTML->sections sync failed during publish:", syncErr);
        }
      }

      // If there's a pending AI-generated image, commit it to GitHub first
      let finalImageUrl = editImage;
      if (pendingImageBase64 && pendingImageFileName) {
        const imgRes = await authFetch("/api/cms/commit-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            base64: pendingImageBase64,
            fileName: pendingImageFileName,
          }),
        });
        const imgData = await imgRes.json();
        if (!imgRes.ok) throw new Error(imgData.error ?? "Image upload failed");
        finalImageUrl = imgData.url;
        // Clear pending state after successful commit
        setPendingImageBase64(null);
        setPendingImageFileName(null);
        setEditImage(finalImageUrl);
      }

      const res = await authFetch("/api/cms/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: articleSlug,
          type: articleType,
          newSlug: editSlug !== articleSlug ? editSlug : undefined,
          title: editTitle,
          seoTitle: editSeoTitle,
          seoDescription: editSeoDesc,
          ogImage: editOgImage,
          focusKeyword: editFocusKeyword,
          image: finalImageUrl,
          imageAlt: editImageAlt,
          sectionsRaw: sectionsRawToPublish,
          customSchemaRaw: editCustomSchema || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Publish failed");
      setSaveStatus("success");
      setSaveMessage(data.message ?? "Published successfully");
      // If slug was changed, redirect to the new edit URL
      if (editSlug && editSlug !== articleSlug) {
        setTimeout(() => {
          router.push(`/admin/github-editor/edit/${articleType}/${editSlug}`);
        }, 1500);
      }
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fdfbf3" }}>
        <Loader2 className="w-6 h-6 animate-spin text-[#2b2b2b]" />
      </div>
    );
  }

  // Login screen
  if (!authenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <SketchLayout onLogout={logout}>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">
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
                <span className="text-xs text-gray-400 font-mono">{editSlug || articleSlug}</span>
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
              {/* Article Title & Slug */}
              <div className="sketch-section">
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
                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Slug (URL path)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 shrink-0">{articleType === "blog" ? "/blog/" : "/faqs/"}</span>
                    <input
                      type="text"
                      value={editSlug}
                      onChange={(e) => {
                        const val = e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "-")
                          .replace(/--+/g, "-")
                          .replace(/^-/, "");
                        setEditSlug(val);
                      }}
                      className="flex-1 text-sm font-mono text-gray-700 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="article-slug"
                    />
                  </div>
                  {editSlug !== articleSlug && (
                    <p className="text-xs text-amber-600 mt-1">Slug will be changed from &ldquo;{articleSlug}&rdquo; to &ldquo;{editSlug}&rdquo;</p>
                  )}
                </div>
              </div>

              {/* Featured Image */}
              <div className="sketch-section">
                <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-gray-400" />
                  Featured Image
                </h2>
                <div className="space-y-4">
                  <ImageUpload
                    password={password}
                    onUploaded={(url, fileName) => {
                      setEditImage(url);
                      setPendingImageBase64(null);
                      setPendingImageFileName(null);
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
                          body: JSON.stringify({ title: editTitle || articleSlug, slug: articleSlug, category: "Medicare", customPrompt: imageGenPrompt || undefined }),
                        });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.error || `Failed: ${res.status}`);
                        // Use dataUrl for preview only — image is NOT committed to GitHub yet
                        setEditImage(data.dataUrl);
                        setPendingImageBase64(data.base64);
                        setPendingImageFileName(data.fileName);
                        if (!editImageAlt) setEditImageAlt(editTitle || articleSlug);
                        // Show the prompt that was used
                        setImageGenPrompt(data.prompt || "");
                        setShowImageGenPrompt(true);
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
                  {/* Custom image prompt - shown after generation with the prompt used */}
                  <button
                    type="button"
                    onClick={() => setShowImageGenPrompt(!showImageGenPrompt)}
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    <span>{showImageGenPrompt ? "▼" : "▶"}</span> Custom image prompt
                  </button>
                  {showImageGenPrompt && (
                    <textarea
                      value={imageGenPrompt}
                      onChange={(e) => setImageGenPrompt(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Describe the image you want (leave blank for auto-generated prompt based on title and category)..."
                    />
                  )}
                  <div className="relative flex items-center">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="px-3 text-xs text-gray-400">or paste URL</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>
                  <div>
                    <label className="sketch-label block mb-1.5">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={editImage}
                      onChange={(e) => { setEditImage(e.target.value); setPendingImageBase64(null); setPendingImageFileName(null); }}
                      className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div>
                    <label className="sketch-label block mb-1.5">
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
              <div className="sketch-section">
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
                          titleCharCount >= 50 && titleCharCount <= 60
                            ? "text-green-600"
                            : titleCharCount > 60
                            ? "text-red-500"
                            : titleCharCount >= 40
                            ? "text-amber-500"
                            : "text-gray-400"
                        }`}
                      >
                        {titleCharCount}/60{titleCharCount >= 50 && titleCharCount <= 60 ? " ✓" : ""}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={editSeoTitle}
                      onChange={(e) => setEditSeoTitle(e.target.value)}
                      className={`w-full text-sm border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                        titleCharCount >= 50 && titleCharCount <= 60
                          ? "border-green-400"
                          : titleCharCount > 60
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                      placeholder="Meta title for search engines..."
                    />
                    {titleCharCount > 60 ? (
                      <p className="text-xs text-red-500 mt-1">Title exceeds 60 characters and may be truncated in search results</p>
                    ) : titleCharCount >= 50 ? (
                      <p className="text-xs text-green-600 mt-1">Ideal length — good to go</p>
                    ) : titleCharCount > 0 ? (
                      <p className="text-xs text-amber-500 mt-1">Aim for 50–60 characters for best results</p>
                    ) : null}
                  </div>

                  {/* Meta Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Meta Description
                      </label>
                      <span
                        className={`text-xs font-medium ${
                          descCharCount >= 150 && descCharCount <= 160
                            ? "text-green-600"
                            : descCharCount > 160
                            ? "text-red-500"
                            : descCharCount >= 120
                            ? "text-amber-500"
                            : "text-gray-400"
                        }`}
                      >
                        {descCharCount}/160{descCharCount >= 150 && descCharCount <= 160 ? " ✓" : ""}
                      </span>
                    </div>
                    <textarea
                      value={editSeoDesc}
                      onChange={(e) => setEditSeoDesc(e.target.value)}
                      rows={3}
                      className={`w-full text-sm border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${
                        descCharCount >= 150 && descCharCount <= 160
                          ? "border-green-400"
                          : descCharCount > 160
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                      placeholder="Meta description for search engines..."
                    />
                    {descCharCount > 160 ? (
                      <p className="text-xs text-red-500 mt-1">Description exceeds 160 characters and may be truncated in search results</p>
                    ) : descCharCount >= 150 ? (
                      <p className="text-xs text-green-600 mt-1">Ideal length — good to go</p>
                    ) : descCharCount > 0 ? (
                      <p className="text-xs text-amber-500 mt-1">Aim for 150–160 characters for best results</p>
                    ) : null}
                  </div>

                  {/* OG Image */}
                  <div>
                    <label className="sketch-label block mb-1.5">
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

              {/* SEO Score Panel */}
              <SeoScorePanel
                title={editSeoTitle}
                description={editSeoDesc}
                slug={editSlug}
                html={editHtml}
                articleTitle={editTitle}
                keyword={editFocusKeyword}
                onKeywordChange={setEditFocusKeyword}
                onFixSlug={(newSlug) => setEditSlug(newSlug)}
                onRewriteIntro={async (kw) => {
                  // Find the first <p> tag in the HTML and rewrite it to include the keyword
                  const match = editHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/);
                  if (!match) return;
                  const introHtml = match[0];
                  const res = await authFetch("/api/cms/seo-fix", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "rewrite-intro", keyword: kw, introHtml, articleTitle: editTitle }),
                  });
                  const data = await res.json();
                  if (!res.ok || !data.result) throw new Error(data.error || "Rewrite failed");
                  // Replace only the first <p> in the HTML
                  setEditHtml((prev) => prev.replace(/<p[^>]*>[\s\S]*?<\/p>/, data.result));
                  setHtmlDirty(true);
                }}
                onExpandDescription={async (currentDesc, kw) => {
                  const res = await authFetch("/api/cms/seo-fix", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "expand-description", description: currentDesc, keyword: kw }),
                  });
                  const data = await res.json();
                  if (!res.ok || !data.result) throw new Error(data.error || "Expand failed");
                  setEditSeoDesc(data.result);
                }}
              />

              {/* Body Content Editor */}
              <div className="sketch-section">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    Page Content
                  </h2>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                    <button
                      onClick={() => {
                        setContentViewMode("html");
                      }}
                      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                        contentViewMode === "html"
                          ? "bg-white text-teal-700 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Code className="w-3 h-3" />
                      HTML
                    </button>
                    <button
                      onClick={() => setContentViewMode("preview")}
                      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                        contentViewMode === "preview"
                          ? "bg-white text-teal-700 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      Preview
                    </button>
                    <button
                      onClick={() => {
                        setContentViewMode("raw");
                      }}
                      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                        contentViewMode === "raw"
                          ? "bg-white text-teal-700 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <FileText className="w-3 h-3" />
                      Raw TS
                    </button>
                  </div>
                </div>

                {/* HTML Editor */}
                {contentViewMode === "html" && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">
                      Edit page content as HTML. Supports: headings (h2/h3), paragraphs, lists, tables, blockquotes (callouts), images, and FAQ (dl).
                    </p>
                    {/* Formatting Toolbar */}
                    <div className="flex items-center gap-0.5 border border-gray-200 rounded-lg px-2 py-1.5 bg-white flex-wrap">
                      <button type="button" onClick={() => wrapSelection("<strong>", "</strong>")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Bold">
                        <Bold className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => wrapSelection("<em>", "</em>")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Italic">
                        <Italic className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => wrapSelection("<u>", "</u>")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Underline">
                        <Underline className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => wrapSelection("<s>", "</s>")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Strikethrough">
                        <Strikethrough className="w-4 h-4" />
                      </button>
                      <div className="w-px h-5 bg-gray-200 mx-1" />
                      <button type="button" onClick={insertLink} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Insert Link">
                        <Link className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => wrapSelection("", "")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Remove Link (manual)">
                        <Unlink className="w-4 h-4" />
                      </button>
                      <div className="w-px h-5 bg-gray-200 mx-1" />
                      <button type="button" onClick={() => wrapSelection("<h2>", "</h2>")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Heading 2">
                        <Heading2 className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => wrapSelection("<h3>", "</h3>")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Heading 3">
                        <Heading3 className="w-4 h-4" />
                      </button>
                      <div className="w-px h-5 bg-gray-200 mx-1" />
                      <button type="button" onClick={() => insertAtCursor("\n<ul>\n  <li>Item</li>\n  <li>Item</li>\n</ul>\n")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Unordered List">
                        <List className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => insertAtCursor("\n<ol>\n  <li>Item</li>\n  <li>Item</li>\n</ol>\n")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Ordered List">
                        <ListOrdered className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => insertAtCursor('\n<blockquote data-type="info" data-title="Note">\n  Your callout text here\n</blockquote>\n')} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Blockquote / Callout">
                        <Quote className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => insertAtCursor('\n<table>\n  <thead>\n  <tr>\n    <th>Header 1</th>\n    <th>Header 2</th>\n  </tr>\n  </thead>\n  <tbody>\n  <tr>\n    <td>Cell 1</td>\n    <td>Cell 2</td>\n  </tr>\n  </tbody>\n</table>\n')} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Table">
                        <Table className="w-4 h-4" />
                      </button>
                      <div className="w-px h-5 bg-gray-200 mx-1" />
                      <button type="button" onClick={() => wrapSelection("<p>", "</p>")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Paragraph">
                        <AlignLeft className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => insertAtCursor('\n<img src="" alt="" />\n')} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Image">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => wrapSelection("<code>", "</code>")} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors" title="Inline Code">
                        <Code className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      ref={htmlTextareaRef}
                      value={editHtml}
                      onChange={(e) => {
                        setEditHtml(e.target.value);
                        setHtmlDirty(true);
                      }}
                      rows={28}
                      className="w-full text-sm font-mono border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y bg-gray-50 leading-relaxed"
                      spellCheck={false}
                      placeholder="<h2>Section Title</h2>\n<p>Your content here...</p>"
                    />
                    {htmlDirty && (
                      <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
                        <p className="text-xs text-amber-700 font-medium">
                          HTML has unsaved changes. Apply to update the article content.
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              // Revert to last saved HTML
                              if (detail) {
                                try {
                                  const jsonified = editSectionsRaw
                                    .replace(/(\w+):/g, '"$1":')
                                    .replace(/'/g, '"');
                                  const sections = JSON.parse(jsonified);
                                  setEditHtml(sectionsToHtml(sections));
                                } catch {
                                  setEditHtml("");
                                }
                              }
                              setHtmlDirty(false);
                            }}
                            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                          >
                            Discard
                          </button>
                          <button
                            onClick={() => {
                              // Convert HTML to sections and update sectionsRaw
                              const sections = htmlToSections(editHtml);
                              const tsString = serializeSectionsToTS(sections);
                              setEditSectionsRaw(tsString);
                              setHtmlDirty(false);
                            }}
                            className="flex items-center gap-1.5 text-xs font-semibold bg-teal-600 text-white rounded-lg px-3 py-1.5 hover:bg-teal-700 transition-colors"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            Apply Changes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Preview */}
                {contentViewMode === "preview" && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">
                      Live preview of the HTML content.
                    </p>
                    <div
                      className="prose prose-sm max-w-none border border-gray-200 rounded-lg px-6 py-4 bg-white min-h-[300px] max-h-[600px] overflow-y-auto"
                      dangerouslySetInnerHTML={{ __html: editHtml }}
                    />
                  </div>
                )}

                {/* Raw TS Editor (legacy) */}
                {contentViewMode === "raw" && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">
                      Raw TypeScript sections array. Changes are committed as-is to the repository.
                    </p>
                    <textarea
                      value={editSectionsRaw}
                      onChange={(e) => setEditSectionsRaw(e.target.value)}
                      rows={24}
                      className="w-full text-xs font-mono border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y bg-gray-50"
                      spellCheck={false}
                    />
                  </div>
                )}
              </div>

              {/* Schema (JSON-LD) */}
              <div className="sketch-section">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    Schema (JSON-LD)
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowSchemaPanel(!showSchemaPanel)}
                    className="text-xs text-teal-600 hover:text-teal-800 font-medium"
                  >
                    {showSchemaPanel ? "Hide" : "Show"}
                  </button>
                </div>
                {showSchemaPanel && (
                  <div className="space-y-4">
                    {/* Auto-generated schema preview */}
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                        Auto-Generated Schema (read-only)
                      </label>
                      <p className="text-xs text-gray-400 mb-2">
                        Article + BreadcrumbList + FAQPage schemas are auto-generated from your article data. These are always output on the page.
                      </p>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs font-mono text-gray-600 max-h-48 overflow-y-auto whitespace-pre-wrap">
                        {JSON.stringify(
                          [
                            {
                              "@context": "https://schema.org",
                              "@type": "Article",
                              headline: editSeoTitle || editTitle,
                              description: editSeoDesc,
                              url: `https://medicarefaq-next-nine.vercel.app${articleType === "blog" ? `/blog/${editSlug}/` : `/faqs/${editSlug}/`}`,
                              datePublished: "(from article data)",
                              author: { "@type": "Person", name: "(from article data)" },
                              publisher: { "@type": "Organization", name: "MedicareFAQ" },
                            },
                            {
                              "@context": "https://schema.org",
                              "@type": "BreadcrumbList",
                              itemListElement: [
                                { position: 1, name: "Home" },
                                { position: 2, name: articleType === "blog" ? "Blog" : "FAQs" },
                                { position: 3, name: editTitle },
                              ],
                            },
                          ],
                          null,
                          2
                        )}
                      </div>
                    </div>

                    {/* Custom schema editor */}
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                        Custom Schema (additive)
                      </label>
                      <p className="text-xs text-gray-400 mb-2">
                        Add additional JSON-LD schema types (e.g., HowTo, Product, VideoObject). This is rendered alongside the auto-generated schema. Enter a valid JSON array of schema objects.
                      </p>
                      <textarea
                        value={editCustomSchema}
                        onChange={(e) => {
                          setEditCustomSchema(e.target.value);
                          setSchemaError("");
                          // Validate JSON on change
                          if (e.target.value.trim()) {
                            try {
                              const parsed = JSON.parse(e.target.value);
                              if (!Array.isArray(parsed)) {
                                setSchemaError("Must be a JSON array (e.g., [{ ... }])");
                              }
                            } catch {
                              setSchemaError("Invalid JSON");
                            }
                          }
                        }}
                        rows={12}
                        className={`w-full text-xs font-mono border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y bg-gray-50 ${
                          schemaError ? "border-red-300" : "border-gray-200"
                        }`}
                        spellCheck={false}
                        placeholder={`[\n  {\n    "@context": "https://schema.org",\n    "@type": "HowTo",\n    "name": "How to ...",\n    "step": [...]\n  }\n]`}
                      />
                      {schemaError && (
                        <p className="text-xs text-red-500 mt-1">{schemaError}</p>
                      )}
                      {editCustomSchema.trim() && !schemaError && (
                        <p className="text-xs text-green-600 mt-1">Valid JSON — will be added to page alongside auto-generated schema.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Revision History */}
              <ArticleHistory
                slug={articleSlug}
                type={articleType}
                authFetch={authFetch}
                onRevert={loadDetail}
              />

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

    </SketchLayout>
  );
}
