import type { ReactNode } from 'react';
import { ArrowCircle } from '@/components/ui/arrow-circle';
import { cn } from '@/lib/utils';

/**
 * Big-type disclosure row: the title is always visible, everything else sits in the
 * `<details>` body. The copy stays in the HTML (indexable) but only shows on demand,
 * which is how the page keeps its SEO text while looking sparse. Native, no JS.
 */
export function Reveal({
  title,
  children,
  className,
  size = 'md',
  tone = 'default',
  defaultOpen,
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  size?: 'md' | 'lg';
  /** `inverse` for rows placed on an indigo surface. */
  tone?: 'default' | 'inverse';
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className={cn(
        'group border-b',
        tone === 'default' ? 'border-foreground/80' : 'border-white/70',
        className,
      )}
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center justify-between gap-6 py-5 select-none',
          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
          tone === 'inverse' && 'text-white',
        )}
      >
        <span
          className={cn(
            'font-heading font-semibold tracking-[-0.02em] text-balance',
            size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl',
          )}
        >
          {title}
        </span>
        <ArrowCircle size={size === 'lg' ? 'lg' : 'md'} />
      </summary>
      <div className={cn('pb-7', tone === 'inverse' ? 'text-white/85' : 'text-muted-foreground')}>{children}</div>
    </details>
  );
}
