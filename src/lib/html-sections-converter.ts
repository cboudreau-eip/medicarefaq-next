/**
 * Bidirectional converter between BlogSectionContent[] and clean HTML.
 * Used by the article editor to provide a simple HTML editing experience.
 */

// ─── Sections → HTML ─────────────────────────────────────────────────────────

/**
 * Convert inline markdown-style formatting to HTML.
 * Handles: **bold**, *italic*, [text](url)
 */
function inlineToHtml(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

/**
 * Convert a sections array (parsed JSON) to clean, editable HTML.
 */
export function sectionsToHtml(sections: any[]): string {
  if (!sections || !Array.isArray(sections)) return "";

  const lines: string[] = [];

  for (const section of sections) {
    switch (section.type) {
      case "heading": {
        const tag = `h${section.level || 2}`;
        const id = section.id ? ` id="${section.id}"` : "";
        lines.push(`<${tag}${id}>${section.text || ""}</${tag}>`);
        break;
      }
      case "paragraph": {
        lines.push(`<p>${inlineToHtml(section.content || "")}</p>`);
        break;
      }
      case "list": {
        const tag = section.ordered ? "ol" : "ul";
        const items = (section.items || [])
          .map((item: string) => `  <li>${inlineToHtml(item)}</li>`)
          .join("\n");
        lines.push(`<${tag}>\n${items}\n</${tag}>`);
        break;
      }
      case "table": {
        const headers = (section.headers || [])
          .map((h: string) => `    <th>${h}</th>`)
          .join("\n");
        const rows = (section.rows || [])
          .map(
            (row: string[]) =>
              `  <tr>\n${row.map((c) => `    <td>${c}</td>`).join("\n")}\n  </tr>`
          )
          .join("\n");
        const titleAttr = section.title ? ` data-title="${section.title}"` : "";
        const footnoteAttr = section.footnote
          ? ` data-footnote="${section.footnote}"`
          : "";
        lines.push(
          `<table${titleAttr}${footnoteAttr}>\n  <thead>\n  <tr>\n${headers}\n  </tr>\n  </thead>\n  <tbody>\n${rows}\n  </tbody>\n</table>`
        );
        break;
      }
      case "callout":
      case "warning":
      case "info":
      case "tip":
      case "success":
      case "note":
      case "error": {
        const calloutType = section.calloutType || section.type || "info";
        const title = section.calloutTitle || "";
        lines.push(
          `<blockquote data-type="${calloutType}"${title ? ` data-title="${title}"` : ""}>\n  ${section.calloutText || ""}\n</blockquote>`
        );
        break;
      }
      case "faq": {
        const faqs = section.faqs || [];
        const faqHtml = faqs
          .map(
            (f: { question: string; answer: string }) =>
              `  <dt>${f.question}</dt>\n  <dd>${inlineToHtml(f.answer)}</dd>`
          )
          .join("\n");
        lines.push(`<dl data-type="faq">\n${faqHtml}\n</dl>`);
        break;
      }
      case "eddie-pro-tip": {
        lines.push(
          `<blockquote data-type="eddie-pro-tip">\n  ${section.content || ""}\n</blockquote>`
        );
        break;
      }
      case "image": {
        const alt = section.alt || "";
        const caption = section.caption || "";
        if (caption) {
          lines.push(
            `<figure>\n  <img src="${section.src || ""}" alt="${alt}" />\n  <figcaption>${caption}</figcaption>\n</figure>`
          );
        } else {
          lines.push(`<img src="${section.src || ""}" alt="${alt}" />`);
        }
        break;
      }
      default: {
        // Unknown section type — render as a comment with JSON
        lines.push(`<!-- unknown section: ${JSON.stringify(section)} -->`);
      }
    }
  }

  return lines.join("\n\n");
}

// ─── HTML → Sections ─────────────────────────────────────────────────────────

/**
 * Strip HTML tags from a string.
 */
function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Get inner HTML between opening and closing tags.
 */
function getInnerHTML(element: string, tagName: string): string {
  const openTag = new RegExp(`^<${tagName}[^>]*>`, "i");
  const closeTag = new RegExp(`</${tagName}>$`, "i");
  return element.replace(openTag, "").replace(closeTag, "").trim();
}

/**
 * Parse list items from a ul/ol element.
 */
function parseListItems(element: string): string[] {
  const items: string[] = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match;
  while ((match = liRegex.exec(element)) !== null) {
    items.push(match[1].trim());
  }
  return items;
}

/**
 * Parse a table element into headers and rows.
 */
function parseTable(element: string): {
  headers: string[];
  rows: string[][];
  title: string;
  footnote: string;
} {
  const headers: string[] = [];
  const rows: string[][] = [];

  // Extract data attributes
  const titleMatch = element.match(/data-title="([^"]*)"/);
  const footnoteMatch = element.match(/data-footnote="([^"]*)"/);
  const title = titleMatch ? titleMatch[1] : "";
  const footnote = footnoteMatch ? footnoteMatch[1] : "";

  // Parse headers from th elements
  const thRegex = /<th[^>]*>([\s\S]*?)<\/th>/gi;
  let thMatch;
  while ((thMatch = thRegex.exec(element)) !== null) {
    headers.push(stripTags(thMatch[1]));
  }

  // Parse rows from tbody tr elements
  const tbodyMatch = element.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);
  const rowsHtml = tbodyMatch ? tbodyMatch[1] : element;
  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let trMatch;
  let isFirst = true;
  while ((trMatch = trRegex.exec(rowsHtml)) !== null) {
    // Skip the header row if we already parsed th elements
    if (isFirst && headers.length > 0 && trMatch[1].includes("<th")) {
      isFirst = false;
      continue;
    }
    isFirst = false;
    const cells: string[] = [];
    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    let tdMatch;
    while ((tdMatch = tdRegex.exec(trMatch[1])) !== null) {
      cells.push(stripTags(tdMatch[1]));
    }
    if (cells.length > 0) rows.push(cells);
  }

  return { headers, rows, title, footnote };
}

