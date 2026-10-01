import { ArrowCircle } from '@/components/ui/arrow-circle';
import { Button } from '@/components/ui/button';
import { CheckList } from '@/components/ui/check-list';
import { Container, Section } from '@/components/ui/container';
import { SPONSOR_LINKS } from '@/lib/sponsors';
import { cn } from '@/lib/utils';

const EVERY_PLAN = [
  'Unlimited team members, no per-seat pricing',
  'Workspace and project RBAC',
  'Audit logs',
  'MCP server for AI agents',
  'In-app AI assistant',
  'Git push, Docker images and Compose',
  'Managed databases with backups',
  'PR preview deployments',
  'Custom domains and automatic HTTPS',
  'Live logs, metrics and notifications',
  'SSH terminal and scheduled tasks',
  'One-click marketplace templates',
] as const;

const PLANS = [
  {
    name: 'Self-hosted',
    price: '$0',
    cadence: 'forever',
    blurb: 'Run the whole control plane on your own infrastructure. Same features, no license fee.',
    bullets: ['Full platform, nothing gated', 'Unlimited projects and servers', 'You manage updates and hosting', 'Community support'],
    cta: { label: 'Self-host from source', href: SPONSOR_LINKS.githubApp, external: true },
    highlight: false,
  },
  {
    name: 'Cloud',
    price: '$3',
    cadence: 'per project / month',
    sub: 'or $30 per project / year',
    blurb: 'We host and update the dashboard and pipelines. Your apps still run on your servers.',
    bullets: ['Managed control plane with automatic updates', 'Unlimited servers per workspace', 'Unlimited team members', 'Deploy to any server you own', 'Email support'],
    cta: { label: 'Create your first project', appPath: '/register' },
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: 'cloud or self-hosted',
    blurb: 'For organisations that need identity, compliance and contractual guarantees.',
    bullets: ['SSO / SAML and SCIM provisioning', 'Fine-grained RBAC', 'White labeling', 'On-prem or private cloud', 'MSA / SLA and priority support'],
    cta: { label: 'Contact sales', href: 'mailto:support@peon.sh?subject=Enterprise%20inquiry' },
    highlight: false,
  },
] as const;

export function Pricing() {
  return (
    <Section id="pricing">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pricing</p>
            <h2 className="title-xl mt-3">
              Choose
              <br />
              your plan
            </h2>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-muted-foreground">
              Self-host for free, or let us run the control plane for $3 per project a month. Either
              way your apps stay on hardware you own and every teammate is included.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={cn(
                'relative flex flex-col rounded-[10px] p-7',
                p.highlight
                  ? 'theme-cream bg-surface-cream text-surface-cream-foreground'
                  : 'border border-foreground/80 bg-card',
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{p.name}</h3>
                {p.highlight ? (
                  <span className="rounded-full bg-surface-indigo px-2.5 py-0.5 text-xs font-medium text-white">
                    Most popular
                  </span>
                ) : null}
              </div>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-heading text-5xl font-semibold tracking-[-0.04em] tabular">{p.price}</span>
                <span className={cn('text-sm', p.highlight ? 'text-surface-cream-muted' : 'text-muted-foreground')}>{p.cadence}</span>
              </div>
              {'sub' in p ? (
                <p className={cn('mt-1 text-sm', p.highlight ? 'text-surface-cream-muted' : 'text-muted-foreground')}>{p.sub}</p>
              ) : (
                <p className="mt-1 h-5" />
              )}
              <p className={cn('mt-4 text-sm leading-relaxed', p.highlight ? 'text-surface-cream-muted' : 'text-muted-foreground')}>{p.blurb}</p>
              <CheckList items={p.bullets} className="mt-6 flex-1" dense />
              <div className="mt-8">
                {'appPath' in p.cta ? (
                  <Button appPath={p.cta.appPath} variant="primary" className="w-full">
                    {p.cta.label}
                  </Button>
                ) : (
                  <Button
                    href={p.cta.href}
                    variant="secondary"
                    className="w-full"
                    {...('external' in p.cta && p.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {p.cta.label}
                  </Button>
                )}
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Full feature list stays indexable; collapsed by default. */}
        <details className="group mt-12 rounded-[10px] border border-foreground/80 p-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-semibold tracking-[-0.02em] select-none sm:text-2xl">
            Included in every plan
            <ArrowCircle />
          </summary>
          <ul className="mt-6 grid gap-x-8 gap-y-2.5 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
            {EVERY_PLAN.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-pink" />
                {item}
              </li>
            ))}
          </ul>
        </details>
      </Container>
    </Section>
  );
}
