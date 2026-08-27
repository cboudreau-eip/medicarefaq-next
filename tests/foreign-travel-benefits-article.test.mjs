import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const articlePath = new URL("../src/lib/blog-articles-data.ts", import.meta.url);
const schemaPath = new URL("../src/app/blog/[slug]/page.tsx", import.meta.url);
const articleSource = fs.readFileSync(articlePath, "utf8");
const schemaSource = fs.readFileSync(schemaPath, "utf8");

/**
 * Slice out a single article by slug, bounded by the next article's slug.
 * blog-articles-data.ts mixes quoted-key and bare-key object styles depending
 * on which tool last wrote an entry, so both must be checked.
 */
function sliceArticle(source, slug) {
  const start = Math.max(
    source.indexOf(`"slug": "${slug}"`),
    source.indexOf(`slug: "${slug}"`)
  );
  if (start < 0) return null;

  const nextQuoted = source.indexOf('"slug": "', start + 1);
  const nextBare = source.indexOf("slug: \"", start + 1);
  const candidates = [nextQuoted, nextBare].filter((i) => i >= 0);
  const end = candidates.length ? Math.min(...candidates) : source.length;

  return source.slice(start, end);
}

test("Medigap foreign travel benefits article contains required publishable content", () => {
  const article = sliceArticle(articleSource, "understanding-medigaps-foreign-travel-benefits-whats-really-covered");
  assert.ok(article, "Foreign travel benefits article must exist");

  const hasType = (value) => new RegExp(`type["']?:\\s*["\`]${value}["\`]`).test(article);

  assert.ok(hasType("faq"), "Article must include a visible FAQ section");
  assert.equal((article.match(/question["']?:\s*["`]/g) || []).length >= 5, true, "Article must have at least five FAQ questions");
  assert.ok(hasType("zip-cta"), "Article must include a plan-comparison CTA");
  assert.ok(hasType("eddie-pro-tip"), "Article must include exactly one Eddie's Pro Tip");
  assert.equal(article.includes("—"), false, "Article must not contain em dashes");
  assert.equal((article.match(/\]\(\//g) || []).length >= 5, true, "Article must include at least five internal links");
  assert.ok(hasType("table"), "Article must include the plans-that-qualify comparison table");
  assert.ok(article.includes("$50,000"), "Article must state the correct $50,000 lifetime maximum, not the earlier incorrect $250,000 figure");
  assert.equal(article.includes("$250,000"), false, "Article must not contain the earlier incorrect $250,000 lifetime maximum");
});

test("shared blog schema converts FAQ sections into FAQPage JSON-LD", () => {
  assert.ok(schemaSource.includes('s.type === "faq"'), "Schema builder must scan FAQ sections");
  assert.ok(schemaSource.includes('"@type": "FAQPage"'), "Schema builder must emit FAQPage markup");
  assert.ok(schemaSource.includes("acceptedAnswer"), "Schema builder must emit accepted answers");
});
