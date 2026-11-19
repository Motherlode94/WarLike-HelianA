import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const source=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');

test('manual pathway reading works even if automatic voice is off',()=>{
 const js=source('pathways.js'),html=source('pathways.html');
 assert.match(js,/function say\(message,\{manual=false\}=\{\}\)/);
 assert.match(js,/if\(!manual&&!preferences\.voice\)return/);
 assert.match(js,/say\(label,\{manual:true\}\)/);
 assert.match(js,/say\(\$\('activityInstruction'\)\.textContent,\{manual:true\}\)/);
 assert.match(html,/id="stopActivityVoice"/);
 assert.match(js,/\$\('stopActivityVoice'\)\.addEventListener/);
});
test('communication board keeps existing buttons and focus when symbols are chosen',()=>{
 const js=source('app.js');
 const begin=js.indexOf('function talkLesson(){');
 const end=js.indexOf('function understandLesson()',begin);
 assert.ok(begin!==-1&&end>begin);
 const block=js.slice(begin+'function talkLesson(){'.length,end);
 assert.match(block,/const refresh=\(\)=>/);
 assert.match(block,/phrase=appendSymbol\(phrase,symbol\.text\)/);
 assert.doesNotMatch(block,/talkLesson\(\)/);
 assert.match(block,/exercise\.replaceChildren\(output,grid,actions\);refresh\(\)/);
});
test('speech can be stopped independently from each learning surface',()=>{
 for(const [html,script,id] of [
  ['index.html','app.js','stopVoice'],
  ['games.html','games.js','stopGameVoice'],
  ['pathways.html','pathways.js','stopActivityVoice']
 ]){
  assert.match(source(html),new RegExp('id="'+id+'"'));
  assert.match(source(script),new RegExp("\\$\\('"+id+"'\\)\\.addEventListener"));
 }
});
test('workshop state and next activity headings remain accessible to keyboard',()=>{
 const home=source('index.html'),app=source('app.js');
 assert.match(home,/data-mode="read" class="selected" aria-pressed="true"/);
 assert.doesNotMatch(home.match(/<nav class="tabs"[\s\S]*?<\/nav>/)?.[0]||"",/aria-current="page"/);
 assert.match(app,/setAttribute\('aria-pressed',String\(active\)\)/);
 for(const [html,id] of [['index.html','lessonTitle'],['pathways.html','activityTitle'],['games.html','gameTitle']])
  assert.match(source(html),new RegExp('id="'+id+'" tabindex="-1"'));
});
