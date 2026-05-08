# Story 3.2: Protéger les routes admin par middleware d'authentification

Status: review

## Story

As a product owner,
I want toutes les routes admin protégées par authentification,
so that les visiteurs non authentifiés ne puissent pas accéder au back-office.

## Acceptance Criteria

1. **Given** un visiteur non authentifié
   **When** il accède à `GET /admin`
   **Then** il est redirigé vers `/login` (302)
   **And** après connexion réussie, il est renvoyé vers la destination initiale

2. **Given** un administrateur authentifié
   **When** il accède à `GET /admin`
   **Then** la page dashboard s'affiche normalement (200)

3. **Given** n'importe quel visiteur
   **When** il accède aux routes publiques (`/`, `/login`)
   **Then** ces routes restent accessibles sans authentification

4. **Given** des routes admin futures (membres, signalements, audit, etc.)
   **When** elles sont ajoutées au groupe admin
   **Then** elles héritent automatiquement de la protection auth sans configuration supplémentaire

## Tasks / Subtasks

- [x] **Task 1 — Restructurer les routes en groupe admin protégé** (AC: #1, #2, #4)
  - [x] Remplacer `router.get('/admin', ...)` par un `router.group()` avec `.use(middleware.auth())`
  - [x] Utiliser `.prefix('/admin')` — toutes les futures routes admin seront sous `/admin`
  - [x] Nom de route `admin.dashboard` conservé sur la route index
  - [x] `auth_middleware.ts` redirige vers `/login` ✅ (déjà configuré en Story 3.1)

- [x] **Task 2 — Tests de protection des routes** (AC: #1, #2, #3)
  - [x] Test : GET /admin sans auth → 302 redirect vers /login ✅
  - [x] Test : GET /admin avec auth → 200 ✅
  - [x] Test : GET / sans auth → 200 ✅
  - [x] Test : GET /login sans auth → 200 ✅

## Dev Notes

### État actuel (héritage Story 3.1)

```typescript
// start/routes.ts — AVANT Story 3.2
router.get('/admin', [AdminController, 'index']).as('admin.dashboard')  // ← non protégé
```

### Implémentation cible

Remplacer la route admin isolée par un groupe protégé :

```typescript
// Groupe admin protégé — toutes les routes admin futures s'ajoutent ici
router
  .group(() => {
    router.get('/', [AdminController, 'index']).as('admin.dashboard')
    // Story 3.3+ : routes RBAC, membres, signalements, audit...
  })
  .prefix('/admin')
  .use(middleware.auth())
```

**Pourquoi un groupe avec `.prefix('/admin')` plutôt que `.get('/admin', ...)` directement ?**
- Les Stories 3.3–3.6 et Epic 4 ajouteront des dizaines de routes admin
- Le groupe garantit que TOUTE route ajoutée sous ce groupe est automatiquement protégée
- Évite d'oublier `.use(middleware.auth())` sur chaque nouvelle route admin

### `auth_middleware.ts` — comportement actuel

```typescript
// app/middleware/auth_middleware.ts
export default class AuthMiddleware {
  redirectTo = '/login'  // ← redirige vers la page de login si non authentifié

  async handle(ctx, next, options) {
    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    return next()
  }
}
```

AdonisJS stocke la destination initiale (`intendedRoute`) en session quand le middleware `auth` redirige. Après connexion, l'utilisateur peut être renvoyé vers sa destination — c'est géré automatiquement par `authenticateUsing`.

### Convention pour les routes admin futures

Toutes les routes admin (Stories 3.3+, Epic 4, Epic 5, Epic 6) s'ajouteront DANS le groupe :

```typescript
router
  .group(() => {
    router.get('/', [AdminController, 'index']).as('admin.dashboard')

    // Story 3.3 : RBAC (routes séparées par rôle)
    // Story 3.4 : router.resource('accounts', [AccountsController])
    // Epic 4 : router.resource('members', [MembersController])
    // ...
  })
  .prefix('/admin')
  .use(middleware.auth())
```

### Ce que cette story NE fait PAS

- Pas de RBAC `admin` vs `super_admin` (Story 3.3)
- Pas de protection par rôle sur des routes spécifiques
- Pas de modification du layout ou de la navigation admin
- Pas de redirect vers la destination initiale après login (géré nativement par AdonisJS, pas de code à ajouter)

### Héritage Story 3.1

- `auth_middleware.ts` existant et opérationnel — `redirectTo = '/login'`
- `middleware.auth()` disponible depuis `start/kernel.ts`
- Infrastructure de test SQLite in-memory complète : `group.each.setup`, `loginAs`, `sessionApiClient`
- Pattern de test établi dans `tests/functional/auth.spec.ts`

### Project Structure Notes

Fichiers modifiés :
- `start/routes.ts` — restructuration en groupe admin avec `.prefix('/admin').use(middleware.auth())`

Fichiers créés :
- `tests/functional/admin_access.spec.ts` — tests de protection des routes admin

### References

- [Source: architecture.md#Authentication & Security] — middleware auth + policies
- [Source: architecture.md#API Boundaries] — séparation public/admin
- [Source: epics.md#Story 3.2] — user story et acceptance criteria
- [Source: 3-1-authentification-admin-session.md] — auth_middleware, middleware.auth(), pattern de tests

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

Aucun problème rencontré — implémentation directe.

### Completion Notes List

- **Task 1** : Route `/admin` restructurée en groupe `router.group().prefix('/admin').use(middleware.auth())`. La route index devient `GET /` dans le groupe (soit `/admin` après prefix). Nom `admin.dashboard` conservé. Toutes les routes admin futures s'ajoutent dans ce groupe.
- **Task 2** : 4 tests fonctionnels créés dans `tests/functional/admin_access.spec.ts`. 27/27 tests passent (17 unit + 10 functional).

### File List

**Fichiers modifiés :**
- `start/routes.ts` — groupe admin protégé avec `.prefix('/admin').use(middleware.auth())`

**Fichiers créés :**
- `tests/functional/admin_access.spec.ts`

### Change Log

- 2026-05-08 : Story 3.2 implémentée — groupe admin protégé, 27/27 tests
