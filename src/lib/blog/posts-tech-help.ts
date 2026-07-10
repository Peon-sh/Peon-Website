import type { BlogPost } from './types';

export const TECH_HELP_POSTS: BlogPost[] = [
  {
    slug: 'docker-container-keeps-restarting',
    title: 'Docker Container Keeps Restarting? Here\u2019s How to Debug It',
    description:
      'A container stuck in a restart loop usually fails in the first second. Find the real error with logs, exit codes and these five common causes.',
    category: 'tech-help',
    keywords: ['docker container restarting', 'docker restart loop', 'container exit code', 'docker debugging'],
    date: '2026-04-01',
    readingMinutes: 8,
    sections: [
      {
        h: 'What a restart loop actually is',
        p: [
          'A container "stuck restarting" is not mysterious: the main process exits (usually within the first second or two), and the restart policy dutifully relaunches it, forever. The container is doing exactly what it was told; your job is to find out why the process dies. The answer is almost always sitting in the logs of the failed run, and the debugging discipline is to read the evidence before changing anything.',
        ],
        code: `docker ps -a                       # see the status and restart count
docker logs --tail 100 <container>  # the error from the last run
docker inspect <container> \\
  --format '{{.State.ExitCode}} {{.State.OOMKilled}} {{.State.Error}}'`,
      },
      {
        h: 'Decode the exit code',
        p: ['The exit code narrows the cause before you read a single stack trace:'],
        list: [
          '1 (or app-specific nonzero): the application errored, read the stack trace; usually config or a missing dependency',
          '137: the process was SIGKILLed, either the kernel OOM killer (check OOMKilled in inspect) or a stop timeout; if OOMKilled is true, raise the memory limit or fix the leak',
          '126: the entrypoint exists but is not executable, typically a missing chmod +x or a Windows line-ending problem in a shell script',
          '127: command not found, a CMD typo, or the binary does not exist in your slim base image (bash on alpine is the classic)',
          '139: segmentation fault, very often a native module compiled for the wrong architecture (x86 module in an ARM container or vice versa)',
        ],
      },
      {
        h: 'The five usual suspects',
        p: ['Across thousands of restart loops, the same five causes dominate:'],
        list: [
          'Missing environment variable: the app\u2019s config validation throws on boot; compare `docker exec env` expectations against what the service actually defines',
          'Database not ready: the app connects once at startup, Postgres is still initializing, the connection fails and the process exits, add retry-with-backoff in the app or a health-gated depends_on',
          'Wrong bind address: the app listens on 127.0.0.1 inside the container, so nothing can reach it and a healthcheck kills it; always bind 0.0.0.0 in containers',
          'Memory limit below reality: a Node app that needs 600 MB in a 512 MB container will OOM on schedule; watch docker stats during startup',
          'Bad healthcheck: the check curls the wrong port or path, marks a healthy app unhealthy, and the platform restarts it, verify the check command by running it manually with docker exec',
        ],
      },
      {
        h: 'Reproduce it interactively',
        p: [
          'When the logs are too thin (some apps crash before configuring their logger), bypass the loop entirely: start a shell in the same image with the same environment, then launch the process by hand and watch it fail in slow motion:',
        ],
        code: `docker run -it --rm --entrypoint sh \\
  --env-file <(docker inspect <container> --format \\
    '{{range .Config.Env}}{{println .}}{{end}}') \\
  <image>
# inside: run the original CMD manually`,
      },
      {
        h: 'Prevent the next one',
        p: [
          'Three habits eliminate most restart loops before they ship: validate configuration at boot and fail with a clear message naming the missing variable; add startup dependency retries so ordering never matters; and test the image locally with docker run using production-shaped environment variables before deploying. Platforms help too, Peon streams the failing container\u2019s logs in the dashboard, so the stack trace is one click away rather than an SSH session.',
        ],
      },
    ],
  },
  {
    slug: 'fix-port-already-in-use',
    title: 'Fix \u201cPort Is Already in Use\u201d Errors on Linux and Docker',
    description:
      'EADDRINUSE and Docker port binding failures: find what holds the port, free it safely, and design so it never happens again.',
    category: 'tech-help',
    keywords: ['port already in use', 'eaddrinuse', 'docker port binding failed', 'address already in use'],
    date: '2026-04-02',
    readingMinutes: 7,
    sections: [
      {
        h: 'The error and what it means',
        p: [
          'Whether it appears as EADDRINUSE in Node, "address already in use" from Docker, or "bind: address already in use" from nginx, the meaning is identical: exactly one process may listen on a given IP:port pair, and something already holds the one you want. The fix is never to reboot and hope; it is to identify the holder, decide whether it should be there, and act accordingly.',
        ],
      },
      {
        h: 'Find the holder',
        p: ['Modern Linux gives you the owning process in one command:'],
        code: `sudo ss -tlnp | grep :3000
# LISTEN 0 511 *:3000  users:(("node",pid=1234,fd=20))

# or the older equivalent
sudo lsof -i :3000

# if it's a container publishing the port
docker ps --format '{{.Names}}\\t{{.Ports}}' | grep 3000`,
      },
      {
        h: 'Common culprits, in order of frequency',
        p: [],
        list: [
          'A previous instance of your own app: a dev server you forgot, or an orphaned process after a crashed deploy, kill the specific PID, not everything matching a name',
          'Another container publishing the same host port: two services both trying to own 8080:..., only one can win',
          'System services on well-known ports: a distro-installed Apache or nginx squatting on 80/443, blocking your reverse proxy container (disable with systemctl disable --now)',
          'systemd-resolved on port 53, relevant when running Pi-hole or other DNS containers',
          'TIME_WAIT ghosts: right after a restart the port looks busy for up to a minute; SO_REUSEADDR in the app makes rebinding immediate, and ss shows no LISTEN holder in this case',
        ],
      },
      {
        h: 'The structural fix: stop publishing ports',
        p: [
          'On a server with a reverse proxy, host port conflicts are a symptom of an anti-pattern: app containers should not publish host ports at all. Each app listens on its internal port on the Docker network; the proxy is the only process binding 80 and 443, and it routes by hostname. Under this design, two apps can both use "port 3000" internally forever without conflict, because no one is competing for host ports.',
          'This is how Peon deploys services by default: no published ports on app containers, proxy-only ingress. If you are hand-writing compose files, deleting the ports: section from app services (keeping it only on the proxy) is the single change that retires this whole error class.',
        ],
      },
      {
        h: 'Quick decision table',
        p: [],
        list: [
          'Holder is your old process: kill <pid>, then fix whatever leaves orphans (usually a missing SIGTERM handler)',
          'Holder is another container: change one side\u2019s published port, or better, unpublish both and route via the proxy',
          'Holder is a system service you need: move your service to another port',
          'Holder is a system service you do not need: disable it permanently',
          'No holder visible: TIME_WAIT, wait 60 seconds or fix the app\u2019s socket options',
        ],
      },
    ],
  },
  {
    slug: 'docker-out-of-disk-space',
    title: 'Docker Ate Your Disk? Reclaim Space Safely',
    description:
      '\u201cNo space left on device\u201d on a Docker host: find what\u2019s consuming the disk (images, logs, volumes, build cache) and clean each safely.',
    category: 'tech-help',
    keywords: ['docker disk space', 'docker prune', 'no space left on device', 'docker logs size'],
    date: '2026-04-03',
    readingMinutes: 8,
    sections: [
      {
        h: 'Why Docker hosts fill up',
        p: [
          'Full disks are the most common cause of outages on single-server Docker hosts, more common than crashes or traffic spikes. The mechanics are mundane: every deploy leaves image layers behind, every build adds cache, and every log line a container prints is appended to an unbounded JSON file. None of it cleans itself up, and "no space left on device" takes down everything at once: new deploys fail, databases cannot write, and even the commands to fix it can fail.',
        ],
      },
      {
        h: 'Diagnose before deleting anything',
        p: ['Two commands show exactly where the space went, always run them first:'],
        code: `docker system df -v      # images, containers, volumes, build cache
df -h /                   # overall disk picture
du -sh /var/lib/docker/containers/*/ 2>/dev/null | sort -h | tail
# ^ per-container log sizes: the silent killer`,
      },
      {
        h: 'Clean each consumer, in safety order',
        p: ['From completely safe to requires-thought:'],
        list: [
          'Dangling and unused images: docker image prune -af, safe, worst case the next deploy pulls layers again',
          'Build cache: docker builder prune -af, safe, the next build is slower, nothing is lost',
          'Stopped containers: docker container prune -f, safe if you do not intentionally keep stopped containers around',
          'Container logs: truncate oversized ones (truncate -s 0 /var/lib/docker/containers/<id>/<id>-json.log), then fix rotation permanently (next section)',
          'Volumes: docker volume prune is DANGEROUS, "unused" only means no running container references it right now; a stopped database\u2019s data volume qualifies. List them, identify each one, and remove only what you can name',
        ],
      },
      {
        h: 'Cap log growth permanently',
        p: [
          'The default json-file log driver has no size limit; a single chatty container can write gigabytes a week. Set global limits in the daemon config and this problem never returns:',
        ],
        code: `# /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "20m", "max-file": "3" }
}
# then: systemctl restart docker
# note: applies to newly created containers; recreate old ones to adopt it`,
      },
      {
        h: 'Automate the hygiene',
        p: [
          'One-off cleanups buy weeks; automation buys forever. Schedule a weekly prune of images, stopped containers and build cache, and alert on disk crossing 80% so you act before 100%. Peon exposes exactly this as a server cleanup action (on demand or scheduled) and shows per-server disk meters in the dashboard, deploy-heavy hosts stay healthy without anyone remembering to SSH in and prune.',
        ],
      },
    ],
  },
  {
    slug: 'lets-encrypt-certificate-not-issued',
    title: 'Let\u2019s Encrypt Certificate Not Issuing? Diagnose It in Order',
    description:
      'ACME challenge failed, connection refused, or rate limited, a systematic checklist for when automatic HTTPS doesn\u2019t come up.',
    category: 'tech-help',
    keywords: ['lets encrypt failed', 'acme challenge failed', 'certificate not issued', 'traefik certificate error'],
    date: '2026-04-04',
    readingMinutes: 8,
    sections: [
      {
        h: 'How issuance fails, structurally',
        p: [
          'Automatic HTTPS has three prerequisites: the domain resolves to your server, the ACME challenge can reach it (port 80 for HTTP-01), and you are not rate limited from earlier failed attempts. Every "certificate not issued" case is one of those three, and the fastest path is to check them in that order rather than re-deploying and hoping. Crucially: your proxy logs contain the exact ACME error naming the failing check, read them first.',
        ],
        code: `docker logs <proxy-container> 2>&1 | grep -i -E "acme|certificate|challenge" | tail -20`,
      },
      {
        h: 'Check 1: DNS (it\u2019s DNS 80% of the time)',
        p: ['The domain must resolve to this server\u2019s public IP before issuance can succeed:'],
        code: `dig +short app.example.com     # what the world sees
curl -4 -s ifconfig.me          # this server's public IPv4
# these two must match`,
        list: [
          'No answer: the record does not exist, or you edited a zone that is not authoritative (registrar DNS vs Cloudflare is the classic mix-up)',
          'Wrong IP: an old record, or the record points at a load balancer/other box',
          'Also check AAAA: if an IPv6 record exists but the server does not actually serve on that address, validation can fail even though IPv4 looks perfect',
        ],
      },
      {
        h: 'Check 2: reachability on port 80',
        p: [
          'HTTP-01 validation arrives as a plain HTTP request on port 80. Both the cloud firewall (security group) and any host firewall (ufw, iptables) must allow 80 and 443, and the proxy container must actually be running and bound to them. A stray host-level nginx or Apache holding port 80 silently absorbs every challenge, check with ss -tlnp | grep -E ":80|:443" that the listener is your proxy.',
        ],
      },
      {
        h: 'Check 3: the Cloudflare orange cloud',
        p: [
          'If the domain is proxied through Cloudflare (orange cloud), challenge requests hit Cloudflare\u2019s edge, not your origin, and HTTP-01 can fail confusingly. Two clean resolutions: set the Cloudflare SSL mode to Full (strict) and let Cloudflare terminate for visitors while your origin still gets its own certificate; or temporarily grey-cloud the DNS record, let issuance complete, then re-enable the proxy. Never run Flexible mode; it causes redirect loops with origin HTTPS.',
        ],
      },
      {
        h: 'Check 4: rate limits, and how not to hit them',
        p: [
          'Let\u2019s Encrypt limits failed validations to 5 per account, per hostname, per hour, and duplicate certificates to 5 per week. Retrying in a loop while DNS is broken burns through both. The discipline: diagnose with the checks above, fix the root cause, retry once. For experiments, point the proxy at the staging endpoint, generous limits and untrusted certificates, perfect for verifying plumbing before touching production limits.',
          'When everything is fixed, issuance is fast: certificates typically arrive within seconds of the first valid request, and platforms like Peon retry automatically, so a previously failing domain heals on its own once DNS and firewall are right.',
        ],
      },
    ],
  },
  {
    slug: 'dns-propagation-explained',
    title: 'DNS Propagation: Why Your Domain Change Takes Time (and Why It Doesn\u2019t)',
    description:
      'What actually happens when you change an A record, why \u201c48 hours\u201d is a myth, and how to verify DNS changes in real time.',
    category: 'tech-help',
    keywords: ['dns propagation', 'dns not updating', 'ttl explained', 'check dns propagation'],
    date: '2026-04-05',
    readingMinutes: 7,
    sections: [
      {
        h: 'There is no \u201cpropagation\u201d, only caches expiring',
        p: [
          'DNS changes do not push out to the world; nothing is propagating anywhere. When you update an A record, the authoritative nameserver answers with the new value immediately. Everyone else, ISP resolvers, public resolvers like 1.1.1.1, your OS, your browser, keeps serving their cached copy until its TTL (time to live) expires, then re-asks and gets the new answer.',
          '"Propagation delay" is simply the world\u2019s caches expiring at different moments. With a 300-second TTL, effectively everyone converges within five minutes. The mythical "24 to 48 hours" dates from an era of default day-long TTLs and survives because it makes a safe thing to tell customers.',
        ],
      },
      {
        h: 'Verify at the source, skip the guesswork',
        p: ['The definitive check queries your zone\u2019s authoritative nameserver directly, bypassing every cache on Earth:'],
        code: `dig +short NS example.com                 # find the authoritative servers
dig +short app.example.com @ns1.dns-host.com   # ask one directly`,
        list: [
          'Correct at the authoritative server: your change is live; the world converges within one TTL, done',
          'Wrong there: the change did not save, or you edited the wrong zone, if nameservers point at Cloudflare, records at your registrar are decorative',
        ],
      },
      {
        h: 'Why YOUR machine still shows the old value',
        p: [
          'The most common "DNS is broken" report is local caching. Your OS resolver, systemd-resolved, and your browser each cache independently, sometimes beyond the TTL. Test against a public resolver to see what the world sees, and flush local caches only if you personally need the new value right now:',
        ],
        code: `dig +short app.example.com @1.1.1.1     # Cloudflare's resolver
dig +short app.example.com @8.8.8.8     # Google's

# flush local (macOS)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
# flush local (Linux with systemd-resolved)
sudo resolvectl flush-caches`,
      },
      {
        h: 'Negative caching: the sneaky one',
        p: [
          'If you query a name before creating its record, resolvers cache the "does not exist" answer (NXDOMAIN) for the zone\u2019s negative TTL, often longer than your record TTL. Practical rule: create the record first, test second. If you tested too early, the fix is patience or querying a resolver you have not poisoned yet.',
        ],
      },
      {
        h: 'Practical playbook for changes',
        p: [],
        list: [
          'Before a planned migration: lower the TTL to 300 a day in advance (the old TTL governs how long the lowering itself takes to be seen)',
          'Make the change, verify against the authoritative server, then against 1.1.1.1',
          'Keep the old server running for at least the old TTL window to catch stragglers',
          'After stabilizing, raise TTL back to 3600 or more for resilience and fewer resolver queries',
        ],
      },
    ],
  },
  {
    slug: 'ssh-connection-refused-fix',
    title: 'SSH Connection Refused or Timing Out: A Debugging Checklist',
    description:
      'Locked out of your VPS? Work through connection refused vs timeout, firewall rules, sshd state and key problems methodically.',
    category: 'tech-help',
    keywords: ['ssh connection refused', 'ssh timeout', 'vps locked out', 'ssh permission denied'],
    date: '2026-04-06',
    readingMinutes: 8,
    sections: [
      {
        h: 'The error message is the map',
        p: [
          'SSH failures announce their category if you read them precisely. "Connection refused" means a machine answered and actively rejected you: the network path works, but nothing (or the wrong thing) listens on that port. "Connection timed out" means packets vanished: a firewall silently drops them or you are aiming at the wrong address. "Permission denied (publickey)" means SSH itself works fine and authentication is the problem. Each category has a completely different checklist, so classifying first halves the work.',
        ],
      },
      {
        h: 'Timeouts: walk the firewalls, outside in',
        p: [],
        list: [
          'Verify the IP: ping it, and check the provider dashboard, VPS IPs change after rebuilds, and stale SSH configs point at ghosts',
          'Provider/cloud firewall: does a rule allow TCP 22 from your current IP? Office and home IPs change; allowlists silently go stale',
          'Host firewall: ufw or iptables on the server itself, easy to lock yourself out by enabling ufw without `ufw allow ssh` first',
          'Your side: corporate and hotel networks sometimes block outbound 22, test via phone hotspot to rule it out in one minute',
          'fail2ban or provider intrusion protection may have banned your IP after repeated failed attempts, check from a different IP',
        ],
      },
      {
        h: 'Refused: get on the box out-of-band',
        p: [
          'Every serious VPS provider offers a web console (VNC/serial) that works even when SSH does not, this is your lifeline. Log in through it and inspect the daemon:',
        ],
        code: `systemctl status sshd          # running? crashed? failed config?
journalctl -u sshd -n 50        # recent errors, bad config lines
ss -tlnp | grep sshd            # which port is it actually on?
sshd -t                         # validate config syntax before restarting`,
        list: [
          'Common causes: a bad sshd_config edit (always run sshd -t before restarting), the daemon disabled after an update, or sshd moved to a non-standard port you forgot',
          'Disk 100% full can also prevent sshd from accepting sessions, check df -h while you are there',
        ],
      },
      {
        h: 'Permission denied (publickey)',
        p: ['Authentication failures are almost always one of four things:'],
        list: [
          'Wrong key offered: ssh -v shows which keys the client tries; specify explicitly with -i ~/.ssh/the_right_key',
          'Wrong user: images differ, ubuntu on Ubuntu cloud images, root on many VPS defaults, debian, admin... check the provider docs',
          'Server-side permissions: ~/.ssh must be 700 and authorized_keys 600, owned by the user; sshd silently ignores world-readable key files (visible in journalctl -u sshd)',
          'PasswordAuthentication no with your key missing from authorized_keys entirely, fix via the web console',
        ],
      },
      {
        h: 'Lock-out-proofing for the future',
        p: [
          'Three cheap habits make lockouts a non-event: keep a second SSH key from a different machine in authorized_keys; when changing sshd config, keep your current session open and test a new connection before closing it; and know where your provider\u2019s web console lives before you need it. Deployment platforms reduce day-to-day exposure too, with Peon managing servers over its own configured SSH access, your personal SSH sessions become rare, so there is less config churn to get wrong.',
        ],
      },
    ],
  },
  {
    slug: 'docker-logs-best-practices',
    title: 'Docker Logging Best Practices for Production Apps',
    description:
      'Log to stdout, structure as JSON, cap file sizes and know your retention: pragmatic logging for containerized apps without an ELK stack.',
    category: 'tech-help',
    keywords: ['docker logging', 'container logs best practices', 'json logging', 'log rotation docker'],
    date: '2026-04-07',
    readingMinutes: 8,
    sections: [
      {
        h: 'The one rule: stdout, unbuffered',
        p: [
          'The twelve-factor principle remains the foundation of container logging: applications write events to stdout/stderr and treat log routing as the runtime\u2019s job. Never write log files inside a container, they die with it, they hide from docker logs, and inside volumes they grow until the disk fills. Every serious runtime, platform and collector builds on the stdout convention; fighting it buys you nothing.',
          'Unbuffered matters too: Python needs PYTHONUNBUFFERED=1, and any language buffering stdout will show logs minutes late or lose the crucial lines before a crash.',
        ],
      },
      {
        h: 'Structure beats prose',
        p: [
          'The difference between grep-able text and queryable JSON shows up the first time you debug a real incident. JSON lines with a level, timestamp, message and request context turn "search the haystack" into "filter where user_id=X and status=500". Every mainstream logger does this well: pino (Node), zerolog/slog (Go), structlog (Python), Serilog (.NET).',
        ],
        code: `{"level":"error","time":"2026-04-07T10:31:04Z","req_id":"abc123",
 "user_id":8841,"route":"/api/checkout","status":500,
 "err":"payment provider timeout after 3000ms","duration_ms":3012}`,
        list: [
          'Include a request ID on every line of a request\u2019s lifecycle, correlation is the whole game',
          'Log at boundaries (request in/out, job start/end, external calls) rather than narrating every function',
          'Never log secrets, tokens or full card numbers; add a redaction layer where user data flows',
        ],
      },
      {
        h: 'Cap and rotate at the daemon',
        p: [
          'Docker\u2019s default json-file driver has no size cap, making unbounded logs the number-one cause of mysteriously full Docker hosts. Fix it once, globally:',
        ],
        code: `# /etc/docker/daemon.json
{ "log-opts": { "max-size": "20m", "max-file": "3" } }
# 60 MB ceiling per container; restart docker, recreate containers to adopt`,
      },
      {
        h: 'Levels and volume discipline',
        p: [
          'Run production at info level: debug in production drowns signals and inflates costs everywhere downstream. A useful volume heuristic: a healthy request logs 1 to 3 lines, not 30. If a single user action produces a screen of logs, you are narrating rather than reporting, and the noise will hide the one line that matters during an incident.',
        ],
      },
      {
        h: 'Do you actually need a log stack?',
        p: [
          'For single-host and few-host deployments, platform log access, Peon streams live and recent container logs per service in the dashboard, plus daemon-level rotation covers the daily debugging loop: see the error, correlate by request ID, fix. Graduate to Loki or an ELK stack when a concrete need arrives: searching across many servers at once, retention measured in months for compliance, or alerting on log patterns. Adopting that infrastructure before the need is a classic complexity trap; the migration later is easy precisely because everything already logs structured JSON to stdout.',
        ],
      },
    ],
  },
  {
    slug: 'postgres-connection-refused-docker',
    title: 'Postgres \u201cConnection Refused\u201d in Docker: The Complete Fix List',
    description:
      'App can\u2019t reach Postgres in Docker? Hostname resolution, networks, startup ordering and auth, the four failure classes and their fixes.',
    category: 'tech-help',
    keywords: ['postgres connection refused docker', 'ECONNREFUSED postgres', 'docker network database', 'postgres docker compose'],
    date: '2026-04-08',
    readingMinutes: 8,
    sections: [
      {
        h: 'Four failure classes, four different fixes',
        p: [
          'Every "app cannot reach Postgres in Docker" report is one of four distinct problems: wrong hostname, separate networks, startup ordering, or authentication. The error text tells you which: ECONNREFUSED or "connection refused" is network-level (classes 1 to 3); "password authentication failed" or "no pg_hba.conf entry" means the network is fine and auth is wrong (class 4). Diagnose top-down and you fix it in minutes.',
        ],
      },
      {
        h: 'Class 1: localhost is not your database',
        p: [
          'Inside a container, localhost means that same container, not the machine, not the database next door. An app configured with postgres://user:pass@localhost:5432/db will get ECONNREFUSED forever, because nothing listens on 5432 inside the app\u2019s own container. Use the database\u2019s service or container name as the hostname; Docker\u2019s embedded DNS resolves it on shared user-defined networks:',
        ],
        code: `# wrong (inside a container)
DATABASE_URL=postgres://app:secret@localhost:5432/appdb
# right
DATABASE_URL=postgres://app:secret@postgres:5432/appdb
#                                    ^ the service/container name`,
      },
      {
        h: 'Class 2: different networks',
        p: [
          'Containers resolve each other only when they share a user-defined Docker network. Two compose stacks, or a hand-run container and a platform-managed one, land on different networks by default and are mutually invisible. Verify and fix:',
        ],
        code: `docker inspect app --format '{{json .NetworkSettings.Networks}}' | jq keys
docker inspect postgres --format '{{json .NetworkSettings.Networks}}' | jq keys
# no common network? connect one:
docker network connect <shared-network> app`,
        list: [
          'Platforms avoid this by attaching all services to a shared network, in Peon, services on the same server reach each other by name out of the box',
        ],
      },
      {
        h: 'Class 3: the startup race',
        p: [
          'Postgres takes several seconds to initialize, longer on first boot with a fresh volume. An app that connects exactly once at startup loses the race, gets ECONNREFUSED, and crashes into a restart loop that eventually stabilizes (masking the real issue). Fix it properly in both places:',
        ],
        code: `# compose: gate on real readiness, not just "started"
depends_on:
  postgres:
    condition: service_healthy
# postgres service:
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U app"]
  interval: 5s
  retries: 10`,
        list: [
          'And in the app: retry initial connections with backoff for 30 to 60 seconds, ordering then never matters anywhere (CI, restarts, reboots)',
        ],
      },
      {
        h: 'Class 4: auth and the first-boot trap',
        p: [
          'The official image\u2019s POSTGRES_USER/POSTGRES_PASSWORD/POSTGRES_DB variables apply only when initializing an empty data volume. Change them later and nothing happens, the credentials in the existing volume win, a trap that produces "password authentication failed" after an innocent-looking config edit. Fix credentials in the running database (ALTER USER app WITH PASSWORD \u2018...\u2019;) or, for throwaway dev data, remove the volume and re-initialize. "No pg_hba.conf entry" appearing with network connections usually means a custom config restricted host access, the stock image already allows network connections from the Docker network with password auth.',
        ],
      },
    ],
  },
  {
    slug: 'nextjs-standalone-docker',
    title: 'Next.js Standalone Mode: Small Docker Images That Boot Fast',
    description:
      'output: "standalone" cuts Next.js images from 1 GB+ to ~150 MB. How it works, the static-files gotcha, and a copy-paste Dockerfile.',
    category: 'tech-help',
    keywords: ['nextjs standalone', 'nextjs docker image size', 'next.js dockerfile', 'nextjs self host'],
    date: '2026-04-09',
    readingMinutes: 8,
    sections: [
      {
        h: 'The problem standalone solves',
        p: [
          'A naive Next.js Dockerfile copies the entire project, node_modules included, into the final image: 1 GB or more, most of it build tooling and dev dependencies the production server never touches. Every deploy moves that gigabyte, every host stores copies of it, and cold starts pay for loading it.',
          'With output: "standalone" in next.config, next build performs file tracing: it walks the actual require/import graph of the production server and emits .next/standalone, a self-contained folder with server.js and only the node_modules files genuinely reached at runtime. Typical result: 120 to 180 MB final images, an 85 to 90% reduction.',
        ],
        code: `// next.config.js
module.exports = { output: 'standalone' };`,
      },
      {
        h: 'The gotcha everyone hits once',
        p: [
          'Standalone output deliberately excludes two directories: .next/static (hashed JS/CSS assets) and public/ (your static files). The assumption is you might serve them from a CDN. Self-hosting them means copying both into the image yourself, forget this, and the app boots fine but every page loads without styles or scripts, assets 404ing:',
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
COPY --from=build /app/.next/static ./.next/static   # <- required
COPY --from=build /app/public ./public               # <- required
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        h: 'Environment variable timing',
        p: [
          'The other classic standalone-mode bug is env timing. NEXT_PUBLIC_* variables are inlined into the client JavaScript at build time; setting them at runtime does nothing, they must exist during npm run build (build args or platform build-time variables). Server-only secrets are the reverse: read at runtime from process.env, so they belong in runtime environment variables and never need rebuilds. The symptom of mixing these up is always "works locally, undefined in production".',
        ],
      },
      {
        h: 'What still works (everything)',
        p: [],
        list: [
          'ISR: revalidation runs in the server process; cache lives on the container filesystem (fine for one instance; use a custom cache handler when scaling out)',
          'next/image: on-demand optimization works out of the box, sharp is bundled by tracing',
          'Middleware, API routes, server actions: all present, this is the full Next.js server, not an adaptation',
          'The only external assumption gone: no CDN implied; add Cloudflare in front if you want edge asset caching',
        ],
      },
      {
        h: 'Payoff in production',
        p: [
          'Concrete numbers from typical apps: image 1.1 GB to 150 MB, build-and-deploy cycle minutes to under one, container start under a second, and far less disk churn on deploy-heavy hosts (relevant when your platform builds on the server, as Peon does, layer cache stays warm and rebuilds move only your app layer). Standalone mode is the single highest-leverage line of configuration in self-hosted Next.js.',
        ],
      },
    ],
  },
  {
    slug: 'reduce-docker-image-size',
    title: 'How to Reduce Docker Image Size: From Gigabytes to Megabytes',
    description:
      'Multi-stage builds, slim bases, layer ordering and .dockerignore, the techniques that cut image size by 90% and speed up every deploy.',
    category: 'tech-help',
    keywords: ['reduce docker image size', 'multi-stage build', 'docker image optimization', 'alpine vs slim'],
    date: '2026-04-10',
    readingMinutes: 9,
    sections: [
      {
        h: 'Why size matters more than it seems',
        p: [
          'Image size is not aesthetic. Every gigabyte is pulled on deploy, stored per host, kept per release for rollbacks, and pruned eventually by someone at 2 a.m. when the disk fills. Big images slow every deploy, stretch rollback windows, and inflate the attack surface (more packages, more CVEs in every scan). The good news: 90% reductions are routine with four techniques, none of which change your application code.',
        ],
      },
      {
        h: 'Technique 1: multi-stage builds',
        p: [
          'The heavy hitter. Build with the full toolchain image; copy only the artifacts into a minimal runtime stage. Compilers, dev dependencies and source never reach production:',
        ],
        code: `FROM node:22 AS build           # fat: toolchain, dev deps
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim               # thin: runtime only
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
CMD ["node", "dist/index.js"]`,
      },
      {
        h: 'Technique 2: pick the right base',
        p: [],
        list: [
          'node:22 (full Debian): ~1 GB, never for production',
          'node:22-slim: ~200 MB, the safe default; glibc, so native modules just work',
          'node:22-alpine: ~130 MB, smallest mainstream option; musl libc occasionally breaks native modules (sharp, canvas), test before committing',
          'distroless: ~20 MB base with no shell or package manager, excellent security posture, harder to debug in',
          'scratch/distroless-static: for compiled languages, Go and Rust binaries yield single-digit-MB images',
        ],
      },
      {
        h: 'Technique 3: layer ordering and .dockerignore',
        p: [
          'Docker caches layers top-down and invalidates everything below the first change. Order instructions least-to-most volatile: dependency manifests and installs before source code, so editing code never re-downloads dependencies. And always ship a .dockerignore, it shrinks the build context (faster uploads), keeps junk out of layers, and prevents secrets from leaking into image history:',
        ],
        code: `# .dockerignore
node_modules
.git
.next
dist
*.log
.env*`,
      },
      {
        h: 'Technique 4: measure, don\u2019t guess',
        p: [
          'docker history <image> shows the size each instruction added, the offender is usually obvious. The dive tool goes deeper, showing files per layer and wasted space from files added then deleted in later layers (which does not reclaim size unless done in the same RUN). Combine cleanup with installation in one instruction: apt-get install with rm -rf /var/lib/apt/lists/* in the same RUN, or use --no-cache flags on alpine\u2019s apk.',
        ],
      },
      {
        h: 'Expected results',
        p: [],
        list: [
          'Node/Next.js app: 1.1 GB naive to 130-180 MB (multi-stage + slim + standalone output)',
          'Python/Django: 950 MB to ~180 MB (multi-stage + python:slim)',
          'Go service: any size to 8-15 MB (static binary + distroless)',
          'Operationally: deploys move seconds of data instead of minutes, rollbacks are instant, disks stop filling, and platform build caches (like Peon\u2019s on-server layer cache) stay effective because only your app layer changes per push',
        ],
      },
    ],
  },
  {
    slug: 'environment-variables-docker-compose',
    title: 'Environment Variables in Docker Compose: env_file, environment and Interpolation',
    description:
      'The three ways Compose handles env vars, which one wins on conflicts, and how to keep secrets out of Git while staying reproducible.',
    category: 'tech-help',
    keywords: ['docker compose environment variables', 'env_file vs environment', 'compose interpolation', 'docker secrets'],
    date: '2026-04-11',
    readingMinutes: 8,
    sections: [
      {
        h: 'Three mechanisms that look alike and are not',
        p: [
          'Compose gives you three distinct ways to get values into containers, and most env-related confusion comes from blurring them:',
        ],
        list: [
          'environment: entries in the compose file, set directly on the container; highest precedence; visible to anyone reading the file',
          'env_file: loads KEY=value lines from a named file into the container at start',
          '${VAR} interpolation: substitutes values into the compose file itself at parse time, from your shell or from a .env file sitting next to docker-compose.yml',
        ],
      },
      {
        h: 'The classic confusion: .env does not enter containers',
        p: [
          'The .env file next to your compose file feeds interpolation of the YAML, it is not automatically injected into any container. DB_PASSWORD=secret in .env does nothing for your app unless the compose file passes it through explicitly. The symptom is maddening: the variable exists on the host, echo shows it, and the container sees nothing.',
        ],
        code: `# .env (next to docker-compose.yml)
DB_PASSWORD=s3cret

# docker-compose.yml: must reference it to pass it through
services:
  app:
    environment:
      DB_PASSWORD: \${DB_PASSWORD}   # now it reaches the container`,
      },
      {
        h: 'Precedence, definitively',
        p: [
          'When the same key appears in multiple places, the order is: values from your shell override the .env file (for interpolation); and on the container, environment: entries override env_file: entries. One subtle trap: an interpolation with no value becomes an empty string silently, use ${VAR:?err} syntax to make missing required values fail the deploy loudly instead.',
        ],
        code: `environment:
  DATABASE_URL: \${DATABASE_URL:?DATABASE_URL must be set}   # fail fast
  LOG_LEVEL: \${LOG_LEVEL:-info}                             # default value`,
      },
      {
        h: 'Keeping secrets out of Git',
        p: [
          'The pattern that scales: commit the compose file with ${PLACEHOLDERS} and defaults for non-secrets; never commit real values; inject them at deploy time from a secrets store. A deployment platform formalizes this, Peon stores variables encrypted at rest, renders them when deploying the stack, and offers workspace-level shared variables so one API key serves ten services without ten copies. Rotating a credential becomes: change it in one place, redeploy consumers.',
        ],
      },
      {
        h: 'Debugging what a container actually received',
        p: ['Stop guessing; look:'],
        code: `docker exec <container> env | sort          # runtime truth
docker compose config                        # fully interpolated YAML
docker inspect <container> --format '{{json .Config.Env}}' | jq`,
        list: [
          'Remember the lifecycle: env changes apply on container recreation, restart alone does not re-read env_file or compose changes',
          'And the classic Next.js/CRA trap: build-time variables (NEXT_PUBLIC_*) must exist during the image build, not just in the runtime environment',
        ],
      },
    ],
  },
  {
    slug: 'docker-networking-explained',
    title: 'Docker Networking Explained: Bridges, DNS and Why localhost Breaks',
    description:
      'A mental model for Docker networks: how containers find each other, when to publish ports, and the difference between expose and ports.',
    category: 'tech-help',
    keywords: ['docker networking', 'docker bridge network', 'container dns', 'docker expose vs ports'],
    date: '2026-04-12',
    readingMinutes: 9,
    sections: [
      {
        h: 'The mental model: networks are virtual switches',
        p: [
          'Almost every Docker networking confusion dissolves with one picture: a user-defined bridge network is a virtual switch. Containers attached to it get a private IP and, crucially, a DNS name equal to their container or service name, resolved by Docker\u2019s embedded DNS server. Containers on the same switch reach each other by name on any port; containers on different switches cannot see each other at all; and the host only reaches containers through explicitly published ports.',
          'The "user-defined" qualifier matters: the legacy default bridge (what you get with a bare docker run) does not provide DNS between containers. Always create and use named networks, compose does this automatically per project.',
        ],
      },
      {
        h: 'ports vs expose, settled',
        p: [],
        list: [
          'ports: "8080:3000" binds host port 8080 to the container\u2019s 3000, this is the doorway from the outside world (and the internet, if the firewall allows). Each host port can be bound once',
          'expose: 3000 is documentation only; it changes no behaviour. Containers on a shared network can already reach any port the other container listens on',
          'The production rule: only the reverse proxy publishes ports (80/443); every app and database stays network-internal, this eliminates port conflicts and accidental public databases in one stroke',
        ],
      },
      {
        h: 'Why localhost breaks, and what to use instead',
        p: [
          'Inside a container, localhost is that container\u2019s own loopback interface, not the host, not sibling containers. The two fixes cover 95% of cases: to reach a sibling service, use its network name (postgres, redis, api); to reach something on the host machine, use host.docker.internal (add the extra_hosts mapping on Linux).',
          'The mirror-image bug: an app inside a container binding to 127.0.0.1 is unreachable even with published ports, because the publish forwards to the container\u2019s external interface. Containerized servers must listen on 0.0.0.0.',
        ],
        code: `# Linux: make host.docker.internal work
extra_hosts:
  - "host.docker.internal:host-gateway"`,
      },
      {
        h: 'A platform-shaped example',
        p: [
          'A typical Peon-managed server runs one shared network (peon) where the proxy, your apps and your databases all live. The proxy publishes 80/443 and routes by hostname; your app reaches its database at postgres-abc:5432 by name; nothing else touches host ports. Two different apps can each listen on "port 3000" internally without any conflict, because host ports are simply not part of the design.',
        ],
      },
      {
        h: 'Inspection toolkit',
        p: ['When connectivity confuses you, these four commands answer it empirically:'],
        code: `docker network ls                                  # what switches exist
docker network inspect peon | jq '.[0].Containers'  # who is attached
docker exec app getent hosts postgres               # does DNS resolve?
docker exec app wget -qO- http://api:3000/health    # can I actually reach it?`,
      },
    ],
  },
  {
    slug: 'docker-compose-healthchecks',
    title: 'Health Checks in Docker Compose: Startup Order and Self-Healing',
    description:
      'Write health checks that reflect real readiness, gate dependent services on them, and enable automatic recovery from wedged states.',
    category: 'tech-help',
    keywords: ['docker healthcheck', 'compose depends_on healthy', 'container health check', 'docker self healing'],
    date: '2026-04-13',
    readingMinutes: 8,
    sections: [
      {
        h: 'Why "running" is not "working"',
        p: [
          'Docker knows whether your process is alive; it has no idea whether it works. A container can be "Up 3 hours" while the app inside deadlocked two hours ago, and nothing will restart it because, from the runtime\u2019s perspective, everything is fine. Health checks close that gap: a command Docker runs inside the container on an interval, whose exit code declares healthy or unhealthy. That one bit of truth powers startup ordering, zero-downtime deploys and self-healing.',
        ],
      },
      {
        h: 'Anatomy of a good health check',
        p: [],
        code: `healthcheck:
  test: ["CMD", "curl", "-fsS", "http://localhost:3000/health"]
  interval: 10s        # how often to probe
  timeout: 5s          # how long one probe may take
  retries: 3           # consecutive failures before "unhealthy"
  start_period: 30s    # grace window at boot; failures don't count yet`,
        list: [
          'start_period is the underused one: without it, slow-booting apps get marked unhealthy during normal startup',
          'CMD-SHELL variant with a fallback survives slim images: curl -fsS URL || wget -q --spider URL, some images ship one tool but not the other',
        ],
      },
      {
        h: 'Check readiness, not existence',
        p: [
          'The endpoint behind the check should verify the app can actually serve: process responsive and critical dependencies reachable (a cheap database ping). Return 200 only then. Keep it fast and unauthenticated, it runs every few seconds forever. For databases and infrastructure, use the purpose-built tools instead of HTTP:',
        ],
        code: `postgres:  test: ["CMD-SHELL", "pg_isready -U app"]
mysql:     test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
redis:     test: ["CMD", "redis-cli", "ping"]`,
      },
      {
        h: 'Gate startup ordering on health',
        p: [
          'Plain depends_on orders container starts, which is nearly useless: Postgres "started" is seconds away from Postgres "accepting connections", and apps that connect in that window crash. The condition form waits for actual readiness and retires the whole boot-race class of bugs:',
        ],
        code: `depends_on:
  postgres:
    condition: service_healthy   # wait for the healthcheck, not the start`,
      },
      {
        h: 'What health unlocks operationally',
        p: [],
        list: [
          'Zero-downtime deploys: the platform only switches traffic to a new container after its check passes; a bad release aborts instead of going live, this is how Peon gates rollouts',
          'Self-healing: pair checks with restart policies (or a platform monitor) so a wedged-but-running container gets replaced instead of serving errors for hours',
          'Truthful dashboards: service status reflects ability to serve, not merely process existence',
          'One habit: define a healthcheck on every service that has dependents or takes traffic, it is ten lines that upgrade the reliability of everything built on top',
        ],
      },
    ],
  },
  {
    slug: 'backup-strategy-self-hosted',
    title: 'A Backup Strategy for Self-Hosted Apps That Actually Works',
    description:
      'The 3-2-1 rule adapted for VPS workloads: what to back up, where to store it, how often, and the restore tests that make it real.',
    category: 'tech-help',
    keywords: ['self-hosted backup strategy', '3-2-1 backup', 'vps backup', 'disaster recovery self-hosted'],
    date: '2026-04-14',
    readingMinutes: 9,
    sections: [
      {
        h: 'Classify first: most of your server needs no backup',
        p: [
          'The most useful backup decision is deciding what not to back up. On a container host, three tiers exist. Recreatable: the OS, Docker, images and containers, never back these up; they redeploy from Git and platform configuration in minutes. Configuration: compose definitions, environment variables, proxy state, cheap to back up, tedious to reconstruct; your platform and Git already hold most of it. Irreplaceable: databases and user uploads, this small tier is what backup strategy is actually about, and clarity here means backing up gigabytes instead of the whole disk.',
        ],
      },
      {
        h: '3-2-1, adapted for a VPS budget',
        p: [
          'The classic rule, three copies, two media, one offsite, maps cleanly onto cheap infrastructure:',
        ],
        list: [
          'Copy 1: the live data on the server',
          'Copy 2: provider snapshots (typically ~20% of instance cost), coarse but gives fast whole-machine restore after catastrophic failure',
          'Copy 3 (the essential one): application-level dumps shipped to object storage at a different provider, Cloudflare R2 or Backblaze B2 run about half a cent per GB-month with free or cheap egress',
          'Different provider matters: it protects against account-level failures (billing lockout, provider incident), which same-provider snapshots do not',
        ],
      },
      {
        h: 'Schedules and retention that match how loss happens',
        p: [
          'Data loss is discovered late: the bad migration from Tuesday surfaces Friday; the corrupted records from March surface in June. Retention must reach back further than your discovery delay. The standard that works: nightly database dumps keeping 7 dailies, 4 weeklies, 6 monthlies, 17 archives per database, covering both "restore yesterday" and "what did this look like last quarter" with bounded storage.',
          'Uploads in object storage are best protected with versioning plus replication to a second bucket, rather than snapshot-style copies. In Peon, database backups are configuration: schedule, retention counts and S3 destination per database, with dumps, uploads and pruning automated and restore as a dashboard action.',
        ],
      },
      {
        h: 'Protect the backups themselves',
        p: [],
        list: [
          'Write-only credentials on the server where supported: a compromised host must not be able to delete its own history',
          'Bucket versioning as the second line against overwrites and deletions',
          'Alert on absence: a backup job that silently stopped is the failure mode that hurts; alert when a backup fails OR when none succeeded in 24 hours, and be suspicious of archives dramatically smaller than yesterday\u2019s',
        ],
      },
      {
        h: 'The restore drill is the backup',
        p: [
          'Nobody needs backups; everybody needs restores, and an untested backup is a hope. Quarterly: pull the newest dump, restore into a scratch database, run a sanity query against production counts, and time the whole procedure with the steps written down. The timing is your real recovery objective, and the drill surfaces every silent failure (expired credentials, format drift, missing tooling) while it is still a calendar item instead of an outage. Teams that drill restore in 20 calm minutes; teams that do not, improvise at 3 a.m.',
        ],
        code: `createdb restore_drill
pg_restore -d restore_drill --no-owner latest.dump
psql restore_drill -c "SELECT count(*) FROM users;"   # compare with prod
# write down: minutes taken, surprises found`,
      },
    ],
  },
  {
    slug: 'monitoring-self-hosted-apps',
    title: 'Monitoring Self-Hosted Apps: The Minimum Viable Setup',
    description:
      'Uptime checks, resource meters, log access and alerts, a monitoring stack for VPS workloads that takes an hour, not a sprint.',
    category: 'tech-help',
    keywords: ['monitoring self-hosted', 'vps monitoring', 'uptime monitoring', 'server alerts'],
    date: '2026-04-15',
    readingMinutes: 8,
    sections: [
      {
        h: 'Monitoring answers four questions',
        p: [
          'Strip away the vendor landscape and monitoring for a small self-hosted fleet answers exactly four questions. Is it up, can users reach it from the internet? Is it healthy, are the containers actually able to serve? Why did it break, can you see the error quickly? Is it about to break, are disk, memory and certificates trending toward trouble? A setup that answers all four costs about an hour; most incident pain comes from gaps in one of them, not from lacking a fancier stack.',
        ],
      },
      {
        h: 'The minimum viable stack',
        p: [],
        list: [
          'Is it up: external uptime checks, Uptime Kuma (one container, free) on a DIFFERENT server than the one it watches, or an external free service; HTTPS checks with a keyword assertion catch "up but broken" states',
          'Is it healthy: container health checks on every service, surfaced in your platform dashboard, Peon shows per-service health and restart counts at a glance',
          'Why did it break: centralized log access; platform log streaming covers the daily loop without an ELK stack',
          'About to break: host meters for disk, RAM and CPU with thresholds, plus SSL expiry warnings (Kuma includes them)',
        ],
      },
      {
        h: 'Alerts that reach humans, without crying wolf',
        p: [
          'An alert nobody sees is a log line; an alert channel that cries wolf gets muted within a month. Route alerts where the team already lives (Slack, Discord, Telegram), and be deliberately conservative: alert on user-visible symptoms (site down, health check failing repeatedly, deploy failed) and on the one leading indicator that matters (disk 80%). Require 2 to 3 consecutive failures before firing to absorb blips. Peon\u2019s notification channels cover deploy and service events natively; Kuma covers reachability; together they page you for the right reasons.',
        ],
      },
      {
        h: 'Watch the disk above everything',
        p: [
          'On single-server setups, full disks cause more outages than crashes, traffic and bugs combined: Docker layers accumulate per deploy, logs grow unbounded by default, and backups pile up locally. Full disks fail weirdly too, databases erroring, deploys half-completing, even SSH struggling. Two rules retire the risk: alert at 80% usage, and schedule automatic pruning of images and build cache (a platform cleanup action or a weekly cron). This single habit prevents the most common 2 a.m. incident in self-hosting.',
        ],
      },
      {
        h: 'When to graduate to a real observability stack',
        p: [
          'Prometheus, Grafana and tracing earn their complexity when concrete needs arrive: latency percentiles per endpoint, custom business metrics, correlation across many servers, or SLO reporting. Adopting them before that point is a complexity trap that steals a week and demands care and feeding. The minimum viable stack catches the overwhelming majority of real incidents at near-zero cost, and because everything already emits health checks and structured logs, the upgrade path later is addition, not migration.',
        ],
      },
    ],
  },
];
