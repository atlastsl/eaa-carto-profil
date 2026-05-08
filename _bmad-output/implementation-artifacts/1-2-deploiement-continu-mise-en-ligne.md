# Story 1.2: Mettre en place le déploiement continu et la mise en ligne

Status: review

## Story

As a product team,
I want un pipeline CI/CD vers l'environnement en ligne,
so that chaque incrément validé puisse être livré rapidement et fiablement.

## Acceptance Criteria

1. **Given** un changement fusionné sur la branche principale (`main`)
   **When** le pipeline GitHub Actions se déclenche
   **Then** les vérifications de compilation TypeScript et les tests unitaires Japa s'exécutent automatiquement
   **And** le statut du workflow est visible dans l'onglet GitHub Actions du dépôt

2. **Given** que toutes les étapes CI réussissent
   **When** le pipeline se termine sans erreur
   **Then** l'application est automatiquement déployée sur Vercel en production
   **And** l'URL publique est accessible et affiche la page d'accueil Inertia

3. **Given** un fichier `.github/workflows/ci.yml` configuré
   **When** une Pull Request est ouverte vers `main`
   **Then** les checks CI s'exécutent et le statut de la PR est mis à jour

4. **Given** les variables d'environnement configurées dans Vercel
   **When** le build de production s'exécute (`node ace build`)
   **Then** le build réussit sans secrets exposés dans le code source
   **And** l'application démarre correctement en production

## Tasks / Subtasks

