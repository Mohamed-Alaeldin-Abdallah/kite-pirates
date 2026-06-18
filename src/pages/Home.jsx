import { useTranslation } from 'react-i18next';
import { Anchor, MessageCircle, Star, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { Display, Eyebrow, BtnPrimary, BtnGhost } from '../components/Primitives';
import CtaStrip from '../components/CtaStrip';
import PackageCard from '../components/PackageCard';
import WaveDivider from '../components/WaveDivider';
import FloatingElements from '../components/FloatingElements';
import WindCards from '../components/WindCards';
import { Link } from 'react-router-dom';
import { pageMeta } from '../seo/meta';
import { organizationSchema } from '../seo/schemas';
import { whatsappUrl } from '../lib/config';
import { localizePath } from '../lib/locale';
import { stats, reviews } from '../data/reviews';
import { experienceTeasers } from '../data/experiences';
import { packages } from '../data/packages';

export default function Home() {
  const { t, i18n } = useTranslation();
  const locale = (i18n.resolvedLanguage || 'en').split('-')[0];
  const lp = (p) => localizePath(p, locale);
  const teaserPkgs = packages.filter((p) => ['mate', 'pirate', 'captain'].includes(p.id));

  return (
    <>
      <Seo meta={pageMeta.home} schemas={[organizationSchema()]} />

      {/* HERO — kitesurf scene over a sunset sea */}
      <section className="grain relative flex min-h-[100svh] items-center overflow-hidden">
        {/* Hero background photo */}
        <img
          src="/images/hero.jpeg"
          alt="Kite surfing on the Red Sea in Hurghada"
          className="absolute inset-0 h-full w-full object-cover"
          fetchpriority="high"
        />
        {/* Warm sunset tint over the photo */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_65%_30%,rgba(255,158,74,0.18),transparent_60%)]" />
        {/* Shimmering sea band */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(10,61,92,0.2),rgba(6,34,54,0.85))]" />
        {/* Sky props: drifting kites + seagulls */}
        <FloatingElements variant="sky" />
        {/* Readability veil */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-dark/30 to-dark/85" />

        {/* Ghost watermark */}
        <span className="ghost-watermark absolute inset-x-0 top-[22%] text-center text-[22vw] leading-none">
          KITE PIRATES
        </span>

        <div
          className="container-px relative mx-auto grid w-full max-w-content items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
          style={{ paddingTop: 'var(--nav-height)' }}
        >
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
              <p className="mt-6 max-w-xl text-lg text-foam/90 sm:text-xl">{t('home.sub')}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap gap-4">
                <BtnPrimary to={lp('/packages')} size="lg">
                  <Anchor className="h-5 w-5" aria-hidden="true" />
                  {t('cta.seePackages')}
                </BtnPrimary>
                <BtnGhost href={whatsappUrl(t('whatsapp.prefill'))} external size="lg">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  {t('cta.whatsappNow')}
                </BtnGhost>
              </div>
            </Reveal>
          </div>

          {/* Live wind cards */}
          <Reveal delay={0.24} direction="left" className="lg:justify-self-end">
            <WindCards />
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute inset-x-0 bottom-24 flex flex-col items-center gap-2 sm:bottom-28">
          <span className="h-12 w-px origin-bottom animate-pulseLine bg-aqua" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foam/70">Scroll</span>
        </div>

        {/* Shoreline wave into the next section */}
        <div className="absolute inset-x-0 bottom-0">
          <WaveDivider color="var(--color-dark-2)" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-mid bg-dark-2">
        <div className="container-px mx-auto grid max-w-content gap-6 py-12 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center sm:text-start">
              <p className="font-display text-6xl text-teal">{s.value}</p>
              <p className="font-display text-xl uppercase text-ink">{s.label}</p>
              <p className="text-sm text-gray-light">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="section relative overflow-hidden">
        <FloatingElements variant="sea" className="opacity-70" />
        <div className="container-px relative mx-auto max-w-prose text-center">
          <Reveal>
            <p className="font-accent text-2xl italic leading-relaxed text-ink sm:text-3xl">
              “{t('home.statementQuote')}”
            </p>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS STRIP */}
      <WaveDivider color="var(--color-teal)" />
      <section className="bg-teal text-dark">
        <div className="container-px mx-auto max-w-content overflow-x-auto py-8">
          <ul className="flex gap-6">
            {reviews.map((r) => (
              <li key={r.quote} className="flex min-w-[260px] flex-col gap-2">
                <span className="flex gap-0.5" aria-label={`${r.stars} out of 5 stars`}>
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-dark" aria-hidden="true" />
                  ))}
                </span>
                <p className="font-accent text-lg italic">“{r.quote}”</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <WaveDivider color="var(--color-teal)" flip />

      {/* EXPERIENCE TEASER */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('home.experienceSub')}</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl text-ink sm:text-5xl">
              {t('home.experienceTitle')}
            </Display>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experienceTeasers.map((card, i) => (
              <Reveal key={card.title} delay={(i % 3) * 0.07}>
                <Link
                  to={lp('/experience')}
                  className="grain group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg border border-mid bg-gradient-to-br from-dark-3 to-dark p-5 transition-all duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-teal"
                >
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--color-teal-glow),transparent_60%)]" />
                  <span className="relative mb-2 text-4xl transition-transform duration-200 group-hover:scale-110" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h3 className="relative font-display text-2xl uppercase text-ink">{card.title}</h3>
                  <p className="relative text-sm text-gray-light">{card.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <BtnGhost to={lp('/experience')}>
              {t('cta.exploreExperience')} <ArrowRight className="h-4 w-4 flip-rtl" aria-hidden="true" />
            </BtnGhost>
          </div>
        </div>
      </section>

      {/* PACKAGES TEASER */}
      <section className="section bg-dark-2">
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
          <div className="mt-8">
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
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { icon: '🪁', label: t('home.programsKite') },
              { icon: '🏄', label: t('home.programsWing') },
              { icon: '🌍', label: t('home.programsDay') },
            ].map((p, i) => (
              <Reveal key={p.label} delay={i * 0.07}>
                <Link
                  to={lp('/programs')}
                  className="flex items-center gap-4 rounded-lg border border-mid bg-dark-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-teal"
                >
                  <span className="text-3xl" aria-hidden="true">{p.icon}</span>
                  <span className="font-display text-2xl uppercase text-ink">{p.label}</span>
                  <ArrowRight className="ms-auto h-5 w-5 flip-rtl text-teal" aria-hidden="true" />
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
