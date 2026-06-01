import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_PAT;
const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

const REPO = "cboudreau-eip/medicarefaq-next";
const BRANCH = "main";

/**
 * Fetch file content and SHA from GitHub.
 */
async function githubGetFileContent(path: string): Promise<{ content: string; sha: string }> {
  const metaRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    }
  );
  if (!metaRes.ok) throw new Error(`GitHub GET error: ${metaRes.status} for ${path}`);
  const meta = await metaRes.json();
  const sha = meta.sha;

  if (meta.content && meta.encoding === "base64") {
    const content = Buffer.from(meta.content.replace(/\n/g, ""), "base64").toString("utf-8");
    return { content, sha };
  }

  if (meta.download_url) {
    const rawRes = await fetch(meta.download_url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      cache: "no-store",
    });
    if (!rawRes.ok) throw new Error(`GitHub raw download error: ${rawRes.status} for ${path}`);
    const content = await rawRes.text();
    return { content, sha };
  }

  throw new Error(`Cannot retrieve content for ${path} (encoding: ${meta.encoding})`);
}

function encodeBase64(str: string): string {
  return Buffer.from(str, "utf-8").toString("base64");
}

/**
 * Escape a string for safe inclusion in a TypeScript string literal.
 */
function escapeTS(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
}

/**
 * Generate a URL-friendly ID from heading text.
 */
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Strip HTML tags but preserve inner text content.
 */
function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

/**
 * Get inner HTML content from a tag match (handles self-closing and content between tags).
 */
function getInnerHTML(element: string, tagName: string): string {
  const openTagRegex = new RegExp(`<${tagName}[^>]*>`, "i");
  const closeTagRegex = new RegExp(`</${tagName}>`, "i");
  const withoutOpen = element.replace(openTagRegex, "");
  return withoutOpen.replace(closeTagRegex, "").trim();
}

/**
 * Parse an HTML list (ul/ol) and return the items as strings.
 * Preserves inline HTML (links, bold, italic) within list items.
 */
function parseListItems(listHtml: string): string[] {
  const items: string[] = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match;
  while ((match = liRegex.exec(listHtml)) !== null) {
    const content = match[1].trim();
    items.push(content);
  }
  return items;
}

/**
 * Parse an HTML table and return headers and rows.
 */
function parseTable(tableHtml: string): { headers: string[]; rows: string[][] } {
  const headers: string[] = [];
  const rows: string[][] = [];

  // Extract headers from <th> tags
  const thRegex = /<th[^>]*>([\s\S]*?)<\/th>/gi;
  let thMatch;
  while ((thMatch = thRegex.exec(tableHtml)) !== null) {
    headers.push(stripTags(thMatch[1]).trim());
  }

  // Extract rows from <tr> tags that contain <td>
  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let trMatch;
  while ((trMatch = trRegex.exec(tableHtml)) !== null) {
    const rowHtml = trMatch[1];
    if (!/<td/i.test(rowHtml)) continue; // skip header rows
    const cells: string[] = [];
    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    let tdMatch;
    while ((tdMatch = tdRegex.exec(rowHtml)) !== null) {
      cells.push(stripTags(tdMatch[1]).trim());
    }
    if (cells.length > 0) rows.push(cells);
  }

  return { headers, rows };
}

interface Section {
  type: string;
  [key: string]: unknown;
}

/**
 * Convert HTML string to BlogSectionContent[] array.
 * Supports: p, h2, h3, h4, ul, ol, table, blockquote, img, figure.
 * Inline HTML (links, bold, italic) within paragraphs and list items is preserved.
 */
