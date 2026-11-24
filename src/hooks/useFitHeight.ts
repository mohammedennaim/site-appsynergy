import { useEffect, useState } from 'react';

const fit = (reserved: number, min: number, max: number) =>
  typeof window === 'undefined' ? max : Math.round(Math.min(max, Math.max(min, window.innerHeight - reserved)));

/**
 * Height that fits in the viewport once `reserved` pixels are taken, clamped to [min, max].
 * Only width changes re-measure it: height-only resizes are the mobile browser bars sliding while scrolling.
 */
export const useFitHeight = (reserved: number, min: number, max: number) => {
  const [height, setHeight] = useState(() => fit(reserved, min, max));

  useEffect(() => {
    let width = window.innerWidth;
    setHeight(fit(reserved, min, max));
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      setHeight(fit(reserved, min, max));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [reserved, min, max]);

  return height;
};
