import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Handshake, Laptop, Layers, Megaphone, ShoppingCart, Smartphone, type LucideIcon } from 'lucide-react';
import { skills } from '../../data/portfolio';
import { useScrollSteps } from '../../hooks/useScrollReveal';
import { useI18n } from '../../i18n/context';
import StepProgress from '../ui/StepProgress';
import TechBadge from '../ui/TechBadge';
import { SkillsBackdrop } from '../ui/SectionBackdrops';

const icons: Record<string, LucideIcon> = {
  web: Laptop, mobile: Smartphone, transformation: Layers,
  marketing: Megaphone, ecommerce: ShoppingCart, method: Handshake,
};

export default function SkillsSection() {
  const { t, pick, lang } = useI18n();
  const [active, setActive] = useState(0);
  const steps = useScrollSteps(skills.length, setActive);
  const rail = useRef<HTMLDivElement>(null);
  const scrolling = useRef(false);

  useEffect(() => {
    let timer = 0;
    const onScroll = () => {
      scrolling.current = true;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        scrolling.current = false;
      }, 180);
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

  const french = lang === 'fr';
  const activate = (index: number) => {
    if (index === active) return;
    setActive(index);
  };

  return (
    <section id="competences" className="agency-skills" aria-labelledby="skills-title">
      <SkillsBackdrop />
      <header className="expertise-header">
        <div className="agency-location expertise-brand">
          <img
            className="agency-about-wordmark"
            src="/brand/appsynergy-icon.png"
            alt="App Synergy"
            width={1228}
            height={272}
          />
          <i aria-hidden="true" />
          <span>{french ? 'Nos expertises' : 'Our expertise'}</span>
        </div>

        <div className="expertise-header-main">
          <div>
            <h2 id="skills-title">{t.skills.title} <em>{t.skills.accent}</em></h2>
            <p>{t.skills.description}</p>
          </div>
          <div className="expertise-controls">
            <button type="button" disabled={active === 0} onClick={() => activate(active - 1)}
              aria-label={french ? 'Expertise précédente' : 'Previous expertise'}><ArrowLeft size={19} /></button>
            <button type="button" disabled={active === skills.length - 1} onClick={() => activate(active + 1)}
              aria-label={french ? 'Expertise suivante' : 'Next expertise'}><ArrowRight size={19} /></button>
          </div>
        </div>
      </header>

      <div className="expertise-rail" ref={rail} data-lenis-prevent-horizontal>
        {skills.map((category, index) => {
          const selected = index === active;
          const Icon = icons[category.id];
          const title = pick(category.name);
          const number = String(index + 1).padStart(2, '0');
          const detailsId = `expertise-details-${category.id}`;
          return (
            <article key={category.id} data-search-id={`skill-${category.id}`}
              className="expertise-card" data-active={selected}>
              <h3>
                <button className="expertise-selector" type="button" aria-expanded={selected}
                  aria-controls={detailsId} onClick={() => activate(index)}
                  onMouseEnter={() => {
                    if (scrolling.current) return;
                    if (window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) activate(index);
                  }}>
                  {selected ? (
                    <span className="expertise-meta">
                      <span className="expertise-index">{number}</span>
                      <span className="expertise-domain">{t.skills.domain}</span>
                    </span>
                  ) : (
                    Icon && <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
                  )}
                  {selected && Icon && <Icon size={34} strokeWidth={1.5} aria-hidden="true" className="expertise-active-icon" />}
                  <span>{title}</span>
                </button>
              </h3>
              <div id={detailsId} className="expertise-details" hidden={!selected}>
                <p className="expertise-lead">{pick(category.description)}</p>

                <div className="expertise-focus">
                  <p className="expertise-label">{t.skills.focus}</p>
                  <ul className="expertise-highlights">
                    {category.highlights.map((point) => (
                      <li key={pick(point)}>{pick(point)}</li>
                    ))}
                  </ul>
                </div>

                <div className="expertise-stack">
                  <div className="expertise-stack-head">
                    <p className="expertise-label">{t.skills.stack}</p>
                    <span>{t.skills.count(category.items.length)}</span>
                  </div>
                  <ul className="expertise-tags">
                    {category.items.map((item) => (
                      <li key={item}><TechBadge name={item} iconClassName="w-4 h-4" /></li>
                    ))}
                  </ul>
                </div>
              </div>
              {selected && steps.enabled && <StepProgress position={steps.position} index={index} color="#995733" />}
            </article>
          );
        })}
      </div>
    </section>
  );
}
