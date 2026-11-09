import "server-only";
import { put, get } from "@vercel/blob";
import { createKitToken, messageKey, type KitContact } from "./contract";
import { sendKitWebhook } from "./n8n";
// This implementation intentionally cannot switch production delivery on.
export function n8nPreviewEnabled() { return process.env.VERCEL_ENV==='preview' && process.env.DECISION_KIT_N8N_PREVIEW==='true'; }
export function allowedTestRecipient(email:string) {
  const allowed=(process.env.DECISION_KIT_TEST_RECIPIENTS || '').split(',').map(e=>e.trim().toLowerCase()).filter(Boolean);
  return allowed.includes(email);
}
export function kitLinkSecret() {const v=process.env.DECISION_KIT_LINK_SECRET;if(!v || v.length<32)throw new Error('Missing secure link key');return v;}
export async function queueKitPreview(contact:KitContact,pdf:Uint8Array) {
  if(!n8nPreviewEnabled() || !allowedTestRecipient(contact.email)) throw new Error('Preview recipient not enabled');
  const base=new URL(process.env.DECISION_KIT_LINK_ORIGIN || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''));
  if(base.protocol!=='https:' || base.username || base.password || base.search || base.hash || base.pathname!=='/')throw new Error('Invalid PDF link origin');
  const secret=kitLinkSecret(),key=messageKey(contact,secret);
  const token=createKitToken(key,secret);
  // A private-store token is required; never fall back to public Blob access.
  const storageToken=process.env.DECISION_KIT_BLOB_READ_WRITE_TOKEN;
  if(!storageToken)throw new Error('Private PDF store not configured');

  await put(`decision-kit-preview/${key}.pdf`,Buffer.from(pdf),{access:'private',token:storageToken,addRandomSuffix:false,allowOverwrite:true,contentType:'application/pdf'});
  const url=new URL(`/api/decision-kit/pdf/${token}`,base).href;
  await sendKitWebhook({email:contact.email,name:contact.firstName,pdfUrl:url});
  return {messageKey:key,url};
}
export async function readPrivateKit(id:string) {
  const token=process.env.DECISION_KIT_BLOB_READ_WRITE_TOKEN;
  if(!token)throw new Error('Private PDF store not configured');
  return get(`decision-kit-preview/${id}.pdf`,{access:'private',token});
}
