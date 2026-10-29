import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { LOCALES } from '../i18n';
import { stripLocale, localizePath } from '../lib/locale';

export default function LanguageSelector({ compact = false }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = (i18n.resolvedLanguage || 'en').split('-')[0];

  useEffect(() => {
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const choose = (code) => {
    const bare = stripLocale(location.pathname);
    i18n.changeLanguage(code);
    navigate(localizePath(bare, code) + location.hash);
    setOpen(false);
  };

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {LOCALES.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => choose(l.code)}
            aria-pressed={current === l.code}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              current === l.code
                ? 'bg-teal text-ink'
                : 'text-gray-light hover:bg-dark-3 hover:text-ink'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-semibold text-gray-light transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        {LOCALES.find((l) => l.code === current)?.label || 'EN'}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 mt-2 w-44 overflow-hidden rounded-lg border border-mid bg-white py-1"
        >
          {LOCALES.map((l) => (
            <li key={l.code} role="option" aria-selected={current === l.code}>
              <button
                type="button"
                onClick={() => choose(l.code)}
                dir={l.dir}
                className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-light transition-colors hover:bg-dark-3 hover:text-ink"
              >
                <span>{l.name}</span>
                {current === l.code && <Check className="h-4 w-4 text-ocean" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
