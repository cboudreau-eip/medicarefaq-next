import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const ts = require('typescript');
function load(file, imports = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(code, { exports: module.exports, require: name => {
    assert.ok(Object.hasOwn(imports, name), `Unexpected import ${name}`);
    return imports[name];
  }});
  return module.exports;
}
const repairs = load('../src/lib/broken-link-repairs.ts');
const config = load('../next.config.ts', {
  './src/lib/broken-link-repairs': repairs,
  './src/lib/faq-categories': load('../src/lib/faq-categories.ts'),
  './scripts/generate-sitemap-dates.mjs': { generateSitemapDates() {} },
}).default;

test('legacy redirect destinations skip other redirects and use the final trailing slash', async () => {
  const rules = await config.redirects();
  const unconditional = rules.filter(rule => !rule.has && !rule.missing);
  const sources = new Set(unconditional.map(rule => rule.source.replace(/\/$/, '')));
  for (const rule of rules) {
    assert.ok(rule.destination.endsWith('/'), `${rule.source}: missing trailing slash`);
    assert.ok(!sources.has(rule.destination.replace(/\/$/, '')), `${rule.source}: redirects through ${rule.destination}`);
    assert.equal(rule.permanent, true);
  }
  assert.equal(unconditional.find(rule => rule.source === '/faqs/plan-g').destination, '/medicare-supplement-plans/plan-g/');
  assert.equal(unconditional.find(rule => rule.source === '/blog/medicare-supplement-plan-g-vs-plan-f').destination, '/medicare-supplement-plans/compare/');
});

test('related links bypass legacy article aliases while preserving query strings and fragments', () => {
  for (const [old, target] of [
    ['/faqs/plan-g', '/medicare-supplement-plans/plan-g/'],
    ['/faqs/protect-yourself-from-medicare-penalties-key-tips-and-deadlines', '/blog/medicare-penalty-avoidance-strategies/'],
    ['/faqs/what-is-medicare-part-b', '/original-medicare/medicare-parts/medicare-part-b/'],
  ]) {
    assert.equal(repairs.repairInternalHref(old + '/?source=related#details'), target + '?source=related#details');
    assert.equal(repairs.repairInternalHref('https://www.medicarefaq.com' + old + '#details'), 'https://www.medicarefaq.com' + target + '#details');
    assert.equal(repairs.repairInternalHref(target), target);
  }
  assert.equal(repairs.repairInternalHref('https://example.com/faqs/plan-g/'), 'https://example.com/faqs/plan-g/');
  assert.equal(repairs.repairInternalHref('/an-unreviewed-page/'), '/an-unreviewed-page/');
});
