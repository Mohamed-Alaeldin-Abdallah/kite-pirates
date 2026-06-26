import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import CtaStrip from '../components/CtaStrip';
import ImgPlaceholder from '../components/ImgPlaceholder';
import { Display, Eyebrow } from '../components/Primitives';
import { Users } from 'lucide-react';
import { pageMeta } from '../seo/meta';
import { useContent } from '../hooks/useContent';

export default function About() {
  const { t } = useTranslation();
  const { values, aboutStory, aboutStats } = useContent();

  return (
    <>
      <Seo meta={pageMeta.about} />

      {/* HERO SPLIT */}
      <section className="grain relative overflow-hidden" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container-px mx-auto grid max-w-content items-center gap-10 py-16 md:grid-cols-2">
          <Reveal direction="right">
            <ImgPlaceholder src="/images/crew.jpeg" alt="The Kite Pirates crew" label="The Crew" icon={Users} ratio="aspect-[4/3]" className="min-h-[320px]" />
          </Reveal>
          <Reveal direction="left">
            <Eyebrow>{t('home.eyebrow')}</Eyebrow>
            <Display as="h1" className="mt-3 text-balance text-5xl text-ink sm:text-6xl">
              {t('about.title')}
            </Display>
            <p className="mt-4 text-lg text-gray-light">{t('about.sub')}</p>
          </Reveal>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section">
        <div className="container-px mx-auto max-w-prose text-center">
          <Reveal>
            <Display as="h2" className="mb-6 text-3xl text-teal sm:text-4xl">
              {t('about.storyTitle')}
            </Display>
          </Reveal>
          {aboutStory.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="mb-5 font-accent text-xl italic leading-relaxed text-ink">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-dark-2">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Display as="h2" className="text-4xl text-ink sm:text-5xl">
              {t('about.valuesTitle')}
            </Display>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="rounded-lg border border-mid bg-dark p-6">
                  <span className="text-4xl" aria-hidden="true">{v.icon}</span>
                  <h3 className="mt-3 font-display text-2xl uppercase text-teal">{v.title}</h3>
                  <p className="mt-1 text-gray-light">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-teal text-dark">
        <div className="container-px mx-auto grid max-w-content gap-6 py-12 sm:grid-cols-4">
          {aboutStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center">
              <p className="font-display text-5xl">{s.value}</p>
              <p className="text-sm font-semibold uppercase tracking-wide">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OUR PROMISE */}
      <section className="section">
        <div className="container-px mx-auto max-w-prose text-center">
          <Reveal>
            <Display as="h2" className="mb-5 text-3xl text-ink sm:text-4xl">
              {t('about.promiseTitle')}
            </Display>
            <p className="font-accent text-xl italic leading-relaxed text-gray-light">
              “{t('about.promise')}”
            </p>
          </Reveal>
        </div>
      </section>

      <CtaStrip title={t('home.scarcityTitle')} sub={t('home.scarcitySub')} />
    </>
  );
}
