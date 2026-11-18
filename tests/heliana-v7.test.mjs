import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {BOARD_ITEMS} from '../communication-data.js';
import {SYMBOL_IDS} from '../pictograms.js';
import {EXCHANGES,nextExchange} from '../duo-practice-data.js';
const source=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');

test('every communication message has a dedicated original vector icon',()=>{
 assert.equal(BOARD_ITEMS.length,15);
 assert.deepEqual(new Set(BOARD_ITEMS.map(x=>x.id)),new Set(SYMBOL_IDS));
 const pictograms=source('pictograms.js');
 assert.match(pictograms,/createElementNS/);
 assert.match(pictograms,/aria-hidden/);
 assert.doesNotMatch(pictograms,/https?:\/\//);
 const board=source('communication.js');
 assert.match(board,/symbolIcon\(item\.id\)/);
 assert.match(board,/node\('span',item\.label\)/);
 assert.match(board,/node\('strong',item\.label\)/);
});
test('duo exercises include refusal, consent, clarification and right to pause',()=>{
 assert.equal(EXCHANGES.length,6);
 assert.equal(new Set(EXCHANGES.map(x=>x.id)).size,6);
 for(const activity of EXCHANGES)assert.ok(activity.a&&activity.b&&activity.check&&activity.title);
 for(const id of ['refusal','help','pause','clarify'])assert.ok(EXCHANGES.some(x=>x.id===id));
 assert.equal(nextExchange(0),1);
 assert.equal(nextExchange(5),5);
});
test('partner page supports role swap, passing and focus',()=>{
 const js=source('duo-practice.js'),html=source('duo-practice.html');
 for(const id of ['swapRoles','passExercise','goPrevious','goNext','duoStatus'])
  assert.match(html,new RegExp('id="'+id+'"'));
 assert.match(js,/\$\('duoTitle'\)\.focus\(\)/);
 assert.match(js,/swapped=!swapped/);
 assert.match(js,/Passer est un choix respecté/);
 assert.match(source('index.html'),/href="\.\/duo-practice\.html"/);
});
test('privacy and offline support remain unchanged',()=>{
 for(const name of ['pictograms.js','duo-practice.js','duo-practice-data.js']){
  const text=source(name);
  for(const prohibited of [/localStorage/,/sessionStorage/,/indexedDB/,/document\.cookie/,/fetch\(/,/XMLHttpRequest/])
   assert.doesNotMatch(text,prohibited,name);
 }
 assert.match(source('communication.css'),/@media print/);
});
