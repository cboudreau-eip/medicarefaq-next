/**
 * Content Validator — Post-Transform Quality Checks
 *
 * Scans AI-generated article sections for violations of writing rules:
 * - Banned phrases
 * - FAQ answers too long
 * - Paragraphs too long (>5 sentences)
 * - Anchor text too long (>7 words)
 * - Missing Eddie's Pro Tip
 * - Missing FAQ section
 * - Outdated year references
 * - Generic/homepage links
 */

import { writingConfig } from "./writing-config";

export interface ValidationIssue {
  severity: "error" | "warning" | "info";
  category: string;
  message: string;
  sectionIndex?: number;
  sectionType?: string;
  detail?: string;
}

export interface ValidationResult {
  passed: boolean;
  score: number; // 0-100
  issues: ValidationIssue[];
  summary: {
    errors: number;
    warnings: number;
    info: number;
  };
}

/**
 * Validates an array of transformed BlogSectionContent objects
 * against the writing config rules.
 */
export function validateContent(sections: any[]): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return {
      passed: false,
      score: 0,
      issues: [{ severity: "error", category: "Structure", message: "No content sections found" }],
      summary: { errors: 1, warnings: 0, info: 0 },
    };
  }

  // Run all checks
  checkBannedPhrases(sections, issues);
  checkFaqLength(sections, issues);
  checkParagraphLength(sections, issues);
  checkAnchorText(sections, issues);
  checkEddieProTip(sections, issues);
  checkFaqPresence(sections, issues);
  checkOutdatedYears(sections, issues);
  checkGenericLinks(sections, issues);
  checkStructure(sections, issues);

  // Calculate score
  const errors = issues.filter((i) => i.severity === "error").length;
  const warnings = issues.filter((i) => i.severity === "warning").length;
  const info = issues.filter((i) => i.severity === "info").length;

  // Score: start at 100, -15 per error, -5 per warning, -1 per info
  const score = Math.max(0, Math.min(100, 100 - errors * 15 - warnings * 5 - info * 1));
  const passed = errors === 0 && warnings <= 2;

  return {
    passed,
    score,
    issues,
    summary: { errors, warnings, info },
  };
}

// ─── INDIVIDUAL CHECKS ───────────────────────────────────────────────────────

function getTextContent(section: any): string {
  if (section.content) return section.content;
  if (section.text) return section.text;
  if (section.calloutText) return section.calloutText;
  if (section.calloutTitle) return `${section.calloutTitle} `;
  if (section.items) return section.items.join(" ");
  if (section.faqs) {
    return section.faqs.map((f: any) => `${f.question} ${f.answer}`).join(" ");
  }
  return "";
}

function checkBannedPhrases(sections: any[], issues: ValidationIssue[]) {
  const banned = writingConfig.bannedPhrases;

  sections.forEach((section, index) => {
    const text = getTextContent(section).toLowerCase();
    if (!text) return;

    for (const phrase of banned) {
      if (text.includes(phrase.toLowerCase())) {
        issues.push({
          severity: "error",
          category: "Banned Phrase",
          message: `Contains banned phrase: "${phrase}"`,
          sectionIndex: index,
          sectionType: section.type,
          detail: `Found in ${section.type} section at position ${index + 1}`,
        });
      }
    }
  });
}

function checkFaqLength(sections: any[], issues: ValidationIssue[]) {
  sections.forEach((section, index) => {
    if (section.type !== "faq" || !section.faqs) return;

    section.faqs.forEach((faq: any, faqIndex: number) => {
      if (!faq.answer) return;
      const wordCount = faq.answer.trim().split(/\s+/).length;

      if (wordCount > 80) {
        issues.push({
          severity: "error",
          category: "FAQ Length",
          message: `FAQ answer too long: ${wordCount} words (max 80)`,
          sectionIndex: index,
          sectionType: "faq",
          detail: `Question: "${faq.question.slice(0, 60)}..." — ${wordCount} words`,
        });
      } else if (wordCount > 60) {
        issues.push({
          severity: "warning",
          category: "FAQ Length",
          message: `FAQ answer approaching limit: ${wordCount} words (target: 40-80)`,
          sectionIndex: index,
          sectionType: "faq",
          detail: `Question: "${faq.question.slice(0, 60)}..."`,
        });
      }
    });
  });
}

function checkParagraphLength(sections: any[], issues: ValidationIssue[]) {
  sections.forEach((section, index) => {
    if (section.type !== "paragraph" || !section.content) return;

    // Count sentences (rough: split on . ! ? followed by space or end)
    const sentences = section.content
      .replace(/\*\*[^*]+\*\*/g, "text") // Remove bold markdown
      .replace(/\[[^\]]+\]\([^)]+\)/g, "text") // Remove links
      .split(/[.!?]+(?:\s|$)/)
      .filter((s: string) => s.trim().length > 5);

    if (sentences.length > 5) {
      issues.push({
        severity: "warning",
        category: "Paragraph Length",
        message: `Paragraph has ${sentences.length} sentences (max 5)`,
        sectionIndex: index,
        sectionType: "paragraph",
        detail: `"${section.content.slice(0, 80)}..."`,
      });
    }
  });
}

