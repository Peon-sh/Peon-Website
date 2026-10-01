import { Container, Section } from '@/components/ui/container';
import { MockRow, MockTerminal } from './mock-bits';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    n: '01',
    border: 'border-b-surface-cyan',
    title: 'Connect a server',
    body: 'Any Linux box with SSH: Hetzner, DigitalOcean, AWS, OVH or your own rack. Peon installs Docker and the proxy for you.',
    mock: (
      <div className="space-y-2" aria-hidden>
        <MockRow className="text-muted-foreground">
          <span className="text-faint">Host</span>
          <span className="truncate font-mono text-[11px] text-foreground">65.108.24.17</span>
          <span className="ml-auto text-faint">root · 22</span>
        </MockRow>
        <MockRow className="text-muted-foreground">
          <span className="text-faint">Key</span>
          <span className="truncate font-mono text-[11px] text-foreground">peon-deploy · ed25519</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-success">
            <Check className="size-3.5" /> Reachable
          </span>
        </MockRow>
      </div>
    ),
  },
  {
    n: '02',
    border: 'border-b-surface-pink',
    title: 'Push code or pick a template',
    body: 'Connect GitHub, GitLab or Bitbucket, point at a Dockerfile or Compose file, or choose one of 300+ marketplace services.',
    mock: (
      <MockTerminal
        lines={['$ git push origin main', 'remote: Peon · detected Dockerfile', 'remote: Peon · building acme-api…']}
      />
    ),
  },
  {
    n: '03',
    border: 'border-b-surface-indigo',
    title: 'Peon runs it for you',
    body: 'Builds, zero-downtime rollouts, custom domains with automatic HTTPS, health checks, logs, backups and rollbacks.',
    mock: (
      <div className="space-y-2" aria-hidden>
        <MockRow>
          <span className="size-1.5 rounded-full bg-success" />
          <span className="truncate font-medium text-foreground">api.acme.dev</span>
          <span className="ml-auto text-faint">HTTPS · 200 · 38 ms</span>
        </MockRow>
        <MockRow className="text-muted-foreground">
          <span className="text-faint">Rollout</span>
          <span className="truncate">api-web-3 replaced api-web-2</span>
          <span className="ml-auto text-success">0 s downtime</span>
        </MockRow>
      </div>
    ),
  },
] as const;

export function HowItWorks() {
  return (
    <Section id="how-it-works" divider={false} className="bg-dots">
      <Container>
        <p className="text-sm font-medium text-muted-foreground">How it works</p>
        <h2 className="title-xl mt-3 max-w-3xl">From a bare server to production in three steps</h2>
        <ol className="mt-12 grid gap-4 lg:grid-cols-3">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className={cn(
                'theme-cream flex min-w-0 flex-col rounded-[10px] border-b-8 bg-surface-cream p-7 text-surface-cream-foreground',
                s.border,
              )}
            >
              <span className="font-mono text-sm font-semibold tabular">{s.n}</span>
              <h3 className="mt-10 text-2xl leading-tight font-semibold tracking-[-0.02em] sm:text-3xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-surface-cream-muted">{s.body}</p>
              <div className="mt-8">{s.mock}</div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
