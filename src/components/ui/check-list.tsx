import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CheckList({
  items,
  className,
  dense = false,
}: {
  items: readonly string[];
  className?: string;
  dense?: boolean;
}) {
  return (
    <ul className={cn(dense ? 'space-y-2' : 'space-y-3', 'text-sm text-muted-foreground', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Check className="mt-[3px] size-4 shrink-0 text-phosphor" strokeWidth={2.5} aria-hidden />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
