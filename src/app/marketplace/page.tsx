import type { Metadata } from "next"
import { SiteHeader } from "@/components/marketing/site-header"
import { SiteFooter } from "@/components/marketing/site-footer"
import { MarketplaceGrid } from "@/components/marketing/marketplace-grid"
import { publicEnv } from "@/lib/env"
import { listTemplateCategories, listTemplates } from "@/lib/templates"

const MARKETPLACE_NAME = "300+ Apps, One Click to Deploy | Peon Marketplace"
const MARKETPLACE_DESCRIPTION =
  "One-click deploy 333+ self-hosted services to your own server. Plausible, n8n, WordPress, Ghost and more. Secrets and HTTPS set up automatically."

function buildMarketplaceJsonLd(siteUrl: string) {
  const url = `${siteUrl}/marketplace`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        url,
        name: MARKETPLACE_NAME,
        description: MARKETPLACE_DESCRIPTION,
        publisher: { "@type": "Organization", name: "Peon", url: siteUrl },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Peon", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Marketplace", item: url },
        ],
      },
    ],
  }
}

export const metadata: Metadata = {
  title: { absolute: MARKETPLACE_NAME },
  description: MARKETPLACE_DESCRIPTION,
  keywords: [
    "self-hosted services",
    "one-click deploy",
    "docker templates",
    "self-host plausible",
    "self-host n8n",
    "open source marketplace",
  ],
  alternates: { canonical: "/marketplace" },
  openGraph: {
    title: MARKETPLACE_NAME,
    description: MARKETPLACE_DESCRIPTION,
    url: "/marketplace",
    siteName: "Peon",
    type: "website",
  },
}

export default function MarketplacePage() {
  const templates = listTemplates()
  const categories = listTemplateCategories()
  const jsonLd = buildMarketplaceJsonLd(publicEnv.siteUrl)

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader active="marketplace" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <p className="text-sm font-medium text-phosphor">Marketplace</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          {templates.length}+ services, one click to deploy
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every service below deploys to your own server with generated secrets, persistent
          volumes, a domain and automatic HTTPS. Click Deploy and Peon sets up a project and
          the service for you.
        </p>
        <h2 className="mt-10 text-xl font-semibold sm:text-2xl">
          Browse the self-hosted app marketplace
        </h2>
        <div className="mt-8">
          <MarketplaceGrid templates={templates} categories={categories} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
