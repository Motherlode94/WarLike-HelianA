# WarLike HelianA

Application éducative **autonome** pour apprendre ensemble à lire, écrire, communiquer et mieux se comprendre. Pensée notamment pour les enfants ayant une trisomie 21 **et** les parents, proches, enseignants et accompagnants, sans réduire une personne à son diagnostic.

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
