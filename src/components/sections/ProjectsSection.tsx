import { FC, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { AnimatePresence, motion, type MotionValue } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '../../data/portfolio';
import { useScrollSteps } from '../../hooks/useScrollReveal';
import { useFitHeight } from '../../hooks/useFitHeight';
import { useI18n } from '../../i18n/context';
import TechBadge from '../ui/TechBadge';
import PhoneShowcase from '../ui/PhoneShowcase';
import StepProgress from '../ui/StepProgress';
import { ProjectsBackdrop } from '../ui/SectionBackdrops';

type Project = (typeof projects)[number];

const colorMap: Record<string, string> = {
  copper: '#88482e',
  warm: '#b8734d',
  ink: '#5c534b',
  emerald: '#88482e',
  blue: '#b8734d',
  violet: '#995733',
  rose: '#cda06f',
  purple: '#5c534b',
};

const EASE = [0.16, 1, 0.3, 1] as const;

const ProjectVisual: FC<{ project: Project; title: string }> = ({ project, title }) =>
  project.screens ? (
    <PhoneShowcase screens={project.screens} brandColor={project.brandColor ?? '#D5BE91'} title={title} />
  ) : (
    <img
      src={project.image}
      alt={title}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );

const usePreloadProjectImages = () => {
  useEffect(() => {
    const urls = Array.from(new Set(projects.flatMap((project) => project.screens ?? [project.image]).filter(Boolean)));
    const preload = () =>
      urls.forEach((url) => {
        const image = new Image();
        image.decoding = 'async';
        image.src = url;
        image.decode().catch(() => undefined);
      });
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(preload, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(preload, 2000);
    return () => window.clearTimeout(id);
  }, []);
};

const ProjectDetails: FC<{
  project: Project;
  accentColor: string;
  tone?: 'light' | 'dark';
}> = ({ project, accentColor, tone = 'dark' }) => {
  const { t, pick } = useI18n();
  const highlights = project.highlights ? pick(project.highlights) : [];
  const details = project.details ? pick(project.details) : [];

  return (
    <>
      {highlights.length > 0 && (
        <div className="project-highlights" data-tone={tone}>
          {highlights.map((highlight) => (
            <span key={highlight}>
              <i style={{ background: accentColor }} />
              {highlight}
            </span>
          ))}
        </div>
      )}

      {details.length > 0 && (
        <div className="project-details" data-tone={tone}>
          <p className="project-details-label">{t.projects.details}</p>
          <ul>
            {details.map((item) => (
              <li key={item}>
                <i style={{ background: accentColor }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="project-tech" data-tone={tone}>
        <p className="project-details-label">{t.projects.stack}</p>
        <div className="project-tech-list">
          {project.tech.map((tech) => (
            <TechBadge
              key={tech}
              name={tech}
              iconClassName="w-3.5 h-3.5"
              className="project-tech-badge"
            />
          ))}
        </div>
      </div>
    </>
  );
};

const ProjectsSection: FC = () => {
  const { t, lang } = useI18n();
  const [active, setActive] = useState(0);
  const steps = useScrollSteps(projects.length, setActive);
  const rail = useRef<HTMLDivElement>(null);
  const scrolling = useRef(false);
  const french = lang === 'fr';
  usePreloadProjectImages();
  const expandedHeight = useFitHeight(84 + (projects.length - 1) * (ROW_COLLAPSED + 8) + 24, 480, 560);

  useEffect(() => {
    let timer = 0;
    const onScroll = () => {
      scrolling.current = true;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        scrolling.current = false;
      }, 220);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (scrolling.current) return;
    const track = rail.current;
    const card = track?.children[active] as HTMLElement | undefined;
    if (!track || !card || track.scrollWidth <= track.clientWidth) return;
    track.scrollLeft = card.offsetLeft - track.clientLeft;
  }, [active]);

  const activate = (index: number) => {
    if (index === active) return;
    setActive(index);
  };

  return (
    <section id="projets" className="agency-projects" aria-labelledby="projects-title">
      <ProjectsBackdrop />
      <header className="projects-header">
        <div className="agency-location projects-brand">
          <img
            className="agency-about-wordmark"
            src="/brand/appsynergy-icon.png"
            alt="App Synergy"
            width={1228}
            height={272}
          />
        </div>

        <div className="projects-header-main">
          <div className="projects-header-copy">
            <h2 id="projects-title">
              {t.projects.title} <em>{t.projects.accent}</em>
            </h2>
            <p>{t.projects.description}</p>
          </div>
          <div className="projects-controls">
            <button
              type="button"
              disabled={active === 0}
              onClick={() => activate(active - 1)}
              aria-label={french ? 'Univers précédent' : 'Previous focus area'}
            >
              <ArrowLeft size={19} />
            </button>
            <button
              type="button"
              disabled={active === projects.length - 1}
              onClick={() => activate(active + 1)}
              aria-label={french ? 'Univers suivant' : 'Next focus area'}
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </header>

      <div className="projects-rail projects-rail-desktop" ref={rail} data-lenis-prevent-horizontal>
        {projects.map((project, index) => (
          <ExpandingPanel
            key={project.id}
            project={project}
            index={index}
            isActive={index === active}
            position={steps.enabled ? steps.position : undefined}
            onActivate={() => activate(index)}
            scrolling={scrolling}
          />
        ))}
      </div>

      <div className="projects-rail-mobile">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            isActive={index === active}
            position={steps.enabled ? steps.position : undefined}
            onActivate={() => activate(index)}
            expandedHeight={expandedHeight}
          />
        ))}
      </div>
    </section>
  );
};

interface ExpandingPanelProps {
  project: Project;
  index: number;
  isActive: boolean;
  position?: MotionValue<number>;
  onActivate: () => void;
  scrolling: MutableRefObject<boolean>;
}

const ExpandingPanel: FC<ExpandingPanelProps> = ({
  project, index, isActive, position, onActivate, scrolling,
}) => {
  const { t, pick } = useI18n();
  const accentColor = colorMap[project.color] || '#88482e';
  const number = String(index + 1).padStart(2, '0');
  const title = pick(project.title);

  return (
    <article
      data-search-id={`project-${project.id}`}
      data-active={isActive}
      className="project-card"
      style={{ ['--project-accent' as string]: accentColor }}
    >
      <button
        type="button"
        className="project-hit"
        aria-label={t.projects.panelLabel(title)}
        aria-expanded={isActive}
        onClick={onActivate}
        onMouseEnter={() => {
          if (scrolling.current) return;
          if (window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) onActivate();
        }}
      >
        <span className="sr-only">{title}</span>
      </button>

      <div className="project-visual" aria-hidden={!isActive}>
        <div className="project-visual-inner" data-active={isActive}>
          <ProjectVisual project={project} title={title} />
        </div>
        <div
          className="project-veil"
          data-screens={Boolean(project.screens)}
          data-active={isActive}
        />
      </div>

      <div className="project-index" style={{ color: isActive ? accentColor : 'rgba(255,255,255,0.7)' }}>
        {number}
      </div>

      <div className="project-collapsed" data-active={isActive} aria-hidden={isActive}>
        <span className="project-collapsed-title">{title}</span>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.16, ease: EASE } }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="project-expanded"
          >
            <div className="project-category">
              <span className="project-category-line" style={{ background: accentColor }} />
              <span>{pick(project.category)}</span>
            </div>

            <h3>{title}</h3>
            <p>{pick(project.description)}</p>

            <ProjectDetails project={project} accentColor={accentColor} tone="dark" />
          </motion.div>
        )}
      </AnimatePresence>

      {isActive && position && <StepProgress position={position} index={index} color={accentColor} />}
    </article>
  );
};

