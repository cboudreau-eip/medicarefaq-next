import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const file = new URL("../src/lib/coverage-data.ts", import.meta.url);
const source = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
const slug = "top-10-medicare-supplement-insurance-companies";
const start = source.indexOf(`  {\n    slug: "${slug}"`);
const end = source.indexOf('  {\n    slug: "do-i-really-need-supplemental-insurance-with-medicare"', start);
const article = source.slice(start, end === -1 ? undefined : end);

test("Medigap company guide uses current verified 2026 figures", () => {
  assert.ok(start >= 0, "Medigap company guide must exist");
  assert.ok(article.includes("$1,736"), "Article must use the 2026 Part A deductible");
  assert.ok(article.includes("$283"), "Article must use the 2026 Part B deductible");
  assert.equal(article.includes("$1,676"), false, "Article must not label the 2025 Part A deductible as 2026");
  assert.equal(article.includes("$257"), false, "Article must not label the 2025 Part B deductible as 2026");
});

test("Medigap company guide identifies legal insurers and avoids unsupported rankings", () => {
  for (const required of [
    "Legal underwriting company",
    "NAIC Consumer Insurance Search",
    "Continental Life Insurance Company",
    "United World Life Insurance Company",
    "HCSC completed its acquisition",
    "HealthSpring",
    "Not a ranking or availability guarantee",
  ]) {
    assert.ok(article.includes(required), `Article must include: ${required}`);
  }

  assert.equal(article.includes("Transamerica"), false, "Article must remove the unsupported Transamerica availability claim");
  assert.equal(article.includes("A+ (AM Best)"), false, "Article must not attach undated brand-level ratings");
  assert.equal(article.includes("—"), false, "Article must follow the house rule against em dashes");
});

test("Medigap company guide provides an objective ten-brand comparison and concise FAQs", () => {
  const brandRows = article.match(/"Brand to Compare":/g) ?? [];
  const questions = article.match(/question:/g) ?? [];
  const answers = article.match(/answer:/g) ?? [];

  assert.equal(brandRows.length, 10, "Company table must contain ten clearly qualified brand rows");
  assert.ok(questions.length >= 7, "Article must include at least seven decision-focused FAQs");
  assert.equal(questions.length, answers.length, "Every FAQ question must have an answer");
  assert.ok(article.includes('comparisonTitle: "How to Compare Medicare Supplement Companies"'));
  assert.ok(article.includes('breakdownsTitle: "How to Evaluate a Medigap Company"'));
});
