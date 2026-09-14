import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export function Badge({
  className,
  tone = 'neutral',
  ...rest
}: ComponentPropsWithoutRef<'span'> & { tone?: 'neutral' | 'accent' }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium',
        tone === 'accent'
          ? 'border-phosphor/30 bg-phosphor/10 text-phosphor'
          : 'border-border bg-secondary text-muted-foreground',
        className,
      )}
      {...rest}
    />
  );
}
