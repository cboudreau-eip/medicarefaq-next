import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import inventory from '../docs/guide-cta-pages.json';
import ArticleGuideCta from '../src/components/ArticleGuideCta';
(globalThis as any).React=React;
test('new CMS registrations render one tracked CTA; unregistered pages stay unchanged',()=>{
  const automatic=inventory.automatic as Record<string,unknown>;
  automatic['/blog/test-new-page/']={variant:'medigap',description:'Compare coverage options.'};
  try{
    const html=renderToStaticMarkup(<ArticleGuideCta path='/blog/test-new-page/'/>);
    assert.equal((html.match(/data-track-button="guide-cta"/g)||[]).length,1);
    assert.match(html,/Compare Medicare Supplement Plans/);
    assert.equal(renderToStaticMarkup(<ArticleGuideCta path='/blog/unregistered/'/>),'');
  }finally{delete automatic['/blog/test-new-page/'];}
});

