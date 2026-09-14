import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { MockRow, MockTerminal } from './mock-bits';
import { Check } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    title: 'Connect a server',
    body: 'Any Linux box with SSH: Hetzner, DigitalOcean, AWS, OVH or your own rack. Peon installs Docker and the proxy for you.',
    mock: (
      <div className="space-y-2" aria-hidden>
        <MockRow className="text-muted-foreground">
          <span className="text-faint">Host</span>
          <span className="font-mono text-[11px] text-foreground">65.108.24.17</span>
          <span className="ml-auto text-faint">root · 22</span>
        </MockRow>
        <MockRow className="text-muted-foreground">
          <span className="text-faint">Key</span>
          <span className="font-mono text-[11px] text-foreground">peon-deploy · ed25519</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-phosphor">
            <Check className="size-3.5" /> Reachable
          </span>
        </MockRow>
      </div>
    ),
  },
  {
    n: '02',
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
    title: 'Peon runs it for you',
    body: 'Builds, zero-downtime rollouts, custom domains with automatic HTTPS, health checks, logs, backups and rollbacks.',
    mock: (
      <div className="space-y-2" aria-hidden>
        <MockRow>
          <span className="size-1.5 rounded-full bg-phosphor" />
          <span className="font-medium text-foreground">api.acme.dev</span>
          <span className="ml-auto text-faint">HTTPS · 200 · 38 ms</span>
        </MockRow>
        <MockRow className="text-muted-foreground">
          <span className="text-faint">Rollout</span>
          <span>api-web-3 replaced api-web-2</span>
          <span className="ml-auto text-phosphor">0 s downtime</span>
        </MockRow>
      </div>
    ),
  },
] as const;

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From a bare server to production in three steps"
          lede="No YAML archaeology, no hand-rolled nginx and certbot timers. Peon handles the platform layer so your team only touches code."
        />
        <ol className="mt-14 grid gap-8 lg:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="flex min-w-0 flex-col">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-phosphor tabular">{s.n}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <div className="mt-6">{s.mock}</div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
