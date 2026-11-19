# WarLike HelianA

Application éducative **autonome** pour apprendre ensemble à lire, écrire, communiquer et mieux se comprendre. Pensée notamment pour les enfants ayant une trisomie 21 **et** les parents, proches, enseignants et accompagnants, sans réduire une personne à son diagnostic.

## Dernière passe de fiabilité — navigation et hors ligne

La navigation est fermée **au chargement**, y compris sur les quatre pages de catégories. Un seul sous-menu peut être ouvert à la fois ; il se ferme également quand le focus ou le pointeur quitte le menu, et la touche Échap retourne le focus au titre. Le lien « Atelier Je m’exprime » ouvre désormais l'atelier correspondant via une ancre locale, sans requête contenant une réponse personnelle.

Le mode hors ligne **n'annonce plus « prêt » au simple enregistrement du Service Worker** : la page attend son activation et vérifie plusieurs pages essentielles en CacheStorage. Le cache est versionné pour remplacer les anciennes ressources ; il ne contient que des fichiers pédagogiques publics.

Ces mécanismes ont des tests automatiques, mais leur qualité en conditions réelles doit encore être évaluée selon le [protocole navigateur, mobile et PWA](docs/NAVIGATION_PWA_ACCEPTANCE.md).

## Navigation et sous-dossiers — HelianA

Le site possède un **menu principal hiérarchique** sur l’accueil et chaque page pédagogique. Les sous-menus sont réalisés en HTML natif `<details>/<summary>` : ils s’ouvrent au clavier, au tactile et à la souris sans dépendre d’un script d’interface.

Quatre véritables dossiers de navigation, chacun doté de son `index.html`, organisent les outils :

- [`apprendre/`](apprendre/) — ateliers, Learning Studio, 12 mini-jeux, parcours et WarScript Junior.
- [`communiquer/`](communiquer/) — planche de communication, choix et activités à deux.
- [`creer/`](creer/) — Educator, WarScript Junior et activités de création.
- [`accompagner/`](accompagner/) — guide des proches, supports imprimables et parcours accompagnés.

Les modules gardent leurs URL existantes à la racine pour **ne pas casser les liens historiques et les scripts**. Les pages des dossiers proposent une arborescence claire vers ces modules, plutôt que des copies concurrentes. Le Service Worker V12 inclut les dossiers dans le cache de ressources publiques ; aucun compte ou document personnel n’est ajouté.

Tests de structure : `node --test tests/heliana-navigation-folders.test.mjs`. Les essais réels de menu, lecteur d’écran, zoom et navigation tactile restent à réaliser.

## HelianA V12 — application Web installable et activités hors connexion

Une PWA optionnelle (`manifest.webmanifest`, `service-worker.js`, `pwa.js`, `heliana-icon.svg`) prépare à l'avance les **ressources pédagogiques statiques publiques** : accueil, ateliers, parcours, communication, supports accompagnants, Educator, Learning Studio et WarScript Junior.

- Après une première visite en ligne réussie dans un navigateur compatible, les pages installées peuvent être consultées **sans connexion**. L'installation effective et la persistance du cache restent dépendantes du navigateur, de son espace disponible et de ses paramètres.
- L'intercepteur réseau n'utilise le cache que pour les **requêtes GET du même domaine correspondant exactement à la liste publique**, sans paramètres d'URL ni en-tête d'autorisation.
- Le code ne collecte, ne synchronise et ne stocke **aucune réponse, fiche saisie, profil ou donnée personnelle** ; les supports personnalisés restent éphémères.
- Une information d'état du mode hors ligne est annoncée sur l'accueil ; les commandes principales ont une taille tactile minimale sur petit écran et le système respecte les préférences de mouvement réduit.

**Vérification nécessaire** : installer depuis une première visite en ligne, attendre la prise de contrôle du Service Worker, puis passer réellement hors ligne et recharger chaque page. Tester sur mobile et lecteur d'écran. `node --test tests/heliana-v12-offline.test.mjs` contrôle l'inventaire des fichiers mais ne certifie ni l'installation réelle ni la conformité WCAG.

## WarScript Junior — initiation ludique à la programmation dès 5 ans

La nouvelle page [warscript-junior.html](warscript-junior.html) propose une initiation **visuelle, sans lecture ou écriture obligatoire** : un petit robot à déplacer sur une grille grâce aux commandes **Avancer**, **Tourner à gauche** et **Tourner à droite**. Trois aventures progressives montrent la notion d'instruction, d'ordre des actions et de débogage sans score, chronomètre ni profil.

