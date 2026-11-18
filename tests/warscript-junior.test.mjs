import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JUNIOR_LEVELS,JUNIOR_COMMANDS,runProgram,toWarScript} from '../warscript-junior-core.js';
const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
test('three beginner lessons and visual commands are available',()=>{
 assert.equal(JUNIOR_LEVELS.length,3);assert.deepEqual(JUNIOR_COMMANDS.map(c=>c.id),['forward','left','right']);
 for(const level of JUNIOR_LEVELS){assert.ok(level.max>=6);assert.equal(level.start.length,3);assert.equal(level.goal.length,2)}
});
test('visual simulator moves, turns, prevents leaving the 4x4 grid',()=>{
 const first=JUNIOR_LEVELS[0];
 assert.equal(runProgram(['forward','forward'],first).success,true);
 assert.equal(runProgram(['forward','left','forward'],JUNIOR_LEVELS[1]).success,true);
 assert.equal(runProgram(['forward','forward','forward','forward'],first).blocked,true);
 assert.equal(runProgram(['right','left'],first).direction,0);
});
test('WarScript example uses the documented Start, Move, Rotate and Log instructions',()=>{
 const code=toWarScript(['forward','left','forward','right']);
 assert.match(code,/Start\(\) \{/);assert.match(code,/Log\("Bonjour, je programme !"\)/);
 assert.match(code,/Move\(1, 0, 0\)/);assert.match(code,/Move\(0, 1, 0\)/);
 assert.match(code,/Rotate\(90\)/);assert.match(code,/Rotate\(-90\)/);
 assert.doesNotMatch(code,/eval|new Function|document\./);
});
test('accessible controls and optional code display without accounts',()=>{
 const html=read('warscript-junior.html'),js=read('warscript-junior.js');
 for(const id of ['cmdForward','cmdLeft','cmdRight','runProgram','resetProgram','juniorLevel','showCode','juniorFeedback'])
  assert.match(html,new RegExp('id="'+id+'"'));
 assert.match(html,/role="status" aria-live="polite"/);
 assert.match(html,/id="codePanel"[^>]*hidden/);
 assert.match(read('index.html'),/href="\.\/warscript-junior\.html"/);
 for(const file of [html,js])for(const forbidden of [/localStorage/,/sessionStorage/,/indexedDB/,/document\.cookie/,/fetch\(/,/XMLHttpRequest/,/eval\(/])assert.doesNotMatch(file,forbidden);
});
