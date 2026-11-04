import { useRef, useState, useEffect, Children } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable horizontal card slider.
 * - Desktop: ~3 cards + a peek of the next, arrow controls, drag/scroll.
 * - Mobile: one card + peek, natural finger swipe, pagination dots.
 * Built on native scroll-snap (no dependencies). Respects reduced motion via
 * the global media query; smooth scroll degrades to instant there.
 */
export default function CardSlider({ children, label = 'Cards', className = '' }) {
  const scroller = useRef(null);
  const items = Children.toArray(children);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(items.length <= 1);

  const stepSize = (el) => {
    const slide = el.querySelector('[data-slide]');
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    return slide ? slide.offsetWidth + gap : el.clientWidth;
  };

  const update = () => {
    const el = scroller.current;
    if (!el) return;
    const step = stepSize(el) || 1;
    setActive(Math.max(0, Math.round(Math.abs(el.scrollLeft) / step)));
    setAtStart(Math.abs(el.scrollLeft) <= 4);
    setAtEnd(Math.abs(el.scrollLeft) + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nudge = (dir) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * stepSize(el), behavior: 'smooth' });
  };
  const goTo = (i) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: i * stepSize(el), behavior: 'smooth' });
  };

  return (
    <div className={`relative ${className}`} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={scroller}
        className="kp-slider -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2"
      >
        {items.map((child, i) => (
          <div key={i} data-slide className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
            {child}
          </div>
        ))}
      </div>

      {/* Desktop arrow controls */}
      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label="Previous"
        disabled={atStart}
        className="absolute -left-4 top-[42%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-mid bg-white text-ink transition-colors hover:border-teal hover:text-ocean disabled:opacity-25 lg:inline-flex"
      >
        <ChevronLeft className="h-5 w-5 flip-rtl" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label="Next"
        disabled={atEnd}
        className="absolute -right-4 top-[42%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-mid bg-white text-ink transition-colors hover:border-teal hover:text-ocean disabled:opacity-25 lg:inline-flex"
      >
        <ChevronRight className="h-5 w-5 flip-rtl" aria-hidden="true" />
      </button>

      {/* Pagination dots */}
      {items.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to card ${i + 1}`}
              aria-current={active === i}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i ? 'w-6 bg-ocean' : 'w-2 bg-mid hover:bg-teal'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
