import assert from "node:assert/strict";
import { test } from "node:test";
import { decisionKitConsent, DECISION_KIT_CONSENT_TEXT } from "../src/lib/decision-kit-consent.ts";

test("email marketing requires an explicit boolean opt-in", () => {
  for (const value of [undefined, null, false, "true", "false", 1, {}, []]) {
    assert.equal(decisionKitConsent(value).optedIn, false);
  }
  assert.equal(decisionKitConsent(true).optedIn, true);
});

test("preference evidence uses server-owned disclosure and source", () => {
  const record = decisionKitConsent(true);
  assert.equal(record.text, DECISION_KIT_CONSENT_TEXT);
  assert.equal(record.source, "/tools/decision-kit/");
  assert.equal(record.version, "2026-10-21");
  assert.ok(Number.isFinite(Date.parse(record.recordedAt)));
});
