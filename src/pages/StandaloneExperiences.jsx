import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import CtaStrip from '../components/CtaStrip';
import ExperienceCard from '../components/ExperienceCard';
import RentalTable from '../components/RentalTable';
import { Display, Eyebrow } from '../components/Primitives';
import { pageMeta } from '../seo/meta';
import { useContent } from '../hooks/useContent';

export default function StandaloneExperiences() {
  const { t } = useTranslation();
  const { experiences, rentals } = useContent();

  return (
    <>
      <Seo meta={pageMeta.standalone} />

      <PageHero eyebrow={t('home.eyebrow')} title={t('standalone.title')} sub={t('standalone.sub')} />

      {/* EQUIPMENT RENTAL PRICING */}
      <section className="section">
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
      <section className="section border-y border-mid bg-dark-3">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Eyebrow>{t('home.standaloneSub')}</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl text-ink sm:text-5xl">
              {t('standalone.title')}
            </Display>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {experiences.map((exp, i) => (
              <Reveal key={exp.name} delay={i * 0.08}>
                <ExperienceCard exp={exp} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip title={t('home.scarcityTitle')} sub={t('home.scarcitySub')} />
    </>
  );
}
