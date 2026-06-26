import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import CtaStrip from '../components/CtaStrip';
import PackageCard from '../components/PackageCard';
import ComparisonTable from '../components/ComparisonTable';
import { Display } from '../components/Primitives';
import { pageMeta } from '../seo/meta';
import { packageSchema } from '../seo/schemas';
import { useContent } from '../hooks/useContent';

export default function Packages() {
  const { t } = useTranslation();
  const { packages, discounts } = useContent();
  const weeks = packages.filter((p) => ['mate', 'pirate', 'captain'].includes(p.id));
  const wings = packages.filter((p) => p.id.startsWith('wing'));

  return (
    <>
      <Seo meta={pageMeta.packages} schemas={packages.map(packageSchema)} />

      <PageHero eyebrow={t('home.eyebrow')} title={t('packages.title')} sub={t('packages.sub')} />

      {/* Core weeks */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <div className="grid gap-6 lg:grid-cols-3">
            {weeks.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.08}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>

          {/* Wing weeks */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {wings.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.08}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Discounts */}
      <section className="section bg-dark-2">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Display as="h2" className="text-4xl text-ink sm:text-5xl">
              {t('packages.discountsTitle')}
            </Display>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {discounts.map((d, i) => (
              <Reveal key={d.label} delay={i * 0.08}>
                <div className="flex items-center justify-between rounded-lg border border-mid bg-dark p-6">
                  <div>
                    <p className="font-display text-2xl uppercase text-ink">{d.label}</p>
                    <p className="text-sm text-gray-light">{d.condition}</p>
                  </div>
                  <p className="font-display text-3xl text-yellow">−€{d.amount}<span className="text-base text-gray-light">/{d.per}</span></p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Display as="h2" className="mb-8 text-4xl text-ink sm:text-5xl">
              {t('packages.compareTitle')}
            </Display>
          </Reveal>
          <Reveal>
            <ComparisonTable />
          </Reveal>
        </div>
      </section>

      <CtaStrip title={t('home.scarcityTitle')} sub={t('home.scarcitySub')} />
    </>
  );
}
