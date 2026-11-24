import { useEffect } from 'react';
import Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Until then a navigation glide is running (time based, so an interrupted glide cannot leave it stuck) */
let autoScrollUntil = 0;

const NAV_DURATION = 1.4;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Pinned sections report their stuck position, not their place in the page,
 * so navigation goes through the static anchor rendered just before each one.
 */
const resolveAnchor = (target: string | HTMLElement | number) => {
  if (typeof target === 'number') return target;
  const id = typeof target === 'string' ? (target.startsWith('#') ? target.slice(1) : null) : target.id;
  const anchor = id ? document.querySelector<HTMLElement>(`[data-anchor="${CSS.escape(id)}"]`) : null;
  return anchor ?? target;
};

export const scrollToTarget = (rawTarget: string | HTMLElement | number) => {
  const target = resolveAnchor(rawTarget);
  if (lenis) {
    autoScrollUntil = performance.now() + NAV_DURATION * 1000 + 100;
    lenis.scrollTo(target, {
      duration: NAV_DURATION,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
    return;
  }

  const element = typeof target === 'string' ? document.querySelector(target) : target;
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** True while the smooth scroll is still gliding towards its target */
export const isSmoothScrolling = () => Boolean(lenis?.isScrolling);

/** True while a navigation glide drives the scroll */
export const isAutoScrolling = () => performance.now() < autoScrollUntil;

/** Glide that finishes a half-done section transition; any new scroll input takes over from it */
export const settleScrollTo = (top: number) => {
  if (lenis) {
    lenis.scrollTo(top, { duration: 0.8, easing: easeInOutCubic });
    return;
  }
  window.scrollTo({ top, behavior: 'smooth' });
};

/** Freezes the page behind a modal (scrollable areas inside it need `data-lenis-prevent`) */
export const lockScroll = (locked: boolean) => {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
    return;
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
};

export const useSmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    lenis = new Lenis({
      // Smooth but responsive: a lower lerp keeps the page gliding long after the wheel stops, which reads as lag
      lerp: 0.1,
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    let frameId = 0;
    const raf = (time: number) => {
      lenis?.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
};
