import assert from 'node:assert/strict';
import test from 'node:test';
import { getAepGuideStatus } from '../src/lib/aep-guide-status.ts';

test('AEP notice opens and closes on the guide dates in Eastern time', () => {
  assert.equal(getAepGuideStatus(2026, new Date('2026-10-15T03:59:59Z')), 'before');
  assert.equal(getAepGuideStatus(2026, new Date('2026-10-15T04:00:00Z')), 'open');
  assert.equal(getAepGuideStatus(2026, new Date('2026-12-08T04:59:59Z')), 'open');
  assert.equal(getAepGuideStatus(2026, new Date('2026-12-08T05:00:00Z')), 'closed');
  assert.equal(getAepGuideStatus(2026, new Date('2027-10-20T12:00:00Z')), 'closed');
});
