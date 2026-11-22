// Curated, safe learning activities. Pedagogical pseudocode, not an executable WarScript interpreter.
// All activities are declarative: no user expressions are evaluated or executed.
export const LEVELS=Object.freeze([
 {id:'decouverte',label:'Découverte'},
 {id:'pratique',label:'Pratique'},
 {id:'defi',label:'Défi'}
]);
const activity=(id,level,topic,title,prompt,choices,correct,explanation,actions)=>Object.freeze({id,level,topic,title,prompt,choices:Object.freeze(choices),correct,explanation,actions:Object.freeze(actions)});
export const ACTIVITIES=Object.freeze([
 activity('d-move','decouverte','Déplacement','Faire un pas','Quelle commande fait avancer le personnage ?', ['Avancer()','Dire("Salut")','Tourner()'],0,'Avancer() déplace le personnage d’une case.',['move']),
 activity('d-turn','decouverte','Déplacement','Tourner à droite','Quelle commande change sa direction ?', ['Dire("Bonjour")','Tourner()','Avancer()'],1,'Tourner() oriente le personnage vers la droite.',['turn']),
 activity('d-hello','decouverte','Messages','Dire bonjour','Comment faire apparaître un petit message ?', ['Tourner()','Avancer()','Dire("Bonjour")'],2,'Dire affiche un message dans cette simulation.',['speak']),
 activity('p-sequence','pratique','Séquences','Deux pas','Que faut-il faire pour avancer de deux cases ?', ['Avancer() puis Avancer()','Tourner() puis Dire()','Dire() puis Tourner()'],0,'Une séquence exécute des actions dans un ordre choisi.',['move','move']),
 activity('p-order','pratique','Séquences','Avancer puis parler','Quelle suite avance et dit bonjour ?', ['Dire() puis Tourner()','Avancer() puis Dire("Bonjour")','Tourner() puis Avancer()'],1,'L’ordre des instructions change ce que l’on observe.',['move','speak']),
 activity('p-turn','pratique','Séquences','Tourner puis avancer','Choisis la suite demandée.', ['Avancer() puis Dire()','Avancer() puis Avancer()','Tourner() puis Avancer()'],2,'Deux actions peuvent être associées.',['turn','move']),
 activity('f-repeat','defi','Répétitions','Répéter un mouvement','Quelle idée permet de faire deux pas ?', ['Répéter 2 fois : Avancer()','Dire("Deux")','Tourner()'],0,'Une répétition permet de réutiliser une action.',['move','move']),
 activity('f-condition','defi','Conditions','Choisir une action','Si le chemin est libre, que doit faire le personnage ?', ['Dire("Stop")','Si chemin libre : Avancer()','Ne rien faire'],1,'Une condition aide à choisir une action en fonction d’une situation.',['move']),
 activity('f-plan','defi','Séquences','Préparer une petite histoire','Comment tourner, avancer puis parler ?', ['Avancer() puis Tourner()','Dire() puis Avancer()','Tourner() puis Avancer() puis Dire("Bonjour")'],2,'La combinaison des commandes crée une séquence plus longue.',['turn','move','speak'])
]);
export const activitiesForLevel=(level)=>ACTIVITIES.filter(a=>a.level===level);
export function evaluateChoice(activity,index){return Number.isInteger(index)&&index===activity.correct;}
export function applyActions(initial,actions){
 const state={position:Math.max(0,Math.min(3,Math.trunc(Number(initial?.position)||0))),direction:initial?.direction==='droite'?'droite':'haut',message:''};
 for(const action of actions){
  if(action==='move')state.position=Math.min(3,state.position+1);
  else if(action==='turn')state.direction='droite';
  else if(action==='speak')state.message='Bonjour !';
 }
 return state;
}
