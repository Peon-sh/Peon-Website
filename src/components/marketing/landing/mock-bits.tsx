import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Small, self-contained UI fragments used inside feature and step cards. All `aria-hidden`. */

export function MockChat({ className }: { className?: string }) {
  return (
    <div className={cn('frame flex min-w-0 flex-col gap-3 overflow-hidden p-4 text-[12px] leading-relaxed', className)} aria-hidden>
      <div className="self-end max-w-[85%] rounded-lg rounded-tr-sm bg-accent px-3 py-2 text-foreground">
        The api deployment failed. Why, and can you fix it?
      </div>
      <div className="max-w-[92%] space-y-2">
        <div className="rounded-md border border-border bg-background px-3 py-2 font-mono text-[11px] text-muted-foreground">
          <span className="text-faint">tool</span> get_deployment_logs(<span className="text-foreground">acme-api</span>, last=1)
        </div>
        <p className="text-muted-foreground">
          Build failed on <span className="font-mono text-foreground">npm ci</span>: the lockfile pins{' '}
          <span className="font-mono text-foreground">sharp@0.33</span> but the base image is Node 22. Bumping to{' '}
          <span className="font-mono text-foreground">sharp@0.35</span> and redeploying will fix it.
        </p>
        <div className="flex items-center justify-between rounded-md border border-border bg-secondary/60 px-3 py-2">
          <div>
            <p className="font-medium text-foreground">Approve: update env &amp; redeploy</p>
            <p className="text-[11px] text-faint">Needs project ADMIN · logged to audit trail</p>
          </div>
          <span className="rounded bg-primary px-2 py-1 text-[11px] font-medium text-primary-foreground">Approve</span>
        </div>
      </div>
    </div>
  );
}

export function MockTerminal({ lines, className }: { lines: readonly string[]; className?: string }) {
  return (
    <div className={cn('frame overflow-hidden bg-[#070708] p-3.5 font-mono text-[11.5px] leading-[1.8]', className)} aria-hidden>
      {lines.map((l, i) => (
        <div key={i} className={cn('whitespace-pre', l.startsWith('$') ? 'text-foreground' : 'text-muted-foreground')}>
          {l.startsWith('$') ? (
            <>
              <span className="text-phosphor">$</span>
              {l.slice(1)}
            </>
          ) : (
            l
          )}
        </div>
      ))}
    </div>
  );
}

export function MockRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex min-w-0 items-center gap-3 overflow-hidden rounded-md border border-border bg-background px-3 py-2 text-[12px] whitespace-nowrap', className)} aria-hidden>
      {children}
    </div>
  );
}

export function MockDomains() {
  return (
    <div className="space-y-2" aria-hidden>
      {[
        ['app.acme.dev', 'Let’s Encrypt · renews in 61d'],
        ['api.acme.dev', 'Let’s Encrypt · renews in 82d'],
        ['pr-142.preview.acme.dev', 'Wildcard'],
      ].map(([d, s]) => (
        <MockRow key={d}>
          <Lock className="size-3.5 text-phosphor" />
          <span className="truncate font-medium text-foreground">{d}</span>
          <span className="ml-auto shrink-0 text-faint">{s}</span>
        </MockRow>
      ))}
    </div>
  );
}

export function MockBackups() {
  return (
    <div className="space-y-2" aria-hidden>
      <MockRow>
        <span className="size-5 rounded bg-info/15 text-center text-[10px] leading-5 font-medium text-info">PG</span>
        <span className="font-medium text-foreground">acme-db · Postgres 16</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-phosphor">
          <span className="size-1.5 rounded-full bg-phosphor" /> Running
        </span>
      </MockRow>
      <MockRow className="text-muted-foreground">
        <span className="text-faint">Backups</span>
        <span className="truncate">Daily 02:00 UTC → s3://acme-backups</span>
        <span className="ml-auto shrink-0 text-faint">keep 14</span>
      </MockRow>
      <MockRow className="text-muted-foreground">
        <Check className="size-3.5 text-phosphor" />
        <span className="truncate">acme-db-2026-09-14.dump</span>
        <span className="ml-auto shrink-0 text-faint">412 MB · 3h ago</span>
      </MockRow>
    </div>
  );
}

export function MockAudit() {
  const rows = [
    ['kuldip', 'redeployed', 'acme-api', '41m'],
    ['hiren', 'updated env', 'STRIPE_KEY', '2h'],
    ['agent:cursor', 'restarted', 'worker-1', '5h'],
    ['maya', 'invited', 'sam@acme.dev', '1d'],
  ] as const;
  return (
    <div className="divide-y divide-border rounded-md border border-border text-[12px]" aria-hidden>
      {rows.map(([who, what, target, when]) => (
        <div key={who + target} className="flex items-center gap-2 px-3 py-2">
          <span className="size-5 rounded-full bg-accent text-center text-[10px] leading-5 text-muted-foreground">
            {who.charAt(0).toUpperCase()}
          </span>
          <span className="font-medium text-foreground">{who}</span>
          <span className="text-muted-foreground">{what}</span>
          <span className="font-mono text-[11px] text-muted-foreground">{target}</span>
          <span className="ml-auto text-faint">{when}</span>
        </div>
      ))}
    </div>
  );
}

export function MockGitPush() {
  return (
    <div className="space-y-2" aria-hidden>
      <MockTerminal lines={['$ git push origin main', 'remote: Peon · build queued for acme-api']} className="!p-3" />
      <MockRow>
        <span className="rounded bg-phosphor/10 px-1.5 py-0.5 text-[10px] font-medium text-phosphor">Preview</span>
        <span className="shrink-0 font-mono text-[11px] text-muted-foreground">#142</span>
        <span className="truncate text-foreground">pr-142.preview.acme.dev</span>
        <span className="ml-auto shrink-0 text-faint">ready</span>
      </MockRow>
    </div>
  );
}
