import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PageHero from '../components/PageHero';
import { CONTACT } from '../lib/config';

/**
 * Privacy notice. GDPR-aware template — have it reviewed by a qualified
 * professional and complete the bracketed details before relying on it.
 * Copy lives in the i18n files under the `privacy` namespace.
 */
const SECTIONS = ['collect', 'why', 'analytics', 'sharing', 'retention'];

export default function Privacy() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{`${t('privacy.title')} | Kite Pirates`}</title>
        <meta name="description" content="How Kite Pirates handles your data." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <PageHero title={t('privacy.title')} sub={t('privacy.sub')} height="40vh" />

      <section className="section">
        <div className="container-px mx-auto max-w-prose space-y-6 text-gray-light">
          <p>{t('privacy.intro')}</p>

          {SECTIONS.map((k) => (
            <div key={k}>
              <h2 className="mb-2 font-display text-2xl uppercase text-ink">{t(`privacy.${k}Title`)}</h2>
              <p>{t(`privacy.${k}`)}</p>
            </div>
          ))}

          <div>
            <h2 className="mb-2 font-display text-2xl uppercase text-ink">{t('privacy.rightsTitle')}</h2>
            <p>
              {t('privacy.rights')}{' '}
              <a className="text-teal" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
              .
            </p>
          </div>

          <p className="text-sm text-gray">{t('privacy.note')}</p>
        </div>
      </section>
    </>
  );
}
