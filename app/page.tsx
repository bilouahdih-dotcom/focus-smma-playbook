"use client";

import { useEffect, useMemo, useState } from "react";

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
};

const services: Service[] = [
  {
    id: "meta",
    name: "Meta Ads",
    result: "Générer des demandes qualifiées et mesurables.",
    clients: "Cliniques, salles de sport, artisans à panier élevé, beauté premium, centres de formation.",
    learn: "Meta Blueprint, création publicitaire, tracking, lecture des chiffres et qualification des leads.",
    deliverables: ["Audit du compte", "Campagnes + créas", "Suivi hebdomadaire", "Tableau de bord"],
    kpis: "Coût par lead, taux de contact, taux de RDV, ventes attribuées",
    start: "Pilote 30 jours + budget média payé par le client",
    level: "Intermédiaire",
  },
  {
    id: "google",
    name: "Google Ads",
    result: "Capter les prospects qui cherchent déjà la prestation.",
    clients: "Plombiers, serruriers, avocats, déménageurs, garages, dentistes, services locaux urgents.",
    learn: "Google Skillshop, mots-clés, pages d’atterrissage, appels suivis et exclusions de recherche.",
    deliverables: ["Étude des requêtes", "Campagnes Search", "Suivi des appels", "Optimisation mensuelle"],
    kpis: "Coût par appel, taux de conversion, part d’impressions, chiffre d’affaires",
    start: "Audit + campagne locale sur une zone précise",
    level: "Intermédiaire",
  },
  {
    id: "video",
    name: "Vidéos courtes",
    result: "Créer une présence régulière qui nourrit la confiance.",
    clients: "Restaurants, salles de sport, agents immobiliers, commerces, coachs, métiers visuels.",
    learn: "Hook, storyboard, tournage smartphone, montage rythmé, sous-titres et analyse de rétention.",
    deliverables: ["Calendrier éditorial", "1 journée de tournage", "8 à 16 vidéos", "Bilan mensuel"],
    kpis: "Rétention, portée locale, visites profil, demandes entrantes",
    start: "Pack de 8 vidéos tournées en une demi-journée",
    level: "Débutant",
  },
  {
    id: "creative",
    name: "Créatives publicitaires",
    result: "Donner aux campagnes de nouvelles publicités qui convertissent.",
    clients: "E-commerce, infopreneurs, marques locales, cliniques et annonceurs déjà actifs.",
    learn: "Angles, hooks, scripts UGC, montage direct-response, bibliothèque de tests et reporting créatif.",
    deliverables: ["Recherche d’angles", "Scripts", "8 à 20 variations", "Rapport gagnants/perdants"],
    kpis: "CTR, coût par résultat, taux d’arrêt, durée de vie des créas",
    start: "Sprint de 10 variations sur 3 angles",
    level: "Débutant +",
  },
  {
    id: "maps",
    name: "Visibilité Google locale",
    result: "Faire remonter l’établissement dans Maps et convertir les recherches locales.",
    clients: "Restaurants, garages, coiffeurs, instituts, cabinets, artisans et commerces de proximité.",
    learn: "Google Business Profile, catégories, avis, photos, citations locales et pages de zone.",
    deliverables: ["Audit fiche", "Optimisation complète", "Système d’avis", "Suivi des positions"],
    kpis: "Appels, itinéraires, positions locales, nouveaux avis",
    start: "Mise à niveau en 14 jours puis suivi mensuel",
    level: "Débutant",
  },
  {
    id: "reactivation",
    name: "Réactivation clients",
    result: "Transformer l’ancienne base clients en nouveaux rendez-vous.",
    clients: "Instituts, garages, salles de sport, cabinets, centres de formation et entreprises avec un fichier client.",
    learn: "Segmentation CRM, offre de retour, appels de réactivation, SMS conforme et prise de rendez-vous.",
    deliverables: ["Nettoyage de base", "Segmentation", "Script d’appel/SMS", "Suivi des réservations"],
    kpis: "Contacts joints, RDV pris, taux de retour, revenu réactivé",
    start: "Sprint 10 jours sur un segment dormant",
    level: "Débutant",
  },
  {
    id: "funnel",
    name: "Landing page + CRM",
    result: "Ne plus perdre les prospects entre le clic, l’appel et le rendez-vous.",
    clients: "Prestataires à panier élevé qui génèrent déjà du trafic ou des demandes.",
    learn: "Copywriting, formulaire, calendrier, pipeline CRM, automatisations et mesure de conversion.",
    deliverables: ["Page de conversion", "Formulaire qualifiant", "Pipeline", "Relances automatisées"],
    kpis: "Conversion de page, délai de rappel, présence au RDV, taux de closing",
    start: "Installation facturée + maintenance légère",
    level: "Intermédiaire",
  },
];

