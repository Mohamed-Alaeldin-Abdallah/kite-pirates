import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { bookingSchema, PACKAGE_OPTIONS } from '../lib/bookingSchema';
import { BtnPrimary } from './Primitives';

const inputCls =
  'w-full rounded-md border border-mid bg-dark px-4 py-3 text-sm text-ink placeholder:text-gray focus:border-teal focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal';

function ErrorText({ name, errors, t }) {
  const err = errors[name];
  if (!err) return null;
  // err.message holds a translation key (e.g. 'required'); fall back to raw.
  return (
    <p className="mt-1 text-xs text-yellow" role="alert">
      {t(`form.${err.message}`, { defaultValue: err.message })}
    </p>
  );
}

export default function BookingForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(bookingSchema), mode: 'onBlur' });

  const onSubmit = async (data) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-teal/40 bg-teal/10 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-teal" aria-hidden="true" />
        <p className="text-lg text-ink">{t('book.success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 sm:grid-cols-2">
      {/* Honeypot — visually hidden, off the a11y tree, bots fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
      </div>

      <div>
        <label htmlFor="fullName" className="mb-1 block text-sm text-gray-light">
          {t('form.fullName')} *
        </label>
        <input id="fullName" className={inputCls} autoComplete="name" {...register('fullName')} />
        <ErrorText name="fullName" errors={errors} t={t} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-gray-light">
          {t('form.email')} *
        </label>
        <input id="email" type="email" className={inputCls} autoComplete="email" {...register('email')} />
        <ErrorText name="email" errors={errors} t={t} />
      </div>

      <div>
        <label htmlFor="whatsapp" className="mb-1 block text-sm text-gray-light">
          {t('form.whatsapp')} *
        </label>
        <input id="whatsapp" type="tel" className={inputCls} autoComplete="tel" {...register('whatsapp')} />
        <ErrorText name="whatsapp" errors={errors} t={t} />
      </div>

      <div>
        <label htmlFor="nationality" className="mb-1 block text-sm text-gray-light">
          {t('form.nationality')} *
        </label>
        <input id="nationality" className={inputCls} {...register('nationality')} />
        <ErrorText name="nationality" errors={errors} t={t} />
      </div>

      <div>
        <label htmlFor="language" className="mb-1 block text-sm text-gray-light">
          {t('form.language')}
        </label>
        <select id="language" className={inputCls} {...register('language')}>
          <option value="">—</option>
          {['English', 'German', 'French', 'Russian', 'Arabic', 'Italian'].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bookingType" className="mb-1 block text-sm text-gray-light">
          {t('form.bookingType')}
        </label>
        <select id="bookingType" className={inputCls} {...register('bookingType')}>
          <option value="">—</option>
          {['Pirates Week', 'Standalone Course', 'Day Experience'].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="package" className="mb-1 block text-sm text-gray-light">
          {t('form.package')}
        </label>
        <select id="package" className={inputCls} {...register('package')}>
          <option value="">—</option>
          {PACKAGE_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="arrivalDate" className="mb-1 block text-sm text-gray-light">
          {t('form.arrivalDate')} *
        </label>
        <input id="arrivalDate" type="date" className={inputCls} {...register('arrivalDate')} />
        <ErrorText name="arrivalDate" errors={errors} t={t} />
      </div>

      <div>
        <label htmlFor="guests" className="mb-1 block text-sm text-gray-light">
          {t('form.guests')}
        </label>
        <input id="guests" type="number" min={1} max={10} className={inputCls} {...register('guests')} />
        <ErrorText name="guests" errors={errors} t={t} />
      </div>

      <div>
        <label htmlFor="experience" className="mb-1 block text-sm text-gray-light">
          {t('form.experienceLevel')}
        </label>
        <select id="experience" className={inputCls} {...register('experience')}>
          <option value="">—</option>
          {['Beginner', 'Intermediate', 'Advanced', 'Non-kiter'].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ownEquipment" className="mb-1 block text-sm text-gray-light">
          {t('form.ownEquipment')}
        </label>
        <select id="ownEquipment" className={inputCls} {...register('ownEquipment')}>
          <option value="">—</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="medical" className="mb-1 block text-sm text-gray-light">
          {t('form.medical')}
        </label>
        <textarea id="medical" rows={2} className={inputCls} {...register('medical')} />
        <ErrorText name="medical" errors={errors} t={t} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="referral" className="mb-1 block text-sm text-gray-light">
          {t('form.referral')}
        </label>
        <select id="referral" className={inputCls} {...register('referral')}>
          <option value="">—</option>
          {['Instagram', 'TikTok', 'Facebook', 'Google', 'Friend', 'Other'].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1 block text-sm text-gray-light">
          {t('form.message')}
        </label>
        <textarea id="message" rows={3} className={inputCls} {...register('message')} />
        <ErrorText name="message" errors={errors} t={t} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-2 text-sm text-gray-light">
          <input type="checkbox" className="mt-1 accent-teal" {...register('consent')} />
          <span>{t('book.consent')}</span>
        </label>
        <ErrorText name="consent" errors={errors} t={t} />
      </div>

      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm text-yellow sm:col-span-2" role="alert">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          {t('book.error')}
        </p>
      )}

      <div className="sm:col-span-2">
        <BtnPrimary type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? t('book.submitting') : t('book.submit')}
        </BtnPrimary>
      </div>
    </form>
  );
}
