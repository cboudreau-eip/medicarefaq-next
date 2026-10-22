import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/app/api/decision-kit/route.ts", import.meta.url), "utf8");
const notification = source.slice(source.indexOf("async function sendDecisionKitNotification("));
const code = ts.transpileModule(notification, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;

for (const optedIn of [true, false]) {
  test(`birthday and email preference included when checked=${optedIn}`, async () => {
    let message;
    const context = vm.createContext({
      process: { env: { RESEND_LEAD_GEN_API_KEY: "mock-only" } },
      console,
      fetch: async (_url, options) => {
        message = JSON.parse(options.body);
        return { ok: true };
      },
    });
    vm.runInContext(code, context);
    await context.sendDecisionKitNotification({
      firstName: "Test <Person>", email: "test@example.com",
      dob: "May 15, 1962", birthday65: "May 15, 2027",
      consent: { optedIn, recordedAt: "2026-10-22T12:00:00.000Z", source: "/tools/decision-kit/", version: "test", method: "Prechecked checkbox", text: "Test disclosure" },
    });
    assert.ok(message.subject.includes("Test <Person> (65 on May 15, 2027)"));
    assert.ok(message.subject.includes(optedIn ? "Prechecked email preference" : "Email preference unchecked"));
    assert.ok(message.html.includes("May 15, 1962"));
    assert.ok(message.html.includes("May 15, 2027"));
    assert.ok(message.html.includes("Test &lt;Person&gt;"));
    assert.ok(message.html.includes(optedIn ? "CHECKED — preselected" : "UNCHECKED — do not add"));
  });
}

test("API provides both birthday fields to the notification", () => {
  const payload = source.slice(source.indexOf("sendDecisionKitNotification({"), source.indexOf("}).catch", source.indexOf("sendDecisionKitNotification({")));
  assert.ok(payload.includes("dob: formatDate(dob)"));
  assert.ok(payload.includes("birthday65: formatDate(dates.birthday65)"));
});
