const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

// Exercise the real renderer without requiring a Next.js server.
const filename = path.join(__dirname, '../src/components/ArticleInline.tsx');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
}).outputText;
const exportsObject = {};
vm.runInNewContext(compiled, {
  exports: exportsObject,
  require: name => name === 'next/link'
    ? (props => React.createElement('a', props))
    : require(name),
});
const render = text => renderToStaticMarkup(React.createElement('div', null, exportsObject.renderInline(text)));

assert.match(render('[Annual Enrollment Period](/faqs/medicare-annual-enrollment-period/)'), /href="\/faqs\/medicare-annual-enrollment-period\/"/);
assert.match(render('**Read [the guide](/guide/)**'), /<strong>Read <a .*the guide<\/a><\/strong>/);
assert.match(render('***Important*** and *optional*'), /<strong><em>Important<\/em><\/strong> and <em>optional<\/em>/);
assert.match(render('[**conversion factor**](https://www.cms.gov/)'), /<a [^>]+><strong>conversion factor<\/strong><\/a>/);
assert.match(render('<a href="https://www.cms.gov/" onclick="alert(1)">CMS</a>'), /href="https:\/\/www.cms.gov\/"/);
assert.doesNotMatch(render('<a href="https://www.cms.gov/" onclick="alert(1)">CMS</a>'), /onclick/);
assert.match(render('<strong>Cost:</strong> [Medicare](https://www.medicare.gov/)'), /<strong>Cost:<\/strong> <a /);
assert.match(render('<a href="/search/?a=1&amp;b=2">Search</a>'), /href="\/search\/\?a=1&amp;b=2"/);
for (const href of ['javascript:alert', 'data:text/html,test', '//evil.example']) {
  assert.doesNotMatch(render(`[Unsafe](${href})`), /<a /);
}
assert.doesNotMatch(render('<img src=x onerror="alert(1)"><script>alert(1)</script>'), /<(img|script)\b/);
assert.match(render('[No destination]()'), /<strong>No destination<\/strong>/);
assert.match(render('Plain text & punctuation.'), /Plain text &amp; punctuation\./);
assert.match(render('First<br /><br>**Second**'), /First<br\/><br\/><strong>Second<\/strong>/);
assert.match(render('<strong>First<br/>Second</strong>'), /<strong>First<br\/>Second<\/strong>/);
console.log('Article inline rendering and unsafe-link regression checks passed.');
