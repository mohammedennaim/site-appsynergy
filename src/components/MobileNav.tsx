import { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { navItems, socialLinks } from '../data/navigation';
import { contactInfo } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToTarget } from '../hooks/useSmoothScroll';
import { useI18n } from '../i18n/context';
import LanguageSwitcher from './ui/LanguageSwitcher';
import Logo from './ui/Logo';

const EASE = [0.16, 1, 0.3, 1] as const;

const MobileNav: FC = () => {
  const { t } = useI18n();
  const { activeSection, navigateTo } = useActiveSection();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    setHidden(y > 160 && y > previous);
  });

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => navigateTo(href), 50);
  };

  const activeItem = navItems.find((item) => item.href === `#${activeSection}`);
  const activeLabel = activeItem ? t.nav[activeItem.key] : '';
  const solidBar = scrolled || open;

  return (
    <div className="md:hidden">
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: hidden && !open ? -80 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className={`agency-mobile-bar fixed top-0 inset-x-0 z-[60] h-16 px-4 flex items-center justify-between gap-3 transition-[background,border-color,box-shadow] duration-300 ${
          solidBar ? 'agency-mobile-bar--solid' : 'agency-mobile-bar--clear'
        }`}
      >
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            scrollToTarget(0);
          }}
          aria-label={t.nav.backHome}
          className="group min-w-0 max-w-[62%] text-left"
        >
          <Logo
            variant="signature"
            tone="light"
            framed
            animated="mount"
            delay={700}
            decorative={false}
            className="agency-mobile-logo"
          />
        </button>

        <div className="relative h-5 min-w-0 flex-1 overflow-hidden text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--agency-ink)]/55">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'menu' : activeLabel}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="block truncate"
            >
              {open ? t.nav.menu : activeLabel}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher id="mobile-bar" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="agency-mobile-toggle relative w-10 h-10 rounded-xl grid place-items-center"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute w-4 h-[2px] rounded-full bg-[var(--agency-ink)]"
            />
            <motion.span
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute w-4 h-[2px] rounded-full bg-[var(--agency-ink)]"
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={t.nav.mainNav}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="agency-mobile-menu fixed inset-0 z-[55] flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 80% 50% at 100% 0%, rgba(184,115,77,0.14) 0%, transparent 60%)',
              }}
            />

            <ul className="relative flex-1 flex flex-col justify-center gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.05, ease: EASE }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.href);
                      }}
                      aria-current={isActive ? 'true' : undefined}
                      className="group flex items-baseline gap-4 py-2.5"
                    >
                      <span
                        className={`font-mono text-xs w-6 ${
                          isActive ? 'text-[#88482e]' : 'text-[var(--agency-ink)]/30'
                        }`}
                      >
                        {String(index).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-display font-black uppercase tracking-tight text-[2rem] leading-none transition-colors ${
                          isActive
                            ? 'text-[#88482e]'
                            : 'text-[var(--agency-ink)] group-active:text-[#88482e]'
                        }`}
                      >
                        {t.nav[item.key]}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#88482e] self-center" aria-hidden="true" />
                      )}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative pt-6 border-t border-[#d7c8b9] space-y-4"
            >
              <div className="space-y-2">
                {contactInfo.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-sm font-semibold text-[var(--agency-ink)]"
                  >
                    <Mail className="w-4 h-4 text-[#88482e]" aria-hidden="true" />
                    {email}
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-[#d7c8b9] bg-[#fffbf6] text-sm font-semibold text-[#5c534b]"
                  >
                    <Icon className="w-4 h-4 text-[#88482e]" aria-hidden="true" />
                    {label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