const modules = [
  ["01", "Le modèle", "Comprendre ce que le client achète vraiment."],
  ["02", "Les services", "Choisir une prestation simple à délivrer."],
  ["03", "Se former", "Passer de théorie à compétence démontrable."],
  ["04", "La cible", "Repérer les entreprises capables d’acheter."],
  ["05", "L’offre", "Vendre un résultat, un périmètre et une méthode."],
  ["06", "Prospection", "Warm call, cold call, terrain et partenaires."],
  ["07", "Cold call", "Ouvrir, qualifier et obtenir le rendez-vous."],
  ["08", "Terrain", "Entrer, diagnostiquer et repartir avec une suite."],
  ["09", "Closing", "Conduire un diagnostic et proposer proprement."],
  ["10", "Objections", "Répondre sans réciter ni argumenter dans le vide."],
  ["11", "Livraison", "Onboarding, KPI, reporting et fidélisation."],
  ["12", "Plan 90 jours", "Construire les premières preuves et signer."],
  ["13", "Mon agence", "Remplir et copier son plan d’exécution."],
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
  { type: "Closing", ask: "C’est trop cher.", answer: "Par rapport à quoi : votre budget prévu, une autre proposition ou la valeur que vous pensez pouvoir récupérer ?", next: "Revenir aux chiffres du diagnostic. Réduire le périmètre, jamais promettre l’impossible." },
  { type: "Closing", ask: "Je dois réfléchir.", answer: "Évidemment. Pour que votre réflexion soit utile : quel point précis vous empêche de décider aujourd’hui ?", next: "Isoler prix, confiance, timing ou autorité de décision, puis traiter ce point." },
  { type: "Closing", ask: "Je dois en parler à mon associé.", answer: "C’est normal. Qu’est-ce que votre associé voudra vérifier avant de valider ? On peut prévoir un échange à trois pour répondre une seule fois aux mêmes questions.", next: "Ne pas transformer le prospect en messager. Fixer le rendez-vous à trois." },
  { type: "Closing", ask: "On n’a pas le budget.", answer: "Je préfère le savoir. Est-ce une absence totale de budget ou un problème de trésorerie maintenant ? Si le retour potentiel est clair, on peut définir un pilote plus petit.", next: "Proposer un pilote cohérent ou sortir proprement. Ne pas vendre à perte." },
  { type: "Closing", ask: "Pouvez-vous garantir les résultats ?", answer: "Je peux garantir le travail, la méthode, le suivi et les livrables. Le résultat dépend aussi de votre offre, de la vitesse de traitement et du marché. On fixe ensemble les indicateurs contrôlables.", next: "Refuser les garanties fictives et cadrer les responsabilités des deux côtés." },
  { type: "Closing", ask: "Un concurrent propose moins cher.", answer: "C’est possible. Comparons le périmètre : volume produit, suivi, mesure, délais et accompagnement. Si tout est identique, choisissez l’offre la plus logique pour vous.", next: "Rendre la différence visible sans dénigrer le concurrent." },
  { type: "Closing", ask: "Ce n’est pas le bon moment.", answer: "Qu’est-ce qui doit changer pour que le moment devienne bon : la saison, l’équipe, le budget ou une autre priorité ?", next: "Transformer le flou en condition et en date de suivi précise." },
  { type: "Closing", ask: "Faites une proposition et on verra.", answer: "Je peux la préparer après avoir validé trois éléments : l’objectif chiffré, le processus actuel et qui participe à la décision. Sinon elle serait générique.", next: "Terminer le diagnostic et programmer la présentation de la proposition." },
];

const scriptCards = [
  {
    title: "Ouverture cold call — permission",
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
    title: "Warm call",
    badge: "Contexte commun",
    text: "Salut [Prénom], [Lien commun] m’a parlé de votre activité. J’aide les [type d’entreprise] à [résultat]. Je ne sais pas encore si c’est pertinent pour vous : comment vous trouvez vos nouveaux clients aujourd’hui ?",
  },
];

