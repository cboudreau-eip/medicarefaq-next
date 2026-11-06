// Auth-only diagnostic. Prints fingerprints and allowlisted errors, never tokens.
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const ts=require('typescript');
if(process.argv[2])Object.assign(process.env,require('node:util').parseEnv(fs.readFileSync(process.argv[2],'utf8')));
const result={};
const output=ts.transpileModule(fs.readFileSync(path.join(__dirname,'../src/lib/decision-kit/sfmc.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
vm.runInNewContext(output,{exports:result,require:n=>n==='server-only'||n==='./contract'?{}:require(n),URL,AbortSignal,process,console,fetch,setTimeout});
(async()=>{
  const config=result.sfmcConfigFromEnv();
  console.log(JSON.stringify({config:result.sfmcConfigFingerprint(config),auth:await result.diagnoseSfmcAuth(config)},null,2));
})().catch(()=>{console.error('SFMC configuration or network check failed; no credentials printed.');process.exitCode=1;});
