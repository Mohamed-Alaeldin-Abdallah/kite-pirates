import { useTranslation } from 'react-i18next';
import { MessageCircle, Anchor } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import { Eyebrow, BtnPrimary, BtnGhost } from '../components/Primitives';
import { pageMeta } from '../seo/meta';
import { whatsappUrl } from '../lib/config';
import { useLocale } from '../hooks/useLocale';
import { safari } from '../data/safari';

export default function Safari() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const highlights = t('safari.highlights', { returnObjects: true });

  return (
    <>
      <Seo meta={pageMeta.safari} />

      <PageHero eyebrow={t('home.eyebrow')} title={t('safari.title')} sub={t('safari.sub')} />

      <section className="section">
        <div className="container-px mx-auto max-w-content text-center">
          <Reveal>
            <Eyebrow>{t('safari.startingFrom')}</Eyebrow>
            <p className="mt-3 font-display text-6xl text-ocean sm:text-7xl">
              €{safari.startingFrom.toLocaleString()}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-gray-light">{t('safari.note')}</p>
          </Reveal>

          {Array.isArray(highlights) && highlights.length > 0 && (
            <Reveal delay={0.12}>
              <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-2 text-sm text-gray-light">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center justify-center gap-2">
                    <span aria-hidden="true" className="text-ocean">·</span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <BtnPrimary to={lp('/book')}>
                <Anchor className="h-5 w-5" aria-hidden="true" />
                {t('nav.bookNow')}
              </BtnPrimary>
              <BtnGhost href={whatsappUrl(t('whatsapp.prefill'))} external>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {t('cta.whatsappUs')}
              </BtnGhost>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
