import { Helmet } from 'react-helmet-async';
import { useLocale } from '../hooks/useLocale';
import { SITE_URL } from '../lib/config';
import { KEYWORDS } from '../seo/meta';
import { LOCALES } from '../i18n';

/**
 * Per-route SEO head. Renders title, description, canonical, hreflang
 * alternates, Open Graph, Twitter card and any JSON-LD schemas.
 *
 * JSON-LD is serialized from our own trusted data objects only — never from
 * user input — so JSON.stringify into a ld+json script is safe here.
 */
export default function Seo({ meta, schemas = [] }) {
  const { locale } = useLocale();

  const prefix = locale === 'en' ? '' : `/${locale}`;
  const subpath = meta.path ? `/${meta.path}` : '';
  const canonical = `${SITE_URL}${prefix}${subpath}` || SITE_URL;
  const ogImage = `${SITE_URL}/og/${meta.slug}.jpg`;

  return (
    <Helmet>
      <html lang={locale} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={KEYWORDS} />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates for every locale + x-default */}
      {LOCALES.map((l) => {
        const p = l.code === 'en' ? '' : `/${l.code}`;
        return (
          <link
            key={l.code}
            rel="alternate"
            hrefLang={l.code === 'en' ? 'x-default' : l.code}
            href={`${SITE_URL}${p}${subpath}`}
          />
        );
      })}

      {/* Open Graph */}
      <meta property="og:title" content={`${meta.title}`} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@KitePiratesEgypt" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
