import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const missingPage = new Error("NEXT_HTTP_ERROR_FALLBACK;404");
function load(relativePath, dependencies = {}) {
  const source = fs.readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", compiled)(
    (name) => name in dependencies ? dependencies[name] : require(name), module, module.exports
  );
  return module.exports;
}
const data = load("../src/lib/medicare-advantage-sub-data.ts");
const route = load("../src/app/medicare-part-c/[slug]/page.tsx", {
  "next/navigation": { notFound() { throw missingPage; } },
  "@/components/SiteLayout": { default: () => null },
  "../MedicareAdvantagePageContent": { default: () => null },
  "@/lib/medicare-advantage-sub-data": data,
});

test("unknown Advantage routes stop before rendering successful article markup or metadata", async () => {
  for (const slug of ["medicare-advantage-enrollment", "medicare-advantage-give-back-benefit", "audit-nonexistent-page"]) {
    const props = { params: Promise.resolve({ slug }) };
    await assert.rejects(route.default(props), (error) => error === missingPage);
    await assert.rejects(route.generateMetadata(props), (error) => error === missingPage);
  }
});

test("existing Advantage pages still render and retain their own metadata", async () => {
  for (const page of data.MEDICARE_ADVANTAGE_PAGES.filter((page) => page.slug)) {
    const props = { params: Promise.resolve({ slug: page.slug }) };
    const metadata = await route.generateMetadata(props);
    assert.equal(metadata.title, page.title);
    assert.equal(metadata.alternates.canonical, `https://www.medicarefaq.com/medicare-part-c/${page.slug}/`);
    assert.ok(await route.default(props));
  }
});

test("old enrollment and give-back URLs resolve to equivalent content", () => {
  const { BROKEN_LINK_REPAIRS } = load("../src/lib/broken-link-repairs.ts");
  assert.equal(BROKEN_LINK_REPAIRS["/medicare-part-c/medicare-advantage-enrollment"], "/medicare-part-c/medicare-advantage-enrollment-periods/");
  assert.equal(BROKEN_LINK_REPAIRS["/medicare-part-c/medicare-advantage-give-back-benefit"], "/faqs/medicare-part-b-give-back-plan/");
});
