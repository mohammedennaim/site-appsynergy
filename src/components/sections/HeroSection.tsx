import { ArrowRight, ArrowUpRight, Mail, Laptop, Layers, Megaphone, Smartphone, ShoppingCart } from 'lucide-react';
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useInView,
  useMotionValue,
  useReducedMotionConfig,
  useTransform,
} from 'framer-motion';
import type { MotionValue, Variants } from 'framer-motion';
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { useI18n } from '../../i18n/context';
import { scrollToTarget } from '../../hooks/useSmoothScroll';
import { useSectionExitProgress } from '../../hooks/useSectionProgress';

const services = [
  { icon: Laptop, fr: 'Développement Web', en: 'Web Development', detail: 'Sites et applications performants', detailEn: 'High-performance websites & apps' },
  { icon: Smartphone, fr: 'Développement Mobile', en: 'Mobile Development', detail: 'Applications iOS & Android', detailEn: 'iOS & Android applications' },
  { icon: Layers, fr: 'Transformation Digitale', en: 'Digital Transformation', detail: 'Processus et outils sur mesure', detailEn: 'Tailored processes & tools' },
  { icon: Megaphone, fr: 'Marketing Digital', en: 'Digital Marketing', detail: 'Visibilité et croissance en ligne', detailEn: 'Online visibility & growth' },
  { icon: ShoppingCart, fr: 'E-commerce', en: 'E-commerce', detail: 'Boutiques en ligne performantes', detailEn: 'High-performance online stores' },
];

const contentEase = cubicBezier(0.22, 1, 0.36, 1);
const EASE = [0.16, 1, 0.3, 1] as const;

const copySequence: Variants = {
  initial: {},
  visible: { transition: { delayChildren: 0.28, staggerChildren: 0.09 } },
};

const servicesSequence: Variants = {
  initial: {},
  visible: { transition: { delayChildren: 0.55, staggerChildren: 0.07 } },
};

const revealItem: Variants = {
  initial: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: contentEase },
  },
};

const wordVariants: Variants = {
  initial: { y: '112%', rotate: 3 },
  visible: (delay: number) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: 0.85, delay, ease: EASE },
  }),
};

const MaskedWord = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em] pr-[0.03em]">
    <motion.span className={`inline-block ${className}`} variants={wordVariants} custom={delay}>
      {children}
    </motion.span>
  </span>
);

