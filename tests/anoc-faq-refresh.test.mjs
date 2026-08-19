import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const file = new URL("../src/lib/coverage-data.ts", import.meta.url);
const source = fs.readFileSync(file, "utf8");
const slug = "medicare-annual-notice-of-change-letter";
const start = source.indexOf(`  {\n    slug: "${slug}"`);
const end = source.indexOf('  {\n    slug: "medicare-give-back-benefit",', start);
const article = source.slice(start, end);

test("ANOC FAQ refresh provides concise action guidance and relevant related topics", () => {
  assert.ok(start >= 0, "ANOC article must exist");
  assert.ok(article.includes("Your 10-Minute ANOC Review Checklist"), "Article must include a short ANOC review checklist");
  assert.ok(article.includes("Did Your ANOC Change Your Costs or Coverage?"), "Article must include a topical CTA");
  for (const topic of ["what-is-a-medicare-part-d-formulary", "top-5-medicare-prescription-drug-plans", "medicare-part-d-enrollment-deadlines", "medicare-supplement-open-enrollment"]) {
    assert.ok(article.includes(topic), `Article must include relevant destination ${topic}`);
  }
  for (const unrelatedTopic of ["does-medicare-cover-dental-implants", "does-medicare-cover-glasses", "does-medicare-cover-hearing-aids", "does-medicare-cover-sleep-apnea"]) {
    assert.equal(article.includes(unrelatedTopic), false, `Article must remove unrelated topic ${unrelatedTopic}`);
  }
});

test("ANOC FAQ refresh supplies question-answer pairs for FAQPage schema", () => {
  assert.ok(article.includes("faqs: ["), "Article must include a populated FAQ array");
  const questions = article.match(/question:/g) ?? [];
  const answers = article.match(/answer:/g) ?? [];
  assert.ok(questions.length >= 6, "Article must include at least six concise FAQs");
  assert.equal(questions.length, answers.length, "Each ANOC FAQ must have an answer");
});
