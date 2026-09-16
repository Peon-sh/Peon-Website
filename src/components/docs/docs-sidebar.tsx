'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOC_GROUPS } from '@/lib/docs';

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
                  isAiGroup ? 'text-xs font-medium text-foreground' : 'text-xs font-medium text-muted-foreground'
                }
              >
                {group.label}
              </p>
              <ul className="mt-2 space-y-1">
                {group.pages.map((page) => {
                  const href = `/docs/${page.slug}`;
                                    const current = pathname === href;
                  return (
                    <li key={page.slug}>
                      <Link
                        href={href}
                        className={
                          current
                            ? 'block rounded-md bg-accent px-2 py-1.5 text-sm font-medium text-foreground'
                            : 'block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground'
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
