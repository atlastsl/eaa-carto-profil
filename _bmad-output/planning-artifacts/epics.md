---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
project_name: carto-profil
workflowType: epics-and-stories
status: complete
---

# carto-profil - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for carto-profil, decomposing requirements from PRD, Architecture, and UX Design into implementable stories with testable acceptance criteria.

## Requirements Inventory

### Functional Requirements

FR1: Un visiteur peut accéder à la page d'accueil publique de la plateforme.  
FR2: Un visiteur peut consulter l'annuaire alphabétique des membres.  
FR3: Un visiteur peut ouvrir la fiche détaillée d'un membre depuis l'annuaire.  
FR4: Un visiteur peut consulter les informations publiques d'un membre.  
FR5: Un visiteur peut consulter la rubrique dédiée au bureau EAA.  
FR6: Un visiteur peut visualiser les membres du bureau avec leurs rôles.  
FR7: Un visiteur peut rechercher un membre par nom.  
FR8: Un visiteur peut filtrer les membres par promotion ENSPY.  
FR9: Un visiteur peut filtrer les membres par filière ENSPY.  
FR10: Un visiteur peut filtrer les membres par métier en Amérique du Nord.  
FR11: Un visiteur peut filtrer les membres par pays de localisation.  
FR12: Un visiteur peut filtrer les membres par ville de localisation.  
FR13: Un visiteur peut filtrer les membres par école(s) fréquentée(s).  
FR14: Un visiteur peut filtrer les membres par statut actif au bureau.  
FR15: Un visiteur peut filtrer les membres par domaine(s) d'expertise.  
FR16: Un visiteur peut combiner 2 filtres ou plus dans une même recherche.  
FR17: Le système peut afficher une liste de résultats correspondant aux critères saisis.  
FR18: Le système peut signaler explicitement l'absence de résultat.  
FR19: Le système peut proposer jusqu'à 5 profils proches lorsque la recherche ne retourne aucun résultat exact, en se basant sur les critères partiellement correspondants (promotion, filière, pays, métier).  
FR20: Un visiteur peut accéder à une vue cartographique des membres.  
FR21: Un visiteur peut visualiser des points géographiques représentant les membres localisés.  
FR22: Un visiteur peut ouvrir un profil membre depuis la vue cartographique.  
FR23: Un visiteur peut appliquer les mêmes critères de filtrage sur la cartographie.  
FR24: Un visiteur peut accéder aux canaux de contact publiés d'un membre.  
FR25: Un visiteur peut initier une prise de contact via les liens fournis.  
FR26: Le système peut enregistrer les événements de clics sur les canaux de contact.  
FR27: Un Super Admin peut créer des comptes Admin.  
FR28: Un Super Admin peut modifier ou désactiver un compte Admin existant.  
FR29: Un Super Admin peut réinitialiser le mot de passe d'un Admin.  
FR30: Un Admin peut créer un profil membre.  
FR31: Un Admin peut modifier un profil membre.  
FR32: Un Admin peut supprimer logiquement un profil membre.  
FR33: Un Super Admin possède toutes les capacités d'un Admin.  
FR34: Un Super Admin peut ajouter, modifier et supprimer logiquement des membres EAA.  
FR35: Le système impose les champs obligatoires avant publication.  
FR36: Le système accepte les champs facultatifs d'enrichissement.  
FR37: Le système empêche la création de doublons `(nom + prenom + promotion ENSPY)`.  
FR38: Un Admin peut renseigner les informations de rôle bureau.  
FR39: Un visiteur peut signaler une erreur sur un profil.  
FR40: Le système protège le flux de signalement par CAPTCHA.  
FR41: Un Admin peut consulter la liste des signalements reçus.  
FR42: Un Admin peut traiter un signalement via mise à jour du profil.  
FR43: Un Admin peut marquer un signalement comme traité.  
FR44: Un Admin peut désactiver un profil membre sans suppression définitive des données.  
FR45: Le système conserve les données des membres désactivés.  
FR46: Un visiteur ne peut consulter que les membres actifs.  
FR47: Un Admin voit par défaut la liste des membres actifs.  
FR48: Un Admin peut filtrer la liste pour voir uniquement les membres désactivés.  
FR49: Un Admin peut filtrer la liste pour voir l'ensemble (actifs + désactivés).  
FR50: Le système conserve la date d'ajout, la date de dernière modification et la date de désactivation de chaque membre.  
FR51: Un Admin peut consulter les dates de cycle de vie (ajout, modification, désactivation) d'un membre.  
FR52: Le système comptabilise les visites du site.  
FR53: Le système comptabilise les vues de profils.  
FR54: Le système comptabilise les clics sur canaux de contact.  
FR55: Un Admin peut consulter les métriques d'usage agrégées (phase Growth).  
FR56: Le système journalise les actions d'administration.  
FR57: Le système associe chaque action à un acteur et un horodatage.  
FR58: Le système conserve un historique exploitable des opérations d'administration.  
FR59: Un Super Admin peut consulter l'historique agrégé de toutes les actions.  
FR60: Un Super Admin peut consulter l'historique des actions d'un Admin spécifique.

