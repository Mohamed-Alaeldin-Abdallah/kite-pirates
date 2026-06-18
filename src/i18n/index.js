import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import de from './de.json';
import fr from './fr.json';
import ru from './ru.json';
import ar from './ar.json';
import it from './it.json';

export const LOCALES = [
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr' },
  { code: 'de', label: 'DE', name: 'Deutsch', dir: 'ltr' },
  { code: 'fr', label: 'FR', name: 'Français', dir: 'ltr' },
  { code: 'it', label: 'IT', name: 'Italiano', dir: 'ltr' },
  { code: 'ru', label: 'RU', name: 'Русский', dir: 'ltr' },
  { code: 'ar', label: 'AR', name: 'العربية', dir: 'rtl' },
];

export const SUPPORTED = LOCALES.map((l) => l.code);

export function dirFor(code) {
  return LOCALES.find((l) => l.code === code)?.dir || 'ltr';
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      fr: { translation: fr },
      it: { translation: it },
      ru: { translation: ru },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED,
    nonExplicitSupportedLngs: true,
    detection: {
      // Read the locale prefix from the URL path first (/de/..., /ar/...).
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    interpolation: {
      // React already escapes output, so i18next escaping stays off — but we
      // never pass untrusted HTML through t(); values are plain strings only.
      escapeValue: false,
    },
    returnNull: false,
  });

// Keep <html lang> and <html dir> in sync for a11y + correct RTL rendering.
function applyHtmlLangDir(lng) {
  const code = (lng || 'en').split('-')[0];
  document.documentElement.lang = code;
  document.documentElement.dir = dirFor(code);
}
applyHtmlLangDir(i18n.resolvedLanguage || i18n.language);
i18n.on('languageChanged', applyHtmlLangDir);

export default i18n;
