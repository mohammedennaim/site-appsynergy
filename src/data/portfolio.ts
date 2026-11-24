import { ContactInfo, Skill, Experience, Project, VisionPrinciple } from '../types';

export const contactInfo: ContactInfo = {
  email: 'contact@appsynergy.ma',
  phone: '+212 772 113 206',
  location: { fr: 'Maroc', en: 'Morocco' },
  linkedin: 'https://www.linkedin.com/company/appsynergy',
  facebook: 'https://www.facebook.com/appsynergy',
  instagram: 'https://www.instagram.com/appsynergy',
};

export const profileImage = '/hero-collaboration.webp';

export const skills: Skill[] = [
  {
    id: 'web',
    name: { fr: 'Développement web', en: 'Web development' },
    description: {
      fr: 'Sites, plateformes et outils métiers conçus pour aller au-delà de la simple présence en ligne.',
      en: 'Websites, platforms and business tools designed to go beyond a simple online presence.',
    },
    highlights: [
      { fr: 'Architecture claire, évolutive et maintenable', en: 'Clear, scalable and maintainable architecture' },
      { fr: 'Interfaces rapides, accessibles et responsives', en: 'Fast, accessible and responsive interfaces' },
      { fr: 'Intégration API et outils métiers existants', en: 'Integration with APIs and existing business tools' },
    ],
    items: [
      { fr: 'Sites professionnels', en: 'Professional websites' },
      { fr: 'Applications web', en: 'Web applications' },
      { fr: 'API & outils métiers', en: 'APIs & business tools' },
      { fr: 'React', en: 'React' },
      { fr: 'Angular', en: 'Angular' },
      { fr: 'Next.js', en: 'Next.js' },
    ],
    color: 'copper',
  },
  {
    id: 'mobile',
    name: { fr: 'Applications mobiles', en: 'Mobile apps' },
    description: {
      fr: 'Expériences Android et iOS intuitives, conçues pour les usages réels de vos utilisateurs.',
      en: 'Intuitive Android and iOS experiences built for how your users actually work.',
    },
    highlights: [
      { fr: 'Parcours pensés pour les usages terrain', en: 'Journeys designed for real-world usage' },
      { fr: 'Publication App Store et Play Store', en: 'App Store and Play Store publishing' },
      { fr: 'Synchronisation et notifications temps réel', en: 'Realtime sync and push notifications' },
    ],
    items: [
      { fr: 'Android & iOS', en: 'Android & iOS' },
      { fr: 'Multiplateforme', en: 'Cross-platform' },
      { fr: 'UX mobile', en: 'Mobile UX' },
      { fr: 'Flutter', en: 'Flutter' },
      { fr: 'Firebase', en: 'Firebase' },
    ],
    color: 'warm',
  },
  {
    id: 'transformation',
    name: { fr: 'Transformation digitale', en: 'Digital transformation' },
    description: {
      fr: 'Moins de tâches répétitives, plus de fluidité grâce à des logiciels et processus adaptés.',
      en: 'Fewer repetitive tasks and smoother workflows through tailored software and processes.',
    },
    highlights: [
      { fr: 'Diagnostic des process et des frictions', en: 'Process and friction diagnostics' },
      { fr: 'Automatisation des tâches à faible valeur', en: 'Automation of low-value tasks' },
      { fr: 'Outils de gestion adaptés à vos équipes', en: 'Management tools tailored to your teams' },
    ],
    items: [
      { fr: 'Automatisation', en: 'Automation' },
      { fr: 'Logiciels de gestion', en: 'Management software' },
      { fr: 'Workflows', en: 'Workflows' },
      { fr: 'Cloud', en: 'Cloud' },
    ],
    color: 'ink',
  },
  {
    id: 'marketing',
    name: { fr: 'Marketing digital', en: 'Digital marketing' },
    description: {
      fr: 'Communication plus lisible, présence renforcée et actions guidées par les résultats.',
      en: 'Clearer messaging, stronger presence and actions driven by measurable outcomes.',
    },
    highlights: [
      { fr: 'Positionnement et messages plus clairs', en: 'Clearer positioning and messaging' },
      { fr: 'Visibilité organique et campagnes ciblées', en: 'Organic visibility and targeted campaigns' },
      { fr: 'Suivi des performances et itérations', en: 'Performance tracking and iteration' },
    ],
    items: [
      { fr: 'Stratégie & contenus', en: 'Strategy & content' },
      { fr: 'SEO', en: 'SEO' },
      { fr: 'Publicité digitale', en: 'Digital ads' },
      { fr: 'Réseaux sociaux', en: 'Social media' },
    ],
    color: 'copper',
  },
  {
    id: 'ecommerce',
    name: { fr: 'E-commerce', en: 'E-commerce' },
    description: {
      fr: 'Boutiques en ligne pensées pour simplifier la vente et améliorer l’expérience d’achat.',
      en: 'Online stores built to simplify sales and improve the shopping experience.',
    },
    highlights: [
      { fr: 'Parcours d’achat fluide jusqu’au paiement', en: 'Smooth purchase flow through checkout' },
      { fr: 'Gestion stocks, commandes et livraisons', en: 'Stock, order and delivery management' },
      { fr: 'Expérience mobile-first pour convertir', en: 'Mobile-first experience built to convert' },
    ],
    items: [
      { fr: 'Boutiques en ligne', en: 'Online stores' },
      { fr: 'Paiement', en: 'Payments' },
      { fr: 'Stocks & commandes', en: 'Stock & orders' },
      { fr: 'Logistique', en: 'Logistics' },
    ],
    color: 'warm',
  },
  {
    id: 'method',
    name: { fr: 'Méthode & accompagnement', en: 'Method & support' },
    description: {
      fr: 'Collaboration structurée, transparente et orientée vers les besoins réels de chaque projet.',
      en: 'Structured, transparent collaboration focused on each project’s real needs.',
    },
    highlights: [
      { fr: 'Cadrage partagé dès le premier échange', en: 'Shared framing from the first conversation' },
      { fr: 'Livraisons itératives et feedback continu', en: 'Iterative deliveries and continuous feedback' },
      { fr: 'Accompagnement après la mise en ligne', en: 'Support after launch' },
    ],
    items: [
      { fr: 'Cadrage', en: 'Scoping' },
      { fr: 'Design', en: 'Design' },
      { fr: 'Développement', en: 'Development' },
      { fr: 'Évolution', en: 'Evolution' },
    ],
    color: 'ink',
  },
];

