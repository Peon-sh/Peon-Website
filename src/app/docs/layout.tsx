import Link from "next/link"
import { SiteHeader } from "@/components/marketing/site-header"
import { DOC_GROUPS } from "@/lib/docs"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="docs" />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-10 px-4 py-10">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-6">
            {DOC_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  {group.label}
                </p>
                <ul className="mt-2 space-y-1">
                  {group.pages.map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={`/docs/${page.slug}`}
                        className="block rounded px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
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
