import type { Metadata } from 'next';
import { SiteHeader } from '@/components/marketing/site-header';
import { SiteFooter } from '@/components/marketing/site-footer';
import { GithubIcon } from '@/components/icons/github';
import { SPONSOR_LINKS, VISIBLE_SPONSOR_CHANNELS } from '@/lib/sponsors';
import { AppCtaLink } from '@/components/marketing/app-cta-link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Open Source: We believe in Open Source',
  description:
    'Peon is free and open source. Same features when you self-host. Sustainability via donations and optional Peon Cloud, not feature paywalls.',
  alternates: { canonical: '/open-source' },
  openGraph: {
    title: 'We believe in Open Source | Peon',
    description:
      'Software should be free and accessible. Peon is open source, self-hostable, and funded by the community and optional Cloud, not locked features.',
    url: '/open-source',
  },
};

const COMMITMENTS = [
  {
    title: 'Free and open source',
    body: 'Every Peon repository we ship is public on GitHub. You can read the code, run it yourself, learn from it, and contribute back.',
  },
  {
    title: 'No feature paywalls on the platform',
    body: 'Self-host gets the full deployment platform: git push, Compose, databases, domains, workspace and project RBAC, audit logs, MCP, and the in-app AI assistant. We do not hide core product behind a paid “community vs pro” split.',
  },
  {
    title: 'Cloud is optional, not a cage',
    body: 'Peon Cloud hosts the control plane for $3/project/month or $30/year so you do not have to operate the dashboard. Apps still run on your servers. Self-host remains free forever.',
  },
  {
    title: 'Forever free to self-host',
    body: 'This is not a temporary growth hack. Self-hosting Peon, meaning the platform itself, not the server it runs on, will stay free. That principle is how we believe infrastructure software should work.',
  },
] as const;

const TODAY = [
  {
    label: 'Public repositories',
    value: '3',
    hint: 'Public repos under Peon-sh on GitHub',
  },
  {
    label: 'Self-host price',
    value: '$0',
    hint: 'Control plane and product features, no license fee',
  },
  {
    label: 'Cloud pricing',
    value: '$3',
    hint: 'Per project / month · unlimited servers & seats',
  },
  {
    label: 'Marketplace templates',
    value: '300+',
    hint: 'One-click Compose stacks you can also edit yourself',
  },
] as const;

