import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getConsent, setConsent, loadAnalytics } from '../lib/analytics';
import { useLocale } from '../hooks/useLocale';

/**
 * GDPR-style consent banner. Analytics stay OFF until the user clicks Accept.
 * Choice persists in localStorage; declining keeps everything disabled.
 */
export default function CookieConsent() {
  const { t } = useTranslation();
  const { lp } = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const prior = getConsent();
    if (prior === 'granted') loadAnalytics();
    if (!prior) setShow(true);
  }, []);

  const accept = () => {
    setConsent('granted');
    loadAnalytics();
    setShow(false);
  };
  const decline = () => {
    setConsent('denied');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-lg border border-mid bg-dark-2/95 p-4 shadow-card backdrop-blur-md sm:inset-x-auto sm:end-5 sm:start-auto"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-gray-light">
              {t('cookie.message')}{' '}
              <Link to={lp('/privacy')} className="text-teal underline">
                {t('cookie.learn')}
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={decline}
                className="rounded-md px-4 py-2 text-sm font-semibold text-gray-light transition-colors hover:text-ink"
              >
                {t('cookie.decline')}
              </button>
              <button
                type="button"
                onClick={accept}
                className="rounded-md bg-teal px-4 py-2 text-sm font-semibold text-dark transition-colors hover:bg-teal-dark"
              >
                {t('cookie.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
