const fr = {
  meta: {
    title: 'APP SYNERGY',
    description:
      'APP SYNERGY accompagne les entreprises dans le développement web, mobile, e-commerce, marketing et transformation digitale au Maroc.',
  },
  language: {
    label: 'Langue',
    switchTo: 'Switch to English',
  },
  nav: {
    home: 'Accueil',
    about: 'À propos',
    skills: 'Expertises',
    experience: 'Méthode',
    projects: 'Réalisations',
    caseQarib: 'Qarib',
    caseArova: 'AROVA',
    vision: 'Vision',
    contact: 'Contact',
    backHome: "Retour à l'accueil",
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    menu: 'Menu',
    mainNav: 'Navigation principale',
    backToTop: 'Retour en haut',
  },
  loading: {
    status: 'Chargement APP SYNERGY',
    steps: ['Initialisation', 'Chargement des ressources', "Préparation de l'interface", 'Bienvenue'],
    morning: 'Bonjour',
    evening: 'Bonsoir',
  },
  hero: {
    srTitle: 'APP SYNERGY, agence marketing digital au Maroc',
    news: [
      'Agence digitale basée au Maroc',
      'Web, mobile & stratégie digitale',
      'Six expertises complémentaires',
      'Le digital qui fait avancer',
    ],
    portraitAlt: 'Collaboration autour d’un projet digital',
  },
  about: {
    title: 'À propos',
    accent: 'de nous.',
    description:
      'APP SYNERGY accompagne les entreprises marocaines dans la conception de solutions web et mobiles, leur transformation digitale, leur marketing digital et leur e-commerce.',
    paragraphs: [
      'Nous concevons des solutions **sur mesure**, adaptées aux vrais besoins du terrain : sites, applications, outils métiers et boutiques en ligne performantes.',
      'Notre démarche associe **compréhension des enjeux**, **expertise technique** et **attention portée à l’expérience utilisateur** pour des livrables clairs et durables.',
      'Une solution digitale réussie n’est pas seulement belle : elle est **utile**, **claire** et **faite pour durer**.',
    ],
    languagesLabel: 'Valeurs',
    languages: ['Sur mesure', 'Complémentarité', 'Expérience humaine'],
  },
  skills: {
    title: 'Nos',
    accent: 'expertises.',
    description:
      'Six domaines complémentaires pour construire votre présence digitale, simplifier votre quotidien et soutenir votre développement.',
    count: (n: number) => `${n} capacités`,
    domain: 'Domaine',
    focus: 'Ce que l’on livre',
    stack: 'Capacités',
  },
  experience: {
    title: 'Notre',
    accent: 'approche.',
    description:
      'De la première discussion aux évolutions futures : une collaboration structurée, transparente et orientée vers les besoins du projet.',
    missions: 'Missions',
  },
  projects: {
    title: 'Nos',
    accent: 'univers.',
    description:
      'Des réalisations concrètes — web, mobile, transformation, marketing et e-commerce — pour faire avancer vos ambitions digitales.',
    panelLabel: (title: string) => `Projet ${title}`,
    details: 'Détails',
    stack: 'Stack',
    screenAlt: (title: string, n: number) => `${title} — écran ${n}`,
  },
  anatomy: {
    qarib: {
      label: 'Vue éclatée · Qarib',
      title: ['Une app publiée,', 'démontée pièce par pièce.'],
      hint: 'Faites défiler pour démonter',
      intro: 'Qarib est en ligne sur l’App Store et le Play Store. Voici son parcours, étape par étape : de la connexion jusqu’aux notifications en temps réel.',
      layers: [
        { name: 'Connexion', tech: 'Firebase Auth', text: 'Tout commence ici : connexion sécurisée, comptes client ou prestataire, sessions persistantes.' },
        { name: 'Carte des prestataires', tech: 'Google Maps', text: 'Les prestataires à proximité, positionnés en temps réel autour de l’utilisateur.' },
        { name: 'Service & demande', tech: 'Flutter', text: 'La fiche du prestataire, ses réalisations en photo, et la demande envoyée en un geste.' },
        { name: 'Suivi des commandes', tech: 'Dart', text: 'Le cycle de vie de chaque demande : en attente, acceptée ou annulée, selon le rôle de chacun.' },
        { name: 'Notifications temps réel', tech: 'Firestore · FCM', text: 'Chaque changement se synchronise instantanément et arrive en notification push.' },
      ],
    },
    arova: {
      label: 'Vue éclatée · AROVA',
      title: ['Un achat de meuble,', 'démonté étape par étape.'],
      hint: 'Faites défiler pour démonter',
      intro: 'AROVA aide le client à se projeter avant d’acheter un meuble. Voici son parcours : de la connexion jusqu’à l’assistant qui conseille.',
      layers: [
        { name: 'Connexion', tech: 'Flutter', text: 'Une entrée sobre et rassurante : connexion par e-mail, inscription en quelques secondes.' },
        { name: 'Catalogue & filtres', tech: 'Recherche', text: 'Tout le mobilier, filtré par pièce, catégorie et style, avec la recherche intégrée.' },
        { name: 'Fiche produit', tech: 'AR · 3D', text: 'Photos, dimensions, matières et prix : la base pour visualiser le meuble chez soi en réalité augmentée.' },
        { name: 'Panier & paiement', tech: 'Checkout', text: 'Panier, récapitulatif, livraison et paiement en un parcours fluide jusqu’à la confirmation.' },
        { name: 'Suivi de livraison', tech: 'Carte', text: 'La commande suivie sur la carte, étape par étape, jusqu’à la porte du client.' },
        { name: 'Assistant IA', tech: 'IA', text: 'Un conseiller qui recommande des meubles selon le besoin, le budget et le style du client.' },
      ],
    },
  },
  vision: {
    title: 'Pourquoi',
    accent: 'nous.',
    description:
      'Ce qui compte, c’est ce que le digital change pour vous : des solutions sur mesure, complémentaires et pensées pour les humains.',
    status: { done: 'Valeur clé' },
    today: 'Notre cap',
    chapters: ['Adaptation', 'Complémentarité', 'Expérience humaine'],
    previous: 'Valeur précédente',
    next: 'Valeur suivante',
  },
  contact: {
    eyebrow: 'Contact · APP SYNERGY',
    title: 'Parlons de',
    accent: 'votre projet.',
    description:
      'Un site à créer, une application à développer ou une présence digitale à renforcer ? Racontez-nous votre idée.',
    mailSubject: 'Projet — APP SYNERGY',
    copy: 'Copier',
    copied: 'Copié',
    copyLabel: "Copier l'adresse email",
    copiedLabel: 'Adresse email copiée',
    relocation: 'Maroc',
    localTime: 'heure locale',
    response: 'Réponse sous 24 h',
    rights: 'Tous droits réservés.',
    cursor: { write: 'Écrire', profile: 'Profil', code: 'Code', chat: 'Chat', call: 'Appeler' },
  },
};

