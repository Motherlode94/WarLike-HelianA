import {EXCHANGES,nextExchange} from './duo-practice-data.js';
const $=id=>document.getElementById(id);
let index=0,swapped=false;
function render(){
 const item=EXCHANGES[index];
 $('duoStep').textContent='Échange '+(index+1)+' sur '+EXCHANGES.length;
 $('duoTitle').textContent=item.title;
 $('duoPrompt').textContent=item.prompt;
 $('firstRole').textContent=swapped?'Personne B — je m’exprime':'Personne A — je m’exprime';
 $('secondRole').textContent=swapped?'Personne A — j’écoute':'Personne B — j’écoute';
 $('firstDirection').textContent=item.a;
 $('secondDirection').textContent=item.b;
 $('duoCheck').textContent='Pour vérifier ensemble : « '+item.check+' »';
 $('goPrevious').disabled=index===0;
 $('goNext').textContent=index===EXCHANGES.length-1?'Recommencer les échanges →':'Échange suivant →';
}
function advance(){
 if(index===EXCHANGES.length-1){index=0;swapped=false;}
 else index=nextExchange(index);
 render();$('duoTitle').focus();
}
$('goNext').addEventListener('click',advance);
$('passExercise').addEventListener('click',()=>{advance();$('duoStatus').textContent='Passer est un choix respecté.'});
$('goPrevious').addEventListener('click',()=>{index=Math.max(0,index-1);render();$('duoTitle').focus()});
$('swapRoles').addEventListener('click',()=>{swapped=!swapped;render();$('duoStatus').textContent='Rôles inversés. Chacun reste libre de passer.'});
$('startOver').addEventListener('click',()=>{index=0;swapped=false;render();$('duoTitle').focus();$('duoStatus').textContent='Nouvelle série d’échanges.'});
render();
