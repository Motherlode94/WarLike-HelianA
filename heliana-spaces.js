import {switchMode} from './app.js';
import {resolveSpace} from './heliana-space-routes.js';
if(typeof document!=='undefined'){
 const panels=[...document.querySelectorAll('[data-space]')];
 let lastMode=null;
 function route(){const {space,mode}=resolveSpace(location.hash);if('speechSynthesis' in window)window.speechSynthesis.cancel();for(const panel of panels)panel.hidden=panel.dataset.space!==space;document.getElementById('settingsButton').setAttribute('aria-expanded',String(space==='settings'));if(space==='families')document.getElementById('familles').open=true;if(mode&&mode!==lastMode)switchMode(mode);lastMode=mode;const target=space==='workshop'?document.getElementById('lessonTitle'):panels.find(p=>p.dataset.space===space)?.querySelector('h1,h2,summary');if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}window.scrollTo(0,0);}
 document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{lastMode=button.dataset.mode;location.hash=button.dataset.mode;}));
 window.addEventListener('hashchange',route);route();
}
