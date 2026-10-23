# Maquette HTML/CSS/JS autonome

Décompressez tout le ZIP puis ouvrez index.html par double-clic. 81 pages issues des Blade et des rendus de présentation existants. Aucun PHP/serveur/base de données requis pour consulter. Les données sont exclusivement celles des démonstrations existantes.

Les contenus sont déjà dans le HTML : aucun moteur métier n’est exécuté dans le navigateur. Deux scripts classiques par page : fragments HTML de présentation, puis maquette.js (menus, tiroirs, sélection et onglets). Pas d’API, de session, de stockage ni de succès métier simulé. Enregistrer, envoyer, signer, payer et documents privés : indisponibles. Les cartes distantes et polices CDN sont exclues, polices système conservées.

Dossiers : nouvelle vue de traitement affichée par défaut ; boutons Vue actuelle / Vue nouvelle. Dans la vue actuelle, cliquez une référence ou une ligne pour ouvrir le tiroir ; fermeture par croix, fond ou Échap. Dans la nouvelle vue : sélection à gauche et cinq onglets à droite. Les états visuels sont des instantanés, pas des traitements métier.

Le header source reste inchangé après résolution des variables. Le JS de présentation renseigne les libellés démo. Les projections PHP non exécutées restent documentées À VÉRIFIER dans EXPORT_RAPPORT.md ; voir aussi MANIFEST.json. L’exécution Laravel n’est pas revendiquée.

Depuis le dépôt : npm install puis npm run export:front ; npm run test:export. JSDOM sert à la fabrication uniquement. Le générateur ne modifie que export-front/ et export-front.zip. Résultats d’exécution : EXPORT_TESTS.md à la racine du dépôt.
