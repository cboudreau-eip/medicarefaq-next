import "server-only";
import { createHash } from "node:crypto";
import { sfmcPayload, type KitContact } from "./contract";
type Config={authUrl:string;clientId:string;clientSecret:string;accountId:string;definitionKey:string};
export function sfmcConfigFromEnv(): Config {
  const env=(key:string)=>{const v=process.env[key];if(!v)throw new Error(`Missing ${key}`);return v;};
  return {authUrl:process.env.SFMC_AUTH_BASE_URI || env('SFMC_AUTH_URL'),clientId:env('SFMC_CLIENT_ID'),clientSecret:env('SFMC_CLIENT_SECRET'),accountId:env('SFMC_ACCOUNT_ID'),definitionKey:env('SFMC_SEND_DEFINITION_KEY')};
}
export function sfmcConfigFingerprint(config:Config) {
  const fingerprint=(value:string)=>({length:value.length,sha256:createHash('sha256').update(value).digest('hex').slice(0,12),edgeWhitespace:value!==value.trim(),containsNewline:/[\r\n]/.test(value),edgeQuote:/^["']|["']$/.test(value)});
  return {authHost:new URL(authEndpoint(config.authUrl)).hostname,accountId:config.accountId,clientId:fingerprint(config.clientId),clientSecret:fingerprint(config.clientSecret),authUrl:fingerprint(config.authUrl),definitionKey:fingerprint(config.definitionKey)};
}
export async function safeAuthError(response:Response,config:Config) {
  const body=await response.json().catch(()=>null);
  const clean=(value:unknown)=>{
    if(typeof value!=='string')return undefined;
    let result=value;
    for(const secret of [config.clientId,config.clientSecret])if(secret)result=result.split(secret).join('[redacted]');
    return result.replace(/Bearer\s+\S+/gi,'Bearer [redacted]').replace(/[\r\n]/g,' ').slice(0,1000);
  };
  return {status:response.status,error:clean(body?.error),error_description:clean(body?.error_description),format:body?'json':'non-json body omitted'};
}
/** Authentication only: never queues an email or returns an access token. */
export async function diagnoseSfmcAuth(config:Config) {
  const r=await fetch(authEndpoint(config.authUrl),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({grant_type:'client_credentials',client_id:config.clientId,client_secret:config.clientSecret,account_id:config.accountId}),cache:'no-store',redirect:'error',signal:AbortSignal.timeout(10000)});
  if(!r.ok)return safeAuthError(r,config);
  await r.body?.cancel();
  return {status:r.status};
}
export function authEndpoint(raw:string) {
  const u=new URL(raw);
  if(u.protocol!=="https:" || !/^[a-z0-9-]+\.auth\.marketingcloudapis\.com$/.test(u.hostname) || u.port || u.username || u.password || u.search || u.hash || !['/','/v2/token'].includes(u.pathname)) throw new Error('Invalid SFMC auth configuration');
  u.pathname='/v2/token';return u.href;
}
export function createSfmcClient(config:Config,fetcher:typeof fetch=fetch,sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms))) {
  let cached:{accessToken:string;restBase:string;expiresAt:number}|null=null;
  async function token() {
    if(cached && Date.now()<cached.expiresAt) return cached;
    const r=await fetcher(authEndpoint(config.authUrl),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({grant_type:'client_credentials',client_id:config.clientId,client_secret:config.clientSecret,account_id:config.accountId}),cache:'no-store',redirect:'error',signal:AbortSignal.timeout(10000)});
    if(!r.ok) {
      console.error('[sfmc auth]',await safeAuthError(r,config));
      throw new Error(`SFMC authentication failed (${r.status})`);
    }
    const j=await r.json(); const u=new URL(j.rest_instance_url);
    if(u.protocol!=='https:' || !/^[a-z0-9-]+\.rest\.marketingcloudapis\.com$/.test(u.hostname) || u.port || u.username || u.password || u.search || u.hash || u.pathname!=='/' || typeof j.access_token!=='string' || !Number.isFinite(j.expires_in) || j.expires_in<=60) throw new Error('Invalid SFMC token response');
    cached={accessToken:j.access_token,restBase:u.origin,expiresAt:Date.now()+(j.expires_in-60)*1000};return cached;
  }
  return {async send(contact:KitContact,pdfUrl:string,submittedAt:string,key:string) {
    let refreshed=false;
    for(let attempt=0;attempt<3;attempt++) {
      const t=await token();let response:Response;
      try {response=await fetcher(`${t.restBase}/messaging/v1/email/messages/${encodeURIComponent(key)}`,{method:'POST',headers:{Authorization:`Bearer ${t.accessToken}`,'Content-Type':'application/json'},body:JSON.stringify(sfmcPayload(contact,pdfUrl,submittedAt,config.definitionKey)),cache:'no-store',redirect:'error',signal:AbortSignal.timeout(10000)});}
      catch { if(attempt<2){await sleep(500*2**attempt);continue;} throw new Error('SFMC request unavailable'); }
      if(response.status===401 && !refreshed){cached=null;refreshed=true;continue;}
      if((response.status===429 || response.status>=500) && attempt<2){await sleep(500*2**attempt);continue;}
      const result=await response.json().catch(()=>null);
      const codes=[result?.errorcode,...(Array.isArray(result?.responses)?result.responses.map((r:{errorcode?:unknown})=>r.errorcode):[])];
      if(response.status!==202 || codes.some(c=>c!==undefined && c!==null && Number(c)!==0)) throw new Error(`SFMC queue request failed (${response.status})`);
      return {messageKey:key,status:'queued' as const};
    }
    throw new Error('SFMC request unavailable');
  }};
}
let client:ReturnType<typeof createSfmcClient>|undefined;
export function getSfmcClient() {
  if(!client) {
    client=createSfmcClient(sfmcConfigFromEnv());
  }
  return client;
}
