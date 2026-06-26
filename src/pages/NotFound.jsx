import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Display } from '../components/Primitives';
import { BtnPrimary } from '../components/Primitives';
import { useLocale } from '../hooks/useLocale';

export default function NotFound() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  return (
    <section className="flex min-h-[80vh] items-center" style={{ paddingTop: 'var(--nav-height)' }}>
      <Helmet>
        <title>Off The Map | Kite Pirates</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container-px mx-auto max-w-content text-center">
        <p className="font-display text-8xl text-teal">404</p>
        <Display as="h1" className="mt-2 text-4xl text-ink sm:text-5xl">
          {t('notFound.title')}
        </Display>
        <p className="mx-auto mt-3 max-w-md text-gray-light">{t('notFound.sub')}</p>
        <div className="mt-8 flex justify-center">
          <BtnPrimary to={lp('/')} size="lg">
            {t('notFound.home')}
          </BtnPrimary>
        </div>
      </div>
    </section>
  );
}
