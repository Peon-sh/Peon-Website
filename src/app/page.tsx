import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"
import {
  GitBranch,
  Server,
  Container,
  Database,
  ShieldCheck,
  Activity,
  Users,
  Globe,
  Bot,
} from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/marketing/site-header"
import { SiteFooter } from "@/components/marketing/site-footer"
import { appHref } from "@/lib/env"

/** Fully static HTML for crawlers (incl. Google OAuth brand verification). */
export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Peon - Open-source deployment platform. Your servers, $3/project",
  description:
    "Open-source, self-hostable deployment platform. Deploy Git apps, Docker Compose stacks, databases and static sites to your own Hetzner, DigitalOcean or bare-metal servers. $3 per project, unlimited team members. The open alternative to Vercel, Heroku and managed PaaS.",
  keywords: [
    "open source PaaS",
    "open source Vercel alternative",
    "open source Heroku alternative",
    "self-hosted PaaS",
    "Vercel alternative",
    "self-hosted deployment platform",
    "Heroku alternative",
    "deploy to Hetzner",
    "deploy to DigitalOcean",
    "Docker deployment platform",
    "self-hosted CI/CD",
    "cheap app hosting",
    "deploy Docker Compose",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Peon - Your servers. Our pipelines. $3 a project.",
    description:
      "Deploy anything to any server you own. Git push to deploy, databases, compose stacks, TLS, backups and logs - $3/project with unlimited members.",
    url: "/",
    siteName: "Peon",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peon - Deploy on your own servers for $3/project",
    description:
      "The self-hostable deployment platform. Unlimited team members, flat $3 per project.",
  },
}

const FEATURES: { title: string; body: string; icon: LucideIcon; highlight?: boolean }[] = [
  {
    title: "MCP & AI assistant",
    body: "Hosted MCP for Cursor and Claude, plus an in-app Chat assistant — same RBAC, audit trail, and Approve before mutating production.",
    icon: Bot,
    highlight: true,
  },
  {
    title: "Git push to deploy",
    body: "Connect GitHub, GitLab or any Git source. Every push builds and ships automatically with zero-downtime rollouts and instant rollbacks.",
    icon: GitBranch,
  },
  {
    title: "Any server, anywhere",
    body: "Bring your own Hetzner, DigitalOcean, AWS, OVH or bare-metal box. Peon connects over SSH and manages Docker for you - no vendor lock-in.",
    icon: Server,
  },
  {
    title: "Docker Compose & images",
    body: "Deploy prebuilt images, full Compose stacks or one-click templates like Plausible, Postgres and Redis straight from the marketplace.",
    icon: Container,
  },
  {
    title: "Managed databases",
    body: "Provision Postgres, MySQL, MongoDB and Redis on your own hardware with automated backups to S3-compatible storage.",
    icon: Database,
  },
  {
    title: "Free automatic HTTPS",
    body: "Custom domains with auto-renewed Let's Encrypt certificates, HTTP→HTTPS redirects and per-service routing out of the box.",
    icon: ShieldCheck,
  },
  {
    title: "Logs, metrics & alerts",
    body: "Live container logs, resource meters, health checks and notifications so you know the moment something goes sideways.",
    icon: Activity,
  },
  {
    title: "Unlimited team members",
    body: "No per-seat pricing, ever. Invite your whole team to every project with role-based access - included in the $3.",
    icon: Users,
  },
  {
    title: "Static sites & previews",
    body: "Ship static sites and SPAs from the same pipeline, with per-branch environments when you need them.",
    icon: Globe,
  },
]

const COMPARISON_PLATFORMS = [
  "Peon",
  "Coolify",
  "Dokploy",
  "Vercel",
  "Heroku",
  "DO App Platform",
] as const

