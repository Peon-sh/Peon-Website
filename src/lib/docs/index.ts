export type DocSection = {
  h: string;
  p: string[];
  list?: string[];
  code?: string;
};

export type DocPage = {
  slug: string;
  title: string;
  description: string;
  sections: DocSection[];
};

export type DocGroup = {
  label: string;
  pages: DocPage[];
};

export const DOC_GROUPS: DocGroup[] = [
  {
    label: 'Get Started',
    pages: [
      {
        slug: 'introduction',
        title: 'Introduction',
        description:
          'What Peon is, how it works, and the concepts you need to know before your first deployment.',
        sections: [
          {
            h: 'What is Peon?',
            p: [
              'Peon is an open-source, self-hostable deployment platform. It turns any Linux server you own, a Hetzner VPS, a DigitalOcean Droplet, an EC2 instance or a machine under your desk, into your own PaaS: git-push deployments, automatic HTTPS, managed databases with backups, logs and team access.',
              'Peon connects to your servers over SSH and manages Docker on them. Your apps run on your hardware; Peon provides the workflow. Pricing is a flat $2 per project per month with unlimited team members, and the platform itself can also be self-hosted for free.',
            ],
          },
          {
            h: 'Core concepts',
            p: [],
            list: [
              'Workspace: the top-level tenant. Members belong to workspaces; billing and shared variables live here',
              'Project: a group of services, typically one product or client. Access is controlled per project',
              'Server: a Linux machine you connect over SSH. Peon installs Docker and a reverse proxy on it',
              'Service: a deployable unit inside a project: a git application, a Docker image, a Compose stack, a static site or a database',
              'Source: a GitHub/GitLab connection used to pull repositories and register deploy webhooks',
              'Storage: an S3-compatible destination used for database backups',
            ],
          },
          {
            h: 'How a deployment works',
            p: [
              'When you push to a connected branch, your Git provider sends a webhook to Peon. The platform clones the exact commit onto the target server, builds a Docker image there (using the layer cache for speed), injects your environment variables, and performs a health-checked rolling update: the new container starts alongside the old one, the reverse proxy switches traffic only when the new container reports healthy, and the old one is drained and removed. Rollback re-points to the previous image in seconds.',
            ],
          },
          {
            h: 'What can I deploy?',
            p: [],
            list: [
              'Git applications: anything with a Dockerfile, or auto-detected frameworks (Next.js, Node, Python, Go, Rails, PHP...)',
              'Docker images: any prebuilt image from any registry',
              'Docker Compose stacks: multi-container applications defined in a compose file',
              'Static sites: built on the server and served behind the proxy',
              'One-click templates: hundreds of self-hostable services (Plausible, n8n, Uptime Kuma, MinIO, Ghost...)',
              'Databases: PostgreSQL, MySQL, MariaDB, MongoDB and Redis with scheduled S3 backups',
            ],
          },
        ],
      },
      {
        slug: 'installation',
        title: 'Self-Hosting Peon',
        description: 'Run the Peon control plane on your own infrastructure.',
        sections: [
          {
            h: 'Requirements',
            p: [],
            list: [
              'A Linux server with 2 GB RAM or more for the control plane',
              'Docker and Docker Compose installed',
              'A PostgreSQL database (can run on the same machine)',
              'A domain pointed at the server for HTTPS access to the dashboard',
            ],
          },
          {
            h: 'Quick install',
            p: [
              'Clone the repository, configure the environment, and start the stack. The control plane consists of the web application, a background worker for deployments and backups, and Postgres:',
            ],
            code: `git clone https://github.com/peon-dev/peon.git
cd peon
cp .env.example .env    # set DATABASE_URL, JWT secret, app URL
pnpm install
pnpm prisma migrate deploy
pnpm build && pnpm start   # web app
pnpm worker                # deployment worker (separate process)`,
          },
          {
            h: 'First login',
            p: [
              'Open the dashboard URL and register the first account. The first user becomes the instance admin. From there, connect your first server and deploy normally. Keep the control plane database backed up; it holds your service definitions, environment variables (encrypted) and deployment history.',
            ],
          },
          {
            h: 'Or use Peon Cloud',
            p: [
              'If you would rather not operate the control plane, Peon Cloud hosts it for you at $2 per project with unlimited members. Your apps still run entirely on your own servers; only the dashboard and orchestration are hosted.',
            ],
          },
        ],
      },
      {
        slug: 'first-deployment',
        title: 'Your First Deployment',
        description: 'From zero to a deployed app with HTTPS in about 15 minutes.',
        sections: [
          {
            h: '1. Connect a server',
            p: [
              'Go to Servers, click Add Server, and provide a name, the server IP and SSH credentials (an SSH key is strongly recommended). Peon validates the connection, installs Docker if missing, creates the shared network and starts the reverse proxy. A fresh $5 VPS from any provider works; see the server requirements page for details.',
            ],
          },
          {
            h: '2. Connect a Git source',
            p: [
              'Go to Git Sources and connect GitHub or GitLab via OAuth app or personal access token. This lets Peon list your repositories and register deploy webhooks automatically.',
            ],
          },
          {
            h: '3. Create a project and service',
            p: [
              'Create a project (say, "my-app"), then add a service: choose Git Application, pick the repository and branch, and select the target server. If the repo has a Dockerfile it is used; otherwise the framework is auto-detected.',
            ],
          },
          {
            h: '4. Configure and deploy',
            p: [
              'Add environment variables in the service settings (mark build-time variables where needed, e.g. NEXT_PUBLIC_*). Set your domain, e.g. app.example.com, and create a DNS A record pointing at the server IP. Click Deploy and watch the build log stream. When the health check passes, the app is live and the HTTPS certificate is issued automatically.',
            ],
          },
          {
            h: '5. Push to deploy',
            p: [
              'From now on, every push to the configured branch triggers a build and a zero-downtime rollout. Add teammates from workspace settings; members are unlimited.',
            ],
            code: `git commit -am "ship it"
git push origin main
# -> webhook -> build on server -> health check -> live`,
          },
        ],
      },
    ],
  },
  {
    label: 'Servers',
    pages: [
      {
        slug: 'servers',
        title: 'Managing Servers',
        description: 'Connect, validate and operate the Linux servers your apps run on.',
        sections: [
          {
            h: 'Requirements',
            p: [],
            list: [
              'Any 64-bit Linux with SSH access (Ubuntu, Debian, CentOS/Rocky, Fedora, openSUSE, Arch, Alpine)',
              'Root or sudo access for the initial setup',
              '1 GB RAM minimum; 4 GB recommended for multi-service hosts',
              'Ports 80 and 443 open for web traffic; port 22 (or custom) for SSH',
            ],
          },
          {
            h: 'What happens on connect',
            p: [
              'When you add a server, Peon connects over SSH and runs an idempotent setup: installs prerequisites (git, curl, jq), installs Docker via the official script if missing, creates the shared attachable network, and starts the reverse proxy (Traefik by default, Caddy optional) that owns ports 80 and 443. Server facts (OS, CPU, memory, disk) are collected and shown in the dashboard.',
            ],
          },
          {
            h: 'The reverse proxy',
            p: [
              'One proxy container per server routes all HTTP(S) traffic by hostname and manages Let\u2019s Encrypt certificates. App containers never publish host ports; they join the shared Docker network and the proxy reaches them internally. You can switch between Traefik and Caddy per server in server settings.',
            ],
          },
          {
            h: 'Maintenance',
            p: [],
            list: [
              'Cleanup: prune unused images, stopped containers and build cache on demand or on a schedule, deploy-heavy hosts should schedule this weekly',
              'Resource meters: CPU, memory and disk usage are visible per server; alert thresholds notify your channels',
              'Multiple servers: connect as many as you like and choose the target server per service',
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Applications',
    pages: [
      {
        slug: 'git-applications',
        title: 'Git Applications',
        description: 'Deploy from a GitHub or GitLab repository with push-to-deploy.',
        sections: [
          {
            h: 'Creating a git application',
            p: [
              'Add a service of type Git Application, choose a connected source, repository and branch, and pick the target server. Peon registers a webhook on the repository so every push to that branch triggers a deployment.',
            ],
          },
          {
            h: 'Builds',
            p: [
              'If the repository contains a Dockerfile, it is used as-is. Otherwise Peon detects common frameworks and generates a suitable build. Builds run on the target server with the Docker layer cache, so repeat builds are fast. Build-time environment variables (marked as such in settings) are available during the image build.',
            ],
          },
          {
            h: 'Deploy lifecycle',
            p: [],
            list: [
              'Webhook received and signature verified; branch matched to the service',
              'Exact commit cloned; image built on the server; build log streamed to the dashboard',
              'New container started with runtime environment variables on the proxy network',
              'Health check must pass before traffic switches; otherwise the deploy aborts and the old version keeps serving',
              'Old container drained and removed; previous image retained for rollback',
            ],
          },
          {
            h: 'Rollbacks and redeploys',
            p: [
              'Every successful deployment is listed with its commit. Roll back re-deploys the previous image without a rebuild, taking seconds. Redeploy rebuilds the current commit, useful after changing environment variables that affect the build.',
            ],
          },
          {
            h: 'Health checks',
            p: [
              'Expose a lightweight endpoint (for example /health) that returns 200 when the app is ready to serve. Configure the path and port in service settings. A truthful health check is what makes zero-downtime deploys and automatic recovery reliable.',
            ],
          },
        ],
      },
      {
        slug: 'docker-images',
        title: 'Docker Images',
        description: 'Deploy prebuilt images from any registry.',
        sections: [
          {
            h: 'When to use image services',
            p: [
              'Use an image service when the artifact is built elsewhere: a public image (ghcr.io/org/app:1.4.2), an image built by your CI pipeline, or a vendor-provided container. Peon pulls the image on the target server and runs it behind the proxy with the same environment, domain and health-check machinery as git applications.',
            ],
          },
          {
            h: 'Configuration',
            p: [],
            list: [
              'Image reference with a pinned tag (avoid :latest in production; pin and bump deliberately)',
              'Registry credentials for private registries, stored encrypted',
              'Port the container listens on, so the proxy can route to it',
              'Volumes for any persistent paths the image expects',
            ],
          },
          {
            h: 'Updating',
            p: [
              'Change the tag and redeploy, or redeploy the same tag to pull a refreshed image. The rollout is health-checked like any other deploy, and the previous image remains available for rollback.',
            ],
          },
        ],
      },
      {
        slug: 'docker-compose',
        title: 'Docker Compose',
        description: 'Deploy multi-container stacks from a compose file.',
        sections: [
          {
            h: 'Compose as a service type',
            p: [
              'Compose services deploy a whole stack, multiple containers, networks and volumes, from a compose file stored in the service or in your repository. This is the right tool for applications that ship as compose files (many self-hostable projects do) and for tightly coupled multi-container setups.',
            ],
          },
          {
            h: 'How Peon runs your stack',
            p: [],
            list: [
              'Environment variables in the file (${VAR} interpolation) are rendered from the service\u2019s encrypted variables at deploy time',
              'Services that need public access are routed through the reverse proxy by domain; no host ports required',
              'Named volumes persist across deployments',
              'Health checks and depends_on conditions in your file are respected',
            ],
          },
          {
            h: 'Good practices',
            p: [],
            list: [
              'Pin image tags; never :latest in production',
              'restart: unless-stopped on long-running services',
              'Keep secrets out of the file; use ${PLACEHOLDERS} and set values in the dashboard',
              'Define healthcheck blocks so rollouts and status reporting are truthful',
            ],
          },
        ],
      },
      {
        slug: 'static-sites',
        title: 'Static Sites',
        description: 'Build and serve static sites (Astro, Hugo, Vite, plain HTML) with free SSL.',
        sections: [
          {
            h: 'Creating a static site',
            p: [
              'Add a Static Site service, choose the repository and branch, and specify the build command (e.g. npm run build) and the publish directory (e.g. dist). Peon builds on the server and serves the output behind the proxy with automatic HTTPS. Pushes rebuild and swap content atomically.',
            ],
          },
          {
            h: 'SPA routing',
            p: [
              'Single-page applications need unknown paths to fall back to index.html. Enable the SPA fallback option in the service settings and client-side routes like /dashboard/settings resolve correctly.',
            ],
          },
          {
            h: 'Caching and CDN',
            p: [
              'Hashed assets are served with long-lived immutable cache headers; HTML with short ones. For a global audience, put Cloudflare\u2019s free tier in front of your domain: edge caching plus your VPS origin outperforms most dedicated static hosts at zero cost.',
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Services & Databases',
    pages: [
      {
        slug: 'one-click-templates',
        title: 'One-Click Templates',
        description: 'Deploy hundreds of self-hostable services from the template marketplace.',
        sections: [
          {
            h: 'The marketplace',
            p: [
              'The template catalog contains several hundred ready-to-deploy services: analytics (Plausible, Umami), automation (n8n), monitoring (Uptime Kuma), storage (MinIO), publishing (Ghost, WordPress), and many more. Each template ships a vetted compose definition with sane defaults.',
            ],
          },
          {
            h: 'Deploying a template',
            p: [],
            list: [
              'Pick a template, choose the target server and project',
              'Secrets (passwords, keys) are generated automatically via magic variables; review or override them before deploy',
              'Assign a domain to the web-facing component; HTTPS is automatic',
              'Persistent volumes are created for stateful paths so upgrades keep your data',
            ],
          },
          {
            h: 'Magic environment variables',
            p: [
              'Templates use SERVICE_* placeholders that Peon resolves at deploy time: generated passwords, base64 secrets, the assigned FQDN and so on. This is what makes a template deployable in one click without editing YAML.',
            ],
            code: `# examples resolved automatically
SERVICE_PASSWORD_APP        -> generated strong password
SERVICE_BASE64_64_SECRET    -> 64-char base64 secret
SERVICE_FQDN_APP            -> the domain you assigned`,
          },
          {
            h: 'Upgrading templates',
            p: [
              'Bump the image tag (or accept the template update) and redeploy. Volumes persist, so application data carries across versions. Always check the upstream project\u2019s release notes for breaking changes before major version jumps.',
            ],
          },
        ],
      },
      {
        slug: 'databases',
        title: 'Databases',
        description: 'Provision PostgreSQL, MySQL, MariaDB, MongoDB and Redis on your servers.',
        sections: [
          {
            h: 'Creating a database',
            p: [
              'Add a Database service, choose the engine and version, and the target server. Peon generates credentials, starts the container with a persistent volume, and keeps it private: the database is reachable by name on the internal Docker network only, with no public port unless you explicitly enable one.',
            ],
          },
          {
            h: 'Connecting your apps',
            p: [
              'Services on the same server reach the database by its service hostname. Copy the connection string from the database page into your app\u2019s environment variables:',
            ],
            code: `DATABASE_URL=postgres://app:<generated>@<db-host>:5432/appdb
REDIS_URL=redis://:<password>@<redis-host>:6379`,
          },
          {
            h: 'Operations',
            p: [],
            list: [
              'Version upgrades: bump the image version and redeploy; the data volume persists (always take a backup first, and read the engine\u2019s upgrade notes for major versions)',
              'Resource limits: set memory limits appropriate to the engine; for Redis, set maxmemory and an eviction policy',
              'Public access: optional and discouraged; if you must, restrict by firewall to known IPs',
            ],
          },
        ],
      },
      {
        slug: 'database-backups',
        title: 'Database Backups',
        description: 'Scheduled dumps to S3-compatible storage with retention and one-click restore.',
        sections: [
          {
            h: 'Configure a storage destination',
            p: [
              'Add an S3-compatible storage under Storages: AWS S3, Cloudflare R2, Backblaze B2, Hetzner Object Storage or MinIO all work. Provide the endpoint, bucket and credentials; prefer keys that can write but not delete, and enable bucket versioning for defense in depth.',
            ],
          },
          {
            h: 'Schedule backups',
            p: [
              'On the database\u2019s Backups tab, set the schedule (cron expression or presets), the retention counts (for example 7 daily, 4 weekly, 6 monthly) and the destination. Peon runs the engine-native dump (pg_dump, mysqldump, mongodump, or RDB snapshot for Redis), uploads the archive, and prunes old backups per your retention policy.',
            ],
          },
          {
            h: 'Restore',
            p: [
              'Every stored backup is listed with size and timestamp. Restore into the live database (destructive; confirm carefully) or download the archive to restore into a scratch instance first. Test a restore quarterly; a timed drill is the only proof your backups work.',
            ],
          },
          {
            h: 'Alerts',
            p: [
              'Enable backup notifications so a failed or missing backup pings your Slack/Discord/Telegram channel. Silent backup failure is the expensive kind.',
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Configuration',
    pages: [
      {
        slug: 'environment-variables',
        title: 'Environment Variables',
        description: 'Per-service variables, build-time flags and workspace-shared variables.',
        sections: [
          {
            h: 'Service variables',
            p: [
              'Each service has its own variables, stored encrypted at rest and injected at deploy time. Mark a variable as build-time if it must exist during the image build (front-end variables like NEXT_PUBLIC_* are the common case); everything else is runtime-only.',
            ],
          },
          {
            h: 'Shared variables',
            p: [
              'Workspace-level shared variables let many services reference one value, an API key, an SMTP password, a common config. Reference them from any service; rotate the value once and redeploy consumers. This eliminates the ten-copies-of-one-secret problem.',
            ],
          },
          {
            h: 'Compose interpolation',
            p: [
              'In Compose services, ${VAR} placeholders in the file are rendered from the service\u2019s variables at deploy time, so the file in Git stays secret-free. Use ${VAR:?required} syntax to fail deploys loudly when a required value is missing.',
            ],
          },
          {
            h: 'Good hygiene',
            p: [],
            list: [
              'Never commit .env files; the platform is the source of truth for values',
              'Validate configuration at app boot and crash with a clear message on missing variables',
              'Remember the lifecycle: runtime variable changes apply on the next deploy, build-time changes require a rebuild',
            ],
          },
        ],
      },
      {
        slug: 'domains-and-ssl',
        title: 'Domains & SSL',
        description: 'Custom domains, automatic Let\u2019s Encrypt certificates and redirects.',
        sections: [
          {
            h: 'Add a domain',
            p: [
              'Set the domain on the service (app.example.com) and create a DNS A record pointing at the server\u2019s IP. On the next request the proxy answers the ACME challenge, obtains a Let\u2019s Encrypt certificate, and renews it automatically about 30 days before expiry. HTTP requests redirect to HTTPS.',
            ],
          },
          {
            h: 'Requirements',
            p: [],
            list: [
              'DNS must resolve to the server before issuance can succeed (dig +short app.example.com)',
              'Ports 80 and 443 open in every firewall layer; HTTP-01 validation specifically needs port 80',
              'Behind Cloudflare\u2019s proxy: use SSL mode Full (strict), or grey-cloud during first issuance',
            ],
          },
          {
            h: 'Multiple domains and wildcards',
            p: [
              'A service can hold several domains (example.com and www.example.com). A wildcard DNS record (*.example.com to the server) lets you assign arbitrary subdomains to services without touching DNS each time.',
            ],
          },
          {
            h: 'Troubleshooting issuance',
            p: [
              'Check the proxy container logs; the ACME error names the failing check. The causes are almost always DNS not pointing at the server yet, port 80 blocked, or Cloudflare proxying during first issuance. Fix the root cause before retrying: Let\u2019s Encrypt limits failed validations to 5 per hour.',
            ],
          },
        ],
      },
      {
        slug: 'webhooks-and-api',
        title: 'Webhooks & Automation',
        description: 'Deploy webhooks, CI integration and automating Peon.',
        sections: [
          {
            h: 'Deploy webhooks',
            p: [
              'Git-source services get provider webhooks automatically. Additionally, every service exposes a token-authenticated deploy webhook URL you can call from anywhere, a CI pipeline, a cron job, another system:',
            ],
            code: `curl -X POST \\
  https://your-peon-host/api/webhooks/deploy/<service-uuid>?token=<deploy-token>`,
          },
          {
            h: 'CI integration pattern',
            p: [
              'Let CI do what CI is good at (tests, checks) and let Peon do the deploying: run your pipeline on pull requests, and on merge to main either rely on the git webhook or call the deploy webhook as the final CI step. This keeps production SSH keys and registry credentials out of CI entirely.',
            ],
          },
          {
            h: 'Image-based CI flow',
            p: [
              'For image services, CI builds and pushes the image to a registry, then calls the deploy webhook. Peon pulls the new tag and performs the health-checked rollout.',
            ],
          },
        ],
      },
      {
        slug: 'notifications',
        title: 'Notifications',
        description: 'Deploy and service alerts to Slack, Discord, Telegram or email.',
        sections: [
          {
            h: 'Channels',
            p: [
              'Configure notification channels under Notifications: Slack and Discord via webhook URLs, Telegram via bot token and chat ID, and SMTP email. Use the test button to verify delivery before relying on a channel.',
            ],
          },
          {
            h: 'Events',
            p: [],
            list: [
              'Deployment succeeded / failed, the failed ones are the point',
              'Service health changes (a container flapping or stuck unhealthy)',
              'Database backup succeeded / failed',
              'Server resource thresholds (disk usage is the one that prevents 2 a.m. incidents)',
            ],
          },
          {
            h: 'Keeping alerts useful',
            p: [
              'Route alerts where the team already looks, and stay conservative: user-visible symptoms and leading indicators (disk 80%), not every event. An alert channel that cries wolf gets muted within a month.',
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Knowledge Base',
    pages: [
      {
        slug: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'The most common issues and how to diagnose them quickly.',
        sections: [
          {
            h: 'A deploy failed',
            p: [
              'Open the deployment\u2019s build log; the error is almost always there: a failing build step, a missing build-time variable, or a Dockerfile error. If the build succeeded but the rollout aborted, the new container failed its health check, check the service\u2019s runtime logs for the crash reason (missing runtime variable and database-not-reachable are the top two).',
            ],
          },
          {
            h: 'The app deployed but the domain does not work',
            p: [],
            list: [
              'DNS: dig +short your-domain must return the server IP; fix the record if not',
              'Certificate pending: check the proxy logs for ACME errors; usually DNS was not ready or port 80 is blocked',
              'Routing: confirm the domain is set on the service and the container is healthy',
              'Cloudflare users: SSL mode Full (strict), not Flexible',
            ],
          },
          {
            h: 'A container keeps restarting',
            p: [
              'Read the service logs for the crash loop\u2019s stack trace and check the exit code: 137 means out-of-memory (raise the limit or fix the leak), 1 is an application error, 127 means the command does not exist in the image. Missing environment variables and connecting to the database before it is ready are the two most common causes.',
            ],
          },
          {
            h: 'The server is out of disk',
            p: [
              'Run the server cleanup action to prune unused images, stopped containers and build cache. Check container log sizes; set daemon-level log rotation if a chatty service filled the disk. Schedule weekly cleanup on deploy-heavy hosts and alert at 80% disk usage.',
            ],
          },
          {
            h: 'SSH connection to a server fails',
            p: [
              '"Connection refused" means sshd is down or moved ports; "timed out" means a firewall drops packets, check the provider firewall allows port 22 from Peon\u2019s host, and the host firewall (ufw) allows SSH. Use your provider\u2019s web console to get on the box when SSH is unavailable.',
            ],
          },
        ],
      },
      {
        slug: 'contributing',
        title: 'Contributing',
        description:
          'Peon is open source. Here is how to set up a dev environment, find something to work on, and get your pull request merged.',
        sections: [
          {
            h: 'Ways to contribute',
            p: [
              'Contributions of every size are welcome. You do not need to ship a big feature to help:',
            ],
            list: [
              'Report bugs with reproduction steps, expected vs. actual behavior and logs',
              'Improve the documentation and guides',
              'Add or update one-click templates in the service catalog',
              'Pick up an open issue; comment on it first so work is not duplicated',
            ],
          },
          {
            h: 'Development setup',
            p: [
              'You need Node 20+, pnpm, Docker and a local PostgreSQL. Clone the repository and run:',
            ],
            code: `git clone https://github.com/peon-dev/peon.git
cd peon
pnpm install
cp .env.example .env        # set DATABASE_URL and secrets
pnpm prisma migrate dev     # create the local database
pnpm dev                    # web app on http://localhost:3000
pnpm worker                 # deployment worker, separate terminal`,
          },
          {
            h: 'Project layout',
            p: [],
            list: [
              'src/app - Next.js App Router: (marketing) public pages, (app) dashboard, (auth) login, api REST routes',
              'src/services/internal - server-side domain modules: deploy engine, backups, servers, services',
              'src/lib - shared utilities: docker helpers, ssh, templates, docs and blog content',
              'prisma - schema and migrations; worker - background job runner',
            ],
          },
          {
            h: 'Pull request guidelines',
            p: [],
            list: [
              'Branch from main and keep the PR focused; small PRs merge faster',
              'Run pnpm lint and pnpm test before pushing',
              'Schema changes must include a Prisma migration',
              'User-facing changes should update the docs too',
              'Test new one-click templates end-to-end on a real server',
            ],
          },
          {
            h: 'Adding a one-click template',
            p: [
              'Templates are compose-based entries in the service catalog. Use SERVICE_* magic variables for generated passwords, secrets and FQDNs so the template deploys with zero manual editing. Include a slogan, tags and a category so it is discoverable in the marketplace.',
            ],
          },
        ],
      },
    ],
  },
];

export const ALL_DOC_PAGES: DocPage[] = DOC_GROUPS.flatMap((g) => g.pages);

export function getDocPage(slug: string): DocPage | undefined {
  return ALL_DOC_PAGES.find((p) => p.slug === slug);
}

export function docGroupFor(slug: string): DocGroup | undefined {
  return DOC_GROUPS.find((g) => g.pages.some((p) => p.slug === slug));
}
