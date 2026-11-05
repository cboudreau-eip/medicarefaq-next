import { verifyKitToken } from "@/lib/decision-kit/contract";
import { kitLinkSecret, readPrivateKit, sfmcPreviewEnabled } from "@/lib/decision-kit/delivery";
export const runtime='nodejs';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'private, no-store, max-age=0','X-Robots-Tag':'noindex, nofollow, noarchive','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'};
export async function GET(_request:Request,{params}:{params:Promise<{token:string}>}) {
  if(!sfmcPreviewEnabled())return new Response(null,{status:404,headers});
  try {
    const {token}=await params;const id=verifyKitToken(token,kitLinkSecret());
    if(!id)return new Response('This link is invalid or expired. Request a new kit.',{status:410,headers});
    const result=await readPrivateKit(id);
    if(!result || result.statusCode!==200)return new Response(null,{status:404,headers});
    return new Response(result.stream,{headers:{...headers,'Content-Type':'application/pdf','Content-Disposition':'inline; filename="Medicare_Decision_Kit.pdf"'}});
  } catch {return new Response('The kit is temporarily unavailable.',{status:503,headers});}
}
