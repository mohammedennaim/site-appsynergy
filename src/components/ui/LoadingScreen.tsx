import { FC, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { profileImage } from '../../data/portfolio';
import { formatClock, getHour } from '../../utils/time';
import { useI18n } from '../../i18n/context';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const SESSION_KEY = 'portfolio:visited';
const MAX_DURATION = 4200;
const COLUMNS = 5;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const PAPER = '#f4efe8';
const INK = '#151d1a';
const MUTED = '#5c5650';
const FAINT = '#8a827a';
const COPPER = '#b8734d';
const COPPER_SOFT = '#cda06f';

const techs = [
  { name: 'Web', color: '#422047' },
  { name: 'Mobile', color: '#2bd44f' },
  { name: 'Marketing', color: '#E91E63' },
  { name: 'E-commerce', color: '#16b4df' },
  { name: 'Transformation', color: '#cda06f' },
];

const STEP_LIMITS = [35, 70, 99, 100];

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });

const waitForWindowLoad = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', () => resolve(), { once: true });
  });

const LoadingScreen: FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [techIndex, setTechIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const completeRef = useRef(onLoadingComplete);
  completeRef.current = onLoadingComplete;

  useEffect(() => {
    const returning = sessionStorage.getItem(SESSION_KEY) === '1';
    const minDuration = returning ? 1400 : 2600;
    const tasks = [
      document.fonts?.ready.then(() => undefined) ?? Promise.resolve(),
      preloadImage(profileImage),
      preloadImage('/brand/appsynergy-mark.png'),
      preloadImage('/brand/appsynergy-icon.png'),
      preloadImage('/hero-proposition.png'),
      waitForWindowLoad(),
    ];

    let done = 0;
    tasks.forEach((task) => task.then(() => { done += 1; }));

    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const timeProgress = Math.min(1, elapsed / minDuration);
      const taskProgress = elapsed > MAX_DURATION ? 1 : done / tasks.length;
      const value = Math.min(timeProgress, taskProgress);
      setProgress(Math.round((1 - Math.pow(1 - value, 2)) * 100));

      if (value >= 1) {
        setReady(true);
        sessionStorage.setItem(SESSION_KEY, '1');
        // Hold a beat so the mark + progress read clearly before the curtain lifts
        window.setTimeout(() => completeRef.current(), returning ? 380 : 650);
        return;
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setTechIndex((i) => (i + 1) % techs.length), 700);
    return () => window.clearInterval(id);
  }, []);

  const stepIndex = STEP_LIMITS.findIndex((limit) => progress <= limit);
  const stepLabel = t.loading.steps[stepIndex === -1 ? STEP_LIMITS.length - 1 : stepIndex];
  const year = new Date().getFullYear();
  const now = new Date();
  const localTime = formatClock(now);
  const hour = getHour(now);
  const greeting = hour >= 18 || hour < 5 ? t.loading.evening : t.loading.morning;
  const ringOffset = RING_CIRCUMFERENCE * (1 - progress / 100);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label={`${t.loading.status} — ${stepLabel}`}
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-auto"
      style={{ color: INK }}
    >
      {/* Curtain only — no opaque root so the hero can show through as columns lift */}
      <div className="absolute inset-0 flex" aria-hidden="true">
        {Array.from({ length: COLUMNS }, (_, i) => (
          <motion.div
            key={i}
            className="relative flex-1 h-full -mx-px"
            style={{ background: PAPER }}
            initial={false}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.32, delay: 0.05 } }
                : {
                    y: '-105%',
                    transition: {
                      duration: 0.78,
                      delay: 0.16 + i * 0.06,
                      ease: EASE_IN_OUT,
                    },
                  }
            }
          >
            <span className="absolute bottom-0 inset-x-0 h-px" style={{ background: `${COPPER}88` }} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute inset-0"
        animate={ready && !reduceMotion ? { opacity: 0.88, scale: 1.012 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        exit={{
          opacity: 0,
          y: -12,
          filter: reduceMotion ? undefined : 'blur(4px)',
          transition: { duration: 0.32, ease: EASE_OUT },
        }}
      >
        {/* Atmosphere */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 58% 46% at 50% 42%, rgba(205,160,111,0.2) 0%, transparent 68%), radial-gradient(ellipse 36% 28% at 92% 8%, rgba(214,196,176,0.38) 0%, transparent 62%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Fond typo géant — signature Contact, version light */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-end justify-center"
        >
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: '26%' }}
            animate={{
              opacity: ready && !reduceMotion ? 0.5 : 1,
              y: ready && !reduceMotion ? '1%' : '5%',
            }}
            transition={{ duration: reduceMotion ? 0 : ready ? 0.38 : 1.15, delay: reduceMotion || ready ? 0 : 0.05, ease: EASE_OUT }}
            className="font-display font-extrabold uppercase text-center leading-[0.8] tracking-[-0.065em]
              text-[clamp(5rem,24vw,20rem)] pb-[2vh] px-1 will-change-transform"
            style={{
              color: 'rgba(21, 29, 26, 0.028)',
              WebkitTextStroke: '1.15px rgba(21, 29, 26, 0.09)',
              maskImage: 'linear-gradient(to top, black 52%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 52%, transparent 100%)',
            }}
          >
            APP
            <br />
            SYNERGY
            <span
              style={{
                color: `${COPPER}18`,
                WebkitTextStroke: `1.15px ${COPPER}55`,
              }}
            >
              .
            </span>
          </motion.p>
        </div>

        {/* Soft center focus — keeps logo readable over typography */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[min(28rem,88vw)] h-[min(28rem,88vw)]
            rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(244,239,232,0.92) 0%, rgba(244,239,232,0.55) 42%, transparent 72%)',
          }}
        />

        {/* Top chrome */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: EASE_OUT }}
          className="absolute top-6 inset-x-5 sm:top-8 sm:inset-x-10 z-10 flex justify-between gap-4
            text-[10px] sm:text-[11px] uppercase tracking-[0.22em]"
          style={{ color: FAINT }}
        >
          <span className="truncate font-medium" style={{ color: MUTED }}>
            APP SYNERGY
          </span>
          <span className="tabular-nums shrink-0">© {year}</span>
        </motion.div>

        {/* Centre */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 sm:px-8 -translate-y-[2%]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
            animate={{
              opacity: 1,
              scale: ready && !reduceMotion ? 1.04 : 1,
            }}
            transition={{ duration: ready ? 0.4 : 0.75, ease: EASE_OUT }}
            className="relative w-[11.25rem] h-[11.25rem] sm:w-[13.25rem] sm:h-[13.25rem]"
          >
            <motion.div
              aria-hidden="true"
              animate={reduceMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.14, 0.28, 0.14] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-5 rounded-full blur-2xl"
              style={{ background: 'rgba(184,115,77,0.22)' }}
            />

            <motion.div
              aria-hidden="true"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-3 sm:-inset-4 rounded-full border border-dashed"
              style={{ borderColor: 'rgba(21,29,26,0.08)' }}
            >
              <span
                className="absolute top-1/2 -right-0.5 w-1.5 h-1.5 rounded-full"
                style={{ background: COPPER_SOFT, boxShadow: `0 0 10px ${COPPER_SOFT}99` }}
              />
            </motion.div>

            <svg viewBox="0 0 140 140" className="absolute inset-0 w-full h-full" aria-hidden="true">
              <defs>
                <linearGradient id="loader-ring-light" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={COPPER_SOFT} />
                  <stop offset="100%" stopColor={COPPER} />
                </linearGradient>
              </defs>
              <circle
                cx="70"
                cy="70"
                r={RING_RADIUS}
                fill="none"
                stroke="rgba(21,29,26,0.08)"
                strokeWidth="2.75"
              />
              <motion.circle
                cx="70"
                cy="70"
                r={RING_RADIUS}
                fill="none"
                stroke="url(#loader-ring-light)"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                initial={false}
                animate={{ strokeDashoffset: ringOffset }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                transform="rotate(-90 70 70)"
              />
            </svg>

            {/* Original mark only — no text, transparent bg */}
            <motion.div
              className="absolute inset-[30%] flex items-center justify-center"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT }}
            >
              <img
                src="/brand/appsynergy-mark.png"
                alt=""
                width={112}
                height={112}
                className="w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42, ease: EASE_OUT }}
            className="mt-9 flex flex-col items-center gap-3"
          >
            <p
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-center"
              style={{ color: FAINT }}
            >
              Agence marketing digital
            </p>

            <div
              className="relative inline-flex h-[1.4em] min-w-[12ch] overflow-hidden justify-center
                text-[11px] sm:text-xs uppercase tracking-[0.18em]"
              aria-hidden="true"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={techs[techIndex].name}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-110%', opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="flex items-center justify-center gap-2 whitespace-nowrap font-semibold"
                  style={{ color: INK }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: techs[techIndex].color }}
                  />
                  {techs[techIndex].name}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom chrome */}
        <div className="absolute bottom-7 inset-x-5 sm:bottom-9 sm:inset-x-10 z-10 flex items-end justify-between gap-4">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.38 }}
            className="flex items-center gap-2.5 pb-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] min-w-0"
            style={{ color: MUTED }}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-65"
                style={{ background: COPPER }}
              />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: COPPER }} />
            </span>
            <span className="relative h-[1.2em] overflow-hidden min-w-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={stepLabel}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                  className="block truncate whitespace-nowrap"
                >
                  {stepLabel}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.48 }}
            className="flex items-center gap-2 pb-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] shrink-0"
            style={{ color: FAINT }}
          >
            <span className="hidden md:inline">{greeting}</span>
            <span
              className="hidden md:inline w-4 h-px"
              style={{ background: 'rgba(21,29,26,0.15)' }}
              aria-hidden="true"
            />
            <span className="tabular-nums font-semibold" style={{ color: MUTED }}>
              {localTime}
            </span>
          </motion.div>
        </div>

        {/* Progress rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-[2px]"
          style={{ background: 'rgba(21,29,26,0.07)' }}
        >
          <motion.div
            className="h-full origin-left"
            style={{ background: `linear-gradient(90deg, ${COPPER}, ${COPPER_SOFT})` }}
            initial={false}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
