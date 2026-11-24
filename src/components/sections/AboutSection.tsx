import { useRef, type ReactNode } from 'react';
import {
  easeOut,
  motion,
  useInView,
  useMotionValue,
  useReducedMotionConfig,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight, HeartHandshake, Layers, SlidersHorizontal } from 'lucide-react';
import { profileImage } from '../../data/portfolio';
import { useSectionExitProgress } from '../../hooks/useSectionProgress';
import { scrollToTarget } from '../../hooks/useSmoothScroll';
import { useI18n } from '../../i18n/context';
import RichText from '../ui/RichText';
import { AboutBackdrop } from '../ui/SectionBackdrops';

const valueIcons = [SlidersHorizontal, Layers, HeartHandshake];

const EASE = [0.16, 1, 0.3, 1] as const;
const contentEase = [0.22, 1, 0.36, 1] as const;

const wordVariants: Variants = {
  initial: { y: '110%', rotate: 2.5 },
  visible: (delay: number) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: 0.8, delay, ease: EASE },
  }),
};

interface AboutRevealProps {
  delay?: number;
  distance?: number;
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li';
}

/** Visible as soon as the section is on screen — works with sidebar jumps into the pin. */
function AboutReveal({ delay = 0, distance = 22, children, className, as = 'div' }: AboutRevealProps) {
  const reduceMotion = useReducedMotionConfig();
  const Tag = as === 'li' ? motion.li : motion.div;

  return (
    <Tag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const MaskedWord = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] pr-[0.035em]">
    <motion.span className={`inline-block ${className}`} variants={wordVariants} custom={delay}>
      {children}
    </motion.span>
  </span>
);

export default function AboutSection() {
  const { t, lang } = useI18n();
  const { about } = t;
  const french = lang === 'fr';
  const reduceMotion = useReducedMotionConfig();
  const exit = useSectionExitProgress();
  const still = useMotionValue(0);
  const photoScale = useTransform(exit ?? still, [0, 0.42], [1, 1.055], { ease: easeOut });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.35 });

  const titleWords = about.title.split(' ');
  const accentWords = about.accent.split(' ');

  return (
    <section id="apropos" className="agency-about" aria-labelledby="agency-about-title">
      <AboutBackdrop />
      <header className="agency-about-header">
        <AboutReveal delay={0.02} distance={10}>
          <div className="agency-location">
            <img
              className="agency-about-wordmark"
              src="/brand/appsynergy-icon.png"
              alt="App Synergy"
              width={1228}
              height={272}
            />
            <motion.i
              aria-hidden="true"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              style={{ originX: 0 }}
            />
            <span>{french ? 'À propos de nous' : 'About us'}</span>
          </div>
        </AboutReveal>
      </header>

      <div className="agency-about-grid">
        <div className="agency-about-copy">
          <AboutReveal delay={0.06}>
            <motion.h2
              ref={titleRef}
              id="agency-about-title"
              initial={reduceMotion ? false : 'initial'}
              animate={reduceMotion || titleInView ? 'visible' : 'initial'}
            >
              {titleWords.map((word, i) => (
                <span key={`t-${word}-${i}`}>
                  <MaskedWord delay={0.07 * i}>{word}</MaskedWord>{' '}
                </span>
              ))}
              <em>
                {accentWords.map((word, i) => (
                  <span key={`a-${word}-${i}`}>
                    <MaskedWord delay={0.07 * (titleWords.length + i) + 0.05}>{word}</MaskedWord>
                    {i < accentWords.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </em>
            </motion.h2>
          </AboutReveal>

          <AboutReveal delay={0.12}>
            <p className="agency-about-lead">{about.description}</p>
          </AboutReveal>

          <div className="agency-about-story">
            {about.paragraphs.slice(0, 2).map((paragraph, index) => (
              <AboutReveal key={paragraph} delay={0.18 + index * 0.08}>
                <p>
                  <RichText text={paragraph} strongClassName="font-semibold text-[var(--agency-ink)]" />
                </p>
              </AboutReveal>
            ))}
          </div>

          <AboutReveal delay={0.34}>
            <motion.a
              className="agency-primary agency-about-cta"
              href="#contact"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              onClick={(event) => {
                event.preventDefault();
                scrollToTarget('#contact');
              }}
            >
              {french ? 'Parlons de votre projet' : 'Let’s discuss your project'}
              <ArrowUpRight size={20} aria-hidden="true" />
            </motion.a>
          </AboutReveal>
        </div>

        <div className="agency-about-visual">
          <AboutReveal delay={0.1} distance={28}>
            <motion.div
              className="agency-about-photo"
              initial={reduceMotion ? false : { clipPath: 'inset(10% 6% 10% 6% round 1.2rem)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 1.2rem)' }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, ease: contentEase }}
            >
              <motion.img
                src={profileImage}
                alt={
                  french
                    ? 'Deux personnes échangent autour d’un ordinateur portable'
                    : 'Two people in discussion around a laptop'
                }
                width={800}
                height={450}
                loading="lazy"
                style={exit ? { scale: photoScale } : undefined}
              />
            </motion.div>
          </AboutReveal>

          <AboutReveal delay={0.28}>
            <p className="agency-about-principle">
              <RichText text={about.paragraphs[2]} strongClassName="font-semibold text-[var(--agency-ink)]" />
            </p>
          </AboutReveal>
        </div>
      </div>

      <ul className="agency-about-values" aria-label={about.languagesLabel}>
        {about.languages.map((value, index) => {
          const Icon = valueIcons[index];
          return (
            <AboutReveal key={value} as="li" delay={0.22 + index * 0.07} distance={12}>
              <motion.span
                className="agency-about-value"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              >
                <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                {value}
              </motion.span>
            </AboutReveal>
          );
        })}
      </ul>
    </section>
  );
}
