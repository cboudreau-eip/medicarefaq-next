import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";

const compiled = ts.transpileModule(fs.readFileSync(new URL("../src/lib/faq-categories.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { FAQ_CATEGORIES, getFaqCategoryBySlug, getFaqCategoryLabel, faqCategoryHref } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

test("category links use stable directories rather than click-only filters", () => {
  assert.equal(faqCategoryHref("Coverage"), "/faqs/categories/coverage/");
  assert.equal(faqCategoryHref("Plans & Supplements"), "/faqs/categories/plans-supplements/");
  assert.equal(faqCategoryHref("All Topics"), "/faqs/");
  assert.equal(new Set(FAQ_CATEGORIES.map((category) => category.slug)).size, FAQ_CATEGORIES.length);
});

test("existing article categories retain their directory grouping", () => {
  assert.equal(getFaqCategoryLabel("Coverage Q&A"), "Coverage");
  assert.equal(getFaqCategoryLabel("Medicare Supplement (Medigap)"), "Plans & Supplements");
  assert.equal(getFaqCategoryLabel("Medicare Eligibility"), "Enrollment");
  assert.equal(getFaqCategoryLabel("Costs & Savings"), "Costs & Drugs");
  assert.equal(getFaqCategoryLabel("Medicare & Disability"), "Special Situations");
  assert.equal(getFaqCategoryLabel("New uncategorized topic"), "Coverage");
});

test("unknown and nested category names do not select a valid directory", () => {
  assert.equal(getFaqCategoryBySlug("does-not-exist"), undefined);
  assert.equal(getFaqCategoryBySlug("coverage/another-page"), undefined);
  assert.equal(getFaqCategoryBySlug("Coverage"), undefined);
  assert.equal(getFaqCategoryBySlug("coverage").heading, "Medicare Coverage FAQs");
});

test("a raw editorial category never belongs to multiple directories", () => {
  const raw = FAQ_CATEGORIES.flatMap((category) => category.matches);
  assert.equal(new Set(raw).size, raw.length);
});