function htmlToSections(html: string): Section[] {
  const sections: Section[] = [];

  // Normalize whitespace between tags but preserve content
  const normalized = html
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

  // Split into top-level block elements using a regex that matches block tags
  const blockRegex = /<(h[1-6]|p|ul|ol|table|blockquote|figure|img|div)(\s[^>]*)?>[\s\S]*?<\/\1>|<img[^>]*\/?>|<hr[^>]*\/?>/gi;
  let match;

  while ((match = blockRegex.exec(normalized)) !== null) {
    const element = match[0];
    const tagName = match[1]?.toLowerCase() || "";

    // Headings (h2, h3, h4)
    if (/^h[2-4]$/i.test(tagName)) {
      const level = parseInt(tagName[1]) as 2 | 3;
      const text = getInnerHTML(element, tagName);
      const plainText = stripTags(text);
      sections.push({
        type: "heading",
        level: Math.min(level, 3) as 2 | 3,
        text: plainText,
        id: generateId(plainText),
      });
    }
    // Paragraphs
    else if (tagName === "p") {
      const content = getInnerHTML(element, "p");
      if (content.trim()) {
        // Convert <a href="...">text</a> to [text](url) markdown-style links
        const withLinks = content
          .replace(/<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
          .replace(/<strong>([\s\S]*?)<\/strong>/gi, "**$1**")
          .replace(/<b>([\s\S]*?)<\/b>/gi, "**$1**")
          .replace(/<em>([\s\S]*?)<\/em>/gi, "*$1*")
          .replace(/<i>([\s\S]*?)<\/i>/gi, "*$1*")
          .replace(/<br\s*\/?>/gi, " ")
          .replace(/<[^>]*>/g, ""); // strip any remaining tags
        sections.push({ type: "paragraph", content: withLinks.trim() });
      }
    }
    // Unordered lists
    else if (tagName === "ul") {
      const items = parseListItems(element).map((item) =>
        item
          .replace(/<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
          .replace(/<strong>([\s\S]*?)<\/strong>/gi, "**$1**")
          .replace(/<b>([\s\S]*?)<\/b>/gi, "**$1**")
          .replace(/<em>([\s\S]*?)<\/em>/gi, "*$1*")
          .replace(/<i>([\s\S]*?)<\/i>/gi, "*$1*")
          .replace(/<[^>]*>/g, "")
      );
      if (items.length > 0) {
        sections.push({ type: "list", ordered: false, items });
      }
    }
    // Ordered lists
    else if (tagName === "ol") {
      const items = parseListItems(element).map((item) =>
        item
          .replace(/<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
          .replace(/<strong>([\s\S]*?)<\/strong>/gi, "**$1**")
          .replace(/<b>([\s\S]*?)<\/b>/gi, "**$1**")
          .replace(/<em>([\s\S]*?)<\/em>/gi, "*$1*")
          .replace(/<i>([\s\S]*?)<\/i>/gi, "*$1*")
          .replace(/<[^>]*>/g, "")
      );
      if (items.length > 0) {
        sections.push({ type: "list", ordered: true, items });
      }
    }
    // Tables
    else if (tagName === "table") {
      const { headers, rows } = parseTable(element);
      if (rows.length > 0) {
        sections.push({ type: "table", title: "", headers, rows });
      }
    }
    // Blockquotes → callouts
    else if (tagName === "blockquote") {
      const inner = getInnerHTML(element, "blockquote");
      const text = stripTags(inner).trim();
      sections.push({
        type: "callout",
        calloutType: "info",
        calloutTitle: "Note",
        calloutText: text,
      });
    }
    // Images (standalone or within figure)
    else if (tagName === "figure") {
      const imgMatch = element.match(/<img[^>]*src="([^"]*)"[^>]*>/i);
      const altMatch = element.match(/alt="([^"]*)"/i);
      const captionMatch = element.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
      if (imgMatch) {
        sections.push({
          type: "image",
          src: imgMatch[1],
          alt: altMatch?.[1] ?? "",
          caption: captionMatch ? stripTags(captionMatch[1]).trim() : "",
        });
      }
    }
    else if (tagName === "img" || element.startsWith("<img")) {
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

  // If no sections were parsed (maybe plain text without tags), wrap as paragraph
  if (sections.length === 0 && html.trim()) {
    sections.push({ type: "paragraph", content: stripTags(html).trim() });
  }

  return sections;
}

/**
 * Generate a table of contents from h2 sections.
 */
function generateTOC(sections: Section[]): { id: string; title: string }[] {
  return sections
    .filter((s) => s.type === "heading" && s.level === 2)
    .map((s) => ({ id: s.id as string, title: s.text as string }));
}

/**
 * Serialize a sections array to a TypeScript string representation.
 */
function serializeSections(sections: Section[]): string {
  const lines = sections.map((section) => {
    switch (section.type) {
      case "paragraph":
        return `      { type: "paragraph", content: "${escapeTS(section.content as string)}" }`;
      case "heading":
        return `      { type: "heading", level: ${section.level}, text: "${escapeTS(section.text as string)}", id: "${escapeTS(section.id as string)}" }`;
      case "list": {
        const items = (section.items as string[]).map((i) => `"${escapeTS(i)}"`).join(", ");
        return `      { type: "list", ordered: ${section.ordered}, items: [${items}] }`;
      }
      case "table": {
        const headers = (section.headers as string[]).map((h) => `"${escapeTS(h)}"`).join(", ");
        const rows = (section.rows as string[][])
          .map((row) => `[${row.map((c) => `"${escapeTS(c)}"`).join(", ")}]`)
          .join(", ");
        return `      { type: "table", title: "${escapeTS((section.title as string) || "")}", headers: [${headers}], rows: [${rows}] }`;
      }
      case "callout":
        return `      { type: "callout", calloutType: "${section.calloutType}", calloutTitle: "${escapeTS(section.calloutTitle as string)}", calloutText: "${escapeTS(section.calloutText as string)}" }`;
      case "image":
        return `      { type: "image", src: "${escapeTS(section.src as string)}", alt: "${escapeTS((section.alt as string) || "")}"${section.caption ? `, caption: "${escapeTS(section.caption as string)}"` : ""} }`;
      default:
        return `      { type: "paragraph", content: "${escapeTS(JSON.stringify(section))}" }`;
    }
  });

  return `[\n${lines.join(",\n")},\n    ]`;
}

/**
 * Serialize a table of contents array to TypeScript string.
 */
function serializeTOC(toc: { id: string; title: string }[]): string {
  if (toc.length === 0) return "[]";
  const entries = toc.map((t) => `      { id: "${escapeTS(t.id)}", title: "${escapeTS(t.title)}" }`);
  return `[\n${entries.join(",\n")},\n    ]`;
}

/**
 * Category-to-color mapping.
 */
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

/**
 * Calculate read time from sections content.
 */
function calculateReadTime(sections: Section[]): string {
  let wordCount = 0;
  for (const s of sections) {
    if (s.type === "paragraph" && s.content) {
      wordCount += (s.content as string).split(/\s+/).length;
    } else if (s.type === "list" && s.items) {
      for (const item of s.items as string[]) {
        wordCount += item.split(/\s+/).length;
      }
    } else if (s.type === "callout" && s.calloutText) {
      wordCount += (s.calloutText as string).split(/\s+/).length;
    } else if (s.type === "faq" && s.faqs) {
      for (const faq of s.faqs as { question: string; answer: string }[]) {
        wordCount += faq.question.split(/\s+/).length;
        wordCount += faq.answer.split(/\s+/).length;
      }
    } else if (s.type === "table" && s.rows) {
      for (const row of s.rows as string[][]) {
        for (const cell of row) {
          wordCount += cell.split(/\s+/).length;
        }
      }
    }
  }
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

/**
 * Serialize a key takeaways array to TypeScript string.
 */
function serializeKeyTakeaways(takeaways: string[]): string {
  if (!takeaways || takeaways.length === 0) return "[]";
  const entries = takeaways.map((t) => `"${escapeTS(t)}"`);
  return `[${entries.join(", ")}]`;
}

/**
 * Serialize a FAQs array to TypeScript string.
 */
function serializeFaqs(faqs: { question: string; answer: string }[]): string {
  if (!faqs || faqs.length === 0) return "[]";
  const entries = faqs.map(
    (f) => `{ question: "${escapeTS(f.question)}", answer: "${escapeTS(f.answer)}" }`
  );
  return `[\n      ${entries.join(",\n      ")},\n    ]`;
}

/**
 * Build a new BlogArticleData object as a TypeScript string.
 */
function buildArticleObject(data: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  reviewer: string;
  image: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  htmlBody: string;
  structuredSections?: Section[];
  keyTakeaways?: string[];
  faqs?: { question: string; answer: string }[];
  relatedSlugs?: string[];
}): string {
  // Use structuredSections if provided, otherwise fall back to htmlToSections
  const sections = data.structuredSections
    ? data.structuredSections
    : data.htmlBody?.trim()
      ? htmlToSections(data.htmlBody)
      : [{ type: "paragraph", content: "Article content coming soon." }];

  const toc = generateTOC(sections);
  const sectionsStr = serializeSections(sections);
  const tocStr = serializeTOC(toc);
  const readTime = calculateReadTime(sections);
  const categoryColor = CATEGORY_COLORS[data.category] || "#0D9488";

  // Optional fields
  const keyTakeawaysStr = data.keyTakeaways && data.keyTakeaways.length > 0
    ? `\n    keyTakeaways: ${serializeKeyTakeaways(data.keyTakeaways)},`
    : "";
  const faqsStr = data.faqs && data.faqs.length > 0
    ? `\n    faqs: ${serializeFaqs(data.faqs)},`
    : "";
  const relatedStr = data.relatedSlugs && data.relatedSlugs.length > 0
    ? `\n    relatedSlugs: [${data.relatedSlugs.map((s) => `"${escapeTS(s)}"`).join(", ")}],`
    : "";

  return `  {
    slug: "${escapeTS(data.slug)}",
    seo: {
      title: "${escapeTS(data.seoTitle || data.title)}",
      description: "${escapeTS(data.seoDescription || data.excerpt)}",
      canonical: "https://www.medicarefaq.com/blog/${escapeTS(data.slug)}/",
      ogImage: "${escapeTS(data.ogImage || data.image)}",
    },
    title: "${escapeTS(data.title)}",
    excerpt: "${escapeTS(data.excerpt)}",
    category: "${escapeTS(data.category)}",
    categoryColor: "${categoryColor}",
    date: "${escapeTS(data.date)}",
    author: "${escapeTS(data.author)}",
    reviewer: "${escapeTS(data.reviewer)}",
    readTime: "${readTime}",
    featured: false,
    image: "${escapeTS(data.image)}",
    imageAlt: "${escapeTS(data.imageAlt || data.title)}",${keyTakeawaysStr}
    tableOfContents: ${tocStr},
    sections: ${sectionsStr},${faqsStr}${relatedStr}
  }`;
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, title, excerpt, category, date, author, reviewer, image, imageAlt, seoTitle, seoDescription, ogImage, htmlBody, structuredSections, keyTakeaways, faqs, relatedSlugs } = body;

    // Validate required fields
    if (!slug || !title) {
      return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
    }

    // Validate slug format
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json({ error: "Invalid slug format. Use lowercase letters, numbers, and hyphens only." }, { status: 400 });
    }

    const filePath = "src/lib/blog-articles-data.ts";

    // Get current file content and SHA
    const { content: currentSrc, sha: fileSha } = await githubGetFileContent(filePath);

    // Check if slug already exists
    if (currentSrc.includes(`slug: "${slug}"`)) {
      return NextResponse.json({ error: `Article with slug "${slug}" already exists.` }, { status: 409 });
    }

    // Build the new article object
    const articleObj = buildArticleObject({
      slug,
      title,
      excerpt: excerpt ?? "",
      category: category ?? "General",
      date: date ?? new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: author ?? "David Haass",
      reviewer: reviewer ?? "Ashlee Zareczny",
      image: image ?? "",
      imageAlt: imageAlt ?? "",
      seoTitle: seoTitle ?? "",
      seoDescription: seoDescription ?? "",
      ogImage: ogImage ?? "",
      htmlBody: htmlBody ?? "",
      structuredSections: structuredSections ?? undefined,
      keyTakeaways: keyTakeaways ?? undefined,
      faqs: faqs ?? undefined,
      relatedSlugs: relatedSlugs ?? undefined,
    });

    // Insert the new article at the beginning of the array (after the opening bracket)
    const arrayStartRegex = /export\s+const\s+blogArticles[^=]*=\s*\[/;
    const arrayStartMatch = currentSrc.match(arrayStartRegex);
    if (!arrayStartMatch || arrayStartMatch.index === undefined) {
      throw new Error("Could not find blogArticles array in source file");
    }

    const insertPos = arrayStartMatch.index + arrayStartMatch[0].length;
    const newSrc = currentSrc.slice(0, insertPos) + "\n" + articleObj + ",\n" + currentSrc.slice(insertPos);

    // Commit to GitHub
    const commitRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `cms: create new blog article "${slug}"`,
          content: encodeBase64(newSrc),
          sha: fileSha,
          branch: BRANCH,
        }),
      }
    );

    if (!commitRes.ok) {
      const err = await commitRes.text();
      throw new Error(`GitHub commit failed: ${commitRes.status} - ${err}`);
    }

    const commitData = await commitRes.json();

    return NextResponse.json({
      committed: true,
      commitSha: commitData.commit?.sha,
      slug,
      url: `/blog/${slug}/`,
      message: `Created "${title}" successfully. Vercel deploy triggered.`,
    });
  } catch (err) {
    console.error("[CMS create]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
