# 🏆 DevHunt — Frontend StackOverflow ENI

Frontend de l’application **StackOverflow ENI**, développée dans le cadre de la compétition **DevHunt (École Nationale d’Informatique — ENI) 2023**.

Cette app web est construite avec **Vue.js** et communique avec un backend **Node.js** pour fournir une plateforme de questions/réponses similaire à StackOverflow dédiée à la communauté ENI.

---

## 📌 Présentation

C'est une application web interactive où les utilisateurs peuvent :

- 📥 Poser des questions techniques
- 💬 Répondre aux questions d’autres étudiants
- 👍 Voter pour les meilleures réponses
- 🔍 Rechercher des sujets par mots‑clés
- 👤 Voir les profils des utilisateurs

Le frontend est construit avec **Vue.js**, offrant une expérience fluide, réactive et moderne.

---

## 🧰 Technologies utilisées

| Élément | Technologie |
|---------|-------------|
| Frontend | Vue.js |
| Routing | Vue Router |
| Appels API | Axios |
| State Management | Vuex |
| Styles | CSS |
| API Backend | Node.js + Express (séparé) |

---

## 📁 Structure du projet

frontdevhunt/
├── public/
│ └── index.html
├── src/
│ ├── assets/ # Images, icônes, styles globaux
│ ├── components/ # Composants réutilisables
│ ├── views/ # Pages de l’application
│ ├── router/ # Configuration Vue Router
│ ├── store/ # Vuex (si utilisé)
│ ├── services/ # API calls avec Axios
│ ├── App.vue # Composant racine
│ └── main.js # Entrée de l’application
├── .gitignore
├── babel.config.js
├── package.json
├── README.md
└── vue.config.js
---

## 🚀 Installation

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/KennyhSedera/frontdevhunt.git
cd frontdevhunt
npm install
npm run serve
npm run build
