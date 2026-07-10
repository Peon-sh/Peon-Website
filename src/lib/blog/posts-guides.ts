import type { BlogPost } from './types';

export const GUIDE_POSTS: BlogPost[] = [
  {
    slug: 'deploy-nextjs-to-vps',
    title: 'How to Deploy a Next.js App to a VPS (Hetzner, DigitalOcean)',
    description:
      'Step-by-step guide to deploying Next.js on your own VPS with Docker, automatic HTTPS and git-push deploys, no Vercel required.',
    category: 'guide',
    keywords: ['deploy nextjs vps', 'nextjs docker', 'nextjs hetzner', 'nextjs without vercel'],
    date: '2026-05-01',
    readingMinutes: 10,
    sections: [
      {
        h: 'What you are building',
        p: [
          'By the end of this guide you will have a Next.js app running on your own VPS with the full production workflow: push to your Git branch, the server builds a Docker image, swaps containers with zero downtime, and serves your custom domain over automatically renewed HTTPS. No Vercel, no per-seat pricing, and everything about the setup is portable to any provider.',
          'Prerequisites: a VPS (a $4 Hetzner CX22 or a $6 DigitalOcean Droplet is plenty for most apps), a domain you control, and a Next.js project in GitHub or GitLab. Total setup time is around 30 minutes the first time.',
        ],
      },
      {
        h: 'Step 1: enable standalone output',
        p: [
          'Next.js has a purpose-built mode for self-hosting. With standalone output, next build traces exactly which files the production server needs and emits a minimal bundle, cutting your final image from over a gigabyte to roughly 150 MB:',
        ],
        code: `// next.config.js
module.exports = {
  output: 'standalone',
};`,
      },
      {
        h: 'Step 2: add a Dockerfile',
        p: [
          'A multi-stage build keeps build tooling out of the runtime image. This recipe works for the App Router and Pages Router alike:',
        ],
        code: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
        list: [
          'The static and public folders are NOT included in standalone output; forgetting to copy them is the most common cause of a deployed app with 404ing assets',
          'NEXT_PUBLIC_* variables are baked in at build time, so they must be present during the build, not just at runtime',
        ],
      },
      {
        h: 'Step 3: connect your server and deploy',
        p: [
          'Connect the VPS to Peon by providing its IP and an SSH key. The platform installs Docker, creates the shared network and starts a Traefik reverse proxy that will own ports 80 and 443. Then create a Git-app service: pick your repository and branch, and Peon registers a webhook so every push triggers a build.',
          'Set your domain on the service (say app.example.com), create an A record pointing at the server IP, and deploy. The first build clones the repo, builds the image on the server, starts the container on the proxy network and requests a Let\u2019s Encrypt certificate. Subsequent pushes reuse the Docker layer cache, so typical rebuilds finish in under a minute.',
        ],
      },
      {
        h: 'Step 4: environment variables done right',
        p: [
          'Next.js splits variables into two classes and self-hosters trip on the difference constantly. Anything prefixed NEXT_PUBLIC_ is inlined into the client bundle at build time: set these as build-time variables. Server-only secrets (database URLs, API keys) are read at runtime from process.env: set these as runtime variables. In Peon both live in the service\u2019s environment tab, encrypted at rest, with a flag for build-time exposure.',
          'A useful sanity check: if you change a NEXT_PUBLIC_ value and do not see it after redeploying, you changed it at runtime only, trigger a rebuild.',
        ],
      },
      {
        h: 'What about ISR, images and middleware?',
        p: [
          'Everything works, because you are running the real Next.js server rather than a serverless adaptation. ISR revalidates on the schedule you set (the cache lives on the container filesystem), next/image optimizes on demand out of the box, and middleware runs in the Node process. The features that need attention are multi-instance concerns: if you later scale to several replicas, move the ISR cache to a shared handler. On a single VPS, defaults just work.',
        ],
      },
      {
        h: 'Zero-downtime deploys and rollbacks',
        p: [
          'On each deploy the platform starts the new container alongside the old one, waits for a health check to pass, switches the proxy route, then drains and stops the old container. Users never see a gap. If a deploy ships a bug, rollback re-points at the previous image in seconds since it is still on the host.',
          'Add a simple health endpoint (an app/api/health/route.ts returning 200) so the health check verifies real readiness rather than just an open port.',
        ],
      },
      {
        h: 'Cost and performance recap',
        p: [],
        list: [
          'Hosting: $4 to $8 VPS runs several Next.js apps; Peon adds $2 per project',
          'Cold starts: none, the Node process stays warm, first request after deploy is fast',
          'Database latency: put Postgres on the same server and queries drop below a millisecond',
          'Scaling path: resize the VPS (minutes), then split database to a second server, then add replicas, years of headroom before anything exotic',
        ],
      },
    ],
  },
  {
    slug: 'deploy-nodejs-app-docker',
    title: 'Deploying a Node.js App with Docker: A Production Checklist',
    description:
      'From Dockerfile to health checks: everything you need to run Node.js in production containers on your own server.',
    category: 'guide',
    keywords: ['deploy nodejs docker', 'node production docker', 'nodejs vps deployment'],
    date: '2026-05-02',
    readingMinutes: 9,
    sections: [
      {
        h: 'The production-grade Dockerfile',
        p: [
          'Most Node Dockerfile problems come from copying a development setup into production. The production image should contain your code, production dependencies and nothing else, and it should not run as root:',
        ],
        code: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USER node
EXPOSE 3000
CMD ["node", "src/index.js"]`,
        list: [
          'npm ci, not npm install: reproducible installs from the lockfile, and it fails loudly when the lockfile is stale',
          'NODE_ENV=production: many libraries (Express included) enable significant optimizations based on it',
          'USER node: the official images ship a non-root user; using it limits the blast radius of any container escape',
          'Add a .dockerignore with node_modules, .git, .env and build output, smaller context, faster builds, no leaked secrets',
        ],
      },
      {
        h: 'Signals: the bug everyone ships once',
        p: [
          'When a deploy replaces your container, Docker sends SIGTERM and waits (10 seconds by default) before SIGKILL. Two things go wrong in default setups. First, `CMD ["npm", "start"]` makes npm PID 1, and npm does not forward signals to your process, so your app never hears SIGTERM and gets hard-killed mid-request. Always exec node directly.',
          'Second, even when the signal arrives, the default behaviour is instant exit, dropping in-flight requests. Add a graceful shutdown handler:',
        ],
        code: `const server = app.listen(3000);
process.on('SIGTERM', () => {
  server.close(() => process.exit(0));   // stop accepting, finish in-flight
  setTimeout(() => process.exit(1), 8000).unref(); // safety valve
});`,
      },
      {
        h: 'Health checks that mean something',
        p: [
          'A health endpoint that returns 200 unconditionally only proves the process exists. A useful one verifies the app can serve: event loop responsive, critical dependencies reachable. Keep it cheap enough to call every ten seconds, and never put it behind auth.',
          'Wire it into the container so the platform can gate rollouts and auto-restart wedged containers: with a health check defined, a zero-downtime deploy only switches traffic once the new container actually works, and a container that stops responding gets replaced instead of silently serving errors.',
        ],
      },
      {
        h: 'Logging and configuration',
        p: [
          'Log to stdout in JSON (pino is the standard choice) and let the runtime collect it; never write log files inside the container. Read configuration exclusively from environment variables, validate it at boot with a schema (envalid or zod), and crash immediately on missing values, a config error at deploy time is a footnote; the same error discovered at 3 a.m. is an incident.',
        ],
      },
      {
        h: 'The deployment pipeline',
        p: [
          'With the image solid, the pipeline is the platform\u2019s job. Push to your branch and Peon builds on the server, injects environment variables (encrypted at rest), performs the health-checked container swap and streams logs to the dashboard. Workers deploy as a second service from the same repo with a different start command, and rollback re-points at the previous image in seconds.',
        ],
      },
      {
        h: 'Pre-launch checklist',
        p: [],
        list: [
          'CMD execs node directly (signals reach your process)',
          'Graceful shutdown on SIGTERM tested locally with docker stop',
          'Health endpoint checks dependencies, wired into the container healthcheck',
          'NODE_ENV=production and config validated at boot',
          'Logs are JSON on stdout; log rotation configured on the host daemon',
          'Memory ceiling known (node --max-old-space-size set relative to container limit)',
        ],
      },
    ],
  },
  {
    slug: 'deploy-django-vps',
    title: 'How to Deploy Django on a VPS with Docker and Postgres',
    description:
      'Deploy Django with Gunicorn, Postgres and automatic HTTPS on a $5 VPS. Includes Dockerfile, static files and migration strategy.',
    category: 'guide',
    keywords: ['deploy django vps', 'django docker production', 'django gunicorn deployment', 'django postgres'],
    date: '2026-05-03',
    readingMinutes: 10,
    sections: [
      {
        h: 'The stack, and why each piece',
        p: [
          'A production Django deployment on a VPS has four moving parts: Gunicorn running your WSGI app (the dev server is explicitly not for production), WhiteNoise serving static files from inside the app (eliminating the separate nginx container the old guides required), Postgres as a managed database on the same server, and a reverse proxy in front handling TLS.',
          'This shape keeps the whole stack on one machine, which means your ORM queries travel microseconds instead of a cross-provider network hop, typically the single biggest performance difference people notice after leaving a PaaS.',
        ],
      },
      {
        h: 'The Dockerfile',
        p: [],
        code: `FROM python:3.13-slim
ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN python manage.py collectstatic --noinput
EXPOSE 8000
CMD ["gunicorn", "config.wsgi", "-b", "0.0.0.0:8000", \\
     "--workers", "3", "--timeout", "60", "--access-logfile", "-"]`,
        list: [
          'PYTHONUNBUFFERED=1 makes logs appear in real time instead of after buffer flushes',
          'collectstatic at build time bakes static files into the image; WhiteNoise serves them with proper caching headers',
          'Workers rule of thumb: 2 x CPU cores + 1; three workers suits a 1 to 2 vCPU VPS',
        ],
      },
      {
        h: 'Production settings that matter',
        p: ['Django\u2019s deployment checklist (manage.py check --deploy) is worth running, but these are the essentials:'],
        list: [
          'DEBUG=False and SECRET_KEY from environment variables, never in the repo',
          'ALLOWED_HOSTS=["app.example.com"], Django refuses other Host headers',
          'SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https") so Django knows requests arrived over TLS at the proxy',
          'CSRF_TRUSTED_ORIGINS=["https://app.example.com"] for Django 4+ form posts behind a proxy',
          'DATABASE_URL parsed with dj-database-url, pointing at the private-network Postgres hostname',
          'Media uploads to S3-compatible storage via django-storages, container disk is ephemeral by design',
        ],
      },
      {
        h: 'Provision Postgres and connect',
        p: [
          'Create a managed Postgres service on the same server; with Peon that is one click and includes scheduled dumps to S3-compatible storage with retention. The database never publishes a public port: your app reaches it by service name over the private Docker network, so DATABASE_URL looks like postgres://app:password@postgres-abc123:5432/appdb.',
        ],
      },
      {
        h: 'Migrations on every deploy',
        p: [
          'Run `python manage.py migrate` as a release step before the new container takes traffic; platforms expose this as a pre-start or release command. Because zero-downtime deploys briefly run old and new code side by side, keep each migration backward-compatible with the previous release: add columns as nullable first, backfill, then tighten in a later deploy. Never rename a column in one step on a live app.',
        ],
      },
      {
        h: 'Background tasks and cron',
        p: [
          'Celery workers deploy as a second service from the same image with a different command (celery -A config worker), sharing environment variables and the Docker network with your web service. Redis as the broker is a one-click template. Periodic jobs (clearing sessions, sending digests) run as scheduled tasks executing manage.py commands, replacing the crontab you would otherwise maintain by hand.',
        ],
      },
      {
        h: 'Cost recap',
        p: [
          'Web, worker, Postgres and Redis on one $8 4 GB VPS, plus $2 for the project: about $10 a month for a production Django setup that the equivalent managed stack (Heroku dynos plus Standard Postgres plus Redis) prices at $100 or more. The workflow, push to deploy, logs in a dashboard, one-click rollback, is the same.',
        ],
      },
    ],
  },
  {
    slug: 'deploy-rails-docker',
    title: 'Deploying Ruby on Rails with Docker in 2026',
    description:
      'Rails 8 ships Docker-ready. Deploy it to your own server with Postgres, Solid Queue and automatic SSL in under an hour.',
    category: 'guide',
    keywords: ['deploy rails docker', 'rails vps deployment', 'rails 8 deploy', 'rails production docker'],
    date: '2026-05-04',
    readingMinutes: 9,
    sections: [
      {
        h: 'Rails is Docker-native now',
        p: [
          'Since Rails 7.1, every new application generates a production-grade Dockerfile: multi-stage build, jemalloc for memory efficiency, Thruster in front of Puma for asset serving and compression, and a bootsnap-precompiled boot. The days of hunting for a community Rails Docker recipe are over; `rails new` output deploys as-is on any container platform.',
          'Rails 8 doubled down on the single-server story with the Solid trilogy: Solid Queue (jobs), Solid Cache and Solid Cable all run on your relational database, which means a complete production Rails app can genuinely be two containers: web and Postgres.',
        ],
      },
      {
        h: 'The minimal production topology',
        p: [],
        list: [
          'Web service: your repo\u2019s generated Dockerfile, deployed as a git app; Thruster listens on port 80 in-container',
          'Postgres: managed database service on the same server, private network only, scheduled S3 backups',
          'Optional worker: same image, command bin/jobs, only needed if you move job processing off the web container',
          'No Redis required unless you add features that want it, Solid Queue and Solid Cache use Postgres',
        ],
      },
      {
        h: 'Secrets: the master key',
        p: [
          'Rails encrypts credentials.yml.enc in the repo and needs RAILS_MASTER_KEY to decrypt it at boot. Set that key as an encrypted environment variable in your platform dashboard, never bake it into the image or commit config/master.key. DATABASE_URL overrides database.yml, so wiring ActiveRecord to your managed Postgres is one variable.',
          'A subtle build-time note: asset precompilation runs during the image build without real secrets; the generated Dockerfile uses a dummy SECRET_KEY_BASE for that stage, which is correct and safe.',
        ],
      },
      {
        h: 'Migrations and health checks',
        p: [
          'Run bin/rails db:migrate as the release command before each new container takes traffic. Rails 7.1+ ships a health endpoint at /up that returns 200 once the app boots, point the container health check at it and zero-downtime deploys gate on real readiness. Keep migrations backward-compatible with the running release (add columns nullable, backfill, tighten later) since old and new code overlap briefly during rollout.',
        ],
      },
      {
        h: 'Operating it',
        p: [
          'Push to deploy; watch the build in the dashboard; roll back in one click if a release misbehaves. Set the Postgres backup schedule (nightly, with 7 daily and 4 weekly retained, is a sane default) and test a restore once, before you need it. Logs stream from the container; RAILS_LOG_TO_STDOUT is already the containerized default.',
          'Total bill for a production Rails app with database and backups: a $6 to $8 VPS plus $2 for the project. Compare that with the $50-plus a comparable managed dyno-and-Postgres pairing costs, with the same push-to-deploy workflow.',
        ],
      },
    ],
  },
  {
    slug: 'deploy-laravel-vps',
    title: 'How to Deploy Laravel on Your Own Server with Docker',
    description:
      'Deploy Laravel with PHP-FPM, queues and scheduled jobs on a VPS. A modern alternative to Forge plus separate server management.',
    category: 'guide',
    keywords: ['deploy laravel vps', 'laravel docker production', 'laravel forge alternative', 'laravel octane deploy'],
    date: '2026-05-05',
    readingMinutes: 10,
    sections: [
      {
        h: 'Choose your runtime: FPM or Octane',
        p: [
          'Classic PHP-FPM behind nginx is the battle-tested default: each request gets a fresh application boot, which is forgiving of sloppy state but pays the bootstrap cost every time. Laravel Octane keeps the framework booted in a persistent process and serves requests at several times the throughput.',
          'For containers, Octane on FrankenPHP is the sweet spot: FrankenPHP is a single binary that speaks HTTP directly (no separate nginx layer), understands early hints and HTTP/3, and makes the Dockerfile dramatically simpler:',
        ],
        code: `FROM dunglas/frankenphp:php8.4
RUN install-php-extensions pdo_pgsql pdo_mysql redis pcntl opcache
COPY . /app
WORKDIR /app
RUN composer install --no-dev --optimize-autoloader \\
 && php artisan config:cache && php artisan route:cache && php artisan view:cache
EXPOSE 8000
CMD ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0", "--port=8000"]`,
      },
      {
        h: 'The full service topology',
        p: ['A production Laravel app is typically four services, all from the same image or templates:'],
        list: [
          'Web: the Octane container above, behind the reverse proxy with automatic HTTPS',
          'Queue worker: same image, command php artisan queue:work --tries=3 --max-time=3600',
          'Scheduler: php artisan schedule:run executed every minute as a scheduled task (replaces the crontab entry)',
          'Database and Redis: managed services on the same server; MySQL or Postgres for data, Redis for queues, cache and sessions',
        ],
      },
      {
        h: 'Configuration and storage',
        p: [
          'Move every .env value into platform environment variables; APP_KEY especially must be set (generate once with php artisan key:generate --show) or encrypted cookies and sessions break on every deploy. Cache config at build time as in the Dockerfile above, and remember that config:cache means env() calls only work inside config files, a classic Laravel deployment gotcha.',
          'Point FILESYSTEM_DISK at S3-compatible storage for user uploads: container disks are replaced on every deploy by design. MinIO on the same server or Cloudflare R2 both work with the standard league/flysystem-aws-s3-v3 driver.',
        ],
      },
      {
        h: 'Octane-specific care',
        p: [
          'Because Octane reuses the booted framework across requests, per-request state must actually be per-request: avoid static properties that accumulate, be careful with singletons that capture request data, and read the Octane documentation\u2019s short list of patterns to avoid. Most apps need zero changes; apps with creative service providers need a review.',
        ],
      },
      {
        h: 'Why this beats the Forge model',
        p: [
          'Forge provisions mutable PHP servers well, but you pay $12 or more a month for the tool, servers drift as packages update in place, and reproducing a server after a disaster is a checklist rather than a command. Container deploys make every release an immutable artifact: identical between staging and production, instantly rollback-able, and rebuildable from the repo on any fresh VPS.',
          'On costs: Forge plus a $12 DigitalOcean droplet is about $24 a month before backups. The containerized equivalent on Peon is the same droplet plus $2, with database backups to S3 and unlimited team members included.',
        ],
      },
    ],
  },
  {
    slug: 'deploy-go-app',
    title: 'Deploying Go Applications: The Smallest Docker Images You\u2019ll Ever Ship',
    description:
      'Go compiles to a single static binary, perfect for containers. Build 10 MB images and deploy them to your VPS with zero-downtime rollouts.',
    category: 'guide',
    keywords: ['deploy go app', 'golang docker', 'go static binary docker', 'scratch docker image'],
    date: '2026-05-06',
    readingMinutes: 8,
    sections: [
      {
        h: 'Go was made for this',
        p: [
          'Go compiles to a single statically linked binary with no runtime, no interpreter and no system dependencies. That makes it the best-case scenario for containerization: the final image is your binary plus a few kilobytes of metadata, it starts in milliseconds, and there is no dependency tree to patch. Where a Node image fights to get under 150 MB, a Go image lands under 15 MB without trying.',
        ],
      },
      {
        h: 'The production Dockerfile',
        p: [],
        code: `FROM golang:1.24-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download          # cached layer: re-runs only when deps change
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app ./cmd/server

FROM gcr.io/distroless/static-debian12
COPY --from=build /app /app
EXPOSE 8080
ENTRYPOINT ["/app"]`,
        list: [
          'CGO_ENABLED=0 forces pure-Go networking and DNS, making the binary truly static',
          '-ldflags="-s -w" strips debug symbols, roughly 30% smaller binaries',
          'Copying go.mod/go.sum before the source means dependency downloads cache across code changes, keeping rebuilds in the seconds',
        ],
      },
      {
        h: 'Why distroless beats scratch',
        p: [
          'Pure `FROM scratch` images work until they mysteriously do not: HTTPS calls fail because there are no CA certificates, and time handling misbehaves because there is no tzdata. Distroless static includes CA certs, tzdata and a nonroot user in about 2 MB, eliminating the whole class of "works locally, fails in prod" surprises while staying effectively as small.',
        ],
      },
      {
        h: 'Graceful shutdown and health',
        p: ['Zero-downtime deploys need the binary to cooperate on two points, both a few lines in Go:'],
        code: `srv := &http.Server{Addr: ":8080", Handler: mux}
go srv.ListenAndServe()

stop := make(chan os.Signal, 1)
signal.Notify(stop, syscall.SIGTERM, os.Interrupt)
<-stop
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
srv.Shutdown(ctx)  // stop accepting, drain in-flight requests`,
        list: [
          'Add a /healthz handler that verifies dependencies (DB ping) and wire it as the container health check',
          'With both in place, rollouts overlap old and new containers with zero dropped requests',
        ],
      },
      {
        h: 'Deploy and operate',
        p: [
          'Point the Git repo at your server as a Peon service: builds take seconds (module cache plus tiny images), deploys and rollbacks are near-instant because moving 10 MB is nothing, and a 2 GB VPS hosts a small fleet of Go services, each idling at 10 to 30 MB of RSS. Cross-compilation is also trivial if you ever target ARM servers: set GOARCH=arm64 and the same Dockerfile works on a Hetzner CAX or a Raspberry Pi.',
        ],
      },
    ],
  },
  {
    slug: 'deploy-static-site-own-server',
    title: 'Host a Static Site on Your Own Server with Free SSL',
    description:
      'Serve Astro, Hugo or plain HTML from a $4 VPS with automatic HTTPS and CDN caching. Cheaper and faster than you think.',
    category: 'guide',
    keywords: ['host static site vps', 'static site nginx docker', 'astro deploy vps', 'hugo deploy'],
    date: '2026-05-07',
    readingMinutes: 8,
    sections: [
      {
        h: 'Why self-host static sites at all',
        p: [
          'Static hosting SaaS is easy right up until the pricing cliff: bandwidth overages, per-seat team plans, build-minute quotas. Meanwhile a static site is the cheapest workload in computing, files behind a web server, and a $4 VPS serves thousands of requests per second and terabytes a month. If you already run a VPS for apps, static sites ride along for free; agencies routinely consolidate 30-plus client sites on one small machine.',
        ],
      },
      {
        h: 'The build-and-serve pattern',
        p: ['Build the site in one stage, serve the output with nginx in a tiny final image. Works for Astro, Hugo, Eleventy, Vite, Jekyll, Next.js export, anything that emits a folder of files:'],
        code: `FROM node:22-alpine AS build
WORKDIR /site
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build            # emits ./dist

FROM nginx:alpine
COPY --from=build /site/dist /usr/share/nginx/html
# optional: custom nginx.conf for SPA fallback / cache headers`,
      },
      {
        h: 'Or skip the Dockerfile entirely',
        p: [
          'A static-site service in Peon asks for three things: the repository, the build command and the publish directory. It builds on the server, serves the output behind the proxy, and issues the HTTPS certificate. Every push to the branch rebuilds and atomically swaps the content, so a broken build never half-deploys.',
        ],
      },
      {
        h: 'Cache headers and the CDN layer',
        p: [
          'Two rules cover static caching: hashed assets (main.abc123.js) are immutable, cache them for a year; HTML is the entry point, cache it briefly or not at all. Modern generators hash assets by default, so the config is small.',
          'For global reach, put Cloudflare\u2019s free tier in front: your DNS moves to Cloudflare, the orange-cloud proxy caches assets at 300+ edge locations, absorbs abusive traffic and gives you analytics. Origin bandwidth drops to cache-miss traffic only, and worldwide latency becomes competitive with any dedicated static host.',
        ],
        code: `# nginx: long cache for hashed assets, short for HTML
location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
location / { add_header Cache-Control "public, max-age=300"; }`,
      },
      {
        h: 'SPA routing and previews',
        p: [],
        list: [
          'Single-page apps need a fallback so /dashboard/settings serves index.html: try_files $uri /index.html; in nginx',
          'Preview environments: deploy feature branches as separate services on subdomains (pr-42.preview.example.com), a wildcard DNS record makes this zero-config',
          'Forms and functions: a small API container on the same server replaces serverless form handlers, without submission caps',
        ],
      },
    ],
  },
  {
    slug: 'docker-compose-production-deployment',
    title: 'Running Docker Compose in Production: A Practical Guide',
    description:
      'Docker Compose is production-ready for single-host deployments. Learn restart policies, health checks, networks and update strategies.',
    category: 'guide',
    keywords: ['docker compose production', 'compose deploy', 'docker compose best practices'],
    date: '2026-05-08',
    readingMinutes: 10,
    sections: [
      {
        h: 'Yes, Compose is production-ready',
        p: [
          'The advice that Compose is "only for development" dates from before restart policies, health checks, depends_on conditions and profiles existed. For single-host workloads, which describes the majority of real-world deployments, a compose file is a perfectly good production spec: declarative, versionable, and understood by every tool and every engineer.',
          'What Compose does not do is multi-node orchestration and automated rollouts. The first you may never need; the second is what a deployment platform adds on top, driving Compose-shaped deployments with health-gated container swaps.',
        ],
      },
      {
        h: 'The non-negotiables',
        p: ['Five settings separate a dev compose file from a production one:'],
        list: [
          'restart: unless-stopped on every long-running service, so a crash or reboot self-heals',
          'healthcheck: on anything with dependents, and depends_on with condition: service_healthy so the app waits for the database to be ready, not merely started',
          'Named volumes for all state; never bind-mount a database to a casual host path',
          'Pinned image tags (postgres:17.2, not postgres:latest): latest turns every pull into a surprise upgrade',
          'No published ports except the reverse proxy: services talk over the internal network; the proxy owns 80/443',
        ],
      },
      {
        h: 'A production skeleton',
        p: [],
        code: `services:
  app:
    build: .
    restart: unless-stopped
    environment:
      DATABASE_URL: postgres://app:\${DB_PASSWORD}@db:5432/app
    depends_on:
      db:
        condition: service_healthy
    networks: [internal, proxy]

  db:
    image: postgres:17.2
    restart: unless-stopped
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 10s
      retries: 5
    networks: [internal]

volumes:
  db-data:
networks:
  internal:
  proxy:
    external: true`,
      },
      {
        h: 'Secrets and configuration',
        p: [
          'The compose file in Git should contain ${PLACEHOLDERS}, never values. Inject real values at deploy time from your platform: Peon stores variables encrypted at rest and renders them when it deploys the stack, and workspace-level shared variables let ten services reference one API key without duplication. Run `docker compose config` locally to see the fully interpolated result when debugging.',
        ],
      },
      {
        h: 'Updates, rollbacks and disk hygiene',
        p: [
          'For stateless services, pulling new images and re-running up -d replaces containers with the new definition; with health checks in place, a platform-driven rollout only shifts traffic to containers that pass. Keep the previous image on disk and rollback is re-tagging and re-upping, seconds, not a rebuild.',
          'Two operational habits keep a compose host healthy for years: schedule image and build-cache pruning (deploy-heavy hosts accumulate gigabytes weekly), and cap container log size in the Docker daemon config so a chatty service cannot fill the disk.',
        ],
      },
      {
        h: 'When you have outgrown it',
        p: [
          'Signals that single-host Compose is no longer enough: sustained load beyond what vertical scaling covers, a hard requirement to survive node failure in seconds, or several teams needing isolated slices of shared infrastructure. Until one of those is concretely true, the simplicity dividend of Compose on a well-sized VPS compounds every week.',
        ],
      },
    ],
  },
  {
    slug: 'postgres-backup-s3',
    title: 'Automated Postgres Backups to S3: Set It and Forget It',
    description:
      'A reliable pg_dump strategy with retention policies, S3-compatible storage and tested restores, for self-hosted Postgres.',
    category: 'guide',
    keywords: ['postgres backup s3', 'pg_dump automation', 'self-hosted postgres backup', 'database backup docker'],
    date: '2026-05-09',
    readingMinutes: 9,
    sections: [
      {
        h: 'The two failure modes you are insuring against',
        p: [
          'Database backups protect against two very different disasters. The first is infrastructure loss: disk failure, a deleted server, a provider account problem. The second, and far more common, is data mistakes: a bad migration, a buggy bulk update, a DELETE without a WHERE. The first needs an offsite copy; the second needs history, because you discover the damage days later and need the state from before it happened. A good strategy covers both; a single nightly overwrite covers neither well.',
        ],
      },
      {
        h: 'The baseline: scheduled logical dumps',
        p: [
          'For databases under roughly 50 GB, pg_dump is simple, portable and battle-tested. Dump in custom format for compression and selective restore:',
        ],
        code: `# inside or against the container
pg_dump -U app -Fc appdb > backup-$(date +%F).dump

# verify the archive is readable (cheap, catches corruption)
pg_restore --list backup-2026-05-09.dump > /dev/null && echo OK`,
        list: [
          '-Fc (custom format) compresses and lets you restore single tables later',
          'Dump from a scheduled job on the server, not your laptop',
          'Above ~50 GB, or with strict recovery-point requirements, graduate to WAL archiving (pgBackRest or wal-g) for point-in-time recovery',
        ],
      },
      {
        h: 'Ship dumps off the server',
        p: [
          'A backup on the same disk as the database protects against exactly nothing that matters. Push every dump to S3-compatible object storage in a different failure domain: AWS S3, Cloudflare R2, Backblaze B2 or Hetzner Object Storage. For backup volumes, R2 and B2 are the price leaders, both around half a cent per GB-month, with free or nearly free egress when you need to restore.',
          'Give the upload credentials write-but-not-delete permissions where the provider supports it, so a compromised server cannot destroy its own history, and enable bucket versioning as a second line of defense.',
        ],
      },
      {
        h: 'Retention that matches how mistakes are discovered',
        p: [
          'The industry-standard grandfather-father-son rotation exists because data mistakes surface late. Keep 7 daily, 4 weekly and 6 monthly dumps: that answers "restore yesterday" and "what did this table look like in February" while capping storage at 17 archives per database.',
          'Peon\u2019s managed databases implement this as configuration: pick the schedule, the retention counts and the S3 destination in the dashboard, and the platform runs the dumps, uploads, pruning and integrity checks. Restores are a click, into the live database or a scratch one.',
        ],
      },
      {
        h: 'Test restores, on a calendar',
        p: [
          'An untested backup is a hope, not a plan, and backup systems fail silently: credentials expire, disks fill, a schema change breaks the dump command. Quarterly, restore the newest dump into a scratch database, run a row-count sanity query against production, and time the whole procedure. That timing is your real recovery time; learning it in a drill beats learning it in an outage.',
        ],
        code: `createdb restore_test
pg_restore -d restore_test --no-owner backup-2026-05-09.dump
psql restore_test -c "SELECT count(*) FROM users;"`,
      },
      {
        h: 'The checklist',
        p: [],
        list: [
          'Nightly pg_dump -Fc, automated on the server',
          'Uploaded to S3-compatible storage in a different provider or region',
          '7/4/6 retention pruning, automated',
          'Bucket versioning on; upload credentials cannot delete',
          'Quarterly restore drill with a timed, written procedure',
          'Alert if a backup fails or is smaller than expected, silence must be suspicious',
        ],
      },
    ],
  },
  {
    slug: 'self-host-plausible-analytics',
    title: 'Self-Host Plausible Analytics: Own Your Website Data',
    description:
      'Run privacy-friendly, cookie-free analytics on your own server. One-click Plausible deployment with Postgres and ClickHouse included.',
    category: 'guide',
    keywords: ['self-host plausible', 'plausible docker', 'google analytics alternative', 'privacy analytics'],
    date: '2026-05-10',
    readingMinutes: 8,
    sections: [
      {
        h: 'Why Plausible over Google Analytics',
        p: [
          'Plausible is the leading privacy-first analytics tool: a script under 1 KB (GA4\u2019s tag weighs roughly 50x more), no cookies, no cross-site tracking, and a one-page dashboard a human can read without training. Because it collects no personal data, most deployments need no cookie-consent banner for analytics, and the compliance story under GDPR is dramatically simpler.',
          'The hosted service starts at \u20ac9 a month with visitor caps. Self-hosting the Community Edition (AGPL) removes the caps and the fee, and keeps visitor data entirely on infrastructure you control, which for some organisations is the whole point.',
        ],
      },
      {
        h: 'The stack and deployment',
        p: [
          'Plausible CE is three containers: the Phoenix app, Postgres for accounts and site metadata, and ClickHouse for the events themselves. As a one-click template in Peon, the stack deploys with generated secrets, correct inter-service wiring and persistent volumes; you supply a domain like analytics.example.com and HTTPS is issued automatically.',
          'Two settings deserve attention at deploy time: BASE_URL must match your final public URL exactly (scheme included), and the first account you register becomes the admin, register immediately after deploy, then disable open registration.',
        ],
      },
      {
        h: 'Sizing and resource reality',
        p: [],
        list: [
          'ClickHouse is the hungry component: plan about 2 GB RAM for the full stack to be comfortable',
          'CPU is negligible at small scale; event ingestion is lightweight',
          'Disk grows with events: roughly 1 GB per few million pageviews, cheap to provision',
          'A shared 4 GB VPS runs Plausible alongside two or three apps for sites into the millions of monthly views',
        ],
      },
      {
        h: 'Connect your sites',
        p: [],
        code: `<script defer data-domain="example.com"
  src="https://analytics.example.com/js/script.js"></script>`,
        list: [
          'Add the snippet to every site\u2019s <head>; one Plausible instance tracks unlimited sites',
          'Ad blockers block third-party analytics domains less often when you serve from your own domain, one of self-hosting\u2019s quiet accuracy wins',
          'Optional: proxy the script through the site\u2019s own origin for even higher capture rates',
        ],
      },
      {
        h: 'Operations',
        p: [
          'Back up Postgres nightly (site configs, users, goals live there); ClickHouse events are bulkier and arguably re-accumulable, back them up weekly or accept the trade-off consciously. Upgrades are image-tag bumps followed by a redeploy; Plausible migrates its schemas on boot. Total running cost on an existing server: effectively zero, versus \u20ac9 or more monthly hosted, with the data sovereignty as the bonus rather than the price.',
        ],
      },
    ],
  },
  {
    slug: 'self-host-n8n-automation',
    title: 'Self-Host n8n: Unlimited Workflow Automation Without Zapier Pricing',
    description:
      'Run n8n on your own VPS and replace per-task Zapier billing with unlimited executions. Setup, webhooks and persistence explained.',
    category: 'guide',
    keywords: ['self-host n8n', 'n8n docker', 'zapier alternative', 'workflow automation self-hosted'],
    date: '2026-05-11',
    readingMinutes: 8,
    sections: [
      {
        h: 'The Zapier math that drives people here',
        p: [
          'Zapier bills per task, and tasks multiply invisibly: a workflow polling every 5 minutes burns about 8,600 executions a month before doing anything useful, and each step in a Zap counts separately. Teams routinely find themselves in $50 to $200 a month tiers for automations that move a modest amount of data.',
          'n8n self-hosted executes unlimited workflows for the cost of the VPS it runs on. It matches the 400-plus integration catalog closely enough for most needs, and surpasses Zapier for technical users: JavaScript/Python code nodes, branching and loops, error workflows, and direct HTTP/webhook nodes for any API without a pre-built connector.',
        ],
      },
      {
        h: 'Deployment essentials',
        p: ['Three settings make the difference between a toy install and a reliable one:'],
        list: [
          'Persistent volume for /home/node/.n8n: workflows, credentials and the encryption key live there; lose it and you lose everything',
          'WEBHOOK_URL=https://n8n.example.com: without it, webhook trigger nodes register unreachable localhost URLs, the most common n8n-in-Docker complaint',
          'HTTPS via the platform proxy, always: n8n stores OAuth tokens and API keys for your other services, treat it like a secrets vault',
        ],
        code: `# key environment variables
WEBHOOK_URL=https://n8n.example.com
N8N_HOST=n8n.example.com
N8N_PROTOCOL=https
GENERIC_TIMEZONE=Asia/Kolkata`,
      },
      {
        h: 'Postgres for production',
        p: [
          'The default SQLite database is fine for evaluation; switch to Postgres (DB_TYPE=postgresdb plus connection variables) once workflows matter. You get robust concurrent writes, a queryable execution history, and a database that participates in your normal backup regime. A small managed Postgres on the same server, one click in Peon, is exactly right.',
        ],
      },
      {
        h: 'Operational tips from real deployments',
        p: [],
        list: [
          'Prune execution history: EXECUTIONS_DATA_MAX_AGE=336 (14 days) keeps the database from growing unbounded',
          'Back up both the volume (encryption key!) and the database; credentials are useless without the key that decrypts them',
          'Set up an error workflow that notifies Slack/Telegram when any workflow fails, silent automation failures are the expensive kind',
          'Queue mode with Redis and worker containers exists for heavy scale; ignore it until you run hundreds of concurrent executions',
          '1 GB of RAM is comfortable for typical workloads; code nodes processing large payloads want more',
        ],
      },
      {
        h: 'What to build first',
        p: [
          'Good first automations that prove the value in an afternoon: deploy notifications enriched with commit info to Slack, daily database health digests, form submissions routed to CRM plus email, and uptime-alert escalation. Each of these would be a multi-step paid Zap; on your own n8n they are free forever.',
        ],
      },
    ],
  },
  {
    slug: 'self-host-uptime-kuma',
    title: 'Self-Host Uptime Kuma: Free Status Monitoring for All Your Services',
    description:
      'Monitor websites, APIs, containers and cron jobs with Uptime Kuma, a beautiful self-hosted alternative to UptimeRobot and Pingdom.',
    category: 'guide',
    keywords: ['uptime kuma', 'self-hosted monitoring', 'uptimerobot alternative', 'status page self-hosted'],
    date: '2026-05-12',
    readingMinutes: 7,
    sections: [
      {
        h: 'What you get for one container',
        p: [
          'Uptime Kuma packs the feature set of a $15 to $50 a month monitoring SaaS into a single container using about 100 MB of RAM: HTTP(S) checks with keyword and status-code assertions, TCP and DNS checks, ping, Docker container monitoring, push-based heartbeats for cron jobs, SSL certificate expiry warnings, 90-plus notification providers, and polished public status pages with custom domains.',
          'The interval floor is 20 seconds, better than most SaaS free tiers, and history retention is limited only by your disk.',
        ],
      },
      {
        h: 'Deploy in five minutes',
        p: [
          'Deploy the template with a persistent volume mounted at /app/data (its SQLite database and configuration live there), assign status.example.com, and create the admin account on first load. That is genuinely the whole installation.',
        ],
      },
      {
        h: 'A monitor set that catches real incidents',
        p: [],
        list: [
          'Every production URL: HTTPS monitor asserting status 200 and a keyword that only appears when the app truly rendered',
          'APIs: hit a health endpoint that checks dependencies, not just liveness',
          'Databases and Redis: TCP monitors against the internal ports, reachable if Kuma shares the Docker network',
          'Scheduled jobs: push monitors, the cron job curls a unique URL on success, and silence beyond the grace period alerts; this catches the "cron silently stopped" failure nothing else does',
          'SSL expiry: built into HTTPS monitors; warnings at 14 and 7 days',
        ],
      },
      {
        h: 'Notifications and status pages',
        p: [
          'Wire notifications where your team actually looks: Slack, Discord, Telegram or plain email, and attach them to monitors with sensible retries (alert after 2 to 3 consecutive failures to avoid flapping noise). Public status pages group selected monitors with your branding, satisfying the "is it down for everyone?" question and looking professional to clients for zero additional cost.',
        ],
      },
      {
        h: 'The one architectural rule',
        p: [
          'Do not host your only monitor on the server it watches: when that machine dies, so does the thing that would have told you. Run Kuma on a different small VPS (a $4 instance is ample), or keep one external free check pointed at Kuma itself. Monitoring the monitor sounds paranoid until the first time it pays off.',
        ],
      },
    ],
  },
  {
    slug: 'self-host-minio-object-storage',
    title: 'Self-Host MinIO: S3-Compatible Object Storage on Your Own Server',
    description:
      'Run S3-compatible object storage with MinIO for uploads, backups and media. Setup, bucket policies and when to prefer managed R2/B2.',
    category: 'guide',
    keywords: ['self-host minio', 'minio docker', 's3 compatible storage', 'self-hosted s3'],
    date: '2026-05-13',
    readingMinutes: 8,
    sections: [
      {
        h: 'Why the S3 API is the point',
        p: [
          'Every framework, backup tool and SDK speaks the S3 API; it is the de facto standard for object storage. MinIO implements that API on your own disk, which means django-storages, Laravel flysystem, rclone, pg_dump upload scripts and everything else work unchanged, you just point the endpoint at your server. Apps built against MinIO can later switch to AWS S3, Cloudflare R2 or Backblaze B2 by changing four environment variables.',
        ],
      },
      {
        h: 'Deployment',
        p: [
          'Run the MinIO container with a volume on your largest disk and two routed domains: one for the S3 API (s3.example.com, port 9000) and one for the web console (minio.example.com, port 9001). Set strong root credentials via environment variables, then immediately stop using them: create per-application access keys with policies scoped to a single bucket each.',
        ],
        code: `MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=<generated-32-chars>
# per-app keys via console or:
mc admin user add local app-uploads <access-key> <secret>
mc admin policy attach local readwrite-uploads --user app-uploads`,
      },
      {
        h: 'What it is great for on a VPS',
        p: [],
        list: [
          'User uploads for apps on the same server: private-network traffic, zero egress cost, microsecond latency',
          'Backup target for the databases and volumes of your other services',
          'Media origin behind a CDN: Cloudflare in front of a public-read bucket serves images globally while MinIO stays cheap',
          'Development/staging S3 that mirrors production semantics without cloud credentials',
        ],
      },
      {
        h: 'The honest durability caveat',
        p: [
          'MinIO on one VPS is one disk in one data center; RAID-less single-node storage should hold nothing irreplaceable on its own. Two sane postures: treat it as a cache/working store with the source of truth elsewhere, or replicate it outward, `mc mirror --watch` to Backblaze B2 or R2 gives you offsite copies for about half a cent per GB-month. In particular, never point a server\u2019s only backups at a MinIO running on that same server.',
        ],
      },
      {
        h: 'MinIO vs just using R2/B2 directly',
        p: [
          'If your only need is a backup destination, skip self-hosting and use R2 or B2 directly, they are cheap and someone else worries about disks. Choose MinIO when data locality matters (uploads served to the app next door), when data must stay on your infrastructure for compliance, or when egress-free development storage saves real money. Many stacks sensibly run both: MinIO for hot local objects, B2 for cold offsite copies.',
        ],
      },
    ],
  },
  {
    slug: 'self-host-ghost-blog',
    title: 'Self-Host a Ghost Blog: Fast Publishing with Full Ownership',
    description:
      'Run the Ghost publishing platform on your own VPS with MySQL and automatic SSL, memberships and newsletters included, no Ghost(Pro) fees.',
    category: 'guide',
    keywords: ['self-host ghost', 'ghost blog docker', 'ghost pro alternative', 'ghost vps'],
    date: '2026-05-14',
    readingMinutes: 8,
    sections: [
      {
        h: 'Ghost(Pro) vs self-hosting',
        p: [
          'Ghost is the best open-source publishing platform for serious writing: fast, focused editor, native memberships and paid subscriptions via Stripe, built-in newsletters and clean themes. Ghost(Pro) hosting starts at $9 a month and climbs with audience size; the Business tier runs $199. The self-hosted software is identical, every feature, including paid memberships, and Stripe payouts come to you with no platform cut beyond Stripe\u2019s own fees.',
          'The trade is operational: you own updates, backups and email configuration. On a modern deployment platform that trade is small, and the savings scale with your audience instead of your bill doing so.',
        ],
      },
      {
        h: 'The stack and the one irreversible setting',
        p: [
          'Ghost officially supports MySQL 8, deploy both as a template with persistent volumes: one for Ghost\u2019s content directory (themes, images) and one for the database. Configuration is environment-driven; the setting to get right on day one is url, because Ghost bakes absolute URLs into stored content:',
        ],
        code: `url=https://blog.example.com
database__client=mysql
database__connection__host=mysql
database__connection__user=ghost
database__connection__database=ghost`,
        list: [
          'Changing the URL later requires a search-and-replace across the database, decide the domain before you write',
          '1 GB of RAM total is comfortable for Ghost plus MySQL at typical blog traffic',
        ],
      },
      {
        h: 'Email: the part everyone forgets',
        p: [
          'Ghost needs two email paths. Transactional mail (logins, member signups) works with any SMTP provider, configure mail__transport=SMTP with credentials from Postmark, Resend, SES or similar. Bulk newsletters, however, require Mailgun specifically; Ghost\u2019s newsletter pipeline is built on Mailgun\u2019s batch API. Set both up before launching memberships, or signups will silently fail.',
        ],
      },
      {
        h: 'Running it well',
        p: [],
        list: [
          'Updates: bump the image tag and redeploy; Ghost migrates its schema automatically on boot',
          'Backups: nightly MySQL dumps to S3 plus the content volume; members and posts are irreplaceable',
          'Performance: Ghost is fast by default; Cloudflare in front makes public pages effectively static worldwide',
          'Themes: the content volume persists custom themes across updates; develop locally, upload via the admin',
        ],
      },
      {
        h: 'The economics for a working writer',
        p: [
          'A blog with 5,000 members on Ghost(Pro) costs about $79 a month. Self-hosted: an $8 VPS, $2 platform fee, Mailgun\u2019s pay-as-you-go sending (a few dollars per campaign at that size). Same software, roughly a tenth the cost, and the entire subscriber relationship, content, data and Stripe account belong to you.',
        ],
      },
    ],
  },
  {
    slug: 'self-host-redis-production',
    title: 'Running Redis in Production on Your Own Server',
    description:
      'Persistence modes, memory limits and security for self-hosted Redis, everything managed Redis gives you, on your VPS.',
    category: 'guide',
    keywords: ['self-host redis', 'redis docker production', 'redis persistence', 'managed redis alternative'],
    date: '2026-05-15',
    readingMinutes: 8,
    sections: [
      {
        h: 'Why self-hosting Redis is the easy win',
        p: [
          'Managed Redis pricing is startling for what it is: $15 or more a month for instances with 256 MB of RAM, when Redis itself is a single lean process that happily runs in a container next to your app. Of all the services teams pay managed premiums for, Redis has the smallest operational surface, no complex replication to configure at small scale, no query planner to tune, just memory, persistence and security to get right once.',
        ],
      },
      {
        h: 'Choose persistence to match the job',
        p: ['Redis offers two persistence mechanisms, and the right configuration depends entirely on what you store:'],
        list: [
          'Pure cache (rendered fragments, computed results): persistence OFF; a restart just means a cold cache',
          'Queues and sessions (Sidekiq, BullMQ, Celery): AOF with appendfsync everysec, at most one second of writes lost in a crash',
          'Mixed or "it would hurt to lose": RDB snapshots plus AOF, fast restarts with durability',
        ],
        code: `# queue/session-grade durability
appendonly yes
appendfsync everysec
save 900 1

# cache-grade
maxmemory 512mb
maxmemory-policy allkeys-lru`,
      },
      {
        h: 'The memory settings that prevent outages',
        p: [
          'Unbounded Redis grows until the kernel OOM-kills it, taking your sessions with it. Always set maxmemory (about 75% of the container\u2019s allocation, leaving headroom for fork-based saves) and choose an eviction policy consciously: allkeys-lru for caches turns memory pressure into a non-event; noeviction for queues makes producers fail loudly instead of silently dropping jobs, pick per use, and run two Redis instances if cache and queue semantics conflict.',
        ],
      },
      {
        h: 'Security: one rule above all',
        p: [
          'Never publish port 6379 to the internet. Internet-exposed Redis is compromised within hours by automated scanners, this is among the most-exploited misconfigurations in existence. Keep Redis on the private Docker network where only your services resolve it, set requirepass anyway as defense in depth, and consider renaming FLUSHALL/FLUSHDB if multiple apps share an instance. Deployed as a Peon database service, no public port exists unless you create one.',
        ],
      },
      {
        h: 'Operations and sizing',
        p: [],
        list: [
          'Monitor used_memory vs maxmemory and evicted_keys (INFO memory); rising evictions on a queue instance is a red alert',
          'A 256 to 512 MB allocation covers most apps\u2019 cache-plus-queue needs; Redis throughput (100k+ ops/sec on modest hardware) will not be your bottleneck',
          'Back up queue-grade instances by snapshotting the volume or scheduling BGSAVE copies; skip backups for pure caches',
          'Upgrades: bump the pinned image tag and redeploy; RDB/AOF files carry state across container replacements',
        ],
      },
    ],
  },
  {
    slug: 'free-ssl-lets-encrypt-docker',
    title: 'Free SSL for Docker Apps: Let\u2019s Encrypt Automation Explained',
    description:
      'How automatic HTTPS actually works: ACME challenges, Traefik/Caddy cert resolvers, renewals and the rate limits to avoid.',
    category: 'guide',
    keywords: ['lets encrypt docker', 'free ssl certificate', 'traefik https', 'acme challenge explained'],
    date: '2026-05-16',
    readingMinutes: 9,
    sections: [
      {
        h: 'From $100 certificates to free automation',
        p: [
          'Let\u2019s Encrypt issues certificates trusted by every browser, free, in seconds, via an automated protocol called ACME. The certificates last 90 days by design, short enough that automation is mandatory rather than optional, which is precisely why the modern setup never touches a certificate by hand: the reverse proxy requests, installs and renews them as a side effect of routing.',
        ],
      },
      {
        h: 'How ACME validation works',
        p: [
          'Before issuing, Let\u2019s Encrypt must verify you control the domain. Two challenge types matter in practice:',
        ],
        list: [
          'HTTP-01: the CA fetches http://yourdomain/.well-known/acme-challenge/<token>; your proxy serves the proof. Requires port 80 reachable and DNS pointing at your server. This is the default and right choice for most apps',
          'DNS-01: you publish a TXT record instead; required for wildcard certificates (*.example.com) and works without exposing port 80, at the cost of DNS-provider API credentials on the server',
        ],
      },
      {
        h: 'The architecture that makes it automatic',
        p: [
          'One proxy container (Traefik or Caddy) owns ports 80 and 443 for the whole server. When a deploy declares a domain for a service, via Docker labels under the hood, the proxy adds a route, answers the ACME challenge on the next request, stores the certificate (acme.json for Traefik) and schedules renewal roughly 30 days before expiry.',
          'This is exactly what happens when you type a domain into a Peon service: DNS is your only manual step; issuance, storage and renewals are machinery you never see again. Renewal failures surface in proxy logs and are usually DNS or firewall regressions.',
        ],
      },
      {
        h: 'Prerequisites that cause 90% of failures',
        p: [],
        list: [
          'DNS must resolve to the server before first deploy: check with dig +short app.example.com against your server IP',
          'Ports 80 AND 443 open in both the cloud firewall and any host firewall; HTTP-01 specifically needs 80',
          'Behind Cloudflare\u2019s orange-cloud proxy: set SSL mode to Full (strict), or temporarily grey-cloud during first issuance; with Full (strict), Cloudflare-to-origin uses your Let\u2019s Encrypt cert and browsers see Cloudflare\u2019s edge cert',
          'Only one process can own port 80: a stray nginx or Apache on the host blocks every challenge',
        ],
      },
      {
        h: 'Rate limits: know them before you loop',
        p: [
          'Let\u2019s Encrypt\u2019s limits only bite people retrying failures in a loop: 50 certificates per registered domain per week, 5 duplicate certificates per week, and 5 failed validations per account/hostname per hour. If issuance fails, read the proxy log (the ACME error names the failing check precisely), fix the root cause, then retry once. For experiments and CI, use the staging endpoint, generous limits, untrusted certs, perfect for testing the plumbing.',
        ],
      },
    ],
  },
  {
    slug: 'custom-domain-docker-app',
    title: 'Point a Custom Domain at Your Docker App: DNS to HTTPS',
    description:
      'A records, CNAMEs, proxies and certificates, the complete path from buying a domain to serving your containerized app over HTTPS.',
    category: 'guide',
    keywords: ['custom domain docker', 'dns a record vps', 'domain to server', 'subdomain docker app'],
    date: '2026-05-17',
    readingMinutes: 8,
    sections: [
      {
        h: 'The three layers, in order',
        p: [
          'Serving app.example.com over HTTPS from a container involves three independent layers, and debugging is trivial once you check them in order: DNS (the name resolves to your server\u2019s IP), routing (the reverse proxy maps that hostname to the right container), and TLS (a certificate exists for the name). Every "my domain doesn\u2019t work" issue lives in exactly one of these layers.',
        ],
      },
      {
        h: 'DNS records for every situation',
        p: [],
        list: [
          'Subdomain (app.example.com): an A record to the server IPv4; add AAAA if you have IPv6. Simplest and most common',
          'Apex/root (example.com): A record too; classic CNAME is not allowed at the apex, though ALIAS/flattening at providers like Cloudflare works around it',
          'Wildcard (*.example.com): one record routes every subdomain to the server, ideal for per-client or per-branch preview URLs; pair with DNS-01 if you want a wildcard certificate',
          'www: CNAME www to the apex, and redirect one to the other at the proxy for canonical URLs',
          'TTL: 300 seconds while building; raise to 3600+ once stable',
        ],
      },
      {
        h: 'How one server hosts many domains',
        p: [
          'All domains resolve to the same IP; the proxy differentiates by the Host header (and SNI for TLS). Requests for app-a.com route to container A, app-b.com to container B, dozens of sites on one machine with no port juggling. In Peon you enter the domain in the service settings; the platform writes the proxy configuration and the certificate follows on first request.',
        ],
      },
      {
        h: 'Verification, layer by layer',
        p: [],
        code: `# Layer 1: DNS
dig +short app.example.com          # expect your server IP

# Layer 2: routing (bypass DNS, test the proxy directly)
curl -H "Host: app.example.com" http://<server-ip>/ -I

# Layer 3: TLS
curl -vI https://app.example.com 2>&1 | grep -E "subject|expire"`,
        list: [
          'DNS wrong: fix the record; check you edited the active nameservers (registrar vs Cloudflare confusion is rampant)',
          'DNS right, routing wrong: the domain is not attached to the service, or the container is unhealthy, check proxy logs',
          'Routing right, TLS failing: usually port 80 blocked or DNS was wrong moments ago; certificates retry automatically',
        ],
      },
      {
        h: 'Propagation myths',
        p: [
          'The famous "wait 48 hours" is folklore. DNS changes appear as fast as caches expire, your record\u2019s TTL, typically minutes. What actually bites: your own OS caching the old value (test with dig @1.1.1.1 to ask a public resolver directly), negative caching if you queried the name before creating the record, and editing a zone that is not authoritative for the domain. If the authoritative nameserver returns the right answer, you are done; the world converges within one TTL.',
        ],
      },
    ],
  },
  {
    slug: 'zero-downtime-deployments-docker',
    title: 'Zero-Downtime Deployments with Docker: How Rolling Updates Work',
    description:
      'Deploy new versions without dropping a request: health checks, container overlap, connection draining and instant rollbacks explained.',
    category: 'guide',
    keywords: ['zero downtime deployment', 'docker rolling update', 'blue green deployment docker', 'deploy without downtime'],
    date: '2026-05-18',
    readingMinutes: 9,
    sections: [
      {
        h: 'Why the naive deploy drops requests',
        p: [
          'The obvious deploy, stop the old container, start the new one, fails users twice. During the gap between stop and ready, every request meets a connection error; and at stop time, requests already in flight are severed mid-response. At one deploy a day this is an annoyance; at continuous-deployment cadence it is a constant background error rate that users and uptime monitors both notice.',
        ],
      },
      {
        h: 'The rolling update sequence',
        p: ['Zero-downtime deploys eliminate both failure windows by overlapping versions behind the reverse proxy:'],
        list: [
          '1. Start the new container alongside the old, both attached to the proxy network',
          '2. Wait for the new container\u2019s health check to pass, "running" is not "ready"; ready means dependencies connected and traffic serveable',
          '3. Atomically switch the proxy route from old to new',
          '4. Drain the old container: let in-flight requests finish (a grace period of 10 to 30 seconds)',
          '5. Stop and remove the old container; keep its image for rollback',
        ],
      },
      {
        h: 'Your app\u2019s two responsibilities',
        p: [
          'The platform machinery handles orchestration, but it can only be as good as two things your application provides. First, a truthful health endpoint: return 200 only when genuinely ready to serve (database reachable, caches connected), because the rollout gates on it. Second, graceful SIGTERM handling: stop accepting new connections, finish in-flight work, then exit, within the stop timeout.',
        ],
        code: `// the pattern in any language
onSignal('SIGTERM', async () => {
  server.stopAccepting();
  await server.drainInflight({ timeout: '8s' });
  process.exit(0);
});`,
      },
      {
        h: 'The edge cases worth knowing',
        p: [],
        list: [
          'Database migrations: run before the switch, and keep each migration compatible with the previous release, both versions briefly run against the same schema',
          'Long-lived connections (WebSockets, SSE): draining cannot wait forever; clients must reconnect gracefully, which well-built realtime clients already do',
          'Background workers: rolling updates apply too, finish the current job on SIGTERM and let the queue redeliver; make jobs idempotent',
          'Singleton constraints: if two instances must never overlap (a legacy cron-in-app), fix the design or accept a maintenance-window deploy for that service',
        ],
      },
      {
        h: 'Rollbacks and failed deploys',
        p: [
          'The same machinery gives you two safety properties for free. If the new container never passes its health check, the rollout aborts and traffic never left the working version, a bad build becomes a log entry instead of an outage. And because the previous image remains on the host, rollback is the identical sequence pointed at the old image: seconds, no rebuild, no drama. In Peon both behaviours are defaults, deploys gate on health, and every previous release is one click away.',
        ],
      },
    ],
  },
  {
    slug: 'git-push-to-deploy-own-server',
    title: 'Set Up Git Push-to-Deploy on Your Own Server',
    description:
      'From webhook to running container: how push-to-deploy pipelines work, and how to get the Heroku workflow on your own VPS.',
    category: 'guide',
    keywords: ['git push deploy', 'webhook deployment', 'deploy on git push', 'ci cd own server'],
    date: '2026-05-19',
    readingMinutes: 8,
    sections: [
      {
        h: 'The workflow worth copying',
        p: [
          'Heroku\u2019s enduring contribution to the industry is a workflow: `git push` is the deployment. No build servers to babysit, no artifacts to shuttle, no SSH sessions. The branch is the environment, the push is the trigger, and the log stream tells you how it went. Every piece of that workflow is reproducible on a $5 VPS; this guide walks the pipeline end to end.',
        ],
      },
      {
        h: 'Anatomy of the pipeline',
        p: ['When push-to-deploy works, this is the machinery running underneath:'],
        list: [
          '1. Push: your Git provider fires a webhook (an HTTP POST with commit metadata) at the platform',
          '2. Verify and filter: the platform checks the webhook signature and matches the branch against configured services',
          '3. Fetch and build: the target server clones the exact commit and builds the image locally, layer cache makes warm builds fast',
          '4. Inject and roll: environment variables render into the new container, which replaces the old via health-gated rolling update',
          '5. Report: build and runtime logs stream to the dashboard; notifications fire on success or failure',
        ],
      },
      {
        h: 'DIY versus platform, honestly',
        p: [
          'You can hand-roll this: a bare repo with a post-receive hook, or a GitHub Action that SSHes in and runs docker compose up. It genuinely works, and for one project it is a fine weekend of plumbing. The gaps appear with use: no build logs anyone can see, no locking (two rapid pushes race), secrets scattered in .env files, no health-gated rollout or automatic rollback, and CI now holds SSH keys to production.',
          'A deployment platform is that plumbing, productized: Peon registers webhooks automatically when you connect a repo, serializes builds per service, injects encrypted variables, rolls out behind health checks and keeps rollback one click away.',
        ],
      },
      {
        h: 'Setting it up in Peon',
        p: [],
        list: [
          'Connect GitHub or GitLab once as a Git source (OAuth app or personal access token)',
          'Create a service from a repository; pick the branch (main for production) and build method (Dockerfile or auto-detected)',
          'The webhook registers automatically; push and watch the build log stream live',
          'Add a staging service from the same repo on a staging branch, same pipeline, second environment, one server',
        ],
      },
      {
        h: 'Branch strategy and CI coexistence',
        p: [
          'Keep the mapping boring: main deploys to production, staging to staging, feature branches deploy nowhere until merged (or to ephemeral preview services if review apps earn their keep for your team). Your CI keeps its job, tests and checks run on pull requests as before; the deploy trigger is simply the merge. Push-to-deploy replaces the deployment leg of CI/CD, not the testing leg.',
        ],
      },
    ],
  },
  {
    slug: 'choose-vps-provider-2026',
    title: 'How to Choose a VPS Provider in 2026: A Practical Framework',
    description:
      'Hetzner, DigitalOcean, Vultr, OVH, Contabo, how to actually decide: price/performance, regions, network, backups and the traps to avoid.',
    category: 'guide',
    keywords: ['best vps provider 2026', 'choose vps', 'vps comparison', 'cheap vps hosting'],
    date: '2026-05-20',
    readingMinutes: 10,
    sections: [
      {
        h: 'Start from your users, not the price list',
        p: [
          'The decision most people get backwards: they pick the cheapest specs, then discover their server is 250 ms from their users. Latency to your audience dominates perceived performance for dynamic apps, so filter by region first. The rough map: Hetzner covers Europe (Falkenstein, Nuremberg, Helsinki), the US (Ashburn, Hillsboro) and Singapore; DigitalOcean and Vultr are broadly global including India, Australia and South America; OVH covers Europe and Canada well; Contabo is EU/US-centric at the deep-budget end.',
          'Only after shortlisting by region does price-per-spec become the deciding factor, and there Hetzner\u2019s roughly 4x advantage over the US-branded clouds is the reference point.',
        ],
      },
      {
        h: 'The specs that actually matter',
        p: [],
        list: [
          'RAM first: it is the binding constraint for app servers; 4 GB is the comfortable floor for a multi-service host running apps plus a database',
          'NVMe storage: the difference between NVMe and SATA SSD is dramatic for databases; all reputable 2026 providers should be NVMe, verify on the spec sheet',
          'Included traffic: Hetzner includes 20 TB; typical US clouds include 1 to 4 TB with $10-per-TB overage, a 10x cost difference for media-heavy workloads',
          'Shared vs dedicated vCPU: shared is fine for web apps with bursty CPU; sustained workloads (busy databases, video processing) want dedicated cores',
          'Snapshot/backup pricing: automated backups typically cost 20 to 30% of the instance price, budget it, you want them',
        ],
      },
      {
        h: 'The traps',
        p: [
          'Oversold budget hosts post spectacular benchmark numbers that collapse under sustained load, the overselling only shows when your neighbours get busy. Prefer providers with long-term third-party benchmark histories (vpsbenchmarks.com tracks consistency over months, which is the metric that matters) over one-off speed tests.',
          'Other recurring surprises: Hetzner\u2019s strict new-account verification (allow a day before a launch), Contabo\u2019s setup fees and variable performance reputation, egress overage pricing generally, and the difference between a provider\u2019s advertised support and its ticket-response reality. Read the current-year experiences, not the brand reputation from five years ago.',
        ],
      },
      {
        h: 'A concrete recommendation matrix',
        p: [],
        list: [
          'EU or US users, budget-driven: Hetzner CX-line, the default answer, and the savings fund a staging server',
          'Users in India, SEA, Australia, LATAM: DigitalOcean or Vultr in the nearest region; the premium buys the location',
          'Want managed extras (databases, S3, LB) from the same vendor: DigitalOcean\u2019s ecosystem is the most complete',
          'Absolute lowest cost per GB of RAM, tolerance for rough edges: Contabo, with eyes open',
          'Compliance requires EU-owned infrastructure: Hetzner or OVH',
        ],
      },
      {
        h: 'Design for the exit, enjoy the leverage',
        p: [
          'The strongest position is not picking the perfect provider; it is being able to leave any provider in an afternoon. Deploy through a platform that speaks plain SSH and Docker, keep apps containerized, ship database backups offsite, and keep DNS at a low TTL during any migration. With that posture, moving is: provision new server, attach to Peon, redeploy services, restore data, flip DNS. Providers become commodities competing for your workload, which is exactly the relationship you want.',
        ],
      },
    ],
  },
];