### NonFunctional Requirements

NFR1: Pages clés <= 1 seconde au 95e percentile (Time to Interactive).  
NFR2: Performance maintenue pour 100 utilisateurs simultanés.  
NFR3: Temps de réponse <= 2 secondes au 95e percentile pour 1 000 utilisateurs simultanés sur l’horizon 12 mois.  
NFR4: Communications protégées par HTTPS.  
NFR5: Mots de passe admin stockés hachés.  
NFR6: Actions d’administration journalisées avec identifiant de l’acteur, type d’action, entité concernée et horodatage.  
NFR7: Session admin inactive expirée après 30 minutes.  
NFR8: Support 100 utilisateurs simultanés avec un temps de réponse <= 1 seconde au 95e percentile.  
NFR9: Évolution vers 1 000 utilisateurs par ajustement de configuration ou de ressources, sans modification de l’architecture applicative.  
NFR10: Expérience visiteur fonctionnelle sur les breakpoints mobile (>= 375px), tablette (>= 768px) et PC (>= 1024px).  
NFR11: Interface admin supportée sur PC uniquement.  
NFR12: Navigation clavier sur les éléments interactifs, ratio de contraste >= 4.5:1 pour le texte, chaque champ de formulaire associé à un label explicite.  
NFR13: Pas de conformité WCAG formelle en V1.  
NFR14: Disponibilité cible 99.9% mesurée sur une base mensuelle via le monitoring de l’hébergeur.  
NFR15: Sauvegarde base de données hebdomadaire.  
NFR16: Rétention sauvegardes 30 jours.

### Additional Requirements

- Initialisation obligatoire via starter AdonisJS React Inertia (`npm create adonisjs@latest ... --kit=react`).
- Architecture Inertia-first en V1 (pas d’API publique JSON).
- Backend/DB: PostgreSQL sur Supabase, Auth gérée par Adonis.
- Validation serveur systématique avec VineJS.
- RBAC minimal: `admin`, `super_admin`.
- Soft delete obligatoire pour membres.
- Règle anti-doublon centralisée service + contrainte DB.
- Cartographie OpenStreetMap avec clustering V1.
- Rate limiting prioritaire sur signalement et login admin.
- Logs structurés et audit persistant.
- Conventions feature-first strictes (modules métiers).
- SEO opérationnel (pages indexables, metadata, sitemap/robots).

### UX Design Requirements

UX-DR1: Implémenter un bloc unique Annuaire/Carte avec tabs.  
UX-DR2: Annuaire actif par défaut.  
UX-DR3: Panneau filtres à gauche du bloc Annuaire/Carte.  
UX-DR4: Barre de recherche située dans le panneau filtres (pas prioritaire en héro).  
UX-DR5: Annuaire trié alphabétiquement en permanence.  
UX-DR6: Index A-Z en haut de liste annuaire.  
UX-DR7: Aucun filtre lettre actif par défaut (`Tous` implicite).  
UX-DR8: Lettres inactives si aucun résultat dans contexte de filtres.  
UX-DR9: Synchronisation de contexte Annuaire/Carte lors du switch.  
UX-DR10: État zéro résultat explicite + profils similaires automatiques.  
UX-DR11: Composant `DirectoryMapSwitcher`.  
UX-DR12: Composant `AlphabetFilterBar`.  
UX-DR13: Composant `FilterSidebar`.  
UX-DR14: Composant `MemberCard` (et variantes).  
UX-DR15: Composant `MemberMapMarkerCard`.  
UX-DR16: Composant `SmartEmptyState`.  
UX-DR17: Design tokens Tailwind CSS v4 (palette, typo, spacing 8px, breakpoints).  
UX-DR18: Responsive mobile-first visiteurs / desktop-first admin.  
UX-DR19: Baseline a11y (focus visible, clavier, contrastes AA pratiques).  
UX-DR20: États standardisés `loading`, `empty`, `error`, `success`.

