FROM node:18-alpine

WORKDIR /app

# Installer les dépendances
COPY package.json package-lock.json* ./
RUN npm ci

# Copier le code source
COPY . .

# Installer un serveur statique pour servir le build
RUN npm install -g serve

EXPOSE 3000

# En production : build puis servir les fichiers statiques
# Les variables REACT_APP_* définies dans docker-compose seront lues au moment du build
CMD ["sh", "-c", "npm run build && serve -s build -l 3000"]
