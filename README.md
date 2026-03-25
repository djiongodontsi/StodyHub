# StudyHub (CampusConnect) - Atelier "Creation et developpement d'une maquette"

## Lancer en local
Prerequis: Node.js 18+

```bash
cd server
npm install
npm start
```

Puis ouvre: http://localhost:3000

## Pages
- /index.html : Accueil
- /resources.html : Ressources (filtre + favoris en localStorage)
- /forum.html : Forum (API Node.js: CRUD simple)
- /profile.html : Profil (3e page)

## API
- GET /api/posts
- POST /api/posts {title, category, body}
- POST /api/posts/:id/vote {delta: 1|-1}
- DELETE /api/posts/:id

## Design / assets
Les assets sont dans /assets et copies dans /public/assets
