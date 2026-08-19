import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const file = new URL("../src/lib/blog-articles-data.ts", import.meta.url);
const source = fs.readFileSync(file, "utf8");
const slug = "strategies-for-choosing-medicare-part-d-plan";
const start = source.indexOf(`"slug": "${slug}"`);
const article = source.slice(start, source.indexOf("\n  }\n];", start));

test("Part D selection article contains the verified 2026 plan-selection figures", () => {
  assert.ok(start >= 0, "Part D selection article must exist");
  for (const value of ["$34.50", "$615", "$2,100", "$38.99", "$14.50", "$91.00", "$109,000", "$218,000"]) {
    assert.ok(article.includes(value), `Article must include verified value ${value}`);
  }
  assert.equal(article.includes("$36.78 in 2026"), false, "Article must not use the stale 2026 Part D penalty base premium");
  assert.equal(article.includes("$2,000 in 2026"), false, "Article must not use the stale 2026 Part D cap");
});

test("Part D selection article includes visible FAQs for the shared FAQPage schema builder", () => {
  assert.ok(article.includes('"type": "faq"'), "Article must include a FAQ section");
  const questions = article.match(/"question":/g) ?? [];
  const answers = article.match(/"answer":/g) ?? [];
  assert.ok(questions.length >= 8, "Article must include at least eight FAQ questions");
  assert.equal(questions.length, answers.length, "Each FAQ question must have an answer");
});

test("Part D selection article includes the matching Buzzsprout episode", () => {
  assert.ok(
    article.includes("19672582-top-5-strategies-for-choosing-a-medicare-part-d-prescription-drug-plan"),
    "Article must include the supplied Part D strategy podcast episode",
  );
});
