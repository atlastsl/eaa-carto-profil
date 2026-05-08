---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments: []
documentCounts:
  briefCount: 0
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 0
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
workflowType: 'prd'
---

# Product Requirements Document - carto-profil

**Author:** Aurelien
**Date:** 2026-04-10

## Executive Summary

`carto-profil` est une plateforme web vitrine dediee a la communaute **EAA (Enspy Alumni America)**, regroupant des anciens etudiants de l'ENSPY bases en Amerique du Nord. Son objectif principal est de permettre a un visiteur interne ou externe de **retrouver rapidement un membre** au sein d'une communaute nombreuse et geographiquement dispersee, grace a une experience de consultation claire, attrayante et efficace.

Le produit repond a un besoin concret de visibilite et de connexion communautaire en centralisant, dans une interface unique, les informations utiles sur les membres : identite, promotion ENSPY, filiere, metier en Amerique du Nord, localisation (pays/ville), parcours academique en Amerique du Nord, statut de membre actif du bureau, ainsi que des canaux de contact (email, LinkedIn, Telegram, etc.). La valeur immediate de la V1 repose sur trois capacites: **recherche multicritere ciblee**, **annuaire alphabetique**, et **cartographie des membres** sur le territoire nord-americain.

### What Makes This Special

La differenciation du produit ne tient pas a une complexite technique elevee, mais a la qualite de l'experience: **recherche directe, peu bruitee, visuellement lisible et rapide**, contrairement aux plateformes sociales generalistes ou l'information est dispersee. Le moment wow vise intervient des l'arrivee sur le site: l'utilisateur comprend instantanement l'utilite de la plateforme et peut passer immediatement a l'action (chercher, parcourir, localiser).

Le produit inclut egalement une dimension institutionnelle propre a EAA, avec une rubrique dediee au **bureau** (president, vice-president, conseillers, cellules), et l'exposition du role associatif directement dans les profils concernes. A horizon 12 mois, la plateforme est pensee comme un socle extensible vers d'autres communautes alumni ENSPY (Europe, Asie, Amerique du Sud, Afrique hors Cameroun).

## Project Classification

- **Project Type:** Web Application
- **Domain:** General (Annuaire communautaire alumni)
- **Complexity:** Low
- **Project Context:** Greenfield

## Success Criteria

### User Success

Un visiteur doit pouvoir trouver un membre pertinent en **<= 1 minute** via recherche multicritere.
La recherche doit retourner des resultats pertinents dans le **Top 3 a Top 5**.
L'utilisateur doit pouvoir consulter les membres via deux parcours clairs: **annuaire alphabetique** et **cartographie Amerique du Nord**.
Le done utilisateur est atteint lorsqu'il identifie un profil pertinent et peut initier un contact (au minimum via **LinkedIn**).

### Business Success

**A 3 mois:** au moins **5 000 profils** publies et consultables.
**A 12 mois:** atteindre environ **10 000 profils** publies.
Indicateurs de valeur communautaire:
- nombre de visites du site
- nombre de clics vers canaux de contact (LinkedIn, email, Telegram)
- volume de consultations de profils

### Technical Success

Les pages cles (annuaire, carte, recherche) doivent etre percues comme rapides et fluides.
Les resultats de recherche doivent rester stables et pertinents meme a forte volumetrie de profils.
Les donnees membres doivent respecter un minimum de completude pour publication.

### Measurable Outcomes

- **Search Time:** <= 60 secondes pour trouver un membre pertinent
- **Search Relevance:** resultat attendu dans Top 3/Top 5
- **Profile Volume:** 5 000 (M+3), 10 000 (M+12)
- **Engagement:** suivi des visites + clics de contact + vues profils
- **Data Completeness Rule:** un profil est publiable si `localisation + infos alumni + LinkedIn` sont renseignes

## Product Scope

### MVP - Minimum Viable Product

