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
    seoTitle: 'Connect GitHub & GitLab as Git Sources | Peon Docs',
    description:
      'Connect GitHub or GitLab as Peon Git sources: platform vs custom apps, when to skip one, how services pick a repo, and how webhooks trigger auto-deploy.',
    sections: [
      {
        h: 'What Git Sources are',
        p: [
          'Git Sources are workspace-level connections to GitHub or GitLab. Once connected, Peon can list repositories you have access to, clone private code for builds, and receive push events from the App installation so git-based services can auto-deploy without a per-service webhook URL.',
          'They are not the same as the Git source type picker on a service (Git App, Public repository, or Deploy key). That picker lives on each git-based service under Configuration → Git source. A Git Source is the connection itself; the picker chooses whether this service uses that connection, a public clone URL, or a deploy key plus a workspace SSH key.',
        ],
      },
      {
        h: 'Where and who',
        p: [
          'Open Sidebar → Git Sources (/sources). Workspace OWNER or ADMIN create, edit, and delete sources. Project ADMIN can attach an existing Git App connection when creating or editing a git-based service; they cannot add a new GitHub or GitLab app at the workspace level. Project MEMBER is read-only.',
        ],
      },
      {
        h: 'When you need a source vs skip it',
        p: [
          'Use a Git Source (Git App) when the repo is private, you want a repository picker (owner/repo) in the create-service UI, and you want installation-level webhooks so pushes and pull-request events reach Peon without copying a per-service URL. This is the usual path for team GitHub or GitLab orgs.',
          'Skip a workspace source for a public HTTPS repository: on the service, set Git source type to Public repository and paste the clone URL. No Git App install is required. Private repos that you cannot (or do not want to) connect via an App can use Deploy key mode: paste the Git repository URL and select a workspace Private key from Keys & Tokens. That flow often relies more on Service → Webhooks or a manual Deploy than on App installation webhooks.',
        ],
      },
      {
        h: 'Connect GitHub',
        p: [
          'If this Peon instance has a platform GitHub App configured, Git Sources → Connect GitHub walks through installing that app on your GitHub account or organization. After install, the source shows as connected and services can pick repositories the installation can see.',
          'If you need a custom GitHub App (self-hosted Peon, a dedicated org app, or the platform install is not available), create a custom GitHub App and fill the connection fields. Provider is GitHub. Name is the label you will see in the service Connection dropdown. Organization scopes the install when the app belongs to a GitHub org. HTML URL and API URL are the GitHub web and API bases (github.com and api.github.com on GitHub.com; your GHE host and API path on GitHub Enterprise). Git user and Git port are the clone identity and SSH port the server uses when talking to the remote.',
          'App ID, Installation ID or Client ID, Client secret or App secret, and the App private key identify the GitHub App to Peon. Webhook secret (or token) must match the secret you set on the GitHub App so Peon can verify inbound deliveries. Copy the webhook and setup URLs from the source detail after save and finish the GitHub App’s webhook / setup configuration if the install flow did not do it for you.',
        ],
      },
      {
        h: 'Connect GitLab',
        p: [
          'GitLab connections are custom apps: Provider GitLab, then Name, Organization (group) when relevant, HTML URL and API URL for gitlab.com or your self-managed GitLab, Git user and Git port, plus the App ID / client identifiers, App secret, and webhook secret or token GitLab expects. Point GitLab’s webhook at the URL Peon shows on the source so push events can reach this workspace.',
          'Use GitLab HTML/API URLs from the instance you actually clone from. Mixing gitlab.com URLs with a self-managed API (or the reverse) is a common reason the connection stays unhealthy or the repository list is empty.',
        ],
      },
      {
        h: 'Source detail',
        p: [
          'Open a source for General: edit connection fields, check connection status, and copy webhook and setup URLs when you need to re-register them on GitHub or GitLab. Resources lists services that currently use this connection—use it before you delete or rotate credentials so you know which apps will stop cloning.',
          'Delete a source only when no service still depends on it, or reassign those services first (another Git App connection, or switch them to Public repository / Deploy key). An unused source with a live webhook URL is still a credential surface; remove it when the install is retired.',
        ],
      },
      {
        h: 'Use on a service',
        p: [
          'On a git-based service (Application, Dockerfile, Nixpacks, Static, and similar Git kinds), set Git source type to Git App, pick this Connection, then Repository (owner/repo) and Branch. Public repository and Deploy key modes do not pick a Connection: they use a Git repository URL instead; Deploy key also needs a workspace Private key from Keys & Tokens.',
          'Name, server, port, base directory, and build pack are service fields—see Git Applications. After the source is attached, Overview → Deploy builds from the configured branch. Keep Auto deploy on if you want later pushes to queue builds (see Webhooks & Automation).',
        ],
      },
      {
        h: 'Auto-deploy and webhooks',
        p: [
          'A Git App source is the preferred inbound path for GitHub/GitLab App installs: the installation webhook covers the repos the app can see. Prefer that over creating a Service → Webhooks URL unless you need a per-service endpoint, a public-repo or deploy-key flow, or a host Peon does not connect as an App.',
          'If auto-deploy never fires, confirm the source connection status, that the repo webhook or App installation still points at Peon, that the push hit the configured branch, and that Auto deploy is on. Watch paths, preview permissions, and per-service webhook URLs are documented on Webhooks & Automation and Deployments & Previews—not duplicated here.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Private GitHub/GitLab with repo picker: Git Sources → Connect GitHub or custom GitLab App → service Git source type Git App → Connection, repository, branch',
          'Public HTTPS repo: skip this page; service Git source type Public repository + clone URL',
          'Private clone URL without an App: Deploy key + workspace Private key (Keys & Tokens); register Service → Webhooks if you want push-to-deploy',
          'After connect: copy webhook/setup URLs if GitHub/GitLab still needs them; confirm connection status is healthy',
          'Before delete: Resources → reassign or change Git source type on every listed service',
          'Pushes not building: source status + branch + Auto deploy; then Webhooks & Automation',
        ],
      },
      {
        h: 'Related',
        p: [
          'Git Applications (service Git fields, build pack, base directory). Webhooks & Automation (service webhook URLs, auto-deploy, watch paths). Deployments & Previews (PR previews and GitHub/GitLab permissions). Your First Deployment (first Git connect). Keys & Tokens (SSH keys for Deploy key mode).',
        ],
      },
    ],
  },
  {
    slug: 'storages',
    title: 'Storages (S3)',
    seoTitle: 'Connect S3 Storage for Database Backups | Peon Docs',
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
    seoTitle: 'Manage SSH Keys and API Tokens in Peon | Peon Docs',
    description:
      'Manage workspace SSH keys, git deploy keys, and personal API tokens for REST and MCP. Covers rotation and how they differ from Variables.',
    sections: [
      {
        h: 'What Keys & Tokens are',
        p: [
          'Keys & Tokens is the workspace inventory for two kinds of secrets Peon uses to talk to the outside world. SSH keys let the control plane log into your VPS and (in Deploy key git mode) clone private repositories. Personal API tokens let you, your CI, or an AI agent call Peon over REST or MCP with the same permissions you have in the dashboard.',
          'They are not service Environment variables and not Shared Variables. Environment lives on each service (Build/Runtime flags, preview overrides). Shared Variables are reusable KEY/value defaults scoped to a workspace, project, or server. Keys & Tokens are credentials for SSH and for authenticating as a Peon user—not values injected into a container.',
        ],
      },
      {
        h: 'Where and who',
        p: [
          'Open Sidebar → Keys & Tokens (/keys-and-tokens). Older bookmarks to /security redirect here. The page has two tabs: SSH Keys and API Tokens.',
          'Workspace OWNER or ADMIN manage SSH keys: create, download PEM, attach them when adding servers, and delete unused keys. API tokens are personal to the account that creates them. The token inherits that person’s workspace role and project memberships—the same RBAC as the UI. OWNER/ADMIN tokens can reach infrastructure surfaces (servers, keys, sources). A project MEMBER token only reaches projects they belong to, and stays read-oriented where the UI is read-only.',
        ],
      },
      {
        h: 'SSH keys',
        p: [
          'Create a key before you add a server. Peon can generate a keypair for you, or you can paste an existing private key and optionally the matching public key. Give it a name you will recognize later (for example peon-prod or hetzner-box-1) and a short description if several keys exist in the workspace.',
          'Fields: Name, Description, Private key, Public key (optional). After create, download the PEM if you need a local copy for ssh from your laptop. The matching public key must be authorized on the VPS for the SSH user you will use (often root or a sudo user)—Peon cannot log in until that public key is in authorized_keys on the host.',
          'When you add a server (Servers → Add Server), pick this private key in the SSH key field. The same workspace key can be attached to more than one server if they share the same authorized public key; prefer separate keys when hosts have different blast radius (prod vs staging). For git-based services, Deploy key mode uses a Git repository URL plus a workspace Private key instead of a Git App connection—see Git Sources for when to choose Git App vs Deploy key vs a public HTTPS repo.',
          'Delete a key only when no server (and no Deploy key service) still depends on it, or reassign those resources first. Rotating: create a new key, authorize the new public key on the VPS, point the server at the new key, Connect/Reconnect, then remove the old public key from the host and delete the unused Peon key. SSH keys are not deleted when you remove a server; clean them up here separately (see Danger Zones).',
        ],
        list: [
          'Generate a keypair in Peon, or paste a private key you already trust',
          'Authorize the public key on the VPS before Connect / Reconnect',
          'Attach the key on Servers → Add Server (required) and optionally for Deploy key git mode',
          'Download PEM for local SSH; delete unused keys after reassignment',
        ],
      },
      {
        h: 'API tokens',
        p: [
          'Sidebar → Keys & Tokens → API Tokens. Create a personal access token. Peon shows the secret once with the prefix peon_…. Copy it immediately; you cannot view the full value later. If you lose it, revoke and create a new token.',
          'Use the token as Authorization: Bearer peon_… against the Peon REST API for scripting deploys, reading status, managing env within your role, and similar ops. The token is scoped to the current workspace and follows your memberships: it cannot escalate beyond what you can click in the UI. Prefer a dedicated operator or project-scoped member account when an agent or CI job only needs one project—do not paste an OWNER token into a shared laptop or a public CI log.',
          'Revoke tokens when they leak, when a teammate leaves, or when a script is retired. Revoking browser sessions on Profile does not rotate API tokens; those are separate secrets. Never commit peon_… values to Git, never put them in a client-side frontend, and never reuse one token across every environment if you can split prod automation from staging.',
        ],
      },
      {
        h: 'Use with MCP',
        p: [
          'MCP clients (Cursor, Claude Desktop, and similar) authenticate with the same personal API token. Point streamable HTTP at {appOrigin}/mcp (Peon Cloud app origin, or your self-hosted dashboard domain plus /mcp) and send Authorization: Bearer peon_….',
          'This page is the place you create and revoke that token. Client JSON, placeholder replacement, and the tool catalog live on MCP Server—do not duplicate that config here. Interactive shells (exec in a service or on a server) are not registered on MCP or in-app Chat; use Terminal in the app. Chat uses a related tool catalog but still requires UI Approve before mutating actions.',
        ],
      },
      {
        h: 'Security',
        p: [
          'Treat SSH private keys and peon_ tokens like passwords. Anyone with the private key can SSH as the configured user; anyone with a token can perform API and MCP actions allowed by that user’s RBAC. The dashboard UI is not a second security boundary—API and MCP enforce the same roles.',
          'Rotate by creating a new secret, switching dependents (servers, CI, MCP client config), then revoking or deleting the old one. Do not share one personal token across the whole team; each person (or each bot account) should create their own. Limit OWNER tokens to humans who must manage infrastructure. After offboarding, revoke that person’s tokens here in addition to removing them from the workspace.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'First server: Keys & Tokens → SSH Keys → create → authorize public key on the VPS → Servers → Add Server',
          'Private git without a Git App: service Git source type Deploy key + workspace Private key (see Git Sources)',
          'Scripts and agents: Keys & Tokens → API Tokens → copy peon_… once → Authorization: Bearer',
          'MCP: same token → {appOrigin}/mcp → see MCP Server for client JSON',
          'Leak or offboarding: revoke the token; for SSH, replace authorized_keys and re-point the server',
          'Do not confuse with Environment or Shared Variables—those are app config, not Peon login secrets',
        ],
      },
      {
        h: 'Related',
        p: [
          'Managing Servers (attach SSH keys, Connect / Reconnect). Git Sources (Deploy key vs Git App). Your First Deployment (first key then first server). MCP Server (client JSON and tools). Webhooks & Automation (when tokens sit next to git webhooks). Shared Variables and Environment Variables (app secrets, not this page). Profile & Account (sessions are not API tokens).',
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