export const experiences: Experience[] = [
  {
    company: 'APP SYNERGY',
    position: { fr: 'Écouter et comprendre', en: 'Listen and understand' },
    period: { fr: 'Étape 01', en: 'Step 01' },
    location: 'Maroc',
    description: {
      fr: 'Nous clarifions vos objectifs, vos contraintes et les attentes de vos utilisateurs avant de proposer une solution.',
      en: 'We clarify your goals, constraints and user expectations before proposing a solution.',
    },
    color: 'emerald',
    tasks: {
      fr: [
        'Ateliers de cadrage et définition du périmètre',
        'Analyse des enjeux métier et des usages',
        'Recommandations techniques et budgétaires',
      ],
      en: [
        'Scoping workshops and defining scope',
        'Business and usage analysis',
        'Technical and budget recommendations',
      ],
    },
    technologies: [
      { fr: 'Ateliers', en: 'Workshops' },
      { fr: 'UX research', en: 'UX research' },
      { fr: 'Stratégie digitale', en: 'Digital strategy' },
    ],
    skills: {
      fr: ['Écoute', 'Cadrage', 'Conseil'],
      en: ['Listening', 'Scoping', 'Consulting'],
    },
  },
  {
    company: 'APP SYNERGY',
    position: { fr: 'Concevoir avec intention', en: 'Design with intent' },
    period: { fr: 'Étape 02', en: 'Step 02' },
    location: 'Maroc',
    description: {
      fr: 'Architecture, ergonomie et identité visuelle : les choix de conception répondent à des usages précis.',
      en: 'Architecture, ergonomics and visual identity: design choices aligned with real usage.',
    },
    color: 'blue',
    tasks: {
      fr: [
        'Maquettes et parcours utilisateur',
        'Identité visuelle et charte',
        'Prototypage et validation',
      ],
      en: [
        'Wireframes and user journeys',
        'Visual identity and brand guidelines',
        'Prototyping and validation',
      ],
    },
    technologies: [
      { fr: 'Figma', en: 'Figma' },
      { fr: 'UI/UX', en: 'UI/UX' },
      { fr: 'Design system', en: 'Design system' },
    ],
    skills: {
      fr: ['Design', 'UX', 'Identité'],
      en: ['Design', 'UX', 'Brand'],
    },
  },
  {
    company: 'APP SYNERGY',
    position: { fr: 'Développer avec exigence', en: 'Build with care' },
    period: { fr: 'Étape 03', en: 'Step 03' },
    location: 'Maroc',
    description: {
      fr: 'Performance, sécurité et qualité technique au cœur de chaque livraison.',
      en: 'Performance, security and technical quality at the heart of every delivery.',
    },
    color: 'purple',
    tasks: {
      fr: [
        'Développement web et mobile',
        'Intégration des outils métiers',
        'Tests, déploiement et suivi',
      ],
      en: [
        'Web and mobile development',
        'Business tool integration',
        'Testing, deployment and monitoring',
      ],
    },
    technologies: [
      { fr: 'Flutter', en: 'Flutter' },
      { fr: 'React', en: 'React' },
      { fr: 'Spring Boot', en: 'Spring Boot' },
      { fr: 'Docker', en: 'Docker' },
    ],
    skills: {
      fr: ['Qualité', 'Sécurité', 'Performance'],
      en: ['Quality', 'Security', 'Performance'],
    },
  },
  {
    company: 'APP SYNERGY',
    position: { fr: 'Faire évoluer', en: 'Iterate and grow' },
    period: { fr: 'Étape 04', en: 'Step 04' },
    location: 'Maroc',
    description: {
      fr: 'Des projets pensés pour s’adapter à de nouveaux besoins et à de nouvelles ambitions.',
      en: 'Projects designed to adapt to new needs and ambitions over time.',
    },
    color: 'emerald',
    tasks: {
      fr: [
        'Maintenance et évolutions fonctionnelles',
        'Optimisation marketing et SEO',
        'Accompagnement long terme',
      ],
      en: [
        'Maintenance and feature evolution',
        'Marketing and SEO optimization',
        'Long-term support',
      ],
    },
    technologies: [
      { fr: 'Analytics', en: 'Analytics' },
      { fr: 'SEO', en: 'SEO' },
      { fr: 'CI/CD', en: 'CI/CD' },
    ],
    skills: {
      fr: ['Évolution', 'Support', 'Croissance'],
      en: ['Evolution', 'Support', 'Growth'],
    },
  },
];

