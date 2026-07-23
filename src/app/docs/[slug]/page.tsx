import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ALL_DOC_PAGES, docGroupFor, getDocPage } from "@/lib/docs"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return ALL_DOC_PAGES.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getDocPage(slug)
  if (!page) return {}
  return {
    title: `${page.title} | Docs`,
    description: page.description,
    alternates: { canonical: `/docs/${page.slug}` },
  }
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  const page = getDocPage(slug)
  if (!page) notFound()
  const group = docGroupFor(slug)

  const idx = ALL_DOC_PAGES.findIndex((p) => p.slug === slug)
  const prev = idx > 0 ? ALL_DOC_PAGES[idx - 1] : null
  const next = idx < ALL_DOC_PAGES.length - 1 ? ALL_DOC_PAGES[idx + 1] : null

  return (
    <article>
      <nav className="font-mono text-[11px] uppercase tracking-wide text-faint">
        <Link href="/docs" className="hover:text-foreground">docs</Link>
        {group && (
          <>
            {" / "}
            <span className="text-phosphor">{group.label}</span>
          </>
        )}
      </nav>

      <h1 className="mt-3 text-3xl font-800">{page.title}</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{page.description}</p>

      <div className="mt-8 space-y-9">
        {page.sections.map((section) => (
          <section key={section.h}>
            <h2 className="panel-title-slashes text-lg font-700">{section.h}</h2>
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
              <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card">
                {section.codeLang ? (
                  <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
                      {section.codeLang}
                    </span>
                  </div>
                ) : null}
                <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground">
                  <code>{section.code}</code>
                </pre>
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm">
        {prev ? (
          <Link href={`/docs/${prev.slug}`} className="text-muted-foreground hover:text-foreground">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/docs/${next.slug}`} className="text-right text-muted-foreground hover:text-foreground">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </article>
  )
}
