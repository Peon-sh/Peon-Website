import { cn } from '@/lib/utils';

/**
 * Code-built recreation of the Peon dashboard: sidebar, project header,
 * deployment list, and a live log pane. Decorative only (`aria-hidden`), no JS.
 * Labels mirror the real app (Dashboard, Chat, Projects, Servers, Git Sources…).
 */

const SIDEBAR = [
  { group: 'Overview', items: ['Dashboard', 'Chat', 'Projects'] },
  { group: 'Workspace', items: ['Servers', 'Storages', 'Git Sources', 'Keys & Tokens', 'Notifications'] },
] as const;

const DEPLOYS = [
  { sha: 'a41f9c2', msg: 'feat: stripe webhooks for annual plans', by: 'hiren', when: '2m ago', status: 'Building', tone: 'warning' },
  { sha: '9d02e17', msg: 'fix: retry queue on 502 from upstream', by: 'kuldip', when: '41m ago', status: 'Running', tone: 'success' },
  { sha: '7c88b03', msg: 'chore: bump node to 22.14', by: 'ci', when: '3h ago', status: 'Rolled back', tone: 'muted' },
] as const;

const LOG = [
  ['00:00.12', 'Received push to main (a41f9c2) from GitHub'],
  ['00:00.48', 'Cloning repository into build context'],
  ['00:03.91', 'Detected Next.js · using Dockerfile'],
  ['00:04.05', 'docker build · 14 layers · cache hit 11/14'],
  ['00:38.20', 'Image built · 184 MB · pushing to server hel1-01'],
  ['00:41.77', 'Starting container api-web-3 on peon-net'],
  ['00:44.02', 'Health check GET /healthz → 200 in 38 ms'],
  ['00:44.10', 'Traefik route updated · api.acme.dev → api-web-3'],
  ['00:44.12', 'Draining api-web-2 · zero-downtime rollout complete'],
] as const;

function StatusDot({ tone }: { tone: 'success' | 'warning' | 'muted' }) {
  return (
    <span className="relative inline-flex size-2">
      {tone === 'warning' ? (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-warning/60" />
      ) : null}
      <span
        className={cn(
          'relative inline-flex size-2 rounded-full',
          tone === 'success' && 'bg-phosphor',
          tone === 'warning' && 'bg-warning',
          tone === 'muted' && 'bg-faint',
        )}
      />
    </span>
  );
}

export function MockDashboard({ className }: { className?: string }) {
  return (
    <div className={cn('frame min-w-0 overflow-hidden text-[12px] leading-none', className)} aria-hidden>
      {/* Window chrome */}
      <div className="flex h-9 items-center gap-2 border-b border-border bg-secondary/60 px-3">
        <span className="size-2.5 rounded-full bg-border-bright" />
        <span className="size-2.5 rounded-full bg-border-bright" />
        <span className="size-2.5 rounded-full bg-border-bright" />
        <div className="ml-3 flex h-6 flex-1 items-center rounded-md border border-border bg-background px-2.5 text-[11px] text-faint">
          app.peon.sh/projects/acme-api
        </div>
      </div>

      <div className="grid grid-cols-[168px_1fr] max-sm:grid-cols-1">
        {/* Sidebar */}
        <aside className="hidden border-r border-border bg-secondary/40 p-3 sm:block">
          <div className="mb-4 flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5">
            <span className="size-4 rounded bg-phosphor/20 ring-1 ring-phosphor/40" />
            <span className="text-foreground">Acme Inc</span>
            <span className="ml-auto text-faint">⌄</span>
          </div>
          {SIDEBAR.map((g) => (
            <div key={g.group} className="mb-4">
              <p className="mb-1.5 px-2 text-[10px] font-medium tracking-wide text-faint uppercase">{g.group}</p>
              {g.items.map((it) => (
                <div
                  key={it}
                  className={cn(
                    'rounded-md px-2 py-1.5',
                    it === 'Projects' ? 'bg-accent text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {it}
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* Main */}
        <div className="min-w-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="hidden text-faint sm:inline">Projects /</span>
              <span className="font-medium text-foreground">acme-api</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-phosphor/30 bg-phosphor/10 px-2 py-0.5 text-[10px] font-medium text-phosphor">
                <StatusDot tone="success" /> Healthy
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-border px-2 py-1 text-muted-foreground">Logs</span>
              <span className="rounded-md bg-primary px-2 py-1 font-medium text-primary-foreground">Deploy</span>
            </div>
          </div>

          <div className="grid gap-px border-b border-border bg-border sm:grid-cols-3">
            {[
              ['Server', 'hel1-01 · Hetzner CX22'],
              ['Domain', 'api.acme.dev · TLS valid 82d'],
              ['Uptime', '99.98% · 30d'],
            ].map(([k, v]) => (
              <div key={k} className="bg-card px-4 py-2.5">
                <p className="text-[10px] text-faint">{k}</p>
                <p className="mt-1 text-foreground">{v}</p>
              </div>
            ))}
          </div>

          <div className="px-4 py-3">
            <p className="mb-2 text-[10px] font-medium tracking-wide text-faint uppercase">Deployments</p>
            <div className="divide-y divide-border rounded-md border border-border">
              {DEPLOYS.map((d) => (
                <div key={d.sha} className="flex items-center gap-3 px-3 py-2">
                  <StatusDot tone={d.tone} />
                  <span className="font-mono text-[11px] text-muted-foreground">{d.sha}</span>
                  <span className="truncate text-foreground">{d.msg}</span>
                  <span className="ml-auto hidden shrink-0 text-faint sm:inline">
                    {d.by} · {d.when}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium',
                      d.tone === 'success' && 'bg-phosphor/10 text-phosphor',
                      d.tone === 'warning' && 'bg-warning/10 text-warning',
                      d.tone === 'muted' && 'bg-secondary text-muted-foreground',
                    )}
                  >
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border bg-[#070708] px-4 py-3 overflow-hidden font-mono text-[11px] leading-[1.7]">
            <div className="mb-1.5 flex items-center gap-2 text-faint">
              <span className="text-phosphor">●</span> build · a41f9c2 · streaming
            </div>
            {LOG.map(([t, line]) => (
              <div key={t} className="flex gap-3 whitespace-nowrap">
                <span className="shrink-0 text-faint tabular">{t}</span>
                <span className="truncate text-muted-foreground">{line}</span>
              </div>
            ))}
            <div className="mt-0.5 flex gap-3">
              <span className="text-faint">00:44.12</span>
              <span className="text-phosphor">✓ Deployment finished</span>
              <span className="inline-block h-3 w-1.5 animate-pulse bg-phosphor/70 align-middle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
