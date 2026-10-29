import { useTranslation } from 'react-i18next';
import { Check, X, Plus } from 'lucide-react';
import { BtnPrimary, BtnGhost } from './Primitives';
import { useLocale } from '../hooks/useLocale';

export default function PackageCard({ pkg }) {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const featured = pkg.featured;

  return (
    <article
      className={`relative flex h-full flex-col rounded-lg border p-7 transition-colors duration-300 ${
        featured ? 'border-teal bg-dark-3' : 'border-mid bg-white hover:border-teal'
      }`}
    >
      {pkg.badge && (
        <span
          className={`absolute -top-3 start-6 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
            featured ? 'bg-teal text-ink' : 'bg-ocean text-white'
          }`}
        >
          {pkg.badge}
        </span>
      )}

      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-display text-3xl uppercase text-ink">
          <span aria-hidden="true" className="me-2">{pkg.icon}</span>
          {pkg.name}
        </h3>
      </div>

      <div className="mb-1 flex items-baseline gap-1">
        <span className="font-display text-5xl text-ocean">€{pkg.price.toLocaleString()}</span>
      </div>
      <p className="mb-6 text-sm text-gray-light">{pkg.tagline}</p>

      {pkg.note ? (
        <p className="mb-5 rounded-md bg-dark-3 p-3 text-sm text-gray-light">{pkg.note}</p>
      ) : (
        <ul className="mb-5 space-y-2 text-sm">
          {pkg.included?.map((item) => (
            <li key={item} className="flex gap-2 text-gray-light">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-ocean" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
          {pkg.excluded?.map((item) => (
            <li key={item} className="flex gap-2 text-gray">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-gray" aria-hidden="true" />
              <span className="line-through">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {pkg.addons?.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-gray">
            {t('common.addOns')}
          </p>
          <ul className="space-y-1 text-sm">
            {pkg.addons.map((a) => (
              <li key={a.label} className="flex items-center gap-2 text-ocean">
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                {a.label} — €{a.price}/{a.per}
              </li>
            ))}
          </ul>
        </div>
      )}

      {pkg.quote && (
        <p className="mb-5 text-sm italic text-gray-light">“{pkg.quote}”</p>
      )}

      {pkg.partnerPrice && (
        <p className="mb-5 text-sm text-gray-light">
          {t('common.partnerPrice')}:{' '}
          <span className="font-semibold text-ocean">€{pkg.partnerPrice.toLocaleString()}</span>
        </p>
      )}

      <div className="mt-auto pt-2">
        {featured ? (
          <BtnPrimary to={lp('/book')} className="w-full">
            {t('cta.bookYourWeek')}
          </BtnPrimary>
        ) : (
          <BtnGhost to={lp('/book')} className="w-full">
            {t('cta.bookYourWeek')}
          </BtnGhost>
        )}
      </div>
    </article>
  );
}
