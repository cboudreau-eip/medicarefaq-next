import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import Additions from '../src/components/ArticleContentAdditions';
import type {ArticleContentAddition} from '../src/lib/article-content-additions';
const item:ArticleContentAddition={id:'test-addition',after:'test-anchor',heading:'New comparison',blocks:[{type:'paragraph',content:'Read [Medicare](https://www.medicare.gov/).'},{type:'list',ordered:true,items:['First','Second']},{type:'list',ordered:false,items:['One','Two']},{type:'table',headers:['Choice','Detail'],rows:[['A','Example']]}]};
test('addition renderer supports accessible headings, real lists, tables and inline links only at its anchor',()=>{
 assert.equal(renderToStaticMarkup(<Additions after="test-anchor"/>),'');
 assert.equal(renderToStaticMarkup(<Additions items={[item]} after="other"/>),'');
 const html=renderToStaticMarkup(<Additions items={[item]} after="test-anchor"/>);
 for(const value of ['aria-labelledby="test-addition"','<ol ','<ul ','<table ','scope="col"','href="https://www.medicare.gov/"'])assert.ok(html.includes(value),value);
 assert.ok(!html.includes('data-track'));assert.ok(!html.includes('<button'));
 const escaped=renderToStaticMarkup(<Additions items={[{...item,heading:'<script>bad()</script>'}]} after="test-anchor"/>);assert.ok(!escaped.includes('<script>'));
 assert.ok(renderToStaticMarkup(<Additions items={[item]}/>).includes('New comparison'),'legacy additions survive a later conversion to rich sections');
});
