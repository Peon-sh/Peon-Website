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
    description:
      'Connect GitHub or GitLab to Peon as Git sources. Configure app fields, set up webhooks for auto-deploy on push, and manage source-level settings.',
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
    description: 'S3-compatible destinations for database backup uploads - fields and Test.',
    sections: [
      {
        h: 'Where and who',
        p: ['Sidebar → Storages (/storages). Workspace OWNER/ADMIN.'],
      },
      {
        h: 'Create fields',
        p: [],
        list: [
          'Name',
          'Endpoint (optional for AWS-style defaults; required for R2, B2, MinIO, Hetzner Object Storage, …)',
          'Region',
          'Bucket',
          'Access key',
          'Secret key',
        ],
      },
      {
        h: 'Operations',
        p: [
          'Use Test to verify reachability before relying on backups. Delete when unused. On a database service → Backups → edit schedule → Upload to S3 and pick this storage. If S3 upload fails, re-Test credentials here.',
        ],
      },
    ],
  },
  {
    slug: 'keys-and-tokens',
    title: 'Keys & Tokens',
    description:
      'Manage SSH keys for server access and repo deploy keys in Peon. Create personal API tokens to authenticate REST calls and MCP agent integrations.',
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
    description: 'Workspace, project, or server-scoped variables reused across services.',
    sections: [
      {
        h: 'Where and who',
        p: [
          'Open /shared-variables (not in the main sidebar. Use ⌘K command palette or direct URL). Workspace OWNER/ADMIN (scope-dependent).',
        ],
      },
      {
        h: 'Fields',
        p: [],
        list: [
          'Scope - WORKSPACE, PROJECT, or SERVER (provide projectId / serverId when required)',
          'Key',
          'Value',
          'Comment (optional)',
          'Delete when unused',
        ],
      },
      {
        h: 'When to use',
        p: [
          'Shared variables complement per-service Environment. Use them for values reused across many services (SMTP, shared API keys). Per-service env remains the place for app-specific secrets and build-time flags.',
        ],
      },
    ],
  },
];
