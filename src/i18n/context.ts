import { createContext, useContext } from 'react';
import type { Lang, Localized } from '../types';
import { ui, type UI } from './ui';

export interface I18n {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Interface strings for the current language */
  t: UI;
  /** Picks the current language out of a bilingual data field */
  pick: <T>(value: Localized<T>) => T;
}

export const LANGS: Lang[] = ['fr', 'en'];
export const LANG_STORAGE_KEY = 'portfolio:lang';

export const I18nContext = createContext<I18n>({
  lang: 'fr',
  setLang: () => undefined,
  t: ui.fr,
  pick: (value) => value.fr,
});

export const useI18n = () => useContext(I18nContext);
