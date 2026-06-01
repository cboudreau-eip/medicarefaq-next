"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Globe,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ImageIcon,
  Tag,
  Eye,
  Code,
  RotateCcw,
  Send,
  ChevronDown,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  User,
  Clock,
  FileText,
  ExternalLink,
  Save,
  FolderOpen,
  Trash2,
  X,
} from "lucide-react";
import { useCMSAuth } from "../components/use-cms-auth";
import LoginScreen from "../components/login-screen";
import CMSHeader from "../components/cms-header";
import ImageUpload from "../components/image-upload";

// --- Constants ---

const CATEGORIES = [
  "Medicare News",
  "Medicare Supplement",
  "Medicare Plans",
  "Getting Started",
  "Enrollment",
  "Senior Living",
  "Medicare Coverage",
  "Healthcare",
  "Medicare Costs",
  "Medicare Basics",
  "Medicare Advantage",
  "General",
  "Eligibility",
  "Benefits",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Medicare News": "#2563EB",
  "Medicare Supplement": "#4F46E5",
  "Medicare Plans": "#1B2A4A",
  "Getting Started": "#0D9488",
  "Enrollment": "#D97706",
  "Senior Living": "#059669",
  "Medicare Coverage": "#059669",
  "Healthcare": "#7C3AED",
  "Medicare Costs": "#C41230",
  "Medicare Basics": "#1B2A4A",
  "Medicare Advantage": "#0EA5E9",
  "General": "#0D9488",
  "Eligibility": "#0D9488",
  "Benefits": "#10B981",
};

const AUTHORS = [
  "David Haass",
  "Jagger Esch",
  "Dori Rivera",
  "MedicareFAQ Editorial Team",
];

const REVIEWERS = [
  "Ashlee Zareczny",
  "Licensed Medicare Specialist",
];

// --- Types ---

interface BlogSection {
  type: string;
  level?: number;
  text?: string;
  id?: string;
  content?: string;
  title?: string;
  headers?: string[];
  rows?: string[][];
  footnote?: string;
  calloutType?: string;
  calloutTitle?: string;
  calloutText?: string;
  ordered?: boolean;
  items?: string[];
  faqs?: { question: string; answer: string }[];
  src?: string;
  alt?: string;
  caption?: string;
}

interface TransformMeta {
  excerpt?: string;
  keyTakeaways?: string[];
  seoTitle?: string;
  seoDescription?: string;
  suggestedCategory?: string;
}

// --- Helper ---

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// --- Preview Components ---

function PreviewSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "heading":
      if (section.level === 2) {
        return (
          <h2 className="text-xl font-bold text-[#1B2A4A] mt-6 mb-3 pb-2 border-b border-gray-200">
            {section.text}
          </h2>
        );
      }
      return (
        <h3 className="text-lg font-semibold text-[#1B2A4A] mt-4 mb-2">
          {section.text}
        </h3>
      );

    case "paragraph":
      return (
        <p
          className="text-gray-700 leading-relaxed mb-3 text-sm"
          dangerouslySetInnerHTML={{
            __html: (section.content || "")
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\*(.*?)\*/g, "<em>$1</em>")
              .replace(
                /\[([^\]]+)\]\(([^)]+)\)/g,
                '<a href="$2" class="text-teal-600 underline">$1</a>'
              ),
          }}
        />
      );

    case "callout": {
      const styles: Record<string, { bg: string; border: string; titleColor: string; icon: typeof Info }> = {
        info: { bg: "bg-[#EFF6FF]", border: "border-[#BFDBFE]", titleColor: "text-[#1E40AF]", icon: Info },
        warning: { bg: "bg-[#FEF3C7]", border: "border-[#FDE68A]", titleColor: "text-[#92400E]", icon: AlertTriangle },
        success: { bg: "bg-[#F0FDF4]", border: "border-[#BBF7D0]", titleColor: "text-[#166534]", icon: CheckCircle },
        tip: { bg: "bg-[#F5F3FF]", border: "border-[#DDD6FE]", titleColor: "text-[#5B21B6]", icon: Lightbulb },
      };
      const style = styles[section.calloutType || "info"] || styles.info;
      const Icon = style.icon;
      return (
        <div className={`${style.bg} ${style.border} border rounded-lg p-4 my-4`}>
          <div className={`flex items-center gap-2 font-semibold text-sm mb-1 ${style.titleColor}`}>
            <Icon className="w-4 h-4" />
            {section.calloutTitle}
          </div>
          <p className="text-sm text-gray-700">{section.calloutText}</p>
        </div>
      );
    }

    case "table":
      return (
        <div className="my-4 overflow-x-auto">
          {section.title && (
            <p className="text-sm font-semibold text-gray-700 mb-2">{section.title}</p>
          )}
          <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#1B2A4A] text-white">
                {(section.headers || []).map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(section.rows || []).map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 border-t border-gray-200">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {section.footnote && (
            <p className="text-xs text-gray-500 mt-1 italic">{section.footnote}</p>
          )}
        </div>
      );

    case "list":
      if (section.ordered) {
        return (
          <ol className="list-decimal list-inside space-y-1 my-3 text-sm text-gray-700 pl-2">
            {(section.items || []).map((item, i) => (
              <li
                key={i}
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*(.*?)\*/g, "<em>$1</em>")
                    .replace(
                      /\[([^\]]+)\]\(([^)]+)\)/g,
                      '<a href="$2" class="text-teal-600 underline">$1</a>'
                    ),
                }}
              />
            ))}
          </ol>
        );
      }
      return (
        <ul className="list-disc list-inside space-y-1 my-3 text-sm text-gray-700 pl-2">
          {(section.items || []).map((item, i) => (
            <li
              key={i}
              dangerouslySetInnerHTML={{
                __html: item
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\*(.*?)\*/g, "<em>$1</em>")
                  .replace(
                    /\[([^\]]+)\]\(([^)]+)\)/g,
                    '<a href="$2" class="text-teal-600 underline">$1</a>'
                  ),
              }}
            />
          ))}
        </ul>
      );

    case "faq":
      return (
        <div className="my-4 space-y-2">
          {(section.faqs || []).map((faq, i) => (
            <details key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <summary className="px-4 py-3 bg-gray-50 cursor-pointer text-sm font-medium text-gray-800 hover:bg-gray-100">
                {faq.question}
              </summary>
              <div className="px-4 py-3 text-sm text-gray-700">{faq.answer}</div>
            </details>
          ))}
        </div>
      );

    case "image":
      return (
        <figure className="my-4">
          <img
            src={section.src}
            alt={section.alt || ""}
            className="rounded-lg w-full max-h-64 object-cover"
          />
          {section.caption && (
            <figcaption className="text-xs text-gray-500 mt-1 text-center italic">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

// --- Main Page ---

export default function SmartCreatePage() {
  const router = useRouter();
  const { authenticated, authLoading, password, login, logout, authFetch } = useCMSAuth();

  // Input state
  const [title, setTitle] = useState("");
  const [rawContent, setRawContent] = useState("");

  // Transform state
  const [transforming, setTransforming] = useState(false);
  const [sections, setSections] = useState<BlogSection[] | null>(null);
  const [tableOfContents, setTableOfContents] = useState<{ id: string; title: string }[]>([]);
  const [showJson, setShowJson] = useState(false);

  // Metadata state
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("General");
  const [author, setAuthor] = useState("David Haass");
  const [reviewer, setReviewer] = useState("Ashlee Zareczny");
  const [image, setImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>([]);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  // Status state
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Draft state
  const [draftId, setDraftId] = useState<string | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);
  const [showDraftsPanel, setShowDraftsPanel] = useState(false);
  const [drafts, setDrafts] = useState<{ id: string; title: string; category: string; updatedAt: string; hasTransformed: boolean }[]>([]);
  const [loadingDrafts, setLoadingDrafts] = useState(false);
  const [loadingDraftId, setLoadingDraftId] = useState<string | null>(null);
  const [deletingDraftId, setDeletingDraftId] = useState<string | null>(null);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugManuallyEdited]);

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  };

  // --- Transform ---
  const handleTransform = async () => {
    if (!rawContent.trim()) {
      setError("Please paste some content to transform.");
      return;
    }

    setTransforming(true);
    setError("");
    setSections(null);

    try {
      const res = await authFetch("/api/cms/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || "Untitled",
          rawContent,
          generateMeta: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Transform failed");

      setSections(data.sections);
      setTableOfContents(data.tableOfContents || []);

      // Auto-fill metadata from AI response
      if (data.meta) {
        const meta: TransformMeta = data.meta;
        if (meta.excerpt && !excerpt) setExcerpt(meta.excerpt);
        if (meta.keyTakeaways) setKeyTakeaways(meta.keyTakeaways);
        if (meta.seoTitle) setSeoTitle(meta.seoTitle);
        if (meta.seoDescription) setSeoDescription(meta.seoDescription);
        if (meta.suggestedCategory) setCategory(meta.suggestedCategory);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setTransforming(false);
    }
  };

  // --- Save Draft ---
  const handleSaveDraft = async () => {
    if (!title.trim()) {
      setError("Please enter a title before saving a draft.");
      return;
    }

    setSavingDraft(true);
    setError("");

    try {
      const draftPayload = {
        id: draftId || undefined,
        title,
        rawContent,
        slug,
        excerpt,
        category,
        author,
        reviewer,
        image,
        imageAlt,
        keyTakeaways,
        seoTitle,
        seoDescription,
        sections: sections || undefined,
        tableOfContents: tableOfContents.length > 0 ? tableOfContents : undefined,
      };

      const res = await authFetch("/api/cms/drafts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftPayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save draft");

      setDraftId(data.id);
      setDraftSavedAt(new Date(data.updatedAt).toLocaleTimeString());
      setSuccess(`Draft saved successfully.`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(String(err));
    } finally {
      setSavingDraft(false);
    }
  };

  // --- Load Drafts List ---
  const handleLoadDraftsList = async () => {
    setShowDraftsPanel(true);
    setLoadingDrafts(true);
    setError("");

    try {
      const res = await authFetch("/api/cms/drafts", { method: "GET" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load drafts");
      setDrafts(data.drafts || []);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoadingDrafts(false);
    }
  };

  // --- Load a Specific Draft ---
  const handleLoadDraft = async (id: string) => {
    setLoadingDraftId(id);
    setError("");

    try {
      const res = await authFetch(`/api/cms/drafts?id=${encodeURIComponent(id)}`, { method: "GET" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load draft");

      const draft = data.draft;
      setDraftId(draft.id);
      setTitle(draft.title || "");
      setRawContent(draft.rawContent || "");
      setSlug(draft.slug || "");
      setSlugManuallyEdited(!!draft.slug);
      setExcerpt(draft.excerpt || "");
      setCategory(draft.category || "General");
      setAuthor(draft.author || "David Haass");
      setReviewer(draft.reviewer || "Ashlee Zareczny");
      setImage(draft.image || "");
      setImageAlt(draft.imageAlt || "");
      setKeyTakeaways(draft.keyTakeaways || []);
      setSeoTitle(draft.seoTitle || "");
      setSeoDescription(draft.seoDescription || "");
      setSections(draft.sections || null);
      setTableOfContents(draft.tableOfContents || []);
      setDraftSavedAt(draft.updatedAt ? new Date(draft.updatedAt).toLocaleTimeString() : null);
      setShowDraftsPanel(false);
      setSuccess(`Draft "${draft.title}" loaded.`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoadingDraftId(null);
    }
  };

  // --- Delete a Draft ---
  const handleDeleteDraft = async (id: string) => {
    setDeletingDraftId(id);
    setError("");

    try {
      const res = await authFetch("/api/cms/drafts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to delete draft");

      setDrafts((prev) => prev.filter((d) => d.id !== id));
      if (draftId === id) {
        setDraftId(null);
        setDraftSavedAt(null);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setDeletingDraftId(null);
    }
  };

  // --- Full Preview ---
  const handleFullPreview = () => {
    if (!sections || sections.length === 0) return;

    // Calculate read time from sections
    let wordCount = 0;
    for (const s of sections) {
      if (s.type === "paragraph" && s.content) wordCount += s.content.split(/\s+/).length;
      else if (s.type === "list" && s.items) {
        for (const item of s.items) wordCount += item.split(/\s+/).length;
      } else if (s.type === "callout" && s.calloutText) wordCount += s.calloutText.split(/\s+/).length;
      else if (s.type === "faq" && s.faqs) {
        for (const faq of s.faqs) {
          wordCount += faq.question.split(/\s+/).length;
          wordCount += faq.answer.split(/\s+/).length;
        }
      } else if (s.type === "table" && s.rows) {
        for (const row of s.rows) for (const cell of row) wordCount += cell.split(/\s+/).length;
      }
    }
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    // Build the BlogArticleData object for the preview renderer
    const previewArticle = {
      slug: slug || "preview",
      title: title || "Untitled Article",
      excerpt: excerpt || "",
      category: category,
      categoryColor: CATEGORY_COLORS[category] || "#0D9488",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      author: author,
      reviewer: reviewer,
      readTime,
      image: image || "",
      imageAlt: imageAlt || "",
      keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : undefined,
      tableOfContents,
      sections,
      seo: seoTitle || seoDescription ? {
        title: seoTitle || title,
        description: seoDescription || excerpt,
      } : undefined,
    };

    // Store in sessionStorage and open preview in new tab
    sessionStorage.setItem("cms_preview_article", JSON.stringify(previewArticle));
    window.open("/admin/github-editor/preview", "_blank");
  };

  // --- Em Dash Removal Utility ---
  const removeEmDashes = (text: string): string => {
    return text.replace(/\u2014/g, "-").replace(/\u2013/g, "-");
  };

  const sanitizeSections = (secs: BlogSection[]): BlogSection[] => {
    return secs.map((s) => {
      const cleaned = { ...s };
      if (cleaned.content) cleaned.content = removeEmDashes(cleaned.content);
      if (cleaned.text) cleaned.text = removeEmDashes(cleaned.text);
      if (cleaned.calloutTitle) cleaned.calloutTitle = removeEmDashes(cleaned.calloutTitle);
      if (cleaned.calloutText) cleaned.calloutText = removeEmDashes(cleaned.calloutText);
      if (cleaned.title) cleaned.title = removeEmDashes(cleaned.title);
      if (cleaned.footnote) cleaned.footnote = removeEmDashes(cleaned.footnote);
      if (cleaned.items) cleaned.items = cleaned.items.map(removeEmDashes);
      if (cleaned.headers) cleaned.headers = cleaned.headers.map(removeEmDashes);
      if (cleaned.rows) cleaned.rows = cleaned.rows.map((row) => row.map(removeEmDashes));
      if (cleaned.faqs) cleaned.faqs = cleaned.faqs.map((faq) => ({
        question: removeEmDashes(faq.question),
        answer: removeEmDashes(faq.answer),
      }));
      if (cleaned.caption) cleaned.caption = removeEmDashes(cleaned.caption);
      return cleaned;
    });
  };

  // --- Publish ---
  const handlePublish = async () => {
    // Required fields validation
    const missing: string[] = [];
    if (!title.trim()) missing.push("Title");
    if (!slug.trim()) missing.push("URL Slug");
    if (!excerpt.trim()) missing.push("Excerpt");
    if (!category) missing.push("Category");
    if (!sections || sections.length === 0) missing.push("Transformed Content (click Transform first)");

    if (missing.length > 0) {
      setError(`Required fields missing: ${missing.join(", ")}`);
      return;
    }

    setPublishing(true);
    setError("");
    setSuccess("");

    try {
      // Sanitize: remove em dashes from all text content
      const cleanSections = sanitizeSections(sections!);
      const cleanTitle = removeEmDashes(title);
      const cleanExcerpt = removeEmDashes(excerpt);
      const cleanTakeaways = keyTakeaways.length > 0
        ? keyTakeaways.map(removeEmDashes)
        : undefined;
      const cleanSeoTitle = removeEmDashes(seoTitle);
      const cleanSeoDescription = removeEmDashes(seoDescription);

      const res = await authFetch("/api/cms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: cleanTitle,
          slug,
          excerpt: cleanExcerpt,
          category,
          author,
          reviewer,
          image,
          imageAlt,
          seoTitle: cleanSeoTitle,
          seoDescription: cleanSeoDescription,
          ogImage: image,
          structuredSections: cleanSections,
          keyTakeaways: cleanTakeaways,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Publish failed");

      setSuccess(
        `Article "${title}" published successfully! It will be live at /blog/${slug}/ in 1-2 minutes.`
      );

      setTimeout(() => {
        router.push("/admin/github-editor");
      }, 3000);
    } catch (err) {
      setError(String(err));
    } finally {
      setPublishing(false);
    }
  };

  // --- Auth states ---
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={login} />;
  }

  const hasTransformed = sections !== null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CMSHeader onLogout={logout} />

      {/* Sub-header */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h2 className="text-sm font-semibold text-gray-900">Smart Article Creator</h2>
            {hasTransformed && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                Transformed
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {slug && (
              <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
                /blog/{slug}/
              </span>
            )}
            {draftSavedAt && (
              <span className="text-xs text-gray-400">Saved {draftSavedAt}</span>
            )}
            <button
              onClick={handleLoadDraftsList}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg px-3 py-2 hover:bg-gray-200 transition-colors"
            >
              <FolderOpen className="w-4 h-4" />
              Drafts
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={savingDraft || !title.trim()}
              className="flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg px-3 py-2 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingDraft ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Draft
            </button>
            {hasTransformed && (
              <>
                <button
                  onClick={handleFullPreview}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Full Preview
                </button>
                <button
                  onClick={handlePublish}
                  disabled={publishing || !title || !slug}
                  className="flex items-center gap-2 text-sm font-semibold bg-teal-600 text-white rounded-lg px-5 py-2 hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {publishing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Publish to GitHub
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Drafts Panel Modal */}
      {showDraftsPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[70vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-gray-500" />
                Saved Drafts
              </h3>
              <button
                onClick={() => setShowDraftsPanel(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {loadingDrafts ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              ) : drafts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-sm text-gray-500">No saved drafts yet.</p>
                  <p className="text-xs text-gray-400 mt-1">Use "Save Draft" to save your work in progress.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {drafts.map((draft) => (
                    <div
                      key={draft.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{draft.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400">
                            {draft.updatedAt ? new Date(draft.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : ""}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{draft.category}</span>
                          {draft.hasTransformed && (
                            <span className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded">Transformed</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleLoadDraft(draft.id)}
                        disabled={loadingDraftId === draft.id}
                        className="text-xs font-medium text-teal-600 hover:text-teal-700 px-3 py-1.5 rounded-lg hover:bg-teal-50 transition-colors disabled:opacity-50"
                      >
                        {loadingDraftId === draft.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          "Load"
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteDraft(draft.id)}
                        disabled={deletingDraftId === draft.id}
                        className="text-xs text-red-400 hover:text-red-600 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {deletingDraftId === draft.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Status Banners */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 mt-4">
          <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
            <button onClick={() => setError("")} className="ml-auto text-red-400 hover:text-red-600">&times;</button>
          </div>
        </div>
      )}
      {success && (
        <div className="max-w-7xl mx-auto px-6 mt-4">
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT PANEL — Input */}
            <div className="space-y-5">
              {/* Title */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-base font-semibold border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your article title..."
                />
              </div>

              {/* Raw Content Input */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                    Raw Content (HTML, Markdown, or Plain Text)
                  </label>
                  <span className="text-xs text-gray-400">
                    {rawContent.length > 0 ? `${rawContent.split(/\s+/).filter(Boolean).length} words` : ""}
                  </span>
                </div>
                <textarea
                  value={rawContent}
                  onChange={(e) => setRawContent(e.target.value)}
                  rows={18}
                  className="w-full text-sm font-mono border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y bg-gray-50 leading-relaxed"
                  placeholder="Paste your article content here...&#10;&#10;Supports:&#10;- Plain text&#10;- HTML (<h2>, <p>, <ul>, <table>, etc.)&#10;- Markdown (## headings, **bold**, - lists)&#10;&#10;The AI will intelligently structure it with callout boxes, tables, FAQ accordions, and proper formatting."
                  spellCheck={false}
                />
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-gray-400">
                    AI will add callouts, tables, FAQs, and rich formatting automatically.
                  </p>
                  <button
                    onClick={handleTransform}
                    disabled={transforming || !rawContent.trim()}
                    className="flex items-center gap-2 text-sm font-semibold bg-purple-600 text-white rounded-lg px-5 py-2.5 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {transforming ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transforming...
                      </>
                    ) : hasTransformed ? (
                      <>
                        <RotateCcw className="w-4 h-4" />
                        Re-transform
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Transform with AI
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Metadata Panel (shown after transform) */}
              {hasTransformed && (
                <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                    Article Metadata
                  </h3>

                  {/* Slug */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">URL Slug</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-mono">/blog/</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => handleSlugChange(e.target.value)}
                        className="flex-1 text-sm font-mono border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <span className="text-xs text-gray-400 font-mono">/</span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Excerpt</label>
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={2}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Brief summary..."
                    />
                    <span className={`text-xs ${excerpt.length > 160 ? "text-amber-500" : "text-gray-400"}`}>
                      {excerpt.length}/160
                    </span>
                  </div>

                  {/* Category + Author + Reviewer */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Author</label>
                      <select
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      >
                        {AUTHORS.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Reviewer</label>
                      <select
                        value={reviewer}
                        onChange={(e) => setReviewer(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      >
                        {REVIEWERS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* SEO Fields */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">SEO Title</label>
                      <input
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="SEO title (max 60 chars)"
                      />
                      <span className={`text-xs ${seoTitle.length > 60 ? "text-amber-500" : "text-gray-400"}`}>
                        {seoTitle.length}/60
                      </span>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">SEO Description</label>
                      <input
                        type="text"
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Meta description (max 160 chars)"
                      />
                      <span className={`text-xs ${seoDescription.length > 160 ? "text-amber-500" : "text-gray-400"}`}>
                        {seoDescription.length}/160
                      </span>
                    </div>
                  </div>

                  {/* Key Takeaways */}
                  {keyTakeaways.length > 0 && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Key Takeaways</label>
                      <div className="space-y-2">
                        {keyTakeaways.map((kt, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-xs text-gray-400 mt-2 shrink-0">{i + 1}.</span>
                            <input
                              type="text"
                              value={kt}
                              onChange={(e) => {
                                const updated = [...keyTakeaways];
                                updated[i] = e.target.value;
                                setKeyTakeaways(updated);
                              }}
                              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Featured Image */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      Featured Image
                    </label>
                    <ImageUpload
                      password={password}
                      onUploaded={(url, fileName) => {
                        setImage(url);
                        if (!imageAlt) setImageAlt(fileName.replace(/[-_]/g, " ").replace(/\.[^.]+$/, ""));
                      }}
                    />
                    <div className="relative flex items-center my-2">
                      <div className="flex-1 border-t border-gray-200"></div>
                      <span className="px-3 text-xs text-gray-400">or paste URL</span>
                      <div className="flex-1 border-t border-gray-200"></div>
                    </div>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                      placeholder="https://..."
                    />
                    <input
                      type="text"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Image alt text"
                    />
                    {image && (
                      <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={image}
                          alt={imageAlt || "Preview"}
                          className="w-full h-32 object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT PANEL — Preview */}
            <div className="space-y-5">
              {!hasTransformed ? (
                <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-700 mb-2">Live Preview</h3>
                  <p className="text-sm text-gray-500 max-w-sm">
                    Paste your content on the left and click &ldquo;Transform with AI&rdquo; to see a live preview of how your article will look on the site.
                  </p>
                </div>
              ) : (
                <>
                  {/* Preview Header */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-teal-600" />
                      <span className="text-sm font-semibold text-gray-700">Article Preview</span>
                      <span className="text-xs text-gray-400">
                        ({sections.length} sections, {tableOfContents.length} headings)
                      </span>
                    </div>
                    <button
                      onClick={() => setShowJson(!showJson)}
                      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                        showJson
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      {showJson ? "Show Preview" : "Show JSON"}
                    </button>
                  </div>

                  {/* Preview Content */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 max-h-[calc(100vh-220px)] overflow-y-auto">
                    {showJson ? (
                      <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                        {JSON.stringify(sections, null, 2)}
                      </pre>
                    ) : (
                      <div>
                        {/* Article title in preview */}
                        <h1 className="text-2xl font-bold text-[#1B2A4A] mb-4">{title || "Untitled Article"}</h1>

                        {/* Meta line */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 pb-4 border-b border-gray-200">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {Math.max(1, Math.ceil(rawContent.split(/\s+/).length / 200))} min read
                          </span>
                          <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
                            {category}
                          </span>
                        </div>

                        {/* Key Takeaways */}
                        {keyTakeaways.length > 0 && (
                          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-4 mb-6">
                            <h3 className="text-sm font-semibold text-[#166534] mb-2">Key Takeaways</h3>
                            <ul className="space-y-1">
                              {keyTakeaways.map((kt, i) => (
                                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                  <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                                  {kt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Table of Contents */}
                        {tableOfContents.length > 0 && (
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Table of Contents</h3>
                            <ul className="space-y-1">
                              {tableOfContents.map((item, i) => (
                                <li key={i} className="text-sm text-teal-700 hover:text-teal-900">
                                  <a href={`#${item.id}`}>{item.title}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Sections */}
                        {sections.map((section, i) => (
                          <PreviewSection key={i} section={section} />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
