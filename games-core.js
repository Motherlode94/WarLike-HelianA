// Mini-jeux HelianA : données statiques, sans profilage ni classement.
export const LEVELS=Object.freeze(['découverte','pratique','défi']);
export const GAMES=Object.freeze([
 {id:'association',name:'Images & mots',icon:'🧩',goal:'Reconnaître et associer des mots à des images'},
 {id:'phrase',name:'Construis une phrase',icon:'🗣️',goal:'Ordonner des mots pour formuler une demande'},
 {id:'situation',name:'On se comprend',icon:'🤝',goal:'Choisir une réponse qui respecte la communication'},
 {id:'memory',name:'Mémoire des images',icon:'🎴',goal:'Observer, mémoriser et retrouver des images'}
]);
export const PAIRS=[
 {emoji:'💧',word:'EAU'}, {emoji:'🍎',word:'POMME'}, {emoji:'🏡',word:'MAISON'},
 {emoji:'📖',word:'LIVRE'}, {emoji:'🐱',word:'CHAT'}, {emoji:'🌻',word:'FLEUR'}
];
export const PHRASES=[
 {words:['Je','veux','de','l’eau'],prompt:'Demander à boire'},
 {words:['Je','veux','une','pause'],prompt:'Demander une pause'},
 {words:['Peux-tu','m’aider','s’il','te','plaît'],prompt:'Demander de l’aide'},
 {words:['Je','ne','veux','pas'],prompt:'Dire non'}
];
export const SCENARIOS=[
 {prompt:'Une personne a besoin de temps pour répondre.',choices:['J’attends et je lui laisse le temps','Je réponds à sa place','Je parle plus fort'],correct:0,explain:'Laisser du temps montre que sa réponse compte.'},
 {prompt:'Tu n’es pas certain de comprendre un geste.',choices:['Je décide ce que le geste veut dire','Je vérifie avec la personne','Je change de sujet'],correct:1,explain:'Demander confirmation permet de ne pas décider à la place de l’autre.'},
 {prompt:'Une personne dit « non » à une activité.',choices:['J’insiste','J’ignore la réponse','Je respecte son choix'],correct:2,explain:'Respecter un refus est essentiel à une communication libre.'},
 {prompt:'Une personne préfère communiquer avec des images.',choices:['Je lui propose des images adaptées','Je lui impose de parler','Je l’ignore'],correct:0,explain:'Chacun peut utiliser les moyens de communication qui lui conviennent.'}
];
export const poolSize=level=>level==='découverte'?2:level==='pratique'?3:4;
export const normalize=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().replace(/\s+/g,' ').toLocaleLowerCase('fr');
export const matchesWord=(a,b)=>normalize(a)===normalize(b);
export const phraseIsCorrect=(candidate,expected)=>Array.isArray(candidate)&&Array.isArray(expected)&&candidate.length===expected.length&&candidate.every((word,i)=>matchesWord(word,expected[i]));
export function arrangeWords(words){
 // Stable intentionally mixed order; return distinct indexed tokens for duplicate words.
 if(!Array.isArray(words))return [];
 return words.map((word,id)=>({id,word})).reverse();
}
export const checkScenario=(item,index)=>Number.isInteger(index)&&index===item.correct;
export function makeMemoryCards(pairs,count){
 const selected=pairs.slice(0,Math.max(2,Math.min(count,pairs.length)));
 const cards=selected.flatMap((p,i)=>[{id:i*2,pair:i,symbol:p.emoji},{id:i*2+1,pair:i,symbol:p.emoji}]);
 // Deterministic interleaving, different positions for matching cards.
 const size=selected.length;
 return [...cards.filter(c=>c.id%2===0),...cards.filter(c=>c.id%2===1).reverse()].map(c=>({...c}));
}
export function resolveMemoryTurn(cards,firstId,secondId){
 if(firstId===secondId)return {matched:false,reason:'same'};
 const first=cards.find(c=>c.id===firstId),second=cards.find(c=>c.id===secondId);
 if(!first||!second)return {matched:false,reason:'missing'};
 return {matched:first.pair===second.pair,reason:first.pair===second.pair?'pair':'retry'};
}
