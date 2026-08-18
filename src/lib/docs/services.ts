import type { DocPage } from './types';

export const SERVICE_PAGES: DocPage[] = [
  {
    slug: 'git-applications',
    title: 'Git Applications',
    description:
      'Create Git services (Application, Dockerfile, Nixpacks, Static): every create field, Configuration panels, Overview lifecycle.',
    sections: [
      {
        h: 'New service - shared and Git fields',
        p: [
          'Project → Services → New service. Who: workspace OWNER/ADMIN or project ADMIN. Type picks the kind and which fields appear.',
        ],
        list: [
          'Type - Application (Git), Dockerfile, Docker Image, Static Site, Nixpacks, Database, Compose',
          'Name - required, 1–120 characters',
          'Server - target host shown as name (ip)',
          'Port - optional listen / host:container maps (e.g. 3000 or 8080:3000); Git-based + Docker Image',
          'Base directory - repo subdirectory as build context; default /; Git-based',
          'Publish directory - static assets vs base (e.g. /dist); Static only',
          'Build pack - Nixpacks, Railpack, Dockerfile, Static; Application (Git) only',
          'Dockerfile location - default /Dockerfile; Dockerfile kind or Git + Dockerfile pack',
          'Git source type - Git App, Public repository, Deploy key',
          'Connection / Repository / Branch - Git App mode (GitHub picker owner/repo)',
          'Git repository - clone URL for Public / Deploy key / GitLab',
          'Private key - workspace key for Deploy key mode',
        ],
      },
      {
        h: 'Overview lifecycle',
        p: ['Service → Overview.'],
        list: [
          'Deploy / Redeploy - queue production deployment',
          'Force rebuild - deploy and clear build/source cache',
          'Start / Stop / Restart - control running container(s)',
          'Visit - open primary domain when configured',
          'Activity - recent deployments',
        ],
      },
      {
        h: 'Configuration → General',
        p: [],
        list: [
          'Name (1–120), Description (≤1000; empty clears)',
          'Server - change deploy target (warns if unset)',
          'Build pack - Nixpacks / Railpack / Dockerfile / Static (git-based)',
        ],
      },
      {
        h: 'Configuration → Git source',
        p: ['Git-based only.'],
        list: [
          'Git source type, Connection, Repository, Branch',
          'Git repository URL, Private key (Deploy key)',
        ],
      },
      {
        h: 'Configuration → Build',
        p: ['Git-based only.'],
        list: [
          'Install / Build / Start commands - override pack commands; empty = auto / image CMD',
          'Base directory, Dockerfile location, Publish directory',
          'Ports exposed / mappings - 3000 or 8080:3000,8443:443',
          'Watch paths - globs one per line; empty = every push triggers auto-deploy',
          'Disable build cache - force rebuild and clear cached source',
        ],
      },
      {
        h: 'Healthcheck',
        p: [
          'Hidden for Compose. HTTP probe fields hidden for Database (timing only). Defaults: Interval/Timeout 5s, Retries 10, Start period 5s.',
        ],
        list: [
          'Enabled, Method (GET/HEAD/POST/OPTIONS), Scheme, Host, Port, Path',
          'Return code (100–599), Response text (optional body contains)',
          'Interval / Timeout / Retries / Start period (seconds)',
        ],
      },
      {
        h: 'Advanced',
        p: [],
        list: [
          'Auto deploy - push/webhook queues deploy (git-based; default on)',
          'Preview deployments - PR previews on {sha}.{wildcard}; needs server Wildcard domain + Git permissions',
          'Static site / Single-page app fallback - static hosting flags',
          'Rolling update - new container beside old until healthy (needs domain; no host port maps); not Compose/Database',
          'Pre-deploy / Post-deploy commands - shell after build / after ready',
          'Custom Docker options - extra docker run flags',
          'Labels - extra Docker labels, one per line',
        ],
      },
      {
        h: 'Resource limits',
        p: [],
        list: [
          'CPU limit - e.g. 0.5; empty = unlimited',
          'Memory limit - e.g. 512m, 1g',
          'Docker images to keep - prior peon/* tags for rollback; default 3; 0 = only running',
          'Stop grace period (seconds) - default 30',
        ],
      },
    ],
  },
  {
    slug: 'docker-images',
    title: 'Docker Images',
    description: 'Deploy prebuilt registry images with ports, env, domains, and health checks.',
    sections: [
      {
        h: 'Create',
        p: [
          'New service → Type Docker Image. Fields: Name, Server, Image (e.g. nginx), Tag (default latest), optional Port mappings.',
        ],
      },
      {
        h: 'Configuration',
        p: [
          'Image panel: Image, Tag, Ports exposed / mappings. Same General, Public access (if applicable), Healthcheck, Advanced (no git auto-deploy), Resource limits, Domains, Environment, Storage as other app kinds.',
        ],
      },
      {
        h: 'Updating',
        p: [
          'Change the tag and Deploy, or redeploy the same tag to pull a refreshed image. Prefer pinned tags in production. Previous images remain available for Rollback per Docker images to keep.',
        ],
      },
    ],
  },
  {
    slug: 'docker-compose',
    title: 'Docker Compose',
    description:
      'Deploy multi-container Compose stacks on Peon: create blank services or use marketplace templates, with volumes, domains, and env interpolation.',
    sections: [
      {
        h: 'New Service → Compose',
        p: [
          'Creates a blank COMPOSE service. Field docker-compose.yml is required (full YAML). No magic credentials. Typical next step: paste YAML → Environment → Domains → Deploy.',
        ],
      },
      {
        h: 'Configuration panels',
        p: [],
        list: [
          'General - Name, Description, Server',
          'Compose - edit raw YAML',
          'Service Specific Configuration - only when magic env from templates exists (see One-Click Templates)',
          'Advanced - Raw compose deployment (default off): deploy YAML as-is without Peon network/proxy injection',
          'No rolling update / preview deploys for Compose',
        ],
      },
      {
        h: 'Volumes',
        p: [
          'Template/compose volumes live in the YAML. Peon Storage (named volumes UI) is separate and not auto-synced from the template. Prefer secrets via Environment ${VAR} interpolation rather than hardcoding.',
        ],
      },
    ],
  },
  {
    slug: 'static-sites',
    title: 'Static Sites',
    description: 'Static and SPA deploys: publish directory, Static pack, SPA fallback, caching tips.',
    sections: [
      {
        h: 'Create',
        p: [
          'Type Static Site (or Application Git with Build pack Static). Set Base directory and Publish directory (e.g. dist). Git source fields same as other git services.',
        ],
      },
      {
        h: 'Build & serve',
        p: [
          'Static pack serves via nginx:alpine on port 80. Install/Build commands override pack defaults when needed. Enable Single-page app fallback under Advanced for client-side routers.',
        ],
      },
      {
        h: 'CDN tip',
        p: [
          'Put Cloudflare (or similar) in front for global caching. Origin remains your VPS behind Peon’s gateway with automatic HTTPS.',
        ],
      },
    ],
  },
  {
    slug: 'one-click-templates',
    title: 'One-Click Templates',
    description:
      "Browse Peon's marketplace or use a /deploy/[slug] link: covers create fields, auto-generated secrets, domain seeds, and how to fix common errors.",
    sections: [
      {
        h: 'What it is',
        p: [
          'One-click COMPOSE stacks from Peon’s catalog (WordPress, n8n, Plausible, UIs, and hundreds more). Secrets and hostnames are generated automatically. This is not the same as New Service → Compose (blank YAML).',
        ],
      },
      {
        h: 'Where to open',
        p: [],
        list: [
          'In-app - Project → Services → Marketplace (manage role only)',
          'Marketing - peon.sh/marketplace → Deploy opens the app',
          'One-click - app /deploy/[slug] after marketing Deploy',
        ],
      },
      {
        h: 'Browse (in-app)',
        p: [],
        list: [
          'search services… - matches slug, slogan, tags',
          'Category - all categories or analytics, automation, cms, database, monitoring, …',
          'Cards - Name, category chip, slogan',
        ],
      },
      {
        h: 'Create from template (in-app)',
        p: [],
        list: [
          'Service name - optional; empty uses template slug',
          'Server - required; options name (ip)',
          'Create service - disabled without a server; stays on project services list (open the service to Deploy)',
        ],
      },
      {
        h: 'One-click deploy /deploy/[slug]',
        p: [],
        list: [
          'Workspace - defaults to current; changing it switches workspace context',
          'Project - required; Create a project link if empty',
          'Server - required; Add a server link if empty',
          'Deploy - creates service and navigates to it',
        ],
      },
      {
        h: 'What gets created',
        p: [],
        list: [
          'Kind COMPOSE (buildPack DOCKERCOMPOSE)',
          'Compose file from template; Description = slogan; templateSlug set',
          'Env - magic credentials + template .env seeds (encrypted)',
          'Deploy is not started automatically - Overview → Deploy',
        ],
      },
      {
        h: 'Service Specific Configuration',
        p: ['Labels derived from magic env patterns:'],
        list: [
          'SERVICE_USER_* → {Id} User (not masked)',
          'SERVICE_PASSWORD_* → {Id} Password (masked)',
          'SERVICE_DATABASE_* → {Id} Database Name',
          'SERVICE_BASE64_* / HEX_* → {Id} Secret (masked)',
        ],
      },
      {
        h: 'Hostnames vs Domains panel',
        p: [
          'At create, Peon seeds hostnames like {slug}-{first8Uuid}.{wildcardDomain | {ip}.sslip.io | localhost} into SERVICE_FQDN_* / SERVICE_URL_* (often http). Those are not the same as Domains panel fqdn used by Traefik/Caddy, Visit, and Force HTTPS.',
          'Before public HTTPS: copy the intended hostname into Domains (or your own domain + DNS), ensure Servers → Gateway is on, and ports 80/443 are open.',
        ],
      },
      {
        h: 'Common errors',
        p: [],
        list: [
          'Marketplace button missing - need project manage role',
          'Create disabled - add + validate a server first',
          'App unreachable - Domains empty, Gateway off, DNS wrong, or never clicked Deploy',
          'Login credentials unknown - Service Specific Configuration or Environment (reveal with manage role)',
        ],
      },
    ],
  },
  {
    slug: 'databases',
    title: 'Databases',
    description:
      'Deploy Postgres, MySQL, MongoDB, or Redis on Peon: create fields, access credentials, internal and public URLs, and backup wiring.',
    sections: [
      {
        h: 'Create',
        p: [
          'New service → Type Database. Name, Server, Engine: PostgreSQL, MySQL, MariaDB, MongoDB, Redis, KeyDB, Dragonfly, ClickHouse. Postgres Image variants include postgres:18-alpine (default), 17/16, Supabase, PostGIS, PGVector.',
        ],
      },
      {
        h: 'UI differences',
        p: [
          'No Domains or Scheduled Tasks. Backups only for PostgreSQL, MySQL, MariaDB, MongoDB. Redis-family shows Image only (no credential fields).',
        ],
      },
      {
        h: 'Engine configuration fields',
        p: [],
        list: [
          'Image - Docker image for the DB',
          'Username - Postgres, MySQL, MariaDB, ClickHouse',
          'Password - Postgres, MySQL, MariaDB, MongoDB, ClickHouse (masked)',
          'Initial Database / Database Name - engine-specific name field',
          'Root Password - MySQL, MariaDB; Root Username - MongoDB',
        ],
      },
      {
        h: 'Connection URLs (read-only)',
        p: [],
        list: [
          '{Engine} URL (internal) - Docker network hostname:port for other services',
          '{Engine} URL (public) - server IP + public port; empty until Public access enabled',
        ],
      },
      {
        h: 'Public access',
        p: [],
        list: [
          'Publicly accessible - publish DB port on the host',
          'Public port - host port for external clients',
        ],
      },
      {
        h: 'Connecting apps',
        p: [
          'Copy the internal URL into your app Environment on the same Docker network. Prefer private networking; restrict public access with firewalls if you enable it.',
        ],
        code: `DATABASE_URL=postgres://user:pass@<db-container>:5432/dbname
REDIS_URL=redis://:<password>@<redis-container>:6379`,
      },
    ],
  },
  {
    slug: 'environment-variables',
    title: 'Environment Variables',
    description:
      'Manage env vars in Peon: KEY naming rules, Build and Runtime flags, developer mode, shared variable overrides, and Compose ${VAR} interpolation.',
    sections: [
      {
        h: 'Where',
        p: ['Service → Environment. Two sections: production and preview.'],
      },
      {
        h: 'Fields and controls',
        p: [],
        list: [
          'KEY / value - key must match ^[A-Za-z_][A-Za-z0-9_]*$, ≤255 chars',
          'Build - available at build time (default on); use for NEXT_PUBLIC_* etc.',
          'Runtime - available in the running container (default on)',
          'Developer mode - bulk .env editor (KEY=value per line); Save all replaces the whole set',
          'Import from production - copy prod vars into preview (overwrites matching keys)',
          'Reveal / mask - manage role can reveal; project MEMBER sees masked values',
        ],
      },
      {
        h: 'Shared variables',
        p: [
          'Workspace/project/server scoped values at /shared-variables complement per-service env. See Shared Variables docs.',
        ],
      },
      {
        h: 'Compose interpolation',
        p: [
          'In Compose YAML, ${VAR} placeholders render from service variables at deploy time. Keep secrets out of Git.',
        ],
      },
    ],
  },
  {
    slug: 'domains-and-ssl',
    title: 'Domains & SSL',
    description:
      "Add custom domains to Peon services: configure Force HTTPS, Gzip, and Strip Prefix, point your DNS records, and fix Let's Encrypt certificate issues.",
    sections: [
      {
        h: 'Where',
        p: ['Service → Domains (hidden for databases).'],
      },
      {
        h: 'Fields',
        p: [],
        list: [
          'Domains - public FQDNs (multi-row; Add New Domain). Example https://app.example.com',
          'Force HTTPS - redirect HTTP→HTTPS via gateway (default on)',
          'Gzip compression - default on',
          'Strip prefix - strip path prefix / via proxy (default off)',
        ],
      },
      {
        h: 'DNS and gateway',
        p: [
          'Point A/AAAA or CNAME at the server IP. Server Wildcard domain (Servers → General) powers preview hostnames. Gateway must be on; ports 80/443 open. Let’s Encrypt issues after DNS is correct.',
        ],
      },
      {
        h: 'Cloudflare',
        p: [
          'Use SSL mode Full (strict). Grey-cloud during first issuance if HTTP-01 fails through the proxy, then re-enable orange cloud.',
        ],
      },
      {
        h: 'Common errors',
        p: [
          'Certificate not issuing → DNS wrong, ports 80/443 blocked, or Gateway off. Let’s Encrypt rate-limits failed validations - fix the cause before retrying.',
        ],
      },
    ],
  },
  {
    slug: 'volumes',
    title: 'Volumes (Storage)',
    description: 'Named Docker volumes on a service: name and mount path.',
    sections: [
      {
        h: 'Where',
        p: ['Service → Storage.'],
      },
      {
        h: 'Fields',
        p: [],
        list: [
          'name - Docker volume name (1–120 chars)',
          'Mount path - path inside the container (placeholder /data)',
        ],
      },
      {
        h: 'Notes',
        p: [
          'UI creates named volumes only (no bind-mount host path in the form). Deleting a mapping updates Peon config; remote volume data may remain on the host.',
        ],
      },
    ],
  },
];
