import type { Metadata } from "next"
import { DOC_GROUPS } from "@/lib/docs"

export const metadata: Metadata = {
  title: {
    absolute: "Peon Docs: Deployments, MCP, Databases & Troubleshooting",
  },
  description:
    "Peon documentation: set up MCP for Cursor and Claude, configure workspaces, deploy services, manage databases, and troubleshoot common issues.",
  alternates: { canonical: "/docs" },
}

export default function DocsIndexPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Documentation</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Start with MCP and the Chat assistant, then servers, services, and day-2 ops.
        Field-level guides match the Peon dashboard.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a
          href="/docs/mcp"
          className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-bright"
        >
          <p className="text-xs font-medium text-muted-foreground">Featured</p>
          <h2 className="mt-2 text-base font-semibold text-foreground">MCP Server</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            JSON config for Cursor and Claude, API tokens, tool catalog, and RBAC.
          </p>
        </a>
        <a
          href="/docs/chat-assistant"
          className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-bright"
        >
          <p className="text-xs font-medium text-muted-foreground">Featured</p>
          <h2 className="mt-2 text-base font-semibold text-foreground">Chat Assistant</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            BYO LLM keys, manual lookup, visuals, Approve cards, and example prompts.
          </p>
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="/docs/first-deployment"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Deploy your first app
        </a>
        <a
          href="/docs/introduction"
          className="rounded-md border border-border-bright px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Introduction
        </a>
      </div>

      {DOC_GROUPS.map((group) => (
        <section key={group.label} className="mt-12">
          <h2 className="text-sm font-medium text-phosphor">
            {group.label}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {group.pages.map((page) => {
                            return (
                <a
                  key={page.slug}
                  href={`/docs/${page.slug}`}
                  className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-bright"
                >
                  <h3 className="text-sm font-semibold group-hover:text-foreground">
                    {page.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {page.description}
                  </p>
                </a>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
