import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/marketing/site-header"
import { ALL_POSTS, CATEGORY_LABELS, type BlogCategory } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog - Guides, Comparisons & Tech Help for Self-Hosting",
  description:
    "Deployment guides, platform comparisons and troubleshooting help for self-hosting apps on your own servers with Docker.",
  alternates: { canonical: "/blogs" },
}

const CATEGORY_ORDER: BlogCategory[] = ["guide", "comparison", "tech-help"]

export default function BlogIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="blog" />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
        <h1 className="panel-title-slashes text-3xl font-800">The Peon Blog</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Practical guides, honest comparisons and troubleshooting help for teams deploying
          on their own servers.
        </p>

        {CATEGORY_ORDER.map((cat) => {
          const posts = ALL_POSTS.filter((p) => p.category === cat)
          return (
            <section key={cat} className="mt-14">
              <h2 className="font-mono text-xs uppercase tracking-widest text-phosphor">
                {CATEGORY_LABELS[cat]} · {posts.length}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-bright"
                  >
                    <h3 className="font-heading text-sm font-700 leading-snug group-hover:text-phosphor">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-faint">
                      {post.readingMinutes} min read
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-8 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Peon - open-source, self-hostable deployment platform.</p>
          <Link href="/" className="hover:text-foreground">peon home</Link>
        </div>
      </footer>
    </div>
  )
}
