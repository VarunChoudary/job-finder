import {sources,normalize} from './core.mjs';
import snapshot from './snapshot.json';
export type Job={id:string;title:string;company:string;country:string;location:string;type:string;description:string;url:string;source:string;updated:string|null;evidence:string};
export type JobsData={jobs:Job[];sources:{name:string;ok:boolean;count:number}[];fetchedAt:string;fallback?:boolean};
let memory:{at:number;data:JobsData}|null=null;let pending:Promise<JobsData>|null=null;
export async function getJobs():Promise<JobsData>{if(memory&&Date.now()-memory.at<1800000&&(!memory.data.fallback||Date.now()-Date.parse(memory.data.fetchedAt)<86400000))return memory.data;if(pending)return pending;
 pending=(async()=>{const results=await Promise.all(sources.map(async(s)=>{try{const r=await fetch(`https://boards-api.greenhouse.io/v1/boards/${s.board}/jobs?content=true`,{signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error('Source unavailable');const d=await r.json() as {jobs:any[]};if(!Array.isArray(d.jobs))throw Error('Invalid feed');const jobs=d.jobs.map(j=>normalize(j,s)).filter(Boolean) as Job[];return {jobs,source:{name:s.name,ok:true,count:jobs.length}}}catch{return {jobs:[] as Job[],source:{name:s.name,ok:false,count:0}}}}));
 const data:JobsData={jobs:results.flatMap(r=>r.jobs),sources:results.map(r=>r.source),fetchedAt:new Date().toISOString()};
 if(!data.sources.some(s=>s.ok)&&Date.now()-Date.parse(snapshot.fetchedAt)<86400000){data.jobs=snapshot.jobs;data.fetchedAt=snapshot.fetchedAt;data.fallback=true}
 data.jobs.sort((a,b)=>(Date.parse(b.updated||'')||0)-(Date.parse(a.updated||'')||0));memory={at:Date.now(),data};return data})().finally(()=>pending=null);return pending;
}
