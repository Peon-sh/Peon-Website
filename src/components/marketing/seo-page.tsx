import Link from 'next/link';
import { SiteHeader } from '@/components/marketing/site-header';
import { SiteFooter } from '@/components/marketing/site-footer';
import { AppCtaLink } from '@/components/marketing/app-cta-link';
import type { SeoPage as SeoPageData } from '@/lib/seo-pages';
import { appHref, publicEnv } from '@/lib/env';

export function SeoMarketingPage({ page }: { page: SeoPageData }) {
  const ctaHref = page.ctaHref ?? appHref('/register');
  const ctaLabel = page.ctaLabel ?? 'Start deploying';
  const isMailto = ctaHref.startsWith('mailto:');
  const isAppCta = ctaHref.startsWith(publicEnv.appUrl);
  const appPath = isAppCta ? ctaHref.slice(publicEnv.appUrl.length) || '/' : null;
  const isExternal = !isAppCta && (ctaHref.startsWith('http') || isMailto);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    about: {
      '@type': 'SoftwareApplication',
      name: 'Peon',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-3xl px-4 py-16">
            <p className="font-mono text-xs uppercase tracking-widest text-phosphor">
              {page.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-800 leading-tight sm:text-5xl">{page.h1}</h1>
            {page.introContent ? (
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {page.introContent.map((block, index) =>
                  block.type === 'p' ? (
                    <p key={index}>{block.text}</p>
                  ) : (
                    <ul key={index} className="list-inside list-disc space-y-1 text-base sm:text-lg">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            ) : (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {page.intro}
              </p>
            )}
            <div className="mt-8">
              {appPath ? (
                <AppCtaLink
                  path={appPath}
                  className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  {ctaLabel}
                </AppCtaLink>
              ) : isExternal ? (
                <a
                  href={ctaHref}
                  className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  {ctaLabel}
                </a>
              ) : (
                <Link
                  href={ctaHref}
                  className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  {ctaLabel}
                </Link>
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-3xl space-y-12 px-4 py-14">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2 className="panel-title-slashes text-xl font-700 sm:text-2xl">{section.title}</h2>
              {section.list && section.paragraphs.length > 1 ? (
                <>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {section.paragraphs[0]}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 text-phosphor">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {section.paragraphs.slice(1).map((para) => (
                    <p
                      key={para.slice(0, 48)}
                      className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                    >
                      {para}
                    </p>
                  ))}
                </>
              ) : (
                <>
                  {section.paragraphs.map((para) => (
                    <p
                      key={para.slice(0, 48)}
                      className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                    >
                      {para}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-0.5 text-phosphor">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              )}
              {section.subsections?.map((subsection) => (
                <div key={subsection.title} className="mt-6">
                  <h3 className="text-lg font-700 text-foreground">{subsection.title}</h3>
                  {subsection.paragraphs?.map((para) => (
                    <p
                      key={para.slice(0, 48)}
                      className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                    >
                      {para}
                    </p>
                  ))}
                  {subsection.list ? (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {subsection.list.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-0.5 text-phosphor">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
              {section.table ? (
                <div className="mt-6 overflow-x-auto rounded-lg border border-border">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="bg-secondary font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        {section.table.headers.map((header, index) => (
                          <th
                            key={header}
                            className={`px-4 py-3 ${index === 1 ? 'bg-accent text-phosphor' : ''}`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.feature} className="border-t border-border">
                          <th
                            scope="row"
                            className="bg-card px-4 py-3 text-left font-medium text-foreground"
                          >
                            {row.feature}
                          </th>
                          {row.cells.map((cell, index) => (
                            <td
                              key={`${row.feature}-${index}`}
                              className={`px-4 py-3 ${
                                index === 0
                                  ? 'bg-accent/60 font-medium text-foreground'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </section>
          ))}

          {page.faqs && page.faqs.length > 0 ? (
            <section>
              <h2 className="panel-title-slashes text-2xl font-700 sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-card">
                {page.faqs.map((faq) => (
                  <details key={faq.question} className="group px-6 py-4">
                    <summary className="cursor-pointer list-none font-medium marker:hidden">
                      <span className="mr-2 font-mono text-phosphor">?</span>
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}{' '}
                      {faq.relatedLink ? (
                        <Link
                          href={faq.relatedLink.href}
                          className="text-phosphor underline-offset-4 hover:underline"
                        >
                          {faq.relatedLink.label} →
                        </Link>
                      ) : null}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {page.related && page.related.length > 0 ? (
            <section className="border-t border-border pt-10">
              <h2 className="panel-title-slashes text-lg font-700">Related</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {page.related.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-phosphor underline-offset-4 hover:underline">
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
