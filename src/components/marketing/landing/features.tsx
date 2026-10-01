import { Container, Section } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { MockBackups, MockDomains, MockGitPush } from './mock-bits';
import { MockDashboard } from './mock-dashboard';

/**
 * "The whole stack" list. Titles are always visible; the body copy and product mocks
 * sit inside native <details>, so the page reads sparse while the full text remains in
 * the HTML for crawlers.
 */
const ROWS = [
  {
    title: 'Git push to deploy, with previews',
    body: 'Every push builds and ships with zero-downtime rollouts and instant rollbacks. Pull requests get their own preview URL. Connect GitHub, GitLab, Bitbucket, or a plain Git URL with a deploy key.',
    mock: <MockGitPush />,
  },
  {
    title: 'A dashboard for every project',
    body: 'Deployments, servers, domains, logs and metrics in one place. Container logs, resource meters, health checks and notifications, so you never SSH in to find out what happened.',
    mock: <MockDashboard />,
    wide: true,
  },
  {
    title: 'Managed databases with backups',
    body: 'Postgres, MySQL, MariaDB, MongoDB and Redis on your own hardware, backed up on a schedule to S3-compatible storage.',
    mock: <MockBackups />,
  },
  {
    title: 'Domains and automatic HTTPS',
    body: 'Custom domains, auto-renewed Let’s Encrypt certificates, HTTP to HTTPS redirects and per-service routing out of the box.',
    mock: <MockDomains />,
  },
  {
    title: 'Docker Compose, images and static sites',
    body: 'Prebuilt images, full Compose stacks or one-click templates. Ship static builds and SPAs from the same pipeline, with per-branch environments.',
  },
  {
    title: 'SSH terminal and scheduled tasks',
    body: 'Open a shell on any connected server without leaving the dashboard. Cron-style jobs run inside your service containers.',
  },
] as const;

export function Features() {
  return (
    <Section id="features" divider={false}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 className="title-xl">
              The whole stack.
              <br />
              No setup
              <br />
              slowdown.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
              Peon turns any Linux server into your own Docker hosting platform, without per-seat
              pricing or a walled garden.
            </p>
          </div>
          <div className="border-t border-foreground/80">
            {ROWS.map((r) => (
              <Reveal key={r.title} title={r.title}>
                <p className="max-w-2xl text-sm leading-relaxed sm:text-base">{r.body}</p>
                {'mock' in r && r.mock ? <div className="mt-6">{r.mock}</div> : null}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
