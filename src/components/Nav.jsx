import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrolled } from '../hooks/useScrolled';
import { useLockBody } from '../hooks/useLockBody';
import { localizePath } from '../lib/locale';
import { BtnPrimary } from './Primitives';
import LanguageSelector from './LanguageSelector';

const NAV = [
  { to: '/', key: 'home', end: true },
  { to: '/experience', key: 'experience' },
  { to: '/packages', key: 'packages' },
  { to: '/programs', key: 'programs' },
  { to: '/about', key: 'about' },
];

export default function Nav() {
  const { t, i18n } = useTranslation();
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const locale = (i18n.resolvedLanguage || 'en').split('-')[0];
  useLockBody(open);

  const lp = (p) => localizePath(p, locale);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        open
          ? 'border-b border-mid/60 bg-dark'
          : scrolled
            ? 'border-b border-mid/60 bg-dark/80 backdrop-blur-xl'
            : 'bg-transparent'
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
          className="font-display text-2xl tracking-wide text-ink"
          aria-label="Kite Pirates home"
        >
          KITE<span className="text-coral">PIRATES</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <li key={item.key}>
              <NavLink
                to={lp(item.to)}
                end={item.end}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors ${
                    isActive ? 'text-teal' : 'text-gray-light hover:text-ink'
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
          <BtnPrimary to={lp('/book')} className="hidden sm:inline-flex">
            {t('nav.bookNow')}
          </BtnPrimary>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[var(--nav-height)] z-40 flex flex-col gap-2 overflow-y-auto bg-dark px-6 py-8 lg:hidden"
          >
            {[...NAV, { to: '/book', key: 'book' }].map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <NavLink
                  to={lp(item.to)}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block border-b border-mid/50 py-4 font-display text-3xl uppercase tracking-wide ${
                      isActive ? 'text-teal' : 'text-ink'
                    }`
                  }
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              </motion.div>
            ))}
            <div className="mt-6">
              <LanguageSelector compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
