import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const articlePath = new URL("../src/lib/blog-articles-data.ts", import.meta.url);
const schemaPath = new URL("../src/app/blog/[slug]/page.tsx", import.meta.url);
const articleSource = fs.readFileSync(articlePath, "utf8");
const schemaSource = fs.readFileSync(schemaPath, "utf8");

test("AARP Plan G versus Plan F article includes decision safeguards and structured FAQ content", () => {
  const marker = '"slug": "aarp-plan-g-vs-plan-f"';
  const start = articleSource.indexOf(marker);
  assert.ok(start >= 0, "AARP Plan G versus Plan F article must exist");

  const article = articleSource.slice(start);
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
