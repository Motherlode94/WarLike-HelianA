import {challenges,checkChoice,nextCharacter} from './coding-lessons.js';
const $=id=>document.getElementById(id);
let index=0,character={x:0,direction:'up',message:''},answered=false;
function speak(text){if(!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';speechSynthesis.speak(u);}
function stop(){if('speechSynthesis' in window)speechSynthesis.cancel();}
function draw(){const robot=$('robot');robot.style.gridColumn=String(character.x+1);robot.classList.toggle('facing-right',character.direction==='right');$('stage').setAttribute('aria-label','Personnage à la case '+(character.x+1)+' sur 4, direction '+(character.direction==='right'?'droite':'haut'));$('message').textContent=character.message;}
function render(){stop();answered=false;const c=challenges[index];$('position').textContent='ACTIVITÉ '+(index+1)+' SUR '+challenges.length;$('challengeTitle').textContent=c.title;$('instruction').textContent=c.instruction;$('feedback').textContent='';$('next').hidden=true;$('next').textContent=index===challenges.length-1?'Recommencer les activités ↻':'Activité suivante →';
 const group=$('choices');group.replaceChildren();c.choices.forEach((choice,n)=>{const b=document.createElement('button');b.type='button';b.textContent=choice;b.addEventListener('click',()=>{if(answered)return;if(!checkChoice(c,n)){$('feedback').textContent='Essaie encore, tu peux prendre ton temps.';return;}answered=true;character=nextCharacter(character,c.action);draw();$('feedback').textContent='Bravo, tu as trouvé ! '+c.help;$('next').hidden=false;group.querySelectorAll('button').forEach(b=>b.disabled=true);});group.append(b);});}
$('next').addEventListener('click',()=>{index=(index+1)%challenges.length;render();$('challengeTitle').focus();});
$('retry').addEventListener('click',()=>{render();$('challengeTitle').focus();});
$('reset').addEventListener('click',()=>{character={x:0,direction:'up',message:''};draw();});
$('hear').addEventListener('click',()=>speak(challenges[index].instruction));$('stopVoice').addEventListener('click',stop);window.addEventListener('pagehide',stop);draw();render();