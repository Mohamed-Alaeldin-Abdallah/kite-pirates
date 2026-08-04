import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '../hooks/useLocale';

/**
 * Premium animated "Check Our Courses" CTA — kite + pirate/nautical emblem.
 * Pure inline SVG + CSS animation (styles in index.css, `.ccta*`). Links to
 * the Courses page. Loops seamlessly, intensifies on hover, and stills under
 * prefers-reduced-motion (global rule in tokens.css). No extra dependencies.
 */
export default function CoursesCta() {
  const { t } = useTranslation();
  const { lp } = useLocale();

  return (
    <Link to={lp('/courses')} className="ccta group" aria-label={t('cta.checkCourses', 'Check Our Courses')}>
      <span className="ccta-emblem-wrap">
        <svg className="ccta-emblem" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <radialGradient id="ccta-bg" cx="50%" cy="36%" r="72%">
              <stop offset="0%" stopColor="#27455a" />
              <stop offset="62%" stopColor="#1C2F3A" />
              <stop offset="100%" stopColor="#101d26" />
            </radialGradient>
            <linearGradient id="ccta-kite" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3a8079" />
              <stop offset="52%" stopColor="#2F6F6A" />
              <stop offset="52%" stopColor="#B2433C" />
              <stop offset="100%" stopColor="#8f332e" />
            </linearGradient>
            <linearGradient id="ccta-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F6F6A" />
              <stop offset="100%" stopColor="#16323b" />
            </linearGradient>
            <filter id="ccta-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.4" />
            </filter>
            <clipPath id="ccta-clip">
              <circle cx="60" cy="60" r="51" />
            </clipPath>
          </defs>

          {/* pulsing glow ring */}
          <circle className="ccta-glowring" cx="60" cy="60" r="51" fill="none" stroke="#C78A1E" strokeWidth="2.5" filter="url(#ccta-soft)" />

          {/* backdrop */}
          <circle cx="60" cy="60" r="51" fill="url(#ccta-bg)" />

          <g clipPath="url(#ccta-clip)">
            {/* compass rose */}
            <g className="ccta-compass">
              <g fill="none" stroke="#C78A1E" strokeWidth="1" opacity="0.26">
                <circle cx="60" cy="60" r="31" />
                <path d="M60 29 L60 91 M29 60 L91 60 M40 40 L80 80 M80 40 L40 80" />
              </g>
              <path d="M60 33 L63 58 L60 63 L57 58 Z" fill="#C78A1E" opacity="0.5" />
              <path d="M60 87 L57 62 L60 57 L63 62 Z" fill="#2F6F6A" opacity="0.5" />
            </g>

            {/* ocean waves */}
            <g>
              <path className="ccta-wave1" fill="url(#ccta-water)"
                d="M-60 82 q15 -6 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 V120 H-60 Z" />
              <path className="ccta-wave2" fill="#2F6F6A" opacity="0.55"
                d="M-60 90 q15 -5 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 V120 H-60 Z" />
            </g>

            {/* board on the water */}
            <g>
              <ellipse cx="60" cy="84" rx="17" ry="3.6" fill="#4C1A17" />
              <ellipse cx="60" cy="83" rx="15" ry="2.4" fill="#C78A1E" opacity="0.9" />
            </g>

            {/* kite + control lines (sway together) */}
            <g className="ccta-kite-group">
              <g className="ccta-lines" stroke="#EAF7FB" strokeWidth="0.9" opacity="0.7">
                <line x1="51" y1="46" x2="56.5" y2="81" />
                <line x1="69" y1="46" x2="63.5" y2="81" />
              </g>
              <g className="ccta-kite">
                <path d="M43 39 Q60 28 77 39 Q60 51 43 39 Z" fill="url(#ccta-kite)" stroke="#4C1A17" strokeWidth="0.8" />
                <path d="M43 39 Q60 43 77 39" fill="none" stroke="#C78A1E" strokeWidth="1" opacity="0.85" />
                <path d="M60 31 L60 49" stroke="#EAF7FB" strokeWidth="0.7" opacity="0.5" />
              </g>
            </g>

            {/* treasure sparkle */}
            <g className="ccta-sparkle" transform="translate(80 45)">
              <path d="M0 -5.5 L1.4 -1.4 L5.5 0 L1.4 1.4 L0 5.5 L-1.4 1.4 L-5.5 0 L-1.4 -1.4 Z" fill="#C78A1E" />
            </g>
          </g>

          {/* rope rim */}
          <circle cx="60" cy="60" r="51" fill="none" stroke="#4C1A17" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="51" fill="none" stroke="#C78A1E" strokeWidth="1" strokeDasharray="3 3.5" opacity="0.55" />
        </svg>
      </span>

      <span className="ccta-text">
        <span className="ccta-eyebrow">{t('cta.coursesEyebrow', 'Set Sail')}</span>
        <span className="ccta-title">{t('cta.checkCourses', 'Check Our Courses')}</span>
      </span>

      <ArrowRight className="ccta-arrow" aria-hidden="true" />
    </Link>
  );
}
