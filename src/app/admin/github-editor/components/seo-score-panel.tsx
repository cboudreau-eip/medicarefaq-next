"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Gauge,
  Wand2,
  Link2,
  RotateCcw,
  Loader2,
} from "lucide-react";
import SeoFixReviewModal, { SeoFixReview } from "./seo-fix-review-modal";

type CheckStatus = "good" | "warn" | "bad";

interface SeoCheck {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
  weight: number; // contribution to the score
}

/** A single field value (meta title / description / slug). */
type ApplyValue = (value: string) => void;

interface SeoScorePanelProps {
  title: string; // meta title
  description: string; // meta description
  slug: string;
  html: string; // body content as HTML
  keyword?: string; // primary keyword (controlled value)
  onKeywordChange?: (value: string) => void; // called when keyword changes
  articleTitle?: string; // the H1 / article title

  /**
   * Auth token / password sent as `x-cms-password` for the seo-fix API.
   * When omitted, the panel falls back to a global getter if present.
   */
  authToken?: string;

  // --- Apply callbacks: invoked only AFTER the user approves the AI change ---
  /** Apply a new slug (from "Fix slug" — non-AI, applied immediately, no modal). */
  onApplySlug?: ApplyValue;
  /** Apply a new meta title. */
  onApplyMetaTitle?: ApplyValue;
  /** Apply a new meta description. */
  onApplyMetaDescription?: ApplyValue;
  /** Apply a new article H1 title. */
  onApplyArticleTitle?: ApplyValue;
  /** Apply new body HTML (intro rewrite, density boost, alt-text fix). */
  onApplyHtml?: ApplyValue;

  /** Scroll to the internal links panel (Smart Create only; non-AI). */
  onScrollToLinks?: () => void;
}

// Strip HTML tags to get plain text
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = haystack.match(new RegExp(escaped, "gi"));
  return matches ? matches.length : 0;
}

/** Derive a short slug from a title + keyword, inserting the keyword words. */
function buildKeywordSlug(title: string, keyword: string): string {
  const stopWords = new Set([
    "a","an","the","and","or","but","in","on","at","to","for","of","with","by",
    "from","is","are","was","were","be","been","being","have","has","had","do",
    "does","did","will","would","could","should","may","might","shall","can",
    "it","this","that","you","your","what","which","who","how","all","some",
    "understanding","explained","guide","complete","comprehensive","everything",
    "know","things","way","ways","best","top","right","good","new","full",
    "simple","easy","tips","ultimate","essential","important","comparison",
    "compare","versus","vs","choosing","choose","find","effectively",
  ]);
  const kwWords = keyword.trim().toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
  const titleWords = title.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w && !stopWords.has(w));
  const combined: string[] = [...kwWords];
  for (const w of titleWords) {
    if (!combined.includes(w)) combined.push(w);
    if (combined.length >= 4) break;
  }
  return combined.slice(0, 4).join("-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 45) || kwWords.slice(0,3).join("-");
}

/** Extract the first paragraph (intro) from body HTML. */
function extractIntro(html: string): string {
  const m = html.match(/<p[\s>][\s\S]*?<\/p>/i);
  return m ? m[0] : "";
}