/** Réalisations aligned 1:1 with Nos expertises (same wording, real product screens). */
export const projects: Project[] = [
  {
    id: 'web',
    title: { fr: 'Développement web', en: 'Web development' },
    category: { fr: 'Site & plateforme', en: 'Website & platform' },
    description: {
      fr: 'Sites, plateformes et outils métiers conçus pour aller au-delà de la simple présence en ligne.',
      en: 'Websites, platforms and business tools designed to go beyond a simple online presence.',
    },
    tech: ['Angular', 'React', 'Next.js', 'API REST'],
    color: 'copper',
    image: '/projects/assureflow/hero.webp',
    highlights: {
      fr: ['Sites professionnels', 'Applications web', 'API & outils métiers'],
      en: ['Professional websites', 'Web applications', 'APIs & business tools'],
    },
    details: {
      fr: [
        'Architecture claire, évolutive et maintenable',
        'Interfaces rapides, accessibles et responsives',
        'Intégration API et outils métiers existants',
        'Exemple : plateforme AssureFlow (souscription, offres, espace client)',
      ],
      en: [
        'Clear, scalable and maintainable architecture',
        'Fast, accessible and responsive interfaces',
        'Integration with APIs and existing business tools',
        'Example: AssureFlow platform (subscription, offers, client area)',
      ],
    },
    brandColor: '#1a5b8e',
  },
  {
    id: 'mobile',
    title: { fr: 'Applications mobiles', en: 'Mobile apps' },
    category: { fr: 'Android & iOS', en: 'Android & iOS' },
    description: {
      fr: 'Expériences Android et iOS intuitives, conçues pour les usages réels de vos utilisateurs.',
      en: 'Intuitive Android and iOS experiences built for how your users actually work.',
    },
    tech: ['Flutter', 'Firebase', 'Google Maps', 'UX mobile'],
    color: 'warm',
    image: '/projects/qarib/map.webp',
    screens: [
      '/projects/qarib/login.webp',
      '/projects/qarib/map.webp',
      '/projects/qarib/service.webp',
      '/projects/qarib/orders.webp',
      '/projects/qarib/notifications.webp',
    ],
    highlights: {
      fr: ['Android & iOS', 'Multiplateforme', 'UX mobile'],
      en: ['Android & iOS', 'Cross-platform', 'Mobile UX'],
    },
    details: {
      fr: [
        'Parcours pensés pour les usages terrain',
        'Publication App Store et Play Store',
        'Synchronisation et notifications temps réel',
        'Exemple : Qarib (carte, demandes, notifications)',
      ],
      en: [
        'Journeys designed for real-world usage',
        'App Store and Play Store publishing',
        'Realtime sync and push notifications',
        'Example: Qarib (map, requests, notifications)',
      ],
    },
    brandColor: '#88482e',
  },
  {
    id: 'transformation',
    title: { fr: 'Transformation digitale', en: 'Digital transformation' },
    category: { fr: 'Conseil & outils', en: 'Consulting & tools' },
    description: {
      fr: 'Moins de tâches répétitives, plus de fluidité grâce à des logiciels et processus adaptés.',
      en: 'Fewer repetitive tasks and smoother workflows through tailored software and processes.',
    },
    tech: ['Automatisation', 'Cloud', 'Workflows', 'Dashboards'],
    color: 'ink',
    image: '/hero-proposition.png',
    highlights: {
      fr: ['Automatisation', 'Logiciels de gestion', 'Workflows'],
      en: ['Automation', 'Management software', 'Workflows'],
    },
    details: {
      fr: [
        'Diagnostic des process et des frictions',
        'Automatisation des tâches à faible valeur',
        'Outils de gestion adaptés à vos équipes',
        'Accompagnement à l’adoption et au suivi',
      ],
      en: [
        'Process and friction diagnostics',
        'Automation of low-value tasks',
        'Management tools tailored to your teams',
        'Adoption support and follow-up',
      ],
    },
    brandColor: '#5c534b',
  },
  {
    id: 'marketing',
    title: { fr: 'Marketing digital', en: 'Digital marketing' },
    category: { fr: 'Stratégie & contenus', en: 'Strategy & content' },
    description: {
      fr: 'Communication plus lisible, présence renforcée et actions guidées par les résultats.',
      en: 'Clearer messaging, stronger presence and actions driven by measurable outcomes.',
    },
    tech: ['SEO', 'Contenus', 'Publicité', 'Analytics'],
    color: 'copper',
    image: '/hero-collaboration.webp',
    highlights: {
      fr: ['Stratégie & contenus', 'SEO', 'Publicité digitale'],
      en: ['Strategy & content', 'SEO', 'Digital ads'],
    },
    details: {
      fr: [
        'Positionnement et messages plus clairs',
        'Visibilité organique et campagnes ciblées',
        'Suivi des performances et itérations',
        'Contenus utiles pour le web et les réseaux',
      ],
      en: [
        'Clearer positioning and messaging',
        'Organic visibility and targeted campaigns',
        'Performance tracking and iteration',
        'Useful content for web and social channels',
      ],
    },
    brandColor: '#995733',
  },
  {
    id: 'ecommerce',
    title: { fr: 'E-commerce', en: 'E-commerce' },
    category: { fr: 'Boutiques en ligne', en: 'Online stores' },
    description: {
      fr: 'Boutiques en ligne pensées pour simplifier la vente et améliorer l’expérience d’achat.',
      en: 'Online stores built to simplify sales and improve the shopping experience.',
    },
    tech: ['Flutter', 'Checkout', 'AR · 3D', 'Logistique'],
    color: 'warm',
    image: '/projects/arova/product.webp',
    screens: [
      '/projects/arova/login.webp',
      '/projects/arova/catalog.webp',
      '/projects/arova/product.webp',
      '/projects/arova/cart.webp',
      '/projects/arova/tracking.webp',
      '/projects/arova/assistant.webp',
    ],
    highlights: {
      fr: ['Boutiques en ligne', 'Paiement', 'Stocks & commandes'],
      en: ['Online stores', 'Payments', 'Stock & orders'],
    },
    details: {
      fr: [
        'Parcours d’achat fluide jusqu’au paiement',
        'Gestion stocks, commandes et livraisons',
        'Expérience mobile-first pour convertir',
        'Exemple : AROVA (catalogue, panier, suivi)',
      ],
      en: [
        'Smooth purchase flow through checkout',
        'Stock, order and delivery management',
        'Mobile-first experience built to convert',
        'Example: AROVA (catalog, cart, tracking)',
      ],
    },
    brandColor: '#b8734d',
  },
];

export const visionPrinciples: VisionPrinciple[] = [
  {
    institution: 'APP SYNERGY',
    degree: { fr: 'Sur mesure, vraiment', en: 'Truly custom' },
    period: '01',
    description: {
      fr: 'Chaque activité a ses propres enjeux. La solution doit s’y adapter, et non l’inverse.',
      en: 'Every business has its own challenges. The solution should adapt to them, not the other way around.',
    },
  },
  {
    institution: 'APP SYNERGY',
    degree: { fr: 'Une vision d’ensemble', en: 'A holistic view' },
    period: '02',
    description: {
      fr: 'Web, mobile, marketing et commerce en ligne se renforcent quand ils sont pensés ensemble.',
      en: 'Web, mobile, marketing and e-commerce work best when designed as one ecosystem.',
    },
  },
  {
    institution: 'APP SYNERGY',
    degree: { fr: 'Fait pour les humains', en: 'Built for people' },
    period: '03',
    description: {
      fr: 'Des expériences claires, fluides et accessibles — pas seulement des interfaces à la mode.',
      en: 'Clear, smooth and accessible experiences — not just trendy interfaces.',
    },
  },
];
