import {BOARD_ITEMS,BOARD_CATEGORIES,categoryItems,selection,addMessage} from './communication-data.js';
import {symbolIcon} from './pictograms.js';
const $=id=>document.getElementById(id);
let messages=[],selected=new Set(),category='all';
const node=(tag,text,klass)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(klass)el.className=klass;return el};
function speak(message){
 if(!('speechSynthesis' in window)){feedback('La lecture vocale n’est pas disponible ici. Tu peux montrer ou dire ton message.');return}
 try{speechSynthesis.cancel();const voice=new SpeechSynthesisUtterance(message);voice.lang='fr-FR';voice.rate=Number($('speechRate').value)||.85;speechSynthesis.speak(voice)}
 catch{feedback('La lecture vocale n’est pas disponible sur cet appareil.')}
}
function feedback(value){$('boardFeedback').textContent=value}
function refreshMessage(){
 $('messageOutput').textContent=messages.length?messages.join(' · '):'Choisis un ou plusieurs messages.';
 $('sayMessage').disabled=messages.length===0;
 $('undoMessage').disabled=messages.length===0;
 $('clearMessage').disabled=messages.length===0;
}
function refreshPrint(){
 $('printGrid').replaceChildren();
 const cards=selection(BOARD_ITEMS,[...selected]);
 for(const item of cards){
  const card=node('article',undefined,'print-card');
  const illustration=node('div',undefined,'print-icon');illustration.append(symbolIcon(item.id));
  card.append(illustration,node('strong',item.label));
  $('printGrid').append(card);
 }
 $('selectedCount').textContent=cards.length+' carte'+(cards.length===1?'':'s')+' sélectionnée'+(cards.length===1?'':'s')+'.';
 $('printCards').disabled=cards.length===0;
}
function display(){
 const grid=$('messageGrid');grid.replaceChildren();
 for(const item of categoryItems(category)){
  const wrap=node('div',undefined,'communication-card');
  const use=node('button',undefined,'communication-use');use.type='button';
  use.setAttribute('aria-label','Ajouter le message : '+item.label);
  const illustration=node('span',undefined,'communication-icon');illustration.append(symbolIcon(item.id));
  use.append(illustration,node('span',item.label));
  use.addEventListener('click',()=>{
   messages=addMessage(messages,item.label);
   refreshMessage();
   feedback('Message ajouté. Tu peux écouter, modifier ou choisir une autre carte.');
  });
  const label=node('label',undefined,'print-selector');
  const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.checked=selected.has(item.id);
  checkbox.setAttribute('aria-label','Choisir pour imprimer : '+item.label);
  checkbox.addEventListener('change',()=>{
   if(checkbox.checked)selected.add(item.id);else selected.delete(item.id);
   refreshPrint();
  });
  label.append(checkbox,node('span','Imprimer cette carte'));
  wrap.append(use,label);grid.append(wrap);
 }
}
$('boardCategory').addEventListener('change',e=>{
 const value=e.target.value;
 category=BOARD_CATEGORIES.some(c=>c.id===value)?value:'all';display();
});
$('largeCards').addEventListener('change',e=>document.body.classList.toggle('large-board',e.target.checked));
$('highContrast').addEventListener('change',e=>document.body.classList.toggle('contrast',e.target.checked));
$('customPhraseForm').addEventListener('submit',event=>{
 event.preventDefault();
 const input=$('customPhrase');
 const phrase=input.value.replace(/\s+/g,' ').trim();
 if(!phrase||phrase.length>120){$('phraseFeedback').textContent='Écris une phrase de 1 à 120 caractères.';return}
 messages=addMessage(messages,phrase);refreshMessage();
 $('phraseFeedback').textContent='Phrase ajoutée uniquement pour cette session.';
 input.value='';input.focus();
});
$('sayMessage').addEventListener('click',()=>{if(messages.length)speak(messages.join('. '))});
$('voiceStop').addEventListener('click',()=>{if('speechSynthesis' in window)speechSynthesis.cancel()});
$('undoMessage').addEventListener('click',()=>{messages.pop();refreshMessage();feedback('Dernier message retiré.')});
$('clearMessage').addEventListener('click',()=>{messages=[];refreshMessage();feedback('Message effacé.')});
$('selectShown').addEventListener('click',()=>{for(const item of categoryItems(category))selected.add(item.id);display();refreshPrint()});
$('deselectAll').addEventListener('click',()=>{selected.clear();display();refreshPrint()});
$('printCards').addEventListener('click',()=>{if(selected.size)window.print()});
refreshMessage();display();refreshPrint();