export default function SeoScorePanel({
  title,
  description,
  slug,
  html,
  keyword: keywordProp,
  onKeywordChange,
  articleTitle,
  authToken,
  onApplySlug,
  onApplyMetaTitle,
  onApplyMetaDescription,
  onApplyArticleTitle,
  onApplyHtml,
  onScrollToLinks,
}: SeoScorePanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [internalKeyword, setInternalKeyword] = useState(keywordProp ?? "");
  const keyword = onKeywordChange ? (keywordProp ?? "") : internalKeyword;
  const setKeyword = (value: string) => {
    if (onKeywordChange) onKeywordChange(value);
    else setInternalKeyword(value);
  };

  // Which check currently has an AI request running (by check id).
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // The pending review (before/after) awaiting user Apply/Discard.
  const [review, setReview] = useState<SeoFixReview | null>(null);
  // The function to run when the user clicks "Apply" in the modal.
  const [applyFn, setApplyFn] = useState<(() => void) | null>(null);

  /** Resolve the auth token for the seo-fix API call. */
  function getAuthToken(): string {
    if (authToken) return authToken;
    if (typeof window !== "undefined") {
      try {
        return window.sessionStorage.getItem("cms_session_token") || "";
      } catch {
        return "";
      }
    }
    return "";
  }

  /** Call the seo-fix API for a given action; returns the AI result string. */
  async function callSeoFix(action: string, payload: Record<string, unknown>): Promise<string> {
    const res = await fetch("/api/cms/seo-fix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-cms-password": getAuthToken(),
      },
      body: JSON.stringify({ action, keyword, articleTitle, ...payload }),
    });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      throw new Error(data?.error || `Request failed (${res.status})`);
    }
    return String(data.result ?? "");
  }

  /**
   * Run an AI fix: call the API, then open the review modal. The actual
   * apply only happens when the user confirms in the modal.
   */
  async function runAiFix(opts: {
    id: string;
    action: string;
    payload: Record<string, unknown>;
    before: string;
    title: string;
    summary: string;
    highlight?: string;
    isHtml?: boolean;
    apply: (result: string) => void;
  }) {
    setError(null);
    setLoadingId(opts.id);
    try {
      const result = await callSeoFix(opts.action, opts.payload);
      const after = result.trim();
      // Open the review modal; capture the apply action in a closure.
      setReview({
        title: opts.title,
        summary: opts.summary,
        before: opts.before,
        after,
        highlight: opts.highlight,
        isHtml: opts.isHtml,
      });
      setApplyFn(() => () => {
        opts.apply(after);
        setReview(null);
        setApplyFn(null);
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoadingId(null);
    }
  }

  const { score, checks } = useMemo(() => {
    const plainText = stripHtml(html);
    const wordCount = plainText ? plainText.split(/\s+/).length : 0;
    const kw = keyword.trim().toLowerCase();
    const lowerText = plainText.toLowerCase();
    const lowerTitle = (title || "").toLowerCase();
    const lowerArticleTitle = (articleTitle || "").toLowerCase();
    const lowerSlug = (slug || "").toLowerCase();

    const checks: SeoCheck[] = [];

    // 1. Meta title length (50-60 ideal)
    const titleLen = (title || "").length;
    checks.push({
      id: "title-length",
      label: "Meta title length",
      weight: 15,
      ...(titleLen >= 50 && titleLen <= 60
        ? { status: "good" as CheckStatus, detail: `${titleLen} chars — ideal (50-60)` }
        : titleLen >= 40 && titleLen <= 65
        ? { status: "warn" as CheckStatus, detail: `${titleLen} chars — acceptable, aim for 50-60` }
        : { status: "bad" as CheckStatus, detail: `${titleLen} chars — should be 50-60` }),
    });

    // 2. Meta description length (150-160 ideal)
    const descLen = (description || "").length;
    checks.push({
      id: "desc-length",
      label: "Meta description length",
      weight: 15,
      ...(descLen >= 150 && descLen <= 160
        ? { status: "good" as CheckStatus, detail: `${descLen} chars — ideal (150-160)` }
        : descLen >= 120 && descLen <= 165
        ? { status: "warn" as CheckStatus, detail: `${descLen} chars — acceptable, aim for 150-160` }
        : { status: "bad" as CheckStatus, detail: `${descLen} chars — should be 150-160` }),
    });

    // 3. Keyword present (only scored if a keyword is provided)
    if (kw) {
      checks.push({
        id: "kw-title",
        label: "Keyword in meta title",
        weight: 12,
        ...(lowerTitle.includes(kw)
          ? { status: "good" as CheckStatus, detail: "Found in meta title" }
          : { status: "bad" as CheckStatus, detail: "Not found in meta title" }),
      });

      checks.push({
        id: "kw-h1",
        label: "Keyword in article title (H1)",
        weight: 10,
        ...(lowerArticleTitle.includes(kw)
          ? { status: "good" as CheckStatus, detail: "Found in article title" }
          : { status: "warn" as CheckStatus, detail: "Not found in article title" }),
      });

      checks.push({
        id: "kw-desc",
        label: "Keyword in meta description",
        weight: 8,
        ...(description.toLowerCase().includes(kw)
          ? { status: "good" as CheckStatus, detail: "Found in meta description" }
          : { status: "warn" as CheckStatus, detail: "Not found in meta description" }),
      });

      const kwSlug = kw.replace(/\s+/g, "-");
      checks.push({
        id: "kw-slug",
        label: "Keyword in URL slug",
        weight: 8,
        ...(lowerSlug.includes(kwSlug) || kw.split(/\s+/).every((w) => lowerSlug.includes(w))
          ? { status: "good" as CheckStatus, detail: "Reflected in slug" }
          : { status: "warn" as CheckStatus, detail: "Not reflected in slug" }),
      });

      const kwCount = countOccurrences(lowerText, kw);
      const density = wordCount > 0 ? (kwCount * kw.split(/\s+/).length * 100) / wordCount : 0;
      checks.push({
        id: "kw-density",
        label: "Keyword density",
        weight: 10,
        ...(kwCount === 0
          ? { status: "bad" as CheckStatus, detail: "Keyword not found in body content" }
          : density >= 0.5 && density <= 2.5
          ? { status: "good" as CheckStatus, detail: `${density.toFixed(1)}% (${kwCount}x) — ideal range` }
          : density < 0.5
          ? { status: "warn" as CheckStatus, detail: `${density.toFixed(1)}% (${kwCount}x) — a bit low` }
          : { status: "warn" as CheckStatus, detail: `${density.toFixed(1)}% (${kwCount}x) — may be over-optimized` }),
      });

      const firstChunk = lowerText.slice(0, 600);
      checks.push({
        id: "kw-intro",
        label: "Keyword in intro",
        weight: 7,
        ...(firstChunk.includes(kw)
          ? { status: "good" as CheckStatus, detail: "Found in opening content" }
          : { status: "warn" as CheckStatus, detail: "Not in first ~100 words" }),
      });
    }

    // 4. Word count
    checks.push({
      id: "word-count",
      label: "Content length",
      weight: 10,
      ...(wordCount >= 600
        ? { status: "good" as CheckStatus, detail: `${wordCount} words` }
        : wordCount >= 300
        ? { status: "warn" as CheckStatus, detail: `${wordCount} words — consider expanding` }
        : { status: "bad" as CheckStatus, detail: `${wordCount} words — too thin` }),
    });

    // 5. Subheadings present (H2)
    const h2Count = countOccurrences(html, "<h2");
    checks.push({
      id: "subheadings",
      label: "Subheadings (H2)",
      weight: 8,
      ...(h2Count >= 3
        ? { status: "good" as CheckStatus, detail: `${h2Count} H2 headings` }
        : h2Count >= 1
        ? { status: "warn" as CheckStatus, detail: `${h2Count} H2 — add more structure` }
        : { status: "bad" as CheckStatus, detail: "No H2 subheadings" }),
    });

    // 6. Links
    const linkCount = countOccurrences(html, "<a ");
    checks.push({
      id: "links",
      label: "Links",
      weight: 7,
      ...(linkCount >= 3
        ? { status: "good" as CheckStatus, detail: `${linkCount} links` }
        : linkCount >= 1
        ? { status: "warn" as CheckStatus, detail: `${linkCount} link(s) — add more` }
        : { status: "bad" as CheckStatus, detail: "No links found" }),
    });

    // 7. Images with alt text
    const imgCount = countOccurrences(html, "<img");
    const imgWithAlt = (html.match(/<img[^>]*\salt="[^"]+"/gi) || []).length;
    checks.push({
      id: "images",
      label: "Image alt text",
      weight: 5,
      ...(imgCount === 0
        ? { status: "warn" as CheckStatus, detail: "No images in content" }
        : imgWithAlt === imgCount
        ? { status: "good" as CheckStatus, detail: `All ${imgCount} image(s) have alt text` }
        : { status: "warn" as CheckStatus, detail: `${imgWithAlt}/${imgCount} images have alt text` }),
    });

    const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0);
    const earned = checks.reduce((sum, c) => {
      const factor = c.status === "good" ? 1 : c.status === "warn" ? 0.5 : 0;
      return sum + c.weight * factor;
    }, 0);
    const score = totalWeight > 0 ? Math.round((earned / totalWeight) * 100) : 0;

    return { score, checks };
  }, [title, description, slug, html, keyword, articleTitle]);

  const scoreColor =
    score >= 80 ? "#16a34a" : score >= 55 ? "#d97706" : "#dc2626";
  const scoreLabel =
    score >= 80 ? "Good" : score >= 55 ? "Needs work" : "Poor";

  const StatusIcon = ({ status }: { status: CheckStatus }) => {
    if (status === "good") return <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />;
    if (status === "warn") return <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />;
    return <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />;
  };

  /** A small AI button used inside check rows. */
  const AiButton = ({
    id,
    label,
    onClick,
    color = "purple",
  }: {
    id: string;
    label: string;
    onClick: () => void;
    color?: "purple" | "teal" | "amber" | "blue";
  }) => {
    const busy = loadingId === id;
    const palette: Record<string, string> = {
      purple: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
      teal: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100",
      amber: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
      blue: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    };
    return (
      <button
        type="button"
        disabled={busy || loadingId !== null}
        onClick={onClick}
        className={`ml-auto shrink-0 flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded border transition-colors disabled:opacity-50 ${palette[color]}`}
      >
        {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
        {busy ? "Working…" : label}
      </button>
    );
  };

  /** Render an optional inline action button for a check row. */
  const CheckAction = ({ check }: { check: SeoCheck }) => {
    if (check.status === "good") return null;

    // Fix slug — non-AI, applied immediately (no modal needed for a deterministic slug).
    if (check.id === "kw-slug" && onApplySlug && keyword) {
      const suggestedSlug = buildKeywordSlug(articleTitle || title, keyword);
      return (
        <button
          type="button"
          onClick={() => onApplySlug(suggestedSlug)}
          className="ml-auto shrink-0 flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
          title={`Set slug to: ${suggestedSlug}`}
        >
          <RotateCcw className="w-3 h-3" />
          Fix slug
        </button>
      );
    }

    // Links shortcut — non-AI scroll.
    if (check.id === "links" && onScrollToLinks) {
      return (
        <button
          type="button"
          onClick={onScrollToLinks}
          className="ml-auto shrink-0 flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
        >
          <Link2 className="w-3 h-3" />
          Add links
        </button>
      );
    }

    // Fix meta title length (AI → review modal).
    if (check.id === "title-length" && onApplyMetaTitle && title) {
      return (
        <AiButton
          id="title-length"
          label="Fix with AI"
          color="teal"
          onClick={() =>
            runAiFix({
              id: "title-length",
              action: "fix-title-length",
              payload: { metaTitle: title },
              before: title,
              title: "Fix meta title length",
              summary: "AI adjusted the meta title to the ideal 50-60 characters.",
              highlight: keyword,
              apply: (r) => onApplyMetaTitle(r),
            })
          }
        />
      );
    }

    // Add keyword to meta title (AI → review modal).
    if (check.id === "kw-title" && onApplyMetaTitle && title && keyword) {
      return (
        <AiButton
          id="kw-title"
          label="Add keyword"
          onClick={() =>
            runAiFix({
              id: "kw-title",
              action: "add-keyword-to-title",
              payload: { metaTitle: title },
              before: title,
              title: "Add keyword to meta title",
              summary: `AI rewrote the meta title to include "${keyword}".`,
              highlight: keyword,
              apply: (r) => onApplyMetaTitle(r),
            })
          }
        />
      );
    }

    // Add keyword to H1 / article title (AI → review modal).
    if (check.id === "kw-h1" && onApplyArticleTitle && articleTitle && keyword) {
      return (
        <AiButton
          id="kw-h1"
          label="Add keyword"
          onClick={() =>
            runAiFix({
              id: "kw-h1",
              action: "add-keyword-to-h1",
              payload: { h1Title: articleTitle },
              before: articleTitle,
              title: "Add keyword to article title",
              summary: `AI rewrote the H1 to include "${keyword}".`,
              highlight: keyword,
              apply: (r) => onApplyArticleTitle(r),
            })
          }
        />
      );
    }

    // Add keyword to meta description (AI → review modal).
    if (check.id === "kw-desc" && onApplyMetaDescription && description && keyword) {
      return (
        <AiButton
          id="kw-desc"
          label="Add keyword"
          onClick={() =>
            runAiFix({
              id: "kw-desc",
              action: "add-keyword-to-desc",
              payload: { description },
              before: description,
              title: "Add keyword to meta description",
              summary: `AI rewrote the description to include "${keyword}".`,
              highlight: keyword,
              apply: (r) => onApplyMetaDescription(r),
            })
          }
        />
      );
    }

    // Expand / fix meta description length (AI → review modal).
    if (check.id === "desc-length" && onApplyMetaDescription && description) {
      return (
        <AiButton
          id="desc-length"
          label="Expand with AI"
          color="teal"
          onClick={() =>
            runAiFix({
              id: "desc-length",
              action: "expand-description",
              payload: { description },
              before: description,
              title: "Adjust meta description length",
              summary: "AI rewrote the description to the ideal 150-160 characters.",
              highlight: keyword,
              apply: (r) => onApplyMetaDescription(r),
            })
          }
        />
      );
    }

    // Rewrite intro (AI → review modal). Operates on the first paragraph only.
    if (check.id === "kw-intro" && onApplyHtml && keyword) {
      const intro = extractIntro(html);
      if (!intro) return null;
      return (
        <AiButton
          id="kw-intro"
          label="Rewrite intro"
          onClick={() =>
            runAiFix({
              id: "kw-intro",
              action: "rewrite-intro",
              payload: { introHtml: intro },
              before: intro,
              title: "Rewrite intro with keyword",
              summary: `AI rewrote the opening paragraph to include "${keyword}".`,
              highlight: keyword,
              isHtml: true,
              apply: (newIntro) => {
                // Replace only the first paragraph in the body HTML.
                const updated = html.replace(intro, newIntro);
                onApplyHtml(updated);
              },
            })
          }
        />
      );
    }

    // Boost keyword density (AI → review modal). Operates on full body HTML.
    if (check.id === "kw-density" && onApplyHtml && keyword) {
      return (
        <AiButton
          id="kw-density"
          label="Boost density"
          color="amber"
          onClick={() =>
            runAiFix({
              id: "kw-density",
              action: "boost-keyword-density",
              payload: { bodyHtml: html },
              before: html,
              title: "Boost keyword density",
              summary: `AI added 2-3 natural uses of "${keyword}" into the body.`,
              highlight: keyword,
              isHtml: true,
              apply: (r) => onApplyHtml(r),
            })
          }
        />
      );
    }

    // Fix image alt text (AI → review modal). Operates on full body HTML.
    if (check.id === "images" && onApplyHtml) {
      // Only offer when there is at least one image missing alt text.
      const imgCount = countOccurrences(html, "<img");
      const imgWithAlt = (html.match(/<img[^>]*\salt="[^"]+"/gi) || []).length;
      if (imgCount === 0 || imgWithAlt === imgCount) return null;
      return (
        <AiButton
          id="images"
          label="Fix alt text"
          color="blue"
          onClick={() =>
            runAiFix({
              id: "images",
              action: "fix-image-alt-text",
              payload: { bodyHtml: html },
              before: html,
              title: "Add missing image alt text",
              summary: "AI generated descriptive alt text for images missing it.",
              isHtml: true,
              apply: (r) => onApplyHtml(r),
            })
          }
        />
      );
    }

    return null;
  };

  return (
    <div className="sketch-section">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between"
      >
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Gauge className="w-4 h-4 text-gray-400" />
          SEO Score
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className="text-2xl font-bold tabular-nums"
              style={{ color: scoreColor }}
            >
              {score}
            </span>
            <span className="text-xs text-gray-400">/100</span>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${scoreColor}1a`, color: scoreColor }}
            >
              {scoreLabel}
            </span>
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Progress bar */}
      <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: scoreColor }}
        />
      </div>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* Primary keyword input */}
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">
              Primary Keyword
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="e.g. Medicare Advantage plans New Jersey"
            />
            <p className="text-xs text-gray-400 mt-1">
              Enter the target keyword to unlock keyword-specific SEO checks.
            </p>
          </div>

          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {/* Checklist */}
          <ul className="space-y-2">
            {checks.map((c) => (
              <li
                key={c.id}
                className="flex items-center gap-2.5 text-sm"
              >
                <StatusIcon status={c.status} />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-700">{c.label}</span>
                  <span className="text-gray-400"> — {c.detail}</span>
                </div>
                <CheckAction check={c} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Review modal — shown after an AI fix returns, before applying. */}
      <SeoFixReviewModal
        review={review}
        onApply={() => applyFn?.()}
        onDiscard={() => {
          setReview(null);
          setApplyFn(null);
        }}
      />
    </div>
  );
}
