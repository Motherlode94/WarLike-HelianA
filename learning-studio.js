import {LEARNING_TYPES,taskFor,isCorrectAnswer} from './learning-studio-data.js';
const $=id=>document.getElementById(id);
let round=0,selected=[],completed=false;
const make=(tag,text,css)=>{const x=document.createElement(tag);if(text!==undefined)x.textContent=text;if(css)x.className=css;return x};
const button=(value,fn)=>{const b=make('button',value);b.type='button';b.addEventListener('click',fn);return b};
function speak(msg){
 if(!('speechSynthesis' in window)){$('taskFeedback').textContent='La voix est indisponible. Tu peux lire ou demander à quelqu’un de lire.';return}
 try{speechSynthesis.cancel();const s=new SpeechSynthesisUtterance(msg);s.lang='fr-FR';s.rate=.85;speechSynthesis.speak(s)}catch{$('taskFeedback').textContent='La lecture vocale est indisponible.'}
}
function notice(msg){$('taskFeedback').textContent=msg}
function finish(){completed=true;notice('Tu peux passer à l’activité suivante, ou continuer à ton rythme.');$('nextTask').disabled=false}
function render(){
 const type=$('learningType').value,level=$('learningLevel').value,item=taskFor(type,level,round),host=$('taskBody');
 selected=[];completed=false;host.replaceChildren();$('taskFeedback').textContent='';
 $('nextTask').disabled=false;$('roundLabel').textContent='Activité '+(round+1);
 $('taskHeading').textContent=LEARNING_TYPES.find(t=>t.id===type)?.label||'Activité';
 if(!item){notice('Activité indisponible.');return}
 if(type==='numbers'){
  const prompt='Combien de points vois-tu ? Choisis un nombre.';
  $('taskInstruction').textContent=prompt;
  host.append(make('p','● '.repeat(item.count),'learning-counter'));
  const grid=make('div',undefined,'learning-choices');
  for(const n of item.answers)grid.append(button(String(n),()=>{if(completed)return;if(isCorrectAnswer(type,item,n))finish();else notice('Tu peux réessayer, sans te presser.')}));
  host.append(grid);
 }else if(type==='sounds'){
  $('taskInstruction').textContent='Écoute la phrase, puis choisis celle que tu as entendue. Tu peux aussi demander à quelqu’un de la lire.';
  const grid=make('div',undefined,'learning-choices');
  host.append(button('🔊 Écouter la phrase',()=>speak(item.prompt)));
  for(const choice of item.answers)grid.append(button(choice,()=>{if(completed)return;if(isCorrectAnswer(type,item,choice))finish();else notice('Tu peux réécouter ou choisir une autre phrase.')}));
  host.append(grid);
 }else{
  $('taskInstruction').textContent='Replace les étapes dans un ordre qui convient. Exemple : '+item.prompt+'.';
  const board=make('p','Choisis une étape.','learning-selected'),bank=make('div',undefined,'learning-sequence');
  const renderBank=()=>{
   board.textContent=selected.join(' → ')||'Choisis une étape.';
   bank.replaceChildren();
   for(const step of [...item.steps].reverse()){
    const b=button(step,()=>{if(completed||selected.includes(step))return;selected.push(step);renderBank()});
    b.disabled=selected.includes(step);bank.append(b);
   }
  };
  host.append(board,bank,button('↶ Retirer une étape',()=>{if(!completed){selected.pop();renderBank()}}),button('Vérifier',()=>{if(isCorrectAnswer(type,item,selected))finish();else notice('Essaie un autre ordre. Tu peux retirer une étape.')}));
  renderBank();
 }
}
$('learningType').addEventListener('change',()=>{round=0;render();$('taskHeading').focus()});
$('learningLevel').addEventListener('change',()=>{round=0;render();$('taskHeading').focus()});
$('nextTask').addEventListener('click',()=>{round++;render();$('taskHeading').focus()});
$('retryTask').addEventListener('click',()=>{render();$('taskHeading').focus()});
$('listenTask').addEventListener('click',()=>speak($('taskInstruction').textContent));
$('stopTask').addEventListener('click',()=>{if('speechSynthesis' in window)speechSynthesis.cancel()});
render();
