import { FC } from 'react';
import { motion } from 'framer-motion';
import { LANGS, useI18n } from '../../i18n/context';

interface LanguageSwitcherProps {
  /** Minimal stacked text toggle for the narrow desktop sidebar */
  vertical?: boolean;
  /** Distinguishes the shared-layout highlight when several switchers are mounted */
  id: string;
  className?: string;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ vertical = false, id, className = '' }) => {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={
        vertical
          ? `flex flex-col items-center ${className}`
          : `relative inline-flex p-1 rounded-xl border border-bw-border bg-white/[0.04] ${className}`
      }
    >
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-pressed={active}
            title={active ? undefined : t.language.switchTo}
            className={
              vertical
                ? `relative flex items-center justify-center w-14 h-7 text-[11px] font-bold uppercase tracking-[0.2em] pl-[0.2em]
                  transition-colors duration-300 ${active ? 'text-[var(--agency-ink)]' : 'text-[var(--sidebar-muted)] hover:text-[var(--sidebar-accent)]'}`
                : `relative grid place-items-center w-9 h-8 rounded-lg text-[11px] font-bold uppercase tracking-wider
                  transition-colors duration-300 ${active ? 'text-bw-text-inverted' : 'text-bw-text-tertiary hover:text-bw-text-primary'}`
            }
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                className={
                  vertical
                    ? 'absolute left-1.5 inset-y-0 my-auto w-1 h-1 rounded-full bg-[var(--sidebar-accent)]'
                    : 'absolute inset-0 rounded-lg bg-accent shadow-lg shadow-accent/30'
                }
              />
            )}
            <span className="relative">{code}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
