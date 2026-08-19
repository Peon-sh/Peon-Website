import type { Metadata } from "next"
import { SiteHeader } from "@/components/marketing/site-header"
import { SiteFooter } from "@/components/marketing/site-footer"
import { MarketplaceGrid } from "@/components/marketing/marketplace-grid"
import { listTemplateCategories, listTemplates } from "@/lib/templates"

export const metadata: Metadata = {
  title: "Marketplace - One-click deploy 300+ self-hosted services",
  description:
    "One-click deploy 333+ self-hosted services to your own server. Plausible, n8n, WordPress, Ghost and more. Secrets and HTTPS set up automatically.",
  keywords: [
    "self-hosted services",
    "one-click deploy",
    "docker templates",
    "self-host plausible",
    "self-host n8n",
    "open source marketplace",
  ],
  alternates: { canonical: "/marketplace" },
}

export default function MarketplacePage() {
  const templates = listTemplates()
  const categories = listTemplateCategories()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="marketplace" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
        <p className="font-mono text-xs uppercase tracking-widest text-phosphor">Marketplace</p>
        <h1 className="mt-2 text-3xl font-800 sm:text-4xl">
          {templates.length}+ services, one click to deploy
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every service below deploys to your own server with generated secrets, persistent
          volumes, a domain and automatic HTTPS. Click Deploy and Peon sets up a project and
          the service for you.
        </p>
        <div className="mt-8">
          <MarketplaceGrid templates={templates} categories={categories} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
