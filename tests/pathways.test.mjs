import test from 'node:test';import assert from 'node:assert/strict';
import {PATHWAYS,DUO_PROMPTS,DISPLAY_DEFAULTS,validateDisplay,pathwayById,pathwayStep,pathwayLength,stepMaterial,advance,sequenceMatches} from '../pathways-core.js';
test('four complete, independent pathways, each six activities',()=>{
 assert.equal(PATHWAYS.length,4);assert.equal(new Set(PATHWAYS.map(p=>p.id)).size,4);
 for(const p of PATHWAYS){assert.equal(p.steps.length,6,p.id);assert.equal(pathwayLength(p.id),6);for(let i=0;i<6;i++)assert.ok(stepMaterial(pathwayStep(p.id,i)),p.id+':'+i);assert.equal(pathwayStep(p.id,6),null);}
});
test('each route can be restarted or progressed without age or health traits',()=>{
 for(const p of PATHWAYS){let n=0;for(let i=0;i<10;i++)n=advance(n,pathwayLength(p.id));assert.equal(n,6)}
 assert.equal(advance(-1,6),1);assert.equal(advance(6,6),6);
 assert.equal(pathwayById('not-found'),null);
 for(const p of PATHWAYS)assert.ok(!JSON.stringify(p).match(/diagnostic|ageMin|ageMax|trisomie/i));
});
test('display preferences whitelist booleans and font size',()=>{
 assert.deepEqual(validateDisplay(DISPLAY_DEFAULTS),DISPLAY_DEFAULTS);
 assert.deepEqual(validateDisplay({size:'invalid',contrast:1,spacing:true,duo:true,voice:'true'}),{...DISPLAY_DEFAULTS,spacing:true,duo:true});
 assert.equal(validateDisplay({size:'très-grand'}).size,'très-grand');
});
test('duo steps never interpret responses or require identity',()=>{
 assert.ok(DUO_PROMPTS.length>=5);
 for(const item of DUO_PROMPTS){assert.ok(item.first&&item.second&&item.reflection);assert.equal('correct' in item,false);}
});
test('variation changes items; sequence ordering requires all tokens',()=>{
 const step=pathwayStep('words',0);
 assert.notDeepEqual(stepMaterial(step,0),stepMaterial(step,1));
 assert.equal(sequenceMatches(['Je','veux','une pause'],['Je','veux','une pause']),true);
 assert.equal(sequenceMatches(['Je','une pause'],['Je','veux','une pause']),false);
});
