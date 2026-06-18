/**
 * Lightweight, dependency-free decorative layer: drifting kites & seagulls,
 * swaying palm leaves, and rising bubbles. Pure CSS keyframes (see tailwind
 * config) keep it cheap; everything is aria-hidden and freezes under
 * prefers-reduced-motion. Pointer-events are off so it never blocks UI.
 *
 *   variant: 'sky' | 'sea' | 'beach'
 */

function Seagull({ className = '', style }) {
  return (
    <svg className={className} style={style} width="40" height="18" viewBox="0 0 40 18" fill="none" aria-hidden="true">
      <path d="M2 12 C8 2 14 2 20 10 C26 2 32 2 38 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Kite({ className = '', style }) {
  return (
    <svg className={className} style={style} width="46" height="66" viewBox="0 0 46 66" fill="none" aria-hidden="true">
      <path d="M23 2 L44 26 L23 36 L2 26 Z" fill="var(--color-coral)" opacity="0.9" />
      <path d="M23 2 L23 36 M2 26 L44 26" stroke="var(--color-foam)" strokeWidth="1" opacity="0.6" />
      <path d="M23 36 Q26 50 18 64" stroke="var(--color-foam)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function Bubble({ size, left, delay, duration }) {
  return (
    <span
      className="animate-rise absolute rounded-full"
      style={{
        bottom: 0,
        left,
        width: size,
        height: size,
        background: 'radial-gradient(circle at 30% 30%, rgba(234,251,248,0.7), rgba(95,227,218,0.15))',
        animationDelay: delay,
        animationDuration: duration,
      }}
    />
  );
}

export default function FloatingElements({ variant = 'sky', className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {variant === 'sky' && (
        <>
          <div className="animate-drift absolute top-[14%]" style={{ animationDuration: '46s' }}>
            <Kite className="animate-kiteSway" />
          </div>
          <div className="animate-drift absolute top-[26%]" style={{ animationDuration: '64s', animationDelay: '-20s' }}>
            <Seagull className="animate-bob text-foam/70" />
          </div>
          <div className="animate-drift absolute top-[18%]" style={{ animationDuration: '72s', animationDelay: '-45s' }}>
            <Seagull className="animate-bob text-foam/50" style={{ width: 28 }} />
          </div>
          <div className="animate-drift absolute top-[34%]" style={{ animationDuration: '58s', animationDelay: '-12s' }}>
            <Kite className="animate-kiteSway" style={{ width: 32, height: 46, opacity: 0.7 }} />
          </div>
        </>
      )}

      {variant === 'sea' &&
        [
          { size: 10, left: '12%', delay: '0s', duration: '8s' },
          { size: 6, left: '24%', delay: '2.5s', duration: '7s' },
          { size: 14, left: '48%', delay: '1s', duration: '9s' },
          { size: 8, left: '63%', delay: '3.5s', duration: '7.5s' },
          { size: 5, left: '78%', delay: '0.8s', duration: '6.5s' },
          { size: 11, left: '88%', delay: '2s', duration: '8.5s' },
        ].map((b, i) => <Bubble key={i} {...b} />)}

      {variant === 'beach' && (
        <>
          <span className="animate-sway absolute -left-2 bottom-0 origin-bottom-left text-6xl opacity-30" style={{ transformOrigin: 'bottom left' }}>
            🌴
          </span>
          <span className="animate-sway absolute -right-2 bottom-0 origin-bottom-right text-5xl opacity-20 flip-rtl" style={{ animationDelay: '-2s' }}>
            🌴
          </span>
        </>
      )}
    </div>
  );
}
