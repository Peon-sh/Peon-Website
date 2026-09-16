import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { AppCtaLink } from '@/components/marketing/app-cta-link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent';
type Size = 'sm' | 'md' | 'lg';

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent',
  accent: 'bg-phosphor text-[#0a0a0b] hover:brightness-110 border border-transparent',
  secondary:
    'bg-transparent text-foreground border border-border-bright hover:bg-accent hover:border-faint',
  ghost: 'bg-transparent text-muted-foreground hover:text-foreground border border-transparent',
};

const SIZE: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-5 text-[15px]',
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children'> & {
    /** Path on the Peon app (app.peon.sh). Mutually exclusive with href. */
    appPath?: string;
    href?: string;
  };

export function buttonClass({
  variant = 'primary',
  size = 'md',
  className,
}: Pick<BaseProps, 'variant' | 'size' | 'className'>) {
  return cn(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    VARIANT[variant],
    SIZE[size],
    className,
  );
}

/** Anchor styled as a button. Server component; renders `AppCtaLink` when `appPath` is set. */
export function Button({ variant, size, className, children, appPath, href, ...rest }: LinkProps) {
  const cls = buttonClass({ variant, size, className });
  if (appPath) {
    return (
      <AppCtaLink path={appPath} className={cls} {...rest}>
        {children}
      </AppCtaLink>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}
