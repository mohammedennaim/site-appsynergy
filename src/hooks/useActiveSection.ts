import { useCallback, useEffect, useState } from 'react';
import { navItems } from '../data/navigation';
import { scrollToTarget } from './useSmoothScroll';

const sectionIds = navItems.map((item) => item.href.substring(1));

const anchors = new Map<string, HTMLElement>();

/** Static anchor before each section (pinned sections keep reporting a stuck position) */
const anchorOf = (id: string) => {
  const cached = anchors.get(id);
  if (cached?.isConnected) return cached;
  const anchor = document.querySelector<HTMLElement>(`[data-anchor="${CSS.escape(id)}"]`) ?? document.getElementById(id);
  if (anchor) anchors.set(id, anchor);
  return anchor;
};

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // The active section is the last one whose start has crossed the middle of the viewport
      const line = window.innerHeight * 0.5;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const anchor = anchorOf(id);
        if (anchor && anchor.getBoundingClientRect().top <= line) current = id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const navigateTo = useCallback((href: string) => {
    const id = href.substring(1);
    if (!anchorOf(id)) return;

    scrollToTarget(href);
    setActiveSection(id);
    history.replaceState(null, '', href);
  }, []);

  return { activeSection, navigateTo };
};
