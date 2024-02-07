<img src="images/readme/header.jpg">


## Sommaire <!-- omit in toc -->
- [A. Objectif](#a-objectif)
- [B. Arborescence](#b-arborescence)
- [C. Fonctionnalités](#c-fonctionnalités)
	- [C.1. Page d'Accueil / formulaire de connexion](#c1-page-daccueil-formulaire-de-connexion)
	- [C.2. Jeu](#c2-jeu)
	- [C.3. Écran "Rejouer"](#c3-écran-rejouer)
	- [C.4. Tableau des meilleurs scores](#c4-tableau-des-meilleurs-scores)
	- [C.5. Crédits](#c5-crédits)
- [D. Précisions techniques](#d-précisions-techniques)
	- [D.1. Stack technique](#d1-stack-technique)
	- [D.2. Déplacement](#d2-déplacement)
	- [D.3. UI](#d3-ui)
- [E. Pistes d'amélioration](#e-pistes-damélioration)
- [F. Critères d'évaluation](#f-critères-dévaluation)
- [G. Modalités de rendu et deadline](#g-modalités-de-rendu-et-deadline)
	- [G.1. Date de rendu](#g1-date-de-rendu)
	- [G.2. Rapport](#g2-rapport)
	- [G.3. Soutenance](#g3-soutenance)
- [H. Tips](#h-tips)
- [I. Questions](#i-questions)


## A. Objectif
**Au cours de cette SAÉ vous aurez à réaliser un jeu en ligne multi-joueur de type "shoot them up".**

Ce projet sera réalisé par équipe de 3 étudiant.e.s.

## B. Arborescence
Le jeu sera composé au minimum de 5 vues :
```
Accueil / formulaire de connexion
    ├─ Jeu
    │  └─ Écran "rejouer"
    ├─ Tableau des meilleurs scores
    └─ Crédits
```

Si vous pensez à des vues supplémentaires que vous trouveriez pertinentes, vous pouvez tout à fait en ajouter.

## C. Fonctionnalités

### C.1. Page d'Accueil / formulaire de connexion
Sur la page d'accueil on doit pouvoir voir :
- **un formulaire de connexion** permettant de choisir un pseudo (_vous pouvez éventuellement permettre à la personne qui va jouer de choisir d'autres options comme par exemple sa couleur, une image pour représenter son "personnage" dans le jeu, etc._)

- **la possibilité de rejoindre une partie en cours ou de démarrer une nouvelle partie**

- **la difficulté** du jeu (nombre de vies, nombre d'ennemis..)

### C.2. Jeu

**Le jeu se présente sous la forme d'un plateau, en deux dimensions, sur lequel le personnage peut se déplacer. Le background du jeu peut être mobile ou pas.**

Sur le plateau de jeu apparaissent aussi, à intervalle régulier, des ennemis qui peuvent tirer et que l'on doit éviter et des bonus qui permettent d'améliorer les chances du personnage (invincibilité, nouvelles armes, nouvelles vies...). Le personnage peut aussi tirer sur les ennemis et les détruire plus ou moins facilement.

**Chaque joueur ou joueuse peut déplacer son avatar sur l'écran à l'aide de la souris** (cf. chapitre Déplacement) :
- si son avatar passe au dessus d'un bonus, il récupère la capacité correspondant
- si son avatar entre en collision avec un ennemi, les deux sont détruits et le joueur perd une vie. S'il n'a plus de vie, le jeu s'arrête et on arrive sur la vue "rejouer"
- si son avatar reçoit un tir d'un ennemi, il perd une vie. S'il n'a plus de vie, le jeu s'arrête et on arrive sur la vue "rejouer".
- si son avatar entre en collision avec un partenaire???


### C.3. Écran "Rejouer"

L'écran "Rejouer" affiche un message indiquant à l'utilisateur.rice :
- **le temps** pendant lequel il a survécu
- **le nombre d'ennemis abattus** 
- **un "score"** calculé sur la base des deux critères ci-dessus (_règle de calcul de votre choix_)
- **un bouton** permettant de rejoindre à nouveau la partie en repartant du départ

### C.4. Tableau des meilleurs scores

Cet écran permet de consulter l'historique des 10 meilleurs scores réalisés par les joueuses et joueurs, affichés par ordre décroissants (_le plus grand en premier_).

Pour chaque ligne du tableau de score on a :
- le pseudo
- le score


### C.5. Crédits

Sur cet écran vous présentez les membres de votre équipe. Pour chaque membre, vous devez indiquer :
- prénom
- nom
- groupe
- surnom
- jeu vidéo préféré
- pourcentage de la note du groupe qui lui sera attribué en fonction de son implication dans le projet
	> _**NB :** en cas de désaccord -ça peut arriver- signalez le simplement à votre encadrant.e de TP et nous arbitrerons._

## D. Précisions techniques

### D.1. Stack technique
Comme expliqué en amphi, vous devrez utiliser pour ce jeu :
- un canvas
- un serveur Node.JS avec Socket.io
- des tests unitaires

Plutôt que de foncer tête baissée dans chaque sujet dès le lancement de la SAÉ, nous vous conseillons plutôt :
- **D'avancer au rythme des cours et TPs encadrés.**

	Au moment de la publication de ce sujet, le premier cours et TP sur le [canvas](https://gitlab.univ-lille.fr/jsae/tp1) est déjà publié, cela vous permettra d'avancer sur la partie "front" de votre jeu en suivant les bonnes pratiques et en évitant les pièges classiques dans lesquels tombent souvent les débutants.

	> _**NB:** Si vous souhaitez faire de la veille sur les différents sujets en amont du cours pas de soucis bien sûr, mais évitez d'intégrer vos découvertes dans votre projet avant le cours+TP correspondant pour ne pas avoir à "défaire" ce que vous avez fait !_

- **De profiter du temps que vous avez de disponible pour commencer à réfléchir** à la structure de votre projet, les règles du jeu que vous voulez proposer, le nom de votre jeu, le design de l'interface et des différents éléments, le contenu de l'écran "Crédits", la répartition des tâches et/ou pair programming, etc.

### D.2. Déplacement

**Le déplacement de l'avatar se contrôle à l'aide de la souris :** c'est la position du curseur par rapport à l'avatar qui détermine la direction et la vitesse de déplacement :
- si la souris est à droite de l'avatar, il se déplace vers la droite, si elle est à gauche, l'avatar se déplace à gauche, etc.
- il est possible de contrôler la direction de déplacement à 360° et pas seulement sur les 4 points cardinaux
- plus le curseur de la souris est proche de l'avatar plus celui-ci ralentit, plus le curseur s'éloigne plus l'avatar accélère (_avec une vitesse maximum fixée par vous selon la jouabilité désirée_).

### D.3. UI
**Vous êtes libres de la mise en page de votre application.** Si vous êtes en manque d'inspiration pour le design de votre site, vous pouvez tout à fait vous inspirer de jeux ou de sites grand public.

En ce qui concerne les styles vous avez le choix d'utiliser un framework CSS, un préprocesseur CSS (Sass, less) ou de partir de zéro.

Même si le but est d'évaluer vos compétences en développement JS, nous savons tous qu'une application, même la meilleure, si elle n'a pas une interface agréable ne sera pas utilisée. Ici votre public, ce sont vos encadrant.e.s de TP, et nous ne sommes pas bon public, justement. Nous porterons donc une attention particulière à la qualité de mise en page et de design de votre jeu !

## E. Pistes d'amélioration
Si vous avez besoin d'idées pour rendre votre jeu encore meilleur, voici quelques pistes d'amélioration :
- permettre de jouer sur téléphone avec l'orientation du téléphone / gyroscope
- ajouter des effets sonores dans le jeu (quand on récupère un bonus, quand on tue un ennemi, etc.)
- ajout de niveaux
- ...

## F. Critères d'évaluation
Vous serez évalués sur :
- le respect du cahier des charges
- la qualité du code de votre application ([DRY](https://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas), [YAGNI](https://fr.wikipedia.org/wiki/YAGNI), [KISS](https://fr.wikipedia.org/wiki/Principe_KISS))
- la beauté de votre log Git et la participation des différents membre de l'équipe
- les tests
- les performances
- la propreté du design de votre application et son ergonomie
- l'absence de similitudes avec le code des autres équipes ou du code trouvé en ligne
- la tête du client


## G. Modalités de rendu et deadline
**Nous attendons vos projets via un dépot git **PRIVÉ** (_sur https://gitlab.univ-lille.fr_).**

Ce dépôt devra obligatoirement être nommé `sae-2023-groupeX-nom1-nom2` (_où X est la lettre de votre groupe, et où nom1/2 sont vos noms de famille_)

Seuls les membres de votre équipe doivent avoir accès à ce repo ainsi que tous les encadrants de TP (en reporter) : `@patricia.everaere-caillier`, `@thomas.clavier` et `@thomas.fritsch`.

### G.1. Date de rendu
Vos derniers commits sur le projet doivent être faits **avant le 13 avril à 23h59**.

Tout commit passé cette date ne sera **PAS** pris en compte.

### G.2. Rapport
Votre dépôt doit contenir un fichier `README.md` avec les éléments suivants :
- Des diagrammes de séquence pour expliquer les échanges entre le client et le serveur via les websocket
- Expliquez les difficultés techniques auxquelles vous avez été confrontés et comment vous les avez surmontées
- Indiquez les points d'amélioration/d'achèvement de votre projet
- Enfin, expliquez ce dont vous êtes le plus fier/fière

### G.3. Soutenance
**Vos projets seront présentés en soutenance le 14 avril 2023** \
L'heure de passage de votre équipe vous sera notifié sur mattermost.

Lors de cette soutenance, nous reprendrons les points précisés dans le cahier des charges, et vérifierons leur fonctionnalité.


## H. Tips

- **Commencez par choisir un nom de projet qui impressionne** et marque les esprits
- **Utilisez ensuite le système d'issues (tickets) de gitlab pour lister toutes les tâches à réaliser** et vous répartir ainsi le travail, ainsi que cela vous a été présenté en gestion de projet.

	Veillez à créer des issues suffisamment **précises** : une grosse issue `"jeu"` ne va pas vous aider à répartir le travail, au contraire de tâches plus "fines" comme par exemple `"contrôle orientation déplacement"`, `"contrôle vitesse déplacement"`, `"affichage bonus"`, etc.

	Nous vous recommandons d'utiliser ensuite la page "Issues" > "Board" qui offre un tableau kanban ("à la Trello") pour suivre l'affectation et l'avancement des tickets.

- **Pour simplifier le setup de votre projet** (_configuration de babel, webpack, etc._) **le plus simple est probablement de repartir du code de vos TPs** puis de le nettoyer pour enlever les éléments inutiles

	N'oubliez pas que nos TPs contiennent des fichiers de configuration qui sont cachés (`.babelrc`, `.vscode`, `.prettierrc`) mais qu'il ne faut pas copier le dossier `.git` !

## I. Questions

En cas de questions, n'hésitez pas à nous en faire part dans le channel mattermost du cours.

(_notez qu'il est possible qu'il évolue au fur et à mesure de l'avancée de la SAÉ, si c'est le cas vous serez aussi prévenu.e.s directement sur mattermost_)

C'est parti !

<img src="https://media.giphy.com/media/ztujni1w6RR96/giphy.gif">
