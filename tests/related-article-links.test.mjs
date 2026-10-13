import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";

function load(relativePath, dependencies = {}) {
  const source = ts.transpileModule(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", source)((name) => {
    if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
    return dependencies[name];
  }, module, module.exports);
  return module.exports;
}
const repairs = load("../src/lib/broken-link-repairs.ts");
const { createRelatedArticleResolver } = load("../src/lib/related-article-links.ts", { "./broken-link-repairs": repairs });
const resolve = createRelatedArticleResolver([
  { slug: "does-medicare-cover-dental-implants", title: "Does Medicare Cover Dental Implants?", href: "/faqs/does-medicare-cover-dental-implants/" },
  { slug: "enrollment-guide", title: "Medicare Enrollment Guide", href: "/blog/enrollment-guide/" },
  { slug: "same-topic", title: "Same Topic", href: "/faqs/same-topic/" },
  { slug: "same-topic", title: "Same Topic", href: "/blog/same-topic/" },
]);

test("known slugs, titles and unambiguous coverage subjects link directly to their articles", () => {
  for (const topic of ["does-medicare-cover-dental-implants", "Does Medicare Cover Dental Implants", "Dental Implants"]) {
    assert.equal(resolve(topic).href, "/faqs/does-medicare-cover-dental-implants/");
    assert.equal(resolve(topic).label, "Does Medicare Cover Dental Implants?");
  }
  assert.equal(resolve("Medicare Enrollment Guide").href, "/blog/enrollment-guide/");
});
test("reviewed legacy subjects use their verified replacements and unavailable subjects are omitted", () => {
  assert.equal(resolve("What Is Medicare Advantage?").href, "/medicare-part-c/medicare-advantage-plans/");
  assert.equal(resolve("what-is-medicare-advantage").href, "/medicare-part-c/medicare-advantage-plans/");
  assert.equal(resolve("eliquis-cost-with-medicare"), null);
});
test("ambiguous and unknown topics remain encoded searches with a trailing slash", () => {
  assert.equal(resolve("same-topic").href, "/search/?q=same-topic");
  assert.equal(resolve("Dental & hearing?").href, "/search/?q=Dental%20%26%20hearing%3F");
});
test("duplicate records for the same destination do not make an exact match ambiguous", () => {
  const entry = { slug: "example", title: "Example", href: "/faqs/example/" };
  assert.equal(createRelatedArticleResolver([entry, entry])("example").href, entry.href);
});
