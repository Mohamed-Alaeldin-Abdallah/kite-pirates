import { useTranslation } from 'react-i18next';
import { Tag } from './Primitives';
import { SOCIAL } from '../lib/config';

/** Standalone experience card. Handles single-price, tiered, and contact-only shapes. */
export default function ExperienceCard({ exp }) {
  const { t } = useTranslation();

  // Contact-only: keep the icon + name, reveal a "contact us" prompt on hover/focus.
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
        {exp.badge && (
          <span className="relative rounded-full border border-mid px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ocean">
            {exp.badge}
          </span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-teal/95 px-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="font-display text-xl uppercase leading-tight text-ink">
            {t('cta.moreInfo')}
          </span>
        </span>
      </a>
    );
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-mid bg-white transition-colors duration-300 hover:border-teal">
      <div className="flex h-32 items-center justify-center border-b border-mid bg-dark-3">
        <span className="text-4xl" aria-hidden="true">
          {exp.icon}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-display text-2xl uppercase text-ink">{exp.name}</h3>
          {exp.badge && (
            <span className="shrink-0 rounded-full border border-mid px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ocean">
              {exp.badge}
            </span>
          )}
        </div>

        {exp.description && <p className="mb-3 text-sm text-gray-light">{exp.description}</p>}

        {exp.tiers ? (
          <ul className="mb-3 space-y-2 text-sm">
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
        ) : (
          <>
            {exp.price && <p className="mb-2 font-display text-3xl text-ocean">{exp.price}</p>}
            <ul className="mb-3 space-y-1 text-xs text-gray-light">
              {exp.duration && <li>⏱ {exp.duration}</li>}
              {exp.level && <li>📊 {exp.level}</li>}
              {exp.minMax && <li>👥 {exp.minMax}</li>}
              {exp.route && <li>🧭 {exp.route}</li>}
              {exp.distance && <li>📏 {exp.distance}</li>}
            </ul>
            {exp.includes && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {exp.includes.map((inc) => (
                  <Tag key={inc}>{inc}</Tag>
                ))}
              </div>
            )}
          </>
        )}

        {exp.note && <p className="mb-2 text-xs italic text-gray">{exp.note}</p>}
        {exp.addon && (
          <p className="mt-auto pt-2 text-xs text-ocean">
            + {exp.addon.label} €{exp.addon.price}
          </p>
        )}
      </div>
    </article>
  );
}
