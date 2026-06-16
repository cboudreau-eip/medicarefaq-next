"use client";

import { useMemo } from "react";
import { X, Check, Wand2, ArrowRight } from "lucide-react";

export interface SeoFixReview {
  /** Human-readable title of the fix, e.g. "Boost keyword density". */
  title: string;
  /** Short explanation of what the AI did. */
  summary?: string;
  /** The original text/HTML before the AI change. */
  before: string;
  /** The AI-modified text/HTML. */
  after: string;
  /**
   * The keyword(s) to highlight in the "after" panel. When provided, any
   * occurrence is wrapped in a highlight span so insertions are easy to spot.
   */
  highlight?: string;
  /** Whether the before/after content is raw HTML (renders as plain text either way, but affects label). */
  isHtml?: boolean;
}

interface SeoFixReviewModalProps {
  review: SeoFixReview | null;
  /** Whether the Apply action is currently running. */
  applying?: boolean;
  onApply: () => void;
  onDiscard: () => void;
}

/** Escape HTML so the before/after content renders as literal text, not markup. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Escape a string for safe use inside a RegExp. */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Build highlighted HTML for the "after" panel: the text is escaped (so it is
 * shown literally), then any occurrence of the keyword is wrapped in a
 * highlight <mark> span.
 */
function buildHighlighted(text: string, keyword?: string): string {
  const escaped = escapeHtml(text);
  const kw = (keyword || "").trim();
  if (!kw) return escaped;
  try {
    const re = new RegExp(`(${escapeRegExp(escapeHtml(kw))})`, "gi");
    return escaped.replace(
      re,
      '<mark class="bg-green-200 text-green-900 rounded px-0.5">$1</mark>'
    );
  } catch {
    return escaped;
  }
}

export default function SeoFixReviewModal({
  review,
  applying = false,
  onApply,
  onDiscard,
}: SeoFixReviewModalProps) {
  const afterHtml = useMemo(
    () => (review ? buildHighlighted(review.after, review.highlight) : ""),
    [review]
  );
  const beforeHtml = useMemo(
    () => (review ? escapeHtml(review.before) : ""),
    [review]
  );

  if (!review) return null;

  const beforeLen = review.before.length;
  const afterLen = review.after.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onDiscard}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <Wand2 className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Review AI change: {review.title}
              </h3>
              {review.summary && (
                <p className="text-xs text-gray-500">{review.summary}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onDiscard}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: before / after */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Before
                </span>
                <span className="text-[11px] text-gray-400 tabular-nums">
                  {beforeLen} chars
                </span>
              </div>
              <div
                className="flex-1 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-3 whitespace-pre-wrap break-words font-mono leading-relaxed max-h-[45vh] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: beforeHtml }}
              />
            </div>

            {/* After */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-green-600 flex items-center gap-1">
                  After
                  {review.highlight && (
                    <span className="font-normal normal-case text-gray-400">
                      (keyword highlighted)
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-gray-400 tabular-nums">
                  {afterLen} chars
                </span>
              </div>
              <div
                className="flex-1 text-sm text-gray-800 bg-green-50/40 border border-green-200 rounded-lg p-3 whitespace-pre-wrap break-words font-mono leading-relaxed max-h-[45vh] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: afterHtml }}
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            Nothing is changed until you click Apply. Discard leaves your content as-is.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onDiscard}
              disabled={applying}
              className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={onApply}
              disabled={applying}
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              Apply change
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
