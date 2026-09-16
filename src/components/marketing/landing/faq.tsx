import { ChevronDown } from 'lucide-react';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: readonly FaqItem[] }) {
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];
  return (
    <Section id="faq">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mt-12 grid gap-x-10 lg:grid-cols-2">
          {cols.map((col, i) => (
            <div key={i} className="divide-y divide-border border-t border-border">
              {col.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15px] font-medium text-foreground">
                    {f.q}
                    <ChevronDown className="mt-0.5 size-4 shrink-0 text-faint transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
