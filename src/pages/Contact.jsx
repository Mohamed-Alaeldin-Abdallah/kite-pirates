import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Mail, MessageCircle } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import BookingForm from '../components/BookingForm';
import FAQ from '../components/FAQ';
import { Display, Eyebrow } from '../components/Primitives';
import { pageMeta } from '../seo/meta';
import { faqSchema } from '../seo/schemas';
import { faqs } from '../data/faqs';
import { bookingFlow, cancellationPolicy, noWindPolicy, paymentMethods } from '../data/conditions';
import { SOCIAL, CONTACT, whatsappUrl } from '../lib/config';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <Seo meta={pageMeta.book} schemas={[faqSchema(faqs)]} />

      <PageHero eyebrow={t('home.eyebrow')} title={t('book.title')} sub={t('book.sub')} height="50vh" />

      {/* Booking flow */}
      <section className="section">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Display as="h2" className="text-4xl text-ink sm:text-5xl">
              {t('book.flowTitle')}
            </Display>
          </Reveal>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bookingFlow.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 0.07}>
                <div className="h-full rounded-lg border border-mid bg-dark-2 p-5">
                  <span className="font-display text-4xl text-teal">0{s.step}</span>
                  <h3 className="mt-1 font-display text-xl uppercase text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-light">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mt-4 text-sm text-gray">
            Payment methods: {paymentMethods.join(' · ')}. Balance (70%) due 7 days before arrival.
          </p>
        </div>
      </section>

      {/* Form + channels */}
      <section className="section bg-dark-2">
        <div className="container-px mx-auto grid max-w-content gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <Display as="h2" className="mb-6 text-4xl text-ink sm:text-5xl">
                {t('book.formTitle')}
              </Display>
            </Reveal>
            <Reveal>
              <BookingForm />
            </Reveal>
          </div>

          <aside>
            <Reveal>
              <Eyebrow>{t('book.channelsTitle')}</Eyebrow>
              <div className="mt-4 flex flex-col gap-3">
                <a href={whatsappUrl(t('whatsapp.prefill'))} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-mid bg-dark p-4 text-ink transition-colors hover:border-teal/40">
                  <MessageCircle className="h-5 w-5 text-teal" aria-hidden="true" /> WhatsApp
                </a>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 rounded-lg border border-mid bg-dark p-4 text-ink transition-colors hover:border-teal/40">
                  <Mail className="h-5 w-5 text-teal" aria-hidden="true" /> {CONTACT.email}
                </a>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-mid bg-dark p-4 text-ink transition-colors hover:border-teal/40">
                  <Instagram className="h-5 w-5 text-teal" aria-hidden="true" /> @KitePiratesEgypt
                </a>
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-mid bg-dark p-4 text-ink transition-colors hover:border-teal/40">
                  <Facebook className="h-5 w-5 text-teal" aria-hidden="true" /> Kite Pirates Egypt
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Policies */}
      <section id="policies" className="section scroll-mt-24">
        <div className="container-px mx-auto grid max-w-content gap-10 lg:grid-cols-2">
          <Reveal>
            <Display as="h2" className="mb-5 text-3xl text-ink sm:text-4xl">
              {t('book.cancellationTitle')}
            </Display>
            <ul className="divide-y divide-mid rounded-lg border border-mid">
              {cancellationPolicy.map((c) => (
                <li key={c.notice} className="flex flex-col gap-1 p-4 sm:flex-row sm:justify-between">
                  <span className="text-sm font-semibold text-ink">{c.notice}</span>
                  <span className="text-sm text-gray-light">{c.outcome}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <Display as="h2" className="mb-5 text-3xl text-ink sm:text-4xl">
              {t('book.noWindTitle')}
            </Display>
            <ul className="divide-y divide-mid rounded-lg border border-mid">
              {noWindPolicy.map((n) => (
                <li key={n.lost} className="flex items-center justify-between p-4">
                  <span className="text-sm font-semibold text-ink">{n.lost}</span>
                  <span className="text-sm text-gray-light">
                    €{n.cashRefund} cash / €{n.credit} credit
                    {n.bonus ? ` · ${n.bonus}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-dark-2">
        <div className="container-px mx-auto max-w-content">
          <Reveal>
            <Display as="h2" className="mb-8 text-center text-4xl text-ink sm:text-5xl">
              {t('book.faqTitle')}
            </Display>
          </Reveal>
          <FAQ faqs={faqs} />
        </div>
      </section>
    </>
  );
}
