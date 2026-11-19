import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('navigation links to the correct communication activity instead of default reading',()=>{
 const index=read('index.html'),folder=read('communiquer/index.html'),app=read('app.js');
 assert.match(index,/href="\.\/index\.html#atelier-talk">Atelier « Je m’exprime »/);
 assert.match(folder,/href="\.\.\/index\.html#atelier-talk">Atelier Je m’exprime/);
 assert.match(index,/id="atelier-talk"/);
 assert.match(app,/location\.hash==='#atelier-talk'/);
 assert.match(app,/switchMode\('talk'\)/);
 assert.match(app,/\$\('lessonTitle'\)\.focus\(\)/);
});
test('privacy and offline fallback are explicit and test protocol exists',()=>{
 const pwa=read('pwa.js');
 const doc=read('docs/NAVIGATION_PWA_ACCEPTANCE.md');
 assert.match(pwa,/Mode hors ligne en préparation/);
 assert.match(pwa,/await navigator\.serviceWorker\.ready/);
 assert.match(pwa,/Promise\.all\(urls\.map\(url=>caches\.match\(url\)\)\)/);
 assert.match(doc,/320, 375, 768 px/);
 assert.match(doc,/CAA/);
 assert.doesNotMatch(pwa,/localStorage|indexedDB|sendBeacon|document\.cookie/);
});
