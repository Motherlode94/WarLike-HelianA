import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {BOARD_CATEGORIES,BOARD_ITEMS,categoryItems,selection,addMessage} from '../communication-data.js';
const source=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');

test('communication cards have unique IDs and valid categories',()=>{
 const categories=new Set(BOARD_CATEGORIES.map(x=>x.id));
 assert.ok(BOARD_ITEMS.length>=12);
 assert.equal(new Set(BOARD_ITEMS.map(x=>x.id)).size,BOARD_ITEMS.length);
 for(const item of BOARD_ITEMS){
  assert.ok(categories.has(item.category),item.id);
  assert.ok(item.label&&item.icon,item.id);
 }
 for(const label of ['Non','Arrête, s’il te plaît','Je veux une pause','J’ai besoin d’aide'])
  assert.ok(BOARD_ITEMS.some(x=>x.label===label),label);
});
test('category filters and printing selections never mutate the source catalog',()=>{
 assert.equal(categoryItems('all').length,BOARD_ITEMS.length);
 assert.ok(categoryItems('needs').every(x=>x.category==='needs'));
 const chosen=selection(BOARD_ITEMS,['pause','no','unknown']);
 assert.deepEqual(chosen.map(x=>x.id),['pause','no']);
 assert.equal(BOARD_ITEMS.length,15);
});
test('message building is bounded and immutable',()=>{
 const original=['Bonjour'];
 const updated=addMessage(original,'Non');
 assert.deepEqual(original,['Bonjour']);
 assert.deepEqual(updated,['Bonjour','Non']);
 let entries=[];
 for(let i=0;i<15;i++)entries=addMessage(entries,'Item '+i);
 assert.equal(entries.length,8);
 assert.deepEqual(addMessage(entries,''),entries);
});
test('print board uses no local persistence, cookies, analytics, personal profiles or backend',()=>{
 const js=source('communication.js'),html=source('communication.html'),css=source('communication.css');
 assert.match(html,/id="printCards"/);
 assert.match(html,/id="messageGrid"/);
 assert.match(css,/@media print/);
 assert.match(js,/window\.print\(\)/);
 assert.match(js,/aria-label/);
 for(const disallowed of [/localStorage/,/sessionStorage/,/indexedDB/,/document\.cookie/,/fetch\(/,/XMLHttpRequest/,/sendBeacon/])
  assert.doesNotMatch(js,disallowed);
 assert.match(source('index.html'),/href="\.\/communication\.html"/);
});
