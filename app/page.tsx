"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

type Service = {
  id: string;
  name: string;
  result: string;
  clients: string;
  learn: string;
  deliverables: string[];
  kpis: string;
  start: string;
  level: string;
  tools: string[];
  price: string;
};

const services: Service[] = [
  {
    id: "website",
    name: "Site internet",
    result: "Transformer la présence en ligne en outil de confiance et de prise de contact.",
    clients: "Artisans, restaurants, cabinets, indépendants, salles de sport, commerces et entreprises dont le site est absent, lent ou dépassé.",
    learn: "Maîtriser la mise en page, les polices, les couleurs, les images, l’adaptation mobile, les textes de vente et le référencement Google. Puis apprendre les petites animations, le défilement animé, la 3D légère et les transitions avec Motion, GSAP, Rive ou Spline. Utiliser Claude ou Codex pour produire et vérifier le code, sans sacrifier vitesse, lisibilité ni résultats.",
    deliverables: ["Direction visuelle + maquette", "Règles visuelles + petites animations", "Site de 4 à 7 pages adapté au mobile", "Référencement, vitesse + suivi"],
    kpis: "Demandes reçues, appels, conversion des formulaires, vitesse et positions locales",
    start: "Audit puis concept de page d’accueil avec un hero fort et une interaction signature",
    level: "Débutant +",
    tools: ["Claude", "Codex", "Arena.ai", "21st.dev", "HorizonX", "Figma", "Framer ou Webflow", "shadcn/ui", "Aceternity UI", "Magic UI", "Motion", "GSAP", "Rive", "Spline", "Three.js", "Awwwards", "Godly", "Mobbin", "GitHub", "PageSpeed Insights"],
    price: "One page 300–500 € · Vitrine 600–1 000 € · E-commerce starter 1 200–2 000 €",
  },
  {
    id: "nfc",
    name: "Plaques NFC & avis",
    result: "Faciliter les avis Google, le partage de coordonnées ou l’accès à une carte digitale en un geste.",
    clients: "Restaurants, hôtels, coiffeurs, instituts, garages, cabinets, agents immobiliers, événements et commerces physiques.",
    learn: "Comprendre les puces NTAG, programmer une URL, créer une page mobile, installer un parcours d’avis conforme et tester sur iOS/Android.",
    deliverables: ["Plaque ou support NFC", "QR code de secours", "Page mobile", "Installation + mode d’emploi"],
    kpis: "Scans, clics, nouveaux avis, note moyenne et taux de conversion de la page",
    start: "Démonstration physique puis pack pilote sur un établissement",
    level: "Débutant",
    tools: ["NFC Tools", "Puce NTAG215/216", "Canva ou Figma", "Carrd ou Framer", "Google Business Profile", "Bitly ou Dub.co"],
    price: "Plaque standard 40–60 € · Personnalisée 70–120 € · Pack de 5 : 180–300 €",
  },
  {
    id: "branding",
    name: "Branding & identité",
    result: "Rendre l’entreprise reconnaissable et cohérente sur tous ses points de contact.",
    clients: "Nouvelles entreprises, restaurants, marques e-commerce, cabinets, artisans premium et commerces en repositionnement.",
    learn: "Étudier stratégie de marque, moodboards, typographie, couleur, composition, déclinaisons print et digitales, exports et présentation client. Construire une identité cohérente, pas seulement générer un logo.",
    deliverables: ["Logo + déclinaisons", "Palette + typographies", "Charte graphique", "Flyer, carte et modèles"],
    kpis: "Cohérence des supports, délai de production, utilisation du kit et perception client",
    start: "Un pack défini par les supports réellement nécessaires : logo, charte, flyer et modèles",
    level: "Intermédiaire",
    tools: ["Figma", "Illustrator ou Affinity", "Canva Pro", "GPT Image 2", "Recraft ou Ideogram", "Adobe Firefly", "Coolors", "Fontshare", "Arena.ai"],
    price: "Logo seul 80–200 € · Identité visuelle 250–500 € · Pack charte + supports 500–900 €",
  },
  {
    id: "automation",
    name: "Automatisation de tâches",
    result: "Supprimer les tâches répétitives et éviter les oublis entre les outils de l’entreprise.",
    clients: "Agences, cabinets, recruteurs, organismes de formation, entreprises de services, e-commerce et équipes administratives.",
    learn: "Cartographier un processus, apprendre webhooks et API sans code, construire des scénarios, gérer erreurs, sécurité et documentation.",
    deliverables: ["Analyse des tâches", "1 à 6 scénarios automatisés", "Gestion des erreurs", "Documentation + formation"],
    kpis: "Heures économisées, erreurs évitées, délai de traitement et taux de réussite des scénarios",
    start: "Analyse puis proposition à trois niveaux : scénario simple, processus métier ou système complet",
    level: "Intermédiaire",
    tools: ["Make", "Zapier ou n8n", "Airtable", "Notion", "Google Workspace", "Loom"],
    price: "Scénario simple 150–300 € · Processus métier 500–900 € · Système complet 1 200–1 500 €",
  },
  {
    id: "landing",
    name: "Page de vente & tunnel",
    result: "Transformer une offre précise en demandes, réservations ou appels qualifiés.",
    clients: "Coachs, centres de formation, artisans à panier élevé, cabinets, agences et entreprises lançant une offre.",
    learn: "Textes de vente, ordre des sections, formulaires, calendrier, preuves, mesure des visites et tests pour obtenir plus de demandes.",
    deliverables: ["Page de vente", "Formulaire avec questions", "Calendrier", "Suivi + tableau de bord"],
    kpis: "Taux de conversion, coût par demande, présence au rendez-vous et ventes",
    start: "Sprint de 7 jours sur une seule offre",
    level: "Débutant +",
    tools: ["Framer ou Webflow", "Systeme.io", "Tally", "Calendly", "Google Tag Manager", "Microsoft Clarity"],
    price: "Template adapté 250–400 € · Sur-mesure 450–800 € · Petit tunnel 800–1 200 €",
  },
  {
    id: "maps",
    name: "Visibilité Google locale",
    result: "Faire remonter l’établissement dans Maps et convertir les recherches locales.",
    clients: "Restaurants, garages, coiffeurs, instituts, cabinets, artisans et commerces de proximité.",
    learn: "Google Business Profile, catégories, avis, photos, citations locales, pages de zone et lecture des statistiques.",
    deliverables: ["Audit de la fiche", "Optimisation complète", "Système d’avis", "Suivi des positions"],
    kpis: "Appels, itinéraires, clics site, positions locales et nouveaux avis",
    start: "Mise à niveau en 14 jours puis suivi mensuel",
    level: "Débutant",
    tools: ["Google Business Profile", "Local Falcon ou Localo", "Google Search Console", "PlePer", "Canva", "Looker Studio"],
    price: "Optimisation 150–250 € · Avec système d’avis 250–400 € · Suivi 79–199 €/mois",
  },
  {
    id: "reactivation",
    name: "CRM & réactivation",
    result: "Transformer les contacts oubliés en rendez-vous et structurer le suivi commercial.",
    clients: "Instituts, garages, salles de sport, cabinets, centres de formation et entreprises possédant déjà une base clients.",
    learn: "Étapes de suivi dans un CRM, nettoyage et classement des contacts, scripts d’appel, SMS conforme, rappels, prise de rendez-vous et mesure des ventes.",
    deliverables: ["Étapes du suivi configurées", "Base classée par groupes", "Scripts appel/SMS", "Campagne + suivi des RDV"],
    kpis: "Contacts joints, rendez-vous, taux de retour, ventes et revenu réactivé",
    start: "Sprint de 10 jours sur un segment dormant",
    level: "Intermédiaire",
    tools: ["HubSpot ou Pipedrive", "Airtable", "Aircall", "Twilio", "Calendly", "Make"],
    price: "Pipeline 200–400 € · Sprint réactivation 350–700 € · Suivi 150–300 €/mois",
  },
  {
    id: "video",
    name: "Vidéos courtes",
    result: "Créer une présence régulière qui montre le savoir-faire et nourrit la confiance.",
    clients: "Restaurants, salles de sport, agents immobiliers, commerces, coachs et métiers visuels.",
    learn: "Phrases d’accroche, plan de la vidéo, tournage au smartphone, lumière, son, montage rythmé, sous-titres et analyse du temps de visionnage.",
    deliverables: ["Calendrier éditorial", "Journée de tournage", "8 à 16 vidéos", "Bilan mensuel"],
    kpis: "Rétention, portée locale, visites du profil et demandes entrantes",
    start: "Pack de 8 vidéos tournées en une demi-journée",
    level: "Débutant",
    tools: ["Smartphone", "DJI Mic ou Rode", "CapCut ou Premiere Pro", "Canva", "Notion", "Google Drive"],
    price: "4 vidéos 200–350 € · 8 vidéos 400–700 € · 12 vidéos 700–1 100 €",
  },
  {
    id: "google",
    name: "Google Ads Search",
    result: "Capter les prospects qui recherchent déjà la prestation.",
    clients: "Plombiers, serruriers, avocats, déménageurs, garages, dentistes et services locaux à forte intention.",
    learn: "Google Skillshop, mots-clés, annonces, pages d’atterrissage, conversions, appels suivis et exclusions de recherche.",
    deliverables: ["Étude des recherches", "Campagnes sur Google", "Suivi des appels", "Amélioration mensuelle"],
    kpis: "Coût par appel, taux de conversion, part d’impressions et ventes attribuées",
    start: "Audit + campagne sur une zone et un service précis",
    level: "Intermédiaire",
    tools: ["Google Ads", "Keyword Planner", "Google Tag Manager", "GA4", "CallRail", "Looker Studio"],
    price: "Setup 200–400 € · Gestion 250–500 €/mois · Budget média payé par le client",
  },
  {
    id: "ecommerce-cro",
    name: "Optimisation e-commerce",
    result: "Transformer davantage de visites en achats sans reconstruire toute la boutique.",
    clients: "Boutiques Shopify ou WooCommerce ayant déjà du trafic, des ventes et un catalogue actif, mais une conversion faible ou beaucoup d’abandons.",
    learn: "Comprendre le parcours d’achat, la fiche produit, les preuves, les frais, le panier, le paiement, la vitesse mobile et l’analyse des comportements. Apprendre à prioriser les corrections selon leur impact et leur difficulté.",
    deliverables: ["Audit du parcours d’achat", "Plan d’actions priorisé", "Amélioration de 3 à 8 écrans", "Mesure avant/après"],
    kpis: "Ajouts au panier, passage au paiement, conversion, panier moyen et revenu par visite",
    start: "Audit de cinq pages clés puis sprint de correction sur le principal point de fuite",
    level: "Intermédiaire",
    tools: ["Shopify ou WooCommerce", "GA4", "Microsoft Clarity", "PageSpeed Insights", "Figma", "VWO ou AB Tasty", "Google Tag Manager"],
    price: "Audit 200–350 € · Sprint 450–800 € · Suivi 200–400 €/mois",
  },
  {
    id: "ai-assistant",
    name: "Assistant IA & chatbot",
    result: "Répondre plus vite aux questions répétitives et orienter les visiteurs vers la bonne action.",
    clients: "E-commerce, organismes de formation, agences, cabinets, services clients et entreprises recevant régulièrement les mêmes questions.",
    learn: "Structurer une base de connaissances, rédiger les règles de réponse, configurer les limites, connecter une prise de contact et tester les cas où l’assistant doit passer la main à un humain.",
    deliverables: ["Base de réponses validée", "Assistant intégré au site", "Parcours de qualification", "Tests, limites + documentation"],
    kpis: "Questions résolues, transfert vers un humain, demandes qualifiées, erreurs et satisfaction",
    start: "Assistant FAQ limité à vingt questions fréquentes avec transfert humain obligatoire",
    level: "Intermédiaire",
    tools: ["Voiceflow", "Chatbase", "Intercom ou Crisp", "OpenAI ou Claude", "Make ou n8n", "Notion", "Tally"],
    price: "FAQ simple 250–500 € · Assistant connecté 700–1 500 € · Suivi 80–200 €/mois",
  },
  {
    id: "dashboard",
    name: "Tableau de bord & données",
    result: "Rassembler les chiffres importants pour permettre au dirigeant de décider sans ouvrir cinq outils.",
    clients: "Agences, e-commerce, organismes de formation, commerces multi-sites et entreprises utilisant déjà un CRM, un tableur ou plusieurs canaux d’acquisition.",
    learn: "Définir les bonnes questions, nettoyer les données, relier les sources, créer des indicateurs compréhensibles et documenter la fréquence de mise à jour.",
    deliverables: ["Carte des sources", "Tableau de bord", "Définitions des chiffres", "Formation + contrôle des données"],
    kpis: "Fraîcheur des données, erreurs, temps de préparation économisé et décisions prises",
    start: "Un tableau de bord hebdomadaire limité à cinq chiffres commerciaux",
    level: "Intermédiaire",
    tools: ["Looker Studio", "Google Sheets", "Airtable", "GA4", "HubSpot", "Make ou n8n", "Metabase"],
    price: "Une source 250–450 € · Multi-sources 600–1 000 € · Automatisé 1 000–1 500 €",
  },
  {
    id: "booking",
    name: "Réservation & paiement",
    result: "Permettre au client final de réserver, payer un acompte et recevoir les bonnes informations sans échange inutile.",
    clients: "Consultants, coachs, cabinets, photographes, salons, artisans, formateurs, locations et prestations sur rendez-vous.",
    learn: "Cartographier les créneaux, durées, capacités, annulations, acomptes, formulaires et rappels. Tester le parcours complet sur téléphone avant livraison.",
    deliverables: ["Calendrier configuré", "Formulaire de préparation", "Acompte ou paiement", "Rappels + tableau de suivi"],
    kpis: "Réservations, présence, annulations, paiements réussis et temps administratif économisé",
    start: "Un service, un calendrier, un formulaire et un acompte testés de bout en bout",
    level: "Débutant +",
    tools: ["Calendly ou Cal.com", "Tally", "Stripe", "Planity ou Reservio", "Google Calendar", "Make", "Twilio"],
    price: "Installation 150–300 € · Parcours complet 350–650 € · Automatisé 700–1 200 €",
  },
  {
    id: "product-content",
    name: "Contenus produits e-commerce",
    result: "Rendre un catalogue plus clair, désirable et cohérent pour faciliter la décision d’achat.",
    clients: "Marques Shopify, créateurs de produits, boutiques mode, beauté, maison, accessoires et vendeurs lançant une nouvelle collection.",
    learn: "Hiérarchiser les bénéfices, écrire une fiche produit, préparer les prises de vue, produire des variations visuelles, respecter l’identité et vérifier chaque information commerciale.",
    deliverables: ["Fiches produits réécrites", "Visuels et déclinaisons", "Scripts vidéo ou UGC", "Guide de cohérence catalogue"],
    kpis: "Conversion des fiches, ajouts au panier, retours produit, temps passé et panier moyen",
    start: "Refonte de dix fiches sur les produits les plus visités ou les plus rentables",
    level: "Débutant +",
    tools: ["Shopify", "Figma ou Canva", "GPT Image 2", "Recraft", "Photoroom", "CapCut", "Claude ou Codex"],
    price: "10 fiches 250–450 € · Pack visuels 350–700 € · Pack lancement 700–1 200 €",
  },
  {
    id: "social-local",
    name: "Réseaux sociaux locaux",
    result: "Maintenir une présence régulière qui montre le métier, les preuves et les offres du moment.",
    clients: "Restaurants, commerces, salles de sport, instituts, artisans, agences immobilières et entreprises locales déjà présentes mais irrégulières.",
    learn: "Construire des rubriques, planifier, produire en lot, écrire simplement, adapter les formats et mesurer les visites de profil, appels et demandes plutôt que les likes seuls.",
    deliverables: ["Calendrier mensuel", "8 à 12 contenus", "Programmation", "Bilan orienté demandes"],
    kpis: "Régularité, portée locale, visites du profil, clics, appels et demandes entrantes",
    start: "Un mois pilote autour de quatre rubriques : expertise, preuve, coulisses et offre",
    level: "Débutant",
    tools: ["Canva", "CapCut", "Meta Business Suite", "Buffer ou Metricool", "Notion", "Google Drive", "GPT Image 2"],
    price: "8 publications 250–450 €/mois · 12 contenus 450–700 €/mois · Avec tournage 700–1 000 €/mois",
  },
];

