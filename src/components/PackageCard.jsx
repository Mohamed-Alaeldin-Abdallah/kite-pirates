import { useTranslation } from 'react-i18next';
import { Check, X, Plus } from 'lucide-react';
import { BtnPrimary, BtnGhost } from './Primitives';
import { localizePath } from '../lib/locale';

export default function PackageCard({ pkg }) {
  const { t, i18n } = useTranslation();
  const locale = (i18n.resolvedLanguage || 'en').split('-')[0];
  const featured = pkg.featured;

  return (
    <article
      className={`group relative flex h-full flex-col rounded-lg border p-6 transition-all duration-200 hover:-translate-y-1 ${
        featured
          ? 'border-teal bg-dark-3 shadow-teal'
          : 'border-mid bg-dark-2 hover:border-teal/40 hover:shadow-teal'
      }`}
    >
      {pkg.badge && (
        <span
          className={`absolute -top-3 start-6 rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            featured ? 'bg-teal text-dark' : 'bg-yellow text-dark'
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
        <span className="font-display text-5xl text-teal">€{pkg.price.toLocaleString()}</span>
      </div>
      <p className="mb-5 text-sm text-gray-light">{pkg.tagline}</p>

      {pkg.note ? (
        <p className="mb-5 rounded-md bg-mid/40 p-3 text-sm text-gray-light">{pkg.note}</p>
      ) : (
        <ul className="mb-5 space-y-2 text-sm">
          {pkg.included?.map((item) => (
            <li key={item} className="flex gap-2 text-gray-light">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
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
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray">
            {t('common.addOns')}
          </p>
          <ul className="space-y-1 text-sm">
            {pkg.addons.map((a) => (
              <li key={a.label} className="flex items-center gap-2 text-yellow">
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                {a.label} — €{a.price}/{a.per}
              </li>
            ))}
          </ul>
        </div>
      )}

      {pkg.quote && (
        <p className="mb-5 font-accent text-sm italic text-gray-light">“{pkg.quote}”</p>
      )}

      {pkg.partnerPrice && (
        <p className="mb-5 text-sm text-gray-light">
          {t('common.partnerPrice')}:{' '}
          <span className="font-semibold text-yellow">€{pkg.partnerPrice.toLocaleString()}</span>
        </p>
      )}

      <div className="mt-auto pt-2">
        {featured ? (
          <BtnPrimary to={localizePath('/book', locale)} className="w-full">
            {t('cta.bookYourWeek')}
          </BtnPrimary>
        ) : (
          <BtnGhost to={localizePath('/book', locale)} className="w-full">
            {t('cta.bookYourWeek')}
          </BtnGhost>
        )}
      </div>
    </article>
  );
}
