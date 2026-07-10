import type { BlogPost } from './types';

export const COMPARISON_POSTS: BlogPost[] = [
  {
    slug: 'vercel-alternative-self-hosted',
    title: 'The Best Self-Hosted Vercel Alternative in 2026',
    description:
      'Looking for a Vercel alternative without per-seat pricing? Compare costs, features and trade-offs of self-hosting your Next.js and frontend apps with Peon.',
    category: 'comparison',
    keywords: ['vercel alternative', 'self-hosted vercel', 'next.js hosting', 'vercel pricing'],
    date: '2026-06-01',
    readingMinutes: 10,
    sections: [
      {
        h: 'Why teams look for a Vercel alternative',
        p: [
          'Vercel offers a superb developer experience, and for a solo developer on the Hobby plan it is genuinely hard to beat. The problems start when a project becomes a team and a hobby becomes a product. The Pro plan costs $20 per seat per month, so a five-person team pays $100 a month before serving a single request. On top of that come bandwidth overages ($40 per 100 GB beyond the included quota), image optimization charges, and serverless function invocation costs that are notoriously hard to predict from a staging environment.',
          'There is also an architectural cost that shows up later. Vercel apps tend to accumulate platform-specific behaviour: serverless function timeouts shape how you write API routes, edge middleware becomes load-bearing, and the database ends up at a third provider because Vercel does not host databases at all. When you eventually want to move, you are not migrating one app, you are untangling three vendors.',
          'The workloads most teams actually run, a Next.js frontend, a handful of API routes and a Postgres database, run perfectly well on a single modest VPS. What you really need from Vercel is not their infrastructure. It is their workflow: git push, automatic build, deploy, HTTPS, instant rollback. That workflow is reproducible on hardware you own.',
        ],
      },
      {
        h: 'What a self-hosted alternative must provide',
        p: [
          'Plenty of people will tell you to "just use nginx and a systemd unit". That advice misses why teams chose Vercel in the first place. A genuine alternative has to reproduce the workflow, not just run the process. Before you migrate, make sure your replacement covers all of the following:',
        ],
        list: [
          'Git-push deployments from GitHub or GitLab, triggered by webhooks, with build logs you can watch live',
          'Automatic HTTPS with Let\u2019s Encrypt on custom domains, including renewals you never think about',
          'Zero-downtime rollouts, where the old version serves traffic until the new one passes a health check',
          'One-click rollbacks to any previous image',
          'Environment variable and secrets management with encryption at rest',
          'Build-time and runtime logs in one place, accessible to the whole team, not just whoever has SSH keys',
          'Team access control, so a designer can check deploy status without being handed root on a server',
        ],
      },
      {
        h: 'Peon vs Vercel: the cost math in detail',
        p: [
          'Peon charges a flat $2 per project per month with unlimited team members. You bring your own server. A Hetzner CX22 (2 vCPU, 4 GB RAM, 40 GB NVMe) costs about $4 a month and comfortably runs three to five production Next.js apps with a shared Postgres instance.',
          'Work through a realistic example: a five-person team running three projects. On Vercel Pro that is $100 a month in seats, plus perhaps $20 to $50 in usage, plus roughly $25 for a managed Postgres somewhere like Neon or Supabase Pro. Call it $150 a month, $1,800 a year. The same workload on Peon: three projects at $2 each, one $8 VPS with headroom, and the database running on the same box with nightly S3 backups. That is $14 a month, or $168 a year. The difference pays for a very nice team offsite.',
          'Just as important as the total is the shape of the bill. The self-hosted bill is flat. Nobody has to think about whether a marketing campaign will trigger bandwidth overages, and adding a sixth teammate costs nothing.',
        ],
      },
      {
        h: 'Performance: serverless is not automatically faster',
        p: [
          'Vercel\u2019s marketing leans on the edge network, and for static assets it is genuinely fast. But most dynamic apps spend their latency budget on database round-trips, and here the single-server setup often wins: your Next.js server and your Postgres are on the same machine, so a query that costs 15 to 40 ms across providers on serverless costs well under a millisecond locally.',
          'You also eliminate cold starts entirely. A long-running Node process with a warm connection pool answers the first request of the morning just as fast as the thousandth. And if you want edge caching for static assets, putting Cloudflare\u2019s free tier in front of your VPS gets you most of it for nothing.',
        ],
      },
      {
        h: 'What you give up',
        p: [
          'Honesty matters in these comparisons, so here is the real list. You give up automatic multi-region failover: if your VPS provider has an outage, your app is down until it recovers or you restore elsewhere (with image-based deploys and offsite database backups, a restore to a fresh server is under an hour, but it is not zero). You give up preview deployments per pull request unless you set up branch-based environments. You give up not caring about disk space and OS updates, although a good platform automates most of that.',
          'If you rely heavily on edge middleware, ISR revalidation at global scale, or Vercel-specific primitives like their KV and blob storage, budget a few days to replace them with Redis and S3-compatible storage. Most apps use far fewer proprietary features than their developers assume.',
        ],
      },
      {
        h: 'Migration path, step by step',
        p: ['A typical Next.js migration from Vercel to a self-hosted Peon setup takes an afternoon:'],
        list: [
          'Add output: "standalone" to next.config and a multi-stage Dockerfile (about 20 lines, copy-paste from any guide)',
          'Provision a VPS and connect it to Peon, which installs Docker and the reverse proxy over SSH',
          'Create a Git-app service pointing at your repository, copy environment variables across',
          'Deploy, verify on a temporary subdomain, then switch DNS for the production domain',
          'Move the database last: pg_dump from your current provider, restore into a managed Postgres on the server, update DATABASE_URL, redeploy',
        ],
      },
      {
        h: 'When Vercel is still the right choice',
        p: [
          'If your product genuinely serves interactive traffic from every continent and needs sub-50 ms responses everywhere, Vercel\u2019s edge is hard to replicate on one VPS. If your team has zero appetite for owning a server, even a heavily automated one, the managed premium may be worth it. And for a weekend project, the Hobby tier is free and frictionless.',
          'For everything else, dashboards, SaaS products, client sites, internal tools and APIs, a self-hosted platform delivers the same daily workflow at roughly a tenth of the cost, with no usage anxiety and no lock-in.',
        ],
      },
    ],
  },
  {
    slug: 'heroku-alternative-2026',
    title: 'Heroku Alternatives in 2026: Cheaper Ways to Deploy Your App',
    description:
      'Heroku dynos add up quickly. Here are the best Heroku alternatives in 2026, including self-hosted options that cut your bill by 90%.',
    category: 'comparison',
    keywords: ['heroku alternative', 'heroku pricing', 'cheap app hosting', 'dyno alternative'],
    date: '2026-06-03',
    readingMinutes: 10,
    sections: [
      {
        h: 'How Heroku bills became a meme',
        p: [
          'Heroku invented the git-push deployment workflow and for years was the default answer to "how do I put my app online". Then the free tier disappeared in late 2022, and the pricing that remained aged poorly against modern alternatives. An Eco dyno is $5 a month and sleeps. A Basic dyno is $7 and cannot scale. Production realistically starts at Standard-1X dynos at $25 each, and any real app needs at least two: web and worker.',
          'The database is where it compounds. Heroku Postgres Mini at $5 caps at 10,000 rows, which a contact form fills in a year. The first production-grade tier, Standard-0, is $50 a month for 64 GB. Add Redis at $15 or more, and a completely ordinary app, one web dyno, one worker, Postgres and Redis, lands between $115 and $150 a month. That is $1,400 to $1,800 a year for a workload a $10 VPS handles.',
        ],
      },
      {
        h: 'The managed alternatives',
        p: [
          'If you want to stay fully managed, three platforms carry the Heroku torch with better pricing. Render is the closest philosophical successor: web services from $7, managed Postgres from $7 (with a 90-day expiry on the free database), background workers and cron. Railway bills by actual resource usage, which is elegant for small workloads but makes bills harder to forecast. Fly.io gives you more control, machines in dozens of regions, at the cost of more operational involvement than Heroku ever asked of you.',
          'All three are good products. All three still scale cost per service, per gigabyte and per seat, and all three still hold your app on a proprietary platform. A typical production stack lands between $30 and $80 a month on any of them.',
        ],
      },
      {
        h: 'The self-hosted route, without the ops burden',
        p: [
          'The reason people paid Heroku was never the compute, it was the absence of server administration. That equation changed when open-source platforms started automating the administration. With Peon, you connect a fresh VPS over SSH and the platform installs Docker, configures a reverse proxy with automatic HTTPS, and gives you git-push deploys, managed databases with S3 backups, log streaming and a team dashboard.',
          'The cost comparison for that same ordinary app (web, worker, Postgres, Redis): Heroku about $130 a month. Render about $40. Peon: $2 for the project plus $8 for a 4 GB Hetzner or DigitalOcean VPS, so about $10 a month. Over three years the difference exceeds $4,000, for one app.',
          'What about reliability? A single VPS has no automatic failover, which sounds scary until you compare actual numbers: reputable VPS providers deliver 99.9%+ uptime in practice, and Heroku itself has had multi-hour incidents. With nightly offsite database backups and image-based deploys, full recovery onto a new server is under an hour.',
        ],
      },
      {
        h: 'Migration checklist',
        p: ['Moving off Heroku is mostly mechanical. Budget half a day for the first app and an hour for each one after:'],
        list: [
          'Containerize: add a Dockerfile, or keep using buildpacks locally to generate one; most frameworks have a 15-line standard recipe',
          'Export data: pg_dump on a Heroku backup URL, restore into your new managed Postgres with pg_restore',
          'Move config: heroku config -s dumps every variable; paste them into your new platform\u2019s environment settings',
          'Replace add-ons: Redis and cron have direct equivalents; SendGrid/Mailgun add-ons just become regular accounts with API keys',
          'Point DNS at the new server, let Let\u2019s Encrypt issue certificates, and keep Heroku running for a week as a fallback',
          'Watch your Procfile: web and worker processes become two services deployed from the same repo and image',
        ],
      },
      {
        h: 'Decision framework',
        p: [
          'Stay managed (Render, Railway, Fly) if: nobody on the team wants to think about a server ever, your traffic is extremely spiky and benefits from autoscaling, or compliance requires the vendor to own infrastructure.',
          'Go self-hosted (Peon on a VPS) if: your bill is dominated by predictable always-on workloads, you run several apps or side projects, you want your database next to your app instead of across a network boundary, or you simply refuse to pay 10x for the same compute. For most small teams the honest answer is the second one, and the workflow difference in 2026 is close to zero.',
        ],
      },
    ],
  },
  {
    slug: 'digitalocean-app-platform-vs-peon',
    title: 'DigitalOcean App Platform vs Peon: Managed PaaS or Your Own Droplet?',
    description:
      'DigitalOcean App Platform charges per app; Peon deploys unlimited services to a Droplet you already own. A practical cost and feature comparison.',
    category: 'comparison',
    keywords: ['digitalocean app platform', 'droplet deployment', 'digitalocean paas alternative'],
    date: '2026-06-04',
    readingMinutes: 9,
    sections: [
      {
        h: 'Same cloud, two very different models',
        p: [
          'DigitalOcean offers two ways to run your app, and the price difference between them is bigger than most people realise. App Platform is the managed PaaS: you connect a repo, DigitalOcean builds and runs it, and you pay per component, from $5 a month for basic web services, plus separately for workers, plus $7 or more for a development database, plus $15 or more for a managed production database.',
          'The other way is a plain Droplet: a $6 VPS (1 vCPU, 1 GB) or a $12 one (2 GB) that can run as many containers as it has resources for. Historically the Droplet route meant doing your own server administration, which is exactly the gap a platform like Peon closes: it turns the Droplet into your own private App Platform.',
        ],
      },
      {
        h: 'Cost at small scale, with real numbers',
        p: [
          'Take a typical indie or agency workload: three small apps, one shared Postgres, one Redis. On App Platform, three basic web services ($15), a managed dev database ($7) and Redis via a managed instance ($15) come to roughly $37 a month, and that is with the cheapest tiers, which share CPU and cap memory at 512 MB per service.',
          'The same workload on one $12 Droplet with Peon: $12 for the Droplet, $6 for three projects, everything sharing 2 GB of RAM with room to spare. About $18 a month, and each service can use as much of the machine as it needs rather than a fixed 512 MB slice.',
          'The gap widens with every additional service, because the Droplet\u2019s capacity is already paid for. A fourth app on App Platform is another $5 to $12 line item; on your Droplet it is $2 and some spare RAM.',
        ],
      },
      {
        h: 'Feature comparison',
        p: [],
        list: [
          'Git push to deploy: both, with build logs',
          'Automatic HTTPS on custom domains: both',
          'Zero-downtime rollouts and rollbacks: both',
          'Databases: App Platform requires paid managed databases; Peon provisions Postgres/MySQL/MongoDB/Redis on your Droplet with scheduled S3 backups',
          'Docker Compose stacks and one-click templates (n8n, Plausible, MinIO...): Peon yes; App Platform no',
          'SSH access, cron jobs, custom system packages: Droplet yes; App Platform limited',
          'Autoscaling across instances: App Platform yes; a single Droplet scales vertically (resize) instead',
        ],
      },
      {
        h: 'What App Platform does for you that a Droplet does not',
        p: [
          'Fairness requires the other side of the ledger. App Platform patches the underlying OS invisibly, isolates you from Docker daemon issues, and restarts things on hardware failure without you noticing. On a Droplet, OS updates are your job (unattended-upgrades handles security patches automatically, but you should know it exists), and a kernel panic is your 2 a.m. problem, mitigated by the fact that container platforms restart everything on boot.',
          'In practice Peon automates the layer that actually generates work: Docker installation, proxy and certificate management, deploy pipelines, database backups and disk cleanup. What remains of "managing a server" is genuinely small, but it is not zero, and you should go in knowing that.',
        ],
      },
      {
        h: 'Verdict',
        p: [
          'If you run exactly one small app and want to never think about infrastructure, App Platform\u2019s $5 tier is fine and the premium is modest. The calculus flips as soon as you run several services or care about databases: a Droplet plus Peon is roughly half the cost at three services and keeps getting relatively cheaper, while also giving you SSH, templates, compose stacks and databases that App Platform either restricts or charges heavily for.',
          'And since both run on DigitalOcean, you can migrate gradually: stand up a Droplet, move one app, compare the experience for a week, then move the rest.',
        ],
      },
    ],
  },
  {
    slug: 'render-vs-self-hosted',
    title: 'Render vs Self-Hosting: When Does a VPS Beat a Managed PaaS?',
    description:
      'Render is a great Heroku successor, but per-service pricing adds up. Here is the break-even math for moving to a self-hosted platform.',
    category: 'comparison',
    keywords: ['render alternative', 'render pricing', 'self-hosted paas', 'vps vs paas'],
    date: '2026-06-05',
    readingMinutes: 9,
    sections: [
      {
        h: 'What Render gets right',
        p: [
          'Render deserves its reputation as the sane Heroku successor. The dashboard is clean, deploys are reliable, preview environments work, and the free static site hosting is generous. If a team asked for a managed platform recommendation with no other context, Render would be a defensible default.',
          'This comparison is not about whether Render is good. It is about whether the managed premium is worth it for your particular workload, because that premium is larger than it first appears once a project grows past one service.',
        ],
      },
      {
        h: 'Render pricing, itemised',
        p: [
          'Render bills per service, and services multiply faster than teams expect:',
        ],
        list: [
          'Web service (starter, 512 MB): $7/month; each additional web service is another $7+',
          'Background worker: separate service, $7+/month',
          'Cron job: cheap per run, but yet another service to configure',
          'Postgres: free tier expires after 90 days; paid starts at $7 (256 MB RAM) and production tiers climb quickly',
          'Redis: from $10/month for anything persistent',
          'Team seats: free on the individual plan, but organisation features push you toward paid team plans',
        ],
        code: `Typical production stack on Render:
web ($7) + worker ($7) + postgres ($20) + redis ($10) = $44/month
Same stack, self-hosted:
Hetzner 4GB VPS ($8) + Peon ($2/project) = $10/month`,
      },
      {
        h: 'The break-even point is earlier than you think',
        p: [
          'A single 4 GB VPS runs that entire stack, web, worker, Postgres, Redis, with capacity left for a staging copy. The break-even against Render arrives at roughly the second service. By the time you run a staging environment (which doubles your Render service count) or a second project, self-hosting is a quarter of the price.',
          'There is also a resource-envelope difference. Render\u2019s $7 tier gives each service 512 MB of RAM and shared CPU, a hard box. On your own VPS, services share the full machine: your web app can burst to 2 GB during a traffic spike while the worker idles, with no tier upgrade involved.',
        ],
      },
      {
        h: 'What Render still does better',
        p: [
          'Autoscaling: Render can add instances under load; a single VPS scales by resizing, which involves a reboot. If your traffic regularly spikes 10x in minutes, managed autoscaling has real value.',
          'Managed database failover: Render\u2019s higher database tiers include replication and failover. A self-hosted Postgres relies on backups and restore procedures instead, excellent recovery, but not instant failover.',
          'Zero infrastructure knowledge: on Render, nobody on the team ever needs to know what a Docker network is. With a platform like Peon the operational surface is small, but it is not invisible.',
        ],
      },
      {
        h: 'What self-hosting does better',
        p: [],
        list: [
          'Flat, predictable cost regardless of service count: staging environments and side projects become free instead of doubling the bill',
          'Full machine resources with no per-tier RAM boxes',
          'Any Docker image, any database version, long-running jobs with no platform timeout',
          'Data locality: app and database on the same machine means sub-millisecond queries',
          'One-click templates for the supporting cast (analytics, queues, monitoring) that would each be another paid service on Render',
          'Unlimited team members with per-project roles on Peon',
        ],
      },
      {
        h: 'A pragmatic recommendation',
        p: [
          'If you have one production service and no staging environment, stay on Render; the premium is small and the simplicity is real. The moment your Render invoice crosses about $25 a month, price out the same stack on a VPS. Most teams find the self-hosted version costs a quarter as much and, with a modern platform on top, feels nearly identical to operate day to day.',
        ],
      },
    ],
  },
  {
    slug: 'railway-alternative',
    title: 'Railway Alternatives: Predictable Pricing for Small Teams',
    description:
      'Railway\u2019s usage-based pricing is flexible but hard to forecast. Compare Railway with flat-priced self-hosted alternatives like Peon.',
    category: 'comparison',
    keywords: ['railway alternative', 'railway pricing', 'usage based pricing', 'flat price hosting'],
    date: '2026-06-06',
    readingMinutes: 8,
    sections: [
      {
        h: 'Railway\u2019s model, and why people love it at first',
        p: [
          'Railway bills by the resources your containers actually consume: so much per GB-hour of memory, so much per vCPU-hour, plus a monthly subscription floor. For a tiny bot or a hobby API that mostly sleeps, this is delightful, you pay a few dollars because you use a few dollars.',
          'The developer experience deserves credit too: provisioning Postgres or Redis is one click, private networking between services is automatic, and the dashboard shows exactly what each service consumes. Railway made usage-based hosting feel friendly.',
        ],
      },
      {
        h: 'Where usage-based pricing bites',
        p: [
          'The problem is that production web apps do not sleep. A Node server holds its memory 24/7 whether it serves one request or a million. A Postgres instance holds its shared buffers around the clock. Usage-based pricing for always-on workloads is just a metered version of a fixed cost, except you cannot predict it precisely, and pathological cases get expensive.',
          'The classic incident: a slow memory leak takes your app from 300 MB to 2 GB over a month. On a fixed VPS, that is a graph you eventually notice, and a restart. On per-GB-hour billing, it is a bill that quietly quadrupled. Similarly, a runaway queue consumer that pegs CPU for a weekend becomes a line item instead of just a warm server.',
          'Teams end up doing "bill archaeology" at the end of the month, reverse-engineering which service consumed what. The mental overhead of variable pricing is itself a cost.',
        ],
      },
      {
        h: 'The flat-price alternative',
        p: [
          'A fixed-size VPS turns hosting into a utility bill you can memorise. Peon adds the Railway-style workflow on top: git-push deploys, one-click Postgres and Redis, environment variables, private Docker networking between services, live logs, for $2 per project per month.',
          'A complete production stack (web, worker, Postgres, Redis) on an $8 Hetzner VPS costs $10 a month, this month, next month, and the month your app has a memory leak. The leak is still a bug you should fix, but it is no longer a billing event.',
        ],
      },
      {
        h: 'Feature-by-feature',
        p: [],
        list: [
          'Git push to deploy: both',
          'One-click databases: both; Peon adds scheduled S3 backups with retention policies',
          'Private networking between services: both (Railway private net vs shared Docker network)',
          'Cost ceiling: Peon plus VPS is fixed; Railway scales with usage in both directions',
          'Scale-to-zero for idle apps: Railway can sleep services; a VPS simply stays up, idle capacity is already paid for',
          'Templates for self-hostable services: both have large catalogs',
          'Team pricing: Railway seats on team plans; Peon members unlimited',
        ],
      },
      {
        h: 'Who should stay on Railway',
        p: [
          'Genuinely bursty or tiny workloads: a Discord bot, a webhook handler that runs minutes per day, a demo that traffic visits twice a week. For those, usage billing beats any fixed cost, and Railway\u2019s DX is excellent. The crossover comes when your services run around the clock, which is the definition of production. At that point, price the same stack on a fixed VPS; the comparison usually is not close.',
        ],
      },
    ],
  },
  {
    slug: 'netlify-alternative-static-sites',
    title: 'Netlify Alternatives for Static Sites: Own Your Bandwidth',
    description:
      'Netlify bandwidth overages surprising you? Static sites are the easiest workload to self-host. Here is how to serve them from your own VPS with free SSL.',
    category: 'comparison',
    keywords: ['netlify alternative', 'static site hosting', 'netlify bandwidth', 'self-host static site'],
    date: '2026-06-07',
    readingMinutes: 8,
    sections: [
      {
        h: 'When Netlify stops being free',
        p: [
          'Netlify\u2019s free tier is a fantastic on-ramp: 100 GB bandwidth, 300 build minutes, deploy previews, all for nothing. The trouble is the shape of the cliff beyond it. One post that does well on Hacker News, one image-heavy portfolio that gets shared, and you are past 100 GB with overage billing or a $19-per-member-per-month Pro plan in front of you.',
          'For agencies the per-seat model stings more than bandwidth: a five-person studio managing client sites pays $95 a month for team features on infrastructure that is, underneath, serving static files, the cheapest workload in computing.',
        ],
      },
      {
        h: 'Static sites are the easiest thing you will ever self-host',
        p: [
          'A static site is files behind a web server. There is no runtime to crash, no database to back up, no memory to leak. A $4 VPS running nginx serves thousands of requests per second and multiple terabytes a month without breaking a sweat. This is the workload where self-hosting has the least downside and the most cost leverage.',
          'The historical friction was the pipeline: building on push, SSL certificates, and hosting many sites on one box. A platform like Peon removes exactly that friction. You point a Git repository at a server, it detects or runs your build command (Astro, Hugo, Eleventy, Vite, Next.js export, plain HTML), and serves the output directory behind automatic HTTPS. Every push rebuilds and atomically swaps the content.',
        ],
      },
      {
        h: 'The CDN question, answered honestly',
        p: [
          'Netlify serves from a global CDN; your VPS is one location. Does it matter? For static sites, mostly no, and where it does, the fix is free: put Cloudflare\u2019s free tier in front of your VPS. Cloudflare caches your static assets at 300+ edge locations, absorbs DDoS traffic, and gives you analytics. Your origin serves cache misses only.',
          'With cache-control headers set correctly (hashed assets immutable for a year, HTML short-lived), the real-world performance difference between "Netlify" and "VPS plus Cloudflare" is within measurement noise for the overwhelming majority of sites, and the bandwidth bill is zero on both layers.',
        ],
      },
      {
        h: 'Replacing the extras',
        p: [],
        list: [
          'Deploy previews: branch-based environments cover the review workflow; each branch can deploy to its own subdomain',
          'Forms: a tiny API container on the same server (or a self-hosted service like Formbricks) with no submission caps',
          'Serverless functions: become a small always-on service, which unlike Netlify functions has no invocation limits or cold starts',
          'Redirects and headers: standard proxy configuration, set once per site',
          'Rollbacks: previous builds are retained, so rolling back is instant',
        ],
      },
      {
        h: 'The agency math',
        p: [
          'One $8 VPS comfortably hosts 30 or more client static sites; each is an nginx container using a few megabytes of RAM. At Peon\u2019s $2 per project, 20 client sites cost $48 a month all-in, with unlimited team members and per-client project access. The equivalent on Netlify with team seats and a few Pro features typically runs several hundred dollars. For static-heavy agencies, this is the single highest-leverage infrastructure change available.',
        ],
      },
    ],
  },
  {
    slug: 'caprover-vs-peon',
    title: 'CapRover vs Peon: Classic Self-Hosted PaaS vs Modern Platform',
    description:
      'CapRover pioneered the one-click self-hosted PaaS. See how it compares to Peon on team features, database backups and day-2 operations.',
    category: 'comparison',
    keywords: ['caprover vs', 'caprover alternative', 'self-hosted paas', 'docker paas'],
    date: '2026-06-08',
    readingMinutes: 8,
    sections: [
      {
        h: 'CapRover\u2019s place in history',
        p: [
          'CapRover has been the entry point to self-hosted PaaS for the better part of a decade. The pitch was revolutionary at the time: run one install command on a VPS, get a web dashboard, deploy apps from a CLI or captain-definition files, click to install databases and popular apps, get automatic Let\u2019s Encrypt certificates. Thousands of side projects and small businesses still run on it happily.',
          'It is free, Apache-licensed, and genuinely stable for what it does. Any comparison should start by acknowledging that CapRover solved this problem before most alternatives existed.',
        ],
      },
      {
        h: 'Where the age shows',
        p: [
          'CapRover\u2019s architecture reflects its era. It is fundamentally a single-server, single-admin tool: one CapRover instance manages one machine (cluster support exists via Docker Swarm but is little-used and lightly maintained), and access control is one admin password shared by everyone who deploys. Development activity has slowed noticeably, with long gaps between releases.',
          'Operational features that have become table stakes are missing or manual: there is no managed database backup system (you script your own dumps), no per-user permissions, no native multi-server dashboard, and the deployment pipeline predates the modern webhook-driven, build-log-streaming experience.',
        ],
      },
      {
        h: 'What Peon does differently',
        p: [],
        list: [
          'Multi-server by design: manage a fleet of VPSes from one dashboard instead of one CapRover install per box',
          'Workspaces with role-based access and unlimited members, instead of a shared admin password',
          'Native Git integration: OAuth to GitHub/GitLab, webhook deploys per branch, live build logs',
          'Managed database lifecycle: provisioning, scheduled dumps to S3-compatible storage, retention policies, one-click restore',
          'Docker Compose as a first-class deploy target, alongside git apps, images and a large template catalog',
          'Modern proxy management: Traefik or Caddy per server, configured automatically',
        ],
      },
      {
        h: 'Migration path',
        p: [
          'Because both platforms ultimately run Docker containers behind a reverse proxy, migration is mechanical rather than architectural. For each CapRover app: note its image or repository, copy its environment variables, recreate it as a Peon service, and restore any persistent volume data (tar the volume contents across, or re-upload user files to object storage). Databases move with a dump and restore.',
          'Most single-server migrations complete in an afternoon, and you can run both platforms on separate machines during the transition, moving DNS one app at a time.',
        ],
      },
      {
        h: 'The bottom line',
        p: [
          'If you are a solo developer with one server, a working CapRover setup, and no appetite for change, there is no urgent reason to move; CapRover keeps working. If you are choosing fresh in 2026, or your team has outgrown a shared admin password and hand-rolled backup scripts, a modern platform gives you the same self-hosted economics with the operational features CapRover never grew.',
        ],
      },
    ],
  },
  {
    slug: 'dokku-vs-peon',
    title: 'Dokku vs Peon: CLI Purism or a Dashboard for Your Team?',
    description:
      'Dokku is a brilliant single-server Heroku built on git hooks. Compare it with Peon when your team or server count grows.',
    category: 'comparison',
    keywords: ['dokku vs', 'dokku alternative', 'mini heroku', 'git push deploy'],
    date: '2026-06-09',
    readingMinutes: 8,
    sections: [
      {
        h: 'What Dokku gets right',
        p: [
          'Dokku is a masterpiece of minimalism, and it has earned its longevity. Add a git remote, run `git push dokku main`, and your app builds via buildpacks or a Dockerfile and deploys on a single server with zero-downtime checks. Plugins add Postgres, Redis, Let\u2019s Encrypt and dozens of other capabilities, each managed through crisp CLI commands.',
          'For a solo developer with one box and terminal fluency, Dokku is arguably all you need. It is free, stable, thoroughly documented, and has processed millions of deployments over more than a decade. Nothing in this comparison should be read as "Dokku is bad".',
        ],
      },
      {
        h: 'The friction appears with people, not apps',
        p: [
          'Everything in Dokku is a CLI command executed on the server over SSH. That design is elegant right up until the second person joins. Onboarding a teammate means provisioning SSH access to production and teaching them your command conventions. There is no dashboard where a designer checks whether staging deployed, no per-project permissions to give a client visibility without power, no central view of logs without SSH.',
          'Multi-server is the other wall. Dokku manages the machine it is installed on. Five servers means five Dokku installs with five sets of state, and no unified view of what runs where. Scheduled database backups exist via plugin flags, but configuring and verifying them across servers is on you.',
        ],
      },
      {
        h: 'Peon as the team-scale version of the same idea',
        p: [
          'Peon keeps the part of Dokku that matters, git push, build on the server, zero-downtime swap behind a proxy with automatic TLS, and adds the layer that teams need:',
        ],
        list: [
          'A dashboard across all servers, projects and services, with live build and runtime logs',
          'Role-based access with unlimited members: clients see their project, contractors deploy, admins manage servers',
          'Database backups as configuration (schedule, S3 destination, retention) instead of cron scripts',
          'Webhook-driven deploys from GitHub/GitLab without wiring CI secrets to production SSH keys',
          'A template marketplace for the supporting services you would otherwise hand-install',
          'Notifications to Slack/Discord/Telegram when deploys succeed or fail',
        ],
      },
      {
        h: 'Which to choose',
        p: [
          'One person, one server, love the terminal: Dokku remains excellent, and its simplicity is a feature. The moment the answer to "who else needs to see this?" is anyone at all, or the server count hits two, a dashboard-first platform pays for itself immediately. Migration is low-drama since both deploy standard Docker containers; recreate services, restore data, move DNS.',
        ],
      },
    ],
  },
  {
    slug: 'kamal-vs-peon',
    title: 'Kamal vs Peon: Deploy Scripts or a Deployment Platform?',
    description:
      '37signals\u2019 Kamal deploys containers over SSH with zero infrastructure. Compare the config-file approach with a full platform like Peon.',
    category: 'comparison',
    keywords: ['kamal deploy', 'kamal vs', 'mrsk', 'rails deployment', 'docker ssh deploy'],
    date: '2026-06-10',
    readingMinutes: 8,
    sections: [
      {
        h: 'Kamal\u2019s philosophy',
        p: [
          'Kamal (formerly MRSK) came out of 37signals\u2019 cloud exit and embodies a strong opinion: deployment should be a CLI tool, not a platform. A `deploy.yml` in your repository describes servers, roles and environment; `kamal deploy` builds your image, pushes it to a registry, and boots containers over SSH with a zero-downtime cutover handled by its proxy. There is no server-side control plane at all, nothing to install, upgrade or secure beyond Docker itself.',
          'For the workload it was designed around, a team deploying one significant application (in their case, Rails monoliths) to servers they manage, Kamal is sharp, fast and pleasingly transparent. Everything it does is visible in your repo.',
        ],
      },
      {
        h: 'The trade-off: no shared state, no shared view',
        p: [
          'Because Kamal has no platform, there is nothing to look at. No dashboard, no deploy history beyond your terminal scrollback and git log, no team permissions, no log aggregation, no database management. Each project carries its own deploy.yml, secrets management is delegated to you (typically via .env files and a secrets store), and every deployer needs Docker registry credentials plus SSH access to production.',
          'That scales down beautifully, one repo, two developers, total clarity, and scales up awkwardly. Ten projects means ten configs drifting apart. A junior developer or a client wanting to check "did staging deploy?" has no interface. Databases are explicitly out of scope: Kamal runs accessories (containers) for you, but backups, retention and restores are your scripts.',
        ],
      },
      {
        h: 'When a platform wins',
        p: [],
        list: [
          'Multiple projects and repos: one dashboard and one mental model vs many deploy.yml files',
          'Mixed-skill teams: non-CLI teammates and clients get visibility into deploys and logs without SSH',
          'Databases as managed services with scheduled S3 backups, not hand-rolled cron',
          'One-click templates for supporting services (analytics, queues, monitoring, storage)',
          'Webhook deploys on push without distributing registry and SSH credentials to CI for every repo',
          'Unlimited members with per-project roles, useful the day a contractor or client appears',
        ],
      },
      {
        h: 'When Kamal wins',
        p: [
          'Single flagship application, infrastructure-as-code culture, and a desire for every deploy detail to live in version control: Kamal is exactly right. It is also the more transparent tool, there is no platform behaviour to reason about, just the commands it runs, which it happily shows you.',
        ],
      },
      {
        h: 'They also combine well',
        p: [
          'This is not either/or. Some teams keep Kamal for the bespoke monolith where they want total control, and run Peon on the same or adjacent servers for everything else: databases with managed backups, internal tools, client projects and the long tail of services. Both speak plain Docker over SSH, so they coexist without conflict, and you can migrate services between approaches as needs change.',
        ],
      },
    ],
  },
  {
    slug: 'fly-io-alternative',
    title: 'Fly.io Alternatives: When You Don\u2019t Need Global Edge Deployment',
    description:
      'Fly.io shines for multi-region apps, but most products serve one region. Compare Fly with a single-VPS platform approach on cost and simplicity.',
    category: 'comparison',
    keywords: ['fly.io alternative', 'fly.io pricing', 'edge deployment', 'single region hosting'],
    date: '2026-06-11',
    readingMinutes: 8,
    sections: [
      {
        h: 'What Fly is actually for',
        p: [
          'Fly.io\u2019s core idea is genuinely novel: run your containers as lightweight VMs in dozens of regions, route users to the nearest one via anycast, and give stateful apps tools (volumes, litefs, regional Postgres replicas) to live close to users. When your product truly needs low latency to users on multiple continents, WebSocket collaboration, multiplayer, real-time dashboards, Fly solves a hard problem elegantly.',
          'The question that matters is narrower: is that your product? For most SaaS apps, the honest answer is that users are concentrated in one or two regions, static assets are already on a CDN, and a 120 ms round trip from the far side of the world to a well-placed origin is fine.',
        ],
      },
      {
        h: 'The complexity you inherit',
        p: [
          'Distributed systems concerns do not disappear because the platform is friendly. Volumes are pinned to a region and a host, so you plan placement. Fly Postgres is, in their own words, not a managed database: you operate replication and failover. Machines that autostop introduce cold-start behaviour you must design around. Networking between regions, consistency of replicated data, and debugging an issue that only occurs in one region are all your problems now.',
          'None of this is a criticism of Fly; it is the honest price of multi-region. Paying it makes sense when the product demands it, and is pure overhead when it does not.',
        ],
      },
      {
        h: 'Cost comparison for a single-region product',
        p: [
          'Fly bills per machine (CPU/RAM combination), per volume GB, and per egress GB. A modest always-on setup, two shared-CPU machines for redundancy, a Postgres machine with a volume, and moderate egress, typically lands in the $30 to $60 a month range, with usage variability.',
          'The boring alternative: one well-sized VPS in your users\u2019 region (Hetzner Falkenstein for Europe, Ashburn for the US East coast), Cloudflare\u2019s free tier in front for static assets and DDoS absorption, and Peon for the deployment workflow. Total: about $10 a month, fixed, with Postgres on local NVMe and no replication to babysit.',
        ],
      },
      {
        h: 'What the single-VPS setup gives up',
        p: [],
        list: [
          'Multi-region latency: far-away users pay the round trip (mitigated for assets by the CDN)',
          'Instant region failover: recovery is restore-from-backup to a new server, under an hour, not seconds',
          'Scale-to-zero economics for idle apps: a VPS is always on, which for production is usually what you want anyway',
        ],
      },
      {
        h: 'Decision rule',
        p: [
          'Write down where your users actually are. If 80% or more sit within one continent, deploy one origin near them, put a CDN in front, and bank the cost and complexity savings. Revisit multi-region when latency complaints from a distant market become a revenue problem, not before. Boring wins until the product proves otherwise.',
        ],
      },
    ],
  },
  {
    slug: 'aws-elastic-beanstalk-alternative',
    title: 'AWS Elastic Beanstalk Alternatives for Small Teams',
    description:
      'Elastic Beanstalk wraps EC2 in PaaS ergonomics but brings AWS complexity. Here are simpler alternatives for teams without a dedicated DevOps engineer.',
    category: 'comparison',
    keywords: ['elastic beanstalk alternative', 'aws too complex', 'simple aws alternative', 'ec2 deployment'],
    date: '2026-06-12',
    readingMinutes: 9,
    sections: [
      {
        h: 'The Beanstalk promise vs the Beanstalk experience',
        p: [
          'Elastic Beanstalk promises Heroku-on-AWS: upload your code, and it provisions everything. The reality that greets a small team is different. You still confront IAM roles and instance profiles, security groups, VPC and subnet choices, load balancer listeners, .ebextensions and .platform hook files with their own configuration language, and health states like "Severe" that require CloudWatch archaeology to explain.',
          'Deploys are slow (environment updates routinely take 5 to 15 minutes), rollbacks are clumsy, and the underlying platform versions deprecate on AWS\u2019s schedule, forcing migrations that have nothing to do with your product. Beanstalk is not a bad service; it is AWS with a thin ergonomic layer, and the complexity of AWS leaks through everywhere.',
        ],
      },
      {
        h: 'What it actually costs',
        p: [
          'Beanstalk itself is free; you pay for the resources it orchestrates, and the floor is higher than it looks. A minimal production environment means an EC2 instance (t3.small, about $15 a month), an Application Load Balancer (about $16 plus LCU charges), EBS storage, data transfer, and CloudWatch. A single-instance production app rarely lands under $40 a month, and a conventional web-plus-worker-plus-RDS setup typically runs $80 to $150.',
          'The hidden cost is human: someone on the team becomes the Beanstalk person, and their hours debugging environment states are worth more than the infrastructure.',
        ],
      },
      {
        h: 'What small teams actually need',
        p: [
          'Strip away the enterprise framing and most Beanstalk deployments are a web app, a worker and a database, exactly the workload one or two VPS instances handle. The genuine requirements are deploys from Git, HTTPS, logs, environment variables and database backups. None of these need a load balancer, an auto-scaling group or a VPC on day one.',
        ],
      },
      {
        h: 'Simpler paths, in order of AWS-attachment',
        p: [],
        list: [
          'Must stay on AWS: Lightsail gives you fixed-price VPS instances ($5 to $40) with simple networking; run Peon on a Lightsail instance and you keep the AWS account with none of the Beanstalk machinery',
          'Open to leaving: a Hetzner or DigitalOcean VPS with Peon delivers the full PaaS workflow (git push, HTTPS, databases with S3 backups, team dashboard) at about $10 a month total',
          'Actually need AWS-native scaling: ECS Fargate is the honest choice, more complex than Beanstalk but at least a current, first-class platform; adopt it deliberately with infrastructure-as-code, not as a default',
        ],
      },
      {
        h: 'Migration and the exit ramp',
        p: [
          'Beanstalk apps are already ordinary web processes, so containerizing them is usually a one-day task per app. Move the database with a dump and restore (or keep RDS initially and point your VPS app at it, then migrate the data once comfortable). Environment properties map one-to-one onto platform environment variables.',
          'A useful property of going container-first: you can always come back. Apps packaged as Docker images run identically on a VPS, on ECS or on Kubernetes, so choosing the simple option now does not foreclose the enterprise option later. Choosing Beanstalk, with its bespoke configuration layer, mostly forecloses the simple one.',
        ],
      },
    ],
  },
  {
    slug: 'hetzner-vs-digitalocean',
    title: 'Hetzner vs DigitalOcean in 2026: Price, Performance and Locations',
    description:
      'Hetzner offers unbeatable price/performance; DigitalOcean offers polish and global regions. A practical comparison for choosing your next VPS.',
    category: 'comparison',
    keywords: ['hetzner vs digitalocean', 'best vps 2026', 'cheap vps', 'hetzner review'],
    date: '2026-06-13',
    readingMinutes: 9,
    sections: [
      {
        h: 'Raw price/performance',
        p: [
          'Hetzner\u2019s Cloud line is the price/performance benchmark the rest of the industry gets measured against. Roughly \u20ac4 a month buys a CX22: 2 vCPU, 4 GB RAM, 40 GB NVMe and 20 TB of included traffic. DigitalOcean\u2019s closest Droplet (2 vCPU, 4 GB) runs $24 a month with 4 TB of transfer. That is a 4 to 6x price gap for comparable specs, and it persists up and down the size range.',
          'Benchmarks bear out that this is not oversold capacity: Hetzner\u2019s shared vCPUs deliver consistent performance under sustained load, and their dedicated-vCPU CCX line competes with instances costing several times more elsewhere. For pure compute per dollar, Hetzner wins and it is not close.',
        ],
      },
      {
        h: 'Regions and latency',
        p: [
          'Geography is DigitalOcean\u2019s strongest card. Hetzner operates data centers in Germany (Falkenstein, Nuremberg), Finland (Helsinki), the US (Ashburn, Hillsboro) and Singapore. DigitalOcean covers 15 or more regions including Bangalore, Sydney, S\u00e3o Paulo, Toronto, London, Frankfurt and Amsterdam.',
          'If your users are in India, Australia, South America or Canada, DigitalOcean has a region near them and Hetzner does not. For a latency-sensitive app, that single fact can outweigh every price argument, a database 200 ms away is a bad experience at any discount.',
        ],
      },
      {
        h: 'Ecosystem and managed services',
        p: [
          'DigitalOcean has spent a decade building the friendly-cloud ecosystem: managed Postgres/MySQL/Redis, Spaces (S3-compatible object storage with CDN), managed Kubernetes, App Platform, and consistently excellent documentation. If you want to offload databases entirely, DO has a product for that; Hetzner mostly does not.',
          'Hetzner\u2019s offering is deliberately narrower: excellent VMs, block volumes, load balancers, private networks, firewalls and S3-compatible object storage. The philosophy is "we sell fast infrastructure cheap; bring your own platform." Note also Hetzner\u2019s famously strict signup verification: new accounts sometimes need ID verification, and activation can take a day. Plan for that rather than discovering it during a launch.',
        ],
      },
      {
        h: 'Support, billing and small print',
        p: [],
        list: [
          'Billing: Hetzner is hourly with monthly caps in euros; DO is hourly capped monthly in dollars; both are transparent',
          'Backups: DO automated backups cost 20% of the Droplet price; Hetzner snapshots/backups are similarly priced per GB, both are worth enabling',
          'Bandwidth overage: Hetzner charges about \u20ac1 per extra TB, DO about $10 per TB, a 10x difference that matters for media-heavy apps',
          'Support: DO offers more polished support tiers; Hetzner support is competent but terse, in the German tradition',
        ],
      },
      {
        h: 'Which to pick',
        p: [
          'Users in Europe or North America and budget matters: Hetzner, almost without question, the savings fund a second server for staging. Users in regions Hetzner does not cover, or you want managed databases and a bigger ecosystem: DigitalOcean earns its premium.',
          'With a deployment platform like Peon in front, the provider becomes a commodity: it connects to any Linux server over SSH, so you can run production on Hetzner, a client project on DigitalOcean, and manage both from one dashboard, then vote with your feet if either provider disappoints.',
        ],
      },
    ],
  },
  {
    slug: 'traefik-vs-caddy',
    title: 'Traefik vs Caddy: Choosing a Reverse Proxy for Docker in 2026',
    description:
      'Traefik and Caddy both offer automatic HTTPS and Docker integration. Compare configuration style, performance and ecosystem to pick the right proxy.',
    category: 'comparison',
    keywords: ['traefik vs caddy', 'docker reverse proxy', 'automatic https', 'lets encrypt proxy'],
    date: '2026-06-14',
    readingMinutes: 9,
    sections: [
      {
        h: 'Why this choice matters',
        p: [
          'On a multi-app Docker host, the reverse proxy is the most load-bearing component you run: every request passes through it, it terminates TLS for every domain, and it decides how deploys achieve zero downtime. Traefik and Caddy are the two modern options that treat automatic HTTPS and dynamic configuration as core features rather than bolt-ons, which is why they have largely displaced hand-configured nginx for this role.',
        ],
      },
      {
        h: 'Two philosophies',
        p: [
          'Traefik is dynamic-first. It watches the Docker socket, reads labels on your containers, and rebuilds its routing table in real time as containers start and stop. Nothing about a new app requires touching the proxy: the deploy attaches labels (hostname, port, TLS resolver, middlewares) and routing exists moments later. This is why deployment platforms overwhelmingly build on it.',
          'Caddy is config-first, with famously humane syntax: a two-line Caddyfile serves a site over HTTPS. Its Docker-label dynamism comes via the caddy-docker-proxy plugin, which works well but is a community layer on top rather than the core design. Caddy\u2019s heart is the elegant static config; Traefik\u2019s heart is the dynamic provider model.',
        ],
      },
      {
        h: 'Automatic HTTPS compared',
        p: [
          'Both issue and renew Let\u2019s Encrypt certificates automatically and both handle the renewal treadmill so you never think about expiry. Caddy\u2019s implementation is the gold standard: HTTPS is on by default, on-demand TLS can issue certificates for hostnames it has never seen (superb for wildcard-less multi-tenant apps), and its ACME handling has more fallback intelligence out of the box.',
          'Traefik\u2019s certresolvers need a few lines of static configuration once (challenge type, storage file, email), after which per-domain issuance is driven entirely by container labels. At high certificate counts, hundreds of domains on one host, both are reliable; operational reports differ mainly in how much tuning each needed to get there.',
        ],
      },
      {
        h: 'Configuration, side by side',
        p: ['Routing one app with HTTPS in each system:'],
        code: `# Traefik (labels on the app container)
traefik.enable: "true"
traefik.http.routers.app.rule: Host(\`app.example.com\`)
traefik.http.routers.app.entrypoints: https
traefik.http.routers.app.tls.certresolver: letsencrypt
traefik.http.services.app.loadbalancer.server.port: "3000"

# Caddy with caddy-docker-proxy (labels on the app container)
caddy: app.example.com
caddy.reverse_proxy: "{{upstreams 3000}}"`,
      },
      {
        h: 'Middlewares, metrics and ecosystem',
        p: [
          'Traefik\u2019s middleware system is the richer of the two for platform use: redirects, compression, basic auth, rate limiting, IP allowlists, headers and retries compose per-router via labels. It also exposes Prometheus metrics natively and has a built-in dashboard for inspecting routers and services, invaluable when debugging why a hostname is not routing.',
          'Caddy counters with extensibility (plugins compile into the binary, from DNS providers to security modules) and with configuration so readable that mistakes are rare. For a hand-managed server with a stable set of sites, that readability is worth a lot.',
        ],
      },
      {
        h: 'Verdict',
        p: [
          'For a deployment platform juggling containers that come and go, Traefik\u2019s label-driven model, middleware depth and observability make it the default choice; it is what Peon configures out of the box. For a simpler, hand-managed server with a handful of stable services, Caddy\u2019s clarity is compelling. Peon supports both, so the choice is per server rather than forever: pick one, and switch later if your needs change.',
        ],
      },
    ],
  },
  {
    slug: 'docker-compose-vs-kubernetes',
    title: 'Docker Compose vs Kubernetes: What Small Teams Actually Need',
    description:
      'Kubernetes dominates job listings, but Docker Compose on a VPS runs most products just fine. An honest look at when k8s complexity pays off.',
    category: 'comparison',
    keywords: ['docker compose vs kubernetes', 'do i need kubernetes', 'k8s alternative', 'small team infrastructure'],
    date: '2026-06-15',
    readingMinutes: 10,
    sections: [
      {
        h: 'The question behind the question',
        p: [
          'When a small team asks "should we use Kubernetes?", the real question is usually "will we regret not using it when we grow?". The fear of future migration drives teams to adopt orchestration years before they need it, and the cost of that premature adoption is paid every single week in complexity, while the migration it insures against may never come.',
          'This comparison tries to be concrete about what each tool actually provides and what each actually costs a team of one to ten engineers.',
        ],
      },
      {
        h: 'What Kubernetes actually provides',
        p: [
          'Kubernetes earns its complexity when you genuinely need: scheduling across many nodes (bin-packing dozens of services onto a fleet), horizontal autoscaling driven by metrics, self-healing that survives node failure, sophisticated rollout strategies (canary, blue-green with traffic splitting), and a declarative API that large teams and GitOps tooling can build on.',
          'Every one of those features presupposes scale: multiple nodes, many services, several teams. On a single node, most of them degenerate into complicated versions of things Docker already does.',
        ],
      },
      {
        h: 'What Compose on a single host provides',
        p: [
          'Docker Compose plus a platform driving it covers a surprising amount of the same ground for one node:',
        ],
        list: [
          'Declarative service definitions in versionable YAML: yes, compose files',
          'Self-healing: restart policies relaunch crashed containers; health checks detect wedged ones',
          'Zero-downtime deploys: platform-driven rolling replacement behind a proxy, gated on health checks',
          'Service discovery: Docker networks give every service a DNS name',
          'Secrets and config: environment injection from an encrypted store',
          'What is genuinely missing: multi-node scheduling, metric-driven autoscaling, and node-failure survival',
        ],
      },
      {
        h: 'The real cost of Kubernetes for a small team',
        p: [
          'Even managed Kubernetes (EKS, GKE, DOKS) demands a stack of decisions and maintenance that has nothing to do with your product: ingress controller choice and config, cert-manager for TLS, external-dns, a secrets strategy, an observability stack (because kubectl logs does not scale), resource requests and limits tuning, and quarterly control-plane upgrades that occasionally break workloads.',
          'The money is secondary but real: control plane fees plus a minimum sensible node pool start around $75 to $150 a month before your first app. The time is primary: expect someone to spend several hours a week on cluster care, a meaningful tax on a five-person team.',
          'Meanwhile, the single-VPS ceiling is higher than most teams assume. A $40 dedicated-vCPU server (8 cores, 32 GB) serves millions of requests a day for a typical web app. Vertical scaling buys years of headroom, and a second server for the database or staging extends it further without any orchestrator.',
        ],
      },
      {
        h: 'When to actually adopt Kubernetes',
        p: [],
        list: [
          'Sustained load genuinely exceeds what one or two large servers handle',
          'Multiple teams need namespace isolation and RBAC on shared infrastructure',
          'Compliance or platform-engineering mandates require the Kubernetes API as the org standard',
          'You run software distributed as Helm charts that assumes a cluster',
          'Until then: containerized apps on Compose migrate to k8s later with modest effort, so deferring costs little',
        ],
      },
      {
        h: 'The pragmatic middle path',
        p: [
          'Containerize everything from day one, that decision is free and preserves every future option. Run it on a platform like Peon that drives Compose-style deployments with health-checked rollouts on plain VPSes. Revisit the orchestration question when a concrete limit appears (a server you cannot size up, a team you cannot isolate), not when a conference talk makes you nervous. Most products sell, grow and exit without ever needing a cluster.',
        ],
      },
    ],
  },
];
