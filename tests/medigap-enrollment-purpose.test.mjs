import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const blogSource = fs.readFileSync(
  new URL("../src/lib/blog-articles-data.ts", import.meta.url),
  "utf8"
);
const faqSource = fs.readFileSync(
  new URL("../src/lib/simple-faq-data-batch1.ts", import.meta.url),
  "utf8"
);

function sliceBySlug(source, slug) {
  const patterns = [
    `slug: "${slug}"`,
    `slug: '${slug}'`,
    `"slug": "${slug}"`,
  ];
  const starts = patterns.map((pattern) => source.indexOf(pattern)).filter((index) => index >= 0);
  if (!starts.length) return null;

  const start = Math.min(...starts);
  const nextPatterns = ['slug: "', "slug: '", '"slug": "'];
  const ends = nextPatterns
    .map((pattern) => source.indexOf(pattern, start + 1))
    .filter((index) => index >= 0);
  const end = ends.length ? Math.min(...ends) : source.length;

  return source.slice(start, end);
}

test("Medigap enrollment blog is a practical planning guide", () => {
  const article = sliceBySlug(
    blogSource,
    "the-best-time-to-enroll-in-a-medicare-supplement-plan-and-why-it-matters"
  );
  assert.ok(article, "Medigap enrollment planning article must exist");

  const h2Count = (article.match(/type: "heading", level: 2/g) || []).length;
  const tocCount = (article.match(/\{ id: "[^"]+", title:/g) || []).length;
  const faqCount = (article.match(/\{ question: "/g) || []).length;
  const internalLinkCount = (article.match(/\]\(\//g) || []).length;

  assert.equal(h2Count, 8, "Article must contain eight H2 sections");
  assert.equal(tocCount, h2Count, "Table of contents must match the H2 count");
  assert.ok(faqCount >= 8, "Article must contain at least eight visible FAQs");
  assert.equal((article.match(/type: "eddie-pro-tip"/g) || []).length, 1, "Article must contain exactly one Eddie pro tip");
  assert.equal((article.match(/type: "zip-cta"/g) || []).length, 1, "Article must contain one ZIP CTA");
  assert.ok(internalLinkCount >= 5, "Article must contain at least five internal links");
  assert.equal(article.includes("—"), false, "Article must not contain em dashes");
  assert.equal((article.match(/\bfaqs:/g) || []).length, 1, "Only the visible FAQ section should supply schema FAQs");
  assert.ok(article.includes("/faqs/medicare-supplement-open-enrollment/"), "Article must link to the rules FAQ");
  assert.equal(article.includes("/faqs/medicare-part-b/"), false, "Article must not link to the nonexistent Part B FAQ route");
  assert.equal(article.includes("](/medicare-part-d/)"), false, "Article must not link to the nonexistent short Part D route");
  assert.ok(article.toLowerCase().includes("planning checklist"), "Article must retain a practical planning purpose");
});

test("Medigap FAQ remains the authoritative enrollment rules page", () => {
  const faq = sliceBySlug(faqSource, "medicare-supplement-open-enrollment");
  assert.ok(faq, "Medigap enrollment FAQ must exist");

  assert.ok(faq.includes("There Is No Federal Annual Medigap Open Enrollment Period"), "FAQ must distinguish Medigap from annual Medicare enrollment");
  assert.ok(faq.includes("up to six months"), "FAQ must explain the limited pre-existing-condition waiting period");
  assert.ok(faq.includes("/blog/the-best-time-to-enroll-in-a-medicare-supplement-plan-and-why-it-matters/"), "FAQ must link to the practical planning guide");
  assert.ok(faq.includes("September 18, 2026"), "FAQ must show its current review date");
  assert.equal(faq.includes("no insurer can deny your application, charge you more, or make you wait for coverage due to pre-existing conditions"), false, "FAQ must not overstate pre-existing-condition protections");
});
