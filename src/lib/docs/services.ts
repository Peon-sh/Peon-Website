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
    description:
      'Deploy prebuilt registry images on Peon: create a Docker Image service, configure ports, env, domains, health checks, resource limits, and roll back safely.',
    sections: [
      {
        h: 'What Docker Image services are',
        p: [
          'A Docker Image service runs a container from an existing image on a registry—Docker Hub, GitHub Container Registry, a private registry your server can pull, or any tag you already publish in CI. Peon does not build from Git for this kind: there is no install/build step on the host beyond pulling the image, injecting encrypted environment variables, applying your port and resource settings, and starting the container on the server’s Docker network shared with the gateway.',
          'Choose Docker Image when the artifact is already built elsewhere (CI pushes ghcr.io/org/app:1.4.2) or you want a stock image such as nginx, redis (when you do not need a full Database service UI), or a vendor appliance. Prefer Application (Git) / Dockerfile / Nixpacks when Peon should clone and build. Prefer Compose when you need several containers defined in one YAML file.',
        ],
      },
      {
        h: 'Create a Docker Image service',
        p: [
          'In a project, open Services → New service → Type Docker Image. Who can create: workspace OWNER/ADMIN or project ADMIN. Required fields are Name and Server. Set Image to the repository name (for example nginx or ghcr.io/acme/api) and Tag (default latest). Optionally set Port mappings at create time (for example 3000 or 8080:3000).',
          'Validate the target server first so Docker is installed and SSH works. After create, open Configuration to finish Image/ports, Environment, Domains, Healthcheck, and limits, then Overview → Deploy. Visit opens the primary domain once HTTPS routing is healthy.',
        ],
      },
      {
        h: 'Configuration panels',
        p: [
          'Docker Image services reuse most of the shared app configuration UI, with an Image panel instead of Git/Build:',
        ],
        list: [
          'General - Name, Description, Server',
          'Image - Image name, Tag, Ports exposed / mappings (e.g. 3000 or 8080:3000,8443:443)',
          'Environment - encrypted KEY=value pairs injected at deploy',
          'Domains - public hostnames, Force HTTPS, Visit links via the gateway',
          'Storage - named volumes mounted into the container',
          'Healthcheck - HTTP probe fields (method, path, port, retries, start period, …)',
          'Resource limits - CPU, memory, Docker images to keep, stop grace period',
          'Advanced - rolling update, pre/post-deploy commands, custom Docker options, labels; no git auto-deploy or preview deploys (those are git-based)',
          'Public access - when the kind exposes it, same pattern as other app services',
        ],
      },
      {
        h: 'Ports, domains, and the gateway',
        p: [
          'Map the port your process listens on inside the container so Peon’s reverse proxy (Traefik or Caddy) can reach it. For public HTTPS, add a Domain, keep Servers → Gateway enabled, and open 80/443 on the host firewall. Prefer Domains over publishing host ports alone when you want automatic certificates and Visit links.',
          'Rolling update can start a new container beside the old one and switch traffic after health checks pass. It needs a domain and avoids host port maps that would conflict. If you bind host ports directly, plan cutovers more carefully—redeploys may briefly contend for the same host port.',
        ],
      },
      {
        h: 'Environment, storage, and health checks',
        p: [
          'Put secrets and runtime config in Environment rather than baking them into the image. Redeploy after env changes so the running container picks them up. Use Storage for durable paths (uploads, data directories) so a new container still sees the same volume.',
          'Enable Healthcheck with a path and port that match the app (for example GET /health on 3000). Defaults are Interval/Timeout 5s, Retries 10, Start period 5s—tune Start period for slow boots. Healthy probes matter more when rolling update is on, because Peon waits before shifting traffic.',
        ],
      },
      {
        h: 'Updating and rollback',
        p: [
          'To ship a new version, change the Tag to the release you want and Deploy, or Redeploy the same tag if the registry digest moved (common with latest). Prefer pinned tags or digests in production so accidental latest moves do not surprise you. Force rebuild is less relevant here than for Git builds—there is no source/build cache—but Redeploy still pulls and restarts according to your settings.',
          'Resource limits → Docker images to keep controls how many prior peon/* (or retained) image tags stay on the server for Rollback (default 3; 0 keeps only what is running). From Deployments, roll back to a finished production deploy when a bad tag lands. Stop / Start / Restart on Overview control the running container without changing the configured image reference.',
        ],
      },
      {
        h: 'Private registries and pull tips',
        p: [
          'The application server must be able to docker pull the image. For private registries, configure registry login on the host (or credentials your Peon/Docker setup expects) before Deploy. If pull fails, check image name spelling, tag existence, network egress from the VPS, and auth—Deployments logs usually show the pull error first.',
          'Pin versions in CI and in Peon together: build once, push :1.4.2, set Tag to 1.4.2, Deploy. That keeps marketing sites, APIs, and workers reproducible across servers.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Create: New service → Docker Image → Name, Server, Image, Tag → optional ports → Deploy',
          'Public HTTPS: set container port → Domains → Gateway on → open 80/443',
          'Production: pin tags (avoid floating latest); set Docker images to keep for rollback',
          'Config: Environment for secrets, Storage for durable paths, Healthcheck before rolling update',
          'Update: bump Tag and Deploy, or Redeploy to re-pull; Rollback from Deployments if needed',
          'Not for this kind: git auto-deploy, watch paths, and PR preview deployments',
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
        h: 'What Docker Compose is in Peon',
        p: [
          'Docker Compose lets you define and run multi-container applications from a single YAML file. In Peon, a Compose service is a first-class deployable unit on a server you connect over SSH. Peon writes your compose file to the host, injects encrypted environment variables, brings the stack up with Docker Compose, and (unless you enable raw mode) wires containers into the shared gateway network so Traefik or Caddy can terminate HTTPS for public domains.',
          'Use Compose when your app is more than one process—API plus Redis, web plus worker, or a full stack with a database sidecar. Prefer a dedicated Database service for a single engine with Peon’s credential UI and backups, or Application (Git) / Dockerfile / Docker Image when you ship one main container.',
        ],
      },
      {
        h: 'Blank Compose vs marketplace templates',
        p: [
          'There are two ways to create a COMPOSE service. New Service → Compose creates a blank stack: you own the full docker-compose.yml, and Peon does not generate magic credentials. Marketplace / one-click templates also create kind COMPOSE, but they paste a catalog compose file, seed encrypted env (including SERVICE_PASSWORD_* and related keys), and often expose a Service Specific Configuration panel. Deploy is never started automatically—open the service Overview and click Deploy after you review YAML, env, and domains.',
          'Choose blank Compose when you already maintain a compose file in Git or you need exact control over services, networks, and volume names. Choose a template when you want WordPress, n8n, Plausible, or similar stacks with secrets and hostname seeds generated for you. See One-Click Templates for marketplace browse, /deploy/[slug], and magic-env label mapping.',
        ],
      },
      {
        h: 'Create a blank Compose service',
        p: [
          'In a project, open Services → New service → Compose. Required fields are Name, Server, and a complete docker-compose.yml. There is no separate image or build-pack picker—the YAML defines images, builds, ports, depends_on, and healthchecks. After create, the usual next steps are: refine the Compose panel YAML, set Environment variables (especially secrets referenced as ${VAR}), add Domains for any public HTTP service, then Deploy from Overview.',
          'Validate the target server first (Docker installed, SSH working, gateway ready if you need HTTPS). Compose updates replace the stack more bluntly than rolling updates on single-container apps: plan maintenance windows for production changes, and keep previous images or backups if you need a quick recovery path.',
        ],
      },
      {
        h: 'Configuration panels',
        p: [
          'Compose services use a subset of the shared service configuration UI, plus compose-specific panels:',
        ],
        list: [
          'General - Name, Description, and Server assignment',
          'Compose - edit the full docker-compose.yml that Peon deploys',
          'Service Specific Configuration - only when magic env from templates exists (see One-Click Templates)',
          'Environment - encrypted KEY=value pairs; use ${VAR} in YAML for secrets and hostnames',
          'Domains - public hostnames for gateway routing, Force HTTPS, and Visit links',
          'Storage - Peon named volumes UI (separate from volumes declared in the compose file)',
          'Advanced - Raw compose deployment (default off): deploy YAML as-is without Peon network/proxy injection',
          'Not available for Compose - rolling update and preview deploys (those apply to other app kinds)',
        ],
      },
      {
        h: 'Raw compose deployment',
        p: [
          'By default Peon may adjust networking so your published services join the platform gateway and can receive domains. Raw compose deployment turns that off: Peon deploys your YAML as written. Use raw mode when you already define custom networks, host networking, or an external proxy, and you do not want Peon to inject its usual compose wiring.',
          'If raw mode is on and you still need public HTTPS through Peon, you must expose ports and routing yourself. If raw mode is off, map application ports in compose as your images expect, then attach Domains in Peon rather than relying only on host-published ports for production traffic.',
        ],
      },
      {
        h: 'Volumes, secrets, and environment',
        p: [
          'Volumes declared under services or top-level volumes in the compose file live with Docker on that server. The Peon Storage panel manages named volumes for the service independently and is not auto-synced from template YAML—do not assume a template volume name appears in Storage until you create it there if you need the UI path.',
          'Never commit production passwords into the compose file. Put secrets in Environment and reference them with ${VAR} interpolation at deploy time. Templates often seed SERVICE_USER_*, SERVICE_PASSWORD_*, SERVICE_FQDN_*, and SERVICE_URL_* keys; blank Compose stacks only get what you paste. Reveal and edit sensitive values with a project manage role.',
          'Hostname seeds from templates (for example sslip.io or wildcard domain placeholders) are not the same as Domains panel FQDNs used by the gateway for Visit and Force HTTPS. Before public access, copy the intended hostname into Domains (or your own DNS), keep Servers → Gateway enabled, and open ports 80/443 on the host firewall.',
        ],
      },
      {
        h: 'Deploy, logs, and operations',
        p: [
          'Each Deploy runs on the selected server: Peon syncs compose and env, then brings the stack up. Watch progress under Deployments; use Logs and Terminal when debugging failed pulls, unhealthy depends_on chains, or misconfigured ports. Scheduled tasks, webhooks, and notifications work like other services where the UI exposes them for COMPOSE.',
          'Name containers clearly in YAML so logs stay readable. Pin image tags in production instead of latest. After changing only env or domains, redeploy so the stack picks up new values. If a change breaks the stack, fix YAML or env and deploy again; back up volumes for data you cannot afford to lose.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Blank YAML path: New Service → Compose → paste docker-compose.yml → Environment → Domains → Deploy',
          'Template path: Marketplace or /deploy/[slug] → review Service Specific Configuration → Domains → Deploy',
          'Keep secrets in Environment with ${VAR}; avoid hardcoding credentials in YAML',
          'Treat compose volumes and Peon Storage as separate concerns unless you deliberately align names',
          'Leave raw compose off unless you need fully custom networking without Peon gateway injection',
          'Remember: no rolling update or preview deploys for Compose—plan cutovers accordingly',
        ],
      },
    ],
  },
  {
    slug: 'static-sites',
    title: 'Static Sites',
    description:
      'Deploy static sites and SPAs on Peon: Static Site type or Static build pack, publish directory, nginx serve, SPA fallback, domains, and CDN tips.',
    sections: [
      {
        h: 'What Static Sites are in Peon',
        p: [
          'A static site is HTML, CSS, JS, and assets Peon builds from Git (when needed) and serves with nginx:alpine on port 80 behind the platform gateway. There is no long-running app server for the page itself—ideal for marketing sites, docs, Vite/React/Vue/Svelte SPAs after build, and Astro or similar SSG output.',
          'Prefer Static when the result is files in a publish directory. Prefer Application (Git) with Nixpacks/Railpack/Dockerfile when you need a Node (or other) process at runtime. Prefer Docker Image when you already publish a custom nginx (or Caddy) image. Prefer Compose for multi-service stacks that include a static front end plus APIs.',
        ],
      },
      {
        h: 'Create a static service',
        p: [
          'Two equivalent entry points: New service → Type Static Site, or Type Application (Git) with Build pack Static. Both use Git source fields like other git services—Git App (connection, repository, branch), public repository URL, or Deploy key plus private key.',
          'Set Base directory when the app lives in a monorepo subdirectory (default /). Set Publish directory to the folder of built assets relative to that base (for example dist, build, or out). Required: Name and Server. Who can create: workspace OWNER/ADMIN or project ADMIN.',
        ],
      },
      {
        h: 'Build and serve',
        p: [
          'On Deploy, Peon clones the commit, runs install/build according to the Static pack (or your overrides), then serves the publish directory with nginx:alpine on port 80. Leave Install / Build commands empty to use pack defaults; override them when the repo needs a specific package manager script (for example npm ci && npm run build or pnpm build).',
          'Point Publish directory at the folder that actually contains index.html after the build. A wrong publish path is the most common cause of empty sites or nginx default pages. After fixing it, Redeploy (use Force rebuild if a stale cache confuses the output).',
        ],
      },
      {
        h: 'SPA fallback and Advanced flags',
        p: [
          'Client-side routers (React Router, Vue Router, etc.) need unknown paths to return index.html. Enable Single-page app fallback under Configuration → Advanced so deep links and refreshes on /app/settings do not 404.',
          'Static site / SPA-related Advanced flags sit alongside Auto deploy, watch paths (Build panel), and Domains. Rolling update and health checks still follow the shared app patterns where the UI exposes them—pair Domains with Force HTTPS for public traffic.',
        ],
      },
      {
        h: 'Environment, domains, and auto-deploy',
        p: [
          'Put build-time public config in Environment with Build enabled (for example NEXT_PUBLIC_* or VITE_* depending on your toolchain). Runtime-only secrets are rarely needed for pure static output; if your build embeds them, treat that as a public leak risk. Redeploy after env changes so the build picks them up.',
          'Add Domains, point DNS at the server, keep Gateway on, and open 80/443. Enable Auto deploy so pushes to the watched branch rebuild and republish. Use Watch paths in monorepos so unrelated package changes do not rebuild this site.',
        ],
      },
      {
        h: 'CDN and caching',
        p: [
          'Peon’s origin remains your VPS behind automatic HTTPS. For global edge caching, put Cloudflare (or another CDN) in front: proxy DNS to the same hostname, cache static assets aggressively, and keep HTML/SPA entry documents fresher if you ship frequent deploys.',
          'With Cloudflare, use SSL mode Full (strict) once certificates work on the origin. If first issuance fails through the orange cloud, grey-cloud briefly for HTTP-01, then re-enable the proxy (see Domains & SSL).',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Create: Static Site (or Application Git + Build pack Static) → Git source → Base + Publish directory',
          'Build: override Install/Build only when pack defaults are wrong; confirm index.html lands in Publish directory',
          'SPA: enable Single-page app fallback under Advanced for client-side routing',
          'Ship: Domains + DNS + Gateway; Auto deploy (+ Watch paths in monorepos)',
          'Env: Build-time public vars in Environment; Redeploy after changes',
          'Edge: optional Cloudflare/CDN in front; Full (strict) SSL when origin certs are healthy',
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
        h: 'What Environment is for',
        p: [
          'Every deployable service can store encrypted KEY=value pairs under Service → Environment. Peon injects them when building and/or running containers so secrets stay out of Git, Dockerfiles, and compose files. Use this panel for database URLs, API keys, feature flags, NEXT_PUBLIC_* (or similar) build-time public config, and anything else your process reads from the environment.',
          'Environment is split into production and preview. Production applies to normal Deploy / Redeploy and auto-deploy on your main branch. Preview applies to PR preview deployments when that feature is enabled. Keeping them separate lets you point previews at staging databases or softer secrets without touching production.',
        ],
      },
      {
        h: 'Where and who',
        p: [
          'Open the service sidebar → Environment. Project members with manage rights can add, edit, and reveal values. Project MEMBER typically sees masked secrets and cannot reveal them. Treat revealed values like passwords in a screen share—prefer rotate-and-redeploy if a secret may have leaked.',
        ],
      },
      {
        h: 'KEY rules and Build / Runtime flags',
        p: [
          'Each row is a key, a value, and two availability flags:',
        ],
        list: [
          'KEY - must match ^[A-Za-z_][A-Za-z0-9_]*$ and be ≤255 characters (letters, digits, underscore; cannot start with a digit)',
          'Value - stored encrypted at rest; empty values are allowed when you intentionally clear a key',
          'Build - available at build time (default on); use for NEXT_PUBLIC_*, Vite VITE_*, compile-time config, and anything the build pack needs',
          'Runtime - available in the running container (default on); use for server secrets, DATABASE_URL, and process config',
        ],
      },
      {
        h: 'Choosing Build vs Runtime',
        p: [
          'Leave both on when unsure for simple apps. Turn Build off for secrets that must never appear in build logs or client bundles—server-only API keys should usually be Runtime only. Turn Runtime off for pure build-time public values if you do not want them in the container env (optional hygiene).',
          'After changing variables, Redeploy (or wait for the next auto-deploy) so the new set is applied. Editing Environment alone does not restart a running container until a deployment runs.',
        ],
      },
      {
        h: 'Developer mode and bulk edit',
        p: [
          'Developer mode opens a bulk .env-style editor: one KEY=value per line. Save all replaces the whole variable set for that section (production or preview), so review carefully before saving—omitted keys are removed from that set. Use it to paste from a local .env when onboarding a service, then switch back to the row UI for day-to-day edits.',
          'Import from production copies production keys into the preview section and overwrites matching preview keys. Use it to bootstrap preview env, then override URLs and secrets that should stay staging-only.',
        ],
      },
      {
        h: 'Production vs preview',
        p: [
          'Preview env only matters when Configuration → Advanced → Preview deployments is on and Git permissions plus server Wildcard domain are set up (see Deployments & Previews). If previews build but misbehave, compare preview Environment against production: missing DATABASE_URL, wrong APP_URL, or Build flags off for NEXT_PUBLIC_* are common causes.',
          'Delete finished preview environments from the Deployments preview panel when you no longer need their runtime; that does not automatically wipe the preview variable definitions in Environment—keep preview secrets rotated like production if they are sensitive.',
        ],
      },
      {
        h: 'Shared variables',
        p: [
          'Workspace, project, or server-scoped Shared Variables (open /shared-variables via command palette or URL) complement per-service Environment. Use shared values for SMTP, org-wide API keys, or defaults reused across many services. Keep app-specific secrets and build-time flags on the service Environment panel. See Shared Variables for scope fields and who can edit them.',
        ],
      },
      {
        h: 'Compose interpolation and templates',
        p: [
          'For COMPOSE services, ${VAR} placeholders in docker-compose.yml resolve from service Environment at deploy time. Put passwords and hostnames in Environment; reference them in YAML instead of hardcoding. Marketplace templates often seed SERVICE_USER_*, SERVICE_PASSWORD_*, SERVICE_FQDN_*, and SERVICE_URL_*—edit or reveal them under Environment or Service Specific Configuration with a manage role.',
          'Never commit production secrets into the compose file or Git. If a template hostname seed differs from Domains panel FQDNs, align Domains for public HTTPS and keep URL-style env vars consistent after you set the real hostname.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Add keys under Service → Environment (production and/or preview)',
          'Match KEY pattern ^[A-Za-z_][A-Za-z0-9_]*$; prefer SCREAMING_SNAKE_CASE',
          'Secrets: Runtime on, Build off when they must not enter the build',
          'Public build config (NEXT_PUBLIC_*): Build on; Redeploy after changes',
          'Bulk paste: Developer mode → Save all (replaces the whole set)',
          'Preview bootstrap: Import from production, then override staging-only values',
          'Compose: use ${VAR} from Environment; keep secrets out of YAML/Git',
          'Reuse across services: Shared Variables; app-specific: per-service Environment',
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
    description:
      'Attach named Docker volumes to Peon services: mount paths, Compose vs UI storage, data durability, cleanup risks, and how this differs from S3 Storages.',
    sections: [
      {
        h: 'What service Storage is',
        p: [
          'Service → Storage manages named Docker volumes mounted into a service’s container. Use volumes for data that must survive redeploys: uploads, caches you intentionally keep, app data directories, or any path the process writes that should not live only in an ephemeral container filesystem.',
          'This is not workspace Storages (S3) used for database backup uploads, and not bind-mounting an arbitrary host path from the Peon form. The UI creates and maps named Docker volumes only.',
        ],
      },
      {
        h: 'Where and who',
        p: [
          'Open the service sidebar → Storage. Who can change mounts: project manage role (workspace OWNER/ADMIN or project ADMIN). After adding or changing volumes, Redeploy so the running container picks up the new mounts.',
        ],
      },
      {
        h: 'Fields',
        p: [
          'Each mapping has:',
        ],
        list: [
          'name - Docker volume name (1–120 characters); pick a stable, unique name per server when possible',
          'Mount path - absolute path inside the container (placeholder example /data)',
        ],
      },
      {
        h: 'How to choose mount paths',
        p: [
          'Mount the path your application actually writes to (for example /var/www/uploads, /app/data, or the documented data dir for a marketplace image). Wrong paths look “fine” in the UI but leave data in the container layer that disappears on recreate.',
          'Avoid mounting over critical system paths inside minimal images unless you know the image expects it. One volume per concern (uploads vs databases vs temp) makes backups and debugging clearer. Prefer Environment for configuration and secrets; volumes are for files and directories.',
        ],
      },
      {
        h: 'Compose vs Peon Storage UI',
        p: [
          'On COMPOSE services, volumes declared in docker-compose.yml live with Docker on that server as defined in YAML. The Peon Storage panel is separate and is not auto-synced from template or compose volume names—creating a UI volume does not rewrite your YAML, and a template volume does not automatically appear as a Storage row.',
          'Treat compose volumes and Peon Storage as separate concerns unless you deliberately align names and understand both paths. For blank Compose, prefer declaring durable volumes in YAML; use the Storage UI when you are on non-compose app kinds or intentionally managing named volumes through Peon.',
        ],
      },
      {
        h: 'Durability, delete, and cleanup',
        p: [
          'Deleting a volume mapping in Peon updates service configuration so future deploys may stop mounting that name. Remote volume data may still remain on the Docker host until you prune unused volumes. That is intentional safety—and a footgun if you assume Delete wiped disk.',
          'Servers → Advanced cleanup can delete unused volumes and destroy data belonging to stopped containers. Never enable volume prune on a host that still has data you need. Before deleting a service or server, back up anything important (database Backups + S3 for engines that support it; app-level copy for file volumes).',
        ],
      },
      {
        h: 'Operational tips',
        p: [
          'Inspect mounts with Service → Terminal (ls on the mount path) after Redeploy. If the app cannot write, check permissions inside the image user vs the volume, and confirm the mount path matches the app config.',
          'Moving a service to another server does not magically move Docker volume data—plan rsync/restore or recreate from backups. Pin volume names in runbooks so restore targets stay obvious.',
          'Databases managed as DATABASE services already persist via their engine volumes; still use Database Backups + S3 for recoverable dumps. File-heavy apps (CMS uploads, user media) should always have an explicit Storage mount (or compose volume) plus an off-server backup strategy—volumes alone are not offsite backups.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Service → Storage → name + mount path → Redeploy',
          'Mount the real app data path; verify with Terminal',
          'Do not confuse with Sidebar → Storages (S3 backups)',
          'Compose: YAML volumes ≠ automatic Storage UI rows',
          'Removing a mapping may leave data on the host until prune',
          'Avoid unused-volume cleanup unless you accept data loss',
          'Before Danger Zone deletes: copy or back up volume data you still need',
        ],
      },
    ],
  },
];
