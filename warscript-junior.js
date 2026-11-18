import {JUNIOR_LEVELS,JUNIOR_COMMANDS,runProgram,toWarScript} from './warscript-junior-core.js';
const $=id=>document.getElementById(id);
let steps=[],result=null;
const labels=Object.fromEntries(JUNIOR_COMMANDS.map(item=>[item.id,item.label]));
const arrows=['→','↑','←','↓'];
function currentLevel(){return JUNIOR_LEVELS.find(item=>item.id===$('juniorLevel').value)||JUNIOR_LEVELS[0]}
function drawBoard(){
 const level=currentLevel(),state=result||runProgram([],level),board=$('juniorBoard');
 board.replaceChildren();
 for(let y=0;y<4;y++)for(let x=0;x<4;x++){
  const cell=document.createElement('div');cell.className='junior-tile';
  const goal=level.goal[0]===x&&level.goal[1]===y;
  if(goal){cell.classList.add('goal');const star=document.createElement('span');star.textContent='★';star.setAttribute('aria-hidden','true');cell.append(star)}
  if(state.x===x&&state.y===y){const robot=document.createElement('strong');robot.textContent=arrows[state.direction];robot.className='junior-robot';robot.setAttribute('aria-hidden','true');cell.append(robot)}
  board.append(cell);
 }
 $('juniorPosition').textContent='Le robot est à la colonne '+(state.x+1)+', ligne '+(state.y+1)+'. L’étoile est à la colonne '+(level.goal[0]+1)+', ligne '+(level.goal[1]+1)+'.';
 board.setAttribute('aria-label',$('juniorPosition').textContent);
}
function render(){
 result=null;const level=currentLevel();$('programList').replaceChildren();
 for(const cmd of steps){const li=document.createElement('li');li.textContent=labels[cmd]||cmd;$('programList').append(li)}
 $('removeCommand').disabled=!steps.length;$('resetProgram').disabled=!steps.length;$('runProgram').disabled=!steps.length;
 $('juniorTip').textContent=level.tip;
 $('warScriptExample').textContent=toWarScript(steps);
 drawBoard();
}
function add(command){
 const level=currentLevel();
 if(steps.length>=level.max){$('juniorFeedback').textContent='Tu as déjà choisi '+level.max+' instructions. Essaie ton programme !';return}
 steps.push(command);$('juniorFeedback').textContent='Commande ajoutée. Tu peux continuer ou lancer le robot.';render();
}
$('cmdForward').addEventListener('click',()=>add('forward'));
$('cmdLeft').addEventListener('click',()=>add('left'));
$('cmdRight').addEventListener('click',()=>add('right'));
$('removeCommand').addEventListener('click',()=>{steps.pop();render();$('juniorFeedback').textContent='Dernière commande retirée.'});
$('resetProgram').addEventListener('click',()=>{steps=[];render();$('juniorFeedback').textContent='Tu peux recommencer à ton rythme.'});
$('juniorLevel').addEventListener('change',()=>{steps=[];render();$('juniorFeedback').textContent='Nouvelle aventure !'});
$('runProgram').addEventListener('click',()=>{
 result=runProgram(steps,currentLevel());drawBoard();
 $('juniorFeedback').textContent=result.blocked?'Le robot atteint le bord. Change une instruction et réessaie.':result.success?'Bravo, ton robot a trouvé l’étoile !':'Ton robot s’est déplacé. Essaie un autre chemin pour trouver l’étoile.';
});
$('showCode').addEventListener('change',event=>{$('codePanel').hidden=!event.target.checked});
render();
