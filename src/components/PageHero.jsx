import Reveal from './Reveal';
import { Display, Eyebrow } from './Primitives';
import FloatingElements from './FloatingElements';
import WaveDivider from './WaveDivider';

/**
 * Reusable inner-page hero with a sky-to-sea sunset gradient, drifting sky
 * props, and a shoreline wave leading into the page body. `poster` lets the
 * client drop a background image; until then the gradient stands in.
 */
export default function PageHero({
  eyebrow,
  title,
  sub,
  height = '60vh',
  poster,
  waveColor = 'var(--color-dark)',
  children,
}) {
  return (
    <section
      className="grain relative flex items-end overflow-hidden"
      style={{ minHeight: height, paddingTop: 'var(--nav-height)' }}
    >
      {poster ? (
        <img src={poster} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      {/* Sunset sky-to-sea wash */}
      <div className="absolute inset-0" style={{ background: 'var(--grad-sunset)' }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(255,158,74,0.35),transparent_60%)]" />
      <FloatingElements variant="sky" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/30 to-dark/90" />

      <div className="container-px relative mx-auto w-full max-w-content pb-16 pt-16">
        {eyebrow && (
          <Reveal>
            <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.06}>
          <Display as="h1" className="max-w-4xl text-balance text-5xl text-ink sm:text-6xl md:text-7xl">
            {title}
          </Display>
        </Reveal>
        {sub && (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-lg text-foam/90">{sub}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-4">{children}</div>
          </Reveal>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <WaveDivider color={waveColor} />
      </div>
    </section>
  );
}
