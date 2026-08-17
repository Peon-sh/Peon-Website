import type { DocPage } from './types';

export const GETTING_STARTED_PAGES: DocPage[] = [
  {
    slug: 'introduction',
    title: 'Introduction',
    description:
      'What Peon is, the workspace → project → service → server hierarchy, Cloud vs self-host, and how deployments work.',
    sections: [
      {
        h: 'What is Peon?',
        p: [
          'Peon is an open-source, self-hostable deployment platform. You connect Linux servers over SSH; Peon installs Docker and a reverse proxy, then deploys your apps and databases onto those servers. Your workloads run on hardware you own - Hetzner, DigitalOcean, AWS EC2, OVH, Contabo, bare metal, or a machine under your desk.',
          'Peon Cloud hosts the control plane (dashboard, orchestration, updates) for $3 per project per month or $30 per year with unlimited team members and unlimited servers. Self-hosting the control plane is free; you still bring your own application servers either way.',
        ],
      },
      {
        h: 'Hierarchy',
        p: ['Everything in Peon nests in four layers:'],
        list: [
          'Workspace - top-level tenant: members, servers, Git sources, storages, SSH keys, API tokens, notifications, LLM keys, billing context, audit logs',
          'Project - a group of services (one product or client) with its own members and settings',
          'Service - a deployable unit: Git app, Dockerfile, Docker image, Nixpacks, static site, Compose stack, or database',
          'Server - a Linux host managed over SSH; services deploy onto servers you choose',
        ],
      },
      {
        h: 'Cloud vs self-hosted',
        p: [],
        list: [
          'Peon Cloud: we host the dashboard and workers; apps and databases still run only on your servers',
          'Self-hosted: you run the Peon control plane (web app + worker + Postgres) yourself',
          'Either path: open source product, same deploy model, same RBAC',
        ],
      },
      {
        h: 'How a deployment works',
        p: [
          'When you click Deploy (or a git webhook fires), Peon queues a job on the target server: clone or pull the exact commit / image, build if needed (with layer cache unless you force rebuild), inject encrypted environment variables, and start containers on the Docker network shared with the gateway.',
          'For apps with rolling update enabled, a new container starts beside the old one; the reverse proxy switches traffic after the health check passes; the previous image is retained for rollback. Compose and some database paths update more bluntly. See Advanced configuration.',
        ],
      },
      {
        h: 'What you can deploy',
        p: [],
        list: [
          'Git applications - GitHub App, public repo, or deploy key; build packs Nixpacks, Railpack, Dockerfile, or Static',
          'Dockerfile / Docker Image / Nixpacks / Static Site service kinds',
          'Docker Compose stacks (blank YAML or marketplace templates)',
          'Databases - PostgreSQL, MySQL, MariaDB, MongoDB, Redis, KeyDB, Dragonfly, ClickHouse',
          'One-click marketplace templates (~300+ COMPOSE stacks with magic credentials)',
        ],
      },
      {
        h: 'App shell overview',
        p: [
          'Sidebar Overview: Dashboard, Chat, Projects. Workspace settings: Servers, Storages, Keys & Tokens, Git Sources, Notifications, Settings. In a project you get Services, Members, Settings. In a service the sidebar is kind-aware (Overview, Configuration, Environment, Deployments, Domains, Storage, Scheduled Tasks, Backups, Logs, Terminal, Webhooks, Danger Zone).',
          'Use ⌘K / Ctrl+K for the command palette. Switch workspaces from the sidebar switcher. Theme and sign-out live in the user menu.',
        ],
      },
    ],
  },
  {
    slug: 'installation',
    title: 'Self-Hosting Peon',
    description: 'Run the Peon control plane yourself, or use Peon Cloud and only bring application servers.',
    sections: [
      {
        h: 'Choose a path',
        p: [
          'Most teams start on Peon Cloud (app.peon.sh): register, connect a server, deploy. Use self-hosting when you need the control plane on your network, custom auth wiring, or full data residency of the dashboard database.',
        ],
      },
      {
        h: 'Requirements (self-host)',
        p: [],
        list: [
          'Node.js 20+ and pnpm',
          'PostgreSQL for the control plane',
          'Docker on every application server you will connect (Peon can install Docker on first validate if the SSH user can sudo)',
          'Optional: AWS SQS for the worker queue, SES for email, S3 for assets. See .env.example in the Peon repo',
          'A domain for the dashboard with HTTPS in production',
        ],
      },
      {
        h: 'Quick start',
        p: [
          'Clone Peon-sh/Peon, configure environment, migrate, and run the web app plus worker:',
        ],
        code: `git clone https://github.com/Peon-sh/Peon.git
cd Peon
pnpm install
cp .env.example .env   # DATABASE_URL, secrets, APP_URL, …
pnpm prisma migrate deploy
pnpm build && pnpm start   # web / API
pnpm worker                # deployments, backups, async jobs`,
      },
      {
        h: 'First account',
        p: [
          'Open the dashboard URL and register (if registration is enabled on the instance). Complete onboarding: name the workspace, optionally create a first project. Then create an SSH key under Keys & Tokens, add a server, and follow Your First Deployment.',
        ],
      },
      {
        h: 'Peon Cloud',
        p: [
          'Cloud is $3 per project per month or $30 per year with unlimited servers and unlimited seats. Only the control plane is hosted; application data stays on your VPS. Enterprise adds SSO/SAML, SCIM, white label and commercial terms - contact support@peon.sh.',
        ],
      },
    ],
  },
  {
    slug: 'first-deployment',
    title: 'Your First Deployment',
    description:
      'End-to-end: SSH key → server → Git source → project → service → env → domain → Deploy.',
    sections: [
      {
        h: '1. Create an SSH key',
        p: [
          'Sidebar → Keys & Tokens → SSH Keys. Generate a keypair or paste a private key (optional public key). Name it clearly (e.g. peon-prod). Download the PEM if you need a local copy. The matching public key must be authorized on the VPS (root or your sudo user).',
        ],
      },
      {
        h: '2. Add and validate a server',
        p: [
          'Servers → Add Server. Fields: Name (1–80 chars), IP / Hostname, Port (default 22), User (default root), Private key (required), Gateway type (Traefik default, Caddy, or None).',
          'On create, Peon creates default settings and a destination named default on Docker network peon. Open the server → General → Connect / Reconnect. Watch Activity until Docker and the agent are healthy. Gateway tab → Turn on so ports 80/443 terminate TLS for public apps.',
        ],
      },
      {
        h: '3. Connect Git (optional for public repos)',
        p: [
          'Git Sources → Connect GitHub (platform app when configured) or create a custom GitHub/GitLab app. For a public HTTPS repo you can skip this and choose Public repository on the service. Private repos need Git App or Deploy key mode.',
        ],
      },
      {
        h: '4. Create a project and service',
        p: [
          'Projects → create (Name, optional Description). Open the project → Services → New service. Type Application (Git) or pick Dockerfile / Image / Static / Nixpacks / Database / Compose. Required: Name, Server. For Git: Git source type, Connection/Repository/Branch or Git repository URL, optional Port and Base directory, Build pack for Application (Git).',
          'Create does not ask for DB passwords or description - edit those later under Configuration.',
        ],
      },
      {
        h: '5. Environment, Domains, Deploy',
        p: [
          'Environment → add KEY/value pairs; mark Build and/or Runtime (both default on). Domains → Add New Domain (e.g. https://app.example.com), leave Force HTTPS on, point DNS A/AAAA at the server IP.',
          'Overview → Deploy. Open Deployments for live logs. When healthy, Visit opens the primary domain. From then on enable Auto deploy (Configuration → Advanced) so pushes queue builds.',
        ],
        code: `git commit -am "ship it"
git push origin main
# webhook → build on server → health check → live`,
      },
      {
        h: 'Who can do this',
        p: [
          'Servers, keys, and Git sources: workspace OWNER or ADMIN. Creating projects: OWNER/ADMIN. Creating and deploying services: workspace OWNER/ADMIN or project ADMIN. Project MEMBER is read-only (env masked).',
        ],
      },
    ],
  },
  {
    slug: 'workspaces-and-roles',
    title: 'Workspaces & Roles',
    description:
      'Workspace settings (General, Members, LLMs, Audit, Danger), workspace roles, project roles, and inheritance rules.',
    sections: [
      {
        h: 'Switch or create a workspace',
        p: [
          'Use the sidebar workspace switcher to change the current workspace (stored in the browser) or create a new one (you become OWNER). Personal workspaces are typically created at onboarding; team workspaces support invites, leave, and ownership transfer.',
        ],
      },
      {
        h: 'Settings → General',
        p: ['Path: Settings → General (/settings/general). OWNER or ADMIN can edit workspace Name and Description, then Save.'],
      },
      {
        h: 'Settings → Members',
        p: [
          'Invite by email with role ADMIN, BILLING_ADMIN, or MEMBER (not OWNER). Change roles, remove members, list pending invitations and revoke them. Only OWNER/ADMIN invite or change roles. To make someone OWNER, use Danger → Transfer ownership.',
        ],
      },
      {
        h: 'Settings → LLMs',
        p: [
          'Add or remove OpenAI and/or Anthropic API keys. Required before Chat can list models. OWNER or ADMIN only. Without keys, Chat shows a gate linking here.',
        ],
      },
      {
        h: 'Settings → Audit',
        p: [
          'OWNER-only log of mutating actions. Filter by Action, Actor, Resource type, Search, From, To. Open a row for full metadata. Resource types include workspace, project, service, server, source, storage, private key, token, tag, shared variable, notification, LLM credential, deployment, and more.',
        ],
      },
      {
        h: 'Settings → Danger',
        p: [],
        list: [
          'Leave workspace - non-OWNER members (not on personal workspaces)',
          'Transfer ownership - OWNER picks a member; disposition Stay ADMIN / Stay MEMBER / Leave',
          'Delete workspace - OWNER; type name to confirm; requires zero projects/services (no SSH teardown of remote containers)',
        ],
      },
      {
        h: 'Workspace roles',
        p: [],
        list: [
          'OWNER - full control; only role that deletes the workspace, sees Audit, transfers ownership',
          'ADMIN - manage infra + members + all projects; cannot delete workspace',
          'BILLING_ADMIN - like MEMBER for infra today (billing placeholder); needs project membership for projects',
          'MEMBER - workspace access; projects only via explicit project membership',
        ],
      },
      {
        h: 'Project roles',
        p: [],
        list: [
          'ADMIN - manage services, reveal/edit env, deploy, terminal, marketplace',
          'MEMBER - read-only; env values masked; no deploy, terminal, or secret reveal',
        ],
      },
      {
        h: 'Inheritance rules',
        p: [],
        list: [
          'You must be a workspace member',
          'Workspace OWNER/ADMIN see and manage all projects (no project membership required)',
          'MEMBER / BILLING_ADMIN need Project membership to see a project',
          'Only OWNER/ADMIN create projects; creator becomes project ADMIN',
          'Infrastructure (servers, keys, sources, storages, notifications) requires workspace OWNER/ADMIN',
          'UI may hide buttons; API and MCP enforce the real rules',
        ],
      },
    ],
  },
  {
    slug: 'projects',
    title: 'Projects',
    description:
      'Create and manage Peon projects: Services, Members, and Settings tabs, roles, marketplace, and safe delete rules.',
    sections: [
      {
        h: 'What a project is',
        p: [
          'A project groups services that belong to one product, client, or environment boundary inside a workspace. Servers, Git sources, storages, and SSH keys stay at the workspace level; the project is where you list apps, databases, and Compose stacks, invite project-scoped members, and bill on Peon Cloud ($3 per project per month or $30 per year on Cloud).',
          'Hierarchy reminder: Workspace → Project → Service, with each service deployed onto a Server you choose. Use separate projects when you want separate member lists, cleaner service inventories, or separate Cloud project billing—not when you only need another container (that is a new service).',
        ],
      },
      {
        h: 'List and create',
        p: [
          'Sidebar → Projects (/projects). Create with Name and optional Description. Who: workspace OWNER/ADMIN. The creator becomes project ADMIN. Open a project card to enter the project shell (Services / Members / Settings).',
          'Workspace OWNER and ADMIN see and manage all projects without being added on the Members tab. Workspace MEMBER and BILLING_ADMIN only see projects where they have explicit project membership. See Workspaces & Roles for the full matrix.',
        ],
      },
      {
        h: 'Tab: Services',
        p: [
          'Lists every service in the project. Actions: New service and Marketplace (manage role only—workspace OWNER/ADMIN or project ADMIN). Empty state offers both paths.',
          'New service opens the typed create dialog (Application Git, Dockerfile, Docker Image, Static, Nixpacks, Database, Compose). Marketplace creates a COMPOSE service from a one-click template; you still open the service and click Deploy. Required on create: Name and Server (plus kind-specific fields). After create, configure Environment, Domains, and Deploy from the service sidebar.',
          'From the service list, open any card to reach Overview, Configuration, Deployments, Logs, and the rest of the kind-aware sidebar. Stopping or deleting services happens on the service itself—not on this tab beyond navigation into those flows.',
        ],
      },
      {
        h: 'Tab: Members',
        p: [
          'Add a workspace user as project ADMIN or MEMBER, change role, or remove them. Who can manage members: workspace OWNER/ADMIN or project ADMIN. Invite people to the workspace first (Settings → Members) if they do not appear as addable users yet; project membership only applies to existing workspace members.',
        ],
        list: [
          'Project ADMIN - manage services, reveal/edit env, deploy, terminal, marketplace',
          'Project MEMBER - read-only; env values masked; no deploy, terminal, or secret reveal',
          'Workspace OWNER/ADMIN - full project access automatically; do not add them here',
        ],
      },
      {
        h: 'Tab: Settings',
        p: [
          'Edit Name and Description → Save. Delete project is blocked while any services still exist—delete each service from its Danger Zone (type the exact service name) first, then delete the project with name confirmation.',
          'Deleting a project removes project membership and project settings. It does not delete workspace servers, storages, Git sources, or SSH keys. It does not terminate cloud VMs. Back up databases before removing services that hold data you need. On Peon Cloud, removing a project also ends that project’s subscription seat—confirm billing impact before you delete.',
        ],
      },
      {
        h: 'Who can do what (project scope)',
        p: [
          'API and MCP enforce the same RBAC as the UI: a peon_ token inherits your workspace role and project memberships. Project MEMBERs cannot deploy or reveal secrets through agents either.',
        ],
        list: [
          'Create projects - workspace OWNER/ADMIN only',
          'Create and deploy services - workspace OWNER/ADMIN or project ADMIN',
          'Marketplace - manage role only',
          'Project MEMBER - view services; cannot deploy or reveal secrets',
          'Infrastructure (servers, keys, sources, storages) - workspace OWNER/ADMIN, not project-only admins',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Projects → create Name (+ Description) as workspace OWNER/ADMIN',
          'Services → New service or Marketplace → configure → Deploy',
          'Members → add workspace users as project ADMIN or MEMBER when they are not workspace OWNER/ADMIN',
          'Settings → rename anytime; delete only after all services are gone',
          'One product/client per project keeps roles and Cloud billing clearer',
          'Need shared SMTP keys across projects? Use Shared Variables; keep app secrets on each service Environment',
        ],
      },
    ],
  },
  {
    slug: 'profile',
    title: 'Profile & Account',
    description:
      'Manage your Peon account: display name, avatar, password, active sessions, sign-in entry points, and security tips for stolen devices.',
    sections: [
      {
        h: 'What Profile covers',
        p: [
          'Profile & Account is where each signed-in user manages their own identity settings—how you appear in the UI, how you authenticate, and which devices still have a valid session. It is not workspace Settings (members, billing context, Danger Zone) and not project Members. Every user edits only their own profile.',
          'Open User menu → Profile (/profile) from any page while signed in. Changes here apply across workspaces you belong to on that Peon account.',
        ],
      },
      {
        h: 'Display name and avatar',
        p: [
          'Edit your display name and Save. The name is what teammates see in members lists, audit-friendly actor labels, and the user menu—choose something recognizable on a shared team.',
          'Avatar: upload JPEG, PNG, or WebP, maximum 2 MB. Remove the avatar if you want to clear it. Very large or unsupported formats fail validation—compress or convert before uploading. Avatars are cosmetic; they do not affect RBAC.',
        ],
      },
      {
        h: 'Password',
        p: [
          'Set a password if your account does not have one yet, or change an existing password. When changing, the current password is required so a stolen browser session alone cannot silently rotate credentials without that secret.',
          'Prefer a long, unique password (password manager). If you signed up with Google (when the instance enables it), you may still add or manage a password depending on instance policy—use Password + Sessions together if you need a non-OAuth fallback. After a suspected leak, change the password and revoke sessions immediately.',
        ],
      },
      {
        h: 'Sessions',
        p: [
          'The Sessions list shows active devices/sessions with relative last-seen times. Use it when you left a session open on a shared computer, lost a laptop, or see an unfamiliar device.',
        ],
        list: [
          'Revoke one session - sign out that device only',
          'Revoke others - keep the current browser, drop every other session',
          'Revoke all - sign out everywhere (including this browser); you will need to log in again',
        ],
      },
      {
        h: 'How revocation works',
        p: [
          'Revoked sessions cannot use the session cookie even if a JWT has not expired yet—Peon invalidates the server-side session record. If you revoke all, complete login again on devices you still trust.',
          'Revoking sessions does not rotate API tokens (peon_… under Keys & Tokens). Those are separate secrets: if a token may be leaked, revoke it under Keys & Tokens in addition to clearing browser sessions. SSH keys are also separate workspace secrets.',
          'On shared or public computers, prefer Revoke others when you leave, or use Revoke all from a trusted device later. Do not stay signed in on kiosks. If your email was phished, use forgot-password, then revoke sessions and tokens—password reset alone may not drop an attacker’s already-open session until you revoke.',
        ],
      },
      {
        h: 'Auth entry points',
        p: [
          'Related routes outside /profile that matter for account lifecycle:',
        ],
        list: [
          '/login, /register - email/password; Google when configured on the instance',
          '/forgot-password → /reset-password - recover access when you cannot sign in',
          '/invitations/[token] - accept workspace (and optional project) invite',
          '/onboarding - name workspace, optional first project after first registration',
        ],
      },
      {
        h: 'Invites and onboarding vs profile',
        p: [
          'Accepting an invitation adds you to a workspace (and optionally a project); it does not change your display name or password. Finish /onboarding when prompted so you have a workspace context, then open Profile anytime to refine identity settings.',
          'Workspace OWNER/ADMIN manage who else can join under Settings → Members; you cannot use Profile to invite teammates. To leave a workspace or transfer ownership, use workspace Settings → Danger—not Profile.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'User menu → Profile → update display name / avatar → Save',
          'Use a unique password; require current password when changing',
          'Review Sessions after travel or shared-computer use',
          'Lost device: change password → Revoke others or Revoke all → revoke peon_ tokens if needed',
          'New teammate: they register/login, then accept /invitations/[token] if invited',
          'Profile ≠ workspace Danger Zone—leaving or deleting a workspace is under Settings',
        ],
      },
    ],
  },
];
