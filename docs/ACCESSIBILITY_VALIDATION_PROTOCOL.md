# HelianA — protocole d'évaluation d'accessibilité et de compréhension des symboles

**État : protocole préparé, aucune évaluation humaine réalisée.** Les pictogrammes de la V7 sont des dessins vectoriels originaux, **non certifiés pour la CAA**. Les tests logiciels ne démontrent ni la compréhension des symboles ni leur pertinence pour une personne donnée.

## 1. Avant les essais

- Présenter la démarche à la personne, avec des explications adaptées, et demander son accord libre et révocable. Pour les mineurs, respecter également les règles applicables à l'autorisation du responsable légal et à l'assentiment de l'enfant.
- Préparer une alternative non numérique (parole, gestes, objets, pictogrammes déjà connus), sans imposer une réponse.
- Ne jamais filmer, enregistrer les voix ou consigner des diagnostics sans justification, autorisation et protocole appropriés.
- Prévoir la possibilité de quitter immédiatement l'essai, d'être accompagné ou de faire une pause, sans conséquence.
- Demander à un professionnel CAA/orthophoniste et aux utilisateurs concernés de revoir le vocabulaire avant toute revendication de validation.

## 2. Vérifications techniques manuelles

| Test | Action à réaliser | Résultat attendu |
|---|---|---|
| Navigation clavier | Parcourir `communication.html` uniquement avec Tab, Entrée et Espace | Tous les boutons accessibles ; focus visible, stable |
| Lecteur d'écran | Parcourir les cartes avec un lecteur d'écran | Le message textuel est annoncé ; le dessin décoratif ne double pas le nom |
| Taille du texte | Zoomer le navigateur jusqu'à 200 % et 400 % | Pas de perte de fonctionnalités ni de texte essentiel ; pas de défilement horizontal bloquant |
| Mode mobile | Utiliser téléphone et tablette, portrait/paysage | Cibles tactiles atteignables et espacement suffisant |
| Impression | Choisir trois cartes et imprimer en A4 | Cartes entières, texte lisible, formes visibles sans couleur |
| Synthèse vocale | Lire puis arrêter un message | Lecture sur demande ; arrêt possible ; autres moyens restent disponibles |
| Jeu à deux | Changer de rôle, passer, revenir, recommencer | Aucune obligation de répondre ni collecte de résultats |
| Contraste | Tester contraste standard et élevé, y compris focus et états désactivés | Lisibilité et repérage des commandes |
| Hors réseau | Recharger après mise en cache éventuelle | Déterminer ce qui fonctionne réellement ; **mode hors ligne complet non garanti** |

Enregistrer les défauts techniques dans les tickets GitHub, sans données personnelles des personnes participantes.

## 3. Compréhension réelle des pictogrammes

Pour chaque symbole testé, laisser la personne proposer son interprétation, sans imposer le sens prévu. Vérifier ensuite avec elle et son accompagnant si le texte et le dessin sont compréhensibles, appropriés et utiles. Noter seulement les recommandations de conception consenties et anonymisées, jamais le diagnostic ou les performances individuelles.

Étapes conseillées : revue des concepts avec des personnes concernées, évaluation des ambiguïtés (notamment « non », « stop », « toilettes », « aide »), modification, puis nouvel essai. **Ne pas présenter le jeu d'icônes comme CAA validé avant ces étapes.**

## 4. Critères de clôture

- Aucune erreur bloquante de navigation clavier/lecteur d'écran.
- Pas de coupure en impression A4, avec des étiquettes textuelles visibles.
- Les utilisateurs peuvent exprimer un refus, demander une pause et utiliser un autre moyen de communication.
- Les incohérences de pictogrammes relevées lors des essais ont été corrigées puis re-testées.
- Retour des personnes concernées et des accompagnants pris en compte, avec consentement documenté selon le protocole adopté.

**Ce document est une grille de test à exécuter, pas un procès-verbal de réussite ni une certification WCAG.**
