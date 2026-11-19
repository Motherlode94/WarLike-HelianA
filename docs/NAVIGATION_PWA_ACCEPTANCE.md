# HelianA — recette navigateur avant fusion

**Statut : protocole de recette prêt. Les scénarios ci-dessous doivent être exécutés sur de vrais navigateurs et appareils.**
Les tests Node vérifient des contrats structurels et certaines interactions simulées, **pas** les rendus réels, la compréhension des symboles ou une certification WCAG.

## Navigation (bureau, tablette, téléphone)

| Scénario | Action | Résultat attendu |
|---|---|---|
| Départ | Charger l'accueil sans cliquer | Aucun sous-menu ne recouvre le contenu |
| Ouverture | Ouvrir Apprendre | Une seule liste apparaît ; elle ne recouvre pas un second menu |
| Exclusivité | Ouvrir Communiquer puis Créer | Seul le dernier menu reste visible |
| Sortie | Cliquer hors de la navigation | Le menu ouvert se ferme |
| Clavier | Parcourir Tab/Shift+Tab, Entrée/Espace, Échap | Le focus reste visible ; Échap ferme et rend le focus au résumé |
| Perte de focus | Tab jusqu'au contenu principal | Le sous-menu se ferme sans bloquer la navigation |
| Petit écran | Tester 320, 375, 768 px, zoom 200 % et 400 % | Pas de liste inaccessible, coupée ou superposée |
| Sous-dossiers | Accéder à apprendre/, communiquer/, creer/, accompagner/ | Menus fermés au départ, rubrique active indiquée, liens opérationnels |
| Lien ciblé | Communiquer → Atelier Je m'exprime | L'onglet « Je m'exprime » est réellement sélectionné et son titre reçoit le focus |
| Retour | Revenir à l'accueil et aux ateliers | Les exercices restent fonctionnels |

## Mode hors connexion (PWA)

1. Charger la dernière Preview HelianA en ligne. Sur l'accueil, constater « Préparation du mode hors ligne… » pendant l'installation.
2. Vérifier que l'état « prêt » n'est affiché qu'après l'activation du Service Worker et la présence des pages requises dans le cache.
3. Couper réellement la connexion, recharger l'accueil, les quatre dossiers, WarScript Junior, Learning Studio et la planche de communication.
4. Tester le retour en ligne et les mises à jour après un nouveau déploiement, sans conserver d'anciens menus ou exercices.
5. Si le navigateur ne prend pas en charge les Service Workers, vérifier le message de repli. L'installation n'est jamais garantie dans tous les navigateurs.
6. Confirmer dans les outils développeur qu'aucune réponse utilisateur, profil, requête API ni document personnel n'est conservé dans CacheStorage.

## Accessibilité et pédagogie

- Examiner au lecteur d'écran les sous-menus, l'ordre du focus, les annonces d'activité et la prononciation.
- Vérifier les cibles tactiles, l'impression A4, le contraste et le zoom sans perte de contenu.
- Faire confirmer le vocabulaire et les pictogrammes par les personnes concernées et des professionnels compétents ; les dessins restent **non validés pour la CAA**.
- Laisser chacun choisir, refuser ou interrompre un exercice ; ne recueillir aucune donnée personnelle non nécessaire.
- Documenter les résultats techniques de recette dans la PR, avec captures anonymisées si besoin.

## Critères de sortie

- Workflows GitHub réussis, déploiement Preview réussi.
- Aucun menu affiché par défaut, aucune superposition, ni lien de catégorie erroné.
- Recette souris/clavier/tactile et hors ligne réussie sur les appareils cibles.
- Retour des personnes concernées pris en compte pour les usages pédagogiques sans présenter les tests logiciels comme une validation clinique.

**Avant cette recette, ne pas fusionner automatiquement les branches empilées V9–V12, Junior et navigation.**
