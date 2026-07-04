import { Link, type To } from 'react-router-dom';
import type { ElementType, MouseEventHandler, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  as?: ElementType;
  href?: string;
  to?: To;
  state?: unknown;
  variant?: Variant;
  className?: string;
  children?: ReactNode;
  download?: boolean | string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: MouseEventHandler;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-amber text-navy-950 hover:bg-amber-dark focus-visible:outline-amber-dark',
  secondary: 'border border-current bg-transparent hover:bg-ink/5',
  ghost: 'bg-transparent hover:bg-ink/5',
};

/**
 * Polymorphic button: pass `to` for an internal react-router link, `href`
 * for a plain link, otherwise it renders a real <button>.
 */
export default function Button({
  as,
  href,
  to,
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  const Component = as || 'button';
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
