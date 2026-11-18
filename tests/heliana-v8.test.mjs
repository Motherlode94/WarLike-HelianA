import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');

test('facilitator guide contains exactly six consent-first printable steps',()=>{
 const html=source('facilitator.html');
 assert.equal((html.match(/class="guide-card"/g)||[]).length,6);
 assert.equal((html.match(/type="checkbox"/g)||[]).length,6);
 assert.match(html,/respecter une réponse négative/i);
 assert.match(html,/ne pas interpréter automatiquement/i);
 assert.match(html,/les refus et pauses restent possibles/i);
 assert.match(html,/id="printGuide"/);
 assert.match(source('facilitator.css'),/@media print/);
});
test('guide checklist is ephemeral, with no user accounts or tracking',()=>{
 const js=source('facilitator.js');
 assert.match(js,/window\.print\(\)/);
 assert.match(js,/for\(const input of boxes\)input\.checked=false/);
 for(const text of [js,source('facilitator.html')]){
  for(const forbidden of [/localStorage/,/sessionStorage/,/indexedDB/,/document\.cookie/,/fetch\(/,/XMLHttpRequest/,/sendBeacon/]) assert.doesNotMatch(text,forbidden);
 }
});
test('communication voice speed and high contrast are explicitly user controlled',()=>{
 const html=source('communication.html'),js=source('communication.js');
 assert.match(html,/id="highContrast"/);
 assert.match(html,/id="speechRate"/);
 assert.match(js,/body\.classList\.toggle\('contrast'/);
 assert.match(js,/Number\(\$\('speechRate'\)\.value\)/);
 assert.match(js,/speechSynthesis\.cancel\(\)/);
});
test('both landing and communication page link the facilitator guide',()=>{
 assert.match(source('index.html'),/href="\.\/facilitator\.html"/);
 assert.match(source('communication.html'),/href="\.\/facilitator\.html"/);
});
