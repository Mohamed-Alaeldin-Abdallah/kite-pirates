import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import { Tag, BtnPrimary, BtnGhost } from './Primitives';
import { SOCIAL } from '../lib/config';
import { useLocale } from '../hooks/useLocale';

/** Experience card — featured single-price, tiered, or contact-only shapes. */
export default function ExperienceCard({ exp, featured }) {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const isFeatured = featured ?? exp.featured;

  // Contact-only: icon + name, reveal a "contact us" prompt on hover/focus.
  if (exp.contactOnly) {
    return (
      <a
        href={SOCIAL.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full min-h-[200px] flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-mid bg-white p-6 text-center transition-colors duration-300 hover:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
      >
        <span className="relative text-5xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
          {exp.icon}
        </span>
        <h3 className="relative font-display text-2xl uppercase text-ink">{exp.name}</h3>
        <span className="absolute inset-0 flex items-center justify-center bg-teal/95 px-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="font-display text-xl uppercase leading-tight text-ink">{t('cta.moreInfo')}</span>
        </span>
      </a>
    );
  }

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-colors duration-300 ${
        isFeatured ? 'border-teal' : 'border-mid hover:border-teal'
      }`}
    >
      {exp.image ? (
        <img
          src={exp.image}
          alt={exp.name}
          loading="lazy"
          decoding="async"
          className="h-44 w-full border-b border-mid object-cover"
        />
      ) : (
        <div className={`flex h-40 items-center justify-center border-b border-mid ${isFeatured ? 'bg-teal/10' : 'bg-dark-3'}`}>
          <span className="text-5xl" aria-hidden="true">{exp.icon}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-1 flex items-start justify-between gap-2">
          <div>
            {exp.tagline && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ocean">{exp.tagline}</p>
            )}
            <h3 className="font-display text-2xl uppercase text-ink">{exp.name}</h3>
          </div>
          {exp.badge && (
            <span className="shrink-0 rounded-full bg-teal px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink">
              {exp.badge}
            </span>
          )}
        </div>

        {exp.price && <p className="mt-2 font-display text-4xl text-ocean">{exp.price}</p>}
        {exp.duration && (
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-gray-light">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {exp.duration}
          </p>
        )}
        {exp.description && <p className="mt-3 text-sm text-gray-light">{exp.description}</p>}

        {exp.includesList && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {exp.includesList.map((inc) => (
              <Tag key={inc}>{inc}</Tag>
            ))}
          </div>
        )}

        {exp.tiers && (
          <ul className="mt-3 space-y-2 text-sm">
            {exp.tiers.map((tier) => (
              <li key={tier.name} className="rounded-md bg-dark-3 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-ink">{tier.name}</span>
                  <span className="font-display text-lg text-ocean">{tier.price}</span>
                </div>
                <p className="mt-1 text-xs text-gray-light">
                  {tier.duration} · {tier.includes}
                </p>
              </li>
            ))}
          </ul>
        )}

        {exp.note && <p className="mt-2 text-xs italic text-gray">{exp.note}</p>}

        <div className="mt-auto pt-5">
          {isFeatured ? (
            <BtnPrimary to={lp('/book')} size="sm" className="w-full">{t('nav.bookNow')}</BtnPrimary>
          ) : (
            <BtnGhost to={lp('/book')} size="sm" className="w-full">{t('nav.bookNow')}</BtnGhost>
          )}
        </div>
      </div>
    </article>
  );
}