/**
 * Convert inline HTML to markdown-style formatting.
 */
function htmlToInline(html: string): string {
  return html
    .replace(/<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<strong>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .trim();
}

/**
 * Generate a URL-friendly ID from text.
 */
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/**
 * Convert HTML string back to a sections array.
 */
export function htmlToSections(html: string): any[] {
  const sections: any[] = [];

  const normalized = html.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

  // Match block-level elements
  const blockRegex =
    /<(h[1-6]|p|ul|ol|table|blockquote|figure|img|dl|div)(\s[^>]*)?>[\s\S]*?<\/\1>|<img[^>]*\/?>|<hr[^>]*\/?>/gi;
  let match;

  while ((match = blockRegex.exec(normalized)) !== null) {
    const element = match[0];
    const tagName = match[1]?.toLowerCase() || "";

    // Headings
    if (/^h[2-4]$/i.test(tagName)) {
      const level = parseInt(tagName[1]) as 2 | 3;
      const idMatch = element.match(/id="([^"]*)"/);
      const text = stripTags(getInnerHTML(element, tagName));
      sections.push({
        type: "heading",
        level: Math.min(level, 3) as 2 | 3,
        text,
        id: idMatch ? idMatch[1] : generateId(text),
      });
    }
    // Paragraphs
    else if (tagName === "p") {
      const content = getInnerHTML(element, "p");
      if (content.trim()) {
        sections.push({ type: "paragraph", content: htmlToInline(content) });
      }
    }
    // Lists
    else if (tagName === "ul" || tagName === "ol") {
      const items = parseListItems(element).map((item) => htmlToInline(item));
      if (items.length > 0) {
        sections.push({ type: "list", ordered: tagName === "ol", items });
      }
    }
    // Tables
    else if (tagName === "table") {
      const { headers, rows, title, footnote } = parseTable(element);
      if (rows.length > 0 || headers.length > 0) {
        const tableSection: any = { type: "table", title, headers, rows };
        if (footnote) tableSection.footnote = footnote;
        sections.push(tableSection);
      }
    }
    // Blockquotes (callouts, eddie-pro-tip)
    else if (tagName === "blockquote") {
      const typeMatch = element.match(/data-type="([^"]*)"/);
      const titleMatch = element.match(/data-title="([^"]*)"/);
      const inner = getInnerHTML(element, "blockquote");
      const text = stripTags(inner).trim();

      if (typeMatch && typeMatch[1] === "eddie-pro-tip") {
        sections.push({ type: "eddie-pro-tip", content: text });
      } else {
        sections.push({
          type: "callout",
          calloutType: typeMatch ? typeMatch[1] : "info",
          calloutTitle: titleMatch ? titleMatch[1] : "Note",
          calloutText: text,
        });
      }
    }
    // Definition lists (FAQ)
    else if (tagName === "dl") {
      const faqs: { question: string; answer: string }[] = [];
      const dtRegex = /<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/gi;
      let faqMatch;
      while ((faqMatch = dtRegex.exec(element)) !== null) {
        faqs.push({
          question: stripTags(faqMatch[1]),
          answer: htmlToInline(faqMatch[2]),
        });
      }
      if (faqs.length > 0) {
        sections.push({ type: "faq", faqs });
      }
    }
    // Images / figures
    else if (tagName === "figure") {
      const imgMatch = element.match(/<img[^>]*src="([^"]*)"[^>]*>/i);
      const altMatch = element.match(/alt="([^"]*)"/i);
      const captionMatch = element.match(
        /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i
      );
      if (imgMatch) {
        const img: any = {
          type: "image",
          src: imgMatch[1],
          alt: altMatch?.[1] ?? "",
        };
        if (captionMatch) img.caption = stripTags(captionMatch[1]).trim();
        sections.push(img);
      }
    } else if (tagName === "img" || element.startsWith("<img")) {
      const srcMatch = element.match(/src="([^"]*)"/i);
      const altMatch = element.match(/alt="([^"]*)"/i);
      if (srcMatch) {
        sections.push({
          type: "image",
          src: srcMatch[1],
          alt: altMatch?.[1] ?? "",
        });
      }
    }
  }

  // Fallback: if nothing parsed but there's content, wrap as paragraph
  if (sections.length === 0 && html.trim()) {
    sections.push({ type: "paragraph", content: htmlToInline(html) });
  }

  return sections;
}