/** Feature matrix — Peon column (index 0) is highlighted. */
const COMPARISON_ROWS: { feature: string; cells: string[]; peonEdge?: boolean }[] = [
  {
    feature: "Cloud pricing",
    peonEdge: true,
    cells: [
      "$3 / project · unlimited servers",
      "From ~$5/mo · + per extra server",
      "From $4.50 / server",
      "$20 / seat / mo + usage",
      "Per dyno · team plans extra",
      "$5+ / app / mo",
    ],
  },
  {
    feature: "Self-host free",
    cells: ["Yes", "Yes", "Yes", "No", "No", "No"],
  },
  {
    feature: "Where apps run",
    cells: [
      "Your servers (any provider)",
      "Your servers (any provider)",
      "Your servers (any provider)",
      "Vercel only",
      "Heroku only",
      "DigitalOcean only",
    ],
  },
  {
    feature: "Workspace + project RBAC",
    peonEdge: true,
    cells: [
      "Workspace & project roles",
      "Teams",
      "Basic · fine-grained on Enterprise",
      "Team seats",
      "Team plans",
      "Team plans",
    ],
  },
  {
    feature: "Unlimited team members",
    peonEdge: true,
    cells: ["Yes · included", "Yes (self-host)", "Plan limits on Hobby", "Paid per seat", "Paid team plans", "Team plans"],
  },
  {
    feature: "Audit logs",
    peonEdge: true,
    cells: [
      "Included",
      "Limited / DIY",
      "Enterprise only",
      "Enterprise features",
      "Enterprise",
      "Limited",
    ],
  },
  {
    feature: "MCP for AI agents",
    peonEdge: true,
    cells: ["Included", "No", "Yes", "No", "No", "No"],
  },
  {
    feature: "In-app AI assistant",
    peonEdge: true,
    cells: ["Included", "No", "No", "No", "No", "No"],
  },
  {
    feature: "PR preview deploys",
    cells: ["Yes", "Yes", "Yes", "Yes", "Review apps", "Yes"],
  },
  {
    feature: "Open source",
    cells: ["Yes", "Yes", "Yes", "No", "No", "No"],
  },
]

const FAQ = [
  {
    q: "How is Peon only $3 per project?",
    a: "You bring the servers, so we don't resell compute at a markup. Cloud is $3 per project per month, or $30 per year (about 17% off vs paying monthly). That covers the deployment pipeline, dashboard, TLS, backups and team access. A $4 Hetzner VPS plus Peon can run several production apps for less than one Vercel seat.",
  },
  {
    q: "Is pricing per project or per server?",
    a: "Per project. Cloud is $3 per project per month or $30 per year, with unlimited servers and unlimited seats — so cost tracks how you organize apps, not headcount or connected-server count.",
  },
  {
    q: "Do I need my own server for Peon Cloud?",
    a: "Yes. Peon Cloud hosts the control plane (dashboard, deploys, teams). Your apps and databases still run on servers you own — Hetzner, DigitalOcean, AWS EC2, or anything with SSH and Docker.",
  },
  {
    q: "How is Peon different from Coolify or Dokploy?",
    a: "All three deploy to servers you own. Peon is the one that ships workspace and project RBAC, included audit logs, a hosted MCP server, and an in-app AI assistant together on standard plans — plus flat $3/project/month or $30/year Cloud with unlimited servers and seats. That combination is why teams choose Peon.",
  },
  {
    q: "Is Peon a Vercel or Heroku alternative?",
    a: "Yes. Like Vercel, you get git-push deploys, custom domains, HTTPS and preview-style environments - but on servers you own, at a fraction of the cost. Peon manages Docker on your own machines, with a flat, predictable price and unlimited team members.",
  },
  {
    q: "Which cloud providers work with Peon?",
    a: "Any server with SSH and Docker: Hetzner, DigitalOcean, AWS EC2, Google Cloud, OVH, Contabo, a Raspberry Pi or a bare-metal machine in your office.",
  },
  {
    q: "Are team members really unlimited?",
    a: "Yes. Every plan includes unlimited members with workspace and project role-based access. We never charge per seat.",
  },
  {
    q: "What are workspaces and project roles?",
    a: "A workspace holds your servers, sources and members. Projects sit inside a workspace with their own ADMIN/MEMBER roles, so you can invite teammates to an app without giving them root on every server.",
  },
  {
    q: "Does Peon include audit logs?",
    a: "Yes. Workspace owners can review who did what across projects, services, servers, deploys and settings — included on Self Hosted and Cloud, not gated behind Enterprise.",
  },
  {
    q: "What is Peon MCP?",
    a: "Peon exposes a Model Context Protocol server so AI agents (Cursor, Claude, and similar tools) can manage projects, deploys, env and more with the same permissions as your account.",
  },
  {
    q: "What is the in-app AI assistant?",
    a: "Peon Chat uses your own OpenAI or Anthropic keys and the same MCP tool set as external agents. It can answer how-to questions from the user manual and propose actions you approve in the UI.",
  },
  {
    q: "What can I deploy?",
    a: "Git repositories (Node, Next.js, Python, Go, Rails, PHP and anything with a Dockerfile), prebuilt Docker images, Docker Compose stacks, static sites, and databases like Postgres, MySQL, MongoDB and Redis — plus one-click marketplace templates.",
  },
  {
    q: "Is Peon open source?",
    a: "Yes. Peon is open source - the deployment engine, dashboard and pipelines are all public code you can read, audit and contribute to. There's no proprietary agent running on your servers.",
  },
  {
    q: "Can I self-host Peon itself?",
    a: "Yes - because Peon is open source and self-hostable, you can run the entire control plane on your own infrastructure for free and only pay for your servers.",
  },
  {
    q: "What's included in Enterprise?",
    a: "Everything in Cloud, plus options for fine-grained RBAC, SSO/SAML, SCIM, white labeling, MSA/SLA, on-prem or private cloud, and priority support. Contact sales for a custom quote.",
  },
]

