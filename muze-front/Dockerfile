# Utiliser une image Node.js pour construire l'application React
FROM node:22-alpine AS build

# Installer pnpm globalement
RUN npm install -g pnpm

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances de production
RUN pnpm install --frozen-lockfile --prod
RUN pnpm install react-scripts

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application React
RUN pnpm run build

# Utiliser Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port par défaut de Nginx
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
