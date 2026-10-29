import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { mergeCollection } from '../lib/mergeContent';

// English data — the single source of truth for structure + English copy.
import { packages, discounts, comparisonRows } from '../data/packages';
import { kiteCourses, wingCourses, courseNotes } from '../data/courses';
import {
  experiences,
  experienceTeasers,
  pirateDay,
  noWindDays,
  featureSections,
} from '../data/experiences';
import { faqs } from '../data/faqs';
import { bookingFlow, cancellationPolicy, noWindPolicy, paymentMethods } from '../data/conditions';
import { reviews, values, stats } from '../data/reviews';
import { aboutStory, aboutStats } from '../data/about';

// Per-language translation overlays (text only). English stays the source of
// truth for structure + prices; overlays carry the translated copy.
import de from '../data/content/de';
import it from '../data/content/it';
import ar from '../data/content/ar';
import fr from '../data/content/fr';
import ru from '../data/content/ru';

const OVERRIDES = { de, it, ar, fr, ru };

const EN = {
  packages,
  discounts,
  comparisonRows,
  kiteCourses,
  wingCourses,
  courseNotes,
  experiences,
  experienceTeasers,
  pirateDay,
  noWindDays,
  featureSections,
  faqs,
  bookingFlow,
  cancellationPolicy,
  noWindPolicy,
  paymentMethods,
  reviews,
  values,
  stats,
  aboutStory,
  aboutStats,
};

/**
 * Returns every content collection, translated for the active language.
 * Re-runs on language change (via useTranslation), so components update live.
 */
export function useContent() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || 'en').split('-')[0];

  return useMemo(() => {
    const ov = OVERRIDES[lang];
    if (!ov) return EN; // en → English data as-is
    const out = {};
    for (const key of Object.keys(EN)) {
      out[key] = mergeCollection(EN[key], ov[key]);
    }
    return out;
  }, [lang]);
}
