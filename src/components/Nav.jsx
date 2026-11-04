import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useScrolled } from '../hooks/useScrolled';
import { useLockBody } from '../hooks/useLockBody';
import { useLocale } from '../hooks/useLocale';
import { BtnPrimary } from './Primitives';
import LanguageSelector from './LanguageSelector';
import { whatsappUrl } from '../lib/config';

const NAV = [
  { to: '/', key: 'home', end: true },
  { to: '/standaloneexperince', key: 'standalone' },
  { to: '/packages', key: 'packages' },
  { to: '/Safari', key: 'safari' },
  { to: '/about', key: 'about' },
];

export default function Nav() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  useLockBody(open);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        open
          ? 'bg-ocean'
          : scrolled
            ? 'border-b border-mid bg-white/90 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
      }`}
      style={{ height: 'var(--nav-height)' }}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="container-px mx-auto flex h-full max-w-content items-center justify-between"
      >
        <Link
          to={lp('/')}
          onClick={() => setOpen(false)}
          className={`font-display text-2xl font-normal uppercase tracking-[0.06em] ${open ? 'text-white' : 'text-ink'}`}
          aria-label="Kite Pirates home"
        >
          KITE<span className={open ? 'text-aqua' : 'text-ocean'}>PIRATES</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <li key={item.key}>
              <NavLink
                to={lp(item.to)}
                end={item.end}
                className={({ isActive }) =>
                  `text-[13px] font-medium uppercase tracking-[0.08em] transition-colors ${
                    isActive ? 'text-ocean' : 'text-gray-light hover:text-ink'
                  }`
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LanguageSelector />
          </div>
          <BtnPrimary to={lp('/book')} size="sm" className="hidden sm:inline-flex">
            {t('nav.bookNow')}
          </BtnPrimary>
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden ${open ? 'text-white' : 'text-ink'}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay — blue background, white typography */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 top-[var(--nav-height)] z-40 flex flex-col overflow-y-auto bg-ocean px-6 py-8 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + 0.05 * i }}
                >
                  <NavLink
                    to={lp(item.to)}
                    end={item.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block border-b border-white/15 py-5 font-display text-3xl uppercase tracking-[0.04em] ${
                        isActive ? 'text-aqua' : 'text-white'
                      }`
                    }
                  >
                    {t(`nav.${item.key}`)}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Prominent booking + WhatsApp CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex flex-col gap-3"
            >
              <Link
                to={lp('/book')}
                onClick={() => setOpen(false)}
                className="btn w-full bg-white text-ocean hover:bg-aqua"
              >
                {t('nav.bookNow')}
              </Link>
              <a
                href={whatsappUrl(t('whatsapp.prefill'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn w-full border border-white/60 bg-transparent text-white hover:bg-white/10"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {t('cta.whatsappUs')}
              </a>
            </motion.div>

            <div className="mt-8">
              <LanguageSelector compact onDark />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
