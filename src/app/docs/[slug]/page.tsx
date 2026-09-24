import type { Metadata } from "next"
import { Check } from "lucide-react";
import { notFound } from "next/navigation"
import { ALL_DOC_PAGES, docGroupFor, getDocPage } from "@/lib/docs"
import { buildDocArticleJsonLd } from "@/lib/docs/json-ld"
import { publicEnv } from "@/lib/env"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return ALL_DOC_PAGES.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getDocPage(slug)
  if (!page) return {}
  const title = page.seoTitle ?? `${page.title} | Docs`
  return {
    title: page.seoTitle
      ? { absolute: page.seoTitle }
      : `${page.title} | Docs`,
    description: page.description,
    alternates: { canonical: `/docs/${page.slug}` },
    openGraph: {
      title,
      description: page.description,
      url: `/docs/${page.slug}`,
      siteName: "Peon",
      type: "website",
    },
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

  const jsonLd = buildDocArticleJsonLd(page, publicEnv.siteUrl)

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-xs text-faint">
        <a href="/docs" className="hover:text-foreground">docs</a>
        {group && (
          <>
            {" / "}
            <span className="text-foreground">{group.label}</span>
          </>
        )}
      </nav>

      <h1 className="mt-3 text-3xl font-semibold">{page.title}</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{page.description}</p>

      <div className="mt-8 space-y-9">
        {page.sections.map((section) => (
          <section key={section.h}>
            <h2 className="text-lg font-semibold">{section.h}</h2>
            {section.p.map((para, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
            {section.list && (
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {section.list.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-1 size-3.5 shrink-0 text-phosphor" strokeWidth={2.5} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.code && (
              <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card">
                {section.codeLang ? (
                  <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2">
                    <span className="text-xs font-medium text-phosphor">
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
          <a href={`/docs/${prev.slug}`} className="text-muted-foreground hover:text-foreground">
            ← {prev.title}
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a href={`/docs/${next.slug}`} className="text-right text-muted-foreground hover:text-foreground">
            {next.title} →
          </a>
        ) : (
          <span />
        )}
      </div>
    </article>
  )
}
