import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(code, { exports, require: name => name.startsWith('.')
    ? load(path.resolve(path.dirname(file), name + '.ts')) : require(name) });
  return exports;
}
const articles = JSON.parse(JSON.stringify(load('src/lib/blog-articles-data.ts').blogArticles));
const oldSlug = 'medicare-2027-key-changes-in-open-enrollment-you-need-to-kno';
const slug = oldSlug + 'w';
const article = articles.find(a => a.slug === slug);

test('the public article catalog contains one complete enrollment guide with a self canonical', () => {
  assert.ok(article && !article.draft);
  assert.equal(articles.filter(a => a.slug === oldSlug).length, 0);
  assert.equal(articles.filter(a => a.title === article.title && !a.draft).length, 1);
  assert.equal(article.seo.canonical, `https://www.medicarefaq.com/blog/${slug}/`);
  for (const entry of article.tableOfContents) assert.ok(article.sections.some(s => s.id === entry.id));
  const body = JSON.stringify(article.sections);
  assert.match(body, /Medigap, or Medicare Supplement/);
  assert.match(body, /SHIP \(State Health Insurance Assistance Program\)/);
  assert.equal(article.sections.find(s => s.type === 'faq').faqs.length, 7);
  assert.match(body, /\$9,850/);
  assert.match(body, /\$2,400/);
  assert.match(body, /\$700/);
  assert.doesNotMatch(body, /\$9,250|\$34\.50|\$38\.99/);
});

test('legacy links and the saved CMS draft point to the retained guide', () => {
  const { repairInternalHref } = load('src/lib/broken-link-repairs.ts');
  assert.equal(repairInternalHref(`/blog/${oldSlug}/?source=old#faq`), `/blog/${slug}/?source=old#faq`);
  const draft = JSON.parse(fs.readFileSync(`drafts/pipeline-${oldSlug}.json`, 'utf8'));
  assert.equal(draft.slug, slug);
  assert.deepEqual(draft.sections, article.sections);
  assert.deepEqual(draft.keyTakeaways, article.keyTakeaways);
  assert.deepEqual(draft.relatedSlugs, article.relatedSlugs);
});

test('site search returns one guide and never the retired edition', () => {
  const { searchContent } = load('src/lib/search-index.ts');
  const results = searchContent(article.title);
  assert.equal(results.filter(r => r.title === article.title).length, 1);
  assert.ok(results.some(r => r.href.replace(/\/$/, '') === `/blog/${slug}`));
  assert.ok(!results.some(r => r.href.replace(/\/$/, '') === `/blog/${oldSlug}`));
});
