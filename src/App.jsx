import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';
import { SUPPORTED } from './i18n';
import { localeFromPath, stripLocale } from './lib/locale';

// Code-split every page (perf: keeps the initial bundle lean).
const Home = lazy(() => import('./pages/Home'));
const StandaloneExperiences = lazy(() => import('./pages/StandaloneExperiences'));
const Packages = lazy(() => import('./pages/Packages'));
const Safari = lazy(() => import('./pages/Safari'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PAGES = [
  { path: '', element: <Home /> },
  { path: 'standaloneexperince', element: <StandaloneExperiences /> },
  { path: 'packages', element: <Packages /> },
  { path: 'Safari', element: <Safari /> },
  { path: 'about', element: <About /> },
  { path: 'book', element: <Contact /> },
  { path: 'privacy', element: <Privacy /> },
];

// Old routes that must 301 to the Standalone Experiences page (Vercel handles
// this in production; these client routes cover in-app nav and dev).
const REDIRECTS = ['courses', 'programs', 'experience'];

function PageTransition({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}

/** Renders children only for a valid locale prefix, else 404. */
function LangGuard({ children }) {
  const { lang } = useParams();
  if (!SUPPORTED.includes(lang)) return <NotFound />;
  return children;
}

/** Redirect preserving a locale prefix (/de/courses → /de/standaloneexperince). */
function LocaleRedirect({ to }) {
  const { lang } = useParams();
  const prefix = SUPPORTED.includes(lang) && lang !== 'en' ? `/${lang}` : '';
  return <Navigate to={`${prefix}/${to}`} replace />;
}

/** Keeps the active i18n language in sync with the URL locale prefix. */
function useLocaleSync() {
  const location = useLocation();
  const { i18n } = useTranslation();
  useEffect(() => {
    const next = localeFromPath(location.pathname);
    if ((i18n.resolvedLanguage || 'en').split('-')[0] !== next) {
      i18n.changeLanguage(next);
    }
  }, [location.pathname, i18n]);
}

export default function App() {
  const location = useLocation();
  useLocaleSync();

  return (
    <>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <span className="font-display animate-pulse text-3xl uppercase tracking-widest text-ocean">
                Kite Pirates
              </span>
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={stripLocale(location.pathname)}>
              {PAGES.map((p) => (
                <Route
                  key={`en-${p.path}`}
                  path={`/${p.path}`}
                  element={<PageTransition>{p.element}</PageTransition>}
                />
              ))}
              {PAGES.map((p) => (
                <Route
                  key={`l-${p.path}`}
                  path={`/:lang/${p.path}`}
                  element={
                    <LangGuard>
                      <PageTransition>{p.element}</PageTransition>
                    </LangGuard>
                  }
                />
              ))}

              {/* Legacy → Standalone Experiences redirects */}
              {REDIRECTS.map((old) => (
                <Route
                  key={`r-${old}`}
                  path={`/${old}`}
                  element={<Navigate to="/standaloneexperince" replace />}
                />
              ))}
              {REDIRECTS.map((old) => (
                <Route
                  key={`rl-${old}`}
                  path={`/:lang/${old}`}
                  element={<LocaleRedirect to="standaloneexperince" />}
                />
              ))}

              <Route
                path="*"
                element={
                  <PageTransition>
                    <NotFound />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}
