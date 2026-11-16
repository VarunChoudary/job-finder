'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import type {JobsData} from '../../lib/job-finder/jobs';
/** Own request lifetime separately from search, resume and saved-job UI state. */
export function useJobFeed(){
 const [data,setData]=useState<JobsData|null>(null);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const request=useRef<AbortController|null>(null);
 const load=useCallback(async()=>{
  request.current?.abort();
  const controller=new AbortController();request.current=controller;
  const timeout=setTimeout(()=>controller.abort('timeout'),45000);
  setLoading(true);setError('');
  try{
   const response=await fetch('/api/jobs',{signal:controller.signal});
   if(!response.ok)throw Error('Job sources could not be reached. Please try again.');
   const result=await response.json() as JobsData;
   if(!Array.isArray(result.jobs)||!Array.isArray(result.sources)||typeof result.fetchedAt!=='string')throw Error('Unexpected job response. Please refresh.');
   if(request.current!==controller)return;
   setData(result);
   if(!result.jobs.length&&result.sources.every(source=>!source.ok))setError('All job sources are temporarily unavailable. Please retry shortly.');
  }catch(e){
   if(request.current!==controller)return;
   if(controller.signal.aborted&&controller.signal.reason!=='timeout')return;
   setError(controller.signal.reason==='timeout'?'The job request timed out. Please try again.':e instanceof Error?e.message:'Job sources could not be reached. Please try again.');
  }finally{clearTimeout(timeout);if(request.current===controller)setLoading(false)}
 },[]);
 useEffect(()=>{void load();return()=>{request.current?.abort();request.current=null}},[load]);
 return {data,loading,error,load};
}
