import test from 'node:test';
import assert from 'node:assert/strict';
import {GAMES} from '../games-core.js';
import {EXTRA_GAMES,EXTRA_BANKS,selectExtraQuestion} from '../games-extra.js';
test('eight additional distinct games appear in twenty game catalog',()=>{
 assert.equal(EXTRA_GAMES.length,8);
 assert.equal(GAMES.length,20);
 assert.equal(new Set(GAMES.map(game=>game.id)).size,20);
 for(const game of EXTRA_GAMES)assert.ok(GAMES.some(entry=>entry.id===game.id));
});
test('every question has a single correct answer at each level',()=>{
 for(const game of EXTRA_GAMES){
  assert.ok(EXTRA_BANKS[game.id].length>=3);
  for(let round=0;round<EXTRA_BANKS[game.id].length;round++){
   for(const level of ['découverte','pratique','défi']){
    const question=selectExtraQuestion(game.id,round,level);
    assert.ok(question.prompt.length>10);
    assert.equal(question.choices.length,level==='découverte'?2:3);
    assert.ok(question.choices[question.correct]);
    assert.equal(new Set(question.choices).size,question.choices.length);
   }
  }
 }
});
test('invalid game id or round never produces a question',()=>{
 assert.equal(selectExtraQuestion('__proto__',0,'défi'),null);
 assert.equal(selectExtraQuestion('colors',-1,'défi'),null);
});
