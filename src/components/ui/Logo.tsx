import { FC, useEffect, useRef, useState } from 'react';
import AnimatedMonogram from './AnimatedMonogram';

interface LogoProps {
  className?: string;
  variant?: 'mark' | 'signature';
  framed?: boolean;
  /** `light` on paper · `dark` on dark chrome */
  tone?: 'light' | 'dark';
  decorative?: boolean;
  animated?: 'mount' | 'inView';
  delay?: number;
}

const REPLAY_AFTER = 1300;

const Logo: FC<LogoProps> = ({
  className = '',
  variant = 'mark',
  framed = true,
  tone = 'light',
  decorative = true,
  animated,
  delay = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(0);
  const playedAt = useRef(0);

  useEffect(() => {
    if (!animated) return;
    const start = () => {
      playedAt.current = performance.now();
      setPlay(1);
    };
    if (animated === 'mount') {
      const id = window.setTimeout(start, delay);
      return () => window.clearTimeout(id);
    }
    const element = ref.current;
    if (!element) return;
    let id = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        id = window.setTimeout(start, delay);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(id);
    };
  }, [animated, delay]);

  const replay = () => {
    if (!play || performance.now() - playedAt.current < REPLAY_AFTER) return;
    playedAt.current = performance.now();
    setPlay((n) => n + 1);
  };

  return (
    <span
      ref={ref}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'APP SYNERGY'}
      aria-hidden={decorative ? true : undefined}
      onMouseEnter={animated ? replay : undefined}
      data-tone={tone}
      className={`brand-logo ${variant === 'signature' ? 'brand-logo-signature' : ''} ${className}`}
    >
      <span className={`brand-logo-mark ${framed ? 'brand-logo-frame' : ''}`}>
        {!animated ? (
          <svg viewBox="0 0 112 112" aria-hidden="true" className="w-full h-full">
            <image href="/brand/appsynergy-mark.png" x="12" y="12" width="88" height="88" preserveAspectRatio="xMidYMid meet" />
          </svg>
        ) : (
          play > 0 && <AnimatedMonogram key={play} className="block w-full h-full" />
        )}
      </span>
      {variant === 'signature' && (
        <span className="brand-logo-wordmark brand-logo-wordmark--appsynergy">
          <span className="brand-logo-app">App</span>
          <span className="brand-logo-synergy">Synergy</span>
        </span>
      )}
    </span>
  );
};

export default Logo;
