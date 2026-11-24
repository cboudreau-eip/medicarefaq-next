import React from 'react';
import {renderInline} from './ArticleInline';
import type {ArticleContentAddition} from '../lib/article-content-additions';

export default function ArticleContentAdditions({items,after}:{items?:ArticleContentAddition[];after?:string}){
 return <>{items?.filter(item=>after===undefined||item.after===after).map(item=><section key={item.id} aria-labelledby={item.id} className="my-8 space-y-4">
  <h2 id={item.id} className="text-xl md:text-2xl font-bold text-[#1B2A4A]">{item.heading}</h2>
  {item.blocks.map((block,i)=>{
   if(block.type==='paragraph')return <p key={i} className="text-[#4B5563] leading-relaxed">{renderInline(block.content)}</p>;
   if(block.type==='list'){const Tag=block.ordered?'ol':'ul';return <Tag key={i} className={(block.ordered?'list-decimal':'list-disc')+' pl-6 space-y-2 text-[#4B5563]'}>{block.items.map((text,j)=><li key={j}>{renderInline(text)}</li>)}</Tag>;}
   return <div key={i} className="overflow-x-auto"><table className="w-full border-collapse text-left text-[#4B5563]"><thead><tr>{block.headers.map((h,j)=><th key={j} scope="col" className="border border-slate-200 bg-slate-50 p-3">{renderInline(h)}</th>)}</tr></thead><tbody>{block.rows.map((row,j)=><tr key={j}>{row.map((cell,k)=><td key={k} className="border border-slate-200 p-3">{renderInline(cell)}</td>)}</tr>)}</tbody></table></div>;
  })}
 </section>)}</>;
}
