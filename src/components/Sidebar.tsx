import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems } from '../data/navigation';
import { useActiveSection } from '../hooks/useActiveSection';
import { useI18n } from '../i18n/context';
import LanguageSwitcher from './ui/LanguageSwitcher';
import Logo from './ui/Logo';

const EASE = [0.16, 1, 0.3, 1] as const;

const tooltipClass = `absolute left-full ml-3 flex items-center gap-2.5 px-3 py-2 rounded-lg border border-[var(--sidebar-line)] bg-[var(--sidebar-surface)] shadow-md
    text-[11px] font-semibold uppercase tracking-[0.25em] whitespace-nowrap pointer-events-none
    opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
    group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-300`;

const Sidebar: React.FC = () => {
    const { activeSection, navigateTo } = useActiveSection();
    const { t } = useI18n();

    const activeIndex = navItems.findIndex((item) => item.href.substring(1) === activeSection);
    const activeItem = navItems[activeIndex];

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        navigateTo(href);
    };

    return (
        <aside className="agency-sidebar fixed left-0 top-0 h-full w-20 z-50 hidden md:flex flex-col items-center justify-between py-7 [@media(max-height:720px)]:py-5">
            <motion.a
                href="#accueil"
                onClick={(e) => handleClick(e, '#accueil')}
                aria-label={t.nav.backHome}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="group block"
            >
                <Logo animated="mount" delay={700} className="w-12 h-12" />
            </motion.a>

            <nav aria-label={t.nav.mainNav}>
                <ol className="flex flex-col">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const label = t.nav[item.key];
                        const isActive = index === activeIndex;

                        return (
                            <motion.li
                                key={item.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 + index * 0.05, duration: 0.5, ease: EASE }}
                            >
                                <a
                                    href={item.href}
                                    onClick={(e) => handleClick(e, item.href)}
                                    aria-label={label}
                                    aria-current={isActive ? 'true' : undefined}
                                    className="agency-sidebar-link group relative grid place-items-center w-20 h-11 [@media(max-height:720px)]:h-9"
                                >
                                    <span className="agency-sidebar-icon grid h-8 w-10 place-items-center rounded-lg">
                                        <Icon aria-hidden="true" size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                                    </span>

                                    {isActive && (
                                        <motion.span
                                            layoutId="sidebar-rail"
                                            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                                            className="absolute -right-px inset-y-0 my-auto h-6 w-[2px] rounded-full bg-[var(--sidebar-accent)]"
                                        />
                                    )}

                                    <span className={tooltipClass}>
                                        {label}
                                    </span>
                                </a>
                            </motion.li>
                        );
                    })}
                </ol>
            </nav>

            <div className="flex flex-col items-center gap-4 [@media(max-height:720px)]:gap-2">
                <div aria-hidden="true" className="h-28 flex flex-col justify-end overflow-hidden [@media(max-height:760px)]:hidden">
                    <AnimatePresence mode="wait" initial={false}>
                        {activeItem && (
                            <motion.span
                                key={activeItem.key}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className="block"
                            >
                                <span className="block rotate-180 [writing-mode:vertical-rl] text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--sidebar-muted)] whitespace-nowrap">
                                    {t.nav[activeItem.key]}
                                </span>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <LanguageSwitcher id="sidebar" vertical />
            </div>
        </aside>
    );
};

export default Sidebar;
