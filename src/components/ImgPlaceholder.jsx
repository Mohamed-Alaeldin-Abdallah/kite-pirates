/**
 * Styled placeholder used wherever client photography will drop in.
 * With `src` it renders a real <img>; otherwise a minimal framed block.
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
        className={`${ratio} ${rounded} w-full border border-mid object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt || label || 'Kite Pirates photo placeholder'}
      className={`${ratio} ${rounded} flex w-full flex-col items-center justify-center border border-mid bg-dark-3 text-gray ${className}`}
    >
      {Icon ? <Icon className="mb-2 h-8 w-8 text-ocean/70" aria-hidden="true" /> : null}
      {label ? (
        <span className="font-body text-xs uppercase tracking-[0.2em] text-gray-light">
          {label}
        </span>
      ) : null}
    </div>
  );
}
