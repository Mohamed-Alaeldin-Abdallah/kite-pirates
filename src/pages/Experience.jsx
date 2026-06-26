import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import CtaStrip from '../components/CtaStrip';
import ImgPlaceholder from '../components/ImgPlaceholder';
import { Display, Eyebrow, Tag } from '../components/Primitives';
import { pageMeta } from '../seo/meta';
import { useContent } from '../hooks/useContent';

export default function Experience() {
  const { t } = useTranslation();
  const { pirateDay, featureSections, noWindDays } = useContent();

  return (
    <>
      <Seo meta={pageMeta.experience} />

      <PageHero eyebrow={t('home.eyebrow')} title={t('experience.title')} />

      {/* A PIRATE'S DAY — timeline */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Display as="h2" className="text-4xl text-ink sm:text-5xl">
              {t('experience.dayTitle')}
            </Display>
          </Reveal>
          <ol className="mt-10 max-w-2xl border-s border-mid">
            {pirateDay.map((item, i) => (
              <Reveal as="li" key={item.time} delay={i * 0.06} className="relative ps-8 pb-8 last:pb-0">
                <span className="absolute start-0 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-teal flip-rtl" />
                <p className="font-display text-xl uppercase text-teal">{item.time}</p>
                <p className="text-gray-light">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURE SECTIONS — alternating */}
      <section className="bg-dark-2">
        <div className="container-px mx-auto max-w-content py-16">
          <div className="flex flex-col gap-16">
            {featureSections.map((f, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal
                  key={f.title}
                  direction={flip ? 'left' : 'right'}
                  className={`grid items-center gap-8 md:grid-cols-2 ${flip ? 'md:[&>*:first-child]:order-2' : ''}`}
                >
                  <ImgPlaceholder
                    src={f.image}
                    alt={f.title}
                    label={f.title}
                    ratio="aspect-[4/3]"
                    className="min-h-[280px]"
                  />
                  <div>
                    <Eyebrow>{f.eligibility}</Eyebrow>
                    <Display as="h3" className="mt-2 text-3xl text-ink sm:text-4xl">
                      {f.title}
                    </Display>
                    <p className="mt-3 text-gray-light">{f.body}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {f.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* NO WIND DAYS */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Display as="h2" className="text-4xl text-ink sm:text-5xl">
              {t('experience.noWindTitle')}
            </Display>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {noWindDays.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06}>
                <div className="flex flex-col items-center gap-2 rounded-lg border border-mid bg-dark-2 p-6 text-center">
                  <span className="text-4xl" aria-hidden="true">{d.icon}</span>
                  <span className="font-display text-xl uppercase text-ink">{d.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-6 rounded-md border border-teal/30 bg-teal/10 p-4 text-sm text-gray-light">
              {t('experience.noWindNote')}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaStrip title={t('home.scarcityTitle')} sub={t('home.scarcitySub')} />
    </>
  );
}
