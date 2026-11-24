import { FC, useState } from 'react';
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'framer-motion';
import { usePinnedProgress } from '../../hooks/useSectionProgress';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useI18n } from '../../i18n/context';
import { AnatomyBackdrop } from '../ui/SectionBackdrops';

/** Pinned scroll timeline: turn to a three-quarter view, pull the parts apart, then walk through them */
const TURN_END = 0.14;
const EXPLODE = [0.05, 0.27] as const;
const WALK_START = 0.29;
const WALK_END = 0.96;

const activeAt = (p: number, count: number) =>
  p < WALK_START ? -1 : Math.min(count - 1, Math.floor(((p - WALK_START) / (WALK_END - WALK_START)) * count));

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Part artwork: real screens of each app, in journey order            */
/* ------------------------------------------------------------------ */

export type AnatomyApp = 'qarib' | 'arova';

const SCREENS: Record<AnatomyApp, string[]> = {
  qarib: [
    '/projects/qarib/login.webp',
    '/projects/qarib/map.webp',
    '/projects/qarib/service.webp',
    '/projects/qarib/orders.webp',
    '/projects/qarib/notifications.webp',
  ],
  arova: [
    '/projects/arova/login.webp',
    '/projects/arova/catalog.webp',
    '/projects/arova/product.webp',
    '/projects/arova/cart.webp',
    '/projects/arova/tracking.webp',
    '/projects/arova/assistant.webp',
  ],
};

/* ------------------------------------------------------------------ */
/* One part of the device, with its edge and its callout               */
/* ------------------------------------------------------------------ */

const RADIUS = 'rounded-[1.7rem]';

interface PartProps {
  index: number;
  count: number;
  src: string;
  spread: MotionValue<number>;
  progress: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateZ: MotionValue<number>;
  active: number;
  billboard: MotionValue<string>;
  showCallout: boolean;
  calloutOpacity: MotionValue<number>;
  label: { name: string; tech: string };
  /** Extra scale of a part on show, on top of the perspective coming forward gives it */
  stageScale: number;
}

/** Share of a part's slot in the walk spent coming out; it is on show until POP_OUT, then slides back */
const POP_IN = 0.3;
const POP_OUT = 0.8;
/** How far the part is drawn out sideways, in its own widths, before it swings round to face the viewer */
const DRAW_OUT = 0.85;
const SWAY_DEG = 7;
const POP_SPRING = { stiffness: 120, damping: 24, mass: 0.8, restDelta: 0.0005 };

