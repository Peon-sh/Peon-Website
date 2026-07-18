import type { Metadata } from "next"
import Link from "next/link"
import { DOC_GROUPS } from "@/lib/docs"

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Peon docs: MCP JSON setup for Cursor, Chat assistant, workspaces, servers, services, backups, and troubleshooting.",
  alternates: { canonical: "/docs" },
}

export default function DocsIndexPage() {
  return (
    <div>
      <h1 className="panel-title-slashes text-3xl font-800">Documentation</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Start with MCP and the Chat assistant — then servers, services, and day-2 ops.
        Field-level guides match the Peon dashboard.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/docs/mcp"
          className="rounded-lg border border-phosphor/40 bg-accent/40 p-5 ring-1 ring-phosphor/20 transition-colors hover:border-phosphor"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">Featured</p>
          <h2 className="mt-2 font-heading text-base font-700 text-phosphor">MCP Server</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            JSON config for Cursor and Claude, API tokens, tool catalog, and RBAC.
          </p>
        </Link>
        <Link
          href="/docs/chat-assistant"
          className="rounded-lg border border-phosphor/40 bg-accent/40 p-5 ring-1 ring-phosphor/20 transition-colors hover:border-phosphor"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor">Featured</p>
          <h2 className="mt-2 font-heading text-base font-700 text-phosphor">Chat Assistant</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            BYO LLM keys, manual lookup, visuals, Approve cards, and example prompts.
          </p>
        </Link>
      </div>

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
          Introduction
        </Link>
      </div>

      {DOC_GROUPS.map((group) => (
        <section key={group.label} className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-phosphor">
            {group.label}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {group.pages.map((page) => {
              const featured = page.slug === "mcp" || page.slug === "chat-assistant"
              return (
                <Link
                  key={page.slug}
                  href={`/docs/${page.slug}`}
                  className={
                    featured
                      ? "group rounded-lg border border-phosphor/30 bg-card p-5 transition-colors hover:border-phosphor"
                      : "group rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-bright"
                  }
                >
                  <h3 className="font-heading text-sm font-700 group-hover:text-phosphor">
                    {page.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {page.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
