import { createHmac, timingSafeEqual } from "node:crypto";
export const LINK_TTL_SECONDS = 30 * 24 * 60 * 60;
export interface KitContact { firstName: string; email: string; birthDate: string; emailOptin: boolean; requestId: string; }
export function validateKitContact(body: Record<string, unknown>): KitContact {
  const name = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const { month, day, year } = body;
  if (!name || name.length > 50 || /[\x00-\x1f\x7f]/.test(name)) throw new Error("Invalid first name");
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Invalid email");
  if (![month,day,year].every(n => typeof n === "number" && Number.isInteger(n))) throw new Error("Invalid birthday");
  const m=month as number,d=day as number,y=year as number;
  const date=new Date(Date.UTC(y,m-1,d));
  if (y<1940 || y>1975 || date.getUTCFullYear()!==y || date.getUTCMonth()!==m-1 || date.getUTCDate()!==d) throw new Error("Invalid birthday");
  if (typeof body.emailMarketingConsent !== "boolean") throw new Error("Missing email preference");
  if (typeof body.requestId!=="string" || !/^[0-9a-f-]{36}$/i.test(body.requestId)) throw new Error("Invalid submission ID");
  return { firstName:name,email,birthDate:`${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`,emailOptin:body.emailMarketingConsent,requestId:body.requestId };
}
function requireSecret(secret:string) { if(secret.length<32) throw new Error("Missing secure link key"); }
export function messageKey(contact:KitContact,secret:string) {
  requireSecret(secret);
  return createHmac("sha256",secret).update(JSON.stringify(contact)).digest("hex");
}
export function createKitToken(id:string,secret:string,now=Date.now()) {
  requireSecret(secret);
  if(!/^[a-f0-9]{64}$/.test(id)) throw new Error("Invalid kit ID");
  const payload=`${id}.${Math.floor(now/1000)+LINK_TTL_SECONDS}`;
  return `${payload}.${createHmac("sha256",secret).update(payload).digest("base64url")}`;
}
export function verifyKitToken(token:string,secret:string,now=Date.now()):string|null {
  requireSecret(secret);
  if(token.length>180) return null;
  const [id,expiry,signature,...extra]=token.split('.');
  if(extra.length || !/^[a-f0-9]{64}$/.test(id??'') || !/^\d{10}$/.test(expiry??'') || !/^[A-Za-z0-9_-]{43}$/.test(signature??'')) return null;
  const seconds=Math.floor(now/1000),end=Number(expiry);
  if(end<=seconds || end>seconds+LINK_TTL_SECONDS) return null;
  const actual=Buffer.from(signature);const expected=Buffer.from(createHmac('sha256',secret).update(`${id}.${expiry}`).digest('base64url'));
  return actual.length===expected.length && timingSafeEqual(actual,expected) ? id:null;
}
export function sfmcPayload(contact:KitContact,pdfUrl:string,submittedAt:string,definitionKey:string) {
  return {definitionKey,recipient:{contactKey:contact.email,to:contact.email,attributes:{
    Name:contact.firstName,BirthDate:contact.birthDate,SubmissionDate:submittedAt,EmailOptin:contact.emailOptin,PDF_URL:pdfUrl,"PDF Title":"Turning 65 Medicare Decision Kit",
  }}};
}
