import { FC, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedMonogramProps {
  className?: string;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
/** Icon only — no wordmark text */
const MARK_SRC = '/brand/appsynergy-mark.png';

/** Cinematic reveal of the APP SYNERGY mark (icon without text). */
const AnimatedMonogram: FC<AnimatedMonogramProps> = ({ className = '' }) => {
  const reduceMotion = Boolean(useReducedMotion());
  const id = `animated-mark-${useId().replace(/:/g, '')}`;
  const guide = `${id}-guide`;
  const shine = `${id}-shine`;
  const silhouette = `${id}-silhouette`;

  const spring = (delay: number) =>
    reduceMotion
      ? { duration: 0 }
      : { type: 'spring' as const, stiffness: 300, damping: 22, mass: 0.72, delay };

  return (
    <motion.svg
      viewBox="0 0 112 112"
      className={className}
      aria-hidden="true"
      focusable="false"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.78, rotate: -9 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.62, ease: EASE_OUT }}
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
    >
      <defs>
        <linearGradient id={guide} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#2bd44f" stopOpacity=".85" />
          <stop offset="1" stopColor="#422047" stopOpacity=".45" />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset=".48" stopColor="#FFFFFF" stopOpacity=".65" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <mask id={silhouette} maskUnits="userSpaceOnUse" x="18" y="18" width="76" height="76">
          <circle cx="56" cy="56" r="38" fill="white" />
        </mask>
      </defs>

      {!reduceMotion && (
        <motion.path
          d="M4 27V4h23 M85 4h23v23 M4 83v23h23 M85 106h23V83"
          fill="none"
          stroke={`url(#${guide})`}
          strokeWidth=".65"
          strokeDasharray="1.5 2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.55, 0] }}
          transition={{ duration: 0.92, times: [0, 0.64, 1], ease: EASE_OUT }}
        />
      )}

      {!reduceMotion && (
        <motion.circle
          cx="56"
          cy="56"
          fill="none"
          stroke="#2bd44f"
          strokeWidth=".8"
          initial={{ r: 16, opacity: 0 }}
          animate={{ r: [16, 32, 46], opacity: [0, 0.42, 0] }}
          transition={{ duration: 0.86, delay: 0.28, times: [0, 0.42, 1], ease: 'easeOut' }}
        />
      )}

      {!reduceMotion && (
        <g transform="translate(56 56)">
          <motion.g
            initial={{ rotate: -72, opacity: 0 }}
            animate={{ rotate: 288, opacity: 1 }}
            transition={{
              rotate: { duration: 1.05, delay: 0.06, ease: 'linear' },
              opacity: { duration: 0.14, delay: 0.06 },
            }}
          >
            <circle cx="0" cy="-47" r="1.55" fill="#2bd44f" />
            <circle cx="0" cy="47" r=".8" fill="#E91E63" opacity=".82" />
          </motion.g>
        </g>
      )}

      <motion.g
        initial={reduceMotion ? false : { opacity: 0, scale: 0.62 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring(0.1)}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <image
          href={MARK_SRC}
          x="22"
          y="22"
          width="68"
          height="68"
          preserveAspectRatio="xMidYMid meet"
        />
      </motion.g>

      {!reduceMotion && (
        <>
          <motion.circle
            cx="28"
            cy="78"
            r="1.1"
            fill="#2bd44f"
            initial={{ opacity: 0, x: -5, y: 9, scale: 0.2 }}
            animate={{ opacity: [0, 1, 0], x: [-5, 6, 18], y: [9, -2, -19], scale: [0.2, 1.5, 0] }}
            transition={{ duration: 0.48, delay: 0.12, ease: EASE_OUT }}
          />
          <motion.circle
            cx="84"
            cy="74"
            r="1"
            fill="#422047"
            initial={{ opacity: 0, x: 7, y: 8, scale: 0.2 }}
            animate={{ opacity: [0, 1, 0], x: [7, -5, -22], y: [8, -3, -17], scale: [0.2, 1.4, 0] }}
            transition={{ duration: 0.5, delay: 0.26, ease: EASE_OUT }}
          />
        </>
      )}

      {!reduceMotion && (
        <motion.rect
          x="-30"
          y="18"
          width="28"
          height="76"
          fill={`url(#${shine})`}
          mask={`url(#${silhouette})`}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 118, opacity: [0, 1, 0.78, 0] }}
          transition={{ duration: 0.7, delay: 0.48, times: [0, 0.36, 0.72, 1], ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </motion.svg>
  );
};

export default AnimatedMonogram;
