import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";

const file = new URL("../src/lib/broken-link-repairs.ts", import.meta.url);
const compiled = ts.transpileModule(fs.readFileSync(file, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { repairInternalHref } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

test("FAQ links reach the correct section instead of a nonexistent FAQ slug", () => {
  assert.equal(repairInternalHref("/faqs/what-is-medicare-advantage/"), "/medicare-part-c/medicare-advantage-plans/");
  assert.equal(repairInternalHref("/faqs/medicare-supplement-plan-n"), "/medicare-supplement-plans/plan-n/");
  assert.equal(repairInternalHref("/faqs/what-is-a-dual-eligible-special-needs-plan"), "/blog/dual-eligible-special-needs-plans-dsnp-explained/");
});

test("both URL spellings preserve query parameters and fragments", () => {
  assert.equal(repairInternalHref("/faqs/medicare-for-dummies?source=faq#overview"), "/medicare-101/?source=faq#overview");
  assert.equal(repairInternalHref("https://www.medicarefaq.com/faqs/medicare-for-dummies/#overview"), "https://www.medicarefaq.com/medicare-101/#overview");
});

test("unavailable articles are omitted rather than redirected to unrelated content", () => {
  assert.equal(repairInternalHref("/faqs/native-american-health-and-medicare/"), null);
  assert.equal(repairInternalHref("/faqs/eliquis-cost-with-medicare"), null);
  assert.equal(repairInternalHref("/faqs/medicare-costs-2025"), null);
});

test("the resolver leaves other URLs, child routes and external sites untouched", () => {
  for (const href of [
    "/original-medicare/medicare-enrollment-periods/",
    "/faqs/medicare-savings-programs/faq/another-page/",
    "https://example.com/faqs/medicare-for-dummies/",
    "https://www.medicarefaq.com.example.com/faqs/medicare-for-dummies/",
    "/faqs/medicare-extra-help-program/",
    "#faq",
    "mailto:info@medicarefaq.com",
    "tel:+18883358996",
  ]) assert.equal(repairInternalHref(href), href);
});

test("HTML sitemap links use the current enrollment routes", () => {
  const source = fs.readFileSync(new URL("../src/app/sitemap-page/PageContent.tsx", import.meta.url), "utf8");
  assert.ok(source.includes('href: "/faqs/medicare-and-employer-coverage/"'));
  assert.ok(source.includes('href: "/faqs/medicare-special-enrollment-periods/"'));
  assert.ok(source.includes('href: "/original-medicare/medicare-enrollment-periods/"'));
  assert.equal(source.includes('/original-medicare/original-medicare/'), false);
});
