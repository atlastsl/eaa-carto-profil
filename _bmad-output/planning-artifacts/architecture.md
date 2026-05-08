---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
workflowType: 'architecture'
project_name: 'carto-profil'
user_name: 'Aurelien'
date: '2026-04-10'
lastStep: 8
status: 'complete'
completedAt: '2026-04-10'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Le produit exige un noyau de consultation publique (annuaire, cartographie, profil), un moteur de recherche multicritere, un back-office d'administration (Admin/Super Admin), un cycle de vie des membres base sur suppression logique (`deleted`), un mecanisme de signalement/correction, et un socle de metriques d'usage et d'audit.
Les exigences impliquent une separation nette entre capacites publiques et capacites d'administration, avec regles de visibilite strictes selon le role.

**Non-Functional Requirements:**
Les NFR imposent des objectifs mesurables: reponse <= 1s sur pages cles, HTTPS obligatoire, mots de passe haches, expiration session admin a 30 min, support de charge initiale 100 simultanes avec evolution vers 1000, accessibilite pratique (visiteur multi-device, admin PC), uptime 99.9%, sauvegarde hebdomadaire retention 30 jours.
Ces NFR orientent l'architecture vers une solution operationnelle simple mais fortement contrainte sur securite, performance percue et fiabilite.

**Scale & Complexity:**
Le projet est greenfield avec perimetre fonctionnel bien defini. La complexite est principalement metier (qualite des donnees, roles, gouvernance, tracabilite) plus que technique.
- Primary domain: web full-stack (public directory + admin back-office)
- Complexity level: medium
- Estimated architectural components: 8 a 10 composants majeurs

### Technical Constraints & Dependencies

- Mode applicatif MPA avec forte priorite SEO
- Cartographie basee sur OpenStreetMap
- Stack ciblee Vercel (frontend) + Supabase (backend/BDD)
- Politique de suppression logique obligatoire (aucune suppression physique)
- Regle anti-doublon obligatoire `(nom + prenom + promotion ENSPY)`
- Donnees publiques visibles pour visiteurs uniquement si membre non `deleted`
- Donnees utilitaires (dates ajout/modification/suppression) visibles admin uniquement
- CAPTCHA obligatoire sur signalement

### Cross-Cutting Concerns Identified

- Controle d'acces et autorisations par role (visiteur/admin/super admin)
- Gouvernance des donnees (qualite, anti-doublon, revues periodiques)
- Observabilite produit (visites, vues profils, clics contacts)
- Auditabilite administrative (journalisation exploitable + consultation avancee super admin)
- Coherence des vues (annuaire/cartographie/recherche) avec regles de visibilite uniformes
- Conformite operationnelle (sessions, sauvegardes, uptime)

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web application (server-first) basee sur AdonisJS + React + Inertia, avec rendu MPA-friendly pour SEO.

### Starter Options Considered

1. **AdonisJS React starter kit officiel**
   - Inertia + React deja integres
   - TypeScript strict et structure Adonis standard
   - Auth web preconfiguree selon le kit
   - Base la plus rapide et maintenue officiellement

2. **AdonisJS hypermedia kit + ajout React/Inertia manuel**
   - Plus flexible, mais plus de decisions manuelles
   - Risque de divergence de conventions
   - Moins optimal pour demarrage rapide

3. **Base custom from scratch**
   - Controle maximal
   - Cout de setup plus eleve
   - Faible valeur ajoutee pour ce projet

### Selected Starter: AdonisJS React Starter (Inertia)

**Rationale for Selection:**
- Aligne avec les contraintes PRD: MPA, SEO fort, back-office admin, stack full TypeScript
- Reduit les choix techniques non differenciants au demarrage
- Assure une coherence forte entre backend Adonis et frontend React via Inertia
- Limite les conflits de conventions pour implementation guidee par agents IA

**Initialization Command:**

