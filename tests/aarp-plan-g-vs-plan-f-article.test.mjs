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

test("AARP Plan G versus Plan F article includes decision safeguards and structured FAQ content", () => {
  const article = sliceArticle(articleSource, "aarp-plan-g-vs-plan-f");
  assert.ok(article, "AARP Plan G versus Plan F article must exist");
  assert.ok(article.includes('"type": "faq"'), "Article must include a FAQ section");
  assert.equal((article.match(/"question":/g) || []).length >= 10, true, "Article must have at least ten FAQs");
  assert.equal((article.match(/"type": "zip-cta"/g) || []).length, 2, "Article must have two single-action CTAs");
  assert.equal(article.includes("—"), false, "Article must not contain em dashes");
  assert.equal((article.match(/\]\(\//g) || []).length >= 5, true, "Article must include at least five internal links");
  assert.ok(article.includes("Do not cancel your current coverage"), "Article must include replacement-policy safety guidance");
});

test("shared blog schema automatically turns visible FAQ sections into FAQPage markup", () => {
  assert.ok(schemaSource.includes('s.type === "faq"'), "Schema builder must collect FAQ sections");
  assert.ok(schemaSource.includes('"@type": "FAQPage"'), "Schema builder must emit FAQPage markup");
  assert.ok(schemaSource.includes('acceptedAnswer'), "FAQPage markup must include accepted answers");
});