### FR Coverage Map

FR1-19, FR24-25 -> Epic 1  
FR20-23 -> Epic 2  
FR27-29, FR33 -> Epic 3  
FR30-32, FR34-38, FR44-51 -> Epic 4  
FR39-43 -> Epic 5  
FR26, FR52-60 -> Epic 6

## Epic List

> **Delivery order validé**
> 1) Story 1.1, 1.2  
> 2) Epic 3  
> 3) Epic 4  
> 4) Epic 1 (stories 1.3 -> 1.10)  
> 5) Epic 2  
> 6) Epic 5  
> 7) Epic 6

### Epic 1: Découverte publique des membres (Annuaire + Recherche + Profil)
Permettre à un visiteur de découvrir rapidement des membres pertinents, consulter les profils et initier le contact.
**FRs covered:** FR1-FR19, FR24, FR25

### Epic 2: Exploration cartographique synchronisée
Permettre une exploration géographique des membres avec filtres cohérents et accès au profil depuis la carte.
**FRs covered:** FR20-FR23

### Epic 3: Contrôle d’accès admin et gouvernance des rôles
Sécuriser le back-office et permettre au Super Admin de gérer les admins.
**FRs covered:** FR27, FR28, FR29, FR33

### Epic 4: Gestion du référentiel membres (CRUD, règles métier, cycle de vie)
Permettre la création, mise à jour, suppression logique et gouvernance qualité des profils membres.
**FRs covered:** FR30-FR32, FR34-FR38, FR44-FR51

### Epic 5: Signalement communautaire et correction qualité
Permettre aux visiteurs de signaler des erreurs et aux admins de les traiter.
**FRs covered:** FR39-FR43

### Epic 6: Mesure d’usage, traçabilité et audit
Instrumenter les événements d’usage et fournir les capacités d’audit d’administration.
**FRs covered:** FR26, FR52-FR60

---

## Epic 1: Découverte publique des membres (Annuaire + Recherche + Profil)

Permettre à un visiteur de trouver rapidement un profil pertinent, même avec intention vague, et initier la mise en relation.

### Story 1.1: Initialiser le socle app web public

As a product team,  
I want un socle Adonis + Inertia + React opérationnel,  
So that nous pouvons livrer les parcours publics de manière cohérente et rapide.

**Acceptance Criteria:**

**Given** un dépôt de projet non initialisé  
**When** le starter Adonis React Inertia est installé et configuré  
**Then** les routes publiques de base rendent via Inertia  
**And** le projet compile et démarre en local avec structure modules

### Story 1.2: Mettre en place le déploiement continu et la mise en ligne

As a product team,  
I want un pipeline CI/CD vers l’environnement en ligne,  
So that chaque incrément validé puisse être livré rapidement et fiablement.

**Acceptance Criteria:**

**Given** un changement fusionné sur la branche principale  
**When** le pipeline se déclenche  
**Then** build + checks qualité minimaux s’exécutent automatiquement  
**And** l’application est déployée avec statut visible

### Story 1.3: Afficher l’accueil public orienté découverte

As a visiteur,  
I want une page d’accueil claire avec entrée vers Annuaire/Carte,  
So that je comprends immédiatement la proposition de valeur.

**Acceptance Criteria:**

**Given** un visiteur non authentifié  
**When** il ouvre la racine du site  
**Then** il voit les CTA vers le bloc Annuaire/Carte  
**And** l’accès à la rubrique Bureau est présent

### Story 1.4: Afficher l’annuaire alphabétique des membres actifs

