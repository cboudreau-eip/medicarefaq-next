import { sfmcConfigFromEnv, sfmcConfigFingerprint, diagnoseSfmcAuth } from '@/lib/decision-kit/sfmc';
export const runtime='nodejs';
export const dynamic='force-dynamic';
// Emit the same fingerprint during preview build collection, allowing comparison
// even when deployment authentication prevents invoking this diagnostic route.
if(process.env.VERCEL_ENV==='preview' && process.env.DECISION_KIT_SFMC_PREVIEW==='true') {
  try { console.info('[sfmc build config]',JSON.stringify(sfmcConfigFingerprint(sfmcConfigFromEnv()))); }
  catch { console.error('[sfmc build config] configuration invalid'); }
}
// Available only on the SSO-protected email-test preview; never production.
export async function GET() {
  const headers={'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'};
  if(process.env.VERCEL_ENV!=='preview' || process.env.DECISION_KIT_SFMC_PREVIEW!=='true')return new Response(null,{status:404,headers});
  try {
    const config=sfmcConfigFromEnv();
    const diagnostic={config:sfmcConfigFingerprint(config),auth:await diagnoseSfmcAuth(config)};
    console.info('[sfmc config diagnostic]',JSON.stringify(diagnostic));
    return Response.json({checked:true,authStatus:diagnostic.auth.status},{headers});
  } catch {
    console.error('[sfmc config diagnostic] configuration or network check failed');
    return Response.json({checked:false},{status:502,headers});
  }
}
