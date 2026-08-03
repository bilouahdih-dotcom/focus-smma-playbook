"use client";

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
    <span className="brand-lockup">
      <span className="focus-wordmark">Focus</span>
      <span className="brand-signature">PROPULSÉ PAR <b>BILOUX</b></span>
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
  const [plan, setPlan] = useState({ service: "", cible: "", promesse: "", prix: "", volume: "", date: "" });
  const backupInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
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

  const planText = `MON PLAN D'AGENCE — FOCUS\n\nService : ${plan.service || "À définir"}\nCible : ${plan.cible || "À définir"}\nPromesse : ${plan.promesse || "À définir"}\nPrix pilote : ${plan.prix || "À définir"}\nVolume hebdomadaire : ${plan.volume || "À définir"}\nDate de lancement : ${plan.date || "À définir"}\n\nRègle : une offre, une cible, 90 jours d'exécution.`;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Focus, propulsé par Biloux, retour en haut"><BrandLogo /></a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#prospection" onClick={() => setMenuOpen(false)}>Prospection</a>
          <a href="#objections" onClick={() => setMenuOpen(false)}>Objections</a>
          <a href="#glossaire" onClick={() => setMenuOpen(false)}>Glossaire</a>
          <a href="#plan90" onClick={() => setMenuOpen(false)}>Plan 90 jours</a>
        </nav>
        <div className="header-actions">
          <a className="progress-pill" href="#modules"><span>{progress}%</span> complété</a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu" type="button">☰</button>
        </div>
      </header>

      <a className="arena-top-banner" href="https://arena.ai/leaderboard" target="_blank" rel="noreferrer" aria-label="Ouvrir le classement des modèles IA sur Arena.ai">
        <span className="arena-live"><i /> CLASSEMENT EN DIRECT</span>
        <span className="arena-title"><b>ARENA.AI</b><em>Compare les meilleurs modèles IA du moment pour le texte, le code, l’image et la vision.</em></span>
        <strong>VOIR LE LEADERBOARD ↗</strong>
      </a>

      <section className="guide-cover" id="top">
        <div className="guide-dots" />
        <div className="cover-shell">
          <aside className="cover-spine" aria-label="Informations du guide">
            <span>FOCUS</span>
            <strong>PLAYBOOK<br/>SMMA</strong>
            <small>ÉDITION 2026 · FR</small>
          </aside>
          <div className="cover-main">
            <div className="cover-breadcrumb"><span>FOCUS</span><i>•</i><span>GUIDE SMMA</span><strong>SPÉCIAL DÉBUTANTS</strong></div>
            <h1>Construis une agence<br/><em>qui sait vendre.</em></h1>
            <p>Un guide conçu pour les débutants, sans prérequis : chaque service, outil et étape est expliqué depuis zéro pour apprendre à prospecter, vendre et livrer proprement.</p>
            <div className="cover-actions">
              <a className="gold-button" href="#modules">COMMENCER LE GUIDE <span>→</span></a>
              <a className="text-link" href="#objections">ALLER AUX OBJECTIONS ↓</a>
            </div>
            <div className="cover-meta"><span><b>{modules.length}</b> modules</span><span><b>{services.length}</b> services</span><span><b>{glossary.length}</b> définitions</span><span><b>0</b> prérequis</span></div>
          </div>
          <article className="start-panel">
            <header><span>01</span><b>COMMENCE ICI</b><i>DÉBUTANT</i></header>
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
        <SectionTitle eyebrow="00 — Mode d’emploi pour débutants" title="Le chemin le plus court vers une agence vendable." text="Aucun prérequis : avance dans l’ordre, applique les exemples et coche chaque module après l’avoir compris. Ta progression reste enregistrée sur cet appareil." />
        <div className="progress-dashboard">
          <div className="progress-ring" style={{ background: `conic-gradient(var(--gold) ${progress * 3.6}deg, #292929 0deg)` }}><div><strong>{progress}%</strong><span>COMPLÉTÉ</span></div></div>
          <div className="progress-summary"><small>SAUVEGARDE AUTOMATIQUE ACTIVE</small><h3>{progress === 100 ? "Playbook terminé." : nextModule ? `Prochaine étape : ${nextModule[1]}` : "Choisis ta prochaine étape."}</h3><p>{lastSaved ? `Dernière sauvegarde : ${new Date(lastSaved).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}` : "Ta progression sera sauvegardée dès que tu valides un module."}</p><div className="progress-track"><div style={{ width: `${progress}%` }} /></div></div>
          <div className="progress-stats"><div><b>{checked.length}</b><span>TERMINÉS</span></div><div><b>{modules.length - checked.length}</b><span>RESTANTS</span></div></div>
          <div className="progress-actions"><button onClick={exportBackup} type="button">TÉLÉCHARGER LA SAUVEGARDE ↓</button><button onClick={() => backupInput.current?.click()} type="button">RESTAURER ↑</button><button className="reset-progress" onClick={resetProgress} type="button">RÉINITIALISER</button><input ref={backupInput} onChange={importBackup} type="file" accept="application/json,.json" hidden /></div>
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
        <SectionTitle eyebrow="02 — Choisir un service" title="Neuf services réellement vendables." text="Commence avec un seul service principal. Pour chacun, tu trouveras la cible, les outils, la formation, les livrables et une fourchette de prix indicative." />
        <div className="pricing-context"><b>POSITIONNEMENT DÉBUTANT · FRANCE</b><span>Ces prix correspondent à une offre bien cadrée avec peu de références. Ils sont indicatifs, généralement hors achats, hébergement, impression, logiciels et budget publicitaire. Après 3 à 5 preuves solides, augmente progressivement tes tarifs.</span></div>
        <div className="service-layout">
          <div className="service-tabs" role="tablist">
            {services.map((item, index) => <button className={activeService === item.id ? "active" : ""} key={item.id} onClick={() => setActiveService(item.id)} type="button"><span>0{index + 1}</span>{item.name}</button>)}
          </div>
          <article className="service-panel">
            <div className="service-head"><div><span>Niveau · {service.level}</span><h3>{service.name}</h3></div><div className="service-price"><small>PRIX CONSEILLÉS POUR DÉMARRER</small><b>{service.price}</b></div></div>
            <p className="service-result">“{service.result}”</p>
            <div className="detail-grid"><div><small>À QUI LE VENDRE</small><p>{service.clients}</p></div><div><small>COMMENT SE FORMER</small><p>{service.learn}</p></div><div><small>OUTILS À UTILISER</small><div className="tool-list">{service.tools.map(item => <span key={item}>{item}</span>)}</div></div><div><small>PREMIÈRE OFFRE À PROPOSER</small><p>{service.start}</p></div><div><small>LIVRABLES</small><ul>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div><div><small>CHIFFRES À SUIVRE</small><p>{service.kpis}</p></div></div>
            {service.id === "website" && <div className="wow-stack"><header><div><small>BOÎTE À OUTILS DESIGN PREMIUM</small><h4>Créer l’effet wow sans casser le site.</h4></div><span>DIRECTION VISUELLE × MOUVEMENT × VITESSE</span></header><div><article><b>01 · INSPIRATION</b><p>Awwwards, Godly et Mobbin pour analyser les compositions, pas pour copier.</p></article><article><b>02 · COMPOSANTS VISUELS</b><p>21st.dev, HorizonX, shadcn/ui, Aceternity et Magic UI pour accélérer une base qualitative.</p></article><article><b>03 · MOUVEMENT</b><p>Motion ou GSAP pour les transitions, le défilement, les apparitions et les petites animations.</p></article><article><b>04 · IMMERSION</b><p>Rive pour l’illustration interactive, Spline ou Three.js pour une 3D légère et utile.</p></article><article><b>05 · FINITION</b><p>Polices, rythme, contrastes, images, adaptation mobile et règles visuelles cohérentes.</p></article><article><b>06 · CONTRÔLE</b><p>PageSpeed, accessibilité et test mobile : un effet wow lent ou illisible n’est pas premium.</p></article></div></div>}
          </article>
        </div>
        <div className="decision-strip"><b>Règle de choix</b><span>Si tu ne peux pas expliquer le résultat, les livrables, les chiffres à suivre et le délai en 60 secondes, l’offre n’est pas encore prête.</span></div>
      </section>

      <section className="cream-section" id="formation">
        <div className="section-wrap">
          <SectionTitle eyebrow="03 — Se former sérieusement" title="Six semaines pour devenir opérationnel." text="Une formation utile alterne ressource officielle, exercice concret, analyse et répétition. Pas besoin d’attendre d’être expert pour créer une première preuve encadrée." />
          <div className="timeline">
            {trainingWeeks.map(item => <article key={item[0]}><span>{item[0]}</span><div><h3>{item[1]}</h3><p>{item[2]}</p></div></article>)}
          </div>
          <div className="resource-row"><div><b>Webflow University</b><span>Pour les sites, l’adaptation mobile et les interactions</span></div><div><b>Make Academy</b><span>Pour les automatisations et les scénarios</span></div><div><b>Figma Learn</b><span>Pour l’identité visuelle, les maquettes et les règles graphiques</span></div><div><b>Google + HubSpot</b><span>Skillshop pour la publicité, Academy pour le suivi client et la vente</span></div></div>
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
          <p className="compliance">Respecte les règles locales de démarchage, les horaires autorisés, les listes d’opposition applicables et toute demande de ne plus être contacté.</p>
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
        <div className="objection-method"><div><b>1. Accueillir</b><span>“Je comprends.”</span></div><div><b>2. Clarifier</b><span>“Quand vous dites…, c’est plutôt… ?”</span></div><div><b>3. Répondre</b><span>Une réponse liée au diagnostic.</span></div><div><b>4. Avancer</b><span>Question, rendez-vous ou sortie propre.</span></div></div>
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
          <div className="kpi-table"><div className="table-head"><span>TYPE DE SERVICE</span><span>CHIFFRE MARKETING À REGARDER</span><span>RÉSULTAT COMMERCIAL À REGARDER</span></div><div><b>Publicité payante</b><span>Coût par demande</span><span>Rendez-vous + ventes obtenues</span></div><div><b>Contenu vidéo</b><span>Temps de visionnage + portée locale</span><span>Demandes entrantes</span></div><div><b>Visibilité locale</b><span>Positions + actions sur la fiche</span><span>Appels + demandes d’itinéraire</span></div><div><b>Réactivation</b><span>Pourcentage de contacts joints</span><span>Rendez-vous + revenu récupéré</span></div><div><b>Page de vente + suivi</b><span>Pourcentage de visiteurs qui contactent</span><span>Présence aux rendez-vous + ventes</span></div></div>
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

      <footer className="footer"><a className="brand" href="#top"><BrandLogo /></a><p>Guide SMMA Focus · Propulsé par Biloux · Une ressource opérationnelle, pas une promesse de résultat.</p><a href="#top">RETOUR EN HAUT ↑</a></footer>
    </main>
  );
}
