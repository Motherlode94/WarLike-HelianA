// Shared, accessible, progressively enhanced site navigation.
// Navigation uses native links and <details> so it works without script after mounting.
export const helianaSections=Object.freeze([
 {label:'Accueil',href:'./',items:[{label:'Accueil',href:'./#home'},{label:'Les ateliers',href:'./#ateliers'},{label:'Ma planche de communication',href:'./communication.html'},{label:'Réglages',href:'./#settings'}]},
 {label:'Apprendre',href:'./pathways.html',items:[{label:'Parcours pédagogiques',href:'./pathways.html'},{label:'Lire les syllabes',href:'./reading.html'},{label:'Je lis',href:'./#read'},{label:'J’écris',href:'./#write'},{label:'Je m’exprime',href:'./#talk'},{label:'On se comprend',href:'./#understand'}]},
 {label:'Jouer',href:'./games.html',items:[{label:'Les 20 mini-jeux',href:'./games.html'},{label:'Activités guidées',href:'./pathways.html'},{label:'Mathématiques visuelles',href:'./maths.html'}]},
 {label:'Créer',href:'./coding.html',items:[{label:'Découvrir WarScript',href:'./coding.html'},{label:'Learning Studio',href:'./learning-studio.html'},{label:'Mon personnage',href:'./coding.html#preview'},{label:'Dessin et alphabet',href:'./writing.html'},{label:'Atelier créatif',href:'./creativity.html'}]},
 {label:'Accompagner',href:'./#familles',items:[{label:'Familles et professionnels',href:'./#familles'},{label:'Espace accompagnants',href:'./educator.html'},{label:'Conseils pour les parcours',href:'./pathways.html#pathwayMain'},{label:'Histoires illustrées',href:'./stories.html'},{label:'Fiches imprimables',href:'./resources.html'}]}
]);
export function currentSection(pathname){
 const path=String(pathname||'/').split('/').pop()||'index.html';
 if(path==='coding.html'||path==='learning-studio.html'||path==='writing.html'||path==='creativity.html')return 'Créer';
 if(path==='games.html'||path==='maths.html')return 'Jouer';
 if(path==='pathways.html'||path==='reading.html')return 'Apprendre';
 if(path==='stories.html'||path==='educator.html'||path==='resources.html')return 'Accompagner';
 return 'Accueil';
}
export function buildNavigation(doc,pathname){
 const nav=doc.createElement('nav');nav.className='heliana-site-nav';nav.setAttribute('aria-label','Navigation principale');nav.id='helianaSiteNav';
 const current=currentSection(pathname);
 for(const section of helianaSections){
  const group=doc.createElement('details');group.className='heliana-nav-group';
  const summary=doc.createElement('summary');summary.textContent=section.label;
  if(section.label===current){group.classList.add('is-current');summary.setAttribute('aria-current','page');}
  group.append(summary);
  const list=doc.createElement('ul');
  for(const item of section.items){
   const li=doc.createElement('li'),a=doc.createElement('a');a.href=item.href;a.textContent=item.label;
   li.append(a);list.append(li);
  }
  group.append(list);nav.append(group);
 }
 return nav;
}
export function mountNavigation(doc=globalThis.document){
 const header=doc.querySelector('body > header');
 if(!header||doc.getElementById('helianaSiteNav'))return null;
 const nav=buildNavigation(doc,globalThis.location?.pathname||'/');
 header.insertAdjacentElement('afterend',nav);
 // Closing another group avoids multiple overlapping mobile dropdowns.
 nav.querySelectorAll('details').forEach(details=>details.addEventListener('toggle',()=>{
  if(details.open)nav.querySelectorAll('details').forEach(other=>{if(other!==details)other.open=false;});
 }));
 doc.addEventListener('keydown',event=>{
  if(event.key==='Escape')nav.querySelectorAll('details[open]').forEach(details=>{details.open=false;details.querySelector('summary')?.focus();});
 });
 return nav;
}
if(typeof document!=='undefined')mountNavigation(document);