function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Peon",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      description:
        "Open-source, self-hostable deployment platform for deploying apps, databases and Docker Compose stacks to your own servers.",
      isAccessibleForFree: true,
      offers: [
        {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
          description: "Self-hosted - free forever, fully open source",
        },
        {
          "@type": "Offer",
          price: "3.00",
          priceCurrency: "USD",
          description: "Cloud - $3 per project per month with unlimited team members",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ]
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd />

      <SiteHeader />

      <main className="flex-1">
        {/* Hero — full first viewport (header is h-14) */}
        <section className="bg-hero relative flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center overflow-hidden border-b border-border">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-16 text-center sm:py-20">
            <p className="panel-title-slashes mb-4 font-mono text-xs uppercase tracking-widest text-phosphor">
              Peon
            </p>
            <h1 className="max-w-3xl text-4xl font-800 leading-tight sm:text-6xl">
              Deploy your apps
              <br />
              <span className="text-phosphor">on your server in clicks</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              <strong className="text-foreground">Peon</strong> is an open-source platform
              you can run yourself — a practical stand-in for Vercel, Heroku, Netlify and
              Railway when you want to push websites, databases, apps and one-click
              templates onto hardware you control.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-phosphor">
              Open source · self-host free · cloud from $3 / mo or $30 / yr
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={appHref("/register")}
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Deploy your first project - $3
              </Link>
              <a
                href="#compare"
                className="rounded-md border border-border-bright px-6 py-3 text-sm font-semibold hover:bg-accent"
              >
                Compare with Coolify & Dokploy
              </a>
            </div>

            <div className="mt-12 w-full max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground sm:text-sm">
                Partners you can deploy on and many more
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                <a
                  href="https://www.digitalocean.com/?refcode=37201cd07b6d&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center transition-opacity hover:opacity-80"
                  aria-label="Deploy on DigitalOcean"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logos/providers/digitalocean-badge.svg"
                    alt="DigitalOcean"
                    className="h-10 w-auto sm:h-12"
                  />
                </a>
                <a
                  href="https://www.hetzner.com/cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center transition-opacity hover:opacity-80"
                  aria-label="Deploy on Hetzner"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logos/providers/hetzner.png"
                    alt="Hetzner"
                    className="h-10 w-auto sm:h-12"
                  />
                </a>
                <a
                  href="https://aws.amazon.com/ec2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center transition-opacity hover:opacity-80"
                  aria-label="Deploy on AWS EC2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logos/providers/aws.png"
                    alt="AWS EC2"
                    className="h-11 w-auto sm:h-14"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Value props strip */}
        <section className="border-b border-border">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
            {[
              ["$3", "flat per project"],
              ["∞", "team members"],
              ["100%", "open source"],
              ["Any", "server or cloud"],
            ].map(([big, small]) => (
              <div key={small} className="px-4 py-8 text-center">
                <div className="font-heading text-3xl font-800 text-phosphor">{big}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{small}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <h2 className="panel-title-slashes text-2xl font-700 sm:text-3xl">
              Everything a PaaS gives you, on hardware you control
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Peon turns any Linux server into your own Vercel-style platform -
              without the per-seat pricing or the walled garden.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <article
                    key={f.title}
                    className={
                      f.highlight
                        ? "rounded-lg border border-phosphor/40 bg-accent/40 p-6 ring-1 ring-phosphor/20"
                        : "rounded-lg border border-border bg-card p-6"
                    }
                  >
                    {f.highlight ? (
                      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-phosphor">
                        Featured
                      </p>
                    ) : null}
                    <div className="mb-4 flex size-10 items-center justify-center rounded-md border border-border bg-secondary text-phosphor">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <h3 className="font-heading text-base font-700 text-phosphor">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                    {f.highlight ? (
                      <p className="mt-3 text-xs">
                        <a href="/docs/mcp" className="font-semibold text-phosphor underline-offset-4 hover:underline">
                          MCP setup →
                        </a>
                        {" · "}
                        <a
                          href="/docs/chat-assistant"
                          className="font-semibold text-phosphor underline-offset-4 hover:underline"
                        >
                          Chat assistant →
                        </a>
                      </p>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section id="compare" className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <h2 className="panel-title-slashes text-2xl font-700 sm:text-3xl">
              Peon vs Coolify, Dokploy, Vercel, Heroku & DigitalOcean
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Peon is built for teams: workspace and project roles, audit logs, MCP for
              agents, and an in-app AI assistant — features most peers gate or skip — with{" "}
              <strong className="text-foreground">$3 per project</strong> Cloud pricing,
              unlimited servers and unlimited seats. Apps run on hardware you own, same
              category as Coolify and{" "}
              <a
                href="https://dokploy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-phosphor underline-offset-4 hover:underline"
              >
                Dokploy
              </a>
              ; the team and AI packaging is why you choose Peon.
            </p>
            <div className="mt-8 overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead className="bg-secondary font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="sticky left-0 z-10 bg-secondary px-4 py-3">Feature</th>
                    {COMPARISON_PLATFORMS.map((name, i) => (
                      <th
                        key={name}
                        className={`px-4 py-3 ${i === 0 ? "bg-accent text-phosphor" : ""}`}
                      >
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="border-t border-border">
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 bg-card px-4 py-3 text-left font-medium ${
                          row.peonEdge ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {row.feature}
                        {row.peonEdge ? (
                          <span className="ml-2 font-mono text-[10px] uppercase tracking-wide text-phosphor">
                            peon
                          </span>
                        ) : null}
                      </th>
                      {row.cells.map((cell, i) => (
                        <td
                          key={`${row.feature}-${COMPARISON_PLATFORMS[i]}`}
                          className={`px-4 py-3 ${
                            i === 0
                              ? "bg-accent/60 font-medium text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Competitor pricing and plan limits are indicative of published entry-level /
              documented plans and may change. Peon’s edges — project RBAC, included audit
              logs, MCP and in-app AI on standard plans, plus $3/project Cloud — are why we
              recommend Peon. Dokploy audit logs and fine-grained RBAC are Enterprise-tier on
              their published plans.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <h2 className="panel-title-slashes text-2xl font-700 sm:text-3xl">
              Simple, affordable pricing
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Self-host free, run the control plane with us for $3 per project / month or $30 /
              year (save ~17%), or go Enterprise for SSO, white-label, and managed options.
            </p>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {/* Self-hosted */}
              <div className="flex flex-col rounded-xl border border-border bg-card p-8 shadow-sm">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Self Hosted
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Install on-prem or in your own cloud
                </p>
                <p className="mt-4 font-heading text-5xl font-900">$0</p>
                <p className="mt-1 text-xs text-muted-foreground">forever · open source</p>
                <ul className="mt-6 flex-1 space-y-2 text-left text-sm text-muted-foreground">
                  {[
                    "Unlimited projects, servers & members",
                    "Workspace + project RBAC",
                    "Audit logs",
                    "MCP for AI agents",
                    "In-app AI assistant",
                    "Git push, Docker images & Compose",
                    "Managed databases with backups",
                    "PR preview deployments",
                    "Custom domains + automatic HTTPS",
                    "Live logs, metrics & notifications",
                    "SSH terminal & scheduled tasks",
                    "One-click marketplace templates",
                    "You manage updates & hosting",
                    "Community support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-phosphor">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://github.com"
                  className="mt-8 block rounded-md border border-border-bright px-6 py-3 text-center text-sm font-semibold hover:bg-accent"
                >
                  Self-host from source
                </a>
              </div>

              {/* Cloud */}
              <div className="flex flex-col rounded-xl border border-phosphor/40 bg-card p-8 shadow-sm">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Cloud
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  We host and manage everything for you
                </p>
                <p className="mt-4 font-heading text-5xl font-900 text-phosphor">$3</p>
                <p className="mt-1 text-xs text-muted-foreground">per project / month</p>
                <p className="mt-2 text-sm text-foreground">
                  or <strong className="text-phosphor">$30 / project / year</strong>
                  <span className="text-muted-foreground">
                    {' '}
                    · $2.50/mo effective · save ~17% vs $36
                  </span>
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-left text-sm text-muted-foreground">
                  {[
                    "Managed control plane · auto updates",
                    "Unlimited servers & team members",
                    "Workspace + project RBAC",
                    "Audit logs",
                    "MCP for AI agents",
                    "In-app AI assistant",
                    "Git push, Docker images & Compose",
                    "Managed databases with S3 backups",
                    "PR preview deployments",
                    "Custom domains + automatic HTTPS",
                    "Live logs, metrics & notifications",
                    "SSH terminal & scheduled tasks",
                    "One-click marketplace templates",
                    "Deploy to any server you own",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-phosphor">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={appHref("/register")}
                  className="mt-8 block rounded-md bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Create your first project
                </Link>
              </div>

              {/* Enterprise */}
              <div className="flex flex-col rounded-xl border border-border bg-card p-8 shadow-sm">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Enterprise
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  For large organizations who want more control
                </p>
                <p className="mt-4 font-heading text-5xl font-900">Custom</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Cloud or self-hosted · contact sales
                </p>
                <div className="mt-4 rounded-md border border-border bg-secondary/50 px-3 py-2 text-left text-xs text-muted-foreground">
                  <p className="font-semibold text-foreground">Cloud</p>
                  <p className="mt-0.5">We host and manage everything for you</p>
                </div>
                <ul className="mt-6 flex-1 space-y-2 text-left text-sm text-muted-foreground">
                  {[
                    "Everything in Cloud, plus…",
                    "Up to unlimited servers & workspaces",
                    "Fine-grained RBAC",
                    "Complete hosting flexibility",
                    "SSO / SAML (Azure, Okta, etc.)",
                    "SCIM user provisioning",
                    "White labeling",
                    "Dedicated audit & compliance support",
                    "On-prem / private cloud option",
                    "MSA / SLA",
                    "Priority support & services",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-phosphor">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:support@peon.sh?subject=Enterprise%20inquiry"
                  className="mt-8 block rounded-md border border-border-bright px-6 py-3 text-center text-sm font-semibold hover:bg-accent"
                >
                  Contact sales
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="mx-auto w-full max-w-3xl px-4 py-20">
            <h2 className="panel-title-slashes text-2xl font-700 sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-card">
              {FAQ.map((f) => (
                <details key={f.q} className="group px-6 py-4">
                  <summary className="cursor-pointer list-none font-medium marker:hidden">
                    <span className="mr-2 font-mono text-phosphor">?</span>
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-hero border-t border-border">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-20 text-center">
            <h2 className="max-w-2xl text-3xl font-800 sm:text-4xl">
              Stop renting a platform. <span className="text-phosphor">Own one.</span>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Connect a server, push your code, and go live in minutes - for the price of a coffee refill.
            </p>
            <Link
              href={appHref("/register")}
              className="mt-8 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Start deploying for $3
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
