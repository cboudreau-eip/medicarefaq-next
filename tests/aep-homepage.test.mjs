import assert from "node:assert/strict";
import { test } from "node:test";
import { getAEPHomepageStage } from "../src/lib/aep-homepage.ts";

test("the AEP homepage starts and ends on Eastern-time dates", () => {
  assert.equal(getAEPHomepageStage(new Date("2026-10-15T03:59:59Z")), null);
  assert.equal(getAEPHomepageStage(new Date("2026-10-15T04:00:00Z")), "oct15");
  assert.equal(getAEPHomepageStage(new Date("2026-11-30T23:00:00Z")), "oct15");
  assert.equal(getAEPHomepageStage(new Date("2026-12-01T05:00:00Z")), "dec1");
  assert.equal(getAEPHomepageStage(new Date("2026-12-06T05:00:00Z")), "dec6");
  assert.equal(getAEPHomepageStage(new Date("2026-12-07T05:00:00Z")), "dec7");
  assert.equal(getAEPHomepageStage(new Date("2026-12-08T04:59:59Z")), "dec7");
  assert.equal(getAEPHomepageStage(new Date("2026-12-08T05:00:00Z")), null);
  assert.equal(getAEPHomepageStage(new Date("2027-10-15T12:00:00Z")), null);
});
