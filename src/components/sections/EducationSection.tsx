import { FC, useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useTransform, type MotionValue } from 'framer-motion';
import { ArrowLeft, ArrowRight, HeartHandshake, Layers, SlidersHorizontal, type LucideIcon } from 'lucide-react';
import { education } from '../../data/portfolio';
import { useScrollSteps } from '../../hooks/useScrollReveal';
import { useI18n, type I18n } from '../../i18n/context';
import { EducationBackdrop } from '../ui/SectionBackdrops';

interface Stage {
  key: string;
  searchId: string;
  year: string;
  chapter: string;
  title: string;
  school: string;
  period: string;
  description?: string;
  icon: LucideIcon;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const stageIcons = [SlidersHorizontal, Layers, HeartHandshake];
const pad = (n: number) => String(n).padStart(2, '0');

const buildStages = ({ pick, t }: I18n): Stage[] =>
  education.map((edu, index) => ({
    key: `${edu.institution}-${edu.period}`,
    searchId: `education-${edu.institution}-${edu.period}`,
    year: edu.period.match(/\d{4}/)?.[0] ?? edu.period,
    chapter: t.education.chapters[index] ?? '',
    title: pick(edu.degree),
    school: edu.institution,
    period: edu.period,
    description: edu.description && pick(edu.description),
    icon: stageIcons[index] ?? Layers,
  }));

const EducationSection: FC = () => {
  const i18n = useI18n();
  const { t, lang } = i18n;
  const stages = buildStages(i18n);
  const french = lang === 'fr';

  return (
    <section id="formation" className="agency-vision" aria-labelledby="vision-title">
      <EducationBackdrop />
      <header className="vision-header">
        <div className="agency-location vision-brand">
          <img
            className="agency-about-wordmark"
            src="/brand/appsynergy-icon.png"
            alt="App Synergy"
            width={1228}
            height={272}
          />
          <i aria-hidden="true" />
          <span>{french ? 'Notre vision' : 'Our vision'}</span>
        </div>

        <div className="vision-header-copy">
          <h2 id="vision-title">
            {t.education.title} <em>{t.education.accent}</em>
          </h2>
          <p>{t.education.description}</p>
        </div>
      </header>

      <TimelineSlider stages={stages} />
    </section>
  );
};

const TimelineSlider: FC<{ stages: Stage[] }> = ({ stages }) => {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const direction = useRef(1);

  const go = useCallback((index: number) => {
    setActive((current) => {
      direction.current = index >= current ? 1 : -1;
      return index;
    });
  }, []);

  const { position } = useScrollSteps(stages.length, go, { pinnedOnly: true });
  const stage = stages[active];
  const previous = stages[active - 1];
  const next = stages[active + 1];

  return (
    <div className="vision-body">
      <div className="vision-stage">
        <div className="vision-copy">
          <AnimatePresence mode="wait" initial={false} custom={direction.current}>
            <motion.div
              key={stage.key}
              data-search-id={stage.searchId}
              custom={direction.current}
              variants={{
                enter: (d: number) => ({ opacity: 0, y: 28 * d }),
                center: { opacity: 1, y: 0 },
                exit: (d: number) => ({ opacity: 0, y: -28 * d }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASE }}
            >
              <StageSlide stage={stage} index={active} total={stages.length} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="vision-medallion-wrap">
          <Medallion stage={stage} active={active} />
        </div>
      </div>

      <div className="vision-nav">
        <NeighbourButton
          label={t.education.previous}
          year={previous?.year}
          onClick={() => previous && go(active - 1)}
          side="left"
        />
        <TimelineAxis stages={stages} active={active} position={position} onSelect={go} />
        <NeighbourButton
          label={t.education.next}
          year={next?.year}
          onClick={() => next && go(active + 1)}
          side="right"
        />
      </div>
    </div>
  );
};

const StageSlide: FC<{ stage: Stage; index: number; total: number }> = ({ stage, index, total }) => {
  const { t } = useI18n();

  return (
    <article className="vision-slide">
      <div className="vision-meta">
        <span className="vision-index">
          {pad(index + 1)}
          <span> / {pad(total)}</span>
        </span>
        <i aria-hidden="true" />
        <span className="vision-chapter">{stage.chapter}</span>
      </div>

      <RollingYear year={stage.year} />

      <h3>{stage.title}</h3>
      <p className="vision-school">{stage.school}</p>

      {stage.description && <p className="vision-text">{stage.description}</p>}

      <div className="vision-pills">
        <span className="vision-pill">{t.education.today}</span>
        <span className="vision-pill vision-pill-accent">{t.education.status.done}</span>
      </div>
    </article>
  );
};

const RollingYear: FC<{ year: string }> = ({ year }) => (
  <p aria-label={year} className="vision-year">
    {year.split('').map((digit, i) => (
      <span key={`${i}-${digit}`} aria-hidden="true" className="vision-year-digit">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={digit}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.55, delay: i * 0.04, ease: EASE }}
          >
            {digit}
          </motion.span>
        </AnimatePresence>
      </span>
    ))}
  </p>
);

const Medallion: FC<{ stage: Stage; active: number }> = ({ stage, active }) => {
  const Icon = stage.icon;

  return (
    <div className="vision-medallion" aria-hidden="true">
      <motion.div
        className="vision-ring vision-ring-outer"
        animate={{ rotate: active * 120 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <span />
      </motion.div>
      <motion.div
        className="vision-ring vision-ring-inner"
        animate={{ rotate: -active * 60 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <span />
      </motion.div>
      <div className="vision-core">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage.key}
            initial={{ opacity: 0, scale: 0.7, rotate: -16 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 16 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className="vision-icon">
              <Icon size={28} strokeWidth={1.6} />
            </span>
            <span className="vision-core-label">{stage.school}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const TimelineAxis: FC<{
  stages: Stage[];
  active: number;
  position: MotionValue<number>;
  onSelect: (index: number) => void;
}> = ({ stages, active, position, onSelect }) => {
  const last = Math.max(1, stages.length - 1);
  const fill = useTransform(position, (p) => Math.min(1, Math.max(0, (p - 0.5) / last)));

  return (
    <div className="vision-axis">
      <span aria-hidden="true" className="vision-axis-track" />
      <motion.span aria-hidden="true" style={{ scaleX: fill }} className="vision-axis-fill" />
      <ol>
        {stages.map((stage, index) => {
          const isActive = index === active;
          const reached = index <= active;
          return (
            <li key={stage.key}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`${stage.year} · ${stage.title}`}
                data-active={isActive}
                data-reached={reached}
              >
                <span className="vision-dot" />
                <span className="vision-dot-label">{stage.year}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const NeighbourButton: FC<{
  label: string;
  year?: string;
  onClick: () => void;
  side: 'left' | 'right';
}> = ({ label, year, onClick, side }) => {
  const Arrow = side === 'left' ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!year}
      aria-label={year ? `${label} : ${year}` : label}
      className={`vision-neighbour ${side === 'right' ? 'is-right' : ''}`}
    >
      <span>
        <Arrow size={16} />
      </span>
      <em>{year}</em>
    </button>
  );
};

export default EducationSection;
