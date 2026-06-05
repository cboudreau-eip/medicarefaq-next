"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  ImageIcon,
  Tag,
  Globe,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Plus,
  Eye,
} from "lucide-react";
import { useCMSAuth } from "../components/use-cms-auth";
import LoginScreen from "../components/login-screen";
import CMSHeader from "../components/cms-header";
import ImageUpload from "../components/image-upload";

const CATEGORIES = [
  "General",
  "Enrollment",
  "Costs",
  "Coverage",
  "Plans",
  "Supplements",
  "Advantage",
  "Part D",
  "Eligibility",
  "Medicare Supplement",
  "Healthcare",
  "General Medicare",
  "Senior Resources",
  "Medicare Basics",
  "Medicare Plans",
  "Medicare Coverage",
  "Prescription Drugs",
  "Medicare Benefits",
];

function generateSlug(title: string): string {
  // Remove common filler words and create a short, SEO-friendly slug (3-6 words)
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
    "being", "have", "has", "had", "do", "does", "did", "will", "would",
    "could", "should", "may", "might", "shall", "can", "need", "dare",
    "ought", "used", "its", "it", "this", "that", "these", "those",
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves",
    "you", "your", "yours", "yourself", "yourselves", "he", "him",
    "his", "himself", "she", "her", "hers", "herself", "they", "them",
    "their", "theirs", "themselves", "what", "which", "who", "whom",
    "when", "where", "why", "how", "all", "each", "every", "both",
    "few", "more", "most", "other", "some", "such", "no", "nor",
    "not", "only", "own", "same", "so", "than", "too", "very",
    "just", "because", "as", "until", "while", "about", "between",
    "through", "during", "before", "after", "above", "below",
    "up", "down", "out", "off", "over", "under", "again", "further",
    "then", "once", "here", "there", "also", "into",
    "understanding", "explained", "guide", "complete", "comprehensive",
    "everything", "know", "things", "way", "ways",
  ]);

  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 0);

  // Keep meaningful words, preserving important terms like years and numbers
  const meaningful = words.filter(
    (w) => !stopWords.has(w) || /^\d+$/.test(w)
  );

  // Take the first 5 meaningful words (aim for 3-6 word slugs)
  const slugWords = meaningful.slice(0, 5);

  // If we ended up with fewer than 2 words, fall back to first 4 words of original
  const finalWords = slugWords.length >= 2 ? slugWords : words.slice(0, 4);

  return finalWords
    .join("-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export default function CreateArticlePage() {
  const router = useRouter();
  const { authenticated, authLoading, password, login, logout, authFetch } = useCMSAuth();

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("General");
  const [image, setImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [htmlBody, setHtmlBody] = useState("");


  // Status state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await authFetch("/api/cms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          category,
          image,
          imageAlt,
          htmlBody,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Create failed");

      setSuccess(`Article "${title}" created successfully! Vercel deploy triggered. It will be live at /blog/${slug}/ in 1-2 minutes.`);

      // Reset form after success
      setTimeout(() => {
        router.push("/admin/github-editor");
      }, 3000);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

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

      {/* Sub-header with slug preview and publish button */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plus className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-semibold text-gray-900">Create New Blog Article</h2>
          </div>
          <div className="flex items-center gap-3">
            {slug && (
              <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
                /blog/{slug}/
              </span>
            )}
            <button
              onClick={handleSubmit}
              disabled={loading || !title || !slug}
              className="flex items-center gap-2 text-sm font-semibold bg-teal-600 text-white rounded-lg px-5 py-2 hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create &amp; Publish
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Status Banners */}
      {error && (
        <div className="max-w-6xl mx-auto px-6 mt-4">
          <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}
      {success && (
        <div className="max-w-6xl mx-auto px-6 mt-4">
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column — Main Fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-lg font-semibold border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your article title..."
                />
              </div>

              {/* URL Slug */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-gray-400" />
                  URL Slug *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 font-mono">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    className="flex-1 text-sm font-mono border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="article-url-slug"
                  />
                  <span className="text-sm text-gray-400 font-mono">/</span>
                </div>
                {slugManuallyEdited && (
                  <button
                    onClick={() => { setSlugManuallyEdited(false); setSlug(generateSlug(title)); }}
                    className="text-xs text-teal-600 hover:text-teal-700 mt-2"
                  >
                    Reset to auto-generated
                  </button>
                )}
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Excerpt / Meta Description
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y"
                  placeholder="Brief summary of the article (used for SEO and card previews)..."
                />
                <div className="flex justify-end mt-1">
                  <span className={`text-xs ${excerpt.length > 160 ? "text-amber-500" : "text-gray-400"}`}>
                    {excerpt.length}/160 recommended
                  </span>
                </div>
              </div>

              {/* HTML Body */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                    Article Body (HTML)
                  </label>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded font-mono">
                    HTML
                  </span>
                </div>
                <textarea
                  value={htmlBody}
                  onChange={(e) => setHtmlBody(e.target.value)}
                  rows={20}
                  className="w-full text-sm font-mono border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y bg-gray-50 leading-relaxed"
                  placeholder={`<h2>Section Title</h2>\n<p>Your article content here. Supports <strong>bold</strong>, <em>italic</em>, and <a href="/link">links</a>.</p>\n\n<h3>Subsection</h3>\n<p>More content...</p>\n\n<ul>\n  <li>List item one</li>\n  <li>List item two</li>\n</ul>\n\n<blockquote>Important note or callout text</blockquote>\n\n<table>\n  <tr><th>Header 1</th><th>Header 2</th></tr>\n  <tr><td>Cell 1</td><td>Cell 2</td></tr>\n</table>`}
                  spellCheck={false}
                />
                <p className="text-xs text-gray-400 mt-2">
                  Paste standard HTML. Supports: paragraphs, headings (h2/h3), lists (ul/ol), tables, images, blockquotes. Table of contents is auto-generated from h2 headings.
                </p>
              </div>
            </div>

            {/* Right Column — Sidebar Settings */}
            <div className="space-y-6">
              {/* Category */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Featured Image */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
                  Featured Image
                </label>
                <ImageUpload
                  password={password}
                  onUploaded={(url, fileName) => {
                    setImage(url);
                    if (!imageAlt) setImageAlt(fileName.replace(/[-_]/g, " ").replace(/\.[^.]+$/, ""));
                  }}
                />
                <div className="relative flex items-center my-3">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-3 text-xs text-gray-400">or paste URL</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2"
                  placeholder="https://images.unsplash.com/..."
                />
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Image alt text (for accessibility)"
                />
                {image && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={image}
                      alt={imageAlt || "Preview"}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Preview Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                  Card Preview
                </h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt={imageAlt || "Preview"}
                      className="w-full h-28 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "";
                        (e.target as HTMLImageElement).className = "w-full h-28 bg-gray-100";
                      }}
                    />
                  ) : (
                    <div className="w-full h-28 bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-white bg-blue-500 px-1.5 py-0.5 rounded uppercase">
                        Blog
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase">{category}</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-900 line-clamp-2">
                      {title || "Article Title"}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">
                      {excerpt || "Article excerpt will appear here..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-teal-800 mb-2">How it works</h3>
                <ul className="text-xs text-teal-700 space-y-1.5">
                  <li>• Creates article in the codebase</li>
                  <li>• Commits directly to main branch</li>
                  <li>• Triggers Vercel auto-deploy</li>
                  <li>• Article live in ~1-2 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
