import {normalizeText,speechRate,localFrenchVoices,collectVisibleText} from './read-aloud-core.js';
import {layoutFor} from './read-aloud-layout.js';
const config=document.querySelector('script[data-read-targets]');
const selectors=(config?.dataset.readTargets||'').split('|').filter(Boolean);
const answerSelectors=(config?.dataset.readAnswers||'').split('|').filter(Boolean);
const main=document.querySelector('main'),layout=layoutFor(location.pathname),host=layout&&document.querySelector(layout.host);
if(main&&host&&selectors.length){
 const synth=window.speechSynthesis;
 const panel=document.createElement('div');panel.className='read-aloud';panel.setAttribute('role','group');panel.setAttribute('aria-label','Lecture vocale de cette activité');
 const controls=document.createElement('div');controls.className='read-aloud-controls';panel.append(controls);
 const statusNode=document.createElement('p');statusNode.setAttribute('role','status');statusNode.setAttribute('aria-live','polite');panel.append(statusNode);
 function control(id,label,action){const existing=id&&document.getElementById(id);const button=existing||document.createElement('button');button.type='button';button.classList.add('read-aloud-button');button.textContent=label;button.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();action();},{capture:true});controls.append(button);return button;}
 let active=null,activeSelectors=selectors;
 function status(text){if(statusNode.textContent!==text)statusNode.textContent=text;}
 function stop(announce=false){const wasActive=!!active||!!synth?.speaking;active=null;synth?.cancel();if(announce&&wasActive)status('Lecture arrêtée.');else status('');}
 function play(which){if(!synth||!window.SpeechSynthesisUtterance){status('Lecture vocale indisponible sur cet appareil.');return;}const text=collectVisibleText(document,which);if(!text){status('Aucun texte disponible à écouter.');return;}const voice=localFrenchVoices(synth.getVoices())[0];if(!voice){status('Aucune voix française locale disponible.');return;}stop();const u=new SpeechSynthesisUtterance(normalizeText(text));u.voice=voice;u.lang=voice.lang;u.rate=speechRate(rate.value);active=u;activeSelectors=which;u.onend=()=>{if(active===u){active=null;status('');}};u.onerror=()=>{if(active===u){active=null;status('Lecture indisponible ou interrompue.');}};try{synth.speak(u);status('Lecture en cours.');}catch{active=null;status('Lecture indisponible.');}}
 const read=control(layout.read,'🔊 Écouter la question',()=>play(selectors));read.dataset.speech='play';
 const answers=control(null,'🔊 Écouter les réponses',()=>play(answerSelectors));answers.dataset.speech='answers';
 const stopButton=control(layout.stop,'■ Arrêter',()=>stop(true));stopButton.dataset.speech='stop';
 const details=document.createElement('details');details.className='read-aloud-options';const summary=document.createElement('summary');summary.textContent='Options vocales';details.append(summary);
 const extra=document.createElement('div');extra.className='read-aloud-extra';details.append(extra);
 const pause=document.createElement('button');pause.type='button';pause.textContent='Pause';pause.onclick=()=>{if(active&&synth.speaking){synth.pause();status('Lecture en pause.');}};extra.append(pause);
 const resume=document.createElement('button');resume.type='button';resume.textContent='Reprendre';resume.onclick=()=>{if(active&&synth.paused){synth.resume();status('Lecture reprise.');}};extra.append(resume);
 const label=document.createElement('label');label.textContent='Vitesse ';const rate=document.createElement('select');for(const [value,text] of [['.65','Lente'],['.85','Normale'],['1.05','Rapide']])rate.add(new Option(text,value));rate.value='.85';label.append(rate);extra.append(label);controls.append(details);
 const question=host.querySelector(layout.question)||document.querySelector(layout.question);
 if(question&&host.contains(question))question.after(panel);else host.prepend(panel);
 // Home and family guidance use the same toolbar in their own visible section.
 function placement(){if(location.pathname.endsWith('index.html')||location.pathname.endsWith('/')){const hash=location.hash;const destination=hash==='#familles'?document.querySelector('#familles'):!hash||hash==='#home'?document.querySelector('.welcome > div'):host;if(destination&&!destination.contains(panel)){if(destination===host&&question)question.after(panel);else destination.append(panel);}}
  answers.hidden=!answerSelectors.length||!collectVisibleText(document,answerSelectors);
  const objective=!!collectVisibleText(document,answerSelectors);read.textContent=objective?'🔊 Écouter la question':'🔊 Écouter le texte';
 }
 placement();window.addEventListener('hashchange',()=>{stop();placement();});window.addEventListener('pagehide',()=>stop());document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 const observer=new MutationObserver(()=>{if(active&&collectVisibleText(document,activeSelectors)!==active.text)stop();const shouldHide=!answerSelectors.length||!collectVisibleText(document,answerSelectors);if(answers.hidden!==shouldHide)answers.hidden=shouldHide;const label=shouldHide?'🔊 Écouter le texte':'🔊 Écouter la question';if(read.textContent!==label)read.textContent=label;});
 observer.observe(main,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['hidden','open']});
 if(!synth){for(const button of panel.querySelectorAll('button'))button.disabled=true;status('Lecture vocale indisponible. Le texte reste accessible.');}
}
