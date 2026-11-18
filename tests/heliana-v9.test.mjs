import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {BOARD_CATEGORIES,BOARD_ITEMS,addMessage} from '../communication-data.js';
const source=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
test('categories and user composition coexist',()=>{
 assert.equal(BOARD_CATEGORIES.length,4);assert.equal(BOARD_ITEMS.length,15);
 let list=[];for(let i=0;i<10;i++)list=addMessage(list,'Phrase '+i);
 assert.equal(list.length,8);assert.equal(list.at(-1),'Phrase 9');
});
test('custom message is bounded, screen-reader visible and never persisted',()=>{
 const html=source('communication.html'),js=source('communication.js');
 assert.match(html,/id="customPhraseForm"/);assert.match(html,/maxlength="120"/);
 assert.match(html,/id="phraseFeedback" role="status"/);
 assert.match(js,/messages=addMessage\(messages,phrase\)/);
 assert.match(js,/input\.focus\(\)/);
 for(const t of [html,js])for(const rx of [/localStorage/,/sessionStorage/,/indexedDB/,/document\.cookie/,/fetch\(/])assert.doesNotMatch(t,rx);
});
