import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/marketing/site-header"
import { ALL_POSTS, CATEGORY_LABELS, getPost, relatedPosts } from "@/lib/blog"
import { appHref } from "@/lib/env"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return ALL_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blogs/${post.slug}`,
      publishedTime: post.date,
      siteName: "Peon",
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const related = relatedPosts(post)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Peon" },
    publisher: { "@type": "Organization", name: "Peon" },
    mainEntityOfPage: `https://peonpipelines.com/blogs/${post.slug}`,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SiteHeader active="blog" />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14">
        <nav className="font-mono text-[11px] uppercase tracking-wide text-faint">
          <Link href="/blogs" className="hover:text-foreground">blog</Link>
          {" / "}
          <span className="text-phosphor">{CATEGORY_LABELS[post.category]}</span>
        </nav>

        <h1 className="mt-4 text-3xl font-800 leading-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{post.description}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-faint">
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          {" · "}
          {post.readingMinutes} min read
        </p>

        <article className="mt-10 space-y-10">
          {post.sections.map((section) => (
            <section key={section.h}>
              <h2 className="panel-title-slashes text-xl font-700">{section.h}</h2>
              {section.p.map((para, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-phosphor">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.code && (
                <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-xs leading-relaxed text-foreground">
                  <code>{section.code}</code>
                </pre>
              )}
            </section>
          ))}
        </article>

        {/* CTA */}
        <aside className="bg-grid mt-14 rounded-xl border border-phosphor/40 bg-card p-8 text-center">
          <h2 className="text-xl font-800">Deploy it on your own server</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Peon is the open-source deployment platform: git push to deploy, automatic HTTPS,
            managed databases with backups - $2 per project, unlimited team members.
          </p>
          <Link
            href={appHref("/register")}
            className="mt-5 inline-block rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Start deploying for $2
          </Link>
        </aside>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-mono text-xs uppercase tracking-widest text-phosphor">Related articles</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blogs/${r.slug}`}
                  className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-border-bright"
                >
                  <h3 className="font-heading text-xs font-700 leading-snug group-hover:text-phosphor">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-8 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Peon - open-source, self-hostable deployment platform.</p>
          <div className="flex gap-4">
            <Link href="/blogs" className="hover:text-foreground">Blog</Link>
            <Link href="/" className="hover:text-foreground">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