- Annuaire alphabetique des membres
- Cartographie des membres (Amerique du Nord)
- Recherche multicritere (nom, promo, filiere, metier, pays, ville, ecoles, statut bureau)
- Rubrique Bureau EAA + roles visibles
- Fiche membre avec canaux de contact

### Growth Features (Post-MVP)

- Dashboard admin metriques: vues profils, clics contacts, visites site
- Suivi plus fin de performance de recherche et navigation
- Optimisations UX pour conversion consultation -> contact

### Vision (Future)

- Extension multi-regions alumni ENSPY:
  - Europe
  - Asie
  - Amerique du Sud
  - Afrique hors Cameroun

## User Journeys

### Journey 1 - Visiteur (interne/externe): parcours principal recherche et mise en relation

Un visiteur arrive sur la plateforme EAA avec l'intention de retrouver une personne de la communaute.
Des la premiere visite, il comprend la proposition de valeur (annuaire + carte), ce qui cree l'effet wow.
Il applique des filtres pertinents, consulte la liste de resultats, ouvre un profil, puis initie une prise de contact via LinkedIn ou un autre canal disponible.

**Moment de valeur:** le visiteur identifie rapidement un membre pertinent et peut passer a l'action sans friction.

### Journey 2 - Visiteur: cas limite aucun resultat

Le visiteur saisit des criteres trop restrictifs ou incomplets et n'obtient aucun resultat exact.
Le systeme affiche un message clair et propose immediatement des profils similaires ou proches.
Le visiteur ajuste ses filtres ou choisit une alternative proposee pour poursuivre sa recherche.

**Moment de recuperation:** eviter l'impasse et maintenir l'exploration utile malgre l'echec initial.

### Journey 3 - Administrateur: ajout et publication d'un profil membre

L'administrateur clique sur Ajouter, remplit le formulaire membre, puis soumet.
Le systeme valide les champs obligatoires avant autorisation de publication.
Si la validation passe, le profil est publie et devient visible dans l'annuaire et sur la carte.

**Champs obligatoires:**
- Nom
- Promotion ENSPY
- Filiere ENSPY
- Localisation Amerique (Pays)
- Statut membre actif du bureau
- Canal LinkedIn

**Champs non obligatoires:**
- Prenom
- Parcours scolaire en Amerique du Nord
- Metier en Amerique du Nord
- Domaine d'expertise en Amerique (multi-valeurs)
- Localisation Ville
- Contact Email
- Telegram
- Photo

**Moment de valeur:** un flux simple qui garantit une qualite minimale de donnees publiees.

### Journey 4 - Visiteur + Admin: signalement et correction d'erreurs profil

Tout visiteur peut signaler une erreur sur un profil.
Le signalement est transmis a l'administrateur, qui visualise les signalements, evalue leur validite et corrige les donnees si necessaire.
Une fois corrige, le profil mis a jour reste coherent et fiable pour les recherches futures.

**Moment de valeur:** amelioration continue de la qualite de l'annuaire par la communaute elle-meme.

### Journey Requirements Summary

Ces parcours imposent les capacites suivantes:
- Decouverte & UX: page d'accueil claire, attractive, orientee action
- Recherche & exploration: moteur multicritere + annuaire + cartographie
- Resilience de recherche: gestion zero resultat avec suggestions intelligentes
- Gestion des profils: back-office admin avec formulaire, validation et publication
- Qualite des donnees: mecanisme de signalement d'erreurs + traitement admin
- Contactabilite: affichage clair des canaux de contact (au minimum LinkedIn)

## Domain-Specific Requirements

### Compliance & Governance

- La collecte du consentement et des donnees membres est hors perimetre applicatif et operee par une equipe dediee.
- L'application considere que les donnees injectees sont deja autorisees pour publication.
- Politique de visibilite: toutes les informations publiees sont visibles par tous les visiteurs (internes et externes).

### Access Control & Data Governance

