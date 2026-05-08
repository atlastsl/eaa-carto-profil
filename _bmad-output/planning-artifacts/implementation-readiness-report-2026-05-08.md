---
stepsCompleted:
  - step-01-document-discovery
  - step-02-prd-analysis
  - step-03-epic-coverage
  - step-04-ux-alignment
  - step-05-epic-quality-review
  - step-06-final-assessment
documents:
  prd: 'prd.md'
  architecture: 'architecture.md'
  epics: 'epics.md'
  ux: 'ux-design-specification.md'
---

# Implementation Readiness Assessment Report

**Date:** 2026-05-08
**Project:** carto-profil

## Document Inventory

| Document | Fichier | Format | Statut |
|----------|---------|--------|--------|
| PRD | prd.md | Whole | Present |
| Architecture | architecture.md | Whole | Present |
| Epics & Stories | epics.md | Whole | Present |
| UX Design | ux-design-specification.md | Whole | Present |

**Doublons:** Aucun
**Documents manquants:** Aucun

## PRD Analysis

### Functional Requirements (60 FRs)

**Consultation publique (FR1-FR6):**
- FR1: Un visiteur peut acceder a la page d'accueil publique de la plateforme.
- FR2: Un visiteur peut consulter l'annuaire alphabetique des membres.
- FR3: Un visiteur peut ouvrir la fiche detaillee d'un membre depuis l'annuaire.
- FR4: Un visiteur peut consulter les informations publiques d'un membre.
- FR5: Un visiteur peut consulter la rubrique dediee au bureau EAA.
- FR6: Un visiteur peut visualiser les membres du bureau avec leurs roles.

**Recherche et decouverte (FR7-FR19):**
- FR7: Rechercher un membre par nom.
- FR8: Filtrer par promotion ENSPY.
- FR9: Filtrer par filiere ENSPY.
- FR10: Filtrer par metier en Amerique du Nord.
- FR11: Filtrer par pays de localisation.
- FR12: Filtrer par ville de localisation.
- FR13: Filtrer par ecole(s) en Amerique du Nord.
- FR14: Filtrer par statut actif au bureau.
- FR15: Filtrer par domaine(s) d'expertise.
- FR16: Combiner 2 filtres ou plus.
- FR17: Afficher une liste de resultats.
- FR18: Signaler explicitement l'absence de resultat.
- FR19: Proposer jusqu'a 5 profils proches sur criteres partiels.

**Cartographie (FR20-FR23):**
- FR20: Vue cartographique des membres en Amerique du Nord.
- FR21: Points geographiques representant les membres.
- FR22: Ouvrir un profil depuis la carte.
- FR23: Appliquer les memes filtres sur la cartographie.

**Contact (FR24-FR26):**
- FR24: Acceder aux canaux de contact d'un membre.
- FR25: Initier un contact via LinkedIn, email, Telegram.
- FR26: Enregistrer les clics sur canaux de contact.

**Administration (FR27-FR38):**
- FR27: Super Admin cree des comptes Admin.
- FR28: Super Admin modifie ou desactive un compte Admin.
- FR29: Super Admin reinitialise le mot de passe d'un Admin.
- FR30: Admin cree un profil membre.
- FR31: Admin modifie un profil membre.
- FR32: Admin supprime logiquement un profil membre.
- FR33: Super Admin possede toutes les capacites Admin.
- FR34: Super Admin ajoute, modifie et supprime logiquement des membres.
- FR35: Champs obligatoires imposes avant publication.
- FR36: Champs facultatifs acceptes pour enrichissement.
- FR37: Anti-doublon sur (nom + prenom + promotion ENSPY).
- FR38: Admin renseigne les roles bureau d'un membre.

**Signalement (FR39-FR43):**
- FR39: Visiteur signale une erreur sur un profil.
- FR40: CAPTCHA sur flux de signalement.
- FR41: Admin consulte les signalements.
- FR42: Admin traite un signalement.
- FR43: Admin marque un signalement comme traite.

**Cycle de vie (FR44-FR51):**
- FR44: Admin desactive un profil sans suppression definitive.
- FR45: Conservation des donnees des membres desactives.
- FR46: Visiteur ne consulte que les membres actifs.
- FR47: Admin voit par defaut les membres actifs.
- FR48: Admin filtre pour voir les membres desactives.
- FR49: Admin filtre pour voir l'ensemble (actifs + desactives).
- FR50: Conservation des dates de cycle de vie (ajout, modification, desactivation).
- FR51: Admin consulte les dates de cycle de vie.