export type UI = typeof fr;

const en: UI = {
  meta: {
    title: 'APP SYNERGY',
    description:
      'APP SYNERGY helps businesses with web, mobile, e-commerce, marketing and digital transformation in Morocco.',
  },
  language: {
    label: 'Language',
    switchTo: 'Passer en français',
  },
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Expertise',
    experience: 'Method',
    projects: 'Work',
    caseQarib: 'Qarib',
    caseArova: 'AROVA',
    vision: 'Vision',
    contact: 'Contact',
    backHome: 'Back to home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    mainNav: 'Main navigation',
    backToTop: 'Back to top',
  },
  loading: {
    status: 'Loading APP SYNERGY',
    steps: ['Initializing', 'Loading assets', 'Preparing the interface', 'Welcome'],
    morning: 'Good morning',
    evening: 'Good evening',
  },
  hero: {
    srTitle: 'APP SYNERGY, digital agency in Morocco',
    news: [
      'Digital agency based in Morocco',
      'Web, mobile & digital strategy',
      'Six complementary expertise areas',
      'Digital that moves you forward',
    ],
    portraitAlt: 'Team collaborating on a digital project',
  },
  about: {
    title: 'About',
    accent: 'us.',
    description:
      'APP SYNERGY helps Moroccan companies build web and mobile solutions, transform their operations, and grow through digital marketing and e-commerce.',
    paragraphs: [
      'We build **tailored solutions** for real business needs: websites, apps, business tools and high-performance online stores.',
      'Our approach combines **understanding your challenges**, **technical expertise** and **focus on user experience** for clear, lasting outcomes.',
      'A successful digital solution is not only beautiful: it is **useful**, **clear** and **built to last**.',
    ],
    languagesLabel: 'Values',
    languages: ['Custom fit', 'Complementarity', 'Human experience'],
  },
  skills: {
    title: 'Our',
    accent: 'expertise.',
    description:
      'Six complementary areas to build your digital presence, simplify operations and support growth.',
    count: (n: number) => `${n} capabilities`,
    domain: 'Domain',
    focus: 'What we deliver',
    stack: 'Capabilities',
  },
  experience: {
    title: 'Our',
    accent: 'approach.',
    description:
      'From the first conversation to future iterations: structured, transparent collaboration focused on project needs.',
    missions: 'Responsibilities',
  },
  projects: {
    title: 'Our',
    accent: 'focus areas.',
    description:
      'Concrete work across web, mobile, transformation, marketing and e-commerce — built to move your digital ambitions forward.',
    panelLabel: (title: string) => `Project ${title}`,
    details: 'Details',
    stack: 'Stack',
    screenAlt: (title: string, n: number) => `${title} — screen ${n}`,
  },
  anatomy: {
    qarib: {
      label: 'Exploded view · Qarib',
      title: ['A shipped app,', 'taken apart piece by piece.'],
      hint: 'Scroll to take it apart',
      intro: 'Qarib is live on the App Store and the Play Store. Here is its journey, step by step: from sign-in to real-time notifications.',
      layers: [
        { name: 'Sign-in', tech: 'Firebase Auth', text: 'Where it all starts: secure sign-in, customer or provider accounts, persistent sessions.' },
        { name: 'Provider map', tech: 'Google Maps', text: 'Nearby providers, placed in real time around the user.' },
        { name: 'Service & request', tech: 'Flutter', text: 'The provider’s profile, photos of past work, and a request sent in one tap.' },
        { name: 'Order tracking', tech: 'Dart', text: 'Each request’s lifecycle: pending, accepted or cancelled, depending on each role.' },
        { name: 'Real-time notifications', tech: 'Firestore · FCM', text: 'Every change syncs instantly and lands as a push notification.' },
      ],
    },
    arova: {
      label: 'Exploded view · AROVA',
      title: ['A furniture purchase,', 'taken apart step by step.'],
      hint: 'Scroll to take it apart',
      intro: 'AROVA helps customers picture a piece of furniture before buying it. Here is its journey: from sign-in to the assistant that gives advice.',
      layers: [
        { name: 'Sign-in', tech: 'Flutter', text: 'A calm, reassuring entry: email sign-in and sign-up in a few seconds.' },
        { name: 'Catalog & filters', tech: 'Search', text: 'Every piece of furniture, filtered by room, category and style, with built-in search.' },
        { name: 'Product page', tech: 'AR · 3D', text: 'Photos, dimensions, materials and price: the base for placing the piece at home in augmented reality.' },
        { name: 'Cart & checkout', tech: 'Checkout', text: 'Cart, summary, delivery and payment in one smooth flow, all the way to confirmation.' },
        { name: 'Delivery tracking', tech: 'Map', text: 'The order tracked on the map, step by step, right to the customer’s door.' },
        { name: 'AI assistant', tech: 'AI', text: 'An advisor that recommends furniture based on the customer’s needs, budget and style.' },
      ],
    },
  },
  vision: {
    title: 'Why',
    accent: 'us.',
    description:
      'What matters is what digital changes for you: custom solutions that work together and put people first.',
    status: { done: 'Core value' },
    today: 'Our compass',
    chapters: ['Adaptation', 'Complementarity', 'Human experience'],
    previous: 'Previous value',
    next: 'Next value',
  },
  contact: {
    eyebrow: 'Contact · APP SYNERGY',
    title: "Let's talk",
    accent: 'about your project.',
    description:
      'Need a website, an app or a stronger digital presence? Tell us about your idea.',
    mailSubject: 'Project — APP SYNERGY',
    copy: 'Copy',
    copied: 'Copied',
    copyLabel: 'Copy email address',
    copiedLabel: 'Email address copied',
    relocation: 'Morocco',
    localTime: 'local time',
    response: 'Reply within 24 h',
    rights: 'All rights reserved.',
    cursor: { write: 'Write', profile: 'Profile', code: 'Code', chat: 'Chat', call: 'Call' },
  },
};

export const ui = { fr, en };