/**
 * Escape a string for use in a TypeScript string literal.
 */
function escapeTS(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "");
}

/**
 * Serialize a sections array to a TypeScript string representation
 * (matching the format used in blog-articles-data.ts).
 */
export function serializeSectionsToTS(sections: any[]): string {
  const lines = sections.map((section: any) => {
    switch (section.type) {
      case "paragraph":
        return `      { type: "paragraph", content: "${escapeTS(section.content || "")}" }`;
      case "heading":
        return `      { type: "heading", level: ${section.level || 2}, text: "${escapeTS(section.text || "")}", id: "${escapeTS(section.id || "")}" }`;
      case "list": {
        const items = (section.items || [])
          .map((i: string) => `"${escapeTS(i)}"`)
          .join(", ");
        return `      { type: "list", ordered: ${!!section.ordered}, items: [${items}] }`;
      }
      case "table": {
        const headers = (section.headers || [])
          .map((h: string) => `"${escapeTS(h)}"`)
          .join(", ");
        const rows = (section.rows || [])
          .map(
            (row: string[]) =>
              `[${row.map((c) => `"${escapeTS(c)}"`).join(", ")}]`
          )
          .join(", ");
        let line = `      { type: "table", title: "${escapeTS(section.title || "")}", headers: [${headers}], rows: [${rows}]`;
        if (section.footnote)
          line += `, footnote: "${escapeTS(section.footnote)}"`;
        line += " }";
        return line;
      }
      case "callout":
        return `      { type: "callout", calloutType: "${section.calloutType || "info"}", calloutTitle: "${escapeTS(section.calloutTitle || "")}", calloutText: "${escapeTS(section.calloutText || "")}" }`;
      case "image": {
        let line = `      { type: "image", src: "${escapeTS(section.src || "")}", alt: "${escapeTS(section.alt || "")}"`;
        if (section.caption) line += `, caption: "${escapeTS(section.caption)}"`;
        line += " }";
        return line;
      }
      case "faq": {
        const faqs = (section.faqs || []).map(
          (f: { question: string; answer: string }) =>
            `{ question: "${escapeTS(f.question)}", answer: "${escapeTS(f.answer)}" }`
        );
        return `      { type: "faq", faqs: [${faqs.join(", ")}] }`;
      }
      case "eddie-pro-tip":
        return `      { type: "eddie-pro-tip", content: "${escapeTS(section.content || "")}" }`;
      default:
        return `      ${JSON.stringify(section)}`;
    }
  });

  return `[\n${lines.join(",\n")},\n    ]`;
}
