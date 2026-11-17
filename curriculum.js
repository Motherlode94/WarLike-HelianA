// Contenus additionnels éducatifs : aucune hypothèse sur les compétences ou l'âge.
export const vocabulary=[
 ['🚲','VÉLO'],['🚌','BUS'],['🌙','LUNE'],['🌞','SOLEIL'],['🥕','CAROTTE'],['🍞','PAIN'],
 ['🧥','MANTEAU'],['👟','CHAUSSURE'],['✉️','LETTRE'],['📱','TÉLÉPHONE'],['🌳','ARBRE'],['🪑','CHAISE'],
 ['🧼','SAVON'],['🔑','CLÉ'],['🕰️','HORLOGE'],['🧃','JUS'],['🎵','MUSIQUE'],['🍌','BANANE'],
 ['🌻','FLEUR'],['🚪','PORTE'],['🚆','TRAIN'],['📚','LIVRES'],['🎨','DESSIN'],['🧸','JOUET'],
 ['🍽️','REPAS'],['☂️','PARAPLUIE'],['🏫','ÉCOLE'],['🛏️','LIT'],['🧊','GLACE'],['🎁','CADEAU'],
 ['🏞️','PARC'],['🐶','CHIEN'],['🦋','PAPILLON'],['🍇','RAISIN'],['🧹','BALAI'],['⚽','BALLON']
].map(([emoji,word])=>({emoji,word}));
export const expressions=[
 ['J’ai besoin d’aide','🤝'],['Je voudrais de l’eau','💧'],['Je veux une pause','🛋️'],
 ['Je veux parler','💬'],['Je n’ai pas compris','❔'],['Peux-tu répéter ?','🔁'],
 ['Je veux dessiner','🎨'],['Je voudrais écouter de la musique','🎵'],['Je veux jouer','🎲'],
 ['Je suis fatigué','😴'],['Je suis content','😊'],['Je suis triste','😔'],
 ['Je voudrais sortir','🚶'],['Je voudrais rester','🏠'],['Je préfère autre chose','🔄'],
 ['Non, merci','✋'],['Oui, s’il te plaît','✅'],['Puis-je choisir ?','🧩'],
 ['Je veux un endroit calme','🌿'],['Merci pour ton aide','💚'],['Je veux lire','📖'],
 ['J’ai faim','🍽️'],['Je souhaite écrire','✏️'],['Je voudrais te montrer quelque chose','👀']
].map(([text,emoji])=>({text,emoji}));
export const sentences=[
 ['Dire bonjour','Bonjour à tout le monde'],['Demander un livre','Je voudrais un livre'],
 ['Demander de répéter','Peux-tu répéter s’il te plaît'],['Dire que tu es fatigué','Je suis fatigué'],
 ['Remercier','Merci pour ton aide'],['Choisir une activité','Je préfère dessiner'],
 ['Proposer de jouer','Veux-tu jouer avec moi'],['Demander de patienter','Attends un instant s’il te plaît'],
 ['Demander un crayon','Puis-je avoir un crayon'],['Dire une préférence','J’aime écouter de la musique'],
 ['Exprimer un refus','Non merci pas maintenant'],['Chercher un lieu calme','Je veux un endroit calme'],
 ['Exprimer une émotion','Je me sens content'],['Dire que tu ne comprends pas','Je n’ai pas compris'],
 ['Demander un conseil','Peux-tu me conseiller'],['Proposer une activité','On peut aller au parc'],
 ['Demander à écrire','Je veux écrire une lettre'],['Demander de choisir','Je voudrais choisir moi-même']
].map(([prompt,text])=>({prompt,words:text.split(' ')}));
export const interactions=[
 ['Demande de temps','Une personne hésite avant de répondre.','Je lui laisse du temps','Je réponds à sa place','Je la presse','Le temps nécessaire pour répondre varie.'],
 ['Vérifier le message','Tu ne comprends pas un geste.','Je demande si j’ai bien compris','Je décide du sens','Je l’ignore','Il vaut mieux confirmer le message.'],
 ['Choix du repas','Une personne veut choisir son déjeuner.','Je lui propose des options compréhensibles','Je choisis sans demander','Je m’adresse seulement à un proche','Elle a le droit de choisir.'],
 ['Un refus','La personne dit non à une activité.','Je respecte le refus','Je la force','Je fais semblant de ne pas entendre','Un refus est une réponse.'],
 ['Autre moyen','Une personne préfère les images.','Je propose un support qui lui convient','J’exige la parole','Je renonce à échanger','La communication peut prendre plusieurs formes.'],
 ['Formuler clairement','Une consigne paraît compliquée.','Je la découpe en étapes','Je donne dix consignes de suite','Je parle plus vite','Une étape à la fois peut faciliter la compréhension.'],
 ['Sans infantiliser','Un adulte demande des explications simples.','Je lui parle avec respect','Je lui parle comme à un bébé','Je parle seulement à son accompagnant','La clarté n’exige pas un ton infantilisant.'],
 ['Respecter le rythme','Une personne veut faire une pause.','Je respecte son besoin','J’insiste','Je l’oblige à finir','Les pauses doivent pouvoir être demandées.'],
 ['Réduire le bruit','Un lieu est trop bruyant pour discuter.','Je propose un lieu plus calme','Je crie','Je parle encore plus vite','Adapter l’environnement peut aider.'],
 ['Préférences','Tu veux savoir comment la personne préfère communiquer.','Je lui pose la question','Je décide à sa place','Je suppose sa préférence','Demander vaut mieux que présumer.'],
 ['Changer d’avis','Une personne change d’avis sur une activité.','J’écoute son nouveau choix','Je l’ignore','Je refuse','Chacun peut changer d’avis.'],
 ['À son interlocuteur','Une personne parle à un commerçant.','Je la laisse s’exprimer directement','Je l’interromps','Je parle à sa place','S’adresser à la personne favorise son autonomie.'],
 ['Faire répéter','Une réponse orale est difficile à comprendre.','Je reformule puis je vérifie','Je fais semblant','Je me moque','Vérifier est plus respectueux que deviner.'],
 ['Apprendre ensemble','Un geste n’est pas familier.','Je demande sa signification','Je l’interprète sans vérifier','Je détourne les yeux','Chaque personne donne du sens à ses gestes.'],
 ['Consentement','Tu veux aider une personne à se déplacer.','Je lui demande si elle souhaite cette aide','Je la pousse sans demander','Je décide immédiatement','Demander l’accord protège l’autonomie.']
].map(([title,context,good,bad1,bad2,reason],i)=>({title,context,options:i%3===0?[bad1,good,bad2]:i%3===1?[good,bad2,bad1]:[bad2,bad1,good],correct:i%3===0?1:i%3===1?0:2,reason}));
export const routines=[
 ['Se laver les mains',['Mouiller les mains','Mettre du savon','Frotter','Rincer','Sécher']],
 ['Préparer son sac',['Choisir les affaires','Mettre les affaires dans le sac','Fermer le sac','Prendre le sac']],
 ['Lire un livre',['Choisir un livre','Ouvrir le livre','Lire une page','Tourner les pages']],
 ['Préparer une tartine',['Prendre du pain','Ajouter la garniture','Poser sur une assiette','Déguster']],
 ['Envoyer un message',['Choisir la personne','Écrire le message','Relire','Envoyer']],
 ['Planter une graine',['Préparer la terre','Déposer la graine','Recouvrir','Arroser']],
 ['Préparer un dessin',['Choisir une idée','Prendre une feuille','Dessiner','Ranger le matériel']],
 ['Faire des courses',['Regarder ce qui manque','Écrire la liste','Prendre la liste','Choisir les produits']],
 ['Prendre le bus',['Choisir sa ligne','Attendre à l’arrêt','Monter dans le bus','Descendre à destination']],
 ['Faire une pause',['Dire que l’on souhaite une pause','Choisir un endroit','Se reposer','Décider quand reprendre']],
 ['Préparer une recette',['Lire la recette','Préparer les ingrédients','Suivre les étapes','Servir']],
 ['Partir en promenade',['Regarder la météo','Choisir ses vêtements','Prendre ses affaires','Sortir']]
].map(([prompt,steps])=>({prompt,steps}));
export const stories=[
 ['Lina met son manteau car il fait froid. Elle va marcher au parc.','Pourquoi Lina prend-elle son manteau ?','Parce qu’il fait froid','Parce qu’elle mange','Parce qu’elle dessine'],
 ['Amadou choisit un livre à la bibliothèque. Il veut lire tranquillement.','Que veut faire Amadou ?','Lire','Courir','Dormir'],
 ['Zoé boit de l’eau après une longue promenade.','Que boit Zoé ?','De l’eau','Du café','Du jus'],
 ['Mira propose de jouer à Noé. Noé répond : « Pas maintenant, merci. »','Que doit faire Mira ?','Respecter son refus','Le forcer','Se moquer'],
 ['Il pleut. Samira prend un parapluie avant de sortir.','Quel objet prend Samira ?','Un parapluie','Un livre','Un ballon'],
 ['Paul préfère dessiner, mais son ami veut écouter de la musique. Ils discutent pour choisir.','Que font les amis ?','Ils discutent','Ils dorment','Ils cuisinent'],
 ['Le bus arrive à l’arrêt. Ana regarde le numéro avant de monter.','Que vérifie Ana ?','Le numéro du bus','Le prix du pain','La couleur du ciel'],
 ['Yanis veut un endroit calme pour lire. Il demande à changer de pièce.','Que demande Yanis ?','Un endroit calme','Un autre repas','Un jouet'],
 ['Le médecin explique une consigne. Léa demande de répéter plus lentement.','Que demande Léa ?','De répéter lentement','De parler plus vite','De ne rien dire'],
 ['Fatou écrit une liste avant d’aller au marché.','Que prépare Fatou ?','Une liste','Un dessin','Une chanson'],
 ['Camille est triste. Elle veut parler à une personne de confiance.','Que veut Camille ?','Parler','Courir','Chanter'],
 ['Nora choisit une activité de musique puis change d’avis pour faire une pause.','Que choisit Nora ensuite ?','Une pause','Un gâteau','Une course']
].map(([text,question,right,...wrong],i)=>({text,question,choices:i%3===0?[right,...wrong]:i%3===1?[wrong[0],right,wrong[1]]:[...wrong,right],correct:i%3}));
export const categories=[
 ['Aliments',['🍎 Pomme','🍌 Banane','🥕 Carotte'],['🚌 Bus','📖 Livre','🚪 Porte']],
 ['Transport',['🚌 Bus','🚲 Vélo','🚆 Train'],['🍞 Pain','🪑 Chaise','🌻 Fleur']],
 ['À la maison',['🛏️ Lit','🪑 Chaise','🚪 Porte'],['🚆 Train','🌳 Arbre','🐶 Chien']],
 ['Nature',['🌳 Arbre','🌻 Fleur','🦋 Papillon'],['📱 Téléphone','🔑 Clé','🧼 Savon']],
 ['Lecture et écriture',['📖 Livre','✏️ Crayon','✉️ Lettre'],['⚽ Ballon','🚲 Vélo','🍌 Banane']],
 ['Hygiène',['🧼 Savon','🪥 Brosse à dents','🧻 Papier'],['🎵 Musique','🚪 Porte','⚽ Ballon']]
].map(([title,items,others])=>({title,items,others}));
export function rotate(array,round){const a=[...array];if(!a.length)return a;const n=((round%a.length)+a.length)%a.length;return [...a.slice(n),...a.slice(0,n)];}
export function compareOrdered(candidate,expected){return Array.isArray(candidate)&&candidate.length===expected.length&&candidate.every((value,i)=>value===expected[i]);}
export function maskWord(word,position){return [...word].map((c,i)=>i===position?'_':c).join('');}
