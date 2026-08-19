import { appHref } from '@/lib/env';

export type SeoSubsection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

export type SeoTable = {
  headers: string[];
  rows: { feature: string; cells: string[] }[];
};

export type SeoSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
  subsections?: SeoSubsection[];
  table?: SeoTable;
};

export type SeoIntroBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

export type SeoFaq = {
  question: string;
  answer: string;
  relatedLink?: { label: string; href: string };
};

export type SeoPage = {
  slug: string;
  kind: 'solution' | 'compare';
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  introContent?: SeoIntroBlock[];
  keywords: string[];
  sections: SeoSection[];
  faqs?: SeoFaq[];
  ctaLabel?: string;
  ctaHref?: string;
  related?: { label: string; href: string }[];
};

const CTA_REGISTER = { ctaLabel: 'Start deploying ($3/project)', ctaHref: appHref('/register') };

export const SOLUTION_PAGES: SeoPage[] = [
  {
    slug: 'self-hosted-paas',
    kind: 'solution',
    title: 'Self-Hosted PaaS & Docker Hosting Provider | Peon',
    description:
      'Compare self-hosted PaaS providers and see why Peon beats a bare Portainer setup for $3/project.',
    eyebrow: 'Solutions',
    h1: 'Self-hosted PaaS without the lock-in',
    intro:
      'A self-hosted PaaS is the middle path between raw Docker on a VPS and renting Heroku or Vercel. You keep the hardware bill; the platform automates git-push deploys, TLS, reverse proxying, databases and team access. Peon is an open-source self-hosted PaaS built for that job: connect any Linux server over SSH, run apps on Docker you control, and choose whether the control plane lives on your metal or in Peon Cloud at $3 per project.',
    keywords: [
      'self-hosted PaaS',
      'self hosted platform as a service',
      'open source PaaS',
      'deploy to own VPS',
      'Heroku alternative self hosted',
      'Coolify self hosted PaaS',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'What buyers mean by “self-hosted PaaS” in 2026',
        paragraphs: [
          'Search traffic for self-hosted PaaS, open-source PaaS, Coolify alternative and “cheapest docker host” has grown because managed platforms price for seats and usage while a commodity VPS still costs a few dollars a month. Coolify made the category familiar; Peon is built for the next step: project RBAC, audit logs, MCP and in-app AI on standard plans. Among PaaS providers built for teams rather than solo labs, the promise is Heroku-shaped workflows on infrastructure you already own, with features peers rarely ship together.',
          'Under the hood the stack is boring on purpose. A Linux host accepts SSH. The platform installs or uses Docker, stands up a reverse proxy (Traefik by default on Peon, with Caddy as an option), terminates TLS with Let’s Encrypt on ports 80/443, and deploys from Git, Dockerfiles, images or Compose. Your apps and databases share a private Docker network on that machine, or across several machines you connect.',
          'The tradeoff is explicit. You still patch the OS, watch disk, and own disaster recovery of the host. What you stop doing is hand-rolling nginx configs, certbot timers and ad-hoc deploy scripts every time a teammate joins.',
        ],
      },
      {
        title: 'Peon vs a bare container hosting service like Portainer',
        paragraphs: [
          'Portainer is a container hosting service in the narrow sense: a web UI over Docker that lets you see, start and stop containers. It\'s a Portainer alternative question we hear a lot, because Portainer stops at container management. It doesn\'t build from Git, issue TLS certificates, run PR previews or model who on your team can deploy what.',
          'Peon covers that same "see my containers" ground and adds the deployment pipeline around it: push to Git and Peon builds and ships the image, attaches a domain, renews certificates, and logs who did it. If you\'re currently running Portainer next to a pile of manual scripts, Peon replaces both with one workflow instead of a dashboard plus glue code.',
        ],
      },
      {
        title: 'What Peon automates on your servers',
        paragraphs: [
          'When you add a server, Peon connects over SSH and prepares Docker, networking and the proxy so you are not starting from a blank box. From there you create projects and services the way a product team already thinks, not as a pile of unrelated containers.',
          'Deployments cover Git repositories (framework detection or Dockerfile), prebuilt images, full Compose stacks and static sites. Databases such as Postgres, MySQL, MariaDB, MongoDB and Redis can live on the same host with scheduled backups and optional upload to S3-compatible storage. Custom domains get automatic HTTPS. PR preview environments can publish to a wildcard hostname when the server and Git permissions are set up.',
          'The marketplace adds one-click Compose templates (hundreds of packaged services) so common tools do not require a weekend of YAML archaeology.',
        ],
        list: [
          'Git, Dockerfile, image, Compose and static deployments',
          'Automatic HTTPS and custom domains',
          'Managed databases with backups on your hardware',
          'PR previews, live logs, notifications and scheduled tasks',
          'One-click marketplace templates',
        ],
      },
      {
        title: 'Self-host free, or Peon Cloud at $3 per project',
        paragraphs: [
          'Peon itself is open source and self-hostable. You can run the entire control plane on your own infrastructure for $0 and only pay for servers, making it one of the cheapest ways to run a real docker hosting provider setup rather than a rented one.',
          'Peon Cloud flips the ops burden on the control plane only: we host the dashboard, orchestration and updates for a flat $3 per project per month. Your applications and databases still run exclusively on servers you own. Cloud pricing is per project: unlimited servers can sit in a workspace while you pay for the projects you actually ship. Coolify Cloud’s per-server model remains a strong fit when fleet size is how you think about cost.',
          'Either option includes unlimited team members. There is no per-seat tax when the company invites designers, PMs or contractors into a project.',
        ],
      },
      {
        title: 'Why teams outgrow “just Docker Compose” (or just Portainer)',
        paragraphs: [
          'Compose files are excellent until the fifth service, the third teammate and the first 2 a.m. rollback. A self-hosted PaaS centralizes env, deploys, TLS and access so the bus factor is not a private SSH key in one laptop. Portainer alone has the same ceiling: it shows you containers, but it doesn\'t decide who can redeploy production or keep a record of who did.',
          'Peon leans into team workflows that many open-source PaaS tools treat as afterthoughts: workspace roles (OWNER, ADMIN, MEMBER and related), project ADMIN/MEMBER roles so you can share an app without sharing every server, owner-visible audit logs on standard plans, a hosted MCP endpoint for AI agents, and an in-app AI assistant that uses the same tools under the same permissions.',
          'If you only need a personal lab, a single Compose stack or Portainer may be enough. If you are a product team or agency with multiple clients on shared iron, a self-hosted PaaS with real RBAC is the difference between shipping and babysitting access.',
        ],
      },
      {
        title: 'Who should choose Peon',
        paragraphs: [
          'Choose Peon when you want PaaS ergonomics on Hetzner, DigitalOcean, AWS EC2 or bare metal, and you care about features most peers still gate or skip: workspace plus project RBAC, owner audit logs on standard plans, a hosted MCP server, and an in-app AI assistant on the same permissions.',
          'Cloud is $3 per project with unlimited servers and unlimited seats, so the invoice tracks how you organize apps, not headcount or connected-server count. Stay on a managed PaaS only when you need a global edge network or a team that must never touch a Linux box. Among self-hosted PaaS providers with modern team and AI workflows, the conclusion is Peon.',
        ],
      },
    ],
    related: [
      { label: 'Application deployment platform', href: '/solutions/application-deployment' },
      { label: 'Peon vs Coolify', href: '/compare/peon-vs-coolify' },
      { label: 'Peon vs Dokploy', href: '/compare/peon-vs-dokploy' },
      { label: 'Peon vs Portainer', href: '/compare/peon-vs-portainer' },
      { label: 'Enterprise', href: '/solutions/enterprise' },
    ],
  },
  {
    slug: 'application-deployment',
    kind: 'solution',
    title: 'Application Deployment Tools for Your Own Servers | Peon',
    description:
      'Peon is a deployment platform with rolling deployments, Git push (GitHub, GitLab, Bitbucket), Docker Compose, on your own VPS from $3/project.',
    eyebrow: 'Solutions',
    h1: 'Application deployment on hardware you own',
    intro:
      'An application deployment platform should make “push to main” the boring path to production. Peon is that platform for teams who refuse to rent someone else’s runtime: connect a Linux server, attach a Git source, and ship web apps, workers, static sites and Compose stacks with TLS, logs and rollbacks included.',
    keywords: [
      'application deployment platform',
      'application deployment tools',
      'continuous deployment tools',
      'git push deploy VPS',
      'Docker deployment platform',
      'deploy Next.js to VPS',
      'self hosted CI/CD',
      'zero downtime deploy Docker',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'The deployment loop teams actually need',
        paragraphs: [
          'Modern product teams expect a short loop: merge a pull request, watch a build, see a URL go healthy, and roll back if metrics lie. On managed platforms that loop is paid for with seats and usage meters. On a naked VPS it is paid for with glue: GitHub Actions, SSH scripts, fragile nginx reloads.',
          'Peon closes the loop on servers you own with the continuous deployment tools that step usually needs. GitHub App, GitLab and Bitbucket connections, public remotes, Dockerfiles and framework-aware builds all land in the same project model. Prebuilt images work when CI already produces artifacts. Compose covers multi-process apps that never fit a single “web dyno” shape.',
          'Rolling deployment is the default: updates aim for zero-downtime swaps, and prior images stay available for one-click rollback. Live logs and health checks make the deploy visible instead of a black box SSH session.',
        ],
      },
      {
        title: 'Framework and language support',
        paragraphs: [
          'Peon detects and builds Node.js, Next.js, Python (including Django), Go, Rails and PHP projects automatically, or falls back to your Dockerfile when a framework doesn\'t fit a preset. That makes it a practical option whether you\'re looking for node web hosting for an API, a home for a Django app, or somewhere to run a Go worker next to both, without switching platforms per language.',
        ],
      },
      {
        title: 'Previews, domains and day-2 operations',
        paragraphs: [
          'Pull request previews publish to a short SHA on your server’s wildcard domain when permissions and DNS are configured, close cousins of Vercel previews, without leaving your network. Custom domains attach with automatic Let’s Encrypt certificates and HTTP to HTTPS redirects.',
          'Day-2 work is where platforms earn their keep. Peon covers shared and per-service environment variables (encrypted at rest), scheduled tasks inside containers, notifications to email, Slack, Discord, Telegram and webhooks, and an SSH terminal in the UI for the moments only a shell will do.',
          'Databases and marketplace templates sit beside applications so a “full stack” deploy is not three vendors and four invoices.',
        ],
        list: [
          'Git (GitHub, GitLab, Bitbucket), image, Compose and static pipelines',
          'PR preview environments on your wildcard domain',
          'Automatic HTTPS and custom domains',
          'Rolling deployment with rollback to prior images',
          'Logs, metrics hooks, notifications and scheduled tasks',
        ],
      },
      {
        title: 'Access control for multi-person deploys',
        paragraphs: [
          'Deployment platforms fail socially before they fail technically. Someone shares a root key; someone deploys the wrong project; nobody can say who changed production env last Tuesday.',
          'Peon models workspaces and projects with roles. Workspace OWNER and ADMIN manage infrastructure and membership. Project ADMIN can deploy and manage services; project MEMBER stays read-oriented with secrets masked. Audit logs give owners a trail across deploys, servers and settings.',
          'The same rules apply to MCP tokens and the in-app AI assistant. Agents can help with deploys and diagnostics without inventing a parallel permission system.',
        ],
      },
      {
        title: 'Pricing that matches how you ship',
        paragraphs: [
          'Self-host Peon for free, or use Peon Cloud at $3 per project per month with unlimited team members and unlimited servers in the workspace. You still pay the VPS provider, often a few dollars for a box that can run several apps, including Node, Python/Django and Go services side by side.',
          'Compare that to per-seat frontend platforms or per-dyno stacks when three engineers and two services share a production environment. The deployment experience stays familiar; the invoice stops scaling with headcount.',
          'Agencies and multi-product startups benefit most: each client or product becomes a Peon project with its own members and secrets, while shared infrastructure (servers, keys, marketplace templates) lives at the workspace layer. That structure is hard to fake with a single Compose file and a shared SSH key.',
          'If you are evaluating application deployment tools this week, start with one service on a non-production server. Wire Git, attach a domain, trigger a deploy, invite a teammate as project MEMBER, and confirm they can see logs without seeing every secret. That thirty-minute path tells you more than any feature checklist, and it\'s the fastest way to judge whether Peon belongs on your shortlist of continuous deployment software.',
        ],
      },
    ],
    related: [
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'Databases on your VPS', href: '/solutions/databases' },
      { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
      { label: 'Peon vs Railway', href: '/compare/peon-vs-railway' },
      { label: 'MCP & AI', href: '/solutions/mcp-ai' },
    ],
  },
  {
    slug: 'databases',
    kind: 'solution',
    title: 'PostgreSQL Web Hosting on Your Own Servers | Peon',
    description:
      'Web hosting for PostgreSQL, MySQL, MongoDB & Redis on your VPS with Peon. Schedule backups to S3-compatible storage, and restore when needed for your next apps.',
    eyebrow: 'Solutions',
    h1: 'Databases that live next to your apps',
    intro:
      'Managed database products are convenient and far away. Every query pays a network tax; every environment pays another line item. Peon provisions databases, including PostgreSQL web hosting, on the same Docker hosts as your applications, with backups, restores and team access, so latency stays local and the bill stays a VPS plus $3 per project.',
    keywords: [
      'PostgreSQL web hosting',
      'self hosted postgres',
      'database on VPS',
      'Postgres backups S3',
      'Redis on Docker',
      'self hosted MySQL',
      'MongoDB self hosted PaaS',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'Why colocated PostgreSQL still wins for many apps',
        paragraphs: [
          'Serverless and multi-region databases solve real problems at scale. Most early and mid-stage products are not that problem. They are a web process, a worker, Postgres and maybe Redis on a quiet VPS in one region, with Cloudflare in front for static assets if needed.',
          'When the database sits beside the app on the same Docker network, round trips collapse from tens of milliseconds to sub-millisecond. Connection pooling gets simpler. Staging can mirror production topology without buying a second managed cluster.',
          'Peon leans into that topology. Databases are first-class services you provision from the same dashboard as apps, whether that app is a Node.js API, a Django project, or a Compose stack, not a separate vendor account with its own IAM story.',
        ],
      },
      {
        title: 'Engines, networking and backups',
        paragraphs: [
          'Spin up Postgres, MySQL, MariaDB, MongoDB or Redis on hardware you control. They join the private Docker network Peon manages on the server so applications reach them over internal DNS instead of the public internet.',
          'Backups are the feature people skip until they need them. Peon supports scheduled database backups with local retention and optional upload to S3-compatible object storage (AWS S3, Cloudflare R2, Backblaze B2, Hetzner Object Storage, MinIO and similar). Restore flows exist so the backup is not a theoretical checkbox.',
          'Pair that with marketplace templates when you want a packaged stack (app + database) without writing Compose from scratch.',
        ],
        list: [
          'Postgres, MySQL, MariaDB, MongoDB and Redis',
          'Private Docker networking next to your apps',
          'Scheduled backups with local retention',
          'Optional S3-compatible offsite upload and restore',
        ],
      },
      {
        title: 'Security and team boundaries',
        paragraphs: [
          'Database credentials are secrets. Peon encrypts environment values at rest and scopes who can reveal or edit them through project roles. Workspace owners can review audit events when configuration changes.',
          'MCP and the in-app AI assistant can help operators inspect and manage database-related resources within RBAC, useful for “what’s the staging Postgres host?” without pasting .env files into chat.',
          'You still own host-level hardening: firewall, disk encryption, provider snapshots. Peon automates the application-layer database lifecycle on top of that baseline.',
        ],
      },
      {
        title: 'Cost shape versus managed PostgreSQL hosting',
        paragraphs: [
          'A managed Postgres add-on on a classic PaaS often costs more per month than an entire mid-size VPS. On Peon, database cost is mostly the disk and RAM you already bought, plus the flat project fee if you use Cloud. That makes it one of the more affordable paths to PostgreSQL web hosting once you\'re past a toy project.',
          'That does not replace every managed offering. If you need multi-region failover, point-in-time recovery SLAs or a dedicated DBA product, buy that deliberately. For the long tail of product databases, colocated engines on Peon are the rational default.',
        ],
      },
      {
        title: 'A practical setup pattern',
        paragraphs: [
          'Most teams start with Postgres and Redis on the same host as the web process (often the Node.js or Django app they\'re also hosting on Peon), keep a nightly backup that lands in object storage, and promote a second project for staging with its own database instance. When a release needs a schema migration, they run it as a one-off task or from CI against the private network hostname Peon exposes.',
          'As traffic grows, vertical scale (a bigger VPS) is often enough for a long time. Horizontal split (database on a dedicated server in the same Peon workspace) is available when CPU and I/O contend with app containers. You do not have to redesign the product to change topology; you attach another server and move the database service.',
          'That progression (colocated, then dedicated host, then managed cloud database only if you truly need it) is how Peon teams avoid premature complexity without painting themselves into a corner.',
        ],
      },
    ],
    related: [
      { label: 'Application deployment', href: '/solutions/application-deployment' },
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Peon vs DigitalOcean', href: '/compare/peon-vs-digitalocean' },
    ],
  },
  {
    slug: 'mcp-ai',
    kind: 'solution',
    title: 'MCP Server for Cursor & Claude Deployments | Peon',
    description:
      "Peon's hosted MCP server lets Cursor, Claude, and other AI agents deploy, rollback, and manage services under your workspace RBAC permissions.",
    eyebrow: 'Solutions',
    h1: 'Deploy with AI agents without giving up control',
    intro:
      'AI coding agents are already writing pull requests. The next bottleneck is operations: who is allowed to deploy, what they can see, and whether anyone can reconstruct what happened. Peon ships a Model Context Protocol endpoint, an MCP server Cursor, Claude and similar tools can connect to directly, plus an in-app assistant, so agents work inside your PaaS, not around it.',
    keywords: [
      'MCP server Cursor',
      'MCP deployment',
      'AI agent DevOps',
      'Model Context Protocol PaaS',
      'Cursor deploy MCP',
      'AI assistant self hosted PaaS',
      'MCP server Docker deploy',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'Why an MCP server matters for a deployment platform',
        paragraphs: [
          'Model Context Protocol is becoming the USB-C of tool access for agents. Without a first-class MCP surface, teams glue shell scripts, personal tokens and half-documented APIs into every chat session. Those glues ignore roles, skip audit logs and rot when endpoints change.',
          'Peon exposes a hosted Streamable HTTP MCP endpoint on your app origin, the same MCP server Cursor and Claude Desktop can add as a tool source. Authenticate with a Peon API token pinned to a workspace. Tools cover projects, services, deployments, environment, backups, servers, sources, members, shared variables, notifications and related resources, the same surface the product uses internally.',
          'Permissions follow the same RBAC as the REST API and UI. A token cannot quietly escalate past the member who created it. That is the difference between “AI can deploy” and “AI can deploy as you.”',
        ],
      },
      {
        title: 'In-app AI assistant on the same rails',
        paragraphs: [
          'Peon Chat lives inside the product for teammates who do not want to wire an external agent. Bring your own OpenAI or Anthropic API keys under workspace LLM settings. The assistant uses the same MCP-derived tools, can look up the user manual for how-to answers, and asks for UI approval before mutating production state.',
          'That approval step is deliberate. Autonomy without a human checkpoint is how staging credentials end up in the wrong place. Peon treats agents as powerful operators under policy, not as root.',
          'Together, MCP and Chat mean the same mental model whether you work in Cursor, Claude Desktop or the Peon sidebar.',
        ],
      },
      {
        title: 'Auditability and team fit',
        paragraphs: [
          'Workspace owners can review audit logs for actions across resources. When an agent or human changes env or triggers a deploy, the trail is not a Discord screenshot.',
          'Project roles still apply. You can invite a contractor to one project without opening every server. Agents inherit those boundaries through tokens and memberships.',
          'Enterprise plans add SSO/SAML, SCIM and fine-grained packaging for organizations that need identity-provider grade control on top of the same deployment engine.',
        ],
      },
      {
        title: 'What Peon MCP is not',
        paragraphs: [
          'It is not a generic Linux remote shell for agents. High-risk interactive terminal access stays in the product’s Terminal UI where humans can see context. It is not a replacement for CI. Builds and policies you already trust in GitHub Actions can coexist; Peon is the deploy and runtime control plane. It is also not an AI model hosting service: Peon’s MCP server lets agents manage your deployments, it does not serve or run the models themselves.',
          'Used well, MCP and Chat shorten the distance between “the agent fixed the bug” and “production is healthy” without inventing a second ops stack.',
        ],
      },
      {
        title: 'Example workflows teams already run',
        paragraphs: [
          'A developer asks Cursor, connected to Peon’s MCP server, to list failed deployments on a project, open the latest log snippet, and propose a rollback, then clicks approve in Peon Chat or confirms via the UI when the agent surfaces the same action. A founder asks the in-app assistant how to attach a custom domain and gets an answer grounded in the user manual, not a hallucinated Traefik tutorial.',
          'An agency operator creates a scoped API token for a contractor’s agent that can deploy one client project and nothing else. When the engagement ends, revoke the token and remove the membership; the agent cannot linger with god-mode credentials.',
          'These flows only work if the platform treats agents as first-class operators under policy. That is the product bet behind Peon MCP and Chat, not a demo script pasted into a README.',
        ],
      },
    ],
    related: [
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'Application deployment', href: '/solutions/application-deployment' },
      { label: 'Enterprise', href: '/solutions/enterprise' },
      { label: 'Docs', href: '/docs' },
    ],
  },
  {
    slug: 'enterprise',
    kind: 'solution',
    title: 'Peon Enterprise: SSO, White Label & Priority Support',
    description:
      'Peon Enterprise for organizations that need SSO/SAML, SCIM, white labeling, MSA/SLA and flexible hosting, on top of $3/project cloud or free self-host for standard teams.',
    eyebrow: 'Solutions',
    h1: 'Enterprise control for teams that ship on their own servers',
    intro:
      'Most companies do not need Enterprise on day one. They need an application deployment platform that already includes project roles, audit logs and unlimited seats. Peon Cloud does that at $3 per project. Enterprise is the layer above: identity-provider integration, white label, contracts and hosting flexibility when IT, security and procurement enter the chat.',
    keywords: [
      'enterprise self hosted PaaS',
      'SSO SAML deployment platform',
      'white label PaaS',
      'SCIM provisioning DevOps',
      'on prem PaaS',
      'enterprise Docker PaaS',
    ],
    ctaLabel: 'Contact sales',
    ctaHref: 'mailto:support@peon.sh?subject=Enterprise%20inquiry',
    sections: [
      {
        title: 'Start from a complete standard platform',
        paragraphs: [
          'Unlike vendors that hide audit logs or fine collaboration behind Enterprise SKUs, Peon’s Self Hosted and Cloud plans already include workspace and project RBAC, audit logs, MCP and the in-app AI assistant. Unlimited team members are not an upsell.',
          'Enterprise builds on that foundation. You are not buying “basic deploys” again; you are buying packaging, identity and commercial terms for larger organizations.',
        ],
      },
      {
        title: 'Identity, provisioning and access',
        paragraphs: [
          'Fine-grained RBAC extends the standard role model for organizations with stricter separation of duties. SSO/SAML integrates with providers such as Azure AD and Okta so employees use the corporate identity they already have.',
          'SCIM user provisioning helps IT onboard and offboard automatically. When someone leaves the company, access to the deployment control plane should leave with them, not linger on a shared password.',
          'These controls sit on the same deployment engine your teams already use for Git pushes, Compose, databases and previews.',
        ],
        list: [
          'Fine-grained RBAC',
          'SSO / SAML (Azure, Okta and similar)',
          'SCIM user provisioning',
          'Everything in Cloud, plus commercial packaging',
        ],
      },
      {
        title: 'Hosting flexibility and white labeling',
        paragraphs: [
          'Choose managed Peon Cloud or an on-prem / private-cloud control plane. Applications still deploy to servers you designate. We do not force a shared multi-tenant runtime for your workloads.',
          'White labeling matters for agencies and internal platforms that present the control plane under their own brand. MSA/SLA options and priority support give procurement and SRE a named escalation path.',
        ],
      },
      {
        title: 'When to talk to sales',
        paragraphs: [
          'Talk to us when security questionnaires ask for SAML, when you need a signed MSA, when you must run the control plane inside a private network, or when white label is part of the product you sell to your own customers.',
          'If you are a startup shipping on one or two VPS boxes, start on Self Hosted or Cloud. Graduate to Enterprise when the organization, not the Docker host, becomes the hard part.',
        ],
      },
      {
        title: 'What Enterprise does not change',
        paragraphs: [
          'Enterprise does not move your applications onto a shared Peon multi-tenant runtime. Workloads still land on servers you designate, the same SSH and Docker model as Self Hosted and Cloud. What changes is how people authenticate, how IT provisions accounts, how the control plane is branded, and how contracts are written.',
          'That separation matters for architecture reviews. Security teams can evaluate the data plane (your VPS providers, your regions, your backups) independently from the control plane (Peon Cloud or on-prem). Procurement can negotiate commercial terms without forcing a rewrite of every Compose file.',
          'If you already standardize on Hetzner, AWS or a private bare-metal fleet, Enterprise is an identity and packaging layer on top of that standard, not a new cloud region you must migrate into.',
          'Email support@peon.sh with your seat count, identity provider, hosting preference (Cloud vs on-prem) and whether white label is required. We will map that to a concrete package instead of a generic sales deck.',
        ],
      },
    ],
    related: [
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'MCP & AI', href: '/solutions/mcp-ai' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Peon vs Dokploy', href: '/compare/peon-vs-dokploy' },
    ],
  },
];

