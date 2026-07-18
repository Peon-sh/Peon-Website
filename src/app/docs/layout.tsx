'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SiteHeader } from '@/components/marketing/site-header';
import { SiteFooter } from '@/components/marketing/site-footer';
import { DOC_GROUPS } from '@/lib/docs';

const FEATURED_SLUGS = new Set(['mcp', 'chat-assistant']);

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="docs" />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-10 px-4 py-10">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-6">
            {DOC_GROUPS.map((group) => {
              const isAiGroup = group.label === 'AI & Agents';
              return (
                <div key={group.label}>
                  <p
                    className={
                      isAiGroup
                        ? 'font-mono text-[10px] font-semibold uppercase tracking-widest text-phosphor'
                        : 'font-mono text-[10px] uppercase tracking-widest text-faint'
                    }
                  >
                    {group.label}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {group.pages.map((page) => {
                      const href = `/docs/${page.slug}`;
                      const featured = FEATURED_SLUGS.has(page.slug);
                      const current = pathname === href;
                      return (
                        <li key={page.slug}>
                          <Link
                            href={href}
                            className={
                              featured || current
                                ? 'block rounded bg-accent/60 px-2 py-1 text-sm font-semibold text-phosphor hover:bg-accent'
                                : 'block rounded px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground'
                            }
                          >
                            {page.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <SiteFooter />
    </div>
  );
}
