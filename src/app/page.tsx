import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/marketing/site-header"
import { appHref } from "@/lib/env"

export const metadata: Metadata = {
  title: "Peon - Open-source deployment platform. Your servers, $2/project",
  description:
    "Open-source, self-hostable deployment platform. Deploy Git apps, Docker Compose stacks, databases and static sites to your own Hetzner, DigitalOcean or bare-metal servers. $2 per project, unlimited team members. The open alternative to Vercel, Heroku and managed PaaS.",
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
    title: "Peon - Your servers. Our pipelines. $2 a project.",
    description:
      "Deploy anything to any server you own. Git push to deploy, databases, compose stacks, TLS, backups and logs - $2/project with unlimited members.",
    url: "/",
    siteName: "Peon",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peon - Deploy on your own servers for $2/project",
    description:
      "The self-hostable deployment platform. Unlimited team members, flat $2 per project.",
  },
}

const FEATURES = [
  {
    title: "Git push to deploy",
    body: "Connect GitHub, GitLab or any Git source. Every push builds and ships automatically with zero-downtime rollouts and instant rollbacks.",
  },
  {
    title: "Any server, anywhere",
    body: "Bring your own Hetzner, DigitalOcean, AWS, OVH or bare-metal box. Peon connects over SSH and manages Docker for you - no vendor lock-in.",
  },
  {
    title: "Docker Compose & images",
    body: "Deploy prebuilt images, full Compose stacks or one-click templates like Plausible, Postgres and Redis straight from the marketplace.",
  },
  {
    title: "Managed databases",
    body: "Provision Postgres, MySQL, MongoDB and Redis on your own hardware with automated backups to S3-compatible storage.",
  },
  {
    title: "Free automatic HTTPS",
    body: "Custom domains with auto-renewed Let's Encrypt certificates, HTTP→HTTPS redirects and per-service routing out of the box.",
  },
  {
    title: "Logs, metrics & alerts",
    body: "Live container logs, resource meters, health checks and notifications so you know the moment something goes sideways.",
  },
  {
    title: "Shared environment variables",
    body: "Team-wide shared variables and per-service secrets, encrypted at rest and injected at build and runtime.",
  },
  {
    title: "Unlimited team members",
    body: "No per-seat pricing, ever. Invite your whole team to every project with role-based access - included in the $2.",
  },
  {
    title: "Static sites & previews",
    body: "Ship static sites and SPAs from the same pipeline, with per-branch environments when you need them.",
  },
  {
    title: "Open source, no black box",
    body: "The entire platform is open source. Audit the code, contribute features, self-host the control plane - nothing is hidden behind a proprietary cloud.",
  },
]

const COMPARISON = [
  { name: "Peon", price: "$2 / project", seats: "Unlimited, free", servers: "Your own (any provider)", openSource: "Yes - fully open", lockIn: "None - it's your Docker host" },
  { name: "Vercel", price: "$20 / seat / mo", seats: "Paid per seat", servers: "Vercel's cloud only", openSource: "No", lockIn: "High" },
  { name: "Heroku", price: "$5–$25+ / dyno", seats: "Team plans extra", servers: "Heroku's cloud only", openSource: "No", lockIn: "High" },
  { name: "DigitalOcean App Platform", price: "$5+ / app / mo", seats: "Team plans", servers: "DigitalOcean only", openSource: "No", lockIn: "Medium" },
]

