import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import type { Lang, Localized } from '../types';
import { I18nContext, LANGS, LANG_STORAGE_KEY } from './context';
import { ui } from './ui';

const initialLang = (): Lang => {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && (LANGS as string[]).includes(saved)) return saved as Lang;
  // French site by default; English only for visitors whose browser asks for it first
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'fr';
};

const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(LANG_STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    const t = ui[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: ui[lang], pick: <T,>(field: Localized<T>) => field[lang] }),
    [lang, setLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export default LanguageProvider;
