import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const read=name=>readFileSync(new URL(name,root),'utf8');
const folders=['apprendre','communiquer','creer','accompagner'];

test('category landing pages never render an expanded overlay by default',()=>{
 for(const folder of folders){
  const html=read(folder+'/index.html');
  assert.doesNotMatch(html,/<details class="heliana-nav-group"\s+open\s*>/);
  assert.match(html,new RegExp('href="../'+folder+'/" aria-current="page"'));
 }
});
test('native menu controller closes other groups, outside interactions and Escape',()=>{
 const docListeners=new Map();
 const groups=Array.from({length:4},()=>({
  open:false,
  handlers:new Map(),
  addEventListener(type,handler){this.handlers.set(type,handler)},
  querySelector(){return {focus(){focused=true}}}
 }));
 let focused=false;
 const nav={querySelectorAll:()=>groups,contains:target=>target==='inside'};
 const document={
  querySelector:()=>nav,
  addEventListener(type,handler){docListeners.set(type,handler)}
 };
 vm.runInNewContext(read('navigation.js'),{document});
 groups[0].open=true;groups[0].handlers.get('toggle')();
 groups[1].open=true;groups[1].handlers.get('toggle')();
 assert.equal(groups[0].open,false);
 assert.equal(groups[1].open,true);
 docListeners.get('pointerdown')({target:'inside'});
 assert.equal(groups[1].open,true);
 docListeners.get('focusin')({target:'outside'});
 assert.equal(groups.every(g=>!g.open),true);
 groups[2].open=true;let prevented=false;
 docListeners.get('keydown')({key:'Escape',preventDefault(){prevented=true}});
 assert.equal(groups[2].open,false);
 assert.equal(prevented,true);assert.equal(focused,true);
});
test('offline status waits for Service Worker activation and checks cached pages',()=>{
 const pwa=read('pwa.js'),worker=read('service-worker.js');
 assert.match(pwa,/await navigator\.serviceWorker\.ready/);
 assert.match(pwa,/await resourcesAvailable\(\)/);
 assert.match(pwa,/caches\.match\(url\)/);
 for(const folder of folders)assert.ok(pwa.includes(folder+'/index.html'));
 assert.match(worker,/const VERSION='heliana-nav-offline-qa-v15-20261119'/);
 assert.match(worker,/WHITELIST\.has\(url\.pathname\)/);
 assert.doesNotMatch(pwa,/localStorage|sessionStorage|indexedDB|sendBeacon/);
});
test('CSS keeps closed dropdowns hidden and mobile menus in document flow',()=>{
 const css=read('style.css');
 assert.match(css,/\.heliana-nav-group:not\(\[open\]\)>\.heliana-nav-submenu\{display:none!important\}/);
 assert.match(css,/@media\(max-width:720px\)/);
 assert.match(css,/\.heliana-nav-submenu\{position:static/);
});
