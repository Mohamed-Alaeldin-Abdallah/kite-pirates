import { SUPPORTED } from '../i18n';

/** Extract a supported non-default locale prefix from a pathname, or 'en'. */
export function localeFromPath(pathname) {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && SUPPORTED.includes(seg) && seg !== 'en') return seg;
  return 'en';
}

/** Strip a leading locale segment, returning the "bare" path (no prefix). */
export function stripLocale(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] && SUPPORTED.includes(parts[0])) parts.shift();
  return '/' + parts.join('/');
}

/** Build a localized href for a bare path ('/packages') given a locale. */
export function localizePath(barePath, locale) {
  const clean = barePath.startsWith('/') ? barePath : `/${barePath}`;
  if (!locale || locale === 'en') return clean === '/' ? '/' : clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}
