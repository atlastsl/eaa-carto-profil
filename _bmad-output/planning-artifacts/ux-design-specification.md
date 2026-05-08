# UX Design Specification - carto-profil

## Executive Summary

### Project Vision

`carto-profil` est une plateforme web communautaire EAA orientée **découverte rapide de profils alumni** et mise en relation utile.  
La proposition de valeur combine recherche multicritère, annuaire alphabétique et cartographie dans une expérience claire, fluide et actionnable.

### Target Users

- **Visiteurs** (internes/externes), niveau digital moyen à élevé, usage mobile/tablette/PC.
- **Admins** (usage PC), en charge de la qualité des profils et de leur publication.

Contexte principal d’usage: **événements alumni** et **networking professionnel**.

### Key Design Challenges

- Transformer des intentions vagues ou précises en résultats pertinents sans bruit.
- Maintenir une continuité fluide entre exploration annuaire et carte.
- Garantir qualité perçue des profils et confiance dans les résultats.

### Design Opportunities

- Expérience “Discovery First” dès l’accueil.
- Synchronisation forte Annuaire/Carte pour réduire la charge cognitive.
- Fiche profil immédiatement actionnable (contact rapide).

---

## Core User Experience

### Defining Experience

L’expérience définissante est la **découverte guidée via un bloc unique Annuaire/Carte**.  
Le visiteur commence en général par explorer, puis converge vers un profil pertinent.

### Platform Strategy

- **Visiteurs:** mobile-first, responsive mobile/tablette/PC.
- **Admin:** desktop-first.
- **Design System:** Tailwind CSS v4 thémé.

### Effortless Interactions

- Exploration fluide Annuaire/Carte.
- Filtres progressifs (dont recherche) sans surcharge.
- Accès rapide profil -> contact.

### Critical Success Moments

- Compréhension immédiate de la valeur dès l’arrivée.
- Premier profil pertinent en moins de 30 secondes.
- Parcours complet de recherche/exploration en moins de 60 secondes.

### Experience Principles

- Discovery First, Always Actionable
- Clarity Before Complexity
- Zero-Noise Navigation
- Context Preservation Across Views

---

## Desired Emotional Response

### Primary Emotional Goals

- **Enthousiasme de la découverte**

### Secondary Feelings

- **Fierté réseau**
- **Curiosité active**

### Emotions to Avoid

- Confusion
- Surcharge cognitive

### Design Implications

- Accueil orienté exploration immédiate.
- Hiérarchie visuelle nette, densité maîtrisée.
- États de rebond clairs (notamment zéro résultat).

### Emotional Design Principles

- Discovery with Momentum
- Community Pride by Design
- Low Cognitive Load, High Relevance

---

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

- **LinkedIn**: profils actionnables, recherche de personnes efficace.
- **Airbnb**: synchronisation liste/carte, filtres progressifs.
- **Google Maps**: exploration géographique intuitive.

### Transferable UX Patterns

- Recherche progressive.
- Liste/carte synchronisées.
- Profils orientés décision/contact.
- Suggestions utiles en cas de zéro résultat.

### Anti-Patterns to Avoid

- Trop de filtres dès l’entrée.
- Rupture de contexte Annuaire <-> Carte.
- Zéro résultat passif sans alternatives.
- Surdensité d’information sur fiche profil.

### Design Inspiration Strategy

- Adopter patterns éprouvés.
- Adapter au contexte alumni EAA.
- Préserver identité Discovery First.

---

## Design System Foundation

### 1.1 Design System Choice

**Tailwind CSS v4** retenu comme framework utilitaire thémable, conforme à l'architecture technique (AdonisJS + Inertia + React + Tailwind via plugin Vite).

### Rationale for Selection

- Cohérence avec la stack technique retenue (Tailwind v4 via `@tailwindcss/vite`).
- Time-to-market V1 rapide grâce aux classes utilitaires.
- Forte cohérence multi-device via breakpoints et design tokens CSS natifs.
- Légèreté du bundle (pas de runtime JS pour le styling).
- Maintenabilité long terme avec tokens centralisés dans `@theme`.

### Implementation Approach

- Tokens de design centralisés via la directive `@theme` de Tailwind v4 (couleurs, typographie, espacements, breakpoints).
- Composants React internes pour les éléments métier clés (pas de librairie de composants tierce).
- États UI standardisés (`loading`, `empty`, `error`, `success`).

### Customization Strategy

- Personnalisation visuelle ciblée (branding EAA) via les design tokens Tailwind.
- Priorité lisibilité + vitesse perçue + cohérence.

---

## Visual Design Foundation

### Color System

Palette retenue:
- Primary: Orange `#F58220`
- Secondary: Bleu nuit `#1F3A5F`
- Neutral fort: Noir `#111111`
- Fond: Blanc `#FFFFFF`

Mapping sémantique (tokens Tailwind `@theme`):
- `--color-primary`: `#F58220`
- `--color-secondary`: `#1F3A5F`
- `--color-text`: `#111111`
- `--color-text-muted`: `#4A4A4A`
- `--color-background`: `#FFFFFF`
- `--color-surface`: `#F8F9FA`
- `--color-divider`: `#E5E7EB`
- `--color-success`: `#2E7D32`
- `--color-warning`: `#ED6C02`
- `--color-error`: `#D32F2F`
- `--color-info`: `#0288D1`

