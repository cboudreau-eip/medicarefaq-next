import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const source = fs.readFileSync(
  new URL("../src/app/medicare-open-enrollment/PageContent.tsx", import.meta.url),
  "utf8",
);

test("open enrollment guide does not describe the obsolete Part D coverage gap", () => {
  assert.ok(source.includes("The Part D coverage gap ended in 2025"));
  assert.ok(source.includes("$2,100 in 2026 and $2,400 in 2027"));
  assert.doesNotMatch(source, /donut hole|hit the coverage gap/i);
});

test("open enrollment guide uses current enrollment and ANOC timing", () => {
  assert.ok(source.includes("Your plan must provide this by September 30"));
  assert.ok(source.includes("Coverage starts the month after you sign up"));
  assert.ok(source.includes("January 1 \\u2013 March 31, 2027"));
  assert.doesNotMatch(source, /Coverage begins July 1|All Medicare beneficiaries/);
});
