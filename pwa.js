// Offline support is optional: never retain activity responses or personal information.
const offlineStatus=document.getElementById('offlineStatus');
const explain=message=>{if(offlineStatus)offlineStatus.textContent=message;};
const base=new URL('./',import.meta.url);
const CHECKED_FILES=['index.html','navigation.js','communication.html','warscript-junior.html','apprendre/index.html'];
async function resourcesAvailable(){
 if(!('caches' in window))return false;
 const urls=CHECKED_FILES.map(path=>new URL(path,base).href);
 const matches=await Promise.all(urls.map(url=>caches.match(url)));
 return matches.every(Boolean);
}
async function reportStatus(){
 if(!navigator.onLine){
  explain(await resourcesAvailable()?'Hors connexion : les activités installées sont disponibles.':'Hors connexion : certaines activités ne sont peut-être pas installées.');
 }else{
  explain(await resourcesAvailable()?'Mode hors ligne prêt : les activités publiques ont été installées.':'Mode hors ligne en préparation : une première connexion est nécessaire.');
 }
}
if('serviceWorker' in navigator&&window.isSecureContext){
 explain('Préparation du mode hors ligne…');
 window.addEventListener('load',async()=>{
  try{
   await navigator.serviceWorker.register('./service-worker.js',{scope:'./'});
   // Do not announce success just because registration returned: installation
   // and its complete static precache must succeed first.
   await navigator.serviceWorker.ready;
   await reportStatus();
  }catch{
   explain('Le mode hors connexion n’est pas disponible sur cet appareil.');
  }
 });
 window.addEventListener('online',()=>{void reportStatus()});
 window.addEventListener('offline',()=>{void reportStatus()});
}else explain('Le mode hors connexion n’est pas pris en charge ici.');