const FAQ = [
  {
    q: "How is Peon only $2 per project?",
    a: "You bring the servers, so we don't resell compute at a markup. You pay a flat $2 per project for the deployment pipeline, dashboard, TLS, backups and team access. A $4 Hetzner VPS plus Peon can run several production apps for less than one Vercel seat.",
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
    a: "Yes. Every plan includes unlimited members with role-based access. We never charge per seat.",
  },
  {
    q: "What can I deploy?",
    a: "Git repositories (Node, Next.js, Python, Go, Rails, PHP and anything with a Dockerfile), prebuilt Docker images, Docker Compose stacks, static sites, and databases like Postgres, MySQL, MongoDB and Redis.",
  },
  {
    q: "Is Peon open source?",
    a: "Yes. Peon is open source - the deployment engine, dashboard and pipelines are all public code you can read, audit and contribute to. There's no proprietary agent running on your servers.",
  },
  {
    q: "Can I self-host Peon itself?",
    a: "Yes - because Peon is open source and self-hostable, you can run the entire control plane on your own infrastructure for free and only pay for your servers.",
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
          price: "2.00",
          priceCurrency: "USD",
          description: "Cloud - $2 per project per month with unlimited team members",
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
        {/* Hero */}
        <section className="bg-grid relative overflow-hidden border-b border-border">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center">
            <p className="panel-title-slashes mb-4 font-mono text-xs uppercase tracking-widest text-phosphor">
              open-source, self-hostable deployment platform
            </p>
            <h1 className="max-w-3xl text-4xl font-800 leading-tight sm:text-6xl">
              Your servers. Our pipelines.{" "}
              <span className="text-phosphor">$2 a project.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              The <strong className="text-foreground">open-source</strong> platform for
              deploying Git apps, Docker Compose stacks, databases and static sites to your
              own Hetzner, DigitalOcean or bare-metal servers. Git push to deploy,
              automatic HTTPS, backups and logs - with{" "}
              <strong className="text-foreground">unlimited team members</strong> included.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={appHref("/register")}
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Deploy your first project - $2
              </Link>
              <a
                href="#compare"
                className="rounded-md border border-border-bright px-6 py-3 text-sm font-semibold hover:bg-accent"
              >
                Compare with Vercel & Heroku
              </a>
            </div>
            <div className="mt-12 w-full max-w-2xl rounded-lg border border-border bg-card p-4 text-left font-mono text-xs text-muted-foreground shadow-sm">
              <p><span className="text-phosphor">$</span> git push origin main</p>
              <p className="mt-1">→ building image… <span className="text-phosphor">done (38s)</span></p>
              <p>→ rolling out on hetzner-fsn1… <span className="text-phosphor">healthy</span></p>
              <p>→ https://app.yourdomain.com <span className="text-phosphor">live ✓</span></p>
            </div>
          </div>
        </section>

        {/* Value props strip */}
        <section className="border-b border-border">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
            {[
              ["$2", "flat per project"],
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
              {FEATURES.map((f) => (
                <article key={f.title} className="rounded-lg border border-border bg-card p-6">
                  <h3 className="font-heading text-base font-700 text-phosphor">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section id="compare" className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <h2 className="panel-title-slashes text-2xl font-700 sm:text-3xl">
              Peon vs Vercel, Heroku & DigitalOcean
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Pair Peon with a $4/mo Hetzner or DigitalOcean VPS and run multiple
              production apps for less than a single seat on a managed platform.
            </p>
            <div className="mt-8 overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-secondary font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Platform</th>
                    <th className="px-4 py-3">Pricing</th>
                    <th className="px-4 py-3">Team seats</th>
                    <th className="px-4 py-3">Where it runs</th>
                    <th className="px-4 py-3">Open source</th>
                    <th className="px-4 py-3">Lock-in</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.name}
                      className={i === 0 ? "bg-accent font-medium" : "border-t border-border"}
                    >
                      <td className="px-4 py-3">
                        {i === 0 ? <span className="text-phosphor">{row.name}</span> : row.name}
                      </td>
                      <td className="px-4 py-3">{row.price}</td>
                      <td className="px-4 py-3">{row.seats}</td>
                      <td className="px-4 py-3">{row.servers}</td>
                      <td className="px-4 py-3">{row.openSource}</td>
                      <td className="px-4 py-3">{row.lockIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Competitor pricing is indicative of published entry-level plans and may change.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <h2 className="panel-title-slashes text-2xl font-700 sm:text-3xl">
              One price. No asterisks.
            </h2>
            <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
              {/* Self-hosted */}
              <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">self-hosted</p>
                <p className="mt-2 font-heading text-6xl font-900">$0</p>
                <p className="mt-1 text-xs text-muted-foreground">forever · MIT-style open source</p>
                <ul className="mt-6 space-y-2 text-left text-sm text-muted-foreground">
                  {[
                    "Every feature, no limits",
                    "Unlimited projects & team members",
                    "Run it on your own infrastructure",
                    "Community support",
                    "You manage updates & hosting",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-phosphor">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://github.com"
                  className="mt-8 block rounded-md border border-border-bright px-6 py-3 text-sm font-semibold hover:bg-accent"
                >
                  Self-host from source
                </a>
                <p className="mt-3 text-xs text-muted-foreground">
                  Clone the repo, point it at your servers, done.
                </p>
              </div>

              {/* Cloud */}
              <div className="rounded-xl border border-phosphor/40 bg-card p-8 text-center shadow-sm">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">cloud · per project / month</p>
                <p className="mt-2 font-heading text-6xl font-900 text-phosphor">$2</p>
                <p className="mt-1 text-xs text-muted-foreground">we run the control plane for you</p>
                <ul className="mt-6 space-y-2 text-left text-sm text-muted-foreground">
                  {[
                    "Unlimited team members",
                    "Unlimited services per project",
                    "Git, image, Compose & static deployments",
                    "Managed databases with S3 backups",
                    "Custom domains + free automatic HTTPS",
                    "Live logs, metrics & notifications",
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
                  className="mt-8 block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Create your first project
                </Link>
                <p className="mt-3 text-xs text-muted-foreground">
                  Server costs are yours - a $4 VPS from Hetzner or DigitalOcean is plenty.
                </p>
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
        <section className="bg-grid border-t border-border">
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
              Start deploying for $2
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Peon - open-source, self-hostable deployment platform.</p>
          <div className="flex gap-4">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#compare" className="hover:text-foreground">Vercel alternative</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <Link href="/marketplace" className="hover:text-foreground">Marketplace</Link>
            <Link href="/docs" className="hover:text-foreground">Docs</Link>
            <Link href="/blogs" className="hover:text-foreground">Blog</Link>
            <Link href={appHref("/login")} className="hover:text-foreground">Log in</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
