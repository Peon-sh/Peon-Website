import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium text-muted-foreground">{eyebrow}</p>
      ) : null}
      <Tag className={Tag === 'h1' ? 'display' : 'title-xl'}>{title}</Tag>
      {lede ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{lede}</p>
      ) : null}
    </div>
  );
}