const modules = [
  ["01", "Le modèle", "Comprendre ce que le client achète vraiment."],
  ["02", "Les services", "Choisir une prestation simple à délivrer."],
  ["03", "Se former", "Passer de théorie à compétence démontrable."],
  ["04", "La cible", "Repérer les entreprises capables d’acheter."],
  ["05", "L’offre", "Vendre un résultat, un périmètre et une méthode."],
  ["06", "Prospection", "Appels à des contacts connus, appels à froid, terrain et partenaires."],
  ["07", "Appel à froid", "Ouvrir, comprendre le besoin et obtenir le rendez-vous."],
  ["08", "Terrain", "Entrer, diagnostiquer et repartir avec une suite."],
  ["09", "Conclusion de vente", "Comprendre la situation et proposer proprement."],
  ["10", "Objections", "Répondre sans réciter ni argumenter dans le vide."],
  ["11", "Livraison", "Démarrage du client, chiffres à suivre, bilan et fidélisation."],
  ["12", "Glossaire débutant", "Comprendre les mots utilisés dans le business et les outils."],
  ["13", "Plan 90 jours", "Construire les premières preuves et signer."],
  ["14", "Mon agence", "Remplir et copier son plan d’exécution."],
  ["15", "Cadre professionnel", "Statut, devis, facture, contrat et conformité."],
  ["16", "Proposition commerciale", "Présenter une recommandation claire et signable."],
  ["17", "Finance d’agence", "Calculer marge, capacité et objectif commercial."],
  ["18", "Systèmes & procédures", "Livrer avec une méthode répétable et documentée."],
  ["19", "Sous-traitance", "Déléguer sans perdre la qualité ni la relation client."],
  ["20", "IA pour l’agence", "Accélérer recherche, production, vente et contrôle."],
  ["21", "Bibliothèque de modèles", "Copier les documents qui font gagner du temps."],
  ["22", "Contrôle qualité", "Vérifier chaque vente et chaque livraison avant envoi."],
];

const quickChapters = [
  { id: "top", number: "00", label: "Couverture" },
  { id: "modules", number: "01", label: "Parcours" },
  { id: "services", number: "02", label: "Services" },
  { id: "data-marche", number: "03", label: "Data marché" },
  { id: "prospection", number: "04", label: "Prospection" },
  { id: "objections", number: "05", label: "Objections" },
  { id: "cadre-pro", number: "06", label: "Cadre pro" },
  { id: "finance", number: "07", label: "Finance" },
  { id: "ia-agence", number: "08", label: "IA agence" },
  { id: "modeles", number: "09", label: "Modèles" },
  { id: "qualite", number: "10", label: "Contrôle final" },
];

const marketStats = [
  {
    value: "1 165 800",
    label: "entreprises créées en France en 2025",
    change: "+5 % en un an · nouveau record",
    insight: "Signal commercial : les entreprises récentes doivent souvent construire leur identité, leur site et leurs premiers systèmes.",
    source: "Insee",
    url: "https://www.insee.fr/fr/statistiques/8721354",
  },
  {
    value: "84 %",
    label: "des TPE-PME ont une visibilité en ligne",
    change: "site internet ou réseau social",
    insight: "Présence ne veut pas dire performance : audite la clarté de l’offre, la prise de contact, le mobile et la visibilité locale.",
    source: "France Num",
    url: "https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/comprendre-le-numerique/barometre-france-num-2025-le",
  },
  {
    value: "40 %",
    label: "voient le numérique augmenter leur chiffre d’affaires",
    change: "bénéfice commercial déclaré",
    insight: "Vends un impact compréhensible — demandes, rendez-vous, ventes ou temps gagné — plutôt qu’une liste de tâches.",
    source: "France Num",
    url: "https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/comprendre-le-numerique/barometre-france-num-2025-le",
  },
  {
    value: "26 %",
    label: "des TPE-PME utilisent déjà l’intelligence artificielle",
    change: "+13 points par rapport à 2024",
    insight: "Seules 5 % déclarent automatiser des tâches : il existe un écart entre tester l’IA et l’intégrer à un vrai processus.",
    source: "France Num",
    url: "https://www.francenum.gouv.fr/files/2025-09/Barom%C3%A8tre%20France%20Num%202025%20-%20Infographie%20VF.pdf",
  },
  {
    value: "196,4 Md€",
    label: "de ventes en ligne en France en 2025",
    change: "+7 % par rapport à 2024",
    insight: "Signal commercial : boutiques, marques et commerçants ont besoin de sites rapides, de conversion, de contenu et de fidélisation.",
    source: "Fevad",
    url: "https://www.fevad.com/bilan-du-e-commerce-en-france-les-francais-ont-depense-pres-de-200-milliards-deuros-sur-internet-en-2025/",
  },
  {
    value: "27 %",
    label: "disposent d’au moins une solution de vente en ligne",
    change: "dont 17 % avec un site marchand · France Num 2025",
    insight: "Catalogue, réservation, acompte ou paiement : pars du parcours réel du client, pas de la technologie à placer.",
    source: "France Num",
    url: "https://www.francenum.gouv.fr/files/2025-09/Barom%C3%A8tre%20France%20Num%202025%20-%20Infographie%20VF.pdf",
  },
];

const digitalDemandSignals = [
  { value: 70, label: "ont un projet numérique à deux ans", detail: "Les logiciels, le matériel et la présence en ligne restent les priorités principales." },
  { value: 51, label: "obtiennent déjà des clients grâce à internet", detail: "Au moins 5 % de leurs clients proviennent du web." },
  { value: 42, label: "ont dépensé plus de 1 000 € dans le numérique", detail: "Dépenses 2024 en matériel et logiciels, hors formation et recrutement." },
  { value: 25, label: "n’ont consacré aucun budget au numérique", detail: "Ne confonds jamais problème visible et capacité réelle à acheter." },
  { value: 20, label: "ont suivi une formation numérique", detail: "Le manque de temps est le premier frein à la formation pour 55 %." },
  { value: 36, label: "ont déjà subi un incident de cybersécurité", detail: "21 % citent l’hameçonnage et 16 % un logiciel malveillant." },
];

const growthSectors = [
  { sector: "Commerce", creations: "172 600", growth: "+11,1 %", offers: "Identité, boutique en ligne, visibilité locale, avis et fidélisation" },
  { sector: "Services spécialisés & techniques", creations: "170 200", growth: "+6,2 %", offers: "Site de confiance, prise de rendez-vous, suivi client et automatisation" },
  { sector: "Services administratifs & soutien", creations: "129 100", growth: "+11,7 %", offers: "Automatisation, outils de suivi, site et génération de demandes" },
  { sector: "Information & communication", creations: "75 000", growth: "+8,2 %", offers: "Positionnement, identité premium, site et systèmes internes" },
  { sector: "Hébergement & restauration", creations: "47 300", growth: "+6,7 %", offers: "Google local, site, réservation, NFC, menus et avis" },
];

const ecommercePulse = [
  { value: "3,2 Md", label: "transactions en ligne", change: "+10 % en un an" },
  { value: "62 €", label: "panier moyen", change: "−3 % en un an" },
  { value: "+9 %", label: "croissance des services en ligne", change: "contre +4 % pour les produits" },
  { value: "12 %", label: "du commerce de détail produit", change: "réalisé en ligne" },
];

const dataBackedOffers = [
  { metric: "66 %", fact: "ont un compte sur un réseau social", gap: "Seulement 46 % des entreprises présentes publient au moins chaque semaine.", offer: "Réseaux sociaux locaux", angle: "Remettre de la régularité et relier le contenu aux demandes réelles." },
  { metric: "17 %", fact: "possèdent un véritable site marchand", gap: "La vente en ligne représente environ 20 % du chiffre d’affaires des entreprises équipées.", offer: "Optimisation e-commerce", angle: "Améliorer la conversion d’une boutique active avant de proposer une refonte." },
  { metric: "14 %", fact: "utilisent un chatbot ou un assistant IA", gap: "L’usage existe, mais reste minoritaire et demande une base de réponses fiable.", offer: "Assistant IA & chatbot", angle: "Commencer petit : FAQ, orientation et transfert vers un humain." },
  { metric: "69 %", fact: "utilisent un logiciel de facturation", gap: "Les outils sont présents, mais pas toujours reliés au suivi client ou au pilotage.", offer: "Réservation, paiement & outils", angle: "Fluidifier le parcours sans remplacer l’expert-comptable ni donner de conseil juridique." },
  { metric: "70 %", fact: "ont un projet numérique dans les deux ans", gap: "Un projet ne veut pas dire cahier des charges clair, budget validé ou priorité immédiate.", offer: "Tableau de bord & automatisation", angle: "Vendre d’abord un diagnostic court qui transforme l’idée en plan mesurable." },
  { metric: "3,2 Md", fact: "de transactions e-commerce en 2025", gap: "Le volume augmente de 10 %, tandis que le panier moyen baisse de 3 %.", offer: "Contenus produits e-commerce", angle: "Travailler confiance, clarté et valeur de commande, pas seulement l’esthétique." },
];

const objections = [
  { type: "Appel", ask: "Je ne suis pas intéressé.", answer: "Je comprends. Pour ne pas vous relancer inutilement : c’est parce que le sujet n’est pas prioritaire, ou parce que vous avez déjà une solution qui fonctionne ?", next: "Identifier la vraie raison, puis proposer un diagnostic de 15 minutes seulement si un écart existe." },
  { type: "Appel", ask: "Je n’ai pas le temps.", answer: "Je vais être bref. Donnez-moi 20 secondes : si ce n’est pas pertinent, on raccroche. Aujourd’hui, comment obtenez-vous vos nouveaux clients ?", next: "Tenir réellement les 20 secondes et poser une seule question." },
  { type: "Appel", ask: "Rappelez plus tard.", answer: "Bien sûr. Pour éviter de vous rappeler au mauvais moment : mardi à 11 h ou jeudi à 16 h vous convient mieux ?", next: "Obtenir un créneau exact et confirmer le motif du rappel." },
  { type: "Appel", ask: "Envoyez-moi des informations.", answer: "Je peux vous résumer l’idée, mais je préfère ne pas vous envoyer quelque chose de générique. Quel est votre objectif principal en ce moment : plus de demandes, plus de rendez-vous ou mieux convertir l’existant ?", next: "Qualifier 60 secondes, puis convenir d’un rappel court." },
  { type: "Appel", ask: "On a déjà une agence.", answer: "Très bien, je ne cherche pas à remplacer ce qui fonctionne. Sur quoi êtes-vous le plus satisfait, et quelle partie reste encore perfectible ?", next: "Chercher un angle complémentaire, pas attaquer le prestataire en place." },
  { type: "Appel", ask: "On fonctionne au bouche-à-oreille.", answer: "C’est généralement un bon signe. La question est surtout : est-ce que ce flux est assez régulier pour atteindre vos objectifs tous les mois ?", next: "Mesurer l’écart entre capacité disponible et demandes actuelles." },
  { type: "Terrain", ask: "Le responsable n’est pas là.", answer: "Pas de souci. Quel est le meilleur moment pour le croiser cinq minutes ? Et comment puis-je noter son prénom pour demander directement la bonne personne ?", next: "Revenir à l’heure indiquée avec l’audit imprimé." },
  { type: "Terrain", ask: "Laissez une brochure.", answer: "Avec plaisir. Pour que je laisse seulement ce qui est utile : aujourd’hui, votre priorité est plutôt la visibilité, les rendez-vous ou la fidélisation ?", next: "Annoter la fiche avec un constat personnalisé et fixer le passage suivant." },
  { type: "Vente", ask: "C’est trop cher.", answer: "Par rapport à quoi : votre budget prévu, une autre proposition ou la valeur que vous pensez pouvoir récupérer ?", next: "Revenir aux chiffres de l’analyse. Réduire ce qui est inclus, jamais promettre l’impossible." },
  { type: "Vente", ask: "Je dois réfléchir.", answer: "Évidemment. Pour que votre réflexion soit utile : quel point précis vous empêche de décider aujourd’hui ?", next: "Identifier s’il s’agit du prix, de la confiance, du moment ou de la personne qui décide, puis traiter ce point." },
  { type: "Vente", ask: "Je dois en parler à mon associé.", answer: "C’est normal. Qu’est-ce que votre associé voudra vérifier avant de valider ? On peut prévoir un échange à trois pour répondre une seule fois aux mêmes questions.", next: "Ne pas transformer le prospect en messager. Fixer le rendez-vous à trois." },
  { type: "Vente", ask: "On n’a pas le budget.", answer: "Je préfère le savoir. Est-ce une absence totale de budget ou un problème de trésorerie maintenant ? Si le retour potentiel est clair, on peut définir un premier test plus petit.", next: "Proposer un premier projet cohérent ou sortir proprement. Ne pas vendre à perte." },
  { type: "Vente", ask: "Pouvez-vous garantir les résultats ?", answer: "Je peux garantir le travail, la méthode, le suivi et les éléments livrés. Le résultat dépend aussi de votre offre, de la vitesse de traitement et du marché. On fixe ensemble les chiffres que nous pouvons contrôler.", next: "Refuser les garanties inventées et préciser les responsabilités des deux côtés." },
  { type: "Vente", ask: "Un concurrent propose moins cher.", answer: "C’est possible. Comparons ce qui est inclus : volume produit, suivi, mesure, délais et accompagnement. Si tout est identique, choisissez l’offre la plus logique pour vous.", next: "Rendre la différence visible sans dénigrer le concurrent." },
  { type: "Vente", ask: "Ce n’est pas le bon moment.", answer: "Qu’est-ce qui doit changer pour que le moment devienne bon : la saison, l’équipe, le budget ou une autre priorité ?", next: "Transformer le flou en condition et en date de suivi précise." },
  { type: "Vente", ask: "Faites une proposition et on verra.", answer: "Je peux la préparer après avoir validé trois éléments : l’objectif chiffré, le fonctionnement actuel et qui participe à la décision. Sinon elle serait trop générale.", next: "Terminer l’analyse et programmer la présentation de la proposition." },
  { type: "Vente", ask: "Vous n’avez pas assez de références.", answer: "Vous avez raison de vérifier. Je ne vais pas inventer d’expérience : je peux vous montrer précisément la méthode, le cas test réalisé et commencer par une mission limitée avec des critères de réussite écrits.", next: "Remplacer la réputation manquante par de la transparence, une démonstration et un risque limité." },
  { type: "Vente", ask: "Vous êtes seul ?", answer: "Oui, je reste votre interlocuteur direct. Pour les compétences complémentaires, je travaille uniquement avec des spécialistes identifiés et je reste responsable du résultat livré.", next: "Expliquer qui fait quoi. Ne jamais faire croire à une grande équipe inexistante." },
  { type: "Vente", ask: "Faites-le gratuitement pour prouver.", answer: "Je peux offrir un diagnostic ou une démonstration limitée. En revanche, une production exploitable demande du temps et engage ma responsabilité : elle est donc facturée, même sous forme de petit pilote.", next: "Offrir de la réflexion, pas des semaines de production gratuite." },
  { type: "Vente", ask: "On paie uniquement au résultat.", answer: "Une partie variable peut parfois compléter un prix fixe si le suivi des ventes est fiable. Mais je ne contrôle pas votre offre, vos stocks, vos équipes ni votre vitesse de rappel : le travail de production reste donc rémunéré.", next: "N’accepter du variable que si la mesure, l’attribution et les responsabilités sont écrites." },
  { type: "Vente", ask: "Pourquoi vous plutôt qu’un autre ?", answer: "Je ne suis peut-être pas le meilleur choix pour tout le monde. Ma différence ici est [spécialisation], [méthode] et [niveau de suivi]. Comparons surtout les éléments inclus et la manière dont le résultat sera mesuré.", next: "Répondre avec trois différences vérifiables, pas avec des adjectifs vagues." },
  { type: "Vente", ask: "Je ne veux pas de contrat long.", answer: "Je comprends. On peut commencer par une période pilote avec une date de fin, des livrables précis et une décision de poursuite prévue à l’avance.", next: "Réduire l’engagement initial sans rendre la mission impossible à mesurer." },
  { type: "Vente", ask: "Notre secteur est particulier.", answer: "C’est justement ce que le diagnostic doit vérifier. Je maîtrise la méthode, mais je dois comprendre votre cycle de vente, vos contraintes et la valeur d’un client avant de recommander quoi que ce soit.", next: "Demander trois spécificités du secteur et montrer comment la méthode sera adaptée." },
  { type: "Vente", ask: "On veut tout valider avant publication.", answer: "C’est possible si le circuit reste simple. Je propose un seul responsable, un délai de retour et un nombre de corrections inclus. Sans cela, le calendrier et le budget deviennent imprévisibles.", next: "Écrire la procédure de validation dans la proposition et le contrat." },
];

