import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import CtaStrip from '../components/CtaStrip';
import ExperienceCard from '../components/ExperienceCard';
import { pageMeta } from '../seo/meta';
import { useContent } from '../hooks/useContent';

export default function StandaloneExperiences() {
  const { t } = useTranslation();
  const { experiences } = useContent();

  return (
    <>
      <Seo meta={pageMeta.standalone} />

      <PageHero eyebrow={t('home.eyebrow')} title={t('standalone.title')} sub={t('standalone.sub')} />

      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
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