As a visiteur,  
I want consulter une liste triée alphabétiquement,  
So that je peux parcourir rapidement la communauté.

**Acceptance Criteria:**

**Given** des membres publiés actifs  
**When** le visiteur ouvre le tab Annuaire  
**Then** la liste est triée A-Z  
**And** seuls les membres actifs sont affichés

### Story 1.5: Implémenter l’index A-Z de navigation annuaire

As a visiteur,  
I want filtrer l’annuaire par initiale,  
So that je navigue vite sur de gros volumes.

**Acceptance Criteria:**

**Given** le tab Annuaire affiché  
**When** aucune lettre n’est sélectionnée  
**Then** aucun filtre lettre n’est actif par défaut (`Tous` implicite)  
**And** un clic sur une lettre applique le filtre d’initiale

### Story 1.6: Implémenter le panneau filtres + recherche multicritère

As a visiteur,  
I want affiner les résultats via recherche et filtres combinables,  
So that je trouve un profil pertinent en moins d’une minute.

**Acceptance Criteria:**

**Given** un panneau filtres à gauche du bloc Annuaire/Carte  
**When** le visiteur applique recherche + filtres  
**Then** les résultats sont mis à jour selon la combinaison  
**And** l’état des filtres est conservé durant la consultation

### Story 1.7: Gérer les états résultats (normal, vide, profils similaires)

As a visiteur,  
I want un feedback utile quand il n’y a pas de match exact,  
So that je ne reste jamais bloqué.

**Acceptance Criteria:**

**Given** une recherche sans résultat exact  
**When** le système traite la requête  
**Then** un état vide explicite est affiché  
**And** jusqu'à 5 profils proches sont proposés automatiquement, basés sur les critères partiellement correspondants (promotion, filière, pays, métier)

### Story 1.8: Afficher la fiche membre publique détaillée

As a visiteur,  
I want ouvrir une fiche membre complète,  
So that je qualifie vite la pertinence du profil.

**Acceptance Criteria:**

**Given** un résultat annuaire  
**When** le visiteur ouvre la fiche  
**Then** les informations publiques sont affichées  
**And** la fiche est accessible par URL publique indexable

### Story 1.9: Activer la mise en relation via canaux de contact

As a visiteur,  
I want cliquer sur les canaux de contact d’un membre,  
So that je peux initier une prise de contact sans friction.

**Acceptance Criteria:**

**Given** une fiche membre avec canaux disponibles  
**When** le visiteur clique LinkedIn/email/Telegram  
**Then** l’action de contact est exécutée correctement  
**And** seuls les canaux renseignés sont affichés

### Story 1.10: Afficher la rubrique Bureau EAA

As a visiteur,  
I want consulter la rubrique Bureau et ses rôles,  
So that je comprends la structure associative.

**Acceptance Criteria:**

**Given** des membres avec rôle bureau  
**When** le visiteur ouvre la rubrique Bureau  
**Then** les membres du bureau et leurs rôles sont affichés  
**And** la navigation vers leurs fiches est disponible

---

## Epic 2: Exploration cartographique synchronisée

Permettre une découverte géographique fluide et cohérente avec l’annuaire.

### Story 2.1: Afficher la vue carte des membres

As a visiteur,  
I want accéder au tab Carte depuis le bloc Annuaire/Carte,  
So that je peux explorer les membres par localisation.

**Acceptance Criteria:**

**Given** un visiteur sur le bloc Annuaire/Carte  
**When** il ouvre le tab Carte  
**Then** une carte OpenStreetMap est affichée  
**And** le switch de tab ne casse pas la navigation

### Story 2.2: Représenter les membres sur la carte avec clustering

As a visiteur,  
I want des markers/clusters lisibles,  
So that l’exploration reste efficace à forte volumétrie.

**Acceptance Criteria:**

**Given** des membres géolocalisés  
**When** la carte est chargée  
**Then** les membres apparaissent sous forme de markers/clusters  
**And** le rendu reste performant et lisible

### Story 2.3: Ouvrir un profil depuis la carte

As a visiteur,  
I want accéder à la fiche membre depuis un marker,  
So that je passe de découverte géographique à qualification profil.

**Acceptance Criteria:**