const scriptCards = [
  {
    title: "Ouverture d’appel à froid — permission",
    badge: "20 secondes",
    text: "Bonjour [Prénom], c’est [Ton prénom]. Je vous appelle directement : j’ai regardé comment [Entreprise] génère ses demandes locales et j’ai repéré un point qui pourrait vous faire perdre des rendez-vous. Je vous prends 20 secondes, puis vous me dites si ça vaut un échange ?",
  },
  {
    title: "Question de qualification",
    badge: "Diagnostic",
    text: "Aujourd’hui, vos nouveaux clients arrivent surtout par quel canal ? Et quand une demande arrive, qui la rappelle, dans quel délai, et combien deviennent réellement des rendez-vous ?",
  },
  {
    title: "Proposition de rendez-vous",
    badge: "Deux choix",
    text: "Je pense qu’il y a matière à améliorer [problème reformulé]. Le plus simple serait un diagnostic de 20 minutes : je vous montre les trois points, vous gardez les idées même si on ne travaille pas ensemble. Mardi à 11 h ou jeudi à 16 h ?",
  },
  {
    title: "Message vocal",
    badge: "12 secondes",
    text: "Bonjour [Prénom], [Ton prénom] à l’appareil. J’ai une observation précise sur votre acquisition locale, rien d’urgent. Je vous rappelle demain vers [heure]. Bonne journée.",
  },
  {
    title: "Entrée en commerce",
    badge: "Terrain",
    text: "Bonjour, je ne viens pas acheter et je vous rassure, je serai bref. J’aide des entreprises locales à obtenir plus de [résultat]. J’ai regardé votre présence avant de passer et noté deux opportunités. Le responsable est disponible cinq minutes ?",
  },
  {
    title: "Appel à un contact connu",
    badge: "Contexte commun",
    text: "Salut [Prénom], [Lien commun] m’a parlé de votre activité. J’aide les [type d’entreprise] à [résultat]. Je ne sais pas encore si c’est pertinent pour vous : comment vous trouvez vos nouveaux clients aujourd’hui ?",
  },
];

const trainingWeeks = [
  ["S1", "Fondations", "Choisir un service, une cible et un résultat. Comprendre le parcours du prospect jusqu’à la vente."],
  ["S2", "Outil", "Suivre la ressource officielle du canal et reproduire deux exercices guidés."],
  ["S3", "Projet test", "Créer une campagne, un lot de vidéos, une fiche locale ou un pipeline sur un cas fictif réaliste."],
  ["S4", "Mesure", "Construire un tableau de bord et expliquer chaque chiffre important en langage simple."],
  ["S5", "Preuve", "Réaliser un audit réel et proposer un pilote à un contact de confiance ou une association."],
  ["S6", "Vente", "Répéter 20 ouvertures, 10 diagnostics et toutes les objections à voix haute."],
];

const scoreRows = [
  ["Problème visible", "0–5", "La perte est-elle concrète et démontrable ?"],
  ["Valeur d’un client", "0–5", "Une vente peut-elle financer l’acquisition ?"],
  ["Capacité à servir", "0–5", "L’entreprise peut-elle absorber plus de demandes ?"],
  ["Accès décideur", "0–5", "Peut-on joindre directement le responsable ?"],
  ["Preuve rapide", "0–5", "Peut-on montrer un premier signal sous 30 jours ?"],
];

const glossary = [
  { term: "SMMA", category: "Modèle", meaning: "Une agence qui aide des entreprises à trouver, convertir ou fidéliser des clients grâce au marketing et aux outils numériques.", example: "Créer un site, améliorer Google Maps ou automatiser les relances peut faire partie d’une offre SMMA." },
  { term: "Agence", category: "Modèle", meaning: "Une activité qui vend un service à d’autres entreprises. Tu peux commencer seul : une agence n’a pas besoin d’avoir des salariés.", example: "Tu vends et réalises toi-même les premiers projets, puis tu délègues plus tard si nécessaire." },
  { term: "B2B", category: "Modèle", meaning: "Business to business : une entreprise vend à une autre entreprise, et non directement à un particulier.", example: "Vendre un site internet à un restaurant est une vente B2B." },
  { term: "Cible", category: "Modèle", meaning: "Le type précis d’entreprise que tu veux aider.", example: "Garages indépendants à Casablanca ou restaurants à Lyon." },
  { term: "Niche", category: "Modèle", meaning: "Un groupe de clients plus précis qu’un marché général.", example: "Les dentistes est une niche à l’intérieur du marché de la santé." },
  { term: "Offre", category: "Modèle", meaning: "Ce que tu promets de réaliser, pour qui, dans quel délai, à quel prix et avec quelles limites.", example: "Site vitrine de 5 pages livré en 21 jours pour 700 €." },
  { term: "Livrable", category: "Livraison", meaning: "Un élément concret que le client reçoit à la fin ou pendant la mission.", example: "Une maquette, un site publié, une plaque NFC ou un tableau de suivi." },
  { term: "Audit", category: "Vente", meaning: "Une analyse de la situation actuelle pour repérer les problèmes et les améliorations possibles.", example: "Vérifier la vitesse, le texte et les appels à l’action d’un site." },
  { term: "Prospect", category: "Vente", meaning: "Une entreprise ou une personne qui pourrait devenir cliente mais qui ne l’est pas encore.", example: "Un restaurant sans site que tu as ajouté à ta liste d’appels." },
  { term: "Lead / demande", category: "Vente", meaning: "Une personne qui a montré un intérêt et laissé un moyen de la recontacter.", example: "Quelqu’un remplit le formulaire du site pour demander un devis." },
  { term: "Prospection", category: "Vente", meaning: "Toutes les actions utilisées pour trouver et contacter de futurs clients.", example: "Appels, visites physiques, recommandations et partenariats." },
  { term: "Cold call / appel à froid", category: "Vente", meaning: "Appeler une entreprise qui ne te connaît pas encore.", example: "Tu appelles un garage après avoir repéré que son site ne fonctionne pas sur mobile." },
  { term: "Warm call / appel tiède", category: "Vente", meaning: "Appeler une personne avec laquelle il existe déjà un lien ou une recommandation.", example: "Un imprimeur te présente au propriétaire d’un restaurant." },
  { term: "Décideur", category: "Vente", meaning: "La personne qui peut accepter la proposition et engager le budget.", example: "Le gérant, le directeur ou parfois un associé." },
  { term: "Qualification", category: "Vente", meaning: "Vérifier si le prospect a réellement un problème, un besoin, un budget et le pouvoir de décider.", example: "Poser quelques questions avant de proposer un rendez-vous complet." },
  { term: "Closing / conclusion de vente", category: "Vente", meaning: "La partie de l’échange où le prospect décide d’accepter, de refuser ou de reporter la proposition.", example: "Tu présentes la solution, le prix, les prochaines étapes puis tu laisses le client répondre." },
  { term: "Objection", category: "Vente", meaning: "Une inquiétude ou un obstacle exprimé avant la décision.", example: "« C’est trop cher », « je dois réfléchir » ou « ce n’est pas le moment »." },
  { term: "Pilote", category: "Vente", meaning: "Une première mission limitée qui sert à tester la collaboration et obtenir une preuve réelle.", example: "Automatiser un seul processus avant de refaire tout le système de l’entreprise." },
  { term: "Acquisition", category: "Résultats", meaning: "La manière dont une entreprise attire de nouveaux prospects et clients.", example: "Google Maps, les appels, le bouche-à-oreille ou un site internet." },
  { term: "Conversion", category: "Résultats", meaning: "Le passage d’une étape à la suivante dans le parcours commercial.", example: "Un visiteur devient une demande, puis la demande devient un rendez-vous." },
  { term: "Taux de conversion", category: "Résultats", meaning: "Le pourcentage de personnes qui réalisent l’action attendue.", example: "5 demandes sur 100 visiteurs représentent un taux de conversion de 5 %." },
  { term: "Indicateur / KPI", category: "Résultats", meaning: "Un chiffre important utilisé pour savoir si le travail avance dans la bonne direction.", example: "Nombre d’appels, rendez-vous obtenus, ventes ou temps économisé." },
  { term: "Suivi / tracking", category: "Résultats", meaning: "L’enregistrement des actions et des résultats pour comprendre ce qui fonctionne.", example: "Compter combien de formulaires ont généré un rendez-vous." },
  { term: "Point de départ / baseline", category: "Résultats", meaning: "Les chiffres mesurés avant de commencer la mission, afin de pouvoir comparer ensuite.", example: "Le site reçoit 3 demandes par mois avant les améliorations." },
  { term: "Bilan / reporting", category: "Livraison", meaning: "Un résumé régulier du travail réalisé, des résultats et des prochaines actions.", example: "Chaque mois, montrer les demandes reçues, les ventes et ce qui sera testé ensuite." },
  { term: "Démarrage client / onboarding", category: "Livraison", meaning: "La première étape après la signature : récupérer les accès, confirmer les objectifs, les délais et les responsabilités.", example: "Réunion de lancement, accès au site et calendrier de validation." },
  { term: "Fidélisation / rétention", category: "Livraison", meaning: "Faire en sorte qu’un client satisfait continue à travailler avec toi.", example: "Un bon suivi mensuel peut transformer un projet unique en accompagnement régulier." },
  { term: "CRM", category: "Outils", meaning: "Un outil qui regroupe les prospects, les clients, les échanges et les prochaines relances.", example: "HubSpot ou Pipedrive permettent de savoir qui rappeler et quand." },
  { term: "Pipeline commercial", category: "Outils", meaning: "Les étapes traversées par un prospect, du premier contact jusqu’à la vente.", example: "À appeler → joint → rendez-vous → proposition → client." },
  { term: "Workflow / scénario", category: "Outils", meaning: "Une suite d’actions organisées, souvent automatisées.", example: "Quand un formulaire est rempli, créer le contact puis prévenir le commercial." },
  { term: "API", category: "Outils", meaning: "Une porte technique qui permet à deux logiciels d’échanger des informations.", example: "Envoyer automatiquement un nouveau contact du site vers le CRM." },
  { term: "Webhook", category: "Outils", meaning: "Un message automatique envoyé par un outil dès qu’un événement se produit.", example: "Le formulaire prévient Make immédiatement après une nouvelle demande." },
  { term: "Scraper / extraction", category: "Outils", meaning: "Un outil qui récupère automatiquement des informations visibles pour construire une liste. Il faut respecter les règles des sites et la loi.", example: "Extraire le nom, le téléphone professionnel et le site de restaurants visibles sur une source autorisée." },
  { term: "Responsive", category: "Web", meaning: "Un site qui adapte proprement son affichage au téléphone, à la tablette et à l’ordinateur.", example: "Les textes et boutons restent lisibles sur un petit écran." },
  { term: "SEO / référencement naturel", category: "Web", meaning: "Les améliorations qui aident une page à apparaître dans les résultats gratuits des moteurs de recherche.", example: "Créer une page claire pour « plombier à Rabat »." },
  { term: "Landing page / page de vente", category: "Web", meaning: "Une page conçue autour d’une seule offre et d’une seule action principale.", example: "Présenter une prestation puis inviter à réserver un appel." },
  { term: "Tunnel de vente", category: "Web", meaning: "La suite des étapes qui amène une personne de la découverte jusqu’à l’achat.", example: "Page de vente → formulaire → rendez-vous → proposition." },
  { term: "Copywriting", category: "Web", meaning: "Écrire des textes qui rendent une offre claire et donnent envie d’agir, sans mentir.", example: "Un titre centré sur le problème du client et un bouton de prise de rendez-vous." },
  { term: "Budget média", category: "Publicité", meaning: "L’argent versé directement à la plateforme publicitaire, séparé de tes honoraires.", example: "Le client paie 500 € à Google et 300 € pour ta gestion." },
  { term: "Charte graphique", category: "Branding", meaning: "Le document qui explique comment utiliser le logo, les couleurs, les polices et les éléments visuels.", example: "Elle garantit que les flyers, le site et les réseaux gardent le même style." },
  { term: "Périmètre / scope", category: "Livraison", meaning: "La limite exacte de ce qui est inclus dans la mission.", example: "Cinq pages, deux séries de corrections et une mise en ligne sont incluses ; les photos ne le sont pas." },
  { term: "Acompte", category: "Finance", meaning: "Une partie du prix payée avant le début du travail et déduite de la facture finale.", example: "Le client verse 40 % à la signature puis le solde avant la mise en ligne." },
  { term: "Marge", category: "Finance", meaning: "Ce qu’il reste après avoir retiré les coûts directement liés à la mission.", example: "Sur 800 € facturés, 200 € de sous-traitance et 50 € d’outils laissent 550 € avant les autres charges." },
  { term: "Trésorerie", category: "Finance", meaning: "L’argent réellement disponible sur le compte de l’entreprise à un moment donné.", example: "Une facture signée mais non payée n’est pas encore de la trésorerie." },
  { term: "Sous-traitance", category: "Agence", meaning: "Confier une partie précise de la production à un autre professionnel tout en restant responsable vis-à-vis du client.", example: "Un monteur réalise les vidéos selon ton brief et tu vérifies avant livraison." },
  { term: "SOP / procédure", category: "Agence", meaning: "Un document qui décrit comment réaliser une tâche toujours de la même manière.", example: "La procédure de démarrage indique qui crée le dossier, récupère les accès et confirme le calendrier." },
  { term: "Attribution", category: "Résultats", meaning: "La méthode utilisée pour relier une demande ou une vente au canal qui l’a générée.", example: "Le formulaire indique que le prospect vient de Google Maps." },
  { term: "CAC", category: "Résultats", meaning: "Coût d’acquisition client : montant dépensé en moyenne pour obtenir un nouveau client.", example: "1 000 € dépensés pour 5 nouveaux clients donnent un CAC de 200 €." },
  { term: "LTV / valeur client", category: "Résultats", meaning: "Montant total qu’un client rapporte en moyenne pendant toute la relation.", example: "Un client à 300 € par mois qui reste 8 mois représente 2 400 € de chiffre d’affaires." },
  { term: "CPL / coût par demande", category: "Publicité", meaning: "Budget dépensé en moyenne pour obtenir une demande de contact.", example: "300 € de publicité pour 10 formulaires donnent un coût par demande de 30 €." },
  { term: "CPC / coût par clic", category: "Publicité", meaning: "Prix moyen payé chaque fois qu’une personne clique sur une publicité.", example: "100 € dépensés pour 200 clics donnent un CPC de 0,50 €." },
  { term: "CTR / taux de clic", category: "Publicité", meaning: "Pourcentage des personnes exposées qui cliquent sur l’annonce ou le lien.", example: "50 clics pour 5 000 affichages représentent un CTR de 1 %." },
  { term: "ROAS", category: "Publicité", meaning: "Chiffre d’affaires attribué à la publicité divisé par le budget publicitaire.", example: "2 000 € de ventes attribuées pour 500 € de publicité donnent un ROAS de 4." },
  { term: "Pixel de suivi", category: "Outils", meaning: "Petit code placé sur un site pour mesurer certaines actions, sous réserve des règles de consentement applicables.", example: "Mesurer l’envoi d’un formulaire après une campagne." },
  { term: "NFC", category: "Outils", meaning: "Technologie sans contact qui ouvre un lien lorsqu’un téléphone compatible est approché d’une plaque ou d’une carte.", example: "Une plaque posée à la caisse ouvre directement la page d’avis Google." },
  { term: "QR code", category: "Outils", meaning: "Carré à scanner avec l’appareil photo d’un téléphone pour ouvrir une page ou une action.", example: "Le QR code de secours ouvre le même lien que la puce NFC." },
  { term: "GA4 / Google Analytics 4", category: "Mesure", meaning: "Outil de Google qui aide à comprendre les visites et les actions réalisées sur un site, avec un paramétrage respectueux du consentement.", example: "Mesurer combien de visiteurs atteignent la page de réservation." },
  { term: "Google Tag Manager", category: "Mesure", meaning: "Outil qui centralise l’installation de balises de mesure sans modifier le code du site à chaque changement.", example: "Ajouter une mesure de formulaire après validation technique et juridique." },
  { term: "UGC", category: "Contenu", meaning: "Contenu créé dans un style naturel par un client, un créateur ou un utilisateur pour présenter un produit.", example: "Une courte vidéo montrant l’ouverture et l’utilisation d’un produit." },
  { term: "Chatbot / assistant conversationnel", category: "IA", meaning: "Interface qui répond à des questions à partir de règles ou de documents définis.", example: "Un assistant répond aux questions fréquentes puis transmet les demandes complexes à une personne." },
  { term: "Prompt / consigne IA", category: "IA", meaning: "Instruction donnée à un modèle d’intelligence artificielle avec le contexte, le résultat attendu et les limites.", example: "Résume ces avis clients sans inventer de faits et classe les problèmes par fréquence." },
];

