import { useTranslation } from 'react-i18next';
import { localizePath } from '../lib/locale';

/**
 * Small helper used across the app: the active 2-letter locale plus `lp`,
 * which builds a locale-prefixed path (e.g. lp('/book') → '/de/book').
 */
export function useLocale() {
  const { i18n } = useTranslation();
  const locale = (i18n.resolvedLanguage || 'en').split('-')[0];
  const lp = (path) => localizePath(path, locale);
  return { locale, lp };
}
