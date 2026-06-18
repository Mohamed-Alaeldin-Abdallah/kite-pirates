/**
 * Styled placeholder used wherever client photography will drop in.
 * If `src` is provided it renders a real <img> (lazy, async, with alt).
 * Otherwise it shows a branded gradient block with an icon + label so the
 * layout reads correctly before assets arrive.
 */
export default function ImgPlaceholder({
  src,
  alt = '',
  icon: Icon,
  label,
  className = '',
  ratio = 'aspect-[4/3]',
  rounded = 'rounded-lg',
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${ratio} ${rounded} w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt || label || 'Kite Pirates photo placeholder'}
      className={`${ratio} ${rounded} grain relative flex w-full flex-col items-center justify-center overflow-hidden border border-mid bg-gradient-to-br from-dark-3 to-dark text-gray ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,var(--color-teal-glow),transparent_60%)]" />
      {Icon ? <Icon className="relative mb-2 h-8 w-8 text-teal/70" aria-hidden="true" /> : null}
      {label ? (
        <span className="relative font-body text-xs uppercase tracking-[0.2em] text-gray-light">
          {label}
        </span>
      ) : null}
    </div>
  );
}