const ROW_COLLAPSED = 52;

const ProjectRow: FC<{
  project: Project;
  index: number;
  isActive: boolean;
  position?: MotionValue<number>;
  onActivate: () => void;
  expandedHeight: number;
}> = ({ project, index, isActive, position, onActivate, expandedHeight }) => {
  const { pick } = useI18n();
  const accentColor = colorMap[project.color] || '#88482e';
  const number = String(index + 1).padStart(2, '0');
  const title = pick(project.title);

  return (
    <motion.article
      data-search-id={`project-${project.id}`}
      initial={false}
      animate={{
        height: isActive ? expandedHeight : ROW_COLLAPSED,
        borderColor: isActive ? `${accentColor}66` : '#d7c8b9',
      }}
      transition={{ height: { duration: 0.7, ease: EASE }, borderColor: { duration: 0.45 } }}
      className="project-row"
    >
      <motion.div
        initial={false}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        className="project-row-preview"
        style={{ height: ROW_COLLAPSED }}
      >
        <img
          src={project.screens?.[0] ?? project.image}
          alt={title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </motion.div>

      <button
        type="button"
        onClick={onActivate}
        aria-expanded={isActive}
        aria-label={title}
        className="project-row-trigger"
        style={{ height: ROW_COLLAPSED }}
      >
        <span style={{ color: isActive ? accentColor : '#8a7f74' }}>{number}</span>
        <motion.span
          initial={false}
          animate={{ opacity: isActive ? 0 : 1, x: isActive ? -8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            className="project-row-body"
          >
            <div className="project-row-media">
              {project.screens ? (
                <PhoneShowcase
                  screens={project.screens}
                  brandColor={project.brandColor ?? accentColor}
                  title={title}
                  stageClassName="top-[22%] h-[74%]"
                />
              ) : (
                <img src={project.image} alt={title} decoding="async" draggable={false} />
              )}
            </div>

            <div className="project-row-copy">
              <div className="project-category">
                <span className="project-category-line" style={{ background: accentColor }} />
                <span>{pick(project.category)}</span>
              </div>
              <h3>{title}</h3>
              <p>{pick(project.description)}</p>
              <ProjectDetails project={project} accentColor={accentColor} tone="light" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isActive && position && <StepProgress position={position} index={index} color={accentColor} />}
    </motion.article>
  );
};

export default ProjectsSection;
