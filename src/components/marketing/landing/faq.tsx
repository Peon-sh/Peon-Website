import { ArrowCircle } from '@/components/ui/arrow-circle';
import { Container, Section } from '@/components/ui/container';

export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: readonly FaqItem[] }) {
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];
  return (
    <Section id="faq" divider={false}>
      <Container>
        <p className="text-sm font-medium text-muted-foreground">FAQ</p>
        <h2 className="title-xl mt-3">Frequently asked questions</h2>
        <div className="mt-12 grid gap-x-12 lg:grid-cols-2">
          {cols.map((col, i) => (
            <div key={i} className="border-t border-foreground/80">
              {col.map((f) => (
                <details key={f.q} className="group border-b border-foreground/80 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold tracking-[-0.015em] text-foreground select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                    {f.q}
                    <ArrowCircle size="sm" />
                  </summary>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{f.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