**Given** une carte avec markers  
**When** le visiteur sélectionne un marker  
**Then** un aperçu permet d’ouvrir la fiche membre  
**And** le contexte de consultation est conservé

### Story 2.4: Synchroniser filtres entre Annuaire et Carte

As a visiteur,  
I want les mêmes filtres dans les deux vues,  
So that je ne perds pas de temps à reconfigurer.

**Acceptance Criteria:**

**Given** des filtres actifs dans le panneau gauche  
**When** le visiteur bascule Annuaire <-> Carte  
**Then** les mêmes filtres restent appliqués  
**And** les résultats sont cohérents entre les vues

### Story 2.5: Conserver l’état de navigation lors du switch de vue

As a visiteur,  
I want retrouver mon contexte après changement de tab,  
So that l’exploration reste fluide.

**Acceptance Criteria:**

**Given** un contexte actif (filtres/sélection/zoom pertinent)  
**When** le visiteur change de tab puis revient  
**Then** le contexte clé est préservé  
**And** aucune réinitialisation non demandée n’est appliquée

---

## Epic 3: Contrôle d’accès admin et gouvernance des rôles

Sécuriser le back-office avec authentification session + RBAC.

### Story 3.1: Mettre en place l’authentification admin par session

As an administrateur,  
I want me connecter via email/mot de passe,  
So that je peux accéder au back-office sécurisé.

**Acceptance Criteria:**

**Given** un compte admin valide  
**When** l’utilisateur soumet ses identifiants  
**Then** une session authentifiée est créée  
**And** les mots de passe sont vérifiés via hash sécurisé

### Story 3.2: Protéger les routes admin par middleware d’authentification

As a product owner,  
I want toutes les routes admin protégées,  
So that les visiteurs non authentifiés n’y accèdent pas.

**Acceptance Criteria:**

**Given** un utilisateur non authentifié  
**When** il tente d’ouvrir une route admin  
**Then** l’accès est refusé/redirigé vers login  
**And** les routes publiques restent accessibles

### Story 3.3: Implémenter RBAC admin/super_admin

As a super admin,  
I want des permissions distinctes par rôle,  
So that seules les personnes autorisées exécutent les actions sensibles.

**Acceptance Criteria:**

**Given** un utilisateur authentifié avec rôle  
**When** il exécute une action admin  
**Then** l’autorisation est appliquée selon son rôle  
**And** les actions super-admin sont bloquées pour admin standard

### Story 3.4: Permettre au Super Admin de créer, modifier et désactiver les comptes Admin

As a super admin,  
I want créer, modifier ou désactiver les comptes admin,  
So that l’exploitation opérationnelle soit maîtrisée.

**Acceptance Criteria:**

**Given** un super admin connecté  
**When** il crée, modifie ou désactive un compte admin  
**Then** le compte est persisté avec rôle et statut corrects  
**And** l’action est journalisée

### Story 3.5: Permettre au Super Admin de réinitialiser un mot de passe Admin

As a super admin,  
I want réinitialiser le mot de passe d’un admin,  
So that je restaure l’accès en cas d’incident.

**Acceptance Criteria:**

**Given** un super admin connecté  
**When** il déclenche la réinitialisation  
**Then** le mot de passe est remplacé via flux sécurisé  
**And** l’admin concerné peut se reconnecter

### Story 3.6: Expirer automatiquement les sessions admin inactives

As a security owner,  
I want des sessions admin expirées à 30 min d’inactivité,  
So that le risque d’accès non autorisé est réduit.

**Acceptance Criteria:**

**Given** une session admin active sans activité  
**When** 30 minutes d’inactivité sont atteintes  
**Then** la session est invalidée  
**And** l’utilisateur est invité à se reconnecter

---

## Epic 4: Gestion du référentiel membres (CRUD, règles métier, cycle de vie)

Gérer la donnée membre de manière fiable côté administration.

### Story 4.1: Créer la structure de données membres avec désactivation logique

As a product team,  
I want un modèle membre persistant incluant cycle de vie logique,  
So that les profils soient gérés sans suppression définitive.

**Acceptance Criteria:**

