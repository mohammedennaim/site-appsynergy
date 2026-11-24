import { FC, type CSSProperties, type ReactNode } from 'react';
import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import { useSectionProgress } from '../../hooks/useSectionProgress';

/**
 * One backdrop per section — scroll-driven atmosphere on agency paper.
 * Reduced motion: progress settles at 1 so graphics rest fully drawn.
 */
const useBackdropProgress = () => {
  const progress = useSectionProgress();
  const settled = useMotionValue(1);
  return progress ?? settled;
};

const COPPER = '136, 72, 46';
const WARM = '184, 115, 77';
const INK = '21, 29, 26';
const SAND = '232, 214, 196';
const layer = 'pointer-events-none absolute inset-0 overflow-hidden z-0';

const Wash: FC<{ style?: CSSProperties; className?: string; children?: ReactNode }> = ({
  style,
  className = '',
  children,
}) => (
  <div aria-hidden="true" className={`absolute inset-0 ${className}`} style={style}>
    {children}
  </div>
);

/** Soft parchment haze + optional drifting wash tied to section progress */
const Atmosphere: FC<{
  progress: MotionValue<number>;
  a: string;
  b?: string;
  drift?: [number, number];
}> = ({ progress, a, b, drift = [12, -18] }) => {
  const y = useTransform(progress, [0, 1], drift);
  return (
    <>
      <Wash style={{ background: a }} />
      {b && (
        <motion.div
          className="absolute inset-[-12%] will-change-transform"
          style={{ y, background: b }}
        />
      )}
    </>
  );
};

const Specks: FC<{ seed?: number; count?: number }> = ({ seed = 1, count = 18 }) => {
  const dots = Array.from({ length: count }, (_, i) => {
    const n = (i + 1) * seed * 12.9898;
    const x = (Math.sin(n) * 0.5 + 0.5) * 100;
    const y = (Math.cos(n * 1.37) * 0.5 + 0.5) * 100;
    const s = 1.2 + ((i * 7) % 5) * 0.45;
    const o = 0.12 + ((i * 3) % 4) * 0.05;
    return { x, y, s, o };
  });
  return (
    <div className="absolute inset-0">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.s,
            height: dot.s,
            background: `rgba(${COPPER}, ${dot.o})`,
          }}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* About — topographic contours                                        */
/* ------------------------------------------------------------------ */

