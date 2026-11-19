// Static, non-personal lesson choices; level is freely chosen, never inferred.
export const LEARNING_LEVELS=Object.freeze([{id:'decouverte',label:'Découverte'},{id:'pratique',label:'Pratique'},{id:'defi',label:'Défi'}]);
export const LEARNING_TYPES=Object.freeze([{id:'numbers',label:'Quantités et nombres'},{id:'sounds',label:'Écouter et reconnaître'},{id:'sequences',label:'Étapes du quotidien'}]);
const BANK=Object.freeze({
 numbers:[
  {count:2,answers:[1,2,3],label:'deux'}, {count:4,answers:[3,4,5],label:'quatre'}, {count:7,answers:[6,7,8],label:'sept'},
  {count:9,answers:[8,9,10],label:'neuf'}, {count:12,answers:[11,12,13],label:'douze'}
 ],
 sounds:[
  {prompt:'Bonjour',answers:['Bonjour','Bonsoir','Merci']},{prompt:'Je veux une pause',answers:['Je veux continuer','Je veux une pause','Je veux boire']},
  {prompt:'Peux-tu répéter ?',answers:['Peux-tu répéter ?','Je voudrais manger','À demain']},
  {prompt:'J’ai besoin d’aide',answers:['J’ai besoin d’aide','Je veux jouer','Je veux sortir']}
 ],
 sequences:[
  {prompt:'Se laver les mains',steps:['Ouvrir le robinet','Mouiller les mains','Utiliser du savon','Rincer','Sécher']},
  {prompt:'Préparer une activité',steps:['Choisir une activité','Préparer le matériel','Faire l’activité','Ranger le matériel']},
  {prompt:'Prendre une pause',steps:['Demander une pause','Trouver un endroit confortable','Se reposer','Choisir si on veut reprendre']}
 ]
});
export const tasks=type=>BANK[type]||[];
export function taskFor(type,level='decouverte',round=0){
 const bank=tasks(type),index=Math.max(0,Math.min(LEARNING_LEVELS.findIndex(l=>l.id===level),2));
 return bank.length?bank[(Math.max(0,Math.floor(round))+index)%bank.length]:null;
}
export function isCorrectAnswer(type,item,answer){
 if(type==='numbers')return Number(answer)===item.count;
 if(type==='sounds')return answer===item.prompt;
 if(type==='sequences')return Array.isArray(answer)&&answer.join('|')===item.steps.join('|');
 return false;
}
