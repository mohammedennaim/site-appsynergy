import { FC } from 'react';
import { motion, useReducedMotionConfig, useScroll, useTransform } from 'framer-motion';

/** Architectural light: restrained, scroll-linked atmosphere without a canvas loop. */
const AppBackground: FC = () => {
  const reduceMotion = useReducedMotionConfig();
  const { scrollYProgress } = useScroll();
  const lightY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ringY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const secondaryY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const washOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.55, 0.85, 0.7, 0.9]);

  return (
    <div aria-hidden="true" className="ambient-background fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div className="ambient-light" style={{ y: reduceMotion ? 0 : lightY }} />
      <motion.div
        className="ambient-wash"
        style={{ opacity: reduceMotion ? 0.7 : washOpacity, y: reduceMotion ? 0 : secondaryY }}
      />
      <div className="ambient-grid" />
      <div className="ambient-grid ambient-grid-fine" />
      <motion.div className="ambient-orbits" style={{ y: reduceMotion ? 0 : ringY }}>
        <span />
        <span />
        <span />
        <span />
      </motion.div>
      <motion.div className="ambient-orbits ambient-orbits-secondary" style={{ y: reduceMotion ? 0 : secondaryY }}>
        <span />
        <span />
      </motion.div>
      <div className="ambient-vignette" />
    </div>
  );
};

export default AppBackground;
