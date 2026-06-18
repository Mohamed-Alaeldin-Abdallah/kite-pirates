import { Link } from 'react-router-dom';

/* ---- Display: Bebas Neue headline ------------------------------------- */
export function Display({ as: Tag = 'h2', className = '', children, ...rest }) {
  return (
    <Tag className={`font-display uppercase ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---- Eyebrow: small teal uppercase label ------------------------------ */
export function Eyebrow({ className = '', children }) {
  return (
    <span
      className={`inline-block font-body text-xs font-semibold uppercase tracking-[0.25em] text-teal ${className}`}
    >
      {children}
    </span>
  );
}

/* ---- Tag: teal chip ---------------------------------------------------- */
export function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-medium text-teal ${className}`}
    >
      {children}
    </span>
  );
}

/* ---- Button base ------------------------------------------------------- */
const baseBtn =
  'splash inline-flex items-center justify-center gap-2 rounded-md font-body font-semibold tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:opacity-60 disabled:pointer-events-none';

const sizes = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

function resolveProps({ to, href, external }) {
  // External links get rel hardening to prevent reverse-tabnabbing & referrer leak.
  if (href) {
    return {
      Comp: 'a',
      extra: external
        ? { href, target: '_blank', rel: 'noopener noreferrer nofollow' }
        : { href },
    };
  }
  if (to) return { Comp: Link, extra: { to } };
  return { Comp: 'button', extra: { type: 'button' } };
}

export function BtnPrimary({ children, className = '', size = 'md', to, href, external, ...rest }) {
  const { Comp, extra } = resolveProps({ to, href, external });
  return (
    <Comp
      className={`${baseBtn} ${sizes[size]} bg-teal text-dark hover:-translate-y-0.5 hover:bg-teal-dark hover:shadow-teal ${className}`}
      {...extra}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function BtnGhost({ children, className = '', size = 'md', to, href, external, ...rest }) {
  const { Comp, extra } = resolveProps({ to, href, external });
  return (
    <Comp
      className={`${baseBtn} ${sizes[size]} border border-teal/40 bg-transparent text-ink hover:-translate-y-0.5 hover:border-teal hover:bg-teal/10 ${className}`}
      {...extra}
      {...rest}
    >
      {children}
    </Comp>
  );
}
