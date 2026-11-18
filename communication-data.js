// Generic, editable-free communication examples. Not a certified AAC vocabulary.
// Each person and their support team must decide which meanings are appropriate.
export const BOARD_CATEGORIES=Object.freeze([
 {id:'all',label:'Tous les messages'},
 {id:'needs',label:'Mes besoins'},
 {id:'choices',label:'Mes choix'},
 {id:'exchange',label:'Échanger'}
]);
export const BOARD_ITEMS=Object.freeze([
 {id:'water',category:'needs',icon:'💧',label:'Je voudrais de l’eau'},
 {id:'pause',category:'needs',icon:'🛋️',label:'Je veux une pause'},
 {id:'help',category:'needs',icon:'🤝',label:'J’ai besoin d’aide'},
 {id:'toilet',category:'needs',icon:'🚻',label:'Je voudrais aller aux toilettes'},
 {id:'comfortable',category:'needs',icon:'🪑',label:'Je voudrais changer de position'},
 {id:'yes',category:'choices',icon:'✅',label:'Oui'},
 {id:'no',category:'choices',icon:'❌',label:'Non'},
 {id:'stop',category:'choices',icon:'✋',label:'Arrête, s’il te plaît'},
 {id:'another',category:'choices',icon:'🔁',label:'Je veux autre chose'},
 {id:'again',category:'choices',icon:'🔄',label:'Encore, s’il te plaît'},
 {id:'hello',category:'exchange',icon:'👋',label:'Bonjour'},
 {id:'thanks',category:'exchange',icon:'💚',label:'Merci'},
 {id:'understand',category:'exchange',icon:'❓',label:'Je n’ai pas compris'},
 {id:'repeat',category:'exchange',icon:'🗣️',label:'Peux-tu répéter ?'},
 {id:'goodbye',category:'exchange',icon:'👋',label:'Au revoir'}
]);
export function categoryItems(category='all'){
 return BOARD_ITEMS.filter(item=>category==='all'||item.category===category);
}
export function selection(items=BOARD_ITEMS,ids=[]){
 const allowed=new Set(ids);
 return items.filter(item=>allowed.has(item.id));
}
export function addMessage(messages,text,max=8){
 if(typeof text!=='string'||!text.trim())return [...messages];
 return [...messages,text].slice(-max);
}