function HeroTicker() {
  const { lang, t } = useI18n();
  const french = lang === 'fr';
  const messages = t.hero.news;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduceMotion = useReducedMotionConfig();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const playing = inView && !hovered && !focused && !reduceMotion;
  const counter = `${String(index + 1).padStart(2, '0')} / ${String(messages.length).padStart(2, '0')}`;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [playing, messages.length]);

  return (
    <motion.div
      className="agency-location"
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: contentEase }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        className="agency-ticker-counter"
        aria-label={french ? `Message suivant (${counter})` : `Next message (${counter})`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onClick={() => setIndex((current) => (current + 1) % messages.length)}
      >
        {counter}
      </button>
      <i aria-hidden="true" />
      <div className="agency-ticker-messages" aria-hidden="true">
        {messages.map((message) => (
          <span className="invisible" key={message}>
            {message}
          </span>
        ))}
        {reduceMotion ? (
          <span>{messages[index]}</span>
        ) : (
          <AnimatePresence initial={false}>
            <motion.span
              key={index}
              initial={{ opacity: 0, y: '80%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-80%' }}
              transition={{ duration: 0.32, ease: contentEase }}
            >
              {messages[index]}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="sr-only" aria-live={playing ? 'off' : 'polite'}>
        {messages[index]}
      </span>
    </motion.div>
  );
}

interface ServiceLinkProps {
  service: (typeof services)[number];
  index: number;
  french: boolean;
  progress: MotionValue<number>;
  enabled: boolean;
}

function ServiceLink({ service, index, french, progress, enabled }: ServiceLinkProps) {
  const { icon: Icon } = service;
  const start = 0.02 + index * 0.03;
  const y = useTransform(progress, [start, start + 0.32], [0, -18 - index * 3], {
    ease: contentEase,
  });
  const opacity = useTransform(progress, [start, start + 0.38], [1, 0], {
    ease: contentEase,
  });

  return (
    <motion.a
      variants={revealItem}
      style={enabled ? { y, opacity } : undefined}
      href="#projets"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      onClick={(event) => {
        event.preventDefault();
        scrollToTarget('#projets');
      }}
    >
      <motion.span
        aria-hidden="true"
        className="agency-service-icon"
        whileHover={{ scale: 1.08, rotate: -4 }}
        transition={{ type: 'spring', stiffness: 420, damping: 18 }}
      >
        <Icon size={28} strokeWidth={1.75} />
      </motion.span>
      <span className="agency-service-copy">
        <strong>{french ? service.fr : service.en}</strong>
        <span>{french ? service.detail : service.detailEn}</span>
      </span>
    </motion.a>
  );
}

interface HeroSectionProps {
  /** Start entrance only after the loading curtain begins to lift */
  introReady?: boolean;
}

/** Layered exit lift — farther layers move more (parallax depth). */
function useExitLayer(
  progress: MotionValue<number>,
  distance: number,
  fadeEnd = 0.52,
) {
  const y = useTransform(progress, [0, 0.48], [0, -distance], { ease: contentEase });
  const opacity = useTransform(progress, [0, fadeEnd * 0.45, fadeEnd], [1, 1, 0], {
    ease: contentEase,
  });
  return { y, opacity };
}

export default function HeroSection({ introReady = true }: HeroSectionProps) {
  const { lang } = useI18n();
  const fr = lang === 'fr';
  const reduceMotion = useReducedMotionConfig();
  const sectionExit = useSectionExitProgress();
  const still = useMotionValue(0);
  const progress = sectionExit ?? still;
  const scrollOn = Boolean(sectionExit) && !reduceMotion;

  const topbar = useExitLayer(progress, 20, 0.4);
  const logo = useExitLayer(progress, 48, 0.5);
  const title = useExitLayer(progress, 36, 0.52);
  const intro = useExitLayer(progress, 24, 0.54);
  const actions = useExitLayer(progress, 14, 0.56);
  const servicesRail = useExitLayer(progress, -22, 0.42);

  const photoScale = useTransform(progress, [0, 0.55], [1, 1.12], { ease: contentEase });
  const photoX = useTransform(progress, [0, 0.55], [0, 48], { ease: contentEase });
  const photoY = useTransform(progress, [0, 0.55], [0, -12], { ease: contentEase });
  const photoOpacity = useTransform(progress, [0, 0.25, 0.55], [1, 0.92, 0.25], {
    ease: contentEase,
  });

  const show = introReady || Boolean(reduceMotion);
  const navigate = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    scrollToTarget(target);
  };

  const titleLead = fr ? ['Le', 'digital,', 'au', 'service'] : ['Digital,', 'in', 'service'];
  const titleBridge = fr ? 'de' : 'of';
  const titleAccent = fr ? 'vos ambitions.' : 'your ambitions.';

  return (
    <section className="agency-hero" aria-labelledby="agency-title">
      <div className="agency-stage">
        <motion.div
          className="agency-photo"
          role="img"
          aria-label={
            fr
              ? 'Bureau lumineux avec un ordinateur présentant le site App Synergy'
              : 'Bright desk with a laptop displaying the App Synergy website'
          }
          initial={reduceMotion ? false : { opacity: 0, x: 56, scale: 1.05 }}
          animate={show ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 56, scale: 1.05 }}
          transition={{ duration: 0.9, ease: contentEase }}
        >
          <motion.img
            src="/hero-proposition.png"
            alt=""
            width="1448"
            height="1086"
            fetchPriority="high"
            className="will-change-transform"
            style={
              scrollOn
                ? {
                    scale: photoScale,
                    x: photoX,
                    y: photoY,
                    opacity: photoOpacity,
                    originX: 0.85,
                    originY: 0.45,
                  }
                : undefined
            }
          />
        </motion.div>

        <motion.header
          className="agency-topbar"
          style={scrollOn ? { y: topbar.y, opacity: topbar.opacity } : undefined}
        >
          {show ? <HeroTicker /> : <div className="agency-location" aria-hidden="true" />}
          <motion.div
            className="agency-links"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.55, delay: show ? 0.36 : 0, ease: contentEase }}
          >
            <a href="#contact" onClick={(e) => navigate(e, '#contact')}>
              <Mail size={17} />
              Contact
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </motion.header>

        <motion.div
          className="agency-copy"
          variants={copySequence}
          initial={reduceMotion ? false : 'initial'}
          animate={show ? 'visible' : 'initial'}
        >
          <motion.img
            variants={revealItem}
            className="agency-wordmark will-change-transform"
            style={scrollOn ? { y: logo.y, opacity: logo.opacity } : undefined}
            src="/brand/appsynergy-icon.png"
            alt="App Synergy — Agence marketing digital"
            width="1228"
            height="272"
          />

          <motion.div className="agency-copy-main" variants={revealItem}>
            <motion.h1
              id="agency-title"
              className="will-change-transform"
              style={scrollOn ? { y: title.y, opacity: title.opacity } : undefined}
              initial={reduceMotion ? undefined : 'initial'}
              animate={reduceMotion ? undefined : show ? 'visible' : 'initial'}
            >
              <span className="agency-title-lead">
                {titleLead.map((word, i) => (
                  <span key={word}>
                    {i > 0 && ' '}
                    <MaskedWord delay={0.06 * i}>{word}</MaskedWord>
                  </span>
                ))}
              </span>{' '}
              <MaskedWord delay={0.06 * titleLead.length}>{titleBridge}</MaskedWord>{' '}
              <em>
                <MaskedWord delay={0.06 * titleLead.length + 0.08} className="agency-title-accent">
                  {titleAccent}
                </MaskedWord>
              </em>
            </motion.h1>

            <motion.p
              className="agency-intro will-change-transform"
              style={scrollOn ? { y: intro.y, opacity: intro.opacity } : undefined}
            >
              {fr
                ? 'Nous concevons des solutions web et mobile sur mesure et accompagnons les entreprises dans leur transformation digitale, leur marketing et leur commerce en ligne.'
                : 'We create tailored web and mobile solutions and support businesses in their digital transformation, marketing and online commerce.'}
            </motion.p>
          </motion.div>

          <motion.div
            variants={revealItem}
            className="agency-actions will-change-transform"
            style={scrollOn ? { y: actions.y, opacity: actions.opacity } : undefined}
          >
            <motion.a
              className="agency-primary"
              href="#projets"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              onClick={(e) => navigate(e, '#projets')}
            >
              {fr ? 'Découvrir nos expertises' : 'Explore our expertise'}
              <ArrowRight size={21} />
            </motion.a>
            <motion.a
              className="agency-secondary"
              href="#contact"
              whileHover={{ x: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              onClick={(e) => navigate(e, '#contact')}
            >
              {fr ? 'Parlons de votre projet' : 'Let’s discuss your project'}
              <ArrowUpRight size={21} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.nav
        className="agency-services will-change-transform"
        aria-label={fr ? 'Nos expertises' : 'Our expertise'}
        variants={servicesSequence}
        initial={reduceMotion ? false : 'initial'}
        animate={show ? 'visible' : 'initial'}
        style={scrollOn ? { y: servicesRail.y, opacity: servicesRail.opacity } : undefined}
      >
        {services.map((service, index) => (
          <ServiceLink
            key={service.en}
            service={service}
            index={index}
            french={fr}
            progress={progress}
            enabled={scrollOn}
          />
        ))}
      </motion.nav>
    </section>
  );
}
