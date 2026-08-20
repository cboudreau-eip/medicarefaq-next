import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const articlePath = new URL("../src/lib/blog-articles-data.ts", import.meta.url);
const schemaPath = new URL("../src/app/blog/[slug]/page.tsx", import.meta.url);
const articleSource = fs.readFileSync(articlePath, "utf8");
const schemaSource = fs.readFileSync(schemaPath, "utf8");

/**
 * Slice out a single article by slug.
 *
 * The slice MUST be bounded by the next article's slug. Slicing to end-of-file
 * would leak every assertion below into every later article in the array.
 * Both quoting styles appear in blog-articles-data.ts: `"slug": "x"` and `slug: "x"`.
 */
function sliceArticle(source, slug) {
  const start = Math.max(
    source.indexOf(`"slug": "${slug}"`),
    source.indexOf(`slug: "${slug}"`)
  );
  if (start < 0) return null;

  const nextQuoted = source.indexOf('"slug": "', start + 1);
  const nextBare = source.indexOf('slug: "', start + 1);
  const candidates = [nextQuoted, nextBare].filter((i) => i >= 0);
  const end = candidates.length ? Math.min(...candidates) : source.length;

  return source.slice(start, end);
}

test("Plan G companies article contains required publishable content", () => {
  const article = sliceArticle(articleSource, "best-medicare-supplement-plan-g-companies");
  assert.ok(article, "Plan G companies article must exist");
  assert.ok(article.includes('"type": "faq"'), "Article must include a visible FAQ section");
  assert.equal((article.match(/"question":/g) || []).length >= 8, true, "Article must have at least eight FAQ questions");
  assert.ok(article.includes('"type": "zip-cta"'), "Article must include a plan-comparison CTA");
  assert.equal(article.includes("—"), false, "Article must not contain em dashes");
  assert.equal((article.match(/\]\(\//g) || []).length >= 5, true, "Article must include at least five internal links");
});

test("shared blog schema converts FAQ sections into FAQPage JSON-LD", () => {
  assert.ok(schemaSource.includes('s.type === "faq"'), "Schema builder must scan FAQ sections");
  assert.ok(schemaSource.includes('"@type": "FAQPage"'), "Schema builder must emit FAQPage markup");
  assert.ok(schemaSource.includes('acceptedAnswer'), "Schema builder must emit accepted answers");
});