- Modele de roles:
  - Super Admin (cree en dur au lancement)
  - Admin(s) (crees et geres par le Super Admin)
- Le Super Admin peut egalement creer/mettre a jour des membres.
- Politique anti-doublon obligatoire:
  - unicite logique sur `(nom + prenom + promotion ENSPY)`
  - blocage de creation si doublon detecte
- Revue qualite des profils: audit annuel de completude et coherence.

### Technical Constraints

- Securite admin minimale: authentification email + mot de passe.
- Reset mot de passe admin par Super Admin.
- Journalisation obligatoire des actions admin (qui, quoi, quand).
- Cartographie: OpenStreetMap retenu.
- Export de donnees: non requis a ce stade.
- Protection anti-spam: CAPTCHA requis sur les formulaires de signalement.

### Hosting Recommendation

- Recommandation V1:
  - Frontend: Vercel
  - Backend + base de donnees: Supabase
- Justification: time-to-market rapide, cout faible, exploitation simple pour une equipe associative.

## Web App Specific Requirements

### Project-Type Overview

`carto-profil` est une application web de type MPA orientee consultation publique (annuaire + cartographie), avec un back-office admin pour la gestion des profils membres.
Le produit privilegie clarte, rapidite de recherche et indexabilite web, avec un niveau de complexite technique volontairement maitrise.

### Technical Architecture Considerations

- Rendering model: MPA (rendu multi-pages) pour lisibilite, structure claire et SEO robuste.
- Browser support: versions recentes de Chrome, Safari, Edge et Firefox.
- SEO: priorite elevee en V1 (metadonnees, structure HTML semantique, pages indexables, URLs propres).
- Real-time: non requis; rafraichissement standard des donnees suffisant.
- Accessibility target: niveau pratique minimum (navigation clavier de base, contrastes lisibles, formulaires utilisables), sans objectif formel WCAG AA en V1.

### Implementation Considerations

- Structurer le site autour de pages indexables: accueil, annuaire, cartographie, bureau EAA, fiche membre.
- Mettre en place une strategie SEO operationnelle: title/meta par page, Open Graph de base, sitemap.xml, robots.txt, maillage interne coherent.
- Garantir de bonnes performances percues sur annuaire/carte/recherche meme sans temps reel.
- Preserver une UX coherente entre espaces publics et espace admin.
- Eviter la dette inutile en V1 (pas de streaming temps reel ni complexification prematuree).

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** hybride, combinant validation d'usage communautaire et impact visuel wow des la premiere visite.
**Resource Requirements:** execution appuyee par des agents IA avec supervision humaine pour les decisions produit, la qualite et la mise en production.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Consultation de l'annuaire des membres
- Recherche multicritere
- Consultation de profils et prise de contact
- Exploration cartographique des membres

**Must-Have Capabilities:**
- Annuaire alphabetique
- Moteur de recherche et filtres
- Cartographie des membres (OpenStreetMap)
- Consultation de fiche membre + canaux de contact
- Back-office admin minimal pour publication et correction
- Controle anti-doublon sur creation de profil

### Post-MVP Features

**Phase 2 (Growth):**
- Statistiques d'usage (visites, vues profils, clics contacts)
- Instrumentation analytics pour pilotage produit
- Optimisations UX/SEO basees sur donnees reelles

**Phase 3 (Expansion):**
- Extension geographique vers autres communautes ENSPY (Europe, Asie, Amerique du Sud, Afrique hors Cameroun)
- Evolution progressive du modele de donnees pour support multi-regions

### Risk Mitigation Strategy

**Technical Risks:** complexite globale faible; mitigation par architecture simple et stack standard.
**Market Risks:** usage reel et frequence de consultation a confirmer; mitigation par mesure continue post-lancement.
**Resource Risks:** dependance aux agents IA; mitigation par validation humaine des livrables critiques.

## Functional Requirements

### Consultation publique des membres