**Given** la base de données initialisée  
**When** les migrations membres sont appliquées  
**Then** les champs profil + dates de cycle de vie (ajout, modification, désactivation) existent  
**And** la désactivation logique (soft delete) est supportée

### Story 4.2: Implémenter le formulaire création membre avec validations obligatoires

As an admin,  
I want créer un profil avec validation métier,  
So that seuls les profils conformes soient publiables.

**Acceptance Criteria:**

**Given** un admin connecté  
**When** il soumet un nouveau profil  
**Then** les champs obligatoires sont validés côté serveur  
**And** les erreurs de validation sont explicites

### Story 4.3: Supporter les champs facultatifs d’enrichissement profil

As an admin,  
I want renseigner des données facultatives,  
So that le profil soit enrichi sans bloquer la publication.

**Acceptance Criteria:**

**Given** les obligatoires valides  
**When** l’admin renseigne ou non les facultatifs  
**Then** l’enregistrement est accepté  
**And** les données facultatives sont restituées correctement

### Story 4.4: Empêcher les doublons à la création

As an admin,  
I want être empêché de créer un doublon logique,  
So that l’annuaire reste fiable.

**Acceptance Criteria:**

**Given** un membre existant avec même triplet métier  
**When** l’admin tente une création identique  
**Then** la création est bloquée  
**And** un message métier clair est affiché

### Story 4.5: Modifier un profil membre existant

As an admin,  
I want mettre à jour un profil membre,  
So that les données restent actuelles.

**Acceptance Criteria:**

**Given** un profil existant  
**When** l’admin modifie et enregistre  
**Then** les validations serveur s’appliquent  
**And** la date de dernière modification est mise à jour

### Story 4.6: Gérer le rôle bureau sur les profils

As an admin,  
I want renseigner/modifier le rôle bureau d’un membre,  
So that la gouvernance EAA soit visible.

**Acceptance Criteria:**

**Given** un profil éditable  
**When** l’admin renseigne le rôle bureau  
**Then** la donnée est enregistrée  
**And** elle apparaît dans les vues publiques concernées

### Story 4.7: Désactiver un membre

As an admin,  
I want désactiver un profil membre sans suppression définitive,  
So that le cycle de vie reste traçable.

**Acceptance Criteria:**

**Given** un profil actif  
**When** l’admin déclenche la désactivation  
**Then** le membre est marqué désactivé et la date de désactivation est renseignée  
**And** le profil disparaît des vues publiques

### Story 4.8: Gérer les vues admin selon état actif/désactivé

As an admin,  
I want filtrer la liste membres par état actif ou désactivé,  
So that je pilote l’ensemble du référentiel.

**Acceptance Criteria:**

**Given** des membres actifs et désactivés  
**When** l’admin consulte la liste par défaut  
**Then** seuls les membres actifs sont affichés  
**And** des filtres "désactivés uniquement" et "tous" sont disponibles

### Story 4.9: Appliquer les règles de visibilité public/admin

As a product owner,  
I want des règles de visibilité cohérentes,  
So that les visiteurs voient uniquement les membres actifs.

**Acceptance Criteria:**

**Given** un membre désactivé  
**When** un visiteur consulte annuaire/carte/recherche  
**Then** le membre n’est pas visible  
**And** les dates de cycle de vie restent visibles uniquement côté administration

### Story 4.10: Permettre au Super Admin de gérer membres comme un Admin+

As a super admin,  
I want exercer toutes les capacités CRUD membre,  
So that la continuité opérationnelle est assurée.

**Acceptance Criteria:**

**Given** un super admin connecté  
**When** il crée/modifie/supprime logiquement un membre  
**Then** les capacités admin sont disponibles  
**And** sécurité + validation restent appliquées

---

## Epic 5: Signalement communautaire et correction qualité

Boucler la boucle de qualité des profils via la communauté et l’admin.

### Story 5.1: Permettre le signalement d’erreur depuis une fiche membre

As a visiteur,  
I want signaler une erreur sur un profil,  
So that la qualité de l’annuaire s’améliore.

**Acceptance Criteria:**

**Given** un visiteur sur une fiche membre  
**When** il soumet un signalement valide  
**Then** le signalement est enregistré avec le membre concerné  
**And** un message de confirmation est affiché

