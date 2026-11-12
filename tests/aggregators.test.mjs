import test from'node:test';import assert from'node:assert/strict';import{normalizeJobicy,deduplicate}from'../lib/job-finder/aggregators.mjs';
const j={id:1,jobTitle:'Support associate',companyName:'Example',jobGeo:'India',jobType:['Part-Time'],jobDescription:'Help customers',url:'https://jobicy.com/jobs/1',pubDate:'2026-11-12'};
test('aggregator preserves attribution without inventing employer country',()=>{const r=normalizeJobicy(j);assert.equal(r.source,'Jobicy');assert.equal(r.country,'Not supplied');assert.equal(r.type,'Part-time')});
test('unknown geography and overseas restrictions are excluded',()=>{for(const jobGeo of ['USA','Europe',''])assert.equal(normalizeJobicy({...j,jobGeo}),null);assert.equal(normalizeJobicy({...j,jobDescription:'Candidates must reside in Canada.'}),null)});
test('unsafe source links and duplicate listings are excluded',()=>{assert.equal(normalizeJobicy({...j,url:'javascript:alert(1)'}),null);const r=normalizeJobicy(j);assert.equal(deduplicate([r,{...r,id:'other'}]).length,1)});

test('Anywhere provider category allows remote jobs unless description restricts them',()=>{assert.ok(normalizeJobicy({...j,jobGeo:'Anywhere'}));assert.equal(normalizeJobicy({...j,jobGeo:'Anywhere',jobDescription:'Candidates must reside in Canada.'}),null)});
