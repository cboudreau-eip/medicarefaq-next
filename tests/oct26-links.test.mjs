import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BROKEN_LINK_REPAIRS, repairInternalHref } from '../src/lib/broken-link-repairs.ts';

test('October 26 mappings resolve directly and preserve query and fragment', () => {
  const repairs = Object.entries(BROKEN_LINK_REPAIRS).slice(0,16);
  assert.equal(repairs.length,16);
  assert.equal(repairs.filter(([,v])=>v===null).length,3);
  for(const [old,destination] of repairs){
    assert.equal(repairInternalHref(old+'/'),destination);
    if(destination){
      assert.equal(repairInternalHref(destination),destination);
      assert.equal(repairInternalHref('https://www.medicarefaq.com'+old+'/?a=1#test'),'https://www.medicarefaq.com'+destination+'?a=1#test');
      assert.notEqual(destination,'/');
    }
  }
});
test('authoritative content no longer promises nonexistent guides or mismatched doctor links',()=>{
  const blog=readFileSync('src/lib/blog-articles-data.ts','utf8');
  const coverage=readFileSync('src/lib/coverage-data.ts','utf8');
  assert.ok(!blog.includes('[doctor visit](/faqs/does-medicare-cover-physical-therapy/)'));
  assert.ok(!blog.includes('/faqs/medigap-supplement-open-enrollment/'));
  assert.ok(!coverage.includes('/blog/medicare-and-self-employment-tax-planning'));
  assert.ok(!coverage.includes('[foot ulcers](/faqs/does-medicare-cover-wound-care)'));
});
