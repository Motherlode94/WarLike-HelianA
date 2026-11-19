// WarScript Junior: beginner visual instructions. No runtime code execution.
export const JUNIOR_COMMANDS=Object.freeze([
 {id:'forward',label:'Avancer',symbol:'↑',help:'Avance d’une case'},
 {id:'left',label:'Tourner à gauche',symbol:'↶',help:'Tourne sans avancer'},
 {id:'right',label:'Tourner à droite',symbol:'↷',help:'Tourne sans avancer'}
]);
export const JUNIOR_LEVELS=Object.freeze([
 {id:'first',name:'Mes premiers pas',start:[0,3,0],goal:[2,3],max:6,tip:'Deux fois avancer suffit pour atteindre l’étoile.'},
 {id:'turn',name:'Je découvre les virages',start:[0,3,0],goal:[1,2],max:8,tip:'Avance, tourne à gauche, puis avance encore.'},
 {id:'path',name:'Mon petit parcours',start:[0,3,0],goal:[2,1],max:12,tip:'Combine des déplacements et des virages. Tu peux tout recommencer.'}
]);
export const facing=Object.freeze([[1,0],[0,-1],[-1,0],[0,1]]);
export function runProgram(commands,level=JUNIOR_LEVELS[0]){
 let [x,y,direction]=level.start;
 const history=[{x,y,direction}];let blocked=false;
 for(const command of commands){
  if(command==='left')direction=(direction+1)%4;
  else if(command==='right')direction=(direction+3)%4;
  else if(command==='forward'){
   const [dx,dy]=facing[direction];const nx=x+dx,ny=y+dy;
   if(nx<0||nx>3||ny<0||ny>3){blocked=true;break}
   x=nx;y=ny;
  }else continue;
  history.push({x,y,direction});
 }
 return {x,y,direction,history,blocked,success:!blocked&&x===level.goal[0]&&y===level.goal[1]};
}
export function toWarScript(commands){
 let direction=0;const lines=['// Exemple WarScript pour WarLike Engine','// Les commandes sont exécutées une fois au démarrage.','Start() {','    Log("Bonjour, je programme !");'];
 for(const command of commands){
  if(command==='left'){lines.push('    Rotate(90);');direction=(direction+1)%4}
  else if(command==='right'){lines.push('    Rotate(-90);');direction=(direction+3)%4}
  else if(command==='forward'){const [dx,dy]=facing[direction];lines.push('    Move('+dx+', '+(-dy)+', 0);')}
 }
 return [...lines,'}'].join('\n');
}
