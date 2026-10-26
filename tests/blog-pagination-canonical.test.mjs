import assert from 'node:assert/strict';
import { test } from 'node:test';
import { effectiveBlogPage, blogPageCount, blogPageHref } from '../src/lib/blog-pagination.ts';
test('canonical page normalization matches listing bounds',()=>{
  for(const [input,want] of [[undefined,1],['1',1],['2',2],['15',15],['0',1],['-1',1],['abc',1],['2junk',1],['2.5',1],[['2','3'],2],[[],1],['999',15],['999999999999999999999',1]]){
    assert.equal(effectiveBlogPage(input,15),want);
    assert.equal(blogPageHref(want),want===1?'/blog/':`/blog/?page=${want}`);
  }
});
test('page count follows unique published inventory and four featured posts',()=>{
  assert.equal(blogPageCount([]),1);
  assert.equal(blogPageCount(Array.from({length:16},(_,i)=>String(i))),1);
  assert.equal(blogPageCount(Array.from({length:17},(_,i)=>String(i))),2);
  assert.equal(blogPageCount(['a','a','b']),1);
});
