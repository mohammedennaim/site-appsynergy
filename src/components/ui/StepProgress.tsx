import { FC } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';

interface StepProgressProps {
  /** Scroll position through the panels (0 → count) */
  position: MotionValue<number>;
  index: number;
  color: string;
}

/** Hairline at the bottom of the active panel, filling as the visitor scrolls through it */
const StepProgress: FC<StepProgressProps> = ({ position, index, color }) => {
  const scaleX = useTransform(position, (p) => Math.min(1, Math.max(0, p - index)));
  return (
    <motion.div
      style={{ scaleX, background: `linear-gradient(90deg, transparent, ${color})` }}
      className="absolute bottom-0 inset-x-0 h-[2px] z-30 origin-left"
    />
  );
};

export default StepProgress;
