import {PATHWAYS,DUO_PROMPTS,DISPLAY_DEFAULTS,validateDisplay,pathwayById,pathwayStep,pathwayLength,stepMaterial,advance,sequenceMatches} from './pathways-core.js';
import {PAIRS,SCENARIOS,arrangeWords} from './games-core.js';
const $=id=>document.getElementById(id);
const body=$('activityBody'),feedback=$('activityFeedback');
let current=null,position=0,variation=0,completed=false,duoConfirmed=[false,false],chosen=[];
let preferences={...DISPLAY_DEFAULTS};
const make=(tag,text,className='')=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(className)e.className=className;return e};
const button=(text,action,className='')=>{const b=make('button',text,className);b.type='button';b.addEventListener('click',action);return b};
function say(message,{manual=false}={}){
 if(!manual&&!preferences.voice)return;
 if(!('speechSynthesis' in window)){feedback.textContent='La lecture vocale n’est pas disponible ici.';return;}
 try{speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(message);utterance.lang='fr-FR';utterance.rate=.82;speechSynthesis.speak(utterance)}catch{feedback.textContent='La lecture vocale n’est pas disponible ici.';}
}
function setInstruction(full,short=full){
 const value=preferences.shortInstructions?short:full;
 $('activityInstruction').textContent=value;say(value);
}
function notice(text){feedback.textContent=text;}
function finish(text){completed=true;notice(text);$('nextActivity').disabled=false;}
function paintSettings(){
 document.body.classList.toggle('v4-grand',preferences.size==='grand');
 document.body.classList.toggle('v4-very-large',preferences.size==='très-grand');
 document.body.classList.toggle('v4-wide',preferences.spacing);
 document.body.classList.toggle('v4-contrast',preferences.contrast);
}
function choose(id){
 if(!pathwayById(id))return;
 current=id;position=0;variation=0;render();
 $('learningArea').scrollIntoView({block:'start',behavior:'auto'});
}
function catalog(){
 const host=$('pathCatalog');host.replaceChildren();
 for(const p of PATHWAYS){
  const card=button('',()=>choose(p.id),'path-card');
  card.append(make('span',p.icon),make('strong',p.name),make('small',p.description),make('small',p.steps.length+' étapes · sans limite de temps'));
  if(current===p.id)card.setAttribute('aria-current','true');
  host.append(card);
 }
}
function render(){
 catalog();
 const area=$('learningArea');area.hidden=!current;
 if(!current)return;
 const path=pathwayById(current),length=path.steps.length,step=pathwayStep(current,position);
 body.replaceChildren();feedback.textContent='';chosen=[];duoConfirmed=[false,false];completed=false;
 const complete=position>=length;
 $('progressText').textContent=complete?'Parcours terminé':'Étape '+(position+1)+' sur '+length;
 $('progressBar').setAttribute('aria-valuemax',String(length));
 $('progressBar').setAttribute('aria-valuenow',String(Math.min(position,length)));
 $('progressFill').style.width=(Math.min(position,length)/length*100)+'%';
 $('previousActivity').disabled=position===0;
 $('nextActivity').hidden=complete;
 $('nextActivity').disabled=true;
 $('repeatActivity').disabled=complete;
 $('retryActivity').disabled=complete;
 if(complete){
  $('activityTitle').textContent='Parcours terminé : '+path.name;
  $('activityInstruction').textContent='Tu peux recommencer ou explorer un autre parcours.';
  body.append(make('p','Tu as parcouru les '+length+' étapes. Tes choix ne sont ni notés ni enregistrés.','done-message'),
   button('Recommencer ce parcours',()=>{position=0;variation++;render()},'outline'));
  return;
 }
 $('activityTitle').textContent=path.name+' · '+labelFor(step.kind);
 const material=stepMaterial(step,variation);
 if(step.kind==='picture')picture(material);
 else if(step.kind==='phrase')phrase(material);
 else if(step.kind==='situation')question(material.prompt,material.choices,material.correct,material.explain);
 else if(step.kind==='reading'){body.append(make('p',material.text,'step-card'));question(material.question,material.choices,material.correct,'Tu as trouvé une réponse possible dans cette histoire.');}
 else if(step.kind==='routine')ordered('Replace les actions dans le bon ordre.',material.steps,material.steps);
 else if(step.kind==='expression')express(material);
 else if(step.kind==='duo')duo(material);
 if(preferences.duo&&step.kind!=='duo'){
  const partner=make('aside',undefined,'duo-role');
  partner.append(make('h3','🤝 Jouer à deux'),
   make('p','Personne A : essaie à ton rythme ou utilise un geste, une image ou la parole.'),
   make('p','Personne B : laisse du temps, demande si tu as bien compris, et propose une aide seulement si elle est souhaitée.'));
  body.append(partner);
 }
}
function labelFor(kind){return {picture:'Images et mots',phrase:'Construire une phrase',situation:'Mieux se comprendre',reading:'Histoire',routine:'Étapes du quotidien',expression:'Dire ce que je veux',duo:'Écouter et échanger'}[kind]||'Activité';}
function question(prompt,choices,right,success){
 setInstruction(prompt,'Choisis une réponse.');
 const options=make('div',undefined,'step-choices');
 choices.forEach((answer,i)=>{
  const b=button(answer,()=>{
   if(completed)return;
   if(i===right){for(const item of options.children)item.disabled=true;finish(success||'Tu as trouvé une réponse possible.');}
   else notice('Tu peux réessayer ou demander de l’aide. Prends ton temps.');
  });options.append(b);
 });body.append(options);
}
function picture(item){
 setInstruction('Regarde l’image et choisis le mot qui correspond.','Choisis le mot.');
 const img=make('div',undefined,'step-card');img.append(make('span',item.emoji,'symbol-big'));
 img.setAttribute('role','img');img.setAttribute('aria-label','Image de '+item.word.toLowerCase());
 body.append(img);
 const others=PAIRS.filter(p=>p.word!==item.word).slice(variation%3,variation%3+3).map(p=>p.word);
 const answers=[item.word,...others].sort((a,b)=>a.localeCompare(b,'fr'));
 const options=make('div',undefined,'step-choices');
 for(const word of answers)options.append(button(word,()=>{
  if(completed)return;
  if(word===item.word){for(const b of options.children)b.disabled=true;finish('C’est bien le mot '+word.toLowerCase()+'.');}
  else notice('Essaie encore, ou écoute le mot si tu préfères.');
 }));
 body.append(options);
}
function ordered(prompt,tokens,expected){
 setInstruction(prompt,'Remets dans l’ordre.');
 const board=make('p','Choisis les éléments un à un.','step-phrase');
 const bank=make('div',undefined,'step-bank');
 const items=arrangeWords(tokens);
 const actions=make('div',undefined,'duo-confirm');
 function refresh(){
  board.textContent=chosen.map(p=>p.word).join(' → ')||'Choisis les éléments un à un.';
  bank.replaceChildren();
  for(const item of items){const b=button(item.word,()=>{if(completed||chosen.some(x=>x.id===item.id))return;chosen.push(item);refresh();});b.disabled=chosen.some(x=>x.id===item.id)||completed;bank.append(b);}
 }
 actions.append(button('↶ Retirer',()=>{if(!completed){chosen.pop();refresh();}},'outline'),
  button('Vérifier',()=>{if(completed)return;if(sequenceMatches(chosen.map(x=>x.word),expected))finish('Les éléments sont dans le bon ordre.');else notice('Tu peux changer l’ordre et réessayer.');}));
 body.append(board,bank,actions);refresh();
}
function phrase(item){ordered('Forme une phrase pour : '+item.prompt+'.',item.words,item.words);}
function express(item){
 const label=item.label||item.word||'Mon choix',emoji=item.emoji||'💬';
 setInstruction('Ce message est une proposition. Tu peux le dire, choisir une autre façon de communiquer ou passer.','Choisis comment t’exprimer.');
 const card=make('div',undefined,'step-card');card.append(make('span',emoji,'symbol-big'),make('p',label));body.append(card);
 const options=make('div',undefined,'duo-confirm');
 options.append(button('🔊 Dire ce message',()=>{say(label,{manual:true});}),
  button('Ce message me convient',()=>finish('Ton choix est respecté.'),
  ),button('Je préfère passer',()=>finish('Tu peux choisir de ne pas répondre.')));
 body.append(options);
}
function duo(item){
 setInstruction('À deux : chacun prend son tour. La deuxième personne vérifie qu’elle a compris, sans parler à la place de l’autre.','Chacun son tour.');
 const heading=make('div',undefined,'step-card');heading.append(make('h3',item.title));
 body.append(heading);
 for(const [i,label,value] of [[0,'Personne A — je m’exprime',item.first],[1,'Personne B — j’écoute',item.second]]){
  const card=make('section',undefined,'duo-role');card.append(make('h3',label),make('p',value));
  const mark=button('J’ai terminé mon tour',()=>{
   duoConfirmed[i]=true;mark.setAttribute('aria-pressed','true');mark.textContent='Tour terminé';
   if(duoConfirmed.every(Boolean))finish(item.reflection);
  });mark.setAttribute('aria-pressed','false');card.append(mark);body.append(card);
 }
 body.append(make('p','On peut échanger les rôles, faire une pause ou choisir de ne pas participer.','choice-note'),
  button('Faire cette étape seul ou autrement',()=>finish('Tu peux pratiquer seul, avec un proche ou en utilisant les supports qui te conviennent.'),'outline'));
}
for(const [id,key,read] of [
 ['textSize','size',e=>e.target.value],['highContrast','contrast',e=>e.target.checked],
 ['wideSpacing','spacing',e=>e.target.checked],['simpleInstructions','shortInstructions',e=>e.target.checked],
 ['voiceInstructions','voice',e=>e.target.checked],['pairMode','duo',e=>e.target.checked]
]){
 $(id).addEventListener('change',event=>{
  preferences=validateDisplay({...preferences,[key]:read(event)});paintSettings();
  if(current)render();
 });
}
$('previousActivity').addEventListener('click',()=>{position=Math.max(0,position-1);render();});
$('retryActivity').addEventListener('click',()=>{variation++;render();});
$('nextActivity').addEventListener('click',()=>{if(completed){position=advance(position,pathwayLength(current));render();}});
$('repeatActivity').addEventListener('click',()=>{if(current)say($('activityInstruction').textContent,{manual:true});});
paintSettings();catalog();
