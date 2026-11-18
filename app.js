import {reads,writes,symbols,situations,isReadingCorrect,isWritingCorrect,evaluateSituation,appendSymbol} from './core.js';
const $=id=>document.getElementById(id);
let mode='read',index=0,finished=false,phrase=[],automatic=false;
const exercise=$('exercise'),feedback=$('feedback'),next=$('next'),instruction=$('instruction');
const titles={read:'Je lis',write:"J'écris",talk:"Je m'exprime",understand:'On se comprend'};
function speak(text){if(!('speechSynthesis' in window)){feedback.textContent='La voix n’est pas disponible sur cet appareil.';return}try{speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='fr-FR';utterance.rate=.85;speechSynthesis.speak(utterance)}catch{feedback.textContent='La lecture vocale n’est pas disponible.'}}
const el=(tag,className,text)=>{const item=document.createElement(tag);if(className)item.className=className;if(text!==undefined)item.textContent=text;return item};
const button=(text,cls,fn)=>{const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b};
function respond(message,read=false){feedback.textContent=message;if(read||automatic)speak(message)}
function complete(){finished=true;next.hidden=false;respond('Bravo ! Tu peux passer à la suite.',true)}
function switchMode(value){if(!titles[value])return;mode=value;index=0;finished=false;phrase=[];for(const b of document.querySelectorAll('[data-mode]')){const active=b.dataset.mode===mode;b.classList.toggle('selected',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')}render()}
function render(){exercise.replaceChildren();feedback.textContent='';finished=false;next.hidden=true;$('restart').hidden=mode==='talk';$('lessonTitle').textContent=titles[mode];$('step').textContent=mode==='talk'?'MA COMMUNICATION':'ACTIVITÉ '+(index+1);
 if(mode==='read')readLesson();if(mode==='write')writeLesson();if(mode==='talk')talkLesson();if(mode==='understand')understandLesson();
 if(automatic)speak(instruction.textContent);
}
function readLesson(){const item=reads[index%reads.length];instruction.textContent='Regarde le dessin. Choisis le bon mot.';
 const img=el('div','picture',item.emoji);img.setAttribute('role','img');img.setAttribute('aria-label',item.word.toLocaleLowerCase('fr'));exercise.append(img);
 const choices=el('div','choices');for(const word of item.choices){const btn=button(word,'choice',()=>{if(finished)return;if(isReadingCorrect(item,word)){for(const child of choices.children)child.disabled=true;complete()}else respond('Tu peux essayer encore. Prends ton temps.');});choices.append(btn)}exercise.append(choices,button('🔊 Écouter le mot','outline',()=>speak(item.word.toLocaleLowerCase('fr'))));
}
function writeLesson(){const item=writes[index%writes.length];instruction.textContent='Regarde le dessin et écris le mot en t’aidant du modèle.';
 const image=el('div','picture',item.emoji),model=el('p','model',item.word),label=el('label','center','Écris le mot ici :'),input=el('input','word-input');label.htmlFor='wordAnswer';input.id='wordAnswer';input.type='text';input.maxLength=36;input.autocapitalize='characters';input.autocomplete='off';input.spellcheck=false;
 const validate=()=>{if(finished)return;if(isWritingCorrect(item,input.value)){input.disabled=true;complete()}else respond('Regarde le modèle. Tu peux réessayer.')};
 input.addEventListener('keydown',event=>{if(event.key==='Enter')validate()});
 const actions=el('div','actions');actions.append(button('Vérifier mon mot','',validate),button('🔊 Écouter','outline',()=>speak(item.word.toLocaleLowerCase('fr'))));exercise.append(image,model,label,input,actions);
}
function talkLesson(){instruction.textContent='Choisis des images pour dire ce que tu veux. Tu peux aussi parler ou faire un geste.';
 const output=el('div','phrase');output.setAttribute('aria-live','polite');output.setAttribute('aria-atomic','true');
 const grid=el('div','symbols');
 const refresh=()=>{output.textContent=phrase.length?phrase.join(' · '):'Choisis une image.';};
 for(const symbol of symbols){
  const btn=button('','symbol',()=>{
   phrase=appendSymbol(phrase,symbol.text);
   refresh();speak(symbol.text);
   // Keep the focused button in place: important for keyboard and switch access.
  });
  btn.setAttribute('aria-label',symbol.text);
  btn.append(el('span','',symbol.emoji),el('span','',symbol.text));grid.append(btn);
 }
 const actions=el('div','actions');
 actions.append(
  button('🔊 Dire mon message','',()=>phrase.length?speak(phrase.join('. ')):respond('Choisis une image pour commencer.')),
  button('↶ Effacer le dernier','outline',()=>{phrase.pop();refresh();}),
  button('Tout effacer','outline',()=>{phrase=[];refresh();})
 );
 exercise.replaceChildren(output,grid,actions);refresh();
}
function understandLesson(){const situation=situations[index%situations.length];instruction.textContent='Lis la situation. Choisis une réponse respectueuse et adaptée.';
 const box=el('div','scenario'),title=el('h3','',situation.title),description=el('p','',situation.context),choices=el('div','scenarios');box.append(title,description);exercise.append(box);
 for(let i=0;i<situation.options.length;i++){const option=situation.options[i],btn=button(option,'answer',()=>{if(finished)return;if(evaluateSituation(situation,i)){for(const child of choices.children)child.disabled=true;finished=true;next.hidden=false;respond('Bonne approche. '+situation.reason)}else respond('Essayons une autre réponse. Le but est de laisser la personne s’exprimer et choisir.');});choices.append(btn)}
 exercise.append(choices,button('🔊 Écouter la situation','outline',()=>speak(situation.context)));
}
$('next').addEventListener('click',()=>{index++;const limit=mode==='read'?reads.length:mode==='write'?writes.length:situations.length;if(index>=limit)index=0;render()});
$('restart').addEventListener('click',()=>{index=0;render()});$('repeat').addEventListener('click',()=>speak(instruction.textContent));
$('welcomeVoice').addEventListener('click',()=>speak('Bienvenue dans WarLike HelianA. Ici, on apprend à lire, à écrire, à s’exprimer et à mieux se comprendre.'));
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>switchMode(b.dataset.mode)));
$('settingsButton').addEventListener('click',()=>{const panel=$('settings');panel.hidden=!panel.hidden;$('settingsButton').setAttribute('aria-expanded',String(!panel.hidden))});
for(const [id,cls] of [['larger','large'],['contrast','contrast'],['lessMotion','reduced']])$(id).addEventListener('change',event=>document.body.classList.toggle(cls,event.target.checked));
$('autoVoice').addEventListener('change',event=>{automatic=event.target.checked;if(automatic)speak(instruction.textContent)});
render();
