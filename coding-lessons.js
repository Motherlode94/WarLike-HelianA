// A deliberately small, declarative introduction, not a WarScript interpreter.
export const challenges=Object.freeze([
 {id:'move',title:'Faire avancer le personnage',instruction:'Choisis la commande qui fait avancer le personnage.',choices:['Avancer()','Tourner()','Dire("Bonjour")'],correct:0,action:'move',help:'Avancer() déplace le personnage d’une case.'},
 {id:'turn',title:'Changer de direction',instruction:'Choisis la commande pour tourner vers la droite.',choices:['Dire("Bonjour")','Tourner()','Avancer()'],correct:1,action:'turn',help:'Tourner() change la direction du personnage.'},
 {id:'speak',title:'Afficher un message',instruction:'Choisis la commande pour dire bonjour.',choices:['Tourner()','Avancer()','Dire("Bonjour")'],correct:2,action:'speak',help:'Dire("Bonjour") affiche un message.'}
]);
export function nextCharacter(character,action){
 const current={x:Math.min(3,Math.max(0,Number(character?.x)||0)),direction:character?.direction==='right'?'right':'up',message:''};
 if(action==='move'){return {...current,x:Math.min(3,current.x+1)};}
 if(action==='turn'){return {...current,direction:'right'};}
 if(action==='speak'){return {...current,message:'Bonjour !'};}
 return current;
}
export function checkChoice(challenge,choice){
 return Number.isInteger(choice)&&choice===challenge.correct;
}
