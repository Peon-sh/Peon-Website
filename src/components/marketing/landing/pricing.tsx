import { Button } from '@/components/ui/button';
import { CheckList } from '@/components/ui/check-list';
import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
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
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, affordable pricing"
          lede="Self-host for free, or let us run the control plane for $3 per project a month. Either way your apps stay on hardware you own and every teammate is included."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={cn(
                'relative flex flex-col rounded-xl border bg-card p-7',
                p.highlight ? 'border-border-bright shadow-[inset_0_2px_0_0_var(--phosphor)]' : 'border-border',
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{p.name}</h3>
                {p.highlight ? (
                  <span className="rounded-full bg-phosphor/10 px-2 py-0.5 text-xs font-medium text-phosphor">
                    Most popular
                  </span>
                ) : null}
              </div>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight tabular">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.cadence}</span>
              </div>
              {'sub' in p ? <p className="mt-1 text-sm text-muted-foreground">{p.sub}</p> : <p className="mt-1 h-5" />}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
              <CheckList items={p.bullets} className="mt-6 flex-1" dense />
              <div className="mt-8">
                {'appPath' in p.cta ? (
                  <Button appPath={p.cta.appPath} variant={p.highlight ? 'primary' : 'secondary'} className="w-full">
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

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-7">
          <p className="text-sm font-medium">Included in every plan</p>
          <ul className="mt-4 grid gap-x-8 gap-y-2.5 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
            {EVERY_PLAN.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-phosphor" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
