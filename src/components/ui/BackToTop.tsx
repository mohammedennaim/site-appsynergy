import { FC, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { scrollToTarget } from '../../hooks/useSmoothScroll';
import { useI18n } from '../../i18n/context';

const BackToTop: FC = () => {
  const { t } = useI18n();
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setVisible(y > window.innerHeight * 0.8);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label={t.nav.backToTop}
          onClick={() => scrollToTarget(0)}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-6 right-6 z-50 grid place-items-center w-12 h-12 rounded-full border border-[#d7c8b9] bg-[#fffbf6]/95 text-[var(--agency-ink)] shadow-[0_12px_28px_-18px_rgba(55,40,28,0.55)] backdrop-blur-md transition-colors hover:border-[#b8734d]/55 hover:text-[#88482e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#88482e] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--agency-paper)]"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(136,72,46,0.12)" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="#b8734d"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