**Mesure d'usage (FR52-FR55):**
- FR52: Comptabilisation des visites du site.
- FR53: Comptabilisation des vues de profils.
- FR54: Comptabilisation des clics sur canaux de contact.
- FR55: Admin consulte les metriques d'usage agregees (phase Growth).

**Gouvernance (FR56-FR60):**
- FR56: Journalisation des actions admin.
- FR57: Association acteur + horodatage par action.
- FR58: Historique exploitable des operations admin.
- FR59: Super Admin consulte l'historique agrege.
- FR60: Super Admin consulte l'historique d'un Admin specifique.

**Total FRs: 60**

### Non-Functional Requirements (16 NFRs)

- NFR1: Pages cles <= 1s au 95e percentile (Time to Interactive).
- NFR2: Performance maintenue pour 100 utilisateurs simultanes.
- NFR3: Temps de reponse <= 2s au 95e percentile pour 1 000 utilisateurs a 12 mois.
- NFR4: Communications client-serveur protegees par HTTPS.
- NFR5: Mots de passe admin stockes sous forme hachee.
- NFR6: Journalisation avec identifiant acteur, type action, entite, horodatage.
- NFR7: Session admin expire apres 30 min d'inactivite.
- NFR8: 100 utilisateurs simultanes avec reponse <= 1s au 95e percentile.
- NFR9: Evolution vers 1 000 utilisateurs par ajustement de config/ressources.
- NFR10: Breakpoints mobile >= 375px, tablette >= 768px, PC >= 1024px.
- NFR11: Administration supportee sur PC uniquement.
- NFR12: Navigation clavier, contraste >= 4.5:1, labels explicites sur formulaires.
- NFR13: Pas de conformite WCAG formelle en V1.
- NFR14: Disponibilite 99.9% mesuree mensuellement via monitoring hebergeur.
- NFR15: Sauvegarde BDD hebdomadaire.
- NFR16: Retention sauvegardes 30 jours.

**Total NFRs: 16**

### Additional Requirements & Constraints

- Modele de roles: Super Admin (en dur) + Admin(s) geres par Super Admin.
- Consentement et collecte des donnees hors perimetre applicatif.
- Donnees injectees considerees autorisees pour publication.
- Politique de visibilite publique totale (pas de contenu restreint).
- Cartographie: OpenStreetMap retenu.
- Export de donnees: non requis en V1.
- Hosting recommande: Vercel (frontend) + Supabase (backend + BDD).
- Rendering: MPA pour SEO robuste.
- SEO priorite elevee en V1.
- Audit annuel de completude des profils.

### PRD Completeness Assessment

Le PRD est complet et bien structure. 60 FRs couvrent l'ensemble des parcours utilisateur et administrateur. 16 NFRs couvrent performance, securite, scalabilite, accessibilite et fiabilite. Les contraintes techniques et domaine sont documentees. Le PRD a ete recemment valide et corrige (rapport de validation du 2026-05-08).

## Epic Coverage Validation

### Coverage Matrix

| FR Range | Epic | Statut |
|----------|------|--------|
| FR1-FR19 | Epic 1 (Decouverte publique) | ✓ Covered |
| FR20-FR23 | Epic 2 (Cartographie) | ✓ Covered |
| FR24-FR25 | Epic 1 (Contact) | ✓ Covered |
| FR26 | Epic 6 (Mesure usage) | ✓ Covered |
| FR27-FR29, FR33 | Epic 3 (Acces admin) | ✓ Covered |
| FR30-FR32, FR34-FR38 | Epic 4 (CRUD membres) | ✓ Covered |
| FR39-FR43 | Epic 5 (Signalement) | ✓ Covered |
| FR44-FR51 | Epic 4 (Cycle de vie) | ✓ Covered |
| FR52-FR55 | Epic 6 (Metriques) | ✓ Covered |
| FR56-FR60 | Epic 6 (Gouvernance) | ✓ Covered |

### Missing Requirements

Aucun FR manquant — tous les 60 FRs sont couverts par un epic.

### Alignment Issue (WARNING)

Le document epics reference les anciennes versions des FRs corriges le 2026-05-08. Les ecarts suivants sont identifies :

| FR | Version Epics (ancienne) | Version PRD (corrigee) |
|----|--------------------------|------------------------|
| FR16 | "combiner plusieurs filtres" | "combiner 2 filtres ou plus" |
| FR19 | "proposer des profils similaires" | "proposer jusqu'a 5 profils proches sur criteres partiels" |
| FR28 | "gerer les comptes Admin existants" | "modifier ou desactiver un compte Admin existant" |
| FR44 | "indicateur deleted sans suppression physique" | "desactiver un profil sans suppression definitive" |
| FR45-FR51 | references `deleted` et noms de champs | termes metier (actifs/desactives, dates de cycle de vie) |
| NFR1-NFR14 | versions sans percentiles/metriques precises | versions avec percentiles, seuils et methodes de mesure |

