import { RefObject, useEffect, useRef } from 'react';
import { useMotionValue, useReducedMotionConfig, useTransform } from 'framer-motion';
import { usePinnedProgress, useSectionProgress } from './useSectionProgress';

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * 0 → 1 as the element's top edge rises from the bottom of the viewport to `end` (fraction of the
 * viewport height). Measured on screen so pinned and transformed sections are handled. Inside a
 * pinned section, everything is also fully revealed halfway through the reading progress, for
 * content that fits the screen and never scrolls.
 */
export const useScrollReveal = (ref: RefObject<HTMLElement | null>, end = 0.7, enabled = true) => {
  const section = useSectionProgress();
  const reduceMotion = useReducedMotionConfig();
  const animated = enabled && Boolean(section) && !reduceMotion;
  const progress = useMotionValue(animated ? 0 : 1);

  useEffect(() => {
    if (!section || !animated) {
      progress.set(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      const viewport = window.innerHeight;
      const onScreen = (viewport - element.getBoundingClientRect().top) / (viewport * (1 - end));
      progress.set(clamp01(Math.max(onScreen, section.get() * 2)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const unsubscribe = section.on('change', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ref, end, section, animated, progress]);

  return progress;
};

/**
 * 0 → 1 while the reading progress of the enclosing pinned section goes from `start` to `end`,
 * for cascades played while a section is pinned. Always 1 when sections are not pinned.
 */
export const useSectionRange = (start: number, end: number) => {
  const section = useSectionProgress();
  const reduceMotion = useReducedMotionConfig();
  const done = useMotionValue(1);
  const source = section && !reduceMotion ? section : done;
  return useTransform(source, (p) => (source === done ? 1 : clamp01((p - start) / (end - start))));
};

/** Share of the pinned section's reading progress used to walk through the steps */
export const STEPS_END = 0.9;

/**
 * Walks through `count` steps (panels) with the reading progress of the enclosing pinned section.
 * `onStep` only fires when the scroll crosses into another step, so hover / focus can still
 * take over in between. `position` (0 → count) drives progress cues.
 */
export const useScrollSteps = (
  count: number,
  onStep: (index: number) => void,
  { pinnedOnly = false }: { pinnedOnly?: boolean } = {},
) => {
  const reading = useSectionProgress();
  const pinned = usePinnedProgress();
  const section = pinnedOnly ? pinned : reading;
  const reduceMotion = useReducedMotionConfig();
  const idle = useMotionValue(0);
  const source = section && !reduceMotion ? section : null;
  const position = useTransform(source ?? idle, (p) => Math.min(count, (p / STEPS_END) * count));
  const lastStep = useRef(-1);

  useEffect(() => {
    if (!source) return;
    const apply = (p: number) => {
      const step = Math.min(count - 1, Math.floor((p / STEPS_END) * count));
      if (step === lastStep.current) return;
      lastStep.current = step;
      onStep(step);
    };
    apply(source.get());
    return source.on('change', apply);
  }, [source, count, onStep]);

  return { position, enabled: Boolean(source) };
};
