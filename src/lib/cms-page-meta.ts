/**
 * Parse and rewrite SEO metadata + JSON-LD schema in a Next.js `page.tsx`.
 *
 * The site's static pages follow a very consistent shape:
 *
 *   export const metadata: Metadata = {
 *     title: "...",
 *     description: "...",
 *     alternates: { canonical: "..." },
 *     openGraph: { title, description, url, type, images: [{ url }] },
 *     robots: { index, follow },   // optional
 *   };
 *
 *   // optional, inside the default Page() component:
 *   <script type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(<obj>) }} />
 *
 * Reads are tolerant of formatting differences (single-line vs wrapped values).
 * Writes are done by surgically replacing only the recognized fields, leaving
 * the rest of the file byte-for-byte intact, so page structure / imports / the
 * component body are never disturbed.
 */

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  ogImage: string;
  robotsIndex: boolean | null; // null = no robots directive present
  robotsFollow: boolean | null;
  /** Raw JSON-LD objects found in the file (already pretty-printed JSON). */
  schemas: string[];
  /** True if the file has an `export const metadata` block we can edit. */
  hasMetadata: boolean;
}

/** Extract a string value for a simple `key: "value"` (handles wrapped lines). */
function extractString(src: string, key: string): string {
  // Matches: key: "..."  OR  key:\n      "..."  (single or double quotes)
  const re = new RegExp(
    `(?:^|[\\s{,])${key}\\s*:\\s*(["'\`])((?:\\\\.|(?!\\1)[^\\\\])*)\\1`,
    "m"
  );
  const m = src.match(re);
  if (!m) return "";
  // Unescape common sequences.
  return m[2].replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
}

/** Extract the first nested block for a key, e.g. alternates: { ... } */
function extractBlock(src: string, key: string): string | null {
  const startRe = new RegExp(`${key}\\s*:\\s*\\{`, "m");
  const m = src.match(startRe);
  if (!m || m.index === undefined) return null;
  const braceStart = src.indexOf("{", m.index);
  if (braceStart === -1) return null;
  let depth = 0;
  for (let i = braceStart; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return src.slice(braceStart, i + 1);
    }
  }
  return null;
}

/** Extract the metadata object literal text. */
function extractMetadataBlock(src: string): string | null {
  const m = src.match(/export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{/);
  if (!m || m.index === undefined) return null;
  const braceStart = src.indexOf("{", m.index);
  let depth = 0;
  for (let i = braceStart; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return src.slice(braceStart, i + 1);
    }
  }
  return null;
}

function extractBool(src: string, key: string): boolean | null {
  const re = new RegExp(`${key}\\s*:\\s*(true|false)`, "m");
  const m = src.match(re);
  if (!m) return null;
  return m[1] === "true";
}

export interface NamedSchema {
  /** The variable name, e.g. "articleSchema". */
  name: string;
  /** The raw object-literal text (JS), e.g. `{ "@context": ... }`. */
  raw: string;
  /** Detected @type if present. */
  type: string;
}

