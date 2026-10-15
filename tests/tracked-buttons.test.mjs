import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

test('tracked CTA sends one immediate click, stable identity and tagged pageview',()=>{
  const effects=[],requests=[],listeners=new Map();
  const button={tagName:'A',id:'aep-hero-options',className:'orange',textContent:'Changed wording',getAttribute:key=>key==='data-track-button'?'aep-hero-options':null};
  const react={useEffect:fn=>effects.push(fn),useCallback:fn=>fn,useRef:value=>({current:value})};
  const source=fs.readFileSync(new URL('../src/components/HeatmapTracker.tsx',import.meta.url),'utf8');
  const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const exports={};
  vm.runInNewContext(compiled,{exports,require:name=>name==='react'?react:{usePathname:()=>'/'} ,process:{env:{}},
    window:{innerWidth:1200,innerHeight:800,scrollY:0,addEventListener(){},removeEventListener(){}},
    document:{documentElement:{scrollHeight:2000},referrer:'',querySelectorAll:()=>[button],addEventListener:(name,fn)=>listeners.set(name,fn),removeEventListener(){}},
    sessionStorage:{getItem:()=> 'test-session'},fetch:(_url,init)=>{requests.push(JSON.parse(init.body));return Promise.resolve({ok:true});},setTimeout:()=>99,clearTimeout(){}});
  exports.default();const cleanup=effects.map(fn=>fn());
  listeners.get('click')({target:{closest:()=>button},clientX:10,clientY:20});
  assert.equal(requests.length,2);assert.deepEqual(requests[0].pageviews[0].tracked_buttons,['aep-hero-options']);
  assert.equal(requests[1].clicks[0].element_id,'aep-hero-options');assert.equal(requests[1].clicks[0].page_path,'/');
  cleanup.forEach(fn=>fn?.());assert.equal(requests.filter(r=>r.clicks?.length).length,1);
  const hero=fs.readFileSync(new URL('../src/components/HeroSection.tsx',import.meta.url),'utf8');assert.match(hero,/data-track-button="aep-hero-options"/);
  const enrollment=fs.readFileSync(new URL('../src/app/medicare-open-enrollment/PageContent.tsx',import.meta.url),'utf8');
  for(const component of ['HeaderBar','MegaMenu','MobileNav'])assert.match(fs.readFileSync(new URL(`../src/components/${component}.tsx`,import.meta.url),'utf8'),/trackingId="header-get-started"/);
  assert.match(fs.readFileSync(new URL('../src/components/ZipFormModal.tsx',import.meta.url),'utf8'),/data-track-button=\{trackingId\}/);
  assert.equal((fs.readFileSync(new URL('../src/components/AEPScrollingBanner.tsx',import.meta.url),'utf8').match(/data-track-button="aep-scrolling-specialist"/g)||[]).length,1);
  for(const id of ['enrollment-hero-compare','enrollment-hero-agent']){
    assert.ok(enrollment.includes(`data-track-button="${id}"`));
    button.getAttribute=key=>key==='data-track-button'?id:null;
    listeners.get('click')({target:{closest:()=>button},clientX:0,clientY:0});
    assert.equal(requests.at(-1).clicks[0].element_id,id);
  }
});
