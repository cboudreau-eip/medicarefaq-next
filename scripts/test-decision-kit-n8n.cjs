const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, env = {}, fetch) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(js, { exports, require: n => n === 'server-only' ? {} : require(n), process: { env }, fetch, Buffer, URL, AbortSignal });
  return exports;
}
(async () => {
  const c = load('src/lib/decision-kit/contract.ts');
  const secret = 'test-only-key-with-at-least-32-characters';
  const now = Date.now(), id = 'a'.repeat(64), token = c.createKitToken(id, secret, now);
  assert.equal(c.verifyKitToken(token, secret, now), id);
  assert.equal(c.verifyKitToken(token, secret, now + 30 * 86400000), null);
  assert.equal(c.verifyKitToken(token + 'x', secret, now), null);
  const env = { N8N_DECISION_KIT_URL: 'https://n8nprod.teameip.com/webhook/test', N8N_DECISION_KIT_SECRET: 'test-secret' };
  const payload = { email: 'test@example.com', name: 'Test', pdfUrl: 'https://example.com/kit' };
  for (const status of [200, 202, 400, 401, 500]) {
    let calls = 0;
    const n = load('src/lib/decision-kit/n8n.ts', env, async (url, init) => {
      calls++;
      assert.equal(init.method, 'POST');
      assert.equal(init.headers['X-Decision-Kit-Secret'], 'test-secret');
      assert.deepEqual(JSON.parse(init.body), payload);
      assert.equal(init.redirect, 'error');
      return new Response('private error details', { status });
    });
    if (status < 300) await n.sendKitWebhook(payload);
    else await assert.rejects(n.sendKitWebhook(payload), { message: `n8n request failed (${status})` });
    assert.equal(calls, 1);
  }
  const n = load('src/lib/decision-kit/n8n.ts', {}, () => { throw Error('Should not send'); });
  await assert.rejects(n.sendKitWebhook(payload), /configuration/);
  console.log('PASS: exact three-field payload, authentication, single POST, safe failure messages, missing config, tampered/expired links. No email sent.');
})().catch(e => { console.error(e); process.exitCode = 1; });
