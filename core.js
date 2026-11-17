// Generic lessons; no assumptions about any individual's understanding.
export const reads=[{emoji:'🍎',word:'POMME',choices:['CHAT','POMME','LUNE']},{emoji:'🐱',word:'CHAT',choices:['CHAT','MAISON','LIVRE']},{emoji:'☀️',word:'SOLEIL',choices:['SOLEIL','EAU','POMME']},{emoji:'🏠',word:'MAISON',choices:['LUNE','MAISON','CHAT']}];
export const writes=[{emoji:'👋',word:'BONJOUR'},{emoji:'💚',word:'MERCI'},{emoji:'👩‍👧',word:'MAMAN'},{emoji:'💧',word:'EAU'}];
export const symbols=[{emoji:'👋',text:'Bonjour'},{emoji:'✅',text:'Oui'},{emoji:'❌',text:'Non'},{emoji:'🤝',text:"J’ai besoin d’aide"},{emoji:'💧',text:"Je voudrais de l’eau"},{emoji:'🛋️',text:"Je veux une pause"},{emoji:'😊',text:'Je suis content ou contente'},{emoji:'😟',text:'Je ne me sens pas bien'},{emoji:'🔁',text:'Encore, s’il te plaît'}];
export const situations=[
 {title:'Prendre le temps',context:'Une personne met du temps à répondre à une question.',options:['Répéter rapidement en parlant plus fort','Attendre, puis proposer de reformuler ou un autre moyen de répondre','Répondre à sa place'],correct:1,reason:'Le temps de réponse varie. Laissez une pause et demandez si une aide est souhaitée.'},
 {title:'Ne pas deviner',context:'Une personne désigne une image, mais tu n’es pas sûr de ce qu’elle veut dire.',options:['Vérifier avec elle : « Tu veux dire ceci ? »','Ignorer son geste','Décider à sa place'],correct:0,reason:'Le sens d’un geste ou d’un pictogramme ne se présume pas. Confirmez le message avec la personne.'},
 {title:'Parler avec respect',context:'Tu accompagnes un adolescent ou un adulte ayant une trisomie 21.',options:['Lui parler comme à un petit enfant','Parler seulement à son accompagnant','Lui parler directement, avec des mots adaptés à sa préférence'],correct:2,reason:'Adressez-vous directement à la personne, quel que soit son âge, et adaptez le support sans infantiliser.'},
 {title:'Choix et consentement',context:'Une personne indique « non » quand tu proposes une activité.',options:['Respecter le refus et proposer une autre option si elle le souhaite','Insister jusqu’à obtenir un oui','Faire semblant de ne pas comprendre'],correct:0,reason:'Un refus est une communication. Vérifiez les besoins, mais respectez les choix et le consentement.'},
 {title:'Changer de canal',context:'La parole est difficile à comprendre dans un lieu bruyant.',options:['Parler beaucoup plus vite','Proposer calmement une image, un geste ou l’écriture, si cela convient','Abandonner la conversation'],correct:1,reason:'Plusieurs modes de communication peuvent se compléter. Demandez ce qui aide la personne.'}
];
export const normalizeWord=x=>String(x).normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().replace(/\s+/g,' ').toLocaleUpperCase('fr');
export function isReadingCorrect(item,response){return item.choices.includes(response)&&response===item.word}
export function isWritingCorrect(item,response){return normalizeWord(response)===normalizeWord(item.word)}
export function evaluateSituation(item,index){return Number.isSafeInteger(index)&&index>=0&&index<item.options.length&&index===item.correct}
export function appendSymbol(parts,text){return [...parts,text].slice(0,8)}
