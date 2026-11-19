import {buildSheet} from './educator-core.js';
const $=id=>document.getElementById(id);
function render(){
 try{
  const item=buildSheet({kind:$('sheetKind').value,title:$('sheetTitle').value,instruction:$('sheetInstruction').value,options:$('sheetOptions').value});
  $('previewHeading').textContent=item.title;$('previewInstruction').textContent=item.instruction;
  const host=$('previewItems');host.replaceChildren();for(const option of item.options){const li=document.createElement('li');li.textContent=option;host.append(li)}
  host.classList.toggle('discussion-options',item.kind==='discussion');
  $('builderStatus').textContent='Fiche actualisée dans cet onglet uniquement.';return true;
 }catch(e){$('builderStatus').textContent=e.message;return false}
}
$('sheetForm').addEventListener('submit',e=>{e.preventDefault();render()});
$('printSheet').addEventListener('click',()=>{if(render())window.print()});
$('resetSheet').addEventListener('click',()=>{$('sheetKind').value='choices';$('sheetTitle').value='Mon activité';$('sheetInstruction').value='Choisis une réponse qui te convient.';$('sheetOptions').value='Oui\nNon\nJe préfère passer';render()});
render();
