import type { DocPage } from './types';

export const INFRA_PAGES: DocPage[] = [
  {
    slug: 'servers',
    title: 'Managing Servers',
    description:
      'Add servers over SSH, validate Docker, manage Traefik/Caddy gateway, destinations, cleanup, and danger zone - every field.',
    sections: [
      {
        h: 'Who can manage servers',
        p: ['Workspace OWNER or ADMIN for all server operations. Project members cannot add or edit servers.'],
      },
      {
        h: 'Requirements',
        p: [],
        list: [
          '64-bit Linux with SSH (Ubuntu, Debian, Rocky/CentOS, Fedora, etc.)',
          'Root or sudo for first-time Docker install during validate',
          '≈1 GB RAM minimum; 4 GB+ recommended for multi-service hosts',
          'Ports 80 and 443 open for public HTTP(S); SSH port reachable from the Peon control plane',
        ],
      },
      {
        h: 'Add server dialog - fields',
        p: ['Servers → Add Server.'],
        list: [
          'Name - display name, required, 1–80 characters',
          'IP / Hostname - IPv4, IPv6, or DNS (max 255); placeholder e.g. 203.0.113.10',
          'Port - SSH port, default 22 (1–65535)',
          'User - SSH login, default root (1–80)',
          'Private key - workspace SSH key, required (create under Keys & Tokens first)',
          'Gateway type - Traefik (default), Caddy, or None',
        ],
      },
      {
        h: 'What happens on create / Connect',
        p: [
          'Peon creates default settings (Docker cleanup flags typically on) and a destination named default on network peon. General → Connect / Reconnect saves connection fields and runs validate: SSH → Docker setup → agent. Watch Activity for progress. Metrics (CPU/RAM/disk) appear when the agent is live.',
        ],
      },
      {
        h: 'General tab - fields',
        p: [],
        list: [
          'Name, Description (max 500; empty → null)',
          'User, IP / Hostname, Port, SSH key (required to Save/Connect)',
          'Wildcard domain - base for preview FQDNs https://{sha}.{host}; max 255',
          'SSH connection timeout (s) - 1–300; default 30',
          'Gateway type - Traefik / Caddy / None',
        ],
      },
      {
        h: 'Gateway tab',
        p: [
          'Hidden when Gateway type is None. Status shows on when the proxy is running. Actions: Turn on (install/start so public domains work), Reload (restart with current config), Turn off (stop public routing; apps keep running on the Docker network).',
        ],
      },
      {
        h: 'Terminal tab',
        p: [
          'Interactive host SSH shell in the UI. Not available via Chat or MCP. Use this tab when you need a real shell.',
        ],
      },
      {
        h: 'Advanced tab - build limits',
        p: [],
        list: [
          'Concurrent builds - max simultaneous builds/deploys on this server; default 2 (1–50)',
          'Deployment queue limit - cap on queued deployments; default 25 (1–500)',
        ],
      },
      {
        h: 'Advanced tab - Docker cleanup',
        p: ['Save with Save advanced settings.'],
        list: [
          'Force Docker cleanup - when on, scheduled cleanups always prune unused images/builders/containers',
          'Cleanup cron - default 0 0 * * *',
          'Cleanup threshold (%) - when force is off; default 80 (1–100)',
          'Delete unused volumes / Delete unused networks - also prune volumes/networks (can destroy data of stopped containers)',
          'Trigger manual cleanup - run now (confirm); always prunes images/builders/stopped containers; volumes/networks follow saved toggles',
        ],
      },
      {
        h: 'Destinations tab',
        p: [
          'Docker networks services can join (with the gateway). Fields: Name (e.g. staging, 1–80), Docker network (default/reset peon). Delete with confirm; reassign services first if needed. A default/peon destination is created with the server.',
        ],
      },
      {
        h: 'Danger - delete server',
        p: [],
        list: [
          'Type the exact server name to enable delete',
          'Delete all resources (N total) - required when services still exist; stops containers and deletes those services from Peon',
          'Delete server - removes the server from Peon (not the VM); cascades settings, destinations, logs',
        ],
      },
      {
        h: 'Common errors',
        p: [],
        list: [
          'Validate fails - wrong IP/key/user, SSH port blocked, or missing sudo for Docker install',
          'Proxy / HTTPS issues - Gateway off, or ports 80/443 busy on the host',
        ],
      },
    ],
  },
  {
    slug: 'git-sources',
    title: 'Git Sources',
    description: 'Connect GitHub or GitLab apps, custom app fields, webhooks, and resources.',
    sections: [
      {
        h: 'Where and who',
        p: ['Sidebar → Git Sources (/sources). Workspace OWNER/ADMIN.'],
      },
      {
        h: 'Connect',
        p: [],
        list: [
          'Connect GitHub - platform app install when the Peon instance has it configured',
          'Create custom GitHub or GitLab App - Provider, Private key, Name, Organization, HTML URL, API URL, Git user, Git port, App ID, Installation ID / Client ID (GitHub), Client secret / App secret, Webhook secret / token',
        ],
      },
      {
        h: 'Source detail',
        p: [],
        list: [
          'General - edit connection fields; connection status; copy webhook and setup URLs',
          'Resources - services using this source',
          'Delete when unused (reassign services first if needed)',
        ],
      },
      {
        h: 'Using a source on a service',
        p: [
          'On a git-based service, set Git source type to Git App, pick Connection and Repository (owner/repo) and Branch. Public repository and Deploy key modes use a Git repository URL instead; Deploy key also needs a workspace Private key.',
        ],
      },
    ],
  },
  {
    slug: 'storages',
    title: 'Storages (S3)',
    description:
      'Connect S3-compatible buckets in Peon for database backup uploads: AWS, R2, B2, MinIO, Hetzner Object Storage, credentials, Test, and wiring to Backups.',
    sections: [
      {
        h: 'What Storages are',
        p: [
          'Storages are workspace-level S3-compatible object-store destinations. Peon uses them primarily to upload database backup dumps off the application server so a disk failure or rebuild does not take your only copy with it. You create a storage once, Test it, then pick it from a database service’s Backups schedule under Upload to S3.',
          'This is not the same as Service → Storage (named Docker volumes mounted into a container). Object Storages live under the workspace sidebar; volume mounts live on each service. Use Storages for backup offsite copies; use service volumes for runtime data directories.',
        ],
      },
      {
        h: 'Where and who',
        p: [
          'Sidebar → Storages (/storages). Who: workspace OWNER/ADMIN. Project members manage backup schedules on services they can manage, but adding or editing bucket credentials is a workspace admin task.',
        ],
      },
      {
        h: 'Create fields',
        p: [
          'Add a storage and fill the connection fields. Names should be clear (for example prod-backups-r2) so the Backups dropdown is obvious later.',
        ],
        list: [
          'Name - label shown when picking Upload to S3 on a backup schedule',
          'Endpoint - optional for AWS-style defaults; required for Cloudflare R2, Backblaze B2, MinIO, Hetzner Object Storage, and most non-AWS providers',
          'Region - provider region string as their docs specify',
          'Bucket - existing bucket Peon may write backup objects into',
          'Access key - access key ID / API key id',
          'Secret key - secret access key (stored encrypted; treat like a password)',
        ],
      },
      {
        h: 'Provider tips',
        p: [
          'AWS S3 often works with region + bucket + keys and an empty or default endpoint. R2, B2, MinIO, and Hetzner-style APIs almost always need the explicit S3 API endpoint URL from the provider console—pasting the public website URL for the bucket is a common mistake.',
          'Create the bucket before Testing. Grant the key permission to list/put (and delete if your retention flow removes old remote objects) on that bucket only—prefer least privilege over root account keys. For MinIO or self-hosted S3, ensure the Peon control plane (or the component that uploads) can reach the endpoint over the network; private-only endpoints need VPN or peering.',
        ],
      },
      {
        h: 'Test and day-to-day operations',
        p: [
          'Always use Test after create or after rotating keys. A green Test means credentials and reachability look good before you depend on nightly uploads. If Database Backups show S3 upload failures, return here and re-Test—expired keys, wrong region, missing endpoint, or bucket typos show up quickly.',
          'Delete a storage only when no backup schedules still reference it (or re-point those schedules first). Rotating secrets: update Access key / Secret key, Test, then run Backup now on a database to confirm a fresh upload lands in the bucket.',
        ],
      },
      {
        h: 'Wire Storages to database backups',
        p: [
          'Typical workflow: create and start a DATABASE service (PostgreSQL, MySQL, MariaDB, or MongoDB—Redis-family has no Backups UI). Create a Storage and Test it. Open the database → Backups → schedule (cron, local retention) → enable Upload to S3 and select this storage. Use Backup now, then confirm History and the object in the bucket. Restore later from a successful dump via Backups history (see Database Backups).',
          'Local retention (backups kept on the server) and S3 upload work together: keep enough local copies for quick Restore, and S3 for offsite durability. If upload is optional for a schedule, you can still run local-only backups—but production databases should usually have offsite upload configured.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Sidebar → Storages → create Name, Endpoint (if non-AWS), Region, Bucket, keys',
          'Test before attaching to any schedule',
          'Database → Backups → Upload to S3 → pick this storage',
          'Backup now; verify History and the object in the bucket',
          'On upload errors: Storages → Test; fix endpoint/region/keys/bucket ACL',
          'Do not confuse with Service → Storage volumes—those are Docker mounts, not S3',
        ],
      },
    ],
  },
  {
    slug: 'keys-and-tokens',
    title: 'Keys & Tokens',
    description: 'SSH keys for servers and deploy keys; personal API tokens for REST and MCP.',
    sections: [
      {
        h: 'Where',
        p: ['Sidebar → Keys & Tokens (/keys-and-tokens). Legacy /security redirects here.'],
      },
      {
        h: 'SSH keys',
        p: [
          'Generate a keypair or paste private key (+ optional public). Fields: Name, Description, Private key, Public key (optional). Download PEM; delete when unused. Attach keys when adding servers or when a service uses Deploy key git mode. Who: workspace OWNER/ADMIN.',
        ],
      },
      {
        h: 'API tokens',
        p: [
          'Create a personal access token (prefix peon_…). Copy once when shown; revoke later. The token inherits your workspace role and project memberships, with the same permissions as you in the UI.',
        ],
      },
      {
        h: 'MCP',
        p: [
          'Point MCP clients (Cursor, Claude Desktop, etc.) at {appOrigin}/mcp with Authorization: Bearer peon_…. Tools cover projects, services, deployments, env, backups, servers, sources, members, and more under RBAC.',
          'Shell exec tools (exec_in_service, exec_on_server) are not registered on MCP or Chat. Use the Terminal tabs in the UI.',
        ],
      },
    ],
  },
  {
    slug: 'shared-variables',
    title: 'Shared Variables',
    description:
      'Reuse secrets and config across Peon services with workspace, project, or server-scoped shared variables—scopes, fields, vs Environment, and cleanup tips.',
    sections: [
      {
        h: 'What Shared Variables are',
        p: [
          'Shared Variables store KEY/value pairs once and reuse them across many services instead of pasting the same SMTP password or org API key into every Environment panel. They complement per-service Environment: shared values for cross-cutting config; service Environment for app-specific secrets, NEXT_PUBLIC_* build flags, and preview overrides.',
          'Think of them as scoped defaults for a workspace, a single project, or a single server—not a replacement for the full Environment UX (Build/Runtime toggles, developer mode, and preview sections still live on each service).',
        ],
      },
      {
        h: 'Where and who',
        p: [
          'Open /shared-variables. The page is not always listed in the main sidebar—use ⌘K / Ctrl+K (command palette) or the direct URL. Who can manage: workspace OWNER/ADMIN, with effective access depending on scope (project- or server-linked rows still sit under workspace admin responsibility for infrastructure-style config).',
          'Project MEMBER users should not expect to administer shared variables; they consume values through deployments when the platform injects them according to product rules. Keep highly sensitive org secrets limited to OWNER/ADMIN rotation practices.',
        ],
      },
      {
        h: 'Fields',
        p: [
          'When creating or editing a shared variable:',
        ],
        list: [
          'Scope - WORKSPACE, PROJECT, or SERVER (provide projectId / serverId when the scope requires it)',
          'Key - stable identifier services will reference (prefer clear SCREAMING_SNAKE_CASE)',
          'Value - the secret or config string (treat like Environment: do not commit it to Git)',
          'Comment (optional) - note owner, rotation date, or which apps depend on it',
          'Delete when unused - remove rows that no longer have consumers',
        ],
      },
      {
        h: 'Choosing a scope',
        p: [
          'WORKSPACE - values every project might need (company SMTP, shared analytics write key, org-wide feature endpoints). Use sparingly for true secrets so blast radius stays clear.',
          'PROJECT - values shared by several services in one product (internal API URL, project-level third-party credentials) without exposing them to other projects in the workspace.',
          'SERVER - values tied to a specific host (legacy IP allowlist tokens, region-specific endpoints) when the same logical secret should not apply on every server.',
        ],
      },
      {
        h: 'Shared Variables vs Environment',
        p: [
          'Use Shared Variables when the same value would otherwise be duplicated across many services and updated in many places. Use Service → Environment when the value is unique to one app, needs Build vs Runtime flags, or differs between production and preview.',
          'Compose ${VAR} interpolation and magic template credentials still center on the service Environment panel. Shared variables reduce duplication; they do not remove the need to Redeploy after config changes so running containers pick up new values.',
          'Do not put unrelated per-app secrets in WORKSPACE scope “for convenience”—prefer PROJECT scope or per-service Environment to limit who and what can be affected by a rotation mistake.',
        ],
      },
      {
        h: 'Rotation and cleanup',
        p: [
          'When rotating a shared secret, update the Value, save, then Redeploy (or wait for auto-deploy) every service that consumes it. Confirm with Logs or a smoke test. Leave a Comment with the rotation date.',
          'Delete unused keys so stale credentials do not linger. Audit-worthy changes may appear in workspace Audit for OWNER (resource type includes shared variable)—use that when investigating who changed a value.',
          'If a service still shows an old value after you updated a shared row, confirm you edited the intended scope (PROJECT vs WORKSPACE), that the service belongs to that project/server, and that a new deployment actually ran. Preview environments still use Service → Environment preview keys for PR-specific overrides—do not expect shared variables alone to replace preview-specific DATABASE_URL or APP_URL.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Open /shared-variables via command palette or URL (OWNER/ADMIN)',
          'Pick Scope: WORKSPACE / PROJECT / SERVER (+ ids when required)',
          'Set Key, Value, optional Comment → save',
          'Prefer shared rows for SMTP and org-wide keys; keep app secrets on Environment',
          'After value changes: Redeploy consumers and verify',
          'Delete unused variables; rotate leaked values immediately',
          'Use PROJECT scope when only one product should see the secret',
        ],
      },
    ],
  },
];
