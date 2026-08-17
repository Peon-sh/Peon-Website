import type { DocPage } from './types';

export const OPS_PAGES: DocPage[] = [
  {
    slug: 'deployments-and-previews',
    title: 'Deployments & Previews',
    description:
      'Manage Peon production deploys and PR previews: Deploy now, force rebuild, cancel, rollback, live logs, wildcard DNS, and common preview errors.',
    sections: [
      {
        h: 'What a deployment is',
        p: [
          'A deployment is a queued job on the service’s target server: clone or pull the exact commit or image, build when needed, inject encrypted environment variables, and start containers on the Docker network shared with the gateway. You trigger it from Overview (Deploy / Redeploy), from Deployments (Deploy now / Force rebuild), from git auto-deploy/webhooks, or via API/MCP with a peon_ token.',
          'Open Service → Deployments for the list; open a row for detail at …/deployments/[deploymentId] with live build logs and download. Production deploys update the live service. Preview deploys are separate environments for pull requests when enabled.',
        ],
      },
      {
        h: 'Deployments list actions',
        p: [
          'From the Deployments page (and related Overview controls) you can:',
        ],
        list: [
          'Deploy now - queue a normal production deploy using current config and cache where applicable',
          'Force rebuild - deploy with build/source cache cleared when a stale layer or cached source looks wrong',
          'Cancel - stop a queued or in-progress deploy',
          'Rollback - re-point production to a previously finished production deploy (needs retained images per Docker images to keep)',
          'Detail logs - follow live output; download for sharing or post-mortems',
          'Preview list - see active PR previews; delete a preview env when the PR is done',
        ],
      },
      {
        h: 'Production deploy tips',
        p: [
          'Watch the detail logs until the job finishes. Failures usually show up as clone/auth errors, build command exits, image pull denials, health check failures, or port/domain misconfiguration. Fix Configuration or Environment, then Deploy now again—or Force rebuild if you suspect cache.',
          'Rolling update (Configuration → Advanced, where available) starts a new container beside the old one and switches traffic after health checks; Compose and some database paths update more bluntly. Keep Docker images to keep above 0 if you rely on Rollback. Cancel a stuck deploy before queueing another if the UI allows, to avoid confusing overlapping jobs.',
        ],
      },
      {
        h: 'Preview deployments',
        p: [
          'PR previews build a disposable environment per pull request so reviewers can click a URL without merging. Setup:',
        ],
        list: [
          'Configuration → Advanced → enable Preview deployments (git-based services; not Compose)',
          'Servers → General → set Wildcard domain and follow the in-app DNS guide (preview hosts look like {sha}.{wildcard})',
          'Ensure GitHub/GitLab app permissions and Auto deploy so PR events reach Peon',
          'Open a PR → Peon builds and publishes https://{sha}.{wildcard} (exact pattern per server settings)',
          'Delete finished previews from Deployments → preview panel to free resources',
        ],
      },
      {
        h: 'Wildcard DNS and preview env',
        p: [
          'The server Wildcard domain is the base for preview FQDNs. DNS must resolve *.your-wildcard-host to the server IP, Gateway must be on, and ports 80/443 open so certificates and routing work. A 404 or NXDOMAIN on the preview URL almost always means wildcard DNS, gateway, or domain settings—not the app build itself.',
          'Preview Environment variables are separate from production (Service → Environment). Import from production to bootstrap, then override staging databases and URLs. Missing preview env is a common reason previews build but behave wrong.',
        ],
      },
      {
        h: 'Auto-deploy vs manual',
        p: [
          'With Auto deploy on and webhooks registered, pushes to the watched branch queue production deploys automatically; PR activity queues previews when Preview deployments is enabled. Manual Deploy now is still useful for config-only changes, hotfixes, or when you temporarily disable Auto deploy. See Webhooks & Automation for webhook URLs, watch paths, and tokens.',
        ],
      },
      {
        h: 'Common errors',
        p: [],
        list: [
          '404 on preview - wildcard DNS, Gateway, or server Wildcard domain misconfigured',
          'No auto preview - Auto deploy off, Preview deployments off, or GitHub/GitLab app permissions missing',
          'Build fails after dependency bump - try Force rebuild to clear cache',
          'Rollback unavailable - no prior successful production deploy retained (check Docker images to keep)',
          'Deploy queued forever - server offline, SSH failing, or worker/queue issue; check server validate and deployment logs',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Production: Deploy now or git push with Auto deploy → watch Deployments logs',
          'Bad cache: Force rebuild; bad release: Rollback to last good production deploy',
          'Previews: Wildcard domain + DNS → enable Preview deployments → open PR',
          'Preview config: Environment → preview section; delete old previews when done',
          'Compose: no preview deploys / rolling update—use production Deploy and plan cutovers',
        ],
      },
    ],
  },
  {
    slug: 'database-backups',
    title: 'Database Backups',
    description:
      'Schedule Peon database backups: cron frequency, local retention, S3 upload via Storages, Backup now, history, Restore, and common failures.',
    sections: [
      {
        h: 'What Database Backups are',
        p: [
          'Database Backups dump a running DATABASE service on a schedule (or on demand), keep a configurable number of copies on the server, and optionally upload dumps to an S3-compatible workspace Storage. Use them so disk failure, bad migrations, or accidental deletes do not wipe your only copy of application data.',
          'This is not Scheduled Tasks (arbitrary cron inside an app container) and not Service → Storage (Docker volume mounts). Backups are engine-aware dump/restore flows on the database service itself.',
        ],
      },
      {
        h: 'Where and which engines',
        p: [
          'Open the database service → Backups. Available for PostgreSQL, MySQL, MariaDB, and MongoDB. Redis-family engines (Redis, KeyDB, Dragonfly) and other kinds without the Backups UI are not covered here—use external snapshots or app-level export if you need copies of those stores.',
          'The database must be running before Backup now or scheduled dumps succeed. Who can manage: project manage role (workspace OWNER/ADMIN or project ADMIN), same as other sensitive service operations.',
        ],
      },
      {
        h: 'Create and edit a schedule',
        p: [
          'Add a schedule with Frequency (cron)—default 0 0 * * * (daily). Then edit fields:',
        ],
        list: [
          'Frequency (cron) - 5-field cron for when dumps run (server/job timing context)',
          'Local backups to keep - retention 0–1000 (default 7) on the application server',
          'Upload to S3 - pick a workspace Storage created under Sidebar → Storages',
          'Enable / Disable - pause without deleting history',
          'Backup now - run immediately for a test or pre-change safety copy',
          'Delete - remove the schedule when unused',
          'History + Restore - inspect runs and restore from a successful dump',
        ],
      },
      {
        h: 'Local retention vs S3',
        p: [
          'Local retention keeps recent dumps on the VPS for fast Restore. S3 upload copies dumps off-box for disaster recovery if the server is lost. Production databases should usually enable both: enough local copies for quick rollback, plus Upload to S3 after Storages → Test succeeds.',
          'Retention 0 means you are not keeping local copies (rely on S3 or accept risk). Raising retention uses more disk—watch server free space, especially on small VPS plans. Old local dumps beyond the keep count are pruned according to platform behavior as new backups succeed.',
        ],
      },
      {
        h: 'Recommended workflow',
        p: [],
        list: [
          'Create DATABASE service; wait until running and credentials are set',
          'Storages → add bucket (AWS/R2/B2/MinIO/…) → Test',
          'Backups → create schedule → set cron + local keep count → Upload to S3',
          'Backup now; confirm History success and an object in the bucket',
          'Enable backup_failure in Notifications so silent upload errors surface',
          'Before risky migrations or Danger Zone deletes: Backup now again',
        ],
      },
      {
        h: 'Restore',
        p: [
          'From Backups → History, restore from a successful dump when you need to roll data back. Treat Restore as destructive to current database contents—coordinate downtime, stop writers if needed, and verify the dump timestamp before confirming. After Restore, check the app service (Environment DATABASE_URL, connectivity) and run smoke tests.',
          'If the only good copy lives in S3 and local history is gone, ensure the dump is available through the backup/restore flow Peon exposes for that execution (or recover the object from the bucket per your ops process). Prefer testing Restore on a staging database service before relying on it in production.',
        ],
      },
      {
        h: 'Common errors',
        p: [],
        list: [
          'S3 upload fails → Storages → Test credentials, endpoint, region, bucket ACL',
          'Backup now fails while DB is starting → wait until healthy, then retry',
          'Disk full → lower local retention, free space, or rely more on S3',
          'No Backups tab → engine is Redis-family or not a DATABASE service',
          'Restore surprises → wrong dump selected; confirm History timestamp and service',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Engines: Postgres / MySQL / MariaDB / MongoDB only in UI',
          'Schedule cron + local keep (default 7) + S3 for production',
          'Test Storage before enabling Upload to S3',
          'Backup now after create and before dangerous changes',
          'Restore only from successful History entries; verify afterward',
          'Wire Notifications → backup_failure',
        ],
      },
    ],
  },
  {
    slug: 'scheduled-tasks',
    title: 'Scheduled Tasks',
    description:
      'Run cron jobs inside Peon service containers: create schedules, set timeouts, target containers, execute now, and review execution history.',
    sections: [
      {
        h: 'What Scheduled Tasks are',
        p: [
          'Scheduled Tasks are cron-driven shell commands that Peon runs inside your service’s container on the target server. Use them for nightly cleanups, queue workers that should wake on a schedule, cache warmers, report scripts, or any maintenance command you would otherwise install with crontab on the host.',
          'Tasks are scoped to a single service. They are not the same as Database Backups (which dump engines on their own schedule) or server Cleanup cron under Servers → Advanced. Prefer Scheduled Tasks when the command must see the app’s filesystem, Environment variables, and network namespace inside the running container.',
        ],
      },
      {
        h: 'Where and who',
        p: [
          'Open Service → Scheduled Tasks. The section is hidden for Database services—use Backups or an adjacent app/Compose service if you need app-level cron next to a database. For Compose and other app kinds (Git, Docker Image, Static, and similar), the panel appears in the service sidebar when your role can manage the project.',
          'Commands run in the container environment, so secrets from Environment are available the same way your app process sees them. Do not put passwords in the Command string; read them from env inside the script instead.',
        ],
      },
      {
        h: 'Create a task',
        p: [
          'Click to add a new task and fill the create fields:',
        ],
        list: [
          'Name - short label, e.g. cleanup-cache or send-digests',
          'Frequency (cron) - standard 5-field cron (minute hour day-of-month month day-of-week); default 0 0 * * * (daily at midnight, server time context)',
          'Command - shell invoked inside the container, e.g. pnpm run scheduler:clean or php artisan schedule:run',
        ],
      },
      {
        h: 'Cron tips',
        p: [
          'Five fields only—do not paste 6-field (with seconds) expressions unless your product UI explicitly accepts them; Peon’s default examples use classic 5-field cron. Examples: */15 * * * * every fifteen minutes; 0 */6 * * * every six hours; 0 3 * * 1 Mondays at 03:00.',
          'Keep jobs idempotent when possible so an overlapping or retried run does not corrupt data. For long jobs, raise Timeout and avoid scheduling the next tick before the previous run usually finishes. If two services need the same schedule, create a task on each service rather than assuming one container can reach another’s private paths.',
        ],
      },
      {
        h: 'Edit, enable, and target containers',
        p: [
          'After create, open the task to refine behavior:',
        ],
        list: [
          'Timeout (seconds) - 1–86400; default 300. Peon stops the run if it exceeds this limit',
          'Container name - optional; set when a Compose (or multi-container) service has more than one container and the command must run in a specific one',
          'Enable / Disable - pause the schedule without deleting history or the command',
          'Execute now - queue an immediate run for testing',
          'History - past executions with outcomes for debugging',
        ],
      },
      {
        h: 'Execute now and history',
        p: [
          'Use Execute now after you change Command or Frequency to verify the script exits zero in the real container. Check History for failed runs, then open Service → Logs or Terminal if you need stdout/stderr beyond what the execution record shows.',
          'A disabled task does not fire on cron but can still be useful as a documented one-shot via Execute now. Delete tasks you no longer need so old schedules cannot be re-enabled by mistake.',
        ],
      },
      {
        h: 'Compose and multi-container notes',
        p: [
          'On Compose stacks, the default container may not be the one that has your app CLI. Set Container name to the service/container that includes the binary (for example the web or worker service). Confirm with Terminal first: if the command works interactively in that container, paste the same command into the task.',
          'Redeploys replace containers; schedules remain on the Peon service record. After a major compose change that renames containers, update Container name so cron still hits the right process.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Open Service → Scheduled Tasks (not available on Database services)',
          'Create: Name + 5-field cron + Command that works inside the container',
          'Set Timeout for long jobs; leave default 300 for short maintenance',
          'Compose: set Container name when more than one container exists',
          'Test with Execute now; confirm success in History (and Logs if needed)',
          'Disable to pause; delete unused tasks; keep secrets in Environment, not in Command',
        ],
      },
    ],
  },
  {
    slug: 'logs-and-terminal',
    title: 'Logs & Terminal',
    description:
      'Read Peon container logs (tail, follow, download) and use UI-only interactive terminals for services and servers—roles, limits vs Chat/MCP, and debugging tips.',
    sections: [
      {
        h: 'What Logs and Terminal are for',
        p: [
          'Logs show stdout/stderr from the running service containers so you can debug crashes, misconfigured env, and runtime errors after a deploy. Terminal opens an interactive shell—either inside a service container or over SSH on the server—when you need to inspect files, run one-off commands, or confirm a fix before changing Configuration.',
          'Build-time output lives primarily under Deployments → deployment detail (live build logs). Use Service → Logs for the running app after it is up. Use Notifications for push alerts; use Logs/Terminal when you are actively investigating.',
        ],
      },
      {
        h: 'Service → Logs',
        p: [
          'Open the service sidebar → Logs. Controls:',
        ],
        list: [
          'Last N lines - 100 / 200 / 500 / 1000 / 2000',
          'Auto-refresh / follow - stream new lines as the process writes them',
          'Download / refetch - export a snapshot or reload the buffer',
        ],
      },
      {
        h: 'Reading logs effectively',
        p: [
          'Start with a larger tail (1000–2000) after a crash, then enable follow while you reproduce the issue. Exit 137 often means OOM (raise memory limits or fix a leak); exit 1 is usually an application error; exit 127 often means a missing binary or bad start command. Missing env keys and “database not ready” during boot are common—compare Environment and health check start period.',
          'Compose stacks may log from multiple containers; if the stream looks like the wrong process, confirm which container Peon is tailing and use Terminal on the specific container when needed. Download logs before a Redeploy if you need to keep evidence of a failure that rotating container logs would lose.',
          'If Logs stay empty, confirm the service is actually running (Overview status), that the process writes to stdout/stderr (not only to an internal file), and that you are on the correct service in a multi-service project. For static nginx images, access logs may be quiet until you hit the site.',
        ],
      },
      {
        h: 'Service Terminal',
        p: [
          'Service → Terminal opens an interactive shell inside the service container (project manage role: workspace OWNER/ADMIN or project ADMIN). Use it to run migrations manually, inspect mounted volumes, curl internal URLs on the Docker network, or verify a Scheduled Tasks command before saving it.',
          'Terminal is not a substitute for immutable deploys—changes inside an ephemeral container disappear on the next deploy unless persisted on a volume or baked into the image. Prefer Environment and Configuration for lasting fixes. Project MEMBER cannot open Terminal or reveal secrets—escalate to a project ADMIN when shell access is required.',
        ],
      },
      {
        h: 'Server Terminal',
        p: [
          'Servers → Terminal (or the server detail Terminal tab) is a host SSH shell as the user Peon uses to manage the machine. Who: workspace OWNER/ADMIN. Use it for Docker diagnostics (disk full, stuck containers), gateway checks, and host-level networking—not for day-to-day app deploys (those should go through Deployments).',
          'Be careful with destructive Docker prune commands; unused volume deletion can wipe data from stopped containers. Prefer the in-app cleanup toggles when you want guided prune behavior. If the Terminal will not connect, validate the server SSH key and connectivity under Servers first—the same failure will block deploys.',
        ],
      },
      {
        h: 'Not available via Chat or MCP',
        p: [
          'Interactive shells (exec_in_service / exec_on_server) are intentionally omitted from Chat and MCP. Agents can list logs or trigger deploys within RBAC where those tools exist, but a real TTY is UI-only so humans approve sensitive host access. Mutating Chat actions still require Approve; Terminal sessions are already an interactive human session in the browser.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Build failed → Deployments detail logs first',
          'App crash after healthy deploy → Service → Logs (follow + larger tail)',
          'Need a shell in the app → Service → Terminal (manage role)',
          'Need a shell on the VPS → Servers → Terminal (OWNER/ADMIN)',
          'Download logs before Redeploy if you need a failure artifact',
          'Do not expect Terminal from MCP/Chat—use the UI tabs',
        ],
      },
    ],
  },
  {
    slug: 'webhooks-and-api',
    title: 'Webhooks & Automation',
    description:
      'Automate Peon with service webhooks (Generic, GitHub, GitLab), git auto-deploy and watch paths, plus personal API tokens for REST and MCP.',
    sections: [
      {
        h: 'What this page covers',
        p: [
          'Peon can deploy without you clicking Deploy every time. Git pushes and pull-request events can queue builds through webhooks; your CI, scripts, and AI agents can drive the same operations over REST or MCP with a personal API token. This page explains service-level webhook URLs, how auto-deploy and watch paths work, and how tokens fit with Keys & Tokens and the MCP Server docs.',
          'Webhooks are about inbound events from Git hosts (or a generic HTTP caller). API and MCP tokens are about outbound automation you initiate. You often use both: a GitHub App or service webhook for continuous delivery, and a peon_… token for agents, dashboards, or custom pipelines.',
        ],
      },
      {
        h: 'Service → Webhooks',
        p: [
          'Open a service sidebar → Webhooks. Here you create inbound endpoints Peon listens on for that service. Choose a provider—Generic, GitHub, or GitLab—then create a webhook. Peon generates a URL shaped like /api/webhooks/{token}. Copy it and register it with your git host (or call it from your own automation). Delete unused hooks so old tokens cannot trigger deploys.',
          'GitHub and GitLab providers expect the event shapes those platforms send (pushes, and related delivery metadata). Generic is for custom systems that can POST to the URL you control. Prefer workspace Git Sources (GitHub/GitLab App install) when you want installation-level webhooks and repo pickers in the create-service UI; use Service → Webhooks when you need a per-service URL, a public-repo/deploy-key flow, or a non-App integration.',
        ],
        list: [
          'Provider - Generic, GitHub, or GitLab',
          'New webhook - creates /api/webhooks/{token}; copy and register with your git host',
          'Delete - remove unused hooks so leaked URLs stop working',
        ],
      },
      {
        h: 'Auto-deploy',
        p: [
          'For git-based services, Configuration → Advanced → Auto deploy (on by default for those kinds) tells Peon to queue a deployment when a qualifying webhook event arrives for the watched branch. A push alone is not enough if Auto deploy is off, or if no webhook path exists from the Git source or Service → Webhooks URL into Peon.',
          'Typical setup: connect a Git Source or register the service webhook URL on the repository, keep Auto deploy enabled, push to the configured branch, then open Deployments to watch the job. Preview deployments are separate—they need Preview deployments enabled, a server Wildcard domain, and adequate GitHub/GitLab permissions; if previews never appear, check Auto deploy and app permissions as well (see Deployments & Previews).',
        ],
      },
      {
        h: 'Watch paths',
        p: [
          'Under Configuration → Build (git-based services), Watch paths are globs listed one per line. When empty, every push to the watched branch can trigger auto-deploy. When set, Peon only queues a build if changed files match at least one glob—useful in monorepos so a docs-only or sibling-package change does not rebuild this service.',
          'Combine watch paths with a clear base directory and pinned branch so each service rebuilds only for its slice of the repository. After changing watch paths, the next matching push (or a manual Deploy) confirms the filter behaves as you expect.',
        ],
      },
      {
        h: 'Git Sources vs service webhooks',
        p: [
          'Workspace → Git Sources holds GitHub or GitLab app connections (platform install or custom app fields, webhook secrets, and setup URLs). Services that use Git source type Git App pick that connection plus repository and branch. Public repository and Deploy key modes use a repository URL instead; those flows often rely more on Service → Webhooks or manual Deploy.',
          'If auto-deploy never fires: confirm the source connection status, that the repo webhook or App installation still points at Peon, that the push hit the configured branch, that Auto deploy is on, and that watch paths (if any) match the diff. Then check Deployments for a queued or failed job rather than assuming the webhook never arrived.',
        ],
      },
      {
        h: 'API tokens for REST and MCP',
        p: [
          'Sidebar → Keys & Tokens → API Tokens. Create a personal access token (prefix peon_…). Copy it once when shown; revoke later if it leaks or a teammate leaves. The token inherits your workspace role and project memberships—the same RBAC as the UI. OWNER/ADMIN reach infrastructure surfaces; project MEMBER only reaches projects they belong to.',
          'Use the token as Authorization: Bearer peon_… against the Peon REST API for scripting deploys, reading status, managing env within role, and similar ops. For AI clients, point Streamable HTTP MCP at {appOrigin}/mcp with the same Bearer header (on Peon Cloud that is your app origin; when self-hosting, use your dashboard domain). Tool coverage includes projects, services, deployments, env, backups, servers, sources, members, and more under RBAC.',
          'In-app Chat uses a related tool catalog but still requires UI Approve before mutating actions. Interactive shells (exec in service or on server) are not exposed on MCP or Chat—use Terminal in the app. Treat peon_ tokens like passwords: do not commit them, rotate by revoke-and-recreate, and prefer narrow operator accounts when agents only need project scope. See Keys & Tokens and MCP Server for client JSON examples and security notes.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Continuous delivery: Auto deploy on → Git Source webhooks or Service → Webhooks URL registered → push to watched branch',
          'Monorepo: set Watch paths so only relevant file changes rebuild the service',
          'Per-service inbound URL: Service → Webhooks → New webhook → copy /api/webhooks/{token}',
          'Agents and scripts: Keys & Tokens → peon_… → REST Bearer or MCP at {appOrigin}/mcp',
          'Previews: enable Preview deployments + wildcard DNS; fix App permissions if PRs never build',
          'Cleanup: delete unused service webhooks and revoke unused API tokens',
        ],
      },
    ],
  },
  {
    slug: 'notifications',
    title: 'Notifications',
    description:
      'Configure Peon workspace alerts: Email, Discord, Slack, Telegram, Pushover, and Webhook channels, event types, Test delivery, and setup tips.',
    sections: [
      {
        h: 'What Notifications are for',
        p: [
          'Notifications push operational events out of the Peon dashboard into channels your team already watches—email, chat, mobile push, or a custom HTTP endpoint. Use them so deploy failures, unreachable servers, and backup problems do not wait for someone to open Deployments or Backups.',
          'Channels are workspace-scoped: one configuration covers projects and services in that workspace (subject to which events you enable). They complement in-app activity and logs; they do not replace fixing the underlying deploy, SSH, or backup issue.',
        ],
      },
      {
        h: 'Where and who',
        p: [
          'Sidebar → Notifications (/notifications). Who: workspace OWNER/ADMIN. Project-only ADMINs manage services but do not configure workspace notification channels—ask a workspace admin if you need a new Slack or Telegram destination.',
        ],
      },
      {
        h: 'Channels and fields',
        p: [
          'The UI is organized by channel tabs. Enable a channel, fill its credentials, choose events, Save, then Test:',
        ],
        list: [
          'Email - Recipient email(s); relies on mail being configured for the Peon instance (Cloud or your self-host SES/SMTP setup)',
          'Discord / Slack - Incoming Webhook URL from the channel or workspace integrations UI',
          'Telegram - Bot token and Chat ID for the target group or DM',
          'Pushover - App token and User key for mobile/desktop push',
          'Webhook - Destination URL plus Signing secret so your receiver can verify Peon payloads',
        ],
      },
      {
        h: 'Events',
        p: [
          'Select only the events you want to receive. Noise from every successful deploy can hide real incidents—many teams enable failures plus server reachability, and add success only for critical production services if the product UI scopes allow, or accept workspace-wide success alerts sparingly.',
        ],
        list: [
          'deployment_success - production (or deploy) finished successfully',
          'deployment_failure - build, pull, health check, or deploy job failed',
          'server_unreachable - Peon could not reach or validate the server as expected',
          'backup_failure - database backup or S3 upload path failed',
        ],
      },
      {
        h: 'Setup and Test',
        p: [
          'Enable the channel, select events, Save, then use Test delivery before relying on it in production. A failed Test usually means a bad webhook URL, revoked bot token, wrong chat ID, mail not configured on the instance, or a receiver that rejects the request.',
          'For Slack/Discord, create a dedicated #peon-alerts (or similar) channel so deploy noise does not flood general chat. For Webhook, verify the signing secret on your side and respond quickly with 2xx so retries do not pile up. Rotate webhook URLs and bot tokens if they leak; update the Notifications form and Test again.',
          'Email recipients should be monitored aliases (for example alerts@yourcompany.com) rather than a single personal inbox when several people share on-call. If Test email never arrives, check spam and confirm the Peon instance actually has outbound mail configured—Cloud handles this for you; self-host must set SES/SMTP (or equivalent) in the control-plane environment.',
        ],
      },
      {
        h: 'Operational tips',
        p: [
          'Pair notifications with runbooks: deployment_failure → open Deployments logs; server_unreachable → Servers validate / SSH; backup_failure → Backups history and Storages → Test. Self-hosters should confirm the control plane can egress to Slack, Telegram, or SMTP—blocked egress looks like “notifications do nothing.”',
          'Chat Approve cards and MCP tool calls are separate from this Notifications center. Mutating Chat actions still need UI approval; workspace alerts here are for platform events, not every agent action.',
          'After adding a new production server or database, trigger a deliberate failure in a staging project (or use Test) so you know the channel still works before the first real outage. Revisit event toggles when the team complains about noise—adjusting events is safer than disabling the whole channel.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Notifications → pick channel tab → fill fields → enable',
          'Select events (prefer failure + unreachable; add success deliberately)',
          'Save → Test delivery → confirm a message arrives',
          'On silence: check credentials, instance mail/SMTP, and network egress',
          'Rotate leaked webhook/bot secrets; delete unused channels',
          'OWNER/ADMIN only—project members cannot edit workspace channels',
        ],
      },
    ],
  },
];

