import Reveal from './Reveal';
import { Display, Eyebrow } from './Primitives';

/**
 * Minimal inner-page hero: airy white, thin uppercase title, generous space.
 * `poster`, if given, renders as a framed 12px image beneath the intro.
 */
export default function PageHero({ eyebrow, title, sub, poster, children }) {
  return (
    <section
      className="border-b border-mid bg-white"
      style={{ paddingTop: 'calc(var(--nav-height) + clamp(40px, 8vw, 88px))' }}
    >
      <div className="container-px mx-auto w-full max-w-content pb-[clamp(40px,8vw,88px)]">
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
            <p className="mt-5 max-w-xl text-lg text-gray-light">{sub}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-4">{children}</div>
          </Reveal>
        )}
        {poster && (
          <Reveal delay={0.1}>
            <img
              src={poster}
              alt=""
              aria-hidden="true"
              className="mt-10 aspect-[21/9] w-full rounded-lg border border-mid object-cover"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