const Part: FC<PartProps> = ({
  index,
  count,
  src,
  spread,
  progress,
  rotateX,
  rotateZ,
  active,
  billboard,
  showCallout,
  calloutOpacity,
  label,
  stageScale,
}) => {
  // Glass sits on top at count + 1, the chassis at 0
  const z = useTransform(spread, (gap) => (count - index) * gap);
  const isActive = active === index;
  const dimmed = active >= 0 && !isActive;

  // Walking through the parts, each one in turn is drawn out of the device like a drawer, swings round
  // to face the viewer in front of the others, sways with the scroll while on show, then slides back
  const slot = (WALK_END - WALK_START) / count;
  const from = WALK_START + index * slot;
  const last = index === count - 1;
  const popTarget = useTransform(
    progress,
    [from, from + slot * POP_IN, last ? 2 : from + slot * POP_OUT, last ? 3 : from + slot],
    [0, 1, 1, 0],
  );
  // Sprung so a fast wheel flick or a jump from the nav still glides instead of snapping
  const pop = useSpring(popTarget, POP_SPRING);
  // -1 → 1 while the part is on show, so it keeps answering the scroll instead of freezing
  const sway = useTransform(progress, [from + slot * POP_IN, last ? WALK_END : from + slot * POP_OUT], [-1, 1]);
  const facing = useTransform([pop, sway, rotateX, rotateZ, spread], ([p, s, rx, rz, gap]: number[]) => {
    // Always a 3D transform: switching from 'none' would re-create the layer just as the part moves
    if (p < 0.001) return 'translate3d(0px, 0px, 0px)';
    const tilt = (rx * Math.PI) / 180;
    const height = (count - index) * gap;
    // Undo the device's turn (its exact inverse at p = 1), then move in screen space:
    // back to the middle of the stack, and in front of the glass so no tilted part cuts through it
    const toCentre = height * Math.sin(tilt) - gap * (count + 1) * 0.42;
    const forward = ((count + 1) * gap - height) * Math.cos(tilt) + 220;
    // Sliding in its own plane and lifting along its normal, it never cuts through the parts around it
    const draw = Math.sin(Math.PI * Math.min(1, p * 1.15)) * DRAW_OUT * 100;
    const lift = 1 - (1 - p) ** 3;
    const turn = p < 0.35 ? 0 : ((p - 0.35) / 0.65) ** 2;
    return (
      `translateX(${-draw}%) rotateZ(${-rz * turn}deg) rotateX(${-rx * turn}deg) ` +
      `translate3d(0px, ${toCentre * lift - s * 10 * p}px, ${forward * lift}px) ` +
      `rotateY(${s * SWAY_DEG * p}deg) rotateX(${-s * 2.5 * p}deg) scale(${1 + stageScale * lift})`
    );
  });
  // A light sweep across the glass, driven by the scroll while the screen is on show
  const glareX = useTransform(sway, [-1, 1], ['-20%', '320%']);
  const glareOpacity = useTransform(pop, [0.5, 0.85], [0, 1]);
  // The slot it left stays outlined in the stack until it comes back
  const ghostOpacity = useTransform(pop, [0.05, 0.4], [0, 1]);

  const fade = dimmed ? 'opacity-35' : 'opacity-100';

  // Opacity is only ever set on leaf elements: on a parent it would flatten the 3D (edges, facing tags)
  return (
    <motion.div style={{ z }} className="absolute inset-0 [transform-style:preserve-3d]">
      <motion.div style={{ transform: facing }} className="absolute inset-0 will-change-transform [transform-style:preserve-3d]">
        <div className={`absolute inset-0 ${RADIUS} border border-[#2a2520] bg-[#120f0d] [transform:translateZ(-4px)] transition-opacity duration-700 ${fade}`} />
        <div className={`absolute inset-0 ${RADIUS} border border-white/[0.06] bg-[#120f0d] [transform:translateZ(-2px)] transition-opacity duration-700 ${fade}`} />
        <div
          className={`absolute inset-0 ${RADIUS} shadow-[0_0_46px_-6px_rgba(136,72,46,0.55)] transition-opacity duration-700
            ${isActive ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          className={`absolute inset-0 ${RADIUS} overflow-hidden border bg-black transition-[border-color,opacity] duration-700 ${fade}
            ${isActive ? 'border-[#c58e62]' : 'border-[#3a322c]'}`}
        >
          <img
            src={src}
            alt={`${label.name} — ${label.tech}`}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {index === 0 && <span className="absolute top-[2.2%] left-1/2 -translate-x-1/2 h-[3.2%] w-[30%] rounded-full bg-black" />}
          <motion.span
            style={{ x: glareX, opacity: glareOpacity }}
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2
              bg-[linear-gradient(105deg,transparent_25%,rgba(255,255,255,0.22)_50%,transparent_75%)]"
          />
        </div>
      </motion.div>

      <div className="absolute inset-0 [transform-style:preserve-3d]">
        <motion.div
          style={{ opacity: ghostOpacity }}
          className={`absolute inset-0 ${RADIUS} border border-dashed border-[#c58e62]/70 bg-[#c58e62]/[0.06]`}
        />
        {showCallout && (
          <div className="absolute left-full top-[46%] flex items-center [transform-style:preserve-3d]">
            <motion.span
              style={{ opacity: calloutOpacity }}
              className={`h-px w-[clamp(5rem,9vw,8.5rem)] transition-colors duration-500 ${isActive ? 'bg-[#88482e]' : 'bg-[#c4b5a6]'}`}
            />
            <motion.span
              style={{ opacity: calloutOpacity }}
              className={`w-1.5 h-1.5 rounded-full -ml-0.5 transition-colors duration-500 ${isActive ? 'bg-[#88482e]' : 'bg-[#b9a897]'}`}
            />
            <motion.span style={{ transform: billboard, opacity: calloutOpacity }} className="ml-2 origin-left whitespace-nowrap">
              <span className={`block text-[10px] font-bold tracking-[0.14em] uppercase transition-colors duration-500 ${isActive ? 'text-[#88482e]' : 'text-[#8a7f74]'}`}>
                0{index + 1} · {label.tech}
              </span>
              <span
                className={`block origin-left font-semibold text-[15px] transition-[color,transform] duration-500
                  ${isActive ? 'text-[var(--agency-ink)]' : 'scale-[0.867] text-[#5c534b]'}`}
              >
                {label.name}
              </span>
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

interface AnatomySectionProps {
  app: AnatomyApp;
}

const AnatomySection: FC<AnatomySectionProps> = ({ app }) => {
  const { t, lang } = useI18n();
  const copy = t.anatomy[app];
  const screens = SCREENS[app];
  const count = screens.length;
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const pinned = usePinnedProgress();
  const settled = useMotionValue(WALK_START - 0.01);
  const progress = pinned ?? settled;
  const scrollDriven = Boolean(pinned);
  const french = lang === 'fr';
  const brandLabel = app === 'qarib'
    ? (french ? 'Vue éclatée · Qarib' : 'Exploded view · Qarib')
    : (french ? 'Vue éclatée · AROVA' : 'Exploded view · AROVA');

  const rotateX = useTransform(progress, [0, TURN_END], [10, 58]);
  const rotateZ = useTransform(progress, [0, TURN_END, 1], [0, -34, -42]);
  const spread = useTransform(progress, [...EXPLODE], [2, (isDesktop ? 84 : 46) * Math.sqrt(5 / count)]);
  const sink = useTransform(spread, (gap) => gap * (count + 1) * 0.42);
  const glassZ = useTransform(spread, (gap) => (count + 1) * gap);
  const shadowScale = useTransform(progress, [...EXPLODE], [0.75, 1.3]);
  const shadowOpacity = useTransform(progress, [...EXPLODE], [0.55, 0.28]);
  const calloutOpacity = useTransform(progress, [EXPLODE[1] - 0.08, EXPLODE[1]], [0, 1]);
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);
  const unRotateX = useTransform(rotateX, (v) => -v);
  const unRotateZ = useTransform(rotateZ, (v) => -v);
  const billboard = useMotionTemplate`rotateZ(${unRotateZ}deg) rotateX(${unRotateX}deg)`;

  const [active, setActive] = useState(() => activeAt(progress.get(), count));
  useMotionValueEvent(progress, 'change', (p) => setActive(activeAt(p, count)));

  const layers = copy.layers;
  const current = active >= 0 ? layers[active] : null;

  return (
    <section id={`anatomie-${app}`} className="agency-anatomy" aria-labelledby={`anatomy-title-${app}`}>
      <AnatomyBackdrop />
      <div aria-hidden="true" className="anatomy-watermark">
        <AnimatePresence mode="popLayout">
          {scrollDriven && active >= 0 && (
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease }}
            >
              0{active + 1}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <header className="anatomy-header">
        <div className="agency-location anatomy-brand">
          <img
            className="agency-about-wordmark"
            src="/brand/appsynergy-icon.png"
            alt="App Synergy"
            width={1228}
            height={272}
          />
          <i aria-hidden="true" />
          <span>{brandLabel}</span>
        </div>
      </header>

      <div className="anatomy-grid">
        <div className="anatomy-copy">
          <h2 id={`anatomy-title-${app}`}>
            <span>{copy.title[0]}</span>
            <em>{copy.title[1]}</em>
          </h2>

          {scrollDriven ? (
            <>
              <div className="anatomy-focus">
                <AnimatePresence mode="wait" initial={false}>
                  {current ? (
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.42, ease }}
                    >
                      <p className="anatomy-meta">
                        <span className="anatomy-step">
                          0{active + 1}
                          <span> / 0{count}</span>
                        </span>
                        <span className="anatomy-tech">{current.tech}</span>
                      </p>
                      <h3>{current.name}</h3>
                      <p className="anatomy-text">{current.text}</p>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="intro"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="anatomy-intro"
                    >
                      {copy.intro}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="anatomy-progress" aria-hidden="true">
                {layers.map((layer, index) => (
                  <span key={layer.name} data-active={index <= active}>
                    <i />
                  </span>
                ))}
              </div>

              <ol className="sr-only">
                {layers.map((layer) => (
                  <li key={layer.name}>
                    {layer.name} ({layer.tech}) : {layer.text}
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <ol className="anatomy-static">
              {layers.map((layer, index) => (
                <li key={layer.name}>
                  <span>0{index + 1}</span>
                  <div>
                    <p>
                      {layer.name} <em>· {layer.tech}</em>
                    </p>
                    <p>{layer.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div aria-hidden="true" className="anatomy-stage">
          <motion.div
            style={{ scale: shadowScale, opacity: shadowOpacity }}
            className="anatomy-shadow"
          />
          <motion.div
            style={{ y: sink, rotateX, rotateZ }}
            className="anatomy-device"
          >
            <div className={`anatomy-chassis ${RADIUS}`}>
              <span className="anatomy-camera">
                <span />
                <span />
              </span>
            </div>
            <span className="anatomy-btn anatomy-btn-left" />
            <span className="anatomy-btn anatomy-btn-right" />

            {layers.map((layer, index) => (
              <Part
                key={layer.name}
                index={index}
                count={count}
                src={screens[index]}
                spread={spread}
                progress={progress}
                rotateX={rotateX}
                rotateZ={rotateZ}
                active={scrollDriven ? active : -1}
                billboard={billboard}
                showCallout={isDesktop}
                calloutOpacity={calloutOpacity}
                label={layer}
                stageScale={isDesktop ? 0.2 : 0.08}
              />
            ))}

            <motion.div style={{ z: glassZ }} className={`anatomy-glass ${RADIUS}`} />
          </motion.div>

          {scrollDriven && (
            <motion.p style={{ opacity: hintOpacity }} className="anatomy-hint">
              {copy.hint}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnatomySection;
