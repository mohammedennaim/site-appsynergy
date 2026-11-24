import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Code2, Compass, MessageSquare, Rocket, type LucideIcon } from 'lucide-react';
import { experiences } from '../../data/portfolio';
import { useScrollSteps } from '../../hooks/useScrollReveal';
import { useI18n } from '../../i18n/context';
import StepProgress from '../ui/StepProgress';
import TechBadge from '../ui/TechBadge';
import { StagesBackdrop } from '../ui/SectionBackdrops';

const stepIcons: LucideIcon[] = [MessageSquare, Compass, Code2, Rocket];

export default function StagesSection() {
  const { t, pick, lang } = useI18n();
  const [active, setActive] = useState(0);
  const steps = useScrollSteps(experiences.length, setActive);
  const rail = useRef<HTMLDivElement>(null);
  const scrolling = useRef(false);
  const french = lang === 'fr';

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
    if (!track || !card || track.scrollHeight <= track.clientHeight) return;
    track.scrollTop = card.offsetTop - track.offsetTop;
  }, [active]);

  const activate = (index: number) => {
    if (index === active) return;
    setActive(index);
  };

  return (
    <section id="experience" className="agency-method" aria-labelledby="method-title">
      <StagesBackdrop />
      <header className="method-header">
        <div className="agency-location method-brand">
          <img
            className="agency-about-wordmark"
            src="/brand/appsynergy-icon.png"
            alt="App Synergy"
            width={1228}
            height={272}
          />
          <i aria-hidden="true" />
          <span>{french ? 'Notre méthode' : 'Our method'}</span>
        </div>

        <div className="method-header-main">
          <div className="method-header-copy">
            <h2 id="method-title">
              {t.experience.title} <em>{t.experience.accent}</em>
            </h2>
            <p>{t.experience.description}</p>
          </div>
          <div className="method-controls">
            <button
              type="button"
              disabled={active === 0}
              onClick={() => activate(active - 1)}
              aria-label={french ? 'Étape précédente' : 'Previous step'}
            >
              <ArrowUp size={19} />
            </button>
            <button
              type="button"
              disabled={active === experiences.length - 1}
              onClick={() => activate(active + 1)}
              aria-label={french ? 'Étape suivante' : 'Next step'}
            >
              <ArrowDown size={19} />
            </button>
          </div>
        </div>
      </header>

      <div className="method-rail" ref={rail}>
        {experiences.map((step, index) => {
          const selected = index === active;
          const Icon = stepIcons[index] ?? Compass;
          const title = pick(step.position);
          const number = String(index + 1).padStart(2, '0');
          const tasks = step.tasks ? pick(step.tasks) : [];
          const skills = step.skills ? pick(step.skills) : [];
          const detailsId = `method-details-${index}`;

          return (
            <article
              key={`${step.period.fr}-${index}`}
              className="method-card"
              data-active={selected}
            >
              <h3>
                <button
                  type="button"
                  className="method-selector"
                  aria-expanded={selected}
                  aria-controls={detailsId}
                  onClick={() => activate(index)}
                  onMouseEnter={() => {
                    if (scrolling.current) return;
                    if (window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) {
                      activate(index);
                    }
                  }}
                >
                  <span className="method-meta">
                    <span className="method-index">{number}</span>
                    <span className="method-domain">{french ? 'Étape' : 'Step'}</span>
                  </span>
                  <span className="method-selector-main">
                    <Icon size={selected ? 28 : 22} strokeWidth={1.55} aria-hidden="true" />
                    <span className="method-title">{title}</span>
                  </span>
                </button>
              </h3>

              <div id={detailsId} className="method-details" hidden={!selected}>
                <p className="method-lead">{pick(step.description)}</p>

                {tasks.length > 0 && (
                  <div className="method-block">
                    <p className="method-label">{t.experience.missions}</p>
                    <ul className="method-missions">
                      {tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {(step.technologies?.length || skills.length > 0) && (
                  <div className="method-tags">
                    {step.technologies?.map((tech) => {
                      const label = pick(tech);
                      return (
                        <span key={label} className="method-tag">
                          <TechBadge name={label} iconClassName="w-3.5 h-3.5" />
                        </span>
                      );
                    })}
                    {skills.map((skill) => (
                      <span key={skill} className="method-tag method-tag-soft">{skill}</span>
                    ))}
                  </div>
                )}
              </div>

              {selected && steps.enabled && (
                <StepProgress position={steps.position} index={index} color="#995733" />
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
