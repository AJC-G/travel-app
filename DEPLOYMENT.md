# 🚀 Guide de Déploiement sur Vercel

## Prérequis

- Compte GitHub (déjà fait ✅)
- Compte Vercel (créez-en un sur https://vercel.com)
- MongoDB Atlas (base de données cloud)

## Étape 1 : Configurer MongoDB Atlas

1. **Créer un compte MongoDB Atlas** : https://www.mongodb.com/cloud/atlas
2. **Créer un cluster** :
   - Choisir "Free" tier
   - Sélectionner une région
   - Créer un cluster
3. **Créer un utilisateur DB** :
   - Aller dans "Database Access"
   - Créer un nouvel utilisateur
   - Sauvegarder le mot de passe
4. **Récupérer la connection string** :
   - Aller dans "Clusters"
   - Cliquer sur "Connect"
   - Copier la URI (ressemblera à : `mongodb+srv://user:password@cluster.mongodb.net/travel-app?retryWrites=true&w=majority`)

## Étape 2 : Préparer le projet

### Modifier `client/package.json`

```json
{
  "homepage": ".",
  "proxy": "http://localhost:5000"
}
```

### Créer les fichiers de déploiement

#### `server.js` - Ajouter support des fichiers statiques

```javascript
// Au début du fichier
app.use(express.static(path.join(__dirname, 'client/build')));

// À la fin, avant app.listen()
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}
```

## Étape 3 : Déployer sur Vercel

### Option A : Déploiement via Git (recommandé)

1. **Aller sur https://vercel.com/new**
2. **Connecter votre compte GitHub**
3. **Importer le projet `travel-app`**
4. **Configurer les variables d'environnement** :
   - Aller dans "Settings" → "Environment Variables"
   - Ajouter :
     - `MONGODB_URI` : Votre MongoDB Atlas URI
     - `JWT_SECRET` : Une clé secrète forte (ex: générez avec `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
     - `NODE_ENV` : `production`
5. **Cliquer sur "Deploy"**

### Option B : Déploiement via CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod

# Configurer les variables d'environnement lors du déploiement
```

## Étape 4 : Configuration post-déploiement

1. **Vérifier les logs** :
   - Aller sur https://vercel.com/dashboard
   - Sélectionner votre projet
   - Voir les logs en temps réel

2. **Tester l'application** :
   - L'URL sera de type : `https://travel-app.vercel.app`
   - Tester l'inscription
   - Tester la connexion
   - Tester la création de voyages

3. **Activer les domaines personnalisés** (optionnel) :
   - Dans les paramètres Vercel du projet
   - Ajouter votre domaine personnalisé

## Commandes utiles

```bash
# Build local pour tester
npm run build

# Lancer en mode production localement
NODE_ENV=production npm start

# Vérifier le build du client
cd client && npm run build
```

## Dépannage

### Erreur: "Cannot find module"
```bash
# Réinstaller les dépendances
npm install
cd client && npm install
```

### La BD ne se connecte pas
- Vérifier la MongoDB URI dans les variables d'environnement Vercel
- S'assurer que l'IP whitelist inclut `0.0.0.0/0` dans MongoDB Atlas

### Le frontend ne se charge pas
- Vérifier que le build React a réussi dans les logs Vercel
- Vérifier que `vercel.json` est correct

## URLs après déploiement

- **Frontend** : `https://travel-app.vercel.app`
- **Backend API** : `https://travel-app.vercel.app/api`
- **Login** : `https://travel-app.vercel.app/login`
- **Register** : `https://travel-app.vercel.app/register`
- **Dashboard** : `https://travel-app.vercel.app/` (after login)

## Variables d'environnement Vercel

| Variable | Valeur |
|----------|--------|
| `MONGODB_URI` | Votre MongoDB Atlas URI |
| `JWT_SECRET` | Une clé secrète (minimum 32 caractères) |
| `NODE_ENV` | `production` |

## Architecture de déploiement

```
┌─────────────────┐
│   Vercel        │
├─────────────────┤
│  React Build    │
│  (client/build) │
├─────────────────┤
│  Node.js Server │
│  (server.js)    │
├─────────────────┤
│  API Routes     │
└─────────────────┘
         ↓
  ┌─────────────────┐
  │ MongoDB Atlas   │
  │ (Cloud)         │
  └─────────────────┘
```

## Support et aide

- **Documentation Vercel** : https://vercel.com/docs
- **MongoDB Atlas Docs** : https://docs.atlas.mongodb.com
- **Problèmes de déploiement** : Consultez les logs Vercel

---

**Bravo ! Votre application de voyage est maintenant déployée et accessible en ligne ! 🎉**
