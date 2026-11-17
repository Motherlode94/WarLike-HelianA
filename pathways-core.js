// WarLike HelianA v4 — guided educational pathways.
// No diagnosis, age-based tracking, scores, persistent profiles or inferred emotions.
import {PAIRS,PHRASES,SCENARIOS,stories,routines,FEELINGS,NEEDS} from './games-core.js';
export const PATHWAYS=Object.freeze([
 {id:'words',name:'Les mots du quotidien',icon:'📖',description:'Découvrir, lire, écrire et utiliser des mots.',steps:[
  {kind:'picture',index:0},{kind:'picture',index:7},{kind:'phrase',index:0},
  {kind:'reading',index:1},{kind:'expression',index:0},{kind:'duo',index:0}]},
 {id:'autonomy',name:'Mes choix, mes besoins',icon:'🌱',description:'Exprimer une préférence, demander et respecter un refus.',steps:[
  {kind:'expression',index:1},{kind:'situation',index:2},{kind:'phrase',index:3},
  {kind:'routine',index:5},{kind:'expression',index:3},{kind:'duo',index:1}]},
 {id:'together',name:'On se comprend à deux',icon:'🤝',description:'Écouter, reformuler et prendre son tour de parole.',steps:[
  {kind:'duo',index:0},{kind:'situation',index:0},{kind:'duo',index:2},
  {kind:'situation',index:1},{kind:'expression',index:2},{kind:'duo',index:3}]},
 {id:'stories',name:'Histoires et échanges',icon:'📚',description:'Lire une courte histoire et en parler ensemble.',steps:[
  {kind:'reading',index:0},{kind:'reading',index:2},{kind:'situation',index:3},
  {kind:'phrase',index:5},{kind:'reading',index:4},{kind:'duo',index:4}]}
]);
export const DUO_PROMPTS=Object.freeze([
 {title:'Demander et écouter',first:'Choisis une activité que tu aimerais faire. Dis-le ou montre une image.',second:'Écoute sans interrompre, puis demande si tu as bien compris.',reflection:'La personne qui s’exprime peut confirmer, corriger ou refuser.'},
 {title:'Exprimer un refus',first:'Choisis une proposition à laquelle tu aimerais dire non.',second:'Accueille la réponse sans insister. Propose une autre option seulement si la personne le souhaite.',reflection:'Un refus est un message à respecter.'},
 {title:'Faire une pause',first:'Dis ou montre si tu souhaites une pause, une aide ou continuer.',second:'Attends la réponse puis demande ce qui faciliterait l’activité.',reflection:'La durée et la manière de répondre appartiennent à la personne.'},
 {title:'Changer de moyen',first:'Essaie un mot, un dessin, un geste ou un pictogramme de ton choix.',second:'Demande comment tu peux aider, sans interpréter à sa place.',reflection:'Plusieurs moyens de communication peuvent être utilisés ensemble.'},
 {title:'Raconter un souvenir',first:'Raconte ou montre un événement agréable, si tu en as envie.',second:'Écoute, reformule seulement avec accord et laisse la personne compléter.',reflection:'On peut aussi choisir de ne pas raconter.'}
]);
export const DISPLAY_DEFAULTS=Object.freeze({size:'normal',contrast:false,spacing:false,shortInstructions:false,voice:false,duo:false});
export function validateDisplay(value){
 const size=['normal','grand','très-grand'].includes(value?.size)?value.size:'normal';
 return {size,contrast:value?.contrast===true,spacing:value?.spacing===true,
  shortInstructions:value?.shortInstructions===true,voice:value?.voice===true,duo:value?.duo===true};
}
export function pathwayById(id){return PATHWAYS.find(p=>p.id===id)||null}
export function pathwayStep(pathId,index){
 const path=pathwayById(pathId);
 if(!path||!Number.isInteger(index)||index<0||index>=path.steps.length)return null;
 return path.steps[index];
}
export const pathwayLength=id=>pathwayById(id)?.steps.length||0;
export function chooseVariant(list,index,variation=0){
 if(!Array.isArray(list)||!list.length)return null;
 return list[((index+variation)%list.length+list.length)%list.length];
}
export function stepMaterial(step,variation=0){
 if(!step)return null;
 const source={picture:PAIRS,phrase:PHRASES,situation:SCENARIOS,reading:stories,
  routine:routines,expression:[...NEEDS,...FEELINGS],duo:DUO_PROMPTS}[step.kind];
 if(!source)return null;
 return chooseVariant(source,step.index,variation);
}
export function advance(current,length){
 if(!Number.isInteger(current)||!Number.isInteger(length)||length<1)return 0;
 return Math.min(Math.max(current,0)+1,length);
}
export function normalizeSequence(parts){return parts.map(p=>String(p).trim()).filter(Boolean)}
export function sequenceMatches(actual,expected){
 return Array.isArray(actual)&&Array.isArray(expected)&&actual.length===expected.length&&
 actual.every((v,i)=>String(v)===String(expected[i]));
}