- FR1: Un visiteur peut acceder a la page d'accueil publique de la plateforme.
- FR2: Un visiteur peut consulter l'annuaire alphabetique des membres.
- FR3: Un visiteur peut ouvrir la fiche detaillee d'un membre depuis l'annuaire.
- FR4: Un visiteur peut consulter les informations publiques d'un membre (identite, parcours, localisation, role eventuel au bureau, contacts publies).
- FR5: Un visiteur peut consulter la rubrique dediee au bureau EAA.
- FR6: Un visiteur peut visualiser les membres du bureau avec leurs roles.

### Recherche et decouverte

- FR7: Un visiteur peut rechercher un membre par nom.
- FR8: Un visiteur peut filtrer les membres par promotion ENSPY.
- FR9: Un visiteur peut filtrer les membres par filiere ENSPY.
- FR10: Un visiteur peut filtrer les membres par metier en Amerique du Nord.
- FR11: Un visiteur peut filtrer les membres par pays de localisation en Amerique du Nord.
- FR12: Un visiteur peut filtrer les membres par ville de localisation.
- FR13: Un visiteur peut filtrer les membres par ecole(s) frequentee(s) en Amerique du Nord.
- FR14: Un visiteur peut filtrer les membres par statut actif au bureau.
- FR15: Un visiteur peut filtrer les membres par domaine(s) d'expertise en Amerique.
- FR16: Un visiteur peut combiner 2 filtres ou plus dans une meme recherche.
- FR17: Le systeme peut afficher une liste de resultats correspondant aux criteres saisis.
- FR18: Le systeme peut signaler explicitement l'absence de resultat.
- FR19: Le systeme peut proposer jusqu'a 5 profils proches lorsque la recherche ne retourne aucun resultat exact, en se basant sur les criteres partiellement correspondants (promotion, filiere, pays, metier).

### Cartographie des membres

- FR20: Un visiteur peut acceder a une vue cartographique des membres en Amerique du Nord.
- FR21: Un visiteur peut visualiser des points geographiques representant les membres localises.
- FR22: Un visiteur peut ouvrir un profil membre depuis la vue cartographique.
- FR23: Un visiteur peut appliquer les memes criteres de recherche/filtrage sur la cartographie.

### Mise en relation et contact

- FR24: Un visiteur peut acceder aux canaux de contact publies d'un membre.
- FR25: Un visiteur peut initier une prise de contact via les liens fournis (LinkedIn, email, Telegram selon disponibilite).
- FR26: Le systeme peut enregistrer les evenements de clics sur les canaux de contact.

### Administration des profils et du bureau

- FR27: Un Super Admin peut creer des comptes Admin.
- FR28: Un Super Admin peut modifier ou desactiver un compte Admin existant.
- FR29: Un Super Admin peut reinitialiser le mot de passe d'un Admin.
- FR30: Un Admin peut creer un profil membre.
- FR31: Un Admin peut modifier un profil membre.
- FR32: Un Admin peut supprimer logiquement un profil membre.
- FR33: Un Super Admin possede toutes les capacites d'un Admin.
- FR34: Un Super Admin peut ajouter, modifier et supprimer logiquement des membres EAA.
- FR35: Le systeme peut imposer les champs obligatoires avant publication (Nom, Promotion ENSPY, Filiere ENSPY, Pays de localisation en Amerique, Statut membre actif du bureau, Canal LinkedIn).
- FR36: Le systeme peut accepter les champs facultatifs definis pour enrichissement de profil.
- FR37: Le systeme peut empecher la creation de doublons selon la regle `(nom + prenom + promotion ENSPY)`.
- FR38: Un Admin peut renseigner les informations de role bureau d'un membre concerne.

### Signalement et qualite des donnees

- FR39: Un visiteur peut signaler une erreur sur un profil.
- FR40: Le systeme peut proteger le flux de signalement par CAPTCHA.
- FR41: Un Admin peut consulter la liste des signalements recus.
- FR42: Un Admin peut traiter un signalement en mettant a jour le profil concerne.
- FR43: Un Admin peut marquer un signalement comme traite.

