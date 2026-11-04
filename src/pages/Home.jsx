import { useTranslation } from 'react-i18next';
import { Anchor, MessageCircle, Star, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { Display, Eyebrow, BtnPrimary, BtnGhost } from '../components/Primitives';
import CtaStrip from '../components/CtaStrip';
import PackageCard from '../components/PackageCard';
import ExperienceCard from '../components/ExperienceCard';
import CourseCard from '../components/CourseCard';
import CardSlider from '../components/CardSlider';
import RentalTable from '../components/RentalTable';
import WindCards from '../components/WindCards';
import { pageMeta } from '../seo/meta';
import { organizationSchema } from '../seo/schemas';
import { whatsappUrl } from '../lib/config';
import { useLocale } from '../hooks/useLocale';
import { useContent } from '../hooks/useContent';

export default function Home() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const { stats, reviews, packages, rentals, experiences, kiteCourses, wingCourses, courseNotes } =
    useContent();
  const teaserPkgs = packages.filter((p) => ['mate', 'pirate', 'captain'].includes(p.id));

  return (
    <>
      <Seo meta={pageMeta.home} schemas={[organizationSchema()]} />

      {/* HERO */}
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
                <BtnPrimary to={lp('/book')}>
                  <Anchor className="h-5 w-5" aria-hidden="true" />
                  {t('nav.bookNow')}
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

      {/* STATS */}
      <section className="border-b border-mid bg-dark-3">
        <div className="container-px mx-auto grid max-w-content gap-6 py-14 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center sm:text-start">
              <p className="font-display text-5xl text-ocean">{s.value}</p>
              <p className="mt-1 font-display text-lg uppercase text-ink">{s.label}</p>
              <p className="mt-1 text-sm text-gray-light">{s.desc}</p>
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

      {/* EQUIPMENT RENTAL PRICING — above standalone experiences */}
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

      {/* STANDALONE EXPERIENCES */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('home.standaloneSub')}</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl text-ink sm:text-5xl">
              {t('home.standaloneTitle')}
            </Display>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {experiences.map((exp, i) => (
              <Reveal key={exp.name} delay={i * 0.08}>
                <ExperienceCard exp={exp} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <BtnGhost to={lp('/standaloneexperince')}>
              {t('cta.viewExperiences')} <ArrowRight className="h-4 w-4 flip-rtl" aria-hidden="true" />
            </BtnGhost>
          </div>
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
                <CourseCard key={c.name} course={c} icon="🏄" />
              ))}
            </CardSlider>
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
