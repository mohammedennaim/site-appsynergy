import { FC } from 'react';

/**
 * Film grain over the page. A pre-rendered tile instead of a live full-screen SVG filter
 * with a blend mode, which forced the whole viewport to be repainted on every scroll frame.
 */
const NoiseBackground: FC = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] mix-blend-multiply"
    style={{ backgroundImage: 'url(/noise.svg)', backgroundSize: '180px 180px' }}
  />
);

export default NoiseBackground;
