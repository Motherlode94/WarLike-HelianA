// Extra activities are declarative and run through the existing quiz UI.
// Symbols are teaching aids, not validated AAC pictograms.
export const EXTRA_GAMES=Object.freeze([
 {id:'colors',name:'Les couleurs',icon:'🎨',goal:'Reconnaître des couleurs'},
 {id:'numbers',name:'Les nombres',icon:'🔢',goal:'Identifier les nombres'},
 {id:'counting',name:'Je compte',icon:'🧮',goal:'Compter des objets'},
 {id:'shapes',name:'Les formes',icon:'🔷',goal:'Reconnaître des formes'},
 {id:'opposites',name:'Les contraires',icon:'↔️',goal:'Comparer deux notions'},
 {id:'directions',name:'Je me repère',icon:'🧭',goal:'Comprendre les directions'},
 {id:'patterns',name:'La suite logique',icon:'🧩',goal:'Observer une suite et la compléter'},
 {id:'everyday',name:'Je fais un choix',icon:'🌱',goal:'Pratiquer les choix et la vie quotidienne'}
]);
const q=(prompt,choices,correct,explanation)=>Object.freeze({prompt,choices:Object.freeze(choices),correct,explanation});
export const EXTRA_BANKS=Object.freeze({
 colors:[
  q('Quelle couleur est une fraise mûre ?',['Rouge','Bleu','Vert'],0,'Une fraise mûre est souvent rouge.'),
  q('Quelle couleur associe-t-on généralement au ciel clair ?',['Orange','Bleu','Violet'],1,'Un ciel clair paraît souvent bleu.'),
  q('Quelle couleur associe-t-on à une feuille verte ?',['Rouge','Jaune','Vert'],2,'Une feuille peut être verte.')
 ],
 numbers:[
  q('Quel nombre vient juste après 1 ?',['2','4','6'],0,'Après 1, on trouve 2.'),
  q('Quel chiffre représente trois ?',['7','3','9'],1,'Le chiffre 3 représente trois.'),
  q('Quel nombre vient juste avant 5 ?',['6','3','4'],2,'Juste avant 5, il y a 4.')
 ],
 counting:[
  q('Combien de pommes vois-tu ? 🍎 🍎',['2','3','4'],0,'Il y a deux pommes.'),
  q('Combien de ballons vois-tu ? 🎈 🎈 🎈',['1','3','5'],1,'Il y a trois ballons.'),
  q('Combien de fleurs vois-tu ? 🌸 🌸 🌸 🌸',['2','3','4'],2,'Il y a quatre fleurs.')
 ],
 shapes:[
  q('Quelle forme ressemble à une roue ?',['Cercle','Triangle','Carré'],0,'Une roue est généralement ronde.'),
  q('Quelle forme a trois côtés ?',['Cercle','Triangle','Rectangle'],1,'Un triangle a trois côtés.'),
  q('Quelle forme a quatre côtés de même longueur et quatre angles droits ?',['Triangle','Cercle','Carré'],2,'Un carré possède quatre côtés égaux et quatre angles droits.')
 ],
 opposites:[
  q('Quel est le contraire de « grand » ?',['Petit','Rapide','Lourd'],0,'Grand et petit sont des contraires.'),
  q('Quel est le contraire de « chaud » ?',['Haut','Froid','Clair'],1,'Chaud et froid sont des contraires.'),
  q('Quel est le contraire de « ouvert » ?',['Grand','Long','Fermé'],2,'Ouvert et fermé sont des contraires.')
 ],
 directions:[
  q('La flèche ← indique quelle direction ?',['Gauche','Droite','Haut'],0,'La flèche pointe vers la gauche.'),
  q('La flèche → indique quelle direction ?',['Bas','Droite','Gauche'],1,'La flèche pointe vers la droite.'),
  q('La flèche ↑ indique quelle direction ?',['Bas','Droite','Haut'],2,'La flèche pointe vers le haut.')
 ],
 patterns:[
  q('Complète : 🔴 🔵 🔴 🔵 🔴 ...',['🔵','🔴','🟢'],0,'La suite alterne rouge et bleu.'),
  q('Complète : ⭐ 🌙 ⭐ 🌙 ⭐ ...',['⭐','🌙','☀️'],1,'La suite alterne étoile et lune.'),
  q('Complète : 1, 2, 3, ...',['5','2','4'],2,'Après 3, vient 4.')
 ],
 everyday:[
  q('Tu as besoin de faire une pause. Que peux-tu dire ?',['Je voudrais une pause.','Je dois continuer.','Je ne peux rien dire.'],0,'Tu as le droit de demander une pause.'),
  q('Tu ne comprends pas une consigne. Que peux-tu faire ?',['Faire semblant','Demander de répéter','Abandonner obligatoirement'],1,'Demander une explication est possible.'),
  q('Une personne dit non à une activité. Que peux-tu faire ?',['Insister','Ignorer son avis','Respecter son choix'],2,'Un refus doit être respecté.')
 ]
});
export function selectExtraQuestion(id,round,level){
 const bank=EXTRA_BANKS[id];
 if(!bank||!Number.isInteger(round)||round<0)return null;
 const item=bank[round%bank.length];
 // Découverte: two choices, Pratique and Défi: three. Always retain correct answer.
 const available=level==='découverte'
  ?item.choices.map((value,index)=>({value,index})).filter((option)=>option.index===item.correct||option.index===(item.correct+1)%item.choices.length)
  :item.choices.map((value,index)=>({value,index}));
 return {...item,choices:available.map(option=>option.value),correct:available.findIndex(option=>option.index===item.correct)};
}
