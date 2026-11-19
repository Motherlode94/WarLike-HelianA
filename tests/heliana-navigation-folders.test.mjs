import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const root=new URL('../',import.meta.url);
const files=[
 'index.html','games.html','pathways.html','communication.html','duo-practice.html',
 'facilitator.html','learning-studio.html','educator.html','warscript-junior.html',
 'apprendre/index.html','communiquer/index.html','creer/index.html','accompagner/index.html'
];
const folders=['apprendre','communiquer','creer','accompagner'];

test('all principal pages and four actual navigation subfolders exist',()=>{
 for(const file of files)assert.ok(existsSync(new URL(file,root)),file);
});
test('each page has accessible nested navigation with all categories',()=>{
 for(const file of files){
  const html=readFileSync(new URL(file,root),'utf8');
  assert.match(html,/<nav class="heliana-site-nav" aria-label="Navigation principale">/,file);
  assert.equal((html.match(/class="heliana-nav-group"(?: open)?/g)||[]).length,4,file);
  assert.equal((html.match(/class="heliana-nav-submenu"/g)||[]).length,4,file);
  for(const name of ['Apprendre','Communiquer','Créer','Accompagner'])
   assert.ok(html.includes(' '+name+'</summary>'),file+' missing '+name);
 }
});
test('every navigation and folder link points to an existing local file',()=>{
 for(const file of files){
  const html=readFileSync(new URL(file,root),'utf8');
  const candidates=[...html.matchAll(/href="([^"]+)"/g)].map(match=>match[1]);
  for(const href of candidates){
   if(href.startsWith('#')||href.startsWith('http:')||href.startsWith('https:')||href.startsWith('mailto:'))continue;
   const url=new URL(href,new URL(file,root));
   if(url.protocol!=='file:')continue;
   const target=url.pathname.endsWith('/')?new URL('index.html',url):url;
   assert.ok(existsSync(target),file+' → '+href);
  }
 }
});
test('home retains native learning tabs and their anchor',()=>{
 const html=readFileSync(new URL('index.html',root),'utf8');
 assert.match(html,/id="ateliers"/);
 assert.match(html,/<nav class="tabs" aria-label="Ateliers">/);
 assert.match(html,/id="settingsButton"/);
});
test('PWA precaches category hubs and does not cache responses or user data',()=>{
 const sw=readFileSync(new URL('service-worker.js',root),'utf8');
 for(const folder of folders){
  assert.ok(sw.includes("'./"+folder+"/'"));
  assert.ok(sw.includes("'./"+folder+"/index.html'"));
 }
 assert.match(sw,/request\.method!=='GET'/);
 assert.match(sw,/WHITELIST\.has\(url\.pathname\)/);
 assert.doesNotMatch(sw,/localStorage|sessionStorage|indexedDB|caches\.open\('user/);
});

test('all pages load one common navigation controller from correct relative path',()=>{
 for(const file of files){
  const html=readFileSync(new URL(file,root),'utf8');
  const relative=file.includes('/')?'../navigation.js':'./navigation.js';
  assert.ok(html.includes('src="'+relative+'"'),file+' does not load navigation.js');
 }
});
test('closed details submenus stay hidden and opening one closes others',()=>{
 const css=readFileSync(new URL('style.css',root),'utf8');
 const js=readFileSync(new URL('navigation.js',root),'utf8');
 assert.match(css,/\.heliana-nav-group:not\(\[open\]\)>\.heliana-nav-submenu\{display:none!important\}/);
 assert.match(js,/if\(other!==group\)other\.open=false/);
 assert.match(js,/siteNav\.contains\(event\.target\)/);
 assert.match(js,/event\.key==='Escape'/);
 assert.match(readFileSync(new URL('service-worker.js',root),'utf8'),/'\.\/navigation\.js'/);
});