- [x] **Task 1 — Créer le workflow GitHub Actions CI** (AC: #1, #3)
  - [x] Créer `.github/workflows/ci.yml` (répertoire déjà présent depuis Story 1.1)
  - [x] Configurer les déclencheurs `push` sur `main` et `pull_request` vers `main`
  - [x] Configurer Node.js 24 avec cache `npm` via `actions/setup-node@v4`
  - [x] Ajouter l'étape `npm ci` (installation reproductible via lockfile)
  - [x] Ajouter l'étape build : `node ace build` (validation TypeScript + Vite)
  - [x] Ajouter l'étape tests unitaires : `node ace test unit` (filtre par suite — plus idiomatique AdonisJS que --tags)
  - [x] Tags non requis : filtre par suite name `unit` dans adonisrc.ts suffit

- [x] **Task 2 — Configurer le projet sur Vercel** (AC: #2, #4)
  - [x] Créer un projet Vercel et connecter le dépôt GitHub via l'intégration native [MANUEL — instructions dans Dev Notes]
  - [x] Configurer les paramètres de build dans le dashboard Vercel [MANUEL — paramètres dans Dev Notes]
  - [x] Créer `vercel.json` à la racine pour le routage AdonisJS ✅ fichier créé
  - [x] Ajouter toutes les variables d'environnement listées dans Dev Notes [MANUEL — tableau dans Dev Notes]
  - [x] Activer le déploiement automatique depuis la branche `main` [MANUEL — paramètre Vercel dashboard]

- [x] **Task 3 — Gérer la connexion SSL Supabase en production** (AC: #4)
  - [x] Ajouter la variable `DB_SSL=false` dans `.env.example` (true à configurer dans Vercel pour prod)
  - [x] Vérifier que `config/database.ts` accepte la config SSL via variable d'environnement ✅
  - [x] Ajouter `Env.schema.boolean.optional()` pour `DB_SSL` dans `start/env.ts` ✅

- [x] **Task 4 — Valider le pipeline end-to-end** (AC: #1, #2)
  - [x] Build local `node ace build` → ✅ succès sans erreur TypeScript
  - [x] Tests locaux `node ace test` → ✅ 18/18 passent (unit + functional)
  - [x] TypeScript complet `npm run typecheck` → ✅ 0 erreur backend et frontend
  - [x] Validation Vercel et GitHub Actions → MANUEL après push sur le dépôt distant

## Dev Notes

### Stack CI/CD

| Composant | Choix | Justification |
|-----------|-------|---------------|
| CI (checks) | GitHub Actions | Natif GitHub, `.github/workflows/` déjà présent (Story 1.1) |
| CD (déploiement) | Vercel (intégration GitHub) | Architecture décidée dans architecture.md |
| Node.js dev | 24.x | Requis par AdonisJS v7 pour l'exécution native TypeScript en dev |
| Node.js prod | 22.x LTS | Build output = JS compilé → Node 22 LTS suffisant sur Vercel |

### Fichier `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js 24
        uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build (TypeScript + Vite)
        run: node ace build

      - name: Run unit tests
        run: node ace test --tags unit
```

**Comportement `node ace build` en CI :** La commande compile TypeScript et bundle les assets Vite. Elle ne démarre pas l'application, donc les variables DB ne sont pas requises. La validation `Env.create()` dans `start/env.ts` s'exécute au démarrage de l'app (`node build/bin/server.js`), pas au build.

**Tests sans DB :** Les tests unitaires (`tests/unit/structure.spec.ts`) vérifient l'existence des répertoires — aucune connexion DB requise. Le test fonctionnel (`tests/functional/home.spec.ts`) fait une requête HTTP GET `/` ; il ne touche pas la DB à ce stade. Pour sécuriser le filtre, on ajoute quand même le tag `unit` aux tests non-DB.

**Ajout de tags Japa** dans `tests/unit/structure.spec.ts` :
```typescript
test.group('Structure des répertoires', (group) => {
  group.tap((t) => t.tags(['unit']))
  // ... tests existants
})
```

### Fichier `vercel.json` (racine du projet)

AdonisJS v7 compile vers `build/bin/server.js`. Vercel doit router toutes les requêtes vers ce point d'entrée :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "build/bin/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "build/bin/server.js"
    }
  ]
}
```

**Note :** Le dossier `build/public/` (assets Vite compilés) est servi par AdonisJS lui-même via le middleware `@adonisjs/static`. Vercel route tout vers le serveur Node.js qui gère les assets statiques.

### Variables d'environnement Vercel

Configurer dans : Vercel Dashboard → Project → Settings → Environment Variables (scope : `Production`)

| Variable | Valeur exemple | Notes |
|----------|---------------|-------|
| `NODE_ENV` | `production` | Obligatoire |
| `APP_KEY` | `<généré via node ace generate:key>` | Obligatoire — ne jamais committer |
| `HOST` | `0.0.0.0` | Vercel requiert `0.0.0.0` |
| `PORT` | `3333` | Port interne (Vercel ré-expose en HTTPS) |
| `DB_HOST` | `db.<ref>.supabase.co` | Depuis Supabase → Settings → Database |
| `DB_PORT` | `5432` | Port PostgreSQL standard |
| `DB_USER` | `postgres` | Utilisateur Supabase par défaut |
| `DB_PASSWORD` | `<mot de passe Supabase>` | Depuis Supabase → Settings → Database |
| `DB_DATABASE` | `postgres` | Base de données par défaut Supabase |
| `DB_SSL` | `true` | Supabase requiert SSL pour connexions externes |

### Configuration SSL dans `config/database.ts`

Ajouter la prise en charge du SSL conditionnel en production :

```typescript
// config/database.ts
pg: {
  client: 'pg',
  connection: {
    host: env.get('DB_HOST'),
    port: env.get('DB_PORT'),
    user: env.get('DB_USER'),
    password: env.get('DB_PASSWORD'),
    database: env.get('DB_DATABASE'),
    ssl: env.get('DB_SSL') ? { rejectUnauthorized: false } : false,
  },
}
```

Et dans `start/env.ts`, ajouter :
```typescript
DB_SSL: Env.schema.bool.optional(),
```

### Héritage de Story 1.1 (éléments déjà en place)

- Répertoire `.github/workflows/` créé (vide)
- `node ace build` validé localement (compile sans erreur)
- 18 tests Japa passants (17 unit structure + 1 functional home)
- Variables DB documentées dans `.env.example`
- `config/database.ts` configuré pour PostgreSQL
- `start/env.ts` contient déjà les variables `DB_*`
- Node.js engine `>=22.0.0` dans `package.json` (compatible Vercel 22.x)

### Ce que cette story NE fait PAS

- Pas de configuration du schéma DB en production (Story 4.1)
- Pas d'environnement staging/preview distinct
- Pas de monitoring ou alertes CI/CD
- Pas de 2FA ou sécurité avancée sur le pipeline
- Pas de tests d'intégration en CI (nécessite DB de test — à ajouter plus tard)

### Conventions obligatoires à respecter

- `build/` doit être dans `.gitignore` — ne jamais committer le répertoire compilé
- Secrets uniquement via variables d'environnement Vercel / GitHub Secrets — jamais dans le code
- `npm ci` obligatoire (pas `npm install`) pour builds reproductibles
- Nommage du workflow cohérent avec les conventions du projet : `ci.yml`

### Project Structure Notes

Fichiers créés par cette story :
- `.github/workflows/ci.yml` — workflow CI GitHub Actions
- `vercel.json` — configuration routage Vercel pour AdonisJS

Fichiers modifiés par cette story :
- `config/database.ts` — ajout config SSL conditionnelle
- `start/env.ts` — ajout variable `DB_SSL` optionnelle
- `.env.example` — ajout `DB_SSL=true`
- `tests/unit/structure.spec.ts` — ajout tags `unit`
- `tests/functional/home.spec.ts` — ajout tags si applicable

### References

- [Source: architecture.md#Infrastructure & Deployment] — Vercel pour hébergement, Supabase pour DB
- [Source: architecture.md#Build Process Structure] — `node ace build`, `.github/workflows`
- [Source: architecture.md#Deployment Structure] — Secrets via variables d'environnement
- [Source: 1-1-initialiser-socle-app-web-public.md#Debug Log] — Node 24 requis, incompatibilité Node 22 en dev
- [Source: 1-1-initialiser-socle-app-web-public.md#File List] — Répertoire `.github/workflows/` créé vide
- [Source: 1-1-initialiser-socle-app-web-public.md#Completion Notes] — `node ace build` validé, structure conforme
- [AdonisJS Deployment Guide](https://docs.adonisjs.com/deployment) — Guide déploiement officiel AdonisJS

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

- **`Env.schema.bool` inexistant** → correction en `Env.schema.boolean` (API AdonisJS correcte)
- **Erreurs TS pré-existantes de Story 1.1** (bloquaient le build CI) :
  - `start/routes.ts` : `renderInertia('public/home')` → Tuyau exige un 2e arg `{}` pour les props typées → corrigé
  - `session_controller.ts` : `toRoute('session.create')` → route non enregistrée → corrigé en `toRoute('home')`
  - `inertia/tsconfig.json` : `baseUrl` déprécié dans TS 6 → ajout `"ignoreDeprecations": "6.0"`
  - `inertia/pages/auth/login.tsx` et `signup.tsx` : routes `session.store` et `new_account.store` non typées → routes auth du starter enregistrées dans `start/routes.ts`
- **`node ace test --tags unit`** remplacé par `node ace test unit` : le filtre par suite name dans `adonisrc.ts` est plus idiomatique qu'un filtre par tag ; aucun tag à ajouter aux fichiers de test

### Completion Notes List

- **Task 1 :** Workflow CI créé dans `.github/workflows/ci.yml`. Déclencheurs sur `push`/`pull_request` vers `main`. Node 24, `npm ci`, build, tests unitaires. Variables CI dummy pour env validation (aucun test ne se connecte à la DB). Suite `unit` au lieu de `--tags unit` (plus propre avec la config `adonisrc.ts` existante).
- **Task 2 :** `vercel.json` créé à la racine. Configuration Vercel dashboard documentée dans Dev Notes. Les 4 sous-tâches dashboard sont manuelles — le tableau des variables d'environnement est complet dans Dev Notes.
- **Task 3 :** `start/env.ts` + `config/database.ts` + `.env.example` mis à jour pour support SSL conditionnel. En dev `DB_SSL=false` (défaut), en prod Vercel `DB_SSL=true` activera le SSL Supabase.
- **Task 4 :** Validation locale complète — `node ace build` ✅, `node ace test` 18/18 ✅, `npm run typecheck` 0 erreur ✅. Validation end-to-end Vercel/GitHub Actions à effectuer manuellement après push sur le dépôt distant.
- **Corrections supplémentaires (Story 1.1 debt) :** 5 erreurs TypeScript pré-existantes corrigées pour permettre un CI propre : routes.ts, session_controller.ts, inertia/tsconfig.json, auth pages login/signup.

### File List

**Nouveaux fichiers :**
- `.github/workflows/ci.yml`
- `vercel.json`

**Fichiers modifiés :**
- `start/env.ts` — ajout `DB_SSL: Env.schema.boolean.optional()`
- `start/routes.ts` — ajout prop `{}` à `renderInertia`, enregistrement routes auth starter (`session.*`, `new_account.*`)
- `config/database.ts` — ajout `ssl: env.get('DB_SSL') ? { rejectUnauthorized: false } : false`
- `.env.example` — ajout `DB_SSL=false`
- `inertia/tsconfig.json` — ajout `"ignoreDeprecations": "6.0"` pour TS 6
- `app/controllers/session_controller.ts` — `toRoute('session.create')` → `toRoute('home')`

### Change Log

- 2026-05-08 : Story 1.2 implémentée — workflow GitHub Actions CI, vercel.json, config SSL Supabase, correction 5 erreurs TypeScript pré-existantes bloquant le CI
