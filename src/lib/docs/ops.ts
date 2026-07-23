import type { DocPage } from './types';

export const OPS_PAGES: DocPage[] = [
  {
    slug: 'deployments-and-previews',
    title: 'Deployments & Previews',
    description:
      'Deploy now, force rebuild, cancel, rollback, live logs, PR previews, and wildcard DNS.',
    sections: [
      {
        h: 'Deployments list and detail',
        p: ['Service → Deployments; detail at …/deployments/[deploymentId].'],
        list: [
          'Deploy now — queue production deploy',
          'Force rebuild — deploy with cache cleared',
          'Cancel — stop queued/in-progress deploy',
          'Rollback — re-point to a finished production deploy',
          'Detail logs — live build logs; download',
          'Preview list — active PR previews; delete preview env',
        ],
      },
      {
        h: 'Preview deployments',
        p: [],
        list: [
          'Configuration → Advanced → enable Preview deployments',
          'Servers → General → set Wildcard domain and DNS per the in-app guide',
          'Open a PR → Peon builds {sha}.{wildcard}',
          'Delete finished previews from Deployments → preview panel',
        ],
      },
      {
        h: 'Common errors',
        p: [],
        list: [
          '404 on preview — DNS/wildcard/gateway misconfigured',
          'No auto preview — Auto deploy off or GitHub app permissions missing',
        ],
      },
    ],
  },
  {
    slug: 'database-backups',
    title: 'Database Backups',
    description: 'Schedules, local retention, S3 upload, Backup now, history, and Restore.',
    sections: [
      {
        h: 'Where',
        p: [
          'Service → Backups. Available for DATABASE engines PostgreSQL, MySQL, MariaDB, MongoDB (not Redis-family in UI).',
        ],
      },
      {
        h: 'New schedule',
        p: ['Frequency (cron) — default 0 0 * * *.'],
      },
      {
        h: 'Edit schedule fields',
        p: [],
        list: [
          'Frequency (cron) — when dumps run',
          'Local backups to keep — retention 0–1000 (default 7)',
          'Upload to S3 — pick a workspace Storage',
          'Enable / Disable / Backup now / Delete',
          'History + Restore — restore from a successful dump',
        ],
      },
      {
        h: 'Workflow',
        p: [],
        list: [
          'Create DATABASE service; wait until running',
          'Storages → add bucket → Test',
          'Backups → schedule + optional S3',
          'Backup now; later Restore from a successful execution',
        ],
      },
      {
        h: 'Common errors',
        p: ['S3 upload fails → Storages → Test credentials.'],
      },
    ],
  },
  {
    slug: 'scheduled-tasks',
    title: 'Scheduled Tasks',
    description: 'Cron jobs inside service containers: create fields, timeout, execute now, history.',
    sections: [
      {
        h: 'Where',
        p: ['Service → Scheduled Tasks (hidden for databases).'],
      },
      {
        h: 'New task fields',
        p: [],
        list: [
          'Name — e.g. cleanup-cache',
          'Frequency (cron) — 5-field cron; default 0 0 * * *',
          'Command — shell inside the container; e.g. pnpm run scheduler:clean',
        ],
      },
      {
        h: 'Edit task',
        p: [],
        list: [
          'Timeout (seconds) — 1–86400; default 300',
          'Container name — optional target container',
          'Enable / Disable',
          'Execute now — run immediately',
          'History — past executions',
        ],
      },
    ],
  },
  {
    slug: 'logs-and-terminal',
    title: 'Logs & Terminal',
    description: 'Container logs controls and UI-only interactive terminals (service and server).',
    sections: [
      {
        h: 'Logs',
        p: ['Service → Logs.'],
        list: [
          'Last N lines — 100 / 200 / 500 / 1000 / 2000',
          'Auto-refresh / follow — stream new lines',
          'Download / refetch — export or reload',
        ],
      },
      {
        h: 'Terminal',
        p: [
          'Interactive shell in the container (service) or host SSH (server). Not available via Chat or MCP. Who: project manage for service terminal; workspace OWNER/ADMIN for server terminal.',
        ],
      },
    ],
  },
  {
    slug: 'webhooks-and-api',
    title: 'Webhooks & Automation',
    description: 'Service webhooks (Generic/GitHub/GitLab), auto-deploy, and MCP/API tokens.',
    sections: [
      {
        h: 'Service → Webhooks',
        p: [],
        list: [
          'Provider — Generic, GitHub, or GitLab',
          'New webhook — creates /api/webhooks/{token}; copy and register with your git host',
          'Delete — remove unused hooks',
        ],
      },
      {
        h: 'Auto-deploy',
        p: [
          'Enable Auto deploy in Configuration → Advanced. Ensure Git source webhooks are installed (or register the Service → Webhooks URL). Push to the watched branch → deployment appears. Watch paths can limit which files trigger builds.',
        ],
      },
      {
        h: 'API & MCP',
        p: [
          'Create a peon_… token under Keys & Tokens. Use REST with the same RBAC as your user, or point MCP clients at {appOrigin}/mcp with Bearer auth. Mutating Chat actions still require UI Approve.',
        ],
      },
    ],
  },
  {
    slug: 'notifications',
    title: 'Notifications',
    description: 'Email, Discord, Slack, Telegram, Pushover, Webhook channels and event types.',
    sections: [
      {
        h: 'Where and who',
        p: ['Sidebar → Notifications (/notifications). Workspace OWNER/ADMIN.'],
      },
      {
        h: 'Channels and fields',
        p: ['Tabs: Email, Discord, Slack, Telegram, Pushover, Webhook.'],
        list: [
          'Email — Recipient email(s)',
          'Discord / Slack — Webhook URL',
          'Telegram — Bot token, Chat ID',
          'Pushover — App token, User key',
          'Webhook — URL, Signing secret',
        ],
      },
      {
        h: 'Events',
        p: [],
        list: [
          'deployment_success',
          'deployment_failure',
          'server_unreachable',
          'backup_failure',
        ],
      },
      {
        h: 'Setup',
        p: ['Enable the channel, select events, Save, then Test delivery before relying on it.'],
      },
    ],
  },
];

