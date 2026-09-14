import { Container, Section } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { MockAudit, MockBackups, MockChat, MockDomains, MockGitPush } from './mock-bits';
import { cn } from '@/lib/utils';

const ALSO = [
  ['Live logs, metrics and alerts', 'Container logs, resource meters, health checks and notifications.'],
  ['Docker Compose and images', 'Prebuilt images, full Compose stacks or one-click templates.'],
  ['Static sites and SPAs', 'Ship static builds from the same pipeline, with per-branch environments.'],
  ['SSH terminal in the browser', 'Open a shell on any connected server without leaving the dashboard.'],
  ['Scheduled tasks', 'Cron-style jobs that run inside your service containers.'],
  ['Any Git provider', 'GitHub, GitLab, Bitbucket, or a plain Git URL with a deploy key.'],
] as const;

function Cell({
  title,
  body,
  children,
  className,
  links,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
  className?: string;
  links?: { label: string; href: string }[];
}) {
  return (
    <article className={cn('flex flex-col rounded-xl border border-border bg-card p-6', className)}>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
      {links ? (
        <p className="mt-3 flex flex-wrap gap-x-4 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-medium text-foreground underline-offset-4 hover:underline">
              {l.label} →
            </a>
          ))}
        </p>
      ) : null}
      <div className="mt-6 flex-1">{children}</div>
    </article>
  );
}

export function Features() {
  return (
    <Section id="features">
      <Container>
        <SectionHeading
          eyebrow="Platform"
          title="Everything a PaaS gives you, on hardware you control"
          lede="Peon turns any Linux server into your own Docker hosting platform: git push deploys, managed databases and team access, without per-seat pricing or a walled garden."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <Cell
            title="MCP server and in-app AI assistant"
            body="A hosted MCP endpoint for Cursor and Claude, plus a chat assistant that uses the same tools under the same RBAC. Mutations wait for your approval and land in the audit log."
            links={[
              { label: 'MCP setup', href: '/docs/mcp' },
              { label: 'Chat assistant', href: '/docs/chat-assistant' },
            ]}
            className="lg:col-span-2"
          >
            <MockChat />
          </Cell>
          <Cell
            title="Git push to deploy, with previews"
            body="Every push builds and ships with zero-downtime rollouts and instant rollbacks. Pull requests get their own preview URL."
          >
            <MockGitPush />
          </Cell>
          <Cell
            title="Managed databases with backups"
            body="Postgres, MySQL, MariaDB, MongoDB and Redis on your own hardware, backed up on a schedule to S3-compatible storage."
          >
            <MockBackups />
          </Cell>
          <Cell
            title="Domains and automatic HTTPS"
            body="Custom domains, auto-renewed Let’s Encrypt certificates, HTTP to HTTPS redirects and per-service routing out of the box."
          >
            <MockDomains />
          </Cell>
          <Cell
            title="Team roles and audit logs"
            body="Workspace and project roles so teammates get an app, not root on every server. Owners see who did what, included on every plan."
          >
            <MockAudit />
          </Cell>
        </div>

        <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {ALSO.map(([t, b]) => (
            <div key={t}>
              <dt className="text-sm font-medium text-foreground">{t}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
