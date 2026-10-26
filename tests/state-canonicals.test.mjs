import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';
const states=['new-hampshire','new-mexico','north-dakota','oklahoma','oregon','rhode-island','south-carolina','south-dakota','utah','vermont','west-virginia','wyoming'];
test('all twelve state pages declare their own absolute canonical',()=>{
 for(const state of states){
  const text=readFileSync(`src/app/medicare-supplement-plans/${state}/page.tsx`,'utf8');
  const matches=[...text.matchAll(/canonical:\s*"([^"]+)"/g)];
  assert.equal(matches.length,1,state);
  assert.equal(matches[0][1],`https://www.medicarefaq.com/medicare-supplement-plans/${state}/`);
  assert.doesNotMatch(text,/index:\s*false/);
 }
});
