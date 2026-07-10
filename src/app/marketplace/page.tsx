import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/marketing/site-header"
import { MarketplaceGrid } from "@/components/marketing/marketplace-grid"
import { listTemplateCategories, listTemplates } from "@/lib/templates"

export const metadata: Metadata = {
  title: "Marketplace - One-click deploy 300+ self-hosted services",
  description:
    "Deploy Plausible, n8n, Uptime Kuma, WordPress, Ghost, MinIO and 300+ other self-hostable services on your own servers in one click. Secrets, domains and HTTPS handled automatically.",
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
      <SiteHeader />
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
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-8 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Peon - open-source, self-hostable deployment platform.</p>
          <div className="flex gap-4">
            <Link href="/docs" className="hover:text-foreground">Docs</Link>
            <Link href="/blogs" className="hover:text-foreground">Blog</Link>
            <Link href="/" className="hover:text-foreground">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
