import {vocabulary,sentences,interactions,routines,stories,categories,rotate,compareOrdered,maskWord} from './curriculum.js';
// Mini-jeux HelianA : données statiques, sans profilage ni classement.
export const LEVELS=Object.freeze(['découverte','pratique','défi']);
export const GAMES=Object.freeze([
 {id:'association',name:'Images & mots',icon:'🧩',goal:'Reconnaître et associer des mots à des images'},
 {id:'phrase',name:'Construis une phrase',icon:'🗣️',goal:'Ordonner des mots pour formuler une demande'},
 {id:'situation',name:'On se comprend',icon:'🤝',goal:'Choisir une réponse qui respecte la communication'},
 {id:'memory',name:'Mémoire des images',icon:'🎴',goal:'Observer, mémoriser et retrouver des images'},
 {id:'syllables',name:'Syllabes',icon:'🔤',goal:'Assembler les sons et les lettres'},
 {id:'letters',name:'Lettres manquantes',icon:'✏️',goal:'Compléter un mot'},
 {id:'sequence',name:'Étapes du quotidien',icon:'🧭',goal:'Remettre des actions dans l’ordre'},
 {id:'dialogue',name:'À toi de répondre',icon:'💬',goal:'Pratiquer les échanges et les choix'},
 {id:'feelings',name:'Mes ressentis',icon:'💛',goal:'Choisir des mots pour dire ce que l’on ressent'},
 {id:'needs',name:'Exprimer un besoin',icon:'🙋',goal:'Exprimer ses souhaits avec des phrases'},
 {id:'reading',name:'Petites histoires',icon:'📚',goal:'Lire et comprendre un texte'},
 {id:'sorting',name:'Trouve la catégorie',icon:'🌿',goal:'Regrouper les objets d’une même catégorie'}
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

// Richer lesson banks are shared with the main workshops.
PAIRS.push(...vocabulary);
PHRASES.push(...sentences);
SCENARIOS.push(...interactions.map(x=>({prompt:x.context,choices:x.options,correct:x.correct,explain:x.reason})));
export {routines,stories,categories,rotate,compareOrdered,maskWord};
export const SYLLABLES=[
 ['PA','PA'],['MA','MAN'],['VÉ','LO'],['BA','NA','NE'],['MAI','SON'],
 ['SO','LEIL'],['CA','ROTTE'],['MU','SIQUE'],['CHO','CO','LAT'],
 ['TÉ','LÉ','PHONE'],['PA','PI','LLON'],['LI','VRE']
].map((parts,i)=>({parts,word:parts.join(''),emoji:['👨','👩','🚲','🍌','🏠','☀️','🥕','🎵','🍫','📱','🦋','📖'][i]}));
export const LETTERS=vocabulary.filter(item=>[...item.word].length>=4).map((item,i)=>({...item,at:1+i%([...item.word].length-2)}));
export const DIALOGUES=[
 ['Bonjour !',['Bonjour !','À demain','Je dors'],0],
 ['Veux-tu jouer ?',['Je n’ai pas le droit de répondre','Oui, avec plaisir !','Lundi'],1],
 ['Peux-tu répéter ?',['Parfois','J’ai un livre','Bien sûr, je répète.'],2],
 ['Merci pour ton aide.',['Avec plaisir !','La porte','Je cours'],0],
 ['Comment vas-tu ?',['Une pomme','Je vais bien, merci. Et toi ?','Une maison'],1],
 ['Veux-tu une pause ?',['Non, jamais','Un arbre','Oui, j’aimerais me reposer.'],2],
 ['Tu peux choisir.',['Je préfère lire.','Une voiture','Midi'],0],
 ['Je n’ai pas compris.',['Au revoir','D’accord, je peux reformuler.','J’ai faim'],1],
 ['Que voudrais-tu boire ?',['Une chaise','Un sac','De l’eau, s’il te plaît.'],2],
 ['Je préfère attendre.',['D’accord, prends ton temps.','Dépêche-toi','Tu n’as pas le droit'],0],
 ['Peux-tu m’aider ?',['Une fleur','Oui, comment puis-je aider ?','À gauche'],1],
 ['Je veux dire non.',['Tu dois dire oui','Je choisis pour toi','Tu as le droit de refuser.'],2]
].map(([prompt,choices,correct])=>({prompt,choices,correct}));
export const FEELINGS=[
 ['🙂','Content'],['😔','Triste'],['😤','En colère'],['😌','Calme'],['😴','Fatigué'],['😟','Inquiet'],
 ['🥰','Aimé'],['😮','Surpris'],['😳','Gêné'],['🤔','Curieux'],['😕','Perdu'],['😀','Enthousiaste']
].map(([emoji,label])=>({emoji,label}));
export const NEEDS=[
 ['💧','Je voudrais de l’eau.'],['🛋️','J’ai besoin d’une pause.'],['🤝','Peux-tu m’aider ?'],
 ['🔈','Peux-tu parler moins fort ?'],['🔁','Peux-tu répéter ?'],['📖','Je voudrais un livre.'],
 ['🎵','Je veux écouter de la musique.'],['🚶','Je voudrais sortir.'],['🖍️','Je voudrais dessiner.'],
 ['💬','Je voudrais parler avec toi.'],['👀','Montre-moi, s’il te plaît.'],['🛑','Je voudrais arrêter.']
].map(([emoji,label])=>({emoji,label}));
