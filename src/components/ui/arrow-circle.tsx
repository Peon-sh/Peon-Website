import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Outlined circle with an arrow. Rotates to point down when the parent `<details>`
 * (with class `group`) is open, so it doubles as a disclosure marker.
 */
export function ArrowCircle({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border-2 border-current transition-transform group-open:rotate-90',
        size === 'sm' && 'size-7 [&>svg]:size-3.5',
        size === 'md' && 'size-9 [&>svg]:size-4',
        size === 'lg' && 'size-12 [&>svg]:size-5',
        className,
      )}
      aria-hidden
    >
      <ArrowRight strokeWidth={2.5} />
    </span>
  );
}
