const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
class Element {
  constructor(anchor) { this.anchor = anchor; }
  closest() { return this.anchor; }
}
const exported = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/oep-download-events.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports: exported, URL, Element });
const { oepPdfEvent, observeOepPdfClicks } = exported;
const page = 'https://www.medicarefaq.com/medicare-advantage-open-enrollment-resources/?email=private@example.com#private';
for (const asset of ['plan-review-checklist', 'plan-comparison-worksheet', 'provider-verification-sheet', 'prescription-workbook', 'plan-review-kit']) {
  const href = `/medicarefaq-ma-oep-${asset}.pdf`;
  assert.equal(oepPdfEvent(href, page, false).action, 'open');
  assert.equal(oepPdfEvent(href + '?download=1', page, false).action, 'download');
  assert.equal(oepPdfEvent(href, page, true).action, 'download');
  assert.doesNotMatch(JSON.stringify(oepPdfEvent(href + '?email=private@example.com', page, false)), /private|@|\?/);
}
assert.equal(oepPdfEvent('/decision-kit-template.pdf', page, false), null);
assert.equal(oepPdfEvent('https://other.example/medicarefaq-ma-oep-plan-review-kit.pdf', page, false), null);
const listeners = new Map(), captures = [];
const doc = { addEventListener: (n, f) => listeners.set(n, f), removeEventListener: (n, f) => { assert.equal(listeners.get(n), f); listeners.delete(n); } };
let source = page;
const anchor = { getAttribute: () => '/medicarefaq-ma-oep-plan-review-kit.pdf', hasAttribute: () => false };
const target = new Element(anchor);
const cleanup = observeOepPdfClicks(doc, () => source, e => captures.push(e));
listeners.get('click')({ type: 'click', button: 0, target });
assert.equal(captures.length, 1);
source = 'https://www.medicarefaq.com/blog/guide/?private=yes';
listeners.get('auxclick')({ type: 'auxclick', button: 1, target });
assert.equal(captures.length, 2);
assert.equal(captures[1].page_path, '/blog/guide/');
listeners.get('auxclick')({ type: 'auxclick', button: 2, target });
listeners.get('click')({ type: 'click', button: 0, target, defaultPrevented: true });
listeners.get('click')({ type: 'click', button: 0, target: {} });
assert.equal(captures.length, 3);
cleanup();
assert.equal(listeners.size, 0);
const cleanupFailing = observeOepPdfClicks(doc, () => source, () => { throw Error('Analytics blocked'); });
assert.doesNotThrow(() => listeners.get('click')({ type: 'click', button: 0, target }));
cleanupFailing();
console.log('PASS: five PDFs, open/download actions, nested clicks, middle clicks, source navigation, URL privacy, unrelated links excluded, listener cleanup, blocked analytics.');
