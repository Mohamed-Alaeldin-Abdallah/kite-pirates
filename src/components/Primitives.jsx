import { Link } from 'react-router-dom';

/* ---- Display: thin uppercase Inter headline --------------------------- */
export function Display({ as: Tag = 'h2', className = '', children, ...rest }) {
  return (
    <Tag className={`font-display uppercase ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---- Eyebrow: 13px accent uppercase label ----------------------------- */
export function Eyebrow({ className = '', children }) {
  return (
    <span
      className={`inline-block font-body text-[13px] font-semibold uppercase tracking-[0.1em] text-ocean ${className}`}
    >
      {children}
    </span>
  );
}

/* ---- Tag: minimal hairline chip --------------------------------------- */
export function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-mid px-3 py-1 text-xs font-medium text-ocean ${className}`}
    >
      {children}
    </span>
  );
}

/* ---- Buttons: pills (filled accent / outlined accent / white-on-photo) - */
function resolveProps({ to, href, external }) {
  if (href) {
    return {
      Comp: 'a',
      extra: external ? { href, target: '_blank', rel: 'noopener noreferrer nofollow' } : { href },
    };
  }
  if (to) return { Comp: Link, extra: { to } };
  return { Comp: 'button', extra: { type: 'button' } };
}

export function BtnPrimary({ children, className = '', size = 'md', to, href, external, ...rest }) {
  const { Comp, extra } = resolveProps({ to, href, external });
  return (
    <Comp className={`btn btn-fill ${size === 'sm' ? 'btn-sm' : ''} ${className}`} {...extra} {...rest}>
      {children}
    </Comp>
  );
}

export function BtnGhost({
  children,
  className = '',
  size = 'md',
  to,
  href,
  external,
  onPhoto = false,
  ...rest
}) {
  const { Comp, extra } = resolveProps({ to, href, external });
  return (
    <Comp
      className={`btn ${onPhoto ? 'btn-photo' : 'btn-outline'} ${size === 'sm' ? 'btn-sm' : ''} ${className}`}
      {...extra}
      {...rest}
    >
      {children}
    </Comp>
  );
}
