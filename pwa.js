// Installs static lesson resources; never stores exercise answers or personal data.
const offlineStatus=document.getElementById('offlineStatus');
const explain=message=>{if(offlineStatus)offlineStatus.textContent=message;};
if('serviceWorker' in navigator&&window.isSecureContext){
 window.addEventListener('load',async()=>{
  try{
   await navigator.serviceWorker.register('./service-worker.js',{scope:'./'});
   explain(navigator.onLine?'Mode hors ligne : préparation terminée après installation des ressources.':'Hors connexion : les activités installées peuvent être utilisées.');
  }catch{explain('Le mode hors connexion n’est pas disponible sur cet appareil.');}
 });
 window.addEventListener('online',()=>explain('Connexion rétablie.'));
 window.addEventListener('offline',()=>explain('Hors connexion : ouvre une activité déjà installée.'));
}else explain('Le mode hors connexion n’est pas pris en charge ici.');
