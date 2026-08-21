'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOC_GROUPS } from '@/lib/docs';

const FEATURED_SLUGS = new Set(['mcp', 'chat-assistant']);

/** Client island for active-path highlighting. Rest of docs chrome is a server layout. */
export function DocsSidebar() {
  const pathname = usePathname();

  return (
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
  );
}
