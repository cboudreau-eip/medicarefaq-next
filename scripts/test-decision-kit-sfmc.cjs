const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');const path=require('node:path');
function load(file,mocks={}){const result={};const output=ts.transpileModule(fs.readFileSync(path.join(__dirname,'../',file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;vm.runInNewContext(output,{exports:result,require:n=>n==='server-only'?{}:mocks[n]??require(n),Buffer,URL,Response,AbortSignal,process,console,fetch,setTimeout});return result;}
const c=load('src/lib/decision-kit/contract.ts');
const valid={firstName:' Test ',email:'TEST@example.com',month:2,day:28,year:1962,emailMarketingConsent:false,requestId:'11111111-1111-4111-8111-111111111111'};
const contact=c.validateKitContact(valid);assert.equal(contact.email,'test@example.com');assert.equal(contact.birthDate,'1962-02-28');assert.equal(contact.emailOptin,false);
for(const invalid of [{day:30},{month:13},{year:2020},{firstName:'a'.repeat(51)},{email:'bad'},{emailMarketingConsent:'false'},{requestId:'bad'}])assert.throws(()=>c.validateKitContact({...valid,...invalid}));
const secret='test-secret-not-real-'.repeat(3),now=Date.UTC(2026,10,5),id=c.messageKey(contact,secret),token=c.createKitToken(id,secret,now);
assert.equal(c.messageKey(contact,secret),id);assert.notEqual(c.messageKey({...contact,emailOptin:true},secret),id);
assert.equal(c.verifyKitToken(token,secret,now),id);assert.equal(c.verifyKitToken(token,secret,now+30*86400000-1000),id);assert.equal(c.verifyKitToken(token,secret,now+30*86400000),null);assert.equal(c.verifyKitToken(token+'x',secret,now),null);assert.equal(c.verifyKitToken(token,'wrong-secret'.repeat(4),now),null);assert.doesNotMatch(token,/test@|1962|Test/);
for(const checked of [false,true]){const p=c.sfmcPayload({...contact,emailOptin:checked},'https://example.com/kit',new Date(now).toISOString(),'PDF-Kit-Submissions');assert.equal(p.recipient.attributes.EmailOptin,checked);assert.equal(p.recipient.contactKey,contact.email);assert.equal(p.recipient.attributes.Name,'Test');assert.deepEqual(Object.keys(p.recipient.attributes).sort(),['BirthDate','EmailOptin','Name','PDF Title','PDF_URL','SubmissionDate']);}
const s=load('src/lib/decision-kit/sfmc.ts',{'./contract':c});const config={authUrl:'https://test.auth.marketingcloudapis.com',clientId:'test',clientSecret:'test',accountId:'123',definitionKey:'PDF-Kit-Submissions'};
assert.equal(s.authEndpoint(config.authUrl),config.authUrl+'/v2/token');assert.equal(s.authEndpoint(config.authUrl+'/v2/token'),config.authUrl+'/v2/token');assert.throws(()=>s.authEndpoint('https://evil.example/v2/token'));
(async()=>{
 for(const scenario of [[500,202],[401,202],[429,202]]){
  const calls=[];let sends=0;
  const client=s.createSfmcClient(config,async(url,init)=>{calls.push({url,init});return url.endsWith('/v2/token')?Response.json({access_token:'secret',rest_instance_url:'https://test.rest.marketingcloudapis.com/',expires_in:1200}):Response.json({responses:[{errorcode:0}]},{status:scenario[sends++]});},async()=>{});
  assert.equal((await client.send(contact,'https://example.com/kit','2026-11-05T00:00:00Z',id)).status,'queued');
  const posts=calls.filter(c=>!c.url.endsWith('/v2/token'));assert.equal(posts.length,2);assert.equal(posts[0].url,posts[1].url);assert.equal(posts[0].init.body,posts[1].init.body);
 }
 for(const failure of [{status:400,body:{secret:'must-not-leak'}},{status:202,body:{responses:[{errorcode:100,message:'must-not-leak'}]}}]){
  const client=s.createSfmcClient(config,async(url)=>url.endsWith('/v2/token')?Response.json({access_token:'secret',rest_instance_url:'https://test.rest.marketingcloudapis.com/',expires_in:1200}):Response.json(failure.body,{status:failure.status}),async()=>{});
  await assert.rejects(client.send(contact,'https://example.com/kit','2026-11-05',id),e=>!e.message.includes('must-not-leak'));
 }
 console.log('PASS: strict fields, checked/unchecked mapping, stable retry IDs, link tampering/30-day expiry, 401/429/500 retries and sanitized SFMC failures. No email sent.');
})().catch(e=>{console.error(e);process.exitCode=1;});
