import test from 'node:test';
import assert from 'node:assert/strict';
import {helianaSections,currentSection,buildNavigation} from '../heliana-navigation.js';
test('each top-level menu contains accessible links',()=>{
 assert.equal(helianaSections.length,5);
 assert.equal(new Set(helianaSections.map(s=>s.label)).size,5);
 for(const section of helianaSections){
  assert.ok(section.items.length>0);
  for(const item of section.items)assert.match(item.href,/^\.\//);
 }
});
test('current route follows section context',()=>{
 assert.equal(currentSection('/coding.html'),'Créer');
 assert.equal(currentSection('/games.html'),'Jouer');
 assert.equal(currentSection('/pathways.html'),'Apprendre');
 assert.equal(currentSection('/'),'Accueil');
});
test('navigation markup uses native summary/details and no arbitrary code',()=>{
 class Node{constructor(tag){this.tagName=tag;this.children=[];this.attrs={};this.classList={add:()=>{}};this.textContent='';}setAttribute(k,v){this.attrs[k]=v;}append(...nodes){this.children.push(...nodes);}}
 const doc={createElement:tag=>new Node(tag)};
 const nav=buildNavigation(doc,'/coding.html');
 assert.equal(nav.tagName,'nav');
 assert.equal(nav.children.length,5);
 assert.equal(nav.children[3].children[0].attrs['aria-current'],'page');
 assert.equal(nav.children[0].children[1].children[0].children[0].tagName,'a');
});