const contour = (index: number) => {
  const radius = 70 + index * 40;
  const points: string[] = [];
  for (let step = 0; step <= 72; step++) {
    const a = (step / 72) * Math.PI * 2;
    const r = radius * (1 + 0.09 * Math.sin(3 * a + index * 0.7) + 0.05 * Math.cos(5 * a - index * 0.45));
    points.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`);
  }
  return `M${points.join('L')}Z`;
};
const CONTOURS = Array.from({ length: 11 }, (_, i) => contour(i));

const ContourLine: FC<{ d: string; index: number; progress: MotionValue<number> }> = ({ d, index, progress }) => {
  const pathLength = useTransform(progress, [index * 0.028, 0.32 + index * 0.028], [0, 1]);
  return (
    <motion.path
      d={d}
      fill={index % 3 === 0 ? `rgba(${SAND}, 0.18)` : 'none'}
      stroke={`rgba(${COPPER}, ${0.36 - index * 0.022})`}
      strokeWidth={index % 4 === 0 ? 1.35 : 1}
      vectorEffect="non-scaling-stroke"
      style={{ pathLength }}
    />
  );
};

export const AboutBackdrop: FC = () => {
  const progress = useBackdropProgress();
  const rotate = useTransform(progress, [0, 1], [-12, 16]);
  const scale = useTransform(progress, [0, 1], [0.9, 1.1]);
  const markerOpacity = useTransform(progress, [0.2, 0.55], [0, 1]);

  return (
    <div aria-hidden="true" className={layer}>
      <Atmosphere
        progress={progress}
        a={`radial-gradient(ellipse 58% 52% at 84% 70%, rgba(${SAND}, 0.95) 0%, transparent 68%),
            radial-gradient(ellipse 35% 40% at 12% 18%, rgba(${WARM}, 0.12) 0%, transparent 70%)`}
        b={`radial-gradient(ellipse 40% 35% at 70% 40%, rgba(${WARM}, 0.1) 0%, transparent 70%)`}
        drift={[18, -22]}
      />
      <Specks seed={2} count={16} />
      <motion.svg
        viewBox="-450 -450 900 900"
        style={{ rotate, scale }}
        className="absolute -right-[20%] top-[4%] w-[min(98vw,1100px)] aspect-square"
      >
        {CONTOURS.map((d, index) => (
          <ContourLine key={index} d={d} index={index} progress={progress} />
        ))}
        <motion.g style={{ opacity: markerOpacity }}>
          <circle r={5} fill={`rgba(${COPPER}, 0.7)`} />
          <circle r={14} fill="none" stroke={`rgba(${COPPER}, 0.35)`} strokeWidth={1} />
          <path d="M0 -28 L0 28 M-28 0 L28 0" stroke={`rgba(${COPPER}, 0.28)`} strokeWidth={1} />
        </motion.g>
      </motion.svg>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Skills — perspective tech orbits                                    */
/* ------------------------------------------------------------------ */

const ORBITS = [
  { radius: 140, nodes: 4, turn: 160 },
  { radius: 250, nodes: 6, turn: -120 },
  { radius: 370, nodes: 8, turn: 90 },
  { radius: 490, nodes: 10, turn: -55 },
];

const Orbit: FC<{ radius: number; nodes: number; turn: number; progress: MotionValue<number> }> = ({
  radius,
  nodes,
  turn,
  progress,
}) => {
  const rotate = useTransform(progress, [0, 1], [0, turn]);
  return (
    <motion.g style={{ rotate }}>
      <circle r={radius} fill="none" stroke={`rgba(${COPPER}, 0.28)`} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <circle r={radius} fill="none" stroke={`rgba(${WARM}, 0.12)`} strokeWidth={6} vectorEffect="non-scaling-stroke" />
      {Array.from({ length: nodes }, (_, i) => {
        const a = (i / nodes) * Math.PI * 2 + radius * 0.01;
        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r={18} fill={`rgba(${SAND}, 0.55)`} stroke={`rgba(${COPPER}, 0.15)`} strokeWidth={1} />
            <circle r={4} fill={`rgba(${COPPER}, ${i % 3 === 0 ? 0.85 : 0.4})`} />
            {i % 2 === 0 && (
              <line
                x1={0}
                y1={0}
                x2={-x * 0.18}
                y2={-y * 0.18}
                stroke={`rgba(${COPPER}, 0.18)`}
                strokeWidth={1}
              />
            )}
          </g>
        );
      })}
    </motion.g>
  );
};

export const SkillsBackdrop: FC = () => {
  const progress = useBackdropProgress();
  const tilt = useTransform(progress, [0, 1], [70, 56]);
  const glow = useTransform(progress, [0, 1], [0.35, 0.7]);

  return (
    <div aria-hidden="true" className={layer}>
      <Atmosphere
        progress={progress}
        a={`radial-gradient(ellipse 75% 58% at 50% 105%, rgba(${SAND}, 0.95) 0%, transparent 62%),
            radial-gradient(ellipse 30% 40% at 8% 30%, rgba(${WARM}, 0.12) 0%, transparent 65%)`}
        b={`radial-gradient(circle at 55% 70%, rgba(${WARM}, 0.14) 0%, transparent 45%)`}
        drift={[10, -28]}
      />
      <Specks seed={3} count={20} />
      <div className="absolute left-1/2 top-[64%] -translate-x-1/2 -translate-y-1/2 w-[min(135vw,1380px)] aspect-square [perspective:1500px]">
        <motion.svg viewBox="-520 -520 1040 1040" style={{ rotateX: tilt }} className="w-full h-full">
          <motion.circle r={90} fill={`rgba(${COPPER}, 0.06)`} style={{ opacity: glow }} />
          <circle r={7} fill={`rgba(${COPPER}, 0.85)`} />
          {ORBITS.map((orbit) => (
            <Orbit key={orbit.radius} {...orbit} progress={progress} />
          ))}
        </motion.svg>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Method — timeline rails with ticks                                  */
/* ------------------------------------------------------------------ */

const RAILS = [
  { left: '7%', from: -35, to: 115, length: 'h-64', ticks: true },
  { left: '24%', from: 125, to: -25, length: 'h-44', ticks: false },
  { left: '42%', from: -15, to: 110, length: 'h-80', ticks: true },
  { left: '61%', from: 115, to: -35, length: 'h-52', ticks: false },
  { left: '79%', from: -45, to: 125, length: 'h-68', ticks: true },
  { left: '94%', from: 100, to: -20, length: 'h-40', ticks: false },
];

const Rail: FC<(typeof RAILS)[number] & { progress: MotionValue<number>; index: number }> = ({
  left,
  from,
  to,
  length,
  ticks,
  progress,
  index,
}) => {
  const top = useTransform(progress, [0, 1], [`${from}%`, `${to}%`]);
  const pulseOpacity = useTransform(progress, [0, 0.5, 1], [0.35, 1, 0.45]);
  return (
    <div className="absolute inset-y-0" style={{ left, width: ticks ? 10 : 1 }}>
      <div className="absolute inset-y-0 left-0 w-px" style={{ background: `rgba(${INK}, 0.08)` }} />
      {ticks &&
        Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className="absolute left-0 h-px w-2"
            style={{
              top: `${8 + i * 11}%`,
              background: `rgba(${COPPER}, 0.22)`,
            }}
          />
        ))}
      <motion.span
        style={{ top, opacity: pulseOpacity }}
        className={`absolute left-0 w-px ${length} -translate-y-1/2`}
      >
        <span
          className="block w-full h-full"
          style={{
            background: `linear-gradient(to bottom, transparent, rgba(${WARM}, 0.85), rgba(${COPPER}, 0.55), transparent)`,
            boxShadow: index % 2 === 0 ? `0 0 18px rgba(${WARM}, 0.35)` : undefined,
          }}
        />
      </motion.span>
    </div>
  );
};

export const StagesBackdrop: FC = () => {
  const progress = useBackdropProgress();
  const bandX = useTransform(progress, [0, 1], ['-8%', '6%']);

  return (
    <div aria-hidden="true" className={layer}>
      <Atmosphere
        progress={progress}
        a={`radial-gradient(ellipse 55% 45% at 10% 15%, rgba(${SAND}, 0.9) 0%, transparent 62%),
            radial-gradient(ellipse 40% 50% at 90% 80%, rgba(${WARM}, 0.1) 0%, transparent 65%)`}
        b={`linear-gradient(115deg, transparent 40%, rgba(${SAND}, 0.35) 50%, transparent 60%)`}
        drift={[8, -16]}
      />
      <motion.div
        className="absolute inset-y-[12%] w-[28%] rounded-full opacity-60 blur-3xl will-change-transform"
        style={{
          x: bandX,
          left: '36%',
          background: `radial-gradient(circle, rgba(${WARM}, 0.16), transparent 70%)`,
        }}
      />
      <Specks seed={4} count={14} />
      {RAILS.map((rail, index) => (
        <Rail key={rail.left} {...rail} progress={progress} index={index} />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Projects — rolling perspective stage                                */
/* ------------------------------------------------------------------ */

const FLOOR_TILE = 56;

export const ProjectsBackdrop: FC = () => {
  const progress = useBackdropProgress();
  const y = useTransform(progress, (p) => (p * FLOOR_TILE * 12) % FLOOR_TILE);
  const horizon = useTransform(progress, [0, 1], [0.25, 0.55]);

  return (
    <div aria-hidden="true" className={layer}>
      <Atmosphere
        progress={progress}
        a={`radial-gradient(ellipse 50% 40% at 88% 12%, rgba(${SAND}, 0.85) 0%, transparent 55%),
            radial-gradient(ellipse 60% 35% at 20% 0%, rgba(${WARM}, 0.1) 0%, transparent 60%)`}
        b={`radial-gradient(ellipse 45% 30% at 60% 30%, rgba(${COPPER}, 0.06) 0%, transparent 70%)`}
      />
      <div className="absolute inset-x-0 bottom-0 h-[62%] [perspective:680px]">
        <div className="absolute -inset-x-1/2 bottom-0 h-[240%] origin-bottom overflow-hidden [transform:rotateX(70deg)]">
          <motion.div
            style={{
              y,
              backgroundImage: `
                linear-gradient(rgba(${COPPER}, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(${COPPER}, 0.2) 1px, transparent 1px),
                linear-gradient(rgba(${WARM}, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(${WARM}, 0.08) 1px, transparent 1px)`,
              backgroundSize: `${FLOOR_TILE}px ${FLOOR_TILE}px, ${FLOOR_TILE}px ${FLOOR_TILE}px, ${FLOOR_TILE * 4}px ${FLOOR_TILE * 4}px, ${FLOOR_TILE * 4}px ${FLOOR_TILE * 4}px`,
            }}
            className="absolute inset-x-0 -top-20 bottom-0 will-change-transform"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, var(--agency-paper) 0%, color-mix(in srgb, var(--agency-paper) 75%, transparent) 40%, transparent 100%)',
          }}
        />
      </div>
      <motion.div
        className="absolute inset-x-[8%] h-px"
        style={{
          top: '42%',
          opacity: horizon,
          background: `linear-gradient(90deg, transparent, rgba(${COPPER}, 0.45), rgba(${WARM}, 0.35), rgba(${COPPER}, 0.45), transparent)`,
          boxShadow: `0 0 24px rgba(${WARM}, 0.25)`,
        }}
      />
      <Specks seed={5} count={12} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Vision — blueprint construction                                     */
/* ------------------------------------------------------------------ */

const BLUEPRINT = [
  'M -300 0 A 300 300 0 1 1 300 0 A 300 300 0 1 1 -300 0',
  'M -190 0 A 190 190 0 1 1 190 0 A 190 190 0 1 1 -190 0',
  'M 0 -300 L 260 150 L -260 150 Z',
  'M -212 -212 L 212 212',
  'M 212 -212 L -212 212',
  'M -380 0 L 380 0',
  'M 0 -380 L 0 380',
  'M -300 330 L 300 330 M -300 318 L -300 342 M 300 318 L 300 342',
  'M 330 -300 L 330 300 M 318 -300 L 342 -300 M 318 300 L 342 300',
  'M 120 0 A 120 120 0 0 0 0 -120',
  'M -80 -80 L 80 -80 L 80 80 L -80 80 Z',
];

const BlueprintLine: FC<{ d: string; index: number; progress: MotionValue<number> }> = ({ d, index, progress }) => {
  const start = index * 0.045;
  const pathLength = useTransform(progress, [start, start + 0.28], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={`rgba(${COPPER}, ${index < 3 ? 0.38 : 0.18})`}
      strokeWidth={index < 2 ? 1.25 : 1}
      strokeDasharray={index >= 3 && index < 7 ? '5 7' : undefined}
      vectorEffect="non-scaling-stroke"
      style={{ pathLength }}
    />
  );
};

export const EducationBackdrop: FC = () => {
  const progress = useBackdropProgress();
  const rotate = useTransform(progress, [0, 1], [-8, 8]);
  const gridOpacity = useTransform(progress, [0, 0.4], [0.35, 0.85]);

  return (
    <div aria-hidden="true" className={layer}>
      <Atmosphere
        progress={progress}
        a={`radial-gradient(ellipse 55% 50% at 18% 35%, rgba(${SAND}, 0.9) 0%, transparent 60%),
            radial-gradient(ellipse 35% 40% at 92% 75%, rgba(${WARM}, 0.12) 0%, transparent 65%)`}
        b={`radial-gradient(circle at 30% 60%, rgba(${COPPER}, 0.05) 0%, transparent 50%)`}
      />
      <motion.div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_65%_60%_at_18%_38%,#000,transparent)]"
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(rgba(${COPPER}, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${COPPER}, 0.1) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      <motion.svg
        viewBox="-400 -400 800 800"
        style={{ rotate }}
        className="absolute -left-[16%] top-[6%] w-[min(92vw,940px)] aspect-square"
      >
        {BLUEPRINT.map((d, index) => (
          <BlueprintLine key={index} d={d} index={index} progress={progress} />
        ))}
        <circle r={4} fill={`rgba(${COPPER}, 0.55)`} />
      </motion.svg>
      <Specks seed={6} count={14} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Anatomy — depth rings / explode map                                 */
/* ------------------------------------------------------------------ */

const DEPTH_RINGS = [100, 175, 255, 340, 430, 520];

export const AnatomyBackdrop: FC = () => {
  const progress = useBackdropProgress();
  const scale = useTransform(progress, [0, 1], [0.86, 1.14]);
  const rotate = useTransform(progress, [0, 1], [-4, 22]);
  const chordOpacity = useTransform(progress, [0.15, 0.55], [0, 1]);

  return (
    <div aria-hidden="true" className={layer}>
      <Atmosphere
        progress={progress}
        a={`radial-gradient(ellipse 48% 55% at 72% 42%, rgba(${SAND}, 0.92) 0%, transparent 62%),
            radial-gradient(ellipse 30% 35% at 15% 80%, rgba(${WARM}, 0.12) 0%, transparent 65%)`}
        b={`radial-gradient(circle at 68% 50%, rgba(${WARM}, 0.14) 0%, transparent 40%)`}
        drift={[14, -20]}
      />
      <motion.svg
        viewBox="-560 -560 1120 1120"
        style={{ scale, rotate }}
        className="absolute -right-[16%] top-[8%] w-[min(90vw,980px)] aspect-square"
      >
        {DEPTH_RINGS.map((radius, index) => {
          const opacity = 0.34 - index * 0.035;
          const a = index * 0.95;
          return (
            <g key={radius}>
              <circle
                r={radius}
                fill={index === 0 ? `rgba(${SAND}, 0.25)` : 'none'}
                stroke={`rgba(${COPPER}, ${opacity})`}
                strokeWidth={index === 0 ? 1.4 : 1}
                strokeDasharray={index % 2 ? '4 9' : undefined}
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={Math.cos(a) * radius}
                cy={Math.sin(a) * radius}
                r={index === 0 ? 5 : 3.2}
                fill={`rgba(${COPPER}, ${0.55 - index * 0.05})`}
              />
            </g>
          );
        })}
        <motion.g style={{ opacity: chordOpacity }}>
          {[0.4, 1.6, 2.7, 4.1].map((angle, i) => {
            const r0 = 100;
            const r1 = 430;
            return (
              <line
                key={angle}
                x1={Math.cos(angle) * r0}
                y1={Math.sin(angle) * r0}
                x2={Math.cos(angle) * r1}
                y2={Math.sin(angle) * r1}
                stroke={`rgba(${WARM}, ${0.28 - i * 0.04})`}
                strokeWidth={1}
                strokeDasharray="3 6"
              />
            );
          })}
        </motion.g>
        <circle r={10} fill={`rgba(${COPPER}, 0.4)`} />
      </motion.svg>
      <Specks seed={7} count={16} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Contact — radiating signal                                          */
/* ------------------------------------------------------------------ */

const SIGNAL_RINGS = [110, 200, 300, 420, 560] as const;

const SignalRing: FC<{
  progress: MotionValue<number>;
  radius: number;
  index: number;
}> = ({ progress, radius, index }) => {
  const pathLength = useTransform(progress, [0.06 + index * 0.07, 0.4 + index * 0.07], [0, 1]);

  return (
    <motion.circle
      r={radius}
      fill="none"
      stroke={`rgba(${COPPER}, ${0.3 - index * 0.035})`}
      strokeWidth={index === 0 ? 1.4 : 1}
      strokeDasharray={index % 2 ? '6 10' : undefined}
      vectorEffect="non-scaling-stroke"
      style={{ pathLength }}
    />
  );
};

export const ContactBackdrop: FC = () => {
  const progress = useBackdropProgress();
  const scale = useTransform(progress, [0, 1], [0.82, 1.18]);
  const beacon = useTransform(progress, [0, 0.5, 1], [0.35, 0.9, 0.55]);

  return (
    <div aria-hidden="true" className={layer}>
      <Atmosphere
        progress={progress}
        a={`radial-gradient(ellipse 58% 48% at 50% 40%, rgba(${SAND}, 0.98) 0%, transparent 68%),
            radial-gradient(ellipse 40% 30% at 20% 85%, rgba(${WARM}, 0.1) 0%, transparent 65%)`}
        b={`radial-gradient(circle at 50% 42%, rgba(${WARM}, 0.16) 0%, transparent 42%)`}
        drift={[6, -14]}
      />
      <motion.svg
        viewBox="-600 -600 1200 1200"
        style={{ scale }}
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[min(125vw,1180px)] aspect-square"
      >
        {SIGNAL_RINGS.map((radius, index) => (
          <SignalRing key={radius} progress={progress} radius={radius} index={index} />
        ))}
        {[0, 45, 90, 135].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={Math.cos(rad) * 40}
              y1={Math.sin(rad) * 40}
              x2={Math.cos(rad) * 520}
              y2={Math.sin(rad) * 520}
              stroke={`rgba(${WARM}, 0.12)`}
              strokeWidth={1}
            />
          );
        })}
        <motion.circle r={12} fill={`rgba(${COPPER}, 0.5)`} style={{ opacity: beacon }} />
        <motion.circle r={28} fill="none" stroke={`rgba(${WARM}, 0.45)`} strokeWidth={1.2} style={{ opacity: beacon }} />
      </motion.svg>
      <Specks seed={8} count={18} />
    </div>
  );
};