export default function OpenSourcePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="open-source" />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-20">
            <p className="font-mono text-xs uppercase tracking-widest text-phosphor">Open source</p>
            <h1 className="mt-3 text-3xl font-800 leading-tight sm:text-5xl">
              We believe in Open Source
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Software should be free and accessible to everyone.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We believe great deployment tools should not depend on your budget. Peon is
              completely open source and free to self-host. The same product you get on Peon
              Cloud is the product you can run on your own metal without locking core features
              behind a paywall.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              That is not just a marketing line. Too many “open source” platforms slowly close
              the gates: community editions with artificial limits, enterprise SKUs that hold
              back the good stuff. We chose a different path: publish the platform, fund the
              work honestly, and keep self-host free.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={SPONSOR_LINKS.githubApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-md border border-border-bright px-8 py-3.5 text-base font-semibold hover:bg-accent"
              >
                <GithubIcon className="size-5 shrink-0" />
                View on GitHub
              </a>
              <a
                href={SPONSOR_LINKS.stripeOrDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:opacity-90"
              >
                Sponsor Peon
              </a>
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-3xl px-4 py-14">
            <h2 className="panel-title-slashes text-2xl font-700 sm:text-3xl">What this means</h2>
            <p className="mt-3 text-muted-foreground">Our commitments to the community.</p>
            <div className="mt-10 space-y-8">
              {COMMITMENTS.map((item) => (
                <div key={item.title}>
                  <h3 className="font-heading text-base font-700 text-phosphor">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              Enterprise packaging (SSO/SAML, SCIM, white label, MSA/SLA) exists for
              organizations that need identity-provider integration and contracts, not to
              withhold deploys, RBAC, audit logs, or MCP from self-host and Cloud users. See{' '}
              <a href="/#pricing" className="text-phosphor underline-offset-4 hover:underline">
                pricing
              </a>
              .
            </p>
          </div>
        </section>

        {/* Sustain */}
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-3xl px-4 py-14">
            <h2 className="panel-title-slashes text-2xl font-700 sm:text-3xl">
              How we sustain development
            </h2>
            <p className="mt-3 text-muted-foreground">Because we still need to pay the bills.</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Making software free does not make engineering free. We sustain Peon through
              community support and an optional hosted control plane so we can keep shipping
              for people who self-host, not for arbitrary growth metrics.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <h3 className="font-heading text-base font-700 text-phosphor">
                  Community donations
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  If Peon is useful to you, you can support open-source development and ongoing
                  maintenance with a donation. Every contribution buys more time for features,
                  docs, and support.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-base font-700 text-phosphor">Hosted services</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Prefer not to operate the control plane?{' '}
                  <AppCtaLink
                    path="/register"
                    className="text-phosphor underline-offset-4 hover:underline"
                  >
                    Peon Cloud
                  </AppCtaLink>{' '}
                  is $3 per project per month or $30 per year with unlimited servers and seats.
                  Same product features; we run the dashboard and updates. Revenue funds
                  continued open-source development.
                </p>
              </div>
            </div>

            <div
              className={
                VISIBLE_SPONSOR_CHANNELS.length > 1
                  ? 'mt-10 grid gap-4 sm:grid-cols-3'
                  : 'mt-10 grid max-w-md gap-4'
              }
            >
              {VISIBLE_SPONSOR_CHANNELS.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.href}
                  target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={channel.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-bright"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    Support us
                  </p>
                  <h3 className="mt-2 font-heading text-base font-700 text-phosphor">
                    {channel.name}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {channel.description}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-foreground">
                    {channel.cta} →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Today: honest metrics */}
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-3xl px-4 py-14">
            <h2 className="panel-title-slashes text-2xl font-700 sm:text-3xl">Where we are today</h2>
            <p className="mt-3 text-muted-foreground">
              Transparency without vanity. We are early. Here is what is real right now.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {TODAY.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-card px-5 py-6"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-heading text-3xl font-900 text-phosphor">{stat.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stat.hint}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              We will publish stars, cloud users, and donation totals here when those numbers
              are meaningful, not invented. Until then: the code is public, the pricing is
              simple, and sponsorship keeps the lights on.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={SPONSOR_LINKS.githubOrg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-phosphor underline-offset-4 hover:underline"
                >
                  github.com/Peon-sh
                </a>{' '}
                (organization)
              </li>
              <li>
                <a
                  href={SPONSOR_LINKS.githubApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-phosphor underline-offset-4 hover:underline"
                >
                  Peon-sh/Peon
                </a>{' '}
                (application & worker)
              </li>
              <li>
                <a
                  href={SPONSOR_LINKS.githubWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-phosphor underline-offset-4 hover:underline"
                >
                  Peon-sh/Peon-Website
                </a>{' '}
                (this site)
              </li>
            </ul>
          </div>
        </section>

        {/* Closing */}
        <section>
          <div className="mx-auto w-full max-w-3xl px-4 py-14">
            <h2 className="panel-title-slashes text-2xl font-700 sm:text-3xl">Built for the community</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              This philosophy guides everything we do at Peon: free to self-host, open to
              inspect, and funded by people who want the work to continue through donations,
              Cloud, or simply using and sharing the software.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Thank you to everyone who supports that vision. You make this possible.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SPONSOR_LINKS.stripeOrDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Sponsor Peon
              </a>
              <a
                href="/docs/contributing"
                className="inline-flex rounded-md border border-border-bright px-5 py-2.5 text-sm font-semibold hover:bg-accent"
              >
                Contribute code
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
