# WarLike HelianA

Application éducative **autonome** pour apprendre ensemble à lire, écrire, communiquer et mieux se comprendre. Pensée notamment pour les enfants ayant une trisomie 21 **et** les parents, proches, enseignants et accompagnants, sans réduire une personne à son diagnostic.

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
