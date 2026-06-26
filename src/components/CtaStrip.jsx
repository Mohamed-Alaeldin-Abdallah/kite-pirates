import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Anchor, MessageCircle, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';
import { Display, BtnPrimary, BtnGhost } from './Primitives';
import { whatsappUrl } from '../lib/config';
import { useLocale } from '../hooks/useLocale';

/** Reusable full-width call-to-action band. */
export default function CtaStrip({ title, sub }) {
  const { t } = useTranslation();
  const { lp } = useLocale();
  return (
    <section className="section bg-dark-2">
      <div className="container-px mx-auto max-w-content text-center">
        <Reveal>
          <Display as="h2" className="text-balance text-4xl text-ink sm:text-5xl md:text-6xl">
            {title}
          </Display>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-4 max-w-xl text-gray-light">{sub}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BtnPrimary to={lp('/book')} size="lg">
              <Anchor className="h-5 w-5" aria-hidden="true" />
              {t('cta.bookYourWeek')}
            </BtnPrimary>
            <BtnGhost href={whatsappUrl(t('whatsapp.prefill'))} external size="lg">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {t('cta.whatsappUs')}
            </BtnGhost>
          </div>
        </Reveal>
        <Reveal delay={0.22}>
          {/* Red button — guest policies (cancellation, no-wind refund, FAQ) */}
          <Link
            to={`${lp('/book')}#policies`}
            className="splash mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-[#ff6d4a] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e85c3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6d4a]"
          >
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            {t('cta.policies')}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