**Impact :** Les stories basees sur les anciennes formulations restent fonctionnellement coherentes. Les corrections du PRD sont des ameliorations de precision et de formulation, pas des changements de perimetre. La mise a jour de l'inventaire FRs dans le document epics est recommandee mais non bloquante.

### Coverage Statistics

- Total PRD FRs: 60
- FRs couverts dans les epics: 60
- Pourcentage de couverture: 100%

## UX Alignment Assessment

### UX Document Status

**Trouve :** `ux-design-specification.md` — document complet couvrant direction UX, composants, parcours utilisateur, palette, typographie, breakpoints et systeme de design.

### UX ↔ PRD Alignment

| Aspect | Statut | Detail |
|--------|--------|--------|
| Parcours visiteur (annuaire, recherche, filtres) | ✓ Aligne | Journeys 1-2 couvrent FR1-FR19 |
| Cartographie | ✓ Aligne | Journey 3 couvre FR20-FR23 |
| Contact membre | ✓ Aligne | CTA LinkedIn/Email/Telegram dans MemberCard, couvre FR24-FR26 |
| Administration membres | ✓ Aligne | Journey 5 couvre FR27-FR38 |
| Signalement d'erreur | ⚠ Absent | FR39-FR43 n'ont pas de journey UX dedie |
| Cycle de vie (desactivation) | ✓ Aligne | Couvert dans les ecrans admin |
| Metriques d'usage | ✓ Aligne | Journey 6 couvre FR52-FR55 |
| Gouvernance / audit log | ✓ Aligne | Couvert dans admin dashboard |

**Gap mineur :** Le parcours de signalement (FR39-FR43) n'apparait pas comme journey explicite dans le document UX. Le formulaire est mentionne dans la fiche membre mais sans flow detaille (etats, validation CAPTCHA, confirmation). Impact faible — le flux est simple et peut etre derive du PRD.

### UX ↔ Architecture Alignment

| Aspect | UX Design | Architecture | Statut |
|--------|-----------|-------------|--------|
| **Systeme de design** | **MUI (Material UI)** avec tokens, palette, composants | **Tailwind CSS v4** via plugin Vite, aucune mention de MUI | 🔴 **CONFLIT** |
| Rendering | Compatible MPA/SSR | AdonisJS + Inertia (MPA server-first) | ✓ Aligne |
| Breakpoints | mobile ≥375px, tablette ≥768px, PC ≥1024px | Responsive via Tailwind | ✓ Aligne |
| Cartographie | OpenStreetMap | Leaflet + react-leaflet | ✓ Aligne |
| Performance | TTI ≤1s | Edge caching, SSR | ✓ Aligne |
| Accessibilite | WCAG AA pratique, contraste ≥4.5:1 | Mentionne dans NFRs | ✓ Aligne |

### 🔴 Conflit critique : Systeme de design (MUI vs Tailwind CSS)

**Description :** Le document UX specifie MUI (Material UI) comme systeme de design avec des tokens de design, une palette de couleurs, des composants specifiques MUI et une typographie basee sur les defaults MUI. L'architecture specifie Tailwind CSS v4 comme unique framework CSS, sans mention de MUI.

**Options de resolution :**

1. **Tailwind seul (recommandation Architecture)** — Implementer les composants decrits dans l'UX avec Tailwind CSS uniquement, en reproduisant les tokens de design (couleurs, espacements, typographie) via la configuration Tailwind. Plus leger, coherent avec l'architecture.
2. **MUI + Tailwind** — Utiliser MUI pour les composants et Tailwind pour les utilitaires. Ajoute de la complexite et du poids au bundle.
3. **MUI seul (recommandation UX)** — Remplacer Tailwind par MUI. Necessite une mise a jour de l'architecture.

**Impact :** Ce conflit doit etre resolu avant le demarrage de l'implementation. Il affecte le choix des composants, le theming, la taille du bundle et l'experience developpeur.

### Warnings

- ⚠ Parcours signalement (FR39-FR43) sans journey UX explicite — risque faible
- 🔴 Conflit systeme de design MUI vs Tailwind CSS — **resolution requise avant implementation**

## Epic Quality Review

### Vue d'ensemble

6 epics, 37 stories au total. Structure globalement solide avec un decoupage centre utilisateur et des backward dependencies correctes.

