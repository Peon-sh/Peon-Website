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
        <p className="mb-3 text-sm font-medium text-phosphor">{eyebrow}</p>
      ) : null}
      <Tag
        className={cn(
          Tag === 'h1'
            ? 'text-4xl leading-[1.08] sm:text-5xl lg:text-[56px]'
            : 'text-3xl leading-[1.15] sm:text-[40px]',
        )}
      >
        {title}
      </Tag>
      {lede ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{lede}</p>
      ) : null}
    </div>
  );
}
