# Utiliser une image de base légère
FROM node:22-alpine AS base

# Installer pnpm globalement
RUN npm install -g pnpm

# Étape de production
WORKDIR /app
# Copier uniquement les fichiers nécessaires pour la production
COPY package.json pnpm-lock.yaml ./
# Installer uniquement les dépendances de production, y compris reflect-metadata
RUN pnpm install --frozen-lockfile

COPY . .
RUN node ace build

# Exposer le port pour l'application
EXPOSE 3333


# Commande pour démarrer le serveur de production
CMD ["node", "./build/bin/server.js"]

