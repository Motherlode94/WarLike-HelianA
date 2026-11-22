import test from 'node:test';import assert from 'node:assert/strict';
import {challenges,checkChoice,nextCharacter} from '../coding-lessons.js';
test('three unique accessible introductory activities',()=>{assert.equal(challenges.length,3);assert.equal(new Set(challenges.map(c=>c.id)).size,3);for(const c of challenges){assert.equal(c.choices.length,3);assert.equal(typeof c.instruction,'string');assert.ok(checkChoice(c,c.correct));assert.equal(c.choices.filter((_,i)=>checkChoice(c,i)).length,1);}});
test('movement is bounded on four cells',()=>{let c={x:0,direction:'up'};for(let i=0;i<20;i++)c=nextCharacter(c,'move');assert.equal(c.x,3)});
test('turn and message are deterministic and never execute user code',()=>{const c=nextCharacter({x:0,direction:'up'},'turn');assert.equal(c.direction,'right');assert.equal(nextCharacter(c,'speak').message,'Bonjour !');assert.equal(nextCharacter(c,'eval').x,0)});