### Visibilite et cycle de vie des membres

- FR44: Un Admin peut desactiver un profil membre sans suppression definitive des donnees.
- FR45: Le systeme peut conserver les donnees des membres desactives pour usage administratif.
- FR46: Un visiteur ne peut consulter que les membres actifs.
- FR47: Un Admin voit par defaut la liste des membres actifs.
- FR48: Un Admin peut filtrer la liste des membres pour voir uniquement les membres desactives.
- FR49: Un Admin peut filtrer la liste des membres pour voir l'ensemble (actifs + desactives).
- FR50: Le systeme peut conserver la date d'ajout, la date de derniere modification et la date de desactivation de chaque membre.
- FR51: Un Admin peut consulter les dates de cycle de vie d'un membre (ajout, modification, desactivation).

### Mesure d'usage et pilotage

- FR52: Le systeme peut comptabiliser les visites du site.
- FR53: Le systeme peut comptabiliser les vues de profils.
- FR54: Le systeme peut comptabiliser les clics sur canaux de contact.
- FR55: Un Admin peut consulter les metriques d'usage agregees (phase Growth).

### Gouvernance et tracabilite

- FR56: Le systeme peut journaliser les actions d'administration sur les donnees membres.
- FR57: Le systeme peut associer chaque action journalisee a un acteur identifie et a un horodatage.
- FR58: Le systeme peut conserver un historique exploitable des operations d'administration.
- FR59: Un Super Admin peut consulter l'historique agrege de toutes les actions d'administration.
- FR60: Un Super Admin peut consulter l'historique des actions d'un Admin specifique.

## Non-Functional Requirements

### Performance

- NFR1: Les pages cles (annuaire, cartographie, resultats de recherche) doivent repondre en <= 1 seconde au 95e percentile, mesure par les metriques du navigateur (Time to Interactive).
- NFR2: La performance cible doit etre maintenue pour une charge nominale de 100 utilisateurs simultanes.
- NFR3: Le systeme doit maintenir un temps de reponse <= 2 secondes au 95e percentile pour 1 000 utilisateurs simultanes sur l'horizon 12 mois.

### Security

- NFR4: Toutes les communications client-serveur doivent etre protegees par HTTPS.
- NFR5: Les mots de passe des comptes d'administration doivent etre stockes sous forme hachee.
- NFR6: Les actions d'administration doivent etre journalisees avec identifiant de l'acteur, type d'action, entite concernee et horodatage.
- NFR7: Une session d'administration inactive doit expirer automatiquement apres 30 minutes d'inactivite.

### Scalability

- NFR8: L'architecture doit supporter 100 utilisateurs simultanes avec un temps de reponse <= 1 seconde au 95e percentile.
- NFR9: Le systeme doit pouvoir evoluer vers 1 000 utilisateurs sur 12 mois par ajustement de configuration ou de ressources, sans modification de l'architecture applicative.

### Accessibility

- NFR10: L'experience visiteur doit etre fonctionnelle sur les breakpoints mobile (>= 375px), tablette (>= 768px) et PC (>= 1024px).
- NFR11: L'interface d'administration est supportee sur PC uniquement.
- NFR12: Le produit doit permettre la navigation clavier sur les elements interactifs, maintenir un ratio de contraste >= 4.5:1 pour le texte, et associer chaque champ de formulaire a un label explicite.
- NFR13: Aucune exigence de conformite WCAG formelle n'est imposee pour la V1.

### Reliability & Operations

- NFR14: Le service vise un taux de disponibilite de 99.9% mesure sur une base mensuelle via le monitoring de l'hebergeur.
- NFR15: La base de donnees doit etre sauvegardee de facon hebdomadaire.
- NFR16: Les sauvegardes doivent etre conservees pendant 30 jours.
