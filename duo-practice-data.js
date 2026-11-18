// Conversation invitations, never scores or inferred consent.
export const EXCHANGES=Object.freeze([
 {id:'choice',title:'Choisir une activité',prompt:'Que voudrais-tu faire maintenant ?',a:'Montre, dis ou écris une activité qui te plaît.',b:'Propose deux options au maximum, puis attends une réponse.',check:'Ai-je bien compris ton choix ?'},
 {id:'refusal',title:'Respecter un refus',prompt:'Et si la réponse est non ?',a:'Tu peux répondre non, montrer une carte ou ne pas répondre.',b:'Accueille le refus sans insister. Demande si une autre proposition est bienvenue.',check:'Veux-tu une autre proposition ou préfères-tu arrêter ?'},
 {id:'help',title:'Demander de l’aide',prompt:'Quelle aide serait utile ?',a:'Montre ce que tu aimerais essayer seul, et ce qui nécessite de l’aide.',b:'Demande avant de toucher aux objets ou de faire à la place.',check:'Souhaites-tu mon aide ou préfères-tu essayer seul ?'},
 {id:'pause',title:'Faire une pause',prompt:'Veux-tu continuer ou faire une pause ?',a:'Tu peux utiliser le geste, le mot ou la carte « pause ».',b:'Laisse le temps de répondre ; une pause ne doit pas être justifiée.',check:'Je respecte ton choix. Veux-tu reprendre plus tard ?'},
 {id:'clarify',title:'Vérifier un message',prompt:'Comment vérifier ce qui a été exprimé ?',a:'Exprime quelque chose avec les moyens qui te conviennent.',b:'Reformule avec prudence et demande confirmation ; ne déduis pas une intention.',check:'Est-ce bien ce que tu voulais dire ?'},
 {id:'story',title:'Partager un souvenir',prompt:'As-tu envie de raconter quelque chose ?',a:'Raconte ou montre un souvenir, ou choisis de passer.',b:'Écoute sans interrompre et pose une question seulement si elle est bienvenue.',check:'Tu veux en dire plus, changer de sujet ou terminer ?'}
]);
export function nextExchange(index,total=EXCHANGES.length){
 return Math.max(0,Math.min(total-1,index+1));
}