const trainingWeeks = [
  ["S1", "Fondations", "Choisir un service, une cible et un résultat. Comprendre le parcours du prospect jusqu’à la vente."],
  ["S2", "Outil", "Suivre la ressource officielle du canal et reproduire deux exercices guidés."],
  ["S3", "Projet test", "Créer une campagne, un lot de vidéos, une fiche locale ou un pipeline sur un cas fictif réaliste."],
  ["S4", "Mesure", "Construire un tableau de bord et expliquer chaque KPI en langage client."],
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

export default function Home() {
  const [activeService, setActiveService] = useState("meta");
  const [objectionFilter, setObjectionFilter] = useState("Tous");
  const [checked, setChecked] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [plan, setPlan] = useState({ service: "", cible: "", promesse: "", prix: "", volume: "", date: "" });

  useEffect(() => {
    const saved = window.localStorage.getItem("focus-smma-progress");
    const savedPlan = window.localStorage.getItem("focus-smma-plan");
    if (saved) setChecked(JSON.parse(saved));
    if (savedPlan) setPlan(JSON.parse(savedPlan));
  }, []);

  const service = services.find((item) => item.id === activeService) ?? services[0];
  const filteredObjections = useMemo(
    () => objections.filter((item) => objectionFilter === "Tous" || item.type === objectionFilter),
    [objectionFilter],
  );
  const progress = Math.round((checked.length / modules.length) * 100);

  const toggleModule = (index: number) => {
    const next = checked.includes(index) ? checked.filter((item) => item !== index) : [...checked, index];
    setChecked(next);
    window.localStorage.setItem("focus-smma-progress", JSON.stringify(next));
  };

  const updatePlan = (key: keyof typeof plan, value: string) => {
    const next = { ...plan, [key]: value };
    setPlan(next);
    window.localStorage.setItem("focus-smma-plan", JSON.stringify(next));
  };

  const planText = `MON PLAN D'AGENCE — FOCUS\n\nService : ${plan.service || "À définir"}\nCible : ${plan.cible || "À définir"}\nPromesse : ${plan.promesse || "À définir"}\nPrix pilote : ${plan.prix || "À définir"}\nVolume hebdomadaire : ${plan.volume || "À définir"}\nDate de lancement : ${plan.date || "À définir"}\n\nRègle : une offre, une cible, 90 jours d'exécution.`;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Focus, retour en haut"><span>F</span>ocus</a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#prospection" onClick={() => setMenuOpen(false)}>Prospection</a>
          <a href="#objections" onClick={() => setMenuOpen(false)}>Objections</a>
          <a href="#plan90" onClick={() => setMenuOpen(false)}>Plan 90 jours</a>
        </nav>
        <div className="header-actions">
          <a className="progress-pill" href="#modules"><span>{progress}%</span> complété</a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu" type="button">☰</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="dot-grid" />
        <div className="float-card card-green"><span className="live">OBJECTIF</span><b>15 appels</b><small>PAR JOUR</small><i>→ 3 conversations</i><i>→ 1 rendez-vous</i></div>
        <div className="float-card card-black"><span className="terminal-dots">● ● ●</span><code>$ init_focus()</code><strong>✓ Prêt à vendre</strong></div>
        <div className="float-card card-blue"><span className="live">TERRAIN</span><b>10 visites</b><small>PAR SEMAINE</small><div className="mini-line" /></div>
        <div className="float-card card-gold"><span>PIPELINE</span><b>50 → 10 → 3</b><small>PROSPECTS · RDV · CLIENTS</small><div className="bars"><i/><i/><i/><i/><i/><i/></div></div>
        <div className="hero-copy">
          <span className="kicker">Le guide complet offert après le live</span>
          <h1><span>SMMA</span><em>PLAYBOOK.</em></h1>
          <p><strong>Une offre. Une cible. Une méthode.</strong> Des compétences jusqu’au premier client — sans blabla.</p>
          <a className="gold-button" href="#modules">OUVRIR LE PLAYBOOK <span>→</span></a>
          <div className="hero-stats"><div><b>7</b><span>SERVICES</span></div><div><b>13</b><span>MODULES</span></div><div><b>16</b><span>OBJECTIONS</span></div><div><b>90</b><span>JOURS</span></div></div>
        </div>
      </section>

      <section className="content-section intro" id="modules">
        <SectionTitle eyebrow="00 — Mode d’emploi" title="Le chemin le plus court vers une agence vendable." text="Coche chaque module après l’avoir compris et appliqué. Ta progression reste enregistrée sur cet appareil." />
        <div className="progress-track"><div style={{ width: `${progress}%` }} /><span>{checked.length}/{modules.length} modules</span></div>
        <div className="module-grid">
          {modules.map((item, index) => (
            <button className={checked.includes(index) ? "module-card done" : "module-card"} key={item[0]} onClick={() => toggleModule(index)} type="button">
              <span className="module-number">{item[0]}</span><div><b>{item[1]}</b><p>{item[2]}</p></div><i>{checked.includes(index) ? "✓" : "+"}</i>
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
        <SectionTitle eyebrow="02 — Choisir un service" title="Sept services réellement vendables." text="Commence avec un seul service principal. Choisis-le selon la demande du marché, ta capacité à le livrer et la vitesse à laquelle tu peux produire une preuve." />
        <div className="service-layout">
          <div className="service-tabs" role="tablist">
            {services.map((item, index) => <button className={activeService === item.id ? "active" : ""} key={item.id} onClick={() => setActiveService(item.id)} type="button"><span>0{index + 1}</span>{item.name}</button>)}
          </div>
          <article className="service-panel">
            <div className="service-head"><div><span>Niveau · {service.level}</span><h3>{service.name}</h3></div><b>{service.start}</b></div>
            <p className="service-result">“{service.result}”</p>
            <div className="detail-grid"><div><small>À QUI LE VENDRE</small><p>{service.clients}</p></div><div><small>COMMENT SE FORMER</small><p>{service.learn}</p></div><div><small>LIVRABLES</small><ul>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div><div><small>KPI À SUIVRE</small><p>{service.kpis}</p></div></div>
          </article>
        </div>
        <div className="decision-strip"><b>Règle de choix</b><span>Si tu ne peux pas expliquer le résultat, les livrables, les KPI et le délai en 60 secondes, l’offre n’est pas encore prête.</span></div>
      </section>

      <section className="cream-section" id="formation">
        <div className="section-wrap">
          <SectionTitle eyebrow="03 — Se former sérieusement" title="Six semaines pour devenir opérationnel." text="Une formation utile alterne ressource officielle, exercice concret, analyse et répétition. Pas besoin d’attendre d’être expert pour créer une première preuve encadrée." />
          <div className="timeline">
            {trainingWeeks.map(item => <article key={item[0]}><span>{item[0]}</span><div><h3>{item[1]}</h3><p>{item[2]}</p></div></article>)}
          </div>
          <div className="resource-row"><div><b>Google Skillshop</b><span>Pour Google Ads et Analytics</span></div><div><b>Meta Blueprint</b><span>Pour l’écosystème publicitaire Meta</span></div><div><b>HubSpot Academy</b><span>Pour CRM, vente et inbound</span></div><div><b>Pratique délibérée</b><span>Un cas test + une restitution orale par semaine</span></div></div>
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
          <div className="offer-levels"><article><span>PILOTE</span><h3>30 jours</h3><p>Un périmètre réduit, un objectif, une preuve recherchée.</p><b>Idéal pour signer sans surpromettre.</b></article><article className="featured"><span>RÉCURRENT</span><h3>3 mois minimum</h3><p>Production, optimisation et reporting sur une cadence claire.</p><b>Idéal pour créer de la stabilité.</b></article><article><span>INSTALLATION</span><h3>Projet + suivi</h3><p>Page, CRM, tracking ou système d’avis puis maintenance.</p><b>Idéal pour les actifs durables.</b></article></div>
          <div className="price-note"><b>Prix plancher interne</b><span>(heures × valeur de ton temps) + outils + sous-traitance + marge de sécurité.</span><p>Ne facture jamais selon le nombre de clics de souris. Le prix reflète le périmètre, le risque, la valeur et la responsabilité.</p></div>
        </div>
      </section>

      <section className="content-section" id="prospection">
        <SectionTitle eyebrow="06 — Trouver des prospects" title="Quatre canaux qui créent de vraies conversations." text="Le but n’est pas de paraître occupé. Le but est de parler régulièrement à des décideurs qualifiés." />
        <div className="channel-grid">
          <article><span>01</span><h3>Warm call</h3><p>Contacts, clients passés, fournisseurs, anciens collègues, membres du réseau local.</p><b>Levier : confiance transférée</b></article>
          <article><span>02</span><h3>Cold call</h3><p>Liste ciblée, observation précise, permission courte, qualification et rendez-vous.</p><b>Levier : volume maîtrisé</b></article>
          <article><span>03</span><h3>Démarchage physique</h3><p>Passage hors heures de pointe, mini-audit imprimé et retour programmé.</p><b>Levier : preuve d’effort</b></article>
          <article><span>04</span><h3>Partenaires</h3><p>Experts-comptables, créateurs de sites, imprimeurs, clubs business, freelances complémentaires.</p><b>Levier : recommandation</b></article>
        </div>
        <div className="cadence"><div><b>Chaque jour</b><span>15 appels ciblés</span></div><div><b>Chaque semaine</b><span>10 visites + 5 relances</span></div><div><b>Chaque mois</b><span>1 événement + 4 partenaires</span></div><div><b>À mesurer</b><span>Contacts → échanges → RDV → ventes</span></div></div>
      </section>

      <section className="cream-section" id="coldcall">
        <div className="section-wrap">
          <SectionTitle eyebrow="07 — Cold call" title="Le script sert à écouter, pas à réciter." text="Prépare l’ouverture et les questions, puis adapte les mots au prospect. L’objectif du premier appel est un rendez-vous de diagnostic, pas une vente forcée." />
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
          <SectionTitle eyebrow="09 — Diagnostic & closing" title="Diagnostiquer avant de proposer." text="Un bon closing rend la décision claire. Il ne cache ni le prix, ni les responsabilités, ni les limites." />
          <div className="diagnostic-grid">
            <article><span>01</span><h3>Situation</h3><p>Comment trouvez-vous vos clients aujourd’hui ? Quel volume entre chaque mois ?</p></article>
            <article><span>02</span><h3>Problème</h3><p>Où perdez-vous le plus : visibilité, qualité, rappel, présence ou closing ?</p></article>
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
        <div className="filter-row">{["Tous", "Appel", "Terrain", "Closing"].map(item => <button className={objectionFilter === item ? "active" : ""} onClick={() => setObjectionFilter(item)} key={item} type="button">{item}</button>)}</div>
        <div className="objection-list">
          {filteredObjections.map((item, index) => <details key={item.ask} open={index === 0}><summary><span>{item.type}</span><b>“{item.ask}”</b><i>+</i></summary><div className="objection-answer"><div><small>RÉPONSE</small><p>{item.answer}</p></div><div><small>RELANCE / ACTION</small><p>{item.next}</p></div><CopyButton text={`${item.ask}\n\nRéponse : ${item.answer}\n\nSuite : ${item.next}`} /></div></details>)}
        </div>
        <div className="never-do"><b>À ne jamais faire</b><span>Couper la parole · débattre · inventer une garantie · baisser le prix immédiatement · attaquer un concurrent · forcer une décision</span></div>
      </section>

      <section className="cream-section" id="livraison">
        <div className="section-wrap">
          <SectionTitle eyebrow="11 — Livrer & fidéliser" title="La rétention commence le premier jour." text="Un client reste quand il sait ce qui se passe, voit les progrès et comprend les prochaines décisions." />
          <div className="delivery-grid"><article><span>J0–J2</span><h3>Onboarding</h3><p>Objectif, accès, interlocuteurs, délais, validation et responsabilités.</p></article><article><span>SEMAINE 1</span><h3>Baseline</h3><p>Photo des chiffres avant intervention et plan d’action priorisé.</p></article><article><span>CHAQUE SEMAINE</span><h3>Signal court</h3><p>Fait, chiffre, apprentissage, blocage et action suivante.</p></article><article><span>CHAQUE MOIS</span><h3>Revue business</h3><p>Résultats, qualité commerciale, tests et recommandation du mois.</p></article></div>
          <div className="kpi-table"><div className="table-head"><span>TYPE DE SERVICE</span><span>KPI MARKETING</span><span>KPI BUSINESS</span></div><div><b>Acquisition payante</b><span>Coût par demande</span><span>RDV + ventes attribuées</span></div><div><b>Contenu vidéo</b><span>Rétention + portée locale</span><span>Demandes entrantes</span></div><div><b>Visibilité locale</b><span>Positions + actions fiche</span><span>Appels + itinéraires</span></div><div><b>Réactivation</b><span>Taux de contact</span><span>RDV + revenu récupéré</span></div><div><b>Landing + CRM</b><span>Taux de conversion</span><span>Présence + taux de vente</span></div></div>
        </div>
      </section>

      <section className="content-section" id="plan90">
        <SectionTitle eyebrow="12 — Plan 90 jours" title="Trois phases. Un seul objectif : devenir crédible." text="La première victoire n’est pas de créer un logo d’agence. C’est de pouvoir montrer une compétence, mener une conversation et délivrer ce qui a été vendu." />
        <div className="ninety-grid"><article><header><span>JOURS 1–30</span><b>FONDATIONS</b></header><ul><li>Choisir 1 service et 1 cible</li><li>Suivre la ressource officielle</li><li>Créer 1 cas test démontrable</li><li>Rédiger l’offre et le script</li><li>Constituer 100 prospects notés</li></ul><footer>Objectif : être capable d’expliquer et montrer.</footer></article><article className="gold-plan"><header><span>JOURS 31–60</span><b>CONVERSATIONS</b></header><ul><li>15 appels ciblés par jour</li><li>10 visites terrain par semaine</li><li>5 simulations de vente par semaine</li><li>5 diagnostics réels</li><li>Signer un pilote bien cadré</li></ul><footer>Objectif : obtenir une preuve terrain.</footer></article><article><header><span>JOURS 61–90</span><b>SYSTÈME</b></header><ul><li>Livrer et documenter le pilote</li><li>Créer une étude de cas honnête</li><li>Améliorer scripts et qualification</li><li>Signer 2 à 3 clients cohérents</li><li>Standardiser onboarding + reporting</li></ul><footer>Objectif : rendre l’acquisition répétable.</footer></article></div>
        <div className="pipeline-math"><span>Exemple de pilotage hebdomadaire</span><b>75 appels</b><i>→</i><b>15 échanges</b><i>→</i><b>5 RDV</b><i>→</i><b>1 client</b><small>Les ratios varient. Mesure les tiens et améliore l’étape la plus faible.</small></div>
      </section>

      <section className="dark-section plan-section" id="monagence">
        <div className="section-wrap">
          <SectionTitle eyebrow="13 — Mon plan d’agence" title="Prends une décision avant de fermer cette page." text="Remplis ces six champs. Ton plan est sauvegardé automatiquement sur cet appareil et peut être copié en un clic." />
          <div className="plan-form">
            <label>Mon service principal<input value={plan.service} onChange={e => updatePlan("service", e.target.value)} placeholder="Ex. Google Ads local" /></label>
            <label>Ma cible<input value={plan.cible} onChange={e => updatePlan("cible", e.target.value)} placeholder="Ex. garages indépendants" /></label>
            <label className="wide">Ma promesse<textarea value={plan.promesse} onChange={e => updatePlan("promesse", e.target.value)} placeholder="J’aide [cible] à [résultat] grâce à [mécanisme]." /></label>
            <label>Mon prix pilote<input value={plan.prix} onChange={e => updatePlan("prix", e.target.value)} placeholder="Ex. 750 € + budget média" /></label>
            <label>Mon volume hebdomadaire<input value={plan.volume} onChange={e => updatePlan("volume", e.target.value)} placeholder="Ex. 75 appels + 10 visites" /></label>
            <label className="wide">Ma date de lancement<input value={plan.date} onChange={e => updatePlan("date", e.target.value)} placeholder="Ex. lundi prochain à 9 h" /></label>
          </div>
          <div className="plan-output"><pre>{planText}</pre><CopyButton text={planText} label="COPIER MON PLAN" /></div>
        </div>
      </section>

      <footer className="footer"><a className="brand" href="#top"><span>F</span>ocus</a><p>Playbook SMMA · Une ressource opérationnelle, pas une promesse de résultat.</p><a href="#top">RETOUR EN HAUT ↑</a></footer>
    </main>
  );
}