export const REFERENCE_PAGES: DocPage[] = [
  {
    slug: 'workflows',
    title: 'End-to-End Workflows',
    description:
      'Recipes: first deploy, marketplace, auto-deploy, teammates, backups, previews, rollback, ownership.',
    sections: [
      {
        h: 'First deploy',
        p: [],
        list: [
          'Keys & Tokens → create SSH key',
          'Servers → add → Connect until healthy; Gateway on',
          'Git Sources → connect (or public repo)',
          'Projects → create → New service (Git) → Configuration',
          'Environment → vars; Domains → FQDN + DNS',
          'Overview → Deploy; watch Deployments logs',
        ],
      },
      {
        h: 'Marketplace service',
        p: [],
        list: [
          'Validated server with Gateway on',
          'Marketplace or /deploy/[slug] → Workspace / Project / Server',
          'Service Specific Configuration + Environment for credentials',
          'Domains → FQDN + DNS → Overview → Deploy → Visit',
        ],
      },
      {
        h: 'Auto-deploy and webhooks',
        p: [
          'Enable Auto deploy → ensure Git webhooks or Service → Webhooks URL registered → push to watched branch.',
        ],
      },
      {
        h: 'Add a teammate',
        p: [
          'Settings → Members → invite ADMIN or MEMBER. For MEMBER: Project → Members → add as project ADMIN or MEMBER.',
        ],
      },
      {
        h: 'Database backup and restore',
        p: [
          'DATABASE running → Storages Test → Backups schedule + S3 → Backup now → Restore later from history.',
        ],
      },
      {
        h: 'Preview deploys',
        p: ['Server wildcard + DNS → enable Preview deployments → open PR → manage previews under Deployments.'],
      },
      {
        h: 'Rollback',
        p: ['Deployments → previous successful production deploy → Rollback.'],
      },
      {
        h: 'Transfer ownership or leave',
        p: [
          'Danger → Transfer ownership (OWNER) or Leave (non-OWNER). Delete workspace only after all services and projects are gone.',
        ],
      },
    ],
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Server connect, deploy/healthcheck, domain/SSL, permissions, Chat models, and where to look next.',
    sections: [
      {
        h: 'Server connect failures',
        p: [],
        list: [
          'Verify IP, SSH port, user, and private key',
          'Ensure the user can sudo for first-time Docker install',
          'Read Servers → Activity for the validate session',
        ],
      },
      {
        h: 'Deploy or healthcheck failures',
        p: [],
        list: [
          'Open the failed deployment → read build logs',
          'Check start command, ports, and healthcheck path',
          'Confirm env vars (build-time vs runtime)',
          'Force rebuild if a bad layer/cache is suspected',
        ],
      },
      {
        h: 'Domain or SSL not issuing',
        p: [],
        list: [
          'DNS must resolve to the server',
          'Gateway (Traefik/Caddy) on; ports 80/443 open',
          'Wait for certificate issuance; check gateway/activity logs',
          'Cloudflare: Full (strict), not Flexible',
        ],
      },
      {
        h: 'Permission denied / masked env',
        p: [
          'Project MEMBER cannot reveal secrets or deploy — ask a project ADMIN or workspace OWNER/ADMIN. Empty infra pages → need workspace OWNER/ADMIN.',
        ],
      },
      {
        h: 'Chat has no models',
        p: ['Settings → LLMs: add OpenAI or Anthropic key (OWNER/ADMIN). Pick a model in the Chat header after keys save.'],
      },
      {
        h: 'Container keeps restarting',
        p: [
          'Read Logs for the crash. Exit 137 ≈ OOM; 1 ≈ app error; 127 ≈ command missing. Missing env and DB-not-ready are common.',
        ],
      },
      {
        h: 'Disk full',
        p: [
          'Servers → Advanced → Trigger manual cleanup. Schedule cleanup cron on busy hosts. Alert via notifications when useful.',
        ],
      },
      {
        h: 'Still stuck',
        p: [],
        list: [
          'Service Logs and Deployments detail',
          'Settings → Audit (OWNER) for who changed what',
          'Server or Service Terminal for live inspection (UI only)',
        ],
      },
    ],
  },
  {
    slug: 'danger-zones',
    title: 'Danger Zones',
    description: 'Delete service, server, project, and workspace — confirmations and preflight rules.',
    sections: [
      {
        h: 'Service → Danger Zone',
        p: [
          'Type the exact service name to enable Delete. Removes the service from Peon and tears down containers per platform behavior.',
        ],
      },
      {
        h: 'Server → Danger',
        p: [
          'Type exact server name. If services exist, enable Delete all resources first. Deletes the server from Peon, not the VM.',
        ],
      },
      {
        h: 'Project delete',
        p: ['Blocked while services remain. Delete services first, then confirm project name.'],
      },
      {
        h: 'Workspace delete',
        p: [
          'OWNER only under Settings → Danger. Requires zero projects/services. Does not SSH-teardown remote containers left behind — clean servers first if needed.',
        ],
      },
    ],
  },
  {
    slug: 'contributing',
    title: 'Contributing',
    description: 'Dev setup for Peon-sh/Peon, project layout, PR guidelines, and templates.',
    sections: [
      {
        h: 'Ways to contribute',
        p: [],
        list: [
          'Report bugs with reproduction steps, expected vs actual, and logs',
          'Improve documentation and guides',
          'Add or update one-click templates',
          'Pick up an open issue; comment first to avoid duplicated work',
        ],
      },
      {
        h: 'Development setup',
        p: ['Node 20+, pnpm, Docker, local PostgreSQL.'],
        code: `git clone https://github.com/Peon-sh/Peon.git
cd Peon
pnpm install
cp .env.example .env
pnpm prisma migrate dev
pnpm dev      # web on http://localhost:3000
pnpm worker   # separate terminal`,
      },
      {
        h: 'Pull request guidelines',
        p: [],
        list: [
          'Branch from main; keep PRs focused',
          'Run lint and tests before pushing',
          'Schema changes need a Prisma migration',
          'User-facing changes should update docs / user-manual.md',
          'Test new templates end-to-end on a real server',
        ],
      },
    ],
  },
];
