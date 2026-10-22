import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const source = readFileSync(new URL("../src/lib/coverage-data.ts", import.meta.url), "utf8").replace(/\r\n/g, "\n");
const marker = source.indexOf('"slug": "when-does-medicare-start"');
const start = source.lastIndexOf("  {\n", marker);
const end = source.indexOf('\n  {\n    slug: "part-d-formulary"', marker);
assert.ok(marker > 0 && end > start);
const article = JSON.parse(source.slice(start, end).trim().replace(/,$/, ""));

test("GEP start rules agree across quick answer, table, section, FAQ and sidebar", () => {
  assert.match(article.quickAnswer.text, /General Enrollment Period coverage also starts the month after/);
  assert.equal(article.comparisonTable.find(r => r.planType.startsWith("GEP:")).coverage, "First day of following month");
  assert.match(article.planBreakdowns.find(p => p.planName.startsWith("General Enrollment")).paragraphs[0], /first day of the month after/);
  assert.match(article.faqs.find(f => f.question.includes("General Enrollment")).answer, /month after/);
  assert.ok(article.quickReference.some(r => r.text === "GEP: coverage starts the month after enrollment."));
});

test("separates Part A retroactivity, birthday exception and employer coverage", () => {
  assert.ok(article.planBreakdowns.some(p => p.planName.startsWith("Premium-Free Part A")));
  assert.ok(article.faqs.some(f => f.question.includes("first of the month")));
  assert.match(article.quickAnswer.text, /working-past-65/);
  assert.doesNotMatch(JSON.stringify(article), /No retroactive coverage|Employer must have 20\+|same enrollment period rules as Part B/);
  assert.equal(article.quickAnswer.badges.length, 0);
});

test("preserves canonical and existing CTA while using enrollment-specific labels", () => {
  assert.equal(article.seo.canonical, "https://www.medicarefaq.com/faqs/when-does-medicare-start/");
  assert.equal(article.showMidInlineCta, true);
  assert.equal(article.comparisonHeaders.primary, "When You Enroll");
  assert.equal(article.planBreakdowns[0].whatItCoversTitle, "Key Timing Rules");
  assert.equal(article.faqs[0].question, "Can I delay Medicare if I am still working?");
});