```bash
npm create adonisjs@latest carto-profil -- --kit=react
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript end-to-end, Node.js moderne, conventions Adonis v7.

**Styling Solution:**
Tailwind CSS v4 via plugin Vite (`@tailwindcss/vite`).

**Build Tooling:**
Vite configure, pipeline front/back integree, mode dev HMR via `node ace serve --hmr`.

**Testing Framework:**
Infrastructure de tests Adonis/Japa prete a l'emploi.

**Code Organization:**
Structure standard Adonis (`app/`, `config/`, `start/`, `database/`) + espace Inertia React dedie.

**Development Experience:**
Hot reload, tooling TypeScript, lint/format et base projet production-ready.

### Authentication Recommendation

**Decision:**
Utiliser l'authentification native Adonis avec **session guard** (`@adonisjs/auth`), adaptee a une application web avec back-office admin.

**Why:**
- Compatible avec architecture server-first/Inertia
- Gestion simple des sessions admin
- Bon alignement avec besoin "Admin / Super Admin"

**Role model recommendation:**
RBAC applicatif simple:
- `super_admin`
- `admin`
- `visitor` (non authentifie)

Les permissions seront appliquees par middleware/policies sur routes admin et actions sensibles.

### Analytics Recommendation

**Decision (V1 recommande):**
Approche hybride:
1. **Metriques produit en base interne** (obligatoires pour FR): visites, vues profils, clics contact, traitement signalements.
2. **Plausible** pour analytics web globale (SEO/traffic), leger et privacy-first.

**Why:**
- Les FR imposent des metriques metier specifiques que Plausible seul ne couvre pas proprement.
- Plausible reste excellent pour trafic/referrers/pages et suivi SEO sans lourdeur.
- Evite la complexite d'une pile type PostHog trop lourde pour ce contexte.

**Note:** L'initialisation projet avec ce starter doit etre la premiere story d'implementation.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Base de donnees: PostgreSQL (Supabase) validee
- Validation serveur: VineJS valide
- Authentification: Adonis session guard valide
- Mode de role: role unique par utilisateur (`admin` ou `super_admin`)
- Pattern applicatif: Adonis + Inertia React (server-first), sans API publique V1
- Infra cible: Vercel + Supabase (DB uniquement)

**Important Decisions (Shape Architecture):**
- Aucun cache en V1
- Rate limiting prioritaire sur le flux de signalement (et login admin)
- Clustering cartographique inclus des la V1
- State management et formulaires: approche minimale et pragmatique
- Observabilite: logs applicatifs + visibilite in-app, sans outil externe

**Deferred Decisions (Post-MVP):**
- 2FA admin (hors V1)
- Outils externes de monitoring/logging (hors V1)
- Caching distribue (Redis/CDN avance) selon charge reelle

### Data Architecture

- **Database engine:** PostgreSQL (heberge sur Supabase)
- **ORM / data access:** Lucid ORM (Adonis)
- **Validation strategy:** VineJS pour toutes les entrees critiques (admin, signalements, auth flows)
- **Deletion model:** soft delete obligatoire via flag `deleted` (aucune suppression physique)
- **Uniqueness policy:** contrainte metier anti-doublon `(nom + prenom + promotion ENSPY)`
- **Caching strategy:** aucun cache applicatif en V1

### Authentication & Security

- **Auth mechanism:** Adonis Auth avec session guard (`web`)
- **Session model:** session-based auth pour espace administration
- **Role model:** role unique par user (`admin` ou `super_admin`)
- **Authorization approach:** middleware + policies sur routes/actions sensibles
- **2FA:** non inclus en V1
- **Security controls V1:** HTTPS, mots de passe haches, expiration session inactive 30 min, audit actions admin

### API & Communication Patterns

- **Primary communication model:** routes/controllers Adonis + rendu Inertia (pas d'API publique exposee en V1)
- **Internal JSON endpoints:** autorises au besoin pour interactions admin specifiques
- **Error handling:** standardisation erreurs metier + validation serveur
- **Rate limiting:** applique en priorite aux endpoints de signalement (et login admin)
- **Service boundaries:** architecture monolithique modulaire (public + admin + audit + analytics metier)

### Frontend Architecture

- **Frontend framework:** React via Inertia
- **State management:** approche simple (state local + props Inertia), sans couche globale complexe en V1
- **Forms strategy:** formulaires React simples avec validation definitive cote backend
- **Mapping:** OpenStreetMap avec clustering des points des la V1
- **Performance posture:** optimisation pragmatique (MPA/SSR-friendly, pages indexables, interactions essentielles fluides)

### Infrastructure & Deployment

- **Frontend hosting:** Vercel
- **Database hosting:** Supabase (PostgreSQL uniquement)
- **Authentication hosting:** gere par Adonis/Auth (pas Supabase Auth)
- **Logging:** logs applicatifs + surfaces de visibilite in-app
- **Monitoring:** niveau basique V1 (healthcheck/uptime minimal)
- **External observability stack:** non retenue en V1

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialiser le projet Adonis React/Inertia TypeScript
2. Configurer PostgreSQL + schema metier (membres, users, roles, signalements, audit)
3. Mettre en place auth session + RBAC role unique
4. Implementer parcours public (annuaire, recherche, cartographie clusterisee, fiche membre)
5. Implementer back-office admin/super-admin (CRUD logique, signalements, audit)
6. Ajouter rate limiting cible + logs + metriques metier

**Cross-Component Dependencies:**
- Soft delete impacte annuaire, recherche, cartographie, admin listing
- RBAC impacte toutes les routes et actions admin
- Validation VineJS conditionne qualite des donnees + anti-doublon
- Clustering carto depend de la qualite des donnees de localisation
- Audit et metriques traversent l'ensemble des modules admin/public

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
5 zones majeures ou des agents IA peuvent diverger sans conventions explicites:
- naming
- structure
- formats
- auth/permissions
- process (validation, erreurs, logs)

### Naming Patterns

**Database Naming Conventions:**
- Tables en `snake_case` pluriel: `members`, `admin_audit_logs`, `member_reports`
- Colonnes en `snake_case`: `created_at`, `updated_at`, `deleted_at`, `member_id`
- Cles etrangeres: `<entity>_id` (ex: `member_id`, `reporter_user_id`)
- Index/contraintes: `idx_<table>_<column>`, `uq_<table>_<business_key>`

**Routing & URL Conventions:**
- Routes lisibles en kebab-case/pluriel: `/members`, `/admin/reports`
- Parametres de route: `:id` / `:slug`
- Pas de versionning API publique en V1 (architecture Inertia-first)

**Code Naming Conventions:**
- Composants React: `PascalCase` (`MemberCard.tsx`)
- Variables/fonctions TS: `camelCase` (`findMemberById`)
- Constantes globales: `UPPER_SNAKE_CASE`
- Fichiers backend: alignes conventions Adonis + nom metier explicite

### Structure Patterns

**Project Organization (feature-first):**
- Organisation par domaine metier:
  - `members`
  - `directory-search`
  - `map`
  - `reports`
  - `admin`
  - `auth`
  - `audit`
- Chaque module contient routes, controleurs, validators, services, policies si besoin

**Testing Structure:**
- Tests co-localises par module (`*.spec.ts`)
- Scenarios critiques:
  - recherche/filtrage
  - soft-delete visibility rules
  - RBAC admin/super-admin
  - traitement signalements

### Format Patterns

**Inertia-First Response Pattern (default):**
- Toutes les pages applicatives retournent des reponses Inertia (`inertia.render(...)`)
- Les donnees UI transitent via props Inertia typees

**JSON Usage Policy (exception only):**
- JSON autorise uniquement pour:
  - healthcheck
  - webhooks
  - integrations techniques futures
  - endpoints internes cibles
- Aucune API JSON publique V1

**Date & Data Formats:**
- Dates en ISO 8601
- Booleens natifs (`true/false`)
- Null explicite (pas de valeurs sentinelles ambiguës)

### Communication Patterns

**Authorization Flow:**
- Middleware `auth` obligatoire pour zone admin
- Middleware de role explicite (`admin` / `super_admin`)
- Policies centralisees pour actions sensibles

**State/Data Flow:**
- Priorite au flux serveur -> props Inertia -> rendu React
- Eviter etat global complexe en V1 (local state prioritaire)
- Validation backend = source de verite

### Process Patterns

**Validation & Data Integrity:**
- VineJS systematique avant logique metier
- Regle anti-doublon centralisee cote service + contrainte BDD
- Soft delete strict: jamais de suppression physique

**Error Handling:**
- Erreurs metier normalisees cote serveur
- Messages UI clairs sans fuite d'info technique
- Distinction nette: erreur utilisateur vs erreur systeme

**Logging & Audit:**
- Logs applicatifs structures minimaux: `level`, `event`, `actorId`, `entity`, `entityId`
- Audit admin persistant en BDD
- Consultation agregee audit reservee super-admin

### Enforcement Guidelines

**All AI Agents MUST:**
- Respecter strictement l'architecture Inertia-first (pas d'API publique JSON en V1)
- Appliquer conventions de nommage et structure feature-first
- Implementer validation VineJS + soft delete + RBAC sans exceptions silencieuses

**Pattern Enforcement:**
- Revue PR orientee conventions
- Checklist de conformite architecture pour chaque story
- Tout ecart doit etre documente dans la decision d'architecture

### Pattern Examples

**Good Examples:**
- `members` table with `deleted_at` + filtre centralise "visiteur = non deleted"
- `AdminReportsController` protege par `auth` + role + policy
- `inertia.render('members/index', { members, filters, pagination })`

**Anti-Patterns:**
- Endpoint JSON public ajoute sans justification architecture
- Hard delete direct en base pour un membre
- Validation uniquement frontend sans validator VineJS serveur
- Conventions mixtes `camelCase`/`snake_case` non maitrisees dans la DB

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
carto-profil/
├── app/
│   ├── modules/
│   │   ├── members/
│   │   ├── directory_search/
│   │   ├── map/
│   │   ├── reports/
│   │   ├── admin/
│   │   ├── auth/
│   │   └── audit/
│   ├── middleware/
│   ├── policies/
│   ├── models/
│   ├── services/
│   └── shared/
├── inertia/
│   ├── pages/
│   │   ├── public/
│   │   └── admin/
│   ├── components/
│   ├── layouts/
│   └── hooks/
├── config/
├── database/
│   ├── migrations/
│   └── seeders/
├── start/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── resources/
│   └── css/
├── public/
├── .github/workflows/
├── package.json
├── adonisrc.ts
├── vite.config.ts
├── tsconfig.json
├── .env
└── .env.example
```

