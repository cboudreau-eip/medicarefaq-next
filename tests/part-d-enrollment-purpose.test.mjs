import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const blogSource = fs
  .readFileSync(new URL("../src/lib/blog-articles-data.ts", import.meta.url), "utf8")
  .replace(/\r\n/g, "\n");
const referenceSource = fs
  .readFileSync(new URL("../src/lib/part-d-sub-data.ts", import.meta.url), "utf8")
  .replace(/\r\n/g, "\n");

const start = blogSource.indexOf('  {\n    "slug": "medicare-part-d-enrollment-deadlines"');
const nextQuoted = blogSource.indexOf('  {\n    "slug": "medicare-part-d-premium-stabilization"', start);
const nextBare = blogSource.indexOf('  {\n    slug: "medicare-part-d-premium-stabilization"', start);
const end = [nextQuoted, nextBare].filter((index) => index >= 0).sort((a, b) => a - b)[0] ?? -1;
assert.ok(start >= 0 && end > start, "bounded Part D deadline article must exist");
const article = JSON.parse(blogSource.slice(start, end).trim().replace(/,$/, ""));

test("deadline article is a practical checklist linked to the rules reference", () => {
  assert.equal(article.slug, "medicare-part-d-enrollment-deadlines");
  assert.match(article.title, /Checklist/);
  assert.ok(
    JSON.stringify(article).includes(
      "/original-medicare/medicare-parts/medicare-part-d/medicare-part-d-enrollment-periods/"
    )
  );
  assert.equal(article.seo.description.length >= 150 && article.seo.description.length <= 160, true);
  assert.equal(article.seo.ogImage, article.image);
});

test("deadline article meets the publishable content structure", () => {
  const headings = article.sections.filter((section) => section.type === "heading" && section.level === 2);
  const faq = article.sections.find((section) => section.type === "faq");
  assert.equal(headings.length, 7);
  assert.deepEqual(
    article.tableOfContents.map((item) => item.id),
    headings.map((heading) => heading.id)
  );
  assert.equal(faq.faqs.length, 8);
  assert.equal(article.sections.filter((section) => section.type === "eddie-pro-tip").length, 1);
  assert.equal(article.sections.filter((section) => section.type === "zip-cta").length, 1);
  assert.equal((JSON.stringify(article).match(/\]\(\//g) || []).length >= 5, true);
  assert.equal(JSON.stringify(article).includes("—"), false);
});

test("article separates the SEP deadline from the 63-day penalty rule", () => {
  const text = JSON.stringify(article);
  assert.match(text, /63-Day Rule Is Not Your SEP Deadline/);
  assert.match(text, /two full months after the month the coverage ends/);
  assert.match(text, /rounded to the nearest \$0\.10/);
  assert.match(text, /"12","\$4\.70","\$56\.40"/);
});

test("reference page owns the enrollment rules and links to the checklist", () => {
  const refStart = referenceSource.indexOf('    slug: "medicare-part-d-enrollment-periods"');
  const refEnd = referenceSource.indexOf('    slug: "medicare-part-d-eligibility"', refStart);
  const reference = referenceSource.slice(refStart, refEnd);
  assert.ok(refStart >= 0 && refEnd > refStart);
  assert.match(reference, /Initial Enrollment Period for Part D/);
  assert.doesNotMatch(reference, /Initial Coverage Election Period \(ICEP\)/);
  assert.match(reference, /Is the 63-day rule a Special Enrollment Period deadline\?/);
  assert.match(reference, /Part D Deadline Checklist/);
});
