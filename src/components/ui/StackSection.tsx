import { FC, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotionConfig, useScroll, useTransform } from 'framer-motion';
import { isAutoScrolling, isSmoothScrolling, settleScrollTo } from '../../hooks/useSmoothScroll';
import { PinnedProgressContext, SectionEntryProgressContext, SectionExitProgressContext, SectionProgressContext } from '../../hooks/useSectionProgress';

interface StackSectionProps {
  /** Id of the wrapped section, used as the navigation anchor */
  id: string;
  children: ReactNode;
  /** The first section has no entry transition */
  first?: boolean;
  /** The last section has no exit transition */
  last?: boolean;
  /** Extra pinned scroll distance (Tailwind classes), only for sections that animate while pinned */
  dwellClassName?: string;
}

/** The leaving and the arriving section overlap between ENTER_START and EXIT_END: a cross-fade, never a black frame */
const EXIT_END = 0.55;
const ENTER_START = 0.3;
/** Idle time after which a half-done transition is finished in the direction the visitor was going */
const SETTLE_DELAY = 180;
/** On touch screens the momentum tail sends sparse scroll events: wait it out instead of fighting it */
const TOUCH_SETTLE_DELAY = 520;
/** Height-only resizes below this are the mobile browser bars sliding in and out while scrolling */
const BAR_RESIZE = 160;
/** How far into the transition a forward scroll commits to the next section (and backward to the previous) */
const COMMIT = 0.2;

/**
 * Same-screen scene change: when the visitor reaches the end of a section it pins,
 * its content recedes and fades out, then the next section's content appears in the
 * very same place (it is held at the top of the viewport while it would normally be
 * scrolling up from below), and normal scrolling resumes from there.
 *
 * Rendered as siblings (anchor, sticky layer, end sentinel) so the sticky layer keeps
 * the whole page as its containing block and stays pinned under the following sections.
 */
