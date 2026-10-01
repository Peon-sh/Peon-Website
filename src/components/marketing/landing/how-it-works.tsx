import { ArtImage } from '@/components/ui/art-image';
import { Container, Section } from '@/components/ui/container';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    n: '01',
    border: 'border-b-surface-cyan',
    title: 'Connect a server',
    body: 'Any Linux box with SSH: Hetzner, DigitalOcean, AWS, OVH or your own rack. Peon installs Docker and the proxy for you.',
    art: 'step-connect',
    alt: 'A hand plugging a cable into the back of a server',
  },
  {
    n: '02',
    border: 'border-b-surface-pink',
    title: 'Push code or pick a template',
    body: 'Connect GitHub, GitLab or Bitbucket, point at a Dockerfile or Compose file, or choose one of 300+ marketplace services.',
    art: 'step-push',
    alt: 'A monitor showing a branching diagram with an arrow pointing up and right',
  },
  {
    n: '03',
    border: 'border-b-surface-indigo',
    title: 'Peon runs it for you',
    body: 'Builds, zero-downtime rollouts, custom domains with automatic HTTPS, health checks, logs, backups and rollbacks.',
    art: 'step-run',
    alt: 'A satellite dish and antenna tower against a colour-blocked sky',
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
                'flex min-w-0 flex-col rounded-sm border-b-8 bg-surface-cream p-7 text-surface-cream-foreground',
                s.border,
              )}
            >
              <span className="font-mono text-sm font-semibold tabular">{s.n}</span>
              <h3 className="mt-10 text-2xl leading-tight font-semibold tracking-[-0.02em] sm:text-3xl">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-surface-cream-muted">{s.body}</p>
              <ArtImage name={s.art} alt={s.alt} className="mt-8" />
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