function checkAnchorText(sections: any[], issues: ValidationIssue[]) {
  // Match markdown links [text](url) and HTML links <a href="url">text</a>
  const mdLinkRegex = /\[([^\]]+)\]\([^)]+\)/g;
  const htmlLinkRegex = /<a[^>]*>([^<]+)<\/a>/g;

  sections.forEach((section, index) => {
    const text = getTextContent(section);
    if (!text) return;

    let match;

    // Check markdown links
    while ((match = mdLinkRegex.exec(text)) !== null) {
      const anchorText = match[1].trim();
      const wordCount = anchorText.split(/\s+/).length;
      if (wordCount > 7) {
        issues.push({
          severity: "warning",
          category: "Anchor Text",
          message: `Link text too long: ${wordCount} words (max 7)`,
          sectionIndex: index,
          sectionType: section.type,
          detail: `"${anchorText.slice(0, 60)}..."`,
        });
      }
    }

    // Check HTML links
    while ((match = htmlLinkRegex.exec(text)) !== null) {
      const anchorText = match[1].trim();
      const wordCount = anchorText.split(/\s+/).length;
      if (wordCount > 7) {
        issues.push({
          severity: "warning",
          category: "Anchor Text",
          message: `Link text too long: ${wordCount} words (max 7)`,
          sectionIndex: index,
          sectionType: section.type,
          detail: `"${anchorText.slice(0, 60)}..."`,
        });
      }
    }
  });
}

function checkEddieProTip(sections: any[], issues: ValidationIssue[]) {
  const hasEddieTip = sections.some((s) => s.type === "eddie-pro-tip");
  if (!hasEddieTip) {
    issues.push({
      severity: "error",
      category: "Missing Section",
      message: "Missing Eddie's Pro Tip section (required in every article)",
    });
  }

  // Check for multiple
  const tipCount = sections.filter((s) => s.type === "eddie-pro-tip").length;
  if (tipCount > 1) {
    issues.push({
      severity: "warning",
      category: "Structure",
      message: `Multiple Eddie's Pro Tips found (${tipCount}) — should be exactly 1`,
    });
  }
}

function checkFaqPresence(sections: any[], issues: ValidationIssue[]) {
  const hasFaq = sections.some((s) => s.type === "faq");
  if (!hasFaq) {
    issues.push({
      severity: "warning",
      category: "Missing Section",
      message: "No FAQ section found — recommended for SEO and user engagement",
    });
  }
}

function checkOutdatedYears(sections: any[], issues: ValidationIssue[]) {
  const currentYear = writingConfig.referenceData.generalYear.currentYear;
  const outdatedYear = currentYear - 2; // 2024 would be outdated if current is 2026

  sections.forEach((section, index) => {
    const text = getTextContent(section);
    if (!text) return;

    // Check for references to outdated years presented as current
    const outdatedPatterns = [
      new RegExp(`in ${outdatedYear}[,.]`, "gi"),
      new RegExp(`for ${outdatedYear}[,.]`, "gi"),
      new RegExp(`${outdatedYear} (premium|deductible|cost|rate|limit)`, "gi"),
    ];

    for (const pattern of outdatedPatterns) {
      if (pattern.test(text)) {
        issues.push({
          severity: "warning",
          category: "Outdated Data",
          message: `References ${outdatedYear} data — verify this is intentional`,
          sectionIndex: index,
          sectionType: section.type,
          detail: `Found in: "${text.slice(0, 80)}..."`,
        });
        break; // One warning per section is enough
      }
    }
  });
}

function checkGenericLinks(sections: any[], issues: ValidationIssue[]) {
  const genericAnchors = [
    "learn more",
    "click here",
    "read more",
    "find out more",
    "visit",
    "check out",
    "see more",
  ];

  sections.forEach((section, index) => {
    const text = getTextContent(section).toLowerCase();
    if (!text) return;

    // Check markdown links for generic anchor text
    const mdLinkRegex = /\[([^\]]+)\]\([^)]+\)/g;
    let match;
    while ((match = mdLinkRegex.exec(text)) !== null) {
      const anchor = match[1].trim().toLowerCase();
      for (const generic of genericAnchors) {
        if (anchor.startsWith(generic) || anchor === generic) {
          issues.push({
            severity: "warning",
            category: "Generic Link",
            message: `Generic anchor text: "${match[1].trim()}" — use a descriptive keyword instead`,
            sectionIndex: index,
            sectionType: section.type,
          });
          break;
        }
      }
    }
  });
}

function checkStructure(sections: any[], issues: ValidationIssue[]) {
  // Check for minimum number of H2 headings
  const h2Count = sections.filter((s) => s.type === "heading" && s.level === 2).length;
  if (h2Count < 4) {
    issues.push({
      severity: "info",
      category: "Structure",
      message: `Only ${h2Count} H2 sections — target is 7-8 for comprehensive coverage`,
    });
  }

  // Check for callout variety (should have at least one every ~3 paragraphs)
  const paragraphCount = sections.filter((s) => s.type === "paragraph").length;
  const calloutCount = sections.filter((s) => s.type === "callout").length;
  if (paragraphCount > 6 && calloutCount < 2) {
    issues.push({
      severity: "info",
      category: "Visual Variety",
      message: `Only ${calloutCount} callout(s) for ${paragraphCount} paragraphs — add more for visual variety`,
    });
  }

  // Check for table presence when article is long
  const totalSections = sections.length;
  const hasTable = sections.some((s) => s.type === "table");
  if (totalSections > 15 && !hasTable) {
    issues.push({
      severity: "info",
      category: "Visual Variety",
      message: "No tables found — consider adding a comparison or cost breakdown table",
    });
  }
}
