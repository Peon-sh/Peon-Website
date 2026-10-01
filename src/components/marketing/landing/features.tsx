import { ArtImage } from '@/components/ui/art-image';
import { Container, Section } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';

/**
 * "The whole stack" list. Titles are always visible; the body copy and illustration
 * sit inside native <details>, so the page reads sparse while the full text remains in
 * the HTML for crawlers.
 */
const ROWS = [
  {
    title: 'Git push to deploy, with previews',
    body: 'Every push builds and ships with zero-downtime rollouts and instant rollbacks. Pull requests get their own preview URL. Connect GitHub, GitLab, Bitbucket, or a plain Git URL with a deploy key.',
    art: 'git-push',
    alt: 'Hands on a keyboard with a bold arrow sweeping toward a glowing screen',
  },
  {
    title: 'A dashboard for every project',
    body: 'Deployments, servers, domains, logs and metrics in one place. Container logs, resource meters, health checks and notifications, so you never SSH in to find out what happened.',
    art: 'dashboard',
    alt: 'A control-room desk with several monitors showing graphs',
  },
  {
    title: 'Managed databases with backups',
    body: 'Postgres, MySQL, MariaDB, MongoDB and Redis on your own hardware, backed up on a schedule to S3-compatible storage.',
    art: 'databases',
    alt: 'Rows of cylinders on a shelf with a looping arrow to a square, representing backups',
  },
  {
    title: 'Domains and automatic HTTPS',
    body: 'Custom domains, auto-renewed Let’s Encrypt certificates, HTTP to HTTPS redirects and per-service routing out of the box.',
    art: 'domains',
    alt: 'A padlock and a globe on a desk with route lines drawn over them',
  },
  {
    title: 'Docker Compose, images and static sites',
    body: 'Prebuilt images, full Compose stacks or one-click templates. Ship static builds and SPAs from the same pipeline, with per-branch environments.',
    art: 'compose',
    alt: 'A scale model of stacked shipping containers',
  },
  {
    title: 'SSH terminal and scheduled tasks',
    body: 'Open a shell on any connected server without leaving the dashboard. Cron-style jobs run inside your service containers.',
    art: 'ssh-cron',
    alt: 'A wall clock beside a glowing terminal screen',
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
                <ArtImage name={r.art} alt={r.alt} className="mt-6" />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