### Architectural Boundaries

**API Boundaries:**
- Frontiere principale Inertia (controllers Adonis -> pages React)
- Endpoints JSON internes limites (healthcheck, webhooks, besoins techniques)
- Aucune API publique V1

**Component Boundaries:**
- Front public separe du front admin (`inertia/pages/public` vs `inertia/pages/admin`)
- Chaque module metier expose uniquement ses services publics
- Les policies font frontiere pour actions sensibles

**Service Boundaries:**
- `app/modules/*/services` contient logique metier par domaine
- `app/services` reserve aux services transverses
- `app/shared` pour utilitaires partages

**Data Boundaries:**
- Acces DB via Lucid models + services metier
- Soft delete obligatoire sur entites membres
- Audit et metriques stockes dans modules dedies

### Requirements to Structure Mapping

**Feature Mapping:**
- Annuaire / profils / filtres -> `app/modules/members`, `app/modules/directory_search`, `inertia/pages/public`
- Cartographie + clustering -> `app/modules/map`, `inertia/pages/public`
- Signalements -> `app/modules/reports`, `inertia/pages/public`, `inertia/pages/admin`
- Admin / super-admin -> `app/modules/admin`, `app/modules/auth`, `inertia/pages/admin`
- Audit / traçabilite -> `app/modules/audit`

