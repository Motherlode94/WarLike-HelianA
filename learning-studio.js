import {LEVELS,activitiesForLevel,evaluateChoice,applyActions} from './learning-activities.js';
const $=id=>document.getElementById(id);
let level='decouverte',index=0,correct=false,character={position:0,direction:'haut',message:''};
const voice=()=>window.speechSynthesis;function stopVoice(){if('speechSynthesis' in window)voice().cancel();}
function speak(text){if(!('speechSynthesis' in window))return;stopVoice();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='fr-FR';voice().speak(utterance);}
function draw(){const avatar=$('character');avatar.style.gridColumn=String(character.position+1);$('track').setAttribute('aria-label','Personnage à la case '+(character.position+1)+' sur 4, direction '+character.direction);$('speech').textContent=character.message;}
function render(focus=false){stopVoice();correct=false;const activities=activitiesForLevel(level),a=activities[index];$('progress').textContent='ACTIVITÉ '+(index+1)+' SUR '+activities.length+' — '+a.topic;$('activityTitle').textContent=a.title;$('prompt').textContent=a.prompt;$('response').textContent='';$('back').disabled=index===0;$('forward').hidden=true;$('forward').textContent=index===activities.length-1?'Recommencer ce niveau ↻':'Activité suivante →';
 const answers=$('answers');answers.replaceChildren();a.choices.forEach((choice,i)=>{const button=document.createElement('button');button.type='button';button.textContent=choice;button.addEventListener('click',()=>{if(correct)return;if(!evaluateChoice(a,i)){$('response').textContent='Tu peux essayer encore.';return;}correct=true;character=applyActions(character,a.actions);draw();$('response').textContent='Bien joué ! '+a.explanation;$('forward').hidden=false;answers.querySelectorAll('button').forEach(b=>b.disabled=true);});answers.append(button);});
 for(const b of $('levelChoices').querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.level===level));
 if(focus)$('activityTitle').focus();
}
const levelChoices=$('levelChoices');for(const entry of LEVELS){const button=document.createElement('button');button.type='button';button.dataset.level=entry.id;button.textContent=entry.label;button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{level=entry.id;index=0;character={position:0,direction:'haut',message:''};draw();render(true);});levelChoices.append(button);}
$('back').addEventListener('click',()=>{if(index>0){index--;render(true);}});
$('forward').addEventListener('click',()=>{if(!correct)return;index=(index+1)%activitiesForLevel(level).length;render(true);});
$('replay').addEventListener('click',()=>render(true));
$('startOver').addEventListener('click',()=>{character={position:0,direction:'haut',message:''};draw();$('response').textContent='Le chemin recommence.';});
$('largeText').addEventListener('change',event=>document.body.classList.toggle('learning-bigger',event.target.checked));
$('listen').addEventListener('click',()=>speak(activitiesForLevel(level)[index].prompt));$('silence').addEventListener('click',stopVoice);window.addEventListener('pagehide',stopVoice);
draw();render();