const professionalSteps = [
  { number: "01", title: "Exister légalement", text: "Choisir un statut adapté, obtenir les identifiants nécessaires et séparer les dépenses personnelles de celles de l’activité.", proof: "Statut actif · compte dédié si nécessaire · assurance étudiée" },
  { number: "02", title: "Cadrer avant de vendre", text: "Écrire ce qui est inclus, exclu, livré, mesuré et validé. Une phrase floue aujourd’hui devient un conflit demain.", proof: "Périmètre · calendrier · responsabilités · limites" },
  { number: "03", title: "Faire signer", text: "Utiliser une proposition et un contrat cohérents. La signature doit arriver avant la production, avec les conditions de paiement.", proof: "Proposition acceptée · contrat · acompte" },
  { number: "04", title: "Facturer proprement", text: "Numéroter les factures, conserver les pièces et inclure les mentions applicables à ton statut et à la transaction.", proof: "Facture complète · échéance · pénalités · archivage" },
  { number: "05", title: "Protéger les données", text: "Collecter seulement les données utiles, limiter les accès, expliquer l’usage et respecter toute opposition à la prospection.", proof: "Source · finalité · durée · suppression · liste d’opposition" },
  { number: "06", title: "Éviter les fausses promesses", text: "Garantir la méthode, la qualité et les livrables contrôlables. Ne jamais garantir un chiffre d’affaires que tu ne contrôles pas.", proof: "Hypothèses écrites · responsabilités partagées · aucun résultat inventé" },
];

const proposalBlocks = [
  ["01", "Contexte", "Reprendre la situation avec les mots du client et les faits observés."],
  ["02", "Objectif", "Définir un résultat prioritaire, mesurable et relié à une date."],
  ["03", "Diagnostic", "Montrer les deux ou trois causes principales, sans noyer le client."],
  ["04", "Recommandation", "Expliquer le plan choisi et pourquoi il est plus logique que les alternatives."],
  ["05", "Périmètre", "Lister précisément livrables, quantité, calendrier, corrections et exclusions."],
  ["06", "Mesure", "Fixer le point de départ, les chiffres suivis et la fréquence du bilan."],
  ["07", "Investissement", "Séparer honoraires, outils, achats, budget média et options."],
  ["08", "Décision", "Ajouter validité, date de démarrage, signature, acompte et prochaine réunion."],
];

const operatingProcedures = [
  { title: "Vente → production", trigger: "Contrat signé + acompte reçu", steps: ["Créer le dossier client", "Envoyer le formulaire de démarrage", "Planifier la réunion", "Confirmer le calendrier"] },
  { title: "Demande → rendez-vous", trigger: "Nouveau formulaire ou appel", steps: ["Enregistrer la source", "Répondre rapidement", "Poser les questions de sélection", "Confirmer le rendez-vous"] },
  { title: "Création → validation", trigger: "Premier livrable prêt", steps: ["Contrôle interne", "Présentation avec contexte", "Retour centralisé", "Correction puis validation écrite"] },
  { title: "Incident → résolution", trigger: "Erreur, retard ou résultat anormal", steps: ["Documenter le fait", "Prévenir sans cacher", "Proposer un plan", "Confirmer la résolution"] },
  { title: "Mois → bilan", trigger: "Date de revue mensuelle", steps: ["Rassembler les chiffres", "Expliquer les écarts", "Décider le prochain test", "Envoyer le résumé"] },
  { title: "Fin → recommandation", trigger: "Mission terminée ou résultat obtenu", steps: ["Documenter avant/après", "Demander un témoignage", "Proposer la suite utile", "Demander une introduction"] },
];

const aiWorkflows = [
  { title: "Recherche prospect", tool: "ChatGPT, Claude ou Perplexity", use: "Résumer l’entreprise, le marché, les avis et préparer cinq questions.", guardrail: "Toujours vérifier les faits sur les sources originales." },
  { title: "Audit", tool: "Claude, ChatGPT ou Gemini", use: "Transformer des captures, pages et chiffres en observations structurées.", guardrail: "L’IA propose des hypothèses : toi seul valides le diagnostic." },
  { title: "Scripts", tool: "ChatGPT ou Claude", use: "Créer plusieurs ouvertures puis les adapter au langage naturel du vendeur.", guardrail: "Lire à voix haute et supprimer toute phrase robotique." },
  { title: "Proposition", tool: "Claude, ChatGPT + modèle maison", use: "Organiser les notes du rendez-vous dans une proposition cohérente.", guardrail: "Ne jamais laisser l’IA inventer prix, références ou résultats." },
  { title: "Production web", tool: "Codex, Claude Code, v0 ou 21st.dev", use: "Créer, corriger et tester plus vite une interface à partir d’une maquette.", guardrail: "Contrôler mobile, accessibilité, vitesse et sécurité avant livraison." },
  { title: "Création visuelle", tool: "GPT Image 2, Recraft, Ideogram ou Firefly", use: "Explorer des directions, produire des éléments et préparer des variantes.", guardrail: "Vérifier droits, cohérence de marque, textes et détails visuels." },
  { title: "Automatisation", tool: "Make, n8n ou Zapier + assistant IA", use: "Construire le scénario, documenter les champs et prévoir les erreurs.", guardrail: "Tester avec de fausses données avant de connecter le compte client." },
  { title: "Contrôle qualité", tool: "Deux modèles différents + contrôle humain", use: "Faire relire une proposition, un script ou une procédure avec une grille fixe.", guardrail: "Le second modèle détecte des risques, il ne remplace pas la validation." },
];

const templateLibrary = [
  { category: "Prospection", title: "Fiche prospect", body: "Entreprise :\nDécideur :\nProblème visible :\nPreuve observée :\nValeur probable d’un client :\nCanal actuel :\nAngle d’appel :\nProchaine action :" },
  { category: "Prospection", title: "Préparation d’appel", body: "Objectif de l’appel : obtenir un rendez-vous de 20 minutes.\nObservation personnalisée :\nQuestion 1 : comment obtenez-vous vos clients aujourd’hui ?\nQuestion 2 : où perdez-vous le plus de demandes ?\nDeux créneaux à proposer :" },
  { category: "Vente", title: "Compte rendu de diagnostic", body: "Situation actuelle :\nObjectif prioritaire :\nBlocage principal :\nImpact estimé :\nDécideurs :\nBudget ou contrainte :\nSolution recommandée :\nProchaine décision et date :" },
  { category: "Vente", title: "Relance après rendez-vous", body: "Bonjour [Prénom], merci pour l’échange. Je retiens trois points : [objectif], [blocage], [urgence]. La prochaine étape convenue est [action] le [date]. Dites-moi si un élément doit être corrigé avant que je prépare la suite." },
  { category: "Vente", title: "Structure de proposition", body: "1. Contexte\n2. Objectif\n3. Diagnostic\n4. Recommandation\n5. Livrables et exclusions\n6. Calendrier\n7. Mesure\n8. Prix et conditions\n9. Signature et démarrage" },
  { category: "Client", title: "Formulaire de démarrage", body: "Objectif à 90 jours :\nOffre prioritaire :\nClient idéal :\nAccès nécessaires :\nResponsable de validation :\nDélai de retour :\nContraintes légales ou de marque :\nRésultat à ne surtout pas promettre :" },
  { category: "Client", title: "Résumé hebdomadaire", body: "Fait cette semaine :\nChiffre important :\nCe que nous avons appris :\nBlocage éventuel :\nAction suivante :\nDécision attendue du client :" },
  { category: "Client", title: "Bilan mensuel", body: "Objectif du mois :\nPoint de départ :\nRésultat :\nÉcart :\nExplication :\nTests réalisés :\nDécision pour le mois suivant :\nResponsable et date :" },
  { category: "Qualité", title: "Compte rendu d’incident", body: "Fait observé :\nDate et impact :\nCause confirmée ou hypothèse :\nAction immédiate :\nCorrection durable :\nPersonne informée :\nDate de vérification :" },
  { category: "Agence", title: "Procédure interne", body: "Nom de la procédure :\nDéclencheur :\nResponsable :\nOutils :\nÉtapes numérotées :\nContrôle final :\nQue faire en cas d’erreur :\nDernière mise à jour :" },
  { category: "Agence", title: "Brief sous-traitant", body: "Contexte client :\nRésultat attendu :\nLivrables :\nExemples de qualité :\nÉléments interdits :\nDélai :\nFormat de remise :\nContrôle avant validation :" },
  { category: "Agence", title: "Demande de témoignage", body: "Bonjour [Prénom], nous avons terminé [mission]. Pour aider de futurs clients à comprendre le travail, accepteriez-vous de répondre à trois questions : quelle était la situation avant, qu’avons-nous changé, et quel résultat ou progrès avez-vous observé ?" },
];

const qualityGates = [
  ["Avant l’appel", "Entreprise vérifiée, décideur probable, problème visible, angle pertinent."],
  ["Avant le rendez-vous", "Agenda envoyé, participants confirmés, questions préparées, durée claire."],
  ["Avant la proposition", "Objectif, budget, décideur, calendrier et problème réellement compris."],
  ["Avant la signature", "Livrables, exclusions, corrections, paiement et responsabilités écrits."],
  ["Avant la production", "Acompte reçu, accès disponibles, personne de validation nommée."],
  ["Avant chaque livraison", "Mobile, liens, orthographe, données, sécurité et cohérence vérifiés."],
  ["Avant le bilan", "Chiffres comparés au point de départ et reliés à une décision."],
  ["Avant de déléguer", "Brief complet, exemple attendu, délai et contrôle final définis."],
  ["Avant un témoignage", "Résultat réel documenté et autorisation du client obtenue."],
  ["Avant une hausse de prix", "Preuves, demande, qualité et capacité de livraison suffisantes."],
  ["Avant de promettre", "Résultat contrôlable, hypothèses écrites et limites expliquées."],
  ["Avant de scaler", "Acquisition répétable, marge positive, trésorerie et procédures stables."],
];