### Validation valeur utilisateur par epic

| Epic | Titre | Valeur utilisateur | Statut |
|------|-------|-------------------|--------|
| 1 | Decouverte publique des membres | Visiteur decouvre et contacte les membres | ✓ |
| 2 | Exploration cartographique synchronisee | Visiteur explore geographiquement | ✓ |
| 3 | Controle d'acces admin et gouvernance des roles | Admin accede au back-office securise | ✓ |
| 4 | Gestion du referentiel membres | Admin gere les profils de maniere fiable | ✓ |
| 5 | Signalement communautaire et correction qualite | Visiteur signale, admin corrige | ✓ |
| 6 | Mesure d'usage, tracabilite et audit | PO pilote le produit, Super Admin supervise | ✓ |

Aucun epic technique sans valeur utilisateur detecte. ✓

### Validation d'independance des epics

| Epic | Dependances | Statut |
|------|-------------|--------|
| Epic 1 | Aucune (fondatrice) | ✓ Autonome |
| Epic 2 | Epic 1 (backward) | ✓ Valide |
| Epic 3 | Aucune (authentification autonome) | ✓ Autonome |
| Epic 4 | Epic 3 (backward — auth requise) | ✓ Valide |
| Epic 5 | Epic 1 + Epic 4 (backward) | ✓ Valide |
| Epic 6 | Epics anterieurs pour donnees (backward) | ✓ Valide |

Aucune dependance forward (Epic N vers Epic N+1) detectee. ✓
Aucune dependance circulaire detectee. ✓

### Starter Template

✓ Story 1.1 couvre l'initialisation via `npm create adonisjs@latest ... --kit=react`, conforme a l'exigence Architecture. Greenfield correctement configure.

### 🔴 Violations critiques

**V1 — Fuite d'implementation dans les stories (terminologie `deleted`)**

Les stories suivantes utilisent la terminologie d'implementation `deleted` et `date_suppression` au lieu des termes metier corriges dans le PRD ("desactive/actif", "date de desactivation") :

- Story 4.1 : "suppression logique via `deleted`"
- Story 4.7 : "`deleted` est active et `date_suppression` renseignee"
- Story 4.8 : "filtre `deleted only` et `all`"
- Story 4.9 : "un membre `deleted`"
- Story 1.4 : "seuls les membres non `deleted`"

**Remediation :** Aligner le vocabulaire des stories avec le PRD corrige. Remplacer `deleted` par "desactive", `date_suppression` par "date de desactivation", et `deleted only` par "desactives uniquement".

### 🟠 Issues majeures

**V2 — Inventaire FRs obsolete**

Le document epics reproduit les anciennes versions des FRs (avant correction du 2026-05-08). Les ecarts identifies dans la section Epic Coverage s'appliquent egalement ici. Les stories restent fonctionnellement coherentes mais l'inventaire devrait etre mis a jour pour eviter toute ambiguite.

**V3 — Story 1.7 incomplete par rapport a FR19 corrige**

La story "Gerer les etats resultats" ne precise pas la limite de 5 profils proches ni les criteres partiels (promotion, filiere, pays, metier) specifies dans FR19 corrige.

**Remediation :** Ajouter dans les ACs : "jusqu'a 5 profils proches sont proposes, bases sur les criteres partiellement correspondants (promotion, filiere, pays, metier)".

**V4 — Story 4.5 reference implementation**

Le AC mentionne `date_modification` (nom de champ) au lieu de "date de derniere modification" (terme metier).

### 🟡 Concerns mineurs

**V5 — Stories techniques acceptables**

Stories 1.1, 1.2 et 4.1 sont formulees "As a product team" — stories techniques necessaires pour un projet greenfield. Acceptables mais noter qu'elles ne livrent pas de valeur utilisateur directe.

**V6 — Story 3.4 formulation FR28**

Utilise "gerer les comptes Admin" (ancienne FR28) au lieu de "modifier ou desactiver un compte Admin" (FR28 corrigee).

### Criteres d'acceptation — evaluation globale

