import {EXTRA_BANKS,selectExtraQuestion} from './games-extra.js';
import {GAMES,LEVELS,PAIRS,PHRASES,SCENARIOS,poolSize,matchesWord,phraseIsCorrect,arrangeWords,checkScenario,makeMemoryCards,resolveMemoryTurn,SYLLABLES,LETTERS,DIALOGUES,FEELINGS,NEEDS,routines,stories,categories,rotate,compareOrdered,maskWord} from './games-core.js';
const $=id=>document.getElementById(id),target=$('gameContent'),feedback=$('gameFeedback');
let game='association',level='découverte',round=0,done=false,selectedWords=[],picked=[],matched=new Set(),lock=false;
const element=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node};
const button=(text,className,handler)=>{const node=element('button',className,text);node.type='button';node.addEventListener('click',handler);return node};
function say(text){if(!('speechSynthesis' in window)){feedback.textContent='Lecture vocale indisponible sur cet appareil.';return}try{speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='fr-FR';utterance.rate=.85;speechSynthesis.speak(utterance)}catch{feedback.textContent='Lecture vocale indisponible.'}}
function instruction(text){$('gameInstruction').textContent=text;if($('speakSetting').checked)say(text)}
function notify(text){feedback.textContent=text}
function finish(text){done=true;$('nextChallenge').hidden=false;notify(text)}
function chooseGame(id){if(!GAMES.some(g=>g.id===id))return;game=id;round=0;render();$('gameTitle').focus()}
function reset(){done=false;selectedWords=[];picked=[];matched=new Set();lock=false;feedback.textContent='';$('nextChallenge').hidden=true;target.replaceChildren()}
function renderMenu(){$('gameMenu').replaceChildren();for(const g of GAMES){const b=button('', '',()=>chooseGame(g.id));b.append(element('span','',g.icon),document.createTextNode(g.name));if(g.id===game)b.setAttribute('aria-current','page');$('gameMenu').append(b)}}
function render(){reset();renderMenu();const selected=GAMES.find(g=>g.id===game);$('gameTitle').textContent=selected.name;$('gamePosition').textContent='JEU '+(GAMES.indexOf(selected)+1)+' / '+GAMES.length;
 if(game==='association')association();if(game==='phrase')sentence();if(game==='situation')situation();if(game==='memory')memory();
 if(Object.hasOwn(EXTRA_BANKS,game))extraQuizGame();
 const more={syllables:syllableGame,letters:lettersGame,sequence:sequenceGame,dialogue:dialogueGame,feelings:feelingsGame,needs:needsGame,reading:readingGame,sorting:sortingGame};more[game]?.();
}
function extraQuizGame(){
 const item=selectExtraQuestion(game,round,level);
 if(!item)return;
 quizGame(item.prompt,item.choices,item.correct,item.explanation);
}
function association(){const count=poolSize(level),item=PAIRS[round%PAIRS.length],options=[item,...PAIRS.filter(p=>p.word!==item.word).slice(0,count)].sort((a,b)=>a.word.localeCompare(b.word,'fr'));
 instruction('Regarde le symbole. Choisis le mot qui correspond.');const picture=element('div','game-target');picture.setAttribute('role','img');picture.setAttribute('aria-label',item.word.toLowerCase());picture.append(element('strong','',item.emoji));const choices=element('div','game-options');
 for(const p of options){const b=button(p.word,'',()=>{if(done)return;if(matchesWord(p.word,item.word)){for(const opt of choices.children)opt.disabled=true;finish('Bien joué ! Tu as trouvé le bon mot.')}else notify('Tu peux réessayer, sans te presser.')});choices.append(b)}
 target.append(picture,choices);
}
function sentence(){const item=PHRASES[round%PHRASES.length],tokens=arrangeWords(item.words);instruction('Construis cette phrase : '+item.prompt+'. Appuie sur les mots dans le bon ordre.');
 const board=element('div','spoken-phrase','Choisis les mots un à un.'),bank=element('div','word-bank'),tools=element('div','game-tools');
 function draw(){board.textContent=selectedWords.map(t=>t.word).join(' ')||'Choisis les mots un à un.';bank.replaceChildren();for(const t of tokens){const b=button(t.word,'word-piece',()=>{if(done||selectedWords.some(w=>w.id===t.id))return;selectedWords.push(t);draw()});b.disabled=selectedWords.some(w=>w.id===t.id);bank.append(b)}}
 tools.append(button('↶ Retirer un mot','',()=>{if(!done){selectedWords.pop();draw()}}),button('Vérifier','',()=>{if(done)return;if(phraseIsCorrect(selectedWords.map(t=>t.word),item.words))finish('Bien joué ! Ta phrase est complète.');else notify('Essaie encore. Tu peux retirer un mot.')}),button('🔊 Écouter le modèle','',()=>say(item.words.join(' '))));target.append(board,bank,tools);draw();
}
function situation(){const item=SCENARIOS[round%SCENARIOS.length];instruction('Lis la situation et choisis une manière respectueuse de réagir.');target.append(element('div','scenario',item.prompt));const choices=element('div','game-options scenario-choices');
 for(let i=0;i<item.choices.length;i++){const b=button(item.choices[i],'',()=>{if(done)return;if(checkScenario(item,i)){for(const other of choices.children)other.disabled=true;finish('Bonne réponse. '+item.explain)}else notify('Regardons une autre possibilité : comment respecter le choix de la personne ?')});choices.append(b)}
 target.append(choices);
}
function memory(){const cards=makeMemoryCards(PAIRS,poolSize(level));instruction('Retourne deux cartes pour retrouver les mêmes images. Aucun chronomètre !');const grid=element('div','memory-grid'),buttons=new Map();
 function refresh(){for(const card of cards){const b=buttons.get(card.id),open=picked.includes(card.id)||matched.has(card.pair);b.textContent=open?card.symbol:'?';b.setAttribute('aria-label',open?'Image '+card.symbol:'Carte cachée');b.setAttribute('aria-pressed',String(open));b.disabled=matched.has(card.pair)||lock||done}}
 for(const card of cards){const b=button('?','memory-card',()=>{if(lock||done||matched.has(card.pair)||picked.includes(card.id))return;picked.push(card.id);refresh();if(picked.length!==2)return;const result=resolveMemoryTurn(cards,picked[0],picked[1]);if(result.matched){matched.add(card.pair);picked=[];notify('Deux images identiques !');refresh();if(matched.size===poolSize(level))finish('Tu as retrouvé toutes les paires. Bravo !')}else{lock=true;notify('Ce ne sont pas les mêmes images. Observe-les et réessaie.');refresh();}});buttons.set(card.id,b);grid.append(b)}
 const tools=element('div','game-tools');tools.append(button('Retourner les cartes cachées','',()=>{if(!lock)return;picked=[];lock=false;notify('Essaie une autre paire.');refresh()}));target.append(grid,tools);refresh();
}