function CopyButton({ text, label = "Copier" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return <button className="copy-button" onClick={copy} type="button">{copied ? "Copié ✓" : label}</button>;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function BrandLogo() {
  return (
    <span className="brand-lockup bs-brand-lockup">
      <span className="bs-monogram">BS</span>
      <span className="bs-wordmark">BS <b>IA</b><small>BUSINESS SYSTEMS</small></span>
    </span>
  );
}

export default function Home() {
  const [activeService, setActiveService] = useState("website");
  const [objectionFilter, setObjectionFilter] = useState("Tous");
  const [checked, setChecked] = useState<number[]>([]);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [glossaryQuery, setGlossaryQuery] = useState("");
  const [activeChapter, setActiveChapter] = useState("top");
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [plan, setPlan] = useState({ service: "", cible: "", promesse: "", prix: "", volume: "", date: "" });
  const [economics, setEconomics] = useState({ revenue: 3000, monthlyPrice: 600, closeRate: 25, showRate: 70, bookingRate: 20 });
  const backupInput = useRef<HTMLInputElement>(null);
  const readingProgress = useRef<HTMLElement | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = window.localStorage.getItem("focus-smma-progress");
        const savedPlan = window.localStorage.getItem("focus-smma-plan");
        const savedAt = window.localStorage.getItem("focus-smma-last-saved");
        if (saved) {
          const parsed = JSON.parse(saved);
          const previousChecked = Array.isArray(parsed) ? parsed : parsed.checked ?? [];
          const migratedChecked = !Array.isArray(parsed) && parsed.version >= 3 ? previousChecked : previousChecked.map((index: number) => index >= 11 ? index + 1 : index);
          setChecked(migratedChecked);
          window.localStorage.setItem("focus-smma-progress", JSON.stringify({ version: 3, checked: migratedChecked }));
        }
        if (savedPlan) setPlan(JSON.parse(savedPlan));
        if (savedAt) setLastSaved(savedAt);
      } catch {
        window.localStorage.removeItem("focus-smma-progress");
        window.localStorage.removeItem("focus-smma-plan");
        window.localStorage.removeItem("focus-smma-last-saved");
      }
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const chapterTargets = quickChapters
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const footer = document.querySelector<HTMLElement>(".footer");
    let scrollFrame = 0;
    let pointerFrame = 0;
    let lastPointer: PointerEvent | null = null;
    let activeMagnet: HTMLElement | null = null;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    root.classList.add("motion-ready");
    revealTargets.forEach((section, index) => {
      section.classList.add("reveal-ready");
      if (index === 0 || reduceMotion) section.classList.add("in-view");
    });

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.06, rootMargin: "0px 0px -9%" },
    );
    if (!reduceMotion) revealTargets.slice(1).forEach((section) => revealObserver.observe(section));

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveChapter(visible.target.id);
      },
      { threshold: [0.08, 0.2, 0.45], rootMargin: "-18% 0px -62%" },
    );
    chapterTargets.forEach((section) => chapterObserver.observe(section));

    const footerObserver = new IntersectionObserver(
      ([entry]) => setFooterVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.08 },
    );
    if (footer) footerObserver.observe(footer);

    const updateScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        const value = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
        readingProgress.current?.style.setProperty("--reading-progress", `${value}`);
      });
    };

    const updatePointer = (event: PointerEvent) => {
      lastPointer = event;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        const point = lastPointer;
        if (!point) return;
        root.style.setProperty("--cursor-x", `${point.clientX}px`);
        root.style.setProperty("--cursor-y", `${point.clientY}px`);
        const card = (point.target as Element | null)?.closest<HTMLElement>(
          ".module-card, .service-panel, .progress-dashboard, .market-stat, .professional-grid article, .proposal-grid article, .procedure-grid article, .delegation-grid article, .ai-workflow-grid article, .template-grid article, .quality-grid article, .glossary-card, .finance-calculator",
        );
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--card-x", `${point.clientX - rect.left}px`);
          card.style.setProperty("--card-y", `${point.clientY - rect.top}px`);
          card.style.setProperty("--tilt-x", `${(((point.clientY - rect.top) / rect.height) - .5) * -5}deg`);
          card.style.setProperty("--tilt-y", `${(((point.clientX - rect.left) / rect.width) - .5) * 5}deg`);
        }

        const magnet = (point.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
        if (activeMagnet && activeMagnet !== magnet) {
          activeMagnet.style.setProperty("--magnet-x", "0px");
          activeMagnet.style.setProperty("--magnet-y", "0px");
        }
        activeMagnet = magnet;
        if (magnet) {
          const rect = magnet.getBoundingClientRect();
          magnet.style.setProperty("--magnet-x", `${(point.clientX - rect.left - rect.width / 2) * .14}px`);
          magnet.style.setProperty("--magnet-y", `${(point.clientY - rect.top - rect.height / 2) * .14}px`);
        }
      });
    };

    const createSpark = (event: PointerEvent) => {
      if (reduceMotion || event.pointerType === "touch") return;
      const spark = document.createElement("span");
      spark.className = "click-spark";
      spark.style.left = `${event.clientX}px`;
      spark.style.top = `${event.clientY}px`;
      for (let index = 0; index < 8; index += 1) {
        const ray = document.createElement("i");
        ray.style.setProperty("--ray", `${index * 45}deg`);
        spark.appendChild(ray);
      }
      document.body.appendChild(spark);
      window.setTimeout(() => spark.remove(), 720);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    if (finePointer && !reduceMotion) {
      window.addEventListener("pointermove", updatePointer, { passive: true });
      window.addEventListener("pointerdown", createSpark, { passive: true });
    }

    return () => {
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      revealObserver.disconnect();
      chapterObserver.disconnect();
      footerObserver.disconnect();
      activeMagnet?.style.removeProperty("--magnet-x");
      activeMagnet?.style.removeProperty("--magnet-y");
      root.classList.remove("motion-ready");
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      if (finePointer && !reduceMotion) {
        window.removeEventListener("pointermove", updatePointer);
        window.removeEventListener("pointerdown", createSpark);
      }
    };
  }, []);

  const service = services.find((item) => item.id === activeService) ?? services[0];
  const filteredObjections = useMemo(
    () => objections.filter((item) => objectionFilter === "Tous" || item.type === objectionFilter),
    [objectionFilter],
  );
  const filteredGlossary = useMemo(() => {
    const query = glossaryQuery.trim().toLocaleLowerCase("fr");
    if (!query) return glossary;
    return glossary.filter((item) => `${item.term} ${item.category} ${item.meaning} ${item.example}`.toLocaleLowerCase("fr").includes(query));
  }, [glossaryQuery]);
  const progress = Math.round((checked.length / modules.length) * 100);
  const nextModule = modules.find((_, index) => !checked.includes(index));
  const clientsNeeded = Math.max(1, Math.ceil(economics.revenue / Math.max(1, economics.monthlyPrice)));
  const proposalsNeeded = Math.ceil(clientsNeeded / Math.max(.01, economics.closeRate / 100));
  const appointmentsNeeded = Math.ceil(proposalsNeeded / Math.max(.01, economics.showRate / 100));
  const conversationsNeeded = Math.ceil(appointmentsNeeded / Math.max(.01, economics.bookingRate / 100));

  const markSaved = () => {
    const timestamp = new Date().toISOString();
    setLastSaved(timestamp);
    window.localStorage.setItem("focus-smma-last-saved", timestamp);
  };

  const toggleModule = (index: number) => {
    const next = checked.includes(index) ? checked.filter((item) => item !== index) : [...checked, index];
    setChecked(next);
    window.localStorage.setItem("focus-smma-progress", JSON.stringify({ version: 3, checked: next }));
    markSaved();
  };

  const updatePlan = (key: keyof typeof plan, value: string) => {
    const next = { ...plan, [key]: value };
    setPlan(next);
    window.localStorage.setItem("focus-smma-plan", JSON.stringify(next));
    markSaved();
  };

  const exportBackup = () => {
    const backup = JSON.stringify({ version: 3, exportedAt: new Date().toISOString(), checked, plan }, null, 2);
    const url = URL.createObjectURL(new Blob([backup], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `focus-smma-progression-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const backup = JSON.parse(await file.text());
      const rawChecked = Array.isArray(backup.checked) ? backup.checked.filter((item: unknown) => Number.isInteger(item) && Number(item) >= 0 && Number(item) < modules.length) : [];
      const restoredChecked = backup.version >= 3 ? rawChecked : rawChecked.map((index: number) => index >= 11 ? index + 1 : index);
      const restoredPlan = backup.plan && typeof backup.plan === "object" ? { ...plan, ...backup.plan } : plan;
      setChecked(restoredChecked);
      setPlan(restoredPlan);
      window.localStorage.setItem("focus-smma-progress", JSON.stringify({ version: 3, checked: restoredChecked }));
      window.localStorage.setItem("focus-smma-plan", JSON.stringify(restoredPlan));
      markSaved();
    } catch {
      window.alert("Cette sauvegarde n’est pas valide.");
    }
    event.target.value = "";
  };

  const resetProgress = () => {
    if (!window.confirm(`Réinitialiser les ${modules.length} modules ? Ton plan d’agence sera conservé.`)) return;
    setChecked([]);
    window.localStorage.setItem("focus-smma-progress", JSON.stringify({ version: 3, checked: [] }));
    markSaved();
  };

  const planText = `MON PLAN D'AGENCE — BS IA\n\nService : ${plan.service || "À définir"}\nCible : ${plan.cible || "À définir"}\nPromesse : ${plan.promesse || "À définir"}\nPrix pilote : ${plan.prix || "À définir"}\nVolume hebdomadaire : ${plan.volume || "À définir"}\nDate de lancement : ${plan.date || "À définir"}\n\nRègle : une offre, une cible, 90 jours d'exécution.`;

  return (
    <>
      <a className="skip-link" href="#main-content">Aller directement au contenu</a>
      <main id="main-content" tabIndex={-1}>
      <div className="reading-progress" aria-hidden="true"><i ref={readingProgress} /></div>
      <div className="cursor-glow" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="BS IA, retour en haut"><BrandLogo /></a>
        <nav aria-label="Navigation principale" className={menuOpen ? "nav-links open" : "nav-links"} id="primary-navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#prospection" onClick={() => setMenuOpen(false)}>Prospection</a>
          <a href="#objections" onClick={() => setMenuOpen(false)}>Objections</a>
          <a href="#glossaire" onClick={() => setMenuOpen(false)}>Glossaire</a>
          <a href="#modeles" onClick={() => setMenuOpen(false)}>Modèles</a>
        </nav>
        <div className="header-actions">
          <a className="progress-pill" href="#modules"><span>{progress}%</span><em> complété</em></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-controls="primary-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} type="button">☰</button>
        </div>
      </header>

      <a className="arena-top-banner" href="https://lmarena.ai/leaderboard/text" target="_blank" rel="noreferrer" aria-label="Ouvrir le classement des modèles IA sur LMArena">
        <span className="arena-live"><i /> CLASSEMENT EN DIRECT</span>
        <span className="arena-title"><b>LMARENA</b><em>Compare les modèles IA du moment avant de choisir un outil pour ton agence.</em></span>
        <strong>VOIR LE LEADERBOARD ↗</strong>
      </a>

      <aside className={`quick-nav${quickNavOpen ? " open" : ""}${footerVisible ? " footer-visible" : ""}`} aria-label="Navigation rapide du guide">
        <button data-magnetic type="button" onClick={() => setQuickNavOpen((open) => !open)} aria-controls="quick-navigation" aria-expanded={quickNavOpen} aria-label={quickNavOpen ? "Fermer la navigation des chapitres" : "Ouvrir la navigation des chapitres"}>
          <span>{quickChapters.find((chapter) => chapter.id === activeChapter)?.number ?? "00"}</span>
          <span className="quick-nav-icon" aria-hidden="true"><i /><i /><i /></span>
        </button>
        <nav id="quick-navigation" aria-hidden={!quickNavOpen}>
          <header><small>INDEX RAPIDE</small><b>Va droit à l’essentiel.</b></header>
          {quickChapters.map((chapter) => (
              <a data-magnetic className={activeChapter === chapter.id ? "active" : ""} href={`#${chapter.id}`} key={chapter.id} onClick={() => setQuickNavOpen(false)}>
              <span>{chapter.number}</span><b>{chapter.label}</b><i>↗</i>
            </a>
          ))}
        </nav>
      </aside>

      <section className="guide-cover" id="top">
        <div className="guide-dots" />
        <div className="cover-shell">
          <aside className="cover-spine" aria-label="Informations du guide">
            <span>BS IA</span>
            <strong>SMMA<br/>MASTERBOOK</strong>
            <small>ÉDITION PREMIUM · 2026</small>
          </aside>
          <div className="cover-main">
            <div className="cover-breadcrumb"><span>BS IA</span><i>•</i><span>SMMA MASTERBOOK</span><strong>DÉBUTANT → OPÉRATIONNEL</strong></div>
            <h1><span>Construis une agence.</span><em>Maîtrise le système.</em></h1>
            <p>Le guide SMMA complet pour partir de zéro, choisir un service rentable, obtenir des rendez-vous, vendre proprement et livrer une expérience client professionnelle.</p>
            <div className="cover-actions">
              <a className="gold-button" data-magnetic href="#modules">COMMENCER LE GUIDE <span>→</span></a>
              <a className="text-link" href="#objections">ALLER AUX OBJECTIONS ↓</a>
            </div>
            <div className="cover-meta"><span><b>{modules.length}</b> modules</span><span><b>{services.length}</b> services</span><span><b>{templateLibrary.length}</b> modèles</span><span><b>0</b> prérequis</span></div>
            <div className="signal-ticker" aria-label="Les piliers de la méthode BS IA" role="group">
              <div><span>OFFRE</span><i>✦</i><span>PREUVE</span><i>✦</i><span>CONVERSATION</span><i>✦</i><span>LIVRAISON</span><i>✦</i><span>SYSTÈME</span><i>✦</i><span>MARGE</span><i>✦</i></div>
              <div aria-hidden="true"><span>OFFRE</span><i>✦</i><span>PREUVE</span><i>✦</i><span>CONVERSATION</span><i>✦</i><span>LIVRAISON</span><i>✦</i><span>SYSTÈME</span><i>✦</i><span>MARGE</span><i>✦</i></div>
            </div>
          </div>
          <article className="start-panel">
            <Image className="cover-logo" src="/bs-ia-logo.webp" alt="Logo BS IA" width={1254} height={1254} priority sizes="(max-width: 680px) 100vw, 390px" />
            <header><span>01</span><b>PROTOCOLE DE DÉPART</b><i>DÉBUTANT</i></header>
            <h2>Ta première semaine.</h2>
            <ol>
              <li><span>01</span><p><b>Choisis un seul service</b><small>Celui que tu peux apprendre et montrer.</small></p></li>
              <li><span>02</span><p><b>Choisis une cible précise</b><small>Avec un problème visible et rentable.</small></p></li>
              <li><span>03</span><p><b>Construis une preuve</b><small>Audit, cas test ou pilote encadré.</small></p></li>
              <li><span>04</span><p><b>Lance les conversations</b><small>Contacts connus, appels à froid et terrain.</small></p></li>
            </ol>
            <footer><span>PROGRESSION ACTUELLE</span><b>{progress}%</b><div><i style={{ width: `${progress}%` }} /></div></footer>
          </article>
        </div>
      </section>

      <section className="content-section intro" id="modules">
        <SectionTitle eyebrow="00 — Mode d’emploi" title="Un système complet, pas une collection d’astuces." text="Aucun prérequis : avance dans l’ordre, utilise les modèles, applique les exercices et coche chaque module après l’avoir réellement exécuté. Ta progression reste enregistrée sur cet appareil." />
        <div className="progress-dashboard">
          <div className="progress-ring" style={{ background: `conic-gradient(var(--gold) ${progress * 3.6}deg, #292929 0deg)` }}><div><strong>{progress}%</strong><span>COMPLÉTÉ</span></div></div>
          <div className="progress-summary"><small>SAUVEGARDE AUTOMATIQUE ACTIVE</small><h3>{progress === 100 ? "Playbook terminé." : nextModule ? `Prochaine étape : ${nextModule[1]}` : "Choisis ta prochaine étape."}</h3><p>{lastSaved ? `Dernière sauvegarde : ${new Date(lastSaved).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}` : "Ta progression sera sauvegardée dès que tu valides un module."}</p><div className="progress-track"><div style={{ width: `${progress}%` }} /></div></div>
          <div className="progress-stats"><div><b>{checked.length}</b><span>TERMINÉS</span></div><div><b>{modules.length - checked.length}</b><span>RESTANTS</span></div></div>
          <div className="progress-actions"><button onClick={exportBackup} type="button">TÉLÉCHARGER LA SAUVEGARDE ↓</button><button onClick={() => backupInput.current?.click()} type="button">RESTAURER ↑</button><button className="reset-progress" onClick={resetProgress} type="button">RÉINITIALISER</button><input ref={backupInput} onChange={importBackup} type="file" accept="application/json,.json" aria-label="Importer une sauvegarde JSON" hidden /></div>
        </div>
        <div className="module-grid">
          {modules.map((item, index) => (
            <button aria-pressed={checked.includes(index)} className={checked.includes(index) ? "module-card done" : "module-card"} key={item[0]} onClick={() => toggleModule(index)} type="button">
              <span className="module-number"><small>MODULE</small>{item[0]}</span><div><em>{checked.includes(index) ? "TERMINÉ" : "À FAIRE"}</em><b>{item[1]}</b><p>{item[2]}</p></div><i>{checked.includes(index) ? "✓" : "→"}</i>
            </button>
          ))}
        </div>
      </section>

      <section className="dark-section" id="modele">
        <div className="section-wrap">
          <SectionTitle eyebrow="01 — Comprendre le modèle" title="Tu ne vends pas des publications. Tu vends un système." text="Le client paie pour obtenir un résultat commercial plus prévisible, pas pour collectionner des livrables." />
          <div className="principle-grid">
            <article><span>01</span><h3>Acquérir</h3><p>Créer ou capter une demande qualifiée.</p></article>
            <article><span>02</span><h3>Convertir</h3><p>Transformer la demande en appel, rendez-vous puis vente.</p></article>
            <article><span>03</span><h3>Mesurer</h3><p>Relier le travail aux indicateurs que le dirigeant comprend.</p></article>
            <article><span>04</span><h3>Améliorer</h3><p>Tester une variable à la fois et documenter les apprentissages.</p></article>
          </div>
          <div className="formula"><span>OFFRE SMMA SOLIDE</span><b>Problème coûteux × Résultat mesurable × Preuve × Faible risque</b></div>
        </div>
      </section>

      <section className="content-section" id="services">
        <SectionTitle eyebrow="02 — Choisir un service" title="Quinze services réellement vendables." text="Commence avec un seul service principal. Pour chacun, tu trouveras la cible, les outils, la formation, les livrables et une fourchette de prix indicative." />
        <div className="pricing-context"><b>POSITIONNEMENT DÉBUTANT · FRANCE · AOÛT 2026</b><span>Ces repères éditoriaux BS IA correspondent à une offre bien cadrée avec peu de références. Ils sont indicatifs, généralement hors achats, hébergement, impression, logiciels et budget publicitaire. Compare toujours trois offres proches dans ta niche et ta ville avant de fixer ton prix.</span></div>
        <div className="service-layout">
          <div className="service-tabs" role="tablist" aria-label="Choisir un service SMMA">
            {services.map((item, index) => <button aria-controls="service-panel" aria-selected={activeService === item.id} className={activeService === item.id ? "active" : ""} id={`service-tab-${item.id}`} key={item.id} onClick={() => setActiveService(item.id)} role="tab" tabIndex={activeService === item.id ? 0 : -1} type="button"><span>{String(index + 1).padStart(2, "0")}</span>{item.name}</button>)}
          </div>
          <article aria-labelledby={`service-tab-${service.id}`} className="service-panel" id="service-panel" role="tabpanel" tabIndex={0}>
            <div className="service-head"><div><span>Niveau · {service.level}</span><h3>{service.name}</h3></div><div className="service-price"><small>PRIX CONSEILLÉS POUR DÉMARRER</small><b>{service.price}</b></div></div>
            <p className="service-result">“{service.result}”</p>
            <div className="detail-grid"><div><small>À QUI LE VENDRE</small><p>{service.clients}</p></div><div><small>COMMENT SE FORMER</small><p>{service.learn}</p></div><div><small>OUTILS À UTILISER</small><div className="tool-list">{service.tools.map(item => <span key={item}>{item}</span>)}</div></div><div><small>PREMIÈRE OFFRE À PROPOSER</small><p>{service.start}</p></div><div><small>LIVRABLES</small><ul>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div><div><small>CHIFFRES À SUIVRE</small><p>{service.kpis}</p></div></div>
            {service.id === "website" && <div className="wow-stack"><header><div><small>BOÎTE À OUTILS DESIGN PREMIUM</small><h4>Créer l’effet wow sans casser le site.</h4></div><span>DIRECTION VISUELLE × MOUVEMENT × VITESSE</span></header><div><article><b>01 · INSPIRATION</b><p>Awwwards, Godly et Mobbin pour analyser les compositions, pas pour copier.</p></article><article><b>02 · COMPOSANTS VISUELS</b><p>21st.dev, HorizonX, shadcn/ui, Aceternity et Magic UI pour accélérer une base qualitative.</p></article><article><b>03 · MOUVEMENT</b><p>Motion ou GSAP pour les transitions, le défilement, les apparitions et les petites animations.</p></article><article><b>04 · IMMERSION</b><p>Rive pour l’illustration interactive, Spline ou Three.js pour une 3D légère et utile.</p></article><article><b>05 · FINITION</b><p>Polices, rythme, contrastes, images, adaptation mobile et règles visuelles cohérentes.</p></article><article><b>06 · CONTRÔLE</b><p>PageSpeed, accessibilité et test mobile : un effet wow lent ou illisible n’est pas premium.</p></article></div></div>}
          </article>
        </div>
        <div className="decision-strip"><b>Règle de choix</b><span>Si tu ne peux pas expliquer le résultat, les livrables, les chiffres à suivre et le délai en 60 secondes, l’offre n’est pas encore prête.</span></div>
      </section>

      <section className="dark-section market-data-section" id="data-marche">
        <div className="section-wrap">
          <SectionTitle eyebrow="DATA MARCHÉ · FRANCE · 2025" title="Le marché existe. Voici où regarder." text="Ces chiffres nationaux donnent des directions, jamais une garantie de vente. Transforme chaque signal en hypothèse, puis vérifie-la avec des entreprises de ta zone." />
          <div className="market-data-grid">
            {marketStats.map((stat, index) => (
              <article className="market-stat" key={stat.value}>
                <header><span>{String(index + 1).padStart(2, "0")}</span><a href={stat.url} target="_blank" rel="noreferrer">{stat.source} ↗</a></header>
                <b>{stat.value}</b>
                <h3>{stat.label}</h3>
                <small>{stat.change}</small>
                <p>{stat.insight}</p>
              </article>
            ))}
          </div>
          <div className="market-radar">
            <header><div><small>RADAR DE DEMANDE</small><h3>Budget, projets et niveau de maturité.</h3></div><a href="https://www.francenum.gouv.fr/files/2025-09/Barom%C3%A8tre%20France%20Num%202025%20-%20Rapport.pdf" target="_blank" rel="noreferrer">RAPPORT FRANCE NUM ↗</a></header>
            <div className="market-radar-grid">
              {digitalDemandSignals.map((signal) => (
                <article key={signal.label}>
                  <div><b>{signal.value} %</b><span>{signal.label}</span></div>
                  <div className="data-bar" aria-label={`${signal.value} pour cent`} role="img"><i style={{ width: `${signal.value}%` }} /></div>
                  <p>{signal.detail}</p>
                </article>
              ))}
            </div>
            <aside><b>LECTURE COMMERCIALE</b><span>42 % ont déjà dépensé plus de 1 000 €, mais 25 % n’ont aucun budget : qualifie les moyens avant de faire une proposition. Un besoin apparent n’est pas automatiquement un marché solvable.</span></aside>
          </div>
          <div className="sector-data">
            <header><div><small>CRÉATIONS D’ENTREPRISES · INSEE 2025</small><h3>Les secteurs où de nouveaux besoins apparaissent.</h3></div><a href="https://www.insee.fr/fr/statistiques/8721354" target="_blank" rel="noreferrer">OUVRIR L’ÉTUDE ↗</a></header>
            <div className="sector-table">
              <div className="sector-table-head"><span>SECTEUR</span><span>CRÉATIONS</span><span>ÉVOLUTION</span><span>OFFRES À TESTER</span></div>
              {growthSectors.map((item, index) => <div className="sector-row" key={item.sector}><span><i>{String(index + 1).padStart(2, "0")}</i><b>{item.sector}</b></span><strong>{item.creations}</strong><em>{item.growth}</em><p>{item.offers}</p></div>)}
            </div>
            <p>Ce classement indique un flux de nouvelles entreprises, pas leur budget ni leur survie. L’Insee estime que 69 % des créations deviennent économiquement actives dans les deux ans : vérifie toujours que l’activité a réellement démarré.</p>
          </div>
          <div className="ecommerce-pulse">
            <header><div><small>E-COMMERCE FRANCE · 2025</small><h3>Plus d’achats, mais un panier moyen sous pression.</h3></div><a href="https://www.fevad.com/bilan-du-e-commerce-en-france-les-francais-ont-depense-pres-de-200-milliards-deuros-sur-internet-en-2025/" target="_blank" rel="noreferrer">SOURCE FEVAD ↗</a></header>
            <div>{ecommercePulse.map((item) => <article key={item.label}><b>{item.value}</b><span>{item.label}</span><small>{item.change}</small></article>)}</div>
            <aside><b>CE QUE ÇA CHANGE POUR L’OFFRE</b><p>Quand le panier baisse mais que le nombre de transactions monte, ne vends pas seulement « un beau site ». Travaille la vitesse, la clarté produit, la confiance, le taux de conversion, la fidélisation et la valeur de chaque commande.</p></aside>
          </div>
          <div className="data-offer-matrix">
            <header><div><small>DATA → BESOIN → SERVICE</small><h3>Six offres supplémentaires validées par des signaux réels.</h3></div><a href="https://www.francenum.gouv.fr/files/2025-09/Barom%C3%A8tre%20France%20Num%202025%20-%20Rapport.pdf" target="_blank" rel="noreferrer">SOURCE FRANCE NUM ↗</a></header>
            <div>{dataBackedOffers.map((item, index) => <article key={item.offer}><header><span>{String(index + 1).padStart(2, "0")}</span><b>{item.metric}</b></header><p>{item.fact}</p><div><small>ÉCART À RÉSOUDRE</small><span>{item.gap}</span></div><footer><small>SERVICE À TESTER</small><strong>{item.offer}</strong><em>{item.angle}</em></footer></article>)}</div>
            <aside><b>IMPORTANT</b><span>Ces chiffres servent à choisir un angle de recherche. Ils ne prouvent jamais qu’un prospect précis a le problème, le budget ou l’envie d’acheter. Vérifie toujours par un diagnostic et une conversation.</span></aside>
          </div>
          <div className="market-method">
            <div><small>01</small><b>Lis le signal</b><span>Une tendance nationale, datée et sourcée.</span></div>
            <i>→</i>
            <div><small>02</small><b>Formule une hypothèse</b><span>« Les commerces récents de ma ville ont-ils ce problème ? »</span></div>
            <i>→</i>
            <div><small>03</small><b>Teste sur le terrain</b><span>20 échanges ciblés avant de construire une grosse offre.</span></div>
            <i>→</i>
            <div><small>04</small><b>Garde les preuves</b><span>Réponses, objections, besoins et budget réel.</span></div>
          </div>
          <p className="market-disclaimer"><b>À retenir :</b> un pourcentage national ne prouve pas qu’une entreprise précise achètera. La demande locale, le budget, l’urgence et la qualité de ton offre doivent toujours être validés.</p>
        </div>
      </section>

      <section className="cream-section" id="formation">
        <div className="section-wrap">
          <SectionTitle eyebrow="03 — Se former sérieusement" title="Six semaines pour devenir opérationnel." text="Une formation utile alterne ressource officielle, exercice concret, analyse et répétition. Pas besoin d’attendre d’être expert pour créer une première preuve encadrée." />
          <div className="timeline">
            {trainingWeeks.map(item => <article key={item[0]}><span>{item[0]}</span><div><h3>{item[1]}</h3><p>{item[2]}</p></div></article>)}
          </div>
          <div className="resource-row"><div><small>RESSOURCE OFFICIELLE</small><b>Webflow University</b><span>Pour les sites, l’adaptation mobile et les interactions</span><i>✦</i></div><div><small>RESSOURCE OFFICIELLE</small><b>Make Academy</b><span>Pour les automatisations et les scénarios</span><i>✦</i></div><div><small>RESSOURCE OFFICIELLE</small><b>Figma Learn</b><span>Pour l’identité visuelle, les maquettes et les règles graphiques</span><i>✦</i></div><div><small>PARCOURS COMBINÉ</small><b>Google + HubSpot</b><span>Skillshop pour la publicité, Academy pour le suivi client et la vente</span><i>✦</i></div></div>
        </div>
      </section>

      <section className="content-section" id="cible">
        <SectionTitle eyebrow="04 — Savoir à qui vendre" title="Une bonne cible ressent déjà le problème." text="Tu ne cherches pas seulement un secteur. Tu cherches une entreprise avec un problème visible, une valeur client suffisante, de la capacité et un décideur accessible." />
        <div className="target-grid">
          <article className="score-card"><h3>Score prospect /25</h3>{scoreRows.map(row => <div className="score-row" key={row[0]}><b>{row[0]}</b><span>{row[1]}</span><small>{row[2]}</small></div>)}<footer><b>18–25</b> Prioritaire <b>12–17</b> À nourrir <b>0–11</b> Faible priorité</footer></article>
          <article className="red-flags"><span>À éviter au départ</span><h3>Les prospects qui cassent une jeune agence.</h3><ul><li>Aucune marge ni budget disponible.</li><li>Offre mal définie ou réputation très dégradée.</li><li>Personne pour rappeler les demandes rapidement.</li><li>Attend une garantie magique en quelques jours.</li><li>Décideur impossible à joindre.</li><li>Demande dix services pour le prix d’un.</li></ul></article>
        </div>
      </section>

      <section className="dark-section" id="offre">
        <div className="section-wrap">
          <SectionTitle eyebrow="05 — Construire l’offre" title="Une phrase que le dirigeant peut répéter." text="Une offre claire décrit pour qui, quel résultat, par quel mécanisme et dans quel cadre." />
          <div className="offer-builder"><span>J’aide</span><strong>[TYPE DE CLIENT]</strong><span>à</span><strong>[RÉSULTAT MESURABLE]</strong><span>grâce à</span><strong>[MÉCANISME]</strong><span>sur</span><strong>[PÉRIODE]</strong></div>
          <div className="offer-levels"><article><span>PREMIER TEST</span><h3>30 jours</h3><p>Une mission limitée, un objectif et une preuve recherchée.</p><b>Idéal pour signer sans trop promettre.</b></article><article className="featured"><span>ACCOMPAGNEMENT RÉGULIER</span><h3>3 mois minimum</h3><p>Production, amélioration et bilan selon un rythme clair.</p><b>Idéal pour créer de la stabilité.</b></article><article><span>INSTALLATION</span><h3>Projet + suivi</h3><p>Page, outil de suivi client, mesure ou système d’avis puis maintenance.</p><b>Idéal pour les outils qui restent en place.</b></article></div>
          <div className="price-note"><b>Prix plancher interne</b><span>(heures × valeur de ton temps) + outils + sous-traitance + marge de sécurité.</span><p>Ne facture jamais selon le nombre de clics de souris. Le prix reflète le périmètre, le risque, la valeur et la responsabilité.</p></div>
        </div>
      </section>

      <section className="content-section" id="prospection">
        <SectionTitle eyebrow="06 — Trouver des prospects" title="Quatre canaux qui créent de vraies conversations." text="Le but n’est pas de paraître occupé. Le but est de parler régulièrement à des décideurs qualifiés." />
        <div className="channel-grid">
          <article><span>01</span><h3>Appel à un contact connu</h3><p>Contacts, clients passés, fournisseurs, anciens collègues, membres du réseau local.</p><b>Aussi appelé « warm call »</b></article>
          <article><span>02</span><h3>Appel à froid</h3><p>Liste ciblée, observation précise, permission courte, quelques questions et rendez-vous.</p><b>Aussi appelé « cold call »</b></article>
          <article><span>03</span><h3>Démarchage physique</h3><p>Passage hors heures de pointe, mini-audit imprimé et retour programmé.</p><b>Levier : preuve d’effort</b></article>
          <article><span>04</span><h3>Partenaires</h3><p>Experts-comptables, créateurs de sites, imprimeurs, clubs business, freelances complémentaires.</p><b>Levier : recommandation</b></article>
        </div>
        <div className="prospect-toolkit">
          <header><div><small>BOÎTE À OUTILS · PROSPECTION ENTRE ENTREPRISES</small><h3>De la liste brute au rendez-vous.</h3></div><span>EXTRAIRE → VÉRIFIER → APPELER → SUIVRE</span></header>
          <div className="prospect-tools-grid">
            <article><b>01 · TROUVER LES ENTREPRISES</b><p>Google Maps, PagesJaunes, Pappers, Société.com, LinkedIn Sales Navigator, Kompass.</p><em>But : secteur + ville + taille + décideur.</em></article>
            <article><b>02 · EXTRAIRE LES FICHES</b><p>Amapulse directement dans Google Sheets, Outscraper ou Apify pour Google Maps, Instant Data Scraper pour une page autorisée, PhantomBuster pour des extractions ciblées.</p><em>But : nom, activité, adresse, téléphone pro, site et note.</em></article>
            <article><b>03 · COMPLÉTER & NETTOYER</b><p>Kaspr pour les coordonnées professionnelles, Dropcontact pour compléter et retirer les doublons, Clay pour combiner plusieurs sources.</p><em>But : joindre la bonne personne, pas accumuler des contacts.</em></article>
            <article><b>04 · REPÉRER L’OPPORTUNITÉ</b><p>PageSpeed Insights, BuiltWith, Google Business Profile, avis Google et audit manuel du site.</p><em>But : trouver un problème visible à citer pendant l’appel.</em></article>
            <article><b>05 · PILOTER LES APPELS</b><p>HubSpot Free, Pipedrive, Airtable, Notion ou Google Sheets. Ringover ou Aircall seulement si le volume le justifie.</p><em>Statuts : à appeler, joint, rappel, RDV, refus, client.</em></article>
            <article><b>06 · ORGANISER LE TERRAIN</b><p>Google My Maps, Circuit ou Badger Maps pour regrouper les prospects et construire une tournée cohérente.</p><em>But : 8 à 12 visites proches, hors heures de pointe.</em></article>
          </div>
          <div className="scrape-recipe"><b>EXEMPLE DE SCÉNARIO</b><span>“Restaurants Lyon” → extraction Google Maps avec Amapulse, Outscraper ou Apify → retirer chaînes et doublons → garder ceux sans site ou avec un site faible → vérifier manuellement 30 fiches → appeler 15 entreprises → noter chaque résultat.</span></div>
          <aside><b>CADRE À RESPECTER</b><p>Travaille entre entreprises avec des coordonnées professionnelles et une offre liée au métier du prospect. Présente ton identité, explique la raison de l’appel, respecte immédiatement tout refus et conserve une liste des personnes à ne plus contacter. Une donnée visible en ligne n’est pas automatiquement libre de toute obligation : vérifie aussi les conditions d’utilisation de chaque source et outil.</p></aside>
        </div>
        <div className="cadence"><div><b>Chaque jour</b><span>15 appels ciblés</span></div><div><b>Chaque semaine</b><span>10 visites + 5 relances</span></div><div><b>Chaque mois</b><span>1 événement + 4 partenaires</span></div><div><b>À mesurer</b><span>Contacts → échanges → RDV → ventes</span></div></div>
      </section>

      <section className="cream-section" id="coldcall">
        <div className="section-wrap">
          <SectionTitle eyebrow="07 — Appel à froid (cold call)" title="Le script sert à écouter, pas à réciter." text="Prépare l’ouverture et les questions, puis adapte les mots au prospect. L’objectif du premier appel est un rendez-vous d’analyse, pas une vente forcée." />
          <div className="script-grid">{scriptCards.slice(0, 4).map(card => <article className="script-card" key={card.title}><div><span>{card.badge}</span><h3>{card.title}</h3></div><p>{card.text}</p><CopyButton text={card.text} /></article>)}</div>
          <div className="call-flow"><span>OUVERTURE</span><i>→</i><span>PERMISSION</span><i>→</i><span>2 QUESTIONS</span><i>→</i><span>REFORMULATION</span><i>→</i><span>RENDEZ-VOUS</span></div>
          <aside className="compliance"><span>✓</span><div><b>CADRE DE L’APPEL</b><p>Respecte les règles locales de démarchage, les horaires autorisés, les listes d’opposition applicables et toute demande de ne plus être contacté.</p></div><small>IDENTITÉ · MOTIF · RESPECT DU REFUS</small></aside>
        </div>
      </section>

      <section className="content-section" id="terrain">
        <SectionTitle eyebrow="08 — Démarchage physique" title="Arrive avec une observation, pas avec un monologue." text="Choisis les heures calmes, sois propre et bref, demande le décideur et laisse une page utile : constat, opportunité, prochaine étape." />
        <div className="terrain-layout">
          <div className="script-stack">{scriptCards.slice(4).map(card => <article className="script-card" key={card.title}><div><span>{card.badge}</span><h3>{card.title}</h3></div><p>{card.text}</p><CopyButton text={card.text} /></article>)}</div>
          <article className="audit-sheet"><span>MINI-AUDIT · 1 PAGE</span><h3>Ce que tu remets au décideur</h3><ol><li><b>Constat visible</b><p>Un fait vérifiable, capture ou chiffre public.</p></li><li><b>Impact probable</b><p>Ce que ce point peut coûter en demandes ou en conversion.</p></li><li><b>Action prioritaire</b><p>Une amélioration concrète à lancer cette semaine.</p></li><li><b>Prochaine étape</b><p>Un diagnostic de 20 minutes avec jour et heure.</p></li></ol></article>
        </div>
      </section>

      <section className="dark-section" id="closing">
        <div className="section-wrap">
          <SectionTitle eyebrow="09 — Analyse & conclusion de vente" title="Comprendre avant de proposer." text="Une bonne conclusion de vente rend la décision claire. Elle ne cache ni le prix, ni les responsabilités, ni les limites." />
          <div className="diagnostic-grid">
            <article><span>01</span><h3>Situation</h3><p>Comment trouvez-vous vos clients aujourd’hui ? Quel volume entre chaque mois ?</p></article>
            <article><span>02</span><h3>Problème</h3><p>Où perdez-vous le plus : visibilité, qualité des demandes, rappel, présence ou conclusion des ventes ?</p></article>
            <article><span>03</span><h3>Impact</h3><p>Que coûte ce problème en temps, en marge et en opportunités manquées ?</p></article>
            <article><span>04</span><h3>Objectif</h3><p>Quel résultat chiffré voulez-vous atteindre, et avant quand ?</p></article>
            <article><span>05</span><h3>Décision</h3><p>Qui valide, quel budget existe et quelle contrainte peut bloquer ?</p></article>
            <article><span>06</span><h3>Proposition</h3><p>Reformuler, prescrire un périmètre, annoncer le prix puis laisser répondre.</p></article>
          </div>
          <div className="closing-line"><b>Phrase de transition</b><p>“Si je résume : vous voulez [objectif], aujourd’hui [blocage] vous en empêche, et cela représente [impact]. Je vous montre la solution que je recommande ?”</p><CopyButton text="Si je résume : vous voulez [objectif], aujourd’hui [blocage] vous en empêche, et cela représente [impact]. Je vous montre la solution que je recommande ?" /></div>
        </div>
      </section>

      <section className="content-section objections-section" id="objections">
        <SectionTitle eyebrow="10 — Objections & réponses" title="Ne combats pas l’objection. Clarifie-la." text="Réponds en trois temps : accueillir sans te justifier, poser une question pour isoler la cause, puis proposer la prochaine étape logique." />
        <div className="objection-method"><div><i>01</i><b>Accueillir</b><span>“Je comprends.”</span></div><div><i>02</i><b>Clarifier</b><span>“Quand vous dites…, c’est plutôt… ?”</span></div><div><i>03</i><b>Répondre</b><span>Une réponse liée au diagnostic.</span></div><div><i>04</i><b>Avancer</b><span>Question, rendez-vous ou sortie propre.</span></div></div>
        <div className="filter-row">{["Tous", "Appel", "Terrain", "Vente"].map(item => <button className={objectionFilter === item ? "active" : ""} onClick={() => setObjectionFilter(item)} key={item} type="button">{item}</button>)}</div>
        <div className="objection-list">
          {filteredObjections.map((item, index) => <details key={item.ask} open={index === 0}><summary><span>{item.type}</span><b>“{item.ask}”</b><i>+</i></summary><div className="objection-answer"><div><small>RÉPONSE</small><p>{item.answer}</p></div><div><small>RELANCE / ACTION</small><p>{item.next}</p></div><CopyButton text={`${item.ask}\n\nRéponse : ${item.answer}\n\nSuite : ${item.next}`} /></div></details>)}
        </div>
        <div className="never-do"><b>À ne jamais faire</b><span>Couper la parole · débattre · inventer une garantie · baisser le prix immédiatement · attaquer un concurrent · forcer une décision</span></div>
      </section>

      <section className="cream-section" id="livraison">
        <div className="section-wrap">
          <SectionTitle eyebrow="11 — Livrer & fidéliser" title="La fidélisation commence le premier jour." text="Un client reste quand il sait ce qui se passe, voit les progrès et comprend les prochaines décisions." />
          <div className="delivery-grid"><article><span>J0–J2</span><h3>Démarrage client</h3><p>Objectif, accès, interlocuteurs, délais, validation et responsabilités.</p></article><article><span>SEMAINE 1</span><h3>Point de départ chiffré</h3><p>Photo des chiffres avant intervention et plan d’action classé par priorité.</p></article><article><span>CHAQUE SEMAINE</span><h3>Résumé court</h3><p>Fait, chiffre, apprentissage, blocage et action suivante.</p></article><article><span>CHAQUE MOIS</span><h3>Bilan commercial</h3><p>Résultats, qualité des demandes, tests et recommandation du mois.</p></article></div>
          <div aria-label="Tableau des chiffres à suivre selon le service" className="kpi-table" role="region" tabIndex={0}><div className="table-head"><span>TYPE DE SERVICE</span><span>CHIFFRE MARKETING À REGARDER</span><span>RÉSULTAT COMMERCIAL À REGARDER</span></div><div><b>Publicité payante</b><span>Coût par demande</span><span>Rendez-vous + ventes obtenues</span></div><div><b>Contenu vidéo</b><span>Temps de visionnage + portée locale</span><span>Demandes entrantes</span></div><div><b>Visibilité locale</b><span>Positions + actions sur la fiche</span><span>Appels + demandes d’itinéraire</span></div><div><b>Réactivation</b><span>Pourcentage de contacts joints</span><span>Rendez-vous + revenu récupéré</span></div><div><b>Page de vente + suivi</b><span>Pourcentage de visiteurs qui contactent</span><span>Présence aux rendez-vous + ventes</span></div></div>
        </div>
      </section>

      <section className="content-section glossary-section" id="glossaire">
        <SectionTitle eyebrow="12 — Glossaire spécial débutants" title="Les mots compliqués, expliqués simplement." text="Tu n’as pas besoin de parler comme un expert pour bien travailler. Recherche un mot, ouvre sa définition et regarde l’exemple concret." />
        <div className="plain-language-banner">
          <span>RÈGLE DU GUIDE</span>
          <p>Quand tu vois un mot anglais, retiens surtout l’idée en français : <b>KPI = chiffre important</b>, <b>onboarding = démarrage du client</b>, <b>reporting = bilan</b>, <b>closing = conclusion de la vente</b>.</p>
        </div>
        <div className="glossary-search">
          <label htmlFor="glossary-query">CHERCHER UNE DÉFINITION</label>
          <div><span aria-hidden="true">⌕</span><input id="glossary-query" value={glossaryQuery} onChange={(event) => setGlossaryQuery(event.target.value)} placeholder="Ex. CRM, prospect, conversion, API…" type="search" /><b>{filteredGlossary.length} résultat{filteredGlossary.length > 1 ? "s" : ""}</b></div>
        </div>
        <div className="glossary-grid">
          {filteredGlossary.map((item, index) => (
            <details className="glossary-card" key={item.term} open={!glossaryQuery && index < 2}>
              <summary><span>{item.category}</span><b>{item.term}</b><i>+</i></summary>
              <div><p>{item.meaning}</p><small>EXEMPLE CONCRET</small><em>{item.example}</em></div>
            </details>
          ))}
        </div>
        {filteredGlossary.length === 0 && <div className="glossary-empty"><b>Ce mot n’est pas encore dans le glossaire.</b><span>Essaie un mot plus court ou cherche son équivalent français.</span></div>}
      </section>

      <section className="content-section" id="plan90">
        <SectionTitle eyebrow="13 — Plan 90 jours" title="Trois phases. Un cadre à adapter à ton rythme." text="La première victoire n’est pas de créer un logo d’agence. C’est de pouvoir montrer une compétence, mener une conversation et livrer ce qui a été vendu." />
        <div className="rhythm-note"><b>IMPORTANT · CE N’EST PAS UNE PROMESSE</b><p>Les 90 jours sont un exemple d’organisation, pas un délai garanti pour signer des clients. Certains avanceront plus vite, d’autres auront besoin de 4, 6 ou 12 mois. Cela dépend de ton niveau de départ, du service choisi, du temps disponible chaque semaine, de ton marché, de la qualité de ton offre et de ta régularité. Adapte le volume sans abandonner la méthode.</p></div>
        <div className="ninety-grid"><article><header><span>PHASE 1 · ± 30 JOURS</span><b>FONDATIONS</b></header><ul><li>Choisir 1 service et 1 cible</li><li>Suivre la ressource officielle</li><li>Créer 1 cas test démontrable</li><li>Rédiger l’offre et le script</li><li>Construire une première liste de prospects vérifiés</li></ul><footer>Objectif indicatif : être capable d’expliquer et montrer.</footer></article><article className="gold-plan"><header><span>PHASE 2 · À TON RYTHME</span><b>CONVERSATIONS</b></header><ul><li>Définir un volume d’appels réaliste</li><li>Planifier des visites terrain</li><li>Répéter les simulations de vente</li><li>Mener de vraies analyses</li><li>Chercher à signer un premier projet bien défini</li></ul><footer>Objectif indicatif : obtenir une première preuve terrain.</footer></article><article><header><span>PHASE 3 · APRÈS LA PREUVE</span><b>SYSTÈME</b></header><ul><li>Livrer et documenter le premier projet</li><li>Créer une étude de cas honnête</li><li>Améliorer les scripts et les questions de sélection</li><li>Chercher 1 à 3 clients cohérents</li><li>Créer une méthode claire de démarrage et de bilan</li></ul><footer>Objectif indicatif : obtenir des clients plus régulièrement.</footer></article></div>
        <div className="pipeline-math"><span>Exemple de pilotage hebdomadaire</span><b>75 appels</b><i>→</i><b>15 échanges</b><i>→</i><b>5 RDV</b><i>→</i><b>1 client</b><small>Les ratios varient. Mesure les tiens et améliore l’étape la plus faible.</small></div>
      </section>

      <section className="dark-section plan-section" id="monagence">
        <div className="section-wrap">
          <SectionTitle eyebrow="14 — Mon plan d’agence" title="Prends une décision avant de fermer cette page." text="Remplis ces six champs. Ton plan est sauvegardé automatiquement sur cet appareil et peut être copié en un clic." />
          <div className="plan-form">
            <label>Mon service principal<input value={plan.service} onChange={e => updatePlan("service", e.target.value)} placeholder="Ex. Google Ads local" /></label>
            <label>Ma cible<input value={plan.cible} onChange={e => updatePlan("cible", e.target.value)} placeholder="Ex. garages indépendants" /></label>
            <label className="wide">Ma promesse<textarea value={plan.promesse} onChange={e => updatePlan("promesse", e.target.value)} placeholder="J’aide [cible] à [résultat] grâce à [mécanisme]." /></label>
            <label>Mon prix pilote<input value={plan.prix} onChange={e => updatePlan("prix", e.target.value)} placeholder="Ex. 1 200 € + 79 €/mois" /></label>
            <label>Mon volume hebdomadaire<input value={plan.volume} onChange={e => updatePlan("volume", e.target.value)} placeholder="Ex. 75 appels + 10 visites" /></label>
            <label className="wide">Ma date de lancement<input value={plan.date} onChange={e => updatePlan("date", e.target.value)} placeholder="Ex. lundi prochain à 9 h" /></label>
          </div>
          <div className="plan-output"><pre>{planText}</pre><CopyButton text={planText} label="COPIER MON PLAN" /></div>
        </div>
      </section>

      <section className="content-section premium-section" id="cadre-pro">
        <SectionTitle eyebrow="15 — Cadre professionnel" title="Une agence sérieuse protège les deux côtés." text="Le statut, les contrats et la conformité ne servent pas à faire joli. Ils empêchent les malentendus, les impayés et les promesses impossibles." />
        <div className="legal-alert"><span>MISE À JOUR · 11 AOÛT 2026</span><p>Ce guide enseigne une prospection ciblée <b>entre professionnels</b>. En France, appeler un consommateur sans consentement préalable est interdit depuis le 11 août 2026, sauf exceptions liées à un contrat en cours. Ne mélange jamais fichiers B2B et particuliers.</p></div>
        <div className="professional-grid">{professionalSteps.map(item => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><small>{item.proof}</small></article>)}</div>
        <div className="official-links">
          <b>SOURCES OFFICIELLES À CONSERVER</b>
          <a href="https://www.cnil.fr/fr/prospection-commerciale-par-telephone-hors-automate-dappel-quelles-sont-les-regles" target="_blank" rel="noreferrer">CNIL · Prospection téléphonique B2B et opposition ↗</a>
          <a href="https://www.legifrance.gouv.fr/codes/id/LEGIARTI000051830285/2026-08-11" target="_blank" rel="noreferrer">Légifrance · Appels aux consommateurs depuis le 11/08/2026 ↗</a>
          <a href="https://www.service-public.fr/entreprendre/vosdroits/F31808" target="_blank" rel="noreferrer">Service Public · Mentions obligatoires sur une facture ↗</a>
          <a href="https://entreprendre.service-public.fr/actualites/A15683" target="_blank" rel="noreferrer">Service Public · Calendrier de la facture électronique ↗</a>
        </div>
        <p className="legal-note">Cette partie est pédagogique et ne remplace pas un conseil juridique, fiscal ou comptable adapté à ta situation.</p>
      </section>

      <section className="dark-section premium-dark" id="proposition">
        <div className="section-wrap">
          <SectionTitle eyebrow="16 — Proposition commerciale" title="Le document doit faciliter une décision, pas impressionner." text="Une proposition premium est courte, spécifique et cohérente avec le diagnostic. Le client doit comprendre ce qui change, ce qui est inclus et ce qu’il doit décider." />
          <div className="proposal-grid">{proposalBlocks.map(item => <article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div>
          <div className="proposal-rules"><b>LES 5 RÈGLES NON NÉGOCIABLES</b><span>Une offre principale</span><span>Une option maximum</span><span>Aucun résultat inventé</span><span>Un calendrier réaliste</span><span>Une prochaine étape datée</span></div>
        </div>
      </section>

      <section className="content-section finance-section" id="finance">
        <SectionTitle eyebrow="17 — Finance d’agence" title="Pars de l’objectif et remonte jusqu’aux conversations." text="Ce calculateur ne promet aucun résultat. Il transforme simplement ton objectif mensuel en volume commercial à tester, puis à remplacer par tes vrais ratios." />
        <div className="finance-calculator">
          <div className="finance-inputs">
            <label>Objectif mensuel (€)<input type="number" min="100" step="100" value={economics.revenue} onChange={e => setEconomics({ ...economics, revenue: Number(e.target.value) })} /></label>
            <label>Prix mensuel moyen (€)<input type="number" min="50" step="50" value={economics.monthlyPrice} onChange={e => setEconomics({ ...economics, monthlyPrice: Number(e.target.value) })} /></label>
            <label>Propositions signées (%)<input type="number" min="1" max="100" value={economics.closeRate} onChange={e => setEconomics({ ...economics, closeRate: Number(e.target.value) })} /></label>
            <label>Présence aux rendez-vous (%)<input type="number" min="1" max="100" value={economics.showRate} onChange={e => setEconomics({ ...economics, showRate: Number(e.target.value) })} /></label>
            <label>Échanges transformés en RDV (%)<input type="number" min="1" max="100" value={economics.bookingRate} onChange={e => setEconomics({ ...economics, bookingRate: Number(e.target.value) })} /></label>
          </div>
          <div className="finance-output"><small>OBJECTIF INDICATIF PAR MOIS</small><div><article><b>{clientsNeeded}</b><span>nouveaux clients</span></article><i>←</i><article><b>{proposalsNeeded}</b><span>propositions</span></article><i>←</i><article><b>{appointmentsNeeded}</b><span>RDV planifiés</span></article><i>←</i><article><b>{conversationsNeeded}</b><span>vrais échanges</span></article></div><p>Ajoute ensuite tes coûts, le temps de production, les outils, les charges, les impayés possibles et une marge de sécurité. Le chiffre d’affaires n’est pas ton bénéfice.</p></div>
        </div>
        <div className="margin-formula"><span>PRIX MINIMUM INTERNE</span><b>Temps de production + gestion client + outils + sous-traitance + charges + marge de sécurité</b></div>
      </section>

      <section className="cream-section procedures-section" id="procedures">
        <div className="section-wrap">
          <SectionTitle eyebrow="18 — Systèmes & procédures" title="Si tu ne peux pas l’expliquer, tu ne peux pas le répéter." text="Une procédure simple transforme une bonne exécution isolée en qualité régulière. Commence avec les six parcours qui touchent directement le client." />
          <div className="procedure-grid">{operatingProcedures.map((item, index) => <article key={item.title}><header><span>PROCÉDURE 0{index + 1}</span><h3>{item.title}</h3><small>DÉCLENCHEUR · {item.trigger}</small></header><ol>{item.steps.map(step => <li key={step}>{step}</li>)}</ol></article>)}</div>
          <div className="sop-definition"><b>UNE BONNE PROCÉDURE CONTIENT</b><span>un déclencheur</span><i>→</i><span>un responsable</span><i>→</i><span>des étapes</span><i>→</i><span>un contrôle</span><i>→</i><span>une solution en cas d’erreur</span></div>
        </div>
      </section>

      <section className="dark-section delegation-section" id="sous-traitance">
        <div className="section-wrap">
          <SectionTitle eyebrow="19 — Sous-traitance" title="Délègue la production, jamais la responsabilité." text="Le client t’a choisi pour le résultat et le suivi. Un prestataire peut exécuter une partie du travail, mais tu gardes le cadrage, la vérification et la communication." />
          <div className="delegation-grid"><article><span>À GARDER</span><h3>Relation & stratégie</h3><ul><li>Diagnostic et recommandation</li><li>Prix, contrat et calendrier</li><li>Accès et données sensibles</li><li>Présentation et décisions client</li><li>Contrôle qualité final</li></ul></article><article className="featured"><span>À DÉLÉGUER D’ABORD</span><h3>Production cadrée</h3><ul><li>Montage selon un exemple</li><li>Déclinaisons graphiques</li><li>Intégration de pages validées</li><li>Recherche et nettoyage de données</li><li>Tâches répétitives documentées</li></ul></article><article><span>À VÉRIFIER</span><h3>Marge & sécurité</h3><ul><li>Accord de confidentialité si utile</li><li>Droits sur les créations</li><li>Accès limités au strict nécessaire</li><li>Marge restante après corrections</li><li>Solution de secours</li></ul></article></div>
          <div className="delegation-warning"><b>Interdit</b><span>Revendre un travail non vérifié · partager tous les accès · cacher un retard · dépendre d’une seule personne · confondre chiffre d’affaires et marge</span></div>
        </div>
      </section>

      <section className="content-section ai-section" id="ia-agence">
        <SectionTitle eyebrow="20 — IA pour l’agence" title="L’IA accélère un système. Elle ne remplace pas le jugement." text="Utilise-la pour préparer, structurer, produire des variantes et contrôler. Le client paie toujours pour une recommandation juste et une exécution fiable." />
        <div className="ai-principle"><Image src="/bs-ia-logo.webp" alt="BS IA" width={1254} height={1254} loading="lazy" sizes="(max-width: 680px) 100vw, 190px" /><div><small>PROTOCOLE BS IA</small><h3>Contexte → consigne → contraintes → exemple → contrôle humain.</h3><p>Ne demande jamais seulement « fais-moi une stratégie ». Donne les informations du client, le résultat attendu, les limites, les sources et la grille de validation.</p></div><a href="https://lmarena.ai/leaderboard/text" target="_blank" rel="noreferrer">COMPARER LES MODÈLES ↗</a></div>
        <div className="ai-workflow-grid">{aiWorkflows.map((item, index) => <article key={item.title}><span>0{index + 1}</span><small>{item.tool}</small><h3>{item.title}</h3><p>{item.use}</p><em>CONTRÔLE · {item.guardrail}</em></article>)}</div>
        <div className="prompt-framework"><span>PROMPT DE TRAVAIL</span><CopyButton label="COPIER LE PROMPT" text="Rôle : tu es mon assistant d’agence SMMA.\nContexte client : [activité, cible, offre, zone, chiffres connus].\nObjectif : [résultat unique].\nTâche : [action précise].\nContraintes : [ton, format, limites, éléments interdits].\nSources : utilise uniquement [documents/liens fournis] et signale ce qui manque.\nSortie attendue : [structure exacte].\nContrôle final : liste les hypothèses, les risques et les points à vérifier humainement." /><pre>Rôle · Contexte client · Objectif · Tâche · Contraintes · Sources · Format · Contrôle final</pre></div>
      </section>

      <section className="dark-section templates-section" id="modeles">
        <div className="section-wrap">
          <SectionTitle eyebrow="21 — Bibliothèque de modèles" title="Douze documents prêts à adapter." text="Copie la structure, remplace chaque crochet et relis tout avant envoi. Un modèle accélère le travail ; il ne doit jamais rendre ton message générique." />
          <div className="template-grid">{templateLibrary.map((item, index) => <article key={item.title}><header><span>{String(index + 1).padStart(2, "0")}</span><small>{item.category}</small></header><h3>{item.title}</h3><pre>{item.body}</pre><CopyButton text={item.body} label="COPIER" /></article>)}</div>
        </div>
      </section>

      <section className="content-section quality-section" id="qualite">
        <SectionTitle eyebrow="22 — Contrôle qualité" title="La checklist qui protège ta réputation." text="Passe chaque porte de contrôle avant d’avancer. Une minute de vérification coûte moins cher qu’une semaine de réparation." />
        <div className="quality-grid">{qualityGates.map((item, index) => <article key={item[0]}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div><i>✓</i></article>)}</div>
        <div className="master-rule"><small>RÈGLE FINALE</small><h3>Ne scale pas le chaos.</h3><p>Avant d’ajouter des clients, des outils ou des sous-traitants, assure-toi que l’offre est rentable, la livraison est documentée et la satisfaction est mesurée.</p><a href="#modules">REVOIR LES 22 MODULES ↑</a></div>
      </section>

      <footer className="footer"><a aria-label="BS IA, retour en haut" className="brand" href="#top"><BrandLogo /></a><p>BS IA · SMMA Masterbook · Édition premium 2026 · Créé par Biloux.</p><a href="#top">RETOUR EN HAUT ↑</a></footer>
      </main>
    </>
  );
}
