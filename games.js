import {GAMES,LEVELS,PAIRS,PHRASES,SCENARIOS,poolSize,matchesWord,phraseIsCorrect,arrangeWords,checkScenario,makeMemoryCards,resolveMemoryTurn} from './games-core.js';
const $=id=>document.getElementById(id),target=$('gameContent'),feedback=$('gameFeedback');
let game='association',level='découverte',round=0,done=false,selectedWords=[],picked=[],matched=new Set(),lock=false;
const element=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node};
const button=(text,className,handler)=>{const node=element('button',className,text);node.type='button';node.addEventListener('click',handler);return node};
function say(text){if(!('speechSynthesis' in window)){feedback.textContent='Lecture vocale indisponible sur cet appareil.';return}try{speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='fr-FR';utterance.rate=.85;speechSynthesis.speak(utterance)}catch{feedback.textContent='Lecture vocale indisponible.'}}
function instruction(text){$('gameInstruction').textContent=text;if($('speakSetting').checked)say(text)}
function notify(text){feedback.textContent=text}
function finish(text){done=true;$('nextChallenge').hidden=false;notify(text)}
function chooseGame(id){if(!GAMES.some(g=>g.id===id))return;game=id;round=0;render()}
function reset(){done=false;selectedWords=[];picked=[];matched=new Set();lock=false;feedback.textContent='';$('nextChallenge').hidden=true;target.replaceChildren()}
function renderMenu(){$('gameMenu').replaceChildren();for(const g of GAMES){const b=button('', '',()=>chooseGame(g.id));b.append(element('span','',g.icon),document.createTextNode(g.name));if(g.id===game)b.setAttribute('aria-current','page');$('gameMenu').append(b)}}
function render(){reset();renderMenu();const selected=GAMES.find(g=>g.id===game);$('gameTitle').textContent=selected.name;$('gamePosition').textContent='JEU '+(GAMES.indexOf(selected)+1)+' / '+GAMES.length;
 if(game==='association')association();if(game==='phrase')sentence();if(game==='situation')situation();if(game==='memory')memory();
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
$('level').addEventListener('change',e=>{if(LEVELS.includes(e.target.value)){level=e.target.value;round=0;render()}});
$('bigSetting').addEventListener('change',e=>document.body.classList.toggle('large',e.target.checked));
$('restartGame').addEventListener('click',()=>{round=0;render()});
$('nextChallenge').addEventListener('click',()=>{round++;render()});
$('hearInstruction').addEventListener('click',()=>say($('gameInstruction').textContent));
render();
