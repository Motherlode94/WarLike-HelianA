import test from 'node:test';import assert from 'node:assert/strict';
import {reads,writes,symbols,situations,isReadingCorrect,isWritingCorrect,evaluateSituation,appendSymbol} from '../core.js';
test('reading exercises have unique right answer',()=>{for(const item of reads){assert.equal(item.choices.filter(x=>x===item.word).length,1);assert.ok(isReadingCorrect(item,item.word));assert.equal(isReadingCorrect(item,'WRONG'),false)}});
test('writing accepts uppercase and accent-insensitive answers',()=>{for(const item of writes){assert.ok(isWritingCorrect(item,item.word.toLowerCase()));assert.equal(isWritingCorrect(item,'incorrect'),false)}});
test('communication symbols are intentional and no automatic meaning inference',()=>{assert.ok(symbols.some(x=>x.text.includes('aide')));assert.deepEqual(appendSymbol([],symbols[0].text),[symbols[0].text]);assert.equal(appendSymbol(Array(8).fill('oui'),'non').length,8)});
test('adult practice contains bounded respectful answer choices',()=>{assert.ok(situations.length>=4);for(const item of situations){assert.ok(evaluateSituation(item,item.correct));assert.equal(evaluateSituation(item,-1),false);assert.ok(item.reason)}});