Les plus curieux peuvent activer « Voir le vrai WarScript » pour découvrir un **exemple de code** `Start() { ... }` avec `Log(...)`, `Move(x,y,z)` et `Rotate(angle)`, formes documentées dans [WarLike Engine](https://github.com/Motherlode94/WarLike-Engine/blob/main/docs/warscript.md). Le simulateur de grille est **un outil pédagogique autonome** : il n'exécute pas WarScript ni un jeu WarLike Engine et ne revendique pas une correspondance parfaite de toutes les transformations 2D/3D.

Les exercices utilisent des boutons natifs accessibles au clavier et au tactile ; les commandes sont traitées par un interpréteur fermé sans `eval`. Aucun texte de l'enfant, progression ou donnée personnelle n'est enregistré.

Contrôles : `node --test tests/warscript-junior.test.mjs`. Des essais avec des enfants et leurs accompagnants sont encore nécessaires pour vérifier le niveau de compréhension et l'accessibilité réelle.

## HelianA V8 — guide accompagnant et préférences de communication

- **Guide accompagnant imprimable** : la page [facilitator.html](facilitator.html) propose six repères non prescriptifs pour recueillir le consentement, choisir les moyens de communication, laisser du temps, clarifier les messages, respecter les refus et adapter l'activité. Les cases à cocher sont facultatives, conservées en mémoire uniquement durant l'affichage et ne sont jamais enregistrées.
- **Planche de communication** : le contraste renforcé et trois vitesses de lecture vocale sont directement réglables depuis [communication.html](communication.html). Les préférences ne sont pas persistées ni envoyées à un serveur.
- **Impression A4** : feuille de conseils lisible sur papier, sans données personnelles, en complément des cartes de communication.
- **Tests V8** : `node --test tests/*.test.mjs` vérifie les six étapes, l'absence de stockage et les nouvelles commandes.

**Ces améliorations techniques ne constituent ni une certification d'accessibilité, ni une validation clinique ou CAA.** L'évaluation avec les utilisateurs et professionnels reste à réaliser suivant [le protocole](docs/ACCESSIBILITY_VALIDATION_PROTOCOL.md).

## HelianA v7 — symboles vectoriels et dialogues à deux

- **Pictogrammes vectoriels originaux** : les quinze cartes de communication affichent des symboles SVG de style homogène, dessinés dans `pictograms.js`, accompagnés systématiquement de leur étiquette textuelle. Ils sont imprimés en A4 et restent lisibles sans couleur.
- **Communication à deux** : la page [duo-practice.html](duo-practice.html) propose six échanges non chronométrés (choisir, refuser, demander de l'aide, faire une pause, vérifier un message, raconter). Rôles inversables, droit de passer et absence de score.
- **Évaluation à préparer** : [protocole de validation d'accessibilité](docs/ACCESSIBILITY_VALIDATION_PROTOCOL.md) pour les essais clavier, lecteur d'écran, zoom, tactile, impression et compréhension réelle des symboles.
- **Tests techniques** : `node --test tests/*.test.mjs` inclut les régressions V7.

Les symboles sont **des illustrations provisoires, pas des pictogrammes CAA validés**. Il reste indispensable de les éprouver avec des personnes concernées et des professionnels. L'application n'enregistre ni noms, ni réponses, ni diagnostics.

## Communication v6 — planche de messages et cartes imprimables

La nouvelle page **[communication.html](communication.html)** propose une planche de communication autonome, avec des exemples classés en trois groupes : **besoins**, **choix** et **échanges**. Les personnes peuvent sélectionner des phrases à montrer ou à faire lire par la synthèse vocale facultative du navigateur, puis retirer ou effacer les messages.

L'impression A4 prépare des **cartes sélectionnées** pour une utilisation hors écran, sans serveur, compte, enregistrement de réponse ou suivi des choix. La page utilise des boutons HTML natifs, un statut accessible et une présentation responsive ; une option agrandit les cartes.

**Précautions :** les emojis et propositions de phrases ne constituent pas une bibliothèque de pictogrammes CAA validée. Vérifier leur compréhension et leur signification avec chaque personne ; respecter ses refus, ses gestes et ses autres moyens de communication. Cette planche ne remplace pas une évaluation individualisée de communication alternative et améliorée.

Les fichiers `communication-data.js`, `communication.js` et `communication.css` séparent le vocabulaire générique, le comportement et l'impression. Le test `tests/communication-v6.test.mjs` vérifie la cohérence des cartes, la limite de longueur des messages, la sélection et l'absence de stockage local ou d'appel réseau.

## Accessibilité v5 — lecture vocale et navigation sans interruption

Cette évolution consolide les ateliers, les quatre parcours et les douze mini-jeux, sans ajouter de compte ni d'enregistrement des réponses.

- **Lecture vocale sur demande** : dans les parcours, les boutons « Écouter la consigne » et « Dire ce message » fonctionnent indépendamment de l'option de lecture *automatique*. Celle-ci reste désactivée par défaut.
- **Arrêter la voix** : une commande explicite est disponible sur l'accueil, les parcours et les mini-jeux. Le navigateur conserve la liberté d'autoriser ou non la synthèse vocale.
- **Planche de communication** : les symboles, leurs boutons et le focus clavier restent en place après l'ajout ou le retrait d'un élément du message. L'utilisateur peut construire un message sans repartir au début des commandes à chaque clic.
- **Orientation clavier/lecteur d'écran** : les ateliers exposent leur état par `aria-pressed`, et les changements de parcours ou de mini-jeu placent le focus sur le nouveau titre.

Ces protections améliorent l'usage technique, mais **ne constituent pas une certification WCAG ni une validation auprès d'utilisateurs réels**. Une évaluation avec des personnes concernées et leurs accompagnants demeure nécessaire.

Contrôle du dépôt : `node --test tests/*.test.mjs`. La CI de la nouvelle PR exécute aussi le contrôle de syntaxe des scripts.

## Parcours pédagogiques v4

Page `pathways.html` : **quatre parcours de six activités** (mots du quotidien, choix et besoins, compréhension à deux, histoires et échanges). L'utilisateur peut avancer, revenir en arrière, réessayer et varier les exercices. Le mode à deux propose des prises de parole distinctes avec possibilité de passer ou pratiquer seul, sans interprétation automatique des intentions.

Préférences de session, sans stockage : taille normale/grande/très grande, contraste, espacement, consignes courtes et synthèse vocale si disponible. Les parcours n'utilisent ni âge ni diagnostic pour déterminer la difficulté. Pas de profil personnel, compte, classement, score ou stockage des réponses.

## Mini-jeux pédagogiques

Accès depuis l'accueil ou `games.html`. Douze jeux : Images & mots, Construis une phrase, On se comprend, Mémoire visuelle, Syllabes, Lettres manquantes, Étapes du quotidien, À toi de répondre, Mes ressentis, Exprimer un besoin, Petites histoires et Trouve la catégorie. Trois niveaux librement choisis : Découverte, Pratique et Défi. Pas de temps limite, score ou profil. Contrôle : `node --test tests/*.test.mjs`.

## Contenu étendu v3

- Lecture et écriture : 36 nouveaux mots illustrés en complément du contenu initial, avec vérification de réponses et voix facultative.
- Communication : 24 expressions supplémentaires sur la planche de messages (sans prétendre remplacer la CAA personnalisée).
- Accompagnants : 15 nouvelles situations pour respecter les choix, vérifier les messages, reformuler et laisser du temps.
- Mini-jeux : 12 activités jouables, des dizaines de questions, routines et histoires ; navigation tactile et clavier, niveaux librement choisis.
- Pas de chronomètre obligatoire, score, comparaison d'utilisateurs ou stockage de données personnelles.

## Quatre ateliers
- **Je lis** : associer une image à un mot ; consignes courtes, possibilité de réessayer.
- **J'écris** : recopier ou saisir des mots du quotidien en s'appuyant sur un modèle.
- **Je m'exprime** : planche de messages simples avec symboles et lecture vocale facultative ; précurseur de fonctionnalités CAA (communication alternative et améliorée).
- **On se comprend** : cas pratiques pour les proches et professionnels : écouter, laisser du temps, vérifier la signification, respecter le choix et le refus, éviter d'infantiliser.

## Accessibilité et respect
Grossissement du texte, contraste renforcé, réduction des animations, taille de cibles confortable, navigation clavier, zone d'annonce des réponses et synthèse vocale facultative. Les symboles emoji sont provisoires et ne remplacent pas un vocabulaire CAA personnalisé, validé avec la personne. Le système ne devine ni l'intention ni l'émotion à partir d'un geste.

**Sans compte, cookies, caméra, micro, analytics, publicité, IA générative ou stockage des réponses.** Aucune information relative au handicap ou à l'enfant n'est collectée. La synthèse vocale utilise l'API du navigateur quand elle est disponible ; le site reste utilisable sans elle.

Ce programme n'est ni un diagnostic ni une thérapie et ne se substitue pas à l'accompagnement orthophonique ou pédagogique. Activités à adapter à l'âge, aux préférences, à la langue et aux besoins singuliers de chaque personne.

## Développement
Application statique HTML/CSS/JS, déployable sur Cloudflare Pages avec le répertoire racine. Pour tester : `node --test tests/*.test.mjs`, puis servir le dépôt via `python3 -m http.server 8000`. La validation tactile réelle et les essais avec des utilisateurs, familles et professionnels restent à réaliser avant présentation comme outil accessible éprouvé.

## Évolution envisagée
Vocabulaire CAA personnalisable avec consentement, textes et pictogrammes validés, consignes visuelles configurables, activités multimodales, assistance hors ligne, traduction, version parent/enseignant et évaluation d'utilisabilité co-construite. Aucun profil enfant ni stockage cloud sans conception spécifique de la confidentialité et du consentement.