**Cross-Cutting Concerns:**
- RBAC -> `app/middleware`, `app/policies`, `app/modules/auth`
- Validation VineJS -> validators dans chaque module metier
- Logging standardise -> `app/services` + `app/modules/audit`

### Integration Points

**Internal Communication:**
- UI React recoit les props via Inertia
- Modules communiquent via services explicites
- Pas d'acces direct cross-module a la persistence

**External Integrations:**
- PostgreSQL via Supabase (DB)
- OpenStreetMap pour cartographie
- Plausible + metriques metier internes

**Data Flow:**
- Request -> Route -> Middleware/Policy -> Controller -> Service -> Model -> Response Inertia
- JSON interne uniquement pour cas techniques cibles

### File Organization Patterns

**Configuration Files:**
- Config framework dans `config/`
- Variables d'environnement dans `.env` / `.env.example`

**Source Organization:**
- Feature-first dans `app/modules`
- UI Inertia dans `inertia/`
- Logique transversale dans `app/services` et `app/shared`

**Test Organization:**
- Suite globale: `tests/unit`, `tests/integration`, `tests/e2e`
- Co-localisation possible `*.spec.ts` dans modules critiques

**Asset Organization:**
- Styles globaux dans `resources/css`
- Assets publics dans `public/`

### Development Workflow Integration

