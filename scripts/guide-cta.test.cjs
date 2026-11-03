const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');
const vm = require('node:vm');

// Run the component's actual observer/event handlers with deterministic SDK/DOM adapters.
function harness(hostname = 'www.medicarefaq.com', optedOut = false) {
  let effect, observer, timer, cleanup, captures = [];
  const document = { visibilityState: 'visible', addEventListener() {}, removeEventListener() {} };
  const window = { setInterval(fn) { timer = fn; return 1; } }; window.self = window; window.top = window;
  const sdk = { has_opted_out_capturing: () => optedOut, capture(event, properties) { captures.push({ event, properties }); return {}; } };
  const exports = {};
  const react = { useRef: () => ({ current: {} }), useCallback: fn => fn, useEffect: fn => { effect = fn; } };
  const jsx = (type, props) => ({ type, props });
  const code = ts.transpileModule(fs.readFileSync(require.resolve('../src/components/GuideCta.tsx'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }
  }).outputText;
  vm.runInNewContext(code, { exports, require(name) {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
    if (name === 'next/navigation') return { usePathname: () => '/guide/' };
    if (name === 'posthog-js') return sdk;
    if (name.includes('ZipFormModal')) return () => null;
    throw Error(name);
  }, location: { hostname, search: '' }, window, document, clearInterval() {},
  IntersectionObserver: class { constructor(callback) { observer = callback; } observe() {} disconnect() {} } });
  const tree = exports.default(); cleanup = effect();
  const click = tree.props.children[2].props.onClickCapture;
  return { captures, document, window, tick: () => timer(),
    view: ratio => observer([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]),
    click: (isTrigger = true) => click({ target: { closest: () => isTrigger ? {} : null } }), cleanup };
}
test('only visible half-block impressions count and repeated observer callbacks do not duplicate', () => {
  const h = harness(); h.view(0.49); assert.equal(h.captures.length, 0);
  h.document.visibilityState = 'hidden'; h.view(1); assert.equal(h.captures.length, 0);
  h.document.visibilityState = 'visible'; h.tick(); h.view(1); h.tick();
  assert.deepEqual(h.captures.map(x => x.event), ['guide_cta_view']); h.cleanup();
});
test('clicks count repeats, but other modal interactions are ignored', () => {
  const h = harness(); h.click(false); h.click(); h.click();
  assert.deepEqual(h.captures.map(x => x.event), ['guide_cta_click', 'guide_cta_click']);
  assert.equal(h.captures[0].properties.action, 'open_zip_modal');
  assert.equal(h.captures[0].properties.page_url, 'https://www.medicarefaq.com/guide/'); h.cleanup();
});
test('preview, opted-out, and embedded CMS sessions do not record events', () => {
  for (const h of [harness('localhost'), harness('preview.vercel.app'), harness('www.medicarefaq.com', true)]) {
    h.view(1); h.click(); assert.equal(h.captures.length, 0); h.cleanup();
  }
  const h = harness(); h.window.top = {}; h.view(1); h.click(); assert.equal(h.captures.length, 0); h.cleanup();
});
