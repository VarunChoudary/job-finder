import {getJobs} from '../../../lib/job-finder/jobs';
export async function GET(){const data=await getJobs();const ttl=data.fallback?Math.max(0,Math.min(300,Math.floor((Date.parse(data.fetchedAt)+86400000-Date.now())/1000))):300;return Response.json(data,{headers:{'Cache-Control':`public, max-age=${ttl}, must-revalidate`}})}
