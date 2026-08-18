import { appHref } from '@/lib/env';

export type SeoSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type SeoPage = {
  slug: string;
  kind: 'solution' | 'compare';
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  keywords: string[];
  sections: SeoSection[];
  ctaLabel?: string;
  ctaHref?: string;
  related?: { label: string; href: string }[];
};

const CTA_REGISTER = { ctaLabel: 'Start deploying ($3/project)', ctaHref: appHref('/register') };

export const SOLUTION_PAGES: SeoPage[] = [
  {
    slug: 'self-hosted-paas',
    kind: 'solution',
    title: 'Self-Hosted PaaS: Deploy on Your Own Servers | Peon',
    description:
      'What a self-hosted PaaS is, why Coolify set the category standard, and how Peon fits as a peer: git-push deploys on your own VPS for $3/project or free self-host.',
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
          'Search traffic for self-hosted PaaS, open-source PaaS, Coolify alternative and “deploy to own VPS” has grown because managed platforms price for seats and usage while a commodity VPS still costs a few dollars a month. Coolify made the category familiar; Peon is built for the next step: project RBAC, audit logs, MCP and in-app AI on standard plans. The promise is Heroku-shaped workflows on infrastructure you already own, with team features peers rarely ship together.',
          'Under the hood the stack is boring on purpose. A Linux host accepts SSH. The platform installs or uses Docker, stands up a reverse proxy (Traefik by default on Peon, with Caddy as an option), terminates TLS with Let’s Encrypt on ports 80/443, and deploys from Git, Dockerfiles, images or Compose. Your apps and databases share a private Docker network on that machine, or across several machines you connect.',
          'The tradeoff is explicit. You still patch the OS, watch disk, and own disaster recovery of the host. What you stop doing is hand-rolling nginx configs, certbot timers and ad-hoc deploy scripts every time a teammate joins.',
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
          'Peon itself is open source and self-hostable. You can run the entire control plane on your own infrastructure for $0 and only pay for servers. That path fits operators who want full control over updates and data residency of the dashboard.',
          'Peon Cloud flips the ops burden on the control plane only: we host the dashboard, orchestration and updates for a flat $3 per project per month. Your applications and databases still run exclusively on servers you own. Cloud pricing is per project: unlimited servers can sit in a workspace while you pay for the projects you actually ship. Coolify Cloud’s per-server model remains a strong fit when fleet size is how you think about cost.',
          'Either option includes unlimited team members. There is no per-seat tax when the company invites designers, PMs or contractors into a project.',
        ],
      },
      {
        title: 'Why teams outgrow “just Docker Compose”',
        paragraphs: [
          'Compose files are excellent until the fifth service, the third teammate and the first 2 a.m. rollback. A self-hosted PaaS centralizes env, deploys, TLS and access so the bus factor is not a private SSH key in one laptop.',
          'Peon leans into team workflows that many open-source PaaS tools treat as afterthoughts: workspace roles (OWNER, ADMIN, MEMBER and related), project ADMIN/MEMBER roles so you can share an app without sharing every server, owner-visible audit logs on standard plans, a hosted MCP endpoint for AI agents, and an in-app AI assistant that uses the same tools under the same permissions.',
          'If you only need a personal lab, a single Compose stack may be enough. If you are a product team or agency with multiple clients on shared iron, a self-hosted PaaS with real RBAC is the difference between shipping and babysitting access.',
        ],
      },
      {
        title: 'Who should choose Peon',
        paragraphs: [
          'Choose Peon when you want PaaS ergonomics on Hetzner, DigitalOcean, AWS EC2 or bare metal, and you care about features most peers still gate or skip: workspace plus project RBAC, owner audit logs on standard plans, a hosted MCP server, and an in-app AI assistant on the same permissions.',
          'Cloud is $3 per project with unlimited servers and unlimited seats, so the invoice tracks how you organize apps, not headcount or connected-server count. Stay on a managed PaaS only when you need a global edge network or a team that must never touch a Linux box. For self-hosted PaaS with modern team and AI workflows, the conclusion is Peon.',
        ],
      },
    ],
    related: [
      { label: 'Application deployment platform', href: '/solutions/application-deployment' },
      { label: 'Peon vs Coolify', href: '/compare/peon-vs-coolify' },
      { label: 'Peon vs Dokploy', href: '/compare/peon-vs-dokploy' },
      { label: 'Enterprise', href: '/solutions/enterprise' },
    ],
  },
  {
    slug: 'application-deployment',
    kind: 'solution',
    title: 'Application Deployment Platform for Your Servers | Peon',
    description:
      'Deploy web apps, workers and static sites with Peon: git push, Docker Compose, rollbacks, HTTPS, PR previews and team RBAC on your own VPS ($3/project or free self-host).',
    eyebrow: 'Solutions',
    h1: 'Application deployment on hardware you own',
    intro:
      'An application deployment platform should make “push to main” the boring path to production. Peon is that platform for teams who refuse to rent someone else’s runtime: connect a Linux server, attach a Git source, and ship web apps, workers, static sites and Compose stacks with TLS, logs and rollbacks included.',
    keywords: [
      'application deployment platform',
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
          'Peon closes the loop on servers you own. GitHub App and GitLab connections, public remotes, Dockerfiles and framework-aware builds all land in the same project model. Prebuilt images work when CI already produces artifacts. Compose covers multi-process apps that never fit a single “web dyno” shape.',
          'Rolling updates aim for zero-downtime swaps; prior images stay available for one-click rollback. Live logs and health checks make the deploy visible instead of a black box SSH session.',
        ],
      },
      {
        title: 'Previews, domains and day-2 operations',
        paragraphs: [
          'Pull request previews publish to a short SHA on your server’s wildcard domain when permissions and DNS are configured. close cousins of Vercel previews, without leaving your network. Custom domains attach with automatic Let’s Encrypt certificates and HTTP to HTTPS redirects.',
          'Day-2 work is where platforms earn their keep. Peon covers shared and per-service environment variables (encrypted at rest), scheduled tasks inside containers, notifications to email, Slack, Discord, Telegram and webhooks, and an SSH terminal in the UI for the moments only a shell will do.',
          'Databases and marketplace templates sit beside applications so a “full stack” deploy is not three vendors and four invoices.',
        ],
        list: [
          'Git, image, Compose and static pipelines',
          'PR preview environments on your wildcard domain',
          'Automatic HTTPS and custom domains',
          'Rolling updates with rollback to prior images',
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
          'Self-host Peon for free, or use Peon Cloud at $3 per project per month with unlimited team members and unlimited servers in the workspace. You still pay the VPS provider, often a few dollars for a box that can run several apps.',
          'Compare that to per-seat frontend platforms or per-dyno stacks when three engineers and two services share a production environment. The deployment experience stays familiar; the invoice stops scaling with headcount.',
          'Agencies and multi-product startups benefit most: each client or product becomes a Peon project with its own members and secrets, while shared infrastructure (servers, keys, marketplace templates) lives at the workspace layer. That structure is hard to fake with a single Compose file and a shared SSH key.',
          'If you are evaluating Peon as an application deployment platform this week, start with one service on a non-production server. Wire Git, attach a domain, trigger a deploy, invite a teammate as project MEMBER, and confirm they can see logs without seeing every secret. That thirty-minute path tells you more than any feature checklist.',
        ],
      },
    ],
    related: [
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'Databases on your VPS', href: '/solutions/databases' },
      { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
      { label: 'MCP & AI', href: '/solutions/mcp-ai' },
    ],
  },
  {
    slug: 'databases',
    kind: 'solution',
    title: 'Managed Databases on Your Own Servers | Peon',
    description:
      'Run Postgres, MySQL, MongoDB and Redis on your VPS with Peon. Schedule backups to S3-compatible storage, restore when needed, and keep databases next to your apps.',
    eyebrow: 'Solutions',
    h1: 'Databases that live next to your apps',
    intro:
      'Managed database products are convenient and far away. Every query pays a network tax; every environment pays another line item. Peon provisions databases on the same Docker hosts as your applications, with backups, restores and team access, so latency stays local and the bill stays a VPS plus $3 per project.',
    keywords: [
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
        title: 'Why colocated databases still win for many apps',
        paragraphs: [
          'Serverless and multi-region databases solve real problems at scale. Most early and mid-stage products are not that problem. They are a web process, a worker, Postgres and maybe Redis on a quiet VPS in one region, with Cloudflare in front for static assets if needed.',
          'When the database sits beside the app on the same Docker network, round trips collapse from tens of milliseconds to sub-millisecond. Connection pooling gets simpler. Staging can mirror production topology without buying a second managed cluster.',
          'Peon leans into that topology. Databases are first-class services you provision from the same dashboard as apps, not a separate vendor account with its own IAM story.',
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
        title: 'Cost shape versus managed databases',
        paragraphs: [
          'A managed Postgres add-on on a classic PaaS often costs more per month than an entire mid-size VPS. On Peon, database cost is mostly the disk and RAM you already bought, plus the flat project fee if you use Cloud.',
          'That does not replace every managed offering. If you need multi-region failover, point-in-time recovery SLAs or a dedicated DBA product, buy that deliberately. For the long tail of product databases, colocated engines on Peon are the rational default.',
        ],
      },
      {
        title: 'A practical setup pattern',
        paragraphs: [
          'Most teams start with Postgres and Redis on the same host as the web process, keep a nightly backup that lands in object storage, and promote a second project for staging with its own database instance. When a release needs a schema migration, they run it as a one-off task or from CI against the private network hostname Peon exposes.',
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
    title: 'MCP & AI Assistant for Deployments | Peon',
    description:
      "Peon's hosted MCP server lets Cursor, Claude, and other AI agents deploy, rollback, and manage services under your workspace RBAC permissions.",
    eyebrow: 'Solutions',
    h1: 'Deploy with AI agents without giving up control',
    intro:
      'AI coding agents are already writing pull requests. The next bottleneck is operations: who is allowed to deploy, what they can see, and whether anyone can reconstruct what happened. Peon ships a Model Context Protocol endpoint and an in-app assistant that share one permissioned tool catalog, so agents work inside your PaaS, not around it.',
    keywords: [
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
        title: 'Why MCP matters for a deployment platform',
        paragraphs: [
          'Model Context Protocol is becoming the USB-C of tool access for agents. Without a first-class MCP surface, teams glue shell scripts, personal tokens and half-documented APIs into every chat session. Those glues ignore roles, skip audit logs and rot when endpoints change.',
          'Peon exposes a hosted Streamable HTTP MCP endpoint on your app origin. Authenticate with a Peon API token pinned to a workspace. Tools cover projects, services, deployments, environment, backups, servers, sources, members, shared variables, notifications and related resources, the same surface the product uses internally.',
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
          'It is not a generic Linux remote shell for agents. High-risk interactive terminal access stays in the product’s Terminal UI where humans can see context. It is not a replacement for CI. Builds and policies you already trust in GitHub Actions can coexist; Peon is the deploy and runtime control plane.',
          'Used well, MCP and Chat shorten the distance between “the agent fixed the bug” and “production is healthy” without inventing a second ops stack.',
        ],
      },
      {
        title: 'Example workflows teams already run',
        paragraphs: [
          'A developer asks Cursor to list failed deployments on a project, open the latest log snippet, and propose a rollback. then clicks approve in Peon Chat or confirms via the UI when the agent surfaces the same action. A founder asks the in-app assistant how to attach a custom domain and gets an answer grounded in the user manual, not a hallucinated Traefik tutorial.',
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
      'Most companies do not need Enterprise on day one. They need a deployment platform that already includes project roles, audit logs and unlimited seats. Peon Cloud does that at $3 per project. Enterprise is the layer above: identity-provider integration, white label, contracts and hosting flexibility when IT, security and procurement enter the chat.',
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
    title: 'Peon vs Coolify (2026): Why Teams Choose Peon',
    description:
      'Peon vs Coolify: both self-hosted PaaS on your VPS. Peon uniquely combines project RBAC, included audit logs, MCP + in-app AI, and $3/project Cloud with unlimited servers and seats.',
    eyebrow: 'Compare',
    h1: 'Peon vs Coolify',
    intro:
      'Coolify deserves credit for making self-hosted PaaS mainstream: SSH, Docker, HTTPS and a dashboard on hardware you own. Peon shares that foundation and goes further where teams actually get stuck: project-scoped access, audit trails on standard plans, agents via MCP, an in-app AI assistant under the same RBAC, and flat $3/project Cloud pricing with unlimited servers and seats. If you want the full stack of those features, choose Peon.',
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
        title: 'Same category, different product bet',
        paragraphs: [
          'Both Peon and Coolify turn Linux servers into a private Heroku. The control plane talks SSH, manages Docker, fronts traffic with a reverse proxy and Let’s Encrypt, and deploys from Git or Compose. Your apps stay on hardware you pay for: Hetzner, DigitalOcean, AWS or a machine under a desk.',
          'Coolify built a large community and a deep one-click template catalog. That maturity is real. The question for 2026 is not “can it deploy?” Both can. It is which platform gives your team project isolation, auditability and AI-native ops without Enterprise upsells.',
          'Peon’s bet is that those team and agent features are day-one product, not a later SKU. That is why we recommend Peon when you are choosing a self-hosted PaaS for a real company, not a solo lab.',
        ],
      },
      {
        title: 'Features peers rarely ship together',
        paragraphs: [
          'Workspace plus project RBAC lets you invite a contractor to one app without handing them every server. Owner-visible audit logs ship on Self Hosted and Cloud, not only on Enterprise paperwork. A hosted MCP endpoint lets Cursor, Claude and similar agents manage deploys with the same permissions as your account.',
          'The in-app AI assistant uses that same tool catalog, with BYO OpenAI or Anthropic keys and UI approval before mutating production. Coolify’s ecosystem is evolving; Peon treats agents and chat as first-class surfaces with one permission model.',
          'Commercially, Peon Cloud is $3 per project per month with unlimited servers and unlimited team members. You organize cost the way you organize work (by project) instead of metering the control plane by connected server count.',
        ],
        list: [
          'Workspace + project RBAC on standard plans',
          'Audit logs included, not Enterprise-only',
          'Hosted MCP + in-app AI assistant on the same RBAC',
          'Cloud: $3/project · unlimited servers · unlimited seats',
        ],
      },
      {
        title: 'Pricing that matches how teams ship',
        paragraphs: [
          'Coolify Cloud commonly starts around $5 per month and scales with additional connected servers. That model can fit fleets that think in servers. Peon Cloud is $3 per project so a dense VPS hosting several apps is not five control-plane line items.',
          'Self-hosting either product is $0 for the software. Cloud is optional. The durable win is owning the runtime, and Peon layers the team, audit and AI features on top so you do not outgrow the dashboard the week you hire a second engineer.',
        ],
      },
      {
        title: 'How we recommend you choose',
        paragraphs: [
          'Choose Peon. Coolify remains a strong peer for solo operators who mainly need git-push to a VPS and a huge template community. The moment you need project-scoped invites, an audit trail, MCP for agents, an in-app assistant, and predictable per-project Cloud pricing in one product. That combination is Peon’s.',
          'No other self-hosted PaaS in this comparison packs workspace/project RBAC, included audit logs, MCP and Chat together on standard Self Hosted and Cloud plans at $3/project with unlimited servers and seats.',
          'Already on Coolify? Migrate one non-critical service to Peon, invite a teammate as project MEMBER, trigger a deploy via Chat or MCP with approval, and read the audit log. That path is the proof. Then move production when you are ready.',
        ],
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
    title: 'Peon vs Dokploy (2026): Per Project vs Per Server Cloud',
    description:
      'Compare Peon and Dokploy: both self-hosted PaaS options. Dokploy Cloud from ~$4.50/server; Peon Cloud $3/project. Audit logs, RBAC tiers, MCP and AI assistant differences.',
    eyebrow: 'Compare',
    h1: 'Peon vs Dokploy',
    intro:
      'Dokploy and Peon both sell an open-source path and a managed control plane for Docker deployments on your servers. The important differences in 2026 are commercial shape (per server vs per project), where audit logs and fine RBAC live, and how deeply AI agents are integrated into the product.',
    keywords: [
      'Peon vs Dokploy',
      'Dokploy alternative',
      'Dokploy vs Peon',
      'Dokploy pricing',
      'Dokploy Hobby',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'Same job, different invoices',
        paragraphs: [
          'Dokploy Cloud’s Hobby plan is widely published around $4.50 per server per month, with tight limits (including a single user on Hobby). Startup plans bundle servers (for example three included from about $15/month) and charge for extras per server. Annual discounts exist.',
          'Peon Cloud charges $3 per project per month with unlimited servers and unlimited members. Self-hosting Peon is free. If your architecture is “many services on few boxes,” per-project pricing usually wins. If you meter cost by server count and Dokploy’s workflow already fits, their model can feel natural.',
          'Always re-check dokploy.com/pricing and peon.sh before budgeting. Published plans change.',
        ],
      },
      {
        title: 'RBAC and audit logs',
        paragraphs: [
          'Dokploy documents basic roles on lower cloud tiers and fine-grained RBAC, SSO/SAML, SCIM and audit logs on Enterprise. That is a classic enterprise packaging strategy.',
          'Peon includes workspace and project RBAC plus owner audit logs on Self Hosted and Cloud. Enterprise adds SSO/SAML, SCIM, white label, MSA/SLA and hosting flexibility, not the first chance to see who deployed production.',
          'If audit and project isolation are day-one requirements, read both matrices carefully instead of assuming “open source means everything is free forever.”',
        ],
      },
      {
        title: 'MCP and AI assistants',
        paragraphs: [
          'Dokploy offers MCP so agents can manage deployments and services. Peon also offers MCP, and adds an in-app AI assistant that uses the same tool catalog with approval for mutating actions and BYO LLM keys.',
          'For teams living in Cursor or Claude, either MCP may be enough. For teams that want a chat panel inside the PaaS with shared permissions, Peon’s Chat is the differentiator.',
        ],
      },
      {
        title: 'Decision guide',
        paragraphs: [
          'Choose Peon. Dokploy can deploy Compose to your servers and offers MCP, but fine-grained RBAC and audit logs sit on Enterprise on their published packaging, Hobby limits users, and Cloud meters by server. Peon includes workspace and project RBAC, owner audit logs, MCP and an in-app AI assistant on Self Hosted and Cloud, at $3/project with unlimited servers and seats.',
          'That bundle is the product. If you need agents in Cursor plus a chat panel inside the PaaS, project isolation for contractors, and an audit trail without an Enterprise contract, Peon is the clear answer.',
        ],
        list: [
          'Dokploy Hobby: ~$4.50/server · limited users on entry tier',
          'Peon Cloud: $3/project · unlimited servers & seats',
          'Dokploy audit / fine RBAC: Enterprise',
          'Peon audit / project RBAC / MCP / Chat: included on standard plans',
        ],
      },
      {
        title: 'Where the products feel similar',
        paragraphs: [
          'Both treat Docker as the unit of deployment. Both can run on a cheap VPS. Both market open-source self-hosting plus a paid cloud control plane. Template catalogs, domains, HTTPS and logs exist in both worlds. If you only compare “can it run my Compose file,” the answer for both is usually yes.',
          'Similarity is exactly why Peon’s differentiators matter. When the deploy loop is commoditized, what you pay for and who can touch production become the real product, and Peon ships project RBAC, audit logs, MCP and Chat together without waiting for Enterprise.',
          'Bottom line: if the checklist stops at Docker deploys, either works. If you want the team and AI features no peer packages the same way on standard plans, use Peon.',
        ],
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
    title: 'Peon vs Vercel (2026): Self-Hosted Alternative Without Per-Seat Pricing',
    description:
      'Vercel Pro is ~$20/seat plus usage on their edge. Peon is $3/project on your VPS with unlimited seats. Compare DX, edge vs colocated DB, and when to dual-run.',
    eyebrow: 'Compare',
    h1: 'Peon vs Vercel',
    intro:
      'Vercel set the bar for frontend DX: previews, edge network, and a Next.js-native workflow. Peon is not trying to be a worse edge CDN. It is a self-hosted-style deployment platform for teams who want that git-push feeling on servers they own, especially when seat counts and always-on backends dominate the bill.',
    keywords: [
      'Vercel alternative',
      'Peon vs Vercel',
      'self hosted Next.js',
      'cheap Vercel alternative',
      'Next.js on VPS',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'What each product optimizes for',
        paragraphs: [
          'Vercel optimizes for global edge delivery, serverless execution and preview deployments tightly integrated with Git. Your app runs on Vercel’s infrastructure. Hobby is limited; Pro is commonly about $20 per deploying seat per month plus usage beyond included credits.',
          'Peon optimizes for ownership of the runtime. Next.js, APIs, workers and databases run on your VPS. Cloud is $3 per project with unlimited teammates. You trade edge PoPs for colocated compute and a predictable project fee.',
          'Those are different products that sometimes coexist: marketing site on Vercel, API and Postgres on Peon.',
        ],
      },
      {
        title: 'Cost and team size',
        paragraphs: [
          'A five-person product team on Vercel Pro pays for seats before bandwidth and function usage. On Peon the same five people share projects at flat project pricing; the variable cost is the VPS.',
          'For static or lightly dynamic sites, Vercel Hobby or Pro can remain cheaper in ops time. For always-on Node services with a database, BYO VPS plus Peon usually wins on monthly spend once seats multiply.',
        ],
      },
      {
        title: 'Technical tradeoffs',
        paragraphs: [
          'Stay on Vercel when edge latency, ISR at the edge, or platform-native image optimization are load-bearing features. Move backends to Peon when you need Docker Compose, long-running workers, Redis on the same box, or SSH-level control.',
          'Peon offers PR previews on your wildcard domain, automatic HTTPS, rollbacks and team RBAC, the operational cousins of Vercel’s preview story, on your network.',
        ],
        list: [
          'Vercel: edge network, per-seat Pro, their cloud only',
          'Peon: BYO VPS, $3/project, unlimited seats',
          'Vercel wins: global edge & serverless DX',
          'Peon wins: colocated DB, Compose, predictable team cost',
        ],
      },
      {
        title: 'Practical migration path',
        paragraphs: [
          'Migrate one non-critical service first. Point DNS when healthy. Keep the marketing frontend on Vercel if the edge still earns its keep. You do not need a big-bang rewrite to stop paying seat tax on every backend.',
        ],
      },
      {
        title: 'When dual-running is the right answer',
        paragraphs: [
          'Keep marketing or docs on Vercel if the edge still earns its keep, then put APIs, workers and databases on Peon. That hybrid is a migration path, not a forever compromise. Peon gives you project RBAC, audit logs, MCP and Chat for the runtime you own; Vercel does not replace those team and agent features for backends on your VPS.',
          'Use Peon projects to mirror staging and production, invite teammates without per-seat taxes, and let agents operate deploys under the same permissions. That is the stack Vercel seat pricing and serverless limits cannot match for always-on services.',
          'Conclusion: dual-run only while you cut over. For the application platform (Compose, colocated Postgres, unlimited seats, audit trail and AI ops), choose Peon. Vercel remains an edge CDN option; Peon is where the product runs.',
        ],
      },
    ],
    related: [
      { label: 'Peon vs Heroku', href: '/compare/peon-vs-heroku' },
      { label: 'Application deployment', href: '/solutions/application-deployment' },
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'MCP & AI', href: '/solutions/mcp-ai' },
    ],
  },
  {
    slug: 'peon-vs-heroku',
    kind: 'compare',
    title: 'Peon vs Heroku (2026): Modern Self-Hosted PaaS Alternative',
    description:
      'Heroku removed its free tier and bills per dyno and add-ons. Peon keeps git-push deploys on your VPS for $3/project. Compare buildpacks, Docker, pricing and lock-in.',
    eyebrow: 'Compare',
    h1: 'Peon vs Heroku',
    intro:
      'Heroku invented the cultural habit of git push to deploy. After the free tier ended in 2022, many teams kept the habit but left the price list. Peon recreates the workflow on Docker hosts you own, with modern team features Heroku never centered on.',
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
    title: 'Peon vs DigitalOcean App Platform (2026)',
    description:
      'DigitalOcean App Platform bills per component on DO. Peon turns Droplets (or any VPS) into a private App Platform for $3/project with unlimited seats and multi-cloud portability.',
    eyebrow: 'Compare',
    h1: 'Peon vs DigitalOcean App Platform',
    intro:
      'DigitalOcean offers two stories: App Platform (managed PaaS on DO) and Droplets (raw VMs). Peon pairs with the second story, and with Hetzner or AWS, to deliver App Platform ergonomics without per-component pricing or DO lock-in.',
    keywords: [
      'DigitalOcean App Platform alternative',
      'Peon vs DigitalOcean',
      'deploy Droplet PaaS',
      'DigitalOcean Droplet vs App Platform',
      'Coolify on DigitalOcean',
    ],
    ...CTA_REGISTER,
    sections: [
      {
        title: 'App Platform: convenience on DigitalOcean only',
        paragraphs: [
          'App Platform builds and runs services for you. Entry dynamic containers often start around $5 per month per component; workers, jobs, databases and bandwidth add lines. Static sites have a limited free tier. You never SSH into the runtime. That is the point.',
          'The constraint is gravity toward DigitalOcean. Leaving means rebuilding elsewhere. Scaling cost is proportional to how many pieces you declare, not how densely you pack a machine.',
        ],
      },
      {
        title: 'Droplet + Peon: dense, portable PaaS',
        paragraphs: [
          'A Droplet from roughly $4–6/month can host a web app, worker, Postgres and Redis if sized honestly. Peon Cloud adds $3 per project for the control plane and unlimited seats. Peon installs Docker and proxy automation over SSH so the Droplet feels like a private App Platform.',
          'Because Peon is not DO-specific, the same workspace can later attach a Hetzner server for EU latency or an EC2 instance for AWS adjacency. App Platform cannot follow you.',
          'You take on host operations: patches, disk, firewall. Peon removes deploy and TLS toil, not Linux ownership.',
        ],
      },
      {
        title: 'Feature expectations',
        paragraphs: [
          'Both paths can do HTTPS, Git deploys and databases. Peon adds Compose stacks, marketplace templates, PR previews on your domain, workspace/project RBAC, audit logs, MCP and Chat. App Platform adds DO-native integrations and less server babysitting.',
          'Agencies often prefer Droplet + Peon: one cheap box per client project, hard isolation via Peon projects, predictable invoices.',
        ],
        list: [
          'App Platform: managed, DO-only, per-component billing',
          'Droplet + Peon: BYO VM, $3/project, multi-cloud',
          'App Platform wins: zero SSH ops',
          'Peon wins: density, portability, team/AI features',
        ],
      },
      {
        title: 'How to decide this week',
        paragraphs: [
          'Choose Peon on a Droplet (or any VPS). App Platform is coherent only if you refuse Docker and accept DO lock-in plus per-component billing. Peon gives you App Platform ergonomics with project RBAC, audit logs, MCP, Chat, $3/project pricing and the freedom to add a Hetzner or AWS server later without rewriting how you deploy.',
        ],
      },
      {
        title: 'Agencies and multi-client isolation',
        paragraphs: [
          'Agencies hit App Platform’s per-component pricing when every client needs a web process, a worker and a database. Peon isolates clients as projects (invite stakeholders as project members without opening the whole workspace) while your staff share servers, sources and marketplace templates at the workspace layer.',
          'Audit logs answer “who changed production last week?” MCP and the in-app AI assistant help operators run many clients without memorizing every hostname, under the same RBAC, with approval for mutating actions. That combination is why agencies should standardize on Peon, not per-component managed PaaS.',
          'Conclusion: use Peon. Keep DO Spaces or DNS if you like them; put compute on Droplets (or elsewhere) and the control plane on Peon Cloud or self-host. You get portable deploys, client isolation, auditability and AI ops in one product, features App Platform does not package this way.',
        ],
      },
    ],
    related: [
      { label: 'Peon vs Dokploy', href: '/compare/peon-vs-dokploy' },
      { label: 'Databases', href: '/solutions/databases' },
      { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
      { label: 'MCP & AI', href: '/solutions/mcp-ai' },
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
