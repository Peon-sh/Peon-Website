import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export function Container({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('mx-auto w-full max-w-6xl px-6', className)} {...rest} />;
}

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  /** Draw a top hairline between sections. */
  divider?: boolean;
};

export function Section({ className, divider = true, ...rest }: SectionProps) {
  return (
    <section
      className={cn('py-20 sm:py-28', divider && 'border-t border-border', className)}
      {...rest}
    />
  );
}