### Story 5.2: Protéger le flux signalement par CAPTCHA

As a product owner,  
I want un contrôle anti-spam sur signalement,  
So that la file admin reste exploitable.

**Acceptance Criteria:**

**Given** une soumission signalement  
**When** le CAPTCHA échoue  
**Then** la soumission est refusée  
**And** aucun signalement n’est créé

### Story 5.3: Lister les signalements côté admin

As an admin,  
I want consulter la liste des signalements,  
So that je priorise les corrections.

**Acceptance Criteria:**

**Given** des signalements existants  
**When** l’admin ouvre la vue signalements  
**Then** la liste affiche profil, contenu, statut, date  
**And** la liste est triable/filtrable

### Story 5.4: Traiter un signalement par mise à jour du profil

As an admin,  
I want corriger le profil concerné depuis le signalement,  
So that la donnée publiée redevienne fiable.

**Acceptance Criteria:**

**Given** un signalement non traité  
**When** l’admin met à jour le profil concerné  
**Then** la correction est appliquée avec validation serveur  
**And** l’action est traçable

### Story 5.5: Marquer un signalement comme traité

As an admin,  
I want clôturer un signalement après action,  
So that la file de traitement reste claire.

**Acceptance Criteria:**

**Given** un signalement en attente  
**When** l’admin le marque traité  
**Then** son statut est mis à jour  
**And** l’état traité est visible en liste

---

## Epic 6: Mesure d’usage, traçabilité et audit

Piloter la valeur produit et la gouvernance admin avec des données fiables.

### Story 6.1: Instrumenter les événements de contact

As a product owner,  
I want tracer les clics contact,  
So that je mesure la conversion découverte -> relation.

**Acceptance Criteria:**

**Given** un visiteur sur une fiche membre  
**When** il clique un canal de contact  
**Then** un événement est enregistré (canal/type/horodatage)  
**And** l’action utilisateur n’est pas bloquée

### Story 6.2: Comptabiliser les visites du site

As a product owner,  
I want compter les visites globales,  
So that je mesure l’adoption.

**Acceptance Criteria:**

**Given** des sessions visiteurs  
**When** un accès est qualifié en visite  
**Then** le compteur est incrémenté  
**And** les règles de comptage sont documentées

### Story 6.3: Comptabiliser les vues de profils

As a product owner,  
I want mesurer les consultations de profils,  
So that j’identifie les profils les plus consultés.

**Acceptance Criteria:**

**Given** un visiteur ouvrant une fiche membre  
**When** la page profil est rendue  
**Then** un événement de vue profil est enregistré  
**And** l’agrégation par profil est disponible

### Story 6.4: Agréger les métriques d’usage pour consultation admin

As an admin,  
I want visualiser des métriques d’usage agrégées,  
So that je pilote les améliorations produit.

**Acceptance Criteria:**

**Given** des événements collectés (visites, vues, clics contact)  
**When** l’admin ouvre la vue métriques  
**Then** des agrégations lisibles sont affichées  
**And** FR55 est activable en phase Growth sans casser le MVP

### Story 6.5: Journaliser toutes les actions d’administration membres

As a compliance owner,  
I want journaliser les actions admin sensibles,  
So that toute opération soit traçable.

**Acceptance Criteria:**

**Given** une action admin sensible  
**When** l’action est exécutée  
**Then** une entrée d’audit est persistée (acteur, action, cible, horodatage)  
**And** le format de log est standardisé

### Story 6.6: Exposer l’historique d’audit agrégé au Super Admin

As a super admin,  
I want consulter l’historique global des actions admin,  
So that je supervise l’activité opérationnelle.

**Acceptance Criteria:**

**Given** des logs d’audit existants  
**When** le super admin ouvre la vue audit global  
**Then** l’historique complet est consultable avec filtres  
**And** cette vue est inaccessible à un admin standard

### Story 6.7: Exposer l’historique d’un Admin spécifique

As a super admin,  
I want filtrer l’audit par administrateur,  
So that je peux investiguer une activité ciblée.

**Acceptance Criteria:**

**Given** des logs multi-admin  
**When** le super admin filtre par un admin  
**Then** seules ses actions sont affichées  
**And** les détails incluent horodatage et action