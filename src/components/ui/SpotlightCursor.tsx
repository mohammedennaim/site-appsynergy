import { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

type CursorMode = 'default' | 'interactive' | 'text';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], .cursor-pointer, [data-cursor], label, select, summary';
const TEXT_SELECTOR = 'input, textarea, [contenteditable="true"]';

const SpotlightCursor: FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const glowX = useSpring(x, { stiffness: 120, damping: 30 });
  const glowY = useSpring(y, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const resolve = (target: Element | null) => {
      if (!target) return;

      if (target.closest(TEXT_SELECTOR)) {
        setMode('text');
        setLabel(null);
        return;
      }

      const interactive = target.closest<HTMLElement>(INTERACTIVE_SELECTOR);
      setMode(interactive ? 'interactive' : 'default');
      setLabel(interactive?.dataset.cursor ?? null);
    };

    const onOver = (e: PointerEvent) => resolve(e.target as Element | null);
    const onDown = () => setPressed(true);
    const onUp = () => {
      setPressed(false);
      requestAnimationFrame(() => resolve(document.elementFromPoint(x.get(), y.get())));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = label ? 84 : mode === 'interactive' ? 52 : mode === 'text' ? 0 : 34;
  const ringScale = pressed ? 0.85 : 1;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9998]">
      {/* Ambient glow, trails behind the pointer */}
      <motion.div
        className="fixed top-0 left-0 rounded-full will-change-transform"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: 420,
          height: 420,
          background: 'radial-gradient(circle, rgba(213,190,145,0.06) 0%, transparent 60%)',
        }}
        animate={{ opacity: visible && mode !== 'text' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 grid place-items-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          scale: ringScale,
          opacity: visible && mode !== 'text' ? 1 : 0,
          borderColor: mode === 'interactive' ? 'rgba(213,190,145,0.9)' : 'rgba(255,255,255,0.35)',
          backgroundColor: label
            ? 'rgba(213,190,145,0.92)'
            : mode === 'interactive'
              ? 'rgba(213,190,145,0.12)'
              : 'rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-[11px] font-semibold uppercase tracking-wider text-black"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dot, follows the pointer exactly */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-accent"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: 6,
          height: 6,
          opacity: visible && !label && mode !== 'text' ? 1 : 0,
          scale: pressed ? 0.6 : mode === 'interactive' ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 35 }}
      />
    </div>
  );
};

export default SpotlightCursor;
