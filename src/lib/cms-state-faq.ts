/**
 * cms-state-faq.ts
 *
 * Robust extraction and serialization of the per-state Medigap FAQ arrays that
 * power the state Medicare Supplement comparison pages
 * (`src/lib/{state}-medigap-data.ts`).
 *
 * Across the 50 state data libs the FAQ export uses one of several names:
 *   export const FAQS = [...]
 *   export const FLORIDA_FAQS = [...]
 *   export const NEW_YORK_FAQS: FaqItem[] = [...]
 *   export const missouriFAQs = [...]
 * and entries use one of two field-name styles:
 *   { question: "...", answer: "..." }   (most states)
 *   { q: "...", a: "..." }               (e.g. Washington)
 *
 * The editor only ever touches the FAQ array, and serializes back using the
 * SAME field-name style that was found, so the page renderer keeps working.
 * Everything outside the array is preserved byte-for-byte by splicing the new
 * array literal into the exact character range of the old one.
 */

export interface FaqEntry {
  question: string;
  answer: string;
}

export type FaqKeyStyle = "question-answer" | "q-a";

export interface ExtractedFaq {
  /** The export const name, e.g. "FAQS" or "FLORIDA_FAQS" or "missouriFAQs". */
  name: string;
  /** Parsed entries (always normalized to question/answer). */
  entries: FaqEntry[];
  /** Which field-name style the source used, so we can write it back the same. */
  keyStyle: FaqKeyStyle;
  /** Start index (inclusive) of the `[` in the source. */
  arrayStart: number;
  /** End index (exclusive) just after the matching `]`. */
  arrayEnd: number;
}

/** Find the FAQ `export const <NAME> ... = [ ... ]` and return its location.
 * The name must end in FAQ/FAQs/FAQS (case-insensitive on the trailing s). */
export function locateFaqArray(src: string): { name: string; eqIdx: number } | null {
  const re = /export\s+const\s+(\w*?FAQs?)\s*(?::\s*[\w[\]]+\s*)?=\s*\[/gi;
  const m = re.exec(src);
  if (!m) return null;
  // The full match ends exactly at the array's opening `[`, so anchor to the
  // end of the match. This avoids mistaking a type-annotation `[]` (e.g.
  // `: FaqItem[] =`) for the array literal.
  const bracketIdx = m.index + m[0].length - 1;
  return { name: m[1], eqIdx: bracketIdx };
}

/** Given the index of an opening `[`, find the matching closing `]` index,
 * respecting strings (single, double, backtick) and nested brackets. */
export function findMatchingBracket(src: string, openIdx: number): number {
  let depth = 0;
  let inStr: string | null = null;
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (ch === "\\") {
        i++;
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inStr = ch;
      continue;
    }
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

/** Parse a JS string literal starting at `start` (must point at a quote). */
function parseStringLiteral(src: string, start: number): { value: string; end: number } {
  const quote = src[start];
  let i = start + 1;
  let out = "";
  while (i < src.length) {
    const ch = src[i];
    if (ch === "\\") {
      const next = src[i + 1];
      switch (next) {
        case "n": out += "\n"; break;
        case "t": out += "\t"; break;
        case "r": out += "\r"; break;
        case "\\": out += "\\"; break;
        case "'": out += "'"; break;
        case '"': out += '"'; break;
        case "`": out += "`"; break;
        case "\n": break;
        default: out += next ?? ""; break;
      }
      i += 2;
      continue;
    }
    if (ch === quote) return { value: out, end: i + 1 };
    out += ch;
    i++;
  }
  throw new Error("Unterminated string literal in FAQ array");
}

/** Extract the FAQ array (name, parsed entries, key style, and char range). */
export function extractFaqArray(src: string): ExtractedFaq | null {
  const loc = locateFaqArray(src);
  if (!loc || loc.eqIdx < 0) return null;
  const arrayStart = loc.eqIdx;
  const arrayEnd = findMatchingBracket(src, arrayStart);
  if (arrayEnd < 0) return null;

  const body = src.slice(arrayStart + 1, arrayEnd - 1);

  // Detect key style. Prefer question/answer if present; else q/a.
  const hasQuestion = /(^|[\s{,])["']?question["']?\s*:/.test(body);
  const keyStyle: FaqKeyStyle = hasQuestion ? "question-answer" : "q-a";
  const qKey = keyStyle === "question-answer" ? "question" : "q";
  const aKey = keyStyle === "question-answer" ? "answer" : "a";

  const entries: FaqEntry[] = [];
  let i = 0;
  let pending: { question?: string; answer?: string } = {};
  const keyRe = new RegExp(`^["']?(${qKey}|${aKey})["']?\\s*:\\s*`);
  while (i < body.length) {
    const ch = body[i];
    if (/[A-Za-z"']/.test(ch)) {
      const keyMatch = keyRe.exec(body.slice(i));
      if (keyMatch) {
        i += keyMatch[0].length;
        while (i < body.length && /\s/.test(body[i])) i++;
        if (body[i] === '"' || body[i] === "'" || body[i] === "`") {
          const { value, end } = parseStringLiteral(body, i);
          const which = keyMatch[1] === qKey ? "question" : "answer";
          pending[which] = value.trim();
          i = end;
          if (pending.question !== undefined && pending.answer !== undefined) {
            entries.push({ question: pending.question, answer: pending.answer });
            pending = {};
          }
          continue;
        }
      }
    }
    i++;
  }

  return { name: loc.name, entries, keyStyle, arrayStart, arrayEnd };
}

/** Escape a string for safe inclusion inside a double-quoted TS string literal. */
function escapeForDoubleQuote(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "")
    .replace(/\t/g, "\\t");
}

/** Serialize FAQ entries to a TS array literal using the given key style. */
export function serializeFaqArray(
  entries: FaqEntry[],
  keyStyle: FaqKeyStyle = "question-answer"
): string {
  const qKey = keyStyle === "question-answer" ? "question" : "q";
  const aKey = keyStyle === "question-answer" ? "answer" : "a";
  const items = entries
    .map((e) => {
      const q = escapeForDoubleQuote(e.question.trim());
      const a = escapeForDoubleQuote(e.answer.trim());
      return (
        "  {\n" +
        `    ${qKey}: "${q}",\n` +
        `    ${aKey}:\n` +
        `      "${a}",\n` +
        "  },"
      );
    })
    .join("\n");
  return `[\n${items}\n]`;
}

/** Replace the FAQ array in `src` with the serialized form of `entries`,
 * preserving the detected key style and everything outside the array. */
export function replaceFaqArray(src: string, entries: FaqEntry[]): string {
  const found = extractFaqArray(src);
  if (!found) throw new Error("No FAQ array found in source");
  const literal = serializeFaqArray(entries, found.keyStyle);
  return src.slice(0, found.arrayStart) + literal + src.slice(found.arrayEnd);
}
