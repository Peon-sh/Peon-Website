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
        <div className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-[11px] text-muted-foreground">
          <span className="text-faint">tool</span> get_deployment_logs(<span className="text-foreground">acme-api</span>, last=1)
        </div>
        <p className="text-muted-foreground">
          Build failed on <span className="font-mono text-foreground">npm ci</span>: the lockfile pins{' '}
          <span className="font-mono text-foreground">sharp@0.33</span> but the base image is Node 22. Bumping to{' '}
          <span className="font-mono text-foreground">sharp@0.35</span> and redeploying will fix it.
        </p>
        <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/60 px-3 py-2">
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

/**
 * Terminal window. Always dark regardless of the surface it sits on (terminals are
 * dark), with a title bar, a cyan prompt and a steady 12px / 1.7 rhythm.
 */
export function MockTerminal({
  lines,
  title = 'zsh',
  compact = false,
  className,
}: {
  lines: readonly string[];
  title?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[10px] border border-white/10 bg-[#0b0b0d] font-mono text-[12px] leading-[1.7] text-[#d6d6db] shadow-[0_12px_32px_-20px_rgb(0_0_0/0.6)]',
        className,
      )}
      aria-hidden
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-white/8 bg-white/[0.03] px-3">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-2 text-[11px] text-white/35">{title}</span>
      </div>
      <div className={cn('px-3.5', compact ? 'py-2.5' : 'py-3.5')}>
        {lines.map((l, i) => (
          <div key={i} className={cn('truncate', l.startsWith('$') ? 'text-white' : 'text-white/50')}>
            {l.startsWith('$') ? (
              <>
                <span className="text-brand-cyan">$</span>
                {l.slice(1)}
              </>
            ) : (
              l
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Single list row. Children lay out as a flex row; put `truncate` on the one span that
 * may shrink and `shrink-0` on trailing meta so the end of the row never gets clipped.
 */
export function MockRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex h-9 min-w-0 items-center gap-3 rounded-lg border border-border bg-background px-3 text-[12px] [&>*]:shrink-0 [&>.truncate]:min-w-0 [&>.truncate]:shrink',
        className,
      )}
      aria-hidden
    >
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
          <Lock className="size-3.5 text-success" />
          <span className="truncate font-medium text-foreground">{d}</span>
          <span className="ml-auto text-faint">{s}</span>
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
        <span className="ml-auto inline-flex items-center gap-1.5 text-success">
          <span className="size-1.5 rounded-full bg-success" /> Running
        </span>
      </MockRow>
      <MockRow className="text-muted-foreground">
        <span className="text-faint">Backups</span>
        <span className="truncate">Daily 02:00 UTC → s3://acme-backups</span>
        <span className="ml-auto text-faint">keep 14</span>
      </MockRow>
      <MockRow className="text-muted-foreground">
        <Check className="size-3.5 text-success" />
        <span className="truncate">acme-db-2026-09-14.dump</span>
        <span className="ml-auto text-faint">412 MB · 3h ago</span>
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
    <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-background text-[12px]" aria-hidden>
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
      <MockTerminal lines={['$ git push origin main', 'remote: Peon · build queued for acme-api']} compact />
      <MockRow>
        <span className="rounded-md bg-phosphor/10 px-1.5 py-0.5 text-[10px] font-medium text-phosphor">Preview</span>
        <span className="font-mono text-[11px] text-muted-foreground">#142</span>
        <span className="truncate text-foreground">pr-142.preview.acme.dev</span>
        <span className="ml-auto text-faint">ready</span>
      </MockRow>
    </div>
  );
}
