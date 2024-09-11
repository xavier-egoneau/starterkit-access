# starterkit-access

Ce projet utilise Gulp pour automatiser plusieurs tâches de développement web, notamment la compilation de Sass, le traitement des fichiers Twig, la transpilation JavaScript, la validation W3C et la vérification d'accessibilité.

## Structure du projet

```
projet/
├── src/
│   ├── sass/
│   ├── twig/
│   └── js/
├── dist/
├── accessibility-reports/
├── gulpfile.js
├── package.json
└── README.md
```

## Prérequis

- Node.js (version 12 ou supérieure recommandée)
- npm (généralement installé avec Node.js)

## Installation

1. Clonez ce dépôt ou téléchargez les fichiers du projet.
2. Ouvrez un terminal dans le dossier du projet.
3. Exécutez la commande suivante pour installer les dépendances :

   ```
   npm install
   ```

## Tâches Gulp disponibles

### `gulp sass`

Compile les fichiers Sass en CSS, ajoute les préfixes vendeurs et minifie le résultat.

### `gulp twig`

Compile les templates Twig en fichiers HTML.

### `gulp js`

Transpile les fichiers JavaScript avec Babel et les minifie.

### `gulp w3c`

Valide les fichiers HTML générés selon les standards W3C.

### `gulp accessibility`

Vérifie l'accessibilité des fichiers HTML générés selon les normes WCAG2AA.

### `gulp` (tâche par défaut)

Exécute toutes les tâches ci-dessus dans l'ordre.

### `gulp watch`

Surveille les modifications des fichiers source et exécute les tâches correspondantes automatiquement.

## Utilisation



1. Pour démarrer le mode watch et travailler avec rechargement automatique :
   ```
   gulp
   ```

2. Pour exécuter une tâche spécifique :
   ```
   gulp <nom_de_la_tache>
   ```
   Par exemple : `gulp sass` ou `gulp js`

## Personnalisation

Vous pouvez modifier le fichier `gulpfile.js` pour ajuster les chemins des fichiers source et de destination, ou pour ajouter/modifier des tâches selon vos besoins.

## Résolution des problèmes

- Si vous rencontrez des erreurs liées à des modules manquants, assurez-vous d'avoir exécuté `npm install`.
- Pour les avertissements de dépréciation, considérez la mise à jour des packages concernés.
- Vérifiez les rapports générés dans le dossier `accessibility-reports` pour les détails sur les problèmes d'accessibilité.

## Contribution

Les contributions à ce projet sont les bienvenues. Veuillez ouvrir une issue pour discuter des modifications majeures avant de soumettre un pull request.

## Licence

[Insérez ici les informations de licence de votre projet]
