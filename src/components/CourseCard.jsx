import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';

export default function CourseCard({ course }) {
  const { t } = useTranslation();
  return (
    <article
      className={`flex h-full flex-col rounded-lg border p-5 transition-colors duration-300 ${
        course.highlight ? 'border-teal bg-dark-3' : 'border-mid bg-white hover:border-teal'
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-2xl uppercase text-ink">{course.name}</h3>
        <span className="inline-flex items-center gap-1 text-xs text-gray-light">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {course.hours}h
        </span>
      </div>
      <p className="mb-4 text-sm text-gray-light">{course.target}</p>
      <div className="mt-auto grid grid-cols-2 gap-3 border-t border-mid pt-4 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-gray">{t('common.private')}</p>
          <p className="font-display text-2xl text-ocean">€{course.pricePrivate}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-gray">{t('common.group')}</p>
          <p className="font-display text-2xl text-ink">€{course.priceGroup}</p>
        </div>
      </div>
    </article>
  );
}