**Development Server Structure:**
- `node ace serve --hmr` pour backend + front Inertia
- Vite gere bundling frontend React/Tailwind

**Build Process Structure:**
- Build unique aligne Adonis + Vite
- Pipeline CI dans `.github/workflows`

**Deployment Structure:**
- Front servi via Vercel
- DB PostgreSQL via Supabase
- Secrets geres par variables d'environnement

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
Les choix techniques sont compatibles entre eux: AdonisJS v7 + Inertia React + TypeScript + PostgreSQL (Supabase DB) + Tailwind. Les decisions d'auth, de role unique, de soft delete, et de rate limiting cible ne se contredisent pas.

**Pattern Consistency:**
Les conventions de naming, structure, formats et process soutiennent explicitement les decisions coeur. Le principe Inertia-first reste coherent avec l'absence d'API publique V1.

**Structure Alignment:**
La structure feature-first proposee supporte correctement les domaines metier, la separation public/admin, ainsi que les preoccupations transverses (auth, audit, metriques, validations).

### Requirements Coverage Validation ✅

**Feature Coverage:**
Toutes les capacites majeures du PRD sont mappees a des modules et zones d'interface dedies (annuaire, recherche, carto, signalement, admin, audit).

**Functional Requirements Coverage:**
Les FR sont couverts via:
- modules metier dedies
- policies/middleware pour RBAC
- persistance compatible soft delete et anti-doublon
- instrumentation metriques et audit

**Non-Functional Requirements Coverage:**
Les NFR sont adresses architecturalement:
- performance (stack simple, Inertia-first)
- securite (HTTPS, session guard, hash, RBAC)
- scalabilite initiale raisonnable
- accessibilite minimale pratique
- fiabilite (logs + monitoring basique + politique de sauvegarde DB)

### Implementation Readiness Validation ✅

**Decision Completeness:**
Decisions critiques documentees et exploitables par agents IA.

**Structure Completeness:**
Arborescence projet claire, frontieres explicites, integrations identifiees.

**Pattern Completeness:**
Regles de coherence suffisantes pour limiter les divergences inter-agents.

### Gap Analysis Results

**Critical Gaps:** Aucun bloquant identifie.

**Important Gaps:**
- Preciser la strategie exacte de tests E2E (framework + cibles prioritaires)
- Preciser le schema detaille des tables d'audit et metriques

**Nice-to-Have:**
- Formaliser un court guide de contribution agent (checklist PR)

### Validation Issues Addressed

- Clarification architecture Inertia-first vs API JSON confirmee
- Role de Supabase restreint a la DB (auth geree par Adonis) confirme
- Clustering cartographique V1 confirme

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Contexte et contraintes analyses
- [x] Complexite et domaines mappes
- [x] Cross-cutting concerns identifies

**✅ Architectural Decisions**
- [x] Stack et decisions critiques fixees
- [x] Securite/auth definies
- [x] Frontieres techniques explicites

**✅ Implementation Patterns**
- [x] Naming, structure, formats, process definis
- [x] Regles anti-conflits agents explicites

**✅ Project Structure**
- [x] Arborescence complete proposee
- [x] Mapping exigences -> modules realise

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Architecture simple et coherente avec le besoin
- Forte tracabilite FR/NFR -> structure
- Faible risque de divergence entre agents IA

**Areas for Future Enhancement:**
- Montee en observabilite externe post-MVP
- 2FA admin
- Optimisation cache si charge reelle l'exige

### Implementation Handoff

**AI Agent Guidelines:**
- Respecter strictement les decisions et patterns documentes
- Implementer en priorite les modules MVP definis
- Ne pas introduire d'API publique V1 sans decision explicite

**First Implementation Priority:**
Initialiser le projet via starter valide, puis poser les fondations DB + auth + RBAC + soft delete.
