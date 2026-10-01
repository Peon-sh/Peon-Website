import { cn } from '@/lib/utils';

type Surface = 'indigo' | 'pink' | 'cyan' | 'cream';

const SURFACE: Record<Surface, string> = {
  indigo: 'bg-surface-indigo text-surface-indigo-foreground',
  pink: 'bg-surface-pink text-surface-pink-foreground',
  cyan: 'bg-surface-cyan text-surface-cyan-foreground',
  cream: 'bg-surface-cream text-surface-cream-foreground',
};

/** Flat colour tile with a huge figure on top and a short label pinned to the bottom. */
export function StatTile({
  value,
  label,
  surface,
  className,
}: {
  value: string;
  label: string;
  surface: Surface;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col justify-between rounded-sm p-6 sm:p-8', SURFACE[surface], className)}>
      <p className="font-heading text-5xl leading-none font-semibold tracking-[-0.04em] tabular sm:text-6xl">{value}</p>
      <p className="mt-10 text-sm font-medium sm:text-base">{label}</p>
    </div>
  );
}
