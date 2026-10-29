import { useTranslation } from 'react-i18next';
import { Anchor, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { Display, Eyebrow, BtnPrimary, BtnGhost } from '../components/Primitives';
import CtaStrip from '../components/CtaStrip';
import PackageCard from '../components/PackageCard';
import WindCards from '../components/WindCards';
import { pageMeta } from '../seo/meta';
import { organizationSchema } from '../seo/schemas';
import { whatsappUrl } from '../lib/config';
import { useLocale } from '../hooks/useLocale';
import { useContent } from '../hooks/useContent';

export default function Home() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const { stats, reviews, experienceTeasers, packages } = useContent();
  const teaserPkgs = packages.filter((p) => ['mate', 'pirate', 'captain'].includes(p.id));

  return (
    <>
      <Seo meta={pageMeta.home} schemas={[organizationSchema()]} />

      {/* HERO — airy white, text + framed photo */}
      <section
        className="border-b border-mid bg-white"
        style={{ paddingTop: 'calc(var(--nav-height) + clamp(40px, 7vw, 72px))' }}
      >
        <div className="container-px mx-auto grid max-w-content items-center gap-12 pb-[clamp(48px,8vw,88px)] lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <Eyebrow className="mb-5">{t('home.eyebrow')}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <Display as="h1" className="max-w-3xl text-balance text-6xl text-ink sm:text-7xl md:text-8xl">
                {t('home.title')}
              </Display>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg text-gray-light">{t('home.sub')}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap gap-4">
                <BtnPrimary to={lp('/packages')}>
                  <Anchor className="h-5 w-5" aria-hidden="true" />
                  {t('cta.seePackages')}
                </BtnPrimary>
                <BtnGhost href={whatsappUrl(t('whatsapp.prefill'))} external>
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  {t('cta.whatsappNow')}
                </BtnGhost>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} direction="left">
            <img
              src="/images/hero.jpeg"
              alt="Kite surfing on the Red Sea in Hurghada"
              className="aspect-[4/3] w-full rounded-lg border border-mid object-cover lg:aspect-[4/5]"
              fetchPriority="high"
            />
          </Reveal>
        </div>
      </section>

      {/* LIVE WIND */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow className="mb-6">{t('wind.live', 'Live')} · Hurghada</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <WindCards />
          </Reveal>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-mid bg-dark-3">
        <div className="container-px mx-auto grid max-w-content gap-6 py-16 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center sm:text-start">
              <p className="font-display text-6xl text-ocean">{s.value}</p>
              <p className="mt-1 font-display text-xl uppercase text-ink">{s.label}</p>
              <p className="mt-1 text-sm text-gray-light">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="section">
        <div className="container-px mx-auto max-w-prose text-center">
          <Reveal>
            <p className="font-accent text-2xl italic leading-relaxed text-ink sm:text-3xl">
              “{t('home.statementQuote')}”
            </p>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS STRIP */}
      <section className="border-y border-mid bg-dark-3">
        <div className="container-px mx-auto max-w-content overflow-x-auto py-12">
          <ul className="flex gap-8">
            {reviews.map((r) => (
              <li key={r.quote} className="flex min-w-[260px] flex-col gap-2">
                <span className="flex gap-0.5" aria-label={`${r.stars} out of 5 stars`}>
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-sand text-sand" aria-hidden="true" />
                  ))}
                </span>
                <p className="font-accent text-lg italic text-ink">“{r.quote}”</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EXPERIENCE TEASER */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('home.experienceSub')}</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl text-ink sm:text-5xl">
              {t('home.experienceTitle')}
            </Display>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experienceTeasers.map((card, i) => (
              <Reveal key={card.title} delay={(i % 3) * 0.07}>
                <Link
                  to={lp('/experience')}
                  className="group flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg border border-mid bg-white p-6 transition-colors duration-300 hover:border-teal"
                >
                  <span className="mb-2 text-4xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h3 className="font-display text-2xl uppercase text-ink">{card.title}</h3>
                  <p className="mt-1 text-sm text-gray-light">{card.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <BtnGhost to={lp('/experience')}>
              {t('cta.exploreExperience')} <ArrowRight className="h-4 w-4 flip-rtl" aria-hidden="true" />
            </BtnGhost>
          </div>
        </div>
      </section>

      {/* PACKAGES TEASER */}
      <section className="section bg-dark-3">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('home.packagesSub')}</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl text-ink sm:text-5xl">
              {t('home.packagesTitle')}
            </Display>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {teaserPkgs.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.08}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <BtnGhost to={lp('/packages')}>
              {t('cta.viewPackages')} <ArrowRight className="h-4 w-4 flip-rtl" aria-hidden="true" />
            </BtnGhost>
          </div>
        </div>
      </section>

      {/* PROGRAMS TEASER */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('home.programsSub')}</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl text-ink sm:text-5xl">
              {t('home.programsTitle')}
            </Display>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              { icon: '🪁', label: t('home.programsKite') },
              { icon: '🏄', label: t('home.programsWing') },
              { icon: '🌍', label: t('home.programsDay') },
            ].map((p, i) => (
              <Reveal key={p.label} delay={i * 0.07}>
                <Link
                  to={lp('/courses')}
                  className="flex items-center gap-4 rounded-lg border border-mid bg-white p-6 transition-colors duration-300 hover:border-teal"
                >
                  <span className="text-3xl" aria-hidden="true">{p.icon}</span>
                  <span className="font-display text-2xl uppercase text-ink">{p.label}</span>
                  <ArrowRight className="ms-auto h-5 w-5 flip-rtl text-ocean" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip title={t('home.scarcityTitle')} sub={t('home.scarcitySub')} />
    </>
  );
}
