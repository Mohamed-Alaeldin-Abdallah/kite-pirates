import { useTranslation } from 'react-i18next';
import { Anchor, MessageCircle, Star, ArrowRight, Instagram } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { Display, Eyebrow, BtnPrimary, BtnGhost } from '../components/Primitives';
import CtaStrip from '../components/CtaStrip';
import PackageCard from '../components/PackageCard';
import CourseCard from '../components/CourseCard';
import CardSlider from '../components/CardSlider';
import RentalTable from '../components/RentalTable';
import WindCards from '../components/WindCards';
import { pageMeta } from '../seo/meta';
import { organizationSchema } from '../seo/schemas';
import { whatsappUrl, SOCIAL } from '../lib/config';
import { useLocale } from '../hooks/useLocale';
import { useContent } from '../hooks/useContent';

export default function Home() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const { stats, reviews, packages, rentals, kiteCourses, wingCourses, courseNotes } =
    useContent();
  const teaserPkgs = packages.filter((p) => ['mate', 'pirate', 'captain'].includes(p.id));

  return (
    <>
      <Seo meta={pageMeta.home} schemas={[organizationSchema()]} />

      {/* HERO — full-bleed background photo, intro + CTAs over the image */}
      <section
        className="relative isolate flex min-h-[90svh] items-center overflow-hidden"
        style={{ paddingTop: 'var(--nav-height)' }}
      >
        <img
          src="/images/hero.jpeg"
          alt="Kite surfing on the Red Sea in Hurghada"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/55 to-ink/40" />

        <div className="container-px mx-auto w-full max-w-content py-20">
          <Reveal>
            <span className="inline-block font-body text-[13px] font-semibold uppercase tracking-[0.1em] text-aqua">
              {t('home.eyebrow')}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <Display as="h1" className="mt-5 max-w-3xl text-balance text-4xl text-white sm:text-6xl md:text-7xl">
              {t('home.title')}
            </Display>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">{t('home.sub')}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
              <BtnPrimary to={lp('/book')}>
                <Anchor className="h-5 w-5" aria-hidden="true" />
                {t('nav.bookNow')}
              </BtnPrimary>
              <BtnGhost href={whatsappUrl(t('whatsapp.prefill'))} external onPhoto>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {t('cta.whatsappNow')}
              </BtnGhost>
              <BtnGhost href={SOCIAL.instagram} external onPhoto>
                <Instagram className="h-5 w-5" aria-hidden="true" />
                {t('cta.instagram')}
              </BtnGhost>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-mid bg-dark-3">
        <div className="container-px mx-auto grid max-w-content grid-cols-3 gap-3 py-10 sm:gap-6 sm:py-14">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center sm:text-start">
              <p className="font-display text-3xl text-ocean sm:text-5xl">{s.value}</p>
              <p className="mt-1 font-display text-sm uppercase text-ink sm:text-lg">{s.label}</p>
              <p className="mt-1 text-xs text-gray-light sm:text-sm">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LIVE WIND */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow className="mb-6">{t('wind.live')} · Hurghada</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <WindCards />
          </Reveal>
        </div>
      </section>

      {/* KITE COURSES — slider */}
      <section className="section border-y border-mid bg-dark-3">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('common.private')} · {t('common.group')}</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl text-ink sm:text-5xl">
              {t('programs.kiteTitle')}
            </Display>
          </Reveal>
          <Reveal delay={0.06} className="mt-10">
            <CardSlider label={t('programs.kiteTitle')}>
              {kiteCourses.map((c) => (
                <CourseCard key={c.name} course={c} icon="🪁" />
              ))}
            </CardSlider>
          </Reveal>
          <ul className="mx-auto mt-8 max-w-3xl space-y-1 text-sm text-gray-light">
            {courseNotes.map((n) => (
              <li key={n} className="flex gap-2">
                <span aria-hidden="true" className="text-ocean">·</span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WING FOIL COURSES — slider */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('common.private')} · {t('common.group')}</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl text-ink sm:text-5xl">
              {t('programs.wingTitle')}
            </Display>
          </Reveal>
          <Reveal delay={0.06} className="mt-10">
            <CardSlider label={t('programs.wingTitle')}>
              {wingCourses.map((c) => (
                <CourseCard key={c.name} course={c} icon="🪽" />
              ))}
            </CardSlider>
          </Reveal>
        </div>
      </section>

      {/* EQUIPMENT RENTAL PRICING */}
      <section className="section border-y border-mid bg-dark-3">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('home.rentalSub')}</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl text-ink sm:text-5xl">
              {t('home.rentalTitle')}
            </Display>
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <RentalTable rentals={rentals} labelDuration={t('common.duration')} labelPrice={t('common.price')} />
          </Reveal>
        </div>
      </section>

      {/* PACKAGES TEASER */}
      <section className="section border-y border-mid bg-dark-3">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('home.packagesSub')}</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl text-ink sm:text-5xl">
              {t('home.packagesTitle')}
            </Display>
          </Reveal>
          <Reveal delay={0.06} className="mt-12">
            <CardSlider label={t('home.packagesTitle')}>
              {teaserPkgs.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </CardSlider>
          </Reveal>
          <div className="mt-10">
            <BtnGhost to={lp('/packages')}>
              {t('cta.viewPackages')} <ArrowRight className="h-4 w-4 flip-rtl" aria-hidden="true" />
            </BtnGhost>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-b border-mid bg-white">
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

      <CtaStrip title={t('home.scarcityTitle')} sub={t('home.scarcitySub')} />
    </>
  );
}
