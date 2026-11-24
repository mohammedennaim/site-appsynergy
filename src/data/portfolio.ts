import { ContactInfo, Skill, Experience, Project, Education } from '../types';

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
    items: ['Sites professionnels', 'Applications web', 'API & outils métiers', 'React', 'Angular', 'Next.js'],
    color: 'blue',
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
    items: ['Android & iOS', 'Multiplateforme', 'UX mobile', 'Flutter', 'Firebase'],
    color: 'green',
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
    items: ['Automatisation', 'Logiciels de gestion', 'Workflows', 'Cloud'],
    color: 'purple',
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
    items: ['Stratégie & contenus', 'SEO', 'Publicité digitale', 'Réseaux sociaux'],
    color: 'blue',
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
    items: ['Boutiques en ligne', 'Paiement', 'Stocks & commandes', 'Logistique'],
    color: 'green',
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
    items: ['Cadrage', 'Design', 'Développement', 'Évolution'],
    color: 'purple',
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
    type: 'Freelance',
    current: true,
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
    technologies: ['Ateliers', 'UX research', 'Stratégie digitale'],
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
    type: 'Freelance',
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
    technologies: ['Figma', 'UI/UX', 'Design system'],
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
    type: 'Freelance',
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
    technologies: ['Flutter', 'React', 'Spring Boot', 'Docker'],
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
    type: 'Freelance',
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
    technologies: ['Analytics', 'SEO', 'CI/CD'],
    skills: {
      fr: ['Évolution', 'Support', 'Croissance'],
      en: ['Evolution', 'Support', 'Growth'],
    },
  },
];

export const projects: Project[] = [
  {
    id: 'web-platform',
    title: { fr: 'Plateformes web', en: 'Web platforms' },
    category: { fr: 'Développement web', en: 'Web development' },
    description: {
      fr: 'Sites vitrines, applications web et outils métiers adaptés aux besoins des entreprises marocaines.',
      en: 'Showcase sites, web apps and business tools tailored to Moroccan companies.',
    },
    tech: ['React', 'Angular', 'Spring Boot', 'API REST'],
    color: 'blue',
    demo: 'https://appsynergy.vercel.app/#expertises',
    demoLabel: { fr: 'Nos expertises', en: 'Our services' },
    image: 'https://images.unsplash.com/photo-1759884247173-3db27f7fafef?auto=format&fit=crop&w=800&q=82',
    highlights: {
      fr: ['Sites professionnels', 'Applications web', 'API & intégrations'],
      en: ['Professional websites', 'Web applications', 'APIs & integrations'],
    },
    brandColor: '#422047',
  },
  {
    id: 'mobile-apps',
    title: { fr: 'Applications mobiles', en: 'Mobile applications' },
    category: { fr: 'Mobile', en: 'Mobile' },
    description: {
      fr: 'Applications Android et iOS centrées sur l’expérience utilisateur et les usages terrain.',
      en: 'Android and iOS apps focused on user experience and real-world usage.',
    },
    tech: ['Flutter', 'Firebase', 'Google Maps', 'UX'],
    color: 'emerald',
    demo: 'https://appsynergy.vercel.app/#expertises',
    demoLabel: { fr: 'En savoir plus', en: 'Learn more' },
    image: 'https://images.unsplash.com/photo-1792955104634-fbc480c0a800?auto=format&fit=crop&w=800&q=82',
    highlights: {
      fr: ['Android & iOS', 'Multiplateforme', 'UX mobile'],
      en: ['Android & iOS', 'Cross-platform', 'Mobile UX'],
    },
    brandColor: '#2bd44f',
  },
  {
    id: 'digital-transform',
    title: { fr: 'Transformation digitale', en: 'Digital transformation' },
    category: { fr: 'Conseil & outils', en: 'Consulting & tools' },
    description: {
      fr: 'Automatisation, logiciels de gestion et workflows pour fluidifier le quotidien des équipes.',
      en: 'Automation, management software and workflows to streamline team operations.',
    },
    tech: ['Automatisation', 'Cloud', 'Workflows', 'Dashboards'],
    color: 'purple',
    demo: 'https://appsynergy.vercel.app/#methode',
    demoLabel: { fr: 'Notre méthode', en: 'Our method' },
    image: 'https://images.unsplash.com/photo-1758691736843-90f58dce465e?auto=format&fit=crop&w=800&q=82',
    highlights: {
      fr: ['Automatisation', 'Outils métiers', 'Processus'],
      en: ['Automation', 'Business tools', 'Processes'],
    },
    brandColor: '#16b4df',
  },
  {
    id: 'marketing',
    title: { fr: 'Marketing digital', en: 'Digital marketing' },
    category: { fr: 'Stratégie & contenus', en: 'Strategy & content' },
    description: {
      fr: 'Stratégie, contenus, SEO et publicité pour renforcer la visibilité et la conversion.',
      en: 'Strategy, content, SEO and ads to strengthen visibility and conversion.',
    },
    tech: ['SEO', 'Contenus', 'Publicité', 'Analytics'],
    color: 'blue',
    demo: 'https://appsynergy.vercel.app/',
    demoLabel: { fr: 'APP SYNERGY', en: 'APP SYNERGY' },
    image: 'https://images.unsplash.com/photo-1758873268998-2f77c2d38862?auto=format&fit=crop&w=800&q=82',
    highlights: {
      fr: ['Stratégie', 'SEO', 'Campagnes digitales'],
      en: ['Strategy', 'SEO', 'Digital campaigns'],
    },
    brandColor: '#E91E63',
  },
  {
    id: 'ecommerce',
    title: { fr: 'E-commerce', en: 'E-commerce' },
    category: { fr: 'Boutiques en ligne', en: 'Online stores' },
    description: {
      fr: 'De la vitrine à la commande : paiement, stocks et expérience d’achat optimisée.',
      en: 'From storefront to checkout: payments, inventory and an optimized shopping experience.',
    },
    tech: ['E-commerce', 'Paiement', 'Logistique', 'UX'],
    color: 'emerald',
    demo: 'https://appsynergy.vercel.app/#contact',
    demoLabel: { fr: 'Discuter', en: 'Get in touch' },
    image: 'https://images.unsplash.com/photo-1769355104335-acef3aa4c9b6?auto=format&fit=crop&w=800&q=82',
    highlights: {
      fr: ['Boutiques en ligne', 'Paiement sécurisé', 'Gestion des commandes'],
      en: ['Online stores', 'Secure payments', 'Order management'],
    },
    brandColor: '#422047',
  },
];

export const education: Education[] = [
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