// Flexible multi-step controls shared by syllables and everyday routines.
// Touch, pointer and keyboard activate the same native button controls.
function orderedGame(title,tokens,expected,success){
 instruction(title);
 const board=element('div','spoken-phrase'),bank=element('div','word-bank'),tools=element('div','game-tools');
 const choices=tokens.map((word,id)=>({word,id})).reverse();
 function draw(){
  board.textContent=selectedWords.map(t=>t.word).join(' → ')||'Choisis le premier élément.';
  bank.replaceChildren();
  for(const t of choices){
   const b=button(t.word,'word-piece',()=>{if(done||selectedWords.some(w=>w.id===t.id))return;selectedWords.push(t);draw()});
   b.disabled=selectedWords.some(w=>w.id===t.id);bank.append(b);
  }
 }
 tools.append(button('↶ Retirer le dernier','',()=>{if(!done){selectedWords.pop();draw()}}),
  button('Vérifier','',()=>{if(done)return;if(compareOrdered(selectedWords.map(t=>t.word),expected))finish(success);else notify('Tu peux essayer encore et changer l’ordre.')}));target.append(board,bank,tools);draw();
}
function syllableGame(){
 const item=SYLLABLES[round%SYLLABLES.length];
 orderedGame('Recompose le mot '+item.word+' en choisissant les syllabes.',item.parts,item.parts,'Bravo ! Les syllabes sont dans le bon ordre.');
 target.prepend(element('div','game-target',item.emoji+' '+item.word));
}
function lettersGame(){
 const item=LETTERS[round%LETTERS.length],letter=[...item.word][item.at],letters=[...new Set([letter,...['A','E','I','O','U','R','S','T','L'].filter(l=>l!==letter)])].slice(0,poolSize(level)+1);
 instruction('Quelle lettre manque dans ce mot ?');
 target.append(element('div','game-target',item.emoji+' '+maskWord(item.word,item.at)));
 const grid=element('div','game-options');
 for(const current of rotate(letters,round+1)){
  const b=button(current,'',()=>{if(done)return;if(current===letter){for(const other of grid.children)other.disabled=true;finish('Tu as complété le mot '+item.word+'.')}else notify('Essaie une autre lettre.');});grid.append(b);
 }target.append(grid);
}
function sequenceGame(){
 const item=routines[round%routines.length];
 orderedGame('Remets dans l’ordre : '+item.prompt+'.',item.steps,item.steps,'Tu as retrouvé les étapes dans le bon ordre.');
}
function quizGame(prompt,options,correct,explanation){
 instruction(prompt);
 const grid=element('div','game-options scenario-choices');
 for(let i=0;i<options.length;i++){
  const b=button(options[i],'',()=>{if(done)return;if(i===correct){for(const other of grid.children)other.disabled=true;finish(explanation||'Bonne réponse !')}else notify('Essaie encore. Tu peux prendre ton temps.')});
  grid.append(b);
 }target.append(grid);
}
function dialogueGame(){
 const item=DIALOGUES[round%DIALOGUES.length];
 target.append(element('div','scenario',item.prompt));
 quizGame('Que pourrais-tu répondre ?',item.choices,item.correct,'Cette réponse permet de poursuivre l’échange. Tu peux aussi choisir tes propres mots.');
}
function feelingsGame(){
 const item=FEELINGS[round%FEELINGS.length];
 instruction('Explore des mots pour parler de ce que TU ressens. Il n’y a pas de bonne ou de mauvaise émotion.');
 const grid=element('div','game-options');
 for(const feeling of rotate(FEELINGS,round).slice(0,level==='découverte'?4:level==='pratique'?8:12)){
  const b=button(feeling.emoji+' '+feeling.label,'',()=>{
   notify('Tu as choisi : '+feeling.label+'. Tu peux garder ce choix, en sélectionner un autre ou l’exprimer autrement.');
   $('nextChallenge').hidden=false;if($('speakSetting').checked)say('Je me sens '+feeling.label.toLowerCase());
  });grid.append(b);
 }
 const info=element('p','game-feedback-help','Il n’est pas nécessaire de deviner l’émotion d’une autre personne à partir de son visage.');
 target.append(info,grid);
}
function needsGame(){
 const item=NEEDS[round%NEEDS.length];
 instruction('Choisis une demande que tu veux exprimer. Tu peux la modifier ou simplement écouter.');
 target.append(element('div','game-target',item.emoji),element('p','spoken-phrase',item.label));
 const actions=element('div','game-tools');
 actions.append(button('🔊 Dire cette phrase','',()=>say(item.label)),button('Je choisis cette demande','',()=>{notify('Ta demande compte. Elle peut aussi être exprimée par geste, parole ou image.');$('nextChallenge').hidden=false;}));
 target.append(actions);
}
function readingGame(){
 const item=stories[round%stories.length];
 instruction('Lis cette courte histoire puis choisis une réponse.');
 target.append(element('div','scenario',item.text),element('p','',item.question));
 quizGame(item.question,item.choices,item.correct,'Tu as compris le passage. Bravo !');
}
function sortingGame(){
 const item=categories[round%categories.length],index=round%item.items.length;
 const good=item.items[index],wrong=item.others[(round+1)%item.others.length];
 instruction('Choisis ce qui appartient à la catégorie : '+item.title+'.');
 const grid=element('div','game-options');
 for(const choice of rotate([good,wrong],round)){
  const b=button(choice,'',()=>{if(done)return;if(choice===good){for(const other of grid.children)other.disabled=true;finish('Bien vu ! '+good+' appartient à la catégorie '+item.title+'.')}else notify('Ce n’est pas dans cette catégorie. Essaie l’autre choix.');});grid.append(b);
 }target.append(grid);
}

$('level').addEventListener('change',e=>{if(LEVELS.includes(e.target.value)){level=e.target.value;round=0;render()}});
$('bigSetting').addEventListener('change',e=>document.body.classList.toggle('large',e.target.checked));
$('restartGame').addEventListener('click',()=>{round=0;render();$('gameTitle').focus()});
$('nextChallenge').addEventListener('click',()=>{round++;render();$('gameTitle').focus()});
$('hearInstruction').addEventListener('click',()=>say($('gameInstruction').textContent));
$('stopGameVoice').addEventListener('click',()=>{if('speechSynthesis' in window)speechSynthesis.cancel()});
render();
