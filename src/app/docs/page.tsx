import type { Metadata } from "next"
import Link from "next/link"
import { DOC_GROUPS } from "@/lib/docs"

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Peon documentation: connect servers, deploy applications, provision databases with backups, configure domains and SSL, and troubleshoot deployments.",
  alternates: { canonical: "/docs" },
}

export default function DocsIndexPage() {
  return (
    <div>
      <h1 className="panel-title-slashes text-3xl font-800">Documentation</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Everything you need to deploy applications, databases and services on your own
        servers with Peon. Start with the introduction, or jump straight to your first
        deployment.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/docs/first-deployment"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Deploy your first app
        </Link>
        <Link
          href="/docs/introduction"
          className="rounded-md border border-border-bright px-4 py-2 text-sm font-semibold hover:bg-accent"
        >
          Read the introduction
        </Link>
      </div>

      {DOC_GROUPS.map((group) => (
        <section key={group.label} className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-phosphor">
            {group.label}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {group.pages.map((page) => (
              <Link
                key={page.slug}
                href={`/docs/${page.slug}`}
                className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-bright"
              >
                <h3 className="font-heading text-sm font-700 group-hover:text-phosphor">
                  {page.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {page.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
