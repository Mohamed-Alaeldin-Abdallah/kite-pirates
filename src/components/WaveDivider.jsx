/**
 * Animated SVG wave divider placed between sections.
 * Two stacked, gently drifting wave layers create a living shoreline.
 * Decorative only (aria-hidden); motion auto-stops under prefers-reduced-motion
 * via the global media query in tokens.css.
 *
 * Props:
 *   color    – fill colour of the wave (the colour of the section it leads INTO)
 *   flip     – true to point the wave upward (for a section above)
 *   className
 */
export default function WaveDivider({ color = 'var(--color-dark)', flip = false, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-[60px] w-full overflow-hidden leading-[0] sm:h-[90px] ${className}`}
      style={{ transform: flip ? 'rotate(180deg)' : 'none' }}
    >
      {/* Back layer — slower, more transparent */}
      <svg
        className="animate-waveX absolute bottom-0 h-full w-[200%]"
        style={{ animationDuration: '18s', opacity: 0.5 }}
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C360,90 720,0 1440,40 C2160,80 2520,10 2880,40 L2880,100 L0,100 Z"
          fill={color}
        />
      </svg>
      {/* Front layer — faster, opaque */}
      <svg
        className="animate-waveX absolute bottom-0 h-full w-[200%]"
        style={{ animationDuration: '11s' }}
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C480,20 960,100 1440,60 C1920,20 2400,100 2880,60 L2880,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