export const COMPARE_PAGES: SeoPage[] = [
  {
    slug: 'peon-vs-coolify',
    kind: 'compare',
    title: 'Peon vs Coolify (2026): The Coolify Alternative Teams Pick',
    description:
      'Peon vs Coolify: both self-hosted PaaS on your VPS. Peon uniquely combines project RBAC, audit logs & MCP for $3/project Cloud with unlimited servers & seats.',
    eyebrow: 'Compare',
    h1: 'Peon vs Coolify: a Coolify alternative built for teams',
    intro:
      'If you\'re comparing Peon vs Coolify, you\'re looking at two of the most popular self-hosted PaaS platforms for deploying applications on your own infrastructure.',
    introContent: [
      {
        type: 'p',
        text: 'If you\'re comparing Peon vs Coolify, you\'re looking at two of the most popular self-hosted PaaS platforms for deploying applications on your own infrastructure.',
      },
      {
        type: 'p',
        text: 'Both platforms transform a Linux server into a modern deployment platform by automating Docker, reverse proxy configuration, SSL certificates, and Git-based deployments.',
      },
      {
        type: 'p',
        text: 'At a high level, both solutions let you deploy applications on providers such as:',
      },
      {
        type: 'ul',
        items: [
          'Hetzner',
          'DigitalOcean',
          'AWS',
          'Google Cloud',
          'Azure',
          'Self-hosted Linux servers',
        ],
      },
      {
        type: 'p',
        text: 'The real difference isn\'t whether they can deploy Docker applications—they both can. The difference lies in team collaboration, access control, auditability, AI-powered operations, and pricing.',
      },
    ],
    keywords: [
      'Peon vs Coolify',
      'Coolify vs Peon',
      'Coolify alternative',
      'best self hosted PaaS 2026',
      'Coolify cloud pricing',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'Infrastructure and Deployment',
        paragraphs: [
          'Both Peon and Coolify provide a similar deployment experience.',
          'Both platforms use SSH to connect securely to your servers while keeping your applications on infrastructure you own.',
          'For developers who want complete control over production environments without relying on proprietary cloud hosting, both are excellent choices.',
        ],
        list: [
          'Deploy applications with Docker',
          'Use Docker Compose',
          'Connect Git repositories',
          'Configure custom domains',
          'Enable automatic HTTPS with Let\'s Encrypt',
          'Manage multiple applications from a single dashboard',
        ],
      },
      {
        title: 'Team Collaboration: Where Peon Stands Out',
        paragraphs: [
          'As organizations grow, deployment platforms need to do more than deploy containers. Engineering teams require:',
          'Peon is designed with these workflows in mind.',
        ],
        list: [
          'Role-based permissions',
          'Secure collaboration',
          'Deployment visibility',
          'Project isolation',
          'Audit history',
        ],
        subsections: [
          {
            title: 'Workspace and Project RBAC',
            paragraphs: [
              'Peon supports both workspace-level and project-level role-based access control (RBAC).',
              'This allows organizations to invite contractors to a single project, restrict production access, separate client applications, and manage permissions without exposing every server.',
              'This project-based permission model makes Peon especially valuable for agencies, startups, and growing engineering teams.',
            ],
          },
          {
            title: 'Audit Logs and Deployment Visibility',
            paragraphs: [
              'Knowing who changed production—and when—is essential for operational security.',
              'Peon includes owner-visible audit logs on both Self Hosted and Cloud plans, making it easier to track deployments, review infrastructure changes, improve operational transparency, and support security and compliance processes.',
              'For teams that prioritize accountability from day one, built-in audit logs provide immediate visibility into deployment activity.',
            ],
          },
          {
            title: 'AI-Powered DevOps',
            paragraphs: [
              'One of the biggest differences between Peon and Coolify is the focus on AI-assisted infrastructure management.',
            ],
          },
          {
            title: 'MCP Support',
            paragraphs: [
              'Peon includes a hosted Model Context Protocol (MCP) endpoint that allows compatible AI tools to interact with deployment environments using the same permissions as the authenticated user.',
              'This enables AI-assisted deployment workflows while maintaining consistent access control.',
            ],
          },
          {
            title: 'Built-in AI Assistant',
            paragraphs: [
              'Peon also includes an integrated AI assistant directly inside the platform.',
              'Rather than treating AI as an external integration, Peon makes it part of the deployment experience.',
            ],
            list: [
              'Natural language deployment management',
              'Shared permission model with RBAC',
              'BYO OpenAI or Anthropic API keys',
              'Approval workflow before production changes',
              'AI-assisted infrastructure operations',
            ],
          },
        ],
      },
      {
        title: 'Pricing Comparison',
        paragraphs: [
          'Pricing is another major difference between the two platforms.',
          'For organizations hosting multiple applications on a single VPS, project-based pricing may offer a more predictable cost structure.',
          'Both platforms can be self-hosted without software licensing costs, making cloud management optional.',
        ],
        subsections: [
          {
            title: 'Peon Pricing',
            paragraphs: [
              'Peon Cloud starts at $3 per project/month and includes:',
              'This pricing model aligns with how many software teams organize their work—by project rather than by server.',
            ],
            list: [
              'Unlimited servers',
              'Unlimited team members',
              'Workspace collaboration',
              'Project management',
            ],
          },
          {
            title: 'Coolify Pricing',
            paragraphs: [
              'Coolify offers both self-hosted and cloud options.',
              'Cloud pricing is generally based on the number of connected servers, making costs increase as infrastructure grows.',
            ],
          },
        ],
      },
      {
        title: 'Feature Comparison',
        paragraphs: [],
        table: {
          headers: ['Feature', 'Peon', 'Coolify'],
          rows: [
            { feature: 'Self-hosted', cells: ['✅', '✅'] },
            { feature: 'Docker Deployments', cells: ['✅', '✅'] },
            { feature: 'Docker Compose', cells: ['✅', '✅'] },
            { feature: 'Git Deployments', cells: ['✅', '✅'] },
            { feature: 'Automatic HTTPS', cells: ['✅', '✅'] },
            { feature: 'Workspace RBAC', cells: ['✅', 'Limited'] },
            { feature: 'Project RBAC', cells: ['✅', 'Limited'] },
            { feature: 'Audit Logs', cells: ['✅', 'Varies by deployment'] },
            { feature: 'MCP Support', cells: ['✅', 'Limited'] },
            { feature: 'Built-in AI Assistant', cells: ['✅', 'No integrated equivalent'] },
            { feature: 'Unlimited Servers', cells: ['✅', 'Depends on plan'] },
            { feature: 'Unlimited Team Members', cells: ['✅', 'Depends on plan'] },
          ],
        },
      },
      {
        title: 'Which Platform Should You Choose?',
        paragraphs: [],
        subsections: [
          {
            title: 'Choose Coolify if you want:',
            list: [
              'A mature open-source ecosystem',
              'Extensive community support',
              'A large collection of deployment templates',
              'A simple Docker deployment platform for personal projects',
            ],
          },
          {
            title: 'Choose Peon if you want:',
            list: [
              'Workspace and project RBAC',
              'Built-in audit logs',
              'AI-powered deployment workflows',
              'Hosted MCP support',
              'An integrated AI assistant',
              'Predictable project-based pricing',
              'Better collaboration for growing teams',
            ],
          },
        ],
      },
      {
        title: 'Migrating from Coolify to Peon',
        paragraphs: [
          'If you\'re already using Coolify, migration can be incremental.',
          'This phased approach minimizes operational risk while allowing teams to evaluate Peon\'s collaboration and AI capabilities before fully migrating.',
        ],
        list: [
          'Deploy a non-production application in Peon',
          'Connect the existing Git repository',
          'Invite team members using project-level permissions',
          'Test deployments with the built-in AI assistant or MCP',
          'Review deployment activity using audit logs',
          'Move production workloads when you\'re ready',
        ],
      },
      {
        title: 'Final Verdict: Peon vs Coolify',
        paragraphs: [
          'Both Peon and Coolify are capable self-hosted PaaS platforms that simplify Docker deployments on your own infrastructure.',
          'Coolify has earned a strong reputation through its open-source community, extensive template ecosystem, and reliable deployment experience.',
          'Peon builds on that foundation by emphasizing the needs of modern engineering teams.',
          'With workspace and project RBAC, built-in audit logs, hosted MCP support, an integrated AI assistant, unlimited servers and team members, and Cloud pricing starting at $3 per project/month, Peon offers a deployment platform designed for collaboration as well as infrastructure management.',
          'If you\'re looking for a Coolify alternative that combines Docker-native deployments with modern DevOps collaboration and AI-powered operations, Peon is a compelling choice for teams planning to scale beyond individual projects.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Coolify vs Dokploy: which one should I actually pick?',
        answer:
          'Both are solid, actively developed self-hosted PaaS tools with real communities behind them. Dokploy tends to run lighter on resources with a simpler interface; Coolify has the larger template library and a more mature preview-deployment workflow. Neither ships project-level RBAC or an official operational MCP server the way Peon does, so if you\'re choosing between all three, the deciding factor is usually whether you need team isolation and AI-agent deploy access, not just "which one deploys Docker."',
        relatedLink: { label: 'Peon vs Dokploy', href: '/compare/peon-vs-dokploy' },
      },
      {
        question: 'Is Coolify really free to self-host?',
        answer:
          'Yes. Coolify\'s self-hosted version is free with no feature paywall, you pay only for the server it runs on. Peon works the same way: self-hosting is free forever with the full feature set, and Cloud is optional at $3/project/month if you\'d rather not run the control plane yourself.',
        relatedLink: { label: 'Pricing', href: '/#pricing' },
      },
      {
        question: 'Does Coolify support Docker Compose deployments?',
        answer:
          'Yes, Coolify deploys Docker Compose stacks natively, as does Peon. Both also support prebuilt images and Git-based builds, so Compose support isn\'t a differentiator between them, project RBAC, audit logs, and MCP scope are.',
      },
      {
        question: 'What\'s a good Coolify alternative for a growing team, not a solo project?',
        answer:
          'Peon is built specifically for that transition: workspace and project RBAC, owner-visible audit logs, and an MCP server with operational (not just read) actions are included on every plan, including self-hosted, rather than something you grow into on a higher tier.',
      },
      {
        question: 'Is Peon a Coolify alternative?',
        answer:
          'Yes. Peon is a self-hosted PaaS in the same category as Coolify, connect your own server, get git-push deploys, Docker Compose, databases, and automatic HTTPS, with the addition of project-level access control and an AI agent layer built in from the start.',
      },
    ],
    related: [
      { label: 'Peon vs Dokploy', href: '/compare/peon-vs-dokploy' },
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'MCP & AI', href: '/solutions/mcp-ai' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    slug: 'peon-vs-dokploy',
    kind: 'compare',
    title: 'Peon vs Dokploy (2026): Dokploy Alternative, Per Project Cloud',
    description:
      'Compare Peon and Dokploy: both self-hosted PaaS options. Peon is a Dokploy alternative with audit logs and MCP included.',
    eyebrow: 'Compare',
    h1: 'Peon vs Dokploy: a Dokploy alternative priced per project',
    intro:
      'When comparing Peon vs Dokploy, pricing is one of the biggest differences between the two platforms.',
    introContent: [
      {
        type: 'p',
        text: 'When comparing Peon vs Dokploy, pricing is one of the biggest differences between the two platforms.',
      },
      {
        type: 'p',
        text: 'Both platforms help teams deploy and manage Docker applications on their own infrastructure, but they follow different pricing approaches.',
      },
      {
        type: 'p',
        text: 'Dokploy uses a server-based pricing model, where costs increase as you add more servers. Peon follows a project-based pricing model, allowing teams to manage multiple servers without additional server-based charges.',
      },
    ],
    keywords: [
      'Peon vs Dokploy',
      'Dokploy alternative',
      'Dokploy vs Peon',
      'Coolify vs Dokploy',
      'Dokploy pricing',
      'Dokploy Hobby',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'Pricing Models',
        paragraphs: [],
        subsections: [
          {
            title: 'Dokploy Pricing Model',
            paragraphs: [
              'Dokploy Cloud pricing is structured around the number of servers you manage.',
              'Its Hobby plan is published around $4.50 per server/month and comes with limitations, including restricted user access. Higher-tier Startup plans include multiple servers (for example, three included servers from around $15/month) with additional servers billed separately.',
              'This model can work well for teams managing a small number of dedicated servers.',
            ],
          },
          {
            title: 'Peon Pricing Model',
            paragraphs: [
              'Peon Cloud uses a simpler project-based pricing model.',
              'Plans start at $3 per project/month, including:',
              'For teams running multiple applications across fewer servers, Peon’s pricing model can be more cost-efficient.',
              'For example, startups, agencies, and SaaS companies managing multiple services on a few VPS machines may benefit more from project-based pricing rather than paying separately for every server.',
              'Always check the latest pricing pages before making a purchasing decision, as SaaS pricing and feature limits may change over time.',
            ],
            list: [
              'Unlimited servers',
              'Unlimited team members',
              'Project-based management',
              'Self-hosting support',
            ],
          },
        ],
      },
      {
        title: 'RBAC and Audit Logs: Which Platform Gives Better Team Control?',
        paragraphs: [
          'As development teams grow, managing access to production environments becomes critical.',
          'A modern deployment platform should provide:',
        ],
        list: [
          'Role-based access control (RBAC)',
          'Deployment history',
          'User activity tracking',
          'Project isolation',
          'Security visibility',
        ],
        subsections: [
          {
            title: 'Dokploy RBAC and Audit Features',
            paragraphs: [
              'Dokploy provides basic user roles on lower-tier plans.',
              'Advanced enterprise security features such as fine-grained RBAC, SSO/SAML authentication, SCIM provisioning, and audit logs are positioned as enterprise features.',
              'This approach is common among infrastructure platforms that reserve advanced security controls for larger organizations.',
            ],
          },
          {
            title: 'Peon RBAC and Audit Features',
            paragraphs: [
              'Peon includes team collaboration features across Self Hosted and Cloud plans, including workspace-level permissions, project-based RBAC, owner audit logs, and deployment activity tracking.',
              'Enterprise plans add additional capabilities such as:',
              'For teams that need project isolation and deployment visibility from day one, Peon provides these capabilities without requiring an enterprise contract.',
            ],
            list: [
              'SSO/SAML',
              'SCIM',
              'White labeling',
              'MSA/SLA support',
              'Flexible hosting options',
            ],
          },
        ],
      },
      {
        title: 'MCP and AI Assistants: The Future of Deployment Automation',
        paragraphs: [
          'AI is changing how developers manage infrastructure, and deployment platforms are beginning to integrate AI-powered workflows.',
          'Both Peon and Dokploy support MCP (Model Context Protocol), allowing AI agents to interact with deployment environments.',
        ],
        subsections: [
          {
            title: 'Dokploy AI Capabilities',
            paragraphs: [
              'Dokploy provides MCP support, allowing AI agents to manage deployments and services through connected tools.',
              'This enables developers to automate deployment-related tasks using external AI assistants.',
            ],
          },
          {
            title: 'Peon AI Capabilities',
            paragraphs: [
              'Peon also supports MCP but extends the workflow with an integrated AI assistant inside the platform.',
              'Peon AI Assistant provides:',
              'For developers using tools like Cursor or Claude, both platforms can support AI-powered workflows.',
              'However, teams looking for an AI-native deployment platform with an internal chat interface and shared permissions may find Peon’s approach more complete.',
            ],
            list: [
              'Natural language infrastructure management',
              'Access to the same deployment tool ecosystem',
              'Approval-based execution for sensitive actions',
              'BYO LLM key support',
              'Chat-based deployment workflows',
            ],
          },
        ],
      },
      {
        title: '\'Coolify vs Dokploy\' often really means \'which self-hosted PaaS\'',
        paragraphs: [
          'Many searches for “Coolify vs Dokploy” are not really about picking between two logos—they are shorthand for “which self-hosted PaaS should I run on my VPS?” Coolify and Dokploy both deploy Docker on hardware you own with open-source paths and optional cloud control planes.',
          'If you landed on Peon vs Dokploy after that comparison, the extra question is what happens when your team outgrows solo-operator deploys: project isolation, audit trails, AI agents under RBAC, and whether Cloud pricing scales by server or by project.',
          'Peon is worth evaluating alongside Dokploy when those team and AI features matter on standard plans, not only after an Enterprise upgrade.',
        ],
      },
      {
        title: 'Peon vs Dokploy: Which Deployment Platform Should You Choose?',
        paragraphs: [],
        subsections: [
          {
            title: 'Choose Peon If You Need:',
            list: [
              'Project-based pricing instead of server-based billing',
              'Unlimited servers and team members',
              'Built-in project RBAC',
              'Audit logs without enterprise upgrades',
              'MCP-powered AI workflows',
              'An integrated AI assistant inside your PaaS',
              'Better support for teams managing multiple applications',
            ],
          },
          {
            title: 'Choose Dokploy If You Need:',
            list: [
              'A simple Docker deployment platform',
              'Server-based pricing that matches your infrastructure model',
              'MCP support for external AI workflows',
              'A lightweight self-hosted PaaS experience',
            ],
          },
        ],
      },
      {
        title: 'Quick Comparison Summary',
        paragraphs: [],
        list: [
          'Dokploy Hobby: Around $4.50/server/month with limited users on entry plans',
          'Peon Cloud: $3/project/month with unlimited servers and unlimited members',
          'Dokploy Advanced RBAC & Audit Logs: Enterprise-focused',
          'Peon RBAC, Audit Logs, MCP & AI Assistant: Available on standard Cloud and Self Hosted plans',
        ],
      },
      {
        title: 'Where Peon and Dokploy Are Similar',
        paragraphs: [
          'At their core, both Peon and Dokploy are designed to simplify Docker application deployment.',
          'Both platforms support:',
          'If your only requirement is “Can this platform deploy my Docker application?” both solutions can handle the job.',
          'The real difference appears when you consider everything around deployment: who can access production, how do teams collaborate, how are changes tracked, how does pricing scale, and how deeply is AI integrated?',
        ],
        list: [
          'Docker deployments',
          'Self-hosted infrastructure',
          'VPS-based deployments',
          'Docker Compose applications',
          'Domains and HTTPS management',
          'Deployment logs',
          'Application templates',
          'Cloud control planes',
        ],
      },
      {
        title: 'Final Verdict: Peon vs Dokploy',
        paragraphs: [
          'Docker deployment itself has become a commodity. The real value comes from the tools that help teams operate securely, collaborate efficiently, and automate infrastructure management.',
          'Dokploy is a capable open-source Docker deployment platform with a server-based pricing approach and MCP support.',
          'Peon differentiates itself by combining project-based pricing, unlimited servers and team members, built-in RBAC, audit logs, MCP support, and an integrated AI assistant.',
          'For teams searching for a Dokploy alternative with stronger collaboration features, transparent pricing, and AI-powered DevOps workflows, Peon offers a more complete package.',
          'If your needs stop at deploying Docker containers, both platforms are suitable.',
          'If you need a modern AI-powered self-hosted PaaS built for teams, Peon is the stronger choice.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Dokploy lighter than Coolify?',
        answer:
          'Users comparing the two often report Dokploy using fewer server resources with a simpler interface, while Coolify has the larger template catalog and community. For a self-hosted PaaS on a small VPS, that resource difference can matter, but neither includes project-level RBAC or an included audit trail the way Peon does, worth weighing alongside raw resource usage.',
        relatedLink: { label: 'Peon vs Coolify', href: '/compare/peon-vs-coolify' },
      },
      {
        question: 'Is Dokploy really free?',
        answer:
          'Dokploy\'s core features are free and open source under Apache 2.0; some enterprise-grade functionality is licensed separately, and RBAC/audit logs sit behind their Enterprise tier specifically. Peon\'s audit logs and project RBAC are included on Self Hosted and Cloud without a separate Enterprise gate.',
        relatedLink: { label: 'Pricing', href: '/#pricing' },
      },
      {
        question: 'Dokploy vs CapRover, which is better for a small team?',
        answer:
          'CapRover is older and more focused on Docker Swarm multi-server stability; Dokploy is newer with a more modern UI and Compose-first workflow. Neither was built with per-project team isolation in mind the way Peon\'s workspace/project model is, useful to know if you\'re deploying for multiple clients or teams rather than a single personal server.',
      },
      {
        question: 'What\'s a good Dokploy alternative with team permissions built in?',
        answer:
          'Peon: same Docker-native, git-push deploy model as Dokploy, plus workspace and project RBAC, owner-visible audit logs, and an MCP server with operational actions included on every plan, not held back for an Enterprise contract.',
      },
      {
        question: 'Is Peon a Dokploy alternative?',
        answer:
          'Yes. Both deploy Docker Compose stacks and Git repos to servers you own; Peon adds project-scoped access control and AI-agent deploy capability as standard features rather than an upsell.',
      },
    ],
    related: [
      { label: 'Peon vs Coolify', href: '/compare/peon-vs-coolify' },
      { label: 'MCP & AI', href: '/solutions/mcp-ai' },
      { label: 'Enterprise', href: '/solutions/enterprise' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    slug: 'peon-vs-vercel',
    kind: 'compare',
    title: 'Peon vs Vercel (2026): The Self-Hosted Vercel Alternative',
    description:
      'Peon is a Vercel alternative at $3/project on your own VPS with unlimited seats. Compare Peon vs Vercel in 2026 and learn when to dual-run.',
    eyebrow: 'Compare',
    h1: 'Peon vs Vercel: a Vercel alternative without per-seat pricing',
    intro:
      'When comparing Peon vs Vercel, it\'s important to understand that both platforms solve different infrastructure problems.',
    introContent: [
      {
        type: 'p',
        text: 'When comparing Peon vs Vercel, it\'s important to understand that both platforms solve different infrastructure problems.',
      },
      {
        type: 'p',
        text: 'Vercel is designed for frontend applications, edge deployments, serverless functions, and seamless Git-based preview environments. Applications are deployed and hosted entirely on Vercel\'s managed cloud infrastructure, making it an excellent choice for static websites, Next.js applications, and globally distributed frontend experiences.',
      },
      {
        type: 'p',
        text: 'Peon, on the other hand, is built for teams that want complete control over their infrastructure. Your applications, APIs, databases, background workers, and Docker containers run on your own VPS or cloud servers while Peon provides a modern deployment platform to manage them.',
      },
      {
        type: 'p',
        text: 'With Peon Cloud starting at $3 per project/month, teams get unlimited members and unlimited servers, making it an attractive option for growing engineering teams that want predictable infrastructure costs.',
      },
      {
        type: 'p',
        text: 'In many organizations, the two platforms work together. A common architecture is:',
      },
      {
        type: 'ul',
        items: [
          'Marketing website deployed on Vercel',
          'APIs hosted on Peon',
          'PostgreSQL and Redis running on Peon',
          'Background workers managed through Docker Compose on Peon',
        ],
      },
    ],
    keywords: [
      'Vercel alternative',
      'Peon vs Vercel',
      'self hosted Next.js',
      'cheap Vercel alternative',
      'Next.js on VPS',
      'Railway vs Vercel',
      'Render vs Vercel',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'Pricing Comparison: Peon vs Vercel',
        paragraphs: [
          'One of the biggest differences between the two platforms is how pricing scales as your team grows.',
        ],
        subsections: [
          {
            title: 'Vercel Pricing',
            paragraphs: [
              'Vercel\'s Pro plan is generally priced per deploying user (seat), with additional usage-based charges for bandwidth, serverless execution, image optimization, and other platform resources.',
              'This pricing model works well for small development teams but can become more expensive as additional developers require deployment access.',
            ],
          },
          {
            title: 'Peon Pricing',
            paragraphs: [
              'Peon follows a project-based pricing model.',
              'For $3 per project/month, teams receive:',
              'Your primary infrastructure cost remains the VPS itself rather than the number of developers accessing the platform.',
              'For startups, SaaS companies, and agencies managing multiple engineers, project-based pricing can significantly reduce operational costs compared to seat-based pricing.',
            ],
            list: [
              'Unlimited developers',
              'Unlimited servers',
              'Project-based collaboration',
              'Self-hosted infrastructure',
              'Predictable monthly pricing',
            ],
          },
        ],
      },
      {
        title: 'Technical Differences Between Peon and Vercel',
        paragraphs: [
          'Both platforms support modern application deployment, but they excel in different areas.',
        ],
        subsections: [
          {
            title: 'When Vercel Is the Better Choice',
            paragraphs: [
              'Vercel is ideal if your application depends heavily on:',
              'For content-heavy websites and globally distributed frontend applications, these features provide excellent performance with minimal operational effort.',
            ],
            list: [
              'Global edge delivery',
              'Edge Functions',
              'Incremental Static Regeneration (ISR)',
              'Serverless architecture',
              'Automatic image optimization',
              'Frontend-first workflows',
              'Next.js optimization',
            ],
          },
          {
            title: 'When Peon Is the Better Choice',
            paragraphs: [
              'Peon is built for developers managing complete application infrastructure.',
              'It excels when you need:',
              'Unlike serverless platforms, Peon allows applications and databases to live together on the same infrastructure, reducing latency and simplifying architecture.',
            ],
            list: [
              'Docker Compose deployments',
              'Long-running Node.js services',
              'Background workers',
              'Redis and PostgreSQL on the same server',
              'Custom networking',
              'SSH access',
              'Full control over infrastructure',
              'VPS ownership',
            ],
          },
        ],
      },
      {
        title: 'Development Workflow Comparison',
        paragraphs: [
          'Both Peon and Vercel provide modern deployment workflows, but they approach collaboration differently.',
          'Peon includes features such as:',
          'Vercel focuses on Git-native preview deployments and frontend developer experience, while Peon extends collaboration into infrastructure management for backend services and production environments.',
        ],
        list: [
          'Pull request preview environments',
          'Automatic HTTPS',
          'One-click rollbacks',
          'Project-based RBAC',
          'Deployment audit logs',
          'Team collaboration',
          'AI-powered deployment assistance',
        ],
      },
      {
        title: 'Quick Comparison',
        paragraphs: [],
        table: {
          headers: ['Feature', 'Peon', 'Vercel'],
          rows: [
            { feature: 'Deployment Target', cells: ['Your VPS', 'Vercel Cloud'] },
            { feature: 'Pricing', cells: ['$3/project/month', 'Per-seat + usage'] },
            { feature: 'Team Members', cells: ['Unlimited', 'Per deploying user'] },
            { feature: 'Docker Compose', cells: ['✅', '❌'] },
            { feature: 'Long-running Workers', cells: ['✅', 'Limited'] },
            { feature: 'PostgreSQL on Same Server', cells: ['✅', '❌'] },
            { feature: 'Edge Network', cells: ['❌', '✅'] },
            { feature: 'Serverless Functions', cells: ['Docker-based', '✅'] },
            { feature: 'Project RBAC', cells: ['✅', 'Limited'] },
            { feature: 'Audit Logs', cells: ['✅', 'Enterprise-focused'] },
            { feature: 'AI Assistant', cells: ['✅', 'No built-in equivalent'] },
          ],
        },
      },
      {
        title: 'A Practical Migration Strategy',
        paragraphs: [
          'Migrating away from Vercel doesn\'t have to happen all at once. Many engineering teams adopt a gradual approach:',
          'This reduces migration risk while allowing teams to immediately benefit from lower infrastructure costs and greater operational control.',
        ],
        list: [
          'Move a non-critical backend service to Peon',
          'Deploy APIs using Docker Compose',
          'Point DNS once the service is stable',
          'Keep the frontend running on Vercel',
          'Migrate remaining services over time',
        ],
      },
      {
        title: 'Running Peon and Vercel Together',
        paragraphs: [
          'For many companies, a hybrid architecture offers the best of both worlds.',
          'A common setup includes Vercel for marketing websites, documentation, and frontend applications that benefit from edge delivery, and Peon for APIs, databases, Redis, background workers, scheduled jobs, and internal services.',
          'This approach lets teams leverage Vercel\'s frontend performance while maintaining full ownership of backend infrastructure through Peon.',
          'With Peon, organizations can create separate projects for staging and production, invite unlimited teammates, manage deployments with role-based access control, and automate operations using MCP and the built-in AI assistant—all without per-seat pricing.',
        ],
      },
      {
        title: 'Final Verdict: Peon vs Vercel',
        paragraphs: [
          'Although Peon and Vercel are often compared, they are designed for different parts of the application stack.',
          'Vercel remains one of the best platforms for frontend hosting, edge delivery, and serverless web applications.',
          'Peon is built for developers who need complete infrastructure ownership, Docker-based deployments, long-running services, databases, and predictable pricing for growing teams.',
          'If your primary goal is hosting static websites or Next.js applications with a global edge network, Vercel is an excellent choice.',
          'If you\'re looking for a Vercel alternative for backend infrastructure, Docker Compose deployments, databases, unlimited team collaboration, and AI-powered DevOps workflows, Peon provides a more flexible and cost-effective solution.',
          'For many modern teams, the ideal architecture is simple: use Vercel for the frontend and Peon for everything that powers your application.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How does Peon compare to Railway? (Railway vs Vercel, and where Peon fits)',
        answer:
          'Railway vs Vercel is really a serverless-vs-managed-container debate: Railway runs containers on its own infrastructure with usage-based billing, closer to Peon\'s Docker-native model than to Vercel\'s edge functions. The difference is ownership: Railway still runs your app on Railway\'s cloud, while Peon runs it on a server you own. If you like Railway\'s container-first workflow but want to stop paying for someone else\'s compute markup, Peon is the closer fit.',
        relatedLink: { label: 'Peon vs Railway', href: '/compare/peon-vs-railway' },
      },
      {
        question: 'What about Render vs Vercel?',
        answer:
          'Render, like Railway, is a managed container platform rather than an edge network, so Render vs Vercel is again "managed containers vs edge/serverless," not two versions of the same thing. Peon covers the same container-first ground as Render, on your own VPS instead of Render\'s infrastructure, with unlimited seats included instead of per-plan limits.',
        relatedLink: { label: 'Peon vs Render', href: '/compare/peon-vs-render' },
      },
      {
        question: 'Vercel vs Railway, which should I pick, and where does Peon fit?',
        answer:
          'Pick Vercel when the app is genuinely edge-shaped: static, ISR, or serverless-friendly with light backend needs. Pick Railway when you want managed containers without touching a server. Pick Peon when you\'ve decided you\'d rather own the server both of those platforms run on, for the price of a VPS plus $3 per project.',
      },
      {
        question: 'Is Peon a Cloudflare alternative too? (Cloudflare vs Vercel)',
        answer:
          'Cloudflare\'s Pages and Workers compete with Vercel on the same edge/serverless ground, not with Peon directly. Cloudflare vs Vercel is largely a pricing and runtime-model question between two edge platforms. Peon sits outside that comparison as the option where your app runs on a server you control rather than any vendor\'s edge network.',
        relatedLink: { label: 'Peon vs Cloudflare', href: '/compare/peon-vs-cloudflare' },
      },
      {
        question: 'Is Peon a Netlify alternative as well?',
        answer:
          'Yes. Netlify, like Vercel, is a managed frontend/edge platform with per-seat and usage pricing. Everything above about owning the runtime and dropping seat tax applies the same way.',
        relatedLink: { label: 'Peon vs Netlify', href: '/compare/peon-vs-netlify' },
      },
      {
        question: 'What\'s the best free Vercel alternative?',
        answer:
          'For a genuinely free option with no usage ceiling, self-hosted Peon is free forever; you provide the VPS (often $4-12/month), and Peon provides the deploy pipeline, TLS, and databases. If you specifically want to stay in Vercel\'s ecosystem, their Hobby tier is free but restricted to non-commercial use; Peon has no such restriction on self-host.',
      },
      {
        question: 'Is Vercel worth it for Next.js specifically?',
        answer:
          'If you\'re all-in on Next.js and want the tightest possible integration (ISR at the edge, automatic image optimisation, zero-config previews), Vercel is genuinely well-built for that framework; they built both. Where it gets expensive is team size and always-on backend services, since Pro is priced per seat plus usage. Many teams run Next.js on Vercel for the frontend and move the API, database, and workers to Peon.',
      },
      {
        question: 'Can I self-host something like Vercel?',
        answer:
          'Yes, that\'s exactly what Peon is: a self-hosted alternative that gives you git-push deploys, preview environments, and automatic HTTPS on a server you own, rather than Vercel\'s managed edge network. You lose Vercel\'s global PoPs and ISR-at-the-edge, but you gain server ownership, flat pricing, and no per-seat cost.',
        relatedLink: { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      },
    ],
    related: [
      { label: 'Peon vs Heroku', href: '/compare/peon-vs-heroku' },
      { label: 'Peon vs Railway', href: '/compare/peon-vs-railway' },
      { label: 'Peon vs Render', href: '/compare/peon-vs-render' },
      { label: 'Peon vs Netlify', href: '/compare/peon-vs-netlify' },
      { label: 'Peon vs Cloudflare', href: '/compare/peon-vs-cloudflare' },
      { label: 'Application deployment', href: '/solutions/application-deployment' },
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'MCP & AI', href: '/solutions/mcp-ai' },
    ],
  },
  {
    slug: 'peon-vs-heroku',
    kind: 'compare',
    title: 'Peon vs Heroku (2026): The Modern Heroku Alternative',
    description:
      'Heroku removed its free tier and bills per dyno and add-ons. Peon is a Heroku alternative with git-push deploys on your VPS for $3/project.',
    eyebrow: 'Compare',
    h1: 'Peon vs Heroku: a Heroku alternative that keeps git push',
    intro:
      'Heroku invented the cultural habit of git push to deploy. After the free tier ended in 2022, many teams kept the habit but left the price list. Peon is a Heroku alternative that recreates the workflow on Docker hosts you own, with modern team features Heroku never centered on.',
    keywords: [
      'Heroku alternative',
      'Peon vs Heroku',
      'self hosted Heroku',
      'cheap Heroku alternative',
      'Heroku dyno pricing',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'Pricing reality in 2026',
        paragraphs: [
          'Heroku Eco dynos are inexpensive but sleep. Basic dynos stay awake but do not scale horizontally. Standard dynos start around $25 and climb quickly once you add a worker and a Postgres add-on. Industry writeups of a modest production stack often land near three figures monthly before traffic spikes.',
          'Peon Cloud is $3 per project. A mid-size Hetzner or DigitalOcean VPS might be $4–12. That combination routinely undercuts Heroku for steady workloads while allowing arbitrary Docker processes on the box.',
          'Heroku’s value is managed ops and maturity. Peon’s value is economics and flexibility once you accept host ownership.',
        ],
      },
      {
        title: 'Buildpacks vs containers',
        paragraphs: [
          'Heroku’s happy path is still buildpacks. Containers are supported but documented as a more advanced path where you own base image patching. Peon is container-native: Dockerfile, image or Compose from the start.',
          'If your app is already a twelve-factor buildpack citizen and you never want to see Docker, Heroku remains coherent. If you already build images in CI, Peon is the shorter path to the same push-to-release feeling.',
        ],
      },
      {
        title: 'Teams and modern ops',
        paragraphs: [
          'Peon adds workspace/project RBAC, audit logs, MCP and an in-app AI assistant. Heroku’s team features exist inside Salesforce’s packaging; they are not the reason most migrants leave.',
          'Review Apps on Heroku map conceptually to Peon PR previews. Both solve “look at this branch on a URL.” Peon’s previews run on your wildcard domain and your compute budget.',
        ],
        list: [
          'Heroku: dynos + add-ons, their cloud only',
          'Peon: $3/project + your VPS, Docker-native',
          'Heroku wins: fully managed, buildpack simplicity',
          'Peon wins: cost, Compose, no dyno taxonomy',
        ],
      },
      {
        title: 'Leaving Heroku without drama',
        paragraphs: [
          'Export config vars, containerize (or keep using a Dockerfile if you already have one), provision Postgres on Peon or restore a dump into a Peon database, then run shadow traffic before cutting DNS. Procfile process types map cleanly to separate Peon services or Compose services: web, worker, and release tasks become first-class containers instead of dyno types.',
          'Add-ons are the sticky part. Replace Heroku Redis with Redis on Peon, Heroku Scheduler with Peon scheduled tasks, and logging drain habits with Peon’s logs plus any external sink you already use. You also gain what Heroku never centered: workspace/project RBAC, included audit logs, MCP for agents and an in-app AI assistant, at $3/project with unlimited seats.',
          'Conclusion: leave Heroku for Peon. You keep git-push deploys, drop dyno and add-on math, and pick up team and AI features no dyno plan packages the same way. Size a VPS, attach it once, and run production where you own the stack.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What happened to Heroku\'s free tier?',
        answer:
          'Heroku removed its free dyno and free Postgres tiers in November 2022. That single change is why "Heroku alternative" searches spiked and stayed high; developers who\'d used Heroku\'s free tier for side projects and small production apps needed somewhere else to go.',
      },
      {
        question: 'What are the best Heroku alternatives with a free tier in 2026?',
        answer:
          'Depends what you mean by free. Render and Fly.io offer free tiers with real limits (Render\'s free web services sleep after inactivity). Railway doesn\'t have a traditional free plan but starts at a low usage-based minimum. Peon\'s self-hosted tier is free forever with no sleep timers or usage caps; you just need a VPS, which commonly costs $4-12/month.',
        relatedLink: { label: 'Pricing', href: '/#pricing' },
      },
      {
        question: 'Is Heroku still worth using in 2026?',
        answer:
          'If you want fully managed buildpack deploys and don\'t mind paying for it (Standard dynos start around $25 and climb fast with a worker and Postgres add-on), Heroku is still coherent. If cost or Docker-native workflows matter more, most teams end up on Railway, Render, or a self-hosted platform like Peon instead.',
      },
      {
        question: 'Is Peon a good Heroku alternative for teams, not just solo apps?',
        answer:
          'Yes, that\'s specifically where Peon differs from most Heroku alternatives: workspace and project RBAC, owner-visible audit logs, and an MCP server for AI agents are included on every plan, so a growing team doesn\'t have to piece together access control the way you might on a bare VPS.',
      },
    ],
    related: [
      { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
      { label: 'Peon vs DigitalOcean', href: '/compare/peon-vs-digitalocean' },
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'Databases', href: '/solutions/databases' },
    ],
  },
  {
    slug: 'peon-vs-digitalocean',
    kind: 'compare',
    title: 'Peon vs DigitalOcean App Platform (2026): A Portable Alternative',
    description:
      'Peon is a DigitalOcean App Platform alternative and docker hosting provider for $3/project with unlimited seats and multi-cloud portability.',
    eyebrow: 'Compare',
    h1: 'Peon vs DigitalOcean App Platform: Which Is Better for Docker Deployments?',
    intro:
      'If you\'re comparing Peon vs DigitalOcean App Platform, you\'re likely deciding between a fully managed Platform as a Service (PaaS) and a Docker-native deployment platform that runs on your own infrastructure.',
    introContent: [
      {
        type: 'p',
        text: 'If you\'re comparing Peon vs DigitalOcean App Platform, you\'re likely deciding between a fully managed Platform as a Service (PaaS) and a Docker-native deployment platform that runs on your own infrastructure.',
      },
      {
        type: 'p',
        text: 'Both solutions simplify application deployment, but they take very different approaches to infrastructure ownership, pricing, scalability, and operational control.',
      },
      {
        type: 'p',
        text: 'DigitalOcean App Platform manages the runtime for you, while Peon helps you manage applications running on your own VPS or cloud servers.',
      },
    ],
    keywords: [
      'DigitalOcean App Platform alternative',
      'Peon vs DigitalOcean',
      'docker hosting provider',
      'deploy Droplet PaaS',
      'DigitalOcean Droplet vs App Platform',
      'Coolify on DigitalOcean',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'Infrastructure Philosophy',
        paragraphs: [],
        subsections: [
          {
            title: 'DigitalOcean App Platform',
            paragraphs: [
              'DigitalOcean App Platform is a managed PaaS built exclusively for the DigitalOcean ecosystem.',
              'Applications are deployed directly from your Git repository, and DigitalOcean automatically provisions infrastructure, manages runtime updates, handles scaling, and maintains the underlying operating system.',
              'You never need SSH access to production servers because the platform manages everything for you.',
              'This makes App Platform an excellent choice for teams that want to avoid server administration entirely.',
            ],
          },
          {
            title: 'Peon',
            paragraphs: [
              'Peon takes a different approach.',
              'Instead of hosting your application, Peon provides a deployment control plane for your own servers.',
              'Applications run on your VPS while Peon automates:',
              'You maintain ownership of the infrastructure while removing much of the deployment complexity.',
            ],
            list: [
              'Docker deployment',
              'Reverse proxy configuration',
              'HTTPS certificates',
              'Git-based deployments',
              'Rollbacks',
              'Team collaboration',
            ],
          },
        ],
      },
      {
        title: 'Pricing Comparison',
        paragraphs: [
          'Pricing is one of the largest differences between these platforms.',
        ],
        subsections: [
          {
            title: 'DigitalOcean App Platform Pricing',
            paragraphs: [
              'App Platform charges based on the resources your application uses.',
              'Each application component—such as web services, background workers, scheduled jobs, and managed databases—adds to your monthly bill.',
              'Static websites benefit from a limited free tier, but production applications with multiple services can become more expensive as your architecture grows.',
              'This model works well for teams prioritizing operational simplicity over infrastructure optimization.',
            ],
          },
          {
            title: 'Peon Pricing',
            paragraphs: [
              'Peon Cloud starts at $3 per project/month.',
              'Applications run on your own VPS from providers such as:',
              'Combined with an affordable VPS, Peon offers predictable project-based pricing regardless of how many developers collaborate on the project.',
              'For teams deploying multiple services on a single server, this model can significantly reduce infrastructure costs compared to component-based billing.',
            ],
            list: [
              'DigitalOcean',
              'Hetzner',
              'AWS',
              'Google Cloud',
              'Azure',
              'Any Linux server with SSH access',
            ],
          },
        ],
      },
      {
        title: 'Infrastructure Flexibility',
        paragraphs: [
          'One major advantage of Peon is infrastructure portability.',
          'With DigitalOcean App Platform, your workloads remain tied to the DigitalOcean ecosystem. If you decide to migrate to AWS, Hetzner, Google Cloud, or another provider, you\'ll need to rebuild your deployment environment.',
          'Peon is cloud-agnostic. Within a single workspace, you can manage servers across DigitalOcean, Hetzner, AWS EC2, Google Cloud, Azure, and on-premises Linux servers.',
          'This flexibility allows teams to optimize costs, reduce vendor lock-in, and deploy applications closer to their users.',
        ],
      },
      {
        title: 'Docker and Deployment Workflow',
        paragraphs: [],
        subsections: [
          {
            title: 'DigitalOcean App Platform',
            paragraphs: [
              'App Platform abstracts away most infrastructure management.',
              'Developers deploy from Git while the platform handles runtime provisioning behind the scenes.',
              'This approach minimizes operational overhead but limits control over the underlying environment.',
            ],
          },
          {
            title: 'Peon',
            paragraphs: [
              'Peon is designed for Docker-native workflows.',
              'It supports:',
              'Peon automatically configures Docker and reverse proxy services over SSH, allowing a standard VPS to function like a private PaaS while preserving full server access.',
            ],
            list: [
              'Dockerfiles',
              'Docker Compose',
              'Multi-container applications',
              'Custom Docker images',
              'Background workers',
              'Scheduled tasks',
            ],
          },
        ],
      },
      {
        title: 'Features Comparison',
        paragraphs: [
          'Both platforms include many essential deployment capabilities.',
        ],
        subsections: [
          {
            title: 'Shared Features',
            list: [
              'HTTPS support',
              'Git-based deployments',
              'Database support',
              'Automatic deployments',
              'Application monitoring',
            ],
          },
          {
            title: 'Peon Features',
            paragraphs: ['In addition to core deployment capabilities, Peon includes:'],
            list: [
              'Docker Compose support',
              'Marketplace templates',
              'Pull request preview environments',
              'Workspace RBAC',
              'Project RBAC',
              'Deployment audit logs',
              'MCP support',
              'Built-in AI assistant',
              'Multi-cloud deployment',
            ],
          },
          {
            title: 'DigitalOcean App Platform Features',
            paragraphs: ['App Platform emphasizes:'],
            list: [
              'Fully managed runtime',
              'DigitalOcean-native integrations',
              'Automatic infrastructure management',
              'Reduced operational overhead',
            ],
          },
        ],
      },
      {
        title: 'Quick Comparison',
        paragraphs: [],
        table: {
          headers: ['Feature', 'Peon', 'DigitalOcean App Platform'],
          rows: [
            { feature: 'Infrastructure', cells: ['Your VPS', 'DigitalOcean Managed'] },
            { feature: 'Pricing', cells: ['$3/project/month', 'Per application component'] },
            { feature: 'Docker Compose', cells: ['✅', 'Limited'] },
            { feature: 'Multi-cloud Support', cells: ['✅', '❌'] },
            { feature: 'SSH Access', cells: ['✅', '❌'] },
            { feature: 'Unlimited Team Members', cells: ['✅', 'Depends on account'] },
            { feature: 'Project RBAC', cells: ['✅', 'Limited'] },
            { feature: 'Audit Logs', cells: ['✅', 'Enterprise-oriented'] },
            { feature: 'AI Assistant', cells: ['✅', 'No built-in equivalent'] },
            { feature: 'Vendor Lock-in', cells: ['Low', 'High'] },
          ],
        },
      },
      {
        title: 'Which Platform Is Better for Agencies?',
        paragraphs: [
          'Agencies often manage multiple client applications with separate environments. Using a managed platform that bills for every service component can increase costs as the number of projects grows. Peon is well suited for agency workflows because it allows organizations to:',
          'Built-in audit logs and role-based access control also make it easier to track production changes across client environments.',
          'Combined with MCP support and the integrated AI assistant, Peon helps teams manage multiple deployments while maintaining consistent operational workflows.',
        ],
        list: [
          'Create separate projects for each client',
          'Invite client stakeholders with project-specific permissions',
          'Share infrastructure efficiently across projects',
          'Reuse deployment templates',
          'Manage multiple servers from one workspace',
        ],
      },
      {
        title: 'Which Platform Should You Choose?',
        paragraphs: [],
        subsections: [
          {
            title: 'Choose DigitalOcean App Platform if you want:',
            list: [
              'A fully managed deployment platform',
              'Minimal server administration',
              'Tight integration with DigitalOcean services',
              'Automatic runtime management',
            ],
          },
          {
            title: 'Choose Peon if you want:',
            list: [
              'Full ownership of your infrastructure',
              'Docker-native deployments',
              'Docker Compose support',
              'Multi-cloud flexibility',
              'Predictable project-based pricing',
              'Unlimited team collaboration',
              'AI-powered deployment workflows',
              'Greater control over production environments',
            ],
          },
        ],
      },
      {
        title: 'Final Verdict: Peon vs DigitalOcean App Platform',
        paragraphs: [
          'DigitalOcean App Platform is an excellent managed PaaS for teams that want to deploy applications without managing servers.',
          'Peon is designed for developers and organizations that want the simplicity of a modern deployment platform while retaining complete ownership of their infrastructure.',
          'With $3 per project/month, Docker-native deployments, multi-cloud support, workspace and project RBAC, audit logs, MCP integration, and an integrated AI assistant, Peon provides a flexible alternative for teams that have outgrown managed PaaS limitations.',
          'If you\'re looking for a DigitalOcean App Platform alternative that offers infrastructure portability, predictable pricing, and modern DevOps collaboration features, Peon is the stronger long-term choice.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Droplet vs App Platform: which is actually cheaper?',
        answer:
          'App Platform\'s entry price looks lower per component, but cost scales with how many pieces (web process, worker, database) you declare. A Droplet is a flat monthly cost regardless of how many services you run on it. If you\'re only shipping one small service, App Platform can be simpler; once you have two or more services, a Droplet plus a deploy layer like Peon usually costs less and stays predictable.',
      },
      {
        question: 'Is DigitalOcean App Platform worth it?',
        answer:
          'It\'s worth it if you want zero server management and your app fits a small number of components. It\'s less worth it once you need Docker Compose, background workers colocated with a database, or you\'re paying per-component for what would fit on one $6 Droplet. Peon on a Droplet gives you the same "push to deploy" feeling without per-component billing or DO lock-in.',
      },
      {
        question: 'Can I use a cheap DigitalOcean Droplet as a Docker hosting provider instead of App Platform?',
        answer:
          'Yes, that\'s exactly what Peon does: connect a Droplet over SSH and Peon turns it into a private App Platform, Docker, TLS, and deploys automatically, without the per-component pricing or the requirement to stay on DigitalOcean specifically.',
      },
      {
        question: 'Is Peon a DigitalOcean App Platform alternative?',
        answer:
          'Yes. Peon gives you the same git-push-to-URL experience on a Droplet (or any other VPS) for a flat $3/project/month, with the added ability to add a Hetzner or AWS server to the same workspace later without changing how you deploy.',
      },
    ],
    related: [
      { label: 'Peon vs Dokploy', href: '/compare/peon-vs-dokploy' },
      { label: 'Databases', href: '/solutions/databases' },
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'MCP & AI', href: '/solutions/mcp-ai' },
    ],
  },
  {
    slug: 'peon-vs-railway',
    kind: 'compare',
    title: 'Peon vs Railway (2026): Railway Alternative on Your Own VPS',
    description:
      'Peon is a Railway alternative that runs the same container-first workflow on servers you own, for $3/project.',
    eyebrow: 'Compare',
    h1: 'Peon vs Railway: a Railway alternative you can self-host',
    intro:
      'Railway popularized usage-based, container-first deploys with a clean UI: connect a repo, get a build, get a URL. Peon shares that container-first instinct but runs it on infrastructure you own instead of Railway\'s cloud. If you like Railway\'s workflow but want the compute meter to stop being someone else\'s cloud bill, Peon is the Railway alternative worth a look.',
    keywords: [
      'Peon vs Railway',
      'Railway alternative',
      'Railway vs Vercel',
      'self hosted Railway',
      'container deployment VPS',
      'Railway pricing 2026',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'What each product optimizes for',
        paragraphs: [
          'Railway optimizes for fast time-to-first-deploy with no server to think about: push a repo, Railway provisions the container and meters usage by the second. Per railway.com/pricing as of August 2026, Free is $0/month (30-day trial with $5 credit, then a $1/month minimum), Hobby is $5/month minimum (including $5 of usage credit, single developer per project), and Pro is $20/month minimum (including $20 of usage credit), with unlimited workspace seats and unlimited project members included on Pro. Usage beyond credits is billed per-second: roughly $10/GB-month for RAM, $20/vCPU-month for CPU, and $0.05/GB for network egress.',
          'Correction from an earlier version of this page: Railway\'s Pro plan is not per-seat, it includes unlimited seats, closer to how Peon prices than to Vercel\'s per-seat model. We verified this directly against Railway\'s pricing page rather than repeating an assumption, and we\'re noting the correction here because getting a competitor\'s pricing wrong is exactly the kind of error that shouldn\'t survive a first draft.',
          'Peon optimizes for owning the box the container runs on. You attach a Hetzner, DigitalOcean or AWS server once, and Peon manages Docker, TLS and the deploy pipeline on it for a flat $3 per project per month, or free if you self-host the control plane.',
          'Both are container-native and both include unlimited seats on their team-oriented plans. The real difference is who owns the compute meter, not who charges per head.',
        ],
      },
      {
        title: 'Cost shape at scale',
        paragraphs: [
          'Railway\'s per-second billing is transparent but variable: RAM, CPU and egress all meter independently, so a bursty app can see its bill move month to month even with a flat plan fee as the floor. Peon\'s variable cost is the VPS itself (often flat and cheap, $4-12/month for a box that can run several services), plus a fixed $3 per project regardless of how hard that project runs.',
          'For steady, always-on workloads, a Peon setup on a right-sized VPS is usually easier to forecast than a usage-metered platform, because the largest cost driver (the server) is fixed instead of variable. For spiky or unpredictable workloads, Railway\'s pay-for-what-you-use model can work in your favor, that tradeoff runs both directions and we\'d rather say so than pretend it doesn\'t.',
        ],
      },
      {
        title: 'Team access and ops',
        paragraphs: [
          'Railway includes unlimited workspace seats on Hobby and Pro, with project-level member limits on Hobby (1 project member) that open up to unlimited on Pro. Peon includes unlimited team members on every plan, including self-host, with workspace and project RBAC so a contractor can be scoped to one project without a plan upgrade.',
          'Peon also adds owner-visible audit logs, a hosted MCP server for Cursor and Claude, and an in-app AI assistant on standard plans. Railway ships its own AI agent tooling and has audit log retention on paid plans (48 hours on Free/Hobby, 30 days on Pro, 18 months on Enterprise), so this isn\'t a case of Railway having nothing, it\'s a different packaging of similar ideas.',
        ],
        list: [
          'Railway: usage-based per second, unlimited seats on Hobby/Pro, their cloud only',
          'Peon: BYO VPS, $3/project flat, unlimited seats on every plan including self-host',
          'Railway wins: zero server setup, fast first deploy, built-in AI agent',
          'Peon wins: predictable cost at scale (fixed server + flat fee), you own the runtime',
        ],
      },
      {
        title: 'Railway vs Vercel, and where Peon fits',
        paragraphs: [
          'Railway vs Vercel is a comparison between two different shapes of managed platform: Railway runs containers on Railway\'s infrastructure with usage billing, Vercel runs edge/serverless functions with per-seat billing. Vercel vs Railway questions usually come down to whether your app is edge-shaped (Vercel) or a long-running service (Railway). Peon sits outside both, as the option where the container runs on a server you own instead of either vendor\'s cloud. If you like Railway\'s workflow but want to stop metering usage on someone else\'s infrastructure, Peon is the closer migration path.',
        ],
      },
      {
        title: 'How to decide',
        paragraphs: [
          'Stay on Railway if you want zero infrastructure to think about and you\'re comfortable with usage-based billing tracking your spend in real time. Move to Peon when a steady always-on workload, or a preference for owning the server, makes a flat $3/project on your own VPS the more predictable bet. Self-host Peon for $0, or use Cloud, and keep Railway around for quick prototypes if that workflow still earns its keep.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Railway have a free tier?',
        answer:
          'Yes, per railway.com/pricing: Free is $0/month with a 30-day trial that includes $5 of usage credit, then a $1/month minimum after the trial ends. It\'s limited (1 vCPU / 0.5GB RAM per service, no custom domains on the free tier), meant for evaluation rather than a permanent free plan.',
        relatedLink: { label: 'Pricing', href: '/#pricing' },
      },
      {
        question: 'Railway vs Render, which should I use?',
        answer:
          'Both are managed container platforms, so the comparison isn\'t self-hosted vs managed the way Peon\'s is. Railway tends to win on fast setup and usage-based pricing for bursty or prototype workloads; Render tends to win on flat, predictable per-service pricing and first-class background workers. Neither runs on a server you own; that\'s where Peon differs from both.',
        relatedLink: { label: 'Peon vs Render', href: '/compare/peon-vs-render' },
      },
      {
        question: 'Railway vs Vercel, which is better for my project?',
        answer:
          'They\'re different shapes of platform: Railway runs containers (good for APIs, workers, anything long-running), Vercel runs edge/serverless functions (good for frontend-heavy, static-leaning apps). If your app is mostly backend logic, Railway\'s model fits closer. If it\'s mostly frontend with light API routes, Vercel fits closer. Peon covers the Railway-shaped workload (containers, databases) on a server you own instead of either vendor\'s cloud.',
        relatedLink: { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
      },
      {
        question: 'Is there a good Railway alternative that runs on my own server?',
        answer:
          'Yes, that\'s specifically what Peon is: the same container-first, git-push deploy workflow as Railway, but on a Hetzner, DigitalOcean, or AWS server you connect yourself, for a flat $3/project/month instead of per-second usage billing.',
      },
    ],
    related: [
      { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
      { label: 'Peon vs Render', href: '/compare/peon-vs-render' },
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'Application deployment', href: '/solutions/application-deployment' },
    ],
  },
  {
    slug: 'peon-vs-render',
    kind: 'compare',
    title: 'Peon vs Render (2026): Render Alternative for Your Own VPS',
    description:
      'Peon is an open-source Render alternative on your own server and cloud for $3/project with unlimited seats.',
    eyebrow: 'Compare',
    h1: 'Peon vs Render: a Render alternative that doesn\'t sleep',
    intro:
      'Render made "deploy from Git, get a managed web service" approachable, with a genuinely useful free tier for side projects. Peon is a Render alternative for the moment a project stops being a side project: no sleep timers, no per-service line items, one flat project fee on a server you own.',
    keywords: [
      'Peon vs Render',
      'Render alternative',
      'Render vs Vercel',
      'open source Render alternative',
      'self hosted Render',
      'Render free tier sleep',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'What each product optimizes for',
        paragraphs: [
          'Render optimizes for approachable managed hosting: connect a repo, pick a plan, get a web service, a static site, a cron job, or a Postgres/Redis instance, each billed as its own line item. The free tier (750 instance hours per workspace per month) is real, but free web services sleep after 15 minutes of inactivity, with a 30-60 second cold start on wake. Paid plans start at Pro for $25/month, with Scale at $499/month for larger workloads.',
          'Peon optimizes for owning the server underneath that same workflow. You attach a VPS once, and every service, web app, worker, database, cron task, runs on it under one $3-per-project fee (or free if you self-host the control plane), with no sleep timers because the server is always on if you keep it on.',
        ],
      },
      {
        title: 'Cost shape at scale',
        paragraphs: [
          'Render\'s per-component pricing adds up the way DigitalOcean App Platform\'s does: a small app with one Starter web service and a Basic Postgres instance already runs close to $13/month before storage or bandwidth overages, and Scale-tier workloads reach $499/month. Peon\'s cost is the VPS (often $4-12/month for a box that can run several services) plus a flat $3 per project, so a web process, a worker and a database on the same host don\'t multiply the invoice by three.',
          'Where Render\'s free tier is genuinely useful is early prototyping when you don\'t want a server yet. Once a service needs to stay warm and a database needs to be always-on, the always-on math tends to favor a Peon-managed VPS.',
        ],
      },
      {
        title: 'Team access and ops',
        paragraphs: [
          'Render\'s team plans and seat handling live behind its paid tiers, and access control is scoped mainly to workspace-level roles. Peon includes unlimited team members on every plan, with workspace and project RBAC so a contractor can be scoped to one project instead of the whole account, plus owner-visible audit logs, a hosted MCP server for Cursor and Claude, and an in-app AI assistant on standard plans.',
        ],
        list: [
          'Render: per-component pricing, free tier sleeps, their cloud only',
          'Peon: BYO VPS, $3/project flat, unlimited seats',
          'Render wins: zero-server onboarding, generous free static hosting',
          'Peon wins: always-on without sleep tax, colocated database, project RBAC, audit logs, MCP',
        ],
      },
      {
        title: 'Render vs Vercel, and where Peon fits',
        paragraphs: [
          'Render vs Vercel is a managed-containers-vs-edge comparison, similar to Railway vs Vercel: Render runs your app as a persistent (or sleeping, on free tier) container on Render\'s infrastructure, while Vercel runs edge and serverless functions. Neither is really competing with Peon head-on, both still run your app on the vendor\'s cloud. Peon\'s pitch is orthogonal to that debate: keep the container-based workflow Render popularized, but put it on a server you own instead of Render\'s.',
        ],
      },
      {
        title: 'How to decide',
        paragraphs: [
          'Stay on Render for a genuine side project or prototype where the free tier\'s sleep behavior doesn\'t matter. Move to Peon once you need the app to stay warm, want a database colocated with it instead of a separate line item, or you\'re adding teammates and don\'t want per-plan seat friction. Self-host Peon for $0, or run Cloud at $3/project on the same VPS that used to just run one Render-equivalent service.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Render have a free tier, and what are the limits?',
        answer:
          'Yes: free web services get 512MB RAM / 0.1 CPU and sleep after 15 minutes of inactivity, with a 30-60 second cold start on wake. Free Postgres and Redis-compatible instances exist too but come with tighter limits and, for Postgres, a 30-day expiry on the free tier. It\'s genuinely useful for prototyping, less so for anything that needs to stay warm.',
        relatedLink: { label: 'Pricing', href: '/#pricing' },
      },
      {
        question: 'Render vs Vercel, what\'s the actual difference?',
        answer:
          'Render runs persistent (or sleeping, on the free tier) containers on Render\'s infrastructure; Vercel runs edge and serverless functions. If your app is a long-running API, worker, or anything with WebSockets, Render\'s model fits better. If it\'s a frontend-heavy app with light, short-lived backend logic, Vercel\'s model fits better.',
        relatedLink: { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
      },
      {
        question: 'Is Render a good choice for production apps?',
        answer:
          'Render is built with production in mind, with first-class background workers, managed Postgres with backups and point-in-time recovery on paid plans, and zero-downtime deploys. The tradeoff versus Peon is that Render still runs on Render\'s cloud with per-component pricing, so cost adds up as you add services, where Peon\'s project fee stays flat regardless of how many services that project runs.',
      },
      {
        question: 'Is there a Render alternative that runs on my own VPS?',
        answer:
          'Yes, Peon. Same container-based, git-push deploy experience and colocated database model Render popularised, but on a Hetzner, DigitalOcean, or AWS server you own, for a flat $3/project/month instead of Render\'s per-component compute billing.',
      },
    ],
    related: [
      { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
      { label: 'Peon vs Railway', href: '/compare/peon-vs-railway' },
      { label: 'Databases', href: '/solutions/databases' },
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
    ],
  },
  {
    slug: 'peon-vs-netlify',
    kind: 'compare',
    title: 'Peon vs Netlify (2026): Netlify Alternatives for Backends',
    description:
      'Peon is one of the practical Netlify alternatives for backends and databases: your own VPS, $3/project, unlimited seats.',
    eyebrow: 'Compare',
    h1: 'Peon vs Netlify: one of the Netlify alternatives worth pairing, not replacing',
    intro:
      'Netlify is genuinely good at what it does: static sites, JAMstack frontends and serverless functions on a fast edge network, deployed straight from Git. Among Netlify alternatives, Peon isn\'t trying to out-edge Netlify. It\'s the option for the backend, database and long-running services that a static-first platform was never built to hold.',
    keywords: [
      'Peon vs Netlify',
      'Netlify alternatives',
      'Netlify alternative backend',
      'JAMstack backend VPS',
      'Netlify vs Vercel',
      'self hosted backend',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'What each product optimizes for',
        paragraphs: [
          'Netlify optimizes for frontend deploy speed and edge delivery: connect a repo, get a preview URL, ship to a global CDN. Pro is $20/month, and as of Netlify\'s April 2026 pricing update, that\'s now flat with unlimited seats instead of per-seat, a real improvement for small teams. Usage is metered in credits (3,000/month included, roughly 150GB of bandwidth at current rates), covering bandwidth, compute and requests together.',
          'Peon optimizes for the other half of the stack: APIs, workers, databases and Compose-based services running on a server you own, for $3 per project per month with unlimited seats and no credit metering to track.',
        ],
      },
      {
        title: 'Where the two actually overlap, and where they don\'t',
        paragraphs: [
          'If your app is a static site or a JAMstack frontend with light serverless functions, Netlify\'s edge network is doing real work you\'d have to rebuild yourself on Peon. That\'s not Peon\'s job.',
          'If your app needs a persistent Node.js or Python process, a colocated Postgres database, background workers, or Docker Compose, Netlify\'s serverless functions have execution time and cold-start constraints that make them a poor fit, and Netlify doesn\'t run always-on containers or databases at all. That is exactly Peon\'s job.',
          'Many teams end up running both: frontend on Netlify for the edge, API and database on Peon for the parts that need to stay warm and colocated.',
        ],
        list: [
          'Netlify: edge/JAMstack, $20/mo flat Pro, unlimited seats, credit-metered usage',
          'Peon: BYO VPS, $3/project, unlimited seats, no usage credits to track',
          'Netlify wins: static hosting, edge functions, frontend DX',
          'Peon wins: always-on backends, colocated databases, Docker Compose, project RBAC, audit logs, MCP',
        ],
      },
      {
        title: 'Cost and team shape',
        paragraphs: [
          'Netlify\'s 2026 move to flat, unlimited-seat Pro pricing removed its biggest historical pain point (seat tax), which is worth acknowledging plainly rather than pretending it didn\'t happen. What Netlify still doesn\'t do is run your backend: the moment you need an always-on API or a database, you\'re either paying for a separate service (a database add-on, a functions overage) or reaching for another platform.',
          'Peon\'s $3-per-project Cloud pricing, or free self-host, covers exactly that gap: one place for the API, the database, the worker and the Compose stack, on the VPS you already pay for.',
        ],
      },
      {
        title: 'How to decide',
        paragraphs: [
          'Keep the marketing site or docs on Netlify if the edge network and JAMstack workflow already earn their keep, there\'s no reason to migrate a static frontend that\'s working. Put the backend, database and any long-running service on Peon. That split, not a full migration off Netlify, is the answer for most teams evaluating Netlify alternatives for the parts of their stack Netlify was never meant to run.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Netlify vs Vercel: which is better for Next.js?',
        answer:
          'Vercel, since they build Next.js and optimise their platform around it first. Netlify remains strong for framework-agnostic static sites and JAMstack projects with built-in extras like form handling and identity management that Vercel doesn\'t offer natively. Neither question is really about Peon; both are frontend/edge platforms; Peon is what you\'d pair with either for the backend.',
        relatedLink: { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
      },
      {
        question: 'Can I run a commercial site on Netlify\'s free plan?',
        answer:
          'Yes, Netlify\'s free tier allows commercial use (unlike Vercel\'s Hobby tier, which restricts commercial use to the paid Pro plan). That\'s a real point in Netlify\'s favour if you\'re bootstrapping a small commercial static site.',
      },
      {
        question: 'What are the best Netlify alternatives in 2026?',
        answer:
          'For frontend/edge hosting specifically, Vercel and Cloudflare Pages are the closest direct alternatives. If what you actually need is a backend, database, or long-running service, none of the three (including Netlify) is built for that, which is where a platform like Peon comes in as a pairing rather than a swap.',
        relatedLink: { label: 'Peon vs Cloudflare', href: '/compare/peon-vs-cloudflare' },
      },
      {
        question: 'Is Peon a Netlify alternative?',
        answer:
          'Only partially, and it\'s worth being direct about that. Peon doesn\'t compete with Netlify\'s static/edge hosting or CDN. What Peon replaces is the backend, database, and always-on service layer that Netlify was never built to run. Most teams keep Netlify for the frontend and add Peon underneath for everything else.',
      },
    ],
    related: [
      { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
      { label: 'Peon vs Cloudflare', href: '/compare/peon-vs-cloudflare' },
      { label: 'Databases', href: '/solutions/databases' },
      { label: 'Application deployment', href: '/solutions/application-deployment' },
    ],
  },
  {
    slug: 'peon-vs-portainer',
    kind: 'compare',
    title: 'Peon vs Portainer (2026): A Deployment Platform, Not Just a UI',
    description:
      'Portainer manages containers you already have. Peon is a Portainer alternative that also builds from Git, issues TLS and runs PR previews, self-host free or $3/project Cloud.',
    eyebrow: 'Compare',
    h1: 'Peon vs Portainer: a Portainer alternative with a deploy pipeline attached',
    intro:
      'Portainer and Peon aren\'t quite the same category, and that\'s the point. Portainer is a container management UI: it shows you what\'s running and lets you start, stop and inspect it. Peon is a Portainer alternative for teams who want that same visibility plus the deployment pipeline around it, git push, TLS, rollbacks, team roles, that Portainer was never built to provide.',
    keywords: [
      'Peon vs Portainer',
      'Portainer alternative',
      'container management vs deployment platform',
      'Portainer vs Coolify',
      'Git deploy Docker',
      'Portainer pricing 2026',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'What each product actually does',
        paragraphs: [
          'Portainer gives you a dashboard over Docker (or Kubernetes) environments you already have running: container start/stop/logs, stack deployment from Compose you paste in, image management, and, on Business Edition, RBAC, LDAP/AD integration and Git-based stack deployment. Every Portainer plan includes full Business Edition features from day one, there\'s no crippled community tier to upsell from.',
          'Per portainer.io/pricing as of August 2026, Business Edition is free forever for up to 3 nodes, no credit card required. Beyond that, Starter starts at $105/month for a 5-node bundle (community support, up to 16 vCPUs per node), Scale starts at $209/month for a 5-node bundle (9x5 next-business-day support, up to 24 vCPUs per node) and scales up through 35 nodes, and Enterprise is custom-priced with support for 32 to unlimited vCPUs per node. Annual billing saves about 16% on Starter and Scale. Node counts are configurable in the pricing calculator; the numbers above reflect the smallest paid tier, not a per-node add-on rate.',
          'Peon starts one layer up: connect a server over SSH, and Peon provisions Docker, a reverse proxy and TLS automation on it, then gives you a project-based workflow for Git push deploys, Docker Compose stacks, managed databases and PR previews. Where Portainer shows you containers, Peon decides how those containers got there, how they get updated, and who is allowed to trigger that.',
        ],
      },
      {
        title: 'Where Portainer\'s model runs out',
        paragraphs: [
          'Portainer alone doesn\'t build images from a Git push, issue or renew TLS certificates, run PR preview environments, or provision a database with scheduled backups. Business Edition\'s Git-based stack deployment gets closer, but the product\'s center of gravity is still "manage what\'s already running," not "own the full path from commit to production URL."',
          'For a single server with containers someone else already deployed, that\'s a reasonable scope. For a team shipping multiple projects with contributors who need scoped access and an audit trail, it\'s a gap you end up filling with scripts, exactly the manual glue a deployment platform is supposed to remove.',
        ],
        list: [
          'Portainer: container UI, node-tiered Business Edition pricing, no build/TLS pipeline',
          'Peon: Git-to-production pipeline, $3/project, unlimited seats',
          'Portainer wins: visual container/stack management for infra you already run, free up to 3 nodes',
          'Peon wins: git push builds, automatic TLS, PR previews, databases, project RBAC, audit logs, MCP',
        ],
      },
      {
        title: 'Cost shape',
        paragraphs: [
          'Portainer\'s node-tiered licensing ($105/month and up for Starter, $209/month and up for Scale, both starting at 5 nodes) scales with how many servers you connect, similar in shape to how Coolify Cloud and Dokploy Cloud price. Peon\'s $3-per-project Cloud pricing, or free self-host, scales with how many projects you run instead, with unlimited servers included at every tier.',
          'If you\'re running Portainer\'s free 3-node tier today and hand-rolling the build/TLS/deploy layer around it, Peon\'s self-host tier replaces both the dashboard and the scripts for $0, or Cloud for $3/project if you\'d rather not operate the control plane yourself.',
        ],
      },
      {
        title: 'How to decide',
        paragraphs: [
          'Keep Portainer if all you need is a visual layer over Docker or Kubernetes environments you already manage by hand, and its free 3-node tier or node-based pricing fits your fleet. It\'s a mature, purpose-built tool for that job, not a weaker version of a deployment platform. Choose Peon if you want the container visibility Portainer gives you plus the deployment pipeline, database provisioning and RBAC that turn "a server with containers on it" into an actual platform your team can share.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What\'s the best free Portainer alternative?',
        answer:
          'Depends on what you\'re replacing Portainer for. If you just want a lighter container UI, tools like Dockge or Arcane are free, focused alternatives. If you want Portainer\'s visibility plus an automated Git-to-production pipeline (builds, TLS, PR previews, databases), Peon is the closer fit, and it\'s free to self-host with no feature gate.',
        relatedLink: { label: 'Pricing', href: '/#pricing' },
      },
      {
        question: 'Does Portainer do git-push deployments?',
        answer:
          'Not as its core function. Portainer manages containers and stacks you already have running, or Compose files you paste in; Business Edition adds Git-based stack deployment, but it\'s not a full build pipeline the way Peon\'s Git integration is (automatic builds, framework detection, TLS, PR previews included).',
      },
      {
        question: 'Is Portainer good enough for a small team, or do I need something more?',
        answer:
          'For visibility into containers on servers you already manage by hand, Portainer\'s free 3-node tier is genuinely capable. Once you want git-push deploys, automatic HTTPS, and project-scoped access for a growing team, that\'s a different job, Peon\'s, not Portainer\'s core one.',
      },
      {
        question: 'Is Peon a Portainer alternative?',
        answer:
          'Partially, and worth being precise about it. Peon replaces the "container visibility plus deploy pipeline" job Portainer doesn\'t fully cover (no automatic TLS, no Git build pipeline on Community Edition). Portainer\'s enterprise Kubernetes fleet governance and LDAP/AD integration are a different, more specialised job that Peon doesn\'t target.',
      },
    ],
    related: [
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'Peon vs Coolify', href: '/compare/peon-vs-coolify' },
      { label: 'Application deployment', href: '/solutions/application-deployment' },
      { label: 'MCP & AI', href: '/solutions/mcp-ai' },
    ],
  },
  {
    slug: 'peon-vs-cloudflare',
    kind: 'compare',
    title: 'Peon vs Cloudflare Pages & Workers (2026): A Cloudflare Alternative for Backends',
    description:
      'Cloudflare Pages and Workers bill by request and CPU time on Cloudflare\'s edge. Peon is a Cloudflare alternative for always-on backends and databases: your VPS, $3/project.',
    eyebrow: 'Compare',
    h1: 'Peon vs Cloudflare Pages & Workers',
    intro:
      'Cloudflare Pages and Workers put your code on one of the largest edge networks in the world, billed by request and CPU time instead of by server. Peon is a Cloudflare alternative for the workloads that edge/serverless billing doesn\'t fit well: always-on backends, colocated databases, and anything that needs to hold state or run longer than a request-scoped function allows.',
    keywords: [
      'Peon vs Cloudflare',
      'Cloudflare alternative',
      'Cloudflare vs Vercel',
      'Cloudflare Workers alternative',
      'backend VPS deployment',
      'Cloudflare Pages backend',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'What each product optimizes for',
        paragraphs: [
          'Cloudflare Workers optimizes for request-scoped compute at the edge: short-lived functions billed by CPU time, not wall-clock time, running at hundreds of locations worldwide. The Free plan covers light use; the Workers Paid plan is $5/month per account, including 10 million requests and 30 million CPU-milliseconds, with overage priced per million requests and per million CPU-milliseconds beyond that, and no separate charge for bandwidth. Pages Functions run on the same Workers billing.',
          'Peon optimizes for long-running, stateful workloads: a Node.js or Python process that stays up, a Postgres database on the same private network, a background worker, all running on a Linux server you own for a flat $3 per project per month, with no request or CPU-time metering to model.',
        ],
      },
      {
        title: 'Where the two don\'t actually compete',
        paragraphs: [
          'Cloudflare\'s edge model is built around functions that start, do a small amount of work, and end, database connections, long WebSocket sessions, and heavy background jobs are workloads the edge-function model handles awkwardly or not at all, which is why Cloudflare pairs Workers with separate products (D1, Durable Objects, Hyperdrive) to bridge that gap.',
          'Peon doesn\'t compete with Cloudflare\'s edge network, nothing self-hosted matches a global point-of-presence footprint. What Peon replaces is the layer Cloudflare\'s serverless model pushes you toward extra products or a separate backend for: one server, one Postgres instance, one deploy pipeline, one price.',
        ],
        list: [
          'Cloudflare: global edge, request/CPU-time billing, serverless-only',
          'Peon: BYO VPS, $3/project flat, always-on containers and databases',
          'Cloudflare wins: global latency, DDoS protection, serverless scale-to-zero',
          'Peon wins: long-running processes, colocated Postgres, predictable flat pricing, project RBAC, MCP',
        ],
      },
      {
        title: 'Cloudflare vs Vercel, and where Peon fits',
        paragraphs: [
          'Cloudflare vs Vercel is a comparison between two edge/serverless platforms with different billing models (CPU-time vs per-seat-plus-usage), not a comparison either has with Peon directly. Both run your code on the vendor\'s global network; neither runs a persistent server you control. Peon answers a different question: not "which edge network," but "where does the always-on part of my stack live, and who owns that server." If you\'re already using Cloudflare for the frontend or edge functions, Peon is a natural pairing for the backend rather than a replacement for either.',
        ],
      },
      {
        title: 'How to decide',
        paragraphs: [
          'Keep Cloudflare Pages and Workers for anything genuinely edge-shaped: static assets, redirects, lightweight API routes, geo-aware logic. Move to Peon for the backend that needs to stay running, hold a database connection pool open, or process background jobs longer than a function timeout allows. Most teams end up running both, Cloudflare at the edge, Peon underneath it, rather than picking one exclusively.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Cloudflare Pages vs Vercel: which is better?',
        answer:
          'If your project is a static site or framework-agnostic app with a global audience, Cloudflare Pages is often the better default on cost and reach. If you value Vercel\'s developer experience and best-in-class preview deployment workflow, especially for Next.js, Vercel tends to win there. Neither comparison involves Peon directly; both are edge/serverless platforms; Peon is the backend layer underneath either.',
        relatedLink: { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
      },
      {
        question: 'Is Cloudflare Pages really free and unlimited?',
        answer:
          'The free plan is genuinely generous for static sites (unlimited sites and requests), but "unlimited" doesn\'t extend to Workers compute once you\'re running dynamic logic. The Workers Paid plan is $5/month per account and includes 10 million requests and 30 million CPU-milliseconds, with metered overage beyond that. Free is real for static content; dynamic compute is metered like any other platform.',
      },
      {
        question: 'Do I need Cloudflare Workers or is Pages enough?',
        answer:
          'Pages alone covers static hosting and light edge functions. Workers (and Pages Functions, which bill as Workers) is what you need for real dynamic logic, API routes, or anything beyond serving files. If your app needs a persistent connection, background job, or colocated database, that\'s outside what Workers is built for, and where Peon comes in.',
      },
      {
        question: 'Is Peon a Cloudflare alternative?',
        answer:
          'Not directly; they solve different problems. Cloudflare\'s edge network is not something a self-hosted platform replicates. What Peon replaces is the always-on backend and colocated database that Cloudflare\'s request-scoped execution model isn\'t built to hold. Most real applications end up using both: Cloudflare at the edge, Peon underneath it.',
      },
    ],
    related: [
      { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
      { label: 'Peon vs Netlify', href: '/compare/peon-vs-netlify' },
      { label: 'Databases', href: '/solutions/databases' },
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
    ],
  },
];

export const ALL_SEO_PAGES: SeoPage[] = [...SOLUTION_PAGES, ...COMPARE_PAGES];

export function getSolutionPage(slug: string): SeoPage | undefined {
  return SOLUTION_PAGES.find((p) => p.slug === slug);
}

export function getComparePage(slug: string): SeoPage | undefined {
  return COMPARE_PAGES.find((p) => p.slug === slug);
}
