import { Check, Minus } from 'lucide-react';
import { ArrowCircle } from '@/components/ui/arrow-circle';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

export type ComparisonRow = { feature: string; cells: string[] };

const COMPARE_LINKS = [
  { label: 'Coolify', href: '/compare/peon-vs-coolify' },
  { label: 'Dokploy', href: '/compare/peon-vs-dokploy' },
  { label: 'Vercel', href: '/compare/peon-vs-vercel' },
  { label: 'Heroku', href: '/compare/peon-vs-heroku' },
  { label: 'DigitalOcean', href: '/compare/peon-vs-digitalocean' },
  { label: 'Railway', href: '/compare/peon-vs-railway' },
  { label: 'Render', href: '/compare/peon-vs-render' },
];

function CellValue({ value, peon }: { value: string; peon: boolean }) {
  const v = value.trim();
  if (v === 'Yes' || v === 'Included' || v.startsWith('Yes ·')) {
    return (
      <span className={cn('inline-flex items-center gap-1.5', peon ? 'text-foreground' : 'text-muted-foreground')}>
        <Check className={cn('size-4', peon ? 'text-brand-cyan' : 'text-muted-foreground')} strokeWidth={2.5} aria-hidden />
        <span>{v === 'Yes' ? 'Yes' : v}</span>
      </span>
    );
  }
  if (v === 'No') {
    return (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <Minus className="size-4" aria-hidden />
        No
      </span>
    );
  }
  return <span className={peon ? 'text-foreground' : 'text-muted-foreground'}>{v}</span>;
}

export function Comparison({
  platforms,
  rows,
}: {
  platforms: readonly string[];
  rows: readonly ComparisonRow[];
}) {
  return (
    <Section id="compare">
      <Container>
        <SectionHeading
          eyebrow="Compare"
          title="Peon vs Coolify, Dokploy, Vercel, Heroku & DigitalOcean"
          className="max-w-3xl"
        />
        {/* Positioning copy kept in the HTML; collapsed by default. */}
        <details className="group mt-6 max-w-2xl">
          <summary className="flex w-fit cursor-pointer list-none items-center gap-3 text-sm font-medium text-muted-foreground select-none hover:text-foreground">
            Why teams pick Peon
            <ArrowCircle size="sm" />
          </summary>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            All the self-hosted options deploy to servers you own. Peon is the one that ships
            workspace and project roles, audit logs, MCP for agents and an in-app AI assistant on
            standard plans, at <strong className="font-medium text-foreground">$3 per project</strong>{' '}
            with unlimited servers and seats.
          </p>
        </details>

        <div className="relative mt-12">
          <p className="mb-2 text-xs text-muted-foreground lg:hidden">Swipe to compare</p>
          <div className="relative">
            <div className="overflow-x-auto rounded-[10px] border border-foreground/80">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="bg-surface-indigo text-surface-indigo-foreground">
                <th className="sticky left-0 z-10 bg-surface-indigo px-4 py-3.5 font-medium">
                  Feature
                </th>
                {platforms.map((name, i) => (
                  <th
                    key={name}
                    className={cn('px-4 py-3.5 font-semibold', i === 0 ? 'text-white' : 'text-white/80')}
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b border-border last:border-0">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-card px-4 py-3 text-left font-medium text-foreground"
                  >
                    {row.feature}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td key={`${row.feature}-${platforms[i]}`} className={cn('px-4 py-3', i === 0 && 'bg-surface-indigo/10')}>
                      <CellValue value={cell} peon={i === 0} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-8 rounded-r-xl bg-gradient-to-l from-background to-transparent lg:hidden"
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
            Competitor pricing and plan limits reflect published entry-level plans and may change.
            Dokploy audit logs and fine-grained RBAC are Enterprise-tier on their published plans.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {COMPARE_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground">
                vs {l.label}
              </a>
            ))}
          </p>
        </div>
      </Container>
    </Section>
  );
}
