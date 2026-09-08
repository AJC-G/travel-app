# Travel App 🌍

Une application web moderne pour planifier, organiser et gérer vos voyages.

## Fonctionnalités

- 📅 Planification d'itinéraires
- 🗺️ Gestion de destinations
- 💰 Suivi des budgets de voyage
- 📝 Liste d'activités et points d'intérêt
- 👥 Partage d'itinéraires avec d'autres voyageurs

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/AJC-G/travel-app.git
cd travel-app

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env

# Lancer le serveur
npm start
```

## Développement

Pour développer avec rechargement automatique :

```bash
npm run dev
```

## Tests

```bash
npm test
```

## Structure du projet

```
travel-app/
├── models/          # Modèles de données
├── routes/          # Routes API
├── controllers/     # Logique métier
├── middleware/      # Middlewares personnalisés
├── server.js        # Fichier principal
└── package.json     # Dépendances du projet
```

## Technologie

- **Backend**: Node.js + Express
- **Base de données**: MongoDB
- **Validation**: Mongoose

## Licence

MIT

## Auteur

AJC-G