| Critere | Statut |
|---------|--------|
| Format Given/When/Then | ✓ Respecte sur toutes les stories |
| Testabilite | ✓ ACs verifiables independamment |
| Couverture scenarios d'erreur | ⚠ Partielle — certaines stories manquent les cas d'erreur (ex: Story 5.1 ne couvre pas l'echec de soumission) |
| Specificite | ✓ Resultats attendus clairs |

### Checklist conformite par epic

| Critere | E1 | E2 | E3 | E4 | E5 | E6 |
|---------|----|----|----|----|----|----|
| Valeur utilisateur | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Independence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Sizing stories | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Pas de forward dep. | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| DB quand necessaire | ✓ | ✓ | ✓ | ⚠ | ✓ | ✓ |
| ACs clairs | ✓ | ✓ | ✓ | ⚠ | ✓ | ✓ |
| Tracabilite FRs | ✓ | ✓ | ⚠ | ⚠ | ✓ | ✓ |

**Note DB Epic 4 :** Story 4.1 cree toute la structure membre upfront plutot que progressivement. Acceptable ici car les stories 4.2-4.10 travaillent toutes sur la meme entite membre.

### Synthese

- **Structure epics :** Solide, centree valeur utilisateur, pas d'epics techniques
- **Independence :** Parfaite, aucune violation
- **Issue principale :** Fuite d'implementation (`deleted`) heritee de l'ancien PRD — correction recommandee avant implementation
- **Stories :** Bien decoupees, ACs testables, format BDD respecte
- **Couverture :** 100% des FRs couverts

## Summary and Recommendations

### Overall Readiness Status

**READY** — Les artefacts sont fonctionnellement complets et bien structures. Les deux issues critiques identifiees (conflit MUI vs Tailwind et vocabulaire `deleted`) ont ete resolues le 2026-05-08.

### Critical Issues Requiring Immediate Action

| # | Issue | Severite | Impact |
|---|-------|----------|--------|
| 1 | ~~Conflit systeme de design : MUI (UX) vs Tailwind CSS (Architecture)~~ | ✅ Resolu | UX mis a jour : MUI remplace par Tailwind CSS v4 partout. Alignement UX ↔ Architecture confirme. |
| 2 | ~~Fuite d'implementation dans les stories (`deleted`, `date_suppression`)~~ | ✅ Resolu | Vocabulaire aligne avec le PRD corrige dans toutes les stories et l'inventaire FRs/NFRs. |

### Recommended Next Steps

1. ~~Resoudre le conflit MUI vs Tailwind CSS~~ — ✅ Fait. UX mis a jour pour utiliser Tailwind CSS v4 partout. Tokens de design reformules en variables CSS Tailwind.

2. ~~Aligner le vocabulaire des epics avec le PRD corrige~~ — ✅ Fait. Inventaire FRs, NFRs, UX-DRs et stories corriges. `deleted` → "desactive", `date_suppression` → "date de desactivation", formulations FR16/FR19/FR28 mises a jour.

3. ~~Completer les ACs de la Story 1.7~~ — ✅ Fait. ACs mis a jour avec "jusqu'a 5 profils proches, bases sur criteres partiellement correspondants".

4. **Ajouter un journey UX pour le signalement (FR39-FR43)** — Optionnel mais recommande. Le flux est simple et peut etre derive du PRD, mais un wireframe ou flow diagram reduirait l'ambiguite.

### Issues non bloquantes a traiter au fil de l'implementation

- ~~Story 3.4 : aligner la formulation avec FR28 corrigee~~ ✅ Fait
- ~~Story 4.5 : remplacer `date_modification` par terme metier~~ ✅ Fait
- Couverture scenarios d'erreur dans certains ACs (ex: Story 5.1) — a traiter au fil de l'implementation
- Stories techniques (1.1, 1.2, 4.1) acceptees pour greenfield

### Bilan quantitatif

| Categorie | Constats |
|-----------|----------|
| Documents | 4/4 presents, aucun doublon, aucun manquant |
| Couverture FRs | 60/60 (100%) couverts par les epics |
| Couverture NFRs | 16/16 documentes |
| Valeur utilisateur epics | 6/6 centres utilisateur |
| Independence epics | 6/6 sans forward dependency |
| Issues critiques | 2 — ✅ toutes resolues |
| Issues majeures | 3 — ✅ toutes resolues |
| Issues mineures | 3 — 1 resolue, 2 acceptees (stories techniques, ACs erreur) |

### Final Note

Cette evaluation a identifie **8 issues** reparties en 3 categories de severite. **7 sur 8 ont ete resolues** dans la meme session (conflit MUI → Tailwind CSS v4, vocabulaire `deleted` → termes metier, inventaire FRs/NFRs aligne, Story 1.7/3.4/4.5 corrigees). Le seul point optionnel restant est l'ajout d'un journey UX pour le signalement (FR39-FR43). Les artefacts de planification sont desormais coherents et complets. **Le projet carto-profil est pret pour l'implementation.**

---

*Rapport genere le 2026-05-08 par Implementation Readiness Validator (BMAD Method)*
