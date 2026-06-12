"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Gauge,
} from "lucide-react";

type CheckStatus = "good" | "warn" | "bad";

interface SeoCheck {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
  weight: number; // contribution to the score
}

interface SeoScorePanelProps {
  title: string; // meta title
  description: string; // meta description
  slug: string;
  html: string; // body content as HTML
  keyword?: string; // primary keyword (optional manual input)
  articleTitle?: string; // the H1 / article title
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

export default function SeoScorePanel({
  title,
  description,
  slug,
  html,
  keyword: keywordProp,
  articleTitle,
}: SeoScorePanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [keyword, setKeyword] = useState(keywordProp ?? "");

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
        ? { status: "good" as CheckStatus, detail: `${titleLen} chars — ideal (50–60)` }
        : titleLen >= 40 && titleLen <= 65
        ? { status: "warn" as CheckStatus, detail: `${titleLen} chars — acceptable, aim for 50–60` }
        : { status: "bad" as CheckStatus, detail: `${titleLen} chars — should be 50–60` }),
    });

    // 2. Meta description length (150-160 ideal)
    const descLen = (description || "").length;
    checks.push({
      id: "desc-length",
      label: "Meta description length",
      weight: 15,
      ...(descLen >= 150 && descLen <= 160
        ? { status: "good" as CheckStatus, detail: `${descLen} chars — ideal (150–160)` }
        : descLen >= 120 && descLen <= 165
        ? { status: "warn" as CheckStatus, detail: `${descLen} chars — acceptable, aim for 150–160` }
        : { status: "bad" as CheckStatus, detail: `${descLen} chars — should be 150–160` }),
    });

    // 3. Keyword present (only scored if a keyword is provided)
    if (kw) {
      // 3a. Keyword in meta title
      checks.push({
        id: "kw-title",
        label: "Keyword in meta title",
        weight: 12,
        ...(lowerTitle.includes(kw)
          ? { status: "good" as CheckStatus, detail: "Found in meta title" }
          : { status: "bad" as CheckStatus, detail: "Not found in meta title" }),
      });

      // 3b. Keyword in H1 / article title
      checks.push({
        id: "kw-h1",
        label: "Keyword in article title (H1)",
        weight: 10,
        ...(lowerArticleTitle.includes(kw)
          ? { status: "good" as CheckStatus, detail: "Found in article title" }
          : { status: "warn" as CheckStatus, detail: "Not found in article title" }),
      });

      // 3c. Keyword in meta description
      checks.push({
        id: "kw-desc",
        label: "Keyword in meta description",
        weight: 8,
        ...(description.toLowerCase().includes(kw)
          ? { status: "good" as CheckStatus, detail: "Found in meta description" }
          : { status: "warn" as CheckStatus, detail: "Not found in meta description" }),
      });

      // 3d. Keyword in slug
      const kwSlug = kw.replace(/\s+/g, "-");
      checks.push({
        id: "kw-slug",
        label: "Keyword in URL slug",
        weight: 8,
        ...(lowerSlug.includes(kwSlug) || kw.split(/\s+/).every((w) => lowerSlug.includes(w))
          ? { status: "good" as CheckStatus, detail: "Reflected in slug" }
          : { status: "warn" as CheckStatus, detail: "Not reflected in slug" }),
      });

      // 3e. Keyword density in body
      const kwCount = countOccurrences(lowerText, kw);
      const density = wordCount > 0 ? (kwCount * kw.split(/\s+/).length * 100) / wordCount : 0;
      checks.push({
        id: "kw-density",
        label: "Keyword density",
        weight: 10,
        ...(kwCount === 0
          ? { status: "bad" as CheckStatus, detail: "Keyword not found in body content" }
          : density >= 0.5 && density <= 2.5
          ? { status: "good" as CheckStatus, detail: `${density.toFixed(1)}% (${kwCount}×) — ideal range` }
          : density < 0.5
          ? { status: "warn" as CheckStatus, detail: `${density.toFixed(1)}% (${kwCount}×) — a bit low` }
          : { status: "warn" as CheckStatus, detail: `${density.toFixed(1)}% (${kwCount}×) — may be over-optimized` }),
      });

      // 3f. Keyword in first paragraph
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

    // 4. Word count (>= 600 good, 300-600 warn)
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

    // 6. Internal/external links
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

    // Compute weighted score
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

          {/* Checklist */}
          <ul className="space-y-2">
            {checks.map((c) => (
              <li
                key={c.id}
                className="flex items-start gap-2.5 text-sm"
              >
                <StatusIcon status={c.status} />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-700">{c.label}</span>
                  <span className="text-gray-400"> — {c.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