const StackSection: FC<StackSectionProps> = ({ id, children, first = false, last = false, dwellClassName }) => {
  const reduceMotion = useReducedMotionConfig();
  const anchorRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState({ top: 0, origin: '50% 50%' });
  // Page offsets of the anchor and the end sentinel, the layer height and the viewport height.
  // Measured on layout changes only: reading them on every scroll frame forces layout work.
  const metrics = useRef({ start: 0, end: 0, layer: 0, viewport: 1 });

  // Pin when the section's bottom edge reaches the bottom of the viewport
  useLayoutEffect(() => {
    const layer = layerRef.current;
    const anchor = anchorRef.current;
    const sentinel = endRef.current;
    if (!layer) return;

    const measure = () => {
      const height = layer.offsetHeight;
      const viewport = window.innerHeight;
      if (anchor && sentinel) {
        const y = window.scrollY;
        metrics.current = {
          start: anchor.getBoundingClientRect().top + y,
          end: sentinel.getBoundingClientRect().top + y,
          layer: height,
          viewport,
        };
      }
      const top = Math.min(0, viewport - height);
      const origin = `50% ${Math.max(height - viewport / 2, height / 2)}px`;
      setGeometry((prev) => (prev.top === top && prev.origin === origin ? prev : { top, origin }));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(layer);
    // Sections above growing or shrinking move this one: the page height changes with them
    observer.observe(document.body);

    // Re-pinning mid-gesture each time the browser bars move would make the page jump
    let width = window.innerWidth;
    let height = window.innerHeight;
    const onResize = () => {
      if (window.innerWidth === width && Math.abs(window.innerHeight - height) < BAR_RESIZE) return;
      width = window.innerWidth;
      height = window.innerHeight;
      measure();
    };
    window.addEventListener('resize', onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const { scrollY } = useScroll();
  const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
  // 0 → 1 while this section's start travels from the bottom of the viewport to the top
  const entry = useTransform(scrollY, (y) => {
    const { start, viewport } = metrics.current;
    return clamp01((y - start + viewport) / Math.max(1, viewport));
  });
  // 0 → 1 while the next section's start does the same (this section is pinned meanwhile)
  const exit = useTransform(scrollY, (y) => {
    const { end, viewport } = metrics.current;
    return clamp01((y - end + viewport) / Math.max(1, viewport));
  });

  // Entry: cancel the upward travel so the section appears at the top of the screen, then fade it in.
  // Before that it is parked below the viewport so its own in-view reveals wait until it shows.
  const enterY = useTransform(entry, (p) => {
    if (p <= ENTER_START) return window.innerHeight;
    const hold = -(1 - p) * window.innerHeight;
    const rise = 80 * (1 - (p - ENTER_START) / (1 - ENTER_START));
    return hold + rise;
  });
  const enterOpacity = useTransform(entry, [ENTER_START, 0.9], [0, 1]);
  // Grows into place: scaling above 1 would widen the page and allow sideways scrolling on mobile
  const enterScale = useTransform(entry, [ENTER_START, 1], [0.96, 1]);
  const enterVisibility = useTransform(entry, (p) => (p > ENTER_START ? 'visible' : 'hidden'));

  // Exit: recede and fade out while pinned, mostly gone before the next section is fully in
  const exitScale = useTransform(exit, [0, EXIT_END], [1, 0.92]);
  const exitY = useTransform(exit, [0, EXIT_END], [0, -60]);
  const exitOpacity = useTransform(exit, [0, EXIT_END * 0.8], [1, 0]);
  const exitVisibility = useTransform(exit, (p) => (p >= EXIT_END ? 'hidden' : 'visible'));

  // Reading progress, from the anchor and the end sentinel: both stay in normal flow,
  // unlike the pinned and transformed layer
  const reading = useTransform(scrollY, (y) => {
    const { start, end, viewport } = metrics.current;
    return clamp01((y - start) / Math.max(1, end - viewport - start));
  });

  // Same, but only from the moment the section's bottom reaches the bottom of the screen and it stops moving
  const pinned = useTransform(scrollY, (y) => {
    const { start, end, layer, viewport } = metrics.current;
    const from = start + Math.max(0, layer - viewport);
    return clamp01((y - from) / Math.max(1, end - viewport - from));
  });

  // Scrolling always stays in the visitor's hands, so it never stalls. Only once they stop
  // inside a transition is it finished, in the direction they were going.
  useEffect(() => {
    if (last || reduceMotion) return;
    let timer = 0;
    let lastY = window.scrollY;
    let direction = 1;
    let touching = false;
    const delay = window.matchMedia('(pointer: coarse)').matches ? TOUCH_SETTLE_DELAY : SETTLE_DELAY;

    const targetFor = (forward: boolean) => {
      const sentinel = endRef.current;
      if (!sentinel) return null;
      const nextTop = sentinel.getBoundingClientRect().top + window.scrollY;
      return forward ? nextTop : nextTop - window.innerHeight;
    };

    const settle = () => {
      // A finger on the screen keeps control; never cut into a glide that is still running either
      if (touching) return;
      if (isSmoothScrolling() || isAutoScrolling()) {
        timer = window.setTimeout(settle, delay);
        return;
      }
      const p = exit.get();
      if (p <= 0.02 || p >= 0.98) return;
      const top = targetFor(direction > 0 ? p > COMMIT : p > 1 - COMMIT);
      if (top !== null) settleScrollTo(top);
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y !== lastY) direction = y > lastY ? 1 : -1;
      lastY = y;
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, delay);
    };
    const onTouchStart = () => {
      touching = true;
      window.clearTimeout(timer);
    };
    const onTouchEnd = () => {
      touching = false;
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, delay);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [exit, last, reduceMotion]);

  if (reduceMotion) {
    return (
      <>
        <div data-anchor={id} aria-hidden="true" />
        {children}
      </>
    );
  }

  return (
    <>
      <div ref={anchorRef} data-anchor={id} aria-hidden="true" />
      <div ref={layerRef} className="relative" style={{ position: 'sticky', top: geometry.top }}>
        <motion.div
          className={first ? undefined : 'will-change-[transform,opacity]'}
          style={
            first
              ? undefined
              : { y: enterY, opacity: enterOpacity, scale: enterScale, visibility: enterVisibility, transformOrigin: '50% 0' }
          }
        >
          {/* Promoted layers: the scene change is composited instead of repainting the whole section every frame */}
          <motion.div
            className={last ? undefined : 'will-change-[transform,opacity]'}
            style={
              last
                ? undefined
                : {
                    y: exitY,
                    scale: exitScale,
                    opacity: exitOpacity,
                    visibility: exitVisibility,
                    transformOrigin: geometry.origin,
                  }
            }
          >
            <SectionProgressContext.Provider value={reading}>
              <PinnedProgressContext.Provider value={pinned}>
                <SectionExitProgressContext.Provider value={last ? null : exit}>
                  <SectionEntryProgressContext.Provider value={first ? null : entry}>
                    {children}
                  </SectionEntryProgressContext.Provider>
                </SectionExitProgressContext.Provider>
              </PinnedProgressContext.Provider>
            </SectionProgressContext.Provider>
          </motion.div>
        </motion.div>
      </div>
      {dwellClassName && <div aria-hidden="true" className={dwellClassName} />}
      <div ref={endRef} data-anchor-end={id} aria-hidden="true" />
    </>
  );
};

export default StackSection;
