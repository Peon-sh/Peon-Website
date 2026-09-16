import type { Metadata } from "next"
import { SiteHeader } from "@/components/marketing/site-header"
import { SiteFooter } from "@/components/marketing/site-footer"
import { LogoCloud } from "@/components/ui/logo-cloud"
import { Container } from "@/components/ui/container"
import { Hero } from "@/components/marketing/landing/hero"
import { HowItWorks } from "@/components/marketing/landing/how-it-works"
import { Features } from "@/components/marketing/landing/features"
import { Comparison } from "@/components/marketing/landing/comparison"
import { Pricing } from "@/components/marketing/landing/pricing"
import { Faq } from "@/components/marketing/landing/faq"
import { FinalCta, OpenSourceStrip } from "@/components/marketing/landing/closing"

/** Fully static HTML for crawlers (incl. Google OAuth brand verification). */
export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Open Source Docker Hosting & Deployment Platform | Peon",
  description:
    "Open source deployment platform for your own servers. Git push deploys, Docker hosting, unlimited team members. Self-hosted Vercel alternative.",
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
    title: "Peon - Deploy your apps on your server in clicks",
    description:
      "Deploy anything to any server you own. Git push to deploy, databases, compose stacks, TLS, backups and logs - $3/project with unlimited members.",
    url: "/",
    siteName: "Peon",
    images: [
      {
        url: "/og.jpg",
        width: 1024,
        height: 599,
        alt: "Peon — Deploy your apps on your server in clicks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peon - Deploy your apps on your server in clicks",
    description:
      "The self-hostable deployment platform. Unlimited team members, flat $3 per project.",
    images: ["/og.jpg"],
  },
}

const COMPARISON_PLATFORMS = [
  "Peon",
  "Coolify",
  "Dokploy",
  "Vercel",
  "Heroku",
  "DO App Platform",
] as const

/** Feature matrix. Peon column (index 0) is highlighted. */
const COMPARISON_ROWS: { feature: string; cells: string[]; peonEdge?: boolean }[] = [
  {
    feature: "Cloud pricing",
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
    cells: ["Yes · included", "Yes (self-host)", "Plan limits on Hobby", "Paid per seat", "Paid team plans", "Team plans"],
  },
  {
    feature: "Audit logs",
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
    cells: ["Included", "No", "Yes", "No", "No", "No"],
  },
  {
    feature: "In-app AI assistant",
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
    a: "Per project. Cloud is $3 per project per month or $30 per year, with unlimited servers and unlimited seats, so cost tracks how you organize apps, not headcount or connected-server count.",
  },
  {
    q: "Do I need my own server for Peon Cloud?",
    a: "Yes. Peon Cloud hosts the control plane (dashboard, deploys, teams). Your apps and databases still run on servers you own: Hetzner, DigitalOcean, AWS EC2, or anything with SSH and Docker.",
  },
  {
    q: "How is Peon different from Coolify or Dokploy?",
    a: "All three deploy to servers you own. Peon is the one that ships workspace and project RBAC, included audit logs, a hosted MCP server, and an in-app AI assistant together on standard plans, plus flat $3/project/month or $30/year Cloud with unlimited servers and seats. That combination is why teams choose Peon.",
  },
  {
    q: "Is Peon a Vercel or Heroku alternative?",
    a: "Yes. Like Vercel, you get git-push deploys, custom domains, HTTPS and preview-style environments, but on servers you own, at a fraction of the cost. Peon manages Docker on your own machines, with a flat, predictable price and unlimited team members.",
  },
  {
    q: "Is Peon free app hosting?",
    a: "Self-hosting Peon's control plane is free forever, so the software itself never costs you a license fee. You still pay for the server your apps run on (often $4-12/month for a small VPS), so \"free\" here means no platform tax, not zero infrastructure cost. If you'd rather not run the control plane yourself, Peon Cloud is $3 per project per month.",
  },
  {
    q: "Which cloud providers work with Peon?",
    a: "Any server with SSH and Docker: Hetzner, DigitalOcean, AWS EC2, Google Cloud, OVH, Contabo, a Raspberry Pi or a bare-metal machine in your office. That makes Peon a container hosting service you can point at whichever cloud app hosting provider already has your infrastructure.",
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
    a: "Yes. Workspace owners can review who did what across projects, services, servers, deploys and settings, included on Self Hosted and Cloud, not gated behind Enterprise.",
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
    a: "Git repositories (Node, Next.js, Python, Go, Rails, PHP and anything with a Dockerfile), prebuilt Docker images, Docker Compose stacks, static sites, and databases like Postgres, MySQL, MongoDB and Redis, plus one-click marketplace templates.",
  },
  {
    q: "Is Peon open source?",
    a: "Yes. Peon is open source, the deployment engine, dashboard and pipelines are all public code you can read, audit and contribute to. There's no proprietary agent running on your servers.",
  },
  {
    q: "Can I self-host Peon itself?",
    a: "Yes, because Peon is open source and self-hostable, you can run the entire control plane on your own infrastructure for free and only pay for your servers.",
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
        <Hero />
        <section className="border-t border-border py-12">
          <Container>
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Runs on any server with SSH and Docker
            </p>
            <LogoCloud />
          </Container>
        </section>
        <HowItWorks />
        <Features />
        <Comparison platforms={COMPARISON_PLATFORMS} rows={COMPARISON_ROWS} />
        <Pricing />
        <OpenSourceStrip />
        <Faq items={FAQ} />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