export const REFERENCE_PAGES: DocPage[] = [
  {
    slug: 'workflows',
    title: 'End-to-End Workflows',
    description:
      'Recipes: first deploy, marketplace, auto-deploy, teammates, backups, previews, rollback, ownership.',
    sections: [
      {
        h: 'First deploy',
        p: [],
        list: [
          'Keys & Tokens → create SSH key',
          'Servers → add → Connect until healthy; Gateway on',
          'Git Sources → connect (or public repo)',
          'Projects → create → New service (Git) → Configuration',
          'Environment → vars; Domains → FQDN + DNS',
          'Overview → Deploy; watch Deployments logs',
        ],
      },
      {
        h: 'Marketplace service',
        p: [],
        list: [
          'Validated server with Gateway on',
          'Marketplace or /deploy/[slug] → Workspace / Project / Server',
          'Service Specific Configuration + Environment for credentials',
          'Domains → FQDN + DNS → Overview → Deploy → Visit',
        ],
      },
      {
        h: 'Auto-deploy and webhooks',
        p: [
          'Enable Auto deploy → ensure Git webhooks or Service → Webhooks URL registered → push to watched branch.',
        ],
      },
      {
        h: 'Add a teammate',
        p: [
          'Settings → Members → invite ADMIN or MEMBER. For MEMBER: Project → Members → add as project ADMIN or MEMBER.',
        ],
      },
      {
        h: 'Database backup and restore',
        p: [
          'DATABASE running → Storages Test → Backups schedule + S3 → Backup now → Restore later from history.',
        ],
      },
      {
        h: 'Preview deploys',
        p: ['Server wildcard + DNS → enable Preview deployments → open PR → manage previews under Deployments.'],
      },
      {
        h: 'Rollback',
        p: ['Deployments → previous successful production deploy → Rollback.'],
      },
      {
        h: 'Transfer ownership or leave',
        p: [
          'Danger → Transfer ownership (OWNER) or Leave (non-OWNER). Delete workspace only after all services and projects are gone.',
        ],
      },
    ],
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Server connect, deploy/healthcheck, domain/SSL, permissions, Chat models, and where to look next.',
    sections: [
      {
        h: 'Server connect failures',
        p: [],
        list: [
          'Verify IP, SSH port, user, and private key',
          'Ensure the user can sudo for first-time Docker install',
          'Read Servers → Activity for the validate session',
        ],
      },
      {
        h: 'Deploy or healthcheck failures',
        p: [],
        list: [
          'Open the failed deployment → read build logs',
          'Check start command, ports, and healthcheck path',
          'Confirm env vars (build-time vs runtime)',
          'Force rebuild if a bad layer/cache is suspected',
        ],
      },
      {
        h: 'Domain or SSL not issuing',
        p: [],
        list: [
          'DNS must resolve to the server',
          'Gateway (Traefik/Caddy) on; ports 80/443 open',
          'Wait for certificate issuance; check gateway/activity logs',
          'Cloudflare: Full (strict), not Flexible',
        ],
      },
      {
        h: 'Permission denied / masked env',
        p: [
          'Project MEMBER cannot reveal secrets or deploy - ask a project ADMIN or workspace OWNER/ADMIN. Empty infra pages → need workspace OWNER/ADMIN.',
        ],
      },
      {
        h: 'Chat has no models',
        p: ['Settings → LLMs: add OpenAI or Anthropic key (OWNER/ADMIN). Pick a model in the Chat header after keys save.'],
      },
      {
        h: 'Container keeps restarting',
        p: [
          'Read Logs for the crash. Exit 137 ≈ OOM; 1 ≈ app error; 127 ≈ command missing. Missing env and DB-not-ready are common.',
        ],
      },
      {
        h: 'Disk full',
        p: [
          'Servers → Advanced → Trigger manual cleanup. Schedule cleanup cron on busy hosts. Alert via notifications when useful.',
        ],
      },
      {
        h: 'Still stuck',
        p: [],
        list: [
          'Service Logs and Deployments detail',
          'Settings → Audit (OWNER) for who changed what',
          'Server or Service Terminal for live inspection (UI only)',
        ],
      },
    ],
  },
  {
    slug: 'danger-zones',
    title: 'Danger Zones',
    description:
      'Safely delete Peon services, servers, projects, and workspaces: name confirmations, preflight rules, what gets torn down, and what stays on the VM.',
    sections: [
      {
        h: 'What Danger Zones are for',
        p: [
          'Danger Zone panels guard irreversible deletes. Peon asks you to type the exact resource name (and sometimes enable extra checkboxes) so a mis-click does not wipe production. Deletes remove Peon’s record of the resource and, depending on the level, stop containers or cascade child objects—but they do not always destroy the underlying cloud VM or every Docker artifact left on disk.',
          'Work top-down or bottom-up deliberately: services → project → workspace, or remove services before deleting a server that still hosts them. Back up databases (and confirm S3 uploads) before deleting anything that holds data you need.',
        ],
      },
      {
        h: 'Service → Danger Zone',
        p: [
          'Open the service sidebar → Danger Zone. Type the exact service name to enable Delete. Confirming removes the service from Peon and tears down its containers according to platform behavior (stop/remove the deploy unit Peon managed). Domains, env, deployments history in the UI, webhooks, and schedules tied to that service go away with it.',
          'Deleting a service does not delete the Git repository, registry images on Docker Hub/GHCR, or workspace Storages. Database data lives in Docker volumes on the server—assume volume data may remain unless you prune volumes separately (Servers cleanup options can destroy unused volumes and are themselves destructive). Take a Backup + S3 upload before deleting DATABASE services.',
        ],
      },
      {
        h: 'Server → Danger',
        p: [
          'On the server detail Danger section, type the exact server name. If services still exist on that host, enable Delete all resources first—that stops containers and deletes those services from Peon, then allows Delete server. Deleting the server removes it from Peon (settings, destinations, logs cascade) but does not destroy the cloud VM or bare-metal machine. You still owe the provider for the instance until you terminate it in their console.',
          'SSH keys in Keys & Tokens are not deleted with the server; reassign or remove keys separately. After removing a server from Peon, orphan containers or networks may remain on the VM if cleanup did not run—use Servers → cleanup tools before delete when you want a tidier disk, understanding unused volume prune can delete data.',
        ],
      },
      {
        h: 'Project delete',
        p: [
          'Project Settings → delete is blocked while any services remain. Delete each service (Danger Zone + name confirm) first, then delete the project with the project name confirmation. Project members and project-scoped settings disappear with the project; workspace-level servers, storages, and Git sources stay unless you remove them separately.',
        ],
      },
      {
        h: 'Workspace delete',
        p: [
          'OWNER only: Workspace Settings → Danger → Delete workspace. Type the workspace name. Preflight requires zero projects and services—empty the workspace first. ADMIN cannot delete the workspace. Deleting the workspace does not SSH into servers to tear down remote containers left behind; clean servers (or delete services/servers in Peon first) if you need remotes cleaned up.',
          'Related Danger actions: Transfer ownership (OWNER picks a member; choose Stay ADMIN / Stay MEMBER / Leave) and Leave workspace (non-OWNER). Transfer before you delete or leave if someone else must keep the billing and infra. Audit logs are OWNER-visible history—export anything you need before a workspace delete.',
        ],
      },
      {
        h: 'Preflight order (recommended)',
        p: [],
        list: [
          'Backup databases → verify S3 if used',
          'Delete or migrate services (name confirm each)',
          'Delete projects once empty',
          'Optionally cleanup server Docker resources, then Delete server (Delete all resources if needed)',
          'Remove unused storages, sources, tokens',
          'OWNER: Delete workspace only when projects/services are zero',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Always type the exact name—UI disables Delete until it matches',
          'Service delete ≠ delete Git repo or cloud VM',
          'Server delete ≠ terminate the VPS at the provider',
          'Project delete blocked until services are gone',
          'Workspace delete: OWNER only; no projects/services; no automatic remote teardown',
          'Prefer Transfer ownership over deleting a workspace others still need',
        ],
      },
    ],
  },
  {
    slug: 'contributing',
    title: 'Contributing',
    description:
      'Contribute to Peon-sh/Peon: ways to help, local dev setup with pnpm and worker, PR guidelines, docs, and one-click templates.',
    sections: [
      {
        h: 'Welcome',
        p: [
          'Peon is open source. Contributions range from bug reports and docs fixes to control-plane features, MCP tools, and marketplace templates. This page is about contributing to the Peon application monorepo (github.com/Peon-sh/Peon)—the dashboard, API, worker, and related product code. Marketing-site or peon.sh docs changes may live in a separate website repo; follow that repository’s README when you are only editing the public docs site.',
          'Before large features, open or comment on an issue so maintainers can confirm scope and avoid duplicated work. Small docs and typo PRs are always welcome without a long discussion.',
        ],
      },
      {
        h: 'Ways to contribute',
        p: [],
        list: [
          'Report bugs with reproduction steps, expected vs actual behavior, environment (Cloud vs self-host), and relevant logs',
          'Improve documentation, in-app copy, and user-manual.md so operators can self-serve',
          'Add or update one-click marketplace templates (compose + magic env) and test them on a real server',
          'Pick up an open issue; comment first to claim it and avoid duplicated work',
          'Fix accessibility, performance, or DX nits when you bump into them while developing',
        ],
      },
      {
        h: 'Development setup',
        p: [
          'Requirements: Node.js 20+, pnpm, Docker (for exercising deploys against a real host), and local PostgreSQL for the control plane. Copy .env.example, set DATABASE_URL and secrets, then migrate and run web + worker in two terminals.',
        ],
        code: `git clone https://github.com/Peon-sh/Peon.git
cd Peon
pnpm install
cp .env.example .env
pnpm prisma migrate dev
pnpm dev      # web on http://localhost:3000
pnpm worker   # separate terminal`,
      },
      {
        h: 'What to run locally',
        p: [
          'The web app serves the dashboard and API. The worker runs deployments, backups, and other async jobs—many flows look “stuck” if you only start pnpm dev. For end-to-end deploy testing, add an SSH key, connect a Linux server Peon can reach, and validate Docker on that host the same way a production user would.',
          'Optional integrations (SQS, SES, S3, GitHub App credentials, LLM keys) are documented in .env.example. Enable only what you need for the feature you are changing. Chat and MCP paths need valid LLM and/or API token setup when you touch those surfaces.',
          'Keep the control-plane database disposable in local dev: prefer migrate dev on a dedicated local Postgres, and never point a contribution environment at production DATABASE_URL. If you change queue or backup behavior, run both happy-path and failure cases (invalid SSH, failed pull, canceled deploy) when you can.',
        ],
      },
      {
        h: 'Pull request guidelines',
        p: [
          'Reviewers favor small, bisectable PRs with a clear test plan. If a change must span API, worker, and UI, say so in the description and list the surfaces you exercised.',
        ],
        list: [
          'Branch from main; keep PRs focused on one concern',
          'Run lint and tests before pushing; fix failures locally first',
          'Schema changes need a Prisma migration committed with the PR',
          'User-facing changes should update docs and/or user-manual.md',
          'Test new or changed templates end-to-end on a real server (create → env → domain → Deploy)',
          'Do not commit secrets, real peon_ tokens, or production .env files',
          'Describe why the change exists, how you tested it, and any follow-ups',
        ],
      },
      {
        h: 'Templates and docs',
        p: [
          'Marketplace templates should ship with sensible magic env (SERVICE_PASSWORD_*, FQDN seeds, and so on), a clear slogan/category, and compose that deploys cleanly on a fresh Peon server. Prefer pinned image tags over latest. Document any post-deploy steps operators must take (DNS, first login).',
          'When behavior changes in the UI, update the operator-facing manual and keep public docs in sync when this website repo tracks the same topics. Accurate docs are as valuable as code for a self-hostable PaaS.',
          'Security-sensitive contributions (auth, tokens, SSH, RBAC) should call out threat model notes in the PR: who can invoke the path, what is logged, and whether secrets could appear in build logs or client bundles.',
        ],
      },
      {
        h: 'Practical checklist',
        p: [],
        list: [
          'Clone Peon-sh/Peon → pnpm install → .env → migrate → pnpm dev + pnpm worker',
          'Reproduce the bug or feature against a validated server when deploys are involved',
          'Lint/tests green; Prisma migration included if the schema changed',
          'Docs / user-manual updated for user-visible behavior',
          'PR description: why, test plan, screenshots if UI',
          'Template PRs: real-server Deploy success before review',
        ],
      },
    ],
  },
];
