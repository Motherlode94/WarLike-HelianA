import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
test('offline installation lists only existing static public assets',()=>{
 const sw=read('service-worker.js');
 const assetSection=sw.slice(sw.indexOf('const ASSETS=['),sw.indexOf('];',sw.indexOf('const ASSETS=[')));
 const paths=[...assetSection.matchAll(/'\.\/([^']*)'/g)].map(x=>x[1]);
 assert.ok(paths.length>=35);
 for(const file of paths){if(!file)continue;assert.ok(existsSync(new URL('../'+file,import.meta.url)),'missing: '+file)}
 assert.ok(paths.includes('warscript-junior-core.js'));
 assert.ok(paths.includes('learning-studio.html'));
 assert.ok(paths.includes('educator.html'));
});
test('service worker never caches private, API, or arbitrary navigation requests',()=>{
 const sw=read('service-worker.js');
 assert.match(sw,/request\.method!=='GET'/);
 assert.match(sw,/url\.origin!==self\.location\.origin/);
 assert.match(sw,/WHITELIST\.has\(url\.pathname\)/);
 assert.match(sw,/request\.headers\.has\('Authorization'\)/);
 assert.match(sw,/url\.search/);
 assert.doesNotMatch(sw,/localStorage|indexedDB|\.put\(request\.body/);
 assert.match(read('index.html'),/rel="manifest"/);
 assert.match(read('index.html'),/src="\.\/pwa\.js"/);
});
test('PWA manifest is installable with no accounts or push permissions',()=>{
 const manifest=JSON.parse(read('manifest.webmanifest'));
 assert.equal(manifest.display,'standalone');
 assert.equal(manifest.lang,'fr');
 assert.ok(manifest.icons.some(x=>x.type==='image/svg+xml'));
 assert.match(read('pwa.js'),/serviceWorker\.register/);
 assert.doesNotMatch(read('pwa.js'),/Notification\.requestPermission|PushManager|localStorage/);
});
