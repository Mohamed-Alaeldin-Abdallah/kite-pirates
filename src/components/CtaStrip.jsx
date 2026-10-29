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
    <section className="section bg-dark-3">
      <div className="container-px mx-auto max-w-content text-center">
        <Reveal>
          <Display as="h2" className="text-balance text-4xl text-ink sm:text-5xl md:text-6xl">
            {title}
          </Display>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-gray-light">{sub}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <BtnPrimary to={lp('/book')}>
              <Anchor className="h-5 w-5" aria-hidden="true" />
              {t('cta.bookYourWeek')}
            </BtnPrimary>
            <BtnGhost href={whatsappUrl(t('whatsapp.prefill'))} external>
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {t('cta.whatsappUs')}
            </BtnGhost>
          </div>
        </Reveal>
        <Reveal delay={0.22}>
          {/* Guest policies — coral button (cancellation, no-wind refund, FAQ) */}
          <Link
            to={`${lp('/book')}#policies`}
            className="btn btn-sm mt-5 border border-[#ff6d4a] bg-[#ff6d4a] text-white hover:bg-[#e85c3a] hover:border-[#e85c3a]"
          >
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            {t('cta.policies')}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
