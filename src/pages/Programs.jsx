import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import CtaStrip from '../components/CtaStrip';
import CourseCard from '../components/CourseCard';
import ExperienceCard from '../components/ExperienceCard';
import { Display } from '../components/Primitives';
import { pageMeta } from '../seo/meta';
import { courseSchema } from '../seo/schemas';
import { useContent } from '../hooks/useContent';

export default function Programs() {
  const { t } = useTranslation();
  const { kiteCourses, wingCourses, courseNotes, experiences } = useContent();

  return (
    <>
      <Seo
        meta={pageMeta.programs}
        schemas={[...kiteCourses, ...wingCourses].map(courseSchema)}
      />

      <PageHero eyebrow={t('home.eyebrow')} title={t('programs.title')} sub={t('programs.sub')} />

      {/* Kite courses */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Display as="h2" className="text-4xl text-ink sm:text-5xl">
              {t('programs.kiteTitle')}
            </Display>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {kiteCourses.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) * 0.06}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray">
            {courseNotes.map((n) => (
              <li key={n}>· {n}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Wing courses */}
      <section className="section bg-dark-2">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Display as="h2" className="text-4xl text-ink sm:text-5xl">
              {t('programs.wingTitle')}
            </Display>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {wingCourses.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.06}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Standalone experiences */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Display as="h2" className="text-4xl text-ink sm:text-5xl">
              {t('programs.experiencesTitle')}
            </Display>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, i) => (
              <Reveal key={exp.name} delay={(i % 3) * 0.06}>
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
