FROM node:24-alpine AS builder
WORKDIR /app

# Installe toutes les dépendances (devDeps incluses pour la compilation)
COPY package*.json ./
RUN npm ci

# Copie les sources et compile
COPY . .
RUN node ace build

# Installe uniquement les deps de production dans le dossier compilé
WORKDIR /app/build
RUN npm ci --omit=dev

# ─── Image de production ────────────────────────────────────────────────────
FROM node:24-alpine AS production
WORKDIR /app

COPY --from=builder /app/build .

EXPOSE 3333

CMD ["node", "bin/server.js"]
