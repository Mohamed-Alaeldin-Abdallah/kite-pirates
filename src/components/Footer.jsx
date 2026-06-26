import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { SOCIAL, CONTACT } from '../lib/config';
import { useLocale } from '../hooks/useLocale';
import LanguageSelector from './LanguageSelector';
import WaveDivider from './WaveDivider';
import { TikTokIcon, WhatsAppIcon } from './BrandIcons';
import ShareBar from './ShareBar';

const LINKS = [
  { to: '/experience', key: 'experience' },
  { to: '/packages', key: 'packages' },
  { to: '/courses', key: 'programs' },
  { to: '/about', key: 'about' },
  { to: '/book', key: 'book' },
];

export default function Footer() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-dark">
      <div className="absolute inset-x-0 -top-px -translate-y-full">
        <WaveDivider color="var(--color-dark)" />
      </div>
      <div className="container-px mx-auto grid max-w-content gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to={lp('/')} className="font-display text-3xl tracking-wide text-ink">
            KITE<span className="text-coral">PIRATES</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-gray-light">{t('footer.tagline')}</p>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            {t('footer.explore')}
          </h2>
          <ul className="space-y-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.key}>
                <Link to={lp(l.to)} className="text-gray-light transition-colors hover:text-ink">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            {t('footer.connect')}
          </h2>
          <div className="mb-4 flex flex-wrap gap-3">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-light hover:text-teal">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-light hover:text-teal">
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-light hover:text-teal">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-light hover:text-teal">
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email" className="text-gray-light hover:text-teal">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            {t('footer.language')}
          </h2>
          <LanguageSelector compact />
        </div>
      </div>

      <div className="container-px mx-auto flex max-w-content justify-center border-t border-mid py-6">
        <ShareBar />
      </div>

      <div className="container-px mx-auto flex max-w-content flex-col items-center justify-between gap-2 border-t border-mid py-5 text-xs text-gray sm:flex-row">
        <span>© {year} Kite Pirates. {t('footer.rights')}</span>
        <span className="flex items-center gap-3">
          <Link to={lp('/privacy')} className="hover:text-gray-light">
            {t('footer.privacy')}
          </Link>
          <span aria-hidden="true">·</span>
          <span>{t('footer.madeWith')} 🏴‍☠️</span>
        </span>
      </div>
    </footer>
  );
}