Règles:
- Orange = action/focus
- Bleu nuit = structure/navigation secondaire
- Noir/Blanc = lisibilité prioritaire

### Typography System

- Primaire: `Inter` (fallback système)
- Ton: professionnel, clair, moderne
- Échelle recommandée:
  - h1 32/40
  - h2 24/32
  - h3 20/28
  - body1 16/24
  - body2 14/20
  - caption 12/16

### Spacing & Layout Foundation

- Base 8px
- Densité moyenne
- Mobile-first pour visiteurs
- Hiérarchie visuelle forte pour scan rapide

### Accessibility Considerations

- Contraste AA minimum
- Focus visible fort
- Contrôles accessibles clavier
- États vides toujours actionnables

---

## Design Direction Decision

### Design Directions Explored

Trois pistes évaluées:
- Explorer First
- Search First
- Hybrid Split

### Chosen Direction

**Direction 1 (Explorer First) + synchro Liste/Carte**, avec:
- Bloc unique Annuaire/Carte
- Tabs pour bascule de vue
- Filtres à gauche
- Barre de recherche intégrée au bloc filtres (non héro prioritaire)

### Design Rationale

- Alignement total avec promesse Discovery First.
- Réduction du bruit et de la perte de contexte.
- Meilleur équilibre entre exploration libre et ciblage.

### Implementation Approach

- État partagé Annuaire/Carte.
- Synchronisation bidirectionnelle sélection liste <-> focus carte.
- Gestion robuste des états `loading/empty/error`.

---

## User Journey Flows

### Journey 1 - Visiteur: Découverte via Annuaire/Carte

Bloc unique avec tabs, annuaire par défaut, exploration puis convergence vers profil utile.

### Journey 2 - Visiteur: Zéro résultat + rebond

Aucun dead-end:
- état vide explicite
- profils similaires automatiques
- action d’ajustement filtres

### Journey 3 - Admin: Création/publication profil

Validation champs obligatoires + anti-doublon + journalisation.

### Journey Patterns

- Tabs Annuaire/Carte
- Filtres persistants à gauche
- Fiche profil pivot découverte -> contact
- Rebond automatique en cas de vide

### Flow Optimization Principles

- Speed to Value
- Context Preservation
- Low Cognitive Load
- Recovery by Design

### Addendum - Annuaire A-Z (règles consolidées)

- Tri alphabétique constant.
- Index A-Z en haut de liste.
- **Aucun filtre lettre actif par défaut**.
- `Tous` implicite au chargement initial.
- Lettres sans résultats inactives.
- Filtre A-Z combinable avec autres filtres.
- Contexte conservé lors du switch Annuaire <-> Carte.

---

## Component Strategy

### Design System Components

Composants React internes stylés via Tailwind pour layout, navigation, input, feedback et surfaces.

### Custom Components (V1)

- `DirectoryMapSwitcher`
- `AlphabetFilterBar`
- `MemberCard`
- `MemberMapMarkerCard`
- `SmartEmptyState`
- `FilterSidebar`

### Component Implementation Strategy

- Design tokens Tailwind partout.
- États transverses standardisés.
- Logique métier isolée des composants purement visuels.
- Accessibilité intégrée dès la conception.

### Implementation Roadmap

- **Phase 1 (must-have):**
  - `DirectoryMapSwitcher`, `FilterSidebar`, `MemberCard`, `AlphabetFilterBar`, `SmartEmptyState`
- **Phase 2:**
  - `MemberMapMarkerCard` + variantes
- **Phase 3:**
  - enrichissements analytics et optimisations UX avancées

---

## UX Consistency Patterns

### Button Hierarchy

- Primary (orange): action principale
- Secondary (bleu nuit): action importante secondaire
- Tertiary: action contextuelle faible
- Danger: action destructive avec confirmation

### Feedback Patterns

- Succès clair et court
- Erreur explicite + action corrective
- Warning/Info contextuels
- Skeleton privilégiés pour chargements
- Zéro résultat toujours guidé

### Form Patterns

- Validation inline + globale
- Champs obligatoires clairement marqués
- Flux admin optimisé productivité

### Navigation Patterns

- Tabs `Annuaire | Carte`, annuaire par défaut
- Filtres à gauche, recherche dans filtres
- État préservé entre vues

### Additional Patterns

- Modales réservées aux actions critiques
- Focus sur lisibilité et continuité vers contact
- Baseline accessibilité appliquée partout

---

## Responsive Design & Accessibility

### Responsive Strategy

- Visiteur: mobile-first
- Admin: desktop-first
- UX cohérente sur mobile/tablette/desktop

### Breakpoint Strategy

Breakpoints Tailwind:
- sm (≥640px), md (≥768px), lg (≥1024px), xl (≥1280px), 2xl (≥1536px)

### Accessibility Strategy

Cible:
- **WCAG AA pratique**

Exigences:
- Contrastes AA
- Navigation clavier complète
- Focus visible
- Cibles tactiles >= 44x44
- Compatibilité lecteurs d’écran

### Testing Strategy

- Tests responsive sur devices réels
- Tests navigateurs principaux
- Tests a11y auto + clavier + SR
- Validation des parcours critiques

### Implementation Guidelines

- Unités relatives, media queries mobile-first
- HTML sémantique + ARIA utile
- Gestion focus contrôlée
- Préservation de contexte dans tous les flux

---