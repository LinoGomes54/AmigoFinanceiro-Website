import { Link } from 'react-router-dom';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'on-dark' | 'outline-dark';

interface CommonProps {
  variant?: Variant;
  size?: 'md' | 'lg';
  block?: boolean;
  className?: string;
  children: ReactNode;
}

function classes({ variant = 'primary', size = 'md', block, className }: CommonProps): string {
  return [
    'btn',
    `btn--${variant}`,
    size === 'lg' && 'btn--lg',
    block && 'btn--block',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant, size, block, className, children, ...rest }: ButtonProps) {
  return (
    <button className={classes({ variant, size, block, className, children })} {...rest}>
      {children}
    </button>
  );
}

type LinkButtonProps = CommonProps & { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

/** Mesma aparência do Button, mas navegando pelo router. */
export function LinkButton({ variant, size, block, className, children, to, ...rest }: LinkButtonProps) {
  return (
    <Link to={to} className={classes({ variant, size, block, className, children })} {...rest}>
      {children}
    </Link>
  );
}

type AnchorButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

/** Para destinos externos ou âncoras na própria página. */
export function AnchorButton({ variant, size, block, className, children, ...rest }: AnchorButtonProps) {
  return (
    <a className={classes({ variant, size, block, className, children })} {...rest}>
      {children}
    </a>
  );
}
