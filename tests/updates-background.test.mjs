import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
test('non-blocking update design is present across the four existing pages',async()=>{
 for(const file of ['index.html','games.html','pathways.html','coding.html']){
  const html=await readFile(new URL('../'+file,import.meta.url),'utf8');
  assert.match(html,/heliana-updates\.css/);
  assert.match(html,/Mises à jour en cours/);
  assert.match(html,/aria-label="Informations sur les mises à jour"/);
  assert.doesNotMatch(html,/role="alertdialog"|aria-modal="true"/);
 }
});
test('update design preserves high-contrast and reduced-motion modes',async()=>{
 const css=await readFile(new URL('../heliana-updates.css',import.meta.url),'utf8');
 assert.match(css,/body\.contrast/);
 assert.match(css,/prefers-reduced-motion/);
});
