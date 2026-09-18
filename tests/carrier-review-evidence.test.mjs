import assert from "node:assert/strict";
import test from "node:test";
import { CARRIER_DATA, getCarrierBySlug } from "../src/lib/medigap-carrier-data.ts";

test("evidence sections are enabled only for the two reviewed carriers", () => {
  const reviewed = CARRIER_DATA.filter(c => c.review);
  assert.deepEqual(reviewed.map(c => c.slug).sort(), ["bankers-fidelity-medigap-plans", "united-american-medigap-plans"]);
  for (const carrier of reviewed) {
    assert.equal(carrier.pricingTier, "quote");
    assert.equal(carrier.review.date, "2026-09-18");
    assert.equal(carrier.review.faqs.length, 3);
    assert.equal(carrier.review.facts.length, 3);
    for (const fact of carrier.review.facts) assert.equal(new URL(fact.source).protocol, "https:");
    for (const slug of carrier.relatedCarriers) assert.ok(getCarrierBySlug(slug));
  }
});

test("Bankers Fidelity review preserves the dated negative-review context", () => {
  const carrier = getCarrierBySlug("bankers-fidelity-medigap-plans");
  assert.match(carrier.amBestRating, /under review/);
  assert.match(carrier.review.facts[1].text, /negative implications/);
  assert.match(carrier.review.facts[1].text, /not itself a downgrade/);
  assert.match(carrier.review.facts[1].source, /275148/);
});

test("United American distinguishes issuer identity and source rating date", () => {
  const carrier = getCarrierBySlug("united-american-medigap-plans");
  assert.match(carrier.overview, /not UnitedHealthcare/);
  assert.match(carrier.review.ratingNote, /November 2025/);
  assert.equal(carrier.considerations.some(t => t.includes("Rate increases have been higher than average")), false);
});
