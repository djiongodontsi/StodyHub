# StudyHub (CampusConnect)

**StudyHub** est une maquette de plateforme étudiante conçue pour centraliser les ressources, proposer un forum de discussion et permettre la gestion d’un profil utilisateur. Ce projet a été développé dans le cadre de l’atelier « Création et développement d’une maquette ».

---

## Structure du projet

Le projet est organisé comme suit :

```
studyhub_project/
│
├─ assets/         : Fichiers de design et images
├─ public/         : Assets utilisés côté front-end
├─ server/         : Backend Node.js avec API
├─ docs/           : Documentation et notes du projet
├─ figma/          : Maquettes réalisées sur Figma
└─ README.md       : Ce fichier
```

Chaque dossier a un rôle précis, permettant de séparer le design, le front-end, le back-end et la documentation.

---

## Prérequis

Pour faire fonctionner le projet en local, il est nécessaire d’avoir :

* **Node.js** version 18 ou supérieure (incluant npm).
  Téléchargez la version LTS depuis le site officiel : [https://nodejs.org](https://nodejs.org).
  Pour Windows, il est recommandé d’utiliser le fichier `.msi` et de laisser l’option “Add to PATH” cochée lors de l’installation.

* Vérification de l’installation :

```powershell
node -v
npm -v
```

* Si vous utilisez PowerShell et que l’exécution de scripts est bloquée, il faut modifier la politique de sécurité pour l’utilisateur courant :

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## Installation et lancement du projet

1. Ouvrez un terminal (PowerShell ou Invite de commandes).
2. Placez-vous dans le dossier `server` du projet :

```powershell
cd "C:\Users\VotreNom\Downloads\StudyHub_CampusConnect_Project(1)\studyhub_project\server"
```

3. Installez les dépendances nécessaires :

```powershell
npm install
```

4. Démarrez le serveur :

```powershell
npm start
```

5. Ouvrez un navigateur et rendez-vous à l’adresse suivante :

```
http://localhost:3000
```

Le serveur doit rester ouvert dans le terminal pour que le site fonctionne correctement.

---

## Contenu des pages

| Page              | Description                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| `/index.html`     | Page d’accueil                                                                                                |
| `/resources.html` | Page de ressources avec filtrage et gestion des favoris stockés en local                                      |
| `/forum.html`     | Forum de discussion connecté à une API Node.js avec création, modification, suppression et vote sur les posts |
| `/profile.html`   | Profil utilisateur, affichant des informations personnelles                                                   |

---

## API du serveur

Le backend expose plusieurs routes pour gérer le forum :

| Route                 | Méthode | Description                  | Exemple JSON                                                   |
| --------------------- | ------- | ---------------------------- | -------------------------------------------------------------- |
| `/api/posts`          | GET     | Récupérer tous les posts     | -                                                              |
| `/api/posts`          | POST    | Créer un post                | `{ "title": "Titre", "category": "Maths", "body": "Contenu" }` |
| `/api/posts/:id/vote` | POST    | Voter sur un post (+1 ou -1) | `{ "delta": 1 }`                                               |
| `/api/posts/:id`      | DELETE  | Supprimer un post            | -                                                              |

Ces routes permettent de manipuler les posts depuis la page forum.

---

## Assets et design

* Tous les fichiers graphiques et images sont situés dans le dossier `/assets`.
* Les fichiers nécessaires au front-end sont copiés automatiquement dans `/public/assets`.
* Les maquettes ont été réalisées dans Figma et peuvent être consultées dans le dossier `/figma`.

---

## Bonnes pratiques et recommandations

* Laissez le terminal ouvert tant que vous utilisez le site.
* Testez toutes les pages pour vérifier le fonctionnement du forum et des ressources.
* Pour aller plus loin, il serait intéressant d’ajouter une base de données réelle pour gérer les utilisateurs et les posts de manière persistante (MongoDB, PostgreSQL, etc.).
* Une version future pourrait intégrer un framework front-end moderne comme React ou Vue pour améliorer l’expérience utilisateur et la maintenance du code.

---

## Résultat attendu

Après avoir lancé le serveur avec `npm start`, vous devriez voir dans le terminal :

```
StudyHub running on http://localhost:3000
```

Vous pouvez alors ouvrir cette adresse dans votre navigateur et naviguer sur toutes les pages du projet.