/** Extract JSON-LD schema object literals with their variable names. */
export function extractNamedSchemas(src: string): NamedSchema[] {
  const out: NamedSchema[] = [];
  const declRe = /const\s+(\w+)\s*=\s*\{\s*["']@context["']/g;
  let m: RegExpExecArray | null;
  while ((m = declRe.exec(src)) !== null) {
    const name = m[1];
    const braceStart = src.indexOf("{", m.index);
    let depth = 0;
    for (let i = braceStart; i < src.length; i++) {
      const ch = src[i];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          const raw = src.slice(braceStart, i + 1).trim();
          const typeMatch = raw.match(/["']?@type["']?\s*:\s*["']([^"']+)["']/);
          out.push({ name, raw, type: typeMatch ? typeMatch[1] : "" });
          break;
        }
      }
    }
  }
  return out;
}

/** Extract JSON-LD schema objects by capturing JSON.stringify(<ident or obj>). */
export function extractSchemas(src: string): string[] {
  return extractNamedSchemas(src).map((s) => s.raw);
}

/**
 * Replace the body of a named schema object literal with new content.
 * `newObjectLiteral` must be a valid JS/JSON object literal string `{ ... }`.
 * Returns the modified source, or the original if the name was not found.
 */
export function replaceNamedSchema(
  src: string,
  name: string,
  newObjectLiteral: string
): string {
  const declRe = new RegExp(`const\\s+${name}\\s*=\\s*\\{`);
  const m = src.match(declRe);
  if (!m || m.index === undefined) return src;
  const braceStart = src.indexOf("{", m.index);
  let depth = 0;
  for (let i = braceStart; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        const before = src.slice(0, braceStart);
        const after = src.slice(i + 1);
        return before + newObjectLiteral + after;
      }
    }
  }
  return src;
}

/**
 * Insert a new named schema constant + its <script> tag into a page that uses
 * the SiteLayout JSON-LD pattern. Best-effort: inserts the const right after
 * the default function's opening brace, and the script tag right after the
 * first <SiteLayout ...> open tag. Returns { src, inserted }.
 */
export function insertSchema(
  src: string,
  varName: string,
  objectLiteral: string
): { src: string; inserted: boolean } {
  const fnRe = /export\s+default\s+function\s+\w*\s*\([^)]*\)\s*\{/;
  const fnMatch = src.match(fnRe);
  if (!fnMatch || fnMatch.index === undefined) return { src, inserted: false };
  const insertAt = fnMatch.index + fnMatch[0].length;
  const constDecl = `\n  const ${varName} = ${objectLiteral};\n`;
  let out = src.slice(0, insertAt) + constDecl + src.slice(insertAt);

  const layoutRe = /<SiteLayout[^>]*>/;
  const lm = out.match(layoutRe);
  if (!lm || lm.index === undefined) {
    return { src, inserted: false };
  }
  const scriptAt = lm.index + lm[0].length;
  const scriptTag = `\n      <script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(${varName}) }}\n      />`;
  out = out.slice(0, scriptAt) + scriptTag + out.slice(scriptAt);
  return { src: out, inserted: true };
}

/**
 * Pretty-print a parsed JSON value as a JS object literal for embedding in a
 * page.tsx. Keys stay quoted (valid JS), 2-space indentation.
 */
export function jsonToObjectLiteral(obj: unknown, indent = 2): string {
  return JSON.stringify(obj, null, indent);
}

export function parsePageMeta(src: string): PageMeta {
  const metaBlock = extractMetadataBlock(src) ?? "";
  const hasMetadata = !!metaBlock;

  const alternates = extractBlock(metaBlock, "alternates") ?? "";
  const og = extractBlock(metaBlock, "openGraph") ?? "";
  const robots = extractBlock(metaBlock, "robots");

  // og images: first url inside images array
  let ogImage = "";
  const imagesBlock = extractBlock(og, "images");
  if (imagesBlock) {
    ogImage = extractString(imagesBlock, "url");
  }

  return {
    title: extractString(metaBlock, "title"),
    description: extractString(metaBlock, "description"),
    canonical: extractString(alternates, "canonical"),
    ogTitle: extractString(og, "title"),
    ogDescription: extractString(og, "description"),
    ogUrl: extractString(og, "url"),
    ogType: extractString(og, "type"),
    ogImage,
    robotsIndex: robots ? extractBool(robots, "index") : null,
    robotsFollow: robots ? extractBool(robots, "follow") : null,
    schemas: extractSchemas(src),
    hasMetadata,
  };
}

function escapeForDoubleQuote(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

/**
 * Replace a `key: "..."` (or wrapped) string value inside a given block text.
 * Returns the modified block, or the original if the key wasn't found.
 */
function replaceStringInBlock(block: string, key: string, value: string): string {
  const re = new RegExp(
    `((?:^|[\\s{,])${key}\\s*:\\s*)(["'\`])((?:\\\\.|(?!\\2)[^\\\\])*)\\2`,
    "m"
  );
  if (!re.test(block)) return block;
  return block.replace(re, `$1"${escapeForDoubleQuote(value)}"`);
}

export interface PageMetaEdit {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
}

/**
 * Apply metadata edits to the source, surgically replacing only the known
 * fields. Returns the new source. Never touches the component body.
 */
export function applyPageMetaEdits(src: string, edits: PageMetaEdit): string {
  const metaBlock = extractMetadataBlock(src);
  if (!metaBlock) return src;

  let newMeta = metaBlock;

  // Top-level title/description
  if (edits.title !== undefined) {
    newMeta = replaceStringInBlock(newMeta, "title", edits.title);
  }
  if (edits.description !== undefined) {
    newMeta = replaceStringInBlock(newMeta, "description", edits.description);
  }

  // alternates.canonical
  if (edits.canonical !== undefined) {
    const altBlock = extractBlock(newMeta, "alternates");
    if (altBlock) {
      const newAlt = replaceStringInBlock(altBlock, "canonical", edits.canonical);
      newMeta = newMeta.replace(altBlock, newAlt);
    }
  }

  // openGraph.{title,description,url} and images[0].url
  const ogBlock = extractBlock(newMeta, "openGraph");
  if (ogBlock) {
    let newOg = ogBlock;
    if (edits.ogTitle !== undefined) newOg = replaceStringInBlock(newOg, "title", edits.ogTitle);
    if (edits.ogDescription !== undefined)
      newOg = replaceStringInBlock(newOg, "description", edits.ogDescription);
    if (edits.ogUrl !== undefined) newOg = replaceStringInBlock(newOg, "url", edits.ogUrl);
    if (edits.ogImage !== undefined) {
      const imagesBlock = extractBlock(newOg, "images");
      if (imagesBlock) {
        const newImages = replaceStringInBlock(imagesBlock, "url", edits.ogImage);
        newOg = newOg.replace(imagesBlock, newImages);
      }
    }
    newMeta = newMeta.replace(ogBlock, newOg);
  }

  return src.replace(metaBlock, newMeta);
}

/**
 * Set (or clear) the robots index/follow directive in the metadata block.
 * If both are null, removes any existing robots key. Otherwise inserts/updates.
 */
export function applyRobotsEdit(
  src: string,
  index: boolean,
  follow: boolean
): string {
  const metaBlock = extractMetadataBlock(src);
  if (!metaBlock) return src;
  const robots = extractBlock(metaBlock, "robots");
  const robotsLiteral = `robots: { index: ${index}, follow: ${follow} }`;
  let newMeta: string;
  if (robots) {
    // Replace the whole `robots: { ... }` (need to include the key prefix)
    const keyRe = /robots\s*:\s*\{[\s\S]*?\}/m;
    newMeta = metaBlock.replace(keyRe, robotsLiteral);
  } else {
    // Insert after the opening brace of the metadata object.
    newMeta = metaBlock.replace(/^\{/, `{\n  ${robotsLiteral},`);
  }
  return src.replace(metaBlock, newMeta);
